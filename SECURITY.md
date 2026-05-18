# Security Notes

Developer: **Min SiThu**

This project is designed to keep document processing inside the browser.

## Included

- No backend image upload
- File type and size checks
- Content Security Policy with WebAssembly support for OCR
- Referrer policy
- Camera stream cleanup
- Clear-all action for previews and results
- Masked document number and personal number
- Masked OCR candidate preview
- Raw MRZ lines hidden from developer output
- No persistent browser storage

## Before production

- Serve Tesseract.js files locally
- Pin dependency versions
- Use HTTPS
- Add a consent screen for camera use
- Avoid storing passport/MRZ data unless required
- Review legal and privacy requirements for your target users
