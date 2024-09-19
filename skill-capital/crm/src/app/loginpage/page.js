"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function LoginForm() {
  // State management for username, password, and input validation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameWarning, setUsernameWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [usernameBorderColor, setUsernameBorderColor] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState("");

  // Input validation functions
  const validateInput = () => {
    if (!username) {
      setUsernameWarning("Username is required");
      setUsernameBorderColor("red");
    }
    
    else if (username.length<=5){
        setUsernameWarning("Username invalid length");
        setUsernameBorderColor("Orange");

    }
    else {
      setUsernameWarning("username is fine");
      setUsernameBorderColor("green");
    }
  };

  const validatePassword = () => {

    if (!password) {
      setPasswordWarning("Password is required");
      setPasswordBorderColor("red");
    }
    
    else if (password.length<=5){
        setPasswordBorderColor("orange");
        setPasswordWarning("Password too short mainatin atleast greater than 5 characters");
    }
    
    else {
      setPasswordWarning(" Password  is fine");
      setPasswordBorderColor("green");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInput();
    validatePassword();
  
  if (username && password && username.length >=5 && password.length >=5) {
    try {
      // Send form data to the API
      const response = await fetch('http://localhost:3000/SignUp', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      const result = await response.json();
      const user = result.find(user => user.username === username && user.password === password);

      if (user) {
        // If a match is found, redirect to the dashboard
        window.location.href = "/Dashboard";
      } else {
        // If no match is found, show an error message
        alert('Invalid username or password');
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Error while logging in');
    }
  }
};



  return (
    <div className="flex w-full h-full">

        {/* container-1 */}
        <div className="flex flex-col w-1/2 h-full justify-center p-10 text-justify">
          <div className="flex items-center justify-center py-3">
          <Image src="/Image/2.webp" alt="Skill Capital Logo"  width={200} height={70} />
          </div>
          <form
            className="flex flex-col items-center justify-center w-[440px] h-fit gap-3 p-4 mx-auto shadow-inner rounded-md bg-gray-100"
            onSubmit={handleSubmit}
          >
            <label className="self-start font-semibold ">Username</label>
            <input
              className="p-4 mb-2 w-[400px] h-5 rounded-md text-center border"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateInput();
              }}
              style={{ borderColor: usernameBorderColor }}
            />
            <span id="span" className="text-xs" style={{ color: usernameBorderColor }}>
              {usernameWarning}
            </span>
            <label className="self-start font-semibold">Password</label>
            <input
              className="p-4 mb-2 w-[400px] h-5 rounded-md text-center border"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword();
              }}
              style={{ borderColor: passwordBorderColor }}
            />
            <span id="span-1" className="text-xs" style={{ color: passwordBorderColor }}>
              {passwordWarning}
            </span>
            <button
              type="submit"
              id="btn"
              className="w-[400px] h-10 rounded-md bg-gradient-to-b from-[#f472b6]  to-[#9a3412] bg-[length:100%_200%] bg-left transition-bg-position duration-1000 ease-linear border"
            >
              Login
            </button>
            <a href="#" className="text-blue-600">
              Forgot password
            </a>
            <div className="flex justify-start w-96">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm font-normal capitalize">Remember Me</span>
            </div>
            <p className="pt-10 text-sm text-gray-600">&copy;2024, All rights reserved.</p>
          </form>
        </div>
      
     {/* container-2 */}
      <div className=" hidden md:flex flex flex-col justify-center w-full  h-full bg-white p-5">

        <h2 className="w-4/5 text-xl text-blue-600 font-medium ml-20 text-justify">
          Seamlessly manage all learner data in a unified platform
        </h2>

        <p className="w-4/5 text-justify ml-20">
          Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.
        </p>
      <div className="w-full h-full">
        <Image src="/Image/1.jpg" alt="Skill Capital"  width={1000} height={1000}  className="h-full w-full object-cover" />
      </div>
      </div>


    </div>
  );
}
