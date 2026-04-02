import { FastifyInstance } from "fastify";
import { schools } from "../db";
import { SchoolSchema, CreateSchoolDto } from "../schemas";

export async function schoolsRoutes(fastify: FastifyInstance) {
  // GET /schools
  fastify.get("/", async (request, reply) => {
    const docs = await schools().find({}).toArray();
    const parsed = docs.map(doc => SchoolSchema.parse(doc));
    return parsed;
  });

  // GET /schools/:id
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const doc = await schools().findOne({ _id: id });
    if (!doc) return reply.status(404).send({ error: "School not found" });
    return SchoolSchema.parse(doc);
  });

  // POST /schools
  fastify.post("/", async (request, reply) => {
    const dto = CreateSchoolDto.parse(request.body);
    const now = new Date().toISOString();
    const school = {
      ...dto,
      created_at: now,
      updated_at: now,
    };
    const result = await schools().insertOne(school);
    return { _id: school._id, ...school };
  });

  // PUT /schools/:id
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const dto = CreateSchoolDto.parse(request.body);
    const now = new Date().toISOString();
    const result = await schools().updateOne(
      { _id: id },
      { $set: { ...dto, updated_at: now } }
    );
    if (result.matchedCount === 0) return reply.status(404).send({ error: "School not found" });
    return { _id: id, ...dto, updated_at: now };
  });

  // DELETE /schools/:id
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await schools().deleteOne({ _id: id });
    if (result.deletedCount === 0) return reply.status(404).send({ error: "School not found" });
    return { deleted: true };
  });
}
