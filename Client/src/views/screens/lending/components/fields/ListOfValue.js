import React, { useState } from "react";
import { Select } from "@mantine/core";
import { IoMdSearch } from "react-icons/io";

function ListOfValue({
  labelWidth,
  inputWidth,
  label,
  placeholder,
  lovdata,
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
  onFocus,
  disabled,
  onSearchChange,
  marginRight,
  className,
  onClick,
}) {
  if (!lovdata) {
    lovdata = ["No data"];
  }
  const [v, setV] = useState();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: marginBottom,
        margin: margin ? margin : "15px",
      }}
    >
      <label
        style={{
          width: labelWidth,
          fontSize: "85%",
          textAlign: "right",
          color: "rgb(92, 92, 92)",
          marginRight: marginRight ? marginRight : "20px",
        }}
        className="poppins-regular"
      >
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
      <Select
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        style={{ width: inputWidth, backgroundColor: "white" }}
        variant="unstyled"
        searchable
        clearable
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
        size="xs"
        className={
          disabled ? "inputFieldDisabled " : `selectField ${className}`
        }
        id={id}
        rightSection={!v && <IoMdSearch size={18} color="grey" />}
        rightSectionProps={{
          style: {
            height: "25px",
            backgroundColor: "#f2f7fd",
            borderLeft: "1px solid rgb(196, 196, 196)",
          },
        }}
        title={title}
        data={lovdata}
        onChange={(value) => {
          setV(value);
          onChange(value);
        }}
        onKeyPress={onKeyPress}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onSearchChange={onSearchChange}
        onClick={onClick}
      />
    </div>
  );
}

export default ListOfValue;
