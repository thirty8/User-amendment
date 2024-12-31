import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
import SelectField from "../../../../../components/others/Fields/SelectField";
import Schedule from "./components/schedule";
import Tax from "./components/tax";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import Header from "../../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { Modal } from "@mantine/core";
import DocumentViewing from "../../../../../components/DocumentViewing";
import swal from "sweetalert";
import { FcDocument } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PrepaymentEnquiry from "./components/prepaymentEnquiry";
import SearchModal from "./components/accountSearchModal";
import SearchModal1 from "./components/expenseAccountSearchModal";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import OverlayLoader from "../../../../../components/others/OverlayLoader";
import {
  NumberWithoutCommas,
  formatNumber,
  formatNumber1,
  formatNumber2dp,
  formatNumberclear,
  regex,
} from "../../components/helpers";

function Prepayment() {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [branchlov, setBranchlov] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [showPosted, setShowPosted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalSearch1, setShowModalSearch1] = useState(false);
  const [scandocID, setScandocID] = useState("");
  const [accountDesc, setAccountDesc] = useState("");
  const [accountNumberExpense, setAccountNumberExpense] = useState("");
  const [accountNumberPrepayment, setAccountNumberPrepayment] = useState("");
  const [debitAccountDesc, setDebitAccountDesc] = useState("");
  // const [accountDesc,setAccountDesc]=useState("")
  const [prepaymentAccountDetails, setPrepaymentAccountDetails] = useState([]);
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
  const [exclusive, setExclusive] = useState(false);
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
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const tabsData = [
    {
      value: "default",
      label: "Tax",
      component: (
        <Tax
          taxTableData={taxTableData}
          taxAmount={taxAmount}
          loading={loading}
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
    async function getBranch() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "BRA", key: "posting" },
          { headers }
        );
        setBranchlov(response.data);
      } catch (error) {
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }

    async function getFrequency() {
      try {
        let response = await axios.get(API_SERVER + "/api/get-frequency", {
          headers,
        });
        setFrequencyLov(response.data);
      } catch (error) {
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }

    async function getCreditAccounts() {
      try {
        axios
          .post(
            API_SERVER + "/api/get-prepayment-credit-account",
            {},
            {
              headers,
            }
          )
          .then((response) => {
            setPrepaymentAccountDetails(response.data);
            console.log(response.data, "dddddd");
          });
      } catch (error) {
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }

    getFrequency();
    getBranch();
    getCreditAccounts();
    // getDebitAccounts("010");
  }, []);

  async function getDebitAccounts(cur) {
    try {
      axios
        .post(
          API_SERVER + "/api/get-prepayment-debit-account",
          { currency: cur },
          { headers }
        )
        .then((response) => {
          setExpenseAccountDetails(response?.data);
        });
    } catch (error) {
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  // useEffect(()=>{
  //   async function getDebitAccounts() {
  //     try {
  //       axios
  //         .post(
  //           API_SERVER + "/api/get-prepayment-debit-account",
  //           { currency: "010" },
  //           { headers }
  //         )
  //         .then((response) => {
  //           setExpenseAccountDetails(response.data);
  //         });
  //     } catch (error) {
  //       swal({ icon: "error", title: "Error", text: error.message });
  //     }
  //   }
  // },[currency])

  useEffect(() => {
    let taxArr = [];
    let arr = [];
    let taxable;
    async function getTax() {
      try {
        setLoading(true);
        await axios
          .get(API_SERVER + "/api/get-prepayment-tax", {
            headers,
          })
          .then((response) => {
            if (response.data.length > 0) {
              response.data.map((i, index) => {
                withTax[`${index}`]
                  ? (taxable = 0.0)
                  : i.type_of_fee == "PERCENT"
                  ? (taxable = formatNumber2dp(
                      (i.fee_amount * NumberWithoutCommas(amount)) / 100
                    ))
                  : (taxable = formatNumber2dp(i.fee_amount));
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
              // setLoading(false);
            }
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }
    getTax();
  }, [checkTax]);

  useEffect(() => {
    TotalTaxReturn();
  }, [taxTableData]);

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

  // function formatNumber(num) {
  //   const numericInput = String(num).replace(/[^0-9.-]/g, "");
  //   // Convert the input to a number and check if it's valid
  //   const number = parseFloat(numericInput);
  //   const formatted = number.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   });

  //   return formatted;
  // }

  useEffect(() => {
    setVoucher_type("PREP");
    setSequence("1");
    setTransactionType("VPAY");
  }, []);

  function TotalTaxReturn() {
    let a = 0;
    taxTableData.map((i) => {
      a += NumberWithoutCommas(i[6]);
    });
    setTaxAmount(a);
    setTaxAmountCalc(NumberWithoutCommas(exTaxAmount) - a);
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

  // function handleSearchModal() {
  //   axios
  //     .post(
  //       "http://localhost:3320/api/get-prepayment-credit-account",
  //       { accountDesc: accountDesc },
  //       { headers }
  //     )
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         setPrepaymentAccountDetails(response.data);
  //         setShowModalSearch(true);
  //       } else {
  //         swal({
  //           icon: "error",
  //           title: "No account found",
  //           text: "",
  //         });
  //       }
  //     });
  // }

  // function handleSearchModal1() {
  //   axios
  //     .post(
  //       "http://localhost:3320/api/get-prepayment-debit-account",
  //       { currency: currency },
  //       { headers }
  //     )
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         setExpenseAccountDetails(response.data);
  //         setShowModalSearch1(true);
  //       } else {
  //         swal({
  //           icon: "error",
  //           title: "No account found",
  //         });
  //       }
  //     });
  // }

  // function handleSelected(value) {
  //   setShowModalSearch(false);
  //   setAccountDesc(value.account_descrp);
  //   setAccountNumberPrepayment(value.tacct);
  //   setCurrency(value.currency);
  //   setTimeout(() => {
  //     document.getElementById("creditBranch").focus();
  //   }, 100);
  // }

  // function handleSelected1(value) {
  //   setShowModalSearch1(false);
  //   setDebitAccountDesc(value.account_descrp);
  //   setAccountNumberExpense(value.tacct);
  //   setTimeout(() => {
  //     document.getElementById("debitBranch").focus();
  //   }, 100);
  // }

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
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
      setRepaymentFrequency(response.data[0]?.repay_freq);
    } catch (error) {
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

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
        swal({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("totalAmount").name,
          text: "",
        });
      } else if (!postingDate) {
        swal({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("startDate").name,
          text: "",
        });
      } else if (!narration) {
        swal({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("narration").name,
          text: "",
        });
      } else {
        axios
          .post(
            API_SERVER + "/api/generate-payable-schedule",

            {
              sequence: sequence,
              frequency: frequency,
              batch_num: "",
              scandoc_id: scandocID,
              // prepayment_id: expense_reference,
              // reference_num: userReference,
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
              creditAccount: accountNumberPrepayment,
              debitAccount: accountNumberExpense,
              repay_frequency: repaymentFrequency,
              posting_date_actual: formatDate(
                JSON.parse(localStorage.getItem("userInfo")).postingDate
              ),
              // invoice_number: invoice_number,
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
              setBatchNumberSchedule(result.data.batchNumber);
              result.data.schedule?.map((i) => {
                arr.push([
                  i.payment_sequnce,
                  i.payable_account_desc,
                  i.expense_account,
                  formatNumber1(i.due_amount),
                  i.due_date,
                  i.frequency_desc,
                  i.branch_desc,
                  i.narration,
                ]);
              });
              setScheduleData(arr);
              swal({ icon: "success", title: result.data.message }).then(
                (res) => {
                  if (res) {
                    changeToSecondTab();
                  }
                }
              );
            } else {
              swal({ icon: "error", title: result.data.message });
            }
          });
      }
    } catch (error) {
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function postPrepayment(batch) {
    try {
      axios
        .post(
          API_SERVER + "/api/post_account_prepayment_procedure",
          {
            referenceNumber: referenceNumber,
            narration: narration,
            frequency: frequency,
            bulkAmount: NumberWithoutCommas(amount),
            taxableAmount:
              taxComponent == "E"
                ? NumberWithoutCommas(amount)
                : NumberWithoutCommas(taxAmountCalc),
            scanDocId: scandocID,
            creditBranch: debitBranch,
            postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
            datePosted: todayDate,
            // postingIP: localStorage.getItem("ipAddress"),
            postingIP: "",
            approvedBy: "",
            approvedDate: "",
            approvedTerminal: "",
            approvedIP: "",
            flag: "N",
            flagMessage: "",
            prepaymentAccount: accountNumberPrepayment,
            expenseAccount: accountNumberExpense,
            debitBranch: creditBranch,
            startDate: formatDate(postingDate),
            tenor: tenor,
            batchNumber: batch,
            taxComponent: taxComponent,
            taxAccounts: taxAccts,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.success === "Y") {
            setPostLoader(false);
            swal({ title: response.data.message, icon: "success", text: "" });
            clearAfterPosting();
          } else {
            setPostLoader(false);
            swal({ title: response.data.message, icon: "error", text: "" });
          }
        });
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function clearAfterPosting() {
    setAccountNumberPrepayment("");
    setAccountNumberExpense("");
    setDebitBranch("");
    setCreditBranch("");
    setFrequency("");
    setTenor("");
    setRepaymentFrequency("");
    setPostingDate("");
    setAmount("");
    setTaxAmountCalc("");
    setExTaxAmount("");
    setTaxComponent("");
    setReferenceNumber("");
    setScandocID("");
    setNarration("");
    setScheduleData([]);
    setCheckTax(!checkTax);
    setExclusive(false);
    changeToFirstTab();
    const arr = { ...withTax };
    Object.keys(arr).forEach((i) => {
      arr[`${i}`] = false;
    });
    setWithTax(arr);
  }

  function clearAllFields() {
    swal({
      title: "Warning",
      icon: "warning",
      text: "All data entered will be cleared!!!",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        clearAfterPosting();
      }
    });
  }

  function onOKClick() {
    try {
      if (!amount) {
        swal({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("totalAmount").name,
          text: "",
        });
      } else if (!postingDate) {
        swal({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("startDate").name,
          text: "",
        });
      } else if (!narration) {
        swal({
          icon: "error",
          title:
            "ERR - 00103: Field is mandatory -" +
            document.getElementById("narration").name,
          text: "",
        });
      } else {
        let batch;
        setPostLoader(true);
        axios
          .post(
            API_SERVER + "/api/generate-payable-schedule",

            {
              sequence: sequence,
              frequency: frequency,
              batch_num: "",
              scandoc_id: scandocID,
              // prepayment_id: expense_reference,
              // reference_num: userReference,
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
              creditAccount: accountNumberPrepayment,
              debitAccount: accountNumberExpense,
              repay_frequency: repaymentFrequency,
              posting_date_actual: formatDate(
                JSON.parse(localStorage.getItem("userInfo")).postingDate
              ),
              // invoice_number: invoice_number,
              voucher_type: voucher_type,
              posted_by: JSON.parse(localStorage.getItem("userInfo")).id,
              posting_terminal: "",
              tax_mode: taxComponent,
            },
            { headers }
          )
          .then((result) => {
            let arr = [];
            // console.log(result, "hhhhhhhressssssssshhhhh");
            if (result.data.success === "Y") {
              batch = result.data.batchNumber;
              result.data.schedule?.map((i) => {
                arr.push([
                  i.payment_sequnce,
                  i.payable_account_desc,
                  i.expense_account,
                  formatNumber1(i.due_amount),
                  i.due_date,
                  i.frequency_desc,
                  i.branch_desc,
                  i.narration,
                ]);
              });
              setScheduleData(arr);
              postPrepayment(batch);
              swal({ icon: "success", title: result.data.message }).then(
                (res) => {
                  if (res) {
                    changeToSecondTab();
                  }
                }
              );
            } else {
              swal({ icon: "error", title: result.data.message });
              setPostLoader(false);
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }
  const referenceField = document.getElementById("totalAmount");

  function onTotalAmountBlur(num, id) {
    if (num) {
      if (regex.test(num) === true) {
        swal({
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
        document.getElementById("referenceNumber").focus();
      }
    } else {
      document.getElementById("referenceNumber").focus();
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
        onExitClick={handleExitClick}
        onOkClick={onOKClick}
        onNewClick={clearAllFields}
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
            {/* <div style={{background:"", color:"white", borderTopLeftRadius:'3px',borderTopRightRadius:'3px',height:'25px',fontSize:'1.1em',paddingLeft:'10px',alignItems:'center'}}>
            <span>Prepay Account (Credit)</span>
            </div> */}
            <div style={{ padding: "12px" }}>
              <div style={{ marginBottom: "15px" }}>
                <ListOfValue
                  data={prepaymentAccountDetails}
                  label={"Credit Account"}
                  labelWidth={"25%"}
                  inputWidth={"64%"}
                  required={true}
                  onChange={(value) => {
                    setAccountNumberPrepayment(value);
                    const curr_act = prepaymentAccountDetails.find(
                      (i) => i["value"] === value
                    );
                    getDebitAccounts(curr_act?.currency);
                    setCurrency(curr_act.currency);
                    setTimeout(() => {
                      const input = document.getElementById("creditBranch");
                      input.focus();
                    }, 0);
                  }}
                  value={accountNumberPrepayment}
                />
                {/* <InputField
                  label={"Credit Account"}
                  labelWidth={"22%"}
                  inputWidth={"72%"}
                  required={true}
                  onChange={(e) => {
                    setAccountDesc(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchModal();
                    }
                  }}
                  value={accountDesc}
                /> */}
                {/* <div>
                  <ButtonComponent
                    buttonWidth={"55px"}
                    label={"search"}
                    onClick={handleSearchModal}
                  />
                </div> */}
              </div>
              <div style={{ marginBottom: "5px" }}>
                <ListOfValue
                  label={"Branch"}
                  labelWidth={"25%"}
                  inputWidth={"64%"}
                  required={true}
                  data={branchlov}
                  id={"creditBranch"}
                  onChange={(value) => {
                    setDebitBranch(value);
                    setTimeout(() => {
                      document.getElementById("debitAccount").focus();
                    }, 100);
                  }}
                  value={debitBranch}
                />
              </div>
            </div>
          </div>
          {/* <SearchModal
            setShowModal={setShowModalSearch}
            showModal={showModalSearch}
            filter1={prepaymentAccountDetails}
            handleSelected={handleSelected}
          />
          <SearchModal1
            setShowModal={setShowModalSearch1}
            showModal={showModalSearch1}
            filter1={expenseAccountDetails}
            handleSelected={handleSelected1}
          /> */}
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
            <div style={{ padding: "12px" }}>
              <div style={{ marginBottom: "15px" }}>
                <ListOfValue
                  data={expenseAccountDetails}
                  label={"Debit Account"}
                  labelWidth={"25%"}
                  inputWidth={"64%"}
                  required={true}
                  id={"debitAccount"}
                  onChange={(value) => {
                    setAccountNumberExpense(value);
                    setTimeout(() => {
                      document.getElementById("debitBranch").focus();
                    }, 100);
                  }}
                  value={accountNumberExpense}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <ListOfValue
                  label={"Branch"}
                  labelWidth={"25%"}
                  inputWidth={"64%"}
                  required={true}
                  data={branchlov}
                  id={"debitBranch"}
                  onChange={(value) => {
                    setCreditBranch(value);
                    setTimeout(() => {
                      document.getElementById("frequencyLov").focus();
                    }, 100);
                  }}
                  value={creditBranch}
                />
              </div>
            </div>
          </div>
          {/* buttons */}
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            {showPosted && (
              <Modal
                className="p-0 m-0"
                opened={showPosted}
                size="100%"
                padding={0}
                withCloseButton={false}
                transitionProps={"mounted"}
                closeOnClickOutside={false}
                onClose={() => setShowPosted(false)}
              >
                <Header
                  title={"Prepayment Enquiry"}
                  backgroundColor={"#0580c0"}
                  closeIcon={<AiOutlineCloseCircle size={18} />}
                  handleClose={() => {
                    setShowPosted(false);
                  }}
                />
                <PrepaymentEnquiry
                  setShowPosted={setShowPosted}
                  prepaymentAccountDetails={prepaymentAccountDetails}
                  expenseAccountDetails={expenseAccountDetails}
                  frequencyLov={frequencyLov}
                  branchlov={branchlov}
                  getDebitAccounts={getDebitAccounts}
                />
              </Modal>
            )}
          </div>
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
            <div style={{ padding: "15px 15px 15px" }}>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Payment Mode"}
                    labelWidth={"30%"}
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
                    inputWidth={"62%"}
                    required={true}
                    data={frequencyLov}
                    id={"frequencyLov"}
                    onChange={(value) => {
                      setFrequency(value);
                      getRepaymentFrequency(value);
                      if (!tenor) {
                        setTenor("12");
                      }
                      setTimeout(() => {
                        document.getElementById("tenor").focus();
                        setTaxComponent("I");
                      }, 0);
                    }}
                    value={frequency}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Tenor (In months)"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    onChange={(e) => {
                      setTenor(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "startDate");
                    }}
                    id={"tenor"}
                    value={tenor}
                    onBlur={() => getRepaymentFrequency(frequency, tenor)}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Payment count"}
                    labelWidth={"30%"}
                    inputWidth={"62%"}
                    disabled={"true"}
                    value={repaymentFrequency}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Start Date"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    type={"date"}
                    required={true}
                    value={postingDate}
                    id={"startDate"}
                    name={"Start Date"}
                    onChange={(e) => {
                      setPostingDate(e.target.value);
                      document.getElementById("totalAmount").focus();
                    }}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Total Amount"}
                    labelWidth={"30%"}
                    inputWidth={"62%"}
                    required={true}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onTotalAmountBlur(amount, referenceField);
                      }
                    }}
                    name={"Amount"}
                    id={"totalAmount"}
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    onBlur={() => onTotalAmountBlur(amount, referenceField)}
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
                    onChange={(e) => {
                      setTaxComponent(e.target.value);
                      // if (e.target.value === "E") {
                      setCheckTax(!checkTax);
                      // }
                    }}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Amount Ex Tax"}
                    labelWidth={"30%"}
                    inputWidth={"62%"}
                    disabled={true}
                    // value={taxAmount}
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
                    label={"Reference Number"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    id={"referenceNumber"}
                    onChange={(e) => {
                      setReferenceNumber(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "scanDocid");
                    }}
                    value={referenceNumber}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <div style={{ display: "flex", flex: 1 }}>
                    <div style={{ flex: 0.9 }}>
                      <InputField
                        label={"Scan Document ID"}
                        labelWidth={"34%"}
                        inputWidth={"58%"}
                        onChange={(e) => {
                          setScandocID(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          switchFocus(e, "narration");
                        }}
                        id={"scanDocid"}
                        value={scandocID}
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
              <div style={{ marginBottom: "" }}>
                <InputField
                  label={"Narration"}
                  labelWidth={"15%"}
                  inputWidth={"81%"}
                  value={narration}
                  required={true}
                  id={"narration"}
                  onChange={(e) => {
                    setNarration(e.target.value);
                  }}
                  name={"Narration"}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <ButtonComponent
              label={"Posted"}
              buttonWidth={"70px"}
              buttonHeight={"30px"}
              margin={"10px"}
              onClick={() => {
                setShowPosted(true);
              }}
            />
            <ButtonComponent
              label={"Generate Schedule"}
              buttonWidth={"160px"}
              buttonHeight={"30px"}
              onClick={() => {
                generateSchedule();
              }}
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

export default Prepayment;
