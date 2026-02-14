const params = new URLSearchParams(window.location.search);
let currentIndex = parseInt(params.get("event"));
if (isNaN(currentIndex)) currentIndex = 0;

const event = events[currentIndex];

/* ---------------- BACKGROUND ---------------- */
const colors = ["#d9c9b8","#cfbdaa","#c5b29f","#bca895","#b39f8c"];
document.body.style.background =
  colors[Math.floor(Math.random() * colors.length)];

/* ---------------- TITLE ---------------- */
const title = document.getElementById("eventTitle");
title.innerText = event.title;
title.style.position = "absolute";
title.style.top = "40px";
title.style.left = "50%";
title.style.transform = "translateX(-50%)";

const TITLE_SAFE = 160;



/* ---------------- IMAGE GROUP ---------------- */
const group = document.getElementById("imageGroup");
group.innerHTML = "";

/* Track caption rectangles only */
const placed = [];

function overlaps(newRect) {
  return placed.some(rect =>
    !(newRect.right < rect.left ||
      newRect.left > rect.right ||
      newRect.bottom < rect.top ||
      newRect.top > rect.bottom)
  );
}

/* ---------------- TRUE STACKED CLUSTER ---------------- */

/* ---------------- CONTROLLED TOUCHING CLUSTER ---------------- */

const imageWidth = 260;
const imageHeight = 340;

/* 3% overlap */
const maxOverlapPx = imageWidth * 0.03;   // ≈ 8px
const spacing = imageWidth - maxOverlapPx;

const totalWidth = spacing * (event.images.length - 1) + imageWidth;

/* Center the cluster */
let startX = (window.innerWidth - totalWidth) / 2;
const anchorY = TITLE_SAFE + 180;

event.images.forEach((src, index) => {

  const polaroid = document.createElement("div");
  polaroid.className = "polaroid";

  const img = document.createElement("img");
  img.src = src;
  polaroid.appendChild(img);

  group.appendChild(polaroid);

  const left = startX + index * spacing;

  /* small vertical variation */
  const top = anchorY + (Math.random() * 20 - 10);

  /* gentle tilt */
  const rotate = (Math.random() * 20) - 10;

  polaroid.style.position = "absolute";
  polaroid.style.left = left + "px";
  polaroid.style.top = top + "px";
  polaroid.style.transform = `rotate(${rotate}deg)`;

  polaroid.style.zIndex = index + 1;
});


/* Register image cluster area so captions avoid it */

const clusterRect = {
  left: startX,
  top: anchorY - 40,
  right: startX + totalWidth,
  bottom: anchorY + imageHeight + 40
};

placed.push(clusterRect);


/* ---------------- CAPTIONS (NO OVERLAP) ---------------- */

function placeCaption(el, width, height) {

  const margin = 40;
  let attempts = 0;

  while (attempts < 300) {

    const left = margin + Math.random() * (window.innerWidth - width - margin * 2);
    const top = TITLE_SAFE + 60 + Math.random() * (window.innerHeight - TITLE_SAFE - height - 120);



    const rect = {
      left: left,
      top: top,
      right: left + width,
      bottom: top + height
    };

    if (!overlaps(rect)) {
      el.style.position = "absolute";
      el.style.left = left + "px";
      el.style.top = top + "px";
      placed.push(rect);
      return;
    }

    attempts++;
  }
}

const captionMe = document.getElementById("captionMe");
const captionPartner = document.getElementById("captionPartner");

captionMe.innerText = event.captionMe;
captionPartner.innerText = event.captionPartner;

const captionWidth = 340;
const captionHeight = 180;

placeCaption(captionMe, captionWidth, captionHeight);
placeCaption(captionPartner, captionWidth, captionHeight);

captionMe.style.zIndex = 1000;
captionPartner.style.zIndex = 1000;


/* ---------------- NAVIGATION ---------------- */

const nextArrow = document.getElementById("nextArrow");

nextArrow.style.position = "absolute";
nextArrow.style.right = "40px";
nextArrow.style.bottom = "30px";

if (currentIndex < events.length - 1) {
  nextArrow.onclick = function () {
    window.location.href = "event.html?event=" + (currentIndex + 1);
  };
} else {
  nextArrow.style.display = "none";
}
