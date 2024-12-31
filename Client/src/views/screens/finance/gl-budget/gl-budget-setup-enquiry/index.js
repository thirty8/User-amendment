import React, { useEffect, useState } from "react";
import Header from "../../../../../components/others/Header/Header";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../teller-ops/components/CustomTable";
import Swal from "sweetalert2";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import CustomButtons from "../../../../../components/others/CustomButtons";
import { handleExitClick } from "../../components/helpers";
import { Modal } from "@mantine/core";
import BudgetEnquiryModal from "./components/budgetEnquiryModal";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const BudgetSetupEnquiry = () => {
  const [loading, setloading] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [ref, setRef] = useState(false);
  const [approvalSummary, setApprovalSummary] = useState([]);
  const [approvalDetails, setApprovalDetails] = useState([]);
  const [budgetData, setBudgetData] = useState({});
  const [budgetLov, setBudgetLov] = useState([]);

  async function fetchBudgetApprovals() {
    try {
      setloading(true);
      await axios
        .post(
          API_SERVER + "/api/get-budget-details-approval",
          ref
            ? {
                BUDGET_CODE: "",
                BUDGET_DESCRP: "",
                BUDGET_TITLE: "",
                BUDGET_YEAR: "",
                BUDGET_STATUS: "",
                BUDGET_TYPE: "",
                postedBy: "",
                flag: "",
                key: "enq",
              }
            : {
                BUDGET_CODE: (budgetData.budget_code ?? "").trim(),
                BUDGET_DESCRP: (budgetData.budget_description ?? "").trim(),
                BUDGET_TITLE: (budgetData.budget_title ?? "").trim(),
                BUDGET_YEAR: budgetData.budget_year_act ?? "",
                BUDGET_STATUS: budgetData.budget_status ?? "",
                BUDGET_TYPE: budgetData.budget_type ?? "",
                postedBy: budgetData.posted_By ?? "",
                flag: budgetData.approval_status ?? "",
                key: "enq",
              },
          { headers }
        )
        .then((res) => {
          let arr = [];
          if (res.data.length > 0) {
            res.data.map((i) => {
              arr.push([
                i.budget_code,
                i.budget_descrp,
                i.budget_title,
                i.budget_type,
                i.budget_status,
                i.budget_year,
                i.posted_by,
                i.flag,
                <div className="flex justify-center items-center">
                  <ButtonComponent
                    buttonIcon={CustomButtons["viewDetails"].icon}
                    buttonHeight={"25px"}
                    onClick={() => {
                      setApprovalModal(true);
                      setApprovalDetails(i);
                    }}
                  />
                  <span className="hidden">{i.pre_budget_code}</span>
                </div>,
                ,
              ]);
            });
            setApprovalSummary(arr);
            setloading(false);
            setRef(false);
          } else {
            setloading(false);
            setApprovalSummary([]);
            // Swal.fire({
            //   icon: "error",
            //   title: "Error",
            //   text: "No data found...",
            // });
          }
        });
    } catch (error) {
      setloading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const selectedYear = selectedDate.getFullYear();
    setBudgetData({
      ...budgetData,
      ["budget_year"]: e.target.value,
      ["budget_year_act"]: selectedYear,
    });
    // setBudgetYear(selectedYear)
  };

  useEffect(() => {
    fetchBudgetApprovals();
  }, [refresh]);

  useEffect(() => {
    const getBudgetLOV = async () => {
      let response = await axios.get(
        API_SERVER + "/api/get-previous-budget",

        {
          headers,
        }
      );
      setBudgetLov(response.data);
    };
    getBudgetLOV();
  }, []);

  function handleRefresh() {
    setRef(true);
    setBudgetData({});
    setRefresh((prev) => !prev);
  }

  return (
    <div>
      <div className="mb-2">
        <Header title={"Filters"} headerShade={true} />
      </div>
      <div
        className="rounded-sm p-4 mt-1  flex flex-col gap-4"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        <div className="flex items-center gap-5">
          <div className="w-1/2">
            <InputField
              label={"Budget Code"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              name={"budget_code"}
              onChange={(e) => handleChange(e)}
              value={budgetData.budget_code ?? ""}
            />
            {/* <ListOfValue
              label={"Budget Code"}
              data={budgetLov}
              labelWidth={"30%"}
              inputWidth={"60%"}
              // name={"budget_code"}
              onChange={(value) => {
                setBudgetData({ ...budgetData, ["budget_code"]: value });
              }}
              value={budgetData.budget_code ?? ""}
            /> */}
          </div>
          <div className="w-1/2">
            <InputField
              label={"Budget Year"}
              type={"date"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              name={"budget_year"}
              onChange={(e) => handleDateChange(e)}
              value={budgetData.budget_year ?? ""}
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
              value={"BS"}
              checked={budgetData.budget_type === "BS"}
              value2={"PL"}
              checked2={budgetData.budget_type === "PL"}
              onChange={(e) => handleChange(e)}
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
              checked={budgetData.budget_status === "O"}
              value2={"F"}
              checked2={budgetData.budget_status === "F"}
              value3={"C"}
              checked3={budgetData.budget_status === "C"}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-1/2">
            <InputField
              label={"Budget Description"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              onChange={(e) => handleChange(e)}
              name={"budget_description"}
              value={budgetData.budget_description ?? ""}
            />
          </div>
          <div className="w-1/2">
            <InputField
              label={"Budget Title"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              onChange={(e) => handleChange(e)}
              name={"budget_title"}
              value={budgetData.budget_title ?? ""}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-1/2">
            <InputField
              label={"Posted By"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              onChange={(e) => handleChange(e)}
              name={"posted_By"}
              value={budgetData.posted_By ?? ""}
            />
          </div>
          <div className="w-1/2">
            <RadioButtons
              label={"Approval Status"}
              labelWidth={"30%"}
              name={"approval_status"}
              id={"pending"}
              radioLabel={"Pending Approval"}
              display={true}
              id2={"rejected"}
              radioLabel2={"Rejected"}
              display2={true}
              id3={"approved"}
              radioLabel3={"Approved"}
              display3={true}
              value={"N"}
              checked={budgetData.approval_status === "N"}
              value2={"R"}
              checked2={budgetData.approval_status === "R"}
              value3={"Y"}
              checked3={budgetData.approval_status === "Y"}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end items-center p-4">
        <ButtonComponent
          label={"Fetch"}
          buttonHeight={"30px"}
          buttonWidth={"60px"}
          onClick={() => {
            // setRef(true)
            setRefresh((prev) => !prev);
          }}
        />
        <ButtonComponent
          label={"Refresh"}
          buttonHeight={"30px"}
          buttonWidth={"70px"}
          onClick={() => {
            handleRefresh();
          }}
        />
        <ButtonComponent
          label={"Exit"}
          buttonHeight={"30px"}
          buttonWidth={"55px"}
          onClick={() => handleExitClick()}
        />
      </div>
      <div>
        <div className="mb-1">
          <Header title={"Budgets Enquiry"} headerShade={true} />
        </div>
        <CustomTable
          data={approvalSummary}
          headers={[
            "Budget Code",
            "Budget Description",
            "Budget Title",
            "Budget Type",
            "Budget Status",
            "Budget Year",
            "Posted By",
            "Approval Status",
            "Action",
          ]}
          style={{ columnAlignCenter: [1, 6] }}
          rowsPerPage={10}
          loading={{ status: loading, message: "Processing Data..." }}
        />
      </div>
      {approvalModal && (
        <Modal
          className="p-0 m-0"
          opened={approvalModal}
          size="75%"
          padding={0}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => setApprovalModal(false)}
          closeOnClickOutside={false}
        >
          <BudgetEnquiryModal
            setApprovalModal={setApprovalModal}
            approvalDetails={approvalDetails}
            handleRefresh={handleRefresh}
          />
        </Modal>
      )}
    </div>
  );
};

export default BudgetSetupEnquiry;
