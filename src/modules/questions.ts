export interface QuizQuestion {
    category: string;
    question: string;
    options: (string | number)[];
    answer: string | number;
    difficulty: string;
}

export class QuestionService {
    private questions: QuizQuestion[] = [];
    private askedQuestions: QuizQuestion[] = []; // Track asked questions

    /**
     * Fetches questions from the JSON file
     */
    public async fetchQuestions(): Promise<boolean> {
        try {
            const response = await fetch('./data/questions.json');

            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status}`);
            }

            this.questions = await response.json();
            this.askedQuestions = []; // Reset asked questions when fetching new set
            return true;
        } catch (error) {
            console.error('Error fetching questions:', error);
            return false;
        }
    }

    /**
     * Gets a random question that hasn't been asked yet
     */
    public getRandomQuestion(): QuizQuestion | null {
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