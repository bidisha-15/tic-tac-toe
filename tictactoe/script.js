let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-button");
let newgame = document.querySelector("#new-button");
let msgcontainer = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");
let game = document.getElementsByClassName(".container");
let land = document.getElementsByClassName(".cont");

let turnO = true;
let gameStarted=false;
reset.disabled=true;

boxes.forEach(box => {
    box.addEventListener('click', handleClick, { once: true })
})

function handleClick(e) {
    console.log("clicked");
}

const winPat = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    gameStarted=false;
    reset.disabled=true;
}

const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(!gameStarted){
            reset.disabled=false;
            gameStarted=true;
        }
        if (turnO === true) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congrats, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

// Check for a draw
const checkForDraw = () => {
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        msg.innerText = "It's a draw!";
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
}

const checkWinner = () => {
    for (let pattern of winPat) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner ", pos1val);
                showWinner(pos1val);
                return;
            }
        }
    }

    // If no winner, check for draw
    checkForDraw();
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
