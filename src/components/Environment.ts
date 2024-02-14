import Phaser from "phaser";
import constants from "../../constants";
import assets from "../../assets";

export default class EnvironmentLoader {
    private scene: Phaser.Scene;
    private soundtrack?: Phaser.Sound.BaseSound;
    private zone: Phaser.GameObjects.Zone;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    preload() {
        // Load assets
        this.scene.load.spritesheet(assets.BACKGROUND.KEY, assets.BACKGROUND.URL, { frameWidth: constants.SCREEN_WITH, frameHeight: constants.SCREEN_HEIGHT });
        this.scene.load.audio(assets.MUSIC.KEY, assets.MUSIC.URL)
    }

    create() {
        // Create background
        this.scene.anims.create({
            key: assets.BACKGROUND.KEY,
            frames: this.scene.anims.generateFrameNumbers(assets.BACKGROUND.KEY, { start: 0, end: 27 }), // Creates an animation for the background
            frameRate: 15,
            repeat: -1
        });
        this.scene.add.sprite(constants.SCREEN_WITH / 2, constants.SCREEN_HEIGHT / 2, assets.BACKGROUND.KEY).play(assets.BACKGROUND.KEY).setScale(1.6);

        // Create zone
        this.zone = this.scene.add.zone(0, constants.SCREEN_HEIGHT - 10, constants.SCREEN_WITH * 2, 0);
        this.scene.physics.add.existing(this.zone, true);

        // Play soundtrack
        this.soundtrack = this.scene.sound.add(assets.MUSIC.KEY, { loop: true });
        this.soundtrack.play();

        //labels
        this.scene.add.nineslice(250, 50, 'ui', 'RedButtonSml', 400, 68, 40, 40, 25, 25).setDepth(1)
        this.scene.add.nineslice(400, 760, 'ui', 'blue_button00', 180, 44, 33, 33, 24, 24).setDepth(1)
        const st = this.scene.add.text(350, 750, "Unmuted").setFontSize(24).setDepth(2);
        st.setInteractive();
        st.on("pointerup", () => {
            this.scene.sound.mute = !this.scene.sound.mute;
            st.setText(this.scene.sound.mute ? "Unmuted" : "Muted");
        });
    }

    getSoundtrack(): Phaser.Sound.BaseSound | undefined {
        return this.soundtrack;
    }
    getZone(): Phaser.GameObjects.Zone {
        return this.zone
    }
}
