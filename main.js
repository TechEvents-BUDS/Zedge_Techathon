import Phaser from 'phaser'
import LoaderScene from './scenes/LoaderScene'
import MenuScene from './scenes/menu'
import knightScene from './scenes/Knight'
import devilScene from './scenes/Devil'
import GameOverScene from './scenes/GameOver'
import Strategy from './scenes/Strategy'
import Trivia from './scenes/Trivia'
import CreatorScene from './scenes/Center'

const font = new FontFace("GameFont", "url(assets/MinimalPixel.ttf)");
font.load().then(() => {
    document.fonts.add(font);
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 500,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 100
          },
          debug: true,
        }
      },
      scene: [
        LoaderScene,
        MenuScene,
        CreatorScene,
        knightScene,
        devilScene,
        Strategy,
        Trivia,
        GameOverScene
      ],
      dom: {
        createContainer: true
      },
      parent: 'app',
    }
    const game = new Phaser.Game(config);
  });    