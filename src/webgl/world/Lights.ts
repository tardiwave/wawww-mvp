import { AmbientLight, DirectionalLight, Scene } from "three";
import Experience from "../Experience";

export default class Lights {
  private experience: Experience = new Experience();
  private scene: Scene = this.experience.scene as Scene;
  private sunLight: DirectionalLight | null = null;
  private ambientLight: AmbientLight | null = null;
  constructor() {
    // this.setSunLight();
    // this.setAmbientLight();
  }

  setSunLight() {
    this.sunLight = new DirectionalLight("#ffffff", 4);
    this.sunLight.position.set(0, 2, 0);
    this.scene.add(this.sunLight);
  }

  setAmbientLight() {
    this.ambientLight = new AmbientLight(0xcccccc, 0.4);
    this.scene.add(this.ambientLight);
  }

  destroy() {
    this.sunLight?.dispose();
    this.ambientLight?.dispose();
  }
}
