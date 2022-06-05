import * as GameUtils from '@devshareacademy/common-game-utils';
import Player from './player';
import { levelConfiguration } from './config';
import * as EventCenter from '../../lib/events/event-center';

type IdleGameData = {
  player: {
    dps: number;
    experience: number;
    damage: number;
    upgrades: { [key: number]: number };
  };
  tasksCompleted: number;
  maxLevelTasksCompleted: number;
  maxLevelCompleted: number;
  currentLevel: number;
};

export class IdleGame {
  private static instance: IdleGame;

  #player: Player;
  #level: number;
  #currentLevelStoryPoints: number;
  #currentLevelFunctionText: string;
  #currentLevelFunctionTestsText: string[];
  #currentLevelFunctionTestText: string;
  #currentLevelTaskText: string;
  #currentLevelExperienceReward: number;
  #maxLevelStoryPoints: number;
  #tasksCompleted: number;
  #requiredTasksToCompleteLevel = 10;
  #maxLevelCompleted: number;
  #maxLevelTasksCompleted: number;
  #storage!: GameUtils.Storage;

  public static getInstance(): IdleGame {
    if (!IdleGame.instance) {
      IdleGame.instance = new IdleGame();
    }

    return IdleGame.instance;
  }

  private constructor() {
    try {
      this.#storage = new GameUtils.storage.LocalStorage();
    } catch (error) {
      console.log('local storage not available');
      EventCenter.emitter.emit(EventCenter.SupportedEvents.STORAGE_NOT_AVAILABLE);
    }

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
    this.#currentLevelFunctionTestsText = [];
    this.#currentLevelFunctionTestText = '';

    this.loadGame();
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
    if (this.#tasksCompleted === 0 && this.#maxLevelCompleted < this.#level) {
      return this.#currentLevelFunctionText;
    }
    return this.#currentLevelFunctionTestText;
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
      this.#currentLevelStoryPoints -= damage;
    } else {
      this.#currentLevelStoryPoints -= this.#player.clickDamage;
    }

    if (this.#currentLevelStoryPoints <= 0) {
      // emit message about task completion
      EventCenter.emitter.emit(
        EventCenter.SupportedEvents.GAINED_EXPERIENCE,
        this.#currentLevelExperienceReward,
        this.currentLevelFunctionText,
      );
      this.player.addExperience(this.#currentLevelExperienceReward);

      // increment number of sub tasks completed for current task
      this.#tasksCompleted++;
      // reset current level story points
      this.#currentLevelStoryPoints = this.#maxLevelStoryPoints;
      // update test test text
      this.#currentLevelFunctionTestText =
        this.#currentLevelFunctionTestsText[
          GameUtils.random.between(0, this.#currentLevelFunctionTestsText.length - 1)
        ];

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

  public saveGame(): void {
    const upgrades = this.#player.upgrades;
    const data: IdleGameData = {
      player: {
        damage: this.#player.clickDamage,
        dps: this.#player.dps,
        experience: this.#player.experience,
        upgrades: {
          1: upgrades[1].level,
          2: upgrades[2].level,
          3: upgrades[3].level,
        },
      },
      tasksCompleted: this.#tasksCompleted,
      maxLevelTasksCompleted: this.#maxLevelTasksCompleted,
      maxLevelCompleted: this.#maxLevelCompleted,
      currentLevel: this.#level,
    };

    if (this.#maxLevelCompleted < this.#level) {
      data.maxLevelTasksCompleted = this.#tasksCompleted;
    }

    if (this.#storage) {
      this.#storage.set('idle_programmer_data', JSON.stringify(data));
      EventCenter.emitter.emit(EventCenter.SupportedEvents.GAME_SAVED);
    }
  }

  private loadGame(): void {
    if (this.#storage) {
      const data = this.#storage.get('idle_programmer_data');
      if (data) {
        try {
          const parsedData = JSON.parse(data) as IdleGameData;
          if (parsedData) {
            this.#tasksCompleted = parsedData.tasksCompleted;
            this.#maxLevelTasksCompleted = parsedData.maxLevelTasksCompleted;
            this.#maxLevelCompleted = parsedData.maxLevelCompleted;
            this.#player.clickDamage = parsedData.player.damage;
            this.#player.dps = parsedData.player.dps;
            this.#player.experience = parsedData.player.experience;
            this.#player.setUpgradeLevel(1, parsedData.player.upgrades[1]);
            this.#player.setUpgradeLevel(2, parsedData.player.upgrades[2]);
            this.#player.setUpgradeLevel(3, parsedData.player.upgrades[3]);
            this.#level = parsedData.currentLevel;
          }
        } catch (error) {
          console.log((error as Error).message);
        }
      } else {
        console.log('no data found');
      }
    } else {
      console.log('local storage not available');
    }
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

    // emit message about level change
    EventCenter.emitter.emit(EventCenter.SupportedEvents.LEVEL_CHANGED);
  }

  private loadLevelConfiguration(): void {
    const levelConfig = levelConfiguration[this.#level % 10];
    const storyPoints = this.calculateRequiredStoryPoints(this.#level);
    this.#currentLevelStoryPoints = storyPoints;
    this.#maxLevelStoryPoints = storyPoints;
    this.#currentLevelExperienceReward = this.calculateRequiredExperience(this.#maxLevelStoryPoints);

    if (levelConfig) {
      this.#currentLevelFunctionText = levelConfig.functionText;
      this.#currentLevelTaskText = levelConfig.taskText;
      this.#currentLevelFunctionTestsText = levelConfig.functionTests;
      this.#currentLevelFunctionTestText =
        this.#currentLevelFunctionTestsText[
          GameUtils.random.between(0, this.#currentLevelFunctionTestsText.length - 1)
        ];
    } else {
      console.log('level configuration not found, fall back to last level configuration');
    }
  }

  /**
   * All formulas for the upgrades are based on the following formulas from clicker heroes:
   * https://clickerheroes.fandom.com/wiki/Formulas#Monster_HP_for_levels
   */
  private calculateRequiredStoryPoints(level: number): number {
    // [10 x (Level - 1 + 1.55^(Level - 1)) x (isBoss x 10)]
    const isBoss = level % 10 === 0;
    const storyPoints = 10 * (level - 1 + Math.pow(1.55, level - 1));
    if (isBoss) {
      return storyPoints * 10;
    }
    return storyPoints;
  }

  private calculateRequiredExperience(storyPoints: number): number {
    return Math.ceil(storyPoints / 15);
  }
}
