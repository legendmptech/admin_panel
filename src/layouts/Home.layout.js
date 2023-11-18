import React from "react";
import Sidebar from "../components/Sidebar";
import OverlayLoading from "../components/OverlayLoading";

const HomeLayout =
  (Component) =>
  ({ ...props }) => {
    return (
      <div className="flex flex-row">
        <Sidebar />
        <div className="p-3 py-4 w-full">
          <Component {...props} />
        </div>
        <OverlayLoading />
      </div>
    );
  };
export default HomeLayout;
