/**
 * Hidden Object Core Game Logic
 * Menggunakan potongan (crop) kecil 80x80 px daripada gambar asal bagi setiap objek yang perlu dicari.
 * Bucu bulat dan border putih nipis.
 * Tiada ikon atau ilustrasi untuk senarai objek.
 */
class HiddenObjectGame {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('hidden-object-app');
    this.sessionIndex = options.sessionIndex || 0;
    this.sceneIndexInSession = 0; // 0 (Bg 1) or 1 (Bg 2)
    this.onLevelComplete = options.onLevelComplete || (() => {});
    this.onSessionComplete = options.onSessionComplete || (() => {});
    this.onWrongAnswer = options.onWrongAnswer || (() => {});
    
    this.currentTargets = [];
    this.foundIds = new Set();
    this.currentScene = null;
    this.currentSession = null;
  }

  init() {
    this.loadSession(this.sessionIndex);
  }

  loadSession(index) {
    const config = window.HIDDEN_OBJECT_CONFIG;
    this.sessionIndex = index % config.sessions.length;
    this.currentSession = config.sessions[this.sessionIndex];
    this.sceneIndexInSession = 0;
    this.loadScene();
  }

  loadScene() {
    const config = window.HIDDEN_OBJECT_CONFIG;
    const sceneId = this.currentSession.scenes[this.sceneIndexInSession];
    this.currentScene = config.backgrounds[sceneId];
    this.foundIds = new Set();

    // Pilih 5 objek secara rawak daripada 12 hotspot (tanpa ulangan)
    const all = [...this.currentScene.hotspots];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    this.currentTargets = all.slice(0, 5);

    this.render();
  }

  getUserUploadedImage(uploadKey) {
    try {
      return localStorage.getItem(`sas_user_bg_${uploadKey}`) || null;
    } catch (e) {
      return null;
    }
  }

  setUserUploadedImage(uploadKey, dataUrl) {
    try {
      localStorage.setItem(`sas_user_bg_${uploadKey}`, dataUrl);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  getDefaultSceneSvg(sceneId) {
    if (sceneId.includes('dinosaur')) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
          <rect width="800" height="320" fill="#1e293b"/>
          <rect y="320" width="800" height="130" fill="#475569"/>
          <!-- Rangka T-Rex (x: 58.5, y: 28.5) -->
          <g transform="translate(468, 128) scale(1.3)">
            <path d="M-60,50 Q-20,10 20,20 Q60,10 70,-10" fill="none" stroke="#fef3c7" stroke-width="6"/>
            <path d="M70,-10 C85,-15 95,-5 88,10 C80,18 70,5 70,-10 Z" fill="#fef3c7" stroke="#92400e" stroke-width="2.5"/>
          </g>
          <!-- Triceratops (x: 28.2, y: 44.5) -->
          <circle cx="225" cy="200" r="30" fill="#fed7aa" stroke="#9a3412" stroke-width="3"/>
          <!-- Leher Panjang (x: 86.5, y: 39.0) -->
          <path d="M692,235 Q672,175 712,145" fill="none" stroke="#bbf7d0" stroke-width="10"/>
          <!-- Pterodactyl (x: 66.5, y: 11.5) -->
          <polygon points="532,45 480,55 584,55" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>
          <!-- Meja & Barangan Hadapan -->
          <ellipse cx="440" cy="390" rx="280" ry="50" fill="#a8a29e"/>
          <!-- Ammonite (x: 20.5, y: 88.0) -->
          <circle cx="164" cy="396" r="16" fill="#fed7aa" stroke="#9a3412" stroke-width="2"/>
          <!-- Kanta (x: 31.0, y: 90.0) -->
          <circle cx="248" cy="405" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
          <!-- Kristal (x: 47.0, y: 83.5) -->
          <polygon points="376,365 390,380 362,380" fill="#c084fc"/>
          <!-- Peta (x: 56.5, y: 92.5) -->
          <rect x="430" y="405" width="40" height="24" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
          <!-- Buku (x: 67.0, y: 76.5) -->
          <rect x="520" y="335" width="35" height="22" fill="#2563eb"/>
          <!-- Binokular (x: 79.5, y: 85.0) -->
          <circle cx="630" cy="382" r="8" fill="#334155"/>
          <circle cx="646" cy="382" r="8" fill="#334155"/>
        </svg>
      `)}`;
    } else {
      return `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
          <rect width="800" height="320" fill="#090d16"/>
          <rect y="320" width="800" height="130" fill="#334155"/>
          <!-- Space Shuttle (x: 50.8, y: 35.0) -->
          <polygon points="406,90 380,200 432,200" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
          <!-- Baju Angkasawan (x: 8.5, y: 50.0) -->
          <rect x="42" y="180" width="52" height="90" rx="6" fill="#38bdf8" opacity="0.4"/>
          <!-- Lunar Lander (x: 26.5, y: 44.5) -->
          <rect x="192" y="185" width="40" height="30" fill="#eab308"/>
          <!-- Teleskop (x: 92.0, y: 44.0) -->
          <line x1="710" y1="220" x2="755" y2="180" stroke="#0f172a" stroke-width="7"/>
          <!-- Mars Rover (x: 69.5, y: 52.5) -->
          <rect x="530" y="224" width="50" height="24" fill="#cbd5e1"/>
          <!-- Model Zuhal (x: 67.5, y: 6.5) -->
          <circle cx="540" cy="29" r="14" fill="#fbbf24"/>
          <!-- Model Marikh (x: 40.0, y: 21.0) -->
          <circle cx="320" cy="94" r="14" fill="#ef4444"/>
        </svg>
      `)}`;
    }
  }

  render() {
    if (!this.container) return;

    const userImg = this.getUserUploadedImage(this.currentScene.uploadKey);
    const activeImgSrc = userImg || this.getDefaultSceneSvg(this.currentScene.id);

    const boxSize = 80;
    const zoom = 6.2;
    const cropW = boxSize * zoom;
    const cropH = cropW / (16 / 9);

    this.container.innerHTML = `
      <div class="ho-wrapper">
        <div class="ho-header">
          <div class="ho-session-title">
            <span>${this.currentSession.sessionTitle}</span>
            <span style="margin-left: 8px; font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 9999px;">
              Gambar ${this.sceneIndexInSession + 1}/2: ${this.currentScene.title}
            </span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="cursor: pointer; background: #f0fdf4; border: 1.5px solid #22c55e; color: #15803d; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px;">
              📷 Muat Naik Gambar
              <input type="file" id="ho-file-input" accept="image/*" style="display: none;" />
            </label>
            <div class="ho-status-pill">${this.foundIds.size} / 5 Dijumpai</div>
          </div>
        </div>
        
        <div class="ho-canvas-container" id="ho-canvas-container">
          <img src="${activeImgSrc}" alt="${this.currentScene.title}" class="ho-bg-image" id="ho-bg-img" />
          <div class="ho-markers-layer" id="ho-markers"></div>
        </div>

        <div class="ho-targets-tray">
          <div class="ho-targets-title">Potongan Objek Sebenar Yang Perlu Dicari (80x80 px):</div>
          <div class="ho-targets-grid" id="ho-targets-grid">
            ${this.currentTargets.map(item => {
              const isFound = this.foundIds.has(item.id);
              const leftPos = (boxSize / 2) - ((item.x / 100) * cropW);
              const topPos = (boxSize / 2) - ((item.y / 100) * cropH);

              return `
                <div class="ho-target-card ${isFound ? 'found' : ''}" id="card-${item.id}">
                  <div class="ho-crop-box">
                    <img 
                      src="${activeImgSrc}" 
                      alt="${item.name}" 
                      class="ho-crop-img"
                      style="width: ${cropW}px; height: ${cropH}px; left: ${leftPos}px; top: ${topPos}px;" 
                    />
                    ${isFound ? '<div class="ho-crop-check">✓</div>' : ''}
                  </div>
                  <div class="ho-target-label">${item.name}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // File input handlers
    const setupFileInput = (id) => {
      const input = document.getElementById(id);
      if (input) {
        input.onchange = (e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
              if (evt.target && evt.target.result) {
                this.setUserUploadedImage(this.currentScene.uploadKey, evt.target.result);
                this.render();
              }
            };
            reader.readAsDataURL(file);
          }
        };
      }
    };
    setupFileInput('ho-file-input');

    const img = document.getElementById('ho-bg-img');
    const container = document.getElementById('ho-canvas-container');

    container.onclick = (e) => this.handleCanvasClick(e, img);
  }

  handleCanvasClick(e, img) {
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (clickX < 0 || clickX > rect.width || clickY < 0 || clickY > rect.height) {
      return;
    }

    const pctX = (clickX / rect.width) * 100;
    const pctY = (clickY / rect.height) * 100;

    const remaining = this.currentTargets.filter(t => !this.foundIds.has(t.id));
    let hit = null;

    for (const t of remaining) {
      const dx = pctX - t.x;
      const dy = (pctY - t.y) * (rect.height / rect.width);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= t.radius) {
        hit = t;
        break;
      }
    }

    if (hit) {
      this.foundIds.add(hit.id);
      this.showSparkle(clickX, clickY);
      this.render();

      if (this.foundIds.size === 5) {
        setTimeout(() => this.handleSceneSuccess(), 1000);
      }
    } else {
      this.onWrongAnswer();
      this.showWrongEffect(clickX, clickY);
    }
  }

  showSparkle(x, y) {
    const markers = document.getElementById('ho-markers');
    if (!markers) return;
    const el = document.createElement('div');
    el.className = 'ho-sparkle-fx';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.innerHTML = '✨🌟✨';
    markers.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  showWrongEffect(x, y) {
    const markers = document.getElementById('ho-markers');
    if (!markers) return;
    const el = document.createElement('div');
    el.className = 'ho-wrong-fx';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    markers.appendChild(el);
    setTimeout(() => el.remove(), 600);
  }

  handleSceneSuccess() {
    if (this.sceneIndexInSession === 0) {
      this.sceneIndexInSession = 1;
      this.loadScene();
      this.onLevelComplete(1);
    } else {
      this.onSessionComplete(this.sessionIndex);
    }
  }
}

window.HiddenObjectGame = HiddenObjectGame;
