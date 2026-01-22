import { NextResponse } from "next/server";
import clientPromise from "../../../src/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("secondary_dashboard");

    const records = [
      { name: "Blinkit – Jan", createdAt: new Date() },
      { name: "Zepto – Jan", createdAt: new Date() },
      { name: "Instamart – Jan", createdAt: new Date() },
      { name: "Blinkit – Feb", createdAt: new Date() },
      { name: "Zepto – Feb", createdAt: new Date() },
    ];

    await db.collection("records").insertMany(records);

    return NextResponse.json({
      ok: true,
      inserted: records.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
