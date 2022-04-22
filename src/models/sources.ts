export interface ISource {
  name: string;
  type: 'gltfModel' | 'Texture' | 'cubeTexture';
  path: string[];
}
