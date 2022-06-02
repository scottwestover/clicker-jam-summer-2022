import Player from './player';
import { levelConfiguration } from './config';
import * as EventCenter from '../../lib/events/event-center';

export class IdleGame {
  private static instance: IdleGame;

  #player: Player;
  #level: number;
  #currentLevelStoryPoints: number;
  #currentLevelFunctionText: string;
  #currentLevelTaskText: string;
  #currentLevelExperienceReward: number;
  #maxLevelStoryPoints: number;
  #tasksCompleted: number;
  #requiredTasksToCompleteLevel = 10;
  #maxLevelCompleted: number;
  #maxLevelTasksCompleted: number;

  public static getInstance(): IdleGame {
    if (!IdleGame.instance) {
      IdleGame.instance = new IdleGame();
    }

    return IdleGame.instance;
  }

  private constructor() {
    this.#player = new Player();
    this.#tasksCompleted = 0;
    this.#maxLevelCompleted = 0;
    this.#maxLevelTasksCompleted = 0;
    this.#level = 1;

    this.#currentLevelStoryPoints = 0;
    this.#maxLevelStoryPoints = 0;
    this.#currentLevelFunctionText = '';
    this.#currentLevelTaskText = '';
    this.#currentLevelExperienceReward = 0;

    this.loadLevelConfiguration();
  }

  get level(): number {
    return this.#level;
  }

  get maxLevelCompleted(): number {
    return this.#maxLevelCompleted;
  }

  get tasksCompleted(): number {
    // if current max level completed is higher or equal to the current level, then we know all tasks have been completed previously
    if (this.#maxLevelCompleted >= this.#level) {
      return this.#requiredTasksToCompleteLevel;
    }
    return this.#tasksCompleted;
  }

  get requiredTasksToCompleteLevel(): number {
    return this.#requiredTasksToCompleteLevel;
  }

  get currentLevelStoryPoints(): number {
    return this.#currentLevelStoryPoints;
  }

  get maxLevelStoryPoints(): number {
    return this.#maxLevelStoryPoints;
  }

  get currentLevelFunctionText(): string {
    return this.#currentLevelFunctionText;
  }

  get currentLevelTaskText(): string {
    if (this.#tasksCompleted === 0 && this.#maxLevelCompleted < this.#level) {
      return this.#currentLevelTaskText;
    }
    return `${this.#currentLevelTaskText} (tests)`;
  }

  get player(): Player {
    return this.#player;
  }

  public handlePlayerClick(damage?: number): void {
    if (damage) {
      console.log(damage);
      this.#currentLevelStoryPoints -= damage;
    } else {
      this.#currentLevelStoryPoints -= this.#player.clickDamage;
    }

    if (this.#currentLevelStoryPoints <= 0) {
      // emit message about task completion
      EventCenter.emitter.emit(
        EventCenter.SupportedEvents.GAINED_EXPERIENCE,
        this.#currentLevelExperienceReward,
        this.#currentLevelFunctionText,
      );
      this.player.addExperience(this.#currentLevelExperienceReward);

      // increment number of sub tasks completed for current task
      this.#tasksCompleted++;
      // reset current level story points
      this.#currentLevelStoryPoints = this.#maxLevelStoryPoints;
      // check if level is complete so player is able to move to next level
      if (this.#tasksCompleted >= this.#requiredTasksToCompleteLevel && this.#maxLevelCompleted < this.#level) {
        this.#maxLevelCompleted = this.#level;
        this.#maxLevelTasksCompleted = 0;
      }
    }
  }

  public goToNextLevel(): void {
    this.#level += 1;
    this.handleLevelChange();
  }

  public goToPreviousLevel(): void {
    // store current tasks completed if on current max level and level has not been completed before
    if (this.#maxLevelCompleted < this.#level) {
      this.#maxLevelTasksCompleted = this.#tasksCompleted;
    }
    this.#level -= 1;
    this.handleLevelChange();
  }

  private handleLevelChange(): void {
    // load level configuration
    this.loadLevelConfiguration();
    // reset tasks completed if level has not been completed before
    if (this.#maxLevelCompleted < this.#level) {
      this.#tasksCompleted = this.#maxLevelTasksCompleted;
    }
    // reset current level story points
    this.#currentLevelStoryPoints = this.#maxLevelStoryPoints;
  }

  private loadLevelConfiguration(): void {
    const levelConfig = levelConfiguration[this.#level];
    if (levelConfig) {
      this.#currentLevelStoryPoints = levelConfig.storyPoints;
      this.#maxLevelStoryPoints = levelConfig.storyPoints;
      this.#currentLevelFunctionText = levelConfig.functionText;
      this.#currentLevelTaskText = levelConfig.taskText;
      this.#currentLevelExperienceReward = levelConfig.experienceReward;
    } else {
      console.log('level configuration not found');
    }
  }
}
