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
    }
    fetchQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('./data/questions.json'); // Adjusted path
                if (!response.ok) {
                    throw new Error(`Failed to fetch questions: ${response.status}`);
                }
                this.questions = yield response.json();
                return true;
            }
            catch (error) {
                console.error('Error fetching questions:', error);
                return false;
            }
        });
    }
    getRandomQuestion() {
        if (this.questions.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    }
}
