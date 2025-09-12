import { useState, useEffect } from 'react';
import './index.css';
import LocationForm from './components/LocationForm';
import PlaceList from './components/PlaceList';
import TypeForm from './components/TypeForm';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {
  const [businesstype, setType] = useState("restaurant");
  const [places, setPlaces] = useState([]);
  const [status, setStatus] = useState("idle");
  const { isLoaded, loadError } = useJsApiLoader({
  googleMapsApiKey: ACCESS_KEY,
  libraries: ['places']
  });

  if (!isLoaded) return <div>Loading our maps...</div>;

  return (
    <div>
      <h1>place Finder</h1>
      <TypeForm businesstype={businesstype} setType={setType} />
      <LocationForm businesstype = {businesstype} setPlaces={setPlaces} setStatus={setStatus} />
      <PlaceList places={places} status={status} />
    </div>
  );
};

export default App;