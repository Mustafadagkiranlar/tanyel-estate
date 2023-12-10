import { MongoClient } from "mongodb";

const MONGO_URI: string = process.env.MONGO_URI!;
const client = new MongoClient(MONGO_URI);

async function connectEstate() {
  let conn: any;
  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
  }
  return conn.db("realestate");
}

export { connectEstate };