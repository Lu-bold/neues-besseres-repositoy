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

            let currentQuestion = questionService.getRandomQuestion();

            if (currentQuestion) {
                const categoryElement = document.getElementById('question-category');
                const difficultyElement = document.getElementById('question-difficulty');
                const questionElement = document.getElementById('question-text');

                if (categoryElement) categoryElement.textContent = currentQuestion.category;
                if (difficultyElement) difficultyElement.textContent = currentQuestion.difficulty;
                if (questionElement) questionElement.textContent = currentQuestion.question;

                const optionButtons = document.querySelectorAll('.option');

                optionButtons.forEach((button, index) => {
                    if (currentQuestion && index < currentQuestion.options.length) {
                        if (currentQuestion) {
                            button.textContent = currentQuestion.options[index].toString();
                        }

                        // Add click event listener for each option
                        button.addEventListener('click', () => {
                            const selectedAnswer = currentQuestion?.options[index];
                            if (currentQuestion && selectedAnswer === currentQuestion.answer) {
                                scoringService.incrementScore(10); // Add 10 points for a correct answer
                                alert('Correct!');
                            } else {
                                alert('Wrong!');
                            }

                            // Load the next question or show final results
                            currentQuestion = questionService.getRandomQuestion();
                            if (currentQuestion) {
                                if (categoryElement) categoryElement.textContent = currentQuestion.category;
                                if (difficultyElement) difficultyElement.textContent = currentQuestion.difficulty;
                                if (questionElement) questionElement.textContent = currentQuestion.question;

                                optionButtons.forEach((btn, idx) => {
                                    if (currentQuestion && idx < currentQuestion.options.length) {
                                        btn.textContent = currentQuestion.options[idx].toString();
                                    }
                                });
                            } else {
                                // Show final results
                                const finalResults = document.getElementById('final-results');
                                const scoreDisplay = document.getElementById('score-display');
                                if (finalResults) finalResults.style.display = 'block';
                                if (scoreDisplay) scoreDisplay.textContent = `${scoringService.getScore()} / ${totalQuestions * 10}`;
                            }
                        });
                    }
                });
            }
        });
    }

    ui.initializeEventListeners();
});