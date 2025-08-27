// Simple fade-in animation
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animate-fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 1s ease-out, transform 1s ease-out";
    observer.observe(el);
  });

  // Mobile menu toggle
  const btn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  btn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Contact form submit handling
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop redirect

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // Show toast
        toast.classList.remove("opacity-0");
        toast.classList.add("opacity-100");

        form.reset();

        // Hide after 3 seconds
        setTimeout(() => {
          toast.classList.remove("opacity-100");
          toast.classList.add("opacity-0");
        }, 3000);
      } else {
        alert("Oops! Something went wrong.");
      }
    } catch (err) {
      alert("Network error!");
    }
  });

});
