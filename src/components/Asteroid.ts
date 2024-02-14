import Phaser from "phaser";
import constants from "../../constants";

export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
    private H_VELOCITY: number = 0;
    private MAX_V_VELOCITY: number = 600;
    private MIN_V_VELOCITY: number = 50;
    static ROTATION_RATE: number = 0.03;

    constructor(scene: Phaser.Scene, sprite: string, asteroidsGroup: Phaser.Physics.Arcade.Group) {
        const x = Phaser.Math.Between(
            constants.PADDING_X,
            constants.SCREEN_WITH - constants.PADDING_X
        );
        super(scene, x, -150, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        asteroidsGroup.add(this);
        this.setInteractive();
        this.setVelocity(
            this.getRandomHorizontalVelocity(),
            this.getRandomVerticalVelocity()
        );
        const scale = Phaser.Math.Between(3, 7) / 10;
        this.setScale(scale);
        this.setSize(150 * scale, 150 * scale)
    }

    private getRandomHorizontalVelocity(): number {
        return Phaser.Math.Between(-this.H_VELOCITY, this.H_VELOCITY);
    }

    private getRandomVerticalVelocity(): number {
        return Phaser.Math.Between(
            this.MIN_V_VELOCITY,
            this.MAX_V_VELOCITY
        );
    }
}
