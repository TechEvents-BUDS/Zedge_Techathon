import Phaser from "phaser";
import Timer from "./Timer";
import Respect from "./Respect";

export default class Strategy extends Phaser.Scene {
  constructor() {
    super("strategy-scene");
  }

  preload() {
    this.load.json("qTable", "q_table.json");
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

    this.add.image(295, 250, "round-button").setScale(2);
    this.add.image(395, 250, "round-button").setScale(2);
    this.add.image(495, 250, "round-button").setScale(2);

    const ground1 = this.physics.add.staticImage(100, 530, "ground");
    const ground2 = this.physics.add.staticImage(375, 530, "ground");
    const ground3 = this.physics.add.staticImage(650, 530, "ground");
    const ground4 = this.physics.add.staticImage(800, 530, "ground");

    this.blast = this.sound.add('blast');

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("knight-idle", {
        frames: [0, 1, 2, 3, 4, 5, 6],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "knight-death",
      frames: this.anims.generateFrameNumbers("knight-death", {
        start: 0,
        end: 11,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "wizard-death",
      frames: this.anims.generateFrameNumbers("wiz_death", {
        start: 0,
        end: 6,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "object",
      frames: this.anims.generateFrameNumbers("objects", {
        frames: [0, 1],
      }),
      frameRate: 8,
      repeat: 0,
    });

    this.anims.create({
      key: "skeleton-idle",
      frames: this.anims.generateFrameNumbers("skeleton", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.knight = this.physics.add
      .sprite(50, 380, "knight-idle")
      .play("idle", true)
      .setScale(1.5);
    this.knight.body.setSize(38, 32);
    this.knight.body.setOffset(34, 30);

    this.enemy = this.physics.add
      .sprite(750, 380, "skeleton")
      .play("skeleton-idle", true)
      .setScale(1.2)
      .setFlip(2);
    this.enemy.body.setSize(34, 80);

    this.knight.setDrag(0.99);
    this.knight.setMaxVelocity(150);
    this.knight.setCollideWorldBounds(true);

    this.enemy.setCollideWorldBounds(true);
    this.enemy.setDrag(0.99);
    this.enemy.setMaxVelocity(100);

    this.strategySound = this.sound.add("strategy-sound", {loop: true});
    this.strategySound.play()

    this.boxes = this.physics.add.group();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        const xPosition = 175 + col * 64;
        const yPosition = 275 + row * 64;
        const box = this.boxes.create(xPosition, yPosition, "objects");
        box.play("object", true).setScale(2);
        box.setSize(32, 26);
      }
    }

    this.physics.add.collider(
      [this.knight, this.enemy, this.boxes],
      [ground1, ground2, ground3, ground4]
    );
    this.physics.add.collider(this.boxes, this.boxes);
    this.add.image(45, 24, "tile-box").setScale(4);
    this.add.image(20, 25, "metal-box").setScale(0.1);
    this.boxText = this.add.text(
      40,
      18,
      `Boxes: ${this.boxes.children.size}`,
      {
        fontFamily: "GameFont",
        fontSize: "20px",
        fill: "#fff",
      }
    );

    this.createButtons();

    this.chooseTurn();

    this.add.image(670, 20, "tile-box").setScale(5, 4);

    this.respect = new Respect();
    this.respectText = this.add.text(540, 15, `Respect: ${this.respect.getValue()}`, { fontSize: '20px', fontFamily: "GameFont", fill: '#fff' });

    this.timer = new Timer();
    this.timerText = this.add.text(690, 15, `Time: ${this.timer.getTimeLeft()}`, { fontSize: '20px', fontFamily: "GameFont", fill: '#fff' });

    this.timer.setCallback((timeLeft) => {
      this.timerText.setText(`Time: ${timeLeft}`);
      if (timeLeft <= 0) {
        this.strategySound.stop()
        this.scene.start("game-over-scene");
      }
    });

    this.timer.start();
    this.events.on('wake', this.wake, this);    
  }

  wake() {
    this.respectText.setText(`Respect: ${this.respect.getValue()}`);
    this.timer.setCallback((timeLeft) => {
      this.timerText.setText(`Time: ${timeLeft}`);
      if (timeLeft <= 0) {
        this.strategySound.stop()
        this.scene.start("game-over-scene");
      }
    });
  }

  chooseTurn() {
    let first_player = Math.floor(Math.random() * 2);
    if (first_player === 0) {
      this.startAITurn();
    } else {
      this.startPlayerTurn();
    }
  }

  createButtons() {
    this.button1 = this.add
      .text(300, 250, "1", {
        fontFamily: "GameFont",
        fontSize: "38px",
        fill: "#dab187",
      })
      .setInteractive()
      .setOrigin(0.5);
    this.button3 = this.add
      .text(400, 250, "3", {
        fontFamily: "GameFont",
        fontSize: "38px",
        fill: "#dab187",
      })
      .setInteractive()
      .setOrigin(0.5);
    this.button4 = this.add
      .text(500, 250, "4", {
        fontFamily: "GameFont",
        fontSize: "38px",
        fill: "#dab187",
      })
      .setInteractive()
      .setOrigin(0.5);

    this.button1.on("pointerover", () =>
      this.button1.setStyle({ fill: "#f39c12" })
    );
    this.button1.on("pointerout", () =>
      this.button1.setStyle({ fill: "#dab187" })
    );
    this.button3.on("pointerover", () =>
      this.button3.setStyle({ fill: "#f39c12" })
    );
    this.button3.on("pointerout", () =>
      this.button3.setStyle({ fill: "#dab187" })
    );
    this.button4.on("pointerover", () =>
      this.button4.setStyle({ fill: "#f39c12" })
    );
    this.button4.on("pointerout", () =>
      this.button4.setStyle({ fill: "#dab187" })
    );

    this.button1.on("pointerdown", () => this.handlePlayerChoice(1));
    this.button3.on("pointerdown", () => this.handlePlayerChoice(3));
    this.button4.on("pointerdown", () => this.handlePlayerChoice(4));
  }

  startPlayerTurn() {
    this.turn = "player";
    this.updateButtons();
    this.boxText.setText( `Boxes: ${this.boxes.children.size}`);
  }

  updateButtons() {
    const remainingBoxes = this.boxes.children.size;

    if (remainingBoxes < 3) {
      this.button1.setInteractive(); 
      this.button3.disableInteractive();
      this.button4.disableInteractive();
    } else if (remainingBoxes < 4) {
      this.button1.setInteractive(); 
      this.button3.setInteractive(); 
      this.button4.disableInteractive();
    } else {
      this.button1.setInteractive();
      this.button3.setInteractive();
      this.button4.setInteractive();
    }
  }

  handlePlayerChoice(choice) {
    console.log(`Player chose to remove ${choice} boxes.`);
    this.removeBoxes(choice);
    this.time.delayedCall(1000, this.startAITurn, [], this);
  }

  startAITurn() {
    this.turn = "AI";
    this.knight.setVelocity(0);
    this.respect = new Respect()
    let gameRespect = this.respect.getValue();

    const QTable = this.cache.json.get("qTable");
    const remainingBoxes = this.boxes.children.size;
    let aiChoice;

    if (remainingBoxes === 2) {
      // AI is forced to choose 1 box when only 2 are left
      aiChoice = 1;
    } else {
      // Adjust randomness based on respect
      if (gameRespect > 80) {
        // High respect: mostly random moves (easy)
        const choices = [1, 3, 4];
        aiChoice = choices[Math.floor(Math.random() * choices.length)];
      } else if (gameRespect > 50) {
        // Moderate respect: some randomness, some Q-table usage
        if (Math.random() < 0.5) {
          // 50% chance of random move
          const choices = [1, 3, 4];
          aiChoice = choices[Math.floor(Math.random() * choices.length)];
        } else {
          // 50% chance of using Q-table for a more optimal move
          aiChoice = this.getBestActionFromQTable(QTable, remainingBoxes);
        }
      } else {
        // Low respect: fully use Q-table (hard)
        aiChoice = this.getBestActionFromQTable(QTable, remainingBoxes);
      }
    }

    console.log(
      `AI chose to remove ${aiChoice} boxes based on respect level: ${gameRespect}`
    );
    this.removeBoxes(aiChoice);

    this.time.delayedCall(1000, this.startPlayerTurn, [], this);
  }

  getBestActionFromQTable(QTable, state) {
    const qValues = QTable[state];
    const actions = [1, 3, 4];
    const bestActionIndex = qValues.indexOf(Math.max(...qValues));
    return actions[bestActionIndex];
  }

  removeBoxes(count) {
    if (this.boxes.children.size === 0) {
      console.log("No boxes left to remove!");
      return;
    }

    for (let i = 0; i < count; i++) {
      if (this.boxes.children.size > 0) {
        const box = this.boxes.children.entries[0];
        box.destroy();
        this.blast.play()
        this.time.delayedCall(500, ()=> {
          this.blast.stop()
        })
      }
    }

    this.boxText.setText( `Boxes: ${this.boxes.children.size}`);
    this.updateButtons();
    this.decreaseRespect();
    this.checkWin();
  }

  decreaseRespect() {
    if (this.respect > 0) {
      this.respect -= 20;
    }
  }

  checkWin() {
    if (this.boxes.children.size === 0) {
      if (this.turn == "AI") {
        console.log("AI Won The Game");
        this.knight.play("knight-death", true);
        this.time.delayedCall(2000, () => {
          this.strategySound.stop()
          this.scene.switch('game-over-scene');
        });
      } else {
        console.log("Player Won The Game");
        this.enemy.play("wizard-death", true);
        this.time.delayedCall(2000, () => {
          this.strategySound.stop()
          this.scene.switch('game-over-scene');
        });
      }
    }
  }

  quitToCreator() {
    this.respect.decrease(20); // Decrease respect by 20
    this.scene.switch('creator-scene');
  }

  update() {
    if (this.cursors.shift.isDown) {
      this.strategySound.stop()
      this.quitToCreator();
    }
  }
}