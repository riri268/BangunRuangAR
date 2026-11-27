/* =========================================================
   NAVIGASI UTAMA BANGUNRUANG
   Mengatur perpindahan tampilan halaman dari sidebar dan
   tombol pintasan, tanpa mengubah fungsi modul pembelajaran.
   ========================================================= */

const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
window.showToast = showToast;

// Daftar halaman yang memang sudah tersedia di index.html.
const pageElements = {
  Beranda: document.getElementById("dashboardView"),
  Materi: document.getElementById("materiView"),
  "Eksplorasi 3D": document.getElementById("exploreView"),
  Video: document.getElementById("videoView"),
  "Latihan Soal": document.getElementById("latihanView"),
  Kuis: document.getElementById("kuisView"),
};

// Kubus adalah subhalaman dari menu Materi. Elemen ini harus ikut
// disembunyikan ketika siswa berpindah ke menu sidebar lain.
const materiDetailView = document.getElementById("kubusView");

// Menu Games dan Progres Belajar belum memiliki section khusus di HTML.
// Buat halaman informasi ringan agar tombol tetap memberikan respons.
function createInfoPage(id, title, description, icon) {
  let page = document.getElementById(id);
  if (page) return page;

  page = document.createElement("section");
  page.id = id;
  page.className = "app-extra-page";
  page.innerHTML = `
    <div class="app-extra-card">
      <div class="app-extra-icon" aria-hidden="true">${icon}</div>
      <p class="app-extra-kicker">BANGUNRUANG</p>
      <h1>${title}</h1>
      <p>${description}</p>
      <button type="button" class="app-extra-home" data-page="Beranda">⌂ Kembali ke Beranda</button>
    </div>`;
  document.querySelector(".main-content")?.appendChild(page);
  return page;
}

pageElements.Games = createInfoPage(
  "gamesComingSoon",
  "Games BangunRuang",
  "Bagian permainan edukatif sedang disiapkan. Yuk, lanjutkan belajar materi bangun ruang terlebih dahulu!",
  "🎮",
);
pageElements["Progres Belajar"] = createInfoPage(
  "progressComingSoon",
  "Progres Belajar",
  "Ringkasan perkembangan belajar akan ditampilkan di bagian ini setelah fitur progres diaktifkan.",
  "🏆",
);

// Aturan tampilan halaman dibuat terpusat agar setiap menu benar-benar
// menampilkan satu halaman dan menyembunyikan halaman lainnya.
if (!document.getElementById("appPageRouterStyles")) {
  const style = document.createElement("style");
  style.id = "appPageRouterStyles";
  style.textContent = `
    .app-page-hidden { display: none !important; }
    .app-extra-page { min-height: 58vh; padding: clamp(22px, 4vw, 54px); }
    .app-extra-card { max-width: 760px; margin: 4vh auto; padding: clamp(25px, 4vw, 48px); text-align: center; border: 2px solid rgba(255,255,255,.96); border-radius: 30px; background: linear-gradient(145deg, rgba(255,255,255,.97), rgba(239,248,255,.96)); box-shadow: 0 12px 30px rgba(65,105,166,.14); color: #172b68; }
    .app-extra-icon { width: 94px; height: 94px; display: grid; place-items: center; margin: 0 auto 12px; border-radius: 28px; background: linear-gradient(145deg,#fff0c9,#ffe0ef 55%,#dff5ff); font-size: 52px; box-shadow: 0 7px 16px rgba(76,104,170,.13); }
    .app-extra-kicker { margin: 0 0 6px; color: #8a55df; font-size: 12px; font-weight: 1000; letter-spacing: 1.5px; }
    .app-extra-card h1 { margin: 0 0 10px; color: #253b83; font-size: clamp(25px,3vw,36px); font-weight: 1000; }
    .app-extra-card p:not(.app-extra-kicker) { max-width: 560px; margin: 0 auto 22px; color: #52658e; font-weight: 700; line-height: 1.7; }
    .app-extra-home { border: 0; border-radius: 24px; padding: 12px 22px; color: #fff; background: linear-gradient(100deg,#a45af4,#6536df); font: 900 15px Nunito,sans-serif; cursor: pointer; box-shadow: 0 5px 12px rgba(111,69,213,.22); }
    .app-extra-home:hover { transform: translateY(-2px); }
  `;
  document.head.appendChild(style);
}

const allPageViews = [
  ...Object.values(pageElements),
  materiDetailView,
].filter(Boolean);
const bodyPageClasses = [
  "page-materi", "page-kubus", "page-kuis", "page-explore",
  "page-explorasi3d", "page-video", "page-latihan",
  "page-latihan-soal", "page-games", "page-progress",
];

function navigateToPage(pageName) {
  const target = pageElements[pageName];
  if (!target) {
    showToast(`Halaman ${pageName} belum tersedia.`);
    return;
  }

  // Tampilkan hanya halaman tujuan.
  allPageViews.forEach((view) => {
    view.classList.add("app-page-hidden");
    view.setAttribute("aria-hidden", "true");
  });
  target.classList.remove("app-page-hidden");
  target.removeAttribute("aria-hidden");

  // Saat siswa menekan Materi dari subhalaman Kubus, tampilkan kembali
  // daftar seluruh bangun ruang, bukan halaman Kubus yang tertinggal.
  if (pageName === "Materi" && materiDetailView) {
    materiDetailView.classList.add("app-page-hidden");
    materiDetailView.setAttribute("aria-hidden", "true");
  }

  // Pertahankan class body yang digunakan oleh stylesheet halaman tertentu.
  document.body.classList.remove(...bodyPageClasses);
  const pageClass = {
    Materi: "page-materi",
    Kuis: "page-kuis",
    "Eksplorasi 3D": "page-explorasi3d",
    Video: "page-video",
    "Latihan Soal": "page-latihan-soal",
    Games: "page-games",
    "Progres Belajar": "page-progress",
  }[pageName];
  if (pageClass) document.body.classList.add(pageClass);

  // Sinkronkan status aktif pada seluruh tombol navigasi/pintasan.
  document.querySelectorAll("[data-page]").forEach((button) => {
    const isActive = button.dataset.page === pageName;
    if (button.classList.contains("nav-link")) {
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-current", isActive ? "page" : "false");
    }
  });

  document.getElementById("sidebar")?.classList.remove("open");
  document.body.classList.remove("sidebar-open");
  window.scrollTo({ top: 0, behavior: "smooth" });

  const messages = {
    Beranda: "Kamu sedang berada di Beranda BangunRuang.",
    Materi: "Pilih salah satu bangun ruang untuk mulai belajar.",
    "Eksplorasi 3D": "Ayo amati model bangun ruang dalam bentuk 3D!",
    Video: "Pilih video pembelajaran yang ingin kamu tonton.",
    "Latihan Soal": "Yuk, asah pemahamanmu melalui latihan soal!",
    Kuis: "Selamat mengerjakan kuis!",
    Games: "Bagian Games sedang disiapkan.",
    "Progres Belajar": "Bagian Progres Belajar sedang disiapkan.",
  };
  showToast(messages[pageName] || `Halaman ${pageName} dibuka.`);
}

// Delegasi event: berlaku untuk sidebar, logo, tombol pintasan,
// tombol kembali, serta tombol yang dibuat secara dinamis.
document.addEventListener("click", (event) => {
  const origin = event.target instanceof Element ? event.target : event.target.parentElement;
  const pageButton = origin?.closest("[data-page]");
  if (!pageButton) return;
  event.preventDefault();
  navigateToPage(pageButton.dataset.page);
}, true);

// Halaman awal selalu Beranda.
Object.values(pageElements).forEach((view) => {
  if (view) {
    view.classList.add("app-page-hidden");
    view.setAttribute("aria-hidden", "true");
  }
});
navigateToPage("Beranda");

// Pilihan kartu materi.
document.querySelectorAll("[data-material]").forEach((card) => {
  card.addEventListener("click", () =>
    showToast(`Materi ${card.dataset.material} dipilih. Selamat belajar!`),
  );
});

// Pencarian kartu materi pada halaman Beranda.
const searchInput = document.getElementById("searchInput");
const materialCards = [...document.querySelectorAll(".material-card")];
const emptyState = document.getElementById("emptyState");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;
    materialCards.forEach((card) => {
      const match = (card.dataset.material || "").toLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible++;
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  });
}

const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  showToast(
    document.body.classList.contains("dark")
      ? "Mode gelap diaktifkan."
      : "Mode terang diaktifkan.",
  );
});

const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenu?.addEventListener("click", () => {
  const isOpen = sidebar?.classList.toggle("open") ?? false;
  document.body.classList.toggle("sidebar-open", isOpen);
  mobileMenu.setAttribute("aria-expanded", String(isOpen));
});

// Tutup drawer saat area di luar sidebar disentuh.
document.addEventListener("click", (event) => {
  if (!sidebar?.classList.contains("open")) return;
  const target = event.target instanceof Element ? event.target : event.target.parentElement;
  if (target?.closest("#sidebar, #mobileMenu")) return;
  sidebar.classList.remove("open");
  document.body.classList.remove("sidebar-open");
  mobileMenu?.setAttribute("aria-expanded", "false");
});

document.getElementById("profileButton")?.addEventListener("click", () =>
  showToast("Halo! Selamat belajar di BangunRuang."),
);
document.querySelector(".notification")?.addEventListener("click", () =>
  showToast("Belum ada notifikasi baru."),
);

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput?.focus();
  }
  if (event.key === "Escape") {
    sidebar?.classList.remove("open");
    document.body.classList.remove("sidebar-open");
    mobileMenu?.setAttribute("aria-expanded", "false");
  }
});
