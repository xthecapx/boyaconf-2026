import { caesarMarkup, caesarTapMarkup, CAESAR_CIPHER } from './components/caesar.js';
import { periodMarkup, shorTapMarkup } from './components/period.js';
import { wireTapMarkup } from './components/wire-tap.js';
import { rsaTapMarkup } from './components/rsa-tap.js';
import { muonMovieMarkup } from './components/muon-movie.js';

const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;
const GAME_URL = 'https://qollab.xyz/u/xthecapx/qward';

// Medido sobre los lotes grabados de ibm_marrakesh en rsa/backend/app/data/recorded_batches
// (N = 15, a = 7, 5 trabajos × 4096 disparos por m). "Picos" = los 4 resultados ideales para r = 4.
const IBM_PEAKS = [
  { m: 3, states: 8, real: 56.2, random: 50.0, verdict: '✅ Se distingue r = 4', cls: 'v-ok' },
  { m: 4, states: 16, real: 32.8, random: 25.0, verdict: '✅ Recupera r = 4', cls: 'v-ok' },
  { m: 6, states: 64, real: 10.0, random: 6.25, verdict: '⚠️ Señal débil', cls: 'v-warn' },
  { m: 8, states: 256, real: 2.1, random: 1.56, verdict: '❌ Casi igual al azar', cls: 'v-bad' },
];

const bar = (label, value, cls) =>
  `<div class="bar-row ${cls}"><span>${label}</span><div class="bar-track"><span style="width:${value}%"></span></div><b>${value}%</b></div>`;

/**
 * Cada diapositiva: id, title, seconds, kind, html, notes (guion) y bit (chiste / cue de stand-up).
 * Meta: ~24 min guionados + ~3 min de risas/pausas + ~3 min de preguntas = 30 min.
 */
const talk = [
  // ───────────────────────── Apertura ─────────────────────────
  {
    id: 'portada', title: 'Rompiendo RSA con una QPU real', seconds: 15, kind: 'title-slide cover',
    html: `<p class="event-name">BoyaConf 2026</p>
      <h1>Rompiendo RSA con una QPU real</h1>
      <p class="cover-subtitle fragment fade-up">Un atraco en cuatro actos</p>
      <div class="speaker"><strong>@Thecap</strong><span>Software developer @ GoDaddy - PhD Candidate - Uniandes</span></div>`,
    notes: 'Entrar caminando con energía, no desde el atril. Dejar la portada mientras se acomoda el micrófono.',
    bit: 'Sin chiste aquí. Sonreír, mirar al público, respirar. El primer chiste va en la siguiente.'
  },
  {
    id: 'ultimo', title: 'Bienvenidos al turno después del almuerzo', seconds: 75, kind: 'standup-slide',
    html: `<div class="standup-visual">
        <div class="standup-barrier" aria-label="Soy lo único entre el almuerzo y la siesta">
          <div class="barrier-item"><span class="barrier-emoji">🍽️</span><small>El almuerzo</small></div>
          <span class="barrier-line" aria-hidden="true"></span>
          <div class="barrier-item barrier-me"><span class="barrier-emoji">🎤</span><small>Yo</small></div>
          <span class="barrier-line" aria-hidden="true"></span>
          <div class="barrier-item"><span class="barrier-emoji">😴</span><small>La siesta</small></div>
        </div>
        <div class="standup-cards">
          <div class="standup-card fragment">
            <span class="card-emoji">📅 → 🔄</span>
            <strong>Iba de último</strong>
          </div>
          <div class="standup-card card-deal fragment">
            <span class="card-emoji">🍲 → ⚡</span>
            <strong>Misión: despertarlos</strong>
          </div>
          <div class="standup-card fragment">
            <span class="card-emoji">🕵️‍♂️ → ☕</span>
            <strong>1 crimen en 30m</strong>
          </div>
        </div>
      </div>`,
    notes: 'Cold open de stand-up post-almuerzo. 1) Señalar el diagrama arriba: «Soy lo único entre el almuerzo y la siesta». 2) Primer avance (Iba de último): «En la agenda me esperaban de último, pero me tocó cambiar al primer turno de la tarde». 3) Segundo avance (Misión: despertarlos): «Así que tengo la misión oficial de despertarlos después del almuerzo». 4) Tercer avance (1 crimen en 30m): «Y nada quita más el sueño que aprender a cometer un crimen en 30 minutos».',
    bit: 'Setup: «En la agenda me esperaban de último… pero me cambiaron al primer turno después del almuerzo. O sea, pasé de competir contra la cerveza a competir contra la siesta.» Pausa. «Mi misión hoy es despertarlos en 30 minutos… enseñándoles cómo cometer un crimen.»'
  },
  {
    id: 'mensajes', title: '¿Quién mandó un mensaje hoy?', seconds: 60, kind: 'standup-slide meme-slide',
    html: `<div class="meme-grid">
        <div class="meme-row fragment">
          <div class="meme-label">
            <span class="meme-tag">EXPECTATIVA...</span>
            <p>“Esto solo lo lee mi parcero.”</p>
          </div>
          <div class="meme-art">
            <img src="${asset('mensaje-expectativa.jpg')}" alt="Dos personas enviándose un mensaje directo de celular a celular" />
          </div>
        </div>
        <div class="meme-row fragment">
          <div class="meme-label">
            <span class="meme-tag">REALIDAD...</span>
            <p>Cables, routers y la oficina de gente que no conoces.</p>
          </div>
          <div class="meme-art">
            <img src="${asset('mensaje-realidad.jpg')}" alt="El mensaje pasando por antenas, cables subterráneos, servidores y una oficina llena de desconocidos" />
          </div>
        </div>
      </div>`,
    notes: 'Entrada: aparece solo el título «¿Quién mandó un mensaje hoy?» para hacer la pregunta al público y dejar la pregunta central. 1er avance: fila de EXPECTATIVA («Esto solo lo lee mi parcero»). 2do avance: fila de REALIDAD (cables, routers y oficinas de gente que no conoces). Decir a viva voz el cierre: «Lo único que lo protege es matemática. Hoy la vamos a romper… a propósito.» (RSA es la abuela de esa familia; no afirmar que WhatsApp usa RSA).',
    bit: '«¿Quién mandó un WhatsApp hoy? … ¿Y quién lo mandó DURANTE una charla?» Señalar a alguien amablemente: «No se preocupe, no estaba cifrado contra mí.»'
  },
  {
    id: 'personajes', title: 'Hablemos de cuántica… y de sus protagonistas', seconds: 50, kind: 'standup-slide protagonists-slide',
    html: `<div class="protagonists-grid">
        <div class="protagonist-col fragment">
          <span class="protagonist-kicker">Físicos e ingenieros</span>
          <div class="protagonist-stage stage-ab">
            <span class="node-box">A</span>
            <span class="node-arrow" aria-hidden="true"></span>
            <span class="node-box">B</span>
          </div>
          <p class="protagonist-caption">Frío y sin gracia</p>
        </div>
        <div class="protagonist-col fragment">
          <span class="protagonist-kicker">Divulgadores</span>
          <div class="protagonist-stage stage-alice">
            <div class="person-pill"><span>👩🏼</span><strong>Alice</strong></div>
            <span class="node-arrow" aria-hidden="true"></span>
            <div class="person-pill"><span>👨🏼</span><strong>Bob</strong></div>
          </div>
          <p class="protagonist-caption">Más amable</p>
        </div>
        <div class="protagonist-col protagonist-colombia fragment">
          <span class="protagonist-kicker">En Colombia 🇨🇴</span>
          <figure class="protagonist-hero">
            <img src="${asset('ale-y-brayan.jpg')}" alt="Ale con visor y taco de polo enviándole un mensaje a Brayan con gorra" />
          </figure>
          <div class="colombia-names">
            <div class="colombia-ale"><span class="cast-tag tag-ale">Ale</span><small>Club de polo 🐎</small></div>
            <div class="colombia-brayan fragment"><span class="cast-tag tag-brayan">Brayan</span><small>El infaltable 🧢</small></div>
          </div>
        </div>
      </div>`,
    notes: 'Entrada: dejar claro que vamos a hablar de computación cuántica y criptografía. 1er avance: los físicos e ingenieros usan A y B. 2do avance: los divulgadores usan Alice y Bob. 3er avance: «pero eee… estamos en Colombia» → aparece primero Ale, la chica del club de polo. 4to avance: aparece el infaltable Brayan.',
    bit: 'Setup (regla de 3): «1) En los papers los físicos ponen A y B. Cero presupuesto para guion. 2) Los divulgadores dijeron: pongámosle Alice y Bob, más amable. 3) Pero eee… estamos en Colombia. Acá no hay ninguna Alice ni ningún Bob. Acá tenemos a Ale, la chica del club de polo, y al infaltable Brayan.»'
  },
  /*
  {
    id: 'juego', title: 'El juego: qWard, Cipher Town', seconds: 60, kind: 'game-slide',
    html: `<div class="game-intro">
        <figure><img src="${asset('qward-quantum-town-hero.jpg')}" alt="Pueblo pixelado del juego qWard" /></figure>
        <div class="cast">
          <p><span class="cast-tag tag-ale">Ale</span> envía mensajes</p>
          <p><span class="cast-tag tag-brayan">Brayan</span> los recibe</p>
          <p><span class="cast-tag tag-boss">El cliente</span> espera en un carro y paga por palabras</p>
          <p class="fragment"><span class="cast-tag tag-you">Ustedes</span> son el hacker 🕶️</p>
        </div>
      </div>
      <p class="context-note">qWard: A Quantum Computing Adventure · nivel “Breaking RSA” · 4 actos: números, César, RSA y Shor.</p>`,
    notes: 'Presentar el juego como el marco de toda la charla. El público es el hacker. Cuatro actos, cada uno con un candado mejor. Mencionar que se puede jugar en el celular (QR al final).',
    bit: 'Act-out de personajes: Ale a la izquierda del escenario, Brayan a la derecha, el cliente al centro con voz grave. Mantener estas posiciones toda la charla. «El cliente dice: “Yo pago por palabras. No por números, no por ecuaciones. Palabras.”» (Frase recurrente.)'
  },
  */
  /*
  {
    id: 'reglas', title: 'La única regla: que no lo pillen', seconds: 45, kind: 'game-slide',
    html: `<div class="suspicion">
        <p class="suspicion-label">Medidor de sospecha</p>
        <div class="suspicion-track"><span class="suspicion-fill"></span></div>
        <div class="suspicion-scale"><span>Invisible</span><span>Pillado</span></div>
      </div>
      <div class="rule-pair">
        <p class="fragment"><strong>Escuchar</strong> copia el mensaje. Nadie se entera.</p>
        <p class="fragment"><strong>Tocar</strong> el mensaje hace ruido. Te pillan.</p>
      </div>`,
    notes: 'Mecánica del juego: escucha pasiva vs. ataques activos (man-in-the-middle). Cada acto tiene tres opciones; las ruidosas suben el medidor. El público votará en dos actos.',
    bit: '«En el juego, como en la vida: si usted corta el cable, la gente se da cuenta de que no hay internet.»'
  },
  */

  // ───────────────────────── Acto 1 ─────────────────────────
  {
    id: 'acto1-caja', title: 'Acto 1 · Números: “Nadie lee números”', seconds: 45,
    html: `<div class="comic-strip">
        <div class="comic-panel panel-ale fragment">
          <span class="comic-num">1</span>
          <div class="comic-head"><span class="comic-avatar">🐎</span><span class="cast-tag tag-ale">Ale</span></div>
          <p class="comic-bubble">“Si alguien lee lo que nos mandamos, <strong>estamos jodidos</strong>.”<em class="comic-aside fragment fade-up">weon!</em></p>
        </div>
        <div class="comic-panel panel-brayan fragment">
          <span class="comic-num">2</span>
          <div class="comic-head"><span class="comic-avatar">🧢</span><span class="cast-tag tag-brayan">Brayan</span></div>
          <p class="comic-bubble">“Entonces mandamos números.<br><span class="comic-code-line"><code>A = 1, B = 2 … Z = 26</code>”</span><em class="comic-aside aside-brayan fragment fade-up">socia!</em></p>
        </div>
        <div class="comic-panel panel-punch fragment">
          <span class="comic-num">3</span>
          <div class="comic-head"><span class="comic-avatar">🐎</span><span class="cast-tag tag-ale">Ale</span></div>
          <p class="comic-bubble">“Números.<br><strong>Nadie lee números.</strong>” 😌<em class="comic-aside aside-danger fragment fade-up">verdad?</em></p>
        </div>
      </div>`,
    notes: 'Tres viñetas tipo cómic, una por clic. Hacer las voces de Ale (izquierda) y Brayan (derecha). Después de la tercera viñeta pasamos a la simulación del cable.',
    bit: 'Tras la viñeta 3 («Nadie lee números»): pausa, mirar al público. «Nadie… excepto los contadores. Y los contadores lo leen TODO.»'
  },
  {
    id: 'acto1-cable', title: 'La caja en la mitad del cable', seconds: 60, kind: 'demo-slide',
    html: wireTapMarkup(),
    notes: 'Simulación de cómo funciona la interceptación en el juego: 1) Pulsar «1. Conectar sniffer en la mitad» para enganchar la caja pasiva. 2) Pulsar «2. Ale envía el mensaje»: el paquete viaja de Ale a Brayan, al pasar por la caja de la mitad nos deja una copia abajo, y Brayan recibe su mensaje sin sospechar. 3) Opcional: pulsar «¿Y si corto el cable?» para mostrar qué pasa cuando uno hace ruido.',
    bit: '«Si usted corta el cable, Brayan se queda sin internet y llama a soporte. Nuestro trabajo es escuchar sin tocar: chisme profesional.»'
  },
  {
    id: 'acto1-reto', title: 'Reto: descifren esto', seconds: 60,
    html: `<div class="decode-board">
        <span class="decode-trigger fragment" aria-hidden="true"></span>
        <div class="decode-grid">
          <div class="decode-col" style="--i:0"><span class="decode-letter">B</span><span class="decode-num">2</span></div>
          <span class="decode-dot" aria-hidden="true">·</span>
          <div class="decode-col" style="--i:1"><span class="decode-letter">O</span><span class="decode-num">15</span></div>
          <span class="decode-dot" aria-hidden="true">·</span>
          <div class="decode-col" style="--i:2"><span class="decode-letter">Y</span><span class="decode-num">25</span></div>
          <span class="decode-dot" aria-hidden="true">·</span>
          <div class="decode-col" style="--i:3"><span class="decode-letter">A</span><span class="decode-num">1</span></div>
          <span class="decode-dot" aria-hidden="true">·</span>
          <div class="decode-col" style="--i:4"><span class="decode-letter">C</span><span class="decode-num">3</span></div>
          <span class="decode-dot" aria-hidden="true">·</span>
          <div class="decode-col" style="--i:5"><span class="decode-letter">A</span><span class="decode-num">1</span></div>
        </div>
        <p class="hint">A = 1, B = 2, C = 3 … Z = 26</p>
      </div>`,
    notes: 'Dar 10–15 segundos. Alguien lo saca rápido. Al avanzar un clic, aparece cada letra una por una encima de su número (B→2, O→15, Y→25, A→1, C→3, A→1). Punto: el “código” es una tabla pública, cualquiera lo lee.',
    bit: 'Si alguien grita la respuesta rápido: «¡Contrátenlo! Ese es el cliente que buscamos.» Si nadie: «Tranquilos, también es tarde para mí.»'
  },
  {
    id: 'acto1-leccion', title: 'Codificar no es cifrar', seconds: 30,
    html: `<div class="lesson-stage">
        <div class="lesson">
          <p class="lesson-main">Una codificación cambia <em>cómo se escribe</em>.</p>
          <p class="lesson-main">Un cifrado necesita <strong>una clave secreta</strong>.</p>
        </div>
        <div class="lesson-divider" aria-hidden="true"></div>
        <p class="calligraphy-line fragment">
          <span>Base64 no es seguridad,</span>
          <span class="b64-swap" tabindex="0" aria-label="admin123 en Base64 es Qk9ZQUNB">
            <code class="b64-plain">"admin123"</code>
            <code class="b64-encoded">Qk9ZQUNB</code>
          </span>.
          <span class="calligraphy-punch fragment">Es caligrafía.</span>
        </p>
      </div>`,
    notes: 'Puente al mundo dev: Base64, hex, JSON “ofuscado”. Nada de eso es cifrado. 1er clic: aparece «Base64 no es seguridad, "admin123".» (pasar el mouse sobre "admin123" para que cambie a Qk9ZQUNB). 2do clic: aparece al final en la misma línea «Es caligrafía.» con el mismo tamaño de letra.',
    bit: '«Si alguna vez guardaron una contraseña en Base64… no levanten la mano. Este es un espacio seguro. Bueno, más seguro que su base de datos.»'
  },

  // ───────────────────────── Acto 2 ─────────────────────────
  {
    id: 'acto2-cesar', title: 'Acto 2 · César: desplazar letras', seconds: 40,
    html: `<div class="comic-strip">
        <div class="comic-panel panel-ale fragment">
          <span class="comic-num">1</span>
          <div class="comic-head"><span class="comic-avatar">🐎</span><span class="cast-tag tag-ale">Ale</span></div>
          <p class="comic-bubble">“Los números fueron un error. Ahora <strong>corremos cada letra</strong> un número secreto de lugares.”<em class="comic-aside fragment fade-up">mk!</em></p>
        </div>
        <div class="comic-panel panel-brayan fragment">
          <span class="comic-num">2</span>
          <div class="comic-head"><span class="comic-avatar">🧢</span><span class="cast-tag tag-brayan">Brayan</span></div>
          <p class="comic-bubble">“¿Cuántos lugares?<br><span class="comic-code-line"><code>c = (m + k) mod 26</code>”</span><em class="comic-aside aside-brayan fragment fade-up">si copia!</em></p>
        </div>
        <div class="comic-panel panel-punch fragment">
          <span class="comic-num">3</span>
          <div class="comic-head"><span class="comic-avatar">🐎</span><span class="cast-tag tag-ale">Ale</span></div>
          <p class="comic-bubble">“Te digo esta noche, <strong>en persona</strong>. La clave nunca toca el cable.” 🤫<em class="comic-aside fragment fade-up">xoxo!</em></p>
        </div>
      </div>`,
    notes: 'Tres viñetas tipo cómic, igual que en el Acto 1. Ahora hay una clave secreta k acordada en persona (fuera del cable). Después pasamos a la simulación del cable para ver qué capturamos.',
    bit: 'Cliente (voz grave): «¿O sea que no lo puede leer?» Hacker: «Dije que acordaron una letra corrida. Hay veinticinco opciones.» Pausa. «Mi PIN del banco tiene más combinaciones… y lo adivina mi mamá.»'
  },
  {
    id: 'acto2-cable', title: 'La clave no pasa por el cable… ¿qué capturamos?', seconds: 45, kind: 'demo-slide',
    html: caesarTapMarkup(),
    notes: 'Simulación del Acto 2 en el cable: 1) ▶ Escena 1: Ale suma k antes de enviar, por el cable solo viaja el texto cifrado (FH JHZP UVZ CHBVA), la caja copia ese garabato y Brayan resta k al recibir. 2) ▶ Escena 2: ¿Y si le escribimos a Ale fingiendo ser Brayan para pedirle k? Nos pillan de inmediato.',
    bit: '«Pedir la clave por el cable es como llamarle al banco a preguntar cuál es la clave del cajero que usted se acaba de robar.»'
  },
  {
    id: 'acto2-barrido', title: 'Fuerza bruta en vivo', seconds: 75, kind: 'demo-slide',
    html: caesarMarkup(),
    notes: `Ciphertext: ${CAESAR_CIPHER}. Pulsar «Probar las 25 claves»: se detiene en k = 7 y muestra «TENGO CASA SOLA [???]» dejando MOR oculto para que el público complete la frase (clic o hover en ??? revela MOR).`,
    bit: 'Al leerse «TENGO CASA SOLA ???»: dejar que el público grite qué palabra falta.'
  },
  {
    id: 'acto2-leccion', title: '¿Y si usamos una clave gigante?', seconds: 45,
    html: `<div class="compare-keys">
        <div class="key-card key-bad">
          <strong>César</strong>
          <span>25 opciones</span>
          <small>⚡ Se rompe en un parpadeo</small>
        </div>
        <div class="key-card key-good fragment">
          <strong>AES-128</strong>
          <span>2<sup>128</sup> opciones</span>
          <small>⏳ Más que la edad del universo</small>
        </div>
      </div>
      <div class="symmetric-trap fragment">
        <p class="trap-title">🤔 Entonces… ¿por qué no usamos AES y nos vamos?</p>
        <div class="trap-options">
          <div><span>🤝</span><strong>En persona</strong><small>¿Viajar a Amazon para comprar unos zapatos?</small></div>
          <div><span>🔌</span><strong>Por el cable</strong><small>El sniffer también copia la clave</small></div>
        </div>
      </div>`,
    notes: '1) César cae porque 25 claves se prueban en un instante. 2) Si subimos a un cifrado moderno como AES-128 (2^128 claves), la fuerza bruta toma más que la edad del universo. 3) PERO ambos usan LA MISMA clave para cerrar y abrir: ¿cómo se la entrego a alguien al otro lado del mundo si el cable está chuzado? Por eso necesitamos RSA.',
    bit: '«Listo, metemos AES-128, dura más que el universo, ¡nos vamos! … Un momento: para usar la misma clave, Ale y Brayan tuvieron que verse en persona. Con su crush funciona, pero ¿ustedes se van a tomar un café con Jeff Bezos cada vez que compran por internet?»'
  },

  // ───────────────────────── Acto 3 ─────────────────────────
  {
    id: 'acto3-candado', title: 'Acto 3 · RSA: dos llaves en vez de una', seconds: 45,
    html: `<div class="comic-strip">
        <div class="comic-panel panel-brayan fragment">
          <span class="comic-num">1</span>
          <div class="comic-head"><span class="comic-avatar">🧢</span><span class="cast-tag tag-brayan">Brayan</span></div>
          <p class="comic-bubble">“Hice un par de claves. Te voy a mandar la mitad <strong>por el cable</strong>.”<em class="comic-aside aside-brayan fragment fade-up">reina!</em></p>
        </div>
        <div class="comic-panel panel-ale fragment">
          <span class="comic-num">2</span>
          <div class="comic-head"><span class="comic-avatar">🐎</span><span class="cast-tag tag-ale">Ale</span></div>
          <p class="comic-bubble">“¿Por el cable? ¡Cualquiera que esté escuchando <strong>la va a ver</strong>!”<em class="comic-aside fragment fade-up">bobis!</em></p>
        </div>
        <div class="comic-panel panel-punch fragment">
          <span class="comic-num">3</span>
          <div class="comic-head"><span class="comic-avatar">🧢</span><span class="cast-tag tag-brayan">Brayan</span></div>
          <p class="comic-bubble">“Que la vean. Esa mitad <strong>solo cierra</strong> 🔓. La que abre 🔑 nunca sale de mi máquina.”<em class="comic-aside aside-brayan fragment fade-up">si pilla!</em></p>
        </div>
      </div>`,
    notes: 'Tres viñetas tipo cómic, igual que en los Actos 1 y 2. Brayan resuelve el problema de tener que verse en persona enviando un candado abierto (clave pública) por el cable y guardando la llave (clave privada).',
    bit: 'Cliente: «¿Le mandan la llave por el mismo cable que usted escucha? ¡Se acabó, ábralo!» Hacker: «No, jefe. Me mandaron el candado. Es como robar un candado abierto en Homecenter y pretender abrir la casa del vecino.»'
  },
  {
    id: 'acto3-ecuacion', title: 'RSA en 3 ecuaciones', seconds: 55,
    html: `<div class="rsa-eq-grid">
        <div class="rsa-eq-card eq-primes fragment">
          <span class="eq-step-tag">1 · Crear el candado (Brayan)</span>
          <div class="eq-formula">N = p × q</div>
          <p class="eq-desc">Elige dos primos secretos (<code>p, q</code>) y un exponente <code>e</code>. Envía <strong>en público</strong> el par <code>(N, e)</code>.</p>
          <div class="eq-example"><span>p=3, q=11</span> → <b>🔓 Público: (N=33, e=3)</b></div>
        </div>
        <div class="rsa-eq-card eq-lock fragment">
          <span class="eq-step-tag">2 · Cerrar el mensaje (Ale)</span>
          <div class="eq-formula">c = m<sup>e</sup> mod N</div>
          <p class="eq-desc">Usa el candado público <code>(N=33, e=3)</code> que le llegó por el cable para cerrar <code>m</code>.</p>
          <div class="eq-example"><span>m = 4 (D)</span> → <b>4³ mod 33 = 31</b> <small>🔒</small></div>
        </div>
        <div class="rsa-eq-card eq-unlock fragment">
          <span class="eq-step-tag">3 · Abrir el mensaje (Brayan)</span>
          <div class="eq-formula">m = c<sup>d</sup> mod N</div>
          <p class="eq-desc">Usa su <strong>llave privada</strong> <code>d</code>, que calcula en secreto a partir de <code>p</code>, <code>q</code> y <code>e</code>.</p>
          <div class="eq-example"><span>c = 31, d = 7</span> → <b>31⁷ mod 33 = 4</b> <small>🔑</small></div>
        </div>
      </div>`,
    notes: 'Presentamos las 3 ecuaciones base de RSA antes de ver el cable: 1) Brayan elige dos primos secretos p y q y publica su producto N = p × q junto con e. 2) Ale cierra con c = m^e mod N. 3) Brayan abre con m = c^d mod N usando su llave secreta d.',
    bit: '«Tres líneas de matemáticas y con eso se sostiene el comercio electrónico mundial. Lo único secreto aquí son p, q y d. El resto viaja en público.»'
  },
  {
    id: 'acto3-cable', title: 'El candado viaja en público por el cable', seconds: 60, kind: 'demo-slide',
    html: rsaTapMarkup(),
    notes: 'Simulación del cable en el Acto 3: 1) ▶ Escena 1: Brayan envía su candado abierto (N=33, e=3) de derecha a izquierda; nosotros lo copiamos, pero no abre nada. 2) ▶ Escena 2: Ale mete su letra (m=4, la D) en el candado (4^3 mod 33 = 31) y envía c=31; Brayan lo abre con d=7. 3) ▶ Escena 3: ¿Y si cambiamos el candado por el nuestro? Brayan no puede abrir y nos pillan.',
    bit: '«Tenemos N = 33, tenemos e = 3 y tenemos el mensaje cifrado c = 31. Todo pasó por nuestras narices… y no podemos abrir nada sin d.»'
  },
  {
    id: 'acto3-forjar', title: '¿De dónde sale la llave secreta d?', seconds: 70,
    html: `<div class="rsa-builder">
        <div class="rsa-eq-bar">
          <span class="eq-slot slot-e"><small>e (público)</small><strong class="eq-sym">e</strong><strong class="eq-val">3</strong></span>
          <span class="eq-op">×</span>
          <span class="eq-slot slot-d"><small>d (llave secreta)</small><strong class="eq-sym">?</strong><strong class="eq-val">7</strong></span>
          <span class="eq-op">mod</span>
          <span class="eq-slot slot-phi"><small>(p − 1)(q − 1)</small><strong class="eq-sym">(p−1)(q−1)</strong><strong class="eq-val">20</strong></span>
          <span class="eq-op">=</span>
          <span class="eq-one">1</span>
        </div>
        <div class="rsa-blueprint">
          <div class="bp-card bp-step-1 fragment" data-fragment-index="0">
            <span class="bp-step">Paso 1 · Del candado público</span>
            <span class="bp-emoji">🔓</span>
            <strong>N = 33, e = 3</strong>
            <small>Ya sabemos que <b>e = 3</b></small>
          </div>
          <span class="bp-arrow fragment" data-fragment-index="1" aria-hidden="true">→</span>
          <div class="bp-card bp-step-2 fragment" data-fragment-index="1">
            <span class="bp-step">Paso 2 · Separar N = 3 × 11</span>
            <span class="bp-emoji">🧱 × 🧱</span>
            <strong>(3 − 1)(11 − 1) = 20</strong>
            <small>2 × 10 nos da el reloj: <b>20</b></small>
          </div>
          <span class="bp-arrow fragment" data-fragment-index="2" aria-hidden="true">→</span>
          <div class="bp-card bp-step-3 fragment" data-fragment-index="2">
            <span class="bp-step">Paso 3 · Despejar d</span>
            <span class="bp-emoji">🔑</span>
            <strong>3 × 7 = 21 → d = 7</strong>
            <small>21 mod 20 = <b>1</b> ✅</small>
          </div>
        </div>
      </div>`,
    notes: 'Arriba está la ecuación objetivo: e × d mod (p−1)(q−1) = 1. 1er clic (Paso 1): del candado público (N=33, e=3) reemplazamos e = 3 arriba. 2do clic (Paso 2): factorizamos 33 = 3 × 11, así que (3−1)(11−1) = 2 × 10 = 20, y reemplazamos 20 arriba. 3er clic (Paso 3): buscamos qué número multiplicado por 3 da sobrante 1 en el reloj de 20: 3 × 7 = 21, y se revela d = 7 arriba.',
    bit: '«Miren la ecuación arriba: empieza llena de letras feas, pero cada tarjeta le quita una incógnita hasta que el 7 cae solito.»'
  },
  {
    id: 'acto3-romper', title: 'Romper RSA = separar N en sus dos primos', seconds: 70,
    html: `<div class="factor-scale">
        <div class="scale-row scale-toy">
          <div class="scale-meta">
            <span class="scale-tag">Nuestro ejemplo</span>
            <strong>N = 33 <small>2 dígitos</small></strong>
          </div>
          <div class="scale-track-wrap">
            <div class="scale-track">
              <div class="scale-fill fill-toy"><span>33</span></div>
              <span class="scale-inline-note">→ <b>3 × 11</b> (RSA no falló: era muy fácil)</span>
            </div>
          </div>
          <div class="scale-cost cost-easy">⚡ 2 seg en la cabeza</div>
        </div>

        <div class="scale-row scale-record fragment">
          <div class="scale-meta">
            <span class="scale-tag">Récord mundial · sep. 2026</span>
            <strong>RSA-260 <small>260 dígitos · 862 bits</small></strong>
          </div>
          <div class="scale-track-wrap">
            <div class="scale-track">
              <div class="scale-fill fill-record"><span>221128255295296664352810852550262309276120895024700153944137...</span></div>
            </div>
            <span class="scale-sub">CADO-NFS acelerado en GPUs · 2 primos de 130 dígitos (~$400k USD)</span>
          </div>
          <div class="scale-cost cost-hard">🔥 ~2.048 GPUs · 8 días</div>
        </div>

        <div class="scale-row scale-real fragment">
          <div class="scale-meta">
            <span class="scale-tag">En internet hoy</span>
            <strong>RSA-2048 <small>617 dígitos · 2048 bits</small></strong>
          </div>
          <div class="scale-track-wrap">
            <div class="scale-track">
              <div class="scale-fill fill-real"><span>25195908475657893494027183240048398571429282126204032027777137836043662020707595556264018525880784406918290641249515082189298559149176184502808489120072844992687392807287776735971418347270261896375014971824691165077613379859095700097330459748808428401797429100642458691817195118746121515172654632282216869987549182422433637259085141865462043576798423387184774447920739934236584823824281198163815010674810451660377306056201619676256133844143603833904414952634432190114657544454178424020924616515723350778707749817125772467962926386356373289912154831438167899885040445364023527381951378636564391212010397122822120720357...</span></div>
            </div>
            <span class="scale-sub">Cada dígito extra multiplica la dificultad exponencialmente · Nadie lo ha roto</span>
          </div>
          <div class="scale-cost cost-wall">🧱 &gt; 10<sup>9</sup> años</div>
        </div>
      </div>`,
    sources: 'Récord clásico: RSA-260 (862 bits), Eric Lu / Cognition, sep. 2026 (~2.048 GPUs, ~8 días, CADO-NFS). Récord previo: RSA-250 (feb. 2020).',
    notes: 'En lugar de tarjetas repetitivas, vemos la muralla exponencial a escala (2 dígitos vs 260 dígitos vs 617 dígitos). En nuestro ejemplo RSA no falló: simplemente N=33 tenía 2 dígitos. El récord mundial clásico se actualizó en septiembre de 2026 con RSA-260 (~2.048 GPUs durante 8 días). Pero RSA-2048 (617 dígitos) sigue a miles de millones de años de distancia para computadores clásicos.',
    bit: 'Callback del acto 1: «Nadie lee números» → «Nadie factoriza números… de 617 dígitos.»'
  },

  // ───────────────────────── Acto 4 ─────────────────────────
  {
    id: 'acto4-qpu', title: 'Acto 4 · Shor: “Nadie anda con uno de esos en la cuadra”', seconds: 45,
    html: `<div class="comic-strip">
        <div class="comic-panel panel-brayan fragment">
          <span class="comic-num">1</span>
          <div class="comic-head"><span class="comic-avatar">🧢</span><span class="cast-tag tag-brayan">Brayan</span></div>
          <p class="comic-bubble">“Están construyendo máquinas que factorizan números de <strong>otra forma</strong>.”<em class="comic-aside aside-brayan fragment fade-up">ojo ahí!</em></p>
        </div>
        <div class="comic-panel panel-ale fragment">
          <span class="comic-num">2</span>
          <div class="comic-head"><span class="comic-avatar">🐎</span><span class="cast-tag tag-ale">Ale</span></div>
          <p class="comic-bubble">“¿Deberíamos preocuparnos?”<em class="comic-aside fragment fade-up">literal?!</em></p>
        </div>
        <div class="comic-panel panel-punch fragment">
          <span class="comic-num">3</span>
          <div class="comic-head"><span class="comic-avatar">🧢</span><span class="cast-tag tag-brayan">Brayan</span></div>
          <p class="comic-bubble">“Esa vuelta necesita <strong>resto de frío y un cuarto gigante</strong>. Nadie anda con uno de esos en la cuadra.” ❄️<em class="comic-aside aside-brayan fragment fade-up">relajá, mor!</em></p>
        </div>
      </div>`,
    notes: 'Tres viñetas tipo cómic, igual que en los Actos 1, 2 y 3. Brayan se confía porque un QPU superconductor es equipo de laboratorio más frío que el espacio exterior (~15 mK). Pero no necesitamos tenerlo en el carro: nos conectamos por la nube.',
    bit: '«Yo creía que lo más frío que había sentido era Tunja a las seis de la mañana. Pues no: hay una máquina más fría… y tampoco tiene ruana.»'
  },
  {
    id: 'acto4-shor', title: 'El algoritmo de Shor en 4 pasos', seconds: 70,
    html: `<div class="shor-intro">
        <div class="shor-goal-bar">
          <span class="goal-chip">🎯 Meta: separar <b>N = p × q</b> <small>(primos)</small></span>
          <span class="goal-arrow">⟹</span>
          <span class="goal-chip goal-eq">🎵 Ecuación de Shor: <code>a<sup>r</sup> mod N = 1</code></span>
        </div>
        <div class="shor-pseudo">
          <div class="pseudo-step step-classic fragment">
            <span class="pseudo-num">1</span>
            <span class="hw-badge hw-classic">💻 Clásico</span>
            <div class="pseudo-body">
              <strong>Elegir un número <code>a</code> al azar</strong>
              <small>Probamos con <code>1 &lt; a &lt; N</code> (si ya comparten factor, ¡ganamos de suerte!)</small>
            </div>
            <code class="pseudo-ex">N = 15, a = 7</code>
          </div>
          <div class="pseudo-step step-quantum fragment">
            <span class="pseudo-num">2</span>
            <span class="hw-badge hw-quantum">⚛️ Cuántico</span>
            <div class="pseudo-body">
              <strong>Encontrar el ritmo <code>r</code> donde <code>a<sup>r</sup> mod N = 1</code></strong>
              <small>Único paso en el QPU: halla el periodo sin recorrer los saltos uno por uno</small>
            </div>
            <code class="pseudo-ex">r = 4</code>
          </div>
          <div class="pseudo-step step-classic fragment">
            <span class="pseudo-num">3</span>
            <span class="hw-badge hw-classic">💻 Clásico</span>
            <div class="pseudo-body">
              <strong>Mirar la mitad del ciclo: <code>x = a<sup>r/2</sup> mod N</code></strong>
              <small>Solo si <code>r</code> es par (si no sirve, volvemos al paso 1 con otro <code>a</code>)</small>
            </div>
            <code class="pseudo-ex">x = 7² mod 15 = 4</code>
          </div>
          <div class="pseudo-step step-classic fragment">
            <span class="pseudo-num">4</span>
            <span class="hw-badge hw-classic">💻 Clásico</span>
            <div class="pseudo-body">
              <strong>Usar <code>x − 1</code> y <code>x + 1</code> para sacar los primos</strong>
              <small><code>p = mcd(x − 1, N)</code> y <code>q = mcd(x + 1, N)</code></small>
            </div>
            <code class="pseudo-ex">3 × 5 = 15 🔓</code>
          </div>
        </div>
      </div>`,
    notes: 'Antes de ver la escena del QPU y el reloj, dejamos el mapa completo de Shor: en vez de dividir N a fuerza bruta, Shor busca el periodo r de a^r mod N = 1. Tres pasos corren en tu portátil clásico (1, 3 y 4) y SOLO el paso 2 necesita un computador cuántico.',
    bit: '«Miren el pseudo-algoritmo de Shor: cuatro pasos. Tres los hace su portátil en Python… y solo el paso 2 necesita una máquina a −273 °C. Eso es lo único que le vamos a pedir prestado al QPU.»'
  },
  {
    id: 'acto4-cable', title: '¿Cómo consigo un QPU desde el andén?', seconds: 45, kind: 'demo-slide',
    html: shorTapMarkup(),
    notes: 'Simulación con un solo botón ▶: desde el portátil en el andén enviamos N=15 y a=7 por la API en la nube al QPU superconductor (~15 mK). El QPU mide los picos del ritmo (r = 4), los devuelve, y nuestro portátil parte 15 = 3 × 5, reconstruye d y rompe RSA.',
    bit: '«No necesitamos meter una nevera de dilución en el baúl del Twingo: hoy un computador cuántico se consume por API desde el andén.»'
  },
  {
    id: 'acto4-ritmo', title: 'El truco de Shor: todo número tiene un ritmo', seconds: 85, kind: 'demo-slide',
    html: periodMarkup(),
    notes: 'Hacer clic en ▶ Girar el reloj (o Paso a paso): 1) En un reloj de N=15 marcas empezamos en 1 y multiplicamos por 7 en cada salto: 1 → 7 → 4 → 13 → 1 (repite cada r = 4 saltos). 2) Miramos qué número quedó justo a mitad del ciclo (en el salto 2 de 4): el 4. 3) Tomamos los dos vecinos del 4 (4−1=3 y 4+1=5) y ahí están los dos primos que parten 15 = 3 × 5.',
    bit: 'Analogía de DJ (Dante en el juego): «Todo número tiene un beat. Cuando das la vuelta al reloj, miras quién quedó en la mitad, le preguntas a los dos vecinos… y el candado se abre solo.»'
  },
  {
    id: 'acto4-cuantica', title: '¿Y qué hace el computador cuántico ahí?', seconds: 55,
    html: `<div class="compare-keys quantum-vs-classic">
        <div class="key-card key-bad">
          <strong>💻 Portátil clásico</strong>
          <span>1 por 1</span>
          <small>Para 617 dígitos, el ciclo es tan largo que nunca termina de contar</small>
        </div>
        <div class="key-card key-good fragment">
          <strong>⚛️ Circuito de Shor (QPU)</strong>
          <span>Superposición + Interferencia</span>
          <small>Prueba todos los pasos en superposición y refuerza los picos del ritmo <b>r</b></small>
        </div>
      </div>
      <div class="diagram-flow pipeline fragment">
        <div class="df-box bg-input"><strong>1. Tu PC</strong><small>Elige N y a</small></div><span class="connector"></span>
        <div class="df-box bg-cool"><strong>2. QPU Setup</strong><small>m qubits · disparos</small></div><span class="connector"></span>
        <div class="df-box bg-purple"><strong>3. Shor (QPU)</strong><small>Superposición + QFT</small></div><span class="connector"></span>
        <div class="df-box bg-cool"><strong>4. Medir</strong><small>Picos de bits</small></div><span class="connector"></span>
        <div class="df-box bg-warm"><strong>5. Tu PC</strong><small>r → p, q → d → letra</small></div>
      </div>`,
    notes: '1) Con N=15 contamos los 4 pasos a mano, pero con 617 dígitos el ciclo es imposible de recorrer uno por uno. 2) El QPU usa superposición para evaluar las potencias y la transformada cuántica de Fourier (interferencia) para que solo sobrevivan los picos del periodo r. 3) Abajo aparecen las 5 cajas exactas del juego: 4 son software clásico y 1 es cuántica.',
    bit: '«Miren las cinco cajas del juego: el QPU nunca ve el mensaje, solo busca el ritmo. Una caja es cuántica y cuatro son código clásico. Felicitaciones: ya son 80% programadores cuánticos.»'
  },
  {
    id: 'acto4-ibm', title: 'Más qubits = más resolución… ¿y en hardware real?', seconds: 75,
    html: `<div class="ibm-why">
        <span><b>¿Por qué subir <code>m</code>?</b> Más qubits de conteo dan más resolución (<code>2<sup>m</sup></code> estados) para medir el ritmo <code>r</code> y escalar a <code>N</code> grandes.</span>
        <small>Experimento en <b>ibm_marrakesh</b> (N = 15, a = 7, r = 4) · 20.480 disparos reales por nivel</small>
      </div>
      <div class="ibm-chart">${IBM_PEAKS.map(row => `<div class="ibm-group">
        <div class="ibm-head">
          <p><b>m = ${row.m} qubits</b> <small>(${row.states} estados)</small></p>
          <span class="ibm-verdict ${row.cls}">${row.verdict}</span>
        </div>
        ${bar('Ideal', 100, 'bar-ideal')}${bar('IBM', row.real, 'bar-real')}${bar('Azar', row.random, 'bar-random')}</div>`).join('')}</div>
      <p class="takeaway fragment">Para romper <code>N</code> grandes necesitamos más qubits y compuertas… pero hoy en hardware real <strong>más recursos = más ruido</strong>.</p>`,
    notes: 'Primero explicar por qué subimos m: en Shor, más qubits de conteo (m) dan más precisión (2^m estados) para distinguir el ritmo r y poder factorizar números N más grandes. Luego mostrar qué pasa al meter más recursos en ibm_marrakesh: con m=3 y m=4 la señal sobresale y recuperamos r=4; al subir a m=6 y m=8 el circuito se vuelve tan profundo que el ruido borra los picos (2,1% vs 1,56% de azar puro).',
    bit: '«En mi charla anterior construí una moneda cuántica. Hoy descubrí que si le meto 8 qubits al factorizador en hardware real… también tengo una moneda. Una moneda carísima.»'
  },
  /*
  {
    id: 'demo-juego', title: 'Juguemos (2 minutos)', seconds: 120, kind: 'demo-slide',
    html: `<div class="live-demo">
        <p class="statement statement-center">Demo en vivo: Acto 4 en qWard</p>
        <p class="demo-url"><a href="${GAME_URL}" target="_blank" rel="noreferrer">${GAME_URL.replace('https://', '')}</a></p>
        <p class="context-note">Plan B: video grabado. Calentar Cloud Run antes (min-instances = 1).</p>
      </div>`,
    notes: 'Abrir el juego con el checkpoint del acto 4 ya cargado (ci3 o el punto de guardado preparado). Conectar las cinco cajas y ejecutar en el simulador. Mostrar el histograma y el periodo. Si algo falla en 20 segundos: ir al video. NO depender del Wi-Fi del evento sin plan B.',
    bit: 'Si la demo falla: «Esto es exactamente lo que pasa con el hardware cuántico real. Les acabo de hacer una demostración muy fiel.»'
  },
  */

  // ───────────────────────── Cierre ─────────────────────────
  {
    id: 'realidad', title: 'Entonces… ¿RSA está muerto?', seconds: 75,
    html: `<div class="reality">
        <div><h3>Hoy</h3><p>Nadie ha factorizado RSA-2048 con Shor. Ni cerca.</p></div>
        <div class="fragment"><h3>El riesgo</h3><p><em>Cosechar ahora, descifrar después</em>: guardan tráfico hoy para leerlo mañana.</p></div>
        <div class="fragment"><h3>La respuesta</h3><p>Criptografía post-cuántica: NIST publicó ML-KEM (FIPS 203) en 2024.</p></div>
      </div>
      <p class="takeaway fragment">Su tarea como devs: saber dónde usan RSA y poder cambiarlo.</p>`,
    sources: 'NIST FIPS 203/204/205 (agosto 2024). Estimaciones de recursos: Gidney (2025), RSA-2048 con menos de un millón de qubits ruidosos. Verificar antes de la charla.',
    notes: 'Bajar el tono: momento serio, sin chistes durante 30 segundos. Distinguir hecho (no se ha roto) de riesgo (almacenar hoy). Llamado a la acción: agilidad criptográfica, inventario de dónde se usa RSA, bibliotecas actualizadas.',
    bit: 'Única línea al final: «Entonces no, no se vayan a cambiar la clave del banco esta noche. Primero la cena.»'
  },
  /*
  {
    id: 'remate', title: 'El cliente quiere su respuesta', seconds: 50, kind: 'standup-slide pixel-comic-slide',
    html: `<div class="pixel-comic">
        <div class="pixel-panel fragment">
          <span class="comic-num">1</span>
          <figure><img src="${asset('remate-1.jpg')}" alt="El cliente en su carro de noche reclamándole la respuesta al hacker" /></figure>
          <p class="pixel-caption"><span class="cast-tag tag-boss">Cliente</span>“Bueno, después de todo esto… <strong>dime el mensaje secreto.</strong>”</p>
        </div>
        <div class="pixel-panel fragment">
          <span class="comic-num">2</span>
          <figure><img src="${asset('remate-2.jpg')}" alt="El hacker mostrando orgulloso en su portátil una sola letra A brillante" /></figure>
          <p class="pixel-caption"><span class="cast-tag tag-you">Hacker</span>“El mensaje empieza con… <strong>A</strong>.” 😎</p>
        </div>
        <div class="pixel-panel panel-punch fragment">
          <span class="comic-num">3</span>
          <figure><img src="${asset('remate-3.jpg')}" alt="El cliente llevándose la mano a la frente incrédulo con los billetes en la mano y el pato qWard mirando" /></figure>
          <p class="pixel-caption"><span class="cast-tag tag-boss">Cliente</span>“¿¡Cuatro actos y un computador cuántico… <strong>para solo la primera letra</strong>!?” 🤦‍♂️</p>
        </div>
      </div>`,
    notes: 'Tres viñetas en pixel-art de 32 bits (una por clic) para no telegrafiar el remate: 1) El cliente serio pide el mensaje secreto completo. 2) El hacker orgulloso dice «El mensaje empieza con… A». 3) Remate del cliente: «¿¡Cuatro actos y un computador cuántico para solo la primera letra!?»',
    bit: 'Callback final a la apertura: «Y ustedes también se ganaron algo hoy… [pausa]… ¡cumplimos el trato! Ya son libres.» Pausa de dos segundos. «Bueno, después de las preguntas.»'
  },
  */
  {
    id: 'muones', title: 'Dato nerd para el almuerzo ☄️', seconds: 75, kind: 'demo-slide',
    html: muonMovieMarkup(),
    notes: '«Les voy a regalar el dato nerd para que lleguen a la casa, lo suelten en el almuerzo y la familia diga: “¡Uy, en esa BoyaConf sí que aprenden cositas!”. Pulsar ▶ (o +1 paso a paso): 1) Un rayo cósmico golpea la atmósfera y se parte en piones. 2) De ahí nace un muón (el primo gordo del electrón, 200× más pesado), atraviesa nubes y techos (~1 por minuto en cada cm², como el tamaño de una uña; en Boyacá por la altura, más). 3) Abajo está la QPU trabajando a escala cuántica (mucho más pequeña y sensible que un chip clásico): el muón golpea el chip y daña varios qubits a la vez.»',
    bit: 'Remate final: «Los muones siempre han llovido del cielo… pero ahora que bajamos a escala cuántica, una partícula gorda que cae del espacio sobre la QPU trabajando nos jode los cálculos.»'
  },
  {
    id: 'qpu-real', title: 'Así se ve una QPU real hoy', seconds: 50, kind: 'standup-slide',
    html: `<div class="qpu-real-stage">
        <div class="qpu-photo-frame">
          <img class="qpu-img-base" src="${asset('qpu-real.jpg')}" alt="Computador cuántico superconductor real con tubos de cobre y un chip diminuto en la base" />
          <img class="qpu-img-ruana fragment" data-fragment-index="1" src="${asset('qpu-ruana.jpg')}" alt="El mismo computador cuántico ahora usando una ruana tradicional de Boyacá" />
          <div class="qpu-ruana-badge fragment fade-up" data-fragment-index="0">🥶 Acá en Boyacá no necesita nevera… necesita ruana</div>
        </div>
        <div class="qpu-facts">
          <span>🏢 <b>Cuarto gigante</b> de control y criogenia</span>
          <span>❄️ <b>Nevera de cobre bañado en oro</b> a ~0 Kelvin</span>
          <span>🔬 <b>Chip diminuto</b> abajo · altísimo costo y recursos</span>
        </div>
      </div>`,
    notes: 'Antes de despedirse, mostrar el tamaño real y el costo de los recursos: todo ese cuarto lleno de racks y esa nevera gigante de tubos de cobre solo existen para mantener ese chip diminuto abajo a ~0 Kelvin (−273 °C). Siguiente clic: aparece la ruana boyacense sobre la misma QPU sin mover el fondo.',
    bit: 'Al hacer clic y aparecer la ruana: «Yo les dije en el Acto 4 que esta máquina era más fría que Tunja a las seis de la mañana… pues antes de irnos, ya le pusimos su ruana.»'
  },
  {
    id: 'gracias', title: 'Gracias', seconds: 20, kind: 'title-slide closing',
    html: `<p class="event-name">BoyaConf 2026</p>
      <h2>¡Gracias!</h2>
      <p class="closing-cta">¿Quieres jugar a ser un hacker? Prueba mi juego:</p>
      <p class="closing-question"><a href="${GAME_URL}" target="_blank" rel="noreferrer">${GAME_URL.replace('https://', '')}</a></p>
      <p class="contact"><strong>@Thecap</strong><br>Software developer @ GoDaddy - PhD Candidate - Uniandes<br><a href="mailto:c.marquezb@uniandes.edu.co">c.marquezb@uniandes.edu.co</a></p>`,
    notes: 'Abrir preguntas (~3 minutos). Invitar a probar el juego en qollab.xyz/u/xthecapx/qward.',
    bit: 'Si nadie pregunta: «Perfecto, ustedes sí entendieron lo del último charlista.»'
  }
];

const dividers = {
  'acto1-caja': { n: 1, title: 'Números', sub: '“Nadie lee números”' },
  'acto2-cesar': { n: 2, title: 'César', sub: 'Desplazar letras' },
  'acto3-candado': { n: 3, title: 'RSA', sub: 'Dos llaves en vez de una' },
  'acto4-qpu': { n: 4, title: 'Shor', sub: '“Nadie anda con uno de esos en la cuadra”' },
};

const divider = ({ n, title, sub }) => ({
  id: `acto${n}`, title: `Acto ${n}: ${title}`, seconds: 5, kind: 'title-slide section-divider',
  html: `<p class="event-name">Acto ${n} de 4</p><h2>${title}</h2><p class="cover-subtitle">${sub}</p>`,
  notes: 'Separador. Avanzar enseguida.', bit: ''
});

const clock = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
let elapsed = 0;
export const slides = talk
  .flatMap(slide => (dividers[slide.id] ? [divider(dividers[slide.id]), slide] : [slide]))
  .map(slide => {
    const start = elapsed;
    elapsed += slide.seconds;
    return { ...slide, clock: `${clock(start)}–${clock(elapsed)}` };
  });
export const TALK_SECONDS = elapsed;
