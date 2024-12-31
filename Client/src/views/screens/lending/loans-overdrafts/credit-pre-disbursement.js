import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import SelectField from "../components/fields/SelectField";
import CustomTable from "../components/data-table/CustomTable";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import HeaderComponent from "../components/header/HeaderComponent";

const CreditPreDisbursement = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    <div style={{ zoom: 0.9 }}>
      <div style={{ padding: "10px" }}>
        <ActionButtons displayFetch={"none"} />
        <br />
        <div
          style={{
            padding: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
            display: "flex",
          }}
        >
          <div style={{ flex: 0.5 }}>
            <div>
              <InputField
                label={"Application Number"}
                labelWidth={"30%"}
                inputWidth={"30%"}
              />
            </div>
            <div>
              <InputField
                label={"Applicant Name"}
                labelWidth={"30%"}
                inputWidth={"60%"}
              />
            </div>
            <div>
              <ListOfValue
                label={"Branch"}
                labelWidth={"30%"}
                inputWidth={"60%"}
              />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div>
              <InputField
                label={"Amount"}
                labelWidth={"20%"}
                inputWidth={"30%"}
              />
            </div>
            <div>
              <InputField
                label={"Action By"}
                labelWidth={"20%"}
                inputWidth={"50%"}
              />
            </div>
            <div>
              <ListOfValue
                label={"Channel"}
                labelWidth={"20%"}
                inputWidth={"50%"}
              />
            </div>
          </div>
        </div>
        <br />
        <div>
          <HeaderComponent
            title={"Pre Disbursement Approval"}
            height={"35px"}
          />
        </div>
        <div>
          {/* <DataTable
            columns={[
              "Customer ID",
              "Loan Application Number",
              "Phone",
              "Date of Incorp.",
              "Agreed Amount",
              "Recommended By",
              "Application Status",
            ]}
          /> */}
          <CustomTable
            headers={[
              "Application Number",
              "Loan Type",
              "Currency",
              "Applicant Name",
              "Requested Amount",
              "Source Branch",
              "Age",
              "Date",
              "Channel",
              "Action By",
              "Click",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditPreDisbursement;
