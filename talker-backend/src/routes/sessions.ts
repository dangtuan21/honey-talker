import { FastifyInstance } from "fastify";
import { chatSessions } from "../db";
import { ChatSessionSchema, CreateSessionDto } from "../schemas";

export async function sessionsRoutes(fastify: FastifyInstance) {
  // GET /sessions
  fastify.get("/", async (request, reply) => {
    const docs = await chatSessions().find({}).toArray();
    const parsed = docs.map(doc => ChatSessionSchema.parse(doc));
    return parsed;
  });

  // GET /sessions/:id
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const doc = await chatSessions().findOne({ _id: id });
    if (!doc) return reply.status(404).send({ error: "Session not found" });
    return ChatSessionSchema.parse(doc);
  });

  // POST /sessions
  fastify.post("/", async (request, reply) => {
    const dto = CreateSessionDto.parse(request.body);
    const now = new Date().toISOString();
    const session = {
      ...dto,
      created_at: now,
      updated_at: now,
    };
    const result = await chatSessions().insertOne(session);
    return { _id: session._id, ...session };
  });

  // DELETE /sessions/:id
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await chatSessions().deleteOne({ _id: id });
    if (result.deletedCount === 0) return reply.status(404).send({ error: "Session not found" });
    return { deleted: true };
  });
}
