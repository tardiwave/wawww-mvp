import Experience from '../Experience';
import Loaders from '../../utils/Loaders';
import Lights from './Lights';
import Cube from './objects/Cube';

export default class World {
  private experience: Experience = new Experience();
  private lights: Lights | null = null;
  private loaders: Loaders = this.experience.loaders as Loaders;
  private cube: Cube | null = null;
  constructor() {
    // Objects
    this.loaders.on('loaded', () => {
      this.cube = new Cube();
      this.lights = new Lights();
    });
  }
  destroy() {
    this.cube?.destroy();
    this.lights?.destroy();
  }
}
