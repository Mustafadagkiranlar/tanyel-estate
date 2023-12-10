import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectEstate } from "@/app/_lib/mongo";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Missing credentials" }), {
      status: 400,
    });
  }
  try {
    const db = await connectEstate();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!);
    // console.log(token);
    return new Response(
      JSON.stringify({
        token: token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
