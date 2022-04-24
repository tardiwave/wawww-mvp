import Sizes from "./Sizes";
import Experience from "../webgl/Experience";
import EventEmitter from "./EventEmitter";

export default class Mouse extends EventEmitter {
  private experience = new Experience();
  private sizes: Sizes | null = this.experience.sizes;
  public top = 0;
  public left = 0;
  public xCenterBase = 0;
  public yCenterBase = 0;
  public webglX = 0;
  public webglY = 0;
  public isInScreen = false;
  public speedX = 0;
  public speedY = 0;

  constructor() {
    super();

    //Mouse event
    window.addEventListener("mousemove", (e) => this.update(e));
    document.addEventListener("mouseenter", () => this.setIsInScreen(true));
    document.addEventListener("mouseleave", () => this.setIsInScreen(false));
    document.addEventListener("mousedown", () => this.mouseDown());
    document.addEventListener("mouseup", () => this.mouseUp());
  }

  update(e: globalThis.MouseEvent) {
    this.top = e.clientY;
    this.left = e.clientX;
    if (e.clientX < window.innerWidth / 2) {
      this.xCenterBase = -(window.innerWidth / 2 - e.clientX);
    } else {
      this.xCenterBase = e.clientX - window.innerWidth / 2;
    }

    if (e.clientY < window.innerHeight / 2) {
      this.yCenterBase = window.innerHeight / 2 - e.clientY;
    } else {
      this.yCenterBase = -(e.clientY - window.innerHeight / 2);
    }
    if (this.sizes?.viewSizeAtDepth) {
      this.webglX =
        (this.sizes.viewSizeAtDepth?.width * this.xCenterBase) /
        window.innerWidth;
      this.webglY =
        (this.sizes.viewSizeAtDepth?.height * this.yCenterBase) /
        window.innerHeight;
    }
    if (this.isInScreen === false) this.setIsInScreen(true);
    this.trigger("mousemove");
  }

  mouseDown(){
    this.trigger("mousedown");
  }
  mouseUp(){
    this.trigger("mouseup");
  }

  setIsInScreen(state: boolean) {
    this.trigger("mouseSwitch");
    if (state) {
      this.trigger("mouseEnter");
    } else {
      this.trigger("mouseLeave");
    }
    this.isInScreen = state;
  }

  destroy() {
    window.removeEventListener("mousemove", (e) => this.update(e));
    document.removeEventListener("mouseenter", () => this.setIsInScreen(true));
    document.removeEventListener("mouseleave", () => this.setIsInScreen(false));
    document.removeEventListener("mousedown", () => this.mouseDown());
    document.removeEventListener("mouseup", () => this.mouseUp());
  }
}
