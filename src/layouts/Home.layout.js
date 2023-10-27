import React from "react";
import Sidebar from "../components/Sidebar";

const HomeLayout =
  (Component) =>
  ({ ...props }) => {
    return (
      <div className="flex flex-row">
        <Sidebar />
        <div className="p-6 py-4 w-full">
          <Component {...props} />
        </div>
      </div>
    );
  };

export default HomeLayout;
