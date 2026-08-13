const button = document.getElementById("themeToggle");

button.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        button.textContent = "☀️ Light Mode";
        button.setAttribute("aria-label", "Switch to light mode");
        localStorage.setItem("theme", "dark");
    } else {
        button.textContent = "🌙 Dark Mode";
        button.setAttribute("aria-label", "Switch to dark mode");
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    button.textContent = "☀️ Light Mode";
    button.setAttribute("aria-label", "Switch to light mode");
}
