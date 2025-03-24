document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-btn");
    const inputField = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Load saved tasks from localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    renderTodos();

    // Function to display todos
    function renderTodos() {
        todoList.innerHTML = ""; // Clear list before rendering
        todos.forEach((task, index) => {
            addTodoElement(task, index);
        });

        // Save updated tasks to localStorage
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Function to add a new todo
    addButton.addEventListener("click", function () {
        let task = inputField.value.trim();
        if (task === "") return;

        todos.push(task);
        inputField.value = "";
        renderTodos();
    });

    // Function to add a todo element with animation
    function addTodoElement(task, index) {
        let li = document.createElement("li");
        li.innerHTML = `${task} <button class="delete-btn" data-index="${index}">Delete</button>`;

        // Add animation on delete
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.style.animation = "fadeOut 0.3s forwards";
            setTimeout(() => {
                deleteTodo(index);
            }, 300); // Wait for animation to complete before deleting
        });

        todoList.appendChild(li);
    }

    // Function to delete a todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }
});
