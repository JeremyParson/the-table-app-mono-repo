import React, { useState } from "react";
import ResourceViewer from "./ResourceViewer";

export default function ViewerSideBar(props) {
  return (
    <div className="w-3/5 h-full">
      {props.children}
    </div>
  );
}
