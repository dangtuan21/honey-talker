import { z } from "zod";
import { ObjectId } from "mongodb";

// Base timestamps
const timestamps = z.object({
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Helper to coerce ObjectId to string
const objectIdString = z.union([z.string(), z.any()]).transform((val) => {
  if (val && typeof val === "object" && "toHexString" in val && typeof val.toHexString === "function") {
    return (val as any).toHexString();
  }
  return String(val);
});

// Organization schema (supports both parent and child organizations)
export const OrganizationSchema = z.object({
  _id: objectIdString,
  name: z.string(),
  aliases: z.array(z.string()),
  description: z.string(),
  parent_id: z.string().optional(), // null for parent organizations, string for child organizations
  settings: z.record(z.any()).optional(), // settings for child organizations
  ...timestamps.shape,
});

export type Organization = z.infer<typeof OrganizationSchema>;

// Request/Response DTOs
export const CreateOrganizationDto = z.object({
  _id: z.string(),
  name: z.string(),
  aliases: z.array(z.string()),
  description: z.string(),
  parent_id: z.string().optional(),
  settings: z.record(z.any()).optional(),
});

export type CreateOrganizationDto = z.infer<typeof CreateOrganizationDto>;

// Chat session schema
export const ChatSessionSchema = z.object({
  _id: objectIdString,
  org_id: z.string(),
  user_id: z.string(),
  ...timestamps.shape,
});

export type ChatSession = z.infer<typeof ChatSessionSchema>;

// Chat message schema
export const ChatMessageSchema = z.object({
  _id: objectIdString,
  session_id: z.string(),
  org_id: z.string(),
  question: z.object({
    text: z.string(),
    normalized: z.string(),
    created_at: z.string().datetime(),
  }),
  answer: z.object({
    text: z.string(),
    created_at: z.string().datetime(),
  }),
  routing: z.object({
    type: z.enum(["single", "multi"]),
    orgs: z.array(z.string()),
    confidence: z.number(),
  }),
  retrieval: z.object({
    chunks: z.array(z.string()),
    top_k: z.number(),
  }),
  llm: z.object({
    model: z.string(),
    latency_ms: z.number(),
  }),
  created_at: z.string().datetime(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Request/Response DTOs
export const CreateSessionDto = z.object({
  org_id: z.string(),
  user_id: z.string(),
});

export const CreateMessageDto = z.object({
  session_id: z.string(),
  org_id: z.string(),
  question: z.object({
    text: z.string(),
    normalized: z.string(),
  }),
  answer: z.object({
    text: z.string(),
  }),
  routing: z.object({
    type: z.enum(["single", "multi"]),
    orgs: z.array(z.string()),
    confidence: z.number(),
  }),
  retrieval: z.object({
    chunks: z.array(z.string()),
    top_k: z.number(),
  }),
  llm: z.object({
    model: z.string(),
    latency_ms: z.number(),
  }),
});

export type CreateSessionDto = z.infer<typeof CreateSessionDto>;
export type CreateMessageDto = z.infer<typeof CreateMessageDto>;

// Knowledge schema
export const KnowledgeSchema = z.object({
  _id: z.string(), // Store as string in the schema
  title: z.string(),
  content: z.string(),
  org_id: z.string(),
  source: z.object({
    type: z.string(),
    url: z.string().optional(),
  }),
  status: z.string().optional(),
  ...timestamps.shape,
});

export type Knowledge = z.infer<typeof KnowledgeSchema>;

// Request/Response DTOs for Knowledge
export const CreateKnowledgeDto = z.object({
  title: z.string(),
  content: z.string(),
  org_id: z.string(),
  source: z.object({
    type: z.string(),
    url: z.string().optional(),
  }),
});

export type CreateKnowledgeDto = z.infer<typeof CreateKnowledgeDto>;
