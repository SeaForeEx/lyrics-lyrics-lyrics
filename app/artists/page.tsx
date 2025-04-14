'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Artists = () => {
  const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch("/api/artists");
      const data = await response.json();
      setArtists(data);
    };

    fetchArtists();
  }, []);

  return (
    <>
      <h1>These are the artists!</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link href={`/artists/${artist.id}`}>{artist.name}</Link>
        </li>
        ))}
      </ul>
      <div>
        Check out our <Link href="/albums">albums</Link>!
      </div>
      <div>
        Go <Link href="/">back</Link>!
      </div>
    </>
  );
};

export default Artists;
