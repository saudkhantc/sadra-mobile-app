"use client";
import Link from "next/link";
import { UserContainer } from "./user-cotainer";

type navTypes = {
  href: string;
  label: string;
};

const navLinks: navTypes[] = [
  { href: "/protected", label: "protected" },
  { href: "/clients", label: "clients" },
  { href: "/about", label: "about" },
];

export const Navbar = () => {
  return (
    <div className="bg-orange-600 shadow-md flex items-center justify-between px-14 py-2">
      <Link href="/" className="text-white font-semibold text-xl">
        Logo
      </Link>
      <nav className="flex flex-1 items-center justify-center gap-6">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-white hover:bg-white hover:text-black px-2 py-1 rounded-sm"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <UserContainer/>
    </div>
  );
};
