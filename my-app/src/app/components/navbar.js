'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBell, 
  faCalendarDays, 
  faUserCircle, 
  faWandMagicSparkles, 
  faBars, 
  faXmark 
} from '@fortawesome/free-solid-svg-icons'

const navItems = [
  { name: 'HOME', href: '/dashboard' },
  { name: 'Leads', href: '/leads' },
  { name: 'Opportunities', href: '/opportunities' },
  { name: 'Learners', href: '/learners' },
  { name: 'Courses', href: '/courses' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=1920&q=75" 
              alt="Skill Capital Logo"
              className="h-12 w-auto"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faCalendarDays} className="text-xl" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="text-xl" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faBell} className="text-xl" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3 space-y-1">
            <button className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-3 text-xl" />
              Calendar
            </button>
            <button className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-3 text-xl" />
              Magic Wand
            </button>
            <button className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full">
              <FontAwesomeIcon icon={faBell} className="mr-3 text-xl" />
              Notifications
            </button>
            <button className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full">
              <FontAwesomeIcon icon={faUserCircle} className="mr-3 text-xl" />
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}