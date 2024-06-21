import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center bg-blue-200 min-h-screen">
      <div className="bg-white p-10 shadow-lg">
        <h1 className="font-bold">LOGIN</h1>
        <div className="flex flex-col my-4">
          <label>Username</label>
          <input
            type="text"
            className="border-2 outline-none border-zinc-500 rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col my-4">
          <label>Email</label>
          <input
            type="email"
            className="border-2 outline-none border-zinc-500 rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col my-4">
          <label>Password</label>
          <input
            type="password"
            className="border-2 outline-none border-zinc-500 rounded-md px-2 py-1"
          />
        </div>
        <button className="bg-pink-300 w-full py-1 my-2 rounded-md">
          Login
        </button>
      </div>
    </div>
  );
};

export default page;
