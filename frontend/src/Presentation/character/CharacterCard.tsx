import React from "react";
import Draggable from "react-draggable";
import EditableLabel from "../EditableLabel";

export default function CharacterCard({onClick}) {
  return (
    <div className="flex flex-row w-10 h-10 items-center" onDoubleClick={(e) => onClick()}>
      <img className="rounded-full" src="https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"></img>
      <p className="ml-2">Character</p>
    </div>
  );
}
