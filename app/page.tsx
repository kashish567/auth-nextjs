"use client";
import axios from "axios";
import { useRouter } from "next/navigation"; // Change this import
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <h1>I'm home</h1>
      <button
        onClick={logoutHandler}
        className="bg-zinc-700 text-white px-2 py-1 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
