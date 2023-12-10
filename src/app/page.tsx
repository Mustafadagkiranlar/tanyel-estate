"use client";
import Button from "./components/Button";
import ContentContainer from "./components/ContentContainer";
import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PropertyCard from "./components/PropertyCard";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const divStyles = {
  boxShadow: "0px 0px 16px rgba(0,0,0,0.10)", // Change the color and opacity as needed
};

function Skeleton() {
  return (
    <>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>

      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </>
  );
}

const DynamicMapComponent = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
});

export default function Home() {
  const [mapVisibility, setMapVisibility] = useState(true);
  const [filterVisibility, setFilterVisibility] = useState(true);
  const [mapButtonText, setMapButtonText] = useState("HIDE MAP");
  const [filterButtonText, setFilterButtonText] = useState("HIDE FILTER");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleMapVisibility = () => {
    setMapVisibility(!mapVisibility);
    if (mapVisibility) {
      setMapButtonText("SHOW MAP");
    } else {
      setMapButtonText("HIDE MAP");
    }
  };

  const toggleFilterVisibility = () => {
    setFilterVisibility(!filterVisibility);
    if (filterVisibility) {
      setFilterButtonText("SHOW FILTER");
    } else {
      setFilterButtonText("HIDE FILTER");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/property", {
          method: "GET",
        });
        setProperties(await response.json());
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex mx-14 gap-2">
        <Button name={mapButtonText} aFunction={toggleMapVisibility} />
        <Button name={filterButtonText} aFunction={toggleFilterVisibility} />
      </div>
      <DynamicMapComponent mapVisibility={mapVisibility} properties={properties}/>
      <div className="flex mt-6">
        <Filters filterVisibility={filterVisibility} />
        <div className="flex-grow">
          <ContentContainer>
            {loading ? (
              <Skeleton />
            ) : (
              properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  price={property.price}
                  location={property.location}
                  area={property.area}
                  title={property.title}
                  image={property.photos[0]}
                  link={property._id!}
                />
              ))
            )}
          </ContentContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}
