import { CubeTexture, CubeTextureLoader, Object3D, Texture, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ISource } from '../models/sources';
import { ILoaders } from '../models/loaders';
import EventEmitter from './EventEmitter';

export default class Loaders extends EventEmitter {
  private sources: ISource[];
  private items: any;
  private toLoad: number;
  private loaded: number;
  private loaders: ILoaders | null = null;
  constructor(sources: ISource[]) {
    super();

    this.trigger('loaded');

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
  }
  setLoaders() {
    this.loaders = {};
    this.loaders!.gltfLoader = new GLTFLoader();
    this.loaders!.textureLoader = new TextureLoader();
    this.loaders!.cubeTextureLoader = new CubeTextureLoader();
  }

  startLoading() {
    if (this.toLoad === 0) {
      this.trigger('loaded');
    }
    for (const source of this.sources) {
      switch (source.type) {
        case 'gltfModel':
          this.loaders?.gltfLoader?.load(source.path[0], (file) => {
            let objects: Object3D[] = [];
            for (const child of file.scene.children) {
              objects.push(child);
            }
            this.sourceLoaded(source, objects);
          });
          break;
        case 'Texture':
          this.loaders?.textureLoader?.load(source.path[0], (file) =>
            this.sourceLoaded(source, file),
          );
          break;
        case 'cubeTexture':
          this.loaders?.cubeTextureLoader?.load(source.path, (file) =>
            this.sourceLoaded(source, file),
          );
          break;
      }
    }
  }

  sourceLoaded(source: ISource, file: CubeTexture | Texture | Object3D[]) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger('loaded');
    }
  }
}
