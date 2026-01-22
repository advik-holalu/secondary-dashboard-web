import { NextResponse } from "next/server";
import clientPromise from "../../../src/lib/mongodb";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("secondary_dashboard");

    const records = [
      { name: "Blinkit - Jan", createdAt: new Date() },
      { name: "Zepto - Jan", createdAt: new Date() },
      { name: "Instamart - Jan", createdAt: new Date() },
      { name: "Blinkit - Feb", createdAt: new Date() },
      { name: "Zepto - Feb", createdAt: new Date() },
    ];

    const result = await db.collection("records").insertMany(records);

    return NextResponse.json({
      status: "success",
      insertedCount: result.insertedCount,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
