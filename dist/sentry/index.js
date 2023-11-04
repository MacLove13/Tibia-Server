"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// You can also use CommonJS `require('@sentry/node')` instead of `import`
const Sentry = __importStar(require("@sentry/node"));
const profiling_node_1 = require("@sentry/profiling-node");
const server_1 = require("../server");
const disabledSentry = process.env.DISABLED_SENTRY || true;
const sentryDNS = process.env.SENTRY_DNS || null;
if (!disabledSentry && sentryDNS && sentryDNS.length > 5) {
    Sentry.init({
        dsn: '',
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            new Sentry.Integrations.Express({ app: server_1.app }),
            new profiling_node_1.ProfilingIntegration(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0,
        // Set sampling rate for profiling - this is relative to tracesSampleRate
        profilesSampleRate: 1.0,
    });
    server_1.app.use(function onError(err, req, res, next) {
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
        res.statusCode = 500;
        res.end(res.sentry + "\n");
    });
    // The request handler must be the first middleware on the app
    server_1.app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    server_1.app.use(Sentry.Handlers.tracingHandler());
    // All your controllers should live here
    server_1.app.get("/", function rootHandler(req, res) {
        res.end("Hello world!");
    });
    server_1.app.get("/debug-sentry", function mainHandler(req, res) {
        throw new Error("My first Sentry error!");
    });
    // The error handler must be registered before any other error middleware and after all controllers
    server_1.app.use(Sentry.Handlers.errorHandler());
    console.log('Sentry Initialized');
}
else {
    console.log('Sentry not configured.');
}
//# sourceMappingURL=index.js.map