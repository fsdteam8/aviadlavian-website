import Header from "@/features/sample-feature/header/Header";
import Sidebar from "@/features/sidebar/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="pt-16 md:pl-64">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default layout;
