/* Halaman Video BangunRuang — pemutaran melalui YouTube embed.
   Video ditayangkan dari kanal sumber; tidak mengunduh/menyalin MP4.
*/
(() => {
  const body = document.body;
  const frame = document.getElementById("youtubeFrame");
  const poster = document.getElementById("videoPoster");
  const playButton = document.getElementById("videoBigPlay");
  const previewControls = document.getElementById("videoPreviewControls");
  const previewPlay = document.getElementById("previewPlay");
  const title = document.getElementById("videoTitle");
  const subtitle = document.getElementById("videoSubtitle");
  const source = document.getElementById("videoSource");
  const caption = document.getElementById("videoScreenCaption");
  const list = document.getElementById("videoList");
  const search = document.getElementById("videoSearch");
  const toast = (message) => {
    if (typeof window.showToast === "function") window.showToast(message);
  };

  const catalog = {
    intro: {
      title: "Mengenal Bangun Ruang",
      subtitle: "Video Pembelajaran Matematika • Kelas VII",
      channel: "SayaBisa",
      id: "mSoKyLJehYM",
      start: 0,
      poster: "assets/images/video/thumbnail_mengenal_bangun_ruang.png",
      youtube: "https://www.youtube.com/watch?v=mSoKyLJehYM",
    },
    kubus: {
      title: "Mengenal Kubus",
      subtitle: "Sifat, jaring-jaring, dan rumus kubus",
      channel: "Utak Atik Otak",
      id: "qjGslpQoex0",
      start: 135,
      poster: "assets/images/video/thumbnail_Kubus.png",
      youtube: "https://www.youtube.com/watch?v=qjGslpQoex0&t=135s",
    },
    balok: {
      title: "Mengenal Balok",
      subtitle: "Sifat, jaring-jaring, dan rumus balok",
      channel: "Utak Atik Otak",
      id: "qjGslpQoex0",
      start: 528,
      poster: "assets/images/video/thumbnail_balok.png",
      youtube: "https://www.youtube.com/watch?v=qjGslpQoex0&t=528s",
    },
    prisma: {
      title: "Mengenal Prisma",
      subtitle: "Luas permukaan dan volume prisma",
      channel: "Latihan Berkarya",
      id: "7tifdC9KOtQ",
      start: 0,
      poster: "assets/images/video/thumbnail_Prisma.png",
      youtube: "https://www.youtube.com/watch?v=7tifdC9KOtQ",
    },
    limas: {
      title: "Mengenal Limas",
      subtitle: "Volume dan luas permukaan limas",
      channel: "Latihan Berkarya",
      id: "Am8IVBwuKGs",
      start: 0,
      poster: "assets/images/video/thumbnail_Limas.png",
      youtube: "https://www.youtube.com/watch?v=Am8IVBwuKGs",
    },
    tabung: {
      title: "Mengenal Tabung",
      subtitle: "Bangun ruang sisi lengkung dan rumusnya",
      channel: "SayaBisa",
      id: "mSoKyLJehYM",
      start: 211,
      poster: "assets/images/video/thumbnail_Tabung.png",
      youtube: "https://www.youtube.com/watch?v=mSoKyLJehYM&t=211s",
    },
    kerucut: {
      title: "Mengenal Kerucut",
      subtitle: "Sifat, luas permukaan, dan volume kerucut",
      channel: "SayaBisa",
      id: "GFaObvVkQPI",
      start: 12,
      poster: "assets/images/video/thumbnail_Kerucut.png",
      youtube: "https://www.youtube.com/watch?v=GFaObvVkQPI&t=12s",
    },
    bola: {
      title: "Mengenal Bola",
      subtitle: "Sifat, luas permukaan, dan volume bola",
      channel: "SayaBisa",
      id: "GFaObvVkQPI",
      start: 108,
      poster: "assets/images/video/thumbnail_Bola.png",
      youtube: "https://www.youtube.com/watch?v=GFaObvVkQPI&t=108s",
    },
  };
  let currentId = "intro";
  let liked = false;
  let saved = false;

  function setPlayer(id, autoplay = false) {
    const item = catalog[id];
    if (!item) return;
    currentId = id;
    title.textContent = item.title;
    subtitle.textContent = item.subtitle;
    source.textContent = `Sumber: ${item.channel} • YouTube`;
    caption.textContent = item.title;
    const screen = document.querySelector(".video-screen");
    screen?.classList.toggle("shape-video-screen", id !== "intro");
    poster.src = item.poster;
    poster.alt = `Sampul video ${item.title}`;
    poster.hidden = false;
    frame.hidden = true;
    frame.removeAttribute("src");
    playButton.hidden = false;
    if (previewControls) previewControls.hidden = false;
    document.querySelectorAll(".video-list-item").forEach((button) => {
      const active = button.dataset.videoId === id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (autoplay) playCurrent();
  }

  function playCurrent() {
    const item = catalog[currentId];
    if (!item) return;
    const params = new URLSearchParams({
      autoplay: "1",
      controls: "1",
      rel: "0",
      playsinline: "1",
      start: String(item.start),
      modestbranding: "1",
    });
    frame.src = `https://www.youtube-nocookie.com/embed/${item.id}?${params.toString()}`;
    frame.hidden = false;
    poster.hidden = true;
    playButton.hidden = true;
    if (previewControls) previewControls.hidden = true;
  }

  playButton?.addEventListener("click", playCurrent);
  previewPlay?.addEventListener("click", playCurrent);
  list
    ?.querySelectorAll("[data-video-id]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        setPlayer(button.dataset.videoId, true),
      ),
    );

  document.getElementById("videoOpenYoutube")?.addEventListener("click", () => {
    const item = catalog[currentId];
    window.open(item.youtube, "_blank", "noopener,noreferrer");
  });
  document.getElementById("videoShare")?.addEventListener("click", async () => {
    const item = catalog[currentId];
    try {
      if (navigator.share)
        await navigator.share({
          title: item.title,
          text: `Yuk belajar ${item.title} di BangunRuang!`,
          url: item.youtube,
        });
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(item.youtube);
        toast("Tautan YouTube berhasil disalin.");
      } else toast("Salin tautan video dari tombol YouTube.");
    } catch (_) {
      /* pengguna membatalkan dialog berbagi */
    }
  });
  document.getElementById("videoLike")?.addEventListener("click", (event) => {
    liked = !liked;
    event.currentTarget.classList.toggle("active", liked);
    event.currentTarget.setAttribute("aria-pressed", String(liked));
    event.currentTarget.innerHTML = liked
      ? "♥ <span>Disukai</span>"
      : "♡ <span>Suka</span>";
    toast(liked ? "Video ditandai disukai." : "Tanda suka dibatalkan.");
  });
  document.getElementById("videoSave")?.addEventListener("click", (event) => {
    saved = !saved;
    event.currentTarget.classList.toggle("active", saved);
    event.currentTarget.setAttribute("aria-pressed", String(saved));
    event.currentTarget.innerHTML = saved
      ? "✓ <span>Disimpan</span>"
      : "♧ <span>Simpan</span>";
    try {
      const savedItems = JSON.parse(
        localStorage.getItem("bangunruangSavedVideos") || "[]",
      );
      const next = saved
        ? [...new Set([...savedItems, currentId])]
        : savedItems.filter((id) => id !== currentId);
      localStorage.setItem("bangunruangSavedVideos", JSON.stringify(next));
    } catch (_) {
      /* penyimpanan lokal tidak tersedia */
    }
    toast(
      saved
        ? "Video ditambahkan ke daftar simpan."
        : "Video dihapus dari daftar simpan.",
    );
  });
  search?.addEventListener("input", () => {
    const query = search.value.trim().toLocaleLowerCase("id");
    let visible = 0;
    list.querySelectorAll("[data-video-id]").forEach((button) => {
      const item = catalog[button.dataset.videoId];
      const matches = `${item.title} ${item.subtitle} ${item.channel}`
        .toLocaleLowerCase("id")
        .includes(query);
      button.hidden = !matches;
      if (matches) visible++;
    });
    if (!visible && query)
      toast("Video tidak ditemukan. Coba kata kunci lain.");
  });

  document.querySelectorAll('[data-page="Video"]').forEach((button) =>
    button.addEventListener("click", () => {
      body.classList.remove("page-materi", "page-explorasi3d");
      body.classList.add("page-video");
      if (search) search.value = "";
      list
        .querySelectorAll("[data-video-id]")
        .forEach((item) => (item.hidden = false));
      setPlayer(currentId, false);
    }),
  );
  document
    .querySelectorAll('[data-page]:not([data-page="Video"])')
    .forEach((button) =>
      button.addEventListener("click", () => {
        body.classList.remove("page-video");
        if (frame) {
          frame.removeAttribute("src");
          frame.hidden = true;
        }
      }),
    );
  if (new URLSearchParams(location.search).get("page") === "video") {
    body.classList.add("page-video");
    document
      .querySelectorAll(".nav-link")
      .forEach((link) =>
        link.classList.toggle("active", link.dataset.page === "Video"),
      );
  }
  // Rapikan thumbnail daftar: ikon bangun ruang berada di tengah
  // dan label durasi tidak ditampilkan pada setiap kartu.
  list?.querySelectorAll(".video-list-item").forEach((button) => {
    const thumb = button.querySelector(".video-thumb");
    if (!thumb) return;

    if (button.dataset.videoId !== "intro") {
      thumb.classList.add("shape-thumb");
    }

    thumb.querySelectorAll(".video-duration").forEach((duration) => {
      duration.remove();
    });
  });

  setPlayer("intro", false);
})();
