import { add, subtract, multiply, divide } from './operators.js';

let displayValue = '0';
let previousOperator = null;
let previousOperand = null;

const display = document.querySelector('.display');

function updateDisplay() {
    display.textContent = displayValue;
}

function appendNumber(number) {
    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (previousOperator !== null) {
        calculate();
    }
    previousOperator = operator;
    previousOperand = parseFloat(displayValue);
    displayValue = '0';
}

function calculate() {
    const currentOperand = parseFloat(displayValue);
    if (previousOperator === '+') {
        displayValue = add(previousOperand, currentOperand).toString();
    } else if (previousOperator === '-') {
        displayValue = subtract(previousOperand, currentOperand).toString();
    } else if (previousOperator === '*') {
        displayValue = multiply(previousOperand, currentOperand).toString();
    } else if (previousOperator === '/') {
        displayValue = divide(previousOperand, currentOperand).toString();
    }
    previousOperator = null;
    previousOperand = null;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    previousOperator = null;
    previousOperand = null;
    updateDisplay();

    // Remove focus from any button
    document.activeElement.blur();
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
        displayValue = '0';
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    console.log(`Key pressed: ${key}`);
    if (!isNaN(key) || key === '.') {
        if (key === '.') {
            appendDecimal();
        } else {
            appendNumber(key);
        }
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Delete') {
        clearDisplay();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            console.log(`Button clicked: ${buttonText}`);

            // Remove focus from the clicked button
            button.blur(); 

            if (!isNaN(buttonText) || buttonText === '.') {
                if (buttonText === '.') {
                    appendDecimal();
                } else {
                    appendNumber(buttonText);
                }
            } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
                appendOperator(buttonText);
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