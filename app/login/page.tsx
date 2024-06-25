"use client"; // Ensure this component is treated as a client component

import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Change this import
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(true);

  const submitHandler = async () => {
    try {
      const res = await axios.post("/api/users/login", user); // Pass the user data
      router.push("/");
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center bg-blue-200 min-h-screen">
      <div className="bg-white p-10 shadow-lg rounded-lg">
        <h1 className="font-bold text-blue-700">LOGIN</h1>
        <div className="flex flex-col my-4">
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border-2 outline-none border-zinc-500 rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col my-4">
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border-2 outline-none border-zinc-500 rounded-md px-2 py-1"
          />
        </div>
        <button
          onClick={submitHandler}
          className={`${
            disable ? "bg-[#e3e3e3] cursor-not-allowed" : "bg-[#4974b4]"
          } w-full py-1 my-2 rounded-md text-white`}
          disabled={disable}
        >
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold">
            SIGNUP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
