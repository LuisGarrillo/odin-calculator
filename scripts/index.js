let numbers;
let inputField;
let outputField;
let delButton;
let ansButton;
let equalButton;

const operators = ["+", "-", "×", "÷"];

const operatorPriority = {
    "": -1,
    "+": 2,
    "-": 2,
    "×": 1,
    "÷": 0,
}

function Operator(type, index) {
    this.type = type;
    this.index = index;
}

function TreeNode(operator, left, right) {
    this.operator = operator;
    this.left = left;
    this.right = right;
}

function loadData() {
    numbers = document.getElementById("numerical");
    inputField = document.getElementById("input");
    outputField = document.getElementById("output")
    delButton = document.getElementById("delete");
    ansButton = document.getElementById("clear");
    equalButton = document.getElementById("equals");

    loadButtons();

    delButton.addEventListener("click", del);
    ansButton.addEventListener("click", clear);
    equalButton.addEventListener("click", processOperation);
}

function createNumberButton(number) {
    const newNumber = document.createElement("button");
    newNumber.textContent = number;
    newNumber.value = number;
    newNumber.addEventListener("click", input);
    return newNumber;
}

function loadButtons() {
    for (let i = 1; i < 10; i++)
        numbers.appendChild(createNumberButton(i));
    numbers.appendChild(createNumberButton(0));
    numbers.appendChild(createNumberButton("."));
    prepareOperationButtons();
}

function prepareOperationButtons() {
    let operationButtons = document.querySelectorAll(".operator");
    operationButtons.forEach((element) => { 
        element.addEventListener("click", input)
    });
}

const input = event => inputField.textContent += event.target.value;
const del = () => inputField.textContent = (inputField.textContent.length > 0) ? inputField.textContent.slice(0, inputField.textContent.length - 1) : inputField.textContent;
const clear = () => {
    inputField.textContent = "";
    outputField.textContent = "0";
}

function processOperation() {
    const operation = inputField.textContent;

    // Create sintax tree
    let node;
    try {
        node = sintaxAnalysis(operation);
    }
    catch {
        outputField.textContent = "Error: Syntax Error";
        return;
    }

    // Evaluate sintax tree from bottom to top
    let result;
    try {
        result = (typeof node == "string") ? processValue(node) : evaluateBinaryTree(node);
    }
    catch (e) {
        result = "Error: Syntax Error";
    }

    outputField.textContent = result;
}

const isOperator = token => operators.includes(token);

function sintaxAnalysis(operation, currentOperator = new Operator("", 0), currentIndex = 0) {
    if (isOperator(operation[currentIndex])) {
        if (currentIndex > 0 && currentIndex < operation.length - 1)
            if (isOperator(operation[currentIndex - 1]) || isOperator(operation[currentIndex + 1]))
                throw SyntaxError;

        if (operatorPriority[operation[currentIndex]] == 2) {
            return new TreeNode(
                operation[currentIndex], 
                sintaxAnalysis(operation.slice(0, currentIndex)), 
                sintaxAnalysis(operation.slice(currentIndex + 1))
            );
        }
        if (operatorPriority[currentOperator.type] < operatorPriority[operation[currentIndex]])
            currentOperator = new Operator(operation[currentIndex], currentIndex);
    }
    if (currentIndex == operation.length - 1) {
        if (currentOperator.type == "") {
            return operation;
        }
        else {
            return new TreeNode(
                currentOperator.type, 
                sintaxAnalysis(operation.slice(0, currentOperator.index)), 
                sintaxAnalysis(operation.slice(currentOperator.index + 1))
            );
        }
    }
    if (operation.length == 0)
        return "empty";
    
    try {
        return sintaxAnalysis(operation, currentOperator, currentIndex + 1);
    }
    catch {
        throw SyntaxError;
    }
}

function evaluateBinaryTree(node) {
    let left;
    let right;
    try {
        left = (typeof node.left == "string") ? processValue(node.left, node.operator) : evaluateBinaryTree(node.left);
        right = (typeof node.right == "string") ? processValue(node.right, node.operator) : evaluateBinaryTree(node.right);
    }
    catch (e) {
        return "Error: Syntax Error";
    }

    if (typeof left == "string" || typeof right == "string")
        return "Error: Syntax Error";
   
    let result;
    try {
        result = operate(node.operator, left, right);
        result = Math.round(result * 100) / 100;
    }
    catch (e) {
        result = "Error: Zero Division";
    }
    return result;
}
function processValue(value, operator="") {
    if (value == "empty") {
        if (operator == "×" || operator == "÷")
            throw SyntaxError;
        value = "0"
    }
    const valueArr = [...value];
    let dotAmount = valueArr.reduce((total, currentValue) => (currentValue == ".") ? total + 1 : total, 0);
    console.log(dotAmount);
    if (dotAmount > 1)
        throw SyntaxError;
    return parseFloat(value);
}

function operate(operation, a, b) {
    switch (operation) {
        case "+": return add(a, b);
        case "-": return substract(a, b);
        case "×": return multiply(a, b);
        case "÷": return divide(a, b);
    }
}

const add = (a, b) => a + b;

const substract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b == 0)
        throw ZeroDivsionError;
    return a / b
};

document.addEventListener("DOMContentLoaded", loadData);