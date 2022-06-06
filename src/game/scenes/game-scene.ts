/* eslint-disable @typescript-eslint/unbound-method */
import * as GameUtils from '@devshareacademy/common-game-utils';
import BaseScene from './base-scene';
import SceneKeys from './scene-keys';
import * as Config from '../config';
import AssetKey from '../assets/asset-key';
import * as Align from '../../lib/align';
import IdleGame from '../core';
import { ProgressBar } from '../../lib/components/progress-bar';
import * as EventCenter from '../../lib/events/event-center';
import Button from '../../lib/components/button';
import ToggleButton from '../../lib/components/toggle-button';

export default class GameScene extends BaseScene {
  private monitorScreenImage!: Phaser.GameObjects.Image;
  private idleGame!: IdleGame;
  private sprintText!: Phaser.GameObjects.Text;
  private taskText!: Phaser.GameObjects.Text;
  private storyPointsRemainingText!: Phaser.GameObjects.Text;
  private progressBar!: ProgressBar;
  private taskHintText!: Phaser.GameObjects.Text;
  private currentTaskTextGroup!: Phaser.GameObjects.Group;
  private currentTaskText!: Phaser.GameObjects.Text;
  private gainedExperienceTextGroup!: Phaser.GameObjects.Group;
  private tpsText!: Phaser.GameObjects.Text;
  private currentExperienceText!: Phaser.GameObjects.Text;
  private upgradesButtonContainer!: Phaser.GameObjects.Container;
  private upgradesButton!: Button;
  private isMenuShown = false;
  private backArrowImage!: Phaser.GameObjects.Image;
  private forwardArrowImage!: Phaser.GameObjects.Image;
  private keyboardImage!: Phaser.GameObjects.Image;
  private mouseImage!: Phaser.GameObjects.Image;
  private musicToggleButton!: ToggleButton;
  private saveImage!: Phaser.GameObjects.Image;
  private gameSaveText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: SceneKeys.GAME_SCENE,
      active: false,
    });
  }

  public init(): void {
    // initialize scene data
    this.idleGame = IdleGame.getInstance();
    this.progressBar = new ProgressBar(this, this.sceneWidth / 2.2);
    this.isMenuShown = false;
  }

  public create(): void {
    this.sceneSetup();

    // setup fade in for scene
    this.fadeIn(Config.SCENE_TRANSITION_DURATION);

    // create monitor screen image
    this.monitorScreenImage = this.add.image(0, 0, AssetKey.MONITOR);
    this.monitorScreenImage.setAlpha(1);
    this.monitorScreenImage.setInteractive();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.monitorScreenImage.on(Phaser.Input.Events.POINTER_DOWN as string, this.handlePlayerInput, this);

    // place function and hint text
    this.taskHintText = this.add.text(0, 0, this.idleGame.currentLevelTaskText, {
      ...Config.MONITOR_PHASER_TEXT_STYLE,
      color: '#ffffff',
    });
    this.currentTaskTextGroup = this.add.group();
    this.currentTaskText = this.getCurrentTaskText();

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

    this.saveImage = this.add
      .image(0, 0, AssetKey.SAVE)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        Phaser.Input.Events.POINTER_DOWN as string,
        () => {
          this.idleGame.saveGame();
        },
        this,
      );

    // listen for gained experience events
    EventCenter.emitter.on(
      EventCenter.SupportedEvents.GAINED_EXPERIENCE,
      (experience: number, functionText: string) => {
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

        // show completed task text
        const functionTextElement = this.getCurrentTaskText();
        functionTextElement.setText(functionText);
        this.tweens.add({
          targets: functionTextElement,
          alpha: 0,
          y: textElement.y + 50,
          duration: 2000,
          ease: Phaser.Math.Easing.Cubic.Out,
          onComplete: () => {
            functionTextElement.setActive(false);
          },
        });
      },
      this,
    );

    // listen for level changed events
    EventCenter.emitter.on(
      EventCenter.SupportedEvents.LEVEL_CHANGED,
      () => {
        this.progressBar.setMeterPercentage(0);
      },
      this,
    );

    EventCenter.emitter.on(
      EventCenter.SupportedEvents.STORAGE_NOT_AVAILABLE,
      () => {
        this.saveImage.setAlpha(0);
      },
      this,
    );

    EventCenter.emitter.on(
      EventCenter.SupportedEvents.GAME_SAVED,
      () => {
        if (this.gameSaveText) {
          this.gameSaveText.setAlpha(1);
          this.tweens.add({
            targets: this.gameSaveText,
            alpha: 0,
            duration: 1500,
            ease: Phaser.Math.Easing.Cubic.Out,
            onComplete: () => {
              this.gameSaveText.setAlpha(0);
            },
            delay: 500,
          });
        }
      },
      this,
    );

    // place current experience in the ui
    this.currentExperienceText = this.add
      .text(0, 0, `EXP: ${this.idleGame.player.experience}`, Config.MONITOR_TASK_PROGRESS_PHASER_TEXT_STYLE)
      .setOrigin(0.5);

    // create upgrades button
    this.createUpgradesButton();

    // create event loop for the auto task per second
    this.time.addEvent({
      loop: true,
      delay: 100,
      callback: () => this.handleDps(),
    });

    // create level navigation buttons
    this.backArrowImage = this.add.image(0, 0, AssetKey.ARROW_LEFT);
    this.backArrowImage.setInteractive();
    this.backArrowImage.on(Phaser.Input.Events.POINTER_DOWN as string, this.handleBackArrowClick, this);
    this.forwardArrowImage = this.add.image(0, 0, AssetKey.ARROW_RIGHT);
    this.forwardArrowImage.setInteractive();
    this.forwardArrowImage.on(Phaser.Input.Events.POINTER_DOWN as string, this.handleForwardArrowClick, this);

    this.keyboardImage = this.add.image(0, 0, AssetKey.KEYBOARD).setOrigin(0.5);
    this.mouseImage = this.add.image(0, 0, AssetKey.MOUSE).setOrigin(0.5);

    this.musicToggleButton = new ToggleButton(this, AssetKey.MUSIC_ON, AssetKey.MUSIC_OFF, 0, 0, () => {
      this.sound.mute = !this.sound.mute;
    });

    this.gameSaveText = this.add.text(0, 0, 'Game Saved!', Config.UI_PHASER_TEXT_STYLE).setAlpha(0);

    this.resize(this.scale.gameSize);

    // simple animation for having player move to next level
    const x = this.forwardArrowImage.x + 20;
    this.tweens.add({
      targets: this.forwardArrowImage,
      x,
      duration: 500,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });
  }

  public handleBackArrowClick(): void {
    this.idleGame.goToPreviousLevel();
  }

  public handleForwardArrowClick(): void {
    this.idleGame.goToNextLevel();
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
      Align.scaleGameObjectToGameWidth(this.tpsText, this.sceneWidth, 0.1);
      this.grid.placeGameObjectAtIndex(52, this.tpsText);
      if (GameUtils.mobile.isMobileDevice(window.navigator)) {
        this.tpsText.y += 20;
      } else {
        this.tpsText.y -= 80;
      }
    }
    // resize the progress bar
    if (this.progressBar) {
      if (GameUtils.mobile.isMobileDevice(window.navigator)) {
        this.grid.placeGameObjectAtIndex(65.5, this.progressBar.container);
      } else {
        this.grid.placeGameObjectAtIndex(50.5, this.progressBar.container);
      }
    }

    if (this.storyPointsRemainingText) {
      Align.scaleGameObjectToGameWidth(this.storyPointsRemainingText, this.sceneWidth, 0.275);
      if (GameUtils.mobile.isMobileDevice(window.navigator)) {
        this.grid.placeGameObjectAtIndex(63, this.storyPointsRemainingText);
      } else {
        this.grid.placeGameObjectAtIndex(48, this.storyPointsRemainingText);
      }
    }

    // resize function and hint text
    if (this.taskHintText) {
      Align.scaleGameObjectToGameWidth(this.taskHintText, this.sceneWidth, 0.5);
      this.grid.placeGameObjectAtIndex(76, this.taskHintText);
    }
    if (this.currentTaskTextGroup) {
      Align.scaleGameObjectToGameWidth(this.currentTaskText, this.sceneWidth, 0.65);
      this.grid.placeGameObjectAtIndex(91, this.currentTaskText);
    }

    // resize experience text
    if (this.currentExperienceText) {
      Align.scaleGameObjectToGameWidth(this.currentExperienceText, this.sceneWidth, 0.1);
      this.grid.placeGameObjectAtIndex(137, this.currentExperienceText);
      if (GameUtils.mobile.isMobileDevice(window.navigator)) {
        this.currentExperienceText.y -= 50;
      }
    }

    // resize upgrades button
    if (this.upgradesButtonContainer) {
      this.upgradesButtonContainer.setScale(3.5 * (this.sceneWidth / this.sceneHeight));
      this.grid.placeGameObjectAtIndex(197, this.upgradesButtonContainer);
      this.upgradesButtonContainer.y += this.grid.cellDimensions.height / 2;
    }

    // resize level navigation buttons
    if (this.backArrowImage) {
      this.grid.placeGameObjectAtIndex(4, this.backArrowImage);
    }
    if (this.forwardArrowImage) {
      this.grid.placeGameObjectAtIndex(10, this.forwardArrowImage);
    }

    if (this.keyboardImage) {
      Align.scaleGameObjectToGameWidth(this.keyboardImage, this.sceneWidth, 0.5);
      this.grid.placeGameObjectAtIndex(170, this.keyboardImage);
      this.keyboardImage.y += 60;
    }
    if (this.mouseImage) {
      Align.scaleGameObjectToGameWidth(this.mouseImage, this.sceneWidth, 0.1);
      this.grid.placeGameObjectAtIndex(176, this.mouseImage);
      this.mouseImage.y += 60;
    }

    if (this.musicToggleButton) {
      Align.scaleGameObjectToGameWidth(this.musicToggleButton.image, this.sceneWidth, 0.1);
      this.grid.placeGameObjectAtIndex(13.5, this.musicToggleButton.image);
    }

    if (this.saveImage) {
      Align.scaleGameObjectToGameWidth(this.saveImage, this.sceneWidth, 0.1);
      this.grid.placeGameObjectAtIndex(0.5, this.saveImage);
    }

    if (this.gameSaveText) {
      Align.scaleGameObjectToGameWidth(this.gameSaveText, this.sceneWidth, 0.2);
      this.grid.placeGameObjectAtIndex(15, this.gameSaveText);
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
      Align.scaleGameObjectToGameWidth(this.taskHintText, this.sceneWidth, 0.5);
    }
    if (this.tpsText) {
      this.tpsText.setText(`TPPS: ${this.idleGame.player.dps}`);
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

    // hide forward and back arrows based on the current level
    if (this.backArrowImage) {
      if (this.idleGame.level > 1) {
        this.backArrowImage.setAlpha(1);
        this.backArrowImage.setActive(true);
      } else {
        this.backArrowImage.setAlpha(0);
        this.backArrowImage.setActive(false);
      }
    }
    if (this.forwardArrowImage) {
      if (this.idleGame.level <= this.idleGame.maxLevelCompleted) {
        this.forwardArrowImage.setAlpha(1);
        this.forwardArrowImage.setActive(true);
      } else {
        this.forwardArrowImage.setAlpha(0);
        this.forwardArrowImage.setActive(false);
      }
    }
  }

  public handlePlayerInput(): void {
    this.idleGame.handlePlayerClick();
    const storyPointsRemaining = this.idleGame.currentLevelStoryPoints / this.idleGame.maxLevelStoryPoints;
    this.progressBar.setMeterPercentageAnimated(1 - storyPointsRemaining, 250);
  }

  public handleDps(): void {
    if (this.idleGame && this.idleGame.player.dps > 0) {
      this.idleGame.handlePlayerClick(this.idleGame.player.dps * 0.1);
      const storyPointsRemaining = this.idleGame.currentLevelStoryPoints / this.idleGame.maxLevelStoryPoints;
      this.progressBar.setMeterPercentageAnimated(1 - storyPointsRemaining, 250);
    }
  }

  private getCurrentTaskText(): Phaser.GameObjects.Text {
    let textElement = this.currentTaskTextGroup.getFirstDead() as Phaser.GameObjects.Text | undefined;
    if (!textElement) {
      textElement = this.add.text(0, 0, this.idleGame.currentLevelFunctionText, Config.MONITOR_PHASER_TEXT_STYLE);
      this.currentTaskTextGroup.add(textElement);
    }
    textElement.setActive(true);
    textElement.setAlpha(1);

    // position the text element in the grid
    Align.scaleGameObjectToGameWidth(textElement, this.sceneWidth, 0.6);
    textElement.scaleY = textElement.scaleX * 1.2;
    this.grid.placeGameObjectAtIndex(91, textElement);
    return textElement;
  }

  private createUpgradesButton(): void {
    this.upgradesButtonContainer = this.add.container();
    this.upgradesButton = new Button({
      scene: this,
      defaultImageKey: AssetKey.UI_BUTTON,
      hoverButtonImageKey: AssetKey.UI_BUTTON,
      clickCallBack: () => {
        if (!this.isMenuShown) {
          this.scene.launch(SceneKeys.UPGRADE_MENU_SCENE);
          this.isMenuShown = true;
        } else {
          this.scene.setVisible(true, SceneKeys.UPGRADE_MENU_SCENE);
          this.scene.setActive(true, SceneKeys.UPGRADE_MENU_SCENE);
        }
      },
    });
    this.upgradesButtonContainer.add(this.upgradesButton.image);
    this.upgradesButton.image.on(Phaser.Input.Events.POINTER_OVER as string, () => {
      this.upgradesButtonContainer.y -= 10;
    });
    this.upgradesButton.image.on(Phaser.Input.Events.POINTER_OUT as string, () => {
      this.upgradesButtonContainer.y += 10;
    });

    const playAgainText = this.add
      .text(0, 0, 'Upgrades', {
        color: '#000000',
        fontSize: '28px',
      })
      .setOrigin(0.5);
    this.upgradesButtonContainer.add(playAgainText);
    this.upgradesButton.image.setScale(1.5, 1);
  }
}
