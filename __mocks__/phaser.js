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
      this.scale = 0;
      this.setInteractive = jest.fn().mockReturnThis();
      this.setVelocity = jest.fn().mockReturnThis();
      this.setVelocityX = jest.fn().mockReturnThis();
      this.setVelocityY = jest.fn().mockReturnThis();
      this.setScale = jest.fn().mockReturnThis();
      this.setSize = jest.fn().mockReturnThis();
      this.play = jest.fn().mockReturnThis();
      this.setCollideWorldBounds = jest.fn().mockReturnThis();
      this.anims = {
        generateFrameNumbers: jest.fn(() => ({ frames: {} })),
      };
    }),
    Group: jest.fn().mockImplementation(function () {
      this.add = jest.fn();
    }),
  },
};
Phaser.Types = {
  Input: {
    Keyboard: {
      CursorKeys: {
        left: { isDown: Boolean },
        right: { isDown: Boolean },
        up: { isDown: Boolean },
        down: { isDown: Boolean },
        space: { isDown: Boolean },
      },
    },
  },
};

Phaser.Scene = jest.fn().mockImplementation(function () {
  this.add = {
    sprite: jest.fn(),
    existing: jest.fn(),
    nineslice: jest.fn(),
    setDepth: jest.fn(),
    text: jest.fn().mockImplementation((x, y, text, style) => ({
      x,
      y,
      text,
      style,
      setInteractive: jest.fn(),
      on: jest.fn(),
      setOrigin: jest.fn().mockReturnThis(),
      setDepth: jest.fn().mockReturnThis(),
      setText: jest.fn().mockImplementation(function (newText) {
        this.text = newText;
        return this;
      }),
    })),
  };
  this.scene = {
    add: {
      sprite: jest.fn(),
    },
  };
  this.time = {
    addEvent: jest.fn(),
  };

  this.physics = {
    add: {
      group: jest.fn().mockReturnValue([]),
      existing: jest.fn(),
      collider: jest.fn(),
      overlap: jest.fn(),
    },
  };
  this.input = {
    keyboard: {
      createCursorKeys: jest.fn(),
    },
  };
  this.anims = {
    create: jest.fn(),
    generateFrameNumbers: jest.fn(() => ({ frames: {} })),
  };
  this.cameras = {
    main: {
      setBounds: jest.fn(),
    },
  };
});

Phaser.Math.Between = jest.fn(
  (min, max) => Math.floor((max - min + 1) * Math.random()) + min
);

module.exports = {
  default: Phaser,
};
