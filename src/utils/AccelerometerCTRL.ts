import { Vector2 } from "three";
import EventEmitter from "./EventEmitter";

export default class AccelerometerCTRL extends EventEmitter {
  public isSupported = false;
  public orientation = new Vector2();
  constructor() {
    super();
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((response: any) => {
          if (response == "granted") {
            window.addEventListener(
              "deviceorientation",
              this.handleDeviceMotion.bind(this)
            );
          }
        });
    } else {
      if (window.DeviceOrientationEvent) {
        window.addEventListener(
          "deviceorientation",
          this.handleDeviceMotion.bind(this)
        );
      }
    }
  }

  handleDeviceMotion(e: DeviceOrientationEvent) {
    if (!this.isSupported && this.orientation.x !== 0) this.isSupported = true;
    if (e.beta && e.gamma) {
      this.orientation.x = parseFloat((e.beta / 15 - 2).toFixed(2));
      this.orientation.y = -parseFloat((e.gamma / 15).toFixed(2));
    }
    this.trigger("deviceorientation");
  }

  destroy() {
    window.removeEventListener("deviceorientation", this.handleDeviceMotion);
  }
}
