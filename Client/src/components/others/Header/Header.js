import React, { useState } from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";

function Header({
  icon,
  title,
  fontWeight,
  textAlign,
  handleClose,
  backgroundColor,
  borderRadius,
  fontSize,
  fontColor,
  closeIcon,
  headerShade,
  greenShade,
  zoom,
  padding,
}) {
  const [getHeaderColor, setHeaderColor] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "32px",
        paddingLeft: "3px",
        color: headerShade ? "rgb(92, 92, 92)" : greenShade ? "black" : "white",
        background: headerShade ? "#daecfe" : backgroundColor,
        fontSize: fontSize ? fontSize : "16px",
        fontWeight: fontWeight,
        textTransform: "uppercase",
        fontWeight: "500",
        borderRadius: borderRadius,
        zoom: zoom,
        padding: padding,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          zoom: zoom,
        }}
      >
        <div>
          <>{icon}</>
          <label
            style={{ paddingLeft: "5px", color: fontColor, fontSize: fontSize }}
          >
            {title}
          </label>
        </div>
        <div
          style={{
            display: closeIcon === true ? "flex" : "none",
            marginRight: closeIcon === true ? "10px" : "0px",
          }}
          onClick={handleClose}
        >
          <AiOutlineCloseCircle
            size={20}
            color={headerShade ? "grey" : "white"}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
