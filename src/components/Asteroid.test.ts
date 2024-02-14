import Phaser from "phaser";

// @ts-ignore 
import Asteroid from './Asteroid';
import constants from '../../constants';

jest.mock('phaser');

describe('Asteroid', () => {
    let scene: Phaser.Scene;
    let asteroidsGroup: Phaser.Physics.Arcade.Group;

    beforeEach(() => {
        scene = new Phaser.Scene();
        asteroidsGroup = new Phaser.Physics.Arcade.Group();
    });

    it('should create an asteroid with random position, velocity, and scale', () => {
        const sprite = 'asteroid';
        const asteroid = new Asteroid(scene, sprite, asteroidsGroup);
        expect(scene.add.existing).toHaveBeenCalledWith(asteroid);
        expect(scene.physics.add.existing).toHaveBeenCalledWith(asteroid);
        expect(asteroidsGroup.add).toHaveBeenCalledWith(asteroid);
        expect(asteroid.setVelocity).toHaveBeenCalled();
        expect(asteroid.setScale).toHaveBeenCalled();
    });
});