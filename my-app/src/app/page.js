'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAsia, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import Signup from './signup/page';
import { useState } from 'react';


export default function LandingPage() {

  const [showSignUp , setShowSignUp] = useState(false);

  return (
    <div>
      <div>
        <nav className="w-full h-[70px] border-2 border-solid border-grey bg-[#F8F8F8] flex items-center ">
          <img src="https://www.skillcapital.ai/images/logo.png" className=" ml-[70px] w-[250px]	"></img>
          <div className="ml-[800px]  flex gap-[5px]	" >
            <Link href={'/login'}><button className="w-[120px] h-[40px] border-2 border-solid border-grey text-grey bg-[#F8F8F8] rounded-lg  ">Login</button></Link>
            <button className="w-[120px] h-[40px] border-2 border-solid border-red-500 text-white bg-red-500  rounded-lg " onClick={() => setShowSignUp(true)}>signup</button>
          </div>

        </nav>
        <div className="text-center">
          <h3 className="text-2xl mt-[85px] font-bold">India&apos #1 Training Institute</h3>
          <h1 className="text-8xl font-bold mt-[25px]">Get Skilled to Reach<br></br>
            <span className="text-green-500">Your</span> Goal</h1>
          <p className="text-xl mt-[20px]  font-light"> Skill Capital is a Classroom & Online Learning Platform that helps students<br></br>
            gain the skills they need to reach their goals

          </p>
          <div className="ml-[600px]  flex gap-[10px] mt-[30px]	" >
            <button className="w-[190px] h-[45px] border-2 border-solid border-grey text-white bg-red-500 rounded-lg  " onClick={() => setShowSignUp(true)}><FontAwesomeIcon icon={faUser} /> Talk to skill advisor</button>
            <button className="w-[190px] h-[45px] border-2 border-solid border-red-500 text-red-500 bg-white  rounded-lg  "><FontAwesomeIcon icon={faEarthAsia} />Book your free demo</button>
          </div>
        
        </div>
      </div>
      { showSignUp && (<Signup setShowSignUp={setShowSignUp}/>) }
    </div>
  )
}