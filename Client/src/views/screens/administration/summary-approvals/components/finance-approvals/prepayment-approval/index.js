import React, { useEffect, useState } from "react";
import InputField from "../../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
import SelectField from "../../../../../../../components/others/Fields/SelectField";
import Schedule from "./components/schedule";
import Tax from "./components/tax";
import ActionButtons from "../../../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../../../components/others/tab-component/tab-component";
import Header from "../../../../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../../../../config/constant";
import { Modal } from "@mantine/core";
import DocumentViewing from "../../../../../../../components/DocumentViewing";
import swal from "sweetalert";
import { FcDocument } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import RadioButtons from "../../../../../../../components/others/Fields/RadioButtons";
import ButtonType from "../../../../../../../components/others/Button/ButtonType";
import OverlayLoader from "../../../../../../../components/others/OverlayLoader";

function PrepaymentApproval({ accNumber, batchNo, setShowModal }) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [branchlov, setBranchlov] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [showPosted, setShowPosted] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [showModalSearch1, setShowModalSearch1] = useState(false);
  const [scandocID, setScandocID] = useState("");
  const [accountDesc, setAccountDesc] = useState("");
  const [accountNumberExpense, setAccountNumberExpense] = useState("");
  const [accountNumberPrepayment, setAccountNumberPrepayment] = useState("");
  const [debitAccountDesc, setDebitAccountDesc] = useState("");
  // const [accountDesc,setAccountDesc]=useState("")
  const [prepaymentAccountDetails, setPrepaymentAccountDetails] = useState("");
  const [currency, setCurrency] = useState("");
  const [debitBranch, setDebitBranch] = useState("");
  const [creditBranch, setCreditBranch] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [expenseAccountDetails, setExpenseAccountDetails] = useState([]);
  const [taxTableData, setTaxTableData] = useState([]);
  const [frequencyLov, setFrequencyLov] = useState([]);
  const [taxAmountCalc, setTaxAmountCalc] = useState("");
  const [exTaxAmount, setExTaxAmount] = useState("");
  const [checkTax, setCheckTax] = useState(false);
  const [withTax, setWithTax] = useState(false);
  const [taxComponent, setTaxComponent] = useState("");
  const [repaymentFrequency, setRepaymentFrequency] = useState("");
  const [frequency, setFrequency] = useState("");
  const [tenor, setTenor] = useState("");
  const [sequence, setSequence] = useState("");
  const [voucher_type, setVoucher_type] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [narration, setNarration] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [scheduleData, setScheduleData] = useState([]);
  const [taxAccts, setTaxAccts] = useState("");
  const [batchNumberSchedule, setBatchNumberSchedule] = useState("");
  const [approvalDetails, setApprovalDetails] = useState([]);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const tabsData = [
    {
      value: "default",
      label: "Tax",
      component: <Tax taxTableData={taxTableData} taxAmount={taxAmount} />,
    },
    {
      value: "tab-2",
      label: "Schedule",
      component: <Schedule scheduleData={scheduleData} />,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabsData[0].value);
  const changeToSecondTab = () => {
    setActiveTab(tabsData[1].value);
  };

  const changeToFirstTab = () => {
    setActiveTab(tabsData[0].value);
  };

  useEffect(() => {
    setPaymentMode("Automatic");
    async function getTaxDetails() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-payable-approval-tax-details",
          { expense_reference: accNumber },
          { headers }
        );
        let arr = [];
        let sum = 0;
        response.data?.map((i) => {
          arr.push([
            i.tax_code,
            i.tax_description,
            i.tax_account,
            i.currency,
            i.type_of_fee,
            i.fee_rate,
            formatNumber(i.calc_amt),
          ]);
          sum += NumberWithoutCommas(i.calc_amt);
        });
        setTaxTableData(arr);
        setTaxAmount(sum);
      } catch (error) {
        swal({
          icon: "error",
          title: "Error",
          text: "Something went wrong...",
        });
      }
    }

    async function getPayableScheduleApprovalDetails() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-payable-approval-schedule-details",
          { expense_reference: accNumber },
          { headers }
        );
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
        // setPostingDate(arr[0][4]);
        setScheduleData(arr);
      } catch (error) {
        swal({
          icon: "error",
          title: "Error",
          text: "Something went wrong...",
        });
      }
    }

    async function getPayableApprovalDetails() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-prepayment-approval-details",
          { expense_reference: accNumber },
          { headers }
        );
        setApprovalDetails(response.data);
        setTaxComponent(response.data[0]?.tax);
      } catch (error) {
        swal({
          icon: "error",
          title: "Error",
          text: "Something went wrong...",
        });
      }
    }

    getTaxDetails();
    getPayableScheduleApprovalDetails();
    getPayableApprovalDetails();
  }, []);

  function handleClick1() {
    if (scandocID === "") {
      swal({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        buttons: "OK",
      }).then((result) => {
        if (result) {
        }
      });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  function formatNumber(num) {
    const numericInput = String(num).replace(/[^0-9.-]/g, "");
    // Convert the input to a number and check if it's valid
    const number = parseFloat(numericInput);
    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  const NumberWithoutCommas = (number) => {
    const formattedNumber = String(number).replace(/,/g, "");
    return Number(formattedNumber);
  };

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  function postPrepaymentApproval(flag) {
    try {
      setPostLoader(true);
      axios
        .post(
          API_SERVER + "/api/post_account_prepayment_procedure",
          {
            referenceNumber: "",
            narration: "",
            frequency: "",
            bulkAmount: "",
            taxableAmount:
              NumberWithoutCommas(approvalDetails[0]?.doc_amt) -
              NumberWithoutCommas(taxAmount),
            scanDocId: "",
            creditBranch: approvalDetails[0]?.branch,
            postedBy: "",
            datePosted: "",
            postedTerminal: "",
            postingIP: "",
            approvedBy: JSON.parse(localStorage.getItem("userInfo")).id,
            approvedDate: todayDate,
            // approvedIP:localStorage.getItem("ipAddress"),
            approvedIP: "",
            flag: flag,
            flagMessage: "",
            prepaymentAccount: "",
            expenseAccount: "",
            debitBranch: "",
            startDate: "",
            tenor: "",
            batchNumber: batchNo,
            taxComponent: "",
          },
          { headers }
        )
        .then((response) => {
          if (response.data.success === "Y") {
            setPostLoader(false);
            swal({ title: response.data.message, icon: "success", text: "" });
            setApprovalDetails([]);
            setTaxComponent("");
            setShowModal(false);
          } else {
            setPostLoader(false);
            swal({ title: response.data.message, icon: "error", text: "" });
          }
        });
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: "Something went wrong..." });
    }
  }

  function approvePrepayment() {
    swal({
      title: "Are you sure",
      icon: "info",
      text: "Click 'Yes' to confirm approval",
      buttons: true,
      closeOnClickOutside: false,
    }).then((res) => {
      if (res) {
        postPrepaymentApproval("Y");
      }
    });
  }

  function rejectPrepayment() {
    swal({
      title: "Are you sure",
      icon: "warning",
      text: "Click 'OK' to Reject approval",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
    }).then((res) => {
      if (res) {
        postPrepaymentApproval("R");
      }
    });
  }

  return (
    <div style={{ zoom: 0.9 }} className="p-2">
      <ActionButtons
        displayFetch={"none"}
        displayRefresh={"none"}
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayHelp={"none"}
        displayDelete={"none"}
        displayNew={"none"}
        displayView={"none"}
        onOkClick={approvePrepayment}
        onRejectClick={rejectPrepayment}
        // onExitClick={() => setShowModal(false)}
        exitbuttonfunction={() => setShowModal(false)}
      />
      <hr style={{ marginBottom: "15px" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* left side */}
        <div style={{ flex: 0.39, marginBottom: "15px" }}>
          <Header headerShade={true} title={"Prepay Account (Credit)"} />
          <div
            className="mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              backgroundColor: "#ffffff",
              marginBottom: "20px",
            }}
          >
            <OverlayLoader
              postLoader={postLoader || fetchData}
              // color={"#0580c0"}
              textColor={true}
              displayText={postLoader ? "Loading..." : "Fetching Data..."}
            />
            <div style={{ padding: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label={"Debit Account"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  disabled={true}
                  value={approvalDetails[0]?.acct_link1}
                />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <InputField
                  label={"Branch"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  disabled={true}
                  value={approvalDetails[0]?.branch}
                  id={"creditBranch"}
                />
              </div>
            </div>
          </div>
          <Header headerShade={true} title={"Expense Account (Debit)"} />
          <div
            className="mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ padding: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label={"Debit Account"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  disabled={true}
                  id={"debitAccount"}
                  value={approvalDetails[0]?.acct_link2}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label={"Branch"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  disabled={true}
                  id={"debitBranch"}
                  value={approvalDetails[0]?.branch2}
                />
              </div>
            </div>
          </div>
          {/* buttons */}
        </div>

        {/* right side */}
        <div style={{ flex: 0.6 }}>
          <Header headerShade={true} title={"Payment Details"} />
          <div
            className="mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ padding: "15px" }}>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Payment Mode"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    disabled={true}
                    value={paymentMode}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Frequency"}
                    labelWidth={"30%"}
                    inputWidth={"62%"}
                    disabled={true}
                    value={approvalDetails[0]?.frequency}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Tenor (In months)"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    id={"tenor"}
                    disabled={true}
                    value={approvalDetails[0]?.tenor}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Total Amount"}
                    labelWidth={"30%"}
                    inputWidth={"62%"}
                    disabled={true}
                    id={"totalAmount"}
                    value={formatNumber(approvalDetails[0]?.doc_amt)}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Start Date"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    disabled={true}
                    id={"startDate"}
                    value={approvalDetails[0]?.start_date}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Amount Ex Tax"}
                    labelWidth={"30%"}
                    inputWidth={"62%"}
                    disabled={true}
                    value={formatNumber(
                      approvalDetails[0]?.doc_amt - taxAmount
                    )}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <RadioButtons
                    label={"Tax Component"}
                    labelWidth={"30%"}
                    name={"taxComponent"}
                    radioLabel={"Inclusive"}
                    id={"inclusive"}
                    display={true}
                    radioLabel2={"Exclusive"}
                    id2={"exclusive"}
                    display2={true}
                    value={"I"}
                    checked={taxComponent === "I"}
                    value2={"E"}
                    checked2={taxComponent === "E"}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Reference Number"}
                    labelWidth={"30%"}
                    inputWidth={"62%"}
                    id={"referenceNumber"}
                    disabled={true}
                    value={approvalDetails[0]?.reference_nbr}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <TextAreaField
                    disabled={true}
                    label={"Narration"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    value={approvalDetails[0]?.doc_descrp}
                    rows={2}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <div style={{ display: "flex", flex: 1 }}>
                    <div style={{ flex: 0.9 }}>
                      <InputField
                        label={"Scan Document ID"}
                        labelWidth={"34%"}
                        inputWidth={"58%"}
                        id={"scanDocid"}
                        disabled={true}
                        value={approvalDetails[0]?.source_doc_id}
                      />
                    </div>
                    <div style={{ flex: 0.1 }}>
                      <ButtonComponent
                        buttonHeight={"25px"}
                        buttonWidth={"30px"}
                        onClick={handleClick1}
                        buttonIcon={<FcDocument />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TabsComponent
        tabsData={tabsData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {sweetAlertConfirmed && (
        <Modal
          className="p-0 m-0"
          opened={sweetAlertConfirmed}
          size="75%"
          padding={0}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => sweetAlertConfirmed(false)}
        >
          <div className="flex items-center justify-between mx-2 p-2">
            <div className="font-extrabold text-black">View Document</div>
            <div
              className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
              onClick={() => setSweetAlertConfirmed(false)}
            >
              x
            </div>
          </div>
          {/* <ImageVerification accountNumber={imageAccount} /> */}
          {/* <DocumentCapture documentID={p_credit_scan_doc_id} /> */}
          <DocumentViewing documentID={approvalDetails[0]?.source_doc_id} />
          {/* <Modal.Footer>
            <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      )}
    </div>
  );
}

export default PrepaymentApproval;
