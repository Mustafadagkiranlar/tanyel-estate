import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 px-4 border-t-8 border-tanyel-golden">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={200}
              height={200}
              layout="responsive"
            />
          </Link>
        </div>
        <div className="hidden md:block md:flex-none">
          <ul className="menu menu-horizontal text-lg">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="https://www.tanyelhomes.com/">Construction</Link>
            </li>
            <li>
              <Link href="https://www.tanyelrentals.com/">Rentals</Link>
            </li>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/" className="flex items-center space-x-1">
                <Image
                  src="/images/en.png"
                  alt="english flag"
                  width={24}
                  height={24}
                />
                <p>EN</p>
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center space-x-1">
                <Image
                  src="/images/tr.png"
                  alt="turk bayragi"
                  width={24}
                  height={24}
                />
                <p>TR</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            style={{zIndex:9999}}
          >
             <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="https://www.tanyelhomes.com/">Construction</Link>
            </li>
            <li>
              <Link href="https://www.tanyelrentals.com/">Rentals</Link>
            </li>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/" className="flex items-center space-x-1">
                <Image
                  src="/images/en.png"
                  alt="english flag"
                  width={24}
                  height={24}
                />
                <p>EN</p>
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center space-x-1">
                <Image
                  src="/images/tr.png"
                  alt="turk bayragi"
                  width={24}
                  height={24}
                />
                <p>TR</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
