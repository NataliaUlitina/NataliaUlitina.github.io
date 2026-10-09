// X-ray mode: reveals the system (grid, type specs, spacing, contrast) under the page.
(function () {
  var root = document.documentElement;
  var KEY = "xray";
  function set(on) {
    root.classList.toggle("xray", on);
    document.querySelectorAll(".xray-toggle").forEach(function (b) {
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var label = b.querySelector(".xray-label");
      if (label) label.textContent = on ? "Hide how this page is built" : "See how this page is built";
    });
    try { sessionStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
  }
  var start = false;
  try { start = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  set(start);
  function copied(btn) {
    btn.textContent = "Copied";
    setTimeout(function () { btn.textContent = "Copy"; }, 1800);
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".xray-toggle");
    if (b) { e.preventDefault(); set(!root.classList.contains("xray")); return; }
    var c = e.target.closest(".copy");
    if (!c) return;
    var text = c.getAttribute("data-copy");
    try {
      navigator.clipboard.writeText(text).then(function () { copied(c); }, function () { fallback(); });
    } catch (err) { fallback(); }
    function fallback() {
      var addr = c.parentNode.querySelector(".addr");
      if (!addr) return;
      var r = document.createRange(); r.selectNodeContents(addr);
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      try { document.execCommand("copy"); copied(c); } catch (e2) {}
    }
  });
})();
