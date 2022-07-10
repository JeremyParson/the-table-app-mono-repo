import React, { useState } from "react";

function EditableLabel(props) {
  const [editMode, setEditMode] = useState(false);
  const init_value = props.value ? props.value : 'Empty'
  const [value, setValue] = useState(init_value);

  const handleBlur = (e) => {
    setEditMode(false)
    let change = {}
    change[props.name] = value
    props.handleChange(change)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const doubleClick = (e) => {
    if (e.detail !== 2) return
    setEditMode(true)
  }

  return editMode ? <input autoFocus type="text" value={value} onChange={handleChange} onBlur={handleBlur}></input> : <p onClick={doubleClick}>{value}</p>;
}

export default EditableLabel;
