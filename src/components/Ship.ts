import Phaser from 'phaser';
import constants from '../../constants';

export default class Ship extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private speed: number;
    private smallMode: boolean;
    private turboMode: boolean;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, speed?: number) {
        super(scene, x, y, texture);
        this.smallMode = false
        this.turboMode = false
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.speed = speed ?? 350
        //@ts-ignore
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setScale(2);
        this.setSize(22, 22)
        this.play('turn')
    }

    update() {
        if (this.cursors.left?.isDown) {
            this.setVelocityX(-this.speed);
        } else if (this.cursors.right?.isDown) {
            this.setVelocityX(this.speed);
        } else {
            this.setVelocityX(0);
        }
        if (this.cursors.up?.isDown) {
            this.setVelocityY(-this.speed);
        } else if (this.cursors.down?.isDown) {
            this.setVelocityY(this.speed);
        } else {
            this.setVelocityY(0);
        }
        if (this.cursors.space?.isDown) {
            if (this.smallMode) {
                this.setScale(1.2);
                this.setSize(11, 11)
                this.speed = 100
            }
            this.smallMode = !this.smallMode;
        } else {
            this.setScale(2);
            this.setSize(22, 22)
            this.speed = 350
        }
    }
}

