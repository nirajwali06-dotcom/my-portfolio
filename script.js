document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    function updateButton() {
        if (document.body.classList.contains("dark")) {
            button.textContent = "☀️ Light Mode";
            button.setAttribute("aria-label", "Switch to light mode");
        } else {
            button.textContent = "🌙 Dark Mode";
            button.setAttribute("aria-label", "Switch to dark mode");
        }
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    updateButton();

    button.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

        updateButton();
    });

});
