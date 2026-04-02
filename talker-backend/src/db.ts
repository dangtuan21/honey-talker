import { MongoClient, Db, Collection } from "mongodb";
import { env } from "./config";

let client: MongoClient;
let db: Db;

export async function connect(): Promise<void> {
  client = new MongoClient(env.MONGODB_URL);
  await client.connect();
  db = client.db(env.DATABASE_NAME);
  console.log("Connected to MongoDB");
}

export function getDb(): Db {
  if (!db) throw new Error("Database not connected");
  return db;
}

export function close(): Promise<void> {
  return client.close();
}

// Collection helpers
export function schools(): Collection {
  return getDb().collection("schools");
}

export function chatSessions(): Collection {
  return getDb().collection("chat_sessions");
}

export function chatMessages(): Collection {
  return getDb().collection("chat_messages");
}
