const actions = [
  "Call client",
  "Review pull request",
  "Write documentation",
  "Plan sprint",
  "Fix bugs",
  "Design prototype",
  "Refactor module",
  "Check metrics",
  "Sync with team"
];

const gridEl = document.getElementById("grid");
const controlsEl = document.getElementById("controls");
const controlsLabelEl = document.getElementById("controls-label");
const controlsYesBtn = document.getElementById("controls-yes");
const controlsNoBtn = document.getElementById("controls-no");

let selectedIndex = null;
const badges = [];

function renderGrid() {
  gridEl.innerHTML = "";
  badges.length = 0;

  actions.forEach((label, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.index = String(index);

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
      selectedIndex = index;
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

document.addEventListener("DOMContentLoaded", renderGrid);
