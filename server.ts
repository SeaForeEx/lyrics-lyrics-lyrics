import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Endpoint to get all artists and their albums
app.get('/artists', async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      include: { albums: true },
    });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
const PORT = 3000; // You can use port 3000 for the web server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});