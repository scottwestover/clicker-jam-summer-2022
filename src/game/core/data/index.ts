const add = `
function add(a: number, b: number): number {
  return a + b;
}
`;

const subtract = `
function subtract(a: number, b: number): number {
  return a - b;
}
`;

const multiply = `
function multiply(a: number, b: number): number {
  return a * b;
}
`;

const divide = `
function divide(a: number, b: number): number {
  return a / b;
}
`;

const clear = `
function clear(): number {
  return 0;
}
`;

const square = `
function square(a: number): number {
  return a * a;
}
`;

const squareRoot = `
function squareRoot(a: number): number {
  return Math.sqrt(a);
}
`;

const percentage = `
function percentage(a: number, b: number): number {
  return (a / b) * 100;
}
`;

const remainder = `
function remainder(a: number, b: number): number {
  return a % b;
}
`;

const addTest1 = `
it('should add two numbers 1', () => {
  expect(Calculator.add(1, 2)).toBe(3);
});
`;

const addTest2 = `
it('should add two numbers 2', () => {
  expect(Calculator.add(1, 3)).toBe(4);
});
`;

const addTest3 = `
it('should add two numbers 3', () => {
  expect(Calculator.add(2, 1)).toBe(3);
});
`;

const addTest4 = `
it('should add two numbers 1', () => {
  expect(Calculator.add(1, 2)).toBe(3);
});
`;

const addTest5 = `
it('should add two numbers 5', () => {
  expect(Calculator.add(-1, 1)).toBe(0);
});
`;

const subtractTest1 = `
it('should subtract two numbers 1', () => {
  expect(Calculator.add(2, 0)).toBe(2);
});
`;

export default {
  calculator: {
    add: {
      text: add,
      task: '// Task: Calculator - Add two numbers',
      tests: [addTest1, addTest2, addTest3, addTest4, addTest5],
    },
    remainder: {
      text: remainder,
      task: '// Task: Calculator - Find the remainder of two numbers',
      tests: [subtractTest1],
    },
    divide: {
      text: divide,
      task: '// Task: Calculator - Divide two numbers',
      tests: [subtractTest1],
    },
    multiply: {
      text: multiply,
      task: '// Task: Calculator - Multiply two numbers',
      tests: [subtractTest1],
    },
    subtract: {
      text: subtract,
      task: '// Task: Calculator - Subtract two numbers',
      tests: [subtractTest1],
    },
    clear: {
      text: clear,
      task: '// Task: Calculator - Clear the calculator',
      tests: [subtractTest1],
    },
    square: {
      text: square,
      task: '// Task: Calculator - Square a number',
      tests: [subtractTest1],
    },
    squareRoot: {
      text: squareRoot,
      task: '// Task: Calculator - Find the square root of a number',
      tests: [subtractTest1],
    },
    percentage: {
      text: percentage,
      task: '// Task: Calculator - Find the percentage of two numbers',
      tests: [subtractTest1],
    },
  },
};
