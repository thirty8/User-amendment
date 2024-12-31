import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField.jsx";
import ListOfValue from "../fields/ListOfValue";
import SelectField from "../fields/SelectField.jsx";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import Swal from "sweetalert2";

const Bureau = (props) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [paidOnTime, setPaidOnTime] = useState("N");
  const [pastDue, setPastDue] = useState("N");
  const [negotiated, setNegotiated] = useState("N");
  const [writtenOff, setWrittenOff] = useState("N");
  const [outstanding, setOutstanding] = useState("N");
  const [notPayOnTime, setNotPayOnTime] = useState("N");

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const handlePrev = () => {
    props.collTab();
  };
  return (
    <div className="h-[495px] overflow-y-scroll">
      <div style={{ display: "flex", gap: "5px", flex: 1 }}>
        <div
          style={{
            flex: 0.5,
            padding: "10px",
            // borderRadius: "5px",
            // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            // backgroundColor: "white",
            border: "0.5px solid #e0dfe0",
          }}
        >
          <div>
            <HeaderComponent
              title={"External Credit Bureau Details"}
              height={"35px"}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <div style={{ borderBottom: "0.5px solid #828083" }}>
              <h6>Enquiry made within the last 12 months</h6>
            </div>
          </div>
          <div>
            <InputField
              label={"Number of enquiry made on behalf of this customer"}
              // labelWidth={"59%"}
              inputWidth={"100%"}
              required
            />
          </div>
          <div>
            <InputField
              label={"Number of banks that have enquired about this customer"}
              inputWidth={"100%"}
              // labelWidth={"100%"}
              required
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Printed Date"}
              // labelWidth={"58%"}
              inputWidth={"100%"}
              required
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Expiry Date"}
              // labelWidth={"58%"}
              inputWidth={"100%"}
              required
            />
          </div>
          <br />
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}
          >
            <div>
              <ButtonComponent
                label={"Add Comments"}
                buttonBackgroundColor={"black"}
                background={"c4549c"}
                buttonHeight={"33px"}
                buttonWidth={"120px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"New"}
                buttonBackgroundColor={"black"}
                buttonHeight={"33px"}
                buttonWidth={"60px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Save Credit Bureau"}
                // buttonBackgroundColor={"black"}
                buttonBackgroundColor={"#42ba2c"}
                buttonHeight={"33px"}
                buttonWidth={"150px"}
                buttonColor={"white"}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 0.5,
            padding: "10px",
            border: "0.5px solid #e0dfe0",
          }}
        >
          <div>
            <HeaderComponent
              title={"Previous Credit Records"}
              height={"35px"}
            />
          </div>
          <div>
            <SelectField
              label={"Received Credit Facility and paid on time"}
              // labelWidth={"70%"}
              lovdata={[
                { label: "Yes", value: "Y" },
                { label: "No", value: "N" },
              ]}
              inputWidth={"100%"}
              value={paidOnTime}
              onChange={(value) => {
                setPaidOnTime(value);
              }}
            />
          </div>
          <div>
            <SelectField
              label={"Received Credit Facility and didn't pay on time"}
              // labelWidth={"70%"}
              lovdata={[
                { label: "Yes", value: "Y" },
                { label: "No", value: "N" },
              ]}
              inputWidth={"100%"}
              value={notPayOnTime}
              onChange={(value) => {
                setNotPayOnTime(value);
              }}
            />
          </div>
          <div>
            <SelectField
              label={
                "Received Credit Facility that is past due and still outstanding"
              }
              // labelWidth={"70%"}
              lovdata={[
                { label: "Yes", value: "Y" },
                { label: "No", value: "N" },
              ]}
              inputWidth={"100%"}
              value={pastDue}
              onChange={(value) => {
                setPastDue(value);
              }}
            />
          </div>
          <div>
            <SelectField
              label={
                "Received Credit Facility that is still outstanding but performing"
              }
              // labelWidth={"70%"}
              lovdata={[
                { label: "Yes", value: "Y" },
                { label: "No", value: "N" },
              ]}
              inputWidth={"100%"}
              value={outstanding}
              onChange={(value) => {
                setOutstanding(value);
              }}
            />
          </div>
          <div>
            <SelectField
              label={"Received Credit Facility that has been written off"}
              // labelWidth={"70%"}
              lovdata={[
                { label: "Yes", value: "Y" },
                { label: "No", value: "N" },
              ]}
              inputWidth={"100%"}
              value={writtenOff}
              onChange={(value) => {
                setWrittenOff(value);
              }}
            />
          </div>
          <div>
            <SelectField
              label={
                "Received Credit Facility that has been negotiated for settlement"
              }
              // labelWidth={"70%"}
              lovdata={[
                { label: "Yes", value: "Y" },
                { label: "No", value: "N" },
              ]}
              inputWidth={"100%"}
              value={negotiated}
              onChange={(value) => {
                setNegotiated(value);
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <div>
        {/* <DataTable
              columns={[
                "Bank Code",
                "Amount Granted",
                "Outstanding Amount",
                "Date Granted",
                "Maturity Date",
                "Status",
                "Type of Facility",
              ]}
            /> */}
        <CustomTable
          headers={[
            "Bank Code",
            "Amount Granted",
            "Outstanding Amount",
            "Date Granted",
            "Maturity Date",
            "Status",
            "Type of Facility",
          ]}
        />
      </div>
      <br />
      <div>Debts in the Name of Other Companies</div>
      <div>
        {/* <DataTable
              columns={[
                "Bank Code",
                "Amount Granted",
                "Outstanding Amount",
                "Date Granted",
                "Maturity Date",
                "Status",
                "Type of Facility",
              ]}
            /> */}
        <CustomTable
          headers={[
            "Bank Code",
            "Amount Granted",
            "Outstanding Amount",
            "Date Granted",
            "Maturity Date",
            "Status",
            "Type of Facility",
          ]}
        />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <ButtonComponent
            label={"Previous"}
            buttonBackgroundColor={"#d4e2ff"}
            buttonColor={"blue"}
            buttonHeight={"40px"}
            buttonWidth={"150px"}
            onClick={handlePrev}
          />
        </div>
        <div>
          {/* <ButtonComponent
            label={"Next"}
            background={"#c4549c"}
            buttonColor={"white"}
            buttonHeight={"40px"}
            buttonWidth={"150px"}
            onClick={empTab}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Bureau;
