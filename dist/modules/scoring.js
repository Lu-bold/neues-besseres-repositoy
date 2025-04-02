export class ScoringService {
    constructor(totalQuestions) {
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = totalQuestions;
    }
    // Increment score for a correct answer
    incrementScore(points) {
        this.score += points;
        this.correctAnswers++;
    }
    // Get the current score
    getScore() {
        return this.score;
    }
    // Get the number of correct answers
    getCorrectAnswers() {
        return this.correctAnswers;
    }
    // Calculate the final score as a percentage
    calculateFinalScore() {
        return Math.round((this.correctAnswers / this.totalQuestions) * 100);
    }
    // Reset the score for a new game
    reset() {
        this.score = 0;
        this.correctAnswers = 0;
    }
}
