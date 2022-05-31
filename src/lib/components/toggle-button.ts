import * as Phaser from 'phaser';

export default class ToggleButton {
  private readonly toggleImage: Phaser.GameObjects.Image;
  private readonly onIconAssetKey: string;
  private readonly offIconAssetKey: string;
  private buttonState: boolean;

  constructor(scene: Phaser.Scene, onIcon: string, offIcon: string, x: number, y: number) {
    this.onIconAssetKey = onIcon;
    this.offIconAssetKey = offIcon;
    this.buttonState = true;

    this.toggleImage = scene.add.image(x, y, onIcon);
    this.toggleImage.setInteractive();
    this.toggleImage.on(Phaser.Input.Events.POINTER_DOWN as string, this.toggle.bind(this), this);
  }

  get image(): Phaser.GameObjects.Image {
    return this.toggleImage;
  }

  public toggle(): void {
    this.buttonState = !this.buttonState;
    this.setIcons();
    console.log('button toggled');
  }

  private setIcons(): void {
    if (this.buttonState) {
      this.toggleImage.setTexture(this.onIconAssetKey);
    } else {
      this.toggleImage.setTexture(this.offIconAssetKey);
    }
  }
}
