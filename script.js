const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

let operator = '';

function sign() {
    switch (operator) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return 'x';
        case 'divide': return '/';
    }
}

function operate(x, y) {
    switch (operator) {
        case 'add':
            return add(x, y);
        case 'subtract':
            return subtract(x, y);
        case 'multiply':
            return multiply(x, y);
        case 'divide':
            return divide(x, y);
    }
}

const output = document.getElementById('output');
const numberKey = document.querySelectorAll('.numberKey');
numberKey.forEach(btn => btn.addEventListener('click', displayNum));

let array = [];
const digits = () => array.join('');

function displayNum(e) {
    if(event.type === 'click') {
        array.push(`${e.target.id}`)
    }
    if(event.type === 'keydown') {
        const keyboardNumber = document.querySelector(`button[data-key="${e.keyCode}"]`);
        array.push(keyboardNumber.id);
    }

    output.textContent = digits();
}

let primary = 0;
let current = 0;

const operatorKey = document.querySelectorAll('.operatorKey');
operatorKey.forEach(btn => btn.addEventListener('click', launchOperator));

const priorNumberDisplay = document.getElementById('prior-number');

function launchOperator(e) {
    const str = priorNumberDisplay.textContent;

    if(str.includes('+') || str.includes('-') || str.includes('x') || str.includes('/') || str.includes('=')) {
        current = digits() * 1;
        output.textContent = operate(primary, current);
        primary = operate(primary, current);

        operator = `${e.target.id}`;
        priorNumberDisplay.textContent = primary + '  ' + '  ' + sign();

        array = [];
    }
    else {
        operator = `${e.target.id}`;
        primary = digits() * 1;
        priorNumberDisplay.textContent = primary + '  ' + sign();
        array = [];
    }
}

const equals = document.getElementById('equals');
equals.addEventListener('click', () => {

    current = digits() * 1;

    if(primary === 0 && current === 0) return;

    priorNumberDisplay.textContent = primary + '  ' + sign() + '  ' + current + '  ' + '=';
    
    output.textContent = operate(primary, current);

    primary = operate(primary, current);
    array = [];
});

const decimal = document.getElementById('.');
decimal.addEventListener('click', () => {
    if (array.includes('.')) return;
    array.push('.')
    output.textContent = digits();
})

const clear = document.getElementById('clear');
clear.addEventListener('click', wipeData);

function wipeData() {
    array = [];
    primary = 0;
    current = 0;

    output.textContent = null;
    priorNumberDisplay.textContent = null;
}

const backSpace = document.getElementById('delete');
backSpace.addEventListener('click', removeLastValue);

function removeLastValue() {
    if (priorNumberDisplay.textContent.includes('=')) return;

    array = Array.from(output.textContent);
    array.pop();
    output.textContent = array.join('');
}

const btn = document.querySelectorAll('.btn');
btn.forEach(btn => btn.addEventListener('click', clickSound));

function clickSound() {
    const calcAudio = document.querySelector('audio');
    calcAudio.currentTime = 0;
    calcAudio.play();
}

window.addEventListener('keydown', function(e) {
    clickSound();
    displayNum(e);
    // const keyboardNumber = document.querySelector(`button[data-key="${e.keyCode}"]`);
})


