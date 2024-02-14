import MainScene from './MainScene';
import EnvironmentLoader from '../components/Environment';
import ScoreManager from '../components/ScoreManager';

// Mock de Phaser.Scene para simular la escena
jest.mock('phaser');
jest.mock('../components/Environment', () => {
    const mockEnvironmentConstructor = jest.fn();
    const mockEnvironment = jest.fn().mockImplementation((scene) => {
        mockEnvironmentConstructor(scene);
        return {
            create: jest.fn(),
            getZone: jest.fn()
        };
    });
    return {
        mockEnvironmentConstructor,
        default: mockEnvironment
    };
});
jest.mock('../components/ScoreManager', () => {
    const mockScoreManagerConstructor = jest.fn();
    const mockScoreManager = jest.fn().mockImplementation((scene) => {
        mockScoreManagerConstructor(scene);
    });
    return {
        mockScoreManagerConstructor,
        default: mockScoreManager
    };
});
// Pruebas para MainScene
describe('MainScene', () => {
    let scene: MainScene;
    let environmentLoader: EnvironmentLoader;

    beforeEach(() => {
        scene = new MainScene();
        environmentLoader = new EnvironmentLoader(scene);
    });


    it('create should initialize components correctly', () => {

        scene.create();
        expect(scene.asteroidRain).toBeDefined();
        expect(scene.scoreManager).toBeDefined();
        expect(scene.ship).toBeDefined();

    });

});
