import React from "react";

const PlaceList = ({ places, status }) => {
  if (status === "idle") return null;
  if (status === "loading") return <p>🔄 Searching for places...</p>;
  if (status === "error") return <p>❌ Failed to fetch places.</p>;

  if (places.length === 0) return <p>😕 No places found.</p>;

  return (
    <ul>
      {places.map((place) => (
        <li key={place.place_id}>
          <p>{place.name}</p> – {place.vicinity}
          <img src={place.photos[0].getUrl({ maxWidth: 400 })} alt={place.name}></img> 
        </li>
      ))}
    </ul>
  );
};

export default PlaceList;
