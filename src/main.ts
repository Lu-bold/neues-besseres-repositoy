import { UI } from './modules/ui.js';

const ui = new UI();

ui.initializeEventListeners = function (): void {
    // Add event listeners for the start button
    const nameForm = document.getElementById('name-form');
    if (nameForm) {
        nameForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission behavior
            const playerNameInput = document.getElementById('player-name') as HTMLInputElement;
            if (playerNameInput && playerNameInput.value.trim() !== '') {
                this.startQuiz();
            } else {
                const nameError = document.getElementById('name-error');
                if (nameError) {
                    nameError.style.display = 'block';
                }
            }
        });
    }

    // Add event listeners for the next button
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
        nextButton.addEventListener('click', () => this.nextQuestion());
    }

    // Add event listeners for the restart button
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.addEventListener('click', () => this.restartQuiz());
    }
};

ui.startQuiz = function (): void {
    // Hide the input container
    const playerInput = document.getElementById('player-input');
    if (playerInput) {
        playerInput.style.display = 'none';
    }

    // Show the quiz container
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.style.display = 'block';
    }

    // Show the info container
    const infoContainer = document.getElementById('info-container');
    if (infoContainer) {
        infoContainer.style.display = 'block';
    }

    // Show the question container
    const questionContainer = document.getElementById('question-container');
    if (questionContainer) {
        questionContainer.style.display = 'block';
    }

    // Show the options container
    const optionsContainer = document.getElementById('options-container');
    if (optionsContainer) {
        optionsContainer.style.display = 'block';
    }
};

ui.nextQuestion = function (): void {
    // Logic to load the next question goes here
    console.log('Next question button clicked');
};

ui.restartQuiz = function (): void {
    // Logic to restart the quiz goes here
    console.log('Restart button clicked');
};

// Initialize the event listeners
ui.initializeEventListeners();

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const nameForm = document.getElementById("name-form") as HTMLFormElement;
    const playerNameInput = document.getElementById("player-name") as HTMLInputElement;
    const nameError = document.getElementById("name-error") as HTMLElement;
    const playerInputContainer = document.getElementById("player-input") as HTMLElement;
    const quizContainer = document.getElementById("quiz-container") as HTMLElement;
    const playerNameDisplay = quizContainer.querySelector(".card-title") as HTMLElement;

    // Handle form submission
    nameForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        const playerName = playerNameInput.value.trim();

        if (playerName === "") {
            // Show error message if name is empty
            nameError.style.display = "block";
        } else {
            // Hide error message
            nameError.style.display = "none";

            // Save the player's name in localStorage
            localStorage.setItem("playerName", playerName);

            // Update the quiz container with the player's name
            playerNameDisplay.textContent = playerName;

            // Hide the player input container and show the quiz container
            playerInputContainer.style.display = "none";
            quizContainer.style.display = "block";
        }
    });
});