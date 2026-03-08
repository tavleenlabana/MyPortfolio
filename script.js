document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const yearEl = document.getElementById("year");
  const contactForm = document.getElementById("contact-form");
  const copyEmailBtn = document.querySelector("[data-copy-email]");

  // Dynamic year in footer
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Navbar shadow on scroll
  const handleScrollHeader = () => {
    if (window.scrollY > 10) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScrollHeader);
  handleScrollHeader();

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
    });
  }

  const closeNav = () => {
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      navToggle?.classList.remove("open");
    }
  };

  // Smooth scroll with offset for sticky header
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.slice(1);
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      event.preventDefault();

      const headerOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      closeNav();
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");

  const setActiveLinkOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.pageYOffset - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && sectionId) {
        navLinks.forEach((lnk) => lnk.classList.remove("active-link"));
        const current = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        current?.classList.add("active-link");
      }
    });
  };

  window.addEventListener("scroll", setActiveLinkOnScroll);
  setActiveLinkOnScroll();

  // Scroll reveal animations
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all if IntersectionObserver isn't supported
    revealEls.forEach((el) => el.classList.add("reveal-visible"));
  }

  // Optional: copy email button
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = copyEmailBtn.getAttribute("data-copy-email");
      if (!email) return;
      navigator.clipboard?.writeText(email).then(
        () => {
          copyEmailBtn.textContent = "Email copied!";
          setTimeout(() => {
            copyEmailBtn.textContent = "Copy email";
          }, 2000);
        },
        () => {
          window.location.href = `mailto:${email}`;
        }
      );
    });
  }
});

