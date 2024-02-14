import Phaser from 'phaser';
import constants from '../../constants';
import assets from '../../assets';

interface Data {
    score: number
}
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: constants.SCENES_KEYS.GAME_OVER });
    }
    preload() {
        this.load.spritesheet("aaa", assets.SHIP.URL, { frameWidth: 42.6, frameHeight: 46.5 });
    }

    create(data: Data) {
        this.add.text(250, 200, 'Game Over', { fontSize: '64px' }).setOrigin(0.5);
        const restartText = this.add.text(250, 400, 'Restart', { fontSize: '32px' }).setOrigin(0.5);
        this.add.text(250, 300, `Final score: ${data.score}`, { fontSize: '42px' }).setOrigin(0.5);

        restartText.setInteractive();
        restartText.on('pointerdown', () => {
            this.scene.start(constants.SCENES_KEYS.MAIN_SCENE);
        });

        const ship = this.add.sprite(250, 550, assets.SHIP.KEY).setScale(4)
        this.anims.create({
            key: 'logo',
            frames: ship.anims.generateFrameNumbers(assets.SHIP.KEY, { frames: [1, 4] }), // Creates an animation for the ship
            frameRate: 20,
            repeat: -1
        });
        ship.play("logo")

    }
}
