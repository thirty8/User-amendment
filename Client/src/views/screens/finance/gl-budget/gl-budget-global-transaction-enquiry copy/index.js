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
import {
  formatNumber2dp,
  handleExitClick,
  NumberWithoutCommas,
} from "../../components/helpers";
import { Modal } from "@mantine/core";
import GlobalBudgetEnqModal from "./components/globalBudgetEnqModal";
// import GlobalBudgetEnqModal from "./components/globalBudgetEnqModal";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const GlobalBudgetTransEnquiry = () => {
  const [loading, setloading] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [ref, setRef] = useState(false);
  const [approvalSummary, setApprovalSummary] = useState([]);
  const [approvalDetails, setApprovalDetails] = useState([]);
  const [approvalDetails2, setApprovalDetails2] = useState([]);
  const [budgetData, setBudgetData] = useState({});
  const [budgetTotals, setBudgetTotals] = useState({});
  const [budFlag, setBudFlag] = useState("N");

  async function getBudgetGLsDetails(code, account) {
    try {
      //   setloading(true);
      await axios
        .post(
          API_SERVER + "/api/get-budget-details-global",
          {
            BUDGET_CODE: code,
            acct_number: account,
            key: "gbenqtransdetails",
          },
          { headers }
        )
        .then((res) => {
          let arr = [];
          if (res.data.length > 0) {
            let totalObj = {
              Jan: 0,
              Feb: 0,
              Mar: 0,
              Apr: 0,
              May: 0,
              Jun: 0,
              Jul: 0,
              Aug: 0,
              Sep: 0,
              Oct: 0,
              Nov: 0,
              Dec: 0,
              Total: 0,
            };
            res.data.map((i) => {
              arr.push([
                i.batch_no,
                i.batch_descrp,
                i.budget_source,
                formatNumber2dp(i.month_1),
                formatNumber2dp(i.month_2),
                formatNumber2dp(i.month_3),
                formatNumber2dp(i.month_4),
                formatNumber2dp(i.month_5),
                formatNumber2dp(i.month_6),
                formatNumber2dp(i.month_7),
                formatNumber2dp(i.month_8),
                formatNumber2dp(i.month_9),
                formatNumber2dp(i.month_10),
                formatNumber2dp(i.month_11),
                formatNumber2dp(i.month_12),
                formatNumber2dp(i.total_amount),
              ]);
              totalObj.Jan += NumberWithoutCommas(i.month_1);
              totalObj.Feb += NumberWithoutCommas(i.month_2);
              totalObj.Mar += NumberWithoutCommas(i.month_3);
              totalObj.Apr += NumberWithoutCommas(i.month_4);
              totalObj.May += NumberWithoutCommas(i.month_5);
              totalObj.Jun += NumberWithoutCommas(i.month_6);
              totalObj.Jul += NumberWithoutCommas(i.month_7);
              totalObj.Aug += NumberWithoutCommas(i.month_8);
              totalObj.Sep += NumberWithoutCommas(i.month_9);
              totalObj.Oct += NumberWithoutCommas(i.month_10);
              totalObj.Nov += NumberWithoutCommas(i.month_11);
              totalObj.Dec += NumberWithoutCommas(i.month_12);
              totalObj.Total += NumberWithoutCommas(i.total_amount);
            });
            setApprovalDetails(arr);
            setBudgetTotals({ ...totalObj });
            setApprovalModal(true);
            // setloading(false);
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

  async function fetchBudgetGlobalEnq() {
    try {
      setloading(true);
      await axios
        .post(
          API_SERVER + "/api/get-budget-details-global",
          ref
            ? {
                BUDGET_CODE: "",
                BUDGET_DESCRP: "",
                BUDGET_TITLE: "",
                BUDGET_YEAR: "",
                BUDGET_STATUS: "",
                acct_number: "",
                key: "gbenqtrans",
              }
            : {
                BUDGET_CODE: budgetData?.budget_code
                  ? budgetData?.budget_code.trim()
                  : "",
                BUDGET_DESCRP: budgetData?.budget_description
                  ? budgetData?.budget_description.trim()
                  : "",
                BUDGET_TITLE: budgetData?.budget_title
                  ? budgetData?.budget_title.trim()
                  : "",
                BUDGET_YEAR: budgetData?.budget_year_act ?? "",
                BUDGET_STATUS: budgetData?.budget_status ?? "",
                acct_number: budgetData?.account_number
                  ? budgetData?.account_number.trim()
                  : "",
                key: "gbenqtrans",
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
                i.acct_link,
                i.account_descrp,
                formatNumber2dp(i.distributed_amount),
                i.budget_status,
                i.budget_year,
                <div className="flex justify-center items-center">
                  <ButtonComponent
                    buttonIcon={CustomButtons["viewDetails"].icon}
                    buttonHeight={"25px"}
                    onClick={() => {
                      getBudgetGLsDetails(i.budget_code, i.acct_link);
                      //   setApprovalModal(true);
                      setApprovalDetails2(i);
                    }}
                  />
                </div>,
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
    fetchBudgetGlobalEnq();
  }, [refresh]);

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
              labelWidth={"30%"}
              inputWidth={"60%"}
              name={"budget_year"}
              type={"date"}
              onChange={(e) => handleDateChange(e)}
              value={budgetData.budget_year ?? ""}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-1/2">
            <InputField
              label={"Account Number"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              name={"account_number"}
              onChange={(e) => handleChange(e)}
              value={budgetData.account_number ?? ""}
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
            {/* <InputField
              label={"Budget Title"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              onChange={(e) => handleChange(e)}
              name={"budget_title"}
              value={budgetData.budget_title ?? ""}
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
          <Header
            title={"Global Budget Transactions Enquiry"}
            headerShade={true}
          />
        </div>
        <CustomTable
          data={approvalSummary}
          headers={[
            "Budget Code",
            "Budget Description",
            "Budget Title",
            "Account Number",
            "Account Description",
            "Distributed Amount",
            "Budget Status",
            "Budget Year",
            "Action",
          ]}
          style={{ columnAlignCenter: [1, 8], columnAlignRight: [6] }}
          rowsPerPage={10}
          loading={{ status: loading, message: "Processing Data..." }}
        />
      </div>
      {approvalModal && (
        <Modal
          className="p-0 m-0"
          opened={approvalModal}
          size="100%"
          padding={0}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => setApprovalModal(false)}
          closeOnClickOutside={false}
        >
          <GlobalBudgetEnqModal
            setApprovalModal={setApprovalModal}
            setBudFlag={setBudFlag}
            getBudgetGLsDetails={getBudgetGLsDetails}
            approvalDetails={approvalDetails}
            approvalDetails2={approvalDetails2}
            budFlag={budFlag}
            budgetTotals={budgetTotals}
          />
        </Modal>
      )}
    </div>
  );
};

export default GlobalBudgetTransEnquiry;
