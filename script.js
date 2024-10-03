const calculatorResult = document.getElementById("calculator-result");
const calculatorInput = document.getElementById("calculator-input");
const calculatorButtons = document.getElementById("calculator-btn-container");

let firstNumber = [];
let currentOperator = {};
let secondNumber = [];
const mathOperators = ["add", "subtract", "multiply", "divide"];

calculatorButtons.addEventListener("click", (event) => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const deleteAndClear = ["delete", "clear"];

  if (event.target.id !== "calculator-btn-container") {
    if (digits.includes(event.target.innerText)) {
      insertDigits(event.target.id);
      // console.log(event.target.innerText);
    } else if (mathOperators.includes(event.target.id)) {
      if (secondNumber.length == 0) {
        assignOperator(event.target.id, event.target.innerText);
        // console.log(event.target.innerText);
      }
    } else if (deleteAndClear.includes(event.target.id)) {
      console.log(event.target.innerText);
    } else if (event.target.id === "equal") {
      console.log("equal");
    }
  }
});

function insertDigits(input) {
  if (firstNumber.length !== 0 && currentOperator.name !== undefined) {
    if (
      (secondNumber[0] === "0" && secondNumber[1] !== "." && input !== ".") ||
      (secondNumber.includes(".") && input === ".")
    ) {
      doNothing;
    } else {
      secondNumber.push(input);
      updateCalculatorDisplay();
      console.log("secondNumber");
    }
  } else {
    if (
      (firstNumber[0] === "0" && firstNumber[1] !== "." && input !== ".") ||
      (firstNumber.includes(".") && input === ".")
    ) {
      doNothing;
    } else {
      firstNumber.push(input);
      updateCalculatorDisplay();
      console.log("firstNumber");
    }
  }
}

function updateCalculatorDisplay() {
  const display = [];
  const currentCalculatorDisplay = display
    .concat(firstNumber, currentOperator.symbol, secondNumber)
    .join("");
  calculatorInput.innerText = currentCalculatorDisplay;
}

function assignOperator(name, symbol) {
  if (firstNumber.length !== 0) {
    currentOperator.name = name;
    currentOperator.symbol = symbol;
    updateCalculatorDisplay();
    console.log(`new operator: ${currentOperator.name}`);
  }
}

function doNothing() {
  return 0;
}
