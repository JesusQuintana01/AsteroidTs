import Phaser from "phaser";
import Asteroid from "./Asteroid";
import constants from "../../constants";
import assets from "../../assets";

export default class AsteroidsRain {
    private scene: Phaser.Scene;
    private asteroidGroup: Phaser.Physics.Arcade.Group;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private areMeteoritesAccelerated: boolean;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.asteroidGroup = this.scene.physics.add.group();
        this.createAsteroids();
        this.areMeteoritesAccelerated = false;
        //@ts-ignore
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    private createAsteroids() {
        this.scene.time.addEvent({
            delay: constants.ASTEROID_SPAWN_RATE,
            loop: true,
            callback: () => {
                new Asteroid(this.scene, assets.ASTEROID.KEY, this.asteroidGroup);
            },
        });
    }

    getAsteroidGroup() {
        return this.asteroidGroup;
    }
    update() {
        if (this.cursors.shift?.isDown) {
            if (!this.areMeteoritesAccelerated) {
                //@ts-ignore
                this.asteroidGroup.children.iterate((asteroid: Phaser.Types.GameObjects) => {
                    //@ts-ignore
                    (asteroid as Phaser.Physics.Arcade.Sprite).setVelocityY(800)
                });
            }
        } else {
            this.areMeteoritesAccelerated = false
        }
    }
}
