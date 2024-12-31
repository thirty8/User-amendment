import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import SelectField from "../components/fields/SelectField";
import CustomTable from "../components/data-table/CustomTable";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import HeaderComponent from "../components/header/HeaderComponent";

const TodVerification = () => {
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
            alignItems: "center",
          }}
        >
          <div>
            <ListOfValue
              label={"Account Number"}
              labelWidth={"15%"}
              inputWidth={"20%"}
            />
          </div>
          <div>
            <ListOfValue
              label={"Branch"}
              labelWidth={"15%"}
              inputWidth={"40%"}
            />
          </div>
          <div>
            <InputField
              label={"Posted By"}
              labelWidth={"15%"}
              inputWidth={"40%"}
            />
          </div>
        </div>
        <br />
        {/* <div style={{ marginBottom: "3px" }}>CRA Credit Risk Analysis</div> */}
        <div>
          <HeaderComponent
            title={"TOD Verification"}
            height={"35px"}
            color={"white"}
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
              "Limit Number",
              "Account Number",
              "Description",
              "Type",
              "Amount",
              "Effective Date",
              "Expiry Date",
              "Posted By",
              "Click",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default TodVerification;
