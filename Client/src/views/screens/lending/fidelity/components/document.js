import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputField from "../../components/fields/InputField";
import CustomTable from "../../components/data-table/CustomTable";

const Document = ({ setOtherDetailsModal }) => {
  return (
    <div style={{ zoom: 0.9 }}>
      <div>
        <HeaderComponent
          title={"Documents Details"}
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
        <HeaderComponent title={"Document"} height={"35px"} />
      </div>
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={[
            "Sr No",
            "Document Type",
            "Presented Doc.",
            "Document Code",
            "Document No",
            "",
            "Scan Date",
            "Expiry Date",
            "Mand.",
            "Received Date",
            "Receiver",
          ]}
        />
      </div>
      <br />
      <div>
        <HeaderComponent title={"Other Documents"} height={"35px"} />
      </div>
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={[
            "Document Reference",
            "",
            "Document Name",
            "Posted By",
            "Posting Date",
          ]}
        />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <div>
          <ButtonComponent
            label={"Add Other Document"}
            buttonWidth={"170px"}
            buttonHeight={"33px"}
          />
        </div>
        <div>
          <ButtonComponent
            label={"View A/C Creation Docs"}
            buttonWidth={"190px"}
            buttonHeight={"33px"}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Print Sanction Letter"}
            buttonWidth={"170px"}
            buttonHeight={"33px"}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Print Facility Letter"}
            buttonWidth={"160px"}
            buttonHeight={"33px"}
          />
        </div>
      </div>
    </div>
  );
};

export default Document;
