import React, { useState } from "react";

export default function ViewerNavigationBar(props) {
  let [tab, setTab] = useState("Chat");
  let selectedStyle = { backgroundColor: "red" };

  const handleClick = (e) => {
    setTab(e.target.innerText);
    if (props.handleChange) props.handleChange(e.target.innerText);
  };

  return (
    <nav className="bg-blue-munsell">
      <ul className="flex justify-evenly">
        <li>
          <button
            style={tab === "Chat" ? selectedStyle : {}}
            onClick={handleClick}
          >
            Chat
          </button>
        </li>
        <li>
          <button
            style={tab === "Resources" ? selectedStyle : {}}
            onClick={handleClick}
          >
            Resources
          </button>
        </li>
        <li>
          <button
            style={tab === "Settings" ? selectedStyle : {}}
            onClick={handleClick}
          >
            Settings
          </button>
        </li>
      </ul>
    </nav>
  );
}
