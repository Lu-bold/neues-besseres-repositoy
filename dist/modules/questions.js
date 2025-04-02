var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class QuestionService {
    constructor() {
        this.questions = [];
        this.askedQuestions = []; // Track asked questions
    }
    /**
     * Fetches questions from the JSON file
     */
    fetchQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('./data/questions.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch questions: ${response.status}`);
                }
                this.questions = yield response.json();
                this.askedQuestions = []; // Reset asked questions when fetching new set
                return true;
            }
            catch (error) {
                console.error('Error fetching questions:', error);
                return false;
            }
        });
    }
    /**
     * Gets a random question that hasn't been asked yet
     */
    getRandomQuestion() {
        // Filter out already asked questions
        const availableQuestions = this.questions.filter(question => !this.askedQuestions.includes(question));
        if (availableQuestions.length === 0) {
            // If all questions have been asked, reset the asked questions list
            if (this.questions.length > 0) {
                this.askedQuestions = [];
                return this.getRandomQuestion(); // Recursive call to get a question
            }
            return null; // No questions available
        }
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const selectedQuestion = availableQuestions[randomIndex];
        // Add the selected question to the asked questions list
        this.askedQuestions.push(selectedQuestion);
        return selectedQuestion;
    }
}
