export class ScoringService {
    constructor(totalQuestions, playerName) {
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = totalQuestions;
        this.playerName = playerName;
        this.leaderboard = [];
    }
    // Increment score based on difficulty
    incrementScore(difficulty) {
        let points = 0;
        if (difficulty === 'easy')
            points = 1;
        else if (difficulty === 'medium')
            points = 2;
        else if (difficulty === 'hard')
            points = 3;
        this.score += points;
        this.correctAnswers++;
    }
    // Get the current score
    getScore() {
        return this.score;
    }
    // Calculate the total score percentage
    calculatePercentage() {
        const maxPoints = 9; // Maximum possible points
        return Math.round(((this.score) / maxPoints) * 100);
    }
    // Reset the score for a new game
    reset() {
        this.score = 0;
        this.correctAnswers = 0;
    }
    // Add the player's score to the leaderboard
    updateLeaderboard() {
        const percentage = this.calculatePercentage();
        // Check if the player already exists in the leaderboard
        const existingPlayer = this.leaderboard.find(player => player.name === this.playerName);
        if (existingPlayer) {
            // Update the score only if the new score is higher
            if (this.score > existingPlayer.score) {
                existingPlayer.score = this.score;
                existingPlayer.percentage = percentage;
            }
        }
        else {
            // Add the player to the leaderboard if they don't already exist
            this.leaderboard.push({ name: this.playerName, score: this.score, percentage });
        }
        // Sort the leaderboard by score in descending order
        this.leaderboard.sort((a, b) => b.score - a.score);
    }
    // Get the player's rank
    getRank() {
        this.updateLeaderboard();
        return this.leaderboard.findIndex(player => player.name === this.playerName) + 1;
    }
    // Get the player's details
    getPlayerDetails() {
        return {
            name: this.playerName,
            rank: this.getRank(),
            score: this.score,
            percentage: this.calculatePercentage()
        };
    }
}
