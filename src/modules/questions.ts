export interface QuizQuestion {
    category: string;
    question: string;
    options: (string | number)[];
    answer: string | number;
    difficulty: string;
}

export class QuestionService {
    private questions: QuizQuestion[] = [];

    public async fetchQuestions(): Promise<boolean> {
        try {
            const response = await fetch('./data/questions.json'); // Adjusted path
            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status}`);
            }
            this.questions = await response.json();
            return true;
        } catch (error) {
            console.error('Error fetching questions:', error);
            return false;
        }
    }

    public getRandomQuestion(): QuizQuestion | null {
        if (this.questions.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    }
}