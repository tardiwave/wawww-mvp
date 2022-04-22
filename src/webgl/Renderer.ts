import { Scene, WebGLRenderer, Camera as threeCamera } from 'three';
import { TCanvas } from '../models/global';
import Sizes from '../utils/Sizes';
import Experience from './Experience';
import Camera from './Camera';

export default class Renderer {
  private experience: Experience = new Experience();
  private canvas: TCanvas = this.experience.canvas as TCanvas;
  private sizes: Sizes = this.experience.sizes as Sizes;
  private scene: Scene = this.experience.scene as Scene;
  private camera: Camera = this.experience.camera as Camera;
  public instance: WebGLRenderer | null = null;

  constructor() {
    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance?.setSize(this.sizes.width, this.sizes.height);
    this.instance?.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance?.render(this.scene, this.camera.instance as threeCamera);
  }

  destroy() {
    this.instance?.dispose();
  }
}
