import { PhoneIcon } from "@heroicons/react/24/outline";
import React from "react";
// import { FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="bg-footer-gray-light text-white flex py-9 justify-center gap-28 mt-24">
        <div className="w-1/3 text-center">
          <p className="text-2xl">About Us</p>
          <p className="text-base pt-7">
            Tanyel Construction & Estate Ltd. is a family-run construction
            company building quality homes in the Turkish Republic of Northern
            Cyprus since 1995. The company began life with land plotting and
            infrastructure projects in Tuzla in Famagusta.
          </p>
        </div>
        <div >
          <p className="text-2xl ">Famagusta Contact Details</p>
          <p className="py-7">İlker Karter Caddesi, 101A/Gazimağusa</p>
          <div className="flex gap-3 ">
            <PhoneIcon className="h-6"/>
            <p>+90 533 860 22 11</p>
          </div>
          <div className="flex gap-3 pt-7">
            <PhoneIcon className="h-6"/>
            <p>0392 366 1470</p>
          </div>
        </div>
        <div>
          <p className="text-2xl">Karpasia Contact Details</p>
          <p className="py-7">Erenköy / Karpaz</p>
          <div className="flex gap-3">
            <PhoneIcon className="h-6"/>
            <p>+90 533 823 1115</p>
          </div>
          <div className="flex gap-3 pt-7">
            <PhoneIcon className="h-6"/>
            <p>0392 374 5157</p>
          </div>
        </div>
      </div>
      <div className="bg-footer-gray-dark text-white">
        <p className="py-8 px-6">
          © Tanyel Construction 2023 Developed by{" "}
          <span className="font-bold">SpaceGen</span> Software
        </p>
      </div>
    </>
  );
}

export default Footer;
