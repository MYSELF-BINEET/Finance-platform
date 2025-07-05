// import React from "react";

// const MainLayout = ({ children }) => {
//   return <div className="container mx-auto my-32">{children}</div>;
// };

// export default MainLayout;

import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full pt-20">
      {children}
    </div>
  );
};

export default MainLayout;