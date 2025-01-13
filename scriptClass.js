class Calculator {
  constructor() {
    this.numberButtons = document.querySelectorAll(".number-button");
    this.matchButtons = document.querySelectorAll(".match-button");
    this.mainDisplay = document.querySelector(".main-display");
    this.secondaryDisplay = document.querySelector(".secondary-display");
    this.deleteButton = document.querySelector(".delete-btn");
    this.acButton = document.querySelector(".ac-btn"); // Added AC button
    this.equalButton = document.querySelector(".equal-btn");
    this.modal = document.querySelector(".modal-body");
    this.modalButton = document.querySelector(".modal-btn");
    this.matchOperator = null;
    this.firstNumber = "";
    this.secondNumber = "";
    this.operation = "";

    this.init();
  }

  init() {
    this.numberButtons.forEach((numberButton) => {
      numberButton.addEventListener("click", (number) =>
        this.setNumber(number)
      );
    });
    this.matchButtons.forEach((matchButton) => {
      matchButton.addEventListener("click", (operator) =>
        this.getMatchOperator(operator)
      );
    });
    this.deleteButton.addEventListener("click", () =>
      this.deleteLastCharacter()
    );
    this.acButton.addEventListener("click", () => this.resetCalculator());
    this.equalButton.addEventListener("click", () => this.calculate());
    document.addEventListener("keyup", (event) => this.numberOnKeyboard(event));
    this.modalButton.addEventListener("click", () => this.showHistory());
  }

  setNumber(number) {
    const selectedNumber = number.target.innerText;
    if (this.matchOperator === null) {
      this.firstNumber += selectedNumber;
      this.mainDisplay.innerHTML = this.firstNumber;
    } else {
      this.secondNumber += selectedNumber;
      this.mainDisplay.innerHTML = this.secondNumber;
    }
    console.log(
      "First Number:",
      this.firstNumber,
      "Second Number:",
      this.secondNumber
    );
  }

  numberOnKeyboard(event) {
    let key = event.key;
    if (/^[0-9.]$/.test(key)) {
      if (this.matchOperator === null) {
        this.firstNumber += key;
        this.mainDisplay.innerHTML = this.firstNumber;
      } else {
        this.secondNumber += key;
        this.mainDisplay.innerHTML = this.secondNumber;
      }
    }
    if (key === "Enter") {
      if (isNaN(this.firstNumber) || isNaN(this.secondNumber)) {
        this.secondaryDisplay.innerHTML = "ERROR";
        this.resetCalculator();
        return;
      }
      this.calculate();
    }
    if (["+", "-", "*", "/"].includes(key)) {
      this.getMatchOperator({ target: { innerText: key } });
    }
  }

  getMatchOperator(operator) {
    this.matchOperator = operator.target.innerText;
    this.mainDisplay.innerHTML = this.matchOperator;
  }

  deleteLastCharacter() {
    if (this.secondNumber !== "") {
      this.secondNumber = this.secondNumber.slice(0, -1);
      this.mainDisplay.innerHTML = this.secondNumber;
    } else if (this.matchOperator !== null) {
      this.matchOperator = null;
      this.mainDisplay.innerHTML = this.firstNumber;
    } else if (this.firstNumber !== "") {
      this.firstNumber = this.firstNumber.slice(0, -1);
      this.mainDisplay.innerHTML = this.firstNumber;
    }
  }

  calculate() {
    let result = 0;
    let firstNo = parseFloat(this.firstNumber);
    let secondNo = parseFloat(this.secondNumber);

    if (isNaN(firstNo) || isNaN(secondNo)) {
      this.secondaryDisplay.innerHTML = "ERROR";
      this.resetCalculator();
      return;
    }

    switch (this.matchOperator) {
      case "+":
        result = firstNo + secondNo;
        break;
      case "-":
        result = firstNo - secondNo;
        break;
      case "*":
        result = firstNo * secondNo;
        break;
      case "/":
        if (secondNo === 0) {
          this.secondaryDisplay.innerHTML = "ERROR";
          this.resetCalculator();
        } else {
          result = firstNo / secondNo;
        }
        break;
      case "%":
        result = firstNo * (secondNo / 100);
        break;

      default:
        this.secondaryDisplay.innerHTML = "ERROR. Invalid Operator";
        break;
    }

    this.result = result;
    this.operation = `${this.firstNumber} ${this.matchOperator} ${this.secondNumber} = ${this.result}`;
    this.secondaryDisplay.innerHTML = result;
    this.mainDisplay.innerHTML = `${this.firstNumber} ${this.matchOperator} ${this.secondNumber}`;

    this.firstNumber = result.toString();
    this.secondNumber = "";
    this.matchOperator = null;

    this.saveOperationToHistory(); // Save operation to history after calculation
  }

  resetCalculator() {
    this.secondaryDisplay.innerHTML = "";
    this.mainDisplay.innerHTML = "";
    this.matchOperator = null;
    this.firstNumber = "";
    this.secondNumber = "";
  }

  saveOperationToHistory() {
    let history = JSON.parse(sessionStorage.getItem("history")) || [];
    history.push(this.operation); // Add current operation to history
    sessionStorage.setItem("history", JSON.stringify(history)); // Save updated history
  }

  showHistory() {
    let history = JSON.parse(sessionStorage.getItem("history")) || [];
    if (history.length === 0) {
      this.modal.innerHTML =
        '<span class="text-danger">Nie wykonałeś jeszcze żadnych obliczeń</span>';
    } else {
      let modalItem = history.map((item) => `<div>${item}</div>`).join("");
      this.modal.innerHTML = modalItem;
    }
  }
}

let calculator = new Calculator();
