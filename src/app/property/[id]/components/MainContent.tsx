"use client";
import { ShareIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useState } from "react";
import VerticalLine from "./VerticalLine";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import PropertySlider from "./PropertySlider";
import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import("./PropertyMapComponent"), {
  ssr: false,
});

const containerStyle = {
  width: "100%",
  height: "35vh",
};

function MainContent({ property }: { property: Property }) {
  const center = { lat: property.lat, lng: property.long };

  return (
    <div className="m-4">
      <div className="flex justify-center">
        <Image
          src={property.photos[0]}
          width={960}
          height={540}
          alt={"hero image"}
        />
      </div>
      <div className="text-center bg-card-color my-6 mx-14 rounded-xl py-16 px-24">
        <p className="text-5xl font-extralight">
          {property.title.toLocaleUpperCase()}
        </p>
        <div className="text-2xl flex justify-center gap-16 my-14">
          <p>${property.price}</p>
          <VerticalLine />
          <p>{property.area}</p>
          <VerticalLine />
          <p>{property.location}</p>
        </div>
        <p className="text-center">{property.description}</p>

        <div className="flex justify-center mt-14">
          <button className="flex gap-2">
            <ShareIcon className="h-8" /> <p className="text-xl">Share</p>
          </button>
        </div>
      </div>

      <PropertySlider property={property} />

      <DynamicMapComponent property={property}  />

      <div className="mx-14 my-52">
        <p className="text-2xl mb-3">Amenities</p>

        <div className="grid grid-cols-5">
          <div className="flex gap-4 mt-4">
            <Image src={"/images/dot.png"} alt="dot" width={27} height={27} />
            <div className="flex gap-2">
              <p>Bathroom</p>
              <p>{property.bathroomNumber}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Image src={"/images/dot.png"} alt="dot" width={27} height={27} />
            <div className="flex gap-2">
              <p>Bedrooms</p>
              <p>{property.bedroomNumber}</p>
            </div>
          </div>

          {property.amenities.map((amenity) => (
            <div key={amenity} className="flex gap-4 mt-4">
              <Image src={"/images/dot.png"} alt="dot" width={27} height={27} />
              <div className="flex gap-2">
                <p>{amenity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
