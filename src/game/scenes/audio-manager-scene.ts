import SceneKeys from './scene-keys';
import AssetKeys from '../assets/asset-key';
import BaseScene from './base-scene';

export default class AudioManagerScene extends BaseScene {
  private bgMusic!: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: SceneKeys.AUDIO_MANAGER_SCENE,
      active: false,
    });
  }

  public create(): void {
    this.bgMusic = this.sound.add(AssetKeys.BACKGROUND_MUSIC, {
      loop: true,
      volume: 0.4,
    });
    this.bgMusic.play();
  }

  public stop(): void {
    if (this.bgMusic) {
      this.bgMusic.stop();
    }
  }

  public play(): void {
    if (this.bgMusic) {
      this.bgMusic.play();
    }
  }
}
