// Initialize global variables
var dialogueIndex = 0;
var spyCode = '';
var remainingTime = 60; // Initial time in seconds
var timerInterval; // Holds the timer interval reference
var timerRunning = true; // Flag to track if timer is running

// Array of dialogue options
var dialogues = [
    { name: "Slient Ghost", text: "Ah, you must be the famous safe cracker, 'monarch of locks'" },
    { name: "Silent Ghost", text: "Your task to is simple, enter the safe in 60 secs before the cops arrive and get the loot" },
    { name: "Silent Ghost", text: "If a box glows green, it means the number is in the right position, if it glows orange, it is in the code but at the wrong position, if it is red. It is not in the code" },
    { name: "Slient Ghost", text: "Good Luck! we are counting on you" },
    { name: "Slient Ghost", text: "Hint: Numbers may double" }


    // Add more dialogue options as needed
];

document.addEventListener('DOMContentLoaded', function() {
    // Find the check button element
    var checkButton = document.getElementById('checkButton');

    // Add a click event listener to the check button
    checkButton.addEventListener('click', compareAndDisplay);

    // Generate random code when the page loads
    spyCode = generateRandomCode();

    // Start the timer countdown
    startTimer();
});

// Function to generate a random code
function generateRandomCode() {
    const characters = '0123456789'; // 0-9 and a-d
    let randomCode = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters[randomIndex];
    }
    return randomCode;
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function() {
        if (timerRunning) {
            remainingTime--;
            updateTimerDisplay();

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }
    }, 1000); // Update every second
}

// Function to update the timer display
function updateTimerDisplay() {
    var circle = document.getElementById('timerCircle');
    var text = document.getElementById('timerText');
    var dashOffset = Math.floor((remainingTime / 60) * 251); // Adjust based on your circle size and initial time

    circle.style.strokeDashoffset = dashOffset;
    text.textContent = remainingTime;

    // Change color based on time remaining (if desired)
    // Example: Change color to red when 10 seconds remaining
    if (remainingTime <= 10) {
        circle.style.stroke = '#e74c3c'; // Red
        text.style.fill = '#e74c3c'; // Red
    }
}


function handleTimeout() {
    var resultDisplay = document.getElementById('resultMessage');
    var additionalWords = document.getElementById('additionalWords');

    // Display appropriate message based on whether the user guessed correctly or not
    var userInput = getUserInput();
    var userInputLower = userInput.toLowerCase();
    var requiredCodeLower = spyCode.toLowerCase();

    if (userInputLower === requiredCodeLower) {
        resultDisplay.textContent = "Congratulations! You have guessed the correct code.";

        // Show the result message
        resultDisplay.style.display = 'block';

        // Hide input fields and check button
        var textboxContainer = document.getElementById('textboxContainer');
        textboxContainer.style.visibility = 'hidden'; // Hide but maintain space

        showGifsSequentially();

        // Show additional words
        additionalWords.textContent = `Congratulations! You have guessed the correct code.`;
        additionalWords.style.display = 'block';
        timerRunning = false; // Stop the timer

    } else {
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

// Function to get user input from input boxes
function getUserInput() {
    var userInput = '';
    userInput += document.getElementById('digitInput1').value;
    userInput += document.getElementById('digitInput2').value;
    userInput += document.getElementById('digitInput3').value;
    userInput += document.getElementById('digitInput4').value;
    userInput += document.getElementById('digitInput5').value;
    return userInput;
}


// Get references to the GIF elements
var gif1 = document.getElementById('gifImageOpen');
var gif2 = document.getElementById('gifImageWin');

// Example function to show GIFs sequentially
function showGifsSequentially() {
    // Show the first GIF (gif1)
    gif1.style.display = 'block';
    
    // Wait for a certain duration, then hide gif1 and show gif2
    setTimeout(function() {
        gif1.style.display = 'none';
        gif2.style.display = 'block';
    }, 3500); // Example: Wait for 3 seconds (3000 milliseconds)
}

// Call the function to start the sequence


// Function to handle the comparison and display of differences
function compareAndDisplay() {
    var userInput = getUserInput();
    var userInputLower = userInput.toLowerCase();
    var requiredCodeLower = spyCode.toLowerCase();

    var feedback = [];
    var correctIndices = [];

    for (var i = 0; i < requiredCodeLower.length && i < userInputLower.length; i++) {
        var codeChar = requiredCodeLower[i];
        var userChar = userInputLower[i];

        if (codeChar === userChar) {
            correctIndices.push(i);
        } else if (requiredCodeLower.includes(userChar)) {
          //  feedback.push(`Digit ${userChar} is in the code but not at index ${i}. `);
        } else {
            //feedback.push(`Digit ${userChar} is not in the code.`);
           // feedback.push(`Digit ${userChar} is not in the code. ${spyCode}.`);

        }
    }

    var resultDisplay = document.getElementById('resultMessage');
    if (userInputLower === requiredCodeLower) {
        resultDisplay.textContent = "Congratulations! You have guessed the correct code.";
        // Hide input fields and check button
        var textboxContainer = document.getElementById('textboxContainer');
        textboxContainer.style.visibility = 'hidden'; // Hide but maintain space

        showGifsSequentially();

        // Show additional words
        additionalWords.textContent = `Congratulations! You have guessed the correct code.`;
        additionalWords.style.display = 'block';
        timerRunning = false; // Stop the timer
    } else {
        resultDisplay.innerHTML = feedback.join('<br>');
    }

    highlightInputs(userInputLower, correctIndices); // Call highlightInputs after displaying feedback
}

// Function to highlight input boxes based on correctness
function highlightInputs(userInput, correctIndices) {
    var inputBoxes = document.querySelectorAll('.digit-input');

    // Reset all input styles first
    inputBoxes.forEach(function(box) {
        box.style.backgroundColor = '#fff'; // Default background color
    });

    // Apply different colors based on correctness
    for (var i = 0; i < userInput.length; i++) {
        var box = inputBoxes[i];
        var userChar = userInput[i];
        var index = i;

        if (correctIndices.includes(index)) {
            box.style.backgroundColor = '#2ecc71'; // Green for correct index
        } else if (spyCode.toLowerCase().includes(userChar)) {
            box.style.backgroundColor = '#f39c12'; // Orange for correct number in wrong index
        } else {
            box.style.backgroundColor = '#e74c3c'; // Red for incorrect number
        }
    }
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


