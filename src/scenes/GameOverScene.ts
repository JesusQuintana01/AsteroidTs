import Phaser from 'phaser';
import constants from '../../constants';

interface Data {
    score: number
}
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: constants.SCENES_KEYS.GAME_OVER });
    }

    create(data: Data) {
        this.add.text(250, 200, 'Game Over', { fontSize: '64px' }).setOrigin(0.5);
        const restartText = this.add.text(250, 400, 'Restart', { fontSize: '32px' }).setOrigin(0.5);
        this.add.text(250, 300, `Final score: ${data.score}`, { fontSize: '42px' }).setOrigin(0.5);

        restartText.setInteractive();
        restartText.on('pointerdown', () => {
            this.scene.start(constants.SCENES_KEYS.MAIN_SCENE);
        });
    }
}
