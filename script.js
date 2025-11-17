const actions = [
  "Hugs",
  "Shoulder Pat",
  "Side Hug",
  "Sitting Close",
  "Holding Arm",
  "Play Fighting",
  "Head Rest on Shoulder",
  "Hand Holding"
];

const gridEl = document.getElementById("grid");
const controlsEl = document.getElementById("controls");
const controlsLabelEl = document.getElementById("controls-label");
const controlsYesBtn = document.getElementById("controls-yes");
const controlsNoBtn = document.getElementById("controls-no");

let selectedIndex = null;
const badges = [];
const cards = [];

function renderGrid() {
  gridEl.innerHTML = "";
  badges.length = 0;
  cards.length = 0;

  actions.forEach((label, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.index = String(index);

    cards[index] = card;

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = label;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = "Click to choose Yes or No";

    badges[index] = badge;

    card.appendChild(title);
    card.appendChild(badge);

    card.addEventListener("click", () => {
      if (selectedIndex !== null && cards[selectedIndex]) {
        cards[selectedIndex].classList.remove("card--selected");
      }
      selectedIndex = index;
      card.classList.add("card--selected");
      controlsLabelEl.textContent = `Selected action: ${label}`;
      controlsEl.hidden = false;
    });

    gridEl.appendChild(card);
  });
}

controlsYesBtn.addEventListener("click", () => {
  if (selectedIndex === null) return;
  const label = actions[selectedIndex];
  console.log(`Action "${label}": YES`);
  const badge = badges[selectedIndex];
  if (badge) {
    badge.textContent = "You chose: Yes";
  }
  launchConfetti();
});

controlsNoBtn.addEventListener("click", () => {
  if (selectedIndex === null) return;
  const label = actions[selectedIndex];
  console.log(`Action "${label}": NO`);
  const badge = badges[selectedIndex];
  if (badge) {
    badge.textContent = "You chose: No";
  }
});

function launchConfetti() {
  const container = document.createElement("div");
  container.className = "confetti";

  const colors = ["#f97316", "#22c55e", "#3b82f6", "#eab308", "#ec4899", "#a855f7"];
  const pieces = 80;

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.backgroundColor = colors[i % colors.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    piece.style.animationDuration = `${0.7 + Math.random() * 0.6}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 1500);
}
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  if (controlsEl) {
    controlsEl.hidden = true;
  }
});
