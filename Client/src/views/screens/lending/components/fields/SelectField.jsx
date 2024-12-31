import React from "react";
import { Select } from "@mantine/core";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import "./index.css";

function SelectField({
  id,
  labelWidth,
  inputWidth,
  label,
  placeholder,
  required,
  onChange,
  lovdata,
  disabled,
  value,
  defaultValue,
  onKeyPress,
  color,
}) {
  //   const dat = ["male", "female", "other"];
  const handleOpen = () => {
    var focusTrigger = document.getElementById("theField");
    focusTrigger.focus();
  };
  if (lovdata) {
    lovdata = lovdata;
  } else {
    lovdata = ["No data"];
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // marginBottom: "15px",
        margin: "15px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
      }}
    >
      <label
        className="pb-1 poppins-regular"
        style={{
          width: labelWidth,
          fontSize: "85%",
          marginRight: "20px",
          //   textAlign: "right",
        }}
      >
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>
      <Select
        placeholder={placeholder}
        style={{
          width: inputWidth,
          backgroundColor: "white",
        }}
        // defaultValue={defaultValue}
        onChange={onChange}
        onKeyPress={onKeyPress}
        variant="unstyled"
        searchable
        size={"xs"}
        id={id}
        className="selectField"
        rightSection={
          <FiChevronDown
            style={{ marginLeft: "15px" }}
            size={18}
            color="grey"
          />
        }
        value={value}
        // styles={{ rightSection: { pointerEvents: "none" } }}
        data={lovdata}
        disabled={disabled}
        styles={(theme) => ({
          dropdown: {
            fontFamily: "Poppins",
          },
          item: {
            fontFamily: "Poppins",
          },
          input: {
            fontFamily: "Poppins",
          },
        })}
      />
    </div>
  );
}

export default SelectField;
