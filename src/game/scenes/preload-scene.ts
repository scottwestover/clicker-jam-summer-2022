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
    this.load.audio(
      AssetKey.BACKGROUND_MUSIC,
      'assets/audio/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda.mp3',
    );
    this.load.addFile(new WebFontFile(this.load, 'Inconsolata'));
    this.load.image(AssetKey.HEALTH_BAR_LEFT_CAP, 'assets/images/game/progress-bar/barHorizontal_green_left.png');
    this.load.image(AssetKey.HEALTH_BAR_MIDDLE, 'assets/images/game/progress-bar/barHorizontal_green_mid.png');
    this.load.image(AssetKey.HEALTH_BAR_RIGHT_CAP, 'assets/images/game/progress-bar/barHorizontal_green_right.png');
    this.load.image(AssetKey.UI_BUTTON, 'assets/images/game/metalPanel.png');
    this.load.image(AssetKey.MONITOR_ALT, 'assets/images/game/computerMonitorAlt.png');
    this.load.spritesheet(AssetKey.ICONS, 'assets/images/game/iconsDouble.png', {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.image(AssetKey.ARROW_LEFT, 'assets/images/ui/arrowLeft.png');
    this.load.image(AssetKey.ARROW_RIGHT, 'assets/images/ui/arrowRight.png');
    this.load.image(AssetKey.CREDITS, 'assets/images/ui/Credits.png');
    this.load.image(AssetKey.CREDITS_HOVER, 'assets/images/ui/CreditsHover.png');
    this.load.image(AssetKey.PLAY, 'assets/images/ui/Play.png');
    this.load.image(AssetKey.PLAY_HOVER, 'assets/images/ui/PlayHover.png');
    this.load.image(AssetKey.KEYBOARD, 'assets/images/ui/ful-keyboard.png');
    this.load.image(AssetKey.MOUSE, 'assets/images/ui/mouse.png');
    this.load.image(AssetKey.MUSIC_ON, 'assets/images/ui/musicOn.png');
    this.load.image(AssetKey.MUSIC_OFF, 'assets/images/ui/musicOff.png');

    this.load.image(AssetKey.GAMEPAD, 'assets/images/ui/gamepad.png');
    this.load.image(AssetKey.SINGLE_PLAYER, 'assets/images/ui/singleplayer.png');
    this.load.image(AssetKey.MULTIPLAYER, 'assets/images/ui/multiplayer.png');

    // load assets for progress bar
    this.load.image(
      AssetKey.HEALTH_BAR_LEFT_CAP_SHADOW,
      'assets/images/game/progress-bar/barHorizontal_shadow_left.png',
    );
    this.load.image(AssetKey.HEALTH_BAR_MIDDLE_SHADOW, 'assets/images/game/progress-bar/barHorizontal_shadow_mid.png');
    this.load.image(
      AssetKey.HEALTH_BAR_RIGHT_CAP_SHADOW,
      'assets/images/game/progress-bar/barHorizontal_shadow_right.png',
    );
  }

  public create(): void {
    this.fadeOut(Config.SCENE_TRANSITION_DURATION);
  }

  public sceneFadeOutComplete(): void {
    this.scene.launch(SceneKeys.AUDIO_MANAGER_SCENE);
    this.scene.start(SceneKeys.TITLE_SCENE);
    // this.scene.start(SceneKeys.UPGRADE_MENU_SCENE);
  }
}
