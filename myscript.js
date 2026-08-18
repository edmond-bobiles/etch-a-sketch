// DOM element references
const gridContainer = document.querySelector("#grid-container");

// Dynamic UI elements
let count = 1;
for (let i=0; i<16; i++){
    for (let j=0; j<16; j++){
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridContainer.appendChild(gridSquare);
        count++;
    }
}
