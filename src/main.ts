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
  duration: 700,
  easing: "easeOutCirc",
  delay: 700,
});
anime({
  targets: ".socialHideSeparator",
  height: [offset, 0],
  duration: 1400,
  easing: "easeOutCirc",
  delay: 700,
});

if (isMobile()) {
  let element = document.body;
  element.classList.add("mobile");
}

const mailToClipboard = () => {
  var copyText = "hello@studiowawww.com";
  navigator.clipboard.writeText(copyText);
  const notif = document.getElementById("ctcCont");
  if (notif) {
    const tl = anime.timeline({});
    tl.add(
      {
        targets: notif.style,
        opacity: [0, 1],
        duration: 3000,
      },
      0
    );
    tl.add(
      {
        targets: ".hideText",
        translateY: [21, 0],
        duration: 700,
        easing: "easeInOutQuad",
      },
      0
    );
    tl.add(
      {
        targets: notif.style,
        opacity: [1, 0],
        duration: 3000,
      },
      2000
    );
  }
};

const mobileMail = document.getElementById("mobileMail");
if (mobileMail) mobileMail.addEventListener("click", mailToClipboard);
const desktopMail = document.getElementById("desktopMail");
if (desktopMail) desktopMail.addEventListener("click", mailToClipboard);
