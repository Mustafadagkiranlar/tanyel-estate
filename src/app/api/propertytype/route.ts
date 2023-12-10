import { connectEstate } from "@/app/_lib/mongo";

export async function GET() {
  try {
    const db = await connectEstate();
    const property_types = await db.collection("property_types").find().toArray();
    return new Response(JSON.stringify(property_types), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}