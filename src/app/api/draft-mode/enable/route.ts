import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Draft mode is disabled in static mode" }, { status: 200 });
}