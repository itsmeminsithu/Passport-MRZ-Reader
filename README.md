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
- Parser tests with `npm test`

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
passport-mrz-reader-min-sithu/
├── index.html
├── styles.css
├── package.json
├── README.md
├── RUN_LOCAL.md
├── SECURITY.md
├── CODE_REVIEW.md
├── LICENSE
├── src/
│   ├── app.js
│   └── mrz-parser.js
└── tests/
    └── mrz-parser.test.mjs
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

## Test

Run this inside the project folder:

```bash
npm test
```

Current checks:

```txt
node --check src/app.js: passed
node --check src/mrz-parser.js: passed
npm test: passed
```

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
