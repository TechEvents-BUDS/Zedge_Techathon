import Phaser from "phaser";
import Respect from "./Respect";

export default class Trivia extends Phaser.Scene {
  constructor() {
    super("trivia-scene");
    this.counter = 0;
    this.timeLimit = 20;
    this.gameState = false;
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
    this.add.image(730, 410, "tree").setFlip(true);
    this.add.image(220, 410, "tree");
    this.add.image(600, 410, "tree").setFlip(true);

    this.add.image("brown");
    this.cursors = this.input.keyboard.createCursorKeys();

    const ground1 = this.physics.add.staticImage(100, 530, "ground");
    const ground2 = this.physics.add.staticImage(375, 530, "ground");
    const ground3 = this.physics.add.staticImage(650, 530, "ground");
    const ground4 = this.physics.add.staticImage(800, 530, "ground");

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("knight-idle", {
        frames: [0, 1, 2, 3, 4, 5, 6],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "bringer-idle",
      frames: this.anims.generateFrameNumbers("BringerOfDeath", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "bonfire",
      frames: this.anims.generateFrameNumbers("fire", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "knight-death",
      frames: this.anims.generateFrameNumbers("knight-death", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "bringer-death",
      frames: this.anims.generateFrameNumbers("BringerOfDeath", {
        frames: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
      }),
      frameRate: 8,
    });

    this.triviaSound = this.sound.add("trivia-sound", {loop: true});
    this.triviaSound.play()

    this.bonfire = this.physics.add.sprite(400, 400, "bonfire");
    this.bonfire.play("bonfire", true);
    this.bonfire.setBodySize(32, 48);
    this.bonfire.setScale(1.2);

    this.knight = this.physics.add
      .sprite(310, 390, "knight-idle")
      .play("idle", true)
      .setScale(1.5);
    this.knight.body.setSize(38, 32);
    this.knight.body.setOffset(34, 30);

    this.enemy = this.physics.add
      .sprite(450, 390, "BringerOfDeat")
      .play("bringer-idle", true)
      .setScale(1.2);
    this.enemy.body.setSize(140, 93);

    this.physics.add.collider(
      [this.knight, this.enemy, this.bonfire, this.board],
      [ground1, ground2, ground3, ground4]
    );

    this.fetchRiddle();

    this.respect = new Respect();
    this.add.image(750, 25, "tile-box").setScale(4);
    this.respectText = this.add.text(650, 18, `Respect: ${this.respect.getValue()}`, { fontSize: '20px', fontFamily: "GameFont", fill: '#fff' });
    this.events.on('wake', this.wake, this);
  }

  wake() {
    this.respectText.setText(`Respect: ${this.respect.getValue()}`);
  }

  async fetchRiddle() {
    try {
      const response = await fetch("http://127.0.0.1:8000/fetch_questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const riddleObject = await response.json();
  
      if (this.counter === 0) {
        this.riddle = riddleObject.first.question;
        this.correctAnswer = riddleObject.first.answer.toLowerCase();
      } else if (this.counter === 1) {
        this.riddle = riddleObject.second.question;
        this.correctAnswer = riddleObject.second.answer.toLowerCase();
      } else if (this.counter === 2) {
        this.riddle = riddleObject.third.question;
        this.correctAnswer = riddleObject.third.answer.toLowerCase();
      } else {
        this.counter = 0; // Reset if out of bounds
        this.riddle = riddleObject.first.question;
        this.correctAnswer = riddleObject.first.answer.toLowerCase();
      }
  
      this.askRiddle();
  
    } catch (error) {
      console.error("Error fetching riddle:", error.message);
      
      this.riddle = "What has to be broken before you can use it?";
      this.correctAnswer = "egg";
      this.askRiddle();
    }
  }
  
  askRiddle() {
    const riddleText = this.riddle;

    this.riddleBox = this.add.image(400, 200, "menu-box").setScale(5.5,2.7);

    this.riddleText = this.add
      .text(200, 120, riddleText, {
        fontSize: "20px",
        fontFamily: "GameFont",
        fill: "#fff",
        wordWrap: { width: 400 },
      })
      .setAlign("center");

    this.answerInput = this.add
      .dom(400, 230, "input", {
        type: "text",
        fontFamily: "GameFont",
        placeholder: "Enter your answer",
        fontSize: "20px",
        fill: "#fff",
        width: "300px",
      })
      .setOrigin(0.5);

    this.answerInput.node.focus();

    this.submitButton = this.add
      .text(400, 275, "Submit", {
        fontSize: "20px",
        fill: "#fff",
        fontFamily: "GameFont",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.checkAnswer());

    this.startTimer();
  }

  startTimer() {
    this.timeLeft = this.timeLimit;
    this.add.image(50, 25, "tile-box").setScale(4);
    this.timerText = this.add
      .text(80, 25, `Time Left: ${this.timeLeft}`, {
        fontSize: "20px",
        fontFamily: "GameFont",
        fill: "#fff",
      })
      .setOrigin(0.5);

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  updateTimer() {
    this.timeLeft -= 1;
    this.timerText.setText(`Time Left: ${this.timeLeft}`);

    if (this.timeLeft <= 0) {
      this.timerEvent.remove();
      this.gameOver();
    }
  }

  checkAnswer() {
    const playerAnswer = this.answerInput.node.value.toLowerCase();

    if (playerAnswer === this.correctAnswer) {
      this.clearRiddle();
      this.counter++;
      this.timerText.removeFromDisplayList();

      if (this.counter < 3) {
        this.fetchRiddle();
      } else {
        this.clearRiddle();
        this.enemy.play("bringer-death", true);
        this.gameState = true;
        this.time.delayedCall(2000, () => {
          this.triviaSound.stop()
          this.scene.switch('game-over-scene');
        });
      }
    } else {
      this.clearRiddle();
      this.knight.play("knight-death", true);
      this.gameState = true;
      this.time.delayedCall(2000, () => {
        this.triviaSound.stop()
        this.scene.switch('game-over-scene');
      });
    }
  }

  gameOver() {
    if (this.gameState == false) {
      this.clearRiddle();
      this.knight.play("knight-death", true);
      this.time.delayedCall(2000, () => {
        this.triviaSound.stop()
        this.scene.switch('game-won-scene');
      });
    }
  }

  clearRiddle() {
    if (this.riddleBox) this.riddleBox.destroy();
    if (this.riddleText) this.riddleText.destroy();
    if (this.answerInput) this.answerInput.destroy();
    if (this.submitButton) this.submitButton.destroy();
    if (this.timerEvent) this.timerEvent.remove();
  }

  quitToCreator() {
    this.respect.decrease(20);
    this.scene.switch('creator-scene');
  }

  update() {
    if (this.cursors.shift.isDown) {
      this.triviaSound.stop()
      this.quitToCreator();
    }
  }
}