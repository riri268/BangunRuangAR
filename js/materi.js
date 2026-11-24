/* Interaksi khusus halaman Materi Bangun Ruang */
(() => {
  const searchInput = document.getElementById("searchInput");
  const cards = [...document.querySelectorAll("[data-materi-topic]")];
  const emptyState = document.getElementById("materiEmpty");

  function filterMateri() {
    if (!searchInput || !document.body.classList.contains("page-materi")) return;
    const query = searchInput.value.trim().toLocaleLowerCase("id");
    let shown = 0;

    cards.forEach((card) => {
      const name = card.dataset.materiTopic.toLocaleLowerCase("id");
      const visible = name.includes(query);
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    if (emptyState) emptyState.hidden = shown !== 0;
  }

  searchInput?.addEventListener("input", filterMateri);

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const topic = card.dataset.materiTopic;
      if (typeof window.showToast === "function") {
        window.showToast(`Materi ${topic} dipilih. Selamat belajar!`);
      }
    });
  });

  document.querySelectorAll('[data-page="Materi"]').forEach((control) => {
    control.addEventListener("click", () => {
      window.setTimeout(filterMateri, 0);
    });
  });
})();
