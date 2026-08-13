const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks(filter = "all") {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "active" && task.completed) return;
        if (filter === "completed" && !task.completed) return;

        const li = document.createElement("li");
        li.className = "task";
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <input type="checkbox" data-action="complete"
                   ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button type="button" data-action="edit">Edit</button>
            <button type="button" data-action="delete">Delete</button>
        `;

        li.dataset.index = index;
        list.appendChild(li);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    input.value = "";
    showTasks();
});

/* Delegated event listener */
list.addEventListener("click", function(event) {
    const task = event.target.closest(".task");

    if (!task) return;

    const index = Number(task.dataset.index);
    const action = event.target.dataset.action;

    if (action === "edit") {
        const newText = prompt("Edit task:", tasks[index].text);

        if (newText && newText.trim()) {
            tasks[index].text = newText.trim();
            saveTasks();
            showTasks();
        }
    }

    if (action === "delete") {
        tasks.splice(index, 1);
        saveTasks();
        showTasks();
    }
});

/* Delegated checkbox event */
list.addEventListener("change", function(event) {
    if (event.target.dataset.action !== "complete") return;

    const task = event.target.closest(".task");
    const index = Number(task.dataset.index);

    tasks[index].completed = event.target.checked;

    saveTasks();
    showTasks();
});

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", function() {
        showTasks(this.dataset.filter);
    });
});

showTasks();
