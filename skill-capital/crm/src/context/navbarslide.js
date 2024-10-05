
"use client";

import React from "react";
import Image from "next/image";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function NavbarSlide() {
  const pathname = usePathname();

  const getLinkClass = (path) => path === pathname ? 'active' : '';

  const navLinks = [
    { label: 'Home', href: '/Dashboard' },
    { label: 'Leads', href: '/Leads' },
    { label: 'Opportunities', href: '/Opportunities' },
    { label: 'Learners', href: '/Learner' },
    { label: 'Courses', href: '/Courses' },
  ];

  return (
    <header>
      <div className="w-full h-[80px] bg-gray-100 flex justify-around py-[70px] items-center shadow-md">
        <div className="w-[300px] flex items-center justify-between gap-3">
          <AppsIcon style={{ fontSize: 26, color: 'blue' }} />
          <div className="flex w-[200px] h-[50px] items-center">
            <Image src="/Image/2.webp" alt="Logo" width={150} height={8} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="w-[800px] h-fit flex justify-end gap-2 text-sm">
            {navLinks.map((link) => (
              <div key={link.href} className={`flex p-1 items-center justify-center text-sm ${getLinkClass(link.href)}`}>
                <Link href={link.href}>{link.label}</Link>
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
          <div className="w-fit flex items-center justify-evenly gap-3 text-slate-500">
            <Link href="#"><FontAwesomeIcon icon={faStar} size="1x" aria-label="Favorites" /></Link>
            <Link href="#"><FontAwesomeIcon icon={faBell} size="1x" aria-label="Notifications" /></Link>
            <Link href="#"><FontAwesomeIcon icon={faUser} size="1x" aria-label="User" /></Link>
            <Link href="https://crm.rajeshcrm.xyz/"><LogoutIcon /></Link>
          </div>
        </div>
      </div>
    </header>
  );
};



