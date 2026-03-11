const display = document.getElementById('display');
const history = document.getElementById('history');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value;
        const result = eval(expression);
        history.innerHTML += `<div>${expression} = ${result}</div>`;
        display.value = result;
    } catch {
        display.value = 'Error';
    }
}
let memory = 0;

function evaluateExpression(expr) {
    return Function('"use strict"; return (' + expr + ')')();
}

function addDecimal() {
    const parts = display.value.split(/[\+\-\*\/\(\)]/);
    const last = parts[parts.length - 1];
    if (!last.includes('.')) {
        if (last === '') appendToDisplay('0.');
        else appendToDisplay('.');
    }
}

function toggleSign() {
    try {
        const val = evaluateExpression(display.value || '0');
        const res = (-val).toString();
        history.innerHTML += `<div>neg(${val}) = ${res}</div>`;
        display.value = res;
    } catch {
        display.value = 'Error';
    }
}

function percent() {
    try {
        const val = evaluateExpression(display.value || '0');
        const res = val / 100;
        history.innerHTML += `<div>${val}% = ${res}</div>`;
        display.value = res;
    } catch {
        display.value = 'Error';
    }
}

function sqrt() {
    try {
        const val = evaluateExpression(display.value || '0');
        if (val < 0) throw new Error('neg');
        const res = Math.sqrt(val);
        history.innerHTML += `<div>√${val} = ${res}</div>`;
        display.value = res;
    } catch {
        display.value = 'Error';
    }
}

function power(exp) {
    try {
        const base = evaluateExpression(display.value || '0');
        const res = Math.pow(base, exp);
        history.innerHTML += `<div>${base}^${exp} = ${res}</div>`;
        display.value = res;
    } catch {
        display.value = 'Error';
    }
}

function factorial() {
    try {
        const n = evaluateExpression(display.value || '0');
        if (!Number.isInteger(n) || n < 0) throw new Error('invalid');
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        history.innerHTML += `<div>${n}! = ${res}</div>`;
        display.value = res;
    } catch {
        display.value = 'Error';
    }
}

function memClear() {
    memory = 0;
}

function memRecall() {
    display.value += memory.toString();
}

function memAdd() {
    try {
        memory += evaluateExpression(display.value || '0');
    } catch {}
}

function memSub() {
    try {
        memory -= evaluateExpression(display.value || '0');
    } catch {}
}

// Click delegation for buttons that use data-value attributes
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-value]');
    if (!btn) return;
    const v = btn.getAttribute('data-value');
    if (v === 'C') clearDisplay();
    else if (v === 'DEL') deleteLast();
    else if (v === '=') calculate();
    else if (v === '.') addDecimal();
    else if (v === '±') toggleSign();
    else if (v === '%') percent();
    else if (v === '√') sqrt();
    else if (v === '!') factorial();
    else if (v === 'M+') memAdd();
    else if (v === 'M-') memSub();
    else if (v === 'MR') memRecall();
    else if (v === 'MC') memClear();
    else appendToDisplay(v);
});

// Keyboard support
// document.addEventListener('keydown', (e) => {
//     if (/^[0-9]$/.test(e.key)) appendToDisplay(e.key);
//     else if ('+-*/().'.includes(e.key)) appendToDisplay(e.key);
//     else if (e.key === 'Enter') {
//         e.preventDefault();
//         calculate();
//     } else if (e.key === 'Backspace') deleteLast();
//     else if (e.key === 'Escape') clearDisplay();
//     else if (e.key === '%') percent();
// });
