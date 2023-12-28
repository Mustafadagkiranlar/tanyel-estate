"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

function AmenitiesTab({
  handleInputChange,
  property,
  setProperty,
}: {
  handleInputChange: any;
  property: Property;
  setProperty: any;
}) {
  const [amenity, setAmenity] = useState("");
  const searchParams = useSearchParams();
  const addAmenity = (e: any) => {
    e.preventDefault();
    if (amenity) {
      setProperty({ ...property, amenities: [...property.amenities, amenity] });
      setAmenity("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = Cookies.get("jwt");
    if (searchParams.get("edit") === null) {

      // check if all the fields are filled for property
      if (
        !property.title ||
        !property.description ||
        !property.price ||
        !property.photos ||
        !property.location ||
        !property.propertyType ||
        !property.area ||
        !property.listingType ||
        !property.lat ||
        !property.long
      ) {
        toast.error("Please fill all the fields");
        return;
      }

      try {
        const response = await fetch("/api/property", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(property),
        });

        if (response.ok) {
          toast.success("Property added successfully");
        } else {
          toast.error("Failed to add property refresh page and try again");
          // console.log("Failed to add property");
          // console.log(property);
        }
      } catch (error) {
        toast.error("Un expected error refresh page and try again");
        // console.error("Error:", error);
      }
    }

    if (searchParams.get("edit") === "true") {
      try {
        const response = await fetch("/api/property", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({ id: searchParams.get("id"), ...property }),
        });
        if (response.ok) {
          toast.success("Property updated successfully");
          console.log("Property updated successfully");
        } else {
          toast.error("Failed to update property refresh page and try again");
          console.log("Failed to update property");
        }
      } catch (error) {
        toast.error("Un expected error refresh page and try again");
        console.error("Error:", error);
      }
      return;
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="block text-sm font-medium text-gray-700">
        Property Amenities
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label
            htmlFor="Area"
            className="block text-sm font-medium text-gray-700"
          >
            Area in meter square
          </label>
          <input
            type="number"
            name="area"
            placeholder="2000"
            onChange={handleInputChange}
            value={property.area}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div>
          <label
            htmlFor="Bathrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Number of bathrooms
          </label>
          <input
            type="number"
            name="bathroomNumber"
            placeholder="3"
            onChange={handleInputChange}
            value={property.bathroomNumber}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div>
          <label
            htmlFor="Bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Number of bedrooms
          </label>
          <input
            type="number"
            name="bedroomNumber"
            placeholder="2"
            onChange={handleInputChange}
            value={property.bedroomNumber}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>

      <p className="block text-sm font-medium text-gray-700 mt-6">
        Add amenities
      </p>
      <div className="flex flex-grow gap-2">
        <input
          type="text"
          name="amenity"
          placeholder="Bank"
          value={amenity}
          onChange={(e) => setAmenity(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          onClick={addAmenity}
          className="btn btn-primary w-full max-w-[100px]"
        >
          Add amenity
        </button>
      </div>

      <p className="block text-sm font-medium text-gray-700 mt-6">
        Current amenities
      </p>

      <div className="grid grid-cols-3 space-x-3">
        <p>Bedroom number: {property.bedroomNumber}</p>
        <p>Bathroom number: {property.bathroomNumber}</p>
        {property.amenities.map((amenity) => (
          <p key={amenity}>{amenity}</p>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="btn btn-primary w-full max-w-xs"
      >
        {searchParams.get("edit") === "true"
          ? "Update Property"
          : "Add Property"}
      </button>
    </div>
  );
}

export default AmenitiesTab;
