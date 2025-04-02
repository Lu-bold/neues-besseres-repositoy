export class ScoringService {
    private score: number;
    private correctAnswers: number;
    private totalQuestions: number;
    private playerName: string;
    public leaderboard: { name: string; score: number }[];

    constructor(totalQuestions: number, playerName: string) {
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = totalQuestions;
        this.playerName = playerName;
        this.leaderboard = [];
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

    // Add the player's score to the leaderboard
    public updateLeaderboard(): void {
        this.leaderboard.push({ name: this.playerName, score: this.score });
        this.leaderboard.sort((a, b) => b.score - a.score);
    }

    // Get the player's rank
    public getRank(): number {
        this.updateLeaderboard();
        return this.leaderboard.findIndex(player => player.name === this.playerName) + 1;
    }

    // Get the player's details
    public getPlayerDetails(): { name: string; rank: number; score: number } {
        return {
            name: this.playerName,
            rank: this.getRank(),
            score: this.score
        };
    }
}