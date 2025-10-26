import "env";

import { join } from "node:path";
import { logger } from "utils/logging";
import { tree, formatTree } from "utils/tree";
import assert from "node:assert";

const routes = await tree(import.meta.dirname, "app");

logger.info("routes", formatTree(routes, join(import.meta.dirname, "..")));

Bun.serve({
  port: 80,
  error(error) {
    logger.error(error);
  },
  async fetch(request, server) {
    const { pathname } = new URL(request.url);
    const moduleRoute = routes[pathname];

    if (!moduleRoute) {
      logger.debug("incoming request from", server.requestIP(request)?.address, "to", pathname, "matched no module");
      return new Response("Not Found", { status: 404 });
    }

    logger.debug("incoming request", pathname, "matched a module");

    const { default: execute } = await import(moduleRoute);

    assert(
      typeof execute === "function",
      "A valid path returned a non-runnable default export from a module"
    );

    const result: unknown = await execute(request);
    const response = JSON.stringify(result);

    logger.debug("Response of size", response.length, "being sent back");

    return new Response(response, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
