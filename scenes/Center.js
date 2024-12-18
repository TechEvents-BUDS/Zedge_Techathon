import Phaser from "phaser";
import Timer from "./Timer";
import Respect from "./Respect";

export default class CreatorScene extends Phaser.Scene {
  constructor() {
    super("creator-scene");
    this.respect = 100;
  }

  create() {

    this.add.image(150, 150, "sky");
    this.add.image(450, 150, "sky");
    this.add.image(750, 150, "sky");
    this.add.image(150, 170, "cloud");
    this.add.image(470, 170, "cloud");
    this.add.image(790, 170, "cloud");
    this.add.image(150, 250, "rock-mountain");
    this.add.image(450, 250, "rock-mountain");
    this.add.image(750, 250, "rock-mountain");
    this.add.image(150, 310, "sky-mountain");
    this.add.image(450, 310, "sky-mountain");
    this.add.image(750, 310, "sky-mountain");
    this.add.image(80, 410, "tree");
    this.add.image(680, 410, "tree").setFlip(true);
    this.add.image(100, 530, "tiles");
    this.add.image(375, 530, "tiles");
    this.add.image(650, 530, "tiles");
    this.add.image(800, 530, "tiles");
    let ground1 = this.physics.add.staticImage(100, 530, "ground");
    let ground2 = this.physics.add.staticImage(375, 530, "ground");
    let ground3 = this.physics.add.staticImage(650, 530, "ground");
    let ground4 = this.physics.add.staticImage(800, 530, "ground");
    

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("knight-idle", {
        frames: [0, 1, 2, 3, 4, 5, 6],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "witch",
      frames: this.anims.generateFrameNumbers("witch-idle", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "walking",
      frames: this.anims.generateFrameNumbers("knight-walking", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.healthElement = document.getElementsByTagName("h1")[0];
    this.borderElement = document.getElementById("app");

    this.healthElement.style.color = "#fff"
    this.borderElement.style.borderColor = "#fff"

    this.knight = this.physics.add.sprite(300, 400, "knight-idle");
    this.knight.play("idle", true).setScale(1.5);

    this.knight.body.setSize(38, 32);
    this.knight.body.setOffset(34, 30);

    // Create the enemy sprite
    this.enemy = this.physics.add.sprite(450, 400, "witch-idle");
    this.enemy.play("witch", true).setScale(1.8).setFlip(true);

    this.enemy.body.setSize(32, 40);
    this.enemy.body.setOffset(0, -2)

    this.physics.add.collider(
      [this.knight, this.enemy, this.grass, this.rock],
      [ground1, ground2, ground3, ground4]
    );

    this.enemy.setCollideWorldBounds(true);
    this.knight.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.approachingDistance = 100;

    this.creatorSound = this.sound.add("creator-sound", {loop: true});
    this.creatorSound.play();

    this.respect = new Respect();
    this.add.image(700, 20, "tile-box").setScale(4);
    this.respectText = this.add.text(620, 12, `Respect: ${this.respect.getValue()}`, { fontSize: '25px', fontFamily: "GameFont", fill: '#fff' });


    this.timer = new Timer();
    this.add.image(80, 20, "tile-box").setScale(4);
    this.timerText = this.add.text(
      20,
      12,
      `Time: ${this.timer.getTimeLeft()}`,
      { fontSize: "25px", fontFamily: "GameFont", fill: "#fff" }
    );

    this.timer.setCallback((timeLeft) => {
      this.timerText.setText(`Time: ${timeLeft}`);
      if (timeLeft <= 0) {
        this.creatorSound.stop();
        this.scene.start("game-over-scene");
      }
    });

    this.timer.start();
    this.events.on("wake", this.wake, this);
  }

  wake() {
    this.respectText.setText(`Respect: ${this.respect.getValue()}`);
    this.timer.setCallback((timeLeft) => {
      this.timerText.setText(`Time: ${timeLeft}`);
      if (timeLeft <= 0) {
        this.creatorSound.stop();
        this.scene.start("game-over-scene");
      }
    });
  }

  update() {
    if (this.cursors.right.isDown) {
      this.knight.setVelocityX(50);
      this.knight.play("walking", true);

      this.knight.once("animationcomplete", () => {
        if (this.knight.anims.currentAnim.key === "walking") {
          this.knight.play("idle", true);
        }
      });
    } else if (this.cursors.left.isDown) {
      this.knight.setVelocityX(-50);
      this.knight.play("walking", true);

      this.knight.once("animationcomplete", () => {
        if (this.knight.anims.currentAnim.key === "walking") {
          this.knight.play("idle", true);
        }
      });
    } else {
      this.knight.setVelocityX(0);
      this.knight.play("idle", true);
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy.x,
      this.enemy.y,
      this.knight.x,
      this.knight.y
    );

    if (distanceToPlayer < this.approachingDistance) {
      if (!this.knightLevel) {
        this.circleC = this.add.image(300, 250, "round-button").setScale(1.5);
        this.knightLevel = this.add
          .text(300, 250, "C", {
            fontFamily: "GameFont",
            fontSize: "30px",
            fill: "#dab187",
          })
          .setInteractive()
          .setOrigin(0.5)
          .on("pointerdown", () => this.handlePlayerChoice(this.respect.getValue() > 80 ? "knight-scene" : "devil-scene"));
      }
      if (!this.strategyLevel) {
        this.circleS = this.add.image(400, 250, "round-button").setScale(1.5);
        this.strategyLevel = this.add
          .text(400, 250, "S", {
            fontFamily: "GameFont",
            fontSize: "30px",
            fill: "#dab187",
          })
          .setInteractive()
          .setOrigin(0.5)
          .on("pointerdown", () => this.handlePlayerChoice("strategy-scene"));
      }
      if (!this.knowledgeLevel) {
        this.circleK = this.add.image(500, 250, "round-button").setScale(1.5);
        this.knowledgeLevel = this.add
          .text(500, 250, "K", {
            fontFamily: "GameFont",
            fontSize: "30px",
            fill: "#dab187",
          })
          .setInteractive()
          .setOrigin(0.5)
          .on("pointerdown", () => this.handlePlayerChoice("trivia-scene"));
      }
    } else {
      if (this.knightLevel) {
        this.knightLevel.destroy();
        this.circleC.destroy();
        this.knightLevel = null;
      }
      if (this.strategyLevel) {
        this.circleS.destroy();
        this.strategyLevel.destroy();
        this.strategyLevel = null;
      }
      if (this.knowledgeLevel) {
        this.circleK.destroy();
        this.knowledgeLevel.destroy();
        this.knowledgeLevel = null;
      }
    }
  }

  handlePlayerChoice(choice) {
    this.creatorSound.stop();
    console.log(`Player chose to enter ${choice} challenge.`);
    this.scene.start(choice);
  }
}