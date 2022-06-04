import type { LevelConfig, UpgradeConfig } from './types';
import Data from './data';

const levelConfiguration: {
  [key: number]: LevelConfig;
} = {
  1: {
    functionText: Data.calculator.add.text,
    functionTests: Data.calculator.add.tests,
    taskText: Data.calculator.add.task,
    storyPoints: 10,
    experienceReward: 1,
  },
  2: {
    functionText: Data.calculator.subtract.text,
    functionTests: Data.calculator.subtract.tests,
    taskText: Data.calculator.subtract.task,
    storyPoints: 20,
    experienceReward: 2,
  },
};

const upgradeConfiguration: {
  [key: number]: UpgradeConfig;
} = {
  1: {
    baseCost: 5,
  },
  2: {
    baseCost: 50,
  },
};

export { levelConfiguration, upgradeConfiguration };
