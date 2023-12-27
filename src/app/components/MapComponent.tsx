"use client";
import React from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "40vh",
};
const center = { lat: 35.1254, lng: 33.9435 };

export default function MapComponent({
  mapVisibility,
  properties,
}: {
  mapVisibility: boolean;
  properties: Property[];
}) {
  return (
    <>
      {mapVisibility ? (
        <div className="mx-5 mt-4">
          <MapContainer
            center={center}
            zoom={8}
            scrollWheelZoom={true}
            style={containerStyle}
            className="rounded-md"
            attributionControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map((property) => (
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
                  <br />{property.area} m<sup>2</sup>
                  <br />${property.price}
                  <br /> <Link className="font-medium text-lg" href={`/property/${property._id}`}>View</Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : null}
    </>
  );
}
