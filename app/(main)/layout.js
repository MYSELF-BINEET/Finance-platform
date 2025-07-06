import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full pt-20">
      {children}
    </div>
  );
};

export default MainLayout;