const HIDDEN_OBJECT_CONFIG = {
  sessions: [
    {
      sessionId: 1,
      sessionTitle: "Khazanah Prasejarah & Angkasa Lepas",
      scenes: ["01_muzium_dinosaur", "02_muzium_angkasa"]
    }
  ],
  backgrounds: {
    "01_muzium_dinosaur": {
      id: "01_muzium_dinosaur",
      title: "Muzium Dinosaur",
      uploadKey: "01_muzium_dinosaur",
      hotspots: [
        { id: "hd_rangka_trex", name: "Rangka T-Rex", x: 58.5, y: 28.5, radius: 8 },
        { id: "hd_triceratops", name: "Triceratops", x: 28.2, y: 44.5, radius: 7 },
        { id: "hd_sauropod", name: "Leher Panjang", x: 86.5, y: 39.0, radius: 7 },
        { id: "hd_pterodactyl", name: "Pterodactyl", x: 66.5, y: 11.5, radius: 6 },
        { id: "hd_tengkorak", name: "Tengkorak Fosil", x: 13.5, y: 72.0, radius: 6 },
        { id: "hd_ammonite", name: "Fosil Ammonite", x: 20.5, y: 88.0, radius: 5 },
        { id: "hd_kanta", name: "Kanta Pembesar", x: 31.0, y: 90.0, radius: 5 },
        { id: "hd_kristal", name: "Batu Permata", x: 47.0, y: 83.5, radius: 6 },
        { id: "hd_peta_dino", name: "Peta Dinosaur", x: 56.5, y: 92.5, radius: 6 },
        { id: "hd_buku_tebal", name: "Buku Prasejarah", x: 67.0, y: 76.5, radius: 6 },
        { id: "hd_binokular", name: "Binokular", x: 79.5, y: 85.0, radius: 5 },
        { id: "hd_beg_galas", name: "Beg Pelawat", x: 33.5, y: 58.5, radius: 5 }
      ]
    },
    "02_muzium_angkasa": {
      id: "02_muzium_angkasa",
      title: "Muzium Angkasa",
      uploadKey: "02_muzium_angkasawan",
      hotspots: [
        { id: "ha_shuttle", name: "Space Shuttle", x: 50.8, y: 35.0, radius: 8 },
        { id: "ha_angkasawan", name: "Baju Angkasawan", x: 8.5, y: 50.0, radius: 6 },
        { id: "ha_lunar_lander", name: "Lunar Lander", x: 26.5, y: 44.5, radius: 7 },
        { id: "ha_teleskop", name: "Teleskop Besar", x: 92.0, y: 44.0, radius: 6 },
        { id: "ha_rover", name: "Mars Rover", x: 69.5, y: 52.5, radius: 6 },
        { id: "ha_saturn", name: "Model Zuhal", x: 67.5, y: 6.5, radius: 6 },
        { id: "ha_marikh", name: "Model Marikh", x: 40.0, y: 21.0, radius: 5 },
        { id: "ha_skrin_suria", name: "Skrin Sentuh", x: 26.5, y: 69.0, radius: 6 },
        { id: "ha_beg_angkasa", name: "Beg Angkasa", x: 32.5, y: 81.5, radius: 5 },
        { id: "ha_botol_air", name: "Botol Minuman", x: 38.6, y: 81.0, radius: 4 },
        { id: "ha_meja_suria", name: "Meja Orbit", x: 88.0, y: 90.0, radius: 7 },
        { id: "ha_helmet_emas", name: "Topi Keledar", x: 97.5, y: 64.0, radius: 5 }
      ]
    }
  }
};

window.HIDDEN_OBJECT_CONFIG = HIDDEN_OBJECT_CONFIG;
