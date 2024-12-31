import React from "react";
import ScreenBase from "./ScreenBase";
import { FaUserTimes } from "react-icons/fa/index.esm";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
// import DataTable from "../components-updated/DataTable";
// import ListOfValue from "../components-updated/ListOfValue";
import { Flex } from "@mantine/core";
// import { width } from "@mui/system";
import { red } from "@mui/material/colors";
import ButtonType from "../../../../../components/others/Button/ButtonType"


function Index_approval() {
  return (
    <div>
      <ScreenBase
        // header_title={"BLOCKAGE AND LIMITS MAINTENANCE-APPROVAL"}
        // header_icon={<FaUserTimes />}
        card_div1a={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "20%", marginLeft: "1%" }}>
              <ButtonComponent
                label={"Sig. Ver"}
                buttonColor={"white"}
                buttonBackgroundColor="rgb(21 163 183)"
              />
            </div>
            <div style={{ borderColor: "white" }}>
            <ButtonType
              label={"Click to confirm all Details"}
              type={"checkbutton"}
              />
            </div>
          </div>
        }
        card_div2a={
          <div>
            <div style={{ display: "flex", width: "100%" , marginTop:"15px"}}>
              <div style={{ width: "50%", marginBottom: "15px", flex:"0.5" }}>
                <InputField
                  style={{}}
                  label="Account Number  : "
                  labelWidth={"40%"}
                  inputWidth={"58%"}
                />
              </div>

              <div style={{ width: "50%", marginBottom: "15px",  flex:"0.5"  }}>
                <InputField
                  disabled={true}
                  labelWidth={"40"}
                  inputWidth={"80%"}
                />
              </div>
            </div>

            <div>
              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label="Product Group   : "
                  labelWidth={"20%"}
                  required={false}
                  inputWidth="60%"
                  disabled={true}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label=" Product Sub Group  : "
                  placeeholder={"you"}
                  labelWidth={"20%"}
                  type="number"
                  required={false}
                  inputWidth="70%"
                  disabled={true}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label="Currency  : "
                  labelWidth={"20%"}
                  required={false}
                  inputWidth="40%"
                  disabled={true}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label=" Original A/c Status: "
                  placeeholder={"you"}
                  labelWidth={"20%"}
                  type="number"
                  required={false}
                  inputWidth="60%"
                  disabled={true}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label="  Change Status : "
                
                  labelWidth={"20%"}
                  type="number"
                  required={false}
                  inputWidth="60%"
                  disabled={true}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label="Blockage Reason: "
                  labelWidth={"20%"}
                  required={false}
                  type="textarea"
                  inputWidth="80%"
                  id={"otherreason_id"}
                  disabled={true}
                  // disabled={ reason === "999"? false: true}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label="Blockage Other Reasons: "
                  labelWidth={"20%"}
                  required={false}
                  type="textarea"
                  inputWidth="80%"
                  id={"otherreason_id"}
                  disabled={true}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label=" Authoriser : "
                  placeeholder={"you"}
                  labelWidth={"20%"}
                  type="number"
                  required={false}
                  inputWidth="50%"
                  disabled={true}
                  // disabled={ stat === "VL"? false: true}
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Index_approval;
