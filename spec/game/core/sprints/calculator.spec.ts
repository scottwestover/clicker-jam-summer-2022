import * as Calculator from '../../../../src/game/core/sprints/calculator';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two numbers 1', () => {
      expect(Calculator.add(1, 2)).toBe(3);
    });

    it('should add two numbers 2', () => {
      expect(Calculator.add(1, 3)).toBe(4);
    });

    it('should add two numbers 3', () => {
      expect(Calculator.add(2, 1)).toBe(3);
    });

    it('should add two numbers 4', () => {
      expect(Calculator.add(5, 5)).toBe(10);
    });

    it('should add two numbers 5', () => {
      expect(Calculator.add(-1, 1)).toBe(0);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers 1', () => {
      expect(Calculator.subtract(2, 0)).toBe(2);
    });

    it('should subtract two numbers 2', () => {
      expect(Calculator.subtract(2, 1)).toBe(1);
    });

    it('should subtract two numbers 3', () => {
      expect(Calculator.subtract(2, 3)).toBe(-1);
    });

    it('should subtract two numbers 4', () => {
      expect(Calculator.subtract(22, 1)).toBe(21);
    });

    it('should subtract two numbers 5', () => {
      expect(Calculator.subtract(-1, -2)).toBe(1);
    });
  });

  describe('divide', () => {
    it('should divide two numbers 1', () => {
      expect(Calculator.divide(2, 1)).toBe(2);
    });

    it('should divide two numbers 2', () => {
      expect(Calculator.divide(4, 2)).toBe(2);
    });

    it('should divide two numbers 3', () => {
      expect(Calculator.divide(1, 1)).toBe(1);
    });

    it('should divide two numbers 4', () => {
      expect(Calculator.divide(22, 1)).toBe(22);
    });

    it('should divide two numbers 5', () => {
      expect(Calculator.divide(-1, -1)).toBe(1);
    });
  });

  describe('clear', () => {
    it('should clear the calculator', () => {
      expect(Calculator.clear()).toBe(0);
    });
  });

  describe('sine', () => {
    it('should return sine of a number 1', () => {
      expect(Calculator.sine(1)).toBe(0.8414709848078965);
    });

    it('should return sine of a number 2', () => {
      expect(Calculator.sine(2)).toBe(0.9092974268256817);
    });

    it('should return sine of a number 3', () => {
      expect(Calculator.sine(-1)).toBe(-0.8414709848078965);
    });

    it('should return sine of a number 4', () => {
      expect(Calculator.sine(0)).toBe(0);
    });

    it('should return sine of a number 5', () => {
      expect(Calculator.sine(1.1)).toBe(0.8912073600614354);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers 1', () => {
      expect(Calculator.multiply(2, 1)).toBe(2);
    });

    it('should multiply two numbers 2', () => {
      expect(Calculator.multiply(4, 2)).toBe(8);
    });

    it('should multiply two numbers 3', () => {
      expect(Calculator.multiply(1, 1)).toBe(1);
    });

    it('should multiply two numbers 4', () => {
      expect(Calculator.multiply(22, 1)).toBe(22);
    });

    it('should multiply two numbers 5', () => {
      expect(Calculator.multiply(-1, -1)).toBe(1);
    });
  });

  describe('remainder', () => {
    it('should remainder two numbers 1', () => {
      expect(Calculator.remainder(2, 1)).toBe(0);
    });

    it('should remainder two numbers 2', () => {
      expect(Calculator.remainder(4, 2)).toBe(0);
    });

    it('should remainder two numbers 3', () => {
      expect(Calculator.remainder(1, 1)).toBe(0);
    });

    it('should remainder two numbers 4', () => {
      expect(Calculator.remainder(22, 7)).toBe(1);
    });

    it('should remainder two numbers 5', () => {
      expect(Calculator.remainder(-1, -1)).toBe(-0);
    });
  });

  describe('square', () => {
    it('should square a number 1', () => {
      expect(Calculator.square(2)).toBe(4);
    });

    it('should square a number 2', () => {
      expect(Calculator.square(1)).toBe(1);
    });

    it('should square a number 3', () => {
      expect(Calculator.square(-1)).toBe(1);
    });

    it('should square a number 4', () => {
      expect(Calculator.square(3)).toBe(9);
    });

    it('should square a number 5', () => {
      expect(Calculator.square(1.5)).toBe(2.25);
    });
  });

  describe('squareRoot', () => {
    it('should take the square root a number 1', () => {
      expect(Calculator.squareRoot(1)).toBe(1);
    });

    it('should take the square root a number 2', () => {
      expect(Calculator.squareRoot(4)).toBe(2);
    });

    it('should take the square root a number 3', () => {
      expect(Calculator.squareRoot(0)).toBe(0);
    });

    it('should take the square root a number 4', () => {
      expect(Calculator.squareRoot(9)).toBe(3);
    });

    it('should take the square root a number 5', () => {
      expect(Calculator.squareRoot(2)).toBe(1.4142135623730951);
    });
  });

  describe('percentage', () => {
    it('should take the percentage of two numbers 1', () => {
      expect(Calculator.percentage(1, 1)).toBe(100);
    });

    it('should take the percentage of two numbers 2', () => {
      expect(Calculator.percentage(1, 3)).toBe(33.33333333333333);
    });

    it('should take the percentage of two numbers 3', () => {
      expect(Calculator.percentage(3, 1)).toBe(300);
    });

    it('should take the percentage of two numbers 4', () => {
      expect(Calculator.percentage(2, 4)).toBe(50);
    });

    it('should take the percentage of two numbers 5', () => {
      expect(Calculator.percentage(1, 2)).toBe(50);
    });
  });
});
