import React from "react";
import ActionButtons from "../../components/others/action-buttons/ActionButtons";
import swal from "sweetalert";

function PageNotFound({  }) {
  function capitalizeFirstCharacter(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  const handleExitClick = () => {
        if (document.getElementById("exitBTN1")) {
          const exitBTN = document.getElementById("exitBTN1");
          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          exitBTN.dispatchEvent(clickEvent);
        }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <hr style={{ marginTop: "0px" }} />

      <style>
        {`
        .blinkText {
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        `}
      </style>

      <div>
        <ActionButtons onExitClick={handleExitClick} />
      </div>

      <p
        className="blinkText"
        style={{
          fontSize: "16px",
          textAlign: "center",
          marginBottom: "65px",
          marginTop: "65px",
        }}
      >
        Sorry we are having trouble locating the form '
        <b>{capitalizeFirstCharacter(localStorage.getItem("formName"))}</b>'.
        Kindly contact your system's administrator.
      </p>
    </div>
  );
}

export default PageNotFound;
