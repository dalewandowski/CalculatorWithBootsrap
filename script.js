let numberButtons = document.querySelectorAll(".number-button");
let matchButtons = document.querySelectorAll(".match-button");
let mainDisplay = document.querySelector(".main-display");
let secondaryDisplay = document.querySelector(".secondary-display");
let deleteButton = document.querySelector(".delete-btn");
let matchOperator = null;
let firstNumber = "";
let secondNumber = "";

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    // let numbers = numberButton.innerText;
    if (matchOperator === null) {
      firstNumber += numberButton.innerText;
      mainDisplay.innerHTML = firstNumber;
    } else {
      secondNumber += numberButton.innerText;
      mainDisplay.innerHTML = secondNumber;
    }
    console.log("1: ", firstNumber);
    console.log("2: ", secondNumber);
  });
});

matchButtons.forEach((matchButton) => {
  matchButton.addEventListener("click", () => {
    matchOperator = matchButton.innerText;
    mainDisplay.innerHTML = matchOperator;
  });
});

function calculate() {
  let result = 0;
  let firstNo = parseFloat(firstNumber);
  let secondNo = parseFloat(secondNumber);

  switch (matchOperator) {
    case "+":
      {
        result = firstNo + secondNo;
      }

      break;
    case "-":
      {
        result = firstNo - secondNo;
      }
      break;
    case "*":
      {
        result = firstNo * secondNo;
      }
      break;
    case "/":
      {
        if (firstNo === 0) {
          secondaryDisplay.innerHTML = "ERROR";
        } else {
          result = firstNo / secondNo;
        }
      }
      break;
    case "%":
      {
        result = firstNo - secondNo;
      }
      break;

    default:
      secondaryDisplay.innerHTML = "ERROR. Invalid Operator";
      break;
  }

  secondaryDisplay.innerHTML = result;
  (mainDisplay.innerHTML = firstNo), matchOperator, secondNo;
  firstNumber = result;
  secondNumber = "";
  selectedOperator = null;
}

let equalButton = document.querySelector(".equal-btn");
equalButton.addEventListener("click", calculate);

deleteButton.addEventListener("click", function () {
  if (matchOperator === null) {
    firstNumber = firstNumber.slice(0, -1);
    mainDisplay.innerHTML = firstNumber;
  } else {
    secondNumber = secondNumber.slice(0, -1);
    mainDisplay.innerHTML = secondNumber;
  }
});

document.addEventListener("keyup", (event) => {
  let key = event.key;
  if (/^[0-9.]$/.test(key)) {
    if (matchOperator === null) {
      firstNumber += key;
      mainDisplay.innerHTML = firstNumber;
    } else {
      secondNumber += key;
      mainDisplay.innerHTML = secondNumber;
    }
  }
  if (key === "Enter") {
    console.log("enter");
  }
  if (key === "Backspace") {
    if (matchOperator === null) {
      firstNumber = firstNumber.slice(0, -1);
      mainDisplay.innerHTML = firstNumber;
    } else {
      secondNumber = secondNumber.slice(0, -1);
      mainDisplay.innerHTML = secondNumber;
    }
  }
});
