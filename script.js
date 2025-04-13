// Scam Check Function
function checkScam() {
  const input = document.getElementById("linkInput").value.trim();
  const result = document.getElementById("result");

  if (input === "") {
    result.textContent = "Please enter a link to check.";
    result.style.color = "orange";
    result.classList.add("visible");
    return;
  }

  // Simulated response
  result.textContent = "⚠️ Warning: This website may be suspicious. Fraud risk: High";
  result.style.color = "red";
  result.classList.add("visible");

  // Reset for next check
  setTimeout(() => {
    result.classList.remove("visible");
  }, 5000); // Fade out after 5 seconds
}

// Scroll-Based Animations
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of element is visible
  );

  elements.forEach((el) => observer.observe(el));
});