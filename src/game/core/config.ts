import type { LevelConfig } from './types';
import * as Calculator from './sprints/calculator';

const config: {
  [key: string]: LevelConfig;
} = {
  1: {
    functionText: Calculator.addFunctionText,
    taskText: '// Task: Calculator - Add two numbers',
    storyPoints: 10,
    experienceReward: 1,
  },
};

export { config };
