// DOM Elements
const calculatorDisplayInput = document.getElementById("calculator-input");
const calculatorResultDisplay = document.getElementById("calculator-result");
const calculatorButtons = document.getElementById("calculator-btn-container");

// Constants
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const ACTIONS = ["delete", "clear", "equal"];
const OPERATORS = ["add", "subtract", "multiply", "divide"];
const KEYBOARD_KEYS = ["+", "-", "*", "/", "Enter", "=", "Delete", "c"];

let firstNumber = [];
let currentOperator = {};
let secondNumber = [];
let result = 0;

// Event Listeners
calculatorButtons.addEventListener("click", (e) =>
  e.target.id !== "calculator-btn-container" ? calculatorButtonHandler(e) : null
);

window.addEventListener("keypress", (e) => {
  if (DIGITS.includes(e.key)) handleDigitInput(e.key);
  if (KEYBOARD_KEYS.includes(e.key)) keyboardInputHandler(e.key);
});

function keyboardInputHandler(key) {
  if (key === "+") handleOperatorInput("add", "+");
  if (key === "-") handleOperatorInput("subtract", "−");
  if (key === "*") handleOperatorInput("multiply", "×");
  if (key === "/") handleOperatorInput("divide", "÷");
  if (key === "Delete") handleActionInput("delete");
  if (key === "c" || key === "C") handleActionInput("clear");
  if (key === "Enter" || key === "=") handleActionInput("equal");
}

function calculatorButtonHandler(e) {
  const eventText = e.target.innerText;
  const eventId = e.target.id;

  if (DIGITS.includes(eventId)) handleDigitInput(eventId);
  if (OPERATORS.includes(eventId)) handleOperatorInput(eventId, eventText);
  if (ACTIONS.includes(eventId)) handleActionInput(eventId);
}

function handleDigitInput(userInput) {
  if (firstNumber.length > 0 && currentOperator.name) {
    updateNumberInput(secondNumber, userInput);
  } else {
    updateNumberInput(firstNumber, userInput);
  }
}

function handleOperatorInput(name, symbol) {
  if (isArrayEmpty(secondNumber)) {
    updateOperator(name, symbol);
  } else if (!isArrayEmpty(firstNumber) && !isArrayEmpty(secondNumber)) {
    updateOperator(name, symbol);
    calculateUserInput();
  }
}

function handleActionInput(userInput) {
  if (userInput === "delete") removeLastInput();
  if (userInput === "clear") clearCalculator();
  if (userInput === "equal") calculateUserInput();
}

function clearCalculator() {
  firstNumber = [];
  currentOperator = {};
  secondNumber = [];
  calculatorDisplayInput.textContent = "0";
  calculatorResultDisplay.textContent = "0";
}

function removeLastInput() {
  if (isArrayEmpty(secondNumber) && !currentOperator.name) {
    firstNumber.pop();
  } else if (isArrayEmpty(secondNumber) && currentOperator.name) {
    currentOperator = {};
  } else {
    secondNumber.pop();
  }
  updateInputDisplay();
}

function updateInputDisplay() {
  const currentCalculatorDisplay = [
    ...firstNumber,
    " ",
    currentOperator.symbol,
    " ",
    ...secondNumber,
  ].join("");
  calculatorDisplayInput.innerText = currentCalculatorDisplay || 0;
}

function updateResultDisplay(result) {
  firstNumber = result;
  secondNumber = [];
  calculatorResultDisplay.innerText = `= ${result.join("")}`;
}

function updateNumberInput(arrayNumber, userInput) {
  if (!(arrayNumber.includes(".") && userInput == ".")) {
    if (arrayNumber[0] == "0" && arrayNumber[1] != ".") {
      arrayNumber.splice(0, arrayNumber.length, userInput);
    } else if (isArrayEmpty(arrayNumber) && userInput == ".") {
      arrayNumber.push("0", userInput);
    } else {
      arrayNumber.push(userInput);
    }
  }
  updateInputDisplay();
}

function updateOperator(name, symbol) {
  if (firstNumber.length > 0) {
    currentOperator = { name, symbol };
    updateInputDisplay();
  }
}

function calculateUserInput() {
  if (!isArrayEmpty(firstNumber) && !isArrayEmpty(secondNumber)) {
    const num1 = convertToNumber(firstNumber);
    const num2 = convertToNumber(secondNumber);
    switch (currentOperator.name) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        if (num2 === 0) {
          alert("Division by zero is undefined");
          return;
        }
        result = num1 / num2;
        break;
    }
    updateResultDisplay(convertToArray(formatResult(result)));
  }
}

function convertToNumber(arr) {
  return isArrayEmpty(arr) ? 0 : parseFloat(arr.join(""));
}

function convertToArray(number) {
  return number.toString().split("");
}

function formatResult(number) {
  return parseFloat(number.toFixed(4));
}

function isArrayEmpty(array) {
  return array.length === 0;
}
