import EventEmitter from './EventEmitter';

let reqAF: number;

export default class Time extends EventEmitter {
  private start: number = Date.now();
  private current: number = this.start;
  public elapsed: number = 0;
  public delta: number = 16;

  constructor() {
    super();
    // Tick event
    reqAF = requestAnimationFrame(() => this.tick());
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger('tick');

    reqAF = requestAnimationFrame(() => this.tick());
  }

  destroy() {
    cancelAnimationFrame(reqAF);
  }
}
