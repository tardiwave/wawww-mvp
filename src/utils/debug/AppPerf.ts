import Stats from 'three/examples/jsm/libs/stats.module';

export default class AppPerf {
  private appStats = Stats();
  private active: boolean = true;
  constructor() {
    document.body.appendChild(this.appStats.dom);
    this.appStats.showPanel(0);
  }

  update() {
    if (this.active) {
      this.appStats.update();
    }
  }

  destroy() {
    this.active = false;
    document.body.removeChild(this.appStats.dom);
  }
}
