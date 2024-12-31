import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputField from "../../components/fields/InputField";
import CustomTable from "../../components/data-table/CustomTable";

const Bureau = ({ setOtherDetailsModal }) => {
  return (
    <div style={{ zoom: 0.9 }}>
      <div>
        <HeaderComponent
          title={"Bureau Details"}
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
      <div
        style={{
          display: "flex",
          gap: "10px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <div style={{ flex: 0.5, border: "1px solid #d6d7d9" }}>
          <div>
            <HeaderComponent
              title={"External Credit Bureau Details"}
              height={"35px"}
            />
          </div>
          <div>
            <InputField
              label={"Number of enquiries made on behalf of this customer"}
              inputWidth={"20%"}
              labelWidth={"80%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Number of banks that have enquired about this customer"}
              inputWidth={"20%"}
              labelWidth={"80%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Printed Date"}
              inputWidth={"20%"}
              labelWidth={"80%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Expiry Date"}
              inputWidth={"20%"}
              labelWidth={"80%"}
              disabled
            />
          </div>
        </div>
        <div style={{ flex: 0.5, border: "1px solid #d6d7d9" }}>
          <div>
            <HeaderComponent
              title={"Previous Credit Records"}
              height={"35px"}
            />
          </div>
          <div>
            <InputField
              label={"Received credit facility and paid on time"}
              inputWidth={"20%"}
              labelWidth={"80%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Received credit facility and didn't pay on time"}
              inputWidth={"20%"}
              labelWidth={"80%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={
                "Received credit facility that is past due and still outstanding"
              }
              inputWidth={"20%"}
              labelWidth={"80%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={
                "Received credit facility that is still outstanding but performing"
              }
              inputWidth={"20%"}
              labelWidth={"80%"}
              disabled
            />
          </div>
        </div>
      </div>
      <br />
      <div>
        <HeaderComponent title={""} height={"35px"} />
      </div>
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={[
            "Bank(s)",
            "Amount Granted",
            "Outstanding Amount",
            "Date Granted",
            "Maturity Date",
            "Status",
            "Type Of Facility",
          ]}
        />
      </div>
      <br />
      <div>
        <HeaderComponent
          title={"Debts in the Name Of Other Companies"}
          height={"35px"}
        />
      </div>
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={[
            "Bank(s)",
            "Amount Granted",
            "Outstanding Amount",
            "Date Granted",
            "Maturity Date",
            "Status",
            "Type Of Facility",
          ]}
        />
      </div>
    </div>
  );
};

export default Bureau;
