import React from "react";
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
  defaultValue,
  endTitle,
}) {
  // disabled & required should be true or false, width should be in percentages, type: tel, number, text
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        // marginBottom: "20px",
        margin: margin ? margin : "15px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
      }}
    >
      <label
        style={{
          width: labelWidth,
          fontSize: "85%",
          color: color ? color : "grey",
          marginRight: "20px",
          textAlign: "right",
        }}
        className="poppins-regular"
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
        defaultValue={defaultValue}
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

      <label
        style={{
          marginLeft: "5px",
          color: "orange",
          fontStyle: "italic",
          fontSize: "95%",
        }}
      >
        {endTitle}
      </label>
      {/* )} */}
    </div>
  );
}

export default InputField;
