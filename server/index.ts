import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const port = Number(process.env.PORT ?? "8081");
const coreUrl = process.env.MANAFIELD_CORE_URL ?? "http://127.0.0.1:8080";

app.get("/manafield/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "manafield-module-reference",
    version: "0.0.1"
  });
});

app.get("/api/core/modules", async (request, response) => {
  try {
    const coreResponse = await fetch(new URL("/modules", coreUrl), {
      headers: {
        Accept: request.header("accept") ?? "application/json"
      }
    });

    const body = Buffer.from(await coreResponse.arrayBuffer());
    const contentType = coreResponse.headers.get("content-type");

    response.status(coreResponse.status);

    if (contentType) {
      response.setHeader("content-type", contentType);
    }

    response.send(body);
  } catch (error) {
    response.status(502).json({
      error: "core_unreachable",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDirectory, "..");
const webRoot = path.join(projectRoot, "dist");

if (existsSync(webRoot)) {
  app.use(express.static(webRoot));

  app.use((request, response, next) => {
    if (request.method !== "GET") {
      next();
      return;
    }

    response.sendFile(path.join(webRoot, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Manafield Reference Module listening on :${port}`);
  console.log(`Manafield Core: ${coreUrl}`);
});
