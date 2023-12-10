"use client";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

function DescriptionTab({
  handleInputChange,
  property,
  propertyTypes,
  lisingTypes,
  setProperty,
}: {
  handleInputChange: any;
  property: Property;
  propertyTypes: PropertyType[];
  lisingTypes: ListingType[];
  setProperty: React.Dispatch<React.SetStateAction<Property>>;
}) {
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const handleSuccess = (event: any) => {
    const { event: eventName, info } = event;
    if (eventName === "success") {
      setUploadedImageUrls((prevUrls) => [...prevUrls, info.secure_url]);
      setProperty((prevProperty) => ({
        ...prevProperty,
        photos: [...prevProperty.photos, info.secure_url],
      }));
    }
  };
  return (
    <div className="space-y-6">
      <h2 className="text-lg leading-6 font-medium text-gray-900">
        Property Description
      </h2>
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              onChange={handleInputChange}
              value={property.title}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <div className="sm:col-span-6 my-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mb-5">
            <textarea
              name="description"
              placeholder="Property Description"
              onChange={handleInputChange}
              value={property.description}
              required
              className="textarea w-full textarea-bordered"
              rows={5}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3 mb-5">
            <div className="sm:col-span-1">
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium text-gray-700"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                className="select select-bordered w-full max-w-xs"
                onChange={handleInputChange}
                value={property.propertyType}
              >
                <option value="">Please Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type._id} value={type.propertyType}>
                    {type.propertyType}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="listingType"
                className="block text-sm font-medium text-gray-700"
              >
                Listed In
              </label>
              <select
                id="listingType"
                name="listingType"
                className="select select-bordered w-full max-w-xs"
                onChange={handleInputChange}
                value={property.listingType}
              >
                <option value="">Please Select Listing Type</option>
                {lisingTypes.map((type) => (
                  <option key={type._id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-1 mb-5">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="input input-bordered w-full max-w-xs"
              placeholder="Price"
              onChange={handleInputChange}
              value={property.price}
            />
          </div>

          <div className="sm:col-span-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <CldUploadWidget uploadPreset="phwuqlws" onSuccess={handleSuccess}>
              {({ open }) => {
                return (
                  <button
                    className="btn btn-primary w-full max-w-xs mt-2"
                    onClick={(event: any) => {
                      event.preventDefault();
                      open();
                    }}
                  >
                    Upload Images
                  </button>
                );
              }}
            </CldUploadWidget>

            <div>
              {uploadedImageUrls.map((url, index) => (
                <div key={index}>{url}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionTab;
