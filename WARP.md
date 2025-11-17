# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

This repository is a small, static front-end app called **Action Grid**. It renders a grid of cards, each representing an "action". Clicking a card reveals **Yes/No** buttons; choosing one logs the choice to the browser console and updates the card badge.

There is **no build system, package manager, or test framework** configured. The app runs directly in the browser using plain HTML, CSS, and JavaScript.

## How to run and develop

### Run the app locally

There is no build step; the app is a static site.

You can either:

- **Open directly in a browser**
  - Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

- **Serve via a simple static server** (recommended for closer-to-production behavior, e.g., correct relative paths):
  - Using Python (if installed):
    - `python -m http.server 8000`
    - Then open `http://localhost:8000/index.html` in a browser.

If you introduce a Node-based dev server (e.g., `vite`, `webpack-dev-server`), update this section with the relevant commands.

### Linting and tests

- No linters or formatters are currently configured (no `package.json`, `eslint`, or similar config files in this repo).
- There is no automated test suite or test runner configured.

If you add tooling (e.g., `npm test`, `eslint`, or a framework like Jest/Vitest), document the exact commands here, including how to run a **single test**.

## High-level architecture

The app is structured as a simple static front-end with three core files:

- `index.html`
  - Declares the document structure and page copy.
  - Contains the main app container:
    - A heading and subtitle explaining the interaction.
    - A `<div id="grid" class="grid"></div>` element where the JavaScript renders the cards.
  - Includes `style.css` for styling and `script.js` for behavior.

- `style.css`
  - Provides layout and visual styling:
    - Page-level styling (`body`, `.app`) to center the app on a dark background.
    - A responsive CSS grid (`.grid`) that lays out cards using `grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))` so the number of columns adjusts with viewport width.
    - Card styling (`.card`, `.card:hover`) for the tile-like look, including hover elevation, borders, and transitions.
    - Button styling (`.btn`, `.btn-yes`, `.btn-no`) for pill-shaped Yes/No buttons with hover/active effects and color schemes (green for Yes, red for No).
    - Badge styling (`.badge`) for the small status text under each card.

- `script.js`
  - Owns all dynamic behavior and is responsible for populating the grid, wiring up event handlers, and tracking each card's current label text in the badge.

### JavaScript behavior (`script.js`)

- **Data model**
  - A simple array `actions` defines the list of card labels (e.g., "Call client", "Review pull request").
  - To add or remove cards, modify this `actions` array; no other changes are needed for the UI to reflect the new list.

- **Rendering flow**
  - `const gridEl = document.getElementById("grid");` captures the grid container from `index.html`.
  - `renderGrid()`:
    - Clears `gridEl.innerHTML`.
    - Iterates over `actions` and, for each label:
      - Creates a `.card` `<button>` container with a `data-index` attribute.
      - Creates a `.card-title` element containing the action label.
      - Creates a `.badge` element starting with the prompt text `"Click to choose Yes or No"`.
      - Creates a `.card-actions` container (initially `hidden = true`) that will hold the Yes/No buttons.
      - Creates **Yes** and **No** buttons with classes `.btn .btn-yes` and `.btn .btn-no`. The displayed labels are `"Yes ✓"` and `"No ✕"` (constructed via a small `.replace` trick to insert Unicode check/cross characters).

- **Event handling and interaction**
  - **Card click behavior**
    - Each card's `click` handler:
      - Hides the `.card-actions` row for all cards (`querySelectorAll(".card-actions")`) except the current one.
      - Toggles `hidden` on the current card's `actionsRow`, so only one card at a time shows its Yes/No buttons.
  - **Yes button**
    - On click:
      - Calls `event.stopPropagation()` so the card click handler doesn't re-toggle the actions row.
      - Logs `Action "<label>": YES` to the browser console.
      - Updates the card's badge to `"You chose: Yes"`.
  - **No button**
    - On click:
      - Also calls `event.stopPropagation()`.
      - Logs `Action "<label>": NO` to the console.
      - Updates the badge to `"You chose: No"`.

- **Initialization**
  - `document.addEventListener("DOMContentLoaded", renderGrid);` ensures the DOM is fully loaded before attempting to access `#grid` and render the cards.

### Extension points for future work

- Add, remove, or rename cards by updating the `actions` array in `script.js`.
- If you introduce state persistence (e.g., saving Yes/No choices to localStorage or a backend API), this will likely attach to the Yes/No button handlers and possibly a new module/fetch layer—document those changes here as they are added.
- If you adopt a build tool or framework (React, Vue, etc.), describe the new entrypoints and how they map back to the current simple HTML/JS structure.
