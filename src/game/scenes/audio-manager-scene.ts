import SceneKeys from './scene-keys';
import AssetKeys from '../assets/asset-key';
import BaseScene from './base-scene';

export default class AudioManagerScene extends BaseScene {
  constructor() {
    super({
      key: SceneKeys.AUDIO_MANAGER_SCENE,
      active: false,
    });
  }

  public create(): void {
    const bgMusic = this.sound.add(AssetKeys.BACKGROUND_MUSIC, {
      loop: true,
      volume: 0.1,
    });
    bgMusic.play();
  }
}
