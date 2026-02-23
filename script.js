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

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') appendToDisplay(e.key);
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendToDisplay(e.key);
    else if (e.key === 'Enter') calculate();
    else if (e.key === 'Escape') clearDisplay();
    else if (e.key === 'Backspace') deleteLast();
});
