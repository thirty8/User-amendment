import React from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import { VscClose } from "react-icons/vsc";
import { AiOutlineDoubleRight } from "react-icons/ai";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";

function Document_Details_Rows() {
  return (
    <div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div style={{ flex: 0.35 }}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.02 }}>
              <ButtonComponent
                buttonIcon={<VscClose size={20} />}
                buttonHeight={"25px"}
              />
            </div>
            <div style={{ flex: 0.97 }}>
              <ListOfValue marginRight={"5px"} inputWidth={"100%"} />
            </div>
          </div>
        </div>
        <div style={{ flex: 0.1 }}>
          <div style={{ flex: 1 }}>
            <InputField inputWidth={"95%"} noMarginRight={true} />
          </div>
        </div>
        <div style={{ flex: 0.15 }}>
          <div style={{ flex: 1 }}>
            <InputField inputWidth={"95%"} noMarginRight={true} />
          </div>
        </div>
        <div style={{ flex: 0.4 }}>
          <InputField inputWidth={"98%"} noMarginRight={true} />
        </div>
        {/* <div style={{ flex: 0.035 }}>
          <div style={{ display: "grid", placeItems: "center" }}>
            <ButtonComponent
              buttonIcon={<AiOutlineDoubleRight size={20} />}
              buttonHeight={"25px"}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Document_Details_Rows;
