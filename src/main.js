import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes';
import 'reveal.js/reset.css';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/serif.css';
import 'revelab/dist/revelab.css';
import './styles.css';
import { slides, TALK_SECONDS } from './slides.js';
import { initCaesar } from './components/caesar.js';
import { initPeriod } from './components/period.js';
import { initWireTap } from './components/wire-tap.js';
import { initRsaTap } from './components/rsa-tap.js';
import { initMuonMovie } from './components/muon-movie.js';

// Notas: guion + chiste (🎤) + tiempo acumulado. Se ven con la tecla S.
const notesFor = slide => `
  <p><strong>${slide.clock}</strong> · ${slide.seconds}s</p>
  <p>${slide.notes}</p>
  ${slide.bit ? `<p>🎤 ${slide.bit}</p>` : ''}`;

document.querySelector('#slides').innerHTML = slides.map(slide => `
  <section id="${slide.id}" class="${slide.kind || ''}" data-timing="${slide.seconds}">
    ${slide.kind?.includes('title-slide') ? '' : `<h2>${slide.title}</h2>`}
    <div class="slide-content">${slide.html}</div>
    ${slide.sources ? `<footer class="sources">${slide.sources}</footer>` : ''}
    <aside class="notes">${notesFor(slide)}</aside>
  </section>
`).join('');

const numbered = slides.filter(slide => !slide.kind?.includes('title-slide'));
const deck = new Reveal({
  width: 1280, height: 720, margin: 0.1, hash: true, history: true,
  center: false, transition: 'fade', backgroundTransition: 'none',
  controls: true, controlsTutorial: false, progress: true,
  slideNumber: slide => {
    const index = numbered.findIndex(item => item.id === slide?.id);
    return [index < 0 ? '' : `${index + 1} / ${numbered.length}`];
  },
  showSlideNumber: 'all', totalTime: TALK_SECONDS,
  pdfSeparateFragments: false, pdfMaxPagesPerSlide: 1,
  plugins: [RevealNotes]
});
await deck.initialize();
window.deck = deck;
// DeckTape (exportar PDF) detecta reveal.js mediante un `Reveal` global.
window.Reveal = deck;

const root = document.querySelector('#slides');
initWireTap(root);
initCaesar(root);
initRsaTap(root);
initPeriod(root);
initMuonMovie(root);

