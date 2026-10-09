// X-ray mode: reveals the system (grid, type specs, spacing, contrast) under the page.
(function () {
  var root = document.documentElement;
  var KEY = "xray";
  function set(on) {
    root.classList.toggle("xray", on);
    document.querySelectorAll(".xray-toggle").forEach(function (b) {
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var label = b.querySelector(".xray-label");
      if (label) label.textContent = on ? "Hide the system" : "See the system";
    });
    try { sessionStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
  }
  var start = false;
  try { start = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  set(start);
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".xray-toggle");
    if (!b) return;
    e.preventDefault();
    set(!root.classList.contains("xray"));
  });
})();
