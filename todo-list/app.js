const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');

const tasks = [];

// add task click event
addBtn.addEventListener('click', () => {
    const taskValue = taskInput.value;
    if (!tasks.includes(taskValue)) {
        addTodo(taskValue);
    }
    taskInput.value = "";
});

// add task key event
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const taskValue = taskInput.value;
        if (!tasks.includes(taskValue)) {
            addTodo(taskValue);
        }
        taskInput.value = "";
    }
});

function addTodo(task) {
    if (!tasks.includes(task)) {
        tasks.push(task);
        const newItem = document.createElement("li");
        newItem.innerHTML = task;
        newItem.id = task.replace(/[\s\W_]/gmi, '-').toLowerCase();

        // create delete button for each item
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.classList.add('delete-btn');
        newItem.appendChild(delBtn);

        taskList.appendChild(newItem);
    }
    taskInput.value = "";
}

// delete task
taskList.addEventListener('click', e => {
    const item = document.querySelector(`#${e.target.parentElement.id}`);
    item.remove();
});

