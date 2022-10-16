const cards = document.querySelectorAll(".card");
let matchedPairs = 0;
let cardOne, cardTwo;
let disableDeck = false;
let startTime;
let moves = 0;
let timerDiv = document.getElementById('timer');

const cardDiv = document.querySelector(".game-board");
const welcome = document.getElementById("welcome");
const end = document.getElementById("end");
const start = document.getElementById('start');
const scoreIconsDiv = document.getElementById("score-icons");
const countDiv = document.getElementById("count");

start.addEventListener('click', startGame);
cardDiv.addEventListener('click', countMoves);



function timer() {
  let sec = 0;
  timer = setInterval(() => {
    timerDiv.innerHTML = sec + ' seconds passed';
    sec++;
  }, 1000) // each 1 second
}



function countMoves() {
  moves++;
  console.log(moves);
  countDiv.innerHTML = `<p class="moves">Moves: ${moves}</p>`;

}

function changeScore() {

  setTimeout(
    function () {
      document.getElementById('prize1').classList.add('gray-scale');

    }, 50000) //if player cannot complete the game in 50 seconds, the first prize will be grayed out
  setTimeout(
    function () {
      document.getElementById('prize2').classList.add('gray-scale');

    }, 100000); //if player cannot complete the game in 100 seconds, the second prize will be grayed out
  setTimeout(
    function () {
      document.getElementById('prize3').classList.add('gray-scale');

    }, 150000); //if player cannot complete the game in 150 seconds, the third prize will be grayed out




}
function startGame() {
  console.log("Game started!");
  startTime = new Date().getTime();
  cardDiv.classList.remove("hidden");
  scoreIconsDiv.classList.remove("hidden");
  timerDiv.classList.remove("hidden");
  welcome.classList.add("hidden");
  timer();
  changeScore();

}


function gameOver() {
  const elapsedTime = new Date().getTime() - startTime;
  end.innerHTML = `<img src="https://media.tenor.com/5sR40D64YeAAAAAM/tbbt-the-big-bang-theory.gif"><span class="congrats">Congratz! <i class="confeti"></i><br> <p>You finished in ${elapsedTime / 1000} seconds with ${moves} moves.</p></span> <button id="restart" onclick="restartGame()">Play Again<i class="rocket"></i></button>`;
  cardDiv.classList.add("hidden");
  timerDiv.classList.add("hidden");
  scoreIconsDiv.classList.add("hidden");


}

function restartGame() {
  document.location.reload();
}


function shuffleCards() {
  matchedPairs = 0; // reset matchedPairs variable to 0
  disableDeck = false; // reset disableDeck boolean to false
  cardOne = cardTwo = ""; // reset cardOne and cardTwo variables to empty string
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; // create an array of the image numbers, 1-8, twice
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); // randomly sort the array

  cards.forEach((card, i) => {
    // loop over the set of cards. For each card...
    card.classList.remove("flip"); // remove the 'flip' class
    let imgTag = card.querySelector(".back-view img"); // find the back-view image tag by querying all the childNodes of the current card element for the '.back-view img' CSS selector
    imgTag.src = `images/img-${arr[i]}.png`; // set the value of the src attribute on the current imgTag to a numbered filename based on our randomized array
    card.addEventListener("click", flipCard); // add a click event listener to the current card to execute a function `flipCard` when clicked
  });
}

function flipCard(evt) {
  // take an event object's as a scoped variable
  const clickedCard = evt.target; // set the event's target DOM element as a variable
  if (cardOne !== clickedCard && !disableDeck) {
    // make sure that the current variable cardOne is not the same value as the clickedCard, AND that the deck is NOT disabled
    clickedCard.classList.add("flip"); // add the 'flip' class to the classes currently assigned to the clickedCard
    if (!cardOne) {
      // if there is not yet a value assigned to the cardOne variable...
      return (cardOne = clickedCard); // set the cardOne value as the clickedCard and end this function.
    }
    // everything below will execute if the condition above was not met (if cardOne already had a value when flipCard() was called)
    cardTwo = clickedCard; // set the cardTwo value as the clickedCard
    disableDeck = true; // set this to true for the next time this flipCard function is called, when the top level condition is evaluated
    // if the function has come this far, it means we have set values for both cardOne and cardTwo.
    // each of the cardOne and cardTwo variables currently represent a whole HTML element with childNodes
    let cardOneImg = cardOne.querySelector(".back-view img").src; // query the elements inside cardOne to get the value of the img src, such as `img-2.png`, and set that as the value of cardOneImg
    let cardTwoImg = cardTwo.querySelector(".back-view img").src; // query the elements inside cardOne to get the value of the img src, such as `img-2.png`, and set that as the value of cardTwoImg
    matchCards(cardOneImg, cardTwoImg); // now check the images by filename to see if they are a match!
  }
}

function matchCards(img1, img2) {

  if (img1 === img2) {
    // this code will run if the card images match
    matchedPairs++; // if the card images match, we can increment the global `matchedPairs` variable by 1 match
    if (matchedPairs == 8) {
      console.log("you win!");
      // if your number of matches is 8, you've made all the matches! Game Won!
      clearTimeout();
      return gameOver();
    }
    // everything below will execute if the game has not yet been won...
    cardOne.removeEventListener("click", flipCard); // remove the eventlistener so that this matched card cannot be flipped anymore
    cardTwo.removeEventListener("click", flipCard); // remove the eventlistener so that this matched card cannot be flipped anymore
    cardOne = cardTwo = ""; // now reset the cardOne & cardTwo variables to empty strings, so we can use them again
    disableDeck = false;
    return; // end function

  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  // these cards didn't match, un-flip them...
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; // reset the cardOne & cardTwo variables to empty string
    disableDeck = false;
    return;
  }, 1200);
}

flipCard;
shuffleCards();

function popUp() {
  let popuptext = document.getElementById("myPopup");
  popuptext.classList.add("show");
}

function closepopUp() {
  let popuptext = document.getElementById("myPopup");
  popuptext.classList.remove("show");
}