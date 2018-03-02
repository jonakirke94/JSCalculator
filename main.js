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

/*********EVENTS ***************************/
let display = document.querySelector('#display h2');
let tmpNumber = "";


function calculate() {
    const hasNoOperators = !(/[*+/-]/.test(display.textContent));
    const hasIllegalChars = /[a-z|A-Z]/.test(display.textContent);
    if (hasIllegalChars || hasNoOperators || lastCharIsOperator()) {
        displayError("Ops.. take a look at the display!");
        return;
    }

    let res = eval(display.textContent);

    //if the result is larger than 20 and contains decimals format it
    const needsRounding = res.length > 20 && /[.]/.test(res);
    if (needsRounding) res = formatResult(res);

    display.textContent = res;
}

function addNumber() {
    if (display.textContent.charAt(0) === '0') display.textContent = "";

    const isDividingByZero = display.textContent.slice(-1) === '/' && this.textContent === '0';
    if (isDividingByZero) {
        displayError("Ops.. are you trying to divide by zero!?");
        return;
    }

    const multipleDots = /[.]/.test(tmpNumber) && this.textContent === '.';
    if (multipleDots) {
        displayError("Ops.. Numbers can only contain one '.' !");
        return;
    }

    tmpNumber += this.textContent;
    display.textContent += this.textContent;
}

function operatorClicked() {
    if (lastCharIsOperator()) {
        displayError("Ops.. you cannot insert an operator here");
        return;
    }

    tmpNumber = "";
    display.textContent += this.textContent;
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
    var factor = Math.pow(10, precision);
    return Math.round(res * factor) / factor;
}

function displayError(msg) {
    var x = document.getElementById("snackbar")
    x.textContent = msg;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}