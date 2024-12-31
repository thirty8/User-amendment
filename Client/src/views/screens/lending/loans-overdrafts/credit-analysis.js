import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import SelectField from "../components/fields/SelectField";
import CustomTable from "../components/data-table/CustomTable";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import HeaderComponent from "../components/header/HeaderComponent";

const CreditAnalysis = () => {
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
                label={"Customer Number"}
                labelWidth={"30%"}
                inputWidth={"50%"}
              />
            </div>
            <div>
              <InputField
                label={"Customer Name"}
                labelWidth={"30%"}
                inputWidth={"50%"}
              />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div>
              <InputField
                label={"Loan Application Number"}
                labelWidth={"30%"}
                inputWidth={"30%"}
              />
            </div>
            <div>
              <ListOfValue
                label={"Branch"}
                labelWidth={"30%"}
                inputWidth={"50%"}
              />
            </div>
          </div>
        </div>
        <br />
        <div>
          <HeaderComponent
            title={"Credit Analysis"}
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
              "Customer ID",
              "Loan Application Number",
              "Phone",
              "Date of Incorp.",
              "Agreed Amount",
              "Recommended By",
              "Application Status",
              "",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditAnalysis;