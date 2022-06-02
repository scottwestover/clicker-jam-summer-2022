import type { LevelConfig } from './types';
import * as Calculator from './sprints/calculator';

const levelConfiguration: {
  [key: string]: LevelConfig;
} = {
  1: {
    functionText: Calculator.addFunctionText,
    taskText: '// Task: Calculator - Add two numbers',
    storyPoints: 10,
    experienceReward: 1,
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
