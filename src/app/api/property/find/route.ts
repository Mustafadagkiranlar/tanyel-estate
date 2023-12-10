import { connectEstate } from "@/app/_lib/mongo";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {

  const { id } = await request.json();

  if (!id || !ObjectId.isValid(id)) {//sanitize the id for injection
    return new Response(JSON.stringify({ message: "Missing credentials" }), {
      status: 400,
    });
  }

  try {
    const db = await connectEstate();
    const _id = new ObjectId(id);
    const property = await db.collection("properties").findOne({ _id });
    if (property) {
      return new Response(JSON.stringify(property), {
        status: 200,
      });
    }
    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    } else {
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
