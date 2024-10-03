"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';





export default function LoginForm() {
  // State management for username, password, and input validation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameWarning, setUsernameWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [usernameBorderColor, setUsernameBorderColor] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [records, setRecords] = useState([])

  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  // Input validation functions
  const validateInput = () => {
    const uppercasePattern = /[A-Z]/;
    const digitPattern = /[0-9]/;

    if (!username) {
      setUsernameWarning("Username is required");
      setUsernameBorderColor("red");
    }
    else if (!uppercasePattern.test(username) && username.length <= 5) {
      setUsernameWarning("Username must include at least one uppercase letter.");
      setUsernameBorderColor("orange");
    }
    else if (!digitPattern.test(username) && username.length <= 5) {
      setUsernameWarning("Maintain the digits for strong security");
      setUsernameBorderColor("orange");
    }
    else if (username.length <= 5) {
      setUsernameWarning("Username too short, must be greater than 5 characters");
      setUsernameBorderColor("orange");
    }
    else {
      setUsernameWarning("Username is valid");
      setUsernameBorderColor("green");
    }
  };

  const validatePassword = () => {
    const passwordRequirements = [
      { pattern: /[A-Z]/, message: "at least one uppercase letter" },
      { pattern: /[a-z]/, message: "at least one lowercase letter" },
      { pattern: /[!@#$%^&*(),.?":{}|<>]/, message: "at least one special character" },
      { pattern: /[0-9]/, message: "at least one digit" },
    ];

    if (!password) {
      setPasswordWarning("Password is required");
      setPasswordBorderColor("red");
    } else {
      const isValid = passwordRequirements.every((req) => req.pattern.test(password));

      if (isValid) {
        setPasswordWarning("Password is valid");
        setPasswordBorderColor("green");
      } else {
        const missingReq = passwordRequirements.find((req) => !req.pattern.test(password));
        setPasswordBorderColor("orange");
        setPasswordWarning(`Password must include ${missingReq.message}.`);
      }
    }
  };

  const AlertMessage = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === 'error') {
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInput();
    validatePassword();


    if (username && password) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // Send form data to the API
        const response = await fetch(`${apiUrl}/login/ `, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status:${response.status}`);
        }

        const result = await response.json();

        if (result && result.token) {
          if (rememberMe) {
            localStorage.setItem('rememberedUsername', username);
          } else {
            localStorage.removeItem('rememberedUsername');
          }

          // Save token in localStorage
          localStorage.setItem('token', result.token);

          // Show success toast
          AlertMessage('Login successful!', 'success');

          // Redirect to dashboard
          window.location.href = '/Dashboard'
        }
        else {

          AlertMessage('Invalid username or password', 'error');

          AlertMessage('Error while logging in. Please try again later.', 'error');
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        AlertMessage('Error while logging in', 'error');
      }
    }
    else {
      // Show error toast for missing username/password
      AlertMessage('Please enter both username and password', 'error');
    }
  };



  return (
    <div className="flex w-full h-full">

      {/* container-1 */}
      <div className="flex flex-col w-1/2 h-full justify-center p-10 text-justify">
        <div className="flex items-center justify-center py-3">
          {/* <Image src="/Image/2.webp" alt="Skill Capital Logo" width={200} height={70} /> */}
          <img className="w-60 h-10" src="./Image/2.webp" alt="image"></img>
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
          // required
          />
          <span id="span" className="text-xs" style={{ color: usernameBorderColor }}>
            {usernameWarning}
          </span>

          <div className="relative">
            <label className="self-start font-semibold">Password</label>
            <input
              className="p-4 mb-2 w-[400px] h-5 rounded-md text-center border"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword();
              }}
              style={{ borderColor: passwordBorderColor }}
            // required
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[35px] cursor-pointer"
            >
              {isPasswordVisible ? (
                <EyeSlashIcon className="h-5 w-5 text-black-200" />
              ) : (
                <EyeIcon className="h-5 w-5 text-black-200" />
              )}
            </div>
          </div>
          <span id="span-1" className="text-xs" style={{ color: passwordBorderColor }}>
            {passwordWarning}
          </span>

          <button
            // disabled={isButtonDisabled}
            type="submit"
            id="btn"
            className="w-[400px] h-10 rounded-md bg-gradient-to-b from-[#f472b6]  to-[#9a3412] bg-[length:100%_200%] bg-left transition-bg-position duration-1000 ease-linear border"
          >
            Login
          </button>
          {/* <a href="#" className="text-blue-600">
            Forgot password
          </a> */}
          <div className="flex justify-start w-96">
            <input
              type="checkbox" className="mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
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
          <img className="w-full h-full" src="./Image/1.jpg" alt="image"></img>
          {/* <Image src="/Image/1.jpg" alt="Skill Capital" width={1000} height={1000} className="h-full w-full object-cover" /> */}
        </div>
      </div>


    </div>
  );
}
