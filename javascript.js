const container = document.querySelector('#container');
const gridWidth = window.getComputedStyle(container).getPropertyValue("width").replace("px","");
const gridGap = window.getComputedStyle(container).getPropertyValue("gap").replace("px","");

const resizeButton = document.querySelector(".resize")

function createGrid(n) {
    const l = calculateGridSquareSize(n)
    for (i=0;i<n**2;i++) {
        const div = document.createElement("div");
        div.style.backgroundColor="powderBlue";
        div.style.width=`${l}px`;
        div.style.height=`${l}px`;
        div.id=`square-${i}`;
        container.appendChild(div);
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
        let selectorString = '#'+squareId

        const pointerSquare = document.querySelector(selectorString)
        pointerSquare.style.backgroundColor="red"
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


