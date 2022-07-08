import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./Navigation";

function InterfacePanel(props) {
  return (
    <div className="">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<todo></todo>} />
          <Route path="/resources" element={<todo></todo>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default InterfacePanel;
