import { getAllArtists } from "@/prisma/artists";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const artists = await getAllArtists();
    return NextResponse.json(artists);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}