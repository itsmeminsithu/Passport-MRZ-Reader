# Passport MRZ Reader

Browser-based Passport/ID MRZ reader by Min SiThu. Reads MRZ data from an
image upload, camera capture, or manual input. All processing runs locally
in the browser; there is no backend and no image upload.

## What it does

- Image upload, camera scanning (with device selection and quality modes),
  and manual MRZ input, including one-line input and pasted `MRZ:` /
  `Line 1:` labels
- MRZ crop and preprocessing via the Canvas API, OCR via Tesseract.js
  (background warm-up, reusable worker, downscaled input for speed)
- TD3 passport, TD2 travel document, and TD1 ID card parsing, with check
  digit validation and context-aware OCR normalisation for dates and check
  digits
- Masked sensitive output; a clear-all action that also stops the camera

## Tech stack

HTML, CSS, JavaScript (ES modules), Canvas API, getUserMedia, Tesseract.js.
No build step and no dependencies to install for the app itself.

## Project structure

```txt
Passport-MRZ-Reader/
├── index.html          # Page shell; loads ./src/app.js
├── styles.css
├── src/
│   ├── app.js          # UI, camera, OCR wiring
│   └── mrz-parser.js   # MRZ parsing and check digits
├── tests/
│   └── mrz-parser.test.mjs
├── package.json        # start / check / test scripts only
├── README.md
├── RUN_LOCAL.md
├── SECURITY.md
├── CODE_REVIEW.md
├── GITHUB_SETUP.md
├── LICENSE
└── .gitignore
```

## Run locally

Do not open `index.html` directly — camera access and ES modules need a
server, and camera needs `localhost` or HTTPS.

```bash
python3 -m http.server 5173
# open http://localhost:5173
```

Stop with `Ctrl+C`.

## Test

```bash
npm test        # runs tests/mrz-parser.test.mjs with node
npm run check   # node --check on src/app.js and src/mrz-parser.js
```

Covers: TD3 sample passport, check digits, manual input with labels,
one-line manual passport MRZ, one-line TD1 ID card MRZ.

## Live preview (GitHub Pages — post-merge step, not yet live)

Static site, no build step, no mock page added. After this PR is merged,
enable Pages in Settings → Pages → Source: **Deploy from a branch**,
Branch: **main**, Folder: **/(root)**. Expected URL once enabled:
`https://itsmeminsithu.github.io/Passport-MRZ-Reader/`

Pages is NOT live until that setting is enabled after merge and the URL
actually loads — this PR alone does not make it live. (Pages serves over
HTTPS, which satisfies the camera requirement; the first OCR scan is slow
while Tesseract.js resources load, then faster via the reused worker.)

## Privacy notes

Images, camera frames, OCR text, and parsed output are processed locally
in the browser. Sensitive fields are masked in the UI. Before production
use, review the privacy and legal requirements for the target users before
storing or transmitting any passport or ID data. Tesseract.js is currently
loaded from a CDN; hosting it locally would improve loading speed,
security, reliability, and offline support.

## License

MIT License. See [`LICENSE`](./LICENSE).
