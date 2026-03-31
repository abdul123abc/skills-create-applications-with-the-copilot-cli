#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Exponentiation (**)
 * - Square Root (sqrt)
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Performs addition operation
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Performs subtraction operation
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} Difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Performs multiplication operation
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Performs division operation
 * @param {number} a - First operand (dividend)
 * @param {number} b - Second operand (divisor)
 * @returns {number} Quotient of a and b
 * @throws {Error} If divisor is zero
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

/**
 * Performs modulo operation
 * @param {number} a - First operand (dividend)
 * @param {number} b - Second operand (divisor)
 * @returns {number} Remainder of a divided by b
 * @throws {Error} If divisor is zero
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a % b;
}

/**
 * Performs exponentiation operation
 * @param {number} base - The base number
 * @param {number} exponent - The exponent/power
 * @returns {number} Base raised to the exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Calculates the square root of a number
 * @param {number} n - The number to find the square root of
 * @returns {number} The square root of n
 * @throws {Error} If the number is negative
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate square root of a negative number');
  }
  return Math.sqrt(n);
}

/**
 * Evaluates a calculation expression
 * @param {string} expression - The expression to evaluate (e.g., "5 + 3" or "sqrt 16")
 * @returns {number} The result of the calculation
 */
function calculate(expression) {
  const parts = expression.trim().split(/\s+/);
  
  // Handle unary operations like sqrt
  if (parts.length === 2) {
    const operator = parts[0].toLowerCase();
    const operand = parseFloat(parts[1]);

    if (isNaN(operand)) {
      throw new Error('Invalid number provided');
    }

    if (operator === 'sqrt') {
      return squareRoot(operand);
    }
    throw new Error(`Unknown unary operator: ${operator}`);
  }
  
  // Handle binary operations
  if (parts.length !== 3) {
    throw new Error('Invalid expression format. Use: "number operator number" or "sqrt number"');
  }

  const a = parseFloat(parts[0]);
  const operator = parts[1];
  const b = parseFloat(parts[2]);

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Invalid numbers provided');
  }

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    case '%':
      return modulo(a, b);
    case '**':
      return power(a, b);
    default:
      throw new Error(`Unknown operator: ${operator}. Supported: +, -, *, /, %, **`);
  }
}

/**
 * Displays the calculator menu and instructions
 */
function displayMenu() {
  console.log('\n=== Node.js CLI Calculator ===');
  console.log('Supported Operations:');
  console.log('  + : Addition');
  console.log('  - : Subtraction');
  console.log('  * : Multiplication');
  console.log('  / : Division');
  console.log('  % : Modulo (remainder)');
  console.log('  ** : Exponentiation (power)');
  console.log('  sqrt : Square root (e.g., "sqrt 16")');
  console.log('\nEnter a calculation (e.g., "5 + 3", "2 ** 3", or "sqrt 16")');
  console.log('Type "exit" to quit\n');
}

/**
 * Main calculator loop
 */
function start() {
  displayMenu();

  const askForInput = () => {
    rl.question('Calculate: ', (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
        return;
      }

      try {
        const result = calculate(input);
        console.log(`Result: ${result}\n`);
      } catch (error) {
        console.error(`Error: ${error.message}\n`);
      }

      askForInput();
    });
  };

  askForInput();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate
};

if (require.main === module) {
  start();
}
