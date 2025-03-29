let wordToGuess = null;
let wordPromise = null;
// Function that create the call to the URL and returns the 5 letter word
async function getWord() {
    if (wordToGuess) return wordToGuess;
    if (!wordPromise) {
        wordPromise = fetch("https://random-word-api.herokuapp.com/word?length=5")
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
    let input = inputField.value.trim();

    if (input.length !== 5) {
        errorMessage.textContent = "The word needs to be exactly 5 letters";
        errorMessage.style.display = "block";
        return false;
    }

    if (!/^[a-zA-Z]{5}$/.test(input)) {
        errorMessage.textContent = "Input must contain only letters (A-Z)";
        errorMessage.style.display = "block";
        return false;
    }

    errorMessage.style.display = "none";
    return true;
}

const rowList = [
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3"),
    document.getElementById("r4"),
    document.getElementById("r5"),
    document.getElementById("r6")
];
let rowCounter = 1;
// Function to insert the try
function insertInput() {
    // First checking if the input is valid
    if (!validateInput()) {
        return false;
    }

    let lettersList = [
        document.getElementById("r" + rowCounter + "l1"),
        document.getElementById("r" + rowCounter + "l2"),
        document.getElementById("r" + rowCounter + "l3"),
        document.getElementById("r" + rowCounter + "l4"),
        document.getElementById("r" + rowCounter + "l5")
    ];
    let inputLetters = document.getElementById("input-text")
        .value.trim()
        .split('');
}