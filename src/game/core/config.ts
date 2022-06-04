import type { LevelConfig } from './types';
import Data from './data';

const levelConfiguration: {
  [key: string]: LevelConfig;
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

const upgradeConfiguration = {
  upgrade1: {
    1: {
      cost: 5,
    },
    2: {
      cost: 10,
    },
  },
  upgrade2: {
    1: {
      cost: 10,
    },
    2: {
      cost: 20,
    },
  },
};

export { levelConfiguration, upgradeConfiguration };
