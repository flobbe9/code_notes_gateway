import express from 'express';

import proxy from 'express-http-proxy';
import { BACKEND_BASE_URL, BACKEND_MAPPING, FROTNEND_BASE_URL, FROTNEND_MAPPING } from './helpers/constants.ts';
import { logDebug } from './helpers/logUtils.ts';

const app = express();

// TODO: continue here
    // make git repo
    // ssl
app.use(`/${BACKEND_MAPPING}`, proxy(BACKEND_BASE_URL, {
    filter: (req, res) => {
        logDebug(`/${BACKEND_MAPPING} => ${BACKEND_BASE_URL}${req.url}`)
        return true;
    },
    https: false
}));

app.use(`/${FROTNEND_MAPPING}`, proxy(FROTNEND_BASE_URL, {
    filter: (req, res) => {
        logDebug(`/${FROTNEND_MAPPING} => ${FROTNEND_BASE_URL}${req.url}`)
        // TODO: what does false do?
        return true;
    },
    https: false
}));

// TODO
// app.use('*', proxy(FROTNEND_BASE_URL));

export default app;