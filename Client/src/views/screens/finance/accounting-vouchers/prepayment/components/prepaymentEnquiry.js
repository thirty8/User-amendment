import React, { useEffect, useState } from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import Header from "../../../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import CustomButtons from "../../../../../../components/others/CustomButtons";
import swal from "sweetalert";
import PostedSchedule from "./postedSchedule";
import { Modal } from "@mantine/core";
import { AiOutlineCloseCircle } from "react-icons/ai";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";

function PrepaymentEnquiry({
  setShowPosted,
  prepaymentAccountDetails,
  expenseAccountDetails,
  frequencyLov,
  branchlov,
  getDebitAccounts,
}) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [enquiryData, setEnquiryData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [PREPAYMENT_ACCT, setPREPAYMENT_ACCT] = useState("");
  const [EXPENSE_ACCOUNT, setEXPENSE_ACCOUNT] = useState("");
  const [FREQUENCY, setFREQUENCY] = useState("");
  const [BRANCH_CODE, setBRANCH_CODE] = useState("");
  const [FLAG_MESSAGE, setFLAG_MESSAGE] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [loadingCustomTable, setLoadingCustomTable] = useState(false);

  function formatNumber(num) {
    const numericInput = String(num).replace(/[^0-9.-]/g, "");
    // Convert the input to a number and check if it's valid
    const number = parseFloat(numericInput);
    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  function clearAllFields() {
    setPREPAYMENT_ACCT("");
    setEXPENSE_ACCOUNT("");
    setFREQUENCY("");
    setBRANCH_CODE("");
    setFLAG_MESSAGE("");
  }

  useEffect(() => {
    async function getPostedPrepayment() {
      setLoadingCustomTable(true);
      try {
        let arr = [];
        axios
          .post(
            API_SERVER + "/api/get-posted-prepayment",
            {
              PREPAYMENT_ACCT: PREPAYMENT_ACCT,
              EXPENSE_ACCOUNT: EXPENSE_ACCOUNT,
              FREQUENCY: FREQUENCY,
              BRANCH_CODE: BRANCH_CODE,
              FLAG_MESSAGE: FLAG_MESSAGE,
            },
            { headers }
          )
          .then((response) => {
            if (response.data?.length > 0) {
              response.data?.map((i) => {
                arr.push([
                  i.acct_link11,
                  i.acct_link21,
                  i.branch_code2,
                  i.frequency,
                  i.tax,
                  formatNumber(i.doc_amt),
                  i.start_date,
                  i.flag_message,
                  i.doc_descrp,
                  <div className="flex items-center justify-center">
                    <ButtonComponent
                      buttonIcon={CustomButtons["viewDetails"].icon}
                      onClick={() =>
                        getPayableScheduleApprovalDetails(i.batch_no)
                      }
                    />
                  </div>,
                ]);
              });
              setEnquiryData(arr);
              setLoadingCustomTable(false);
            } else {
              setLoadingCustomTable(false);
              // swal({ title: "No data found", icon: "error", text: "" });
              setEnquiryData([]);
            }
          });
      } catch (error) {
        setLoadingCustomTable(false);
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }
    getPostedPrepayment();
  }, [refresh]);

  useEffect(() => {
    getDebitAccounts("010");
  }, []);

  async function getPayableScheduleApprovalDetails(accNumber) {
    try {
      let response = await axios.post(
        API_SERVER + "/api/get-payable-approval-schedule-details",
        { expense_reference: accNumber },
        { headers }
      );
      if (response.data.length > 0) {
        let arr = [];
        response.data?.map((i) => {
          arr.push([
            i.payment_sequnce,
            i.payable_account_desc,
            i.expense_account,
            formatNumber(i.due_amount),
            i.due_date,
            i.frequency_desc,
            i.branch_desc,
            i.narration,
          ]);
        });
        setScheduleData(arr);
        setShowModal(true);
      } else {
        swal({ title: "Error", icon: "error", text: "No data found" });
      }
    } catch (error) {
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function RefreshData() {
    setLoadingCustomTable(true);
    try {
      setPREPAYMENT_ACCT("");
      setEXPENSE_ACCOUNT("");
      setFREQUENCY("");
      setBRANCH_CODE("");
      setFLAG_MESSAGE("");
      let arr = [];
      axios
        .post(
          API_SERVER + "/api/get-posted-prepayment",
          {
            PREPAYMENT_ACCT: "",
            EXPENSE_ACCOUNT: "",
            FREQUENCY: "",
            BRANCH_CODE: "",
            FLAG_MESSAGE: "",
          },
          { headers }
        )
        .then((response) => {
          response.data?.map((i) => {
            arr.push([
              i.acct_link11,
              i.acct_link21,
              i.branch_code2,
              i.frequency,
              i.tax,
              formatNumber(i.doc_amt),
              i.start_date,
              i.flag_message,
              i.doc_descrp,
              <div className="flex items-center justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["viewDetails"].icon}
                />
              </div>,
            ]);
          });
          setEnquiryData(arr);
          setLoadingCustomTable(false);
          clearAllFields();
        });
    } catch (error) {
      setLoadingCustomTable(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }
  return (
    <div className="p-3" style={{ zoom: 0.95 }}>
      {showModal && (
        <Modal
          className="p-0 m-0"
          opened={showModal}
          size="90%"
          padding={0}
          withCloseButton={false}
          closeOnClickOutside={false}
          transitionProps={"mounted"}
          onClose={() => setShowModal(false)}
        >
          <Header
            title={"Prepayment Schedule"}
            backgroundColor={"#0580c0"}
            closeIcon={<AiOutlineCloseCircle size={20} />}
            handleClose={() => {
              setShowModal(false);
            }}
          />
          <PostedSchedule scheduleData={scheduleData} />
        </Modal>
      )}
      <div className="flex mb-3">
        <div style={{ flex: 0.5 }}>
          <ListOfValue
            label={"Credit Account"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            data={prepaymentAccountDetails}
            onChange={(value) => {
              setPREPAYMENT_ACCT(value);
              const curr_act = prepaymentAccountDetails.find(
                (i) => i["value"] === value
              );
              getDebitAccounts(curr_act?.currency);
            }}
            value={PREPAYMENT_ACCT}
          />
        </div>
        <OverlayLoader
          postLoader={fetchData}
          // color={"#0580c0"}
          textColor={true}
          displayText={"Fetching Data..."}
        />
        <div style={{ flex: 0.5 }}>
          <RadioButtons
            label={"Status"}
            name={"status"}
            id={"approved"}
            radioLabel={"Approved"}
            labelWidth={"30%"}
            display={true}
            radioLabel2={"Pending Approval"}
            display2={true}
            radioLabel3={"Rejected"}
            display3={true}
            id2={"pendingApproval"}
            value={"APPROVED"}
            checked={FLAG_MESSAGE === "APPROVED"}
            value2={"NEW"}
            checked2={FLAG_MESSAGE === "NEW"}
            value3={"REJECTED"}
            id3={"rejected"}
            checked3={FLAG_MESSAGE === "REJECTED"}
            onChange={(e) => setFLAG_MESSAGE(e.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-3">
        <div style={{ flex: 0.5 }}>
          <ListOfValue
            label={"Debit Account"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            data={expenseAccountDetails}
            onChange={(value) => setEXPENSE_ACCOUNT(value)}
            value={EXPENSE_ACCOUNT}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <ListOfValue
            label={"Frequency"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            data={frequencyLov}
            onChange={(value) => setFREQUENCY(value)}
            value={FREQUENCY}
          />
        </div>
      </div>
      <div className="flex mb-3">
        <div style={{ flex: 0.5 }}>
          <ListOfValue
            label={"Branch"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            data={branchlov}
            onChange={(value) => setBRANCH_CODE(value)}
            value={BRANCH_CODE}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          {/* <InputField
            label={"Narration"}
            labelWidth={"30%"}
            inputWidth={"60%"}
          /> */}
        </div>
      </div>
      <hr className="mb-2" />
      <div className="flex justify-end gap-1 mb-2">
        <ButtonComponent
          label={"Fetch"}
          buttonWidth={"50px"}
          onClick={() => setRefresh(!refresh)}
        />
        <ButtonComponent
          label={"Refresh"}
          buttonWidth={"70px"}
          onClick={() => RefreshData()}
        />
        <ButtonComponent
          label={"Exit"}
          buttonWidth={"40px"}
          onClick={() => setShowPosted(false)}
        />
      </div>
      <Header headerShade={true} title={"Prepayment Enquiry"} />
      <div style={{ zoom: 0.9 }}>
        <CustomTable
          headers={[
            "Credit Account",
            "Debit Account",
            "Branch Code",
            "Frequency",
            "Tax",
            "Amount",
            "Start Date",
            "Flag Message",
            "Description",
            "Action",
          ]}
          data={enquiryData}
          loading={{
            status: loadingCustomTable,
            message: "Processing Data...",
          }}
          rowsPerPage={8}
        />
      </div>
    </div>
  );
}

export default PrepaymentEnquiry;
