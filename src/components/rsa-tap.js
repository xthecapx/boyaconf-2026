// Acto 3: simulación del cable con RSA.
// Primero Brayan envía el candado abierto (N=33, e=3) hacia Ale (derecha -> izquierda),
// luego Ale cierra el mensaje con el candado (m=4 -> c=31) y lo envía hacia Brayan (izquierda -> derecha).

export function rsaTapMarkup() {
  return `<div class="wiretap" data-rsa-tap data-state="idle">
    <div class="wiretap-stage">
      <div class="wire-node node-ale">
        <span class="wire-avatar">🐎</span>
        <strong>Ale</strong>
        <span class="key-badge" data-rtap-ale-key>Sin candado aún</span>
        <span class="wire-chip chip-ale" data-rtap-ale>m = 4 (letra D)</span>
      </div>
      <div class="wire-line">
        <div class="wire-cable"></div>
        <span class="wire-packet" data-rtap-packet>🔓 (N=33, e=3)</span>
        <div class="wire-box" data-rtap-box>
          <span class="box-icon" data-rtap-icon>🔌</span>
          <strong>Sniffer en la mitad</strong>
          <small data-rtap-label>Escuchando el cable</small>
        </div>
        <div class="wire-drop">
          <div class="wire-branch"></div>
          <div class="wire-hacker">
            <span>🕶️ Ustedes (Hacker)</span>
            <code data-rtap-copy>Esperando…</code>
          </div>
        </div>
      </div>
      <div class="wire-node node-brayan">
        <span class="wire-avatar">🧢</span>
        <strong>Brayan</strong>
        <span class="key-badge">🔑 Privada d = 7 (secreta)</span>
        <span class="wire-chip chip-brayan" data-rtap-brayan>🔓 Pública (N=33, e=3)</span>
      </div>
      <div class="wiretap-fab" aria-label="Escenas de la simulación">
        <div class="fab-menu">
          <button class="fab-item fab-play" type="button" data-rtap="pub" title="Escena 1: Brayan envía el candado">#1</button>
          <button class="fab-item fab-play" type="button" data-rtap="enc" title="Escena 2: Ale envía el mensaje cerrado">#2</button>
          <button class="fab-item fab-reset" type="button" data-rtap="reset" title="Reiniciar">↺</button>
        </div>
        <button class="fab-trigger" type="button" aria-label="Mostrar escenas">▶</button>
      </div>
    </div>
    <p class="wiretap-status" data-rtap-status></p>
  </div>`;
}

export function initRsaTap(root) {
  root.querySelectorAll('[data-rsa-tap]').forEach(el => {
    const aleKey = el.querySelector('[data-rtap-ale-key]');
    const aleChip = el.querySelector('[data-rtap-ale]');
    const packet = el.querySelector('[data-rtap-packet]');
    const icon = el.querySelector('[data-rtap-icon]');
    const label = el.querySelector('[data-rtap-label]');
    const copy = el.querySelector('[data-rtap-copy]');
    const brayan = el.querySelector('[data-rtap-brayan]');
    const status = el.querySelector('[data-rtap-status]');
    let timers = [];
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const setState = s => { el.dataset.state = s; };

    const reset = () => {
      clear();
      setState('idle');
      aleKey.textContent = 'Sin candado aún';
      aleChip.textContent = 'm = 4 (letra D)';
      packet.textContent = '🔓 (N=33, e=3)';
      icon.textContent = '🔌';
      label.textContent = 'Escuchando el cable';
      copy.textContent = 'Esperando…';
      brayan.textContent = '🔓 Pública (N=33, e=3)';
      status.textContent = '';
    };

    // Escena 1: Brayan (derecha) -> caja -> Ale (izquierda)
    el.querySelector('[data-rtap="pub"]').addEventListener('click', () => {
      clear();
      packet.textContent = '🔓 (N=33, e=3)';
      setState('pub-start');
      icon.textContent = '🔌';
      label.textContent = 'Pasa la clave pública';
      copy.textContent = 'Copiando candado…';
      status.textContent = '1/2 · Brayan envía su candado abierto (N=33, e=3) hacia Ale…';

      timers.push(setTimeout(() => {
        setState('pub-mid');
        copy.textContent = '🔓 (N=33, e=3)';
      }, 650));

      timers.push(setTimeout(() => { setState('pub-arriving'); }, 1300));

      timers.push(setTimeout(() => {
        setState('pub-done');
        aleKey.textContent = '🔓 (N=33, e=3)';
        status.textContent = '2/2 · Ale y nosotros tenemos el candado abierto. Pero un candado abierto solo sirve para cerrar, no para abrir.';
      }, 1950));
    });

    // Escena 2: Ale cierra m=4 -> c=31 y envía a Brayan (izquierda -> derecha)
    el.querySelector('[data-rtap="enc"]').addEventListener('click', () => {
      clear();
      aleKey.textContent = '🔓 (N=33, e=3)';
      aleChip.textContent = '4³ mod 33 → c = 31';
      packet.textContent = '🔒 c = 31';
      setState('tapped');
      icon.textContent = '🔌';
      label.textContent = 'Capturando texto cifrado';
      status.textContent = '1/3 · Ale cierra su letra (m = 4) con el candado de Brayan: 4³ mod 33 = 31.';

      timers.push(setTimeout(() => {
        setState('sending');
        status.textContent = '2/3 · Por el cable viaja c = 31. Nuestro sniffer guarda la copia.';
      }, 650));

      timers.push(setTimeout(() => {
        setState('copied');
        copy.textContent = '🔓 (33, 3) + 🔒 c = 31';
      }, 1400));

      timers.push(setTimeout(() => { setState('arriving'); }, 1600));

      timers.push(setTimeout(() => {
        setState('delivered');
        brayan.textContent = '31⁷ mod 33 → m = 4 (D)';
        status.textContent = '3/3 · Brayan abre con d=7. Nosotros tenemos N=33, e=3 y c=31… ¡nos falta d!';
      }, 2350));
    });

    el.querySelector('[data-rtap="reset"]').addEventListener('click', reset);
  });
}

