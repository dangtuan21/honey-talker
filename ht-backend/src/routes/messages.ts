import { FastifyInstance } from "fastify";
import { chatMessages } from "../db";
import { ChatMessageSchema, CreateMessageDto } from "../schemas";

export async function messagesRoutes(fastify: FastifyInstance) {
  // GET /messages
  fastify.get("/", async (request, reply) => {
    const docs = await chatMessages().find({}).toArray();
    const parsed = docs.map(doc => ChatMessageSchema.parse(doc));
    return parsed;
  });

  // GET /messages/:id
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const doc = await chatMessages().findOne({ _id: id });
    if (!doc) return reply.status(404).send({ error: "Message not found" });
    return ChatMessageSchema.parse(doc);
  });

  // GET /messages/by-session/:sessionId
  fastify.get("/by-session/:sessionId", async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const docs = await chatMessages().find({ session_id: sessionId }).toArray();
    const parsed = docs.map(doc => ChatMessageSchema.parse(doc));
    return parsed;
  });

  // POST /messages
  fastify.post("/", async (request, reply) => {
    const dto = CreateMessageDto.parse(request.body);
    const now = new Date().toISOString();
    const message = {
      _id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      ...dto,
      question: { ...dto.question, created_at: now },
      answer: { ...dto.answer, created_at: now },
      created_at: now,
    };
    const result = await chatMessages().insertOne(message);
    return { _id: message._id, ...message };
  });

  // DELETE /messages/:id
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await chatMessages().deleteOne({ _id: id });
    if (result.deletedCount === 0) return reply.status(404).send({ error: "Message not found" });
    return { deleted: true };
  });
}
