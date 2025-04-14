import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create an artist
  const artist = await prisma.artist.create({
    data: {
      name: 'sleepingdogs',
      albums: {
        create: [
          { title: "i'm fakin' my own death just to get some rest", review: "Anthemic debut album!", image: "https://f4.bcbits.com/img/a0949198923_16.jpg" },
          { title: "will we ever dance again?", review: "Beautiful art school project!", image: "https://f4.bcbits.com/img/a1394118706_16.jpg" },
          { title: "DOGSTOEVSKY", review: "Simply a masterpiece!", image: "https://f4.bcbits.com/img/a1366934555_16.jpg" },
        ],
      },
    },
  });

  console.log('Seeded artist:', artist);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });