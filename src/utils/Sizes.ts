import { PerspectiveCamera } from "three";
import { IviewSizeAtDepth } from "../models/sizes";
import Experience from "../webgl/Experience";
import EventEmitter from "./EventEmitter";
import getViewSizeAtDepth from "./getViewSizeAtDepth";

export default class Sizes extends EventEmitter {
  public width: number = 0;
  public height: number = 0;
  public pixelRatio: number = 0;
  private experience: Experience = new Experience();
  public viewSizeAtDepth: IviewSizeAtDepth | null = null;

  constructor() {
    super();

    this.resize();

    //Resize event
    window.addEventListener("resize", () => this.resize());
  }
  setViewSizeAtDepth() {
    if (this.experience.camera?.instance as PerspectiveCamera) {
      this.viewSizeAtDepth = getViewSizeAtDepth(
        this.experience.camera?.instance as PerspectiveCamera
      );
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.trigger("resize");
    this.experience.camera?.resize();
    this.experience.renderer?.resize();
    this.setViewSizeAtDepth();
  }

  destroy() {
    window.removeEventListener("resize", () => this.resize());
  }
}
