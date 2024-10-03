"use client";
import React from "react";
import Image from "next/image";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
//  import GroupsIcon from '@mui/icons-material/Groups';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function NavbarSlide() {
  const pathname = usePathname();
  
  // const getLink = (pathId) => pathname.startsWith(pathId) ? 'active' : ''; // Improved path comparison

  const getLink = (path ) =>{
    return path == pathname
  }

  return (
    <header>
      <div className="w-full h-[80px]  bg-gray-100 flex justify-around   py-[70px] items-center shadow-md ">

        <div className=" w-[300px] flex items-center justify-between gap-3">

        <AppsIcon style={{ fontSize: 26, color: 'blue' }} />

        <div className="flex w-[200px] h-[50px] items-center">
        <img className="w-60 h-8" src="./Image/2.webp" alt="image"></img>
        </div>

        </div>



<div className=" flex items-center justify-between gap-3">

        <div className="w-[800px] h-fit flex justify-end gap-2 text-sm">

          {/* Links with active class check */}
          <div className={`flex p-1 items-center justify-center text-sm ${getLink('/Dashboard')}`}>
            <Link href="/Dashboard">Home</Link>
          </div>

          <div className={`flex p-1 items-center justify-center text-sm ${getLink('/Leads')}`}>
            <Link href="/Leads">Leads</Link>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>

          <div className={`flex p-1 items-center justify-center text-sm ${getLink('/Opportunities')}`}>
            <Link href="/Opportunities">Opportunities</Link>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>

          <div className={`flex p-1 items-center justify-center text-sm ${getLink('/Learner')}`}>
            <Link href="/Learner">Learners</Link>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>

          <div className={`flex p-1 items-center justify-center text-sm ${getLink('/Courses')}`}>
            <Link href="/Courses">Courses</Link>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>

          <div className={`flex p-1 items-center justify-center text-sm ${getLink('/Activities')}`}>
            <Link href="/Activities">Activities</Link>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>

          <div className={`flex p-1 items-center justify-center text-sm ${getLink('/Analytics')}`}>
            <Link href="/Analytics">Analytics</Link>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>

        </div>

         <div className=" w-fit flex items-center justify-evenly gap-3 text-slate-500">
            <Link href="#"><FontAwesomeIcon icon={faStar} size="1x" aria-label="Favorites" /></Link>
            <Link href="#"><FontAwesomeIcon icon={faBell} size="1x" aria-label="Notifications" /></Link>
            <Link href="#"><FontAwesomeIcon icon={faUser} size="1x" aria-label="User" /></Link>
            <Link href="http://localhost:3000">< LogoutIcon/></Link>
        </div>

        </div>
      </div>
    </header>
  );
}
