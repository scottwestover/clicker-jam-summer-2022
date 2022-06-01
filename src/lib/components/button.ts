import * as Phaser from 'phaser';

export interface ButtonConfiguration {
  scene: Phaser.Scene;
  defaultImageKey: string;
  defaultImageFrame?: string;
  hoverButtonImageKey: string;
  hoverButtonImageFrame?: string;
  x?: number;
  y?: number;
  clickCallBack?: () => void;
}

export default class Button {
  private readonly buttonImage: Phaser.GameObjects.Image;

  private readonly defaultButtonAssetKey: string;

  private readonly hoverButtonAssetKey: string;

  constructor(config: ButtonConfiguration) {
    const { scene, defaultImageKey, hoverButtonImageKey, x = 0, y = 0, clickCallBack } = config;

    this.defaultButtonAssetKey = defaultImageKey;
    this.hoverButtonAssetKey = hoverButtonImageKey;

    this.buttonImage = scene.add.image(x, y, defaultImageKey, config.defaultImageFrame);
    this.buttonImage.setInteractive();

    this.buttonImage.on(
      Phaser.Input.Events.POINTER_OVER as string,
      () => {
        this.buttonImage.setTexture(this.hoverButtonAssetKey, config.hoverButtonImageFrame);
      },
      this,
    );

    this.buttonImage.on(
      Phaser.Input.Events.POINTER_OUT as string,
      () => {
        this.buttonImage.setTexture(this.defaultButtonAssetKey, config.defaultImageFrame);
      },
      this,
    );

    if (clickCallBack) {
      this.buttonImage.on(Phaser.Input.Events.POINTER_DOWN as string, clickCallBack);
    }
  }

  get image(): Phaser.GameObjects.Image {
    return this.buttonImage;
  }
}
