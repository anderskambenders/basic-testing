// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 100, b: 200, action: Action.Add, expected: 300 },
  { a: 12, b: 12, action: Action.Subtract, expected: 0 },
  { a: 10, b: 4, action: Action.Multiply, expected: 40 },
  { a: 24, b: 4, action: Action.Divide, expected: 6 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 1, b: 1, action: 'destroy', expected: null },
  { a: 'monkey', b: 'donut', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should perform ${action} on ${a} and ${b}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
