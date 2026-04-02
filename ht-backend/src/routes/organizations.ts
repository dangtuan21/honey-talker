import { FastifyInstance } from "fastify";
import { ObjectId } from "mongodb";
import { organizations } from "../db";
import { OrganizationSchema, CreateOrganizationDto } from "../schemas";

export async function organizationsRoutes(fastify: FastifyInstance) {
  // GET /organizations
  fastify.get("/", async (request, reply) => {
    const docs = await organizations().find({}).toArray();
    const parsed = docs.map(doc => OrganizationSchema.parse(doc));
    return parsed;
  });

  // GET /organizations/:id
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const doc = await organizations().findOne({ _id: new ObjectId(id) });
    if (!doc) return reply.status(404).send({ error: "Organization not found" });
    return OrganizationSchema.parse(doc);
  });

  // POST /organizations
  fastify.post("/", async (request, reply) => {
    const dto = CreateOrganizationDto.parse(request.body);
    const now = new Date().toISOString();
    const { _id, ...organizationData } = dto; // Extract _id from dto
    const organization = {
      ...organizationData,
      created_at: now,
      updated_at: now,
    };
    const result = await organizations().insertOne(organization);
    return { _id: result.insertedId.toHexString(), ...organization };
  });

  // PUT /organizations/:id
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const dto = CreateOrganizationDto.parse(request.body);
    const now = new Date().toISOString();
    const { _id, ...updateData } = dto; // Extract _id from dto
    const result = await organizations().updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updated_at: now } }
    );
    if (result.matchedCount === 0) return reply.status(404).send({ error: "Organization not found" });
    return { _id: id, ...updateData, updated_at: now };
  });

  // DELETE /organizations/:id
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await organizations().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return reply.status(404).send({ error: "Organization not found" });
    return { deleted: true };
  });
}
