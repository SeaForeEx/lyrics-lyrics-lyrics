'use client';
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const Album = () => {
  const params = useParams(); // Use useParams to access the dynamic route params
  const router = useRouter(); // Use useRouter to access the router object

  const [album, setAlbum] = useState<{
    id: string;
    title: string;
    image: string | null;
    year: number | null;
    review: string;
    artist: { name: string };
  } | null>(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (!params?.id) return; // Ensure params.id exists
      const response = await fetch(`/api/albums/${params.id}`);
      const data = await response.json();
      setAlbum(data);
    };

    fetchAlbumDetails();
  }, [params?.id]);

  if (!album) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{album.title}</h1>
      <p><strong>Artist:</strong> {album.artist.name}</p>
      {album.image ? <img src={album.image} alt={album.title} width={300} /> : <img src="https://media.istockphoto.com/id/1180410208/vector/landscape-image-gallery-with-the-photos-stack-up.jpg?s=612x612&w=0&k=20&c=G21-jgMQruADLPDBk7Sf1vVvCEtPiJD3Rf39AeB95yI=" alt="no image" width={300} />}
      <p><strong>Review:</strong> {album.review}</p>
      <div>
        Go{" "}
        <span
          onClick={() => router.back()}
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          back
        </span>
        !
      </div>
    </>
  );
};

export default Album;