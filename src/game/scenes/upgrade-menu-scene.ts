import SceneKeys from './scene-keys';
import BaseScene from './base-scene';
import AssetKey from '../assets/asset-key';
import * as Align from '../../lib/align';

export default class UpgradeMenuScene extends BaseScene {
  private backgroundMenu!: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: SceneKeys.UPGRADE_MENU_SCENE,
      active: false,
    });
  }

  public create(): void {
    this.sceneSetup();

    this.backgroundMenu = this.add.image(0, 0, AssetKey.MONITOR_ALT).setOrigin(0.5);

    this.resize(this.scale.gameSize);
  }

  public resize(gameSize: Phaser.Structs.Size): void {
    super.resize(gameSize);

    // resize the background menu to fit the game size
    Align.scaleGameObjectToGameSize(this.backgroundMenu, gameSize, 0.9);
    this.grid.placeGameObjectAtIndex(112, this.backgroundMenu);
  }
}
