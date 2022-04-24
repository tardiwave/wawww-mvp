import "./styles/style.scss";
import Experience from "./webgl/Experience";
import anime from "animejs";
new Experience(document.getElementById("canvas") as HTMLCanvasElement);
anime({
  targets: ".divCont",
  translateY: -21,
  duration: 1400,
  easing: "easeInOutQuad",
});
anime({
  targets: ".socialHideSeparator",
  height: [21, 0],
  duration: 1400,
  easing: "easeInOutQuad",
  delay: 700,
});
