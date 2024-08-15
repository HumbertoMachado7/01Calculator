import { add, subtract, multiply, divide } from './operators.js';

const display = document.querySelector('.display');
let displayValue = '0';
let previousOperator = null;
let previousOperand = null;

const updateDisplay = () => display.textContent = displayValue;

const handleNumberInput = number => {
  previousOperator === null && previousOperand !== null 
    ? (displayValue = number, previousOperand = null) 
    : displayValue === '0' ? displayValue = number : displayValue += number;
  updateDisplay();
};

const handleOperatorInput = operator => {
  const operand = parseFloat(displayValue);
  isNaN(operand) ? (displayValue = 'Error', updateDisplay()) : previousOperator && calculate();
  previousOperator = operator;
  previousOperand = operand;
  displayValue = '0';
};

const calculate = () => {
  const currentOperand = parseFloat(displayValue);
  if (isNaN(previousOperand) || isNaN(currentOperand)) {
    displayValue = 'Error';
    updateDisplay();
    return;
  }
  switch (previousOperator) {
    case '+': displayValue = add(previousOperand, currentOperand).toString(); break;
    case '-': displayValue = subtract(previousOperand, currentOperand).toString(); break;
    case '*': displayValue = multiply(previousOperand, currentOperand).toString(); break;
    case '/': displayValue = divide(previousOperand, currentOperand).toString(); break;
  }
  previousOperator = null;
  previousOperand = parseFloat(displayValue);
  updateDisplay();
};

const clearDisplay = () => {
  displayValue = '0';
  previousOperator = null;
  previousOperand = null;
  updateDisplay();
};

const handleBackspace = () => {
  displayValue = displayValue.slice(0, -1) || '0';
  updateDisplay();
};

const appendDecimal = () => !displayValue.includes('.') && (displayValue += '.', updateDisplay());

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent.trim();
      button.blur();

      !isNaN(buttonText) ? handleNumberInput(buttonText) :
      buttonText === '.' ? appendDecimal() :
      ['+', '-', '*', '/'].includes(buttonText) ? handleOperatorInput(buttonText) :
      buttonText === '=' ? calculate() :
      buttonText === 'C' ? clearDisplay() :
      buttonText === '←' ? handleBackspace() : null;
    });
  });
  updateDisplay();
});

document.addEventListener('keydown', event => {
  const key = event.key;

  !isNaN(key) ? handleNumberInput(key) :
  key === '.' ? appendDecimal() :
  ['+', '-', '*', '/'].includes(key) ? handleOperatorInput(key) :
  key === 'Enter' ? calculate() :
  key === 'Backspace' ? handleBackspace() :
  key === 'Delete' ? clearDisplay() : null;
});