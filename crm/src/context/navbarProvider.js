'use client'
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown,faAtom, faBell, faPersonRifle, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const getClassLink = (pathId) =>
    pathId === pathName ? 'bg-[#ab43c8] text-white  px-5 rounded font-semi-bold' : 'text-black';
  return (
    <nav className="bg- blue shadow rounded-md border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between px-4 h-20">
          <div className="flex items-center">
            <img src="/images/2.webp" alt="Skill Capital Logo" className='h-8'/>
          </div>
          {/* Center: Navigation Links */}
         <div className="justify-between hidden md:flex gap-4 xl:gap-8 items-center flex-grow">
          <Link href="/dashboard" className={`text-base font-medium flex items-center text-black  ${getClassLink('/dashboard')}`}>
                    Home
                </Link>
                <Link href="/leads" className={`text-base font-medium flex items-center text-black ${getClassLink('/leads')}`}>
                    Leads
                   
                </Link>
                <Link href="/opportunities" className={`text-base font-medium flex items-center text-black ${getClassLink('/opportunities')}`}>
                    Opportunities
                   
                </Link>
                <Link href="/learners" className={`text-base font-medium flex items-center text-black ${getClassLink('/learners')}`}>
                    Learners
                   
                </Link>
                <Link href="/courses" className={`text-base font-medium flex items-center text-black ${getClassLink('/courses')}`}>
                    Courses
                   
                </Link>
          </div>
          {/* Right: Icons */}
          <div className="flex items-center gap-4">
          <p><FontAwesomeIcon icon={faAtom} className='text-lg' /></p>
          <p><FontAwesomeIcon icon={faBell} className='text-lg' /></p>
          <p><FontAwesomeIcon icon={faUser} className='text-lg' /></p>
          </div>
        </div>
      </div>
    </nav>
  );
}