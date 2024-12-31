import React, { useState } from "react";
import Header from "../../../../../../components/others/Header/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import InputField from "../../../../../../components/others/Fields/InputField";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import axiosss from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import Swal from "sweetalert2";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const BudgetEnquiryModal = ({
  setApprovalModal,
  approvalDetails,
  handleRefresh,
}) => {
  const [postLoader, setPostLoader] = useState(false);
  const handleRadioButtons = (text) => {
    switch (text.toUpperCase()) {
      case "OPEN" || "O":
        return "O";
      case "FROZEN" || "F":
        return "F";
      case "CURRENT" || "C":
        return "C";
      case "BALANCE SHEET" || "BS":
        return "BS";
      case "PROFIT AND LOSS" || "PL":
        return "PL";
      default:
        break;
    }
  };
  return (
    <>
      <div className="mb-1">
        <Header
          closeIcon={
            <AiOutlineCloseCircle
              size={18}
              onClick={() => setApprovalModal(false)}
            />
          }
          title={"Budget Details"}
          backgroundColor={"#0580c0"}
        />
      </div>
      <div className="p-3">
        <div className="mb-2">
          <ActionButtons
            displayCancel={"none"}
            displayDelete={"none"}
            displayFetch={"none"}
            displayHelp={"none"}
            displayNew={"none"}
            displayRefresh={"none"}
            displayView={"none"}
            displayOk={"none"}
            displayAuthorise={"none"}
            displayReject={"none"}
            onExitClick={() => setApprovalModal(false)}
          />
        </div>
        <hr className="my-2" />
        <OverlayLoader
          postLoader={postLoader}
          // color={"#0580c0"}
          textColor={true}
          displayText={"Loading..."}
        />
        <div
          className="rounded-sm p-4 mt-1 mb-3  flex flex-col gap-5"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <InputField
                label={"Budget Code"}
                disabled={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                value={approvalDetails.budget_code ?? ""}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Budget Description"}
                disabled={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                value={approvalDetails.budget_descrp ?? ""}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <InputField
                label={"Budget Title"}
                disabled={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                value={approvalDetails.budget_title ?? ""}
              />
            </div>
            <div className="w-1/2">
              <RadioButtons
                label={"Budget Type"}
                labelWidth={"30%"}
                name={"budget_type"}
                id={"balanceSheet"}
                radioLabel={"Balance Sheet"}
                display={true}
                id2={"profitandloss"}
                radioLabel2={"Profit and Loss"}
                display2={true}
                value={"BS"}
                disabled={true}
                checked={
                  handleRadioButtons(approvalDetails.budget_type) === "BS"
                }
                value2={"PL"}
                checked2={
                  handleRadioButtons(approvalDetails.budget_type) === "PL"
                }
                // onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="flex items-center gap-5 ">
            <div className="w-1/2">
              <RadioButtons
                label={"Budget Status"}
                labelWidth={"30%"}
                name={"budget_status"}
                id={"open"}
                radioLabel={"Open"}
                display={true}
                id2={"frozen"}
                radioLabel2={"Frozen"}
                display2={true}
                id3={"current"}
                radioLabel3={"Current"}
                display3={true}
                disabled={true}
                value={"O"}
                checked={
                  handleRadioButtons(approvalDetails.budget_status) === "O"
                }
                value2={"F"}
                checked2={
                  handleRadioButtons(approvalDetails.budget_status) === "F"
                }
                value3={"C"}
                checked3={
                  handleRadioButtons(approvalDetails.budget_status) === "C"
                }
                // onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Budget Year"}
                disabled={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                value={approvalDetails.budget_year ?? ""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetEnquiryModal;
