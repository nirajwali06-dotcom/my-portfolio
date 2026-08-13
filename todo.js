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

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button>Edit</button>
            <button>Delete</button>
        `;

        li.querySelector("input").addEventListener("change", function () {
            task.completed = this.checked;
            saveTasks();
            showTasks(filter);
        });

        li.querySelector("button").addEventListener("click", function () {
            const newText = prompt("Edit task:", task.text);

            if (newText && newText.trim()) {
                task.text = newText.trim();
                saveTasks();
                showTasks(filter);
            }
        });

        li.querySelectorAll("button")[1].addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            showTasks(filter);
        });

        list.appendChild(li);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = input.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    input.value = "";
    showTasks();
});

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", function () {
        showTasks(this.dataset.filter);
    });
});

showTasks();
