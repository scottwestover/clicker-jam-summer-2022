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

const sine = `
function sine(a: number): number {
  return Math.sin(a);
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
  expect(Calculator.subtract(2, 0)).toBe(2);
});
`;
const subtractTest2 = `
it('should subtract two numbers 2', () => {
  expect(Calculator.subtract(2, 1)).toBe(1);
});
`;
const subtractTest3 = `
it('should subtract two numbers 3', () => {
  expect(Calculator.subtract(2, 3)).toBe(-1);
});
`;
const subtractTest4 = `
it('should subtract two numbers 4', () => {
  expect(Calculator.subtract(22, 1)).toBe(21);
});
`;
const subtractTest5 = `
it('should subtract two numbers 5', () => {
  expect(Calculator.subtract(-1, -2)).toBe(1);
});
`;

const divideTest1 = `
it('should divide two numbers 1', () => {
  expect(Calculator.divide(2, 1)).toBe(2);
});
`;
const divideTest2 = `
it('should divide two numbers 2', () => {
  expect(Calculator.divide(4, 2)).toBe(2);
});
`;
const divideTest3 = `
it('should divide two numbers 3', () => {
  expect(Calculator.divide(1, 1)).toBe(1);
});
`;
const divideTest4 = `
it('should divide two numbers 4', () => {
  expect(Calculator.divide(22, 1)).toBe(22);
});
`;
const divideTest5 = `
it('should divide two numbers 5', () => {
  expect(Calculator.divide(-1, -1)).toBe(1);
});
`;

const reminderTest1 = `
it('should remainder two numbers 1', () => {
  expect(Calculator.remainder(2, 1)).toBe(0);
});
`;
const reminderTest2 = `
it('should remainder two numbers 2', () => {
  expect(Calculator.remainder(4, 2)).toBe(0);
});
`;
const reminderTest3 = `
it('should remainder two numbers 3', () => {
  expect(Calculator.remainder(1, 1)).toBe(0);
});
`;
const reminderTest4 = `
it('should remainder two numbers 4', () => {
  expect(Calculator.remainder(22, 7)).toBe(1);
});
`;
const reminderTest5 = `
it('should remainder two numbers 5', () => {
  expect(Calculator.remainder(-1, -1)).toBe(-0);
});
`;

const multiplyTest1 = `
it('should multiply two numbers 1', () => {
  expect(Calculator.multiply(2, 1)).toBe(2);
});
`;
const multiplyTest2 = `
it('should multiply two numbers 2', () => {
  expect(Calculator.multiply(4, 2)).toBe(8);
});
`;
const multiplyTest3 = `
it('should multiply two numbers 3', () => {
  expect(Calculator.multiply(1, 1)).toBe(1);
});
`;
const multiplyTest4 = `
it('should multiply two numbers 4', () => {
  expect(Calculator.multiply(22, 1)).toBe(22);
});
`;
const multiplyTest5 = `
it('should multiply two numbers 5', () => {
  expect(Calculator.multiply(-1, -1)).toBe(1);
});
`;

const clearTest1 = `
it('should clear the calculator', () => {
  expect(Calculator.clear()).toBeUndefined();
});
`;

const squareTest1 = `
it('should square a number 1', () => {
  expect(Calculator.square(2)).toBe(4);
});
`;
const squareTest2 = `
it('should square a number 2', () => {
  expect(Calculator.square(1)).toBe(1);
});
`;
const squareTest3 = `
it('should square a number 3', () => {
  expect(Calculator.square(-1)).toBe(1);
});
`;
const squareTest4 = `
it('should square a number 4', () => {
  expect(Calculator.square(3)).toBe(9);
});
`;
const squareTest5 = `
it('should square a number 5', () => {
  expect(Calculator.square(1.5)).toBe(2.25);
});
`;

const squareRootTest1 = `
it('should take the square root a
  number 1', () => {
  expect(Calculator.squareRoot(1)).toBe(1);
});
`;
const squareRootTest2 = `
it('should take the square root a
  number 2', () => {
  expect(Calculator.squareRoot(4)).toBe(2);
});
`;
const squareRootTest3 = `
it('should take the square root a
  number 3', () => {
  expect(Calculator.squareRoot(0)).toBe(0);
});
`;
const squareRootTest4 = `
it('should take the square root a
  number 4', () => {
  expect(Calculator.squareRoot(9)).toBe(3);
});
`;
const squareRootTest5 = `
it('should take the square root a
  number 5', () => {
  expect(Calculator.squareRoot(2))
  .toBe(1.4142135623730951);
});
`;

const percentageTest1 = `
it('should take the percentage of
  two numbers 1', () => {
  expect(Calculator.percentage(1, 1)).toBe(100);
});
`;
const percentageTest2 = `
it('should take the percentage of
  two numbers 2', () => {
  expect(Calculator.percentage(1, 3))
  .toBe(33.33333333333333);
});
`;
const percentageTest3 = `
it('should take the percentage of
  two numbers 3', () => {
  expect(Calculator.percentage(3, 1))
  .toBe(300);
});
`;
const percentageTest4 = `
it('should take the percentage of
  two numbers 4', () => {
  expect(Calculator.percentage(2, 4))
  .toBe(50);
});
`;
const percentageTest5 = `
it('should take the percentage of
  two numbers 5', () => {
  expect(Calculator.percentage(1, 2))
  .toBe(50);
});
`;

const sineTest1 = `
it('should return sine of a number 1', () => {
  expect(Calculator.sine(1))
  .toBe(0.8414709848078965);
});
`;
const sineTest2 = `
it('should return sine of a number 2', () => {
  expect(Calculator.sine(2))
  .toBe(0.9092974268256817);
});
`;
const sineTest3 = `
it('should return sine of a number 3', () => {
  expect(Calculator.sine(-1))
  .toBe(-0.8414709848078965);
});
`;
const sineTest4 = `
it('should return sine of a number 4', () => {
  expect(Calculator.sine(0)).toBe(0);
});
`;
const sineTest5 = `
it('should return sine of a number 5', () => {
  expect(Calculator.sine(1.1))
  .toBe(0.8912073600614354);
});
`;

export default {
  calculator: {
    add: {
      text: add,
      task: '// Task: Calculator\n// Add two numbers',
      tests: [addTest1, addTest2, addTest3, addTest4, addTest5],
    },
    remainder: {
      text: remainder,
      task: '// Task: Calculator\n// Find the remainder of two numbers',
      tests: [reminderTest1, reminderTest2, reminderTest3, reminderTest4, reminderTest5],
    },
    divide: {
      text: divide,
      task: '// Task: Calculator\n// Divide two numbers',
      tests: [divideTest1, divideTest2, divideTest3, divideTest4, divideTest5],
    },
    multiply: {
      text: multiply,
      task: '// Task: Calculator\n// Multiply two numbers',
      tests: [multiplyTest1, multiplyTest2, multiplyTest3, multiplyTest4, multiplyTest5],
    },
    subtract: {
      text: subtract,
      task: '// Task: Calculator\n// Subtract two numbers',
      tests: [subtractTest1, subtractTest2, subtractTest3, subtractTest4, subtractTest5],
    },
    clear: {
      text: clear,
      task: '// Task: Calculator\n// Clear the calculator',
      tests: [clearTest1],
    },
    square: {
      text: square,
      task: '// Task: Calculator\n// Square a number',
      tests: [squareTest1, squareTest2, squareTest3, squareTest4, squareTest5],
    },
    squareRoot: {
      text: squareRoot,
      task: '// Task: Calculator\n// Find the square root of a number',
      tests: [squareRootTest1, squareRootTest2, squareRootTest3, squareRootTest4, squareRootTest5],
    },
    percentage: {
      text: percentage,
      task: '// Task: Calculator\n// Find the percentage of two numbers',
      tests: [percentageTest1, percentageTest2, percentageTest3, percentageTest4, percentageTest5],
    },
    sine: {
      text: sine,
      task: '// Task: Calculator\n// Find the sine of a number',
      tests: [sineTest1, sineTest2, sineTest3, sineTest4, sineTest5],
    },
  },
};
