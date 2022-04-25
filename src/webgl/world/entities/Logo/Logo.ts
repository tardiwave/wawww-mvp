import { GUI } from "dat.gui";
import { Scene, Group, Object3D, ShaderMaterial, Mesh } from "three";
import Experience from "../../../Experience";
import Debug from "../../../../utils/debug/Debug";
import Loaders from "../../../../utils/Loaders";
import WFVertex from "./shaders/wireframe/vertex.glsl?raw";
import WFFragment from "./shaders/wireframe/fragment.glsl?raw";
import fillVertex from "./shaders/fill/vertex.glsl?raw";
import fillFragment from "./shaders/fill/fragment.glsl?raw";
import Time from "../../../../utils/Time";
import Mouse from "../../../../utils/Mouse";
import anime from "animejs";
import Sizes from "../../../../utils/Sizes";
import isMobile from "../../../../utils/mobileDetect";

export default class Logo {
  private experience: Experience = new Experience();
  private scene: Scene = this.experience.scene as Scene;
  private time: Time = this.experience.time as Time;
  private sizes: Sizes = this.experience.sizes as Sizes;
  private mouse: Mouse = this.experience.mouse as Mouse;
  private loaders: Loaders = this.experience.loaders as Loaders;
  private debug: Debug = this.experience.debug as Debug;
  private debugFolder: GUI | null = null;
  private model: Object3D[] | null = null;
  private logo: Group | null = null;
  private fillMaterial: ShaderMaterial | null = null;
  private wireframeMaterial: ShaderMaterial | null = null;
  private currentColor: "white" | "pink" = "white";
  private isEntryFinished = false;
  private scale = 20;

  constructor() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder("Logo");
    }
    this.setScale();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
    this.setDebug();
    this.entry();
    this.sizes.on("resize", () => this.resize());
    // this.mouse.on("mousedown", () => this.switchColor());
  }
  setMaterial() {
    this.fillMaterial = new ShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
      },
      vertexShader: fillVertex,
      fragmentShader: fillFragment,
    });
    this.wireframeMaterial = new ShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
        r: {
          value: 1,
        },
        g: {
          value: 1,
        },
        b: {
          value: 1,
        },
      },
      vertexShader: WFVertex,
      fragmentShader: WFFragment,
    });
  }

  setScale() {
    const w = window.innerWidth;
    if (isMobile() || window.innerWidth < 1000) {
      if (w > 300) {
        this.scale = 1.3;
      }
      if (w > 450) {
        this.scale = 1.4;
      }
      if (w > 750) {
        this.scale = 1.6;
      }
      if (w > 1100) {
        this.scale = 1.8;
      }
      if (w > 1400) {
        this.scale = 1.9;
      }
      if (w > 1600) {
        this.scale = 2.0;
      }
    } else {
      if (w > 300) {
        this.scale = 0.2;
      }
      if (w > 450) {
        this.scale = 0.3;
      }
      if (w > 750) {
        this.scale = 0.5;
      }
      if (w > 1100) {
        this.scale = 0.7;
      }
      if (w > 1400) {
        this.scale = 0.8;
      }
      if (w > 1600) {
        this.scale = 0.9;
      }
    }

    if (this.isEntryFinished) {
      this.logo?.scale.set(this.scale, this.scale, this.scale);
    }
  }

  entry() {
    if (isMobile() || window.innerWidth < 1000) {
      anime({
        targets: this.logo?.position,
        x: [-4, 0],
        z: [6, 0],
        duration: 2000,
        easing: "easeInOutQuad",
        complete: () => (this.isEntryFinished = true),
      });
      anime({
        targets: this.logo?.scale,
        x: [this.scale, this.scale],
        y: [this.scale, this.scale],
        z: [this.scale, this.scale],
        duration: 4000,
        easing: "easeInOutQuad",
        complete: () => (this.isEntryFinished = true),
      });
    } else {
      anime({
        targets: this.logo?.position,
        y: [-3, 0],
        duration: 200,
        easing: "easeInOutQuad",
        complete: () => (this.isEntryFinished = true),
      });
      anime({
        targets: this.logo?.scale,
        x: [0, this.scale],
        y: [0, this.scale],
        z: [0, this.scale],
        duration: 2000,
        easing: "easeInOutQuad",
        complete: () => (this.isEntryFinished = true),
      });
    }
  }

  setMesh() {
    this.logo = new Group();
    this.model = this.loaders.items["logo"];
    if (this.model) {
      this.model.map((mesh) => {
        mesh.scale.set(20, 20, 20);
        mesh.traverse((child) => {
          if (child instanceof Mesh) {
            if (child.material !== undefined) {
              if (mesh.name === "wireframe") {
                child.material = this.wireframeMaterial;
              } else {
                child.material = this.fillMaterial;
              }
            }
          }
        });
        if (this.logo) this.logo.add(mesh);
      });
      this.logo.position.set(0, -3, 0);
      this.logo.scale.set(0, 0, 0);
      if (isMobile() || window.innerWidth < 1000) {
        this.logo.rotation.y = 1;
      }
      this.scene.add(this.logo);
    }
  }
  setTextures() {}
  setDebug() {
    if (this.logo) {
      // Debug
      if (this.debug.active) {
        this.debugFolder
          ?.add(this.logo.rotation, "x")
          .name("RotateX")
          .min(0)
          .max(5)
          .step(1);
        this.debugFolder
          ?.add(this.logo.rotation, "y")
          .name("RotateY")
          .min(0)
          .max(5)
          .step(1);
        this.debugFolder
          ?.add(this.logo.rotation, "z")
          .name("RotateZ")
          .min(0)
          .max(5)
          .step(1);
        this.debugFolder
          ?.add(this.logo.scale, "x")
          .name("ScaleX")
          .min(0)
          .max(5)
          .step(1);
        this.debugFolder
          ?.add(this.logo.scale, "y")
          .name("ScaleY")
          .min(0)
          .max(5)
          .step(1);
        this.debugFolder
          ?.add(this.logo.scale, "z")
          .name("ScaleZ")
          .min(0)
          .max(5)
          .step(1);
      }
    }
  }
  update() {
    if (this.fillMaterial && this.wireframeMaterial) {
      this.fillMaterial.uniforms.time.value = this.time.elapsed;
      this.wireframeMaterial.uniforms.time.value = this.time.elapsed;
      this.logo?.traverse((mesh) => {
        if (mesh instanceof Mesh) {
          mesh.material.uniforms.time.value = this.time.elapsed;
        }
      });
    }
    if (this.logo && this.isEntryFinished) {
      const coef = 100000;
      this.logo.rotation.x +=
        ((this.mouse.webglX * coef) / 2 - this.logo?.rotation.x) * 0.05;
      if (isMobile() || window.innerWidth < 1000) {
        this.logo.rotation.y +=
          ((this.mouse.webglY * coef) / 2 - this.logo?.rotation.y + 1) * 0.05;
      } else {
        this.logo.rotation.y +=
          ((this.mouse.webglY * coef) / 2 - this.logo?.rotation.y) * 0.05;
      }
    }
  }

  switchColor() {
    const pink = {
      r: 0.996,
      g: 0.141,
      b: 0.345,
    };
    const white = {
      r: 1.0,
      g: 1.0,
      b: 1.0,
    };
    const duration = 700;
    if (this.currentColor === "white") {
      this.currentColor = "pink";
      this.logo?.traverse((mesh) => {
        if (mesh instanceof Mesh) {
          anime({
            targets: mesh.material.uniforms.r,
            value: pink.r,
            duration: duration,
          });
          anime({
            targets: mesh.material.uniforms.g,
            value: pink.g,
            duration: duration,
          });
          anime({
            targets: mesh.material.uniforms.b,
            value: pink.b,
            duration: duration,
          });
        }
      });
    } else {
      this.currentColor = "white";
      this.logo?.traverse((mesh) => {
        if (mesh instanceof Mesh) {
          anime({
            targets: mesh.material.uniforms.r,
            value: white.r,
            duration: duration,
          });
          anime({
            targets: mesh.material.uniforms.g,
            value: white.g,
            duration: duration,
          });
          anime({
            targets: mesh.material.uniforms.b,
            value: white.b,
            duration: duration,
          });
        }
      });
    }
  }

  destroy() {}

  resize() {
    this.setScale();
  }
}
