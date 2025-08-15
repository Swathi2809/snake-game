const playbord = document.querySelector(".play-board");
const scoredbors=document.querySelector(".score");
const highscoreelement = document.querySelector(".high-score");

let foodx, foody; 
let gameover=false;
let snakex = 5, snakey = 10;
let snakebody = [];
let velocityx = 0;
let velocityy = 0;
let setIntervalid;
let score=0;
let highscore = localStorage.getItem("high-score")||0;
highscoreelement.innerText=`high score: ${highscore}`;

const foodpositionchange = () => {
  foodx = Math.floor(Math.random() * 30) + 1;
  foody = Math.floor(Math.random() * 30) + 1;
};
const handleGameover = ()=>{
    clearInterval(setIntervalid);
    alert("Game is over press ok to start again!!");
    location.reload();
} 
const changeDirection = (e) => {
  if (e.key == "ArrowUp" && velocityy!=1) {
    velocityx = 0;
    velocityy = -1;
  } else if (e.key == "ArrowDown" && velocityy!=-1) {
    velocityx = 0;
    velocityy = 1;
  } else if (e.key == "ArrowLeft" && velocityx!=1) {
    velocityx = -1;
    velocityy = 0;
  } else if (e.key == "ArrowRight" && velocityx!=-1) {
    velocityx = 1;
    velocityy = 0;
  }
};

const initgame = () => {
    if (gameover) return handleGameover();


  let htmlMarkup = `<div class="food" style="grid-area:${foody} / ${foodx}"></div>`;

  if (snakex == foodx && snakey == foody) {
    foodpositionchange();
    snakebody.push([foodx, foody]);
    console.log(snakebody);
    score++;
    highscore = score >= highscore ? score :highscore;
    localStorage.setItem("high-score",highscore);
    scoredbors.innerText=`Score:${score}`;
    
  }

  for (let i = snakebody.length - 1; i > 0; i--) {
    snakebody[i] = snakebody[i - 1];
  }

  snakebody[0] = [snakex, snakey];

  snakex += velocityx;
  snakey += velocityy;

  if(snakex<=0 || snakex>30 || snakey<=0 || snakey>30 ){
   gameover=true;
  }

  for (let i = 0; i < snakebody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area:${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
    if (i !== 0 && snakebody[0][0] === snakebody[i][0] && snakebody[0][1] === snakebody[i][1]) {
    gameover = true;
}



  }


  playbord.innerHTML = htmlMarkup;
};

foodpositionchange();
setIntervalid=setInterval(initgame, 125);

document.addEventListener("keydown", changeDirection);
