import { CubeTextureLoader, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface ILoaders {
  cubeTextureLoader?: CubeTextureLoader;
  gltfLoader?: GLTFLoader;
  textureLoader?: TextureLoader;
}
