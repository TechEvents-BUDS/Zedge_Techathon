import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu-scene");
  }

  preload() {}

  create() {
    this.add.image(150, 170, "sky").setScale(1.2);
    this.add.image(450, 170, "sky").setScale(1.2);
    this.add.image(750, 170, "sky").setScale(1.2);
    this.add.image(150, 200, "cloud");
    this.add.image(470, 200, "cloud");
    this.add.image(790, 200, "cloud");
    this.add.image(150, 290, "rock-mountain");
    this.add.image(450, 290, "rock-mountain");
    this.add.image(750, 290, "rock-mountain");
    this.add.image(150, 350, "sky-mountain");
    this.add.image(450, 350, "sky-mountain");
    this.add.image(750, 350, "sky-mountain");
    const menuBox = this.add.image(400, 250, "menu-box").setScale(4);
    const menuButtonPlay = this.add.image(400, 250, "menu-button").setScale(4);
    const menuButtonQuit = this.add.image(400, 325, "menu-button").setScale(4);
    const menuText = this.add.text(275, 150, "Let's Play", {
      fontFamily: "GameFont",
      fontSize: "50px",
    });
    const startText = this.add
      .text(360, 235, "Start", { fontFamily: "GameFont", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.switch("creator-scene");
      });
    const aboutText = this.add
      .text(360, 310, "About", { fontFamily: "GameFont", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.switch("creator-scene");
      });

    this.input.on("pointerdown", () => {
      const playerName = "Ezhan";
      addPlayer(playerName);
    });

    function addPlayer(playername) {
      fetch('http://localhost:4000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Playername: playername }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add player.');
          }
          return response.json();
        })
        .then(data => {
          console.log('Player added successfully:', data);
        })
        .catch(error => {
          console.error('Error adding player:', error);
        });
    }
  }
}