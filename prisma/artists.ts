import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create an artist
export async function createArtist(name: string) {
  return await prisma.artist.create({
    data: { name },
  });
}

// Get all artists
export async function getAllArtists() {
  return await prisma.artist.findMany({
    include: { albums: true }, // Include albums if needed
  });
}

// Get a single artist by ID
export async function getArtistById(id: string) {
  return await prisma.artist.findUnique({
    where: { id },
    include: { albums: true }, // Include albums if needed
  });
}

// Update an artist
export async function updateArtist(id: string, name: string) {
  return await prisma.artist.update({
    where: { id },
    data: { name },
  });
}

// Delete an artist
export async function deleteArtist(id: string) {
  return await prisma.artist.delete({
    where: { id },
  });
}