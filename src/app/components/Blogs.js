"use client";

import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "@/redux/slices/BlogSlice";
import { MoonLoader } from "react-spinners";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  const [editContent, setEditContent] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");

  useEffect(() => {
    getblogs();
  }, [blogs]);

  const getblogs = async () => {
    const response = await fetch("/api/getBlogs");
    const data = await response.json();
    console.log(data.data);
    dispatch(setBlogs(data.data));
  };

  const deleteBlog = async (id) => {
    const response = await fetch(`/api/deleteBlog/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      toast.success("Blog deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const updateBlog = async (id) => {
    try {
      const response = await fetch(`/api/updateBlog/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDesc,
        }),
      });
      if (response.status === 200) {
        toast.success("Blog updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="my-10 flex flex-col justify-center items-center gap-5 ">
        {!blogs ? (
          // <MoonLoader color="red" />
          <h2 className="text-xl font-bold text-gray-600">Blogs loading...</h2>
        ) : (
          blogs
            .map((blog, i) => {
              return (
                <div
                  className="w-[90vw] lg:w-[40vw] rounded-md shadow-md p-3  bg-white"
                  key={i}
                >
                  <div className="flex gap-3 justify-end">
                    <AiFillDelete
                      title="Delete"
                      className="  text-lg  cursor-pointer text-gray-400 hover:scale-110 hover:text-red-400"
                      onClick={() => deleteBlog(blog._id)}
                    />

                    <MdOutlineModeEdit
                      className={`text-lg cursor-pointer text-gray-400 hover:scale-110 hover:text-red-400 ${
                        selectedPost === blog._id && editContent
                          ? "text-red-400 scale-110"
                          : "text-gray-400"
                      }}`}
                      title="Edit"
                      onClick={() => {
                        setEditContent(!editContent);
                        setSelectedPost(blog._id);
                      }}
                    />
                  </div>

                  <h3
                    className="text-lg my-2 outline-none focus:bg-gray-100 TITLE-FONT"
                    contentEditable={editContent}
                    onInput={(e) => setUpdatedTitle(e.target.innerText)}
                  >
                    {blog.title}
                  </h3>
                  <p
                    className="font-semibold text-gray-600 selection:bg-green-200 focus:bg-gray-100 outline-none"
                    contentEditable={editContent}
                    xl
                    onInput={(e) => setUpdatedDesc(e.target.innerText)}
                  >
                    {blog.desc}
                  </p>
                  <button
                    onClick={() => {
                      updateBlog(blog._id);
                      setEditContent(!editContent);
                    }}
                    className={`${
                      selectedPost === blog._id && editContent
                        ? "block"
                        : "hidden"
                    } bg-purple-300 hover:bg-purple-600 my-2 text-white px-3 py-1 rounded-md `}
                  >
                    Save
                  </button>
                  <div className="flex justify-between items-center">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>{new Date(blog.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              );
            })
            .reverse()
        )}
      </div>
    </>
  );
};

export default Blogs;
