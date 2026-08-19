// DOM element references
const sketchContainer = document.querySelector("#sketch-container");
const gridContainer = document.querySelector("#grid-container");
const button = document.querySelector("#button");

// Default grid size
let numberOfSquares = 16;

// Default sketch pad
makeGrid(numberOfSquares);

// Create grid
function makeGrid(numberOfSquares){
    for (let i=0; i<numberOfSquares; i++){
        for (let j=0; j<numberOfSquares; j++){
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            const squareSize = 100 / numberOfSquares;
            gridSquare.style.flexBasis = squareSize + "%";
            gridSquare.addEventListener("mouseover", () => {
                gridSquare.style.backgroundColor = "blue";
            });
            gridContainer.appendChild(gridSquare);
        }
    }

}

// Remove current grid
function removeGrid(){
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

    popupScreen.classList.add("popup-screen");
    popup.classList.add("popup");
    errorMessage.classList.add("error-message");

    // Input values
    input.type = "number";
    input.placeholder = "Enter grid size";
    input.value = numberOfSquares;
    input.min = 1;
    input.max = 100;

    // Buttons
    acceptButton.textContent = "Accept";
    cancelButton.textContent = "Cancel";

    // Error message
    errorMessage.textContent = "";

    acceptButton.addEventListener("click", () => {
        numberOfSquares = Number(input.value);

        if (numberOfSquares >= 1 && numberOfSquares <= 100){
            removeGrid();
            makeGrid(numberOfSquares);
            popupScreen.remove();
        }

        else {
            errorMessage.textContent = "Please enter a number between 1 and 100.";
        }
    });
    cancelButton.addEventListener("click", () => {
        popupScreen.remove();
    });

    // sketch-container -> popupscreen -> popup -> input, accept, cancel 
    popup.appendChild(input);
    popup.appendChild(errorMessage);
    popup.appendChild(acceptButton);
    popup.appendChild(cancelButton);

    popupScreen.appendChild(popup);

    sketchContainer.appendChild(popupScreen);

});


