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
const priorNumberDisplay = document.getElementById('prior-number');
const allBtn = document.querySelectorAll('.btn')

let array = [];
const digits = () => array.join('');

let primary = 0;
let current = 0;

let elementObj = {};
let getId = '';

function run() {
    clickSound();
    if (elementObj.className === 'btn numberKey') {displayNum()}
    if (elementObj.className === 'btn operatorKey') {launchOperator()}
    if (elementObj.className === 'btn equals') {total()}
    if (elementObj.className === 'btn decimal') {decimal()}
    if (elementObj.className === 'btn clear') {wipeData()}
    if (elementObj.className === 'btn delete') {removeLastValue()}
}

function displayNum() {
    array.push(getId);
    if (array[0] === '0' && array[1] === '0') {
        array = ['0'];
    }

    output.textContent = digits();
}

function launchOperator() {
    const str = priorNumberDisplay.textContent;

    if (str.includes('=')) {

        operator = getId;
        priorNumberDisplay.textContent = output.textContent + '  ' + sign();
        primary = output.textContent * 1;
        array = [];
    }

    else if(str.includes('+') || str.includes('-') || str.includes('x') || str.includes('/')) {

        if (current === 0 && priorNumberDisplay.textContent.includes('/')) {
            wipeData();
            return output.textContent = 'You can\'t divide by 0';
        }
        
        current = digits() * 1;
        output.textContent = operate(primary, current);
        primary = operate(primary, current);

        operator = getId;
        priorNumberDisplay.textContent = primary + '  ' + '  ' + sign();

        array = [];
    }
    
    else {
        operator = getId;
        primary = digits() * 1;
        priorNumberDisplay.textContent = primary + '  ' + sign();
        array = [];
    }
}

function total() {
    current = digits() * 1;

    if (priorNumberDisplay.textContent === '') return;
    else if (current === 0 && priorNumberDisplay.textContent.includes('/')) {
        wipeData();
        return output.textContent = 'You can\'t divide by 0';
    }
    else if (primary === 0 && current === 0) return;
    else if (priorNumberDisplay.textContent.includes('=')) return;

    priorNumberDisplay.textContent = primary + '  ' + sign() + '  ' + current + '  ' + '=';
    
    output.textContent = operate(primary, current);

    primary = operate(primary, current);

    array = [];
};

function decimal() {
    if (array.includes('.')) return;
    array.push('.')
    output.textContent = digits();
}

function wipeData() {
    array = [];
    primary = 0;
    current = 0;

    output.textContent = null;
    priorNumberDisplay.textContent = null;
}

function removeLastValue() {
    if (priorNumberDisplay.textContent.includes('=')) return;

    array = Array.from(output.textContent);
    array.pop();
    output.textContent = array.join('');
}

function clickSound() {
    const calcAudio = document.querySelector('audio');
    calcAudio.currentTime = 0;
    calcAudio.play();
}


window.addEventListener('keydown', placeKey = (e) => {
    elementObj = document.querySelector(`button[data-key="${e.keyCode}"]`);
    getId = elementObj.id;

    run();
});

allBtn.forEach(btn => btn.addEventListener('click', mouseClicked = (e) => {
    elementObj = e.target;
    getId = elementObj.id;

    run();
}));



