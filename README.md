# Passport MRZ Reader

**Developer:** Min SiThu

A privacy-focused, browser-based Passport/ID MRZ reader. It can read MRZ data from an image upload, camera capture, or manual MRZ input. Processing runs locally in the browser with no backend required.

## Features

- Upload passport or ID image
- Camera scanning with camera device selector
- Manual MRZ input
- One-line MRZ input support
- Support for pasted labels such as `MRZ:` and `Line 1:`
- MRZ crop and preprocessing using the Canvas API
- OCR reading with Tesseract.js
- Background OCR warm-up and reusable OCR worker
- Reduced image size before OCR for better speed
- TD3 passport parsing
- TD2 travel document parsing
- TD1 ID card parsing
- MRZ check digit validation
- Context-aware OCR normalization for dates and check digits
- Masked sensitive output
- Clear-all privacy button that also stops the camera
- Fast, Balanced, and Sharp camera quality modes
- Optional torch/light button on supported phones

## Tech Stack

- HTML
- CSS
- JavaScript
- Canvas API
- getUserMedia Camera API
- Tesseract.js
- Custom MRZ parser
- Custom check digit validation

## Project Structure

```txt
Passport-MRZ-Reader/
├── index.html
├── styles.css
├── package.json
├── README.md
├── RUN_LOCAL.md
├── SECURITY.md
├── CODE_REVIEW.md
├── GITHUB_SETUP.md
├── LICENSE
└── .gitignore
```

## Run Locally

Do not double-click `index.html`. Camera access and JavaScript modules work best through a local server.

```bash
python3 -m http.server 5173
```

Then open:

```txt
http://localhost:5173
```

Camera scanning works on `localhost` or HTTPS.

To stop the local server, return to Terminal and press:

```txt
Control + C
```

## Repository status — read before running

`index.html` loads `./src/app.js`, but `src/` is not checked into this
repository, and neither is `tests/`. That is why `package.json` no longer
carries `check` or `test` scripts: they pointed at files that are not here,
so they could never pass. The only copy of `src/app.js`,
`src/mrz-parser.js`, and `tests/mrz-parser.test.mjs` inside this repository
is inside `passport-mrz-reader-min-sithu-github-ready.zip`, which is why
that zip was deliberately NOT deleted in this change. Restoring `src/` and
`tests/` from the zip (or from another source) is a separate decision for
the repository owner; until then, the page shell loads but MRZ scanning
cannot work, and the old `npm test` claims in this README were removed
rather than repeated. `CODE_REVIEW.md` still mentions `npm test` as a
historical review note and was left untouched.

## Live preview (GitHub Pages — post-merge step, not yet live)

This is a static site with no build step, so the preview route is GitHub
Pages straight from the repository, no mock page added:

- After this PR is merged, enable Pages in the repository Settings:
  Pages → Build and deployment → Source: **Deploy from a branch**,
  Branch: **main**, Folder: **/(root)**.
- Expected URL once enabled: `https://itsmeminsithu.github.io/Passport-MRZ-Reader/`
- Pages is NOT live until that setting is enabled after merge and the URL
  actually loads — this PR alone does not make it live.
- Even after Pages is enabled, MRZ scanning will not work until `src/` is
  restored (see Repository status above), because `index.html` loads
  `./src/app.js`.

## Privacy Notes

This project is designed to avoid backend processing. Images, camera frames, OCR text, and parsed MRZ output are processed locally in the browser. Sensitive fields are masked in the UI.

For production use, review the privacy and legal requirements for your target users before storing or transmitting any passport or ID data.

## Current Limitation

The first OCR scan can still take time because Tesseract.js needs to load OCR resources in the browser. After the first scan, reading should be faster because the OCR worker is reused.

## Recommended Next Upgrade

For production, host Tesseract.js and language files locally instead of using a CDN. This can improve:

- Loading speed
- Security
- Reliability
- Offline/local deployment support

## License

MIT License. See [`LICENSE`](./LICENSE).
