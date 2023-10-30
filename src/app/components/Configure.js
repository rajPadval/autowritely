"use client";
import { addTopic, removeTopic } from "@/redux/slices/TopicSlice";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/navigation";

const Configure = () => {
  const dispatch = useDispatch();
  const loadingBar = useRef();
  const router = useRouter();
  const topics = useSelector((state) => state.topic.topics);

  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetup = async () => {
    console.log("setup completed", topics);
    setLoading(true); // Show loading bar
    loadingBar.current.continuousStart(); // Start the loading bar animation
    try {
      const res = await axios.post("/api/generateBlog", {
        topics,
      });
      const data = await res.data;
      console.log(data.message);
      toast.success(data.message);
      router.push("/admin");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Hide loading bar
      loadingBar.current.complete(); // Complete the loading bar animation
    }
  };

  useEffect(() => {
    console.log(topics);
  }, [topics]);

  return (
    <div class="container flex justify-center mx-auto items-center">
      <LoadingBar color="#60DF86" ref={loadingBar} height="5px" />
      <div class="top flex bg-white  mb-3  flex-col w-[19rem] sm:w-[25rem] mt-[8rem] space-y-4 p-4 shadow-md rounded-lg">
        <p class="text-4xl italic font-bold text-center">Autowritely</p>
        <p class="text-center">
          Your Blog, Your Way - Autowritely Makes It a Breeze!{" "}
        </p>
        <input
          class="p-2 rounded-md border border-gray-500"
          type="text"
          name="topic"
          id="topic"
          placeholder="Enter the Topic"
          required
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        />
        <button
          className="bg-gray-500 text-white py-1 text-lg font-bold "
          onClick={() => {
            dispatch(addTopic(topic));
            setTopic("");
          }}
        >
          Add Topic
        </button>

        <label for="categories">Selected Topics</label>
        <div>
          {topics
            .map((topic, i) => (
              <div
                key={i}
                className="flex justify-between items-center  px-2 rounded-lg"
              >
                <span>{topic}</span>
                <MdDelete
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  onClick={() => dispatch(removeTopic(topic))}
                />
              </div>
            ))
            .reverse()}
        </div>
        <div
          class="bt flex items-center justify-center sm:justify-end"
          onClick={handleSetup}
        >
          <button class="btn bg-blue-500 w-[9rem] rounded-full text-white font-bold text-lg p-2 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-400 hover:scale-x-105">
            SetUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configure;
