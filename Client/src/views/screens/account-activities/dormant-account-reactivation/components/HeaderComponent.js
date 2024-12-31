import React from "react";

function HeaderComponent({
  
  icon,
  title,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "30px",
          padding: "10px",
          color: "rgb(21 163 183)",
          backgroundColor: "  (21 163 183)",
          fontSize: "16px",
          textTransform: "uppercase",
          fontWeight: "700",
          borderRadius: borderRadius,
          borderTopLeftRadius: borderTopLeftRadius,
          borderTopRightRadius: borderTopRightRadius,
        }}
      >
        <div style={{ marginRight: "10px" }}>{icon}</div>
        {title}
      </div>
    </div>
  );
}

export default HeaderComponent;
