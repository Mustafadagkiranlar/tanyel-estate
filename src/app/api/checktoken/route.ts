import { verifyToken } from "@/app/_lib/CheckToken";

export async function POST(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token" }), {
      status: 400,
    });
  }

  const isVerified = await verifyToken(token);

  if (isVerified === null) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
  return new Response(JSON.stringify({ message: "Token is valid" }), {
    status: 200,
  });
}
