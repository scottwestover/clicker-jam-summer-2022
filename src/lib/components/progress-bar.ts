import Phaser from 'phaser';
import AssetKey from '../../game/assets/asset-key';

export class ProgressBar {
  #scene: Phaser.Scene;
  #leftCap!: Phaser.GameObjects.Image;
  #rightCap!: Phaser.GameObjects.Image;
  #middle!: Phaser.GameObjects.Image;
  #progressBarContainer!: Phaser.GameObjects.Container;
  #fullWidth: number;
  #shadowOpacity: number;

  constructor(scene: Phaser.Scene, width: number) {
    this.#scene = scene;
    this.#fullWidth = width;
    this.#shadowOpacity = 0.4;
  }

  get container(): Phaser.GameObjects.Container {
    return this.#progressBarContainer;
  }

  public init(): void {
    this.#progressBarContainer = this.#scene.add.container();

    // background shadow
    const leftShadowCap = this.#scene.add
      .image(0, 0, AssetKey.HEALTH_BAR_LEFT_CAP)
      .setOrigin(0, 0.5)
      .setAlpha(this.#shadowOpacity);

    const middleShadowCap = this.#scene.add
      .image(leftShadowCap.x + leftShadowCap.width, 0, AssetKey.HEALTH_BAR_MIDDLE)
      .setOrigin(0, 0.5)
      .setAlpha(this.#shadowOpacity);
    middleShadowCap.displayWidth = this.#fullWidth;

    const rightShadowCap = this.#scene.add
      .image(middleShadowCap.x + middleShadowCap.displayWidth, 0, AssetKey.HEALTH_BAR_RIGHT_CAP_SHADOW)
      .setOrigin(0, 0.5)
      .setAlpha(this.#shadowOpacity);

    // health bar
    this.#leftCap = this.#scene.add.image(0, 0, AssetKey.HEALTH_BAR_LEFT_CAP).setOrigin(0, 0.5);

    this.#middle = this.#scene.add
      .image(this.#leftCap.x + this.#leftCap.width, 0, AssetKey.HEALTH_BAR_MIDDLE)
      .setOrigin(0, 0.5);

    this.#rightCap = this.#scene.add
      .image(this.#middle.x + this.#middle.displayWidth, 0, AssetKey.HEALTH_BAR_RIGHT_CAP_SHADOW)
      .setOrigin(0, 0.5);

    this.#progressBarContainer.add(leftShadowCap);
    this.#progressBarContainer.add(middleShadowCap);
    this.#progressBarContainer.add(rightShadowCap);
    this.#progressBarContainer.add(this.#leftCap);
    this.#progressBarContainer.add(this.#middle);
    this.#progressBarContainer.add(this.#rightCap);

    this.setMeterPercentage(0);
  }

  public setMeterPercentage(percent = 1): void {
    const width = this.#fullWidth * percent;

    this.#middle.displayWidth = width;
    this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;
    if (width === 0) {
      this.#leftCap.setAlpha(0);
    } else {
      this.#leftCap.setAlpha(1);
    }
  }

  public setMeterPercentageAnimated(percent = 1, duration = 1000): void {
    const width = this.#fullWidth * percent;

    this.#scene.tweens.add({
      targets: this.#middle,
      displayWidth: width,
      duration,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;

        this.#leftCap.visible = this.#middle.displayWidth > 0;
        this.#middle.visible = this.#middle.displayWidth > 0;
        this.#rightCap.visible = this.#middle.displayWidth > 0;
      },
    });
  }
}
