import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  /*TODOS:
        Links need to be update
        Logo needs to be update
    */
  return (
    <div className="flex items-center justify-between mx-4 my-5">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={200}
          layout="responsive"
        />
      </Link>
      <div className="text-lg mr-9 space-x-10 flex items-center">
        <Link href="/">Home</Link>
        <Link href="/">Construction</Link>
        <Link href="/">Rentals</Link>
        <Link href="/">About Us</Link>
        <Link href="/" className="flex items-center space-x-1">
          <Image
            src="/images/en.png"
            alt="english flag"
            width={24}
            height={24}
          />
          <p>EN</p>
        </Link>
        <Link href="/" className="flex items-center space-x-1">
          <Image
            src="/images/tr.png"
            alt="turk bayragi"
            width={24}
            height={24}
          />
          <p>TR</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
