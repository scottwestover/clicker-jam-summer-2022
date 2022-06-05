import type { LevelConfig, UpgradeConfig } from './types';
import Data from './data';

const levelConfiguration: {
  [key: number]: LevelConfig;
} = {
  1: {
    functionText: Data.calculator.add.text,
    functionTests: Data.calculator.add.tests,
    taskText: Data.calculator.add.task,
  },
  2: {
    functionText: Data.calculator.subtract.text,
    functionTests: Data.calculator.subtract.tests,
    taskText: Data.calculator.subtract.task,
  },
  3: {
    functionText: Data.calculator.multiply.text,
    functionTests: Data.calculator.multiply.tests,
    taskText: Data.calculator.multiply.task,
  },
  4: {
    functionText: Data.calculator.divide.text,
    functionTests: Data.calculator.divide.tests,
    taskText: Data.calculator.divide.task,
  },
  5: {
    functionText: Data.calculator.sine.text,
    functionTests: Data.calculator.sine.tests,
    taskText: Data.calculator.sine.task,
  },
  6: {
    functionText: Data.calculator.square.text,
    functionTests: Data.calculator.square.tests,
    taskText: Data.calculator.square.task,
  },
  7: {
    functionText: Data.calculator.squareRoot.text,
    functionTests: Data.calculator.squareRoot.tests,
    taskText: Data.calculator.squareRoot.task,
  },
  8: {
    functionText: Data.calculator.percentage.text,
    functionTests: Data.calculator.percentage.tests,
    taskText: Data.calculator.percentage.task,
  },
  9: {
    functionText: Data.calculator.remainder.text,
    functionTests: Data.calculator.remainder.tests,
    taskText: Data.calculator.remainder.task,
  },
  10: {
    functionText: Data.calculator.clear.text,
    functionTests: Data.calculator.clear.tests,
    taskText: Data.calculator.clear.task,
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
  3: {
    baseCost: 250,
  },
};

export { levelConfiguration, upgradeConfiguration };
