"use client";
import { usePathname } from "next/navigation";
import NavbarSlide from "./navbarslide"; // Ensure correct component import

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Only hide the navbar on specific paths (like '/')
  if (pathname == '/loginpage' || pathname=='/') 
    return null;

  // Render the navbar on all other paths
  return < NavbarSlide />;
}
