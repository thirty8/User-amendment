import React, { useState } from "react";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../../components/others/Header/Header";

function FADetails({ fAPosting, maintenance }) {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    <div
      style={{
        width: "60%",
        margin: "0 auto",
      }}
    >
      <Header title={"Posting Options"} headerShade={true} />
      <div
        className="mt-1"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
        }}
      >
        {/* <div style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`,
              color: "white",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
              height: "25px",
              fontSize: "1.1em",
              paddingLeft: "10px",
              alignItems: "center",
            }}>
                <span>FA Posting Options</span>
            </div> */}
        <div style={{ padding: "10px" }}>
          <div style={{ marginBottom: "15px" }}>
            <ListOfValue
              label={"Asset ID"}
              labelWidth={"25%"}
              inputWidth={"65%"}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <ListOfValue
              label={"FA Posting Type"}
              labelWidth={"25%"}
              inputWidth={"65%"}
              data={fAPosting}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <ListOfValue
              label={"Maintenance"}
              labelWidth={"25%"}
              inputWidth={"65%"}
              data={maintenance}
            />
          </div>
          <div
            style={{ display: "grid", placeItems: "end", marginRight: "60px" }}
          >
            <ButtonComponent label={"Clear FA Data"} buttonWidth={"110px"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FADetails;
