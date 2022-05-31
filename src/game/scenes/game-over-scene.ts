import BaseScene from './base-scene';
import SceneKeys from './scene-keys';
import * as Config from '../config';

export default class GameOverScene extends BaseScene {
  constructor() {
    super({
      active: false,
      key: SceneKeys.GAME_OVER_SCENE,
    });
  }

  public create(): void {
    this.sceneSetup();

    const { width, height } = this.scale;
    this.add.text(width * 0.5, height * 0.5, 'Game Over', { fontSize: '48' });
  }

  public resize(gameSize: Phaser.Structs.Size): void {
    super.resize(gameSize);

    // resize title images
  }

  public sceneFadeOutComplete(): void {
    this.scene.start(SceneKeys.GAME_SCENE);
  }

  public sceneFadeInComplete(): void {
    // handle input to transition to the game scene
    this.input.once(Phaser.Input.Events.POINTER_DOWN as string, () => {
      this.fadeOut(Config.SCENE_TRANSITION_DURATION);
    });
  }
}
