/* Interaksi Latihan Soal BangunRuang — fokus visual-spasial dan dukungan SRL */
(() => {
  const body = document.body;
  const topicGrid = document.getElementById("latihanTopicGrid");
  const builder = document.getElementById("latihanBuilder");
  const workspace = document.getElementById("latihanWorkspace");
  const resultPanel = document.getElementById("latihanResult");
  if (!topicGrid || !builder || !workspace || !resultPanel) return;

  const $ = (id) => document.getElementById(id);
  const topicButtons = [...topicGrid.querySelectorAll("[data-latihan-topic]")];
  const countSelect = $("latihanQuestionCount");
  const difficultySelect = $("latihanDifficulty");
  const selectionNote = $("latihanSelectionNote");

  const topics = {
  "kubus": {
    "name": "Kubus",
    "qs": [
      {
        "prompt": "Perhatikan kubus 3D. Jika kubus diputar, berapa banyak sisi persegi yang tetap dimiliki kubus?",
        "choices": [
          "4 sisi",
          "5 sisi",
          "6 sisi",
          "8 sisi"
        ],
        "answer": 2,
        "explanation": "Rotasi hanya mengubah orientasi tampilan. Kubus tetap memiliki 6 sisi persegi yang kongruen.",
        "level": "C1",
        "indicator": "Mengenali bentuk dan unsur",
        "visual": "cube"
      },
      {
        "prompt": "Sebuah jaring-jaring berbentuk salib tersusun dari enam persegi sama besar. Bangun ruang yang dapat dibentuk adalah ...",
        "choices": [
          "Balok",
          "Kubus",
          "Prisma segitiga",
          "Limas segiempat"
        ],
        "answer": 1,
        "explanation": "Enam persegi kongruen yang tersusun sebagai jaring-jaring dapat dilipat menjadi kubus.",
        "level": "C2",
        "indicator": "Menghubungkan jaring-jaring dengan bangun ruang",
        "visual": "net"
      },
      {
        "prompt": "Kubus memiliki rusuk 4 cm. Jika dilihat dari sudut berbeda, panjang rusuk yang tampak berubah atau tetap?",
        "choices": [
          "Berubah menjadi 2 cm",
          "Tetap 4 cm",
          "Menjadi 8 cm",
          "Tidak dapat ditentukan"
        ],
        "answer": 1,
        "explanation": "Perubahan sudut pandang tidak mengubah ukuran sebenarnya. Setiap rusuk kubus tetap 4 cm.",
        "level": "C3",
        "indicator": "Memahami ukuran dalam perspektif",
        "visual": "rotate"
      },
      {
        "prompt": "Dari satu sudut pandang, tiga sisi kubus terlihat. Berapa banyak sisi kubus yang tidak terlihat dari sudut pandang tersebut?",
        "choices": [
          "1 sisi",
          "2 sisi",
          "3 sisi",
          "4 sisi"
        ],
        "answer": 2,
        "explanation": "Kubus memiliki 6 sisi. Jika 3 sisi terlihat dari satu sudut pandang, maka 3 sisi lainnya tidak terlihat.",
        "level": "C4",
        "indicator": "Menganalisis perspektif dan sisi tersembunyi",
        "visual": "rotate"
      },
      {
        "prompt": "Sebuah kubus tanpa label ditampilkan dari sudut pandang berbeda. Strategi paling tepat untuk memastikan bahwa dua gambar menunjukkan kubus yang sama adalah ...",
        "choices": [
          "Membandingkan warna latar",
          "Melacak tiga sisi yang bertemu pada satu titik sudut",
          "Menghitung jumlah warna",
          "Membandingkan ukuran gambar di layar"
        ],
        "answer": 1,
        "explanation": "Tiga sisi yang bertemu pada satu titik sudut dapat dilacak saat rotasi untuk memeriksa kesetaraan orientasi bangun.",
        "level": "C5",
        "indicator": "Menganalisis representasi dari sudut berbeda",
        "visual": "rotate"
      }
    ]
  },
  "balok": {
    "name": "Balok",
    "qs": [
      {
        "prompt": "Balok memiliki berapa pasang sisi yang berhadapan dan sama bentuk serta ukurannya?",
        "choices": [
          "1 pasang",
          "2 pasang",
          "3 pasang",
          "4 pasang"
        ],
        "answer": 2,
        "explanation": "Balok memiliki tiga pasang sisi berhadapan yang kongruen.",
        "level": "C1",
        "indicator": "Mengenali hubungan antarsisi",
        "visual": "cuboid"
      },
      {
        "prompt": "Sebuah kotak berbentuk balok dibuka hingga menjadi bidang datar. Bentuk-bentuk penyusunnya berupa ...",
        "choices": [
          "Enam lingkaran",
          "Enam persegi panjang",
          "Dua segitiga dan empat lingkaran",
          "Satu persegi dan lima segitiga"
        ],
        "answer": 1,
        "explanation": "Jaring-jaring balok tersusun atas enam persegi panjang; beberapa sisinya dapat berupa persegi.",
        "level": "C2",
        "indicator": "Menghubungkan jaring-jaring dengan bangun ruang",
        "visual": "net"
      },
      {
        "prompt": "Balok berukuran 8 cm × 4 cm × 3 cm. Jika sisi alasnya adalah 8 cm × 4 cm, tinggi balok adalah ...",
        "choices": [
          "3 cm",
          "4 cm",
          "8 cm",
          "12 cm"
        ],
        "answer": 0,
        "explanation": "Tinggi merupakan ukuran tegak lurus terhadap alas, yaitu 3 cm.",
        "level": "C3",
        "indicator": "Menafsirkan dimensi bangun",
        "visual": "cuboid"
      },
      {
        "prompt": "Sebuah balok dilihat dari depan, samping, dan atas. Ukuran tampak depan 8 × 3, tampak samping 4 × 3, dan tampak atas 8 × 4. Ukuran balok adalah ...",
        "choices": [
          "8 × 3 × 4",
          "8 × 8 × 3",
          "4 × 4 × 3",
          "8 × 4 × 8"
        ],
        "answer": 0,
        "explanation": "Tiga tampak ortogonal memberikan panjang 8 cm, lebar 4 cm, dan tinggi 3 cm.",
        "level": "C4",
        "indicator": "Mengintegrasikan tampak 2D menjadi objek 3D",
        "visual": "views"
      },
      {
        "prompt": "Dua kotak balok memiliki volume sama. Kotak A berukuran 12 × 4 × 2 cm dan kotak B 8 × 3 × 4 cm. Kesimpulan yang tepat adalah ...",
        "choices": [
          "A lebih besar volumenya",
          "B lebih besar volumenya",
          "Keduanya memiliki volume 96 cm³",
          "Keduanya memiliki luas permukaan sama"
        ],
        "answer": 2,
        "explanation": "Keduanya bervolume 96 cm³, walaupun bentuk proporsinya berbeda.",
        "level": "C5",
        "indicator": "Menganalisis dan membandingkan bentuk 3D",
        "visual": "cuboid"
      }
    ]
  },
  "prisma": {
    "name": "Prisma Segitiga",
    "qs": [
      {
        "prompt": "Prisma segitiga memiliki dua bidang sejajar dan kongruen berbentuk ...",
        "choices": [
          "Lingkaran",
          "Persegi",
          "Segitiga",
          "Segilima"
        ],
        "answer": 2,
        "explanation": "Dua bidang alas dan tutup prisma segitiga berbentuk segitiga yang kongruen.",
        "level": "C1",
        "indicator": "Mengenali bentuk alas dan tutup",
        "visual": "prism"
      },
      {
        "prompt": "Jika prisma segitiga dipotong sejajar alasnya, bentuk penampang yang diperoleh adalah ...",
        "choices": [
          "Lingkaran",
          "Segitiga",
          "Persegi panjang",
          "Trapesium"
        ],
        "answer": 1,
        "explanation": "Potongan yang sejajar dengan alas prisma menghasilkan penampang yang sebangun dan kongruen dengan alas, yaitu segitiga.",
        "level": "C2",
        "indicator": "Memprediksi penampang bangun",
        "visual": "prism"
      },
      {
        "prompt": "Sebuah prisma segitiga memiliki luas alas 12 cm² dan tinggi prisma 7 cm. Volumenya adalah ...",
        "choices": [
          "19 cm³",
          "42 cm³",
          "84 cm³",
          "144 cm³"
        ],
        "answer": 2,
        "explanation": "Volume prisma = luas alas × tinggi prisma = 12 × 7 = 84 cm³.",
        "level": "C3",
        "indicator": "Menghubungkan luas alas dan tinggi",
        "visual": "prism"
      },
      {
        "prompt": "Sebuah jaring-jaring prisma segitiga terdiri atas dua segitiga dan hanya dua persegi panjang. Apa yang perlu diperbaiki agar dapat membentuk prisma tertutup?",
        "choices": [
          "Menambahkan satu persegi panjang",
          "Mengganti satu segitiga dengan lingkaran",
          "Menghapus satu segitiga",
          "Menambahkan satu lingkaran"
        ],
        "answer": 0,
        "explanation": "Prisma segitiga memiliki tiga sisi tegak berbentuk persegi panjang. Satu persegi panjang perlu ditambahkan agar semua sisi tegak tertutup.",
        "level": "C4",
        "indicator": "Menganalisis kelengkapan jaring-jaring",
        "visual": "net"
      },
      {
        "prompt": "Sebuah kemasan berbentuk prisma segitiga akan dibuat dari karton. Desain jaring-jaring yang benar harus memuat ...",
        "choices": [
          "1 segitiga dan 2 persegi panjang",
          "2 segitiga kongruen dan 3 persegi panjang",
          "3 segitiga dan 2 lingkaran",
          "2 lingkaran dan 1 persegi panjang"
        ],
        "answer": 1,
        "explanation": "Prisma segitiga memerlukan dua alas segitiga kongruen dan tiga sisi tegak persegi panjang.",
        "level": "C5",
        "indicator": "Mengevaluasi rancangan jaring-jaring",
        "visual": "net"
      }
    ]
  },
  "limas": {
    "name": "Limas Segiempat",
    "qs": [
      {
        "prompt": "Limas segiempat memiliki alas berbentuk ...",
        "choices": [
          "Lingkaran",
          "Segitiga",
          "Persegi",
          "Segilima"
        ],
        "answer": 2,
        "explanation": "Limas segiempat pada latihan ini memiliki alas berbentuk persegi.",
        "level": "C1",
        "indicator": "Mengenali bentuk alas dan sisi tegak",
        "visual": "pyramid"
      },
      {
        "prompt": "Jika limas segiempat dilihat dari atas, bentuk alas yang terlihat adalah ...",
        "choices": [
          "Lingkaran",
          "Persegi",
          "Segitiga",
          "Persegi panjang"
        ],
        "answer": 1,
        "explanation": "Tampak atas limas segiempat memperlihatkan alas berbentuk persegi dan puncak berada di bagian tengah proyeksi.",
        "level": "C2",
        "indicator": "Menafsirkan tampak atas",
        "visual": "views"
      },
      {
        "prompt": "Luas alas limas 36 cm² dan tinggi tegak 9 cm. Volume limas adalah ...",
        "choices": [
          "108 cm³",
          "162 cm³",
          "216 cm³",
          "324 cm³"
        ],
        "answer": 0,
        "explanation": "Volume limas = ⅓ × luas alas × tinggi = ⅓ × 36 × 9 = 108 cm³.",
        "level": "C3",
        "indicator": "Menggunakan hubungan ukuran ruang",
        "visual": "pyramid"
      },
      {
        "prompt": "Luas alas sebuah limas segiempat diperbesar menjadi 4 kali luas semula, sedangkan tingginya tetap. Volume limas menjadi ...",
        "choices": [
          "Tetap sama",
          "2 kali volume semula",
          "4 kali volume semula",
          "8 kali volume semula"
        ],
        "answer": 2,
        "explanation": "Volume limas = ⅓ × luas alas × tinggi. Jika luas alas menjadi 4 kali dan tinggi tetap, volumenya juga menjadi 4 kali.",
        "level": "C4",
        "indicator": "Menganalisis perubahan ukuran bangun",
        "visual": "pyramid"
      },
      {
        "prompt": "Seorang siswa menggambar jaring-jaring limas segiempat. Susunan yang paling tepat adalah ...",
        "choices": [
          "Satu persegi dengan empat segitiga di sekelilingnya",
          "Dua persegi dan empat lingkaran",
          "Empat persegi panjang dan satu segitiga",
          "Satu lingkaran dengan satu sektor"
        ],
        "answer": 0,
        "explanation": "Jaring-jaring limas segiempat terdiri atas satu alas persegi dan empat sisi tegak segitiga.",
        "level": "C5",
        "indicator": "Mengevaluasi jaring-jaring limas",
        "visual": "net"
      }
    ]
  },
  "tabung": {
    "name": "Tabung",
    "qs": [
      {
        "prompt": "Tabung mempunyai dua sisi datar yang berbentuk ...",
        "choices": [
          "Persegi",
          "Segitiga",
          "Lingkaran",
          "Trapesium"
        ],
        "answer": 2,
        "explanation": "Tabung memiliki alas dan tutup berbentuk lingkaran serta satu selimut lengkung.",
        "level": "C1",
        "indicator": "Mengenali bentuk bidang pembatas",
        "visual": "cylinder"
      },
      {
        "prompt": "Jika selimut tabung dibuka dan dibentangkan, bentuk bidang datarnya adalah ...",
        "choices": [
          "Segitiga",
          "Persegi panjang",
          "Lingkaran",
          "Trapesium"
        ],
        "answer": 1,
        "explanation": "Selimut tabung jika dibentangkan menjadi persegi panjang.",
        "level": "C2",
        "indicator": "Menghubungkan bangun ruang dan jaring-jaring",
        "visual": "net"
      },
      {
        "prompt": "Tabung berjari-jari 7 cm dan tinggi 10 cm. Dengan π = 22/7, volumenya adalah ...",
        "choices": [
          "440 cm³",
          "770 cm³",
          "1.540 cm³",
          "3.080 cm³"
        ],
        "answer": 2,
        "explanation": "V = πr²t = 22/7 × 7 × 7 × 10 = 1.540 cm³.",
        "level": "C3",
        "indicator": "Menggunakan ukuran pada model 3D",
        "visual": "cylinder"
      },
      {
        "prompt": "Sebuah tabung dipotong tegak melalui sumbu pusatnya. Bentuk penampang yang dihasilkan adalah ...",
        "choices": [
          "Lingkaran",
          "Persegi panjang",
          "Segitiga",
          "Trapesium"
        ],
        "answer": 1,
        "explanation": "Bidang potong yang melalui sumbu tabung menghasilkan persegi panjang dengan ukuran tinggi tabung dan diameter alas.",
        "level": "C4",
        "indicator": "Menganalisis penampang tabung",
        "visual": "section"
      },
      {
        "prompt": "Dua tabung memiliki tinggi sama. Tabung A berjari-jari 2 cm dan tabung B berjari-jari 4 cm. Perbandingan volume A terhadap B adalah ...",
        "choices": [
          "1 : 2",
          "1 : 4",
          "1 : 8",
          "2 : 1"
        ],
        "answer": 1,
        "explanation": "Volume sebanding dengan kuadrat jari-jari. 2² : 4² = 4 : 16 = 1 : 4.",
        "level": "C5",
        "indicator": "Menganalisis perubahan ukuran dan volume",
        "visual": "cylinder"
      }
    ]
  },
  "kerucut": {
    "name": "Kerucut",
    "qs": [
      {
        "prompt": "Kerucut mempunyai alas berbentuk ...",
        "choices": [
          "Persegi",
          "Segitiga",
          "Lingkaran",
          "Persegi panjang"
        ],
        "answer": 2,
        "explanation": "Kerucut memiliki satu alas berbentuk lingkaran dan satu titik puncak.",
        "level": "C1",
        "indicator": "Mengenali unsur kerucut",
        "visual": "cone"
      },
      {
        "prompt": "Jika kerucut dipotong sejajar alasnya, penampang yang terbentuk adalah ...",
        "choices": [
          "Lingkaran",
          "Segitiga",
          "Persegi",
          "Trapesium"
        ],
        "answer": 0,
        "explanation": "Penampang yang sejajar alas kerucut berbentuk lingkaran.",
        "level": "C2",
        "indicator": "Memprediksi penampang bangun",
        "visual": "section"
      },
      {
        "prompt": "Jari-jari kerucut 3 cm dan tinggi 4 cm. Volumenya (π = 3,14) adalah ...",
        "choices": [
          "12,56 cm³",
          "28,26 cm³",
          "37,68 cm³",
          "113,04 cm³"
        ],
        "answer": 2,
        "explanation": "V = ⅓ × π × r² × t = ⅓ × 3,14 × 9 × 4 = 37,68 cm³.",
        "level": "C3",
        "indicator": "Menghubungkan jari-jari dan tinggi",
        "visual": "cone"
      },
      {
        "prompt": "Kerucut memiliki jari-jari 5 cm dan tinggi 12 cm. Panjang garis pelukisnya adalah ...",
        "choices": [
          "7 cm",
          "10 cm",
          "13 cm",
          "17 cm"
        ],
        "answer": 2,
        "explanation": "Garis pelukis, jari-jari, dan tinggi membentuk segitiga siku-siku. s = √(5² + 12²) = 13 cm.",
        "level": "C4",
        "indicator": "Menafsirkan hubungan unsur secara spasial",
        "visual": "cone"
      },
      {
        "prompt": "Sebuah kerucut dan tabung memiliki jari-jari serta tinggi yang sama. Hubungan volume keduanya adalah ...",
        "choices": [
          "Volume kerucut sama dengan tabung",
          "Volume kerucut dua kali tabung",
          "Volume kerucut sepertiga tabung",
          "Volume kerucut tiga kali tabung"
        ],
        "answer": 2,
        "explanation": "Untuk alas dan tinggi yang sama, volume kerucut adalah sepertiga volume tabung.",
        "level": "C5",
        "indicator": "Membandingkan dua bangun ruang",
        "visual": "compare"
      }
    ]
  },
  "bola": {
    "name": "Bola",
    "qs": [
      {
        "prompt": "Bola memiliki ...",
        "choices": [
          "6 sisi datar",
          "2 sisi datar",
          "1 permukaan lengkung",
          "1 alas lingkaran"
        ],
        "answer": 2,
        "explanation": "Bola dibatasi oleh satu permukaan lengkung dan tidak memiliki rusuk atau titik sudut.",
        "level": "C1",
        "indicator": "Mengenali karakteristik permukaan",
        "visual": "sphere"
      },
      {
        "prompt": "Jika sebuah bola dipotong melalui titik pusatnya, bentuk penampangnya adalah ...",
        "choices": [
          "Segitiga",
          "Lingkaran",
          "Persegi",
          "Setengah lingkaran"
        ],
        "answer": 1,
        "explanation": "Penampang bola melalui pusat berbentuk lingkaran terbesar pada bola.",
        "level": "C2",
        "indicator": "Memprediksi penampang bola",
        "visual": "section"
      },
      {
        "prompt": "Jari-jari bola 3 cm. Volumenya (π = 3,14) adalah ...",
        "choices": [
          "28,26 cm³",
          "56,52 cm³",
          "113,04 cm³",
          "226,08 cm³"
        ],
        "answer": 2,
        "explanation": "V = 4/3 × π × r³ = 4/3 × 3,14 × 27 = 113,04 cm³.",
        "level": "C3",
        "indicator": "Menggunakan ukuran pada model bola",
        "visual": "sphere"
      },
      {
        "prompt": "Dua gambar bola menunjukkan diameter 8 cm dan 12 cm. Perbandingan jari-jari kedua bola adalah ...",
        "choices": [
          "2 : 3",
          "3 : 2",
          "4 : 12",
          "8 : 12"
        ],
        "answer": 0,
        "explanation": "Jari-jari masing-masing 4 cm dan 6 cm, sehingga perbandingannya 2 : 3.",
        "level": "C4",
        "indicator": "Membandingkan ukuran dari representasi",
        "visual": "sphere"
      },
      {
        "prompt": "Sebuah bola padat dibagi menjadi dua bagian sama besar melalui bidang yang melewati pusat. Bentuk tiap bagian adalah ...",
        "choices": [
          "Kerucut",
          "Setengah bola",
          "Tabung",
          "Limas"
        ],
        "answer": 1,
        "explanation": "Bidang melalui pusat membagi bola menjadi dua bagian yang masing-masing berbentuk setengah bola.",
        "level": "C5",
        "indicator": "Menganalisis hasil pembagian bangun 3D",
        "visual": "section"
      }
    ]
  }
};

  let selected = new Set(["kubus"]);
  let questions = [];
  let current = 0;
  let score = 0;
  let answered = [];
  let lastConfig = { count: 5, difficulty: "sedang" };

  const difficultyOrder = {
    mudah: ["C1", "C2", "C3", "C4", "C5"],
    sedang: ["C2", "C3", "C4", "C1", "C5"],
    sulit: ["C3", "C4", "C5", "C2", "C1"],
  };

  function syncSelection() {
    topicButtons.forEach((button) => {
      const active = selected.has(button.dataset.latihanTopic);
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const available = selected.size * 5;
    [...countSelect.options].forEach((option) => {
      option.disabled = Number(option.value) > available;
    });
    if (Number(countSelect.value) > available)
      countSelect.value = String(Math.min(5, available));
    selectionNote.textContent =
      `${selected.size} materi dipilih · ${available} soal tersedia · 5 indikator kognitif per materi`;
  }

  topicButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const key = button.dataset.latihanTopic;
      if (selected.has(key)) {
        if (selected.size === 1) {
          window.showToast?.("Pilih minimal satu materi, ya!");
          return;
        }
        selected.delete(key);
      } else selected.add(key);
      syncSelection();
    }),
  );

  function showBuilder() {
    builder.hidden = false;
    workspace.hidden = true;
    resultPanel.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $("latihanBack").addEventListener("click", showBuilder);

  function buildQuestions() {
    const order = difficultyOrder[difficultySelect.value] || difficultyOrder.sedang;
    const selectedTopics = [...selected];
    const perTopic = selectedTopics.map((key) => {
      const topic = topics[key];
      return topic.qs
        .map((q, index) => ({
          ...q,
          topic: topic.name,
          id: `${key}-${index}`,
        }))
        .sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level));
    });

    // Round-robin menjaga sebaran materi saat siswa memilih lebih dari satu bangun.
    const pool = [];
    for (let i = 0; i < 5; i++) {
      perTopic.forEach((items) => {
        if (items[i]) pool.push(items[i]);
      });
    }
    return pool.slice(0, Number(countSelect.value));
  }

  function visualSvg(type, topic) {
    const common = 'stroke="#174b9a" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"';
    const shapes = {
      cube: `<path d="M90 55 160 20 230 55 160 92Z" fill="#d8b4fe" ${common}/><path d="M90 55v82l70 38V92Z" fill="#a855f7" ${common}/><path d="M160 92v83l70-38V55Z" fill="#7e22ce" ${common}/><path d="M90 55 160 92 230 55" fill="none" ${common}/>`,
      cuboid: `<path d="M55 70 160 25 255 65 150 112Z" fill="#93c5fd" ${common}/><path d="M55 70v72l95 42v-72Z" fill="#38bdf8" ${common}/><path d="M150 112v72l105-42V65Z" fill="#2563eb" ${common}/>`,
      prism: `<path d="M65 120 115 42 165 120Z" fill="#fde68a" ${common}/><path d="M65 120h120l50-78H115Z" fill="#facc15" ${common}/><path d="M165 120 215 42v78l-50 78Z" fill="#eab308" ${common}/><path d="M65 120 115 42 165 120 215 42" ${common}/>`,
      pyramid: `<path d="M160 25 65 150 255 150Z" fill="#86efac" ${common}/><path d="M160 25 160 180 65 150Z" fill="#4ade80" ${common}/><path d="M160 25 255 150 160 180Z" fill="#16a34a" ${common}/><path d="M65 150 160 180 255 150" ${common}/>`,
      cylinder: `<ellipse cx="160" cy="48" rx="75" ry="25" fill="#f9a8d4" ${common}/><path d="M85 48v105c0 34 150 34 150 0V48" fill="#ec4899" ${common}/><path d="M85 153c0 34 150 34 150 0" fill="none" ${common}/><path d="M160 23v155" stroke="#fff" stroke-width="3" opacity=".7"/>`,
      cone: `<ellipse cx="160" cy="155" rx="82" ry="25" fill="#e9d5ff" ${common}/><path d="M160 25 78 155c0 34 164 34 164 0Z" fill="#a855f7" ${common}/><path d="M160 25 160 180" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`,
      sphere: `<circle cx="160" cy="100" r="78" fill="#fbbf24" stroke="#b45309" stroke-width="4"/><ellipse cx="130" cy="72" rx="23" ry="14" fill="#fff" opacity=".65"/><path d="M91 111c20 44 80 65 126 27" stroke="#fff" stroke-width="4" opacity=".55" fill="none"/>`,
      net: `<g ${common} fill="#dbeafe"><rect x="24" y="86" width="68" height="68"/><rect x="92" y="86" width="68" height="68"/><rect x="160" y="86" width="68" height="68"/><rect x="228" y="86" width="68" height="68"/><rect x="92" y="18" width="68" height="68"/><rect x="92" y="154" width="68" height="68"/></g>`,
      rotate: `<path d="M160 50 220 82 160 115 100 82Z" fill="#d8b4fe" ${common}/><path d="M100 82v70l60 35v-72Z" fill="#a855f7" ${common}/><path d="M160 115v72l60-35V82Z" fill="#7e22ce" ${common}/><path d="M70 55a112 75 0 0 1 172 7" fill="none" stroke="#0ea5e9" stroke-width="10" fill="none"/><path d="m226 38 20 25-32 4" fill="none" stroke="#0ea5e9" stroke-width="9" stroke-linecap="round"/>`,
      views: `<g ${common}><rect x="30" y="35" width="105" height="70" rx="7" fill="#bfdbfe"/><rect x="185" y="35" width="105" height="70" rx="7" fill="#bfdbfe"/><rect x="108" y="145" width="105" height="70" rx="7" fill="#bfdbfe"/></g><g fill="#1e40af" font-size="15" font-weight="800"><text x="58" y="125">DEPAN</text><text x="215" y="125">SAMPING</text><text x="140" y="238">ATAS</text></g>`,
      section: `<path d="M75 65 160 25 245 65 160 108Z" fill="#bfdbfe" ${common}/><path d="M75 65v100l85 45v-102Z" fill="#60a5fa" ${common}/><path d="M160 108v102l85-45V65Z" fill="#2563eb" ${common}/><path d="M75 115h170" fill="none" stroke="#ef4444" stroke-width="6" stroke-dasharray="9 7"/>`,
      compare: `<path d="M75 135 120 65 165 135Z" fill="#c084fc" ${common}/><path d="M195 135V65c0-24 70-24 70 0v70c0 24-70 24-70 0Z" fill="#60a5fa" ${common}/><path d="M195 65c0-24 70-24 70 0" fill="none" ${common}/>`,
    };
    let drawing = shapes[type] || shapes.cube;
    if (type === "net" && topic === "Prisma Segitiga") {
      drawing = `<g stroke="#174b9a" stroke-width="4" stroke-linejoin="round"><rect x="82" y="88" width="52" height="84" fill="#bfdbfe"/><rect x="134" y="88" width="52" height="84" fill="#93c5fd"/><rect x="186" y="88" width="52" height="84" fill="#60a5fa"/><path d="M82 88 160 32 238 88Z" fill="#fde68a"/><path d="M82 172 160 228 238 172Z" fill="#facc15"/></g>`;
    } else if (type === "net" && topic === "Limas Segiempat") {
      drawing = `<g stroke="#174b9a" stroke-width="4" stroke-linejoin="round"><rect x="125" y="88" width="70" height="70" fill="#86efac"/><path d="M125 88 160 22 195 88Z" fill="#bbf7d0"/><path d="M195 88 261 123 195 158Z" fill="#4ade80"/><path d="M125 158 160 224 195 158Z" fill="#22c55e"/><path d="M125 88 59 123 125 158Z" fill="#a3e635"/></g>`;
    } else if (type === "net" && topic === "Tabung") {
      drawing = `<g stroke="#174b9a" stroke-width="4"><rect x="82" y="78" width="156" height="96" fill="#f9a8d4"/><ellipse cx="160" cy="78" rx="78" ry="24" fill="#fbcfe8"/><ellipse cx="160" cy="174" rx="78" ry="24" fill="#ec4899"/></g>`;
    }
    return `<svg viewBox="0 0 320 250" role="img" aria-label="Ilustrasi visual bangun ruang" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="vbg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eff8ff"/><stop offset="1" stop-color="#f4eaff"/></linearGradient></defs><rect x="5" y="5" width="310" height="240" rx="24" fill="url(#vbg)"/><circle cx="270" cy="42" r="7" fill="#fff" opacity=".9"/><circle cx="48" cy="205" r="5" fill="#93c5fd"/>${drawing}</svg>`;
  }

  function renderQuestion() {
    const q = questions[current];
    $("questionTopic").textContent = q.topic;
    $("questionCounter").textContent = `Soal ${current + 1} dari ${questions.length}`;
    $("questionLevel").textContent = `Level kognitif ${q.level}`;
    $("questionNumberBadge").textContent = String(current + 1).padStart(2, "0");
    $("questionText").textContent = q.prompt;
    const context = $("questionContext");
    if (context) context.textContent = `Indikator visual-spasial: ${q.indicator}`;
    const visual = $("questionVisual");
    visual.hidden = false;

    // Model yang ditampilkan mengikuti kebutuhan visual pada soal.
    // Soal jaring-jaring hanya menampilkan jaring-jaring; soal bentuk ruang hanya menampilkan bentuk 3D.
    const modelKeys = {
      "Kubus": "kubus", "Balok": "balok", "Prisma Segitiga": "prisma",
      "Limas Segiempat": "limas", "Tabung": "tabung",
      "Kerucut": "kerucut", "Bola": "bola"
    };
    const netKeys = {
      "Kubus": "jaring-kubus", "Balok": "jaring-balok", "Prisma Segitiga": "jaring-prisma",
      "Limas Segiempat": "jaring-limas", "Tabung": "jaring-tabung", "Kerucut": "jaring-kerucut"
    };
    const interactiveVisuals = ["cube", "cuboid", "prism", "pyramid", "cylinder", "cone", "sphere", "rotate", "net", "section", "views", "compare"];
    if (interactiveVisuals.includes(q.visual) && modelKeys[q.topic]) {
      const isNetQuestion = q.visual === "net" && Boolean(netKeys[q.topic]);
      const modelFile = isNetQuestion ? netKeys[q.topic] : modelKeys[q.topic];
      const modelLabel = isNetQuestion ? `Jaring-jaring ${q.topic}` : `Model 3D ${q.topic}`;
      const camera = isNetQuestion ? "0deg 78deg 4.8m" : "35deg 72deg 3.2m";
      const topicArt = {
        "Kubus": "dekor_kubus_pastel_3d.png",
        "Balok": "dekor_balok_pastel_3d.png",
        "Prisma Segitiga": "dekor_prisma_pastel_3d.png",
        "Limas Segiempat": "dekor_limas_pastel_3d.png",
        "Tabung": "dekor_tabung_pastel_3d.png",
        "Kerucut": "dekor_kerucut_pastel_3d.png",
        "Bola": "dekor_bola_pastel_3d.png"
      };
      visual.innerHTML = `
        <div class="question-3d-stage ${isNetQuestion ? "is-net-question" : "is-solid-question"}">
          <div class="question-stage-heading">
            <span class="question-stage-label">${isNetQuestion ? "EKSPLORASI JARING-JARING" : "EKSPLORASI BANGUN RUANG"} 3D</span>
            <img class="question-stage-topic-art" src="assets/images/latihansoal/decorations/${topicArt[q.topic]}" alt="" aria-hidden="true">
          </div>
          <model-viewer class="question-model-viewer"
            src="assets/models/latihansoal/${modelFile}.glb"
            alt="${modelLabel}"
            camera-controls
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="14deg"
            interaction-prompt="auto"
            interaction-prompt-style="basic"
            shadow-intensity="0.8"
            exposure="1.18"
            camera-orbit="${camera}"
            min-camera-orbit="auto auto 2m"
            max-camera-orbit="auto auto 9m"
            environment-image="neutral"
            loading="eager">
          </model-viewer>
          <div class="question-stage-caption">Geser objek untuk memutar · Scroll untuk memperbesar atau memperkecil</div>
          <div class="question-stage-actions">
            <button type="button" data-question-3d="rotate" aria-pressed="true">Ⅱ Jeda</button>
            <button type="button" data-question-3d="zoom-in">＋ Perbesar</button>
            <button type="button" data-question-3d="zoom-out">－ Perkecil</button>
            <button type="button" data-question-3d="reset">↻ Reset</button>
          </div>
        </div>`;
      const model = visual.querySelector("model-viewer");
      const rotateButton = visual.querySelector('[data-question-3d="rotate"]');
      let autoRotate = true;
      let zoom = isNetQuestion ? 4.8 : 3.2;
      const updateOrbit = () => {
        model.cameraOrbit = `${isNetQuestion ? 0 : 35}deg ${isNetQuestion ? 78 : 72}deg ${zoom.toFixed(1)}m`;
      };
      rotateButton.addEventListener("click", () => {
        autoRotate = !autoRotate;
        if (autoRotate) model.setAttribute("auto-rotate", "");
        else model.removeAttribute("auto-rotate");
        rotateButton.textContent = autoRotate ? "Ⅱ Jeda" : "▶ Putar";
        rotateButton.setAttribute("aria-pressed", String(autoRotate));
      });
      visual.querySelector('[data-question-3d="zoom-in"]').addEventListener("click", () => {
        zoom = Math.max(2, zoom - .4); updateOrbit();
      });
      visual.querySelector('[data-question-3d="zoom-out"]').addEventListener("click", () => {
        zoom = Math.min(9, zoom + .4); updateOrbit();
      });
      visual.querySelector('[data-question-3d="reset"]').addEventListener("click", () => {
        zoom = isNetQuestion ? 4.8 : 3.2;
        model.cameraOrbit = camera;
        model.cameraTarget = "auto auto auto";
        model.setAttribute("auto-rotate", "");
        autoRotate = true;
        rotateButton.textContent = "Ⅱ Jeda";
        rotateButton.setAttribute("aria-pressed", "true");
      });
    } else {
      visual.innerHTML = visualSvg(q.visual, q.topic);
    }
    $("questionProgressFill").style.width = `${(current / questions.length) * 100}%`;
    $("answerFeedback").hidden = true;
    $("answerFeedback").classList.remove("is-wrong");
    $("questionNext").disabled = true;
    $("questionNext").textContent = current === questions.length - 1 ? "Lihat Hasil →" : "Soal Berikutnya →";
    $("questionScoreHint").textContent = "Amati ilustrasi, pikirkan strategi, lalu pilih jawaban.";
    const list = $("answerList");
    list.replaceChildren();
    const letters = ["A", "B", "C", "D"];
    q.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.innerHTML = `<span class="answer-letter">${letters[index]}</span><span></span>`;
      button.querySelector("span:last-child").textContent = choice;
      button.addEventListener("click", () => chooseAnswer(index));
      list.append(button);
    });
  }

  function chooseAnswer(index) {
    if (answered[current]) return;
    const q = questions[current];
    const correct = index === q.answer;
    answered[current] = {
      correct, chosen: index, correctText: q.choices[q.answer],
      explanation: q.explanation, prompt: q.prompt, topic: q.topic,
      level: q.level, indicator: q.indicator,
    };
    if (correct) score++;
    [...$("answerList").children].forEach((button, i) => {
      button.disabled = true;
      if (i === q.answer) button.classList.add("correct");
      else if (i === index) button.classList.add("incorrect");
    });
    const feedback = $("answerFeedback");
    feedback.hidden = false;
    feedback.classList.toggle("is-wrong", !correct);
    $("feedbackTitle").textContent = correct
      ? "Hebat, jawabanmu benar! ✨"
      : "Belum tepat, yuk pahami pembahasannya.";
    $("feedbackExplanation").textContent =
      `${q.explanation} Jawaban yang benar: ${q.choices[q.answer]}`;
    $("questionScoreHint").textContent = correct
      ? "Kamu mendapatkan 20 poin. Periksa kembali alasan jawabanmu."
      : "Tidak apa-apa. Gunakan pembahasan untuk memperbaiki pemahamanmu.";
    $("questionNext").disabled = false;
  }

  function finish() {
    workspace.hidden = true;
    resultPanel.hidden = false;
    const points = Math.round((score / questions.length) * 100);
    $("resultScore").textContent = `${points}`;
    const goal = $("latihanGoal")?.value.trim();
    $("resultSummary").textContent =
      `Kamu menjawab benar ${score} dari ${questions.length} soal. ${goal ? `Target belajarmu: “${goal}”. ` : ""}${points >= 80 ? "Luar biasa! Pemahamanmu sudah sangat baik." : points >= 60 ? "Bagus! Periksa kembali soal yang belum tepat." : "Tetap semangat. Pelajari pembahasan dan coba lagi."}`;
    $("resultReview").hidden = true;
    $("latihanReview").textContent = "Lihat Ringkasan Jawaban";
    const attempts = Number(localStorage.getItem("br_latihan_attempts") || 0) + 1;
    localStorage.setItem("br_latihan_attempts", String(attempts));
    $("reflectionSaved").textContent = "";
    $("reflectionText").value = "";
    $("reflectionConfidence").value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $("questionNext").addEventListener("click", () => {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    } else finish();
  });

  $("latihanStart").addEventListener("click", () => {
    if (!selected.size) {
      window.showToast?.("Pilih minimal satu materi sebelum mulai.");
      return;
    }
    lastConfig = { count: Number(countSelect.value), difficulty: difficultySelect.value };
    questions = buildQuestions();
    current = 0;
    score = 0;
    answered = [];
    builder.hidden = true;
    resultPanel.hidden = true;
    workspace.hidden = false;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  $("latihanRetry").addEventListener("click", () => {
    countSelect.value = String(Math.min(lastConfig.count, selected.size * 5));
    difficultySelect.value = lastConfig.difficulty;
    $("latihanStart").click();
  });

  $("latihanReview").addEventListener("click", () => {
    const box = $("resultReview");
    box.hidden = !box.hidden;
    $("latihanReview").textContent = box.hidden ? "Lihat Ringkasan Jawaban" : "Tutup Ringkasan";
    if (!box.hidden) {
      box.replaceChildren();
      answered.forEach((item, i) => {
        const row = document.createElement("div");
        row.className = "review-item";
        const title = document.createElement("strong");
        title.textContent = `${i + 1}. ${item.topic} · ${item.level} — ${item.correct ? "Benar" : "Perlu dipelajari"}`;
        const text = document.createElement("p");
        text.textContent = `${item.prompt} Jawaban benar: ${item.correctText}. ${item.explanation} Indikator: ${item.indicator}.`;
        row.append(title, text);
        box.append(row);
      });
    }
  });

  $("saveReflection").addEventListener("click", () => {
    const confidence = $("reflectionConfidence").value;
    const reflection = $("reflectionText").value.trim();
    if (!confidence || !reflection) {
      $("reflectionSaved").textContent = "Pilih tingkat keyakinan dan tuliskan refleksimu terlebih dahulu.";
      return;
    }
    const entry = {
      date: new Date().toISOString(),
      confidence,
      reflection,
      score: Math.round((score / questions.length) * 100),
      topics: [...new Set(questions.map((q) => q.topic))],
    };
    const history = JSON.parse(localStorage.getItem("br_latihan_reflections") || "[]");
    history.push(entry);
    localStorage.setItem("br_latihan_reflections", JSON.stringify(history.slice(-30)));
    $("reflectionSaved").textContent = "Refleksi tersimpan di perangkat ini. Terima kasih sudah mengevaluasi belajarmu!";
  });

  document.querySelectorAll('[data-page="Latihan Soal"]').forEach((button) => {
    button.addEventListener("click", () => {
      body.classList.remove("page-materi", "page-explorasi3d", "page-video");
      body.classList.add("page-latihan-soal");
      showBuilder();
      topicGrid.querySelectorAll("button").forEach((b) => { b.hidden = false; });
      const search = $("searchInput");
      if (search) search.value = "";
      syncSelection();
    });
  });
  document.querySelectorAll('[data-page]:not([data-page="Latihan Soal"])').forEach((button) => {
    button.addEventListener("click", () => body.classList.remove("page-latihan-soal"));
  });

  $("searchInput")?.addEventListener("input", (event) => {
    if (!body.classList.contains("page-latihan-soal")) return;
    const query = event.target.value.trim().toLocaleLowerCase("id");
    let shown = 0;
    topicButtons.forEach((button) => {
      const matches = topics[button.dataset.latihanTopic].name.toLocaleLowerCase("id").includes(query);
      button.hidden = !matches;
      if (matches) shown++;
    });
    if (query && !shown) window.showToast?.("Materi tidak ditemukan. Coba kata kunci lain.");
  });

  if (new URLSearchParams(location.search).get("page") === "latihan") {
    body.classList.add("page-latihan-soal");
    document.querySelectorAll(".nav-link").forEach((link) =>
      link.classList.toggle("active", link.dataset.page === "Latihan Soal"),
    );
  }
  syncSelection();
})();
