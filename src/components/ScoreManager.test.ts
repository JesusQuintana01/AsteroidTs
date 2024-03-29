import Phaser from 'phaser';
import ScoreManager from './ScoreManager'; // Adjust the import path as necessary

jest.mock('phaser');

describe('ScoreManager', () => {
    let scene: Phaser.Scene;
    let scoreManager: ScoreManager;

    beforeEach(() => {
        scene = new Phaser.Scene();
        scoreManager = new ScoreManager(scene);
    });

    it('initializes with a score of 0 and correct score text', () => {
        expect(scoreManager.getScore()).toBe(0);
        expect(scene.add.text).toHaveBeenCalledWith(250, 50, 'Score:0', expect.objectContaining({ font: '36px Courier' }));
    });

    it('updates the score correctly when increaseScore is called', () => {
        scoreManager.increaseScore(10);
        expect(scoreManager.getScore()).toBe(10);
    });

    it('resets the score correctly', () => {
        scoreManager.increaseScore(10);
        scoreManager.resetScore();
        expect(scoreManager.getScore()).toBe(0);
    });
});
