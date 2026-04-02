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

// School schema
export const SchoolSchema = z.object({
  _id: objectIdString,
  name: z.string(),
  aliases: z.array(z.string()),
  description: z.string(),
  ...timestamps.shape,
});

export type School = z.infer<typeof SchoolSchema>;

// Chat session schema
export const ChatSessionSchema = z.object({
  _id: objectIdString,
  school_id: z.string(),
  user_id: z.string(),
  ...timestamps.shape,
});

export type ChatSession = z.infer<typeof ChatSessionSchema>;

// Chat message schema
export const ChatMessageSchema = z.object({
  _id: objectIdString,
  session_id: z.string(),
  school_id: z.string(),
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
    schools: z.array(z.string()),
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
export const CreateSchoolDto = z.object({
  _id: z.string(),
  name: z.string(),
  aliases: z.array(z.string()),
  description: z.string(),
});

export const CreateSessionDto = z.object({
  school_id: z.string(),
  user_id: z.string(),
});

export const CreateMessageDto = z.object({
  session_id: z.string(),
  school_id: z.string(),
  question: z.object({
    text: z.string(),
    normalized: z.string(),
  }),
  answer: z.object({
    text: z.string(),
  }),
  routing: z.object({
    type: z.enum(["single", "multi"]),
    schools: z.array(z.string()),
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

export type CreateSchoolDto = z.infer<typeof CreateSchoolDto>;
export type CreateSessionDto = z.infer<typeof CreateSessionDto>;
export type CreateMessageDto = z.infer<typeof CreateMessageDto>;
