'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Albums = () => {
  const [albums, setAlbums] = useState<{ id: string; title: string }[]>([]);
  const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: "", artistId: "", review: "", image: "" });
  const [newArtist, setNewArtist] = useState(""); // For adding a new artist
  const [isAddingNewArtist, setIsAddingNewArtist] = useState(false); // Toggle for "new artist" option
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAlbumsAndArtists = async () => {
      const albumsResponse = await fetch("/api/albums");
      const albumsData = await albumsResponse.json();
      setAlbums(albumsData);

      const artistsResponse = await fetch("/api/artists");
      const artistsData = await artistsResponse.json();
      setArtists(artistsData);
    };

    fetchAlbumsAndArtists();
  }, []);

  const handleCreateAlbum = async () => {
    try {
      let artistId = newAlbum.artistId; //local variable for artistId
  
      if (isAddingNewArtist) {
        console.log("Creating new artist:", newArtist);
  
        // Check if the new artist already exists
        const artistExists = artists.some(
          (artist) => artist.name.toLowerCase() === newArtist.toLowerCase()
        );
  
        if (artistExists) {
          setErrorMessage("Artist already exists.");
          return;
        }
  
        // Create the new artist
        const artistResponse = await fetch("/api/artists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newArtist }),
        });
  
        if (!artistResponse.ok) {
          const errorData = await artistResponse.json();
          console.error("Failed to create artist:", errorData.error);
          setErrorMessage(errorData.error || "Failed to create artist");
          return;
        }
  
        const createdArtist = await artistResponse.json();
        console.log("Created artist:", createdArtist);
  
        // Update the artist list and set the artistId
        setArtists((prev) => [...prev, createdArtist]); // Add the new artist to the list
        artistId = createdArtist.id; // Use the new artist's ID directly
      }
  
      console.log("Creating album with data:", { ...newAlbum, artistId }); // Log the album data
  
      // Create the new album
      const albumResponse = await fetch("/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newAlbum, artistId }), // Use the updated artistId
      });
  
      if (albumResponse.ok) {
        const createdAlbum = await albumResponse.json();
        console.log("Created album:", createdAlbum);
  
        setAlbums((prev) => [...prev, createdAlbum]); // Add the new album to the list
        setIsModalOpen(false); // Close the modal
        setNewAlbum({ title: "", artistId: "", review: "", image: "" }); // Reset the form
        setNewArtist(""); // Reset the new artist field
        setIsAddingNewArtist(false); // Reset the "new artist" toggle
        setErrorMessage(""); // Clear any error messages
      } else {
        console.error("Failed to create album");
      }
    } catch (error) {
      console.error("Error in handleCreateAlbum:", error);
    }
  };

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
        Add another {" "}
        <span
          onClick={() => setIsModalOpen(true)}
          style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
        >
          album
        </span>!
      </div>
      <div>
        Check out our <Link href="/artists">artists</Link>!
      </div>
      <div>
        Go <Link href="/">back</Link>!
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <h2>Create a New Album</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateAlbum();
            }}
          >
            <div>
              <label>
                Title:
                <input
                  type="text"
                  value={newAlbum.title}
                  onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Review:
                <textarea
                  value={newAlbum.review}
                  onChange={(e) => setNewAlbum({ ...newAlbum, review: e.target.value })}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Image URL:
                <input
                  type="text"
                  value={newAlbum.image}
                  onChange={(e) => setNewAlbum({ ...newAlbum, image: e.target.value })}
                  placeholder="Enter image URL"
                />
              </label>
            </div>
            <div>
              <label>
                Artist:
                {!isAddingNewArtist ? (
                  <select
                    value={newAlbum.artistId}
                    onChange={(e) => {
                      if (e.target.value === "new") {
                        setIsAddingNewArtist(true);
                        setNewAlbum((prev) => ({ ...prev, artistId: "" }));
                      } else {
                        setNewAlbum((prev) => ({ ...prev, artistId: e.target.value }));
                      }
                    }}
                    required
                  >
                    <option value="">Select an artist</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.id}>
                        {artist.name}
                      </option>
                    ))}
                    <option value="new">New artist...</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={newArtist}
                    onChange={(e) => setNewArtist(e.target.value)}
                    placeholder="Enter new artist name"
                    required
                  />
                )}
              </label>
              {isAddingNewArtist && (
                <button type="button" onClick={() => setIsAddingNewArtist(false)}>
                  Cancel
                </button>
              )}
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit">Create</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

export default Albums;
