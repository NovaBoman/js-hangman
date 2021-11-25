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

document.querySelector(".guess").addEventListener("input", handleInput); // Event listener for input field

// Handles user input in input field //
function handleInput(e) {
  const regExp = /[a-zA-Z]/; // Defines a regular expression with a pattern to match input to, set to lower/uppercase letters only
  if (e.target.value.match(regExp)) {
    // If the value of the event target (input field) matches the pattern run function guessLetter()
    guessLetter(e.target.value);
  } else {
    // Handles cases where input does not match expected pattern
    console.log("invalid input");
  }
  e.target.value = ""; // Clears input field
}

// Handles valid guesses // - Takes a value (set to value of input field above)
function guessLetter(letter) {
  letter = letter.toLowerCase(); // Transform to lowercase to allow user to input upper and lowercase letters

  if (correctWord.includes(letter)) {
    handleCorrectGuess(letter); // If correct word includes guessed letter run function for correct guess
  } else {
    handleWrongGuess(); // Else run function for wrong guess
  }
  lettersGuessed.push(letter); // Updates array of guessed letters
}
