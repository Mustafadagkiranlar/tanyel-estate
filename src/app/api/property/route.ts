import { checkToken } from "@/app/_lib/CheckToken";
import { connectEstate } from "@/app/_lib/mongo";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await connectEstate();
    const properties = await db.collection("properties").find().toArray();
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
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


  const {
    title,
    description,
    price,
    photos,
    location,
    propertyType,
    bedroomNumber,
    bathroomNumber,
    area,
    amenities,
    listingType,
    lat,
    long,
  } = await request.json();

  if (
    !title ||
    !description ||
    !price ||
    !photos ||
    !location ||
    !propertyType ||
    !bedroomNumber ||
    !bathroomNumber ||
    !area ||
    !listingType ||
    !lat ||
    !long
  ) {
    return new Response(JSON.stringify({ message: "Missing credentials" }), {
      status: 400,
    });
  }

  try {
    const db = await connectEstate();
    const property = await db.collection("properties").findOne({ title });
    if (property) {
      return new Response(JSON.stringify({ message: "Property exists" }), {
        status: 404,
      });
    }

    const formattedTitle =
      title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

    const newProperty = {
      title:formattedTitle,
      description,
      price,
      photos,
      location,
      propertyType,
      bedroomNumber,
      bathroomNumber,
      area,
      amenities,
      listingType,
      lat,
      long,
    };

    await db.collection("properties").insertOne(newProperty);

    return new Response(JSON.stringify("property created"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function PUT(request:Request){

  const verifiedToken = await checkToken(request);
  
  if (verifiedToken === null) {
    return new Response(JSON.stringify({ result: "Invalid Token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }


  const {
    id,
    title,
    description,
    price,
    photos,
    location,
    propertyType,
    bedroomNumber,
    bathroomNumber,
    area,
    amenities,
    listingType,
    lat,
    long,
  } = await request.json();

  if (
    !id ||
    !title ||
    !description ||
    !price ||
    !photos ||
    !location ||
    !propertyType ||
    !bedroomNumber ||
    !bathroomNumber ||
    !area ||
    !amenities ||
    !listingType ||
    !lat ||
    !long
  ) {
    return new Response(JSON.stringify({ message: "Missing credentials" }), {
      status: 400,
      statusText:"Missing credentials"
    });
  }

  try {
    const db = await connectEstate();
    const _id = new ObjectId(id);
    const property = await db.collection("properties").findOne({ _id });
    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }
    const formattedTitle =
      title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

    const newProperty = {
      title:formattedTitle,
      description,
      price,
      photos,
      location,
      propertyType,
      bedroomNumber,
      bathroomNumber,
      area,
      amenities,
      listingType,
      lat,
      long,
    };

    await db.collection("properties").updateOne({_id},{$set:newProperty});

    return new Response(JSON.stringify("property updated"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }

}

export async function DELETE(request:Request){

  const verifiedToken = await checkToken(request);
  
  if (verifiedToken === null) {
    return new Response(JSON.stringify({ result: "Invalid Token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  const {id} = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ message: "Missing credentials" }), {
      status: 400,
    });
  }

  try {
    const db = await connectEstate();
    const _id = new ObjectId(id);
    const property = await db.collection("properties").findOne({ _id });
    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }

    await db.collection("properties").deleteOne({_id});

    return new Response(JSON.stringify({ message: "property deleted"}), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}