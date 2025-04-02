export class ScoringService {
    constructor(totalQuestions, playerName) {
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = totalQuestions;
        this.playerName = playerName;
        this.leaderboard = [];
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
    // Add the player's score to the leaderboard
    updateLeaderboard() {
        // Check if the player already exists in the leaderboard
        const existingPlayer = this.leaderboard.find(player => player.name === this.playerName);
        if (existingPlayer) {
            // Update the score only if the new score is higher
            if (this.score > existingPlayer.score) {
                existingPlayer.score = this.score;
            }
        }
        else {
            // Add the player to the leaderboard if they don't already exist
            this.leaderboard.push({ name: this.playerName, score: this.score });
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
            score: this.score
        };
    }
}
