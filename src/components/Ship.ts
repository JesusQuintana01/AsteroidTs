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
            frames: this.anims.generateFrameNumbers(assets.SHIP.KEY, { frames: [1, 4] }), // Creates an animation for the ship
            frameRate: 20,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(assets.SHIP.KEY, { frames: [0, 3] }), // Creates an animation for the ship
            frameRate: 20,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(assets.SHIP.KEY, { frames: [2, 5] }), // Creates an animation for the ship
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
            this.play('left', true)
        } else if (this.cursors.right?.isDown) {
            this.setVelocityX(this.speed);
            this.play('right', true)
        } else {
            this.setVelocityX(0);
            this.play('turn', true)
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
                this.setScale(1.4);
                this.setSize(15, 25)
                this.speed = 100
            }
            this.smallMode = !this.smallMode;
        } else {
            this.setScale(2);
            this.setSize(35, 50)
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

