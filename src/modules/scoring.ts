export class ScoringService {
    private score: number;
    private correctAnswers: number;
    private totalQuestions: number;
    private playerName: string;

    constructor(totalQuestions: number, playerName: string) {
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = totalQuestions;
        this.playerName = playerName;
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
    public updateLeaderboard(leaderboard: { name: string; score: number }[]): void {
        // Check if the player already exists in the leaderboard
        const existingPlayer = leaderboard.find(player => player.name === this.playerName);
        
        if (existingPlayer) {
            // Update the score only if the new score is higher
            if (this.score > existingPlayer.score) {
                existingPlayer.score = this.score;
            }
        } else {
            // Add the player to the leaderboard if they don't already exist
            leaderboard.push({ name: this.playerName, score: this.score });
        }

        // Sort the leaderboard by score in descending order
        leaderboard.sort((a, b) => b.score - a.score);
    }

    // Get the player's rank
    public getRank(leaderboard: { name: string; score: number }[]): number {
        return leaderboard.findIndex(player => player.name === this.playerName) + 1;
    }

    // Get the player's details
    public getPlayerDetails(leaderboard: { name: string; score: number }[]): { name: string; rank: number; score: number } {
        return {
            name: this.playerName,
            rank: this.getRank(leaderboard),
            score: this.score
        };
    }
}