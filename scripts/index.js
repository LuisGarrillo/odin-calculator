let numbers;
let inputField;
let delButton;
let ansButton;

function loadData() {
    numbers = document.getElementById("numerical");
    inputField = document.getElementById("input");
    delButton = document.getElementById("delete");
    ansButton = document.getElementById("clear");

    loadButtons();

    delButton.addEventListener("click", del);
    ansButton.addEventListener("click", clear);
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
    numbers.appendChild(createNumberButton(0))
}

const input = event => inputField.textContent += event.target.value;
const del = () => inputField.textContent = (inputField.textContent.length > 0) ? inputField.textContent.slice(0, inputField.textContent.length - 1) : inputField.textContent;
const clear = () => inputField.textContent = "";

function operate(operation, a, b) {
    switch (operation) {
        case "+": return add(a, b);
        case "-": return substract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

const add = (a, b) => a + b;

const substract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

document.addEventListener("DOMContentLoaded", loadData);