import React from "react";
import Draggable from "react-draggable";
import EditableLabel from "./EditableLabel";

export default function CharacterPage(props) {
  return (
    <Draggable>
      <div className="text-black bg-blue-munsell inline-block w-40 h-40">
        <EditableLabel value={"test label"} />
      </div>
    </Draggable>
  );
}
