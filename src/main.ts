import "./styles/style.scss";
import Experience from "./webgl/Experience";
import anime from "animejs";
import isMobile from "./utils/mobileDetect";
new Experience(document.getElementById("canvas") as HTMLCanvasElement);
let offset = 21;
if (window.innerWidth < 1000) offset = 27;
anime({
  targets: ".divCont",
  translateY: -offset,
  duration: 1400,
  easing: "easeInOutQuad",
});
anime({
  targets: ".socialHideSeparator",
  height: [offset, 0],
  duration: 1400,
  easing: "easeInOutQuad",
  delay: 700,
});

if (isMobile()) {
  let element = document.body;
  element.classList.add("mobile");
}

const mailToClipboard = () => {
  var copyText = "hello@studiowawww.com";
  navigator.clipboard.writeText(copyText);
};

const mail = document.getElementById("mail");
if (mail) mail.addEventListener("click", mailToClipboard);
