"use client";
import React, { useState } from "react";
import Filters from "./Filters";
import dynamic from "next/dynamic";
import PropertyCards from "./PropertyCards";
import Footer from "../Footer";

const DynamicMapComponent = dynamic(() => import("../MapComponent"), {
  ssr: false,
});

function MainComponents({ properties }: { properties: Property[] }) {
  const [propertiesList, setPropertiesList] = useState<Property[]>(properties);
  return (
    <>
      <DynamicMapComponent mapVisibility={true} properties={properties} />
      <div className="lg:flex">
        <Filters properties={properties} propertiesList={propertiesList} setPropertiesList={setPropertiesList}/>
        <PropertyCards properties={propertiesList} />
      </div>
      <Footer />
    </>
  );
}

export default MainComponents;
