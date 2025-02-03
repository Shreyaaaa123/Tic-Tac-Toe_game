const board = document.getElementById("board");
const message = document.getElementById("message");
const moveSound = document.getElementById("moveSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");
let cells = [];
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.index = index;
        cellDiv.addEventListener("click", handleClick, { once: true });
        board.appendChild(cellDiv);
        cells[index] = cellDiv;
    });
}

function handleClick(e) {
    const index = e.target.dataset.index;
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    moveSound.currentTime = 0; // Reset sound to start
    moveSound.play();
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    let winner = null;
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winner = gameBoard[a];
            cells[a].classList.add("winning-cell");
            cells[b].classList.add("winning-cell");
            cells[c].classList.add("winning-cell");
        }
    });
    if (winner) {
        message.textContent = `${winner} Wins! 🎉`;
        winSound.play();
        board.childNodes.forEach(cell => cell.removeEventListener("click", handleClick));
    } else if (!gameBoard.includes("")) {
        message.textContent = "It's a Draw! 🤝";
        drawSound.play();
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.textContent = "";
    createBoard();
}

createBoard();
