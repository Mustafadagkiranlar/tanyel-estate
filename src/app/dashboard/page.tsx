import React from "react";
import MainHeader from "@/app/components/dashboard/MainHeader";
import Bottombar from "@/app/components/dashboard/Bottombar";
import FutureFeatures from "@/app/components/dashboard/FutureFeatures";

function DashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      <div className="flex flex-1">
        <Bottombar />
        <FutureFeatures />
      </div>
    </div>
  );
}

export default DashboardPage;
