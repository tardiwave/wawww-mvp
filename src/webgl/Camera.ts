import { Scene, PerspectiveCamera, Camera as threeCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TCanvas } from "../models/global";

import Sizes from "../utils/Sizes";
import Experience from "./Experience";

export default class Camera {
  private experience: Experience = new Experience();
  private sizes: Sizes = this.experience.sizes as Sizes;
  private scene: Scene = this.experience.scene as Scene;
  private canvas: TCanvas = this.experience.canvas as TCanvas;
  public instance: PerspectiveCamera | null = null;
  public controls: OrbitControls | null = null;

  constructor() {
    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 2 * Math.PI, 0);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(
      this.instance as threeCamera,
      this.canvas as HTMLCanvasElement
    );
    this.controls.enableDamping = true;
    this.controls.enabled = false;
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height;
    this.instance?.updateProjectionMatrix();
  }

  update() {
    this.controls?.update();
  }

  destroy() {
    this.controls?.dispose();
  }
}
