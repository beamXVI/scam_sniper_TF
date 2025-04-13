// Scam Check Function
function checkScam() {
  const input = document.getElementById("linkInput").value.trim();
  const result = document.getElementById("result");
  const button = document.getElementById("checkButton");
  const spinner = document.getElementById("spinner");

  if (input === "") {
    result.textContent = "Please enter a link to check.";
    result.style.color = "orange";
    result.classList.add("visible");
    return;
  }

  // Show spinner and disable button
  button.disabled = true;
  spinner.classList.remove("hidden");
  result.textContent = "";

  // Simulate async check (2 seconds)
  setTimeout(() => {
    spinner.classList.add("hidden");
    button.disabled = false;
    result.textContent = "⚠️ Warning: This website may be suspicious. Fraud risk: High";
    result.style.color = "red";
    result.classList.add("visible");

    // Auto-clear result after 7 seconds
    setTimeout(() => {
      result.classList.remove("visible");
      setTimeout(() => {
        result.textContent = "";
      }, 500);
    }, 7000);
  }, 2000);
}

// Scroll-Based Animations
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-animate]");
  const featureItems = document.querySelectorAll(".feature-list li");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
  featureItems.forEach((item) => observer.observe(item));

  // Dark Mode Toggle
  const toggleButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateToggleIcon(currentTheme);

  toggleButton.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateToggleIcon(theme);
  });

  function updateToggleIcon(theme) {
    toggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
  }
});
