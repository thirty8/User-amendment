import React from "react";

function TopNavOption({ icon, title, height, width, onClick }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "10px" }}>{title}</div>
      <div
        style={{
          padding: "5px",
          borderRadius: "50%",
          backgroundColor: "rgba(145, 202, 255, 0.4)",
          // border: "2.5px solid #2a93f5",
          color: "#2a93f5",
          height,
          width,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        {icon}
      </div>
    </div>
  );
}

export default TopNavOption;
