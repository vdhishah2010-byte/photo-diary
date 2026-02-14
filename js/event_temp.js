const params = new URLSearchParams(window.location.search);
let currentIndex = parseInt(params.get("event"));
if (isNaN(currentIndex)) currentIndex = 0;

const event = events[currentIndex];

/* Random soft background */
const colors = ["#f6efe6","#f3eadf","#efe5d8","#f7f1e7","#f2e8db"];
document.body.style.background =
  colors[Math.floor(Math.random() * colors.length)];

document.getElementById("eventTitle").innerText = event.title;

const captionMe = document.getElementById("captionMe");
const captionPartner = document.getElementById("captionPartner");

captionMe.innerText = event.captionMe;
captionPartner.innerText = event.captionPartner;

/* RANDOM CAPTION PLACEMENT */
captionMe.style.top = (15 + Math.random()*20) + "%";
captionMe.style.left = (3 + Math.random()*5) + "%";

captionPartner.style.bottom = (15 + Math.random()*20) + "%";
captionPartner.style.right = (3 + Math.random()*5) + "%";

/* CONTROLLED IMAGE LAYOUT */
const group = document.getElementById("imageGroup");

const imageWidth = 260;
const maxOverlap = 0.06;  // 6% max overlap
const spacing = imageWidth * (1 - maxOverlap);

const totalWidth = spacing * (event.images.length - 1) + imageWidth;

/* Center cluster */
let startX = (group.clientWidth - totalWidth) / 2;
if (startX < 0) startX = 0;

event.images.forEach((src, i) => {

  const polaroid = document.createElement("div");
  polaroid.className = "polaroid";

  const img = document.createElement("img");
  img.src = src;
  polaroid.appendChild(img);

  const rotate = (Math.random() * 10) - 5;

  polaroid.style.left = (startX + i * spacing) + "px";
  polaroid.style.top = (40 + Math.random()*40) + "px";
  polaroid.style.transform = `rotate(${rotate}deg)`;

  group.appendChild(polaroid);

  setTimeout(() => {
    polaroid.classList.add("show");
  }, 150 * i);
});

/* Navigation */
const nextArrow = document.getElementById("nextArrow");

if (currentIndex < events.length - 1) {
  nextArrow.onclick = function () {
    window.location.href = "event.html?event=" + (currentIndex + 1);
  };
} else {
  nextArrow.style.display = "none";
}
