import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';

jest.mock('phaser', () => {
    const originalModule = jest.requireActual('phaser');

    return {
        __esModule: true, // Use it when dealing with ES Modules
        default: {
            ...originalModule,
            Scene: jest.fn().mockImplementation(() => ({
                add: { existing: jest.fn() },
            })),
            GameObjects: {
                Text: jest.fn().mockImplementation((scene, x, y, text, style) => ({
                    x,
                    y,
                    text,
                    style,
                    setOrigin: jest.fn().mockReturnThis(),
                    setDepth: jest.fn().mockReturnThis(),
                    setText: jest.fn().mockImplementation(function (newString: string) { this.text = newString; return this; }),
                })),
            },
        }
    };
});


describe('ScoreLabel', () => {
    let scene: Phaser.Scene;
    let scoreLabel: ScoreLabel;

    beforeEach(() => {
        scene = new Phaser.Scene();
        scoreLabel = new ScoreLabel(scene, 100, 100, 0, { font: '32px Arial', color: '#ffffff' });
    });

    it('should correctly initialize with a score', () => {
        expect(scoreLabel.text).toBe('Score: 0');
        expect(scoreLabel.x).toBe(100);
        expect(scoreLabel.y).toBe(100);
        expect(scoreLabel.style.color).toBe('#ffffff');
    });
    // it('should update the score and text correctly', () => {
    //     const newScore = 100;
    //     console.log(scoreLabel.updateScore);
    //     const txt = scoreLabel.updateScore(newScore);
    //     console.log("txt", txt);
    //     expect(scoreLabel.text).toBe(`Score: ${newScore}`);
    // });

});
