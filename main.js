let display = document.querySelector('#display h2');
let inputs = [];


function operate(op, a, b) {
    switch(op) {
        case "+": add(a,b);
        break;
        case "-": subtract(a,b);
        break;
        case "*": multiply(a,b);
        break;
        case "/": divide(a,b);
        break;
    }
}



function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b; 
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

/************* ADD EVENTHANDLERS FOR BUTTONS *************/
const numbers = document.querySelectorAll('.value');
numbers.forEach(btnNum => {
    btnNum.addEventListener("click", numClicked);
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

function calculate() {
    //push the current value;



    operate(op, a, b);
    display.textContent = 12;
}

function numClicked() {
    if(display.textContent.charAt(0) === '0')  display.textContent = "";
    
    addDisplay(this.textContent);
}

function operatorClicked() {
    
    const currentInputs = display.textContent.split([/"*+\-\/"/]);
    const last = currentInputs.length-1;
    console.log(currentInputs[last]);

    //push the current value;

    //push the operator;

    console.log(currentInputs);
}

function clear() {
    display.textContent = "0";
    inputs = [];
}

function deleteLast() {
    console.log("delete clicked");
}

function addDisplay(val) {
    display.textContent += val;
}