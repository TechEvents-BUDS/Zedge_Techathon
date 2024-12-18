import Phaser from "phaser";

export default class LoaderScene extends Phaser.Scene {
  constructor() {
    super("loader-scene");
  }

  preload() {
    this.load.audio("sword_slash", "assets/Sound/Sword Hit 4.wav");

    this.load.audio("impact", "assets/Sound/03. Damage Grunt (Male).wav");

    this.load.audio("shield", "assets/Sound/Hit 2.wav");

    this.load.audio("blast", "assets/Sound/8bit_expl_medium_00.wav");

    this.load.image("sky", "assets/FULL_Fantasy Forest/Backgrounds/Sky.png");

    this.load.image(
      "tree",
      "assets/FULL_Fantasy Forest/Trees, grass and rocks/Trees.png"
    );

    this.load.image(
      "cloud",
      "assets/FULL_Fantasy Forest/Backgrounds/Clouds.png"
    );

    this.load.image(
      "rock-mountain",
      "assets/FULL_Fantasy Forest/Backgrounds/Rock Mountains.png"
    );

    this.load.image(
      "sky-mountain",
      "assets/FULL_Fantasy Forest/Backgrounds/Grass Mountains.png"
    );

    this.load.image(
      "ground",
      "assets/FULL_Fantasy Forest/Tiles/Tileset Outside.png"
    );

    this.load.image("menu-box", "assets/UI/RectangleBox_96x96.png");

    this.load.image("menu-button", "assets/UI/Button_52x14.png");

    this.load.image(
      "round-button",
      "assets/UI/BlackBigCircleBoxWithBorder_27x27.png"
    );

    this.load.image("heart-hp", "assets/UI/HeartIcons_32x32.png");

    this.load.image("tile-box", "assets/UI/TitleBox_64x16.png");

    this.load.image("metal-box", "assets/Metal-Box.png");

    this.load.spritesheet(
      "knight-idle",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/IDLE.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "knight-walking",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/WALK.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "knight-jumping",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/JUMP.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "knight-attack-1",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/ATTACK 3.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "knight-attack-2",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/ATTACK 2.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "knight-attack-3",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/ATTACK 1.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "knight-defend",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/DEFEND.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "knight-hurt",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/HURT.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "knight-death",
      "assets/Knight 2D Pixel Art/Sprites/with_outline/DEATH.png",
      {
        frameWidth: 96,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "objects",
      "assets/FULL_Fantasy Forest/Objects/Objects.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.spritesheet("skeleton", "assets/Idle.png", {
      frameWidth: 250,
      frameHeight: 250,
    });

    this.load.spritesheet("wiz_death", "assets/Death.png", {
      frameWidth: 250,
      frameHeight: 250,
    });

    this.load.spritesheet(
      "vegetation",
      "assets/FULL_Fantasy Forest/Trees, grass and rocks/Vegetation.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.spritesheet(
      "fire",
      "assets/FULL_Fantasy Forest/Objects/Bonfire.png",
      {
        frameWidth: 32,
        frameHeight: 48,
      }
    );

    this.load.spritesheet("BringerOfDeath", "assets/Bringer-of-Death.png", {
      frameWidth: 140,
      frameHeight: 93,
    });

    this.load.spritesheet("GUI", "assets/GUI.png", {
      frameWidth: 48,
      frameHeight: 45,
    });

    this.load.image("brown", "assets/Box-For-Riddle.png");

    this.load.spritesheet(
      "demon-idle-only",
      "assets/Demon Samurai 2D Pixel Art/Sprites/IDLE.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-idle-fire",
      "assets/Demon Samurai 2D Pixel Art/Sprites/IDLE (FLAMING SWORD).png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-walking-only",
      "assets/Demon Samurai 2D Pixel Art/Sprites/RUN.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-walking-fire",
      "assets/Demon Samurai 2D Pixel Art/Sprites/RUN (FLAMING SWORD).png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-attack-one-only",
      "assets/Demon Samurai 2D Pixel Art/Sprites/ATTACK 1.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-attack-one-fire",
      "assets/Demon Samurai 2D Pixel Art/Sprites/ATTACK 1 (FLAMING SWORD).png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-attack-two-only",
      "assets/Demon Samurai 2D Pixel Art/Sprites/ATTACK 2.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-attack-two-fire",
      "assets/Demon Samurai 2D Pixel Art/Sprites/ATTACK 2 (FLAMING SWORD).png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-attack-three-only",
      "assets/Demon Samurai 2D Pixel Art/Sprites/ATTACK 3.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-attack-three-fire",
      "assets/Demon Samurai 2D Pixel Art/Sprites/ATTACK 3 (FLAMING SWORD).png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-hurt",
      "assets/Demon Samurai 2D Pixel Art/Sprites/HURT.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-death",
      "assets/Demon Samurai 2D Pixel Art/Sprites/DEATH.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-jump",
      "assets/Demon Samurai 2D Pixel Art/Sprites/JUMP ATTACK.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-jump-fire",
      "assets/Demon Samurai 2D Pixel Art/Sprites/JUMP ATTACK (FLAMING SWORD).png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "demon-shout",
      "assets/Demon Samurai 2D Pixel Art/Sprites/SHOUT.png",
      {
        frameWidth: 128,
        frameHeight: 108,
      }
    );

    this.load.spritesheet(
      "witch-idle",
      "assets/B_witch_idle.png",
      {
        frameWidth: 32,
        frameHeight: 48,
      }
    );

    this.load.audio('roar', 'assets/Sound/monster-roar.mp3');

    this.load.audio('large-roar', 'assets/Sound/large-monster-roar.mp3');

    this.load.audio('war-druming', 'assets/Sound/war-drum-loop.mp3');

    this.load.audio('creator-sound', 'assets/Sound/creator.mp3');

    this.load.audio('strategy-sound', 'assets/Sound/strategy.mp3');

    this.load.audio('trivia-sound', 'assets/Sound/trivia.mp3');

  }

  create() {
    this.scene.switch("menu-scene");
  }
}
