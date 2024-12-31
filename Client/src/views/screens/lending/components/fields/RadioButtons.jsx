import React from "react";
import "./index.css";

function RadioButtons({
  id,
  label,
  labelWidth,
  name,
  // name,name2,name3,
  value,
  onKeyDown,
  checked,
  onClick,
  onChange,
  fontWeight,
  marginBottom,
  margin,
  labelColor,
  required,
  id2,
  value2,
  onClick2,
  checked2,
  id3,
  value3,
  onClick3,
  checked3,
  radioLabel,
  radioLabel2,
  radioLabel3,
  display,
  display2,
  display3,
  radioButtonsWidth,
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
        marginBottom: marginBottom,
        margin: "15px",
        // alignItems: "center",
      }}
    >
      <label
        className="pb-1 poppins-regular"
        style={{
          width: labelWidth,
          fontWeight: fontWeight,
          fontSize: "85%",
          color: labelColor,
          //   textAlign: "right",
          marginRight: "20px",
        }}
      >
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: radioButtonsWidth,
          height: "25px",
        }}
      >
        {/* first radio btn   */}
        <span
          style={{
            display: display ? "flex" : "none",
            flex: 1,
            alignItems: "center",
          }}
        >
          <input
            id={id}
            name={name}
            type={"radio"}
            value={value}
            checked={checked}
            onClick={onClick}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="radiobuttons"
            style={{ marginRight: "5px" }}
          />
          <label
            htmlFor={id}
            className="ms-1"
            style={{ fontSize: "85%", marginRight: "10px" }}
          >
            {" "}
            {radioLabel}{" "}
          </label>
        </span>

        {/* second radio btn   */}
        <span
          style={{
            display: display2 ? "flex" : "none",
            alignItems: "center",
            flex: 1,
          }}
        >
          <input
            id={id2}
            name={name}
            type={"radio"}
            value={value2}
            checked={checked2}
            onClick={onClick2}
            onKeyDown={onKeyDown}
            onChange={onChange}
            style={{ marginRight: "10px" }}
            className="radiobuttons"
          />
          <label
            htmlFor={id2}
            className="ms-1"
            style={{ fontSize: "85%", marginRight: "10px" }}
          >
            {" "}
            {radioLabel2}{" "}
          </label>
        </span>

        {/* third radio btn   */}
        <span
          style={{
            display: display3 ? "flex" : "none",
            alignItems: "center",
            flex: 1,
          }}
        >
          <input
            id={id3}
            name={name}
            type={"radio"}
            value={value3}
            checked={checked3}
            onClick={onClick3}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="radiobuttons"
            style={{ marginRight: "5px" }}
          />
          <label htmlFor={id3} className="ms-1" style={{ fontSize: "85%" }}>
            {" "}
            {radioLabel3}{" "}
          </label>
        </span>
      </div>
    </div>
  );
}

export default RadioButtons;
