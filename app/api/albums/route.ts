import { getAllAlbums } from "@/prisma/albums";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const albums = await getAllAlbums();
    return NextResponse.json(albums);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, artistId, review, image } = await req.json();

    // Validate required fields
    if (!title || !artistId) {
      return NextResponse.json(
        { error: "Title and artistId are required" },
        { status: 400 }
      );
    }

    // Create the new album
    const newAlbum = await prisma.album.create({
      data: {
        title,
        artistId,
        review: review || null, // Optional field
        image: image || null,   // Optional field
      },
    });

    return NextResponse.json(newAlbum, { status: 201 });
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json({ error: "Failed to create album" }, { status: 500 });
  }
}