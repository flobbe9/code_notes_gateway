import express from 'express';
import proxy from 'express-http-proxy';
import { BACKEND_BASE_URL, BACKEND_MAPPING, FROTNEND_BASE_URL, FROTNEND_MAPPING } from './helpers/constants.ts';
import { logDebug } from './helpers/logUtils.ts';

const app = express();

app.use(`/${BACKEND_MAPPING}`, proxy(BACKEND_BASE_URL, {
    filter: (req) => {
        logDebug(`/${BACKEND_MAPPING} => ${BACKEND_BASE_URL}${req.url}`)
        return true;
    }
}));

app.use(`/${FROTNEND_MAPPING}`, proxy(FROTNEND_BASE_URL, {
    filter: (req) => {
        logDebug(`/${FROTNEND_MAPPING} => ${FROTNEND_BASE_URL}${req.url}`)
        return true;
    }
}));

// 404 to frontend as well
app.use(proxy(FROTNEND_BASE_URL, {
    filter: (req) => {
        logDebug(`/${FROTNEND_MAPPING} => ${FROTNEND_BASE_URL}${req.url}`)
        return true;
    }
}));

export default app;