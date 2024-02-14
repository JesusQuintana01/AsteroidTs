import Phaser from "phaser";
import constants from "../constants";
import MainScene from "./scenes/MainScene"
import GameOverScene from "./scenes/GameOverScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: constants.SCREEN_WITH,
    height: constants.SCREEN_HEIGHT,
    backgroundColor: "#000000",
    scene: [MainScene, GameOverScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
};
export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    var game = new Game(config);
});