const cardArray = [
  {
    name: "apple",
    img: "./assets/img/apple.png",
  },
  {
    name: "apple",
    img: "./assets/img/apple.png",
  },
  {
    name: "banana",
    img: "./assets/img/banana.png",
  },
  {
    name: "banana",
    img: "./assets/img/banana.png",
  },
  {
    name: "basket",
    img: "./assets/img/empty-basket.png",
  },
  {
    name: "basket",
    img: "./assets/img/empty-basket.png",
  },
  {
    name: "grapes",
    img: "./assets/img/grapes.png",
  },
  {
    name: "grapes",
    img: "./assets/img/grapes.png",
  },
  {
    name: "lemon",
    img: "./assets/img/lemon.png",
  },
  {
    name: "lemon",
    img: "./assets/img/lemon.png",
  },
  {
    name: "mango",
    img: "./assets/img/mango.png",
  },
  {
    name: "mango",
    img: "./assets/img/mango.png",
  },
];
//Declaring variables
cardArray.sort(() => 0.5 - Math.random());
const wrapper = document.querySelector(".wrapper");
const board = document.querySelector(".board");
// const resultDisplay = document.querySelector("#result");
const start = document.querySelector("#start");
const restart = document.querySelector("#restart");
const timer = document.querySelector(".timer");
const counter = document.querySelector("#counter");

// let scoreList = {};
// let highScores = [];

// let h2 = document.querySelector("#game-score");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let timeLeft, myTimer, scoreTime;
// let userId = 1000;

//adding event listener to start
start.addEventListener("click", (e) => {
  e.preventDefault();
  createBoard();
  wrapper.classList.remove("hide");
  // timer.classList.remove("hide");
  start.classList.add("hide");
  timeLeft = startTimer(counter);
  // userId++;
});

//adding event listener to restart
restart.addEventListener("click", () => {
  setTimeout(() => {
    location.reload();
  }, 100);
});

// //adding event listener to restart 2
// restart.addEventListener("click", (e) => {
//   while (board.firstChild) {
//     board.removeChild(board.firstChild);
//   }
//   board.classList.add("hide");
//   timer.classList.add("hide");
//   start.classList.remove("hide");
// });

//creating board for images
function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    let card = document.createElement("img");
    card.setAttribute("src", "./assets/img/rainbow.jpg");
    card.classList.add("img");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    board.appendChild(card);
    board.style.justifyContent = "center";
    wrapper.appendChild(board);
  }
}
//checking for the matched image
function checkForMatch() {
  let cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (optionOneId === optionTwoId) {
    alert("Don't press the same thing!!");
    cards[optionOneId].setAttribute("src", "./assets/img/rainbow.jpg");
    cards[optionTwoId].setAttribute("src", "./assets/img/rainbow.jpg");
  } else if (cardsChosen[0] === cardsChosen[1]) {
    cards[optionOneId].setAttribute("src", "./assets/img/blank.png");
    cards[optionTwoId].setAttribute("src", "./assets/img/blank.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "./assets/img/rainbow.jpg");
    cards[optionTwoId].setAttribute("src", "./assets/img/rainbow.jpg");
  }
  cardsChosen = [];
  cardsChosenId = [];
  // resultDisplay.textContent = cardsWon.length;
  if (cardsWon.length === cardArray.length / 2) {
    clearInterval(myTimer);
    let tempTime = counter.innerText.split(":");
    scoreTime = 30 - parseInt(tempTime[1]);
    board.classList.add("hide");
    timer.classList.add("hide");
    let h2 = document.createElement("h2");
    h2.innerText = `Congratulations! You have found them within ${scoreTime} seconds.`;
    h2.classList.add("blink_me");
    h2.style.textAlign = "center";
    wrapper.style.background = "white";
    wrapper.appendChild(h2);
    restart.classList.remove("hide");
    // console.log(`You have found them within ${scoreTime} seconds`);
    // h2.textContent = `You have found them within ${scoreTime} seconds`;
    // score.insertBefore(h2, restart);
  }
}
//flipping cards
function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 300);
  }
}

function startTimer(display) {
  let remtimer = 30,
    timeLeft = 0;
  myTimer =
    (remtimer,
    setInterval(() => {
      timeLeft = remtimer--;
      timeLeft < 10
        ? (display.textContent = "00 : 0" + timeLeft)
        : (display.textContent = "00 : " + timeLeft);

      if (timeLeft < 0) {
        clearInterval(myTimer);
        board.classList.add("hide");
        timer.classList.add("hide");
        let h2 = document.createElement("h2");
        h2.innerText = `GAME OVER!`;
        h2.classList.add("blink_me");
        h2.style.textAlign = "center";
        wrapper.style.background = "white";
        wrapper.appendChild(h2);
        restart.classList.remove("hide");
      }
    }, 1000));
}

// createBoard();
