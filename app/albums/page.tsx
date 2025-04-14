'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Albums = () => {
  const [albums, setAlbums] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
      const fetchAlbums = async () => {
        const response = await fetch("/api/albums");
        const data = await response.json();
        setAlbums(data);
      };
  
      fetchAlbums();
  }, []);

  return (
    <>
      <h1>These are the albums!</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={`/albums/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        Check out our <Link href="/artists">artists</Link>!
      </div>
      <div>
        Go <Link href="/">back</Link>!
      </div>
    </>
  );
};

export default Albums;
