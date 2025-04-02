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
    public updateLeaderboard(leaderboard: { name: string; score: number }[]): void {
        const percentage = this.calculatePercentage();

        // Check if the player already exists in the leaderboard
        const existingPlayer = leaderboard.find(player => player.name === this.playerName);
        
        if (existingPlayer) {
            // Update the score only if the new score is higher
            if (this.score > existingPlayer.score) {
                existingPlayer.score = this.score;
                existingPlayer.percentage = percentage;
            }
        } else {
            // Add the player to the leaderboard if they don't already exist
            leaderboard.push({ name: this.playerName, score: this.score, percentage });
        }

        // Sort the leaderboard by score in descending order
        leaderboard.sort((a, b) => b.score - a.score);
    }

    // Get the player's rank
    public getRank(leaderboard: { name: string; score: number }[]): number {
        return leaderboard.findIndex(player => player.name === this.playerName) + 1;
    }

    // Get the player's details
    public getPlayerDetails(leaderboard: { name: string; score: number }[]): { name: string; rank: number; score: number; percentage: number } {
        return {
            name: this.playerName,
            rank: this.getRank(leaderboard),
            score: this.score,
            percentage: this.calculatePercentage()
        };
    }
}