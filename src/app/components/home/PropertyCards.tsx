import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const divStyles = {
  boxShadow: "0px 0px 16px rgba(0,0,0,0.10)", // Change the color and opacity as needed
};

function PropertyCards({ properties }: { properties: Property[] }) {
  return (
    <div className="flex-grow mt-6">
      <div className="mx-14 grid lg:grid-cols-3 gap-6 justify-center">
        {properties.map((property) => (
          <div
            className="rounded-custom bg-card-color border-border-color border-0.5 w-full md:my-0"
            style={divStyles}
            key={property._id}
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL!}/property/${
                property._id
              }`}
            >
              <Image
                src={property.photos[0]}
                alt="house"
                width={291}
                height={194}
                layout="responsive"
                className="rounded-t-custom"
              />
              <div className="p-7">
                <p className="text-faded-text text-xl mb-2">
                  {property.location}
                </p>
                <p className="text-2xl">{property.title}</p>
                <p className="text-2xl font-light mb-2">${property.price}</p>
                <p className="flex items-center gap-2">
                  <ArrowTopRightOnSquareIcon className="h-4" /> {property.area}{" "}
                  Meter<sup>2</sup>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyCards;
