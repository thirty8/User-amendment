import React from "react";
import { Select } from "@mantine/core";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";

function SelectField({
  id,
  labelWidth,
  inputWidth,
  label,
  placeholder,
  lovdata,
  required,
  onChange,
  value,
  marginBottom,
  onKeyPress,
  noMarginRight,
  defaultValue,
}) {
  //   const dat = ["male", "female", "other"];
  if (lovdata) {
    lovdata = lovdata;
  } else {
    lovdata = ["No data"];
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: marginBottom,
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
        margin:'12px'
      }}
    >
      <label
        style={{
          width: labelWidth,
          fontSize: "85%",
          textAlign: "right",
          marginRight: noMarginRight ? 0 : "20px",
        }}
      >
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>
      <Select
        onKeyPress={onKeyPress}
        onChange={onChange}
        value={value}
        required={required}
        placeholder={placeholder}
        style={{
          width: inputWidth,
        }}
        variant="unstyled"
        searchable
        size={"xs"}
        className="selectField"
        id={id}
        rightSection={
          <FiChevronDown
            style={{ marginLeft: "15px" }}
            size={18}
            color="grey"
          />
        }
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={lovdata}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default SelectField;
