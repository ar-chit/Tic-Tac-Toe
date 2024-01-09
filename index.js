const boxes = document.querySelectorAll('[box]');
const gameInfo = document.querySelector('[current-player]');
const newGameButton = document.querySelector('[new-game-button]');

let player;
let gameGrid;

let winningPositons = [
    ['012'],
    ['345'],
    ['678'],
    ['036'],
    ['147'],
    ['258'],
    ['048'],
    ['246']
];

function initializeGame() {
    player = "X";
    gameGrid = ['', '', '', '', '', '', '', '', ''];
    newGameButton.style.display = 'none';
    gameInfo.innerText = `Current Player: ${player}`;
}

initializeGame();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
});

function handleClick(index) {
    if (gameGrid[index] !== '') return;

    gameGrid[index] = player;
    boxes[index].innerText = player;
    if (player === 'X') {
        player = 'O';
    } else if (player === 'O') {
        player = 'X';
    }
    gameInfo.innerText = `Current Player: ${player}`;
    checkForWinner();
}

function checkForWinner() {
    let xPos = [];
    let oPos = [];
    for (let value in gameGrid) {
        if (gameGrid[value]) {
            if (gameGrid[value] === 'X') {
                xPos.push(value);
            }
            if (gameGrid[value] === 'O') {
                oPos.push(value);
            }
           }
    }

    const xPositions = xPos.map(element => String(element).replace(/,/g, '')).join('');

    const oPositions = oPos.map(element => String(element).replace(/,/g, '')).join('');

    for (let i = 0; i < winningPositons.length; i++){
        if (xPositions.includes(winningPositons[i][0])) {
            gameInfo.innerText = "X Wins!";
            newGameButton.style.display = '';
        }
        if (oPositions.includes(winningPositons[i][0])) {
            gameInfo.innerText = "O Wins!";
            newGameButton.style.display = '';
        }
    }
}

newGameButton.addEventListener('click', () => {
    initializeGame();
    boxes.forEach(box => {
        box.innerText = '';
    })
})
