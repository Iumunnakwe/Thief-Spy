// Initialize a global variable to hold the current dialogue index
var dialogueIndex = 0;
// Initialize a global variable to hold the generated code and the number of guesses
var spyCode = '';
var remainingGuesses = 6;
var Guesses = 0;
let currentLength = 0; // Initial length
const increaseAmount = 45; // Amount to increase by
var previousEntries = [];

// Define an array of dialogue options
var dialogues = [
    { name: "Spy commander", text: "Welcome Cadet" },
    { name: "Spy commander", text: "Your task to enter the spy force is to guess the six digit code consiting of letter a-d and 0-9." },
    { name: "Spy commander", text: "You will have six guesses, look at the loader in the top right to know how many guesses you have left. if it is red, you will have 2 guesses or less left" },
    { name: "Spy commander", text: "Hint: Numbers/letters may double. And 0 means 1 in the index" }

    // Add more dialogue options as needed
];

document.addEventListener('DOMContentLoaded', function() {
    // Find the check button element
    var checkButton = document.getElementById('checkButton');

    // Add a click event listener to the check button
    checkButton.addEventListener('click', compareAndDisplay);

    // Generate random code when the page loads
    spyCode = generateRandomCode();
});

// Function to generate a random code
function generateRandomCode() {
    const characters = '0123456789abcd'; // 0-9 and a-d
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters[randomIndex];
    }
    return randomCode;
}

function increaseLoader() {
    currentLength += increaseAmount;
  
    const circle = document.querySelector('circle');
  
    // Limit maximum dash offset
    if (currentLength > 251) { // Max dash array value
      currentLength = 251;
    }
  
    circle.style.strokeDashoffset = 251 - currentLength;
}

// Function to change the color of the loader based on guesses
function changeLoaderColor(guesses) {
    const circle = document.querySelector('circle');
  
    // Use a switch statement to change color based on number of guesses
    switch (true) {
      case (guesses <= 2):
        circle.style.stroke = '#3498db'; // Blue
        break;
      case (guesses <= 4):
        circle.style.stroke = '#f39c12'; // Orange
        break;
      default:
        circle.style.stroke = '#e74c3c'; // Red
        break;
    }
}

// Function to handle the comparison and display of differences
function compareAndDisplay() {
    // Check if the user has any remaining guesses
    if (remainingGuesses <= 0) {
        var resultDisplay = document.getElementById('resultMessage');
        resultDisplay.textContent = `You have failed. The correct code was ${spyCode}.`;
        return; // Exit function early
    }

    // Get the user input value
    var userInput = document.getElementById('userInput').value;

    // Check if user input length is exactly 6 characters
    if (userInput.length !== 6) {
        alert('Please enter exactly 6 digits.');
        return; // Exit function early if input is not valid
    }

    // Decrement the remaining guesses
    remainingGuesses--;
    Guesses++;

    // Update the display of guesses taken
    var guessesDisplay = document.getElementById('resultGuesses');
    guessesDisplay.textContent = `Guesses taken: ${Guesses}`;

    // Increase the length of the loader circle
    increaseLoader();

    // Change the color of the loader based on guesses
    changeLoaderColor(Guesses);

    // Convert both strings to lowercase for case-insensitive comparison
    var userInputLower = userInput.toLowerCase();
    var requiredCodeLower = spyCode.toLowerCase(); // Access the global spyCode variable

    // Initialize variables to store feedback messages
    var feedback = [];

    // Compare strings character by character
    for (var i = 0; i < requiredCodeLower.length && i < userInputLower.length; i++) {
        var codeChar = requiredCodeLower[i];
        var userChar = userInputLower[i];

        if (codeChar === userChar) {
            feedback.push(`<span style="color: green">${userChar}</span>`); // Correct number and position
        } else if (requiredCodeLower.includes(userChar)) {
            feedback.push(`<span style="color: orange">${userChar}</span>`); // Correct number but wrong position
        } else {
            feedback.push(`<span style="color: red">${userChar}</span>`); // Number not in the code
        }
    }

    // Display the feedback
    var resultDisplay = document.getElementById('resultMessage');
    if (userInputLower === requiredCodeLower) {
        resultDisplay.textContent = "Congratulations! You have guessed the correct code.";

         // Show the result message
         resultDisplay.style.display = 'block';

         // Hide input fields and check button
         var textboxContainer = document.getElementById('textboxContainer');
         textboxContainer.style.visibility = 'hidden'; // Hide but maintain space
 
         // Show GIF image for failure
         var gifImage = document.getElementById('gifImageWin');
         gifImage.style.display = 'block';
 
          // Show additional words
          additionalWords.textContent = `Congratulations! You have guessed the correct code.`;
         
          additionalWords.style.display = 'block';
    } else {
        resultDisplay.innerHTML = feedback.join('<br>');
    }
    previousEntries.push({ userInput: userInputLower, feedback: feedback });

    // Display all previous entries
    displayPreviousEntries();


    // Check if the user has exhausted all guesses after this attempt
    if (remainingGuesses === 0 && feedback.length > 0 && userInputLower != requiredCodeLower) {
        resultDisplay.textContent = `You have failed. The correct code was ${spyCode}.`;
        // Show the result message
        resultDisplay.style.display = 'block';

        // Hide input fields and check button
        var textboxContainer = document.getElementById('textboxContainer');
        textboxContainer.style.visibility = 'hidden'; // Hide but maintain space

        // Show GIF image for failure
        var gifImage = document.getElementById('gifImage');
        gifImage.style.display = 'block';

         // Show additional words
         additionalWords.textContent = `You have failed. The correct code was ${spyCode}.`;
        
         additionalWords.style.display = 'block';
    }
}

function displayPreviousEntries() {
    var previousEntriesDiv = document.getElementById('previousEntries');
    previousEntriesDiv.innerHTML = ''; // Clear previous entries

    // Loop through previousEntries and display each entry
    previousEntries.forEach(function(entry, index) {
        var entryElement = document.createElement('p');
        entryElement.innerHTML = `<strong>Entry ${index + 1}:</strong> ${entry.userInput} - ${entry.feedback.join(', ')}`;
        previousEntriesDiv.appendChild(entryElement);
    });
}


// Function to change character dialogue sequentially
function changeDialogue() {
    var characterName = document.getElementById('characterName');
    var characterDialogue = document.getElementById('characterDialogue');

    // Get the current dialogue option based on dialogueIndex
    var currentDialogue = dialogues[dialogueIndex];

    // Update character name and dialogue text
    characterName.textContent = currentDialogue.name;
    characterDialogue.textContent = currentDialogue.text;

    // Increment dialogueIndex for the next click
    dialogueIndex++;

    // Reset dialogueIndex to 0 if it exceeds the number of dialogues
    if (dialogueIndex >= dialogues.length) {
        dialogueIndex = 0;
    }
}
