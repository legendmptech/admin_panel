import * as React from "react";
// import { fstore } from "./configs/firebase-config";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home.page";
import PortfolioTab from "./pages/tabs/portfolio.tab";

function App() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/portfolio" element={<PortfolioTab />} />
    </Routes>
  );
}
export default App;
