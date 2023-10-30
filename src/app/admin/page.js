import React from "react";

const Admin = () => {
  return (
    <div className="bg-gray-100 h-[100vh] flex justify-center items-center">
      <div className="top flex bg-white  mb-3  flex-col w-[19rem] sm:w-[25rem]  space-y-4 p-4 shadow-md rounded-lg">
        <p className="text-4xl italic font-bold text-center">Autowritely</p>
        <p className="text-center">
          Your Blog, Your Way - Autowritely Makes It a Breeze!{" "}
        </p>
        <input
          className="p-2 rounded-md border border-gray-500"
          type="text"
          name="username"
          id="username"
          placeholder="Enter the valid Username"
        />

        <label for="dropdown">Select a Your Category: </label>
        <select className="p-2  rounded-md bg-gray-300" id="dropdown">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
          <option value="grape">Grape</option>
          <option value="orange">Orange</option>
          <option value="strawberry">Strawberry</option>
        </select>

        <div className="bt flex items-center justify-center sm:justify-end">
          <button className="btn bg-blue-500 w-[9rem] rounded-full text-white font-bold text-lg p-2 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-400 hover:scale-x-105">
            SetUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
