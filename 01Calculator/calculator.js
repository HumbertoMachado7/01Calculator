let currentInput = '';

function appendNumber(number) {
    currentInput += number;
    document.getElementById('result').value = currentInput;
}

function appendOperator(operator) {
    currentInput += operator;
    document.getElementById('result').value = currentInput;
}

function calculate() {
    try {
        const result = eval(currentInput);
        document.getElementById('result').value = result;
        currentInput = '';
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

function clearDisplay() {
    currentInput = '';
    document.getElementById('result').value = '';
}
