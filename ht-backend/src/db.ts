import { MongoClient, Db, Collection } from "mongodb";
import { env } from "./config";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connect(): Promise<MongoClient> {
  if (client) return Promise.resolve(client);
  client = new MongoClient(env.MONGODB_URL);
  await client.connect();
  db = client.db(env.DATABASE_NAME);
  console.log("Connected to MongoDB");
  return client;
}

export function getDb(): Db {
  if (!db) throw new Error("Database not connected");
  return db;
}

export function close(): Promise<void> {
  if (!client) return Promise.resolve();
  return client.close().then(() => {
    client = null;
    db = null;
  });
}

// Collection helpers
export function organizations(): Collection {
  return getDb().collection("organizations");
}

export function chatSessions(): Collection {
  return getDb().collection("chat_sessions");
}

export function chatMessages(): Collection {
  return getDb().collection("chat_messages");
}
