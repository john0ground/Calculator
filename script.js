const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

let operator = 'divide';

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

const priorNumber = document.getElementById('prior-number');

function launchOperator(e) {
    primary = digits() * 1;
    operator = `${e.target.id}`;
    priorNumber.textContent = primary + '  ' + sign();
    array = [];
}

const equals = document.getElementById('equals');
equals.addEventListener('click', () => {
    current = digits() * 1;
    console.log(typeof(primary));
    alert(operate(primary, current));
});