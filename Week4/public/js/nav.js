// nav.js — shared topbar behavior + dark mode init
// Include AFTER storage.js on every page.
 
(function () {
    // Apply saved dark mode preference before paint-ish
    const settings = getSettings();
    if (settings.darkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
    }
 
    // Highlight the active nav link based on current filename
    document.addEventListener("DOMContentLoaded", function () {
        const current = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".navlinks a").forEach(function (link) {
            if (link.getAttribute("href") === current) {
                link.classList.add("active");
            }
        });
 
        const toggle = document.querySelector(".nav-toggle");
        const links = document.querySelector(".navlinks");
        if (toggle && links) {
            toggle.addEventListener("click", function () {
                links.classList.toggle("open");
            });
        }
    });
})();
 
// Small helper used across pages to show a toast message
function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}
 
// Small helper to format currency using saved settings
function formatMoney(amount) {
    const settings = getSettings();
    const symbol = settings.currency || "₹";
    return symbol + Number(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}