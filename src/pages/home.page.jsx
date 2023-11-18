import React from "react";
import HomeLayout from "../layouts/Home.layout";
import { useSelector } from "react-redux";
import { getUILoading } from "../store/ui";

function HomePage(props) {
  const state = useSelector(getUILoading)
  console.log(state)
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default HomeLayout(HomePage);
