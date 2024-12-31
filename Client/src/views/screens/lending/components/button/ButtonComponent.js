import React, { useState } from "react";

function ButtonComponent({
  label,
  buttonIcon,
  buttonBackgroundColor,
  buttonColor,
  fontSize,
  buttonWidth,
  margin,
  buttonHeight,
  onClick,
  marginBottom,
  type,
  id,
  onMouseEnter,
  onMouseLeave,
  key,
}) {
  const [isPEP, setIsPEP] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // height should be in percentages and width should be in pixels
  const [getButtonColor, setButtonColor] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  return (
    <button
      id={id}
      className="button space-x-4 flex justify-center items-center text-white !poppins-light"
      onClick={onClick}
      type={type}
      key={key}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        // backgroundColor: buttonBackgroundColor,
        display: "flex",
        // background:getButtonColor.theme.buttonBGColor,

        backgroundColor: buttonBackgroundColor
          ? buttonBackgroundColor
          : "#48c1d8",
        color: buttonColor,
        border: "none",
        borderRadius: "4px",
        height: buttonHeight,
        width: buttonWidth,
        marginBottom: marginBottom,
        whiteSpace: "nowrap",
        padding: "3px",
        margin: margin,
        // fontSize: "15px",
      }}
    >
      <span
        style={{
          display: buttonIcon ? "flex" : "none",
          marginRight: buttonIcon && label ? "5px" : "0px",
          fontSize: fontSize,
          justifyContent: "center",
          color: buttonColor,
        }}
      >
        {" "}
        {buttonIcon}{" "}
      </span>
      {label}
    </button>
  );
}

export default ButtonComponent;
