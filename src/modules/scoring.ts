export class ScoringService {
    private score: number;
    private correctAnswers: number;
    private totalQuestions: number;
    private playerName: string;
    public leaderboard: { name: string; score: number; percentage: number }[];

    constructor(totalQuestions: number, playerName: string) {
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = totalQuestions;
        this.playerName = playerName;
        this.leaderboard = [];
    }

    // Increment score based on difficulty
    public incrementScore(difficulty: string): void {
        let points = 0;
        if (difficulty === 'easy') points = 1;
        else if (difficulty === 'medium') points = 2;
        else if (difficulty === 'hard') points = 3;

        this.score += points;
        this.correctAnswers++;
    }

    // Get the current score
    public getScore(): number {
        return this.score;
    }

    // Calculate the total score percentage
    public calculatePercentage(): number {
        const maxPoints = 9; // Maximum possible points
        return Math.round(((this.score) / maxPoints) * 100);
    }

    // Reset the score for a new game
    public reset(): void {
        this.score = 0;
        this.correctAnswers = 0;
    }

    // Add the player's score to the leaderboard
    public updateLeaderboard(): void {
        const percentage = this.calculatePercentage();

        // Check if the player already exists in the leaderboard
        const existingPlayer = this.leaderboard.find(player => player.name === this.playerName);

        if (existingPlayer) {
            // Update the score only if the new score is higher
            if (this.score > existingPlayer.score) {
                existingPlayer.score = this.score;
                existingPlayer.percentage = percentage;
            }
        } else {
            // Add the player to the leaderboard if they don't already exist
            this.leaderboard.push({ name: this.playerName, score: this.score, percentage });
        }

        // Sort the leaderboard by score in descending order
        this.leaderboard.sort((a, b) => b.score - a.score);
    }

    // Get the player's rank
    public getRank(): number {
        this.updateLeaderboard();
        return this.leaderboard.findIndex(player => player.name === this.playerName) + 1;
    }

    // Get the player's details
    public getPlayerDetails(): { name: string; rank: number; score: number; percentage: number } {
        return {
            name: this.playerName,
            rank: this.getRank(),
            score: this.score,
            percentage: this.calculatePercentage()
        };
    }
}