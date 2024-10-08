import React, { useState, useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";

const containerStyle = {
  width: "100%",
  height: "40vh",
};
const center = { lat: 35.1254, lng: 33.9435 };

function LocationTab({
  handleInputChange,
  property,
  setProperty,
}: {
  handleInputChange: any;
  property: Property;
  setProperty: any;
}) {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  function Addmarkertoclick() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setProperty({ ...property, lat, long: lng });
      },
    });
    return <></>;
  }

  function FlyToLocation() {
    const map = useMap();
    useEffect(() => {
      if (coords.lat && coords.lng) {
        map.flyTo([coords.lat, coords.lng], 14);
      }
    }, [map]);
    return null;
  }

  async function handleOnBlur() {
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${property.location}&api_key=658d4486903cb849870995mak5a256a`
      );
      const data = await response.json();
      setCoords({ lat: data[0].lat, lng: data[0].lon });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="block text-sm font-medium text-gray-700">
        Property Location
      </div>
      {property.lat} { property.long}
      <div className="grid grid-cols-1 gap-4">
        <div className="block text-sm font-medium text-gray-700">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Address"
            onChange={handleInputChange}
            value={property.location}
            required
            className="input input-bordered w-full"
            onBlur={handleOnBlur}
          />
        </div>

        <div className="mx-5 mt-4">
          <MapContainer
            center={center}
            zoom={8}
            scrollWheelZoom={true}
            style={containerStyle}
            className="rounded-md"
            attributionControl={false}
          >
            <Addmarkertoclick />
            <FlyToLocation />
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              key={property._id}
              position={{ lat: property.lat, lng: property.long }}
              icon={
                new L.Icon({
                  iconUrl: MarkerIcon.src,
                  shadowUrl: MarkerShadow.src,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>
                {property.title}
                <br />
                {property.location}
                <br />${property.price}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default LocationTab;
