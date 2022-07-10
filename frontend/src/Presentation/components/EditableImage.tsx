import React, { useState } from "react";

// Display an image that when double clicked can have it's image source changed
function EditableImage(props) {
  const [editMode, setEditMode] = useState(false);
  const init_source = props.source ? props.source : "Empty";
  const [source, setSource] = useState(init_source);

  // Switch from text box to image, call handleChange method, and set edit mode to false
  const handleBlur = (e) => {
    setEditMode(false)
    let change = {}
    change[props.name] = source
    props.handleChange(change)
  }

  // Updates the image source source
  const handleInputChange = (e) => {
    setSource(e.target.value)
  }

  // Switch into edit mode and replace image with text box
  const doubleClick = (e) => {
    if (e.detail != 2) return;
    setEditMode(true);
  };

  return editMode ? (
    <input
      autoFocus
      type="text"
      value={source}
      onChange={handleInputChange}
      onBlur={handleBlur}
    ></input>
  ) : (
    <img onClick={doubleClick} src={source}/>
  );
}

export default EditableImage;
