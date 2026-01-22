import { NextResponse } from "next/server";
import clientPromise from "../../../src/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });

    return NextResponse.json({
      status: "success",
      message: "MongoDB connected",
    });
  } catch (error: any) {
    console.error("MongoDB connection error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
