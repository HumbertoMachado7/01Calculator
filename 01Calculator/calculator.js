let currentInput = '';
let operator = null;
let previousInput = null;

const appendNumber = number => (currentInput += number, updateDisplay());

const appendOperator = op => {
  if (currentInput) {
    previousInput ??= parseFloat(currentInput);
    operator = op;
    currentInput = '';
    previousInput ? calculate() : null;
  }
};

const calculate = () => {
  const current = parseFloat(currentInput);
  if (previousInput && operator && !isNaN(current)) {
    const operations = {
      '+': () => previousInput + current,
      '-': () => previousInput - current,
      '*': () => previousInput * current,
      '/': () => current ? previousInput / current : (alert("Error: División por cero"), clearDisplay()),
    };
    currentInput = operations[operator]().toString();
    operator = previousInput = null;
    updateDisplay();
  }
};

const clearDisplay = () => (currentInput = operator = previousInput = '', updateDisplay());

const updateDisplay = () => (document.getElementById('display').value = currentInput);

const handleKeyPress = event => {
  const key = event.key;
  /[0-9.]/.test(key) ? appendNumber(key) :
  ['+', '-', '*', '/'].includes(key) ? appendOperator(key) :
  key === 'Enter' || key === '=' ? calculate() :
  key === 'Backspace' || key === 'Delete' ? clearDisplay() : null;
};