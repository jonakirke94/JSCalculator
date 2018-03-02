let display = document.querySelector('#display h2');
const displayBox = document.querySelector('#display');
let tmpNumber = "";

/************* ADD EVENTHANDLERS FOR BUTTONS *************/
const numbers = document.querySelectorAll('.value');
numbers.forEach(btnNum => {
    btnNum.addEventListener("click", addNumber);
});

const operators = document.querySelectorAll('.operator');
operators.forEach(btnOp => {
    btnOp.addEventListener("click", operatorClicked);
});

const equalBtn = document.querySelector('#equal');
equalBtn.addEventListener("click", calculate);

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener("click", clear);

const delBtn = document.querySelector('#del');
delBtn.addEventListener("click", deleteLast);

//transition displayBox
displayBox.addEventListener("transitionend", removeTransition);

//keyboard support
window.addEventListener("keydown", keyboardHandler);

/*********EVENTS ***************************/




function calculate() {
    const hasNoOperators = !(/[*+/-]/.test(display.textContent));
    const hasIllegalChars = /[a-z|A-Z]/.test(display.textContent);
    if (hasIllegalChars || hasNoOperators || lastCharIsOperator()) {
        displayBox.classList.add("error");
        return;
    }

    let res = eval(display.textContent);

    //if the result is larger than 20 and contains decimals format it
    const needsRounding = res.length > 20 && /[.]/.test(res);
    if (needsRounding) res = formatResult(res);

    displayBox.classList.add("success");
    display.textContent = res;
}

function addNumber(e) {
    if (display.textContent.charAt(0) === '0') display.textContent = "";

    const digit = this.textContent ? this.textContent : e.key; 

    const isDividingByZero = display.textContent.slice(-1) === '/' && digit === '0';
    if (isDividingByZero) {
        displayBox.classList.add("error");
        return;
    }

    const multipleDots = /[.]/.test(tmpNumber) && digit === '.';
    if (multipleDots) {
        displayBox.classList.add("error");
        return;
    }

    tmpNumber += digit;
    display.textContent += digit;
}

function operatorClicked(e) {
    operator = this.textContent ? this.textContent : e.key; 

    if (lastCharIsOperator()) {
        displayBox.classList.add("error");
        return;
    }

    tmpNumber = "";
    display.textContent += operator;
}

function clear() {
    tmpNumber = "";
    display.textContent = "";
}

function deleteLast() {
    tmpNumber = tmpNumber.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1);
}

/**************** HELPERS *************/

function lastCharIsOperator() {
    const lastChar = display.textContent.slice(-1);
    return /[*-/+]/.test(lastChar) || lastChar.length === 0;

}
 
function formatResult(res) {
    const maxLength = 20;
    let splitRes = res.split(".");
    const precision = maxLength - spltiRes[0].length;

    //round to precision
    const factor = Math.pow(10, precision);
    return Math.round(res * factor) / factor;
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return;  
    this.classList.remove("success");
    this.classList.remove("error");
  }

  function keyboardHandler(e) {
    switch(e.key) {
        case '=': calculate();
        break;
        case 'Enter': calculate();
        break;
        case '/': operatorClicked(e);
        break;
        case '+': operatorClicked(e);
        break;
        case '-': operatorClicked(e);
        break;
        case '*': operatorClicked(e);
        break;
        case 'Backspace': deleteLast();
        break;
        case 'c': clear();
        break;
        case '1': addNumber(e);
        break;
        case '2': addNumber(e);
        break;
        case '3': addNumber(e);
        break;
        case '4': addNumber(e);
        break;
        case '5': addNumber(e);
        break;
        case '6': addNumber(e);
        break;
        case '7': addNumber(e);
        break;
        case '8': addNumber(e);
        break;
        case '9': addNumber(e);
        break;
        case '0': addNumber(e);
        break;
        case '.': addNumber(e);
        break;
    }
}