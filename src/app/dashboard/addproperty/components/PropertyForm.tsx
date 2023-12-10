"use client";
import React, { useCallback, useEffect, useState } from "react";
import DescriptionTab from "./DescriptionTab";
import AmenitiesTab from "./AmenitiesTab";
import { useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const DynamicMapComponent = dynamic(() => import("./LocationTab"), {
  ssr: false,
});


const PropertyForm = ({
  propertyType,
  listingType,
}: {
  propertyType: PropertyType[];
  listingType: ListingType[];
}) => {
  const TABS = ["description", "location", "amenities"];
  const [activeTab, setActiveTab] = useState("description");
  const searchParams = useSearchParams();
  const [property, setProperty] = useState<Property>({
    title: "",
    description: "",
    price: 0,
    photos: [],
    location: "",
    propertyType: "",
    bedroomNumber: 0,
    bathroomNumber: 0,
    area: "",
    amenities: [],
    listingType: "",
    lat: 0.0,
    long: 0.0,
  });
  const getParams = useCallback(() => {
    const edit = searchParams.get("edit");
    if (edit === "true") {
      const title = searchParams.get("title");
      const description = searchParams.get("description");
      const price = searchParams.get("price");
      // photos=aaa,bbb,ccc & amenities=a,b,c
      const photos = searchParams.get("photos")
        ? searchParams.get("photos")!.split(",")
        : [];
      const location = searchParams.get("location");
      const propertyTypeParam = searchParams.get("propertyType");
      const bedroomNumber = searchParams.get("bedroomNumber");
      const bathroomNumber = searchParams.get("bathroomNumber");
      const area = searchParams.get("area");
      const amenities = searchParams.get("amenities")
        ? searchParams.get("amenities")!.split(",")
        : [];
      const listingTypeParam = searchParams.get("listingType");
      const lat = searchParams.get("lat");
      const long = searchParams.get("long");
      setProperty({
        title: title ? title : "",
        description: description ? description : "",
        price: price ? parseInt(price) : 0,
        photos: photos,
        location: location ? location : "",
        propertyType: propertyTypeParam ? propertyTypeParam : "",
        bedroomNumber: bedroomNumber ? parseInt(bedroomNumber) : 0,
        bathroomNumber: bathroomNumber ? parseInt(bathroomNumber) : 0,
        area: area ? area : "",
        amenities: amenities,
        listingType: listingTypeParam ? listingTypeParam : "",
        lat: lat ? parseFloat(lat) : 0.0,
        long: long ? parseFloat(long) : 0.0,
      });
    }
  }, [searchParams]);


  const getButtonClass = (activeTab: string, tab: string) => {
    return `py-4 px-1 text-sm font-medium rounded-t-lg border-b-2 ${
      activeTab === tab
        ? "text-indigo-600 border-indigo-500"
        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
    }`;
  };

  const handleInputChange = (e: InputChangeEvent) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getParams();
  }, [getParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full md:p-8">
      <ToastContainer />
      <div className="w-full max-w-4xl space-y-8">
        <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
          {searchParams.get("edit") === "true"
            ? "Edit Property"
            : "Add Property"}
        </h2>
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto space-x-1 sm:space-x-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={getButtonClass(activeTab, tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <form className="mt-8 space-y-6">
            {activeTab === "description" && (
              <DescriptionTab
                handleInputChange={handleInputChange}
                property={property}
                setProperty={setProperty}
                propertyTypes={propertyType}
                lisingTypes={listingType}
              />
            )}

            {activeTab === "location" && (
              <DynamicMapComponent
                handleInputChange={handleInputChange}
                property={property}
                setProperty={setProperty}
              />
            )}

            {activeTab === "amenities" && (
              <AmenitiesTab
                handleInputChange={handleInputChange}
                property={property}
                setProperty={setProperty}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
