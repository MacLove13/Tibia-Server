// You can also use CommonJS `require('@sentry/node')` instead of `import`
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { app } from '../server';
import { Request, Response, NextFunction } from "express";

declare module 'express-serve-static-core' {
  export interface Response {
    sentry?: string;
  }
}

const disabledSentry = process.env.DISABLED_SENTRY || true;
const sentryDNS = process.env.SENTRY_DNS || null;

if (!disabledSentry && sentryDNS && sentryDNS.length > 5) {
  Sentry.init({
    dsn: sentryDNS,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });

  app.use(function onError(err: Error, req: Request, res: Response, next: NextFunction) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  // All your controllers should live here
  app.get("/", function rootHandler(req, res) {
    res.end("Hello world!");
  });

  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

  // The error handler must be registered before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  console.log('Sentry Initialized');
}
else {
  console.log('Sentry not configured.');
}
