document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggleButton && nav) {
    toggleButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
