const allButtons = document.querySelectorAll('.buttons');
const displayText = document.getElementById('displayText');
let value = null;
let tempValue = null;

for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', handleButtonClick);
}

function handleButtonClick(event) {
    if (event.target.classList.contains('number-buttons')) handleNumberButtons(event);
    if (event.target.classList.contains('operator-buttons')) handleOperatorButtons(event);
    if (event.target.id === "plusMinusButton") handlePlusMinusButton();
    if (event.target.id === "equalsButton") handleEqualsButton();
    if (event.target.id === "clearButton") handleClearButton();
    if (event.target.id === "allClearButton") handleAllClearButton();
}

function handleNumberButtons(event) {
    if (event.target.innerText === "." && displayText.innerText.includes('.')) {
        console.log("can't use another decimal");
        return;
    }
    displayText.innerText += event.target.innerText;
}

function handleOperatorButtons(event) {
    console.log(event.target.id);
}

function handlePlusMinusButton() {
    let numberConvert = Number(displayText.innerText);
    numberConvert = numberConvert * -1;
    displayText.innerText = numberConvert;
}

function handleEqualsButton() {
    console.log('equalsButton');
}

function handleClearButton() {
    displayText.innerText = "";
}

function handleAllClearButton() {
    console.log('allClearButton');
}