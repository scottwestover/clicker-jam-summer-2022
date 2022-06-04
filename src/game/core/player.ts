type Upgrade = {
  level: number;
};

type Upgrades = {
  1: Upgrade;
  2: Upgrade;
};

export default class Player {
  #clickDamage: number;
  #dps: number;
  #experience: number;
  #upgrades: Upgrades;

  constructor() {
    this.#clickDamage = 8;
    this.#dps = 0;
    this.#experience = 0;
    this.#upgrades = {
      1: {
        level: 0,
      },
      2: {
        level: 0,
      },
    };
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

  get upgrades(): Upgrades {
    return this.#upgrades;
  }

  public addToClickDamage(amount: number): void {
    this.#clickDamage += amount;
  }

  public addToDps(amount: number): void {
    this.#dps += amount;
  }

  public addExperience(amount: number): void {
    this.#experience += amount;
  }

  public reset(): void {
    this.#clickDamage = 1;
    this.#dps = 0;
    this.#experience = 0;
  }
}
