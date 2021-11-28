// Global Variables //
const wordList = ["green", "red", "purple"]; // Word list array from which to choose random word
let correctWord = ""; // Randomly chosen word from word list
let currentWord = []; // Chosen word to be displayed to user
let wrongGuesses = 0; // Tracker for amount of wrong guesses
let lettersGuessed = []; // Tracker for guessed letters
let imageSource = `images/h${wrongGuesses}.png`;

document.querySelector(".hangman-image").src = imageSource; // Sets the image source for hangman image
document.querySelector(".new-game").addEventListener("click", startGame); // Event listener for start button
document.querySelector(".guess-input").disabled = true; // Disables the input field until the game is started
printMessage("Press 'New Game' to start!");

// Starts the game //
function startGame() {
  correctWord = wordList[Math.floor(Math.random() * wordList.length)]; // Assigns correctWord by randomly choosing a word from wordList
  currentWord = []; // Resets variables every time a new game starts
  lettersGuessed = [];
  wrongGuesses = 0;
  updateImage(wrongGuesses);
  document.querySelector(".guessed-letters").innerHTML = "Guesses:";
  document.querySelector(".chances-left").innerHTML = `Chances left: 
  ${6 - wrongGuesses} / 6`;
  document.querySelector(".guess-input").disabled = false; // Enables input after being disabled when game is won or lost
  document.querySelector(".guess-input").focus();
  printMessage("Guess a letter, A-Z");

  // Depending on the length of correctWord, fills currentWord array with placeholder '_' on each index
  for (let i = 0; i < correctWord.length; i++) {
    currentWord.push("_");
  }
  document.querySelector(".current-word").innerHTML = currentWord.join(" "); // Creates string from currentWord and displays to user using p-tag.
  document.querySelector(".current-word").style.visibility = "visible";
}

document.querySelector(".guess-input").addEventListener("input", handleInput); // Event listener for input field

// Handles user input in input field //
function handleInput(e) {
  if (
    !lettersGuessed.includes(e.target.value) &&
    e.target.value.match(/[a-z]/i)
  ) {
    // Defines a regular expression with a pattern to match input to, only letter a-z are allowed, flag i makes it case insensitive
    // If the value of the input field is not already in the list of guessed letters and matches the pattern run function guessLetter()
    guessLetter(e.target.value);
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
  lettersGuessed.push(letter); // Updates array of guessed letters and returns the updated array
  document.querySelector(".guessed-letters").innerHTML =
    lettersGuessed.join(" ");
}

// Handles correct guesses // - Looks for occurences of letter in correctWord and splices them into currentWord
function handleCorrectGuess(letter) {
  for (let i = 0; i < correctWord.length; i++) {
    if (correctWord[i] === letter) {
      currentWord.splice(i, 1, letter); // Uses variable i to track index number and exchanges '_' for letter in currentWord
    }
  }
  document.querySelector(".current-word").innerHTML = currentWord.join(" "); // Creates string from array and displays currentWord to user
  if (currentWord.join("") === correctWord) {
    document.querySelector(".guess-input").disabled = true; // Disable input when game is won
    printMessage("You won!");
  }
}

// Handles wrong guesses //
function handleWrongGuess() {
  wrongGuesses++;
  updateImage(wrongGuesses);
  document.querySelector(".chances-left").innerHTML = `Chances left: 
  ${6 - wrongGuesses} / 6`;

  if (wrongGuesses === 6) {
    document.querySelector(".guess-input").disabled = true; // Disable input when game is lost
    printMessage("You lost!");
  }
}

// Updates image //
function updateImage(number) {
  imageSource = `images/h${number}.png`; // Changes the url for the image
  document.querySelector(".hangman-image").src = imageSource; // Sets the image source attribute for the HTML element
}

// Prints messages to user //
function printMessage(string) {
  document.querySelector(".message-to-user").innerHTML = string;
}
