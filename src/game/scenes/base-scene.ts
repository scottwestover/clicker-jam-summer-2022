/* eslint-disable @typescript-eslint/unbound-method */
import Phaser from 'phaser';
import PhaserGrid from '../../lib/align/phaser-grid';
import * as Config from '../config';

export default abstract class BaseScene extends Phaser.Scene {
  protected grid!: PhaserGrid;

  get sceneWidth(): number {
    return this.scale.width;
  }

  get sceneHeight(): number {
    return this.scale.height;
  }

  protected fadeOut(duration: number): void {
    this.cameras.main.fadeOut(duration, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE as string, () => {
      this.sceneFadeOutComplete();
    });
  }

  protected fadeIn(duration: number): void {
    this.cameras.main.fadeIn(duration, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE as string, () => {
      this.sceneFadeInComplete();
    });
  }

  protected createGrid(rows: number, cols: number): void {
    this.grid = new PhaserGrid(this, rows, cols);
  }

  protected setView(x: number, y: number): void {
    this.cameras.main.centerOn(x, y);
  }

  protected setViewCentered(): void {
    this.setView(0, 0);
  }

  protected sceneSetup(): void {
    // TODO: see if this can be refactored into a different scene for rendering only
    this.createGrid(Config.GRID_ROWS, Config.GRID_COLS);

    if (Config.DEBUG) {
      this.grid.showGridWithIndexes();
    }

    // setup fade in for scene
    this.fadeIn(Config.SCENE_TRANSITION_DURATION);

    // handle resize events
    if (Config.PHASER_RESIZE_SCALE_MODE) {
      this.scale.on(Phaser.Scale.Events.RESIZE as string, this.resize, this);
      this.events.on(Phaser.Scenes.Events.SHUTDOWN as string, this.sceneCleanup.bind(this));
    }
  }

  public resize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;

    this.cameras.resize(width, height);

    if (this.grid) {
      this.grid.resize(width, height, Config.DEBUG);
    }
  }

  public sceneFadeOutComplete(): void {
    // override in subclass
  }

  public sceneFadeInComplete(): void {
    // override in subclass
  }

  public sceneCleanup(): void {
    this.scale.off(Phaser.Scale.Events.RESIZE as string, this.resize, this);
  }
}
