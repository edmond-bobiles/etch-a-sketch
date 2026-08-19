// DOM element references
const sketchContainer = document.querySelector("#sketch-container");
const gridContainer = document.querySelector("#grid-container");
const button = document.querySelector("#button");

// Default grid size
let numberOfSquares = 16;

// Default sketch pad
makeGrid(numberOfSquares);

// Sketchpad maker
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

function removeGrid(){
    gridContainer.textContent = "";
}

// Change grid size using button with popup screen
button.addEventListener("click", () => {
    const popupScreen = document.createElement("div");
    const popup = document.createElement("div");

    const input = document.createElement("input");
    const acceptButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    
    popupScreen.classList.add("popup-screen");
    popup.classList.add("popup");

    // popup -> input, accept, cancel 

    input.type = "number";
    input.placeholder = "Enter grid size";
    input.value = 16;
    input.min = 1;
    input.max = 100;

    acceptButton.textContent = "Accept";
    cancelButton.textContent = "Cancel";

    acceptButton.addEventListener("click", () => {
        removeGrid();
        numberOfSquares = Number(input.value);
        makeGrid(numberOfSquares);
   
        popupScreen.remove();
    });

    cancelButton.addEventListener("click", () => {
        popupScreen.remove();
    });

    popup.appendChild(input);
    popup.appendChild(acceptButton);
    popup.appendChild(cancelButton);

    popupScreen.appendChild(popup);

    sketchContainer.appendChild(popupScreen);

 
});


