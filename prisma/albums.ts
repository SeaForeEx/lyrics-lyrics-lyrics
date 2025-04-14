import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create an album
export async function createAlbum(title: string, review: string, image: string | null, artistId: string) {
  return await prisma.album.create({
    data: {
      title,
      review,
      image,
      artistId,
    },
  });
}

// Get all albums
export async function getAllAlbums() {
  return await prisma.album.findMany({
    include: { artist: true }, // Include artist details if needed
  });
}

// Get a single album by ID
export async function getAlbumById(id: string) {
  return await prisma.album.findUnique({
    where: { id },
    include: { artist: true }, // Include artist details if needed
  });
}

// Update an album
export async function updateAlbum(id: string, title?: string, review?: string, image?: string | null) {
  return await prisma.album.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(review && { review }),
      ...(image && { image }),
    },
  });
}

// Delete an album
export async function deleteAlbum(id: string) {
  return await prisma.album.delete({
    where: { id },
  });
}