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
    yield questionService.fetchQuestions();
    const nameForm = document.getElementById('name-form');
    let currentQuestionIndex = 0; // Track the current question index
    if (nameForm) {
        nameForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const playerNameInput = document.getElementById('player-name');
            const playerName = (playerNameInput === null || playerNameInput === void 0 ? void 0 : playerNameInput.value.trim()) || '';
            if (playerName === '') {
                const nameError = document.getElementById('name-error');
                if (nameError)
                    nameError.style.display = 'block';
                return;
            }
            const playerInput = document.getElementById('player-input');
            const quizContainer = document.getElementById('quiz-container');
            if (playerInput)
                playerInput.style.display = 'none';
            if (quizContainer)
                quizContainer.style.display = 'block';
            const playerNameDisplay = quizContainer === null || quizContainer === void 0 ? void 0 : quizContainer.querySelector('.card-title');
            if (playerNameDisplay)
                playerNameDisplay.textContent = playerName;
            // Initialize ScoringService
            scoringService = new ScoringService(totalQuestions, playerName);
            loadQuestion(); // Load the first question
            function loadQuestion() {
                // Check if the maximum number of questions has been reached
                if (currentQuestionIndex >= totalQuestions) {
                    // Show final results
                    const finalResults = document.getElementById('final-results');
                    const scoreDisplay = document.getElementById('score-display');
                    if (finalResults)
                        finalResults.style.display = 'block';
                    if (scoreDisplay)
                        scoreDisplay.textContent = `${scoringService.getScore()} / ${totalQuestions * 10}`;
                    // Update leaderboard
                    scoringService.updateLeaderboard();
                    updateLeaderboardUI();
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
        scoringService.updateLeaderboard();
        console.log('Updated leaderboard:', scoringService.leaderboard); // Debugging
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
    ui.initializeEventListeners();
}));
