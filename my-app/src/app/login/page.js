'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { easeIn, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        const savedPassword = localStorage.getItem('rememberedPassword');
        if (savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://crm.rajeshcrm.xyz:8000/api/login/", { username, password });
            
            if (response) {
                console.log("Login successful");
                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);
                    localStorage.setItem('rememberedPassword', password);
                } else {
                    localStorage.removeItem('rememberedUsername');
                    localStorage.removeItem('rememberedPassword');
                }
                toast.success('Login Successful', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid credentials");
            toast.error('Failed to Login', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
            <ToastContainer />
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-[320px] mb-8 relative">
                    <motion.div 
                    initial={{ opacity : 0}}
                    animate={{opacity:1, ease:'easeIn' }}
                    transition={{duration:3 }}
                    >
                        <img src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=640&q=75" ></img>
                    </motion.div>

                    
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm text-gray-700">Remember me</span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-gradient-to-r from-[#FAA37C] to-[#F2708C] hover:bg-gradient-to-r hover:from-[#F2708C] hover:to-[#FAA37C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform hover:scale-105"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        ©2024 Skill Capital. All rights reserved.
                    </p>
                </motion.div>
            </div>
            <div className="w-full lg:w-1/2 bg-[url('https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpinkcrm.d54abf0d.png&w=1920&q=75')] bg-cover bg-center bg-no-repeat min-h-[300px] lg:min-h-screen">
                <div className="h-full flex flex-col  p-4 sm:p-8  bg-opacity-80 ">
                    <h2 className="text-2xl sm:text-2xl lg:text-3xl text-[#042D60] font-bold  mb-4 text-center">
                        Seamlessly Manage All Learner Data<br></br>
                         In a Unified Platform.
                    </h2>
                    <p className=" text-lg lg:text-base text-[#042D60]  text-center ">
                        Centralize customer data effortlessly. Streamline communication, sales, and<br></br> support for seamless growth.
                    </p>
                </div>
            </div>
        </div>
    );
}