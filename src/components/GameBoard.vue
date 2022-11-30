<script>
import CardView from "./CardView.vue";
import cardData from "../data/memoryCards8.js";

export default {
 
  components: {
    CardView,
  },
  data() {
    return {
      endmessage: `end-message`,
      cardsData: cardData.concat(cardData),
      matchedPairs: 0,
      cardOne: "",
      cardTwo: "",
      disableDeck: false,
      cardDiv: document.querySelector(".game-board"),
      welcome: document.getElementById("welcome"),
      end: document.getElementById("end"),
      startTime: "",
      start: document.getElementById("start"),
      restart: document.getElementById("restart"),
    };
  },
  mounted() {
    this.shuffleCards();
   
  },
  methods: {
    shuffleCards() {
      this.matchedPairs = 0; // reset matchedPairs variable to 0
      this.disableDeck = false; // reset disableDeck boolean
      this.cardOne = "";
      this.cardTwo = ""; // reset cardOne and cardTwo variables
      this.cardsData = this.cardsData.sort(function () {
        return 0.5 - Math.random();
      });
    },
    flipCard(evt) {
      const clickedCard = evt.target; // set the event's target DOM element as a variable
      if (clickedCard.classList.contains("matched")) return;
      if (this.cardOne !== clickedCard && !this.disableDeck) {
        // make sure that the current variable cardOne is not the same value as the clickedCard, AND that the deck is NOT disabled
        clickedCard.classList.add("flip"); // add the 'flip' class to the classes currently assigned to the clickedCard
        if (!this.cardOne) {
          // if there is not yet a value assigned to the cardOne variable...
          return (this.cardOne = clickedCard); // set the cardOne value as the clickedCard and end this function.
        }
        // everything below will execute if the condition above was not met (if cardOne already had a value when flipCard() was called)
        this.cardTwo = clickedCard; // set the cardTwo value as the clickedCard
        this.disableDeck = true; // set this to true for the next time this flipCard function is called, when the top level condition is evaluated
        // if the function has come this far, it means we have set values for both cardOne and cardTwo.
        // each of the cardOne and cardTwo variables currently represent a whole HTML element with childNodes
        let cardOneImg = this.cardOne.querySelector(".back-view img").src; // query the elements inside cardOne to get the value of the img src, such as `img-2.png`, and set that as the value of cardOneImg
        let cardTwoImg = this.cardTwo.querySelector(".back-view img").src; // query the elements inside cardOne to get the value of the img src, such as `img-2.png`, and set that as the value of cardTwoImg
        this.matchCards(cardOneImg, cardTwoImg); // now check the images by filename to see if they are a match!
      }
    },
    matchCards(img1, img2) {
      if (img1 === img2) {
        // this code will run if the card images match
        this.matchedPairs++; // if the card images match, we can increment the global `matchedPairs` variable by 1 match
        if (this.matchedPairs == 8) {
          // if your number of matches is 8, you've made all the matches! Game Won!
          return this.gameOver();
        }
        // everything below will execute if the game has not yet been won...
        this.cardOne.classList.add("matched"); // add a class "matched" so that the flipCard function will not run when these are clicked
        this.cardTwo.classList.add("matched"); // add a class "matched" so that the flipCard function will not run when these are clicked
        this.cardOne = ""; // now reset the cardOne & cardTwo variables to empty strings, so we can use them again
        this.cardTwo = "";
        this.disableDeck = false;
        return; // end function
      }
      setTimeout(() => {
        this.cardOne.classList.add("shake");
        this.cardTwo.classList.add("shake");
      }, 400);

      // these cards didn't match so we'll un-flip them, but let the user see them both before they disappear
      setTimeout(() => {
        this.cardOne.classList.remove("shake", "flip");
        this.cardTwo.classList.remove("shake", "flip");
        this.cardOne = "";
        this.cardTwo = ""; // reset the cardOne & cardTwo variables to empty string
        this.disableDeck = false;
        return;
      }, 1200);
    },
    startGame() {
  console.log("Game started!");
  this.$el.querySelector(".game-board").classList.remove("hidden");
  this.startTime = new Date().getTime();
  this.$el.querySelector("#welcome").classList.add("hidden");

},
gameOver() {
  this.startTime;
  const elapsedTime = new Date().getTime() - this.startTime;
  this.$el.querySelector("#end") = `<img src="https://media.tenor.com/5sR40D64YeAAAAAM/tbbt-the-big-bang-theory.gif"><span class="congrats">Congratz! <i class="confeti"></i><br> <p>You finished in ${elapsedTime / 1000} seconds.</p></span> <button id="restart">Play Again<i class="rocket"></i></button>`;
  this.$el.querySelector(".game-board").classList.add("hidden");
},
  },
};
</script>

<template>
  <div>
    <div id="welcome">
      <div class="welcoming-text">
        <h1>Hi there, welcome to memory game</h1>
        <img class="icon" src="images/waving.png" />
      </div>
      <button type="button" id="start" class="button" v-on:click="startGame">
        Start Game<i class="rocket"></i>
      </button>
    </div>
    <div class="game-board hidden">
      <ul class="cards">
        <li
          v-for="(cardInfo, index) in cardsData"
          :key="index"
          class="card"
          @click="flipCard"
        >
          <CardView viewType="front" />
          <CardView
            viewType="back"
            :imageUrl="cardInfo.url"
            :imageAltText="cardInfo.altText"
          />
        </li>
      </ul>
    </div>
    <div id="end" v-html="end-message"></div>
  </div>
</template>
