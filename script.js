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
