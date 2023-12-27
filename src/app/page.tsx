import React from "react";
import Navbar from "./components/Navbar";
import { serverAPILink } from "./constants/serverURL";
import MainComponents from "./components/home/MainComponents";

async function getProperties() {
  const res = await fetch(`${serverAPILink}/property`, {
    method: "GET",
  });
  const data: Property[] = await res.json();
  return data;
}

async function page() {
  const properties = await getProperties();

  return (
    <>
      <Navbar />
      <MainComponents properties={properties} />
    </>
  );
}

export default page;
