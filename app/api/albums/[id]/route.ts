import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const albumId = params.id;

    // Fetch the album and its artist
    const album = await prisma.album.findUnique({
      where: { id: albumId },
      include: { artist: true },
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json(album);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch album" }, { status: 500 });
  }
}