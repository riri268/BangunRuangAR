/* Materi Kubus: navigasi Ayo Mengamati dan Amati Bentuknya.
   Model Eksplorasi 3D tidak disentuh oleh script ini. */
(() => {
  const body = document.body;
  const view = document.getElementById("kubusView");
  if (!view || view.dataset.kubusBound === "true") return;
  view.dataset.kubusBound = "true";

  const observeView = view.querySelector(".kubus-observe-layout");
  const shapeView = document.getElementById("kubusShapeView");
  const buildView = document.getElementById("kubusBuildView");
  const model = document.getElementById("kubusInteractiveModel");
  const stepButtons = [...view.querySelectorAll("[data-kubus-step]")];
  const dots = [...view.querySelectorAll(".kubus-progress-dots span")];
  const modelPaths = {
    base: "assets/models/materi/kubus/kubus_materi_lavender.glb",
    face: "assets/models/materi/kubus/kubus_materi_sisi.glb",
    edge: "assets/models/materi/kubus/kubus_materi_rusuk.glb",
    vertex: "assets/models/materi/kubus/kubus_materi_titik_sudut.glb",
  };
  const modes = {
    face: {
      label: "Sisi",
      count: 6,
      color: "merah muda",
      description:
        "Sisi kubus berbentuk persegi. Semua sisinya memiliki bentuk dan ukuran yang sama.",
      prefix: "Sisi_",
    },
    edge: {
      label: "Rusuk",
      count: 12,
      color: "biru",
      description:
        "Rusuk adalah ruas garis tempat dua sisi kubus bertemu. Semua rusuk kubus memiliki panjang yang sama.",
      prefix: "Rusuk_",
    },
    vertex: {
      label: "Titik Sudut",
      count: 8,
      color: "oranye",
      description:
        "Titik sudut adalah titik pertemuan tiga rusuk kubus. Kubus mempunyai delapan titik sudut.",
      prefix: "Titik_Sudut_",
    },
  };
  let activeMode = "face";
  let selectedName = null;
  let pointerStart = null;
  let zoom = 3.4;

  const pageClasses = [
    "page-materi",
    "page-explorasi3d",
    "page-video",
    "page-latihan-soal",
    "page-kuis",
    "page-kubus",
  ];
  function toast(message) {
    if (typeof window.showToast === "function") window.showToast(message);
  }
  function openKubus() {
    pageClasses.forEach((name) => body.classList.remove(name));
    body.classList.add("page-kubus");
    document
      .querySelectorAll(".nav-link")
      .forEach((link) =>
        link.classList.toggle("active", link.dataset.page === "Materi"),
      );
    document.getElementById("sidebar")?.classList.remove("open");
    const main = document.querySelector(".main-content");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    showStage("observe");
  }
  function backToMateri() {
    body.classList.remove("page-kubus");
    body.classList.add("page-materi");
    document
      .querySelectorAll(".nav-link")
      .forEach((link) =>
        link.classList.toggle("active", link.dataset.page === "Materi"),
      );
    const main = document.querySelector(".main-content");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  }
  function showStage(stage) {
    const isShape = stage === "shape";
    const isBuild = stage === "build";
    if (observeView) observeView.hidden = isShape || isBuild;
    if (shapeView) shapeView.hidden = !isShape;
    if (buildView) buildView.hidden = !isBuild;
    stepButtons.forEach((button) =>
      button.classList.toggle("is-active", button.dataset.kubusStep === stage),
    );
    const activeIndex =
      stage === "observe"
        ? 0
        : stage === "shape"
          ? 1
          : stage === "build"
            ? 2
            : 0;
    dots.forEach((dot, index) =>
      dot.classList.toggle("active", index === activeIndex),
    );
    const next = document.getElementById("kubusContinue");
    if (next) {
      next.setAttribute(
        "aria-label",
        isShape ? "Kembali ke Ayo Mengamati" : "Lanjut ke Amati Bentuknya",
      );
      next.textContent = isShape ? "‹" : "➜";
    }
    const progress = view.querySelector(".kubus-progress-dots");
    if (progress)
      progress.setAttribute("aria-label", `Tahap ${activeIndex + 1} dari 4`);
    if (isShape && model) {
      requestAnimationFrame(() => {
        model.setAttribute("auto-rotate", "");
        model.setAttribute("auto-rotate-delay", "0");
        model.setAttribute("rotation-per-second", "16deg");
        model.setAttribute("camera-controls", "");
        model.setAttribute("src", modelPaths[activeMode] || modelPaths.base);
      });
    }
    const main = document.querySelector(".main-content");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  }
  function setSelection(name) {
    selectedName = name;
    const info = modes[activeMode];
    const index = Number(name.match(/(\d+)$/)?.[1] || 1);
    const labels = {
      Sisi_Atas: "Atas",
      Sisi_Bawah: "Bawah",
      Sisi_Depan: "Depan",
      Sisi_Belakang: "Belakang",
      Sisi_Kanan: "Kanan",
      Sisi_Kiri: "Kiri",
    };
    const title = document.getElementById("kubusSelectedTitle");
    const text = document.getElementById("kubusSelectedText");
    const count = document.getElementById("kubusSelectedCount");
    const kicker = document.getElementById("kubusSelectedKicker");
    if (title)
      title.textContent =
        activeMode === "face"
          ? `Sisi ${labels[name] || index}`
          : `${info.label} ${index}`;
    if (text) text.textContent = info.description;
    if (count)
      count.textContent = `Semua ${info.count} ${info.label.toLowerCase()} ditampilkan`;
    if (kicker) kicker.textContent = `SOROTAN ${info.color.toUpperCase()}`;
  }
  function chooseMode(mode) {
    if (!modes[mode]) return;
    activeMode = mode;
    view.querySelectorAll("[data-kubus-part]").forEach((button) => {
      const active = button.dataset.kubusPart === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const firstExample = {
      face: "Sisi_Atas",
      edge: "Rusuk_01",
      vertex: "Titik_Sudut_01",
    }[mode];
    if (model) {
      const nextSrc = modelPaths[mode];
      if (model.getAttribute("src") !== nextSrc)
        model.setAttribute("src", nextSrc);
      model.setAttribute("camera-controls", "");
      model.setAttribute("auto-rotate", "");
      model.setAttribute("auto-rotate-delay", "0");
      model.setAttribute("rotation-per-second", "16deg");
    }
    setSelection(firstExample);
  }
  function distanceToSegment(p, a, b) {
    const ab = b.map((v, i) => v - a[i]);
    const ap = p.map((v, i) => v - a[i]);
    const denom = ab.reduce((s, v) => s + v * v, 0);
    const t = Math.max(
      0,
      Math.min(1, ap.reduce((s, v, i) => s + v * ab[i], 0) / denom),
    );
    const q = a.map((v, i) => v + t * ab[i]);
    return Math.hypot(...p.map((v, i) => v - q[i]));
  }
  function chooseByHit(position, normal) {
    // Titik hasil raycast berada pada koordinat lokal model; kubus dibuat
    // berpusat di origin dengan titik sudut sekitar +/-1.
    const p = Array.from(position || [])
      .slice(0, 3)
      .map(Number);
    const n = Array.from(normal || [])
      .slice(0, 3)
      .map(Number);
    if (p.length !== 3 || p.some((v) => !Number.isFinite(v))) return false;
    let name = null;
    if (activeMode === "face") {
      if (n.length !== 3 || n.some((v) => !Number.isFinite(v))) return false;
      let axis = 0;
      if (Math.abs(n[1]) > Math.abs(n[axis])) axis = 1;
      if (Math.abs(n[2]) > Math.abs(n[axis])) axis = 2;
      const sign = n[axis] >= 0 ? 1 : -1;
      name =
        axis === 0
          ? sign > 0
            ? "Sisi_Kanan"
            : "Sisi_Kiri"
          : axis === 1
            ? sign > 0
              ? "Sisi_Belakang"
              : "Sisi_Depan"
            : sign > 0
              ? "Sisi_Atas"
              : "Sisi_Bawah";
    } else if (activeMode === "edge") {
      let best = Infinity;
      for (const [edge, a, b] of edge_specs_for_pick) {
        const d = distanceToSegment(p, a, b);
        if (d < best) {
          best = d;
          name = edge;
        }
      }
      // Hindari salah memilih rusuk ketika siswa menyentuh bagian tengah sisi.
      if (best > 0.2) return false;
    } else {
      let best = Infinity;
      for (const [vertex, v] of vertex_specs_for_pick) {
        const d = Math.hypot(...p.map((x, i) => x - v[i]));
        if (d < best) {
          best = d;
          name = vertex;
        }
      }
      // Titik sudut berupa bola kecil di tiap pojok kubus.
      if (best > 0.22) return false;
    }
    if (name) {
      setSelection(name);
      return true;
    }
    return false;
  }
  const edge_specs_for_pick = [];
  for (let axis = 0; axis < 3; axis++) {
    const other = [0, 1, 2].filter((i) => i !== axis);
    for (const s1 of [-1, 1])
      for (const s2 of [-1, 1]) {
        const a = [0, 0, 0],
          b = [0, 0, 0];
        a[other[0]] = b[other[0]] = s1;
        a[other[1]] = b[other[1]] = s2;
        a[axis] = -1;
        b[axis] = 1;
        edge_specs_for_pick.push([
          `Rusuk_${String(edge_specs_for_pick.length + 1).padStart(2, "0")}`,
          a,
          b,
        ]);
      }
  }
  const vertex_specs_for_pick = [];
  for (const x of [-1, 1])
    for (const y of [-1, 1])
      for (const z of [-1, 1])
        vertex_specs_for_pick.push([
          `Titik_Sudut_${String(vertex_specs_for_pick.length + 1).padStart(2, "0")}`,
          [x, y, z],
        ]);

  document
    .querySelectorAll('[data-materi-topic="Kubus"]')
    .forEach((button) => button.addEventListener("click", openKubus));
  document.querySelectorAll('[data-material="Kubus"]').forEach((button) =>
    button.addEventListener("click", () => {
      openKubus();
      toast("Selamat datang di petualangan belajar Kubus!");
    }),
  );
  document.getElementById("kubusBack")?.addEventListener("click", backToMateri);
  document.getElementById("kubusContinue")?.addEventListener("click", () => {
    const current =
      buildView && !buildView.hidden
        ? "build"
        : shapeView && !shapeView.hidden
          ? "shape"
          : "observe";
    showStage(
      current === "observe"
        ? "shape"
        : current === "shape"
          ? "build"
          : "observe",
    );
  });
  document.getElementById("kubusWatchVideo")?.addEventListener("click", () => {
    const link = document.querySelector('[data-page="Video"]');
    if (link) link.click();
    else toast("Halaman video pengantar belum tersedia.");
  });
  stepButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const stage = button.dataset.kubusStep;
      if (stage === "observe" || stage === "shape" || stage === "build") {
        showStage(stage);
        return;
      }
      const labels = { formula: "Pahami Rumus!", quiz: "Uji Pemahamanmu!" };
      toast(`Bagian ${labels[stage]} sedang disiapkan.`);
    }),
  );
  view
    .querySelectorAll("[data-kubus-part]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        chooseMode(button.dataset.kubusPart),
      ),
    );
  view.querySelectorAll("[data-kubus-zoom]").forEach((button) =>
    button.addEventListener("click", () => {
      if (!model) return;
      const action = button.dataset.kubusZoom;
      if (action === "reset") {
        zoom = 3.4;
        model.setAttribute("camera-orbit", "35deg 72deg 3.4m");
        return;
      }
      zoom = Math.max(2.2, Math.min(6, zoom * (action === "in" ? 0.82 : 1.22)));
      model.setAttribute("camera-orbit", `35deg 72deg ${zoom.toFixed(2)}m`);
    }),
  );
  if (model) {
    let lastHandledClick = 0;
    function selectAtClientPoint(clientX, clientY) {
      if (typeof model.positionAndNormalFromPoint !== "function") return false;
      const rect = model.getBoundingClientRect();
      const hit = model.positionAndNormalFromPoint(
        clientX - rect.left,
        clientY - rect.top,
      );
      return hit ? chooseByHit(hit.position, hit.normal) : false;
    }
    model.addEventListener("pointerdown", (event) => {
      pointerStart = {
        x: event.clientX,
        y: event.clientY,
        pointerId: event.pointerId,
      };
    });
    model.addEventListener("pointerup", (event) => {
      if (!pointerStart || pointerStart.pointerId !== event.pointerId) return;
      const moved = Math.hypot(
        event.clientX - pointerStart.x,
        event.clientY - pointerStart.y,
      );
      pointerStart = null;
      // Geseran digunakan untuk memutar kamera; hanya tap/klik yang memilih bagian.
      if (moved > 8) return;
      if (selectAtClientPoint(event.clientX, event.clientY))
        lastHandledClick = Date.now();
    });
    // Fallback untuk browser yang mengirim click tetapi tidak meneruskan pointerup
    // ke elemen model-viewer. Cegah pemilihan ganda setelah pointerup.
    model.addEventListener("click", (event) => {
      if (Date.now() - lastHandledClick < 350) return;
      selectAtClientPoint(event.clientX, event.clientY);
    });
    model.addEventListener("load", () => {
      model.setAttribute("auto-rotate", "");
      model.setAttribute("auto-rotate-delay", "0");
      model.setAttribute("rotation-per-second", "16deg");
      model.setAttribute("camera-controls", "");
    });
  }
  // Interaksi Bongkar & Bentuk: seluruh model ini dibuat khusus untuk halaman Materi.
  const buildStage = document.getElementById("kubusBuildStage");
  const buildScene = document.getElementById("kubusBuildScene");
  const buildObject = document.getElementById("kubusBuildObject");
  const buildCaption = document.getElementById("kubusBuildCaption");
  const buildCopy = {
    whole: {
      kicker: "BENTUK AWAL",
      title: "Kubus Utuh",
      text: "Kubus tersusun dari enam sisi berbentuk persegi yang saling bertemu pada rusuknya.",
      fact: "6 sisi • 12 rusuk • 8 titik sudut",
      caption: "Kubus utuh — enam sisi membentuk bangun ruang.",
    },
    explode: {
      kicker: "PROSES PEMBONGKARAN",
      title: "Enam Sisi Terpisah",
      text: "Setiap sisi bergerak menjauh dari posisi semula. Perhatikan bahwa keenam sisi tetap berbentuk persegi dan ukurannya sama.",
      fact: "6 sisi persegi yang kongruen",
      caption: "Sisi-sisi kubus terbuka dan bergerak menjauh.",
    },
    net: {
      kicker: "BENTUK JARING-JARING",
      title: "Jaring-jaring Kubus",
      text: "Jika dibuka dengan tepat, keenam sisi dapat tersusun menjadi satu pola datar yang disebut jaring-jaring kubus.",
      fact: "6 persegi tersusun pada bidang datar",
      caption: "Jaring-jaring — enam persegi tersusun pada bidang datar.",
    },
    rebuild: {
      kicker: "MENYUSUN KEMBALI",
      title: "Kubus Terbentuk Kembali",
      text: "Keenam sisi kembali ke posisi semula dan membentuk kubus. Setiap sisi bertemu pada rusuk dan titik sudut.",
      fact: "6 sisi • 12 rusuk • 8 titik sudut",
      caption: "Berhasil! Keenam sisi kembali membentuk kubus.",
    },
  };
  function setBuildState(state) {
    if (!buildStage || !buildObject || !buildCopy[state]) return;
    buildStage.dataset.buildState = state === "rebuild" ? "whole" : state;
    buildStage.dataset.buildAction = state;
    buildStage.querySelectorAll("[data-build-action]").forEach((button) => {
      const active = button.dataset.buildAction === state;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const info = buildCopy[state];
    const kicker = document.getElementById("kubusBuildKicker");
    const title = document.getElementById("kubusBuildTitle");
    const text = document.getElementById("kubusBuildText");
    const fact = document.getElementById("kubusBuildFact");
    if (kicker) kicker.textContent = info.kicker;
    if (title) title.textContent = info.title;
    if (text) text.textContent = info.text;
    if (fact) fact.textContent = info.fact;
    if (buildCaption) buildCaption.textContent = info.caption;
    buildObject
      .querySelectorAll("[data-build-face]")
      .forEach((face) => face.classList.remove("is-picked"));
  }
  buildView
    ?.querySelectorAll("[data-build-action]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        setBuildState(button.dataset.buildAction),
      ),
    );
  buildView?.querySelectorAll("[data-build-face]").forEach((face) =>
    face.addEventListener("click", () => {
      buildObject
        ?.querySelectorAll("[data-build-face]")
        .forEach((item) => item.classList.toggle("is-picked", item === face));
      const side = face.dataset.buildFace;
      if (buildCaption)
        buildCaption.textContent = `Sisi ${side} dipilih — setiap sisi kubus berbentuk persegi.`;
      const title = document.getElementById("kubusBuildTitle");
      const text = document.getElementById("kubusBuildText");
      const kicker = document.getElementById("kubusBuildKicker");
      if (title) title.textContent = `Sisi ${side}`;
      if (text)
        text.textContent =
          "Sisi kubus berbentuk persegi. Keenam sisinya memiliki bentuk dan ukuran yang sama.";
      if (kicker) kicker.textContent = "BAGIAN KUBUS DIPILIH";
    }),
  );
  if (buildScene && buildObject) {
    let dragging = false,
      startX = 0,
      startY = 0,
      rotateX = -23,
      rotateY = -34;
    buildScene.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) return;
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      buildScene.classList.add("is-dragging");
      buildScene.setPointerCapture?.(event.pointerId);
    });
    buildScene.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      rotateY += (event.clientX - startX) * 0.55;
      rotateX -= (event.clientY - startY) * 0.45;
      startX = event.clientX;
      startY = event.clientY;
      buildObject.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    const stopBuildDrag = () => {
      dragging = false;
      buildScene.classList.remove("is-dragging");
    };
    buildScene.addEventListener("pointerup", stopBuildDrag);
    buildScene.addEventListener("pointercancel", stopBuildDrag);
  }
  setBuildState("whole");
  chooseMode("face");

  window.openKubusMaterial = openKubus;
})();
