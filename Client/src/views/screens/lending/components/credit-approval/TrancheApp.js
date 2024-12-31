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
import { API_SERVER } from "../../../../../config/constant";

const TranchesApp = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  return (
    <div style={{ padding: "10px" }}>
      {/* <div>
            <HeaderComponent title={"Syndicate Tranches"} />
          </div>
          <br />
          <div style={{ padding: "60px" }}>
            <DataTable
              columns={["Seq. Number", "Narration", "Due Date", "%", "Amount"]}
            />
          </div> */}
      <div>
        <HeaderComponent
          title={"Syndicate Tranches"}
          height={"35px"}
          color={"white"}
        />
      </div>
      <div style={{ padding: "60px" }}>
        <div
          style={{
            height: "40px",
            width: "100%",
            display: "flex",
            padding: "10px",
            borderRadius: "3px",
            color: "white",
            background: "#0580c0",
          }}
        >
          <div style={{ flex: 0.15, marginLeft: "50px" }}>SEQ NUMBER</div>
          <div style={{ flex: 0.35, marginLeft: "230px" }}>NARRATION</div>
          <div style={{ flex: 0.2 }}>DUE DATE</div>
          <div style={{ flex: 0.14 }}>%</div>
          <div style={{ flex: 0.1 }}>AMOUNT</div>
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"X"}
              buttonBackgroundColor={"#ffcbc8"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
          <div style={{ marginTop: "-10px", marginRight: "" }}>
            <InputField inputWidth={"80px"} disabled />
          </div>
          <div style={{ marginTop: "-10px" }}>
            <InputField inputWidth={"590px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} type={"date"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"+"}
              buttonBackgroundColor={"#6faf5e"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"X"}
              buttonBackgroundColor={"#ffcbc8"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
          <div style={{ marginTop: "-10px", marginRight: "" }}>
            <InputField inputWidth={"80px"} disabled />
          </div>
          <div style={{ marginTop: "-10px" }}>
            <InputField inputWidth={"590px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} type={"date"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"+"}
              buttonBackgroundColor={"#6faf5e"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"X"}
              buttonBackgroundColor={"#ffcbc8"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
          <div style={{ marginTop: "-10px", marginRight: "" }}>
            <InputField inputWidth={"80px"} disabled />
          </div>
          <div style={{ marginTop: "-10px" }}>
            <InputField inputWidth={"590px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} type={"date"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"+"}
              buttonBackgroundColor={"#6faf5e"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            border: "1.5px solid #d6d7d9",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          <div style={{ flex: 0.2 }}>
            <InputField
              label={"Count"}
              disabled
              inputWidth={"95px"}
              labelWidth={"30%"}
            />
          </div>
          <div style={{ flex: 0.45 }}>
            <InputField
              label={"Difference (Loan Amount - Total Amount)"}
              labelWidth={"50%"}
              inputWidth={"190px"}
              disabled
            />
          </div>
          <div
            style={{
              display: "flex",
              flex: 0.3,
            }}
          >
            <div style={{ flex: 0.65 }}>
              <InputField
                label={"Total"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                // fontSize={"85%"}
              />
            </div>
            <div style={{ flex: 0.35 }}>
              <InputField inputWidth={"100%"} disabled />
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* <br /> */}
      <div>
        <ButtonComponent
          label={"Add Comments"}
          // buttonBackgroundColor={"black"}
          background={"#c4549c"}
          buttonHeight={"40px"}
          buttonWidth={"130px"}
          buttonColor={"white"}
        />
      </div>
    </div>
  );
};

export default TranchesApp;
