/* Interaksi khusus halaman Eksplorasi 3D BangunRuang */
(() => {
  const body = document.body;
  const viewer = document.getElementById("shapeViewer");
  const search = document.getElementById("searchInput");
  const shapeButtons = [...document.querySelectorAll(".shape-option")];
  const loading = document.getElementById("modelLoading");
  const stage = document.getElementById("modelStage");

  if (!viewer || !stage) return;

  // Batasi zoom kamera termasuk ketika pengguna memakai scroll atau pinch.
  viewer.setAttribute("min-camera-orbit", "auto auto 1.9m");
  viewer.setAttribute("max-camera-orbit", "auto auto 6.2m");

  const shapes = {
    kubus: {
      name: "Kubus", file: "kubus.glb", icon: "01_Kubus.png",
      description: "Kubus adalah bangun ruang yang memiliki 6 sisi berbentuk persegi dengan ukuran yang sama. Semua rusuknya sama panjang.",
      faces: "6", edges: "12", vertices: "8", orbit: "35deg 72deg 3.1m"
    },
    balok: {
      name: "Balok", file: "balok.glb", icon: "02_Balok.png",
      description: "Balok memiliki 6 sisi berbentuk persegi panjang. Sisi-sisi yang berhadapan memiliki bentuk dan ukuran yang sama.",
      faces: "6", edges: "12", vertices: "8", orbit: "35deg 72deg 3.6m"
    },
    prisma: {
      name: "Prisma Segitiga", file: "prisma.glb", icon: "03_Prisma.png",
      description: "Prisma segitiga memiliki dua sisi alas dan tutup berbentuk segitiga yang sejajar dan sama besar, serta tiga sisi tegak berbentuk persegi panjang.",
      faces: "5", edges: "9", vertices: "6", orbit: "35deg 72deg 3.7m"
    },
    limas: {
      name: "Limas Segiempat", file: "limas.glb", icon: "04_Limas.png",
      description: "Limas segiempat memiliki alas berbentuk persegi dan empat sisi tegak berbentuk segitiga yang bertemu pada satu titik puncak.",
      faces: "5", edges: "8", vertices: "5", orbit: "35deg 72deg 3.7m"
    },
    tabung: {
      name: "Tabung", file: "tabung.glb", icon: "05_Tabung.png",
      description: "Tabung memiliki dua sisi datar berbentuk lingkaran yang sejajar serta satu sisi lengkung yang menyelimuti bagian samping.",
      faces: "3", edges: "2", vertices: "0", orbit: "35deg 72deg 3.5m"
    },
    kerucut: {
      name: "Kerucut", file: "kerucut.glb", icon: "06_Kerucut.png",
      description: "Kerucut memiliki alas berbentuk lingkaran, satu sisi lengkung, dan satu titik puncak.",
      faces: "2", edges: "1", vertices: "1", orbit: "35deg 72deg 3.7m"
    },
    bola: {
      name: "Bola", file: "bola.glb", icon: "07_Bola.png",
      description: "Bola merupakan bangun ruang sisi lengkung yang seluruh permukaannya melengkung dan setiap titik pada permukaannya berjarak sama dari titik pusat.",
      facesLabel: "Jumlah Sisi Lengkung", faces: "1", edges: "0", vertices: "0", orbit: "35deg 72deg 4.1m"
    }
  };

  const iconBase = "assets/images/Eksplorasi3D/";
  const modelBase = "assets/models/bangun-ruang/";
  let currentKey = "kubus";
  let rotating = true;
  let moveMode = false;

  function toast(message) {
    if (typeof window.showToast === "function") window.showToast(message);
  }

  function selectShape(key) {
    const data = shapes[key];
    if (!data) return;
    currentKey = key;

    shapeButtons.forEach(button => {
      const active = button.dataset.shape === key;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.getElementById("stageShapeName").textContent = data.name;
    document.getElementById("infoShapeName").textContent = data.name;
    document.getElementById("stageShapeIcon").src = iconBase + data.icon;
    document.getElementById("shapeDescription").textContent = data.description;
    document.getElementById("statFacesLabel").textContent = data.facesLabel || "Jumlah Sisi";
    document.getElementById("statFaces").textContent = data.faces;
    document.getElementById("statEdges").textContent = data.edges;
    document.getElementById("statVertices").textContent = data.vertices;

    loading.classList.remove("is-hidden");
    viewer.setAttribute("alt", "Model 3D " + data.name);
    viewer.setAttribute("src", modelBase + data.file);
    // Kembalikan skala awal sebelum model baru dimuat agar ukuran model
    // sebelumnya tidak terbawa ke bangun ruang berikutnya.
    viewer.scale = "1 1 1";
    viewer.setAttribute("camera-orbit", data.orbit);
    viewer.setAttribute("camera-target", "auto auto auto");
    viewer.setAttribute("auto-rotate", "");
    viewer.setAttribute("auto-rotate-delay", "0");
    viewer.setAttribute("rotation-per-second", "24deg");
    rotating = true;
    document.querySelector('[data-control="rotate"]').classList.add("active");
    moveMode = false;
    viewer.classList.remove("is-panning");
    document.querySelector('[data-control="move"]').classList.remove("active");
  }

  shapeButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectShape(button.dataset.shape);
      toast("Objek " + shapes[button.dataset.shape].name + " dipilih. Ayo amati bentuknya!");
    });
  });

  // Navigasi halaman dikelola terpisah dari app.js agar fitur eksplorasi tidak mengubah halaman lain.
  document.addEventListener("click", event => {
    const nav = event.target.closest("[data-page]");
    if (!nav) return;
    const page = nav.dataset.page;
    body.classList.toggle("page-explorasi3d", page === "Eksplorasi 3D");
  }, true);

  viewer.addEventListener("load", () => {
    loading.classList.add("is-hidden");
    // Normalisasi ukuran fisik model GLB. Beberapa file memiliki satuan
    // ekspor berbeda sehingga tampak jauh lebih besar/kecil dari model lain.
    try {
      const dimensions = viewer.getDimensions();
      const largestSide = Math.max(dimensions.x, dimensions.y, dimensions.z);
      if (Number.isFinite(largestSide) && largestSide > 0) {
        const uniformScale = Math.max(0.1, Math.min(10, 1.55 / largestSide));
        viewer.scale = `${uniformScale} ${uniformScale} ${uniformScale}`;
      }
    } catch (_) {
      // Jika metadata ukuran model tidak tersedia, gunakan skala bawaan GLB.
    }
  });
  viewer.addEventListener("error", () => {
    loading.textContent = "Model belum dapat dimuat. Periksa koneksi atau folder model.";
    loading.classList.remove("is-hidden");
  });

  function cameraOrbit() {
    try { return viewer.getCameraOrbit(); }
    catch (_) { return { theta: 0.6, phi: 1.25, radius: 3.2 }; }
  }
  const MIN_CAMERA_RADIUS = 1.9;
  const MAX_CAMERA_RADIUS = 6.2;

  function setRadius(radius) {
    const orbit = cameraOrbit();
    const currentRadius = Number.isFinite(orbit.radius) ? orbit.radius : 3.5;
    const safeRadius = Math.max(MIN_CAMERA_RADIUS, Math.min(MAX_CAMERA_RADIUS, radius || currentRadius));
    viewer.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${safeRadius}m`;
  }

  // Mode Geser menggeser titik pandang kamera pada bidang layar (pan),
  // bukan mengubah rotasi atau posisi file model 3D.
  let panPointerId = null;
  let panStartX = 0;
  let panStartY = 0;
  let panStartTarget = null;
  let panStartOrbit = null;

  function readCameraTarget() {
    try {
      const target = viewer.getCameraTarget();
      if (target && [target.x, target.y, target.z].every(Number.isFinite)) {
        return { x: target.x, y: target.y, z: target.z };
      }
    } catch (_) {}
    return { x: 0, y: 0, z: 0 };
  }

  function updatePan(event) {
    if (!moveMode || panPointerId !== event.pointerId || !panStartTarget || !panStartOrbit) return;
    const rect = viewer.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dx = event.clientX - panStartX;
    const dy = event.clientY - panStartY;
    const radius = Number.isFinite(panStartOrbit.radius) ? panStartOrbit.radius : 3.5;
    const worldPerPixel = (radius * 1.7) / rect.height;
    const theta = panStartOrbit.theta;
    const phi = panStartOrbit.phi;

    // Vektor kanan dan atas kamera untuk gerakan yang terasa alami.
    const rightX = Math.cos(theta);
    const rightZ = -Math.sin(theta);
    const upX = -Math.cos(phi) * Math.sin(theta);
    const upY = Math.sin(phi);
    const upZ = -Math.cos(phi) * Math.cos(theta);

    const moveX = (-dx * rightX + dy * upX) * worldPerPixel;
    const moveY = (dy * upY) * worldPerPixel;
    const moveZ = (-dx * rightZ + dy * upZ) * worldPerPixel;

    viewer.cameraTarget = `${panStartTarget.x + moveX}m ${panStartTarget.y + moveY}m ${panStartTarget.z + moveZ}m`;
  }

  viewer.addEventListener("pointerdown", event => {
    if (!moveMode || (event.pointerType === "mouse" && event.button !== 0)) return;
    panPointerId = event.pointerId;
    panStartX = event.clientX;
    panStartY = event.clientY;
    panStartTarget = readCameraTarget();
    panStartOrbit = cameraOrbit();
    try { viewer.setPointerCapture(event.pointerId); } catch (_) {}
    event.preventDefault();
  }, true);

  viewer.addEventListener("pointermove", event => {
    if (panPointerId !== event.pointerId) return;
    updatePan(event);
    event.preventDefault();
  }, true);

  function finishPan(event) {
    if (panPointerId !== event.pointerId) return;
    try { viewer.releasePointerCapture(event.pointerId); } catch (_) {}
    panPointerId = null;
    panStartTarget = null;
    panStartOrbit = null;
  }
  viewer.addEventListener("pointerup", finishPan, true);
  viewer.addEventListener("pointercancel", finishPan, true);
  viewer.addEventListener("lostpointercapture", finishPan, true);

  document.querySelectorAll("[data-control]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.control;
      if (action === "rotate") {
        rotating = !rotating;
        if (rotating) {
          viewer.setAttribute("auto-rotate", "");
          viewer.setAttribute("auto-rotate-delay", "0");
          viewer.setAttribute("rotation-per-second", "24deg");
        } else viewer.removeAttribute("auto-rotate");
        button.classList.toggle("active", rotating);
        toast(rotating ? "Putar otomatis diaktifkan." : "Putar otomatis dijeda.");
      } else if (action === "zoom-in") {
        setRadius(cameraOrbit().radius - 0.35);
      } else if (action === "zoom-out") {
        setRadius(cameraOrbit().radius + 0.35);
      } else if (action === "move") {
        moveMode = !moveMode;
        viewer.classList.toggle("is-panning", moveMode);
        button.classList.toggle("active", moveMode);
        if (!moveMode) {
          panPointerId = null;
          panStartTarget = null;
          panStartOrbit = null;
        }
        toast(moveMode
          ? "Mode geser aktif: sentuh atau klik-tahan lalu seret objek."
          : "Mode geser dinonaktifkan.");
      } else if (action === "reset") {
        viewer.cameraOrbit = shapes[currentKey].orbit;
        viewer.cameraTarget = "auto auto auto";
        rotating = true;
        viewer.setAttribute("auto-rotate", "");
        viewer.setAttribute("auto-rotate-delay", "0");
        viewer.setAttribute("rotation-per-second", "24deg");
        document.querySelector('[data-control="rotate"]').classList.add("active");
        moveMode = false;
        viewer.classList.remove("is-panning");
        panPointerId = null;
        panStartTarget = null;
        panStartOrbit = null;
        document.querySelector('[data-control="move"]').classList.remove("active");
        toast("Tampilan objek dikembalikan seperti semula.");
      }
    });
  });

  document.getElementById("stageFullscreen").addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) await stage.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) { toast("Mode layar penuh tidak tersedia di browser ini."); }
  });

  if (search) {
    search.addEventListener("input", () => {
      if (!body.classList.contains("page-explorasi3d")) return;
      const query = search.value.trim().toLocaleLowerCase("id");
      let visible = 0;
      shapeButtons.forEach(button => {
        const visibleNow = shapes[button.dataset.shape].name.toLocaleLowerCase("id").includes(query)
          || button.dataset.shape.includes(query);
        button.hidden = !visibleNow;
        if (visibleNow) visible++;
      });
      if (!visible && query) toast("Objek bangun ruang tidak ditemukan.");
    });
  }

  document.querySelectorAll('[data-page="Eksplorasi 3D"]').forEach(control => {
    control.addEventListener("click", () => {
      body.classList.add("page-explorasi3d");
      if (search) {
        search.value = "";
        shapeButtons.forEach(button => button.hidden = false);
      }
    });
  });
})();
