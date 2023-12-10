"use client";
import React, { FC } from "react";
import Link from "next/link";

interface LinkProps {
  href: string;
  text: string;
}

interface SidebarContentProps {
  title: string;
  links: LinkProps[];
}

const SidebarContent: FC<SidebarContentProps> = ({ title, links }) => (
  <div className="mb-10">
    <p className="text-xs uppercase text-gray-500 mb-6">{title}</p>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
              <span className="ml-3">{link.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar: FC = () => {
  const mainLinks: LinkProps[] = [{ href: "/dashboard", text: "Dashboard" }];
  const listingLinks: LinkProps[] = [
    { href: "/dashboard/addproperty", text: "Add New Property" },
    { href: "/dashboard/myproperties", text: "My Properties" },
  ];
  const accountLinks: LinkProps[] = [
    { href: "#", text: "Logout" },
  ];

  return (
    <aside
      className="absolute z-20 transform translate-x-0 md:relative md:translate-x-0 w-64"
      aria-label="Sidebar"
    >
      <div className="sidebar overflow-y-auto py-4 px-3 bg-gray-900 dark:bg-gray-800 h-full">
        <SidebarContent title="Main" links={mainLinks} />
        <SidebarContent title="Manage Listings" links={listingLinks} />
        <SidebarContent title="Manage Account" links={accountLinks} />
      </div>
    </aside>
  );
};

export default Sidebar;
