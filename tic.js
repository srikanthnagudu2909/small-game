let boxes = document.querySelectorAll(".box");
let resetbtn = document.getElementById("reset");
let newbtn = document.getElementById("newbtn");
let msgcontainer = document.getElementById("msg-container");
let msg = document.getElementById("msg");
let player1Input = document.getElementById("player1");
let player2Input = document.getElementById("player2");
let player1SymbolInput = document.getElementById("player1Symbol");
let player2SymbolInput = document.getElementById("player2Symbol");
let turno = true;
let player1Symbol = "O";
let player2Symbol = "X";
let symbolsChosen=false
const winpattern = [
  [0,1,2],[0,3,6],[0,4,8],
  [1,4,7],[2,5,8],[2,4,6],
  [3,4,5],[6,7,8],
];

const resetgame = () => {
  turno = true;
  enable();
  msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
     if (!symbolsChosen) {
      player1Symbol = player1SymbolInput.value.toUpperCase() || "O";
      player2Symbol = player2SymbolInput.value.toUpperCase() || "X";

      if (player1Symbol === player2Symbol) {
        alert("Players must choose different symbols!");
        player1Symbol = "O";
        player2Symbol = "X";
      }
      symbolsChosen = true;
    }
    if (turno) {
      box.innerHTML = player1Symbol;
      turno = false;
    } else {
      box.innerHTML = player2Symbol;
      turno = true;
    }
    box.disabled = true; // prevent overwriting
    checkwin();
  });
});

const disable = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enable = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

const showmsg = (winnerSymbol) => {
  let winnerName = (winnerSymbol === player1Symbol) 
    ? player1Input.value || "Player 1"
    : player2Input.value || "Player 2";
  msg.innerText = `🎉 Congratulations! ${winnerName} wins with "${winnerSymbol}"`;
  msgcontainer.classList.remove("hide");
  disable();
};

const checkwin = () => {
  for (let pattern of winpattern) {
    let position1 = boxes[pattern[0]].innerHTML;
    let position2 = boxes[pattern[1]].innerHTML;
    let position3 = boxes[pattern[2]].innerHTML;

    if (position1 !== "" && position2 !== "" && position3 !== "") {
      if (position1 === position2 && position2 === position3) {
        console.log("Winner", position1);
        showmsg(position1);
      }
    }
  }
};

newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
resetgame(); 
