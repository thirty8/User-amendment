import React from "react";
import { Select } from "@mantine/core";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import "./index.css";
function ListOfValue({
  labelWidth,
  inputWidth,
  label,
  placeholder,
  lovdata,
  columns,
  margin,
  title,
  marginBottom,
  onChange,
  required,
  onKeyPress,
  value,
  id,
  defaultValue,
  onKeyDown,
  disabled,
  onSearchChange,
  marginRight,
}) {
  if (!lovdata) {
    lovdata = ["No data"];
  } else {
    lovdata = lovdata;
  }
  //   const dat = ["male", "female", "other"];
  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        alignItems: "center",
        // marginBottom: "15px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
        marginBottom: marginBottom,
        margin: '12px',
      }}
    >
      <label
        style={{
          width: labelWidth,
          fontSize: "85%",
          textAlign: "right",
          marginRight: marginRight ? marginRight : "20px",
        }}
      >
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>
      <Select
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        style={{
          width: inputWidth,
          backgroundColor: "white",
        }}
        // className="bg-white"
        variant="unstyled"
        searchable
        size={"xs"}
        className={disabled ? "inputFieldDisabled" : "selectField"}
        // id={"selectField"}
        id={id}
        rightSection={<IoMdSearch size={18} color="grey" />}
        rightSectionProps={{
          style: {
            height: "25px",
            backgroundColor: "#f2f7fd",
            borderLeft: "1px solid rgb(196, 196, 196)",
          },
        }}
        title={title}
        columns={columns}
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={lovdata}
        onChange={onChange}
        onKeyPress={onKeyPress}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        onSearchChange={onSearchChange}
      />
    </div>
  );
}

export default ListOfValue;
