"use client";
import React, { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import Sidebar from "../components/sidebar";
import PropertyCard from "./components/PropertyCard";

const Skeleton = () => {
  return (
    <main className="grid grid-cols-4 w-full p-3">
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>

      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>

      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>

      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </main>
  );
};

const MyProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/property", {
          method: "GET",
        });
        setProperties(await response.json());
      } catch (err) {
        console.log(err);
      } finally {
        setSkeleton(false);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <div className="flex flex-1">
        <Sidebar />
        {skeleton ? (
          <Skeleton />
        ) : (
          <main className="grid grid-cols-4 w-full p-3">
            {properties.map((property) => (
              <PropertyCard
                key={property._id!}
                id={property._id!}
                price={property.price}
                location={property.location}
                area={property.area}
                title={property.title}
                image={property.photos[0]}
                description={property.description}
                propertyType={property.propertyType}
                bedroomNumber={property.bedroomNumber}
                bathroomNumber={property.bathroomNumber}
                amenities={property.amenities}
                listingType={property.listingType}
                lat={property.lat}
                long={property.long}
                photos={property.photos}
              />
            ))}
          </main>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
