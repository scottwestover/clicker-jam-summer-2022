import Phaser from 'phaser';
import * as Scenes from './scenes';
import * as Config from './config';

export default class Game {
  private readonly game: Phaser.Game;

  constructor() {
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      scale: {
        parent: 'game',
        mode: Config.PHASER_RESIZE_SCALE_MODE ? Phaser.Scale.RESIZE : Phaser.Scale.FIT,
        width: Config.GAME_WIDTH,
        height: Config.GAME_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    this.game = new Phaser.Game(gameConfig);

    // add scenes to the game manually so we don't autostart the game
    this.game.scene.add(Scenes.SceneKeys.BOOT_SCENE, Scenes.BootScene);
    this.game.scene.add(Scenes.SceneKeys.PRELOAD_SCENE, Scenes.PreloadScene);
    this.game.scene.add(Scenes.SceneKeys.TITLE_SCENE, Scenes.TitleScene);
    this.game.scene.add(Scenes.SceneKeys.GAME_SCENE, Scenes.GameScene);
    this.game.scene.add(Scenes.SceneKeys.GAME_OVER_SCENE, Scenes.GameOverScene);
    this.game.scene.add(Scenes.SceneKeys.AUDIO_MANAGER_SCENE, Scenes.AudioManagerScene);
    this.game.scene.add(Scenes.SceneKeys.UPGRADE_MENU_SCENE, Scenes.UpgradeMenuScene);
  }

  public start(): void {
    this.game.scene.start(Scenes.SceneKeys.BOOT_SCENE);
  }
}
