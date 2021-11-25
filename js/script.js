// Global Variables //
const wordList = ["green", "red", "purple"]; // Word list array from which to choose random word
let correctWord = ""; // Randomly chosen word from word list
let currentWord = []; // Chosen word to be displayed to user
let wrongGuesses = 0; // Tracker for amount of wrong guesses
let lettersGuessed = []; // Tracker for guessed letters

document.querySelector(".start-game").addEventListener("click", startGame); // Event listener for start button

// Starts the game //
function startGame() {
  correctWord = wordList[Math.floor(Math.random() * wordList.length)]; // Assigns correctWord by randomly choosing a word from wordList
  currentWord = []; // Resets variables every time a new game starts
  lettersGuessed = [];
  wrongGuesses = 0;

  // Depending on the length of correctWord, fills currentWord array with placeholder '_' on each index
  for (let i = 0; i < correctWord.length; i++) {
    currentWord.push("_");
  }
  document.querySelector(".current-word").innerHTML = currentWord.join(""); // Creates string from currentWord and displays to user using p-tag.
}
