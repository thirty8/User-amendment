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

const CollateralVer = () => {
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
      {/* <div
        style={{
          display: "flex",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          backgroundColor: "white",
          border: "1.5px solid #d6d7d9",
        }}
      >
        <div style={{ flex: 0.7 }}>
          <div>
            <ListOfValue
              label={"Collateral Number"}
              labelWidth={"25%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              label={"Total Amount"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Collateral Amount"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Amount Available to Use"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Amount Utilized"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              disabled
            />
          </div>
        </div>
        <div
          style={{
            flex: 0.3,
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
            height: "120px",
            border: "0.5px solid #e0dfe0",
            marginTop: "45px",
          }}
        >
          <div>
            <InputField
              label={"Coverage %"}
              labelWidth={"35%"}
              inputWidth={"50%"}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <InputField
              label={"Loan Amount"}
              labelWidth={"35%"}
              inputWidth={"50%"}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          backgroundColor: "white",
          border: "1.5px solid #d6d7d9",
          marginTop: "15px",
        }}
      >
        <div style={{ flex: 0.34 }}>
          <InputField
            label={"Loan Percentage Coverage"}
            labelWidth={"50%"}
            inputWidth={"50%"}
            disabled
            required
          />
        </div>
        <div style={{ flex: 0.33 }}>
          <InputField
            label={"Amount to be Utilized"}
            labelWidth={"40%"}
            inputWidth={"50%"}
            required
          />
        </div>
        <div style={{ flex: 0.33 }}>
          <InputField
            label={"Amount Available"}
            labelWidth={"40%"}
            inputWidth={"50%"}
            disabled
            required
          />
        </div>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 0.2 }}></div>
        <div
          style={{
            flex: 0.6,
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <ButtonComponent
              label={"Add Comments"}
              // buttonBackgroundColor={"black"}
              background={"#c4549c"}
              buttonHeight={"33px"}
              buttonWidth={"140px"}
              buttonColor={"white"}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Add Other Comments"}
              // buttonBackgroundColor={"black"}
              background={"#c4549c"}
              buttonHeight={"33px"}
              buttonWidth={"180px"}
              buttonColor={"white"}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Save"}
              // buttonBackgroundColor={"black"}
              background={"#6faf5e"}
              buttonHeight={"33px"}
              buttonWidth={"70px"}
              buttonColor={"white"}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Clear Record"}
              // buttonBackgroundColor={"black"}
              background={"black"}
              buttonHeight={"33px"}
              buttonWidth={"130px"}
              buttonColor={"white"}
            />
          </div>
        </div>
        <div style={{ flex: 0.2 }}></div>
      </div> */}
      {/* <br /> */}
      <HeaderComponent title={"Collateral Details"} height={"35px"} />
      <div>
        <CustomTable
          headers={[
            "",
            "Sr No",
            "Collateral Number",
            "Collateral Type",
            "Collateral Amount",
            "Loan Amount",
            "Loan % Covered",
            "Amount Utilized",
            "",
          ]}
          // data={collateralArr}
        />
      </div>
    </div>
  );
};

export default CollateralVer;
