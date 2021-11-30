/// Global Variables ///
const wordList = [
  "green",
  "red",
  "purple",
  "yellow",
  "black",
  "orange",
  "beige",
  "crimson",
  "teal",
]; // Array from which correctWord is randomly chosen.
let correctWord = "";
let currentWord = []; // Word to be displayed to user.
let wrongGuesses = 0; // Tracks number of wrong guesses.
let guessedLetters = []; // Tracks letters guessed by user.

// Add event listeners for New Game button and input field.
document.querySelector(".guess-input").addEventListener("input", handleInput);
document.querySelector(".new-game").addEventListener("click", startGame);

updateImage();

/// FUNCTIONS ///

// Starts/restarts the game //
/* Randomly selects the correct word then resets global variables. 
   Updates text displayed to the user, enables and focuses input field.
   Creates a string of placeholder "_" from the length of correctWord */
function startGame() {
  correctWord = wordList[Math.floor(Math.random() * wordList.length)]; // Assigns correctWord by randomly choosing a word from wordList.
  currentWord = [];
  guessedLetters = [];
  wrongGuesses = 0;
  updateImage();

  updateMessage("Guess a letter, A-Z");
  document.querySelector(".chances-left").textContent = `Chances left: 
  ${6 - wrongGuesses} / 6`; // Resets counter for chances left.
  document.querySelector(".guess-input").disabled = false; // Enable input when game starts/restarts.
  document.querySelector(".guess-input").focus(); // Focus input field when game starts.
  document.querySelector(".guessed-letters").textContent = "Guesses:";

  // Fills currentWord array with a placeholder '_' on each index.
  for (let i = 0; i < correctWord.length; i++) {
    currentWord.push("_");
  }
  document.querySelector(".current-word").textContent = currentWord.join(" "); // Creates string from currentWord and displays it to the user.
  document.querySelector(".current-word").style.visibility = "visible";
}

// Handles user input in input field //
/*Defines a regular expression with a pattern to match input to, only letter a-z are allowed, flag i makes it case insensitive.
  If the value of the input field is not already in the list of guessed letters and matches the pattern run function guessLetter() */
function handleInput(e) {
  if (
    !guessedLetters.includes(e.target.value) &&
    e.target.value.match(/[a-z]/i)
  ) {
    guessLetter(e.target.value);
  }
  e.target.value = ""; // Clears input field.
}

// Handles valid guesses // - "letter" set to value of input field in function above.
/* Transforms input to lowercase to allow user to input both upper and lowercase letters.
   Checks if letter is included in correctWord and then runs function for correct or wrong guess. */
function guessLetter(letter) {
  letter = letter.toLowerCase();
  if (correctWord.includes(letter)) {
    handleCorrectGuess(letter);
  } else {
    handleWrongGuess();
  }

  // Updates array and string of guessed letters.
  guessedLetters.push(letter);
  document.querySelector(".guessed-letters").textContent =
    guessedLetters.join(" ");
}

// Handles correct guesses //
/* Iterates over array correctWord and looks for occurences of input letter, if found splices it into currentWord on current index.
   Creates a string from currentWord and displays it to the user.
   If the word displayed to the user is exactly equal to correctWord the user wins the game. */
function handleCorrectGuess(letter) {
  for (let i = 0; i < correctWord.length; i++) {
    if (correctWord[i] === letter) {
      currentWord.splice(i, 1, letter);
    }
  }
  document.querySelector(".current-word").textContent = currentWord.join(" ");

  if (currentWord.join("") === correctWord) {
    document.querySelector(".guess-input").disabled = true; // Input is disabled until user starts a New Game.
    updateMessage("You won!");
  }
}

// Handles wrong guesses //
/* Increments wrongGuesses and updates the image accordingly, the user loses after 6 wrong guesses. */
function handleWrongGuess() {
  wrongGuesses++;
  updateImage();
  document.querySelector(".chances-left").textContent = `Chances left: 
  ${6 - wrongGuesses} / 6`; // Counts down chances left.

  if (wrongGuesses === 6) {
    document.querySelector(".guess-input").disabled = true;
    updateMessage("You lost!");
  }
}

// Changes url for the image //
function updateImage() {
  let imageSource = `images/h${wrongGuesses}.png`;
  document.querySelector(".hangman-image").src = imageSource;
}

// Prints messages to user //
function updateMessage(string) {
  document.querySelector(".message-to-user").textContent = string;
}
