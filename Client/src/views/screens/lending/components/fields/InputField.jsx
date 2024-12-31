import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
// import { DatePicker } from "@mantine/dates";
import "./index.css";

function InputField({
  labelWidth,
  inputWidth,
  type,
  label,
  maxLength,
  disabled,
  required,
  value,
  color,
  onChange,
  id,
  inputColor,
  textAlign,
  onKeyPress,
  onBlur,
  onFocus,
  margin,
  autoComplete,
  className,
}) {
  // disabled & required should be true or false, width should be in percentages, type: tel, number, text
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // marginBottom: "20px",
        margin: margin ? margin : "15px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
      }}
    >
      <label
        className="pb-1 poppins-regular"
        style={{
          width: labelWidth,
          fontSize: "85%",
          color: color ? color : "grey",
          marginRight: "20px",
          //   textAlign: "right",
        }}
      >
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>

      {/* {type === "date" ? (
        <DatePicker
          variant="unstyled"
          width={inputWidth}
          style={{ width: inputWidth, color: "rgb(92, 92, 92)" }}
          // inputFormat="DD/MM/YYYY"
          placeholder="Pick a date"
          id="dateField"
          rightSection={<IoCalendarOutline size={18} color="grey" />}
          styles={{ rightSection: { pointerEvents: "none" } }}
        />
      ) : ( */}
      <input
        id={id}
        type={type}
        className={`${
          disabled ? "inputFieldDisabled" : "inputField"
        } ${className}`}
        style={{
          width: inputWidth,
          color: inputColor,
          textAlign: textAlign,
          fontSize: "85%",
        }}
        autoComplete={autoComplete}
        onFocus={onFocus}
        maxLength={maxLength}
        min={type === "number" && 0}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
      />
      {/* )} */}
    </div>
  );
}

export default InputField;
