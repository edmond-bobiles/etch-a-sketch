// DOM element references
const gridContainer = document.querySelector("#grid-container");
const button = document.querySelector("#button");

let numberOfSquares = 16;

// Dynamic UI elements
for (let i=0; i<numberOfSquares; i++){
    for (let j=0; j<numberOfSquares; j++){
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.addEventListener("mouseover", () => {
            gridSquare.style.backgroundColor = "blue";
        });
        gridContainer.appendChild(gridSquare);
    }
}



// add event listener to when the button is clicked
// send a popup screen 
// inside it is a prompt on the number of squares per side
