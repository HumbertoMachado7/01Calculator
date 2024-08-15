import { add, subtract, multiply, divide } from './operators.js';

const display = document.querySelector('.display');
let displayValue = '0';
let previousOperator = null;
let previousOperand = null;

// Function to update the display
function updateDisplay() {
  display.textContent = displayValue;
}

// Function to handle number input
function handleNumberInput(number) {
  if (previousOperator === null && previousOperand !== null) {
    // Start a new calculation if a previous result is present
    displayValue = number;
    previousOperand = null;
  } else {
    // Otherwise, append the number to the current display value
    displayValue = displayValue === '0' ? number : displayValue + number;
  }
  updateDisplay();
}

// Function to handle operator input
function handleOperatorInput(operator) {
  const operand = parseFloat(displayValue);
  if (isNaN(operand)) {
    displayValue = 'Error';
    updateDisplay();
    return;
  }
  if (previousOperator) {
    calculate();
  }
  previousOperator = operator;
  previousOperand = operand;
  displayValue = '0';
}

// Function to calculate the result
function calculate() {
  const currentOperand = parseFloat(displayValue);
  if (isNaN(previousOperand) || isNaN(currentOperand)) {
    displayValue = 'Error';
    updateDisplay();
    return;
  }
  switch (previousOperator) {
    case '+':
      displayValue = add(previousOperand, currentOperand).toString();
      break;
    case '-':
      displayValue = subtract(previousOperand, currentOperand).toString();
      break;
    case '*':
      displayValue = multiply(previousOperand, currentOperand).toString();
      break;
    case '/':
      displayValue = divide(previousOperand, currentOperand).toString();
      break;
  }
  previousOperator = null;
  previousOperand = parseFloat(displayValue);
  updateDisplay();
}

// Function to clear the display
function clearDisplay() {
  displayValue = '0';
  previousOperator = null;
  previousOperand = null;
  updateDisplay();
}

// Function to handle backspace
function handleBackspace() {
  displayValue = displayValue.slice(0, -1) || '0';
  updateDisplay();
}

// Function to append a decimal point
function appendDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

// Event listener for button clicks
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent.trim();
      button.blur();

      if (!isNaN(buttonText)) {
        handleNumberInput(buttonText);
      } else if (buttonText === '.') {
        appendDecimal();
      } else if (['+', '-', '*', '/'].includes(buttonText)) {
        handleOperatorInput(buttonText);
      } else if (buttonText === '=') {
        calculate();
      } else if (buttonText === 'C') {
        clearDisplay();
      } else if (buttonText === '←') {
        handleBackspace();
      }
    });
  });
  updateDisplay();
});

// Event listener for keyboard input
document.addEventListener('keydown', event => {
  const key = event.key;

  if (!isNaN(key)) {
    handleNumberInput(key);
  } else if (key === '.') {
    appendDecimal();
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleOperatorInput(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    handleBackspace();
  } else if (key === 'Delete') {
    clearDisplay();
  }
});