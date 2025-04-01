import { UI } from './modules/ui.js';
const ui = new UI();
ui.initializeEventListeners = function () {
    // Add event listeners for the start button
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => this.startQuiz());
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
ui.startQuiz = function () {
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
ui.nextQuestion = function () {
    // Logic to load the next question goes here
    console.log('Next question button clicked');
};
ui.restartQuiz = function () {
    // Logic to restart the quiz goes here
    console.log('Restart button clicked');
};
// Initialize the event listeners
ui.initializeEventListeners();
