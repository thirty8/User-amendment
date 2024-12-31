import { useEffect, useState } from "react";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import Header from "../../../../../../components/others/Header/Header";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function BudgetCreation({
  previousBudgetLov,
  budgetDate,
  budgetData,
  budgetYear,
  setBudgetData,
  setBudgetDate,
  setBudgetYear,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBudgetData({ ...budgetData, [name]: value });
  };
  //   console.log(budgetData);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const selectedYear = selectedDate.getFullYear();
    setBudgetDate(e.target.value);
    setBudgetYear(selectedYear);
  };

  const hanleLovChange = async (value) => {
    // setBudgetData({ ...budgetData, ["prev_budget_code"]: value });
    await axios
      .post(
        API_SERVER + "/api/get-previous-budget-details",
        {
          budget_code: value,
        },
        {
          headers,
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setBudgetData({
            prev_budget_code: response.data[0]?.budget_code,
            budget_description: response.data[0]?.budget_descrp,
            budget_title: response.data[0]?.budget_title,
            budget_type: response.data[0]?.budget_type,
            budget_status: response.data[0]?.budget_status,
          });
        }
      });
  };

  return (
    <div>
      {/* <div className="mb-3">
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayFetch={"none"}
          displayRefresh={"none"}
          displayReject={"none"}
          displayHelp={"none"}
          displayView={"none"}
        />
      </div> */}
      <Header title={"General Ledger Budget Creation"} headerShade={true} />
      <div
        className="rounded-sm p-4 mt-1  flex flex-col gap-5"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        <div className="flex items-center gap-5">
          <div className="w-1/2">
            <ListOfValue
              label={"Previous Budget"}
              data={previousBudgetLov}
              required={true}
              labelWidth={"30%"}
              inputWidth={"60%"}
              onChange={(value) => {
                hanleLovChange(value);
              }}
              value={budgetData.prev_budget_code ?? ""}
            />
          </div>
          <div className="w-1/2">
            <InputField
              label={"Budget Description"}
              required={true}
              labelWidth={"30%"}
              inputWidth={"60%"}
              value={budgetData.budget_description ?? ""}
              name={"budget_description"}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-1/2">
            <InputField
              label={"Budget Title"}
              required={true}
              labelWidth={"30%"}
              inputWidth={"60%"}
              value={budgetData.budget_title ?? ""}
              name={"budget_title"}
              onChange={(e) => handleChange(e)}
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
              required={true}
              value={"BS"}
              checked={budgetData.budget_type === "BS"}
              value2={"PL"}
              checked2={budgetData.budget_type === "PL"}
              onChange={(e) => handleChange(e)}
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
              required={true}
              value={"O"}
              checked={budgetData.budget_status === "O"}
              value2={"F"}
              checked2={budgetData.budget_status === "F"}
              value3={"C"}
              checked3={budgetData.budget_status === "C"}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="w-1/2">
            <InputField
              label={"Budget Year"}
              required={true}
              labelWidth={"30%"}
              inputWidth={"60%"}
              type={"date"}
              name={"budget_year"}
              onChange={(e) => handleDateChange(e)}
              value={budgetDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetCreation;
