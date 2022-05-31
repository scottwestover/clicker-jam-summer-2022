import * as GameUtils from '@devshareacademy/common-game-utils';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';
import * as Config from '../config';
import AssetKey from '../assets/asset-key';
import * as Align from '../../lib/align';
import IdleGame from '../core';
import { ProgressBar } from '../../lib/components/progress-bar';
import * as EventCenter from '../../lib/events/event-center';

export default class GameScene extends BaseScene {
  private monitorScreenImage!: Phaser.GameObjects.Image;
  private idleGame!: IdleGame;
  private sprintText!: Phaser.GameObjects.Text;
  private taskText!: Phaser.GameObjects.Text;
  private storyPointsRemainingText!: Phaser.GameObjects.Text;
  private progressBar!: ProgressBar;
  private taskHintText!: Phaser.GameObjects.Text;
  private currentTaskText!: Phaser.GameObjects.Text;
  private gainedExperienceTextGroup!: Phaser.GameObjects.Group;
  private tpsText!: Phaser.GameObjects.Text;
  private currentExperienceText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: SceneKeys.GAME_SCENE,
      active: false,
    });
  }

  public init(): void {
    // initialize scene data
    this.idleGame = new IdleGame();
    this.progressBar = new ProgressBar(this, this.sceneWidth / 2.2);
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

    // place function and hint text
    this.taskHintText = this.add.text(0, 0, this.idleGame.currentLevelTaskText, {
      ...Config.MONITOR_PHASER_TEXT_STYLE,
      color: '#ffffff',
    });
    this.currentTaskText = this.add.text(
      0,
      0,
      this.idleGame.currentLevelFunctionText,
      Config.MONITOR_PHASER_TEXT_STYLE,
    );

    // place level information in the ui
    this.sprintText = this.add.text(0, 0, `Sprint: ${this.idleGame.level}`, Config.UI_PHASER_TEXT_STYLE);
    this.sprintText.setOrigin(0.5, 0.5);
    this.taskText = this.add.text(
      0,
      0,
      `Tasks: ${this.idleGame.tasksCompleted}/${this.idleGame.requiredTasksToCompleteLevel}`,
      Config.UI_PHASER_TEXT_STYLE,
    );
    this.taskText.setOrigin(0.5, 0.5);

    // place tps text above the progress bar
    this.tpsText = this.add.text(0, 0, `TPPS: ${this.idleGame.player.dps}`, Config.UI_PHASER_TEXT_STYLE);
    // place progress bar in the ui for story points remaining
    this.progressBar.init();
    // place story points remaining in the ui
    this.storyPointsRemainingText = this.add
      .text(0, 0, 'Task Progress:', Config.MONITOR_TASK_PROGRESS_PHASER_TEXT_STYLE)
      .setOrigin(0.5);

    // place gained experience in the ui
    this.gainedExperienceTextGroup = this.add.group();

    // listen for gained experience events
    EventCenter.emitter.on(
      EventCenter.SupportedEvents.GAINED_EXPERIENCE,
      (experience: number) => {
        let textElement = this.gainedExperienceTextGroup.getFirstDead() as Phaser.GameObjects.Text | undefined;
        if (!textElement) {
          textElement = this.add.text(0, 0, `+0 EXP`, Config.UI_PHASER_TEXT_STYLE).setOrigin(0.5);
          this.gainedExperienceTextGroup.add(textElement);
        }
        textElement.setText(`+${experience} EXP`);
        this.grid.placeGameObjectAtIndex(112, textElement);
        Align.scaleGameObjectToGameWidth(textElement, this.sceneWidth, 0.25);
        this.tweens.add({
          targets: textElement,
          alpha: 0,
          x: GameUtils.random.between(textElement.x - 200, textElement.x + 200),
          y: textElement.y - 300,
          duration: 1000,
          ease: Phaser.Math.Easing.Cubic.Out,
        });
      },
      this,
    );

    // place current experience in the ui
    this.currentExperienceText = this.add.text(
      0,
      0,
      `EXP: ${this.idleGame.player.experience}`,
      Config.MONITOR_TASK_PROGRESS_PHASER_TEXT_STYLE,
    );

    this.resize(this.scale.gameSize);
  }

  public resize(gameSize: Phaser.Structs.Size): void {
    super.resize(gameSize);

    // resize monitor image
    if (this.monitorScreenImage) {
      Align.scaleGameObjectToGameWidth(this.monitorScreenImage, this.sceneWidth, 0.92);
      this.grid.placeGameObjectAtIndex(97, this.monitorScreenImage);
    }

    // resize sprint text
    if (this.sprintText) {
      Align.scaleGameObjectToGameWidth(this.sprintText, this.sceneWidth, 0.3);
      this.grid.placeGameObjectAtIndex(7, this.sprintText);
    }
    // resize task text
    if (this.taskText) {
      Align.scaleGameObjectToGameWidth(this.taskText, this.sceneWidth, 0.25);
      this.grid.placeGameObjectAtIndex(22, this.taskText);
    }

    // resize tps text
    if (this.tpsText) {
      console.log(this.monitorScreenImage.displayHeight);
      Align.scaleGameObjectToGameWidth(this.tpsText, this.sceneWidth, 0.1);
      this.grid.placeGameObjectAtIndex(37, this.tpsText);
      this.tpsText.y += 50;
    }
    // resize the progress bar
    if (this.progressBar) {
      this.grid.placeGameObjectAtIndex(50.5, this.progressBar.container);
    }
    if (this.storyPointsRemainingText) {
      Align.scaleGameObjectToGameWidth(this.storyPointsRemainingText, this.sceneWidth, 0.275);
      this.grid.placeGameObjectAtIndex(48, this.storyPointsRemainingText);
    }

    // resize function and hint text
    if (this.taskHintText) {
      Align.scaleGameObjectToGameWidth(this.taskHintText, this.sceneWidth, 0.65);
      this.grid.placeGameObjectAtIndex(76, this.taskHintText);
    }
    if (this.currentTaskText) {
      Align.scaleGameObjectToGameWidth(this.currentTaskText, this.sceneWidth, 0.8);
      this.currentTaskText.scaleY = this.currentTaskText.scaleX * 1.2;
      this.grid.placeGameObjectAtIndex(91, this.currentTaskText);
    }

    // resize experience text
    if (this.currentExperienceText) {
      Align.scaleGameObjectToGameWidth(this.currentExperienceText, this.sceneWidth, 0.1);
      this.grid.placeGameObjectAtIndex(136, this.currentExperienceText);
      this.currentExperienceText.y += this.grid.cellDimensions.height / 2;
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
    if (this.taskHintText) {
      this.taskHintText.setText(this.idleGame.currentLevelTaskText);
    }
    if (this.currentTaskText) {
      // calculate the remaining progress for the current level (task)
      const storyPointsRemaining = this.idleGame.currentLevelStoryPoints / this.idleGame.maxLevelStoryPoints;
      // calculate the amount of the code text to show to the user based on how much progress has been made
      const textLengthToShow = (1 - storyPointsRemaining) * this.idleGame.currentLevelFunctionText.length;
      // update the text shown in the game
      this.currentTaskText.setText(this.idleGame.currentLevelFunctionText.slice(0, textLengthToShow));
    }
    if (this.currentExperienceText) {
      this.currentExperienceText.setText(`EXP: ${this.idleGame.player.experience}`);
    }
  }

  public handlePlayerInput(): void {
    this.idleGame.handlePlayerClick();
    const storyPointsRemaining = this.idleGame.currentLevelStoryPoints / this.idleGame.maxLevelStoryPoints;
    this.progressBar.setMeterPercentageAnimated(1 - storyPointsRemaining, 250);
  }
}
