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

function createLink({
  id,
  title,
  description,
  price,
  photos,
  location,
  propertyType,
  bedroomNumber,
  bathroomNumber,
  area,
  amenities,
  listingType,
  lat,
  long,
}: {
  id: string;
  price: number;
  title: string;
  location: string;
  area: string;
  description: string;
  propertyType: string;
  bedroomNumber: number;
  bathroomNumber: number;
  amenities: string[];
  listingType: string;
  lat: number;
  long: number;
  photos: string[];
}) {
  const photosParam = photos.join(",");
  const amenitiesParam = amenities.join(",");

  return `${process.env
    .NEXT_PUBLIC_BASE_URL!}/dashboard/addproperty?edit=true&id=${id}&title=${title}&description=${description}&price=${price}&location=${location}&propertyType=${propertyType}&bedroomNumber=${bedroomNumber}&bathroomNumber=${bathroomNumber}&area=${area}&listingType=${listingType}&lat=${lat}&long=${long}&photos=${photosParam}&amenities=${amenitiesParam}`;
}

function DeleteModal({ id, name }: { id: string; name: string }) {
  function handleDelete() {
    try {
      const token = Cookies.get("jwt");
      const res = fetch("/api/property", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
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
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete {name} </h3>
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

function PropertyCard({
  id,
  title,
  description,
  price,
  photos,
  location,
  propertyType,
  bedroomNumber,
  bathroomNumber,
  area,
  amenities,
  listingType,
  lat,
  long,
  image,
}: {
  id: string;
  price: number;
  title: string;
  location: string;
  area: string;
  image: string;
  description: string;
  propertyType: string;
  bedroomNumber: number;
  bathroomNumber: number;
  amenities: string[];
  listingType: string;
  lat: number;
  long: number;
  photos: string[];
}) {
  return (
    <div
      className="rounded-custom bg-card-color flex flex-col border-border-color border-0.5 w-card mb-3"
      style={divStyles}
    >
      <ToastContainer />
      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL!}/property/${id}`}>
        <Image
          src={image}
          alt="house"
          width={300}
          height={194}
          className="rounded-t-custom"
        />
        <div className="p-7">
          <p className="text-faded-text text-xl mb-2">{location}</p>
          <p className="text-2xl">{title}</p>
          <p className="text-2xl font-light mb-2">${price}</p>
          <p className="flex items-center gap-2">
            <ArrowTopRightOnSquareIcon className="h-4" /> {area}
          </p>
        </div>
      </Link>
      <div className="px-7">
        <p className="text-sm ">ID: {id}</p>
        <div className="flex justify-between py-2">
          <button
            className=""
            onClick={() => {
              let modal = document.getElementById(`${id}`) as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}
          >
            <TrashIcon className="h-5 hover:text-red-700 transition-colors" />
          </button>
          <Link
            href={createLink({
              id,
              title,
              description,
              price,
              photos,
              location,
              propertyType,
              bedroomNumber,
              bathroomNumber,
              area,
              amenities,
              listingType,
              lat,
              long,
            })}
          >
            <PencilIcon className="h-5 hover:text-green-700 transition-colors" />
          </Link>
        </div>
      </div>
      <DeleteModal id={id} name={title} />
    </div>
  );
}

export default PropertyCard;
