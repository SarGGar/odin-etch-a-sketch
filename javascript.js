RANDOMIZE_COLOR = false;

const container = document.querySelector('#container');
const gridWidth = window.getComputedStyle(container).getPropertyValue("width").replace("px","");
const gridGap = window.getComputedStyle(container).getPropertyValue("gap").replace("px","");

const resizeButton = document.querySelector(".resize")


let gridElementCounter = {}
let gridElementColor = {}


const randomBetween = (min, max) => min +Math.floor(Math.random()*(max-min+1));


function createGrid(n) {
    const l = calculateGridSquareSize(n)
    for (i=0;i<n**2;i++) {
        const div = document.createElement("div");
        div.style.backgroundColor="powderBlue";
        div.style.width=`${l}px`;
        div.style.height=`${l}px`;
        div.id=`square-${i}`;
        container.appendChild(div);

        gridElementCounter[div.id]=0;

        const r = randomBetween(0,255);
        const g = randomBetween(0,255);
        const b = randomBetween(0,255);
        const rgb = `rgb(${r},${g},${b})`;
        gridElementColor[div.id]=rgb;
    }
} 

function calculateGridSquareSize(n) {
    const totalGapSpace = gridGap*(n-1);
    const gridSquareSize = (gridWidth-totalGapSpace)/n;
    
    return gridSquareSize
}

createGrid(100)


container.addEventListener('mouseover', (event) => {
    let target = event.target;
    let squareId = target.id;
    if (squareId.split('-')[0]=='square') {
        gridElementCounter[squareId]++
        const color = gridElementColor[squareId]
        let selectorString = '#'+squareId

        const pointerSquare = document.querySelector(selectorString)
        if (RANDOMIZE_COLOR) {
            pointerSquare.style.backgroundColor=color
        } else {
            pointerSquare.style.backgroundColor="red"
        }
        pointerSquare.style.opacity = Math.min(gridElementCounter[squareId]/10, 1.0)
    }
})

resizeButton.addEventListener('click', (event) => {
    let n=0, msg="Enter new grid size (max 100)";
    let newSize = 16

    do {
        n++;
        if (n >1) {
            msg = "Invalid input. Enter new grid size (max 100)";
        }
        newSize = Number(window.prompt(msg, "16"));
    } while (newSize > 100 || newSize < 1)

    container.innerHTML = "";

    createGrid(newSize);

})


