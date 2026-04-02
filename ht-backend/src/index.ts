import fastify from "fastify";
import cors from "@fastify/cors";
import { connect, close } from "./db";
import { env } from "./config";
import { organizationsRoutes } from "./routes/organizations";
import { sessionsRoutes } from "./routes/sessions";
import { messagesRoutes } from "./routes/messages";
import { knowledgeRoutes } from "./routes/knowledge";

async function buildServer() {
  const server = fastify({ logger: true });

  // CORS
  await server.register(cors, {
    origin: env.CORS_ORIGIN,
  });

  // Health check
  server.get("/health", async () => ({ status: "ok" }));

  // Routes
  await server.register(organizationsRoutes, { prefix: "/organizations" });
  await server.register(sessionsRoutes, { prefix: "/sessions" });
  await server.register(messagesRoutes, { prefix: "/messages" });
  await server.register(knowledgeRoutes, { prefix: "/knowledge" });

  return server;
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await close();
  process.exit(0);
});

// Start
async function start() {
  try {
    await connect();
    const server = await buildServer();
    await server.listen({ port: env.PORT, host: env.HOST });
    console.log(`Server listening on http://${env.HOST}:${env.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
