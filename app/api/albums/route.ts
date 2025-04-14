import { getAllAlbums } from "@/prisma/albums";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const albums = await getAllAlbums();
    return NextResponse.json(albums);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
  }
}