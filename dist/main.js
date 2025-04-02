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
// DOMContentLoaded event listener: Initializes the quiz after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const ui = new UI();
    const questionService = new QuestionService();
    yield questionService.fetchQuestions();
    const nameForm = document.getElementById('name-form');
    if (nameForm) {
        // Event listener for the name form submission
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
            // Hide player input and show quiz container
            if (playerInput)
                playerInput.style.display = 'none';
            if (quizContainer)
                quizContainer.style.display = 'block';
            const playerNameDisplay = quizContainer === null || quizContainer === void 0 ? void 0 : quizContainer.querySelector('.card-title');
            if (playerNameDisplay)
                playerNameDisplay.textContent = playerName;
            const randomQuestion = questionService.getRandomQuestion();
            if (randomQuestion) {
                // Set question details
                const categoryElement = document.getElementById('question-category');
                const difficultyElement = document.getElementById('question-difficulty');
                const questionElement = document.getElementById('question-text');
                if (categoryElement)
                    categoryElement.textContent = randomQuestion.category;
                if (difficultyElement)
                    difficultyElement.textContent = randomQuestion.difficulty;
                if (questionElement)
                    questionElement.textContent = randomQuestion.question;
                const optionButtons = document.querySelectorAll('.option');
                // Set option button text
                optionButtons.forEach((button, index) => {
                    if (index < randomQuestion.options.length) {
                        button.textContent = randomQuestion.options[index].toString();
                    }
                });
            }
        });
    }
    ui.initializeEventListeners();
}));
