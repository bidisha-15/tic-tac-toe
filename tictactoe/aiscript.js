let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-button");
let newgame = document.querySelector("#new-button");
let msgcontainer = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");
let game = document.getElementsByClassName(".container");
let land = document.getElementsByClassName(".cont");

let board = ["", "", "", "", "", "", "", "", ""];
let turnO = true; // Player 'O' is the human
let gameStarted = false; // Flag to check if the game has started
let gameActive = true; // To control game flow

// Initially disable the reset button
reset.disabled = true;

boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index), { once: true });
});

function handleClick(index) {
    if (!gameActive || board[index] !== "") 
        return;

    // Human player makes a move
    board[index] = "O";
    boxes[index].innerText = "O";
    turnO = false;
    reset.disabled = false; // Enable reset after first move
    checkWinner();

    // Computer (AI) makes a move if the game is still active
    if (gameActive) {
        let bestMove = findBestMove();
        board[bestMove] = "X";
        boxes[bestMove].innerText = "X";
        checkWinner();
    }
}

// Check if someone won or if it's a draw
const checkWinner = () => {
    const winPat = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPat) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            showWinner(board[a]);
            return;
        }
    }

    // Check for a draw
    if (!board.includes("")) {
        msg.innerText = "It's a draw!";
        msgcontainer.classList.remove("hide");
        gameActive = false;
    }
}

// Show the winner and end the game
const showWinner = (winner) => {
    msg.innerText = `Congrats, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    gameActive = false;
}

// Reset the game
const resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    turnO = true;
    msgcontainer.classList.add("hide");
    boxes.forEach((box) => {
        box.innerText = "";
    });
    reset.disabled = true;
    gameStarted = false;
}

newgame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

// Minimax Algorithm
function minimax(board, isMaximizing) {
    let score = evaluate(board);
    if (score === 10) return score;
    if (score === -10) return score;
    if (!board.includes("")) return 0; // Draw

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X"; // AI move
                best = Math.max(best, minimax(board, false));
                board[i] = ""; // Undo move
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O"; // Human move
                best = Math.min(best, minimax(board, true));
                board[i] = ""; // Undo move
            }
        }
        return best;
    }
}

// Evaluate the board
function evaluate(board) {
    const winPat = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPat) {
        let [a, b, c] = pattern;
        if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
            return 10; // AI wins
        } else if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
            return -10; // Human wins
        }
    }
    return 0; // No winner
}

// Find the best move for the computer
function findBestMove() {
    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "X"; // AI move
            let moveVal = minimax(board, false); // Evaluate the move
            board[i] = ""; // Undo move

            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
}

newgame.addEventListener('click', function() {
    landGame();
});

function landGame() {
    game.classList.add('hide');
    land.classList.remove('hide');
}

// newgame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);