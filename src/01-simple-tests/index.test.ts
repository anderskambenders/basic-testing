// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 10, action: Action.Add });
    expect(result).toBe(20);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 10, action: Action.Subtract });
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 10, action: Action.Multiply });
    expect(result).toBe(100);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 10, action: Action.Divide });
    expect(result).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(100);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 10,
      b: 10,
      action: 'Destroy',
    });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'Monkey',
      b: 'Donut',
      action: Action.Divide,
    });
    expect(result).toBe(null);
  });
});
