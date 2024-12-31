import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputField from "../../components/fields/InputField";
import CustomTable from "../../components/data-table/CustomTable";
import TextAreaField from "../../components/fields/TextArea";

const Comment = ({ setOtherDetailsModal }) => {
  return (
    <div style={{ zoom: 0.9 }}>
      <div>
        <HeaderComponent
          title={"Loan Comments"}
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
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <HeaderComponent title={"Enter Comment"} height={"35px"} />
        <div style={{ padding: "20px" }}>
          <TextAreaField
            cols={165}
            rows={4}
            value={""}
            //   onChange={(e) => {
            //     setOtherPurpose(e.target.value);
            //   }}
          />
        </div>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <div>
          <ButtonComponent
            label={"Clear"}
            // buttonIcon={<HiViewfinderCircle size={20} />}
            buttonWidth={"90px"}
            buttonHeight={"33px"}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Save"}
            // buttonIcon={<HiViewfinderCircle size={20} />}
            buttonWidth={"90px"}
            buttonHeight={"33px"}
          />
        </div>
        <div></div>
      </div>
      <br />
      <div>
        <HeaderComponent title={"Comments"} height={"35px"} />
      </div>
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={["", "Comment", "Comment Date", "Time", "Posted By"]}
        />
      </div>
    </div>
  );
};

export default Comment;
