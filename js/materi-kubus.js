/* Interaksi H1 halaman detail Kubus — terisolasi dari halaman lain */
(() => {
  const body = document.body;
  const view = document.getElementById("kubusView");
  if (!view) return;

  const pageClasses = [
    "page-materi", "page-explorasi3d", "page-video",
    "page-latihan-soal", "page-kuis", "page-kubus"
  ];

  function openKubus() {
    pageClasses.forEach((name) => body.classList.remove(name));
    body.classList.add("page-kubus");

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === "Materi");
    });

    document.getElementById("sidebar")?.classList.remove("open");
    const main = document.querySelector(".main-content");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToMateri() {
    body.classList.remove("page-kubus");
    body.classList.add("page-materi");
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === "Materi");
    });
    const main = document.querySelector(".main-content");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToObservation() {
    document.getElementById("kubusObserveTitle")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  document.querySelectorAll('[data-materi-topic="Kubus"]').forEach((button) => {
    button.addEventListener("click", openKubus);
  });

  document.querySelectorAll('[data-material="Kubus"]').forEach((button) => {
    button.addEventListener("click", () => {
      openKubus();
      if (typeof window.showToast === "function") {
        window.showToast("Selamat datang di petualangan belajar Kubus!");
      }
    });
  });

  document.getElementById("kubusBack")?.addEventListener("click", backToMateri);
  document.getElementById("kubusStartLearning")?.addEventListener("click", scrollToObservation);
  document.getElementById("kubusContinue")?.addEventListener("click", scrollToObservation);

  // Navigasi sidebar selalu menutup halaman detail Kubus sebelum berpindah.
  document.querySelectorAll("[data-page]").forEach((control) => {
    control.addEventListener("click", () => {
      if (!body.classList.contains("page-kubus")) return;
      body.classList.remove("page-kubus");
    });
  });

  window.openKubusMaterial = openKubus;
})();
