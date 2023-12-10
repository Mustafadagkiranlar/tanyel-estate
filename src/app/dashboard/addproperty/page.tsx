import React from "react";
import MainHeader from "../components/MainHeader";
import Sidebar from "../components/sidebar";
import PropertyForm from "./components/PropertyForm";

const AddProperty = async () => {
  let propertyType: PropertyType[] = [];
  let listingType: ListingType[] = [];

  const fetchPropertyTypes = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/propertytype`
    );
    const data = await response.json();
    return data;
  };

  const fetchListingTypes = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listingtype`
    );
    const data = await response.json();
    return data;
  };

  propertyType = await fetchPropertyTypes();
  listingType = await fetchListingTypes();

  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex overflow-y-hidden justify-center items-center w-full">
          <PropertyForm propertyType={propertyType} listingType={listingType} />
        </main>
      </div>
    </div>
  );
};

export default AddProperty;
