const calculatorDisplayInput = document.getElementById("calculator-input");
const calculatorResultDisplay = document.getElementById("calculator-result");
const calculatorButtons = document.getElementById("calculator-btn-container");

let firstNumber = [];
let currentOperator = {};
let secondNumber = [];
let result = 0;

calculatorButtons.addEventListener("click", (event) => {
  if (event.target.id !== "calculator-btn-container") {
    calculatorHandler(event);
  }
});

window.addEventListener("keypress", (e) => {
  if (e.key == 8) {
    alert("8");
  }
});

function calculatorHandler(event) {
  const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const DELETE_AND_CLEAR = ["delete", "clear"];
  const MATH_OPERATORS = ["add", "subtract", "multiply", "divide"];

  const eventText = event.target.innerText;
  const eventId = event.target.id;

  if (DIGITS.includes(eventText)) {
    insertDigits(eventId);
  } else if (MATH_OPERATORS.includes(eventId)) {
    if (secondNumber.length == 0) {
      assignOperator(eventId, eventText);
    } else if (!(firstNumber.length == 0 && secondNumber.length == 0)) {
      assignOperator(eventId, eventText);
    }
  } else if (DELETE_AND_CLEAR.includes(eventId)) {
    deleteAndClearDigits(eventId);
  } else if (eventId === "equal") {
    if (secondNumber.length !== 0 && currentOperator.name !== undefined) {
      calculateUserInput(firstNumber, currentOperator, secondNumber);
    }
  }
}

function insertDigits(userInput) {
  if (firstNumber.length !== 0 && currentOperator.name !== undefined) {
    checkInputBehavior(secondNumber, userInput);
  } else {
    checkInputBehavior(firstNumber, userInput);
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
  calculatorDisplayInput.textContent = "";
  calculatorResultDisplay.textContent = "0";
}

function backSpace() {
  if (isThisArrayEmpty(secondNumber) && currentOperator.name == undefined) {
    firstNumber.pop();
  } else if (
    isThisArrayEmpty(secondNumber) &&
    currentOperator.name !== undefined
  ) {
    currentOperator = {};
  } else {
    secondNumber.pop();
  }
  updateInputDisplay();
}

function updateInputDisplay() {
  const currentCalculatorDisplay = []
    .concat(firstNumber, " ", currentOperator.symbol, " ", secondNumber)
    .join("");

  if (isThisArrayEmpty(firstNumber)) {
    calculatorDisplayInput.innerText = "0";
  } else {
    calculatorDisplayInput.innerText = currentCalculatorDisplay;
  }
}

function updateResultDisplay(result) {
  firstNumber = result;
  secondNumber = [];
  calculatorResultDisplay.innerText = "= " + result.join("");
}

function checkInputBehavior(arrayNumber, userInput) {
  if (!(arrayNumber.includes(".") && userInput == ".")) {
    if (arrayNumber[0] == "0" && arrayNumber[1] != ".") {
      arrayNumber.splice(0, arrayNumber.length, userInput);
    } else if (isThisArrayEmpty(arrayNumber) && userInput == ".") {
      arrayNumber.push("0", userInput);
    } else {
      arrayNumber.push(userInput);
    }
  }
  updateInputDisplay();
}

function assignOperator(name, symbol) {
  if (firstNumber.length != 0) {
    currentOperator.name = name;
    currentOperator.symbol = symbol;
    updateInputDisplay();
  }
}

function calculateUserInput(firstInput, operator, secondInput) {
  const num1 = convertToNumber(firstInput);
  const num2 = convertToNumber(secondInput);
  if (operator.name === "add") {
    result = num1 + num2;
  } else if (operator.name === "subtract") {
    result = num1 - num2;
  } else if (operator.name === "multiply") {
    result = num1 * num2;
  } else if (operator.name === "divide") {
    if ((num1 == 0 && num2 == 0) || num2 == 0) {
      alert("Division by zero is undefined");
    } else {
      result = num1 / num2;
    }
  }
  updateResultDisplay(convertToArray(checkIfNumberHasDecimal(result)));
}

function convertToNumber(arr) {
  return parseFloat(arr.join(""));
}

function convertToArray(input) {
  return input.toString().split("");
}

function checkIfNumberHasDecimal(input) {
  return input % 1 == 0 ? input : input.toFixed(4);
}

function isThisArrayEmpty(array) {
  return array.length === 0 ? true : false;
}
