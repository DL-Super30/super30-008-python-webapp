"use client";
import { usePathname } from "next/navigation";
import NavbarProvider from "./navbarProvider";

export default function NavbarWrapper() {
    const pathName = usePathname();
    if (pathName === '/') return ;

    return <NavbarProvider />;
}
