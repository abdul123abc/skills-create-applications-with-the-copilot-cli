const { add, subtract, multiply, divide, calculate } = require('../calculator');

/**
 * Addition Tests
 * Tests the add function with various inputs
 */
describe('Addition', () => {
  test('2 + 3 should equal 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('0 + 0 should equal 0', () => {
    expect(add(0, 0)).toBe(0);
  });

  test('negative numbers: -5 + 3 should equal -2', () => {
    expect(add(-5, 3)).toBe(-2);
  });

  test('negative + negative: -5 + -3 should equal -8', () => {
    expect(add(-5, -3)).toBe(-8);
  });

  test('large numbers: 1000000 + 2000000 should equal 3000000', () => {
    expect(add(1000000, 2000000)).toBe(3000000);
  });

  test('decimal numbers: 2.5 + 3.5 should equal 6', () => {
    expect(add(2.5, 3.5)).toBe(6);
  });
});

/**
 * Subtraction Tests
 * Tests the subtract function with various inputs
 */
describe('Subtraction', () => {
  test('10 - 4 should equal 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('5 - 5 should equal 0', () => {
    expect(subtract(5, 5)).toBe(0);
  });

  test('negative result: 4 - 10 should equal -6', () => {
    expect(subtract(4, 10)).toBe(-6);
  });

  test('negative numbers: -5 - 3 should equal -8', () => {
    expect(subtract(-5, 3)).toBe(-8);
  });

  test('negative - negative: -5 - (-3) should equal -2', () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test('decimal numbers: 10.5 - 4.5 should equal 6', () => {
    expect(subtract(10.5, 4.5)).toBe(6);
  });
});

/**
 * Multiplication Tests
 * Tests the multiply function with various inputs
 */
describe('Multiplication', () => {
  test('45 * 2 should equal 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('5 * 0 should equal 0', () => {
    expect(multiply(5, 0)).toBe(0);
  });

  test('1 * 1 should equal 1', () => {
    expect(multiply(1, 1)).toBe(1);
  });

  test('negative numbers: -5 * 3 should equal -15', () => {
    expect(multiply(-5, 3)).toBe(-15);
  });

  test('negative * negative: -5 * -3 should equal 15', () => {
    expect(multiply(-5, -3)).toBe(15);
  });

  test('decimal numbers: 2.5 * 4 should equal 10', () => {
    expect(multiply(2.5, 4)).toBe(10);
  });

  test('large numbers: 1000 * 2000 should equal 2000000', () => {
    expect(multiply(1000, 2000)).toBe(2000000);
  });
});

/**
 * Division Tests
 * Tests the divide function with various inputs
 */
describe('Division', () => {
  test('20 / 5 should equal 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('1 / 1 should equal 1', () => {
    expect(divide(1, 1)).toBe(1);
  });

  test('0 / 5 should equal 0', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('negative numbers: -10 / 2 should equal -5', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test('negative / negative: -10 / -2 should equal 5', () => {
    expect(divide(-10, -2)).toBe(5);
  });

  test('decimal division: 10 / 4 should equal 2.5', () => {
    expect(divide(10, 4)).toBe(2.5);
  });

  test('division by zero should throw an error', () => {
    expect(() => {
      divide(10, 0);
    }).toThrow('Division by zero is not allowed');
  });

  test('negative division by zero should throw an error', () => {
    expect(() => {
      divide(-10, 0);
    }).toThrow('Division by zero is not allowed');
  });

  test('zero division by zero should throw an error', () => {
    expect(() => {
      divide(0, 0);
    }).toThrow('Division by zero is not allowed');
  });
});

/**
 * Calculate Function Tests
 * Tests the expression parser and calculator
 */
describe('Calculate Function (Expression Parser)', () => {
  test('valid addition expression: "2 + 3"', () => {
    expect(calculate('2 + 3')).toBe(5);
  });

  test('valid subtraction expression: "10 - 4"', () => {
    expect(calculate('10 - 4')).toBe(6);
  });

  test('valid multiplication expression: "45 * 2"', () => {
    expect(calculate('45 * 2')).toBe(90);
  });

  test('valid division expression: "20 / 5"', () => {
    expect(calculate('20 / 5')).toBe(4);
  });

  test('expression with extra whitespace: "  5   +   3  "', () => {
    expect(calculate('  5   +   3  ')).toBe(8);
  });

  test('negative numbers in expression: "-5 + 3"', () => {
    expect(calculate('-5 + 3')).toBe(-2);
  });

  test('division by zero in expression should throw', () => {
    expect(() => {
      calculate('10 / 0');
    }).toThrow('Division by zero is not allowed');
  });

  test('invalid operator should throw error', () => {
    expect(() => {
      calculate('5 % 3');
    }).toThrow('Unknown operator: %');
  });

  test('invalid expression format (missing operator) should throw error', () => {
    expect(() => {
      calculate('5 3');
    }).toThrow('Invalid expression format');
  });

  test('invalid expression format (too many operands) should throw error', () => {
    expect(() => {
      calculate('5 + 3 + 2');
    }).toThrow('Invalid expression format');
  });

  test('non-numeric operands should throw error', () => {
    expect(() => {
      calculate('abc + 3');
    }).toThrow('Invalid numbers provided');
  });

  test('decimal numbers in expression: "2.5 + 3.5"', () => {
    expect(calculate('2.5 + 3.5')).toBe(6);
  });

  test('complex decimal calculation: "10.5 * 2"', () => {
    expect(calculate('10.5 * 2')).toBe(21);
  });
});

/**
 * Edge Cases and Integration Tests
 */
describe('Edge Cases', () => {
  test('very large numbers should work correctly', () => {
    expect(calculate('999999999 + 1')).toBe(1000000000);
  });

  test('very small decimal numbers should work correctly', () => {
    expect(calculate('0.1 + 0.2')).toBeCloseTo(0.3);
  });

  test('negative results should work correctly', () => {
    expect(calculate('5 - 10')).toBe(-5);
  });

  test('multiplication resulting in zero', () => {
    expect(calculate('0 * 1000000')).toBe(0);
  });

  test('division of negative by negative', () => {
    expect(calculate('-20 / -5')).toBe(4);
  });
});
