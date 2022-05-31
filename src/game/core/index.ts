class Player {
  #clickDamage: number;
  #dps: number;
  #experience: number;

  constructor() {
    this.#clickDamage = 1;
    this.#dps = 0;
    this.#experience = 0;
  }

  get clickDamage(): number {
    return this.#clickDamage;
  }

  get dps(): number {
    return this.#dps;
  }

  get experience(): number {
    return this.#experience;
  }

  public addToClickDamage(amount: number): void {
    this.#clickDamage += amount;
  }

  public addToDps(amount: number): void {
    this.#dps += amount;
  }

  public reset(): void {
    this.#clickDamage = 1;
    this.#dps = 0;
    this.#experience = 0;
  }
}

type LevelConfig = {
  func: string;
  storyPoints: number;
  experienceReward: number;
};

const config: {
  [key: string]: LevelConfig;
} = {
  1: {
    func: 'add',
    storyPoints: 10,
    experienceReward: 1,
  },
};

export class IdleGame {
  #player: Player;
  #level: number;
  #currentLevelStoryPoints: number;
  #maxLevelStoryPoints: number;
  #tasksCompleted: number;
  #requiredTasksToCompleteLevel = 10;
  #maxLevelCompleted: number;

  constructor() {
    this.#player = new Player();
    this.#tasksCompleted = 0;
    this.#maxLevelCompleted = 0;
    this.#level = 1;
    const levelConfig = config[this.#level];
    if (levelConfig) {
      this.#currentLevelStoryPoints = levelConfig.storyPoints;
      this.#maxLevelStoryPoints = levelConfig.storyPoints;
    } else {
      this.#currentLevelStoryPoints = 0;
      this.#maxLevelStoryPoints = 0;
    }
  }

  get level(): number {
    return this.#level;
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

  public handlePlayerClick(): void {
    this.#currentLevelStoryPoints -= this.#player.clickDamage;
    console.log(this.#currentLevelStoryPoints);

    if (this.#currentLevelStoryPoints <= 0) {
      // increment number of sub tasks completed for current task
      this.#tasksCompleted++;
      // reset current level story points
      this.#currentLevelStoryPoints = this.#maxLevelStoryPoints;
      // check if level is complete so player is able to move to next level
      // TODO
    }
  }
}
