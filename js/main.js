// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
if(navToggle){
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// 1) Scroll reveal
(function () {
  var els = document.querySelectorAll(".rv, .sk");
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (list) {
    list.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(function (e) { io.observe(e); });
})();

// 2) Home terminal: type the command, then reveal commits
(function () {
  var t = document.getElementById("t");
  if (!t || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ty = document.getElementById("ty"), cmd = ty.textContent, rows = t.querySelectorAll(".row"), i = 0;
  ty.textContent = "";
  rows.forEach(function (r) { r.style.display = "none"; });
  (function type() {
    ty.textContent = cmd.slice(0, ++i);
    if (i < cmd.length) return setTimeout(type, 60);
    var n = 0;
    (function show() { if (n < rows.length) { rows[n++].style.display = ""; setTimeout(show, 450); } })();
  })();
})();

// Contact form: send to Formspree without leaving the page
(function () {
  var form = document.getElementById("contactForm");
  if (!form) return;
  var status = document.getElementById("formStatus");
  var btn = form.querySelector("button[type=submit]");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    btn.disabled = true;
    status.className = "";
    status.textContent = "Sending...";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        form.reset();                       // clears the fields
        status.className = "ok";
        status.textContent = "Message sent, thank you! 😊";
      })
      .catch(function () {
        status.className = "err";
        status.textContent = "Something went wrong — please try again or email me directly";
      })
      .finally(function () {
        btn.disabled = false;
        setTimeout(function () { status.textContent = ""; status.className = ""; }, 6000);
        // stay on contact.html and bring the form back into view
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      });
  });
})();
