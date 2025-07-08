// DOM elements
const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');

// store todo items
const tasks = [];

addBtn.addEventListener('click', () => {
    tasks.push(taskInput.value);
    console.log(`todos: ${tasks}`);
});

