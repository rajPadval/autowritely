"use client";
import React, { useState, useRef } from "react";
import { MdAccountCircle } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";

const Signin = () => {
  const router = useRouter();
  const loadingBar = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading(true); // Show loading bar
    loadingBar.current.continuousStart(); // Start the loading bar animation
    try {
      const res = await axios.post("/api/signin", { email, password });
      const data = await res.data;
      if (data.success == false) {
        toast.error(data.message);
      } else toast.success(data.message);
      router.push("/admin");
    } catch (error) {
      toast.error("Login failed:", error);
    } finally {
      setLoading(false); // Hide loading bar
      loadingBar.current.complete(); // Complete the loading bar animation
    }
  };

  return (
    <div className=" flex justify-center items-center h-[100vh]">
      <Toaster position="top-center" reverseOrder={false} />
      <LoadingBar color="#60DF86" ref={loadingBar} height="5px" />
      <div className="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
        <h1 className="font-bold text-2xl my-10 text-black"> Login </h1>
        <form
          action=""
          className="mt-2 flex flex-col lg:w-1/2 w-8/12"
          onSubmit={login}
        >
          <div className="flex flex-wrap  w-full  relative h-15 bg-gray-300 items-center  mb-6 pr-10 rounded-lg">
            <div className="flex -mr-px justify-center w-15 p-4">
              <span className="flex items-center leading-normal bg-gray-300 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <MdAccountCircle />
              </span>
            </div>
            <input
              type="email"
              className="flex-shrink flex-grow  leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none bg-gray-300"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap  w-full relative h-15 bg-gray-300 items-center mb-4 rounded-lg">
            <div className="flex -mr-px justify-center w-15 p-4">
              <span className="flex items-center leading-normal bg-gray-300 rounded rounded-r-none text-xl px-3 whitespace-no-wrap ">
                <BiSolidLockAlt
                title="Show Password"
                  className={`cursor-pointer  ${
                    showPassword ? "text-green-500" : "text-gray-600"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="flex-shrink flex-grow  leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none bg-gray-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex -mr-px">
              <span className="flex items-center leading-normal bg-gray-300 rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                <i className="fas fa-eye-slash"></i>
              </span>
            </div>
          </div>
          <a
            href="#"
            className="text-base text-black text-right font-roboto leading-normal hover:underline mb-6"
          >
            Forget Password ?
          </a>
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-600 py-3  text-center px-17 md:px-12  text-white leading-tight text-xl md:text-base font-sans font-bold mb-20 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
