// Acto 4: 1) Simulación de conexión al QPU en la nube, y 2) el reloj del ritmo (a^x mod N).

export function shorTapMarkup() {
  return `<div class="wiretap" data-shor-tap data-state="idle">
    <div class="wiretap-stage">
      <div class="wire-node node-ale">
        <span class="wire-avatar">🕶️</span>
        <strong>Tu portátil</strong>
        <span class="key-badge">En el andén (Tunja)</span>
        <span class="wire-chip chip-ale" data-stap-laptop>🔓 N = 15, e = 3 · 🔒 c = 9</span>
      </div>
      <div class="wire-line">
        <div class="wire-cable"></div>
        <span class="wire-packet" data-stap-packet>⚛ Circuito (N=15, a=7)</span>
        <div class="wire-box" data-stap-box>
          <span class="box-icon" data-stap-icon>☁️</span>
          <strong>API en la nube</strong>
          <small data-stap-label>Conecta tu portátil con el laboratorio</small>
        </div>
        <div class="wire-drop">
          <div class="wire-branch"></div>
          <div class="wire-hacker">
            <span>🔓 Llave reconstruida</span>
            <code data-stap-log>Esperando el ritmo r…</code>
          </div>
        </div>
      </div>
      <div class="wire-node node-brayan">
        <span class="wire-avatar">❄️</span>
        <strong>QPU (~15 mK)</strong>
        <span class="key-badge">100× más frío que el espacio</span>
        <span class="wire-chip chip-brayan" data-stap-qpu>En espera…</span>
      </div>
      <div class="wiretap-fab" aria-label="Escenas de la simulación">
        <div class="fab-menu">
          <button class="fab-item fab-play" type="button" data-stap="cloud" title="Romper RSA con el QPU en la nube">#1</button>
          <button class="fab-item fab-reset" type="button" data-stap="reset" title="Reiniciar">↺</button>
        </div>
        <button class="fab-trigger" type="button" data-stap="cloud" aria-label="Reproducir escena">▶</button>
      </div>
    </div>
    <p class="wiretap-status" data-stap-status></p>
  </div>`;
}

const CLOCK_N = 15;
const CLOCK_STEPS = [
  { step: 0, val: 1, deg: 24, label: 'Inicio', detail: 'Empezamos en 1' },
  { step: 1, val: 7, deg: 168, label: 'Salto 1', detail: '1 × 7 = 7' },
  { step: 2, val: 4, deg: 456, label: 'Salto 2', detail: '7 × 7 = 49 → 4', isHalf: true },
  { step: 3, val: 13, deg: 672, label: 'Salto 3', detail: '4 × 7 = 28 → 13' },
  { step: 4, val: 1, deg: 744, label: 'Salto 4', detail: '13 × 7 = 91 → 1 🔄', isEnd: true }
];
const MAX_PHASE = 6; // 0..4: contar saltos hasta r=4 | 5: mirar salto r/2=2 (x=4) | 6: factores con x-1 y x+1

const CX = 170, CY = 170, R_NUM = 126, R_PIN = 90;
const polar = (val, r) => {
  const rad = ((val * (360 / CLOCK_N)) - 90) * (Math.PI / 180);
  return { x: +(CX + r * Math.cos(rad)).toFixed(1), y: +(CY + r * Math.sin(rad)).toFixed(1) };
};

function buildClockSvg() {
  const marks = Array.from({ length: CLOCK_N }, (_, k) => {
    const numPos = polar(k, R_NUM);
    const pinPos = polar(k, R_PIN);
    const isCycle = k === 1 || k === 7 || k === 4 || k === 13;
    return `<g class="clock-mark${isCycle ? ' is-cycle-node' : ''}" data-clock-node="${k}">
      <circle class="clock-pin" cx="${pinPos.x}" cy="${pinPos.y}" r="${isCycle ? 5 : 3}" />
      <circle class="clock-num-bg" cx="${numPos.x}" cy="${numPos.y}" r="18" />
      <text class="clock-num" x="${numPos.x}" y="${numPos.y}" dy="0.35em" text-anchor="middle">${k}</text>
    </g>`;
  }).join('');

  const chords = [
    [1, 7, 1],
    [7, 4, 2],
    [4, 13, 3],
    [13, 1, 4]
  ].map(([from, to, stepIdx]) => {
    const p1 = polar(from, R_PIN);
    const p2 = polar(to, R_PIN);
    return `<line class="clock-chord" data-clock-chord="${stepIdx}" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" />`;
  }).join('');

  return `<svg class="shor-clock-svg" viewBox="0 0 340 340" aria-label="Reloj modular de 15 marcas">
    <circle class="clock-rim" cx="${CX}" cy="${CY}" r="154" />
    <circle class="clock-inner-ring" cx="${CX}" cy="${CY}" r="${R_PIN}" />
    ${chords}
    ${marks}
    <g class="clock-hand" data-clock-hand style="transform: rotate(24deg);">
      <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY - R_PIN + 6}" />
      <polygon points="${CX},${CY - R_PIN - 2} ${CX - 6},${CY - R_PIN + 12} ${CX + 6},${CY - R_PIN + 12}" />
    </g>
    <circle class="clock-center" cx="${CX}" cy="${CY}" r="9" />
  </svg>`;
}

export function periodMarkup() {
  const chips = CLOCK_STEPS.map(s => `
    <div class="rhythm-chip${s.isHalf ? ' chip-half' : ''}${s.isEnd ? ' chip-end' : ''}" data-rhythm-step="${s.step}">
      <span class="rhythm-step-lbl">${s.label}</span>
      <strong class="rhythm-val">${s.val}</strong>
      <small class="rhythm-detail">${s.detail}</small>
    </div>
  `).join('<span class="rhythm-arrow" aria-hidden="true">→</span>');

  return `<div class="shor-rhythm" data-period data-step="0">
    <div class="rhythm-stage">
      <div class="rhythm-clock-card">
        <div class="clock-badge">Reloj de <b>N = 15</b> marcas · <code>7<sup>x</sup> mod 15</code></div>
        ${buildClockSvg()}
        <div class="clock-caption" data-clock-caption><code>7<sup>0</sup> mod 15 = 1</code><small>Inicio en 1 · pulsa ▶</small></div>
      </div>

      <div class="rhythm-explain">
        <div class="rhythm-box box-jumps">
          <div class="rhythm-box-head">
            <span class="rhythm-box-tag">1. Contamos los saltos hasta volver a 1</span>
            <span class="r-found-badge" data-r-badge>🎯 r = 4 saltos</span>
          </div>
          <div class="rhythm-track">${chips}</div>
        </div>

        <div class="rhythm-bottom-grid">
          <div class="rhythm-box box-half" data-rhythm-half>
            <span class="rhythm-box-tag">2. Con r = 4, miramos la mitad (salto r/2)</span>
            <div class="half-highlight">
              <span class="half-pill">Salto 4/2 = Salto 2</span>
              <strong>Valor en el reloj: <span class="num-accent">x = 4</span></strong>
            </div>
            <small><b>r = 4</b> son los saltos; <b>x = 4</b> es donde cayó la aguja en el salto 2</small>
          </div>

          <div class="rhythm-box box-neighbors" data-rhythm-crack>
            <span class="rhythm-box-tag">3. Usamos x − 1 y x + 1 para sacar p y q</span>
            <div class="neighbors-calc">
              <span class="neighbor-pill">x − 1 = <b>3</b></span>
              <span class="neighbor-mult">×</span>
              <span class="neighbor-pill">x + 1 = <b>5</b></span>
              <span class="neighbor-eq">=</span>
              <span class="neighbor-win">🔓 15</span>
            </div>
            <small><code>mcd(3, 15) = 3</code> · <code>mcd(5, 15) = 5</code></small>
          </div>
        </div>
      </div>

      <div class="wiretap-fab" aria-label="Controles del reloj">
        <div class="fab-menu">
          <button class="fab-item fab-play" type="button" data-period-step title="Paso a paso (+1 salto)">+1</button>
          <button class="fab-item fab-reset" type="button" data-period-reset title="Reiniciar">↺</button>
        </div>
        <button class="fab-trigger" type="button" data-period-play title="Girar el reloj (× 7 en reloj de 15)" aria-label="Girar el reloj">▶</button>
      </div>
    </div>
  </div>`;
}

export function initPeriod(root) {
  // Simulación del enlace al QPU
  root.querySelectorAll('[data-shor-tap]').forEach(el => {
    const laptop = el.querySelector('[data-stap-laptop]');
    const packet = el.querySelector('[data-stap-packet]');
    const icon = el.querySelector('[data-stap-icon]');
    const label = el.querySelector('[data-stap-label]');
    const log = el.querySelector('[data-stap-log]');
    const qpu = el.querySelector('[data-stap-qpu]');
    const status = el.querySelector('[data-stap-status]');
    let timers = [];
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const setState = s => { el.dataset.state = s; };

    const reset = () => {
      clear();
      setState('idle');
      laptop.textContent = '🔓 N = 15, e = 3 · 🔒 c = 9';
      packet.textContent = '⚛ Circuito (N=15, a=7)';
      icon.textContent = '☁️';
      label.textContent = 'Conecta tu portátil con el laboratorio';
      log.textContent = 'Esperando el ritmo r…';
      qpu.textContent = 'En espera…';
      status.textContent = '';
    };

    const runCloud = () => {
      clear();
      packet.textContent = '⚛ Circuito (N=15, a=7)';
      setState('tapped');
      icon.textContent = '☁️';
      label.textContent = 'Enviando circuito por la API';
      log.textContent = 'Esperando mediciones…';
      qpu.textContent = 'Preparando qubits…';
      status.textContent = '1/3 · Desde el portátil mandamos N = 15 y a = 7 al QPU en la nube.';

      timers.push(setTimeout(() => {
        setState('sending');
        status.textContent = '2/3 · El QPU corre el circuito de Shor y mide los picos del ritmo.';
      }, 650));

      timers.push(setTimeout(() => { setState('arriving'); }, 1350));

      timers.push(setTimeout(() => {
        setState('pub-mid');
        packet.textContent = '📊 Picos → r = 4';
        qpu.textContent = '¡Medido! Ritmo r = 4';
      }, 1750));

      timers.push(setTimeout(() => { setState('pub-arriving'); }, 2350));

      timers.push(setTimeout(() => {
        setState('pub-done');
        log.textContent = '15 = 3 × 5 → d = 3 → ¡RSA ROTO! 🔓';
        laptop.textContent = 'Mensaje descifrado ✅';
        status.textContent = '3/3 · Con r = 4 nuestro portátil parte 15 = 3 × 5, reconstruye d y abre el mensaje.';
      }, 2950));
    };

    el.querySelectorAll('[data-stap="cloud"]').forEach(btn => btn.addEventListener('click', runCloud));
    el.querySelector('[data-stap="reset"]').addEventListener('click', reset);
  });

  // Simulación del reloj del ritmo (periodo r = 4 para N = 15, a = 7)
  root.querySelectorAll('[data-period]').forEach(box => {
    const hand = box.querySelector('[data-clock-hand]');
    const caption = box.querySelector('[data-clock-caption]');
    const stepEls = box.querySelectorAll('[data-rhythm-step]');
    const chordEls = box.querySelectorAll('[data-clock-chord]');
    const nodeEls = box.querySelectorAll('[data-clock-node]');
    let currentStep = 0;
    let timer = null;

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const render = () => {
      const clockIdx = Math.min(currentStep, CLOCK_STEPS.length - 1);
      const info = CLOCK_STEPS[clockIdx];
      box.dataset.step = String(currentStep);
      hand.style.transform = `rotate(${info.deg}deg)`;

      stepEls.forEach(el => {
        const s = Number(el.dataset.rhythmStep);
        el.classList.toggle('is-visible', s <= clockIdx);
        el.classList.toggle('is-current', currentStep <= 4 ? s === clockIdx : currentStep === 5 && s === 2);
        el.classList.toggle('is-half-highlight', currentStep >= 5 && s === 2);
      });

      chordEls.forEach(el => {
        const s = Number(el.dataset.clockChord);
        el.classList.toggle('is-active', s <= clockIdx);
      });

      const visitedVals = new Set(CLOCK_STEPS.slice(0, clockIdx + 1).map(s => s.val));
      nodeEls.forEach(el => {
        const k = Number(el.dataset.clockNode);
        el.classList.toggle('is-visited', visitedVals.has(k));
        el.classList.toggle('is-now', currentStep <= 4 ? k === info.val : false);
        el.classList.toggle('is-half-node', currentStep >= 5 && k === 4);
      });

      if (currentStep === 0) {
        caption.innerHTML = '<code>7<sup>0</sup> mod 15 = 1</code><small>Inicio en 1 · pulsa ▶</small>';
      } else if (currentStep === 1) {
        caption.innerHTML = '<code>7<sup>1</sup> mod 15 = 7</code><small>Salto 1: 1 × 7 = 7</small>';
      } else if (currentStep === 2) {
        caption.innerHTML = '<code>7<sup>2</sup> mod 15 = 4</code><small>Salto 2: 49 = 3×15 + 4</small>';
      } else if (currentStep === 3) {
        caption.innerHTML = '<code>7<sup>3</sup> mod 15 = 13</code><small>Salto 3: 28 = 1×15 + 13</small>';
      } else if (currentStep === 4) {
        caption.innerHTML = '<code>7<sup>4</sup> mod 15 = 1 🎯</code><small>¡Volvió a 1! Ritmo r = 4 saltos</small>';
      } else if (currentStep === 5) {
        caption.innerHTML = '<code>Salto r/2 = 2 → x = 4 ⭐</code><small>Ahora miramos qué cayó a mitad del ciclo</small>';
      } else {
        caption.innerHTML = '<code>mcd(4−1, 15)=3 · mcd(4+1, 15)=5</code><small>🔓 Candado roto: 15 = 3 × 5</small>';
      }
    };

    const stepOnce = () => {
      if (currentStep >= MAX_PHASE) {
        stopTimer();
        return;
      }
      currentStep += 1;
      render();
      if (currentStep >= MAX_PHASE) {
        stopTimer();
      }
    };

    const reset = () => {
      stopTimer();
      currentStep = 0;
      render();
    };

    box.querySelector('[data-period-play]').addEventListener('click', () => {
      stopTimer();
      currentStep = 0;
      render();
      timer = setInterval(stepOnce, 950);
    });

    box.querySelector('[data-period-step]').addEventListener('click', () => {
      stopTimer();
      if (currentStep >= MAX_PHASE) {
        currentStep = 0;
        render();
      } else {
        stepOnce();
      }
    });

    box.querySelector('[data-period-reset]').addEventListener('click', reset);
    render();
  });
}
