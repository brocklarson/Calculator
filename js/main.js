const allButtons = document.querySelectorAll('.buttons');
const displayText = document.getElementById('displayText');
let value = null;
let tempValue = null;
let operator = null;
let newNumber = true;
//checks for cases when operator was mispressed and user just wants to change the operator
let operatorChange = false;

for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', handleButtonClick);
}

function handleButtonClick(event) {
    if (event.target.classList.contains('number-buttons')) handleNumberButtons(event);
    else if (event.target.classList.contains('operator-buttons')) handleOperatorButtons(event);
    else if (event.target.id === 'plusMinusButton') handlePlusMinusButton();
    else if (event.target.id === 'equalsButton') handleEqualsButton();
    else if (event.target.id === 'clearButton') handleClearButton();
    else if (event.target.id === 'allClearButton') handleAllClearButton();
}

function handleNumberButtons(event) {
    operatorChange = false;
    if (newNumber === true) {
        displayText.innerText = '';
        newNumber = false;
    }

    //Can't have more than one decimal
    if (event.target.innerText === '.' && displayText.innerText.includes('.')) {
        return;
    }

    //Adds zero to front of numbers less than 1
    if (event.target.innerText === '.' && displayText.innerText === '') {
        displayText.innerText += 0;
    }

    displayText.innerText += event.target.innerText;

}

function handleOperatorButtons(event) {
    if (displayText.innerText === '') return; //case where no number is entered

    //In case user misclicked and just wants to change operator before next number
    if (operatorChange === true) {
        operator = event.target.id;
        return;
    }

    tempValue = Number(displayText.innerText);

    //doMath() if two values have been already been entered
    if (value === null) {
        value = tempValue;
    } else {
        value = doMath();
    }

    //reset variables for next go around
    operatorChange = true;
    tempValue = null;
    newNumber = true;
    operator = event.target.id;
    displayAnswer();
}

function handlePlusMinusButton() {
    let numberConvert = Number(displayText.innerText);
    numberConvert = -numberConvert;
    displayText.innerText = numberConvert;
}

function handleEqualsButton() {
    tempValue = Number(displayText.innerText);
    value = doMath();
    displayAnswer();

    //resets variables for next go around
    tempValue = value;
    value = null;
    newNumber = true;
    operator = null;
}

function handleClearButton() {
    displayText.innerText = '';
    tempValue = null;
    newNumber = true;
}

function handleAllClearButton() {
    displayText.innerText = '';
    value = null;
    tempValue = null;
    operator = null;
    newNumber = true;
    operatorChange = false;
}

function doMath() {
    if (operator === 'plusButton') {
        return doAddition(value, tempValue);
    } else if (operator === 'minusButton') {
        return doSubtraction(value, tempValue);
    } else if (operator === 'multiplyButton') {
        return doMultiplication(value, tempValue);
    } else if (operator === 'divideButton') {
        return doDivision(value, tempValue);
    }
}

function doAddition(a, b) {
    //converts to int before doing math to avoid decimal problems (e.g. -0.3+0.1)
    return (a * 1000000 + b * 1000000) / 1000000;
}

function doSubtraction(a, b) {
    //converts to int before doing math to avoid decimal problems (e.g. 0.3-0.1)
    return (a * 1000000 - b * 1000000) / 1000000;
}

function doMultiplication(a, b) {
    return a * b;
}

function doDivision(a, b) {
    return a / b;
}

function displayAnswer() {
    let displayLength = 10;
    if (value.toString().length < displayLength) {
        displayLength = value.toString().length
    }
    displayText.innerText = Number(value.toString().substring(0, displayLength));
}