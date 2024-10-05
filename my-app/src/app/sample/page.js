'use client'

import React from "react";
import { useState } from "react";

export default function Sample(){
    const [count , setCount] = useState(0);

    const increment = () =>{
        setCount(count + 1)
    }

    return (
        <div className="w-1/2 h-96 border mx-auto pt-[100px]">
            <center>
            <h1 className="text-xl">{count}</h1>
            <button className="w-36 bg-blue-500 text-white p-2 rounded mt-5" onClick={increment}>click</button>
            </center>
        </div>
    )
}