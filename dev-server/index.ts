import express, { type Request, type Response } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add cache headers for index.html: cache for 24 hours, then must revalidate
app.use((req, res, next) => {
  // Check if this is a request for the root HTML file or any HTML route
  if (
    req.path === "/" ||
    (!req.path.includes(".") && !req.path.startsWith("/api"))
  ) {
    // Set cache headers: cache for 24 hours (86400 seconds), then revalidate
    res.set({
      "Cache-Control": "public, max-age=86400, must-revalidate",
      Vary: "Accept-Encoding",
    });
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const { path } = req;
  let capturedJsonResponse: Record<string, unknown> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = `${logLine.slice(0, 79)}…`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use(
    (
      err: Error & { status?: number; statusCode?: number },
      _req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: express.NextFunction
    ) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Express error-handling middleware must have 4 args.
      // Respond with JSON and do not rethrow here to avoid double handling.
      res.status(status).json({ message });
      // Explicitly end the response to satisfy some proxies/adapters
      res.end();
    }
  );

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // this serves both the API and the client.
  const port = parseInt(process.env.PORT || "9595", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on http://localhost:${port}/`);
    }
  );
})();
