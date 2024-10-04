const calculatorDisplay = document.getElementById("calculator-display");
const calculatorButtons = document.getElementById("calculator-btn-container");

let firstNumber = [];
let currentOperator = {};
let secondNumber = [];

calculatorButtons.addEventListener("click", (event) => {
  const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const DELETE_AND_CLEAR = ["delete", "clear"];
  const MATH_OPERATORS = ["add", "subtract", "multiply", "divide"];

  if (event.target.id !== "calculator-btn-container") {
    if (DIGITS.includes(event.target.innerText)) {
      insertDigits(event.target.id);
    } else if (MATH_OPERATORS.includes(event.target.id)) {
      if (secondNumber.length == 0) {
        assignOperator(event.target.id, event.target.innerText);
      } else if (!(firstNumber.length == 0 && secondNumber.length == 0)) {
        calculateUserInput(firstNumber, currentOperator, secondNumber);
        assignOperator(event.target.id, event.target.innerText);
      }
    } else if (DELETE_AND_CLEAR.includes(event.target.id)) {
      deleteAndClearDigits(event.target.id);
    } else if (event.target.id === "equal") {
      if (secondNumber.length !== 0 && currentOperator.name !== undefined) {
        calculateUserInput(firstNumber, currentOperator, secondNumber);
      }
    }
  }
});

function insertDigits(userInput) {
  if (firstNumber.length !== 0 && currentOperator.name !== undefined) {
    checkInputLimitations(secondNumber, userInput);
  } else {
    checkInputLimitations(firstNumber, userInput);
  }
}

function deleteAndClearDigits(userInput) {
  if (userInput === "delete") {
    backSpace();
  } else if (userInput === "clear") {
    clearCalculator();
  } else {
    alert("invalid input");
  }
}

function clearCalculator() {
  firstNumber = [];
  currentOperator = {};
  secondNumber = [];
  calculatorDisplay.textContent = "0";
}

function backSpace() {
  if (secondNumber.length === 0 && currentOperator.name == null) {
    firstNumber.pop();
  } else if (secondNumber.length === 0) {
    currentOperator = {};
  } else {
    secondNumber.pop();
  }
  updateCalculatorDisplay();
}

function updateCalculatorDisplay() {
  const currentCalculatorDisplay = []
    .concat(firstNumber, " ", currentOperator.symbol, " ", secondNumber)
    .join("");
  calculatorDisplay.innerText = currentCalculatorDisplay;
}

function checkInputLimitations(arrayNumber, userInput) {
  if (!(arrayNumber.includes(".") && userInput == ".")) {
    if (arrayNumber[0] == "0" && arrayNumber[1] != ".") {
      arrayNumber.splice(0, arrayNumber.length, userInput);
    } else if (arrayNumber[0] == ".") {
      arrayNumber.unshift("0");
      arrayNumber.push(userInput);
    } else {
      arrayNumber.push(userInput);
    }
  }
  updateCalculatorDisplay();
}

function assignOperator(name, symbol) {
  if (firstNumber.length != 0) {
    currentOperator.name = name;
    currentOperator.symbol = symbol;
    updateCalculatorDisplay();
  }
}

function calculateUserInput(firstInput, operator, secondInput) {
  let result;
  if (operator.name === "add") {
    result = convertToInteger(firstInput) + convertToInteger(secondInput);
  } else if (operator.name === "subtract") {
    result = convertToInteger(firstInput) - convertToInteger(secondInput);
  } else if (operator.name === "multiply") {
    result = convertToInteger(firstInput) * convertToInteger(secondInput);
  } else if (operator.name === "divide") {
    if ((firstInput == 0 && secondInput == 0) || secondInput == 0) {
      result = "Division by zero is undefined";
    } else {
      result = convertToInteger(firstInput) / convertToInteger(secondInput);
    }
  }
  displayResult(result);
}

function displayResult(result) {
  firstNumber.splice(0, firstNumber.length, result);
  secondNumber = [];
  currentOperator = {};
  updateCalculatorDisplay();
}

function convertToInteger(arr) {
  return parseFloat(arr.join(""));
}
