import { useState } from "react";

function LocationForm({ businesstype, setPlaces, setStatus }) {
  const [location, setLocation] = useState("");

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const findPlaces = (latLng) => {
    const map = new window.google.maps.Map(document.createElement("div")); // dummy map
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: latLng,
      radius: 8050,
      type: businesstype
    };

    setStatus("loading");
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
        setStatus("success");
      } else {
        console.error("Places API error:", status);
        setStatus("error");
      }
    });
  };

  const handleUseEnteredLocation = (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK") {
        const coords = results[0].geometry.location;
        findPlaces(coords);
      } else {
        console.error("Geocoding failed:", status);
        setStatus("error");
      }
    });
  };

  const handleUseCurrentLocation = () => {
    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = new window.google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        findPlaces(coords);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setStatus("error");
      }
    );
  };

  return (
    <form onSubmit={handleUseEnteredLocation} style={{ marginBottom: "1rem" }}>
      <label>
        Enter desired location:
        <input
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="e.g. Boston, MA"
          style={{ marginLeft: "0.5rem", width: "250px" }}
        />
      </label>
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Search {businesstype}
      </button>

      <div style={{ marginTop: "1rem" }}>
        <button type="button" onClick={handleUseCurrentLocation}>
          Use Current Location
        </button>
      </div>
    </form>
  );
}

export default LocationForm;
