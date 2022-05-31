import BaseScene from './base-scene';
import SceneKeys from './scene-keys';
import * as Config from '../config';
import AssetKey from '../assets/asset-key';
import * as Align from '../../lib/align';
import { IdleGame } from '../core';
import { ProgressBar } from '../../lib/components/progress-bar';

export default class GameScene extends BaseScene {
  private monitorScreenImage!: Phaser.GameObjects.Image;
  private idleGame!: IdleGame;
  private sprintText!: Phaser.GameObjects.Text;
  private taskText!: Phaser.GameObjects.Text;
  private storyPointsRemainingText!: Phaser.GameObjects.Text;
  private progressBar!: ProgressBar;

  constructor() {
    super({
      key: SceneKeys.GAME_SCENE,
      active: false,
    });
  }

  public init(): void {
    // initialize scene data
    this.idleGame = new IdleGame();
    this.progressBar = new ProgressBar(this, 400);
  }

  public create(): void {
    this.sceneSetup();

    // setup fade in for scene
    this.fadeIn(Config.SCENE_TRANSITION_DURATION);

    // create monitor screen image
    this.monitorScreenImage = this.add.image(0, 0, AssetKey.MONITOR);
    this.monitorScreenImage.alpha = 0.3;
    this.monitorScreenImage.setInteractive();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.monitorScreenImage.on(Phaser.Input.Events.POINTER_DOWN as string, this.handlePlayerInput, this);

    const title = this.add.text(0, 0, 'Hello World!', Config.MONITOR_PHASER_TEXT_STYLE);
    this.grid.placeGameObjectAtIndex(78, title);

    // place level information in the ui
    this.sprintText = this.add.text(0, 0, `Sprint: ${this.idleGame.level}`, {
      color: '#ffffff',
      fontFamily: 'Arial Black',
      fontSize: '60px',
      strokeThickness: 1,
    });
    this.sprintText.setOrigin(0.5, 0.5);
    this.taskText = this.add.text(
      0,
      0,
      `Tasks: ${this.idleGame.tasksCompleted}/${this.idleGame.requiredTasksToCompleteLevel}`,
      {
        color: '#ffffff',
        fontFamily: 'Arial Black',
        fontSize: '40px',
        strokeThickness: 1,
      },
    );
    this.taskText.setOrigin(0.5, 0.5);

    // place progress bar in the ui for story points remaining
    this.progressBar.init();
    // place story points remaining in the ui
    this.storyPointsRemainingText = this.add
      .text(0, 0, 'Task Progress:', Config.MONITOR_TASK_PROGRESS_PHASER_TEXT_STYLE)
      .setOrigin(0.5);

    this.resize(this.scale.gameSize);
  }

  public resize(gameSize: Phaser.Structs.Size): void {
    super.resize(gameSize);

    // resize monitor image
    if (this.monitorScreenImage) {
      Align.scaleGameObjectToGameWidth(this.monitorScreenImage, this.sceneWidth, 0.9);
      this.grid.placeGameObjectAtIndex(97, this.monitorScreenImage);
    }

    // resize sprint text
    if (this.sprintText) {
      this.grid.placeGameObjectAtIndex(7, this.sprintText);
    }
    // resize task text
    if (this.taskText) {
      this.grid.placeGameObjectAtIndex(22, this.taskText);
    }

    // resize the progress bar
    if (this.progressBar) {
      this.progressBar.container.setScale(1.7 * (this.sceneWidth / this.sceneHeight));
      this.grid.placeGameObjectAtIndex(50, this.progressBar.container);
    }
    if (this.storyPointsRemainingText) {
      Align.scaleGameObjectToGameWidth(this.storyPointsRemainingText, this.sceneWidth, 0.23);
      this.grid.placeGameObjectAtIndex(48, this.storyPointsRemainingText);
    }
  }

  public update(): void {
    // update level information in the ui
    if (this.sprintText) {
      this.sprintText.setText(`Sprint: ${this.idleGame.level}`);
    }
    if (this.taskText) {
      if (this.idleGame.tasksCompleted >= this.idleGame.requiredTasksToCompleteLevel) {
        this.taskText.setAlpha(0);
      } else {
        this.taskText.setAlpha(1);
      }
      this.taskText.setText(`Tasks: ${this.idleGame.tasksCompleted}/${this.idleGame.requiredTasksToCompleteLevel}`);
    }
  }

  public handlePlayerInput(): void {
    this.idleGame.handlePlayerClick();
    const storyPointsRemaining = this.idleGame.currentLevelStoryPoints / this.idleGame.maxLevelStoryPoints;
    this.progressBar.setMeterPercentageAnimated(1 - storyPointsRemaining, 250);
  }
}
