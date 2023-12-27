"use client";
import "react-toastify/dist/ReactToastify.css";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const divStyles = {
  boxShadow: "0px 0px 16px rgba(0,0,0,0.10)", // Change the color and opacity as needed
};

function createLink({ property }: { property: Property }) {
  const photosParam = property.photos.join(",");
  const amenitiesParam = property.amenities.join(",");

  return `${process.env
    .NEXT_PUBLIC_BASE_URL!}/dashboard/addproperty?edit=true&id=${
    property._id
  }&title=${property.title}&description=${property.description}&price=${
    property.price
  }&location=${property.location}&propertyType=${
    property.propertyType
  }&bedroomNumber=${property.bedroomNumber}&bathroomNumber=${
    property.bathroomNumber
  }&area=${property.area}&listingType=${property.listingType}&lat=${
    property.lat
  }&long=${property.long}&photos=${photosParam}&amenities=${amenitiesParam}`;
}

function DeleteModal({ property }: { property: Property }) {
  function handleDelete() {
    try {
      const token = Cookies.get("jwt");
      const res = fetch("/api/property", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: property._id }),
      });
      res.then((res) => {
        if (res.ok) {
          window.location.reload();
          toast.success("Property deleted successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log("Property deleted successfully");
        } else {
          toast.error("Failed to delete property refresh page and try again", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log("Failed to delete property");
        }
      });
    } catch (error) {
      toast.error("Un expected error refresh page and try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  }
  return (
    <dialog id={property._id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete {property.title} </h3>
        <button onClick={handleDelete} type="submit" className="btn">
          Delete
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

function PropertiesContainer({ properties }: { properties: Property[] }) {
  return (
    <main className="flex flex-col justify-center items-center gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:place-items-center w-full p-3 mb-44">
      {properties.map((property) => (
        <div
          className="rounded-custom bg-card-color flex flex-col border-border-color border-0.5 w-full mb-3"
          style={divStyles}
          key={property._id}
        >
          <ToastContainer />
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
                <ArrowTopRightOnSquareIcon className="h-4" /> {property.area}
              </p>
            </div>
          </Link>
          <div className="px-7">
            <p className="text-sm ">ID: {property._id}</p>
            <div className="flex justify-between py-2">
              <button
                className=""
                onClick={() => {
                  let modal = document.getElementById(
                    `${property._id}`
                  ) as HTMLDialogElement;
                  if (modal) {
                    modal.showModal();
                  }
                }}
              >
                <TrashIcon className="h-5 hover:text-red-700 transition-colors" />
              </button>
              <Link
                href={createLink({
                  property,
                })}
              >
                <PencilIcon className="h-5 hover:text-green-700 transition-colors" />
              </Link>
            </div>
          </div>
          <DeleteModal property={property} />
        </div>
      ))}
    </main>
  );
}

export default PropertiesContainer;
