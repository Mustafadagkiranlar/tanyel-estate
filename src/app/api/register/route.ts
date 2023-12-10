import bcrypt from "bcrypt";
import { connectEstate } from "@/app/_lib/mongo";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Missing credentials" }), {
      status: 400,
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const db = await connectEstate();
    const user = await db.collection("users").findOne({ email });

    if (user) {
      return new Response(JSON.stringify({ message: "credentials exists" }), {
        status: 404,
      });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      email,
      password: hashedPassword,
    };

    await db.collection("users").insertOne(newUser);

    return new Response(JSON.stringify("user created"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
