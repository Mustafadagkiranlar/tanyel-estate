import React from "react";
import MainHeader from "./components/MainHeader";
import Sidebar from "./components/sidebar";
import Image from "next/image";

function DashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-col md:flex-row gap-4 justify-center items-center w-full mb-44">
          <div className="flex flex-col gap-4">
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <Image src={"/images/niceitem.jpg"} alt="Building" width={384} height={254} />
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
              <Image src={"/images/niceitem.jpg"} alt="Building" width={384} height={254} />
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
