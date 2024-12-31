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
import AccountSummary from "../../../../../components/others/AccountSummary";

const Summary = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <div
          style={{
            padding: "5px",
            border: "0.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            width: "35%",
            backgroundColor: "white",
            display: "flex",
          }}
        >
          <div>
            <InputField
              label={"Current Score / Grade"}
              labelWidth={"60%"}
              inputWidth={"40%"}
              disabled
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <ButtonComponent
              label={"View Details"}
              background={
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`
              }
              buttonHeight={"33px"}
              buttonWidth={"120px"}
              buttonColor={"white"}
            />
          </div>
        </div>
        <br />
        <div>
          <HeaderComponent
            title={"Customer Monthly Statistics"}
            height={"35px"}
          />
        </div>
        <div>
          <CustomTable
            headers={[
              "Date",
              "Best Balance",
              "Worst Balance",
              "Average Balance",
              "Debit Turnover",
              "Credit Turnover",
            ]}
          />
        </div>
        <br />
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 0.5 }}>
            <div>
              <HeaderComponent
                title={"Existing Facility Details"}
                height={"35px"}
              />
            </div>
            <div>
              <CustomTable
                headers={[
                  "Facility Type",
                  "Account Number",
                  "CCY",
                  "Rate",
                  "Limit",
                  "Current Balance",
                  "Expiry Date",
                ]}
              />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div>
              <HeaderComponent title={"Proposed Facility"} height={"35px"} />
            </div>
            <div>
              <CustomTable
                headers={[
                  "Facility Type",
                  "Currency",
                  "CCY",
                  "Amount",
                  "Period",
                ]}
              />
            </div>
          </div>
        </div>
        <br />
        <div>
          <HeaderComponent title={"Security Details"} height={"35px"} />
        </div>
        <div>
          <CustomTable
            headers={[
              "Reference Number",
              "Collateral Details",
              "CCY",
              "Market Value",
              "Current Value",
              "",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
