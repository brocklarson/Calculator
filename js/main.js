const allButtons = document.querySelectorAll('.buttons');
const operatorButtons = document.querySelectorAll('.operator-buttons');
const displayText = document.getElementById('displayText');
let value = null;
let tempValue = null;
let operator = null;
let newNumber = true;
//checks for cases when operator button was mispressed 
//and user just wants to change the current operator
let operatorChange = false;

for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', handleButtonClick);
}
document.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
    if (isFinite(event.key) || event.key === ".") handleNumberButtons(event.key);
    else if (event.key === "=" || event.code === "Enter") handleEqualsButton();
    else if (event.key === "+") handleOperatorButtons("plusButton");
    else if (event.key === "-") handleOperatorButtons("minusButton");
    else if (event.key === "/") handleOperatorButtons("divideButton");
    else if (event.key === "*" || event.code === "KeyX") handleOperatorButtons("multiplyButton");
    else if (event.code === "KeyA") handleAllClearButton();
    else if (event.code === "KeyC") handleClearButton();
    else if (event.code === "KeyP" || event.code === "KeyM" || event.code === "KeyN" || event.code === "KeyI") handlePlusMinusButton();
}

function handleButtonClick(event) {
    if (event.target.classList.contains('number-buttons')) handleNumberButtons(event.target.innerText);
    else if (event.target.classList.contains('operator-buttons')) handleOperatorButtons(event.target.id);
    else if (event.target.id === 'plusMinusButton') handlePlusMinusButton();
    else if (event.target.id === 'equalsButton') handleEqualsButton();
    else if (event.target.id === 'clearButton') handleClearButton();
    else if (event.target.id === 'allClearButton') handleAllClearButton();
}

function handleNumberButtons(pressedButton) {
    document.activeElement.blur();
    operatorChange = false;
    if (newNumber === true) {
        displayText.innerText = '';
        newNumber = false;
    }

    //Can't have more than one decimal
    if (pressedButton === '.' && displayText.innerText.includes('.')) {
        return;
    }

    //Adds zero to front of decimal numbers less than 1
    if (pressedButton === '.' && displayText.innerText === '') {
        displayText.innerText += 0;
    }

    displayText.innerText += pressedButton;

}

function handleOperatorButtons(pressedOperator) {
    //case where no number is entered
    if (displayText.innerText === '') return;

    document.getElementById(pressedOperator).focus();
    //In case user misclicked and just wants to change operator before next number
    if (operatorChange === true) {
        operator = pressedOperator;
        return;
    }

    tempValue = Number(displayText.innerText);

    //doMath() if two values have been already been entered
    if (value === null) value = tempValue;
    else value = doMath();

    operator = pressedOperator;

    //reset variables for next go around
    operatorChange = true;
    tempValue = null;
    newNumber = true;
    displayAnswer();
}

function handlePlusMinusButton() {
    let numberConvert = Number(displayText.innerText);
    numberConvert = -numberConvert;
    displayText.innerText = numberConvert;
}

function handleEqualsButton() {
    //can't press equals right after an operator
    if (operatorChange === true || value === null) return;

    document.getElementById("equalsButton").focus();
    tempValue = Number(displayText.innerText);
    value = doMath();
    displayAnswer();

    //reset variables for next go around
    tempValue = value;
    value = null;
    newNumber = false;
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

    let answer = Number(value.toString().substring(0, displayLength));
    if (Number.isNaN(answer)) {
        answer = "Error";
    }
    displayText.innerText = answer;
}