# BoyaConf 2026 · Rompiendo RSA: un atraco en cuatro actos

Charla de 30 minutos en español, construida sobre el nivel **Breaking RSA** (Cipher Town) del juego [qWard](https://rsa-game-pzqjescbgq-ue.a.run.app) (`../rsa`). Incluye una rutina de stand-up: personajes, callbacks y votaciones del público.

Mismo stack e identidad visual que `../quantum-latino`: Vite + reveal.js + Revelab.

## Ejecutar

```bash
npm install
npm run dev        # abrir la URL que muestra Vite
npm run build      # genera dist/
npm run pdf        # exporta tmp/boyaconf-2026.pdf con DeckTape
```

## Presentar

- Flechas o espacio: avanzar.
- **S**: notas del ponente, cronómetro y chistes (🎤).
- Esc: vista general. F: pantalla completa.

## Estructura

| Archivo | Contenido |
| --- | --- |
| `src/slides.js` | Diapositivas, tiempos, guion (`notes`) y chistes (`bit`) |
| `src/components/caesar.js` | Demo del Acto 2: barrido de las 25 claves de César |
| `src/components/period.js` | Demo del Acto 4: periodo de aˣ mod N y factores con el mcd |
| `src/styles.css` | Estilos |
| `docs/RUTINA.md` | Guía de stand-up, cronograma, recortes y pendientes |

## Datos

La diapositiva de IBM usa los lotes grabados de `ibm_marrakesh` en `../rsa/backend/app/data/recorded_batches`. Cada valor de m tiene 5 trabajos de 4096 disparos, con N = 15 y a = 7. El porcentaje mostrado es la fracción de disparos que cae en los cuatro picos ideales de r = 4.

## Antes de la charla

Calentar Cloud Run para la demo:

```bash
gcloud run services update rsa-backend --region=us-east1 --min-instances=1
gcloud run services update rsa-game --region=us-east1 --min-instances=1
```

Después, volver a `--min-instances=0`.

