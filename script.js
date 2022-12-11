var design = [
  "./pictures/hangman01.png",
  "./pictures/hangman02.png",
  "./pictures/hangman03.png",
  "./pictures/hangman04.png",
  "./pictures/hangman05.png",
  "./pictures/hangman06.png",
  "./pictures/hangman07.png",
  "./pictures/hangman08.png",
  "./pictures/hangman09.png",
  "./pictures/hangman_logo.png",
];

var wordsAvailable = [
  "fourmis",
  "tramway",
  "alternance",
  "formation",
  "araignees",
  "jenesaispas",
];

var letterClicker = document.querySelectorAll(".letter");

var currentWord = "";
var referenceWord = "";

var countFault = 0;

wordToGuess();

Array.from(letterClicker).forEach((letter) => {
  letter.addEventListener("click", (e) => {
    if (isGameOver()) {
      return;
    }
    if (letter.classList[0] === "letter") {
      isLetterOnWord(letter, letter.classList[1]);
    } else {
      return;
    }
    letter.classList.add("bad_click");
    letter.classList.remove("letter");
  });
});

//Take one word which will be the one to guess and make it appears with _ _ _ _ but the first and the last
function wordToGuess() {
  const word =
    wordsAvailable[
      Math.floor(Math.random() * wordsAvailable.length)
    ].toUpperCase();
  const wordSplited = word.split("");
  //console.log(word);

  referenceWord += word.replace(word[0], "$").replace(/.$/, "$");

  currentWord +=
    wordSplited[0] +
    "_".repeat(wordSplited.length - 2) +
    wordSplited[word.length - 1];

  makeWordToGuessVisible(currentWord);
}

//Checks if letter exist on the word
function isLetterOnWord(wholeLetter, letter) {
  if (referenceWord.includes(letter)) {
    if (isGameOver()) {
      return;
    }

    const index = getAllIndexes(letter);
    referenceWord = referenceWord.replaceAll(letter, "$");

    index.forEach((i) => {
      new String(currentWord).replaceAt(i, letter);
    });

    wholeLetter.classList.add("good_click");
    wholeLetter.classList.remove("letter");
  } else {
    changeHangmanDesign();
  }
}

//returns all indexes of a letter from the referenceWord
function getAllIndexes(letter) {
  const indexes = [];

  for (let i = 0; i < referenceWord.length; i++) {
    if (referenceWord[i] === letter) {
      indexes.push(i);
    }
  }
  return indexes;
}

//Replace ALL letters existing on the word
String.prototype.replaceAt = function (index, replacement) {
  var newWord =
    this.substring(0, index) +
    replacement +
    this.substring(parseInt(index) + 1, this.length);
  currentWord = newWord;

  makeWordToGuessVisible(currentWord);
};

//Make the design of the hangman update / appears
function changeHangmanDesign() {
  document.querySelector(".hangman").src = design[countFault];

  countFault += 1;

  if (isGameOver()) {
    document.querySelector(".game_over").style.display = "flex";
    return;
  }
}

//Make the word update / appears
function makeWordToGuessVisible(word) {
  document.querySelector(".word").textContent = word;
}

//check if the game is over, is used to make the key unclickable and the word not changing
function isGameOver() {
  return countFault + 1 === design.length;
}

//We reset all classes we changed during the game and hide the restart button
function resetLettersClickedAndRestartButton() {
  const letters = document.getElementsByTagName("p");

  for (const letter of letters) {
    letter.classList.remove("good_click");
    letter.classList.remove("bad_click");
    letter.classList.remove("letter");
    const currentLetter = letter.classList.value;
    letter.classList.remove(currentLetter);
    letter.classList.add("letter");
    letter.classList.add(currentLetter);
  }

  document.querySelector(".game_over").style.display = "none";
}

//We reset everything if we click on the restart button
document.querySelector(".game_over").addEventListener("click", (e) => {
  currentWord = "";
  referenceWord = "";
  countFault = 0;
  document.querySelector(".hangman").src = "./pictures/hangman_logo.png";

  resetLettersClickedAndRestartButton();
  wordToGuess();
});
