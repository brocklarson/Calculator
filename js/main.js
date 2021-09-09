const allButtons = document.querySelectorAll('.buttons');
const displayText = document.getElementById('displayText');
let value = null;
let tempValue = null;
let operator = null;
let newNumber = true;

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
    if (newNumber === true) {
        displayText.innerText = '';
        newNumber = false;
    }

    if (event.target.innerText === '.' && displayText.innerText.includes('.')) {
        return;
    }
    displayText.innerText += event.target.innerText;

}

function handleOperatorButtons(event) {
    tempValue = Number(displayText.innerText);

    //do math if two values have been already been entered
    if (value === null) {
        value = tempValue;
    } else {
        value = doMath();
    }

    //reset variables for next go around
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
    return a + b;
}

function doSubtraction(a, b) {
    return a - b;
}

function doMultiplication(a, b) {
    return a * b;
}

function doDivision(a, b) {
    return a / b;
}

function displayAnswer() {
    displayText.innerText = value;
}