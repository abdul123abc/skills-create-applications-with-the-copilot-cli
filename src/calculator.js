#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
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
 * Evaluates a calculation expression
 * @param {string} expression - The expression to evaluate (e.g., "5 + 3")
 * @returns {number} The result of the calculation
 */
function calculate(expression) {
  const parts = expression.trim().split(/\s+/);
  
  if (parts.length !== 3) {
    throw new Error('Invalid expression format. Use: "number operator number"');
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
    default:
      throw new Error(`Unknown operator: ${operator}. Supported: +, -, *, /`);
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
  console.log('\nEnter a calculation (e.g., "5 + 3")');
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
  calculate
};

if (require.main === module) {
  start();
}
