import Link from "next/link";
import React from "react";
import VerticalLine from "./VerticalLine";



function SubNavbar() {
  return (
    <div className="flex justify-center gap-5 md:gap-16 items-center border-y-0.5 border-black py-4 mx-4">
      <Link href="/overview">
        <p className="font-medium text-lg">Overview</p>
      </Link>
      <VerticalLine />
      <Link href="/map">
        <p className="font-medium text-lg">Map</p>
      </Link>
      <VerticalLine />
      <Link href="/gallery">
        <p className="font-medium text-lg">Gallery</p>
      </Link>
      <VerticalLine />
      <Link href="/share">
        <p className="font-medium text-lg">Share</p>
      </Link>
    </div>
  );
}

export default SubNavbar;
