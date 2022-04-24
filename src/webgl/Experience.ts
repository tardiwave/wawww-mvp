import { Scene, Color } from "three";
import { TCanvas } from "../models/global";
import { ISource } from "../models/sources";

import Sizes from "../utils/Sizes";
import Time from "../utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./world/World";
import Sources from "./world/sources";
import Loaders from "../utils/Loaders";
import Debug from "../utils/debug/Debug";
import Mouse from "../utils/Mouse";

declare global {
  interface Window {
    experience: Experience;
  }
}

let experienceInstance: Experience;

export default class Experience {
  public canvas: TCanvas | null = null;
  private sources: ISource[] | null = null;
  public loaders: Loaders | null = null;
  public sizes: Sizes | null = null;
  public time: Time | null = null;
  public debug: Debug | null = null;
  public mouse: Mouse | null = null;

  public scene: Scene | null = null;
  public camera: Camera | null = null;
  public renderer: Renderer | null = null;
  private world?: World | null = null;

  constructor(_canvas?: HTMLCanvasElement) {
    // Singleton
    if (experienceInstance) {
      return experienceInstance;
    }
    experienceInstance = this;
    // Global access
    window.experience = this;

    // Init
    if (_canvas) this.canvas = _canvas;
    this.sources = Sources;
    this.loaders = new Loaders(this.sources);
    this.sizes = new Sizes();
    this.mouse = new Mouse();
    this.time = new Time();
    this.debug = new Debug();
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);
    // this.scene.background = new Color(0xfe2458);
    // this.scene.background = new Color(0xffffff);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.loaders.startLoading();
    this.sizes?.setViewSizeAtDepth();

    // Events
    this.time.on("tick", () => {
      this.update();
    });
  }

  update() {
    this.world?.update();
    this.camera?.update();
    this.renderer?.update();
    this.debug?.update();
  }

  destroy() {
    this.sizes?.off("resize");
    this.sizes?.destroy();
    this.time?.off("tick");
    this.mouse?.destroy();
    this.time?.destroy();
    this.camera?.destroy();
    this.renderer?.destroy();
    this.world?.destroy();

    if (this.debug?.active) {
      this.debug.destroy();
    }
  }
}
