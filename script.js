const words = ['javascript', 'hangman', 'programming', 'website', 'college'];

let selectedWord = '';
let guessedWord = [];
let wrongGuesses = [];
const maxWrongGuesses = 6;

const wordElement = document.getElementById('word');
const lettersElement = document.getElementById('letters');
const wrongGuessesElement = document.getElementById('wrong-guesses');
const restartButton = document.getElementById('restart');
const messageElement = document.getElementById('message');

// Initialize the game
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)]; //choose a random word from the array
    guessedWord = Array(selectedWord.length).fill('_'); //array of underscores equal to word length
    wrongGuesses = [];
    updateDisplay();
    messageElement.textContent = '';
}

// Display the word and wrong guesses
function updateDisplay() {
    wordElement.textContent = guessedWord.join(' ');
    wrongGuessesElement.textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
}

// Handle letter click
function handleGuess(letter) {
    if (wrongGuesses.includes(letter) || guessedWord.includes(letter)) {
        return;
    }

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        wrongGuesses.push(letter);
    }

    checkGameStatus();
    updateDisplay();
}

// Check if the game is won or lost
function checkGameStatus() {
    if (!guessedWord.includes('_')) {
        messageElement.textContent = 'You won!';
        disableLetters();
    } else if (wrongGuesses.length >= maxWrongGuesses) {
        messageElement.textContent = `You lost! The word was "${selectedWord}".`;
        disableLetters();
    }
}

// Disable letter buttons after the game is over
function disableLetters() {
    document.querySelectorAll('.letter').forEach(button => {
        button.disabled = true;
    });
}

// Generate letter buttons dynamically
function generateLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let letter of alphabet) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter');
        button.addEventListener('click', () => handleGuess(letter));
        lettersElement.appendChild(button);
    }
}

// Restart the game
restartButton.addEventListener('click', () => {
    document.querySelectorAll('.letter').forEach(button => {
        button.disabled = false;
    });
    guessedWord = [];
    wrongGuesses = [];
    startGame();
});

// Initial setup
generateLetters();
startGame();
