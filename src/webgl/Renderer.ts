import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  WebGLRenderTarget,
  Camera as threeCamera,
  DepthTexture,
} from "three";
// import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
// import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader.js";
import { TCanvas } from "../models/global";
import Sizes from "../utils/Sizes";
import Experience from "./Experience";
import Camera from "./Camera";
import { CustomOutlinePass } from "./shaderPass/CustomOutlinePass/CustomOutlinePass";
import fragment from "./shaderPass/CustomOutlinePass/fragment.glsl?raw";
import vertex from "./shaderPass/CustomOutlinePass/vertex.glsl?raw";

export default class Renderer {
  private experience: Experience = new Experience();
  private canvas: TCanvas = this.experience.canvas as TCanvas;
  private sizes: Sizes = this.experience.sizes as Sizes;
  private scene: Scene = this.experience.scene as Scene;
  private camera: Camera = this.experience.camera as Camera;
  public instance: WebGLRenderer | null = null;
  private composer: EffectComposer | null = null;
  private effectFXAA: ShaderPass | null = null;
  private customOutline: CustomOutlinePass | null = null;

  constructor() {
    this.setInstance();
    this.setPostProcessing();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }
  setPostProcessing() {
    const depthTexture = new DepthTexture(
      window.innerWidth,
      window.innerHeight
    );
    const renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        depthTexture: depthTexture,
        depthBuffer: true,
      }
    );
    this.composer = new EffectComposer(
      this.instance as WebGLRenderer,
      renderTarget
    );
    const renderPass = new RenderPass(
      this.scene,
      this.camera.instance as PerspectiveCamera
    );
    this.composer.addPass(renderPass);

    const customPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.composer.addPass(customPass);

    // this.effectFXAA = new ShaderPass(FXAAShader);
    // this.effectFXAA.uniforms["resolution"].value.set(
    //   1 / window.innerWidth,
    //   1 / window.innerHeight
    // );
    // this.composer.addPass(this.effectFXAA);
  }

  resize() {
    this.instance?.setSize(this.sizes.width, this.sizes.height);
    this.instance?.setPixelRatio(this.sizes.pixelRatio);

    if (this.composer)
      this.composer.setSize(window.innerWidth, window.innerHeight);
    if (this.customOutline)
      this.customOutline.setSize(window.innerWidth, window.innerHeight);
    if (this.effectFXAA)
      this.effectFXAA.setSize(window.innerWidth, window.innerHeight);
  }

  update() {
    // if (this.composer) {
    //   this.composer.render();
    // } else {
    this.instance?.render(this.scene, this.camera.instance as threeCamera);
    // }
  }

  destroy() {
    this.instance?.dispose();
  }
}
