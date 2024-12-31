import React, { useState } from "react";
import Header from "../../../../../../components/others/Header/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import InputField from "../../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import AccountInputs from "./accountInputs";
import MonthsInput from "./monthsInput";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { handleRadioButtons } from "../../../components/helpers";

const GlobalMaintenance = ({ setApprovalModal, budgetDetails }) => {
  const [rows, setRows] = useState([{}, {}, {}, {}, {}, {}]);
  const [batchDescription, setBatchDescription] = useState("");
  const [budgetPostingType, setBudgetPostingType] = useState("");

  function addNewRow() {
    setRows((prev) => [...prev, {}]);
  }

  console.log(budgetDetails, "budgetDetails");
  return (
    <div>
      <div className="mb-1">
        <Header
          closeIcon={
            <AiOutlineCloseCircle
              size={18}
              onClick={() => setApprovalModal(false)}
            />
          }
          title={"GL Budget Global Maintenance"}
          backgroundColor={"#0580c0"}
        />
      </div>
      <div className="p-2">
        <div className="mb-1">
          <ActionButtons
            displayCancel={"none"}
            displayDelete={"none"}
            displayFetch={"none"}
            displayHelp={"none"}
            displayNew={"none"}
            displayReject={"none"}
            displayView={"none"}
            displayAuthorise={"none"}
            onExitClick={() => setApprovalModal(false)}
            // onAuthoriseClick={() => ApproveBudget("AY")}
            // onRejectClick={() => ApproveBudget("AR")}
          />
        </div>
        {/* <hr className="mb-1" /> */}
        {/* <OverlayLoader
          postLoader={postLoader}
          // color={"#0580c0"}
          textColor={true}
          displayText={"Loading..."}
        /> */}
        <div className="mb-1">
          <Header title={"Budget Details"} headerShade={true} />
        </div>
        <div
          className="rounded-sm p-4 mt-1 mb-2  flex flex-col gap-3"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <RadioButtons
                required={true}
                label={"Budget Posting Type"}
                labelWidth={"30%"}
                name={"budget_posting_type"}
                id={"new"}
                radioLabel={"New / Overwrite"}
                display={true}
                id2={"adjustment"}
                radioLabel2={"Adjustment"}
                display2={true}
                value={"O"}
                checked={budgetPostingType === "O"}
                value2={"A"}
                checked2={budgetPostingType === "A"}
                onChange={(e) => setBudgetPostingType(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Batch Description"}
                required={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                onChange={(e) => setBatchDescription(e.target.value)}
                value={batchDescription}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <InputField
                label={"Budget Code"}
                disabled={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                value={
                  budgetDetails.budget_code +
                    " - " +
                    budgetDetails.budget_descrp ?? ""
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Budget Title"}
                disabled={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                value={budgetDetails.budget_title ?? ""}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
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
                disabled={true}
                value={"BS"}
                checked={handleRadioButtons(budgetDetails.budget_type) === "BS"}
                value2={"PL"}
                checked2={
                  handleRadioButtons(budgetDetails.budget_type) === "PL"
                }
                // onChange={(e) => handleChange(e)}
              />
            </div>
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
                value={"O"}
                disabled={true}
                checked={
                  handleRadioButtons(budgetDetails.budget_status) === "O"
                }
                value2={"F"}
                checked2={
                  handleRadioButtons(budgetDetails.budget_status) === "F"
                }
                value3={"C"}
                checked3={
                  handleRadioButtons(budgetDetails.budget_status) === "C"
                }
                // onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <InputField
                label={"Budget Year"}
                disabled={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                value={budgetDetails.budget_year ?? ""}
              />
            </div>
            <div className="w-1/2"></div>
          </div>
        </div>
        <div className="mb-1">
          <Header title={"Budget Details"} headerShade={true} />
        </div>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            paddingBottom: "10px",
            borderRadius: "2px",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="w-full "
            // className="flex flex-1 h-[25px] sticky top-0 bg-[#0580c0] items-center text-white"
            // style={{
            //   display: "flex",
            //   height: "25px",
            //   flex: 1,
            //   position: "sticky",
            //   top: 0,
            //   backgroundColor: "whitesmoke",
            //   color: "white",
            //   alignItems: "center",
            //   background: "#0580c0",
            // }}
          >
            {/* <span className="w-[1000px]">Account Description</span>
            <span className="w-[1000px]">Control Amount</span>
            <span className="w-[1000px]">Distributed Amount</span>
            <span className="w-[1000px]">Jan</span>
            <span className="w-[1000px]">Feb</span>
            <span className="w-[1000px]">Mar</span>
        <span className="w-[1000px]">Apr</span>
            <span className="w-[1000px]">May</span>
            <span className="w-[1000px]">Jun</span>
            <span className="w-[1000px]">Jul</span>
            <span className="w-[1000px]">Aug</span>
            <span className="w-[1000px]">Sep</span>
            <span className="w-[1000px]">Oct</span>
            <span className="w-[1000px]">Nov</span>
            <span className="w-[1000px]">Dec</span> */}
            {/* <div>
              <AccountInputs />
            </div> */}
            <div className="flex  overflow-x-scroll">
              <MonthsInput
                rows={rows}
                addNewRow={addNewRow}
                budget_type={handleRadioButtons(budgetDetails.budget_type)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 p-1">
          <ButtonComponent label={"Replicate"} buttonWidth={"100px"} />
          <ButtonComponent label={"Adjust Row Amounts"} buttonWidth={"200px"} />
        </div>
      </div>
    </div>
  );
};

export default GlobalMaintenance;
