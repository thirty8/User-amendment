import React, { useState } from "react";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import Header from "../../../../../../components/others/Header/Header";

function FinancialDetails() {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 0.49 }}>
          <Header title={"GL Linkage"} headerShade={true} />
          <div
            className="mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              // backgroundColor: "#ffffff",
              marginBottom: "10px",
            }}
          >
            <div style={{ padding: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <ListOfValue
                  label={"AP Account"}
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  required={true}
                />
              </div>
              <div>
                <ListOfValue
                  label={"Vendor Account"}
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 0.02 }}></div>
        <div style={{ flex: 0.49 }}>
          <Header title={"Payment Information"} headerShade={true} />
          <div
            className="mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              // backgroundColor: "#ffffff",
              marginBottom: "10px",
            }}
          >
            {/* <div
              style={{
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
              }}
            >
              <span>Payment Information</span>
            </div> */}
            <div style={{ padding: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <ListOfValue
                  label={"Payment Method"}
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  required={true}
                />
              </div>
              <div>
                <ListOfValue
                  label={"Cash Account"}
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialDetails;
