import Experience from "../Experience";
import Loaders from "../../utils/Loaders";
import Lights from "./Lights";
import Logo from "./entities/Logo/Logo";

export default class World {
  private experience: Experience = new Experience();
  private lights: Lights | null = null;
  private loaders: Loaders = this.experience.loaders as Loaders;
  private logo: Logo | null = null;
  constructor() {
    // Objects
    this.loaders.on("loaded", () => {
      this.logo = new Logo();
      this.lights = new Lights();
    });
  }
  update() {
    this.logo?.update();
  }

  destroy() {
    this.lights?.destroy();
    this.logo?.destroy();
  }
}
