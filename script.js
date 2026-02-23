const display = document.getElementById('display');

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
        display.value = eval(display.value);
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
