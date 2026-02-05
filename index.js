containers = document.querySelectorAll("div.wordSpace");
testRow = document.getElementById("testRow");
const winModal = document.getElementById("winModal");
const restartBtn = document.getElementById("restartBtn");
const toast = document.getElementById("toast");


const words = [
"ABOUT","ABOVE","ABUSE","ACTOR","ACUTE","ADMIT","ADOPT","ADULT","AFTER","AGAIN",
"AHEAD","ALARM","ALBUM","ALERT","ALIKE","ALIVE","ALLOW","ALONE","ALONG","ALTER",
"AMONG","ANGER","ANGLE","ANGRY","APART","APPLE","APPLY","ARENA","ARGUE","ARISE",
"ARMED","ARRAY","ASIDE","ASSET","AUDIO","AVOID",

"BADLY","BAKER","BASIC","BASIS","BEACH","BEGAN","BEGIN","BEING","BELOW","BENCH",
"BIRTH","BLACK","BLAME","BLIND","BLOCK","BLOOD","BOARD","BOOST","BOOTH","BOUND",
"BRAIN","BRAND","BRAVE","BREAD","BREAK","BRICK","BRIEF","BRING","BROAD","BROKE",
"BROWN","BUILD","BUILT","BUYER",

"CABLE","CALIF","CARRY","CATCH","CAUSE","CHAIN","CHAIR","CHART","CHASE","CHEAP",
"CHECK","CHEST","CHIEF","CHILD","CHINA","CHOSE","CIVIL","CLAIM","CLASS","CLEAN",
"CLEAR","CLICK","CLOCK","CLOSE","COACH","COAST","COULD","COUNT","COURT","COVER",
"CRAFT","CRASH","CRIME","CROSS","CROWD","CROWN",

"DAILY","DANCE","DATED","DEALT","DEATH","DEBUT","DELAY","DEPTH","DOING","DOUBT",
"DOZEN","DRAFT","DRAMA","DRAWN","DREAM","DRESS","DRINK","DRIVE","DROVE",

"EARLY","EARTH","EIGHT","ELDER","ELECT","ELITE","EMPTY","ENEMY","ENJOY","ENTER",
"ENTRY","EQUAL","ERROR","EVENT","EVERY","EXACT","EXIST","EXTRA",

"FAITH","FALSE","FAULT","FIBER","FIELD","FIFTH","FIFTY","FIGHT","FINAL","FIRST",
"FIXED","FLASH","FLEET","FLOOR","FOCUS","FORCE","FORTH","FORTY","FORUM","FOUND",
"FRAME","FRANK","FRAUD","FRESH","FRONT","FRUIT","FULLY","FUNNY",

"GIANT","GIVEN","GLASS","GLOBE","GOING","GRACE","GRADE","GRAND","GRANT","GRAPE",
"GRASS","GREAT","GREEN","GROSS","GROUP","GROWN","GUARD","GUESS","GUEST","GUIDE",

"HAPPY","HARRY","HEART","HEAVY","HENCE","HORSE","HOTEL","HOUSE","HUMAN",

"IDEAL","IMAGE","INDEX","INNER","INPUT","ISSUE",

"JOINT","JUDGE","JUICE",

"KNOWN",

"LABEL","LABOR","LARGE","LASER","LATER","LAUGH","LAYER","LEARN","LEASE","LEAST",
"LEAVE","LEGAL","LEVEL","LIGHT","LIMIT","LOCAL","LOGIC","LOOSE","LOWER","LUCKY",

"MAGIC","MAJOR","MAKER","MARCH","MATCH","MAYBE","MEANT","MEDIA","METAL","MIGHT",
"MINOR","MINUTE","MIXED","MODEL","MONEY","MONTH","MORAL","MOTOR","MOUNT","MOUSE",
"MOUTH","MOVIE","MUSIC",

"NEEDS","NEVER","NEWLY","NIGHT","NOISE","NORTH","NOVEL","NURSE",

"OCCUR","OCEAN","OFFER","OFTEN","ORDER","OTHER","OUGHT","OWNER",

"PAINT","PANEL","PAPER","PARTY","PEACE","PHASE","PHONE","PHOTO","PIECE","PILOT",
"PITCH","PLACE","PLAIN","PLANE","PLANT","PLATE","POINT","POUND","POWER","PRESS",
"PRICE","PRIDE","PRIME","PRINT","PRIOR","PRIZE","PROOF","PROUD",

"QUEEN","QUICK","QUIET","QUITE",

"RADIO","RAISE","RANGE","RAPID","RATIO","REACH","READY","REFER","RIGHT","RIVER",
"ROBOT","ROUGH","ROUND","ROUTE","ROYAL","RURAL",

"SCALE","SCENE","SCOPE","SCORE","SENSE","SERVE","SEVEN","SHALL","SHAPE","SHARE",
"SHEET","SHELF","SHIFT","SHINE","SHIRT","SHOCK","SHOOT","SHORT","SHOWN","SIGHT",
"SINCE","SKILL","SMALL","SMART","SMILE","SMOKE","SOLID","SOLVE","SORRY","SOUND",
"SOUTH","SPACE","SPARE","SPEAK","SPEED","SPEND","SPENT","SPLIT","SPORT","STAFF",
"STAGE","STAND","START","STATE","STEEL","STICK","STILL","STOCK","STONE","STORE",
"STORM","STORY","STRIP","STUCK","STUDY","STYLE","SUGAR","SUITE","SUPER","SWEET",

"TABLE","TAKEN","TASTE","TEACH","THANK","THEIR","THEME","THERE","THICK","THING",
"THINK","THIRD","THOSE","THREE","THROW","TIGHT","TIMES","TIRED","TITLE","TODAY",
"TOPIC","TOTAL","TOUCH","TOUGH","TOWER","TRACK","TRADE","TRAIN","TREAT","TREND",
"TRIAL","TRIED","TRUCK","TRULY","TRUST","TRUTH","TWICE",

"UNDER","UNION","UNITY","UNTIL","UPPER","URBAN","USUAL",

"VALID","VALUE","VIDEO","VISIT","VITAL","VOICE",

"WASTE","WATCH","WATER","WHEEL","WHERE","WHILE","WHITE","WHOLE","WHOSE","WOMAN",
"WORLD","WORRY","WORTH","WOULD","WRITE","WRONG",

"YIELD","YOUNG"
];

const COLS = 5;
const ROWS = 6;

let col = 0;
let row = 0;



let answer="";

async function fetchData() {
  try{
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5&diff=2");
    if(!response.ok){   
      throw new Error("Could not get data")
    }       
    return await response.json();

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
    answer = data[0];
    console.log(answer);
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

let i=0;
const regex = /^[a-z]$/i;

document.addEventListener("keydown", async (e) => {
    if (!enableInput) return;
    if(e.repeat) return;

    if(row >= ROWS) return;

    if(regex.test(e.key)){
        if(col < COLS) {
            containers[getIndex(row, col)].textContent=e.key.toUpperCase();
            col++;
        }
        return;
    }
    if(e.key==="Backspace"){
        if(col > 0){
            col--;
            containers[getIndex(row,col)].textContent="";
        }
        return;
    }

    if(e.key==="Enter"){
        if (col !==COLS) return;
    
        const guess = getRowWord(row).toLowerCase();
        const isValidWord = await checkData(guess);

        let colors;

        if(isValidWord){
          colors =  checkWord(guess,answer);
        }
        else{
            shakeRow(row);
            showToast("Your word is incorrect!");
            return;
        }

        for(let i=0;i<colors.length;i++){
            if(colors[i]=="green"){
                document.getElementById(getIndex(row,i)).style.backgroundColor = "green"; 
            }
            else if(colors[i]=="yellow"){
                document.getElementById(getIndex(row,i)).style.backgroundColor = "hsl(59, 70%, 41%)";
            }
            else{
                document.getElementById(getIndex(row,i)).style.backgroundColor = "gray";
            }
        }

        if (guess === answer) {
            showWin();
            return;
        }



        row++;
        col = 0;
        
    }

});