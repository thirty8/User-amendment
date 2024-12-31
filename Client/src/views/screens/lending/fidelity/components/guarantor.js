import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputField from "../../components/fields/InputField";
import CustomTable from "../../components/data-table/CustomTable";

const Guarantor = ({ setOtherDetailsModal }) => {
  return (
    <div style={{ zoom: 0.9 }}>
      <div>
        <HeaderComponent
          title={"Guarantor's Details"}
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
        <HeaderComponent title={"Guarantors"} height={"35px"} />
      </div>
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={[
            "Guarantors ID",
            "Applicant No",
            "Guarantors Name",
            "Relationship",
            "End Of Service Benefit",
            "Net Monthly Income",
          ]}
        />
      </div>
      <br />
      <div>
        <HeaderComponent title={"Guarantor Details"} height={"35px"} />
      </div>
      <div
        style={{
          display: "flex",
          // marginTop: "15px",
          padding: "10px",
          borderRadius: "5px",
          border: "2.5px solid #d6d7d9",
        }}
      >
        <div
          style={{
            flex: 0.5,
            // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
          }}
        >
          <div>
            <InputField
              label={"Guarantor's Account with Bank"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              disabled
              //   value={guaAcct}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's ID Type"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              disabled
              //   value={idType}
            />
          </div>
          <div>
            <InputField
              label={"ID Number"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={idNo}
            />
          </div>
          <div>
            <InputField
              // type={"date"}
              label={"ID Issue Date"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={idIssueDate}
            />
          </div>
          <div>
            <InputField
              // type={"date"}
              label={"ID Expiry Date"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={idExpiryDate}
            />
          </div>
          <div>
            <InputField
              // type={"date"}
              label={"Date of Incorperation/Birth"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={dateBirth}
            />
          </div>
          <div>
            <InputField
              label={"Place of Birth"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              disabled
              //   value={placeBirth}
            />
          </div>
          <div>
            <InputField
              label={"Residential Address "}
              labelWidth={"35%"}
              inputWidth={"50%"}
              disabled
              //   value={residentialAdd}
            />
          </div>
          <div>
            <InputField
              label={"Postal / Digital Address"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              disabled
              //   value={postalAdd}
            />
          </div>
        </div>
        <div
          style={{
            flex: 0.5,
            // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
          }}
        >
          <div>
            <InputField
              // type={"date"}
              label={"Residence Since"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={residenceSince}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Phone Number"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={telephone}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Occupation"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              disabled
              //   value={occupation}
            />
          </div>
          <div>
            <InputField
              // type={"date"}
              label={"Employed Since"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={employedSince}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Position"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={position}
            />
          </div>
          <div>
            <InputField
              label={"End of Service Benefit"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              disabled
              //   value={endService}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Net Monthly Income"}
              labelWidth={"35%"}
              inputWidth={"25%"}
              disabled
              //   value={netIncome}
            />
          </div>
          <div>
            <InputField
              label={"Email"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              disabled
              //   value={email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guarantor;
