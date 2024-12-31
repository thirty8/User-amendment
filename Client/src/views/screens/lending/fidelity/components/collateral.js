import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputField from "../../components/fields/InputField";
import CustomTable from "../../components/data-table/CustomTable";

const Collateral = ({ setOtherDetailsModal }) => {
  return (
    <div style={{ zoom: 0.9 }}>
      <div>
        <HeaderComponent
          title={"Collateral Details"}
          height={"35px"}
          backgroundColor={"#0063d1"}
          color={"white"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        <ButtonComponent
          label={"Return"}
          // buttonIcon={<HiViewfinderCircle size={20} />}
          buttonWidth={"90px"}
          buttonHeight={"33px"}
          buttonBackgroundColor={"red"}
          onClick={() => {
            setOtherDetailsModal(false);
          }}
        />
      </div>
      <div>
        <HeaderComponent title={"Collateral"} height={"35px"} />
      </div>
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={[
            "Collateral No",
            "Collateral Type",
            "Covered (%)",
            "Collateral Amount",
            "Loan Amount",
            "Amount Available",
            "Amount Utilized",
            "",
          ]}
        />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <InputField label={"Coverage %"} disabled />
        </div>
        <div>
          <InputField label={"Loan Amount"} disabled />
        </div>
        <div>
          <InputField label={"Total Collateral"} disabled />
        </div>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <div
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            width: "50%",
          }}
        >
          <HeaderComponent title={"Other Approvers"} height={"35px"} />
          <CustomTable headers={["Approved By", "Approved Date"]} />
        </div>
      </div>
    </div>
  );
};

export default Collateral;
