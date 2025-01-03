let numbers;
let inputField;
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
};

function Operator(type, index) {
    this.type = type;
    this.index = index;
};

function TreeNode(operator, left, right) {
    this.operator = operator;
    this.left = left;
    this.right = right;
};

function loadData() {
    numbers = document.getElementById("numerical");
    inputField = document.getElementById("input");
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
    prepareOperationButtons()
}

function prepareOperationButtons() {
    let operationButtons = document.querySelectorAll(".operator");
    operationButtons.forEach((element) => { 
        element.addEventListener("click", input)
    });
}

const input = event => inputField.textContent += event.target.value;
const del = () => inputField.textContent = (inputField.textContent.length > 0) ? inputField.textContent.slice(0, inputField.textContent.length - 1) : inputField.textContent;
const clear = () => inputField.textContent = "";

function processOperation() {
    const operation = inputField.textContent;
    console.log(operation);
    // Create sintax tree
    const tree = sintaxAnalysis(operation);
    const result = evaluateBinaryTree(tree);
    console.log(result);
    // Evaluate sintax tree from bottom to top
}

function sintaxAnalysis(operation, currentOperator = new Operator("", 0), currentIndex = 0) {
    if (operators.includes(operation[currentIndex])) {
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
    
    return sintaxAnalysis(operation, currentOperator, currentIndex + 1);
}

function evaluateBinaryTree(node) {
    const left = (typeof node.left == "string") ? parseInt(node.left) : evaluateBinaryTree(node.left);
    const right = (typeof node.right == "string") ? parseInt(node.right) : evaluateBinaryTree(node.right);

    return operate(node.operator, left, right);
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

const divide = (a, b) => a / b;

document.addEventListener("DOMContentLoaded", loadData);