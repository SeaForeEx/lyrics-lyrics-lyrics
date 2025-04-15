import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const artistId = params.id;

    // Fetch the artist and their albums
    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
      include: { albums: true }, // Include albums in the response
    });

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    return NextResponse.json({
      artistName: artist.name,
      albums: artist.albums,
    });
  } catch (error) {
    console.error("Error fetching artist:", error);
    return NextResponse.json({ error: "Failed to fetch artist" }, { status: 500 });
  }
}