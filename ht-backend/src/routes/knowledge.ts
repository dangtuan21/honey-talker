import { FastifyInstance } from "fastify";
import { ObjectId } from "mongodb";
import { knowledge } from "../db";
import { KnowledgeSchema, CreateKnowledgeDto } from "../schemas";

export async function knowledgeRoutes(fastify: FastifyInstance) {
  // GET /knowledge
  fastify.get("/", async (request, reply) => {
    const docs = await knowledge().find({}).toArray();
    const parsed = docs.map(doc => ({
      _id: doc._id.toHexString(),
      title: doc.title || '',
      content: doc.content || '',
      org_id: doc.org_id || '',
      source: doc.source || { type: 'manual' },
      status: doc.status || 'active',
      created_at: doc.created_at || new Date().toISOString(),
      updated_at: doc.updated_at || new Date().toISOString()
    }));
    return parsed;
  });

  // GET /knowledge/:id
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const doc = await knowledge().findOne({ _id: new ObjectId(id) });
    if (!doc) return reply.status(404).send({ error: "Knowledge not found" });
    return {
      _id: doc._id.toHexString(),
      title: doc.title || '',
      content: doc.content || '',
      org_id: doc.org_id || '',
      source: doc.source || { type: 'manual' },
      status: doc.status || 'active',
      created_at: doc.created_at || new Date().toISOString(),
      updated_at: doc.updated_at || new Date().toISOString()
    };
  });

  // GET /knowledge/by-org/:orgId
  fastify.get("/by-org/:orgId", async (request, reply) => {
    const { orgId } = request.params as { orgId: string };
    const docs = await knowledge().find({ org_id: orgId }).toArray();
    const parsed = docs.map(doc => ({
      _id: doc._id.toHexString(),
      title: doc.title || '',
      content: doc.content || '',
      org_id: doc.org_id || '',
      source: doc.source || { type: 'manual' },
      status: doc.status || 'active',
      created_at: doc.created_at || new Date().toISOString(),
      updated_at: doc.updated_at || new Date().toISOString()
    }));
    return parsed;
  });

  // POST /knowledge
  fastify.post("/", async (request, reply) => {
    const dto = CreateKnowledgeDto.parse(request.body);
    const now = new Date().toISOString();
    const knowledgeItem = {
      ...dto,
      created_at: now,
      updated_at: now,
      status: "active"
    };
    const result = await knowledge().insertOne(knowledgeItem);
    return { _id: result.insertedId.toHexString(), ...knowledgeItem };
  });

  // PUT /knowledge/:id
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const dto = CreateKnowledgeDto.parse(request.body);
    const now = new Date().toISOString();
    const result = await knowledge().updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...dto, updated_at: now } }
    );
    if (result.matchedCount === 0) return reply.status(404).send({ error: "Knowledge not found" });
    return { _id: id, ...dto, updated_at: now };
  });

  // DELETE /knowledge/:id
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await knowledge().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return reply.status(404).send({ error: "Knowledge not found" });
    return { deleted: true };
  });

  // DELETE /knowledge/by-org/:orgId
  fastify.delete("/by-org/:orgId", async (request, reply) => {
    const { orgId } = request.params as { orgId: string };
    const result = await knowledge().deleteMany({ org_id: orgId });
    return { 
      deleted: true,
      deleted_count: result.deletedCount
    };
  });
}
