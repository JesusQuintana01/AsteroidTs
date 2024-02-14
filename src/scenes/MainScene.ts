import Phaser from "phaser";
import Asteroid from "../components/Asteroid";
import constants from "../../constants";
import assets from "../../assets"
import ScoreManager from "../components/ScoreManager";
import AsteroidsRain from "../components/AsteroidsRain";
import EnvironmentLoader from '../components/Environment';
import Ship from "../components/Ship";

export default class MainScene extends Phaser.Scene {
    asteroidRain?: AsteroidsRain; // Declares a property to hold a group of asteroids
    scoreManager?: ScoreManager; // Declares a property to manage the score
    environmentLoader: EnvironmentLoader; // Declares a property to load environment assets
    ship?: Ship; // Declares a property to hold the player's ship
    isGameStarted: boolean; // Declares a boolean to track if the game has started or not

    constructor() {
        super({ key: constants.SCENES_KEYS.MAIN_SCENE });
        this.environmentLoader = new EnvironmentLoader(this);
        this.isGameStarted = false;
    }

    preload() {
        this.environmentLoader.preload();
        this.load.image(assets.ASTEROID.KEY, assets.ASTEROID.URL);
        this.load.spritesheet(assets.SHIP.KEY, assets.SHIP.URL, { frameWidth: 42.6, frameHeight: 46.5 });
        this.load.atlas(assets.BTN_UI.KEY, assets.BTN_UI.URL, assets.BTN_UI.JSON);
    }

    create() {
        this.cameras.main.setBounds(
            0,
            0,
            constants.SCREEN_WITH,
            constants.SCREEN_HEIGHT
        );
        this.environmentLoader.create();
        // Pauses the game until the player clicks to continue
        if (!this.isGameStarted) {
            const clickText = this.add.text(
                70,
                constants.SCREEN_HEIGHT / 2,
                "Click to continue",
                { font: "48px Arial" }
            ).setDepth(3);
            clickText.setInteractive();
            clickText.on("pointerup", () => {
                this.isGameStarted = true;
                clickText.setVisible(false);
                this.scene.resume();
            });
        }
        //create Score Manager
        this.scoreManager = new ScoreManager(this);

        //create Asteroid rain
        this.asteroidRain = new AsteroidsRain(this);
        this.asteroidRain?.collide(this.asteroidRain?.getAsteroidGroup(), this.asteroidCollisionHandler)
        this.physics.add.overlap(this.environmentLoader.getZone(), this.asteroidRain.getAsteroidGroup(), (_zone, asteroid) => {
            asteroid.destroy();
            this.scoreManager?.increaseScore(1);
        });

        //create Ship
        this.ship = new Ship(this, constants.SCREEN_WITH / 2, constants.SCREEN_HEIGHT / 2, assets.SHIP.KEY);
        this.ship?.collide(this.asteroidRain?.getAsteroidGroup(), () => {
            this.scene.pause();
            this.environmentLoader.getSoundtrack()?.stop();
            this.moveToGameOver();
        })
    }

    update() {
        //@ts-ignore
        this.asteroidRain?.getAsteroidGroup().children.iterate((asteroid: Phaser.Types.GameObjects) => {
            if (!this.isGameStarted) {
                (asteroid as Phaser.Physics.Arcade.Sprite).destroy(); // Destroys asteroids if the game hasn't started yet
            }
            (asteroid as Phaser.Physics.Arcade.Sprite).rotation += Asteroid.ROTATION_RATE;
        });
        this.ship?.update();
        this.asteroidRain?.update();
    }

    restartScene() {
        this.scene.restart();
    }

    asteroidCollisionHandler = (asteroid1: Phaser.Types.Physics.Arcade.ArcadeColliderType, asteroid2: Phaser.Types.Physics.Arcade.ArcadeColliderType) => {
        if (asteroid1 instanceof Phaser.Physics.Arcade.Sprite && asteroid2 instanceof Phaser.Physics.Arcade.Sprite) {
            asteroid1.setBounce(0, constants.ASTEROID_COLLITION_VALUE.OBJ1);
            asteroid2.setBounce(0, constants.ASTEROID_COLLITION_VALUE.OBJ2);
        }
    }
    //move to game over scene
    private moveToGameOver() {
        this.restartScene();
        this.scene.start(constants.SCENES_KEYS.GAME_OVER, { score: this.scoreManager?.getScore() });
    }
}
