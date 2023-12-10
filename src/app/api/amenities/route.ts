import { checkToken } from "@/app/_lib/CheckToken";
import { connectEstate } from "@/app/_lib/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectEstate();
    const amenities = await db.collection("amenities").find().toArray();
    return new NextResponse(JSON.stringify(amenities), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function POST(request: Request) {
  const verifiedToken = await checkToken(request);

  if (verifiedToken === null) {
    return new Response(JSON.stringify({ result: "Invalid Token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name } = await request.json();

  if (!name) {
    return new NextResponse(
      JSON.stringify({ message: "Missing credentials" }),
      { status: 400 }
    );
  }
  try {
    const capitalizedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const db = await connectEstate();
    const amenities = await db
      .collection("amenities")
      .insertOne({ name: capitalizedName });
    return new NextResponse(JSON.stringify(amenities), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function PUT(request: Request) {
  const verifiedToken = await checkToken(request);

  if (verifiedToken === null) {
    return new Response(JSON.stringify({ result: "Invalid Token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id, name } = await request.json();

  if (!name || !id) {
    return new NextResponse(
      JSON.stringify({ message: "Missing credentials" }),
      { status: 400 }
    );
  }

  try {
    //convert id to ObjectId
    const _id = new ObjectId(id);
    const capitalizedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const db = await connectEstate();
    const amenities = await db
      .collection("amenities")
      .updateOne({ _id }, { $set: { name: capitalizedName } });
    return new NextResponse(JSON.stringify(amenities), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const verifiedToken = await checkToken(request);

  if (verifiedToken === null) {
    return new Response(JSON.stringify({ result: "Invalid Token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id } = await request.json();

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Missing credentials" }),
      { status: 400 }
    );
  }

  try {
    const _id = new ObjectId(id);
    const db = await connectEstate();
    const amenities = await db.collection("amenities").deleteOne({ _id });
    return new NextResponse(JSON.stringify(amenities), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
