import Phaser from "phaser";
import Asteroid from "../components/Asteroid";
import constants from "../../constants";
import assets from "../../assets"
import ScoreManager from "../components/ScoreManager";
import AsteroidsRain from "../components/AsteroidsRain";
import EnvironmentLoader from '../components/Environment';
import Ship from "../components/Ship";

export default class MainScene extends Phaser.Scene {
    private asteroidGroup?: AsteroidsRain; // Declares a property to hold a group of asteroids
    private scoreManager?: ScoreManager; // Declares a property to manage the score
    private environmentLoader: EnvironmentLoader; // Declares a property to load environment assets
    private ship?: Ship; // Declares a property to hold the player's ship
    private isGameStarted: boolean; // Declares a boolean to track if the game has started or not

    constructor() {
        super({ key: constants.SCENES_KEYS.MAIN_SCENE });
        this.environmentLoader = new EnvironmentLoader(this);
        this.isGameStarted = false;
    }

    preload() {
        this.environmentLoader.preload();
        this.load.image(assets.ASTEROID.KEY, assets.ASTEROID.URL);
        this.load.spritesheet(assets.SHIP.KEY, assets.SHIP.URL, { frameWidth: 16, frameHeight: 24 });
        this.load.atlas(assets.BTN_UI.KEY, assets.BTN_UI.URL, assets.BTN_UI.JSON);
    }

    create() {
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

        this.scoreManager = new ScoreManager(this);
        this.asteroidGroup = new AsteroidsRain(this);
        this.physics.add.collider(
            this.asteroidGroup.getAsteroidGroup(),
            this.asteroidGroup.getAsteroidGroup(),
            //@ts-ignore
            this.asteroidCollisionHandler, // Handles collisions between asteroids
            undefined,
            this
        );

        this.physics.add.overlap(this.environmentLoader.getZone(), this.asteroidGroup.getAsteroidGroup(), (_zone, asteroid) => {
            asteroid.destroy();
            this.scoreManager?.increaseScore(1);
        });

        this.cameras.main.setBounds(
            0,
            0,
            constants.SCREEN_WITH,
            constants.SCREEN_HEIGHT
        );
        //create Ship
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers(assets.SHIP.KEY, { frames: [3, 8] }), // Creates an animation for the ship
            frameRate: 20,
            repeat: -1
        });
        this.ship = new Ship(this, constants.SCREEN_WITH / 2, constants.SCREEN_HEIGHT / 2, assets.SHIP.KEY);

        this.ship?.setCollideWorldBounds(true);

        this.physics.add.collider(
            this.ship,
            this.asteroidGroup.getAsteroidGroup(),
            //@ts-ignore
            () => {
                this.scene.pause();
                this.environmentLoader.getSoundtrack()?.stop();
                this.moveToGameOver();
            },
            undefined,
            this
        );
    }

    update() {
        //@ts-ignore
        this.asteroidGroup?.getAsteroidGroup().children.iterate((asteroid: Phaser.Types.GameObjects) => {
            if (!this.isGameStarted) {
                (asteroid as Phaser.Physics.Arcade.Sprite).destroy(); // Destroys asteroids if the game hasn't started yet
            }
            (asteroid as Phaser.Physics.Arcade.Sprite).rotation += Asteroid.ROTATION_RATE;
        });
        this.ship?.update();
        this.asteroidGroup?.update();
    }

    restartScene() {
        this.scene.restart();
    }

    private asteroidCollisionHandler(asteroid1: Phaser.Types.Physics.Arcade.ArcadeColliderType, asteroid2: Phaser.Types.Physics.Arcade.ArcadeColliderType) {
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
