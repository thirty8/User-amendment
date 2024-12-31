import React, { useEffect, useState } from "react";
import InputField from "../../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
import SelectField from "../../../../../../../components/others/Fields/SelectField";
import Schedule from "./components/tax_schedule";
// import Tax from "./components/tax";
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
// import PrepaymentEnquiry from "./components/prepaymentEnquiry";
// import SearchModal from "./components/accountSearchModal";
// import SearchModal1 from "./components/expenseAccountSearchModal";
import RadioButtons from "../../../../../../../components/others/Fields/RadioButtons";
import ButtonType from "../../../../../../../components/others/Button/ButtonType";
import TaxDetails from "./components/tax_details";
import CustomButtons from "../../../../../../../components/others/CustomButtons";
import OverlayLoader from "../../../../../../../components/others/OverlayLoader";

function AccountsPayableApproval({ setShowModal, accNumber }) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [approvalDetails, setApprovalDetails] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [checkTax, setCheckTax] = useState(false);
  const [withTax, setWithTax] = useState(false);
  const [scandocID, setScandocID] = useState("");
  const [currency, setCurrency] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  // const [taxAmount, setTaxAmount] = useState("");
  const [taxAmountCalc, setTaxAmountCalc] = useState("");
  const [exTaxAmount, setExTaxAmount] = useState("");
  const [expenseAccountDetails, setExpenseAccountDetails] = useState([]);
  const [taxTableData, setTaxTableData] = useState([]);
  const [frequencyLov, setFrequencyLov] = useState([]);
  const [aPaccount, setAPaccount] = useState([]);
  const [expenseAccountsLov, setExpenseAccountsLov] = useState([]);
  const [taxAmount, setTaxAmount] = useState("");
  const [taxComponent, setTaxComponent] = useState("");
  const [voucher_type, setVoucher_type] = useState("");
  const [frequency, setFrequency] = useState("");
  const [narration, setNarration] = useState("");
  const [tenor, setTenor] = useState("");
  const [creditAccount, setCreditAccount] = useState("");
  const [debitAccount, setDebitAccount] = useState("");
  const [invoice_number, setInvoice_number] = useState("");
  const [sequence, setSequence] = useState("");
  const [userReference, setUserReference] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [scheduleData, setScheduleData] = useState("");
  const [ap_branch, setAp_branch] = useState("");
  const [expense_branch, setExpense_branch] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dateReceived, setDateReceived] = useState("");
  const [payment_method_id, setPayment_method_id] = useState("");
  const [taxPayment, setTaxPayment] = useState("");
  const [repaymentFrequency, setRepaymentFrequency] = useState("");
  const [taxAccts, setTaxAccts] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [expense_reference, setExpense_reference] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  let z;

  const tabsData = [
    {
      value: "default",
      label: "Tax",
      component: (
        <TaxDetails
          taxTableData={taxTableData}
          //   calculateAmountExTax={calculateAmountExTax}
          taxAmount={taxAmount}
        />
      ),
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

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  useEffect(() => {
    async function getPayableApprovalDetails() {
      try {
        setFetchData(true);
        let response = await axios.post(
          API_SERVER + "/api/get-payable-approval-details",
          { expense_reference: accNumber },
          { headers }
        );
        if (response.data.length > 0) {
          setFetchData(false);
          setApprovalDetails(response.data);
          setTaxComponent(response.data[0]?.tax_mode);
          setTaxPayment(response.data[0]?.tax_payment);
        } else {
          setFetchData(false);
          swal({
            icon: "error",
            title: "Error",
            text: "No Approval Details found.",
          });
        }
      } catch (error) {
        setFetchData(false);
        swal({
          icon: "error",
          title: "Error",
          text: "Something went wrong...",
          closeOnClickOutside: false,
        });
      }
    }

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
            i.calc_amt,
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
          closeOnClickOutside: false,
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
            i.due_amount,
            i.due_date,
            i.frequency_desc,
            i.branch_desc,
            i.narration,
          ]);
        });
        if (arr.length > 0) {
          setPostingDate(arr[0][4]);
        }
        setScheduleData(arr);
      } catch (error) {
        swal({
          icon: "error",
          title: "Error",
          text: "Something went wrong...",
          closeOnClickOutside: false,
        });
      }
    }
    getPayableApprovalDetails();
    getTaxDetails();
    getPayableScheduleApprovalDetails();
  }, []);

  function formatDate(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return (
      inputDate.getDate() +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }

  const NumberWithoutCommas = (number) => {
    const formattedNumber = String(number).replace(/,/g, "");
    return Number(formattedNumber);
  };

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

  async function ApprovePayable() {
    try {
      swal({
        title: "Are you sure ?",
        text: "You're about to approve this transaction!",
        icon: "info",
        buttons: true,
        closeOnClickOutside: false,
      }).then((result) => {
        if (result) {
          setPostLoader(true);
          axios
            .post(
              API_SERVER + "/api/post_account_payable_procedure",
              {
                expense_reference: accNumber,
                approvedBy: JSON.parse(localStorage.getItem("userInfo")).id,
                approvedDate: todayDate,
                approvedIP: localStorage.getItem("ipAddress"),
                reference_num: approvalDetails[0]?.user_reference,
                cost_branch: JSON.parse(localStorage.getItem("userInfo"))
                  .branchCode,
                doc_total: approvalDetails[0]?.taxable_amount,
                posted_by: JSON.parse(localStorage.getItem("userInfo")).id,
                expense_currency: approvalDetails[0]?.curr_code,
                flag: "Y",
              },
              { headers }
            )
            .then((response) => {
              setPostLoader(false);
              if (response.data?.success === "Y") {
                setApprovalDetails([]);
                swal({
                  title: response.data?.message,
                  icon: "success",
                  closeOnClickOutside: false,
                }).then((res) => {
                  if (res) {
                    setShowModal(false);
                    setPostLoader(false);
                  }
                });
              } else {
                // setPostLoader(false);
                swal({
                  title: response.data?.message,
                  icon: "error",
                });
              }
            });
        }
      });
    } catch (error) {
      setPostLoader(false);
      swal({
        icon: "error",
        title: "Error",
        text: "Something went wrong...",
        closeOnClickOutside: false,
      });
    }
  }

  async function RejectPayable() {
    try {
      swal({
        title: "Are you sure ?",
        text: "You're about to reject this transaction!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeOnClickOutside: false,
      }).then((result) => {
        if (result) {
          setPostLoader(true);
          axios
            .post(
              API_SERVER + "/api/post_account_payable_procedure",
              {
                expense_reference: accNumber,
                approvedBy: JSON.parse(localStorage.getItem("userInfo")).id,
                approvedDate: todayDate,
                approvedIP: localStorage.getItem("ipAddress"),
                reference_num: approvalDetails[0]?.user_reference,
                // approvedIP: JSON.parse(localStorage.getItem("ipAddress")),
                cost_branch: JSON.parse(localStorage.getItem("userInfo"))
                  .branchCode,
                doc_total: approvalDetails[0]?.taxable_amount,
                posted_by: JSON.parse(localStorage.getItem("userInfo")).id,
                expense_currency: approvalDetails[0]?.curr_code,
                flag: "R",
              },
              { headers }
            )
            .then((response) => {
              setPostLoader(false);
              if (response.data?.success === "Y") {
                setApprovalDetails([]);
                swal({
                  title: response.data?.message,
                  icon: "success",
                  closeOnClickOutside: false,
                }).then((res) => {
                  if (res) {
                    setShowModal(false);
                    setPostLoader(false);
                  }
                });
              } else {
                // setPostLoader(false);
                swal({
                  title: response.data?.message,
                  icon: "error",
                });
              }
            });
        }
      });
    } catch (error) {
      setPostLoader(false);
      swal({
        icon: "error",
        title: "Error",
        text: "Something went wrong...",
        closeOnClickOutside: false,
      });
    }
  }

  return (
    <div style={{ zoom: 0.9 }} className="px-2 py-1">
      <ActionButtons
        displayFetch={"none"}
        displayRefresh={"none"}
        displayNew={"none"}
        displayCancel={"none"}
        displayHelp={"none"}
        displayDelete={"none"}
        displayView={"none"}
        displayOk={"none"}
        exitbuttonfunction={() => {
          setShowModal(false);
        }}
        onRejectClick={RejectPayable}
        onAuthoriseClick={ApprovePayable}
        // onOkClick={onOnlyOKclick}
      />
      <hr style={{ marginBottom: "15px" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <OverlayLoader
          postLoader={postLoader || fetchData}
          // color={"#0580c0"}
          textColor={true}
          displayText={postLoader ? "Loading..." : "Fetching Data..."}
        />
        {/* left side */}
        <div style={{ flex: 0.39, marginBottom: "15px" }}>
          <Header headerShade={true} title={"AP Account"} />
          <div
            className="mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              backgroundColor: "#ffffff",
              marginBottom: "10px",
            }}
          >
            <div style={{ padding: "8px 12px" }}>
              <div className="" style={{ marginBottom: "10px" }}>
                <InputField
                  label={"AP Account"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  value={approvalDetails[0]?.ap_acct}
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <InputField
                  label={"Branch"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  required={true}
                  id={"creditBranch"}
                  value={approvalDetails[0]?.branch}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <Header headerShade={true} title={"Expense Account"} />
          <div
            className="mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              backgroundColor: "#ffffff",
              marginBottom: "10px",
            }}
          >
            {/* <div style={{background:"", color:"white", borderTopLeftRadius:'3px',borderTopRightRadius:'3px',height:'25px',fontSize:'1.1em',paddingLeft:'10px',alignItems:'center'}}>
            <span>Prepay Account (Credit)</span>
            </div> */}
            <div style={{ padding: "8px 12px" }}>
              <div className="" style={{ marginBottom: "8px" }}>
                <InputField
                  label={"Debit Account"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  id={"debitAccount"}
                  value={approvalDetails[0]?.expense_acct_link}
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <InputField
                  label={"Branch"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  id={"expenseBranch"}
                  value={approvalDetails[0]?.ex_branch}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <Header headerShade={true} title={"Credit/Payment Account"} />
          <div
            className="mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ padding: "8px 12px" }}>
              <div className="" style={{ marginBottom: "8px" }}>
                <InputField
                  label={"Credit Account"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  required={true}
                  value={approvalDetails[0]?.expense_acct_link}
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <InputField
                  label={"Branch"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  required={true}
                  disabled={true}
                  value={approvalDetails[0]?.ex_branch}
                />
              </div>
            </div>
          </div>
          {/* buttons */}
        </div>

        {/* right side */}
        <div style={{ flex: 0.6 }}>
          <Header headerShade={true} title={"Invoice Information"} />
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
              <div style={{ display: "flex", flex: 1, marginBottom: "16px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Payment Mode"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    disabled={true}
                    value={approvalDetails[0]?.payment_mode}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Frequency"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    disabled={true}
                    id={"frequency"}
                    value={approvalDetails[0]?.frequency}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "16px" }}>
                <div style={{ flex: 0.5 }}>
                  <RadioButtons
                    label={"Tax Component"}
                    labelWidth={"35%"}
                    name={"taxComponent"}
                    id={"Inclusive"}
                    radioLabel={"Inclusive"}
                    display={true}
                    id2={"Exclusive"}
                    radioLabel2={"Exclusive"}
                    display2={true}
                    required={true}
                    value={"I"}
                    checked={taxComponent === "I"}
                    value2={"E"}
                    checked2={taxComponent === "E"}
                    // onChange={(e) => {
                    //   setTaxComponent(e.target.value);
                    // }}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <RadioButtons
                    label={"Tax Payment"}
                    labelWidth={"30%"}
                    name={"taxPayment"}
                    id={"schedule"}
                    radioLabel={"With Schedule"}
                    display={true}
                    id2={"outright"}
                    radioLabel2={"Outright"}
                    display2={true}
                    required={true}
                    value={"S"}
                    checked={taxPayment === "S"}
                    value2={"O"}
                    checked2={taxPayment === "O"}
                    // onChange={(e) => {
                    //   setTaxPayment(e.target.value);
                    // }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "16px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Start Date"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    id={"startDate"}
                    disabled={true}
                    value={postingDate}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Months"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    id={"months"}
                    value={approvalDetails[0]?.tenor}
                    disabled={true}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "16px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Net Invoice Amount"}
                    inputWidth={"60%"}
                    labelWidth={"35%"}
                    required={"true"}
                    id={"invoiceAmount"}
                    value={formatNumber(approvalDetails[0]?.total_exp_amount)}
                    disabled={true}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Amount Ex Tax"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    disabled={true}
                    value={formatNumber(approvalDetails[0]?.taxable_amount)}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "16px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"User Reference"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    id={"userReference"}
                    value={approvalDetails[0]?.user_reference}
                    disabled={true}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <div style={{ display: "flex", flex: 1 }}>
                    <div style={{ flex: 0.9 }}>
                      <InputField
                        label={"Scan Document"}
                        labelWidth={"33%"}
                        inputWidth={"59%"}
                        id={"scanDocument"}
                        value={approvalDetails[0]?.expense_doc_id}
                        disabled={true}
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
              <div style={{ display: "flex", flex: 1, marginBottom: "16px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Invoice Number"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    id={"invoiceNumber"}
                    value={approvalDetails[0]?.invoice_number}
                    disabled={true}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Invoice Date"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    id={"invoiceDate"}
                    value={approvalDetails[0]?.invoice_date}
                    disabled={true}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Date Received"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    id={"dateReceived"}
                    value={approvalDetails[0]?.date_received}
                    disabled={true}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <TextAreaField
                    label={"Narration"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    rows={2}
                    id={"narration"}
                    value={approvalDetails[0]?.narration}
                    disabled={true}
                  />
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
          <DocumentViewing documentID={scandocID} />
        </Modal>
      )}
    </div>
  );
}

export default AccountsPayableApproval;
