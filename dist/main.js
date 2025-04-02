var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UI } from './modules/ui.js';
import { QuestionService } from './modules/questions.js';
import { ScoringService } from './modules/scoring.js';
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const ui = new UI();
    const questionService = new QuestionService();
    const totalQuestions = 10; // Set the total number of questions
    let scoringService;
    let playerName = ''; // Store the player name
    yield questionService.fetchQuestions();
    const nameForm = document.getElementById('name-form');
    let currentQuestionIndex = 0; // Track the current question index
    if (nameForm) {
        nameForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const playerNameInput = document.getElementById('player-name');
            playerName = (playerNameInput === null || playerNameInput === void 0 ? void 0 : playerNameInput.value.trim()) || ''; // Get and store the player name
            if (playerName === '') {
                const nameError = document.getElementById('name-error');
                if (nameError)
                    nameError.style.display = 'block';
                return;
            }
            const playerInput = document.getElementById('player-input');
            const quizContainer = document.getElementById('quiz-container');
            const questionContainer = document.getElementById('question-container');
            const optionsContainer = document.getElementById('options-container');
            if (playerInput)
                playerInput.style.display = 'none';
            if (quizContainer)
                quizContainer.style.display = 'block';
            const playerNameDisplay = quizContainer === null || quizContainer === void 0 ? void 0 : quizContainer.querySelector('.card-title');
            if (playerNameDisplay)
                playerNameDisplay.textContent = playerName;
            // Initialize ScoringService
            scoringService = new ScoringService(totalQuestions, playerName);
            // Load the first question
            loadQuestion();
        });
    }
    function loadQuestion() {
        // Check if the maximum number of questions has been reached
        if (currentQuestionIndex >= totalQuestions) {
            // Show final results
            const finalResults = document.getElementById('final-results');
            const scoreDisplay = document.getElementById('score-display');
            const infoContainer = document.getElementById('info-container');
            const questionContainer = document.getElementById('question-container'); // Get question container
            const optionsContainer = document.getElementById('options-container'); // Get options container
            if (finalResults)
                finalResults.style.display = 'block';
            if (infoContainer)
                infoContainer.style.display = 'none'; // Hide info container
            if (questionContainer)
                questionContainer.style.display = 'none'; // Hide question container
            if (optionsContainer)
                optionsContainer.style.display = 'none'; // Hide options container
            if (scoreDisplay)
                scoreDisplay.textContent = `${scoringService.getScore()} / ${totalQuestions * 10}`;
            // Update leaderboard
            scoringService.updateLeaderboard();
            updateLeaderboardUI();
            // Show restart and home buttons
            const restartButton = document.getElementById('restart-button');
            const homeButton = document.getElementById('home-button');
            if (restartButton) {
                restartButton.style.display = 'block';
            }
            if (homeButton) {
                homeButton.style.display = 'block';
            }
            return;
        }
        const currentQuestion = questionService.getRandomQuestion();
        if (!currentQuestion) {
            console.error('No more questions available.');
            return;
        }
        // Update question number and progress bar
        currentQuestionIndex++;
        const questionNumberElement = document.getElementById('question-number');
        const progressBar = document.getElementById('progress-bar');
        if (questionNumberElement) {
            questionNumberElement.textContent = `Question ${currentQuestionIndex} of ${totalQuestions}`;
        }
        if (progressBar) {
            const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
        // Update question and options
        const categoryElement = document.getElementById('question-category');
        const difficultyElement = document.getElementById('question-difficulty');
        const questionElement = document.getElementById('question-text');
        const optionButtons = document.querySelectorAll('.option');
        if (categoryElement)
            categoryElement.textContent = currentQuestion.category;
        if (difficultyElement)
            difficultyElement.textContent = currentQuestion.difficulty;
        if (questionElement)
            questionElement.textContent = currentQuestion.question;
        optionButtons.forEach((button, index) => {
            if (index < currentQuestion.options.length) {
                button.textContent = currentQuestion.options[index].toString();
                button.onclick = () => {
                    const selectedAnswer = currentQuestion.options[index];
                    if (selectedAnswer === currentQuestion.answer) {
                        scoringService.incrementScore(10); // Add 10 points for a correct answer
                        alert('Correct!');
                    }
                    else {
                        alert('Wrong!');
                    }
                    loadQuestion(); // Load the next question
                };
            }
        });
    }
    // Function to update the leaderboard UI
    function updateLeaderboardUI() {
        const leaderboardBody = document.getElementById('leaderboard-body');
        if (!leaderboardBody) {
            console.error('Leaderboard body element not found.');
            return;
        }
        leaderboardBody.innerHTML = ''; // Clear existing entries
        scoringService.updateLeaderboard(); // Update the leaderboard data
        scoringService.leaderboard.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
            `;
            leaderboardBody.appendChild(row);
        });
        const noScoresMessage = document.getElementById('no-scores-message');
        if (noScoresMessage) {
            noScoresMessage.style.display = scoringService.leaderboard.length === 0 ? 'table-row' : 'none';
        }
    }
    function restartQuiz() {
        // Reset the quiz state
        currentQuestionIndex = 0;
        questionService.askedQuestions = []; // Reset asked questions
        scoringService.reset(); // Reset the score, but keep the leaderboard intact
        const finalResults = document.getElementById('final-results');
        if (finalResults) {
            finalResults.style.display = 'none';
        }
        const questionContainer = document.getElementById('question-container');
        const optionsContainer = document.getElementById('options-container');
        const infoContainer = document.getElementById('info-container');
        if (questionContainer)
            questionContainer.style.display = 'block';
        if (optionsContainer)
            optionsContainer.style.display = 'block';
        if (infoContainer)
            infoContainer.style.display = 'block';
        // Hide restart button
        const restartButton = document.getElementById('restart-button');
        if (restartButton) {
            restartButton.style.display = 'none';
        }
        loadQuestion(); // Load the first question
    }
    function goToHome() {
        const playerInput = document.getElementById('player-input');
        const quizContainer = document.getElementById('quiz-container');
        const finalResults = document.getElementById('final-results');
        if (playerInput)
            playerInput.style.display = 'block';
        if (quizContainer)
            quizContainer.style.display = 'none';
        if (finalResults)
            finalResults.style.display = 'none';
        const playerNameInput = document.getElementById('player-name');
        if (playerNameInput) {
            playerNameInput.value = ''; // Clear the player name input
        }
        const nameError = document.getElementById('name-error');
        if (nameError) {
            nameError.style.display = 'none'; // Hide the name error message
        }
        // Hide restart and home buttons
        const restartButton = document.getElementById('restart-button');
        const homeButton = document.getElementById('home-button');
        if (restartButton) {
            restartButton.style.display = 'none';
        }
        if (homeButton) {
            homeButton.style.display = 'none';
        }
        // Reset quiz state
        currentQuestionIndex = 0;
        questionService.askedQuestions = [];
        if (scoringService) {
            scoringService.reset();
        }
    }
    // Add event listener to the restart button
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.addEventListener('click', restartQuiz);
        restartButton.style.display = 'none'; // Hide the button initially
    }
    // Add event listener to the home button
    const homeButton = document.getElementById('home-button');
    if (homeButton) {
        homeButton.addEventListener('click', goToHome);
        homeButton.style.display = 'none'; // Hide the button initially
    }
    ui.initializeEventListeners();
}));
