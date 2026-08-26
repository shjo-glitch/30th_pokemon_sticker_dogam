// Assemble a Cloudflare Pages "advanced mode" artifact from the vinext build.
//
//   pages-dist/            <- dist/client (static assets, _headers)
//   pages-dist/_worker.js/ <- Pages worker (directory module format)
//     index.js             <- shim: try ASSETS for GET/HEAD, else vinext SSR
//     server/              <- dist/server (vinext worker, untouched so its
//                             relative imports like ssr/ -> ../index.js work)
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const out = resolve(root, "pages-dist");

await rm(out, { recursive: true, force: true });
await mkdir(resolve(out, "_worker.js"), { recursive: true });

await cp(resolve(dist, "client"), out, { recursive: true });
await cp(resolve(dist, "server"), resolve(out, "_worker.js", "server"), {
  recursive: true,
});

// Not needed at runtime; wrangler.json would confuse the Pages uploader.
await rm(resolve(out, "_worker.js", "server", "wrangler.json"), { force: true });
await rm(resolve(out, "_worker.js", "server", ".vite"), {
  recursive: true,
  force: true,
});
await rm(resolve(out, ".vite"), { recursive: true, force: true });

const shim = `// Cloudflare Pages advanced-mode entry.
// Pages sends *every* request to this Worker, so static files are served from
// env.ASSETS first and only misses fall through to the vinext SSR handler.
// ASSETS answers non-GET/HEAD with 405, so only safe methods are probed.
import worker from "./server/index.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method === "GET" || request.method === "HEAD") {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return asset;
    }
    return worker.fetch(request, env, ctx);
  },
};
`;
await writeFile(resolve(out, "_worker.js", "index.js"), shim);

console.log("pages-dist assembled");

// The Cloudflare Vite plugin writes a deploy-config redirect pointing wrangler
// at dist/server/wrangler.json; that conflicts with the Pages wrangler.toml.
await rm(resolve(root, ".wrangler", "deploy", "config.json"), { force: true });
