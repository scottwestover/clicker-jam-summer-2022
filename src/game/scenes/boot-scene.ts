import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class BootScene extends BaseScene {
  constructor() {
    super({
      active: false,
      key: SceneKeys.BOOT_SCENE,
    });
  }

  public preload(): void {
    // load any assets for the preloader
  }

  public create(): void {
    this.scene.start(SceneKeys.PRELOAD_SCENE);
  }
}
