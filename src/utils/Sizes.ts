import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
  public width: number = 0;
  public height: number = 0;
  public pixelRatio: number = 0;

  constructor() {
    super();

    this.resize();

    //Resize event
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.trigger('resize');
  }

  destroy() {
    window.removeEventListener('resize', () => this.resize());
  }
}
