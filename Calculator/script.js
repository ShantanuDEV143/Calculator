let display = document.getElementById('display');
let history = document.getElementById('history');
let expression = '';

function appendOperator(op) {
  expression += op;
  display.textContent = expression;
}

function appendFunction(func) {
  const map = {
    'log': 'Math.log10(',
    'sqrt': 'Math.sqrt(',
    'sin': 'Math.sin(',
    'cos': 'Math.cos(',
    'tan': 'Math.tan('
  };
  expression += map[func] || '';
  display.textContent = expression;
}

function appendConstant(constant) {
  expression += constant;
  display.textContent = expression;
}

function clearDisplay() {
  expression = '';
  display.textContent = '0';
}

function backspace() {
  expression = expression.slice(0, -1);
  display.textContent = expression || '0';
}

function calculate() {
  try {
    const result = eval(expression);
    history.innerHTML += `<div>${expression} = ${result}</div>`;
    display.textContent = result;
    expression = result.toString();
  } catch {
    display.textContent = 'Error';
    expression = '';
  }
}

function convert() {
  const input = parseFloat(document.getElementById('convertInput').value);
  const from = document.getElementById('convertFrom').value;
  const to = document.getElementById('convertTo').value;
  let result = 'Invalid conversion';

  if (from === 'celsius' && to === 'fahrenheit') result = (input * 9/5 + 32).toFixed(2) + ' °F';
  else if (from === 'fahrenheit' && to === 'celsius') result = ((input - 32) * 5/9).toFixed(2) + ' °C';
  else if (from === 'meters' && to === 'feet') result = (input * 3.28084).toFixed(2) + ' ft';
  else if (from === 'feet' && to === 'meters') result = (input / 3.28084).toFixed(2) + ' m';
  else if (from === 'kilograms' && to === 'pounds') result = (input * 2.20462).toFixed(2) + ' lb';
  else if (from === 'pounds' && to === 'kilograms') result = (input / 2.20462).toFixed(2) + ' kg';

  document.getElementById('convertResult').textContent = result;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    appendOperator(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "c" || key === "C") {
    clearDisplay();
  } else if (key === "(" || key === ")") {
    appendOperator(key);
  } else if (key.toLowerCase() === "e") {
    appendConstant("Math.E");
  } else if (key.toLowerCase() === "p") {
    appendConstant("Math.PI");
  }
});
