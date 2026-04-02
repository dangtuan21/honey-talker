import { FastifyInstance } from "fastify";
import { ObjectId } from "mongodb";
import { orgs } from "../db";
import { OrganizationSchema, CreateOrganizationDto } from "../schemas";

export async function orgsRoutes(fastify: FastifyInstance) {
  // GET /orgs
  fastify.get("/", async (request, reply) => {
    const docs = await orgs().find({}).toArray();
    const parsed = docs.map(doc => OrganizationSchema.parse(doc));
    return parsed;
  });

  // GET /orgs/:id
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const doc = await orgs().findOne({ _id: new ObjectId(id) });
    if (!doc) return reply.status(404).send({ error: "Organization not found" });
    return OrganizationSchema.parse(doc);
  });

  // POST /orgs
  fastify.post("/", async (request, reply) => {
    const dto = CreateOrganizationDto.parse(request.body);
    const now = new Date().toISOString();
    const org = {
      name: dto.name,
      aliases: dto.aliases,
      description: dto.description,
      created_at: now,
      updated_at: now,
    };
    const result = await orgs().insertOne(org);
    return { _id: result.insertedId.toString(), name: org.name, aliases: org.aliases, description: org.description, created_at: org.created_at, updated_at: org.updated_at };
  });

  // PUT /orgs/:id
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const dto = CreateOrganizationDto.parse(request.body);
    const now = new Date().toISOString();
    const update = {
      $set: {
        name: dto.name,
        aliases: dto.aliases,
        description: dto.description,
        updated_at: now,
      },
    };
    const result = await orgs().updateOne({ _id: new ObjectId(id) }, update);
    if (result.matchedCount === 0) return reply.status(404).send({ error: "Organization not found" });
    return { _id: id, name: dto.name, aliases: dto.aliases, description: dto.description, updated_at: now };
  });

  // DELETE /orgs/:id
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await orgs().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return reply.status(404).send({ error: "Organization not found" });
    return { deleted: true };
  });
}
