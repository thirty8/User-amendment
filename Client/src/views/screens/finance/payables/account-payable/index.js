import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
import SelectField from "../../../../../components/others/Fields/SelectField";
import Schedule from "./components/tax_schedule";
// import Tax from "./components/tax";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import Header from "../../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { Modal } from "@mantine/core";
import DocumentViewing from "../../../../../components/DocumentViewing";
import Swal from "sweetalert2";
import { FcDocument } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import PrepaymentEnquiry from "./components/prepaymentEnquiry";
// import SearchModal from "./components/accountSearchModal";
// import SearchModal1 from "./components/expenseAccountSearchModal";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import TaxDetails from "./components/tax_details";
import CustomButtons from "../../../../../components/others/CustomButtons";
import OverlayLoader from "../../../../../components/others/OverlayLoader";
import { formatNumberclear, regex } from "../../components/helpers";

function AccountsPayable() {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [branchlov, setBranchlov] = useState([]);
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
  const [effectiveDate, setEffectiveDate] = useState("");
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
          calculateAmountExTax={calculateAmountExTax}
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

  useEffect(() => {
    setPaymentMode("Automatic");
    setPayment_method_id("ACCT");
    async function getBranch() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "BRA", key: "posting" },
          { headers }
        );
        setBranchlov(response.data);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      }
    }

    async function getFrequency() {
      try {
        let response = await axios.get(API_SERVER + "/api/get-frequency", {
          headers,
        });
        setFrequencyLov(response.data);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      }
    }

    async function getApAccount() {
      try {
        let response = await axios.get(API_SERVER + "/api/get-apaccount", {
          headers,
        });
        setAPaccount(response.data);
        // setCurrency(response.data[0].curr_code);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      }
    }

    async function ApAccountBlur() {
      try {
        await axios
          .post(
            API_SERVER + "/api/get-payable-expense-account",
            { currency: "010" },
            { headers }
          )
          .then((response) => {
            setExpenseAccountsLov(response.data);
          });
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      }
    }
    getFrequency();
    getApAccount();
    getBranch();
    ApAccountBlur();
  }, []);

  // async function ApAccountBlur() {
  //   await axios
  //     .post(
  //       API_SERVER + "/api/get-payable-expense-account",
  //       { currency: currency },
  //       { headers }
  //     )
  //     .then((response) => {
  //       setExpenseAccountsLov(response.data);
  //     });
  // }

  useEffect(() => {
    let taxArr = [];
    let arr = [];
    let taxable;
    async function getTax() {
      try {
        await axios
          .get(API_SERVER + "/api/get-payable-tax", {
            headers,
          })
          .then((response) => {
            // alert(response.data);
            if (response.data.length > 0) {
              // console.log(response.data, "trtrtrrrrr");
              // setTaxAccts(response.data);
              response.data?.map((i, index) => {
                withTax[`${index}`]
                  ? (taxable = 0.0)
                  : i.type_of_fee == "PERCENT"
                  ? (taxable = formatNumberclear(
                      (i.fee_amount * NumberWithoutCommas(amount)) / 100
                    ))
                  : (taxable = formatNumberclear(i.fee_amount));
                //   (z = i?.fee_amount);
                // setTurnZero(i?.fee_amount);
                let ttt = {
                  p_TAX_ACCOUNT: i.contra_acct,
                  p_CALC_AMT: NumberWithoutCommas(taxable),
                  p_TAX_CODE: i.tax_code,
                  p_TAX_RATE: i.type_of_fee == "PERCENT" ? "P" : "A",
                  p_fee_amount: NumberWithoutCommas(
                    Number(i.fee_amount).toFixed(1)
                  ),
                  p_trans_code: i.trans_code,
                };
                arr.push(ttt);
                // setTaxAccts(taxAccts.concat(ttt));

                taxArr.push([
                  i.tax_code,
                  i.tax_description,
                  i.account_description,
                  i.currency,
                  i.type_of_fee,
                  Number(i.fee_amount).toFixed(1),
                  taxable,
                  <div className="flex justify-center">
                    <ButtonType
                      type={"checkbox"}
                      onChange={(e) => {
                        if (e.target.checked === true) {
                          setWithTax((prev) => ({ ...prev, [index]: true }));
                          setCheckTax(!checkTax);
                        } else if (e.target.checked === false) {
                          setCheckTax(!checkTax);
                          setWithTax((prev) => ({ ...prev, [index]: false }));
                          // setWithTax(false);
                        }
                      }}
                      checked={withTax[`${index}`]}
                      value1={"check" + index}
                    />
                  </div>,
                ]);
              });
              setTaxTableData(taxArr);
              setTaxAccts(arr);
            }
          });
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      }
    }

    getTax();
  }, [checkTax]);
  // console.log(taxAccts, "taxAcctstaxAccts");

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

  useEffect(() => {
    TotalTaxReturn();
  }, [taxTableData]);

  function calculateAmountExTax(value) {
    if (exTaxAmount) {
      setTaxAmountCalc(exTaxAmount - value);
    }
  }

  const NumberWithoutCommas = (number) => {
    const formattedNumber = String(number).replace(/,/g, "");
    return Number(formattedNumber);
  };

  useEffect(() => {}, []);

  function handleClick1() {
    if (scandocID === "") {
      Swal.fire({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        // buttons: "OK",
      }).then((result) => {
        if (result) {
        }
      });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      // e.preventDefault()
      document.getElementById(nextFieldId).focus();
    }
  }

  function TotalTaxReturn() {
    let a = 0;
    taxTableData.map((i) => {
      a += NumberWithoutCommas(i[6]);
    });
    setTaxAmount(a);
    setTaxAmountCalc(NumberWithoutCommas(exTaxAmount) - a);
  }

  const invoiceAmount = document.getElementById("invoiceAmount");
  useEffect(() => {
    setVoucher_type("PAYA");
    setSequence("1");
    setTransactionType("VPAY");
  }, []);

  function getPostingDate(postingDate) {
    let valueDate = new Date(postingDate);
    const months = [
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
    valueDate = `${valueDate.getDate()}-${
      months[valueDate.getMonth()]
    }-${valueDate.getFullYear()}`;

    return valueDate;
  }

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  function generateSchedule() {
    try {
      if (!amount) {
        Swal.fire({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("invoiceAmount").name,
          text: "",
        });
      } else if (!postingDate) {
        Swal.fire({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("startDate").name,
          text: "",
        });
      } else {
        setPostLoader(true);
        axios
          .post(
            API_SERVER + "/api/generate-payable-schedule",

            {
              sequence: sequence,
              frequency: frequency,
              batch_num: "",
              scandoc_id: scandocID,
              prepayment_id: expense_reference,
              reference_num: userReference,
              narration: narration,
              details_ref_num: "",
              cost_branch: JSON.parse(localStorage.getItem("userInfo"))
                .branchCode,
              doc_total:
                taxComponent == "E"
                  ? NumberWithoutCommas(amount)
                  : NumberWithoutCommas(taxAmountCalc),
              tenor: tenor,
              posting_date: formatDate(postingDate),
              creditAccount: creditAccount,
              debitAccount: debitAccount,
              repay_frequency: repaymentFrequency,
              posting_date_actual: todayDate,
              invoice_number: invoice_number,
              voucher_type: voucher_type,
              posted_by: JSON.parse(localStorage.getItem("userInfo")).id,
              posting_terminal: "",
              tax_mode: taxComponent,
            },
            { headers }
          )
          .then((result) => {
            let arr = [];
            if (result.data.success == "Y") {
              // setExpense_reference(result.data.batchNumber);
              // alert(result.data.batchNumber);
              // swal({ icon: "success", title: result.data.message });
              result.data.schedule?.map((i) => {
                arr.push([
                  i.payment_sequnce,
                  i.payable_account_desc,
                  i.expense_account,
                  formatNumberclear(i.due_amount),
                  i.due_date,
                  i.frequency_desc,
                  i.branch_desc,
                  i.narration,
                ]);
              });
              setPostLoader(false);
              setScheduleData(arr);
              // alert(arr[arr.length - 1][3]);
              Swal.fire({ icon: "success", title: result.data.message }).then(
                (res) => {
                  if (res.isConfirmed) {
                    changeToSecondTab();
                  }
                }
              );
            } else {
              setPostLoader(false);
              Swal.fire({ icon: "error", title: result.data.message });
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  }

  function PostPayable(batch) {
    try {
      axios
        .post(
          API_SERVER + "/api/post_account_payable_procedure",
          {
            frequency: frequency,
            scandoc_id: scandocID,
            reference_num: userReference,
            narration: narration,
            cost_branch: JSON.parse(localStorage.getItem("userInfo"))
              .branchCode,
            doc_total: NumberWithoutCommas(taxAmountCalc),
            tenor: tenor,
            posting_date_actual: todayDate,
            payment_mode: "A",
            creditAccount: creditAccount,
            debitAccount: debitAccount,
            invoice_number: invoice_number,
            voucher_type: voucher_type,
            posted_by: JSON.parse(localStorage.getItem("userInfo")).id,
            net_invoice_amount: NumberWithoutCommas(amount),
            expense_currency: currency,
            tax_mode: taxComponent,
            ap_branch: ap_branch,
            expense_branch: expense_branch,
            flag: "N",
            expense_reference: batch,
            invoice_date: formatDate(invoiceDate),
            date_received: formatDate(dateReceived),
            payment_method_id: payment_method_id,
            tax_payment: taxPayment,
            transactionType: transactionType,
            tax_accounts: taxAccts,
            paymentDate: paymentDate,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.success == "Y") {
            setPostLoader(false);
            Swal.fire({ icon: "success", title: response.data.message }).then(
              (res) => {
                if (res.isConfirmed) {
                  ClearAllData();
                }
              }
            );
          } else {
            setPostLoader(false);
            Swal.fire({ icon: "error", title: response.data.message });
          }
        });
    } catch (error) {
      setPostLoader(false);
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  }

  async function getRepaymentFrequency(freq, t) {
    try {
      let response = await axios.post(
        API_SERVER + "/api/get-repayment_frequency",
        {
          tenor: t ? t : 12,
          frequency: freq ? freq : frequency,
        },
        { headers }
      );
      // console.log(response.data);
      setRepaymentFrequency(response.data[0]?.repay_freq);
      // alert(response.data[0]?.repay_freq);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  }

  function onOnlyOKclick() {
    try {
      let batch;
      if (!amount) {
        Swal.fire({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("invoiceAmount").name,
          text: "",
        });
      } else if (!postingDate) {
        Swal.fire({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("startDate").name,
          text: "",
        });
      } else {
        setPostLoader(true);
        axios
          .post(
            API_SERVER + "/api/generate-payable-schedule",

            {
              sequence: sequence,
              frequency: frequency,
              batch_num: "",
              scandoc_id: scandocID,
              prepayment_id: expense_reference ? expense_reference : batch,
              reference_num: userReference,
              narration: narration,
              details_ref_num: "",
              cost_branch: JSON.parse(localStorage.getItem("userInfo"))
                .branchCode,
              doc_total:
                taxComponent == "E"
                  ? NumberWithoutCommas(amount)
                  : NumberWithoutCommas(taxAmountCalc),
              tenor: tenor,
              posting_date: formatDate(postingDate),
              creditAccount: creditAccount,
              debitAccount: debitAccount,
              repay_frequency: repaymentFrequency,
              posting_date_actual: todayDate,
              invoice_number: invoice_number,
              voucher_type: voucher_type,
              posted_by: JSON.parse(localStorage.getItem("userInfo")).id,
              posting_terminal: "",
              tax_mode: taxComponent,
            },
            { headers }
          )
          .then((result) => {
            let arr = [];
            if (result.data.success == "Y") {
              // alert("hello");
              // alert(result.data.batchNumber);
              // setExpense_reference(result.data.batchNumber);
              batch = result.data.batchNumber;
              // swal({ icon: "success", title: result.data.message });
              // setPaymentDate(arr[arr.length - 1][3]);
              result.data.schedule?.map((i) => {
                arr.push([
                  i.payable_account_desc,
                  i.expense_account,
                  formatNumberclear(i.due_amount),
                  i.due_date,
                  i.frequency_desc,
                  i.branch_desc,
                  i.narration,
                ]);
              });
              setScheduleData(arr);
              PostPayable(batch);
              // changeToSecondTab();
              // swal({ icon: "success", title: result.data.message }).then((res) => {
              //   if (res) {
              //     changeToSecondTab();
              //   }
              // });
            } else {
              setPostLoader(false);
              Swal.fire({ icon: "error", title: result.data.message });
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  }

  function ClearAllData() {
    Swal.fire({
      icon: "warning",
      title: "Are you sure ?",
      html: "Click <b> OK </b> to clear all data entered.",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setFrequency("");
        setScandocID("");
        setUserReference("");
        setNarration("");
        setTaxAmountCalc("");
        setAmount("");
        setTenor("");
        setCreditAccount("");
        setDebitAccount("");
        setInvoiceDate("");
        setInvoice_number("");
        setVoucher_type("");
        setTaxComponent("");
        setAp_branch("");
        setExpense_branch("");
        setDateReceived("");
        setTaxPayment("");
        setPostingDate("");
        setTaxAmountCalc("");
        setExTaxAmount("");
        setScheduleData([]);
        setExpense_reference("");
        // setWithTax(false);
        setCheckTax(!checkTax);
        changeToFirstTab();
        const arr = { ...withTax };
        Object.keys(arr).forEach((i) => {
          arr[`${i}`] = false;
        });
        setWithTax(arr);
      }
    });
  }

  // console.log({ withTax });
  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      // e.preventDefault()
      document.getElementById(nextFieldId).focus();
    }
  }

  const netInvoice = document.getElementById("invoiceAmount");

  function onTotalAmountBlur(num, id) {
    if (num) {
      if (regex.test(num) === true) {
        Swal.fire({
          title: "Error",
          text: "kindly ensure amount entered doesn't contain any letters",
          icon: "warning",
          closeOnClickOutside: false,
        }).then((res) => {
          if (res) {
            id.focus();
            id.select();
          }
        });
      } else {
        setCheckTax(!checkTax);
        setTaxAmountCalc(amount);
        setExTaxAmount(amount);
        setAmount(formatNumberclear(amount));
        document.getElementById("userReference").focus();
      }
    } else {
      document.getElementById("userReference").focus();
    }
  }

  return (
    <div style={{}}>
      <ActionButtons
        displayFetch={"none"}
        displayRefresh={"none"}
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayHelp={"none"}
        displayDelete={"none"}
        displayReject={"none"}
        displayView={"none"}
        onNewClick={ClearAllData}
        onExitClick={handleExitClick}
        // onOkClick={PostPayable}
        onOkClick={onOnlyOKclick}
      />
      <hr style={{ margin: "4px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            {/* <div style={{background:"", color:"white", borderTopLeftRadius:'3px',borderTopRightRadius:'3px',height:'25px',fontSize:'1.1em',paddingLeft:'10px',alignItems:'center'}}>
            <span>Prepay Account (Credit)</span>
            </div> */}
            <div style={{ padding: "8px 12px" }}>
              <div className="" style={{ marginBottom: "10px" }}>
                <ListOfValue
                  label={"AP Account"}
                  labelWidth={"22%"}
                  inputWidth={"64%"}
                  required={true}
                  data={aPaccount}
                  value={creditAccount}
                  onChange={(value) => {
                    setCreditAccount(value);
                    // if (value) {
                    //   ApAccountBlur();
                    // }
                    setTimeout(() => {
                      const input = document.getElementById("creditBranch");
                      input.focus();
                    }, 0);
                  }}
                />
              </div>
              <OverlayLoader
                postLoader={postLoader || fetchData}
                // color={"#0580c0"}
                textColor={true}
                displayText={postLoader ? "Loading..." : "Fetching Data..."}
              />
              <div style={{ marginBottom: "5px" }}>
                <ListOfValue
                  label={"Branch"}
                  labelWidth={"22%"}
                  inputWidth={"64%"}
                  required={true}
                  data={branchlov}
                  id={"creditBranch"}
                  onChange={(value) => {
                    setAp_branch(value);
                    setTimeout(() => {
                      const input = document.getElementById("debitAccount");
                      input.focus();
                    }, 0);
                  }}
                  value={ap_branch}
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
                <ListOfValue
                  label={"Debit Account"}
                  labelWidth={"22%"}
                  inputWidth={"64%"}
                  id={"debitAccount"}
                  required={true}
                  data={expenseAccountsLov}
                  onChange={(value) => {
                    setDebitAccount(value);
                    setTimeout(() => {
                      const input = document.getElementById("expenseBranch");
                      input.focus();
                    }, 0);
                  }}
                  value={debitAccount}
                />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <ListOfValue
                  label={"Branch"}
                  labelWidth={"22%"}
                  inputWidth={"64%"}
                  required={true}
                  data={branchlov}
                  id={"expenseBranch"}
                  onChange={(value) => {
                    setExpense_branch(value);
                    setTimeout(() => {
                      const input = document.getElementById("frequency");
                      input.focus();
                    }, 0);
                  }}
                  value={expense_branch}
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
                <ListOfValue
                  label={"Credit Account"}
                  labelWidth={"22%"}
                  inputWidth={"64%"}
                  required={true}
                  onChange={() => {}}
                  // disabled={true}
                  value={debitAccount}
                  data={expenseAccountsLov}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <ListOfValue
                  label={"Branch"}
                  labelWidth={"22%"}
                  inputWidth={"64%"}
                  required={true}
                  onChange={() => {}}
                  // disabled={true}
                  value={expense_branch}
                  data={branchlov}
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
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Payment Mode"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    // required={true}
                    disabled={true}
                    value={paymentMode}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <ListOfValue
                    label={"Frequency"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    required={true}
                    id={"frequency"}
                    data={frequencyLov}
                    onChange={(value) => {
                      setFrequency(value);
                      getRepaymentFrequency(value);
                      // document.getElementById("Inclusive").focus()
                      setTimeout(() => {
                        document.getElementById("startDate").focus();
                        setTaxComponent("I");
                        setTaxPayment("S");
                      }, 0);
                    }}
                    value={frequency}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
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
                    onChange={(e) => {
                      setTaxComponent(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setTaxPayment(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Start Date"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    type={"date"}
                    id={"startDate"}
                    name={"Start Date"}
                    required={true}
                    onChange={(e) => {
                      setPostingDate(e.target.value);
                      document.getElementById("months").focus();
                    }}
                    value={postingDate}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Months"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    required={true}
                    id={"months"}
                    onChange={(e) => {
                      setTenor(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "invoiceAmount");
                    }}
                    value={tenor}
                    onBlur={() => getRepaymentFrequency(frequency, tenor)}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Net Invoice Amount"}
                    inputWidth={"60%"}
                    labelWidth={"35%"}
                    required={"true"}
                    id={"invoiceAmount"}
                    textAlign={"right"}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    name={"Invoice Amount"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onTotalAmountBlur(amount, netInvoice);
                      }
                    }}
                    onBlur={() => onTotalAmountBlur(amount, netInvoice)}
                    value={amount}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Amount Ex Tax"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    disabled={true}
                    textAlign={"right"}
                    // value={amount ? formatNumber(taxAmountCalc) : ""}
                    value={
                      amount
                        ? taxComponent == "E"
                          ? amount
                          : exTaxAmount
                          ? formatNumberclear(taxAmountCalc)
                          : ""
                        : ""
                    }
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"User Reference"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    id={"userReference"}
                    onChange={(e) => {
                      setUserReference(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "scanDocument");
                    }}
                    value={userReference}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <div className="flex gap-1">
                    {/* <div style={{ flex: 0.9 }}> */}
                    <InputField
                      label={"Scan Document ID"}
                      labelWidth={"33%"}
                      inputWidth={"59%"}
                      id={"scanDocument"}
                      onChange={(e) => {
                        setScandocID(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        switchFocus(e, "invoiceNumber");
                      }}
                      value={scandocID}
                    />
                    {/* </div> */}
                    {/* <div style={{ flex: 0.1 }}> */}
                    <ButtonComponent
                      buttonHeight={"25px"}
                      buttonWidth={"30px"}
                      onClick={handleClick1}
                      buttonIcon={<FcDocument />}
                    />
                    {/* <ButtonComponent
                        buttonWidth={"30px"}
                        buttonHeight={"25px"}
                        buttonIcon={CustomButtons["viewDoc"].icon}
                        buttonBackgroundColor={CustomButtons["viewDoc"].bgColor}
                      /> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Invoice Number"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    id={"invoiceNumber"}
                    onChange={(e) => {
                      setInvoice_number(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "invoiceDate");
                    }}
                    value={invoice_number}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Invoice Date"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    type={"date"}
                    id={"invoiceDate"}
                    onChange={(e) => {
                      setInvoiceDate(e.target.value);
                      document.getElementById("dateReceived").focus();
                    }}
                    // onKeyDown={(e) => {
                    //   switchFocus(e, "dateReceived");
                    // }}
                    value={invoiceDate}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Date Received"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    type={"date"}
                    id={"dateReceived"}
                    onChange={(e) => {
                      setDateReceived(e.target.value);
                      document.getElementById("effectiveDate").focus();
                    }}
                    value={dateReceived}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Effective Date"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    required={true}
                    type={"date"}
                    id={"effectiveDate"}
                    onChange={(e) => {
                      setEffectiveDate(e.target.value);
                      document.getElementById("narration").focus();
                    }}
                    value={effectiveDate}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "8px" }}>
                {/* <div style={{ flex: 0.5 }}> */}
                <TextAreaField
                  label={"Narration"}
                  labelWidth={"17.5%"}
                  inputWidth={"77.5%"}
                  required={true}
                  id={"narration"}
                  onChange={(e) => {
                    setNarration(e.target.value);
                  }}
                  rows={1}
                  value={narration}
                />
                {/* </div> */}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "5px",
              justifyContent: "end",
            }}
          >
            <ButtonComponent
              label={"Generate Schedule"}
              buttonWidth={"160px"}
              buttonHeight={"30px"}
              onClick={generateSchedule}
              // onClick={changeToSecondTab}
            />
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
          onClose={() => setSweetAlertConfirmed(false)}
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
          <DocumentViewing documentID={scandocID} />
          {/* <Modal.Footer>
            <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      )}
    </div>
  );
}

export default AccountsPayable;

// import React, { useEffect, useState } from "react";
// import { Tabs } from "@mantine/core";
// import { MDBIcon } from "mdb-react-ui-kit";
// import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
// import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
// import InputField from "../../../../../components/others/Fields/InputField";
// import SelectField from "../../../../../components/others/Fields/SelectField";
// import TextAreaField from "../../../../../components/others/Fields/TextArea";
// import Schedule from "./components/tax_schedule";
// import TaxDetails from "./components/tax_details";
// import FinancialDetails from "./components/financial_details";
// import FADetails from "./components/fa_details";
// import DocumentDetails from "./components/document_details";
// import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
// import TabsComponent from "../../../../../components/others/tab-component/tab-component";
// import ButtonType from "../../../../../components/others/Button/ButtonType";
// import Label from "../../../../../components/others/Label/Label";
// import Header from "../../../../../components/others/Header/Header";
// import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
// import axios from "axios";
// import { FcDocument } from "react-icons/fc";
// import { API_SERVER } from "../../../../../config/constant";

// function AccountsPayable() {
//   const headers = {
//     // 'x-api-key': process.env.REACT_APP_API_KEY,
//     "x-api-key":
//       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };

//   const [frequencyLov, setFrequencyLov] = useState([]);
//   const [fAPosting, setFAPosting] = useState([]);
//   const [maintenance, setMaintenance] = useState([]);
//   const [frequency, setFrequency] = useState("");

//   const tabsData = [
//     {
//       value: "default",
//       label: "Document Details",
//       component: <DocumentDetails />,
//     },
//     {
//       value: "tab-2",
//       label: "Financial Details",
//       component: <FinancialDetails />,
//     },
//     {
//       value: "tab-3",
//       label: "FA Details",
//       component: <FADetails fAPosting={fAPosting} maintenance={maintenance} />,
//     },
//     { value: "tab-4", label: "Tax Details", component: <TaxDetails /> },
//     { value: "tab-5", label: "Schedule", component: <Schedule /> },
//   ];

//   useEffect(() => {
//     async function getFrequency() {
//       let response = await axios.get(
//         API_SERVER + "/api/get-frequency",
//         { headers }
//       );
//       setFrequencyLov(response.data);
//     }

//     async function getFAPostingTypeLov() {
//       let response = await axios.post(
//         API_SERVER + "/api/get-code-details",
//         { code: "FAP" },
//         { headers }
//       );
//       setFAPosting(response.data);
//     }
//     async function getMaintenanceLOV() {
//       let response = await axios.post(
//         API_SERVER + "/api/get-code-details",
//         { code: "RMT" },
//         { headers }
//       );
//       setMaintenance(response.data);
//     }
//     getMaintenanceLOV();
//     getFrequency();
//     getFAPostingTypeLov();
//   }, []);

//   return (
//     <div>
//       <div
//         style={{
//           boxShadow:
//             "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
//           borderRadius: "3px",
//           backgroundColor: "#ffffff",
//           marginBottom: "10px",
//         }}
//       >
//         {/* <div
//           style={{
//             background: "#0580c0",
//             color: "white",
//             borderTopLeftRadius: "3px",
//             borderTopRightRadius: "3px",
//             height: "25px",
//             fontSize: "1.1em",
//             paddingLeft: "10px",
//             alignItems: "center",
//           }}
//         >
//           <span>Account Payables</span>
//         </div> */}
//         <div
//           style={{
//             marginTop: "10px",
//             textAlign: "center",
//             // zoom: "0.85",
//             // marginBottom: "10px",
//             padding: "0 15px",
//           }}
//         >
//           <ActionButtons
//             displayFetch={"none"}
//             displayReject={"none"}
//             displayRefresh={"none"}
//             displayAuthorise={"none"}
//             displayCancel={"none"}
//             displayView={"none"}
//             displayDelete={"none"}
//             displayHelp={"none"}
//             onExitClick={() => document.getElementById("closeModalBTN").click()}
//           />
//           {/* <hr style={{marginBottom:'5px'}} /> */}
//         </div>
//         <div style={{ padding: "10px 15px" }}>
//           <div style={{ display: "flex", flex: 1 }}>
//             <div style={{ flex: 0.7 }}>
//               <Header title={"Vendor Information"} headerShade={true} />
//               <div
//                 style={{
//                   boxShadow:
//                     "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
//                   borderRadius: "3px",
//                   // backgroundColor: "#ffffff",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div className="mt-1" style={{ padding: "10px" }}>
//                   <div style={{ display: "flex", marginBottom: "5px" }}>
//                     <div style={{ flex: 0.6 }}>
//                       <ListOfValue
//                         label={"Vendor"}
//                         inputWidth={"80%"}
//                         labelWidth={"15%"}
//                         required={"true"}
//                       />
//                     </div>
//                     <div style={{ flex: 0.4 }}>
//                       <InputField
//                         label={"Vendor Tax ID (TIN)"}
//                         labelWidth={"45%"}
//                         inputWidth={"50%"}
//                         required={"true"}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <Header title={"Invoice Information"} headerShade={true} />
//               <div
//                 className="mt-1"
//                 style={{
//                   boxShadow:
//                     "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
//                   borderRadius: "3px",
//                   // backgroundColor: "#ffffff",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div style={{ padding: "10px" }}>
//                   <div style={{ display: "flex", marginBottom: "15px" }}>
//                     <div style={{ flex: 0.5 }}>
//                       <InputField
//                         label={"Payment Mode"}
//                         inputWidth={"55%"}
//                         labelWidth={"35%"}
//                         required={"true"}
//                         disabled={"true"}
//                         value={"Automatic"}
//                       />
//                     </div>
//                     <div style={{ flex: 0.5 }}>
//                       <div style={{ display: "flex" }}>
//                         <RadioButtons
//                           label={"Tax Payment"}
//                           labelWidth={"30%"}
//                           name={"taxPayment"}
//                           id={"schedule"}
//                           radioLabel={"With Schedule"}
//                           display={true}
//                           id2={"outright"}
//                           radioLabel2={"Outright"}
//                           display2={true}
//                           required={true}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", marginBottom: "15px" }}>
//                     <div style={{ flex: 0.5 }}>
//                       <RadioButtons
//                         label={"Tax Component(GST)"}
//                         labelWidth={"35%"}
//                         name={"taxComponent"}
//                         id={"Inclusive"}
//                         radioLabel={"Inclusive"}
//                         display={true}
//                         id2={"Exclusive"}
//                         radioLabel2={"Exclusive"}
//                         display2={true}
//                         required={true}
//                       />
//                     </div>
//                     <div style={{ flex: 0.5 }}>
//                       <ListOfValue
//                         label={"Frequency"}
//                         labelWidth={"30%"}
//                         inputWidth={"55%"}
//                         required={"true"}
//                         data={frequencyLov}
//                         onChange={(value) => {
//                           setFrequency(value);
//                         }}
//                         value={frequency}
//                       />
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", marginBottom: "15px" }}>
//                     <div style={{ flex: 0.5 }}>
//                       <InputField
//                         label={"Start Date"}
//                         inputWidth={"55%"}
//                         labelWidth={"35%"}
//                         type={"date"}
//                       />
//                     </div>
//                     <div style={{ flex: 0.5 }}>
//                       <InputField
//                         label={"Months"}
//                         labelWidth={"30%"}
//                         inputWidth={"55%"}
//                         required={"true"}
//                       />
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", marginBottom: "15px" }}>
//                     <div style={{ flex: 0.5 }}>
//                       <InputField
//                         label={"Net Invoice Amount"}
//                         inputWidth={"55%"}
//                         labelWidth={"35%"}
//                         required={"true"}
//                       />
//                     </div>
//                     <div style={{ flex: 0.5 }}>
//                       <InputField
//                         label={"Amount Ex Tax"}
//                         labelWidth={"30%"}
//                         inputWidth={"55%"}
//                         required={"true"}
//                         disabled={"true"}
//                       />
//                     </div>
//                   </div>
//                   <div style={{ marginBottom: "15px" }}>
//                     <div style={{}}>
//                       <TextAreaField
//                         label={"Narration"}
//                         inputWidth={"75%"}
//                         labelWidth={"17.5%"}
//                         required={"true"}
//                         inputheight={"25px"}
//                       />
//                     </div>
//                     <div style={{ flex: 0.5 }}></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div style={{ flex: 0.02 }}></div>
//             <div style={{ flex: 0.28 }}>
//               <div
//                 style={{
//                   boxShadow:
//                     "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
//                   borderRadius: "3px",
//                   backgroundColor: "#ffffff",
//                   marginBottom: "10px",
//                   padding: "10px",
//                 }}
//               >
//                 <div style={{ marginBottom: "15px" }}>
//                   <InputField
//                     label={"User Reference"}
//                     inputWidth={"55%"}
//                     labelWidth={"35%"}
//                   />
//                 </div>
//                 <div style={{ marginBottom: "15px", display: "flex" }}>
//                   <div style={{ flex: 0.9 }}>
//                     <InputField
//                       label={"Scan Document ID"}
//                       inputWidth={"57%"}
//                       labelWidth={"40%"}
//                     />
//                   </div>
//                   <div className="flex justify-center" style={{ flex: 0.1 }}>
//                     <ButtonComponent
//                       buttonHeight={"25px"}
//                       buttonWidth={"30px"}
//                       buttonIcon={<FcDocument size={18} />}
//                     />
//                   </div>
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <InputField
//                     label={"Invoice Number"}
//                     inputWidth={"55%"}
//                     labelWidth={"35%"}
//                     type={"required"}
//                   />
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <InputField
//                     label={"Invoice Date"}
//                     type={"date"}
//                     inputWidth={"55%"}
//                     labelWidth={"35%"}
//                   />
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <InputField
//                     label={"Date Received"}
//                     type={"date"}
//                     inputWidth={"55%"}
//                     labelWidth={"35%"}
//                   />
//                 </div>
//               </div>
//               <div
//                 style={{ display: "grid", placeItems: "end", margin: "10px 0" }}
//               >
//                 <ButtonComponent
//                   label={"Generate Schedule"}
//                   buttonWidth={"150px"}
//                   buttonHeight={"30px"}
//                 />
//               </div>
//             </div>
//           </div>
//           {/* tab activity */}
//           {/* <hr/> */}
//           <div>
//             <TabsComponent tabsData={tabsData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountsPayable;
