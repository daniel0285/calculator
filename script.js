const calculatorDisplay = document.getElementById("calculator-display");
const calculatorButtons = document.getElementById("calculator-btn-container");

let firstNumber = [];
let currentOperator = {};
let secondNumber = [];
const MATH_OPERATORS = ["add", "subtract", "multiply", "divide"];

calculatorButtons.addEventListener("click", (event) => {
  const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const DELETE_AND_CLEAR = ["delete", "clear"];

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
      console.log(event.target.innerText);
    } else if (event.target.id === "equal") {
      if (secondNumber.length !== 0 && currentOperator.name !== undefined) {
        calculateUserInput(firstNumber, currentOperator, secondNumber);
      }
      console.log("equal");
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

function updateCalculatorDisplay() {
  const display = [];
  const currentCalculatorDisplay = display
    .concat(firstNumber, " ", currentOperator.symbol, " ", secondNumber)
    .join("");
  calculatorDisplay.innerText = currentCalculatorDisplay;
}

function checkInputLimitations(arrayNumber, userInput) {
  if (firstNumber.includes(".") && userInput == ".") {
    doNothing;
  } else {
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
  calculatorDisplay.innerText = result;
  firstNumber.splice(0, firstNumber.length, result);
  secondNumber.length = 0;
  currentOperator = {};
}

function convertToInteger(arr) {
  return parseFloat(arr.join(""));
}

function doNothing() {
  return 0;
}
