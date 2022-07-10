import { render } from "@testing-library/react";
import React, { useState } from "react";

function Editable(props) {
  let [isEdit, setIsEdit] = useState(false);
  let [value, setValue] = useState(props.value ? props.value : '');
  const renderEditable = () =>
    React.Children.map(props.children, (child) => {
      if (React.isValidElement(child)) {
        let change = {};
        change[props.at] = value;
        return React.cloneElement(child, change);
      }
      return child;
    });

  const handleBlur = (e) => {
    setIsEdit(false);
    if (!props.handleChange) return;
    let change = {};
    change[props.name] = value;
    props.handleChange(change);
  };

  const doubleClick = (e) => {
    if (e.detail != 2) return;
    setIsEdit(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return isEdit ? (
    <input
      autoFocus
      type="text"
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
    ></input>
  ) : (
    <div onDoubleClick={doubleClick}>{renderEditable()}</div>
  );
}

export default Editable;
