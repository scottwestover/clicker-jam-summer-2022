export default class Player {
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
