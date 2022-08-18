if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector("#collapsePages")?.classList.remove("show");
    const page = document.querySelector(
      ".sidebar .navbar-nav .nav-item #handle-nav-item"
    );
    page?.classList.add("collapsed");
  });
}
