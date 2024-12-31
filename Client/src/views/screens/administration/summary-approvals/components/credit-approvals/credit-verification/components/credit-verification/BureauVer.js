import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField";
import ListOfValue from "../fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../../../../../config/constant";

const BureauVer = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  return (
    <div>
      {/* <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            flex: 0.5,
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
            border: "0.5px solid #e0dfe0",
          }}
        >
          <div>
            <HeaderComponent
              title={"External Credit Bureau Details"}
              // backgroundColor={"orange"}
              height={"35px"}
              color={"white"}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <div style={{ borderBottom: "0.5px solid #828083" }}>
              <h6>Enquiry made within the last 12 months</h6>
            </div>
          </div>
          <div>
            <InputField
              label={"Number of enquiry made on behalf of this cutomer"}
              labelWidth={"59%"}
              inputWidth={"40%"}
            />
          </div>
          <div>
            <InputField
              label={"Number of banks that have enquired about this customer"}
              inputWidth={"40%"}
              labelWidth={"59%"}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Printed Date"}
              labelWidth={"58%"}
              inputWidth={"20%"}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Expiry Date"}
              labelWidth={"58%"}
              inputWidth={"20%"}
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <ButtonComponent
                label={"Add Comments"}
                // buttonBackgroundColor={"black"}
                background={"c4549c"}
                buttonHeight={"33px"}
                buttonWidth={"140px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"New"}
                // buttonBackgroundColor={"black"}
                background={
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`
                }
                buttonHeight={"33px"}
                buttonWidth={"80px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Save Credit Bureau"}
                // buttonBackgroundColor={"black"}
                background={
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`
                }
                buttonHeight={"33px"}
                buttonWidth={"170px"}
                buttonColor={"white"}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 0.5,
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
            border: "0.5px solid #e0dfe0",
          }}
        >
          <div>
            <HeaderComponent
              title={"Previous Credit Records"}
              // backgroundColor={"orange"}
              height={"35px"}
              color={"white"}
            />
          </div>
          <div>
            <SelectField
              label={"Received Credit Facility and paid on time"}
              labelWidth={"70%"}
            />
          </div>
          <div>
            <SelectField
              label={"Received Credit Facility and didn't pay on time"}
              labelWidth={"70%"}
            />
          </div>
          <div>
            <SelectField
              label={
                "Received Credit Facility that is past due and still outstanding"
              }
              labelWidth={"70%"}
            />
          </div>
          <div>
            <SelectField
              label={
                "Received Credit Facility that is still outstanding but performing"
              }
              labelWidth={"70%"}
            />
          </div>
          <div>
            <SelectField
              label={"Received Credit Facility that has been written off"}
              labelWidth={"70%"}
            />
          </div>
          <div>
            <SelectField
              label={
                "Received Credit Facility that has been negotiated for settlement"
              }
              labelWidth={"70%"}
            />
          </div>
        </div>
      </div> */}
      {/* <br />
      <div>
        <CustomTable
          headers={[
            "",
            "Bank Code",
            "Amount Granted",
            "Outstanding Amount",
            "Date Granted",
            "Maturity Date",
            "Status",
            "Type of Facility",
            "",
          ]}
        />
      </div>
      <br /> */}
      <div>
        <HeaderComponent
          title={"Debts in the Name of Other Companies"}
          height={"35px"}
        />
      </div>
      <div>
        <CustomTable
          headers={[
            "",
            "Bank Code",
            "Amount Granted",
            "Outstanding Amount",
            "Date Granted",
            "Maturity Date",
            "Status",
            "Type of Facility",
            "",
          ]}
        />
      </div>
    </div>
  );
};

export default BureauVer;
