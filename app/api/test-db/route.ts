import { NextResponse } from "next/server";
import clientPromise from "../../../src/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      message: "MongoDB connected",
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
