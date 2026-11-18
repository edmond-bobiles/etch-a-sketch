const gridContainer = document.querySelector("#grid-container");
const gridSize = document.querySelector("#grid-size");
const drawingColor = document.querySelector("#drawing-color");
const newGridButton = document.querySelector("#button");
const clearButton = document.querySelector("#clear-button");
const dialog = document.querySelector("#grid-dialog");
const form = document.querySelector("#grid-form");
const input = document.querySelector("#grid-input");
const error = document.querySelector("#grid-error");
const cancelButton = document.querySelector("#cancel-button");

let numberOfSquares = 16;

function makeGrid(size) {
    const squares = document.createDocumentFragment();
    gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, minmax(0, 1fr))`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.className = "border-[0.5px] border-slate-100";
        squares.appendChild(square);
    }

    gridContainer.replaceChildren(squares);
    gridSize.textContent = `${size} × ${size}`;
}

function paintSquare(target) {
    if (target.parentElement === gridContainer) {
        target.style.backgroundColor = drawingColor.value;
    }
}

gridContainer.addEventListener("pointerover", (event) => {
    if (event.pointerType === "mouse" || event.buttons > 0) paintSquare(event.target);
});

gridContainer.addEventListener("pointerdown", (event) => {
    paintSquare(event.target);
});

// Touch pointers retain their original target while moving, so find the square under the finger.
gridContainer.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" && event.buttons > 0) {
        paintSquare(document.elementFromPoint(event.clientX, event.clientY) || gridContainer);
    }
});

clearButton.addEventListener("click", () => makeGrid(numberOfSquares));
newGridButton.addEventListener("click", () => {
    input.value = numberOfSquares;
    error.textContent = "";
    input.removeAttribute("aria-invalid");
    dialog.showModal();
    input.focus();
    input.select();
});
cancelButton.addEventListener("click", () => dialog.close());
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const size = Number(input.value);
    if (!input.value || !Number.isInteger(size) || size < 1 || size > 100) {
        error.textContent = "Please enter a whole number between 1 and 100.";
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
    }
    numberOfSquares = size;
    makeGrid(size);
    dialog.close();
});

makeGrid(numberOfSquares);
