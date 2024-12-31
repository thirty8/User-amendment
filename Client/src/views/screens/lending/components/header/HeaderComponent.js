import React, { useState } from "react";

function HeaderComponent({
  icon,
  title,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  backgroundColor,
  color,
}) {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    <div>
      <div
        className="poppins-regular"
        style={{
          display: "flex",
          alignItems: "center",
          // width: "98.3%",
          // background:
          //   `url(` +
          //   window.location.origin +
          //   `/assets/images/headerBackground/` +
          //   getTheme.theme.headerImage +
          //   `)`,

          height: "35px",
          padding: "10px",
          color: color ? color : "grey",
          backgroundColor: backgroundColor ? backgroundColor : "#daecfe",
          // backgroundColor: "#daecfe",
          fontSize: "15px",
          // textTransform: "uppercase",
          fontWeight: "500",
          // fontWeight: "700",
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
