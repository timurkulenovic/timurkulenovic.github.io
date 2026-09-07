// kulenovic.si — small site script: theme toggle + mobile menu.
// No dependencies. Runs on every page.

(function () {
  "use strict";

  var KEY = "kulenovic-theme";

  // Apply stored theme as early as possible to avoid a flash.
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    // ---- Theme toggle ----
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var html = document.documentElement;
        var current =
          html.getAttribute("data-theme") ||
          (window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark");
        var next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
      });
    }

    // ---- Mobile menu ----
    var menuBtn = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-nav-links]");
    if (menuBtn && menu) {
      menuBtn.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      // Close the menu when a link is tapped (mobile)
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  });
})();
