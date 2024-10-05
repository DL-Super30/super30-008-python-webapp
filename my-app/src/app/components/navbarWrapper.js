// components/NavbarWrapper.js
"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
export default function NavbarWrapper() {
  const pathname = usePathname();
  // Hide Navbar on the home page
  if (pathname === "/" || pathname==="/login" ) return null;
  return <Navbar />;
}