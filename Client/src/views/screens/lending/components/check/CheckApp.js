import React, { useState } from "react";
import { Checkbox } from "@mantine/core";

const CheckApp = ({ label, value, setCheckedProp, getChecked }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="py-3 px-5"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>{label}</div>
      <div style={{ display: "flex", gap: "30px" }}>
        <div
          style={{
            backgroundColor: value ? "#daecfe" : "",
            borderRadius: "5px",
          }}
          className="font-bold p-1 px-2"
        >
          {value}
        </div>
        <div className="mt-1.5 ">
          <Checkbox
            className="hover:!cursor-pointer"
            size="md"
            color="green"
            checked={getChecked}
            onChange={(event) => setCheckedProp(event.currentTarget.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckApp;
