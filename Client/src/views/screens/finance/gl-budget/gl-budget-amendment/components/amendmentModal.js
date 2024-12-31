import React, { useEffect, useState } from "react";
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

const BudgetAmendmentModal = ({ setApprovalModal, approvalDetails }) => {
  const [postLoader, setPostLoader] = useState(false);
  const [budgetYear, setBudgetYear] = useState("");
  const [budgetDate, setBudgetDate] = useState("");
  const [amendmentDetails, setAmendmentDetails] = useState({});

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

  useEffect(() => {
    setAmendmentDetails({
      budget_code: approvalDetails?.budget_code,
      budget_description: approvalDetails?.budget_descrp,
      budget_title: approvalDetails?.budget_title,
      budget_type_modal: handleRadioButtons(approvalDetails?.budget_type),
      budget_status_modal: handleRadioButtons(approvalDetails?.budget_status),
      budget_year: approvalDetails?.budget_year,
    });
  }, []);

  console.log(amendmentDetails, "amenddetails");

  async function AmendBudget() {
    try {
      setPostLoader(true);
      await axiosss
        .post(
          API_SERVER + "/api/post_gl_budget_setup",
          {
            flag: "A",
            budget_code: amendmentDetails.budget_code,
            budget_description: amendmentDetails.budget_description,
            budget_title: amendmentDetails.budget_title,
            budget_status: amendmentDetails.budget_status_modal,
            budget_type: amendmentDetails.budget_type_modal,
            budget_year: amendmentDetails.budget_year.toString(),
            username: JSON.parse(localStorage.getItem("userInfo")).id,
            //   previous_budget: approvalDetails.pre_budget_code,
            // amt_dist_method: "",
            // budget_value: "",
            // rounding_factor: "",
            // budget_method: "",
          },
          { headers }
        )
        .then((res) => {
          if (res.data.success === "Y") {
            setPostLoader(false);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.message,
            });
            setApprovalModal(false);
          } else {
            setPostLoader(false);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.data.message,
            });
          }
        });
    } catch (error) {
      setPostLoader(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAmendmentDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const selectedYear = selectedDate.getFullYear();
    setBudgetDate(e.target.value);
    amendmentDetails.budget_year = selectedYear;
  };

  function getFirstOfMonth(year) {
    const date = new Date(year, new Date().getMonth(), 1);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() is zero-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  //   console.log(handleRadioButtons(approvalDetails.budget_type), "radioooo");
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
          title={"Budget Amendment Details"}
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
            displayAuthorise={"none"}
            displayReject={"none"}
            onExitClick={() => setApprovalModal(false)}
            onOkClick={AmendBudget}
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
          className="rounded-sm p-4 mt-1  flex flex-col gap-6"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <InputField
                label={"Budget Code"}
                required={true}
                disabled={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                value={amendmentDetails.budget_code ?? ""}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Budget Description"}
                required={true}
                labelWidth={"30%"}
                inputWidth={"60%"}
                onChange={(e) => handleChange(e)}
                name={"budget_description"}
                value={amendmentDetails.budget_description ?? ""}
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
                onChange={(e) => {
                  handleChange(e);
                }}
                name={"budget_title"}
                value={amendmentDetails.budget_title ?? ""}
              />
            </div>
            <div className="w-1/2">
              <RadioButtons
                label={"Budget Type"}
                labelWidth={"30%"}
                name={"budget_type_modal"}
                id={"balanceSheet_modal"}
                radioLabel={"Balance Sheet"}
                display={true}
                required={true}
                id2={"profitandloss_modal"}
                radioLabel2={"Profit and Loss"}
                display2={true}
                value={"BS"}
                checked={amendmentDetails.budget_type_modal === "BS"}
                value2={"PL"}
                checked2={amendmentDetails.budget_type_modal === "PL"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <RadioButtons
                label={"Budget Status"}
                labelWidth={"30%"}
                name={"budget_status_modal"}
                id={"open_modal"}
                radioLabel={"Open"}
                display={true}
                id2={"frozen_modal"}
                radioLabel2={"Frozen"}
                display2={true}
                id3={"current_modal"}
                radioLabel3={"Current"}
                display3={true}
                value={"O"}
                checked={amendmentDetails.budget_status_modal === "O"}
                value2={"F"}
                checked2={amendmentDetails.budget_status_modal === "F"}
                value3={"C"}
                checked3={amendmentDetails.budget_status_modal === "C"}
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
                value={getFirstOfMonth(amendmentDetails.budget_year) ?? ""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetAmendmentModal;
