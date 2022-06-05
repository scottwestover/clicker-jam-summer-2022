import * as Align from '../../lib/align';
import AssetKey from '../assets/asset-key';
import * as Config from '../config';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class TitleScene extends BaseScene {
  private titleImage!: Phaser.GameObjects.Image;
  private monitorScreenImage!: Phaser.GameObjects.Image;
  private playButtonImage!: Phaser.GameObjects.Image;
  private creditsButtonImage!: Phaser.GameObjects.Image;
  private keyboardImage!: Phaser.GameObjects.Image;
  private mouseImage!: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: SceneKeys.TITLE_SCENE,
      active: false,
    });
  }

  public create(): void {
    this.sceneSetup();

    this.monitorScreenImage = this.add.image(0, 0, AssetKey.MONITOR);
    this.monitorScreenImage.alpha = 1;

    // create title image
    this.titleImage = this.add.image(0, 0, AssetKey.TITLE).setOrigin(0.5);

    // create menu buttons
    this.playButtonImage = this.add.image(0, 0, AssetKey.PLAY).setInteractive();
    this.playButtonImage.on(
      Phaser.Input.Events.POINTER_OVER as string,
      () => {
        this.playButtonImage.setTexture(AssetKey.PLAY_HOVER);
      },
      this,
    );
    this.playButtonImage.on(
      Phaser.Input.Events.POINTER_OUT as string,
      () => {
        this.playButtonImage.setTexture(AssetKey.PLAY);
      },
      this,
    );
    this.playButtonImage.on(
      Phaser.Input.Events.POINTER_DOWN as string,
      () => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.playButtonImage.disableInteractive();
        this.fadeOut(Config.SCENE_TRANSITION_DURATION);
      },
      this,
    );

    // this.creditsButtonImage = this.add.image(0, 0, AssetKey.CREDITS).setInteractive();
    // this.creditsButtonImage.on(
    //   Phaser.Input.Events.POINTER_OVER as string,
    //   () => {
    //     this.creditsButtonImage.setTexture(AssetKey.CREDITS_HOVER);
    //   },
    //   this,
    // );
    // this.creditsButtonImage.on(
    //   Phaser.Input.Events.POINTER_OUT as string,
    //   () => {
    //     this.creditsButtonImage.setTexture(AssetKey.CREDITS);
    //   },
    //   this,
    // );
    // this.creditsButtonImage.setAlpha(0);

    this.keyboardImage = this.add.image(0, 0, AssetKey.KEYBOARD).setOrigin(0.5);
    this.mouseImage = this.add.image(0, 0, AssetKey.MOUSE).setOrigin(0.5);

    this.resize(this.scale.gameSize);
  }

  public resize(gameSize: Phaser.Structs.Size): void {
    super.resize(gameSize);

    // resize monitor image
    if (this.monitorScreenImage) {
      Align.scaleGameObjectToGameWidth(this.monitorScreenImage, this.sceneWidth, 0.92);
      this.grid.placeGameObjectAtIndex(97, this.monitorScreenImage);
    }

    // resize title images
    if (this.titleImage) {
      Align.scaleGameObjectToGameWidth(this.titleImage, this.sceneWidth, 0.8);
      this.grid.placeGameObjectAtIndex(82, this.titleImage);
    }

    // resize play button
    if (this.playButtonImage) {
      Align.scaleGameObjectToGameWidth(this.playButtonImage, this.sceneWidth, 0.15);
      this.grid.placeGameObjectAtIndex(127, this.playButtonImage);
    }

    if (this.creditsButtonImage) {
      Align.scaleGameObjectToGameWidth(this.creditsButtonImage, this.sceneWidth, 0.25);
      this.grid.placeGameObjectAtIndex(127, this.creditsButtonImage);
    }

    if (this.keyboardImage) {
      Align.scaleGameObjectToGameWidth(this.keyboardImage, this.sceneWidth, 0.5);
      this.grid.placeGameObjectAtIndex(185, this.keyboardImage);
    }
    if (this.mouseImage) {
      Align.scaleGameObjectToGameWidth(this.mouseImage, this.sceneWidth, 0.1);
      this.grid.placeGameObjectAtIndex(191, this.mouseImage);
    }
  }

  public sceneFadeOutComplete(): void {
    this.scene.start(SceneKeys.GAME_SCENE);
  }
}
