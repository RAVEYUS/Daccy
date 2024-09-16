"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import PlaceholdersAndVanishInputDemo from "../placehoderacer/placeholderacertinity";
const FloatingNavDemo =()=> {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
}
const DummyContent = () => {
  return (
    <PlaceholdersAndVanishInputDemo/>
  );
};
export default FloatingNavDemo;