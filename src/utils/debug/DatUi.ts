import * as dat from 'dat.gui';

export default class DatUi {
  public ui: dat.GUI | null = null;
  constructor() {
    this.ui = new dat.GUI();
    this.ui.show();
  }

  destroy() {
    this.ui?.destroy();
  }
}
