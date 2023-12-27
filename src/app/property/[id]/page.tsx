import React from "react";
import SubNavbar from "@/app/components/property/SubNavbar";
import MainContent from "@/app/components/property/MainContent";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const getProperty = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/property/find`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }
  );
  if (res.status === 200) {
    const property = await res.json();
    return property;
  }
  return null;
};

async function page({ params }: { params: { id: number } }) {
  const property = await getProperty(params.id);

  if (!property) {
    return <h1>Property Not Found! Go back to main page.</h1>;
  }

  return (
    <>
      <Navbar />
      <SubNavbar />
      <MainContent property={property} />
      <Footer />
    </>
  );
}

export default page;
