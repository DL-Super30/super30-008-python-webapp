"use client";
import React from "react";
import Image from "next/image";
import GroupsIcon from '@mui/icons-material/Groups';


function Dashboard() {

  return (
    <header>

      <section>
        <div className="flex items-center gap-2 w-full h-[100px] bg-light-100 rounded-sm justify-evenly py-5">

          <div className=" flex w-fit h-fit border-2  text-sm shadow-xl items-center p-2 rounded">

            <div className=" flex w-[40px] h-[40px] bg-gray-200  items-center justify-center rounded-full">
              <GroupsIcon style={{ fontSize: 25, color: 'blue' }} />
            </div>

            <div className="grid px-5">
              <h4 className="text-sm text-slate-600">Not Contacted</h4>
              <p className="px-3 text-lg text-orange-300">5</p>
            </div>

          </div>

          <div className=" flex w-fit h-fit border-2  text-sm shadow-lg items-center  p-2 rounded">

            <div className=" flex w-[40px] h-[40px] bg-gray-200  items-center justify-center rounded-full">
              <GroupsIcon style={{ fontSize: 26, color: 'blue' }} />
            </div>

            <div className="grid px-5">
              <h4 className="text-sm text-slate-600">Not Contacted</h4>
              <p className="px-3 text-lg text-orange-300">11</p>
            </div>

          </div>

          <div className=" flex w-fit h-fit border-2  text-sm shadow-lg items-center  p-2 rounded">

            <div className=" flex w-[40px] h-[40px] bg-gray-200  items-center justify-center rounded-full">
              <GroupsIcon style={{ fontSize: 26, color: 'blue' }} />
            </div>

            <div className="grid px-5">
              <h4 className="text-sm text-slate-600">Not Contacted</h4>
              <p className="px-3 text-lg text-orange-300">16</p>
            </div>

          </div>

          <div className=" flex w-fit h-fit border-2  text-sm shadow-lg items-center  p-2 rounded">

            <div className=" flex w-[40px] h-[40px] bg-gray-200  items-center justify-center rounded-full">
              <GroupsIcon style={{ fontSize: 26, color: 'blue' }} />
            </div>

            <div className="grid px-5">
              <h4 className="text-sm text-slate-600">Not Contacted</h4>
              <p className="px-3 text-lg text-orange-300">14</p>
            </div>

          </div>

          <div className=" flex w-fit h-fit border-2  text-sm shadow-lg items-center  p-2 rounded">

            <div className=" flex w-[40px] h-[40px] bg-gray-200  items-center justify-center rounded-full">
              <GroupsIcon style={{ fontSize: 26, color: 'blue' }} />
            </div>

            <div className="grid px-5">
              <h4 className="text-sm text-slate-600">Not Contacted</h4>
              <p className="px-3 text-lg text-orange-300">58</p>
            </div>

          </div>

          <div className=" flex w-fit h-fit border-2  text-sm shadow-lg shadow-slate-200 items-center p-2 rounded">

            <div className=" flex w-[40px] h-[40px] bg-gray-200  items-center justify-center rounded-full">
              <GroupsIcon style={{ fontSize: 26, color: 'blue' }} />
            </div>

            <div className="grid px-5">
              <h4 className="text-sm text-slate-600">Not Contacted</h4>
              <p className="px-3 text-lg text-orange-300">55</p>
            </div>

          </div>

        </div>
      </section>


    </header>

  )

};
export default Dashboard;


