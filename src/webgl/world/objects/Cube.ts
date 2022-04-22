import { GUI } from 'dat.gui';
import { BoxGeometry, Mesh, MeshNormalMaterial, Scene } from 'three';
import Experience from '../../Experience';
import Debug from '../../../utils/debug/Debug';
// import Loaders from '../../utils/Loaders';

export default class Cube {
  private experience: Experience = new Experience();
  private scene: Scene = this.experience.scene as Scene;
  //   private loaders: Loaders = this.experience.loaders as Loaders;
  private debug: Debug = this.experience.debug as Debug;
  private debugFolder: GUI | null = null;

  private geometry: BoxGeometry | null = null;
  private material: MeshNormalMaterial | null = null;
  private mesh: Mesh | null = null;

  constructor() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Cube');
    }

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }
  setGeometry() {
    this.geometry = new BoxGeometry(1, 1, 1);
  }
  setTextures() {}
  setMaterial() {
    this.material = new MeshNormalMaterial({ wireframe: false });
  }
  setMesh() {
    if (this.geometry && this.material) {
      this.mesh = new Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);

      // Debug
      if (this.debug.active) {
        this.debugFolder
          ?.add(this.mesh.rotation, 'x')
          .name('RotateX')
          .min(0)
          .max(5)
          .step(1);
        this.debugFolder
          ?.add(this.mesh.rotation, 'x')
          .name('RotateX')
          .min(0)
          .max(5)
          .step(1);
      }
    }
  }

  destroy() {
    this.mesh?.geometry.dispose();
    for (const key in this.mesh?.material) {
      //@ts-ignore
      const value = this.mesh?.material[key];
      if (value && typeof value.dispose === 'function') {
        value.dispose();
      }
    }
  }
}
