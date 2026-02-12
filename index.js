containers = document.querySelectorAll("div.wordSpace");
testRow = document.getElementById("testRow");
const winModal = document.getElementById("winModal");
const restartBtn = document.getElementById("restartBtn");
const toast = document.getElementById("toast");




const COLS = 5;
const ROWS = 6;

let col = 0;
let row = 0;



let answer="";



const row1 = "qwertyuiop";
const row2 = "asdfghjkl";
const row3 = ["enter", "z","x","c","v","b","n","m","back"];

function createKeyboard() {
    const row1Div = document.querySelector(".keyboard-1-row");
    const row2Div = document.querySelector(".keyboard-2-row");
    const row3Div = document.querySelector(".keyboard-3-row");


    for (let letter of row1) {
        row1Div.appendChild(createButton(letter));
    }


    for (let letter of row2) {
        row2Div.appendChild(createButton(letter));
    }


    for (let key of row3) {
        row3Div.appendChild(createButton(key));
    }
}

function createButton(value) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = value;
    button.dataset.key = value;   
    return button;
}

createKeyboard();





async function fetchData() {
  try{
    //const response = await fetch("https://random-word-api.herokuapp.com/word?length=5&diff=1");
    const response = await fetch("https://random-words-api.kushcreates.com/api?language=en&category=wordle&length=5&words=1");
    if(!response.ok){   
      throw new Error("Could not get data")
    }
    const data = await response.json();

    return data[0].word
      //return data

  }
  catch(error){
    console.error(error);
  }
    
}

async function checkData(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}



async function startGame() {
  try{
    const data = await fetchData();
    answer = data;
    //answer = data[0];
   // console.log(answer);
   // testRow.textContent = answer;
    enableInput = true;
  }
  catch(e){
    console.error(e);
  }
  
}
let enableInput = false;
startGame();

//let answer = words[Math.floor(Math.random() * words.length)]
//let answer = fetchData();


function showWin() {
  winModal.classList.remove("hidden");
}
function showLose(){
  document.getElementById("h2modal").textContent = "You Lost!";
  document.getElementById("pmodal").textContent = `The correct word was ${answer.toUpperCase()}`;
  winModal.classList.remove("hidden");
}
function hideWin() {
  winModal.classList.add("hidden");
}

function resetGame() {

  row = 0;
  col = 0;




  for (const cell of containers) {
    cell.textContent = "";
    cell.style.backgroundColor = ""; 

  }

  const keys = document.querySelectorAll(".keyboard-module button");

  for (const key of keys) {
    key.style.backgroundColor = "";   
    key.dataset.state = "";           
  }

 
  startGame();
  hideWin();
}

restartBtn.addEventListener("click", resetGame);


function getIndex(r, c){
    return r* COLS +c;
}

function getRowWord(r){
  let string = "";
  for (let c = 0; c < COLS; c++){
    string += containers[getIndex(r, c)].textContent || "";
  }
  return string;
}


function shakeRow(r) {
  for (let c = 0; c < COLS; c++) {
    const cell = containers[getIndex(r, c)];
    cell.classList.add("shake");


    cell.addEventListener("animationend", () => {
      cell.classList.remove("shake");
    }, { once: true });
  }
}




function showToast(text) {
  toast.textContent = text;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  toast.addEventListener("animationend", () => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, { once: true });
}




function checkWord(guess, answer){
    guess = guess.toUpperCase();
    answer = answer.toUpperCase();

    const result = Array(guess.length).fill("gray");
    const counts = new Map(); 

    for(let i=0; i<guess.length; i++){
        if(guess[i]===answer[i]){
            result[i] = "green";
        }
        else{
            const ch = answer[i];
            counts.set(ch, (counts.get(ch) || 0)+1);
        }
    }

    for(let i=0; i<guess.length;i++){
        if(result[i]==="green") continue;

        const ch = guess[i];
        const left = counts.get(ch) || 0;
        if (left>0){
            result[i] = "yellow";
            counts.set(ch, left-1);
        }
    }

    return result;

}

function updateKeyboard(letter, color) {
  const key = document.querySelector(`[data-key="${letter.toLowerCase()}"]`);
  if (!key) return;

  const priority = {
    gray: 1,
    yellow: 2,
    green: 3
  };

  const current = key.dataset.state;
  const currentPriority = priority[current] || 0;
  const newPriority = priority[color];
  if (newPriority > currentPriority) {
    key.dataset.state = color;

    key.style.backgroundColor = "d3d6da"; 
 

    if(color=="green"){
      key.style.backgroundColor = "green"; 
    }
    else if(color=="yellow"){
      key.style.backgroundColor = "hsl(59, 70%, 41%)";
    }
    else{
      key.style.backgroundColor = "gray";
    }

  }

}




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function colorTiles(colors){
  enableInput = false;

  for(let i=0;i<colors.length;i++){

    tile = document.getElementById(getIndex(row,i));
    const letter = tile.textContent;

    tile.classList.add("flip");
    await sleep(200);

    if(colors[i]=="green"){
      tile.style.backgroundColor = "green"; 
    }
    else if(colors[i]=="yellow"){
      tile.style.backgroundColor = "hsl(59, 70%, 41%)";
    }
    else{
      tile.style.backgroundColor = "gray";
    }
    await sleep(200);
    tile.classList.remove("flip");
    updateKeyboard(letter, colors[i]);
        }
  enableInput = true;
}

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  let key = e.key;

  if (key === "Backspace") key = "Backspace";
  if (key === "Enter") key = "Enter";

  handleKey(key);
});


document.querySelector(".keyboard-module")
  .addEventListener("click", (e) => {

    if (e.target.tagName !== "BUTTON") return;

    let key = e.target.dataset.key;

    if (key === "back") key = "Backspace";
    if (key === "enter") key = "Enter";

    handleKey(key);
});


async function handleKey(key) {
  if (!enableInput) return;
  if (row >= ROWS) return;

  const regex = /^[a-z]$/i;


  if (regex.test(key)) {
    if (col < COLS) {
      containers[getIndex(row, col)].textContent = key.toUpperCase();
      col++;
    }
    return;
  }


  if (key === "Backspace") {
    if (col > 0) {
      col--;
      containers[getIndex(row, col)].textContent = "";
    }
    return;
  }


  if (key === "Enter") {
    if (col !== COLS) return;

    const guess = getRowWord(row).toLowerCase();
    const isValidWord = await checkData(guess);

    if (!isValidWord) {
      shakeRow(row);
      showToast("Your word is incorrect!");
      return;
    }

    const colors = checkWord(guess, answer);
    await colorTiles(colors);

    if (guess === answer) {
      showWin();
      return;
    }

    row++;
    col = 0;

    if (row === ROWS) {
      showLose();
    }
  }
}
