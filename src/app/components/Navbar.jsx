import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import { useDispatch } from "react-redux";
import { setCategory } from "@/redux/slices/CategorySlice";

const Navbar = () => {
  const router = useRouter();
  const loadingBar = useRef();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true); // Show loading bar
    loadingBar.current.continuousStart(); // Start the loading bar animation
    try {
      const res = await axios.get("/api/logout");
      const data = await res.data;
      toast.success(data.message);
      router.push("/signin");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Hide loading bar
      loadingBar.current.complete(); // Complete the loading bar animation
    }
  };

  return (
    <>
      <LoadingBar color="#F8A3A5" ref={loadingBar} height="5px" />
      <div className="flex justify-between px-3 py-2 shadow-md bg-white">
        <div className="flex ">
          <li className="px-3 py-1 text-gray-600 hover:text-black cursor-pointer transition-all delay-100 rounded-lg  font-bold text-xl list-none" onClick={()=> dispatch(setCategory("Blogs"))}>
            Blogs
          </li>
          <li className="px-3 py-1 text-gray-600 hover:text-black cursor-pointer transition-all delay-100 rounded-lg  font-bold text-xl list-none" onClick={() => dispatch(setCategory("Configure"))}>
            Configure
          </li>
        </div>
        <button
          type="submit"
          onClick={logout}
          className="px-3 py-1 bg-red-300 hover:bg-red-500 rounded-lg text-white font-bold text-xl"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
