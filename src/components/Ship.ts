import Phaser from 'phaser';
import assets from '../../assets';


export default class Ship extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private speed: number;
    smallMode: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, speed?: number) {
        super(scene, x, y, texture);
        this.smallMode = false
        this.scene = scene;
        this.scene.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers(assets.SHIP.KEY, { frames: [0, 1] }), // Creates an animation for the ship
            frameRate: 20,
            repeat: -1
        });
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.speed = speed ?? 350
        //@ts-ignore
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.play('turn')
        this.setCollideWorldBounds(true);
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
                this.setScale(0.6);
                this.setSize(46, 46)
                this.speed = 100
            }
            this.smallMode = !this.smallMode;
        } else {
            this.setScale(1.1);
            this.setSize(62, 62)
            this.speed = 350
        }
    }
    collide(objectCollider: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback: () => void) {
        this.scene.physics.add.collider(
            this,
            objectCollider,
            callback,
            undefined,
            this
        );
    }
}

