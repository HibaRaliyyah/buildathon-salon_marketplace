import { MongoClient, Db, Document } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.warn("WARNING: MONGODB_URI is not set in environment variables");
}

const DB_NAME = "glowai";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }

  db = client.db(DB_NAME);
  return db;
}

export async function getCollection<T extends Document = Document>(name: string) {
  const database = await getDb();
  return database.collection<T>(name);
}
