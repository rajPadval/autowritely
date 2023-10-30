"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Blogs from "../components/Blogs";
import { useSelector } from "react-redux";
import Configure from "../components/Configure";

const Admin = () => {
  const category = useSelector((state) => state.category.category);

  return (
    <>
      <Navbar />
      {(() => {
        switch (category) {
          case "Blogs":
            return <Blogs />;
          case "Configure":
            return <Configure />;
          default:
            return <Blogs />;
        }
      })()}
    </>
  );
};

export default Admin;
