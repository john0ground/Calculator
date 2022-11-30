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
    array.push(`${e.target.id}`)
    output.textContent = digits();
}

let primary = 0;
let current = 0;

const operatorKey = document.querySelectorAll('.operatorKey');
operatorKey.forEach(btn => btn.addEventListener('click', launchOperator));

const priorNumberDisplay = document.getElementById('prior-number');

function launchOperator(e) {
    const str = priorNumberDisplay.textContent;
    if(str.includes('+') || str.includes('-') || str.includes('x') || str.includes('/')) {
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
    priorNumberDisplay.textContent = primary + '  ' + sign() + '  ' + current + '  ' + '=';
    console.log(typeof(primary));
    output.textContent = operate(primary, current);
});