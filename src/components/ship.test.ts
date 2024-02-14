import Phaser from 'phaser';
import Ship from './Ship';

jest.mock('phaser');

describe.only('Ship', () => {
    let scene: Phaser.Scene;
    let ship: Ship;

    beforeEach(() => {
        scene = new Phaser.Scene();
        ship = new Ship(scene, 0, 0, 'ship_texture');
    });

    it('should create a ship with initial settings', () => {
        expect(scene.anims.create).toHaveBeenCalledWith({
            key: 'turn',
            frames: expect.any(Object),
            frameRate: 20,
            repeat: -1
        });
        expect(scene.add.existing).toHaveBeenCalledWith(ship);
        expect(scene.physics.add.existing).toHaveBeenCalledWith(ship);
        expect(ship.setCollideWorldBounds).toHaveBeenCalledWith(true);
        expect(ship.play).toHaveBeenCalledWith('turn');
    });

    it('should update ship enter in small mode', () => {
        const cursorKeysMock: Phaser.Types.Input.Keyboard.CursorKeys = {
            space: { isDown: true }
        };
        ship.cursors = cursorKeysMock;

        ship.update();
        expect(ship.smallMode).toBe(true);
    });

    it('should collide with another object and trigger the callback', () => {
        const objectColliderMock: Phaser.Types.Physics.Arcade.ArcadeColliderType = jest.fn() as any;
        const callbackMock = jest.fn();
        ship.collide(objectColliderMock, callbackMock);

        expect(scene.physics.add.collider).toHaveBeenCalledWith(
            ship,
            objectColliderMock,
            callbackMock,
            undefined,
            ship
        );
    });
});
