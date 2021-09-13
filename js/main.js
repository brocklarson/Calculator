const allButtons = document.querySelectorAll('.buttons');
const numberButtons = document.querySelectorAll('.number-buttons');
const operatorButtons = document.querySelectorAll('.operator-buttons');
const displayText = document.getElementById('displayText');
let value = null;
let newValue = null;
let operator = null;
let newNumber = true;
let changingOperator = false;

for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', handleButtonClick);
}
document.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
    if (isFinite(event.key) || event.key === ".") handleNumberButtons(event.key);
    else if (event.key === "=" || event.key === "Enter") handleEqualsButton();
    else if (event.key === "+") handleOperatorButtons("plusButton");
    else if (event.key === "-") handleOperatorButtons("minusButton");
    else if (event.key === "/" || event.code === "Slash") handleOperatorButtons("divideButton");
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
    setButtonFocus(pressedButton);
    changingOperator = false;

    if (newNumber) clearDisplayScreen();
    if (pressedButton === '.') handleDecimal(pressedButton);
    else displayText.innerText += pressedButton;
}

function handleDecimal(pressedButton) {
    if (displayText.innerText.includes('.')) return;
    if (displayText.innerText === '') displayText.innerText += '0';
    displayText.innerText += pressedButton;
}

function handleOperatorButtons(pressedButton) {
    if (isDisplayEmpty()) return;
    setButtonFocus(pressedButton);
    if (!changingOperator) setValues();
    operator = pressedButton;
    displayAnswer();
    resetVariables('afterOperatorButton');
}

function handlePlusMinusButton() {
    if (isDisplayEmpty()) return;
    displayText.innerText = -displayText.innerText;
    setButtonFocus('plusMinusButton')
}

function handleEqualsButton() {
    if (changingOperator || value === null) return;
    setButtonFocus('equalsButton');
    setValues();
    displayAnswer();
    resetVariables('afterEqualsButton');
}

function handleClearButton() {
    displayText.innerText = '';
    newValue = null;
    newNumber = true;
    setButtonFocus('clearButton');
}

function handleAllClearButton() {
    displayText.innerText = '';
    value = null;
    newValue = null;
    operator = null;
    newNumber = true;
    changingOperator = false;
    setButtonFocus('allClearButton');
}

function setValues() {
    newValue = Number(displayText.innerText);
    if (value === null) value = newValue;
    else value = doMath();
}

function setButtonFocus(button) {
    if (isFinite(button)) button = getButtonID(button);
    else if (button === ".") button = 'decimalButton';
    document.getElementById(button).focus();
}

function getButtonID(button) {
    for (let i = 0; i < numberButtons.length; i++) {
        if (numberButtons[i].innerText === button) return numberButtons[i].id;
    }
}

function isDisplayEmpty() {
    if (displayText.innerText === '') return true;
    return false;
}

function clearDisplayScreen() {
    displayText.innerText = '';
    newNumber = false;
}

function resetVariables(state) {
    if (state === 'afterEqualsButton') {
        newValue = value;
        value = null;
        newNumber = false;
        operator = null;
    } else if (state === 'afterOperatorButton') {
        changingOperator = true;
        newValue = null;
        newNumber = true;
    }
}

function doMath() {
    if (operator === 'plusButton') return addition(value, newValue);
    else if (operator === 'minusButton') return subtraction(value, newValue);
    else if (operator === 'multiplyButton') return multiplication(value, newValue);
    else if (operator === 'divideButton') return division(value, newValue);
}

function addition(a, b) {
    //converts to int before doing math to avoid decimal problems (e.g. -0.3+0.1)
    return (a * 1000000 + b * 1000000) / 1000000;
}

function subtraction(a, b) {
    //converts to int before doing math to avoid decimal problems (e.g. 0.3-0.1)
    return (a * 1000000 - b * 1000000) / 1000000;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

function displayAnswer() {
    let answer = formatAnswer();
    if (isError(answer)) answer = "Error";
    displayText.innerText = answer;
}

function formatAnswer() {
    const currentLength = value.toString().length;
    let displayLength = 10;
    if (currentLength < displayLength) displayLength = currentLength;
    return Number(value.toString().substring(0, displayLength));
}

function isError(answer) {
    if (Number.isNaN(answer)) return true;
    return false;
}