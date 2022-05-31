import * as Calculator from '../../src/data/calculator';

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
});
