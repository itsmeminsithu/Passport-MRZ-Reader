# Code Review Notes

Developer: **Min SiThu**

## Bugs fixed in this review

1. **Safe developer output leaked raw values**
   - The developer JSON used object spread from the parsed result.
   - That still exposed raw `documentNumber` and `personalNumber`.
   - Fixed by building a sanitized object manually.

2. **One-line TD1 manual MRZ could be parsed as TD3**
   - A TD1 ID card MRZ has 90 characters.
   - The previous code checked `>= 88` first, so a 90-character TD1 line could be cut into 2 passport lines.
   - Fixed by checking exact MRZ lengths first: 90, 88, 72.

3. **OCR warm-up could overwrite active scan status**
   - Background OCR warm-up could finish during a scan and replace the current status message.
   - Fixed by only showing warm-up completion when not scanning.

4. **Clear all did not stop the camera**
   - Clear data should also stop the camera stream for privacy.
   - Fixed by stopping the camera inside `clearAll()`.

5. **Camera crop could become zero-sized in edge layouts**
   - Guide-box crop now clamps width and height to at least 1 pixel.

6. **Camera error message was not specific enough**
   - Updated the error to remind the user to use `localhost` or HTTPS instead of double-clicking `index.html`.

7. **CSP was loosened with `unsafe-eval`**
   - Removed general `unsafe-eval`.
   - Kept `wasm-unsafe-eval` because browser OCR/WebAssembly may need it.

## Tests

Run:

```bash
npm test
```

Current parser tests passed and cover:

- TD3 sample passport
- Check digits
- Manual input with labels
- One-line manual passport MRZ
- One-line TD1 ID card MRZ
