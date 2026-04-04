import { FastifyInstance } from "fastify";

export async function chatRoutes(fastify: FastifyInstance) {
  // POST /chat - Proxy to AI service
  fastify.post("/chat", async (request, reply) => {
    try {
      const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://ht-ai:8020";
      
      // Forward the request to AI service
      const response = await fetch(`${AI_SERVICE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      });

      if (!response.ok) {
        throw new Error(`AI service responded with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      fastify.log.error('Chat proxy error:', errorMessage);
      return reply.status(500).send({ 
        error: "Failed to process chat request",
        message: errorMessage 
      });
    }
  });
}
