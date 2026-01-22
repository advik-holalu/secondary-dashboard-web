import clientPromise from "../../../src/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("testdb");

  await db.collection("ping").insertOne({
    message: "hello from nextjs",
    createdAt: new Date(),
  });

  return Response.json({ ok: true });
}

