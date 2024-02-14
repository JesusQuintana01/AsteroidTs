import Phaser from 'phaser';
import AsteroidsRain from './AsteroidsRain';
import { mockAsteroidConstructor } from './Asteroid';
import constants from '../../constants';

jest.mock('../../constants', () => {
    return { default: { ASTEROID_SPAWN_RATE: 1000 } }
});

jest.mock('../../assets', () => {
    return {
        default: {
            ASTEROID: { KEY: 'test_asteroid' },
        }
    }
});

jest.mock('./Asteroid', () => {
    const mockAsteroidConstructor = jest.fn();
    const mockAsteroid = jest.fn().mockImplementation((scene, key, group) => {
        mockAsteroidConstructor(scene, key, group);
    });

    return {
        mockAsteroidConstructor,
        default: mockAsteroid
    };
});

describe('AsteroidsRain', () => {
    let scene: Phaser.Scene;

    beforeEach(() => {
        scene = new Phaser.Scene();
        scene.time = {
            addEvent: jest.fn()
        } as unknown as Phaser.Time.Clock;
    });

    it('should create asteroids at a set interval', () => {
        console.log(constants);

        const asteroidsRain = new AsteroidsRain(scene);
        expect(scene.time.addEvent).toHaveBeenCalledTimes(1);

        const addEventCall = (scene.time.addEvent as jest.Mock).mock.calls[0][0].callback;
        addEventCall();

        expect(mockAsteroidConstructor).toHaveBeenCalledWith(scene, 'test_asteroid', expect.anything());
    });
});
