import { add, subtract, multiply, divide } from './operators.js';

const display = document.querySelector('.display');
let displayValue = '0';
let previousOperator = null;
let previousOperand = null;

const updateDisplay = () => { display.textContent = displayValue; };

const handleOperation = (operator) => {
  if (previousOperator) calculate();
  previousOperator = operator;
  previousOperand = parseFloat(displayValue);
  displayValue = '0';
};

const calculate = () => {
  const currentOperand = parseFloat(displayValue);
  switch (previousOperator) {
    case '+': displayValue = add(previousOperand, currentOperand).toString(); break;
    case '-': displayValue = subtract(previousOperand, currentOperand).toString(); break;
    case '*': displayValue = multiply(previousOperand, currentOperand).toString(); break;
    case '/': displayValue = divide(previousOperand, currentOperand).toString(); break;
  }
  previousOperator = null;
  previousOperand = null;
  updateDisplay();
};

const clearDisplay = () => {
  displayValue = '0';
  previousOperator = null;
  previousOperand = null;
  updateDisplay();
  document.activeElement.blur(); 
};

const backspace = () => {
  displayValue = displayValue.slice(0, -1) || '0';
  updateDisplay();
};

const appendDecimal = () => {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent.trim();
      button.blur(); // Remove focus after click

      if (!isNaN(buttonText) || buttonText === '.') { 
        appendNumber(buttonText);
      } else if (['+', '-', '*', '/'].includes(buttonText)) {
        handleOperation(buttonText);
      } else if (buttonText === '=') {
        calculate();
      } else if (buttonText === 'C') {
        clearDisplay();
      } else if (buttonText === '←') {
        backspace();
      }
    });
  });
  updateDisplay();
});

const appendNumber = (number) => {
  displayValue = displayValue === '0' ? number : displayValue + number;
  updateDisplay();
};

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (!isNaN(key) || key === '.') appendNumber(key);
  if (['+', '-', '*', '/'].includes(key)) handleOperation(key);
  if (key === 'Enter') calculate();
  if (key === 'Backspace') backspace();
  if (key === 'Delete') clearDisplay();
});