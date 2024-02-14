// __mocks__/phaserMock.js or similar file
// const Phaser = jest.createMockFromModule("phaser");

const Phaser = {
  Math: {},
};

Phaser.Physics = {
  Arcade: {
    Sprite: jest.fn().mockImplementation(function (scene, x, y, sprite) {
      this.x = x;
      this.y = y;
      this.sprite = sprite;
      this.setInteractive = jest.fn().mockReturnThis();
      this.setVelocity = jest.fn().mockReturnThis();
      this.setScale = jest.fn().mockReturnThis();
      this.setSize = jest.fn().mockReturnThis();
    }),
    Group: jest.fn().mockImplementation(function () {
      this.add = jest.fn();
    }),
  },
};

Phaser.Scene = jest.fn().mockImplementation(function () {
  this.add = {
    existing: jest.fn(),
  };

  this.time = {
    addEvent: jest.fn(),
  };

  this.physics = {
    add: {
      group: jest.fn().mockReturnValue([]),
      existing: jest.fn(),
    },
  };
  this.input = {
    keyboard: {
      createCursorKeys: jest.fn(),
    },
  };
});

Phaser.Math.Between = jest.fn(
  (min, max) => Math.floor((max - min + 1) * Math.random()) + min
);

module.exports = {
  default: Phaser,
};
