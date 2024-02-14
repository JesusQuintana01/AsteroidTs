import Phaser from "phaser";

export default class ScoreManager {
    private score: number;
    private scoreText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.score = 0;
        this.scoreText = scene.add.text(250, 50, 'Score:0', { font: '36px Courier' }).setOrigin(0.5, 0.5).setDepth(1);
    }

    increaseScore(points: number) {
        this.score += points;
        this.updateScoreText();
    }

    resetScore() {
        this.score = 0;
        this.updateScoreText();
    }

    private updateScoreText() {
        this.scoreText.setText(`Score:${this.score}`);
    }

    getScore(): number {
        return this.score;
    }
}
