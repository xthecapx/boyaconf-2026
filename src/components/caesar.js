// Acto 2: 1) Simulación del cable con César (la clave k no pasa por el cable) y 2) barrido de las 25 claves.
const A = 'A'.charCodeAt(0);
export const shift = (text, k) => text.replace(/[A-Z]/g, ch =>
  String.fromCharCode(((ch.charCodeAt(0) - A + k) % 26 + 26) % 26 + A));

export const CAESAR_PLAIN = 'TENGO CASA SOLA MOR';
export const CAESAR_KEY = 7;
export const CAESAR_CIPHER = shift(CAESAR_PLAIN, CAESAR_KEY);

export function caesarTapMarkup() {
  return `<div class="wiretap" data-caesar-tap data-state="idle">
    <div class="wiretap-stage">
      <div class="wire-node node-ale">
        <span class="wire-avatar">🐎</span>
        <strong>Ale</strong>
        <span class="key-badge">🔑 k = ??? (en persona)</span>
        <span class="wire-chip chip-ale" data-ctap-ale>🔒 Mensaje secreto</span>
      </div>
      <div class="wire-line">
        <div class="wire-cable"></div>
        <span class="wire-packet" data-ctap-packet>📨 ${CAESAR_CIPHER}</span>
        <div class="wire-box" data-ctap-box>
          <span class="box-icon" data-ctap-icon>🔌</span>
          <strong>Sniffer en la mitad</strong>
          <small data-ctap-label>La clave k nunca pasa por aquí</small>
        </div>
        <div class="wire-drop">
          <div class="wire-branch"></div>
          <div class="wire-hacker">
            <span>🕶️ Ustedes (Hacker)</span>
            <code data-ctap-copy>Esperando…</code>
          </div>
        </div>
      </div>
      <div class="wire-node node-brayan">
        <span class="wire-avatar">🧢</span>
        <strong>Brayan</strong>
        <span class="key-badge">🔑 k = ??? (en persona)</span>
        <span class="wire-chip chip-brayan" data-ctap-brayan>Esperando…</span>
      </div>
      <div class="wiretap-fab" aria-label="Escenas de la simulación">
        <div class="fab-menu">
          <button class="fab-item fab-play" type="button" data-ctap="intercept" title="Escena 1: Capturar mensaje cifrado">#1</button>
          <button class="fab-item fab-reset" type="button" data-ctap="reset" title="Reiniciar">↺</button>
        </div>
        <button class="fab-trigger" type="button" data-ctap="intercept" aria-label="Reproducir escena">▶</button>
      </div>
    </div>
    <p class="wiretap-status" data-ctap-status></p>
  </div>`;
}

export function caesarMarkup() {
  return `<div class="caesar" data-caesar>
    <p class="caesar-label">Capturado en el cable (sin la clave k)</p>
    <p class="caesar-text caesar-cipher">${CAESAR_CIPHER}</p>
    <div class="caesar-controls">
      <button class="demo-button btn-play" type="button" data-caesar-sweep>▶ Probar las 25 claves</button>
      <label>k = <output data-caesar-k>0</output> / 25</label>
      <input type="range" min="0" max="25" value="0" step="1" data-caesar-range aria-label="Desplazamiento k" />
    </div>
    <p class="caesar-label">Moviendo cada letra k posiciones atrás: <code>m = (c − k) mod 26</code></p>
    <p class="caesar-text caesar-plain" data-caesar-out>${CAESAR_CIPHER}</p>
  </div>`;
}

export function initCaesar(root) {
  // Simulación del cable en el Acto 2
  root.querySelectorAll('[data-caesar-tap]').forEach(el => {
    const ale = el.querySelector('[data-ctap-ale]');
    const icon = el.querySelector('[data-ctap-icon]');
    const label = el.querySelector('[data-ctap-label]');
    const copy = el.querySelector('[data-ctap-copy]');
    const brayan = el.querySelector('[data-ctap-brayan]');
    const status = el.querySelector('[data-ctap-status]');
    let timers = [];
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const setState = s => { el.dataset.state = s; };

    const reset = () => {
      clear();
      setState('idle');
      ale.textContent = '🔒 Mensaje secreto';
      icon.textContent = '🔌';
      label.textContent = 'La clave k nunca pasa por aquí';
      copy.textContent = 'Esperando…';
      brayan.textContent = 'Esperando…';
      status.textContent = '';
    };

    const runIntercept = () => {
      clear();
      setState('tapped');
      ale.textContent = `Mensaje + k → ${CAESAR_CIPHER}`;
      icon.textContent = '🔌';
      label.textContent = 'Escuchando texto cifrado';
      copy.textContent = 'Escuchando…';
      brayan.textContent = 'Esperando…';
      status.textContent = '1/3 · Ale suma la clave secreta k antes de enviar: c = (m + k) mod 26.';

      timers.push(setTimeout(() => {
        setState('sending');
        status.textContent = '2/3 · Por el cable solo viaja garabato. Copiamos el texto cifrado.';
      }, 700));

      timers.push(setTimeout(() => {
        setState('copied');
        copy.textContent = CAESAR_CIPHER;
      }, 1450));

      timers.push(setTimeout(() => { setState('arriving'); }, 1650));

      timers.push(setTimeout(() => {
        setState('delivered');
        brayan.textContent = `${CAESAR_CIPHER} → −k → 💬 Leído`;
        status.textContent = '3/3 · Brayan resta k y lee el mensaje. Nosotros no tenemos k… pero solo hay 25.';
      }, 2400));
    };

    el.querySelectorAll('[data-ctap="intercept"]').forEach(btn => btn.addEventListener('click', runIntercept));
    el.querySelector('[data-ctap="reset"]').addEventListener('click', reset);
  });

  // Barrido de las 25 claves
  root.querySelectorAll('[data-caesar]').forEach(box => {
    const range = box.querySelector('[data-caesar-range]');
    const kOut = box.querySelector('[data-caesar-k]');
    const out = box.querySelector('[data-caesar-out]');
    const sweep = box.querySelector('[data-caesar-sweep]');
    let timer = null;
    const render = k => {
      range.value = k; kOut.textContent = k;
      if (k === CAESAR_KEY) {
        out.innerHTML = `TENGO CASA SOLA <span class="caesar-redacted" tabindex="0" title="Clic para revelar"><span class="redacted-cover">???</span><span class="redacted-word">MOR</span></span>`;
        const badge = out.querySelector('.caesar-redacted');
        badge.addEventListener('click', () => badge.classList.toggle('is-revealed'));
      } else {
        out.textContent = shift(CAESAR_CIPHER, -k);
      }
      box.classList.toggle('is-found', k === CAESAR_KEY);
    };
    range.addEventListener('input', () => { clearInterval(timer); render(Number(range.value)); });
    range.addEventListener('keydown', event => event.stopPropagation());
    sweep.addEventListener('click', () => {
      clearInterval(timer);
      let k = 0;
      render(k);
      timer = setInterval(() => {
        k += 1; render(k);
        if (k >= CAESAR_KEY) clearInterval(timer);
      }, 650);
    });
    render(0);
  });
}
