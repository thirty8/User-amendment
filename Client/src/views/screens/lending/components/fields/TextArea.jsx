import React from "react";
// import "./index.css";
import "./index.css";

function TextAreaField({
  labelWidth,
  inputWidth,
  label,
  disabled,
  required,
  rows,
  cols,
  margin,
  onChange,
  value,
  id,
  onKeyDown,
  inputheight,
}) {
  // disabled & required should be true or false, width should be in percentages, type: tel, number, text
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        margin: "15px",
        // marginBottom: "15px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
      }}
    >
      <label
        className="pb-1 poppins-regular"
        style={{
          width: labelWidth,
          fontSize: "85%",
          //   textAlign: "right",
          marginRight: "20px",
        }}
      >
        {label}
        {required === true ? <span style={{ color: "red" }}> *</span> : null}
      </label>

      <textarea
        className="textareafield"
        rows={rows}
        style={{ width: inputWidth, color: "#595959", height: inputheight }}
        disabled={disabled}
        required={required}
        cols={cols}
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default TextAreaField;
