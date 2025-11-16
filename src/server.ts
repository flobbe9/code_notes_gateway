import fs from 'fs';
import https from 'https';
import app from './app.ts';
import { BACKEND_BASE_URL, FROTNEND_BASE_URL, HTTPS, PORT, SSL_CRT_FILE, SSL_KEY_FILE, VERSION } from './helpers/constants.ts';
import { logDebug, logInfo } from './helpers/logUtils.ts';


if (HTTPS) {
    const cts = {
        cert: fs.readFileSync(SSL_CRT_FILE),
        key: fs.readFileSync(SSL_KEY_FILE)
    }
    https.createServer(cts, app).listen(PORT, handleAppStart);

} else {
    app.listen(PORT, handleAppStart);
}

function handleAppStart(): void {
    logInfo(`Server running on port ${PORT}`);
    logInfo(`App version: ${VERSION}`);
    
    logDebug(`Https: ${HTTPS}`)
    logDebug(`Frontend: ${FROTNEND_BASE_URL}`)
    logDebug(`Backend: ${BACKEND_BASE_URL}`)
    throw new Error("fail pipeline")
}