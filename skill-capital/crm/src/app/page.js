'use client';
import React, { useState } from "react";
import Image from "next/image";
import StartForm from "./Forms/startForm";
// import Link from "next/link";
export default function Home() {

  const [isformvisible , setFormVisible]= useState(false);

  const openForm=()=>{
    setFormVisible(true);

  };

  const closeForm = () => {
    setFormVisible(false);
  };


  return (
    <>
      <div className="  flex items-center justify-around w-full h-[80px] flex bg-gray-500">
        <Image src="/Image/2.webp" alt="Company logo" width={150} height={150} />
        <div className="flex itmems-center justify-between gap-6">
          
          <button 
          className="w-[100px] h-[30px] border-1 ring-1 ring-inset ring-white rounded-md transition duration-600 hover:bg-rose-500 hover:-translate-x-1 hover:scale-90   ">
            <a href="/loginpage">Login</a>
          </button>
          

          <button
          onClick={ openForm}
           className="w-[100px] h-[30px] border-1 ring-1 ring-inset ring-white rounded-md hover:bg-rose-500 transition duration-600 hover:bg-rose-500 hover:-translate-x-1 hover:scale-90 ">
            Sign Up
          </button>
          {
            isformvisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 m-h-[50px] p-5">
              <StartForm closeForm={closeForm} />
                </div>
            )
          }
        </div>
      </div>


      <div className=" w-full h-[500px] flex flex-col items-center justify-center py-[90px] bg-gradient-to-r from-blue-100 via-green-100 to-purple-100">
        <div className="flex flex-col text-center">
          <h2 className="text-xl capitalize underline">meet us</h2>
          <h2 className="text-7xl tracking-wide font-weight-600 py-9 capitalize hover:text-rose-400">Enhance Your Skill here</h2>
          <p >Skill capital is the platform Learning factors are more skills to weigh Your profile.</p>
        </div>

      </div>

    </>

  );
}
