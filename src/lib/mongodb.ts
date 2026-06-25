import { MongoClient, Db, Document } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://hibaraliyyah12_db_user:Hiba786@cluster0.cdrg2hs.mongodb.net/glowai?retryWrites=true&w=majority";

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
