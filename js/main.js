if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw_cached_site.js")
      .then(reg => console.log("registered"))
      .catch(e => console.log("Error serviceWorker", e));
  });
}
