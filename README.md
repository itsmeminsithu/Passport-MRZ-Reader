# Passport MRZ Reader

Browser-based Passport/ID MRZ reader by Min SiThu. It reads MRZ data from an image upload, a camera capture, or text you paste in. Everything runs in your browser. There is no backend, and no image is uploaded anywhere.

## What it does

- Three ways in: image upload, camera scanning (with device selection and quality modes), and manual MRZ input — including one-line input and pasted `MRZ:` / `Line 1:` labels.
- MRZ crop and cleanup with the Canvas API. OCR with Tesseract.js: the worker warms up in the background, is reused between scans, and the input is downscaled to keep scans quick.
- Parses TD3 passports, TD2 travel documents, and TD1 ID cards. Check digits are validated, and OCR output is normalised where dates and check digits are expected.
- Output is masked. Clear-all wipes the result and stops the camera.

## Stack

HTML, CSS, JavaScript (ES modules), Canvas API, getUserMedia, Tesseract.js. No build step, and nothing to install to run the app itself.

## Structure

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

## Run it

Do not open `index.html` as a file. Camera access and ES modules need a server, and the camera needs `localhost` or HTTPS.

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

Covered: TD3 sample passport, check digits, manual input with labels, one-line manual passport MRZ, one-line TD1 ID card MRZ.

## Live preview (GitHub Pages — post-merge step, not yet live)

Static site, no build step, no mock page added. After this PR is merged, enable Pages in Settings → Pages → Source: **Deploy from a branch**, Branch: **main**, Folder: **/(root)**. Expected URL once enabled: `https://itsmeminsithu.github.io/Passport-MRZ-Reader/`

Pages is not live until that setting is switched on after merge and the URL loads. This PR alone does not make it live. Pages serves over HTTPS, which covers the camera requirement. The first OCR scan is slow while Tesseract.js loads; later scans are quicker because the worker is reused.

## Privacy

Images, camera frames, OCR text, and parsed output stay in the browser. Fields are masked in the UI. Before any production use, check the privacy and legal rules for your users before you store or send passport or ID data anywhere. Tesseract.js is loaded from a CDN for now; hosting it in the repo would help load speed, security, reliability, and offline use.

## License

MIT License. See [`LICENSE`](./LICENSE).
