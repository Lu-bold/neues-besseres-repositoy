export interface QuizQuestion {
    category: string;
    question: string;
    options: (string | number)[];
    answer: string | number;
    difficulty: string;
}

export class QuestionService {
    private questions: QuizQuestion[] = [];
    public askedQuestions: QuizQuestion[] = []; // Track asked questions

    /**
     * Shuffles an array in place
     */
    private shuffleArray(array: QuizQuestion[]): QuizQuestion[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Fetches questions from the JSON file
     */
    public async fetchQuestions(): Promise<boolean> {
        try {
            const response = await fetch('./data/questions.json');

            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status}`);
            }

            const allQuestions: QuizQuestion[] = await response.json();

            // Shuffle and select 2 easy, 2 medium, and 1 hard question
            const easyQuestions = this.shuffleArray(allQuestions.filter(q => q.difficulty === 'easy')).slice(0, 2);
            const mediumQuestions = this.shuffleArray(allQuestions.filter(q => q.difficulty === 'medium')).slice(0, 2);
            const hardQuestions = this.shuffleArray(allQuestions.filter(q => q.difficulty === 'hard')).slice(0, 1);

            this.questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
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