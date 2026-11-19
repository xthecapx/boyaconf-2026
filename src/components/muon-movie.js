// Cierre: película interactiva de rayos cósmicos -> atmósfera -> piones -> muón -> atraviesa la QPU y sigue derecho.

export function muonMovieMarkup() {
  return `<div class="muon-movie" data-muon-movie data-phase="0">
    <div class="muon-canvas-wrap">
      <svg class="muon-svg" viewBox="0 0 1120 560" preserveAspectRatio="xMidYMid slice" aria-label="Animación de un rayo cósmico creando un muón que atraviesa una QPU y sigue derecho">
        <defs>
          <linearGradient id="muonSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0b1026" />
            <stop offset="25%" stop-color="#13224a" />
            <stop offset="42%" stop-color="#cfe8ff" />
            <stop offset="59%" stop-color="#e9f4ff" />
            <stop offset="59%" stop-color="#2a2d3e" />
            <stop offset="82%" stop-color="#1b1e2c" />
            <stop offset="100%" stop-color="#10121c" />
          </linearGradient>
          <radialGradient id="atmoGlow" cx="50%" cy="100%" r="85%">
            <stop offset="65%" stop-color="#38bdf8" stop-opacity="0" />
            <stop offset="88%" stop-color="#38bdf8" stop-opacity="0.38" />
            <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.72" />
          </radialGradient>
        </defs>

        <!-- Fondo espacio -> cielo -> laboratorio -> subsuelo -->
        <rect x="0" y="0" width="1120" height="560" fill="url(#muonSky)" />

        <!-- Estrellas en el espacio -->
        <g fill="#ffffff" opacity="0.75">
          <circle cx="80" cy="34" r="2" /><circle cx="155" cy="70" r="1.5" /><circle cx="260" cy="28" r="2" />
          <circle cx="420" cy="48" r="1.5" /><circle cx="690" cy="32" r="2" /><circle cx="600" cy="22" r="1.5" />
          <circle cx="1050" cy="44" r="1.8" />
        </g>

        <!-- Escudo curvo de la atmósfera -->
        <path d="M 0 155 Q 560 84 1120 155 L 1120 205 Q 560 134 0 205 Z" fill="url(#atmoGlow)" />
        <path class="atmo-arc" d="M 0 155 Q 560 84 1120 155" fill="none" stroke="#7dd3fc" stroke-width="4" stroke-dasharray="10 8" />

        <!-- Etiquetas de capas a la izquierda -->
        <g class="layer-labels" font-family="system-ui, sans-serif" font-weight="700">
          <text x="30" y="42" fill="#cbd5f5" font-size="19">🌌 ESPACIO EXTERIOR</text>
          <text x="30" y="132" fill="#7dd3fc" font-size="19">🛡️ ATMÓSFERA</text>
          <text x="30" y="238" fill="#334155" font-size="19">☁️ NUBES / TECHO (BOYACÁ ⛰️)</text>
          <text x="30" y="388" fill="#94a3b8" font-size="19">❄️ LABORATORIO QPU (−273 °C)</text>
          <text x="30" y="514" fill="#64748b" font-size="18">🪨 SUBSUELO</text>
        </g>

        <!-- Leyenda de escala arriba a la derecha (lejos del FAB) -->
        <g class="scale-callout" transform="translate(814, 18)">
          <rect x="0" y="0" width="282" height="84" rx="10" fill="#0f172a" fill-opacity="0.88" stroke="#334155" stroke-width="2" />
          <text x="14" y="25" fill="#cbd5e1" font-size="14" font-weight="800">Comparación de escala:</text>
          <circle cx="30" cy="55" r="14" fill="#f59e0b" stroke="#fef3c7" stroke-width="2" />
          <text x="30" y="59" text-anchor="middle" fill="#1e1b4b" font-size="12" font-weight="900">μ⁻</text>
          <text x="52" y="59" fill="#fde68a" font-size="14" font-weight="700">Muón (200× e⁻)</text>
          <circle cx="188" cy="55" r="6" fill="#2dd4bf" />
          <text x="202" y="59" fill="#5eead4" font-size="14" font-weight="700">Qubit</text>
        </g>

        <!-- Montañas de Boyacá + Nubes -->
        <path d="M 0 330 L 125 256 L 245 330 Z" fill="#64748b" opacity="0.45" />
        <path d="M 855 330 L 990 248 L 1120 330 Z" fill="#64748b" opacity="0.45" />
        <g fill="#ffffff" opacity="0.9">
          <ellipse cx="490" cy="216" rx="54" ry="20" /><ellipse cx="532" cy="208" rx="44" ry="22" /><ellipse cx="580" cy="218" rx="48" ry="18" />
          <ellipse cx="810" cy="204" rx="48" ry="18" /><ellipse cx="852" cy="200" rx="38" ry="18" />
        </g>

        <!-- Techo y sala del laboratorio (centrado en x=560) -->
        <polygon points="365,330 560,272 755,330" fill="#475569" stroke="#334155" stroke-width="3" />
        <rect x="385" y="330" width="350" height="120" rx="12" fill="#0f172a" stroke="#475569" stroke-width="3" />

        <!-- Chip QPU con padding generoso -->
        <rect class="qpu-chip" x="418" y="348" width="284" height="84" rx="12" fill="#1e293b" stroke="#eab308" stroke-width="3" />
        <text x="560" y="372" text-anchor="middle" fill="#fde047" font-size="14" font-weight="800" font-family="ui-monospace, monospace">CHIP QPU · ESCALA CUÁNTICA</text>

        <!-- 5 Qubits diminutos -->
        <g class="qpu-qubits">
          <g class="qubit-dot" data-q="0" transform="translate(464, 406)">
            <circle r="10" />
            <text y="4" text-anchor="middle" font-size="10" font-weight="800">|0⟩</text>
          </g>
          <g class="qubit-dot q-victim" data-q="1" transform="translate(512, 406)">
            <circle r="10" />
            <text y="4" text-anchor="middle" font-size="10" font-weight="800">|ψ⟩</text>
          </g>
          <g class="qubit-dot q-victim" data-q="2" transform="translate(560, 406)">
            <circle r="10" />
            <text y="4" text-anchor="middle" font-size="10" font-weight="800">|ψ⟩</text>
          </g>
          <g class="qubit-dot q-victim" data-q="3" transform="translate(608, 406)">
            <circle r="10" />
            <text y="4" text-anchor="middle" font-size="10" font-weight="800">|1⟩</text>
          </g>
          <g class="qubit-dot" data-q="4" transform="translate(656, 406)">
            <circle r="10" />
            <text y="4" text-anchor="middle" font-size="10" font-weight="800">|ψ⟩</text>
          </g>
        </g>

        <!-- FASE 1: Rayo cósmico golpeando la atmósfera -->
        <g class="fx-cosmic">
          <line class="cosmic-beam" x1="295" y1="10" x2="560" y2="118" stroke="#c084fc" stroke-width="6" stroke-linecap="round" />
          <circle cx="560" cy="118" r="22" fill="#f0abfc" opacity="0.35" />
          <circle cx="560" cy="118" r="11" fill="#ffffff" />
          <text x="360" y="42" fill="#e9d5ff" font-size="19" font-weight="800">☄️ Rayo cósmico primario</text>
          <!-- Partición en piones -->
          <line x1="560" y1="118" x2="496" y2="158" stroke="#93c5fd" stroke-width="3" stroke-dasharray="5 4" />
          <line x1="560" y1="118" x2="624" y2="158" stroke="#93c5fd" stroke-width="3" stroke-dasharray="5 4" />
          <circle cx="496" cy="158" r="11" fill="#38bdf8" />
          <text x="496" y="162" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="900">π</text>
          <circle cx="624" cy="158" r="11" fill="#38bdf8" />
          <text x="624" y="162" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="900">π</text>
          <text x="644" y="164" fill="#bae6fd" font-size="18" font-weight="800">Piones (π)</text>
        </g>

        <!-- FASE 2 y 3: Estela que atraviesa el chip y sigue derecho hacia el subsuelo -->
        <line class="muon-trail-mid" x1="560" y1="128" x2="560" y2="255" stroke="#f59e0b" stroke-width="5" stroke-dasharray="10 8" />
        <line class="muon-trail-through" x1="560" y1="255" x2="560" y2="555" stroke="#f59e0b" stroke-width="5" stroke-dasharray="10 8" />

        <!-- Muón gordo cayendo y siguiendo derecho sin frenar -->
        <g class="fx-muon">
          <circle class="muon-halo" cx="560" cy="140" r="32" fill="#f59e0b" opacity="0.24" />
          <circle cx="560" cy="140" r="22" fill="#f59e0b" stroke="#fef3c7" stroke-width="3.5" />
          <text x="560" y="146" text-anchor="middle" fill="#1e1b4b" font-size="20" font-weight="900">μ⁻</text>
          <g class="muon-tag-mid" transform="translate(596, 123)">
            <rect x="0" y="0" width="224" height="34" rx="8" fill="#1e1b4b" opacity="0.92" />
            <text x="12" y="23" fill="#fde68a" font-size="16" font-weight="800">Muón · 200× electrón</text>
          </g>
          <g class="muon-tag-pass" transform="translate(596, 123)">
            <rect x="0" y="0" width="262" height="36" rx="8" fill="#f59e0b" />
            <text x="14" y="24" fill="#1e1b4b" font-size="17" font-weight="900">¡Ni lo sintió! Sigue derecho ↓</text>
          </g>
        </g>

        <!-- FASE 3: Onda expansiva y alerta de daño que queda atrás en el chip -->
        <g class="fx-impact">
          <circle class="impact-ring" cx="560" cy="406" r="64" fill="none" stroke="#ef4444" stroke-width="5" />
          <circle cx="560" cy="406" r="32" fill="#ef4444" opacity="0.32" />
          <g transform="translate(215, 282)">
            <rect x="0" y="0" width="256" height="44" rx="10" fill="#dc2626" />
            <text x="128" y="28" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="800">💥 Bit flip en combo!</text>
          </g>
        </g>
      </svg>

      <div class="wiretap-fab" aria-label="Controles de la animación">
        <div class="fab-menu">
          <button class="fab-item fab-play" type="button" data-muon-step title="Paso a paso (+1)">+1</button>
          <button class="fab-item fab-reset" type="button" data-muon-reset title="Reiniciar">↺</button>
        </div>
        <button class="fab-trigger" type="button" data-muon-play title="Reproducir película" aria-label="Reproducir película">▶</button>
      </div>
    </div>
  </div>`;
}

export function initMuonMovie(root) {
  root.querySelectorAll('[data-muon-movie]').forEach(el => {
    let phase = 0;
    let timer = null;

    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const render = () => { el.dataset.phase = String(phase); };

    const stepOnce = () => {
      if (phase >= 3) { stop(); return; }
      phase += 1;
      render();
      if (phase >= 3) stop();
    };

    el.querySelector('[data-muon-play]').addEventListener('click', () => {
      stop();
      phase = 0;
      render();
      timer = setInterval(stepOnce, 1300);
      setTimeout(stepOnce, 120);
    });

    el.querySelector('[data-muon-step]').addEventListener('click', () => {
      stop();
      phase = phase >= 3 ? 0 : phase + 1;
      render();
    });

    el.querySelector('[data-muon-reset]').addEventListener('click', () => {
      stop();
      phase = 0;
      render();
    });

    render();
  });
}
