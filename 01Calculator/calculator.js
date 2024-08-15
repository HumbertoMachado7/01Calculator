import { add, subtract, multiply, divide } from './operators.js';

const display = document.querySelector('.display');
let displayValue = '0';
let previousOperator = null;
let previousOperand = null;

const updateDisplay = () => display.textContent = displayValue;

const handleOperation = operator => {
  const operand = parseFloat(displayValue);
  (isNaN(operand)) ? (displayValue = "Error it's not a number", updateDisplay()) : (previousOperator ? calculate() : null);
  previousOperator = operator;
  previousOperand = operand;
  displayValue = '0';
};

const calculate = () => {
  const currentOperand = parseFloat(displayValue);
  (isNaN(previousOperand) || isNaN(currentOperand)) ? (displayValue = "Error it's not a number", updateDisplay()) : null;
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

const backspace = () => { displayValue = displayValue.slice(0, -1) || '0'; updateDisplay(); };

const appendDecimal = () => { !displayValue.includes('.') && (displayValue += '.', updateDisplay()); };

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent.trim();
      button.blur(); 
      (!isNaN(buttonText) || buttonText === '.') ? appendNumber(buttonText) :
      (['+', '-', '*', '/'].includes(buttonText)) ? handleOperation(buttonText) :
      (buttonText === '=') ? calculate() :
      (buttonText === 'C') ? clearDisplay() :
      (buttonText === '←') ? backspace() : null;
    });
  });
  updateDisplay();
});

const appendNumber = number => {
  (isNaN(number) && number !== '.') || (displayValue = displayValue === '0' ? number : displayValue + number, updateDisplay());
};

document.addEventListener('keydown', event => {
  const key = event.key;
  (!isNaN(key) || key === '.') && appendNumber(key);
  (['+', '-', '*', '/'].includes(key)) && handleOperation(key);
  (key === 'Enter') && calculate();
  (key === 'Backspace') && backspace();
  (key === 'Delete') && clearDisplay();
});