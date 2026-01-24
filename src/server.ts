import fs from 'fs';
import https from 'https';
import app from './app.ts';
import { BACKEND_BASE_URL, FROTNEND_BASE_URL, HTTPS, PORT, SSL_CRT_FILE, SSL_KEY_FILE, VERSION } from './helpers/constants.ts';
import { logDebug, logInfo } from './helpers/logUtils.ts';
import type { IncomingMessage, ServerResponse } from 'http';


if (HTTPS) {
    const cts = {
        cert: fs.readFileSync(SSL_CRT_FILE),
        key: fs.readFileSync(SSL_KEY_FILE)
    }
    const server = https.createServer(cts, app);

    // make sure that auto ssl renewal takes effect
    fs.watchFile(SSL_CRT_FILE, () => {
        handleSslChange(server);
    });
    fs.watchFile(SSL_KEY_FILE, () => {
        handleSslChange(server);
    });

    server.listen(PORT, handleAppStart);
    
} else {
    app.listen(PORT, handleAppStart);
}

/**
 * Restart the server.
 * 
 * @param server `https.createServer`
 */
function handleSslChange(server: https.Server<typeof IncomingMessage, typeof ServerResponse>): void {
    logDebug("Detected ssl certificate file changes, restarting server...")

    server.close(() => {
        server.listen(PORT, handleAppStart);
        logDebug("Server restarted");
    });
}

function handleAppStart(): void {
    logInfo(`Server running on port ${PORT}`);
    logInfo(`App version: ${VERSION}`);
    
    logDebug(`Https: ${HTTPS}`)
    logDebug(`Frontend: ${FROTNEND_BASE_URL}`)
    logDebug(`Backend: ${BACKEND_BASE_URL}`)
}