import { UI } from './modules/ui.js';
import { QuestionService } from './modules/questions.js';
import { ScoringService } from './modules/scoring.js';

document.addEventListener('DOMContentLoaded', async () => {
    const ui = new UI();
    const questionService = new QuestionService();
    const totalQuestions = 10; // Set the total number of questions
    const scoringService = new ScoringService(totalQuestions);

    await questionService.fetchQuestions();

    const nameForm = document.getElementById('name-form');
    let currentQuestionIndex = 0; // Track the current question index

    if (nameForm) {
        nameForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const playerNameInput = document.getElementById('player-name') as HTMLInputElement;
            const playerName = playerNameInput?.value.trim() || '';

            if (playerName === '') {
                const nameError = document.getElementById('name-error');
                if (nameError) nameError.style.display = 'block';
                return;
            }

            const playerInput = document.getElementById('player-input');
            const quizContainer = document.getElementById('quiz-container');

            if (playerInput) playerInput.style.display = 'none';
            if (quizContainer) quizContainer.style.display = 'block';

            const playerNameDisplay = quizContainer?.querySelector('.card-title');
            if (playerNameDisplay) playerNameDisplay.textContent = playerName;

            loadQuestion(); // Load the first question

            function loadQuestion() {
                const currentQuestion = questionService.getRandomQuestion();
                if (!currentQuestion) {
                    // Show final results if no more questions
                    const finalResults = document.getElementById('final-results');
                    const scoreDisplay = document.getElementById('score-display');
                    if (finalResults) finalResults.style.display = 'block';
                    if (scoreDisplay) scoreDisplay.textContent = `${scoringService.getScore()} / ${totalQuestions * 10}`;
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

                if (categoryElement) categoryElement.textContent = currentQuestion.category;
                if (difficultyElement) difficultyElement.textContent = currentQuestion.difficulty;
                if (questionElement) questionElement.textContent = currentQuestion.question;

                optionButtons.forEach((button, index) => {
                    if (index < currentQuestion.options.length) {
                        button.textContent = currentQuestion.options[index].toString();
                        (button as HTMLButtonElement).onclick = () => {
                            const selectedAnswer = currentQuestion.options[index];
                            if (selectedAnswer === currentQuestion.answer) {
                                scoringService.incrementScore(10); // Add 10 points for a correct answer
                                alert('Correct!');
                            } else {
                                alert('Wrong!');
                            }
                            loadQuestion(); // Load the next question
                        };
                    }
                });
            }
        });
    }

    ui.initializeEventListeners();
});