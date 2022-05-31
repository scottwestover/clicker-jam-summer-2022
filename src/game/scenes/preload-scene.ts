import WebFontFile from '../../lib/util/web-font-loader';
import AssetKey from '../assets/asset-key';
import * as Config from '../config';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';

export default class PreloadScene extends BaseScene {
  constructor() {
    super({
      key: SceneKeys.PRELOAD_SCENE,
      active: false,
    });
  }

  public preload(): void {
    this.load.image(AssetKey.TITLE, 'assets/images/ui/title.png');
    this.load.image(AssetKey.MONITOR, 'assets/images/game/computerMonitor.png');
    this.load.atlasXML(AssetKey.UI, 'assets/images/ui/blueSheet.png', 'assets/images/ui/blueSheet.xml');
    this.load.audio(AssetKey.BACKGROUND_MUSIC, 'assets/audio/rise-and-shine.mp3');
    this.load.addFile(new WebFontFile(this.load, 'Inconsolata'));
    this.load.image(AssetKey.HEALTH_BAR_LEFT_CAP, '/assets/images/game/progress-bar/barHorizontal_green_left.png');
    this.load.image(AssetKey.HEALTH_BAR_MIDDLE, '/assets/images/game/progress-bar/barHorizontal_green_mid.png');
    this.load.image(AssetKey.HEALTH_BAR_RIGHT_CAP, '/assets/images/game/progress-bar/barHorizontal_green_right.png');

    // load assets for progress bar
    this.load.image(
      AssetKey.HEALTH_BAR_LEFT_CAP_SHADOW,
      '/assets/images/game/progress-bar/barHorizontal_shadow_left.png',
    );
    this.load.image(AssetKey.HEALTH_BAR_MIDDLE_SHADOW, '/assets/images/game/progress-bar/barHorizontal_shadow_mid.png');
    this.load.image(
      AssetKey.HEALTH_BAR_RIGHT_CAP_SHADOW,
      '/assets/images/game/progress-bar/barHorizontal_shadow_right.png',
    );
  }

  public create(): void {
    this.fadeOut(Config.SCENE_TRANSITION_DURATION);
  }

  public sceneFadeOutComplete(): void {
    this.scene.launch(SceneKeys.AUDIO_MANAGER_SCENE);
    // this.scene.start(SceneKeys.TITLE_SCENE);
    this.scene.start(SceneKeys.GAME_SCENE);
  }
}
