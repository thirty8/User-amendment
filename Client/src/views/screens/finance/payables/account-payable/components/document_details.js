import React, { useState } from "react";
import Document_Details_Rows from "./document_details_rows";
import InputField from "../../../../../../components/others/Fields/InputField";

function DocumentDetails() {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [rows, setRows] = useState([{}, {}, {}, {}, {}]);
  return (
    <div>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
        }}
      >
        <div
          style={{
            background: "#0580c0",
            color: "white",
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            height: "25px",
            fontSize: "1.1em",
            // paddingLeft: "10px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", textAlign: "center" }}>
            <div style={{ flex: 0.35, borderRight: "1px solid white" }}>
              <span>Expense Type</span>
            </div>
            <div style={{ flex: 0.1, borderRight: "1px solid white" }}>
              <span>Quantity</span>
            </div>
            <div style={{ flex: 0.15, borderRight: "1px solid white" }}>
              <span>Amount</span>
            </div>
            <div style={{ flex: 0.4, borderRight: "1px solid white" }}>
              <span>Narration</span>
            </div>
            {/* <div style={{ flex: 0.04 }}>
              <span>Action Cost</span>
            </div> */}
          </div>
        </div>
        <div style={{ padding: "10px 5px" }}>
          {rows.map((row, key) => (
            <Document_Details_Rows />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocumentDetails;
