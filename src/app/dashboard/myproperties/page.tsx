import React from "react";
import MainHeader from "@/app/components/dashboard/MainHeader";
import Bottombar from "@/app/components/dashboard/Bottombar";
import { serverAPILink } from "@/app/constants/serverURL";
import PropertiesContainer from "@/app/components/dashboard/myproperties/PropertiesContainer";

async function fetchProperties() {
  const response = await fetch(`${serverAPILink}/property`, {
    method: "GET",
  });
  return await response.json();
}

const MyProperties = async () => {
  const properties: Property[] = await fetchProperties();
  return (
    <div className="flex flex-col h-screen mb-40">
      <MainHeader />
      <div className="flex flex-1">
        <Bottombar />
        <PropertiesContainer properties={properties} />
      </div>
    </div>
  );
};

export default MyProperties;
