let numbers;

function loadData() {
    numbers = document.getElementById("numerical");
    console.log("hi");
    loadButtons();
}

function createNumberButton(number) {
    const newNumber = document.createElement("button");
    newNumber.textContent = number;
    newNumber.value = number;
    return newNumber;
}

function loadButtons() {
    for (let i = 1; i < 10; i++)
        numbers.appendChild(createNumberButton(i));
    numbers.appendChild(createNumberButton(0))
}

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