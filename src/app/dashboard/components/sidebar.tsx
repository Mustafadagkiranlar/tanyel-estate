"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BuildingStorefrontIcon,
  HomeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

function Icons({ icon, link, isActive }: {
  icon: React.ReactNode;
  link: string;
  isActive: boolean;
}) {
  return (
    <Link href={link} className={isActive ? "active" : ""}>
      {icon}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname()
  const links = [
    { path: "/dashboard", icon: <HomeIcon className="h-5 w-5" /> },
    { path: "/dashboard/addproperty", icon: <PlusCircleIcon className="h-5 w-5" /> },
    { path: "/dashboard/myproperties", icon: <BuildingStorefrontIcon className="h-5 w-5" /> },
  ];

  return (
    <nav className="btm-nav btm-nav-md">
      {links.map(({ path, icon }) => (
        <Icons key={path} icon={icon} link={path} isActive={pathname === path} />
      ))}
    </nav>
  );
}
