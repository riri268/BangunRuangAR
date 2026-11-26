/* Kuis BangunRuang — evaluasi pemahaman (terpisah dari Latihan Soal). */
(() => {
  const $ = (id) => document.getElementById(id);
  const body = document.body;
  const view = $("kuisView");
  if (!view) return;
  const home = $("kuisHome"),
    setup = $("kuisSetup"),
    play = $("kuisPlay"),
    result = $("kuisResult");
  const topicSelect = $("kuisTopic");
  const shapeAssetInfo = {
    Kubus: { file: "kubus.glb", icon: "01_Kubus.png" },
    Balok: { file: "balok.glb", icon: "02_Balok.png" },
    Prisma: { file: "prisma.glb", icon: "03_Prisma.png" },
    Limas: { file: "limas.glb", icon: "04_Limas.png" },
    Tabung: { file: "tabung.glb", icon: "05_Tabung.png" },
    Kerucut: { file: "kerucut.glb", icon: "06_Kerucut.png" },
    Bola: { file: "bola.glb", icon: "07_Bola.png" },
  };
  function updateSetupShape(topic) {
    const asset = shapeAssetInfo[topic] || shapeAssetInfo.Kubus;
    const model = $("kuisSetupModel");
    const icon = $("kuisTopicIcon");
    const caption = $("kuisModelCaption");

    if (model) {
      const nextSrc = `assets/models/bangun-ruang/${asset.file}`;

      // Samakan aturan kamera dengan halaman Eksplorasi 3D.
      model.setAttribute("camera-controls", "");
      model.setAttribute("touch-action", "pan-y");
      model.setAttribute("min-camera-orbit", "auto auto 1.9m");
      model.setAttribute("max-camera-orbit", "auto auto 6.2m");
      model.setAttribute("camera-orbit", "35deg 72deg 3.1m");
      model.setAttribute("camera-target", "auto auto auto");
      model.setAttribute("field-of-view", "32deg");
      model.setAttribute("auto-rotate", "");
      model.setAttribute("auto-rotate-delay", "0");
      model.setAttribute("rotation-per-second", "24deg");
      model.setAttribute("interaction-prompt", "none");
      model.removeAttribute("disable-zoom");

      // Normalisasi ukuran GLB dilakukan setiap kali model selesai dimuat,
      // agar semua bangun ruang tampil pada skala yang relatif konsisten.
      if (!model.dataset.kuisCameraReady) {
        model.addEventListener("load", () => {
          try {
            const dimensions = model.getDimensions();
            const largestSide = Math.max(
              dimensions.x,
              dimensions.y,
              dimensions.z,
            );
            if (Number.isFinite(largestSide) && largestSide > 0) {
              const uniformScale = Math.max(
                0.1,
                Math.min(10, 1.55 / largestSide),
              );
              model.scale = `${uniformScale} ${uniformScale} ${uniformScale}`;
            }
          } catch (_) {
            // Gunakan skala bawaan GLB jika dimensi model tidak tersedia.
          }

          model.setAttribute("camera-orbit", "35deg 72deg 3.1m");
          model.setAttribute("camera-target", "auto auto auto");
          model.setAttribute("auto-rotate", "");
          model.setAttribute("auto-rotate-delay", "0");
          model.setAttribute("rotation-per-second", "24deg");
        });
        model.dataset.kuisCameraReady = "true";
      }

      // Reset skala sebelum mengganti objek agar skala objek sebelumnya
      // tidak terbawa ke model berikutnya.
      model.scale = "1 1 1";
      if (model.getAttribute("src") !== nextSrc) {
        model.setAttribute("src", nextSrc);
      }
      model.setAttribute("alt", `Model 3D ${topic}`);
    }

    if (icon) {
      icon.src = `assets/images/kuis/tampilankuis/${asset.icon}`;
      icon.alt = `Ikon ${topic}`;
    }
    if (caption) caption.textContent = `${topic} 3D Interaktif`;
  }
  const topics = [
    "Kubus",
    "Balok",
    "Prisma",
    "Limas",
    "Tabung",
    "Kerucut",
    "Bola",
  ];
  const bank = {
    Kubus: [
      [
        "Kubus memiliki ... sisi berbentuk persegi.",
        ["4", "6", "8", "12"],
        1,
        "Kubus mempunyai enam sisi persegi yang sama besar.",
        "C1",
      ],
      [
        "Jika panjang rusuk kubus 5 cm, volumenya adalah ...",
        ["25 cm³", "75 cm³", "125 cm³", "150 cm³"],
        2,
        "Volume kubus = s × s × s = 5 × 5 × 5 = 125 cm³.",
        "C2",
      ],
      [
        "Kubus memiliki ... rusuk.",
        ["6", "8", "10", "12"],
        3,
        "Kubus memiliki 12 rusuk dengan panjang sama.",
        "C1",
      ],
      [
        "Luas permukaan kubus dengan rusuk 4 cm adalah ...",
        ["64 cm²", "80 cm²", "96 cm²", "128 cm²"],
        2,
        "Luas permukaan = 6 × 4² = 96 cm².",
        "C3",
      ],
      [
        "Volume kubus 216 cm³. Panjang rusuknya adalah ...",
        ["4 cm", "5 cm", "6 cm", "8 cm"],
        2,
        "Akar pangkat tiga dari 216 adalah 6.",
        "C3",
      ],
    ],
    Balok: [
      [
        "Balok mempunyai ... sisi.",
        ["4", "6", "8", "12"],
        1,
        "Balok memiliki enam sisi berbentuk persegi panjang atau pasangan persegi panjang.",
        "C1",
      ],
      [
        "Balok berukuran 8 cm × 4 cm × 3 cm. Volumenya ...",
        ["48 cm³", "72 cm³", "96 cm³", "120 cm³"],
        2,
        "Volume = p × l × t = 8 × 4 × 3 = 96 cm³.",
        "C2",
      ],
      [
        "Banyak rusuk pada balok adalah ...",
        ["8", "10", "12", "14"],
        2,
        "Balok memiliki 12 rusuk.",
        "C1",
      ],
      [
        "Luas permukaan balok 5 × 3 × 2 cm adalah ...",
        ["52 cm²", "62 cm²", "72 cm²", "82 cm²"],
        1,
        "2(pl + pt + lt) = 2(15 + 10 + 6) = 62 cm².",
        "C3",
      ],
      [
        "Volume balok 240 cm³, panjang 10 cm dan lebar 6 cm. Tingginya ...",
        ["2 cm", "3 cm", "4 cm", "5 cm"],
        2,
        "Tinggi = 240 ÷ (10 × 6) = 4 cm.",
        "C3",
      ],
    ],
    Prisma: [
      [
        "Prisma segitiga memiliki ... sisi.",
        ["4", "5", "6", "7"],
        1,
        "Prisma segitiga memiliki 2 sisi segitiga dan 3 sisi tegak.",
        "C1",
      ],
      [
        "Volume prisma = ...",
        [
          "Luas alas × tinggi",
          "Keliling alas × tinggi",
          "½ × alas × tinggi",
          "Panjang × lebar",
        ],
        0,
        "Volume prisma diperoleh dari luas alas dikalikan tinggi prisma.",
        "C2",
      ],
      [
        "Alas prisma segitiga memiliki luas 12 cm² dan tinggi prisma 8 cm. Volumenya ...",
        ["20 cm³", "48 cm³", "96 cm³", "120 cm³"],
        2,
        "12 × 8 = 96 cm³.",
        "C3",
      ],
      [
        "Prisma segilima memiliki ... sisi tegak.",
        ["3", "4", "5", "6"],
        2,
        "Jumlah sisi tegak prisma sama dengan jumlah sisi pada alasnya.",
        "C2",
      ],
      [
        "Jika luas alas prisma tetap dan tinggi menjadi dua kali, volumenya ...",
        ["Tetap", "Setengah", "Dua kali", "Empat kali"],
        2,
        "Volume berbanding lurus dengan tinggi prisma.",
        "C3",
      ],
    ],
    Limas: [
      [
        "Limas segiempat memiliki ... sisi.",
        ["4", "5", "6", "8"],
        1,
        "Limas segiempat memiliki satu alas dan empat sisi tegak.",
        "C1",
      ],
      [
        "Volume limas adalah ...",
        [
          "Luas alas × tinggi",
          "⅓ × luas alas × tinggi",
          "½ × luas alas × tinggi",
          "3 × luas alas × tinggi",
        ],
        1,
        "Volume limas adalah sepertiga hasil kali luas alas dan tinggi.",
        "C2",
      ],
      [
        "Luas alas limas 36 cm² dan tinggi 9 cm. Volumenya ...",
        ["108 cm³", "162 cm³", "216 cm³", "324 cm³"],
        0,
        "⅓ × 36 × 9 = 108 cm³.",
        "C3",
      ],
      [
        "Limas segitiga memiliki ... titik sudut.",
        ["3", "4", "5", "6"],
        1,
        "Limas segitiga memiliki tiga titik sudut pada alas dan satu puncak.",
        "C2",
      ],
      [
        "Jika tinggi limas menjadi tiga kali sedangkan alas tetap, volumenya ...",
        ["⅓ kali", "Tetap", "2 kali", "3 kali"],
        3,
        "Volume sebanding dengan tinggi jika luas alas tidak berubah.",
        "C3",
      ],
    ],
    Tabung: [
      [
        "Tabung memiliki ... sisi.",
        ["2", "3", "4", "5"],
        1,
        "Tabung mempunyai dua sisi datar berbentuk lingkaran dan satu sisi lengkung.",
        "C1",
      ],
      [
        "Rumus volume tabung adalah ...",
        ["πr²t", "2πrt", "πrt²", "2πr²"],
        0,
        "Volume tabung = luas alas lingkaran × tinggi = πr²t.",
        "C2",
      ],
      [
        "Jari-jari tabung 7 cm dan tinggi 10 cm. Gunakan π=22/7. Volumenya ...",
        ["770 cm³", "1.100 cm³", "1.540 cm³", "2.200 cm³"],
        2,
        "π × 7² × 10 = 1.540 cm³.",
        "C3",
      ],
      [
        "Jika jari-jari tabung menjadi dua kali dan tinggi tetap, volume menjadi ...",
        ["2 kali", "3 kali", "4 kali", "8 kali"],
        2,
        "Volume bergantung pada kuadrat jari-jari, sehingga menjadi empat kali.",
        "C4",
      ],
      [
        "Tabung dan prisma memiliki tinggi dan luas alas sama. Volume keduanya ...",
        [
          "Tabung lebih besar",
          "Prisma lebih besar",
          "Sama",
          "Tidak dapat dibandingkan",
        ],
        2,
        "Keduanya dihitung dari luas alas dikali tinggi.",
        "C4",
      ],
    ],
    Kerucut: [
      [
        "Kerucut memiliki ... titik puncak.",
        ["0", "1", "2", "3"],
        1,
        "Kerucut memiliki satu titik puncak.",
        "C1",
      ],
      [
        "Volume kerucut adalah ...",
        ["πr²t", "⅓πr²t", "2πrt", "πrl"],
        1,
        "Volume kerucut sepertiga volume tabung dengan alas dan tinggi sama.",
        "C2",
      ],
      [
        "Jari-jari kerucut 3 cm dan tinggi 4 cm. Volumenya ...",
        ["12π cm³", "18π cm³", "24π cm³", "36π cm³"],
        0,
        "⅓ × π × 3² × 4 = 12π cm³.",
        "C3",
      ],
      [
        "Kerucut dan tabung memiliki alas serta tinggi sama. Perbandingan volumenya (kerucut : tabung) ...",
        ["1 : 2", "1 : 3", "2 : 3", "3 : 1"],
        1,
        "Volume kerucut adalah sepertiga volume tabung.",
        "C4",
      ],
      [
        "Garis dari puncak kerucut ke tepi lingkaran alas disebut ...",
        ["Jari-jari", "Diameter", "Garis pelukis", "Tinggi"],
        2,
        "Garis pelukis menghubungkan puncak dengan titik pada keliling alas.",
        "C2",
      ],
    ],
    Bola: [
      [
        "Bola memiliki ... sisi lengkung.",
        ["1", "2", "3", "Tidak memiliki sisi"],
        0,
        "Bola memiliki satu sisi lengkung.",
        "C1",
      ],
      [
        "Rumus volume bola adalah ...",
        ["πr²", "2πr", "⅓πr³", "4/3πr³"],
        3,
        "Volume bola = 4/3 × π × r³.",
        "C2",
      ],
      [
        "Jari-jari bola 3 cm. Volumenya ...",
        ["12π cm³", "24π cm³", "36π cm³", "48π cm³"],
        2,
        "4/3 × π × 3³ = 36π cm³.",
        "C3",
      ],
      [
        "Jika jari-jari bola menjadi dua kali, volumenya menjadi ...",
        ["2 kali", "4 kali", "6 kali", "8 kali"],
        3,
        "Volume bola sebanding dengan pangkat tiga jari-jari: 2³ = 8.",
        "C4",
      ],
      [
        "Diameter bola 14 cm. Jari-jarinya adalah ...",
        ["5 cm", "6 cm", "7 cm", "14 cm"],
        2,
        "Jari-jari adalah setengah diameter, yaitu 7 cm.",
        "C2",
      ],
    ],
  };
  const typeInfo = {
    materi: {
      title: "Kuis Per Materi",
      desc: "Pilih satu bangun ruang untuk mengukur pemahamanmu. Terdiri dari 5 soal.",
      icon: "assets/images/kuis/icon_kuispermateri.png",
      count: 5,
    },
    campuran: {
      title: "Kuis Campuran",
      desc: "Uji kemampuanmu pada berbagai bangun ruang dalam satu sesi. Terdiri dari 10 soal.",
      icon: "assets/images/kuis/icon_kuiscampuran.png",
      count: 10,
    },
    tantangan: {
      title: "Kuis Tantangan",
      desc: "Hadapi soal penalaran dengan tingkat kognitif lebih tinggi. Terdiri dari 10 soal.",
      icon: "assets/images/kuis/icontantangan.png",
      count: 10,
    },
  };
  let selectedType = "materi",
    questions = [],
    index = 0,
    score = 0,
    answers = [],
    timer = null,
    seconds = 600,
    isPaused = false;
  const showToast = (msg) => {
    if (typeof window.showToast === "function") window.showToast(msg);
  };
  const showOnly = (target) => {
    [home, setup, play, result].forEach((el) => (el.hidden = el !== target));
  };
  function openKuis() {
    body.classList.remove(
      "page-materi",
      "page-explorasi3d",
      "page-video",
      "page-latihan-soal",
    );
    body.classList.add("page-kuis");
    showOnly(home);
  }
  document.querySelectorAll("[data-page]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.dataset.page === "Kuis") {
        openKuis();
        showToast("Pilih jenis kuis yang ingin kamu kerjakan.");
      } else body.classList.remove("page-kuis");
    }),
  );
  document.querySelectorAll("[data-quiz]").forEach((btn) =>
    btn.addEventListener("click", () => {
      selectedType = btn.dataset.quiz;
      const info = typeInfo[selectedType];
      $("kuisSetupTitle").textContent = info.title;
      $("kuisSetupDescription").textContent = info.desc;
      $("kuisCountLabel").textContent = `${info.count} soal`;
      topicSelect.disabled = selectedType !== "materi";
      topicSelect.value = "Kubus";
      updateSetupShape(topicSelect.value);
      showOnly(setup);
    }),
  );
  topicSelect.addEventListener("change", () =>
    updateSetupShape(topicSelect.value),
  );
  updateSetupShape(topicSelect.value);
  $("kuisBack").addEventListener("click", () => showOnly(home));
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function startQuiz() {
    let pool =
      selectedType === "materi"
        ? bank[topicSelect.value]
        : topics.flatMap((t) => bank[t].map((q) => ({ ...q, topic: t })));
    if (selectedType === "tantangan")
      pool = pool.filter((q) => ["C3", "C4", "C5"].includes(q[4]));
    questions = shuffle(pool)
      .slice(0, typeInfo[selectedType].count)
      .map((q) => ({
        topic: q.topic || topicSelect.value,
        prompt: q[0],
        choices: q[1],
        answer: q[2],
        explanation: q[3],
        level: q[4] || q[5],
      }));
    if (selectedType === "materi")
      questions = questions.map((q) => ({ ...q, topic: topicSelect.value }));
    index = 0;
    score = 0;
    answers = [];
    seconds = 600;
    isPaused = false;
    $("kuisPlayName").textContent = typeInfo[selectedType].title;
    $("kuisScoreLive").textContent = "0";
    $("kuisPause").textContent = "Ⅱ";
    $("kuisPauseScreen").hidden = true;
    showOnly(play);
    renderQuestion();
    startTimer();
  }
  $("kuisConfirm").addEventListener("click", startQuiz);
  function startTimer() {
    clearInterval(timer);
    const timerEl = $("kuisTimer");
    const warnings = {
      120: "Waktu tersisa 2 menit. Periksa kembali jawabanmu, ya!",
      60: "Satu menit lagi! Segera selesaikan kuis.",
      30: "30 detik terakhir! Pilih jawabanmu sekarang.",
    };
    timerEl.classList.remove("timer-warning", "timer-critical");
    timerEl.setAttribute("role", "status");
    timerEl.setAttribute("aria-live", "polite");
    timerEl.textContent = "10:00";
    timer = setInterval(() => {
      if (isPaused) return;
      seconds--;
      const m = String(Math.floor(seconds / 60)).padStart(2, "0"),
        s = String(seconds % 60).padStart(2, "0");
      timerEl.textContent = `${m}:${s}`;
      if (seconds === 120 || seconds === 60 || seconds === 30) {
        timerEl.classList.add("timer-warning");
        if (seconds <= 60) timerEl.classList.add("timer-critical");
        showToast(warnings[seconds]);
      }
      if (seconds <= 0) {
        clearInterval(timer);
        finishQuiz(true);
      }
    }, 1000);
  }
  function renderQuestion() {
    const q = questions[index];
    $("kuisQuestionTopic").textContent = q.topic.toUpperCase();
    $("kuisQuestionCount").textContent =
      `Soal ${index + 1} dari ${questions.length}`;
    $("kuisScoreLive").textContent = score;
    const shapeFiles = {
      Kubus: "01_Kubus.png",
      Balok: "02_Balok.png",
      Prisma: "03_Prisma.png",
      Limas: "04_Limas.png",
      Tabung: "05_Tabung.png",
      Kerucut: "06_Kerucut.png",
      Bola: "07_Bola.png",
    };
    $("kuisShapeArt").src =
      `assets/images/kuis/tampilankuis/${shapeFiles[q.topic] || shapeFiles.Kubus}`;
    $("kuisShapeArt").alt = `Ilustrasi ${q.topic}`;
    $("kuisLevel").textContent = `Level Kognitif ${q.level}`;
    $("kuisQuestionText").textContent = q.prompt;
    $("kuisProgress").style.width = `${(index / questions.length) * 100}%`;
    $("kuisFeedback").hidden = true;
    $("kuisNext").disabled = true;
    $("kuisNext").textContent =
      index === questions.length - 1 ? "Lihat Hasil ➜" : "Soal Berikutnya ➜";
    const labels = ["A", "B", "C", "D"];
    $("kuisAnswers").innerHTML = "";
    q.choices.forEach((choice, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "kuis-answer";
      b.innerHTML = `<b>${labels[i]}</b><span></span>`;
      b.querySelector("span").textContent = choice;
      b.addEventListener("click", () => chooseAnswer(i));
      $("kuisAnswers").appendChild(b);
    });
  }
  function chooseAnswer(choice) {
    const q = questions[index];
    if (answers[index] !== undefined) return;
    answers[index] = choice;
    const correct = choice === q.answer;
    if (correct) score += 20;
    $("kuisScoreLive").textContent = score;
    [...$("kuisAnswers").children].forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add("correct");
      if (i === choice && !correct) b.classList.add("wrong");
    });
    $("kuisFeedback").hidden = false;
    $("kuisFeedback").textContent =
      `${correct ? "✓ Tepat sekali!" : "Belum tepat."} ${q.explanation}`;
    $("kuisNext").disabled = false;
    $("kuisProgress").style.width =
      `${((index + 1) / questions.length) * 100}%`;
  }
  $("kuisNext").addEventListener("click", () => {
    if (index < questions.length - 1) {
      index++;
      renderQuestion();
    } else finishQuiz(false);
  });
  function finishQuiz(timeout) {
    clearInterval(timer);
    isPaused = false;
    $("kuisPauseScreen").hidden = true;
    $("kuisTimer").classList.remove("timer-warning", "timer-critical");
    showOnly(result);
    const maxScore = questions.length * 20;
    const percent = Math.round((score / maxScore) * 100);
    $("kuisScore").textContent = score;
    $("kuisResultTitle").textContent =
      percent >= 80
        ? "Hebat! Pemahamanmu sangat baik!"
        : percent >= 60
          ? "Bagus! Terus tingkatkan pemahamanmu."
          : "Tetap semangat! Ayo pelajari kembali materinya.";
    $("kuisResultSummary").textContent =
      `Kamu memperoleh ${score} dari ${maxScore} poin (${percent}%).${timeout ? " Waktu pengerjaan telah habis." : ""}`;
    $("kuisReviewList").hidden = true;
  }
  $("kuisQuit").addEventListener("click", () => {
    if (
      !window.confirm(
        "Keluar dari kuis sekarang? Progres jawaban sesi ini tidak akan disimpan.",
      )
    )
      return;
    clearInterval(timer);
    isPaused = false;
    $("kuisPauseScreen").hidden = true;
    $("kuisTimer").classList.remove("timer-warning", "timer-critical");
    showOnly(home);
  });
  $("kuisPause").addEventListener("click", () => {
    isPaused = !isPaused;
    $("kuisPauseScreen").hidden = !isPaused;
    $("kuisPause").textContent = isPaused ? "▶" : "Ⅱ";
    $("kuisPause").setAttribute(
      "aria-label",
      isPaused ? "Lanjutkan kuis" : "Jeda kuis",
    );
  });
  $("kuisResume").addEventListener("click", () => {
    isPaused = false;
    $("kuisPauseScreen").hidden = true;
    $("kuisPause").textContent = "Ⅱ";
    $("kuisPause").setAttribute("aria-label", "Jeda kuis");
  });
  $("kuisReview").addEventListener("click", () => {
    const box = $("kuisReviewList");
    box.innerHTML = "";
    questions.forEach((q, i) => {
      const item = document.createElement("article");
      item.className = "kuis-review-item";
      const title = document.createElement("strong");
      title.textContent = `${i + 1}. ${q.topic} — ${q.prompt}`;
      const p = document.createElement("p");
      const chosen =
        answers[i] === undefined ? "Belum dijawab" : q.choices[answers[i]];
      const status =
        answers[i] === q.answer
          ? "Jawabanmu benar."
          : answers[i] === undefined
            ? "Kamu belum memilih jawaban."
            : "Jawabanmu belum tepat.";
      p.textContent = `${status} Jawabanmu: ${chosen}. Jawaban benar: ${q.choices[q.answer]}. Pembahasan: ${q.explanation}`;
      item.append(title, p);
      box.appendChild(item);
    });
    box.hidden = false;
  });
  $("kuisRetry").addEventListener("click", startQuiz);
  $("kuisHomeButton").addEventListener("click", () => {
    clearInterval(timer);
    isPaused = false;
    $("kuisPauseScreen").hidden = true;
    $("kuisTimer").classList.remove("timer-warning", "timer-critical");
    showOnly(home);
  });
})();
