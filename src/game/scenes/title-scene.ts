import * as Align from '../../lib/align';
import Button from '../../lib/components/button';
import AssetKey from '../assets/asset-key';
import * as Config from '../config';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class TitleScene extends BaseScene {
  private titleImage!: Phaser.GameObjects.Image;
  private playButtonContainer!: Phaser.GameObjects.Container;
  private playButton!: Button;

  constructor() {
    super({
      key: SceneKeys.TITLE_SCENE,
      active: false,
    });
  }

  public create(): void {
    this.sceneSetup();

    // create title image
    this.titleImage = this.add.image(0, 0, AssetKey.TITLE);
    // create menu buttons
    this.createPlayButton();

    this.resize(this.scale.gameSize);
  }

  public resize(gameSize: Phaser.Structs.Size): void {
    super.resize(gameSize);

    // resize title images
    if (this.titleImage) {
      Align.scaleGameObjectToGameWidth(this.titleImage, this.sceneWidth, 0.8);
      this.grid.placeGameObjectAtIndex(38, this.titleImage);
    }
    // resize play button
    if (this.playButtonContainer) {
      this.grid.placeGameObjectAtIndex(71, this.playButtonContainer);
    }
  }

  public sceneFadeOutComplete(): void {
    this.scene.start(SceneKeys.GAME_SCENE);
  }

  private createPlayButton(): void {
    this.playButtonContainer = this.add.container();
    this.playButton = new Button({
      scene: this,
      defaultImageKey: AssetKey.UI,
      hoverButtonImageKey: AssetKey.UI,
      clickCallBack: () => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.playButton.image.disableInteractive();
        this.fadeOut(Config.SCENE_TRANSITION_DURATION);
      },
      defaultImageFrame: 'blue_button01.png',
      hoverButtonImageFrame: 'blue_button00.png',
    });
    this.playButtonContainer.add(this.playButton.image);

    const playAgainText = this.add
      .text(0, 0, 'Play', {
        color: 'white',
        fontSize: '14px',
      })
      .setOrigin(0.5);
    this.playButtonContainer.add(playAgainText);
  }
}
