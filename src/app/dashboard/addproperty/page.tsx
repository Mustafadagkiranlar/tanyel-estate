import React from "react";
import MainHeader from "@/app/components/dashboard/MainHeader";
import Bottombar from "@/app/components/dashboard/Bottombar";
import PropertyForm from "@/app/components/dashboard/addproperty/PropertyForm";

const AddProperty = async () => {
  let propertyType: PropertyType[] = [];
  let listingType: ListingType[] = [];

  const fetchPropertyTypes = async () => {
    //implement try catch
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/propertytype`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchListingTypes = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/listingtype`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  propertyType = await fetchPropertyTypes();
  listingType = await fetchListingTypes();

  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <div className="flex flex-1">
        <Bottombar />
        <PropertyForm propertyType={propertyType} listingType={listingType} />
      </div>
    </div>
  );
};

export default AddProperty;
