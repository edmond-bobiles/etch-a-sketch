// DOM element references
const sketchContainer = document.querySelector("#sketch-container");
const gridContainer = document.querySelector("#grid-container");
const button = document.querySelector("#button");

// Default grid size
let numberOfSquares = 16;

// Default sketch pad
makeGrid(numberOfSquares);

// Create grid
function makeGrid(numberOfSquares) {
    for (let i = 0; i < numberOfSquares; i++) {
        for (let j = 0; j < numberOfSquares; j++) {
            const gridSquare = document.createElement("div");
            // aspect-square + border, had to look up "box-sizing" equivalent -> border-box is default in Tailwind's preflight
            gridSquare.classList.add("aspect-square", "border", "border-gray-400", "box-border");

            const squareSize = 100 / numberOfSquares;
            gridSquare.style.flexBasis = squareSize + "%";

            gridSquare.addEventListener("mouseover", () => {
                gridSquare.classList.add("bg-blue-600");
            });

            gridContainer.appendChild(gridSquare);
        }
    }
}

// Remove current grid
function removeGrid() {
    gridContainer.textContent = "";
}

// Change grid size using button with popup screen
button.addEventListener("click", () => {
    const popupScreen = document.createElement("div");
    const popup = document.createElement("div");

    const input = document.createElement("input");
    const errorMessage = document.createElement("p");

    const acceptButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    // popup-screen: fixed overlay covering the whole page, dark background
    // "inset-0" was new to me, docs say it's shorthand for top/right/bottom/left: 0
    popupScreen.classList.add(
        "fixed", "inset-0", "bg-black/50",
        "flex", "justify-center", "items-center"
    );

    // popup: the white card in the middle
    popup.classList.add(
        "bg-white", "p-8", "rounded-lg", "shadow-lg",
        "flex", "flex-col", "gap-3", "w-64"
    );

    // error-message
    errorMessage.classList.add("m-0", "text-red-500", "text-sm", "text-center");

    // Input values
    input.type = "number";
    input.placeholder = "Enter grid size";
    input.value = numberOfSquares;
    input.min = 1;
    input.max = 100;
    // basic input styling, still not 100% sure about all the focus: variants but this looked decent
    input.classList.add(
        "border", "border-gray-300", "rounded", "px-3", "py-2",
        "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "text-center"
    );

    // Buttons
    acceptButton.textContent = "Accept";
    acceptButton.classList.add(
        "bg-blue-500", "hover:bg-blue-600", "text-white",
        "font-semibold", "px-3", "py-2", "rounded", "transition"
    );

    cancelButton.textContent = "Cancel";
    cancelButton.classList.add(
        "bg-gray-200", "hover:bg-gray-300", "text-gray-800",
        "font-semibold", "px-3", "py-2", "rounded", "transition"
    );

    // Error message
    errorMessage.textContent = "";

    acceptButton.addEventListener("click", () => {
        numberOfSquares = Number(input.value);

        if (numberOfSquares >= 1 && numberOfSquares <= 100) {
            removeGrid();
            makeGrid(numberOfSquares);
            popupScreen.remove();
        } else {
            errorMessage.textContent = "Please enter a number between 1 and 100.";
        }
    });

    cancelButton.addEventListener("click", () => {
        popupScreen.remove();
    });

    // sketch-container -> popupscreen -> popup -> input, error, accept, cancel
    popup.appendChild(input);
    popup.appendChild(errorMessage); // <-- this was missing before, that's why the error never showed!
    popup.appendChild(acceptButton);
    popup.appendChild(cancelButton);

    popupScreen.appendChild(popup);

    sketchContainer.appendChild(popupScreen);
});