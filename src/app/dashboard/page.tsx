"use client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "./components/MainHeader";
import Cookies from "js-cookie";
import Sidebar from "./components/sidebar";

function DashboardPage() {
  // const router = useRouter();
  // const [verified, setVerified] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = Cookies.get("jwt");
  //     const res = await fetch("/api/checktoken", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token }),
  //     });
  //     const isVerified = await res.json();

  //     console.log(isVerified);
  //     if (res.status === 401) {
  //       setVerified(false);
  //       router.push("/");
  //     } else if (res.status === 200) {
  //       setVerified(true);
  //     } else {
  //       router.push("/");
  //       setVerified(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // If not verified, render "Not Authorized" message
  // if (!verified) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex gap-4 overflow-y-hidden justify-center items-center w-full">
          <div className="flex flex-col gap-4">
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={"/images/niceitem.jpg"} alt="Building" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Who viewed?</h2>
              <p>If person looks at the property dont you want to know?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Comming Soon</button>
              </div>
            </div>
          </div>
          </div>
          <div className="flex flex-col gap-4">
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={"/images/niceitem.jpg"} alt="Building" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Who did what?</h2>
              <p>Track your managers?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Comming Soon</button>
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
