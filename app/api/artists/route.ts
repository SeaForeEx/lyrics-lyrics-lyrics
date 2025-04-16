import { getAllArtists } from "@/prisma/artists";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const artists = await getAllArtists();
    return NextResponse.json(artists);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Artist name is required" }, { status: 400 });
    }

    const existingArtist = await prisma.artist.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive", // Case-insensitive comparison
        },
      },
    });

    if (existingArtist) {
      return NextResponse.json({ error: "Artist already exists" }, { status: 409 });
    }

    const newArtist = await prisma.artist.create({
      data: { name },
    });

    return NextResponse.json(newArtist, { status: 201 });
  } catch (error) {
    console.error("Error creating artist:", error);
    return NextResponse.json({ error: "Failed to create artist" }, { status: 500 });
  }
}