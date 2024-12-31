import React from "react";
import Label from "../label/Label";

function ButtonType({
  id,
  label,
  labelWidth,
  name,
  type,
  value1,
  fontSize,
  checked,
  onClick,
  onChange,
  marginRight,
  margin,
}) {
  // label width should be in percentages
  // type: radio, checkboxes
  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "85%" }}>
      <input
        id={id}
        name={name}
        type={type}
        value={value1}
        checked={checked}
        onClick={onClick}
        onChange={onChange}
        style={{ marginRight: marginRight, fontSize: fontSize , margin: margin}}
      />
      <label for={id} labelWidth={labelWidth}>
        {label}
      </label>
    </div>
  );
}

export default ButtonType;
