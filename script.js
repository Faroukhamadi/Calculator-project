function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operation(a, b, operator) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}


function populateDisplay() {

    const number = document.querySelectorAll('.number');
    for (let i = 0; i < number.length; i++) {
        let display = document.querySelector('p');
        number[i].addEventListener('click', e => {
            if (display.textContent === '0') {
                document.querySelector('p').textContent = '';
            }
            display.textContent += number[i].textContent;
            display.textContent = removeConsecutiveDuplicates(display.textContent);

            let expression = display.textContent;
            let operatorCount = 0;
            for (const character of expression) {
                if (character === '+' || character === '-' || character === '*' || character === '/')
                    operatorCount++;
            }
            let firstNumber = '';
            let secondNumber = '';
            let indexOfOperator = getIndexOfOperator(expression);
            if (operatorCount >= 2) {

                firstNumber = expression.substring(0, indexOfOperator);
                secondNumber = expression.substring(indexOfOperator + 1, expression.length - 1);
            }

            if (isNumber(firstNumber) && isNumber(secondNumber)) {
                display.textContent = operation(parseInt(firstNumber), parseInt(secondNumber), expression[indexOfOperator]);

            }
        });
    }
}

function getIndexOfOperator(str) {
    for (let i = 0; i < str.length; i++)
        if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/')
            return i;
}


function isNumber(str) {
    const reg = /^\d+$/;
    return reg.test(str);
}


function removeConsecutiveDuplicates(input) {
    if (input.length <= 1)
        return input;
    if (!isNumber(input[0]) && !isNumber(input[1]))
        return removeConsecutiveDuplicates(input.substring(1));
    else
        return input[0] +
            removeConsecutiveDuplicates(input.substring(1));
}


document.getElementById('clear').addEventListener('click', e => {
    let display = document.querySelector('p');
    display.textContent = '';
});


document.getElementById('equal').addEventListener('click', e => {
    const display = document.querySelector('p');
    let indexOfOperator = getIndexOfOperator(display.textContent);
    let firstNumber = '';
    let secondNumber = '';
    let expression = display.textContent;

    console.log('expression : ', expression);
    firstNumber = expression.substring(0, indexOfOperator);
    secondNumber = expression.substring(indexOfOperator + 1, expression.length);
    console.log('First number ' + firstNumber);
    console.log('Second number ' + secondNumber);
    if (isNumber(firstNumber) && isNumber(secondNumber)) {
        display.textContent = operation(parseInt(firstNumber), parseInt(secondNumber), expression[indexOfOperator]);

    }
    console.log(indexOfOperator);
});


populateDisplay()
