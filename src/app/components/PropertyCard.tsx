import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const divStyles = {
  boxShadow: "0px 0px 16px rgba(0,0,0,0.10)", // Change the color and opacity as needed
};

function PropertyCard({
  price,
  title,
  location,
  area,
  image,
  link,
}: {
  price: number;
  title: string;
  location: string;
  area: string;
  image: string;
  link: string;
}) {
  return (
    <div
      className="rounded-custom bg-card-color flex flex-col md:pb-16 border-border-color border-0.5 w-card my-4 md:my-0"
      style={divStyles}
    >
      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL!}/property/${link}`}>
      <Image
        src={image}
        alt="house"
        width={291}
        height={194}
        className="rounded-t-custom"
      />
      <div className="p-7">
        <p className="text-faded-text text-xl mb-2">{location}</p>
        <p className="text-2xl">{title}</p>
        <p className="text-2xl font-light mb-2">${price}</p>
        <p className="flex items-center gap-2">
          <ArrowTopRightOnSquareIcon className="h-4"/> {area} Meter<span className="text-xs">2</span>
        </p>
      </div>
      </Link>
    </div>
    
  );
}

export default PropertyCard;
