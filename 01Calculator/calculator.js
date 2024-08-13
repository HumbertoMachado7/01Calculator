import { add, subtract, multiply, divide } from './operators.js';

const display = document.querySelector('.display');
let currentInput = '0';
let previousInput = '';
let currentOperator = null;

function updateDisplay() {
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    currentOperator = null;
    updateDisplay();
}

function handleDigitClick(event) {
    const digit = event.target.dataset.digit;
    if (currentInput === '0') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

function handleOperatorClick(event) {
    const operator = event.target.dataset.operator;
    if (currentOperator !== null) {
        calculate();
    }
    currentOperator = operator;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    switch (currentOperator) {
        case '+':
            currentInput = add(num1, num2).toString();
            break;
        case '-':
            currentInput = subtract(num1, num2).toString();
            break;
        case '*':
            currentInput = multiply(num1, num2).toString();
            break;
        case '/':
            currentInput = divide(num1, num2).toString();
            break;
    }
    previousInput = '';
    currentOperator = null;
    updateDisplay();
}

document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', handleDigitClick);
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

document.querySelector('.clear').addEventListener('click', clearDisplay);

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/^[0-9.]$/.test(key)) {
        handleDigitClick({ target: { dataset: { digit: key } } });
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperatorClick({ target: { dataset: { operator: key } } });
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace' || key === 'Delete') {
        clearDisplay();
    }
});

updateDisplay();
