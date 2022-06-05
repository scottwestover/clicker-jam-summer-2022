import { upgradeConfiguration } from './config';

type Upgrade = {
  level: number;
  baseCost: number;
  currentCost: number;
  baseDps: number;
};

export default class Player {
  #clickDamage: number;
  #dps: number;
  #experience: number;
  #upgrades: {
    [key: number]: Upgrade;
  };

  constructor() {
    this.#clickDamage = 1;
    this.#dps = 0;
    this.#experience = 0;
    this.#upgrades = {};

    this.loadConfiguration();
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

  get upgrades(): { [key: number]: Upgrade } {
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

  public buyUpgrade(upgradeId: number): boolean {
    const upgrade = this.#upgrades[upgradeId];

    if (this.#experience >= upgrade.currentCost) {
      this.#experience -= upgrade.currentCost;
      upgrade.level += 1;
      upgrade.currentCost = this.getUpgradeCost(upgradeId);

      this.#dps += this.getDpsChange(upgradeId);
      return true;
    }

    return false;
  }

  /**
   * All formulas for the upgrades are based on the following formulas from clicker heroes:
   * https://clickerheroes.fandom.com/wiki/Formulas
   * https://clickerheroes.fandom.com/wiki/Heroes
   * https://gamedevelopment.tutsplus.com/articles/numbers-getting-bigger-the-design-and-math-of-incremental-games--cms-24023
   */
  private getUpgradeCost(upgradeId: number): number {
    const upgrade = this.#upgrades[upgradeId];
    if (upgradeId === 1) {
      if (upgrade.level < 16) {
        return Math.floor((upgrade.baseCost + upgrade.level + 1) * Math.pow(1.07, upgrade.level));
      }

      return Math.floor(20 * Math.pow(1.07, upgrade.level));
    }
    return Math.floor(upgrade.baseCost * Math.pow(1.07, upgrade.level));
  }

  private getDpsChange(upgradeId: number): number {
    const upgrade = this.#upgrades[upgradeId];

    const staticModifier = 1;
    const newDps = upgrade.baseDps * upgrade.level * staticModifier;
    const oldDps = upgrade.baseDps * (upgrade.level - 1) * staticModifier;
    return newDps - oldDps;
  }

  private loadConfiguration(): void {
    this.#upgrades[1] = {
      level: 0,
      baseCost: upgradeConfiguration[1].baseCost,
      currentCost: upgradeConfiguration[1].baseCost,
      baseDps: 0,
    };
    this.#upgrades[2] = {
      level: 0,
      baseCost: upgradeConfiguration[2].baseCost,
      currentCost: upgradeConfiguration[2].baseCost,
      baseDps: 5,
    };
    this.#upgrades[3] = {
      level: 0,
      baseCost: upgradeConfiguration[3].baseCost,
      currentCost: upgradeConfiguration[3].baseCost,
      baseDps: 22,
    };
  }
}
