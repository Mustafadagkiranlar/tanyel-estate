"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


export default function Page() {
  const shadow = {
    boxShadow: "0px 0px 16px rgba(0,0,0,0.10)", // Change the color and opacity as needed
  };
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event?.preventDefault(); // Prevent page reload
    if (!email || !password) {
      toast.error("Please enter email and password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);

    if (res.status === 401 || res.status === 404) {
      toast.error("Wrong email or password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (res.status === 200) {
      const data = await res.json();
      Cookies.set("jwt", data.token, {
        expires: 1,
      });
      router.push("/dashboard");
      return;
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <ToastContainer />
      <div className="grow flex justify-center items-center">
        <div className="flex flex-col bg-card-color px-10 py-5" style={shadow}>
          <h1 className="text-2xl font-bold mb-6">LOGIN TO YOUR ACCOUNT</h1>
          <hr />
          <form onSubmit={handleLogin} className="flex flex-col">
            <p className="mt-7">EMAIL</p>
            <input
              type="email.com"
              placeholder="contact@spacegensoft.com"
              className="px-5 py-3 mt-2"
              style={shadow}
              value={email}
              onChange={handleEmailChange}
            />
            <p className="mt-6">PASSWORD</p>
            <input
              type="password"
              placeholder="********"
              className="px-5 py-3 mt-2 mb-12"
              style={shadow}
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className="py-3 border-0.5 flex justify-center gap-3"
              style={shadow}
              type="submit"
            >
              Login
              {loading ? (
                <span className="loading loading-bars loading-md" />
              ) : null}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
