class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }
  pickWord() {
    return `${this.words[Math.floor(Math.random()*this.words.length)]}`
  }
  checkIfLetter(keyCode) {
    return (keyCode >= 65) && (keyCode <= 90);
  }
  checkClickedLetters(letter) {
    return (this.letters.indexOf(letter) === -1) ;
  }
  addCorrectLetter(letter) {
    return this.guessedLetters += letter;
  }
  addWrongLetter(letter) {
    this.letters.push(letter);
    this.errorsLeft --;
  }
  checkGameOver() {
    if(this.errorsLeft === 0){
      return true;
    } else {
      return false;
    }
  }
  checkWinner() {
    for (let i = 0; i < this.secretWord.length; i ++) {
      if(this.guessedLetters.indexOf(this.secretWord[i]) === -1) return false;
    }
    return true;
  }

}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    console.log(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here
  if (!hangman.checkWinner() && !hangman.checkGameOver()) {
    const isLetter = hangman.checkIfLetter(event.keyCode);

    if (isLetter) {
      const isNotClicked = hangman.checkClickedLetters(event.key.toLowerCase());

      if (isNotClicked) {
        const correctLetterIndex = hangman.secretWord.indexOf(event.key);

        if (correctLetterIndex > -1) {
          hangman.addCorrectLetter(event.key);
          hangmanCanvas.writeCorrectLetter(correctLetterIndex);

          const isWinner = hangman.checkWinner();

          if (isWinner) {
            hangmanCanvas.winner();
          }
        } else {
          hangman.addWrongLetter(event.key);

          hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
          hangmanCanvas.drawHangman(hangman.errorsLeft);

          const isGameOver = hangman.checkGameOver();

          if (isGameOver) {
            hangmanCanvas.gameOver();
          }
        }
      }
    } else {
      hangmanCanvas.writeInvalidKeyMessage();
    }
  }
});