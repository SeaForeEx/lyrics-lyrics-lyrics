'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const Artist = () => {
  const params = useParams(); // Use useParams to access the dynamic route params

  const [albums, setAlbums] = useState<{ id: string; title: string }[]>([]);
  const [artistName, setArtistName] = useState<string>("");

  useEffect(() => {
    const fetchArtistAlbums = async () => {
      if (!params?.id) return; // Ensure params.id exists
      const response = await fetch(`/api/artists/${params.id}`);
      const data = await response.json();
      setAlbums(data.albums);
      setArtistName(data.artistName);
    };

    fetchArtistAlbums();
  }, [params?.id]);

  return (
    <>
      <h1>Albums by {artistName}</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={`/albums/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        Go <Link href="/artists">back</Link>!
      </div>
    </>
  );
};

export default Artist;