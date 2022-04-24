import * as THREE from "three";
import { Camera, Scene, WebGLRenderTarget, MeshNormalMaterial } from "three";
import {
  Pass,
  FullScreenQuad,
} from "three/examples/jsm/postprocessing/Pass.js";
import Time from "../../../utils/Time";
import Experience from "../../Experience";
import fragment from "./fragment.glsl?raw";
import vertex from "./vertex.glsl?raw";

class CustomOutlinePass extends Pass {
  private experience: Experience = new Experience();
  private time: Time = this.experience.time as Time;
  private resolution: THREE.Vector2 | null = null;
  private renderScene: Scene | null = null;
  private renderCamera: Camera | null = null;
  private normalTarget: WebGLRenderTarget | null = null;
  private normalOverrideMaterial: MeshNormalMaterial | null = null;
  private fsQuad: FullScreenQuad | null = null;

  constructor(
    resolution: { x: number; y: number },
    scene: Scene,
    camera: Camera
  ) {
    super();

    this.renderScene = scene;
    this.renderCamera = camera;
    this.resolution = new THREE.Vector2(resolution.x, resolution.y);

    this.fsQuad = new FullScreenQuad();
    this.fsQuad.material =
      this.createOutlinePostProcessMaterial() as THREE.ShaderMaterial;

    // Create a buffer to store the normals of the scene onto
    const normalTarget = new THREE.WebGLRenderTarget(
      this.resolution.x,
      this.resolution.y
    );
    normalTarget.texture.format = THREE.RGBFormat;
    normalTarget.texture.minFilter = THREE.NearestFilter;
    normalTarget.texture.magFilter = THREE.NearestFilter;
    normalTarget.texture.generateMipmaps = false;
    normalTarget.stencilBuffer = false;
    this.normalTarget = normalTarget;

    this.normalOverrideMaterial = new THREE.MeshNormalMaterial();
  }

  dispose() {
    if (this.normalTarget) this.normalTarget.dispose();
    if (this.fsQuad) this.fsQuad.dispose();
  }

  setSize(width: number, height: number) {
    if (this.normalTarget) this.normalTarget.setSize(width, height);
    if (this.resolution) this.resolution.set(width, height);
    if (this.fsQuad && this.resolution)
      (
        this.fsQuad.material as THREE.ShaderMaterial
      ).uniforms.screenSize.value.set(
        this.resolution.x,
        this.resolution.y,
        1 / this.resolution.x,
        1 / this.resolution.y
      );
  }

  render(renderer: any, writeBuffer: any, readBuffer: any) {
    if (this.fsQuad)
      (this.fsQuad.material as THREE.ShaderMaterial).uniforms.u_time.value = this.time.elapsed; // Turn off writing to the depth buffer
    // because we need to read from it in the subsequent passes.
    const depthBufferValue = writeBuffer.depthBuffer;
    writeBuffer.depthBuffer = false;

    // 1. Re-render the scene to capture all normals in texture.
    // Ideally we could capture this in the first render pass along with
    // the depth texture.
    renderer.setRenderTarget(this.normalTarget);
    if (this.renderScene && this.fsQuad && this.normalTarget) {
      const overrideMaterialValue = this.renderScene.overrideMaterial;
      this.renderScene.overrideMaterial = this.normalOverrideMaterial;
      renderer.render(this.renderScene, this.renderCamera);
      this.renderScene.overrideMaterial = overrideMaterialValue;

      (this.fsQuad.material as THREE.ShaderMaterial).uniforms[
        "depthBuffer"
      ].value = readBuffer.depthTexture;
      (this.fsQuad.material as THREE.ShaderMaterial).uniforms[
        "normalBuffer"
      ].value = this.normalTarget.texture;
      (this.fsQuad.material as THREE.ShaderMaterial).uniforms[
        "sceneColorBuffer"
      ].value = readBuffer.texture;
    }
    // 2. Draw the outlines using the depth texture and normal texture
    // and combine it with the scene color
    if (this.renderToScreen && this.fsQuad) {
      // If this is the last effect, then renderToScreen is true.
      // So we should render to the screen by setting target null
      // Otherwise, just render into the writeBuffer that the next effect will use as its read buffer.
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.fsQuad) this.fsQuad.render(renderer);
    }

    // Reset the depthBuffer value so we continue writing to it in the next render.
    writeBuffer.depthBuffer = depthBufferValue;
  }

  createOutlinePostProcessMaterial() {
    if (this.resolution && this.renderCamera) {
      return new THREE.ShaderMaterial({
        uniforms: {
          debugVisualize: { value: 0 },
          sceneColorBuffer: { value: null },
          depthBuffer: { value: null },
          normalBuffer: { value: null },
          outlineColor: { value: new THREE.Color(0xffffff) },
          //4 scalar values packed in one uniform: depth multiplier, depth bias, and same for normals.
          multiplierParameters: { value: new THREE.Vector4(1, 1, 1, 1) },
          cameraNear: {
            value: (this.renderCamera as THREE.PerspectiveCamera).near,
          },
          cameraFar: {
            value: (this.renderCamera as THREE.PerspectiveCamera).far,
          },
          screenSize: {
            value: new THREE.Vector4(
              this.resolution.x,
              this.resolution.y,
              1 / this.resolution.x,
              1 / this.resolution.y
            ),
          },
          u_time: { value: 0 },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
      });
    } else {
      return null;
    }
  }
}

export { CustomOutlinePass };
