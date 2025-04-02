let wordToGuess = null;
let wordPromise = null;
// Function that create the call to the URL and returns the 5 letter word
async function getWord() {
    if (wordToGuess) return wordToGuess;
    if (!wordPromise) {
        wordPromise = fetch("https://random-word-api.vercel.app/api?words=1&length=5")
            .then(response => response.json())
            .then(json => {
                wordToGuess = json[0];
                return wordToGuess;
            })
            .catch(error => {
                console.error("Error fetching word:", error);
            });
    }
    return wordPromise;
}

// Function for input control
function validateInput() {
    let inputField = document.getElementById("input-text");
    let errorMessage = document.getElementById("error-message");
    let input = inputField.value.trim(); // Removing extra spacing
    // Simple if check to ensure the word is composed of 5 letters
    if (input.length !== 5) {
        errorMessage.textContent = "The word needs to be exactly 5 letters";
        errorMessage.style.display = "block";
        return false;
    }
    // Regex check to see if the input has onlu letters
    if (!/^[a-zA-Z]{5}$/.test(input)) {
        errorMessage.textContent = "Input must contain only letters (A-Z)";
        errorMessage.style.display = "block";
        return false;
    }
    // Removing the error message when the input is valid
    errorMessage.style.display = "none";
    return true;
}
// Variable for the current row to write
let rowCounter = 1;
// Function to insert the try
async function insertInput() {
    if (!validateInput()) return false;
    // Creating the list of the spaces for the letters
    let lettersList = [
        document.getElementById("r" + rowCounter + "l1"),
        document.getElementById("r" + rowCounter + "l2"),
        document.getElementById("r" + rowCounter + "l3"),
        document.getElementById("r" + rowCounter + "l4"),
        document.getElementById("r" + rowCounter + "l5")
    ];

    let inputField = document.getElementById("input-text");
    let inputLetters = inputField.value.trim().toLowerCase().split(''); // Assigning the value of the text area

    const word = await getWord();

    const wordArray = word.toLowerCase().split('');
    // Check to see if the answer is correct
    if (inputLetters.join('') === word) {
        let errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "You won!";
        errorMessage.style.color = "green";
        errorMessage.style.display = "block";
        inputField.disabled = true;
        let sendButton = document.getElementById("answer-submit");
        sendButton.disabled = true;
    }

    let wordLetterCount = {};
    wordArray.forEach(letter => wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1);
    // Write the letter on each cell
    inputLetters.forEach((letter, index) => {
        lettersList[index].textContent = letter;
    });
    // Check if the letter is in the correct position
    inputLetters.forEach((letter, index) => {
        if (letter === wordArray[index]) {
            lettersList[index].style.backgroundColor = "green";
            wordLetterCount[letter]--;
        }
    });
    // Check if the letter is in the wrong position or if it is not contained in the word to guess
    inputLetters.forEach((letter, index) => {
        if (letter !== wordArray[index] && wordArray.includes(letter) && wordLetterCount[letter] > 0) {
            lettersList[index].style.backgroundColor = "yellow";
            wordLetterCount[letter]--;
        } else if (lettersList[index].style.backgroundColor !== "green") {
            lettersList[index].style.backgroundColor = "gray";
        }
    });

    rowCounter++;

    inputField.value = "";
    inputField.focus();
    // Checks if the rows are all full ===true===> disable the textarea and submit button
    if (rowCounter > 6) {
        inputField.disabled = true;
        let errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Game over!";
        errorMessage.style.color = "red";
        errorMessage.style.display = "block";
        inputField.disabled = true;
        let sendButton = document.getElementById("answer-submit");
        sendButton.disabled = true;
    }
}

document.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        insertInput();
    }
});