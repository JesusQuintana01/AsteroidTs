import Phaser from "phaser";

export default class ScoreLabel extends Phaser.GameObjects.Text {
    private score: number;

    constructor(scene: Phaser.Scene, x: number, y: number, score: number, style: Phaser.Types.GameObjects.Text.TextStyle) {
        super(scene, x, y, `Score: ${score}`, style);
        this.score = score;
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setDepth(1);

    }

    public updateScore(newScore: number): string {
        this.score = newScore;
        this.setText(`Score: ${this.score}`);
        return this.text
    }
}
