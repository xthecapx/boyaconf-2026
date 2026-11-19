// Acto 1: simulación de Ale -> caja en la mitad (sniffer) -> Brayan.
// Dos escenas con botón ▶ claro y sin paquete flotante duplicado al llegar a Brayan.
const PAYLOAD = '2 · 15 · 25 · 1 · 3 · 1';

export function wireTapMarkup() {
  return `<div class="wiretap" data-wiretap data-state="idle">
    <div class="wiretap-stage">
      <div class="wire-node node-ale">
        <span class="wire-avatar">🐎</span>
        <strong>Ale</strong>
        <span class="wire-chip chip-ale">${PAYLOAD}</span>
      </div>
      <div class="wire-line">
        <div class="wire-cable"></div>
        <span class="wire-packet" data-tap-packet>📨 ${PAYLOAD}</span>
        <div class="wire-box" data-tap-box>
          <span class="box-icon" data-tap-icon>📦</span>
          <strong>Caja en la mitad</strong>
          <small data-tap-box-label>Cable directo</small>
        </div>
        <div class="wire-drop">
          <div class="wire-branch"></div>
          <div class="wire-hacker">
            <span>🕶️ Ustedes (Hacker)</span>
            <code data-tap-copy>Esperando…</code>
          </div>
        </div>
      </div>
      <div class="wire-node node-brayan">
        <span class="wire-avatar">🧢</span>
        <strong>Brayan</strong>
        <span class="wire-chip chip-brayan" data-tap-brayan>Esperando…</span>
      </div>
      <div class="wiretap-fab" aria-label="Escenas de la simulación">
        <div class="fab-menu">
          <button class="fab-item fab-play" type="button" data-tap-action="sniff" title="Escena 1: Escuchar con sniffer">#1</button>
          <button class="fab-item fab-reset" type="button" data-tap-action="reset" title="Reiniciar">↺</button>
        </div>
        <button class="fab-trigger" type="button" data-tap-action="sniff" aria-label="Reproducir escena">▶</button>
      </div>
    </div>
    <p class="wiretap-status" data-tap-status></p>
  </div>`;
}

export function initWireTap(root) {
  root.querySelectorAll('[data-wiretap]').forEach(el => {
    const icon = el.querySelector('[data-tap-icon]');
    const boxLabel = el.querySelector('[data-tap-box-label]');
    const copy = el.querySelector('[data-tap-copy]');
    const brayan = el.querySelector('[data-tap-brayan]');
    const status = el.querySelector('[data-tap-status]');
    let timers = [];
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const setState = state => { el.dataset.state = state; };

    const reset = () => {
      clear();
      setState('idle');
      icon.textContent = '📦';
      boxLabel.textContent = 'Cable directo';
      copy.textContent = 'Esperando…';
      brayan.textContent = 'Esperando…';
      status.textContent = '';
    };

    const runSniff = () => {
      clear();
      setState('tapped');
      icon.textContent = '🔌';
      boxLabel.textContent = 'Sniffer pasivo conectado';
      copy.textContent = 'Escuchando línea…';
      brayan.textContent = 'Esperando…';
      status.textContent = '1/3 · Enganchamos el sniffer en la caja: escucha sin cortar el cable.';

      timers.push(setTimeout(() => {
        setState('sending');
        status.textContent = '2/3 · Ale envía el mensaje… al pasar por la caja sacamos una copia.';
      }, 650));

      timers.push(setTimeout(() => {
        setState('copied');
        copy.textContent = PAYLOAD;
      }, 1450));

      timers.push(setTimeout(() => {
        setState('arriving');
      }, 1650));

      timers.push(setTimeout(() => {
        setState('delivered');
        brayan.textContent = PAYLOAD;
        status.textContent = '3/3 · Brayan recibe su mensaje feliz. Nadie sospecha, y nosotros tenemos la copia.';
      }, 2400));
    };

    el.querySelectorAll('[data-tap-action="sniff"]').forEach(btn => btn.addEventListener('click', runSniff));
    el.querySelector('[data-tap-action="reset"]').addEventListener('click', reset);
  });
}
