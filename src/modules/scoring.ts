export class ScoringService {
    private score: number;
    private correctAnswers: number;
    private totalQuestions: number;

    constructor(totalQuestions: number) {
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = totalQuestions;
    }

    // Increment score for a correct answer
    public incrementScore(points: number): void {
        this.score += points;
        this.correctAnswers++;
    }

    // Get the current score
    public getScore(): number {
        return this.score;
    }

    // Get the number of correct answers
    public getCorrectAnswers(): number {
        return this.correctAnswers;
    }

    // Calculate the final score as a percentage
    public calculateFinalScore(): number {
        return Math.round((this.correctAnswers / this.totalQuestions) * 100);
    }

    // Reset the score for a new game
    public reset(): void {
        this.score = 0;
        this.correctAnswers = 0;
    }
}