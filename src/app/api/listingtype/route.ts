import { connectEstate } from "@/app/_lib/mongo";

export async function GET() {
  try {
    const db = await connectEstate();
    const listing_types = await db.collection("listing_type").find().toArray();
    return new Response(JSON.stringify(listing_types), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}