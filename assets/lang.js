// Show one language: ?lang=ja|en, then #ja / #en, then the browser's language (Japanese → ja, anything else → en).
(function () {
  var root = document.documentElement;
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "ja" || q === "en") return q;
    if (location.hash === "#ja" || location.hash === "#en") return location.hash.slice(1);
    var first = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    return first.toLowerCase().indexOf("ja") === 0 ? "ja" : "en";
  }
  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var t = root.getAttribute("data-title-" + lang);
    if (t) document.title = t;
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set") === lang));
    });
  }
  apply(pick());
  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-lang"));
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-set")); });
    });
  });
})();
