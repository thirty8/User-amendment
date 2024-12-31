import React from "react";
import Header from "../../../../../../components/others/Header/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import InputField from "../../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import {
  formatNumber2dp,
  handleExitClick,
  handleRadioButtons,
} from "../../../components/helpers";
import CustomTable from "../../../../teller-ops/components/CustomTable";

const GlobalBudgetEnqModal = ({
  setApprovalModal,
  setBudFlag,
  getBudgetGLsDetails,
  approvalDetails,
  approvalDetails2,
  budFlag,
  budgetTotals,
}) => {
  return (
    <>
      <div className="mb-1">
        <Header
          closeIcon={true}
          // closeIcon={
          //   <AiOutlineCloseCircle
          //     size={18}
          //     onClick={() => setApprovalModal(false)}
          //   />
          // }
          handleClose={() => setApprovalModal(false)}
          title={"Global Budget Details"}
          backgroundColor={"#0580c0"}
        />
      </div>
      <div className="p-3">
        {/* <div className="mb-1">
          <Header title={"Budget Details"} headerShade={true} />
        </div> */}
        <div
          className="rounded-sm p-4 mt-1 mb-1  flex flex-col gap-4"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <InputField
                label={"Budget Description"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                name={"budget_description"}
                disabled={true}
                //   onChange={(e) => handleChange(e)}
                value={
                  `${approvalDetails2.budget_code} - ${approvalDetails2.budget_descrp}` ??
                  ""
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Budget Title"}
                // type={"date"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                name={"budget_title"}
                disabled={true}
                //   onChange={(e) => handleDateChange(e)}
                value={approvalDetails2.budget_title ?? ""}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
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
                  handleRadioButtons(approvalDetails2.budget_status) === "O"
                }
                value2={"F"}
                checked2={
                  handleRadioButtons(approvalDetails2.budget_status) === "F"
                }
                value3={"C"}
                checked3={
                  handleRadioButtons(approvalDetails2.budget_status) === "C"
                }
                //   onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Budget Year"}
                // type={"date"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                name={"budget_year"}
                disabled={true}
                //   onChange={(e) => handleDateChange(e)}
                value={approvalDetails2.budget_year ?? ""}
              />
            </div>
          </div>
          <hr />
          {/* <span>Filter By</span> */}
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <RadioButtons
                required={true}
                label={"Budget Amount Filter"}
                labelWidth={"30%"}
                name={"budget_filter"}
                id={"showAll"}
                radioLabel={"Show All GLs"}
                display={true}
                id2={"budgeted"}
                radioLabel2={"Budgeted GLs only"}
                display2={true}
                value={"N"}
                checked={budFlag === "N"}
                value2={"Y"}
                checked2={budFlag === "Y"}
                onChange={(e) => setBudFlag(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              {/* <RadioButtons
                label={"Budget Amount Filter"}
                labelWidth={"30%"}
                name={"budget_filter"}
                id={"showAll"}
                radioLabel={"Show All GLs"}
                display={true}
                id2={"budgeted"}
                radioLabel2={"Budgeted GLs only"}
                display2={true}
                value={"N"}
                // checked={budgetData.budget_status === "O"}
                value2={"Y"}
                // checked2={budgetData.budget_status === "F"}
                //   onChange={(e) => handleChange(e)}
              /> */}
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end items-center p-4">
          <ButtonComponent
            label={"Fetch"}
            buttonHeight={"30px"}
            buttonWidth={"60px"}
            onClick={() => {
              getBudgetGLsDetails(approvalDetails2.budget_code, budFlag);
            }}
          />
          <ButtonComponent
            label={"Refresh"}
            buttonHeight={"30px"}
            buttonWidth={"70px"}
            onClick={() => {
              setBudFlag("N");
              getBudgetGLsDetails(approvalDetails2.budget_code, "N");
            }}
          />
          <ButtonComponent
            label={"Exit"}
            buttonHeight={"30px"}
            buttonWidth={"55px"}
            onClick={() => setApprovalModal(false)}
          />
        </div>
        <div className="mb-1">
          <Header title={"Budget Details GLs"} headerShade={true} />
        </div>
        <div style={{ zoom: 0.9 }}>
          <CustomTable
            headers={[
              "Account Number",
              "Account Description",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
              "Total",
            ]}
            data={approvalDetails}
          />
          <div className="flex w-full  justify-between font-medium text-gray-500 p-2  border-2 rounded-md my-2">
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Jan:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Jan)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Feb:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Feb)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Mar:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Mar)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Apr:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Apr)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total May:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.May)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Jun:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Jun)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Jul:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Jul)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Aug:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Aug)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Sep:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Sep)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Oct:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Oct)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Nov:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Nov)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Dec:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Dec)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-400 font-medium">Total Amount:</span>
              <span className="underline text-right">
                {formatNumber2dp(budgetTotals.Total)}
              </span>
            </div>
            {/* </div> */}
          </div>
          {/* <div className="flex w-full  ">
            <div className="w-2/6 flex justify-end p-2 text-orange-300 font-medium text-lg">
              Totals:
            </div>
            <div className="w-4/6 flex items-center justify-between p-2 font-medium text-gray-500">
              <div className="underline">
                {formatNumber2dp(budgetTotals.Jan)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Feb)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Mar)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Apr)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.May)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Jun)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Jul)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Aug)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Sep)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Oct)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Nov)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Dec)}
              </div>
              <div className="underline">
                {formatNumber2dp(budgetTotals.Total)}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default GlobalBudgetEnqModal;
