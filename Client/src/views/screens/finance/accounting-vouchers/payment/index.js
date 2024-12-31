import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
// import { VscClose } from "react-icons/vsc";
// import { AiOutlineEye } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import InputField from "../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import { Notification } from "@mantine/core";
// import Modal from "react-bootstrap/Modal";
import RowComponent from "./components/Row";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { AiOutlineDoubleRight, AiOutlineCloseCircle } from "react-icons/ai";
import { FcDocument } from "react-icons/fc";
import PostedTransactions from "./components/PostedTransactions";
// import Kayso from "./components/Kayso";
import { API_SERVER } from "../../../../../config/constant";
import ViewSuspended from "./components/ViewSuspended";
import { Modal } from "@mantine/core";
import DocumentViewing from "../../../../../components/others/DocumentViewing";
import { Loader } from "@mantine/core";
import swal from "sweetalert";
import Header from "../../../../../components/others/Header/Header";
import SearchModal from "../receipt/components/Modal";
// import CustomTable from "../../../../../components/others/customtable";
import CustomTable from "../../../teller-ops/components/CustomTable";
import CustomButtons from "../../../../../components/others/CustomButtons";
import PostedTransactionDetails from "./components/ArrowButtonDetails";
import OverlayLoader from "../../../../../components/others/OverlayLoader";
import { FaCheck } from "react-icons/fa";
import {
  NumberWithoutCommas,
  formatDate,
  formatNumber,
  formatNumber2dp,
} from "../../components/helpers";
import SkeletonInput from "antd/es/skeleton/Input";

function Payment() {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  /// USESTATES ///
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [postTransLoader, setPostTransLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showDebit, setShowDebit] = useState(false);
  const [batch_number, setBatch_number] = useState("");
  const [postedData, setPostedData] = useState([]);
  const [viewSuspendedData, setViewSuspendedData] = useState([]);
  const [branch, setBranch] = useState([]);
  const [branchValue, setBranchValue] = useState("");
  const [currency, setCurrency] = useState([]);
  const [currencyValue, setCurrencyValue] = useState("");
  const [debitAccount, setDebitAccount] = useState("");
  const [scanDocDebit, setScanDocDebit] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [documentReference, setDocumentReference] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [debitData, setDebitData] = useState([]);
  const [debitAccountNumber, setDebitAccountNumber] = useState("");
  const [loader, setLoader] = useState(false);
  const [debitAccNum, setDebitAccNum] = useState("");
  const [batch_numberSuspend, setBatch_numberSuspend] = useState("");
  const [total, setTotal] = useState("");
  const [creditAccountData, setCreditAccountData] = useState([]);
  const [creditAccountCurrentBalance, setCreditAccountCurrentBalance] =
    useState("");
  const [rows, setRows] = useState([{}, {}, {}, {}, {}, {}]);
  const [p_credit_acs, setP_credit_acs] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [paymentTransType, setPaymentTransType] = useState("");
  const [postingUser, setPostingUser] = useState("");
  const [postingChannel, setPostingChannel] = useState("");
  const [postingModule, setPostingModule] = useState("");
  const [postingTerminalID, setPostingTerminalID] = useState("");
  const [batch_amount, setBatchAmount] = useState("");
  const [value_Date, setValue_Date] = useState("");
  const [approvalFlagFilter, setApprovalFlagFilter] = useState("");
  const [postingMachineIp, setPostingMachineIp] = useState("");
  const [openPostedModalDetails, setOpenPostedModalDetails] = useState(false);
  const [postedModalDetailsData, setPostedModalDetailsData] = useState([]);
  const [postingDestinationSuspend, setPostingDestinationSuspend] =
    useState("");
  const [postingDestination, setPostingDestination] = useState("");
  const [cleared, setCleared] = useState(false);

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [userBranch, setUserBranch] = useState("");
  const [approvalFlag, setApprovalFlag] = useState("");
  const [suspendedArrowDetailsData, setSuspendedArrowDetailsData] = useState(
    []
  );
  const [arrowButtonSuspendedState, setArrowButtonSuspendedState] =
    useState(false);
  const [totalDebit, setTotalDebit] = useState("");
  const [typeOfAccount, setTypeOfAccount] = useState("");
  const [notification, setNotification] = useState(false);
  const [emptyFieldState, setEmptyFieldState] = useState(false);
  const [postedDebit, setPostedDebit] = useState([]);
  const [postedCredit, setPostedCredit] = useState([]);
  const [accName, setAccName] = useState("");
  const [chartGroup, setChartGroup] = useState("");
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [fetchData1, setFetchData1] = useState(false);
  const [fetchData2, setFetchData2] = useState(false);
  const [fetchData3, setFetchData3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCustomTable, setLoadingCustomTable] = useState(false);
  const [debit_acct_currency, setdebit_acct_currency] = useState("");
  let currencyMismatch;

  // const [newRowState, setNewRowState] = useState([])

  /// USE EFFECTS ///
  useEffect(() => {
    setPaymentTransType("PYMT");
    setPostingUser(userInfo.id);
    setPostingChannel("BRA");
    setPostingModule("prc_fin_act_vcr_rt");
    setPostingDestination("P");
    setPostingDestinationSuspend("S");
    // setPostingTerminalID("USG-DC");
    // setPostingMachineIp("192.168.1.23");
    setUserBranch(userInfo.branchCode);

    async function getAllBranches() {
      try {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            { code: "BRA", key: "posting" },
            {
              headers,
            }
          )
          .then((response) => {
            // console.log("res baby", response.data);
            setBranch(response.data);
          });
      } catch (error) {
        swal({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    }
    getAllBranches();

    async function getAllCurrencies() {
      try {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            { code: "CUR" },
            {
              headers,
            }
          )
          .then((response) => {
            setCurrency(response.data);
            // console.log("richie", response.data);
          });
      } catch (error) {
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }
    getAllCurrencies();

    // console.log(branchLOV, "my branch")
  }, []);

  useEffect(() => {
    if (suspendedArrowDetailsData.length > 0) {
      let newRows = [];
      suspendedArrowDetailsData?.map((i, value) => {
        if (i.local_equivalent_db !== "null") {
          setValueDate(i.value_date);
          setCurrencyValue(i.currency_code);
          setDebitAccount(i.account_descrption);
          setDebitAccountNumber(i.acct_link);
          setBranchValue(i.inter_branch);
          setCurrentBalance(formatNumber1(i.acct_balance));
          setScanDocDebit(i.scan_doc_id);
          setTransactionDetails(i.transaction_details);
          setDocumentReference(i.document_ref);
          setTotal(formatNumber1(i.local_equivalent_db));
          setTotalDebit(formatNumber1(i.local_equivalent_db));
          setdebit_acct_currency(i.currency_code);
          // console.log(i, "kayso");
        } else if (i.local_equivalent_cr !== "null") {
          const newObj = {
            credit_acc_desc: i.account_descrption,
            p_credit_acct: i.acct_link,
            p_credit_amt: formatNumber1(i.local_equivalent_cr),
            p_credit_bra: i.inter_branch,
            p_credit_scan_doc_id: i.scan_doc_id,
            p_credit_trans_desc: i.transaction_details,
            p_credit_nrtn: i.narration,
            p_credit_doc_ref: i.document_ref,
            account_currency: i.currency_code,
          };
          newRows.unshift(newObj);
          // p_credit_acs.push(newObj);

          // console.log("obj", { p_credit_acct: i.account_descrption })

          // console.log("here wai derrick", rows)
        }
        setRows([...newRows, {}, {}, {}, {}, {}]);
        // console.log(rows, "my rowsssss")
      });
    }
  }, [suspendedArrowDetailsData]);
  // console.log(newRowState, "newwwwwwww");

  useEffect(() => {
    if (postedModalDetailsData) {
      let arr = [];
      postedModalDetailsData.map((d) => {
        if (d.local_equivalent_cr > 0) {
          setPostedDebit(d);
        }
        arr.push([
          d.account_desc,
          d.acct_link,
          d.narration,
          d.scan_doc_id,
          formatNumber1(d.local_equivalent_cr),
          formatNumber1(d.local_equivalent_db),
          d.branch,
        ]);
      });
      setPostedCredit(arr);
    }
  }, [postedModalDetailsData]);

  /// FUNCTIONS ///
  const handleClose = () => {
    setShow(false);
    setPostedCredit([]);
    setPostedData([]);
  };
  const handleClose2 = () => {
    setShow2(false);
    setViewSuspendedData([]);
  };
  const handleCloseDebit = () => setShowDebit(false);

  //  date
  const currentDate = new Date();
  const monthNames = [
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
  const day =
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate();
  const formattedDate =
    day +
    "-" +
    monthNames[currentDate.getMonth()] +
    "-" +
    currentDate.getFullYear();

  const handleInputChange = (index, name, value) => {
    const newRow = { ...rows[index], [name]: value };
    const newRows = [...rows.slice(0, index), newRow, ...rows.slice(index + 1)];
    setRows(newRows);
  };

  // handleEnter
  const handleEnter = (index, rowData) => {
    const updatedRows = [...rows];
    updatedRows[index] = rowData;
    //  Check if any of the inputs in the row is empty

    if (
      updatedRows[index].p_credit_acct == "" ||
      updatedRows[index].p_credit_amt == "" ||
      updatedRows[index].p_credit_bra == "" ||
      updatedRows[index].p_credit_scan_doc_id == "" ||
      updatedRows[index].p_credit_trans_desc == ""
      // updatedRows[index].p_credit_nrtn == "" ||
      // updatedRows[index].p_credit_doc_ref == ""
    ) {
      swal({
        icon: "warning",
        title: "Empty field(s) found",
        text: "Please fill out all fields in the row",
        confirmButtonText: "OK",
      }).then((result) => {
        setEmptyFieldState(true);
      });
    } else if (
      updatedRows[index].p_credit_acct == undefined ||
      updatedRows[index].p_credit_amt == undefined ||
      updatedRows[index].p_credit_bra == undefined ||
      updatedRows[index].p_credit_scan_doc_id == undefined ||
      updatedRows[index].p_credit_trans_desc == undefined
      // updatedRows[index].p_credit_nrtn == undefined ||
      // updatedRows[index].p_credit_doc_ref == undefined
    ) {
      swal({
        icon: "warning",
        title: "Empty field(s) found",
        text: "Please fill out all fields in the row",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result) {
          setEmptyFieldState(true);
        }
      });
    } else {
      // If all inputs have values, update the rows with the new data
      setRows(updatedRows);
      // localStorage.setItem('rows', JSON.stringify(updatedRows));
      // performPostRequest(updatedRows);
      if (index >= 4) {
        renderComponent();
      }
      setCreditAccountData(["", "", "", "", "", ""]);
      setAccName("");
      setChartGroup("");
      setCreditAccountCurrentBalance("");
      showNotification();
      setEmptyFieldState(false);
    }
  };

  const performPostRequest = (data) => {
    // const filteredData = data.filter(row => row !== {});
    const nonEmptyRows = data.filter((row) => Object.keys(row).length > 0);
    const newinfo = nonEmptyRows.filter((row) =>
      Object.values(row).some((value) => value !== "")
    );
    // const newinfo2= {...newinfo}
    // delete newinfo2[credit_acc_desc]

    setP_credit_acs(newinfo);
    // console.log("newinfo2",newinfo2)
  };

  //  ==============================================

  // Notification
  const showNotification = () => {
    setNotification(true);
    const timeout = setTimeout(() => {
      setNotification(false);
    }, 1500);

    return () => clearTimeout(timeout);
  };
  // handleCLose Notification
  const handleCloseNotification = () => setNotification(false);

  //  ====================================================

  // render row component
  const renderComponent = () => {
    const newRows = [...rows, {}];
    setRows(newRows);
  };

  function handleSelected(value) {
    if (
      value.status_desc === "DEBIT BLOCK" ||
      value.status_desc === "DORMANT"
    ) {
      setShowDebit(false);
      setCurrentBalance("");
      setDebitAccountNumber("");
      // setDebitAccount("");
      swal({
        // "Invalid Entry",
        title: "ERR - 00150",
        text: "This Account is Either Dormant Or is Blocked From Debit Transactions",
        icon: "error",
      }).then((result) => {
        if (result) {
          // setTimeout(() => {
          document.getElementById("debit_account_field").focus();
          // }, 100);
        }
      });
    } else if (value.status_desc === "TOTAL BLOCKAGE") {
      setShowDebit(false);
      setCurrentBalance("");
      setDebitAccountNumber("");
      // setDebitAccount("");
      swal({
        // "Invalid Entry",
        title: "ERR - 07417",
        text: "This Account has Total Blockage",
        icon: "error",
      }).then((result) => {
        if (result) {
          // setTimeout(() => {
          document.getElementById("debit_account_field").focus();
          // }, 100);
        }
      });
    } else {
      setShowDebit(false);
      // setDebitAccNum(value.account_descrption);
      setDebitAccount(value.account_descrption);
      setDebitAccountNumber(value.tacct);
      setCurrentBalance(formatNumber2dp(value.acct_balance));
      setTypeOfAccount(value.type_of_acct);
      setdebit_acct_currency(value.currency);
      setTimeout(() => {
        document.getElementById("scan_doc_debit_field").focus();
      }, 100);
    }
    // setOnELOVE(value)
  }

  // view document
  function handleClickViewDoc() {
    if (scanDocDebit === "") {
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
      // alert("here");
      setSweetAlertConfirmed(true);
    }
  }

  const handleTotal = () => {
    const newTotal = rows.reduce((acc, row) => {
      if (row && row.p_credit_amt) {
        const num = parseFloat(row.p_credit_amt.replace(/,/g, ""));
        return isNaN(num) ? acc : acc + num;
      }
      return acc;
    }, 0);

    const formattedTotal = formatNumber2dp(newTotal);
    setTotal(formattedTotal);
  };

  function formatNumber1(num) {
    const number = parseFloat(num);

    if (isNaN(number)) {
      return ""; // Return an empty string for invalid input
    }

    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  // Removing Row Component
  const handleRemoveRow = (index, rowObject1) => {
    const updatedRows = [...rows];
    if (rowObject1 == undefined) {
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    } else {
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      const newdebitTotal2 =
        NumberWithoutCommas(total) - NumberWithoutCommas(rowObject1);
      setTotal(formatNumber2dp(newdebitTotal2));
      setAccName("");
      setChartGroup("");
      setCreditAccountCurrentBalance("");
    }
  };

  //Clearing Values in Row Component
  const handleClearValuesInRow = (index, clearedRowData, creditTotal) => {
    const updatedRows = [...rows];
    if (updatedRows[index].id !== undefined) {
      updatedRows.splice(index, 1);
    } else {
      updatedRows[index] = clearedRowData;
    }
    setRows(updatedRows);
    const newCreditTotal =
      NumberWithoutCommas(total) - NumberWithoutCommas(creditTotal);
    setTotal(formatNumber2dp(newCreditTotal));
    setAccName("");
    setChartGroup("");
    setCreditAccountCurrentBalance("");
  };

  //Clearing All Input Values
  const handleClear = () => {
    swal({
      title: "Are you sure?",
      text: "All entered data can't be recovered!!",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((result) => {
      if (result) {
        setCleared(!cleared);

        setCurrencyValue("");
        setBranchValue("");
        setScanDocDebit("");
        setDebitAccount("");
        setValueDate("");
        setDocumentReference("");
        setTotal("");
        setCurrentBalance("");
        setTransactionDetails("");
        setTotalDebit("");
        setDebitAccountNumber("");
        setTypeOfAccount("");
        setRows([{}, {}, {}, {}, {}, {}]);
        setCreditAccountData(["", "", "", "", "", ""]);
        setAccName("");
        setChartGroup("");
        setCreditAccountCurrentBalance("");
        setBatch_numberSuspend("");
        setP_credit_acs([]);
        setSuspendedArrowDetailsData([]);
        swal({
          title: "Data cleared",
          text: "All inputs cleared successfully",
          icon: "success",
          buttons: "OK",
          timer: 1000,
        });
      }
    });
  };

  function ClearAfterPosting() {
    setCleared(!cleared);
    setCurrencyValue("");
    // setBranchValue("");
    setScanDocDebit("");
    setDebitAccount("");
    setValueDate("");
    setDocumentReference("");
    setTotal("");
    setCurrentBalance("");
    setTransactionDetails("");
    setTotalDebit("");
    setDebitAccountNumber("");
    setBatch_numberSuspend("");
    setDebitAccount("");
    setTypeOfAccount("");
    setRows([{}, {}, {}, {}, {}, {}]);
    setCreditAccountData(["", "", "", "", "", ""]);
    setAccName("");
    setChartGroup("");
    setCreditAccountCurrentBalance("");
    setP_credit_acs([]);
    setSuspendedArrowDetailsData([]);
  }

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  /// API FUNCTIONS ///

  //FILTERTING THROUGH BY DEBIT ACCOUNT NUMBER OR ACCOUNT DESCRIPTION
  const handleKeyDownDebitAccount = (e) => {
    // if (e.key === "Enter") {
    // setLoader(true)
    try {
      setLoader(true);
      axios
        .post(
          API_SERVER +
            "/api/get-account-details-by-account-name-or-account-desc",
          {
            currency: currencyValue,
            account_desc: debitAccount,
            account_number: debitAccount,
          },
          {
            headers,
          }
        )
        .then((response) => {
          // setShowDebit(true);
          if (response.data.length === 0) {
            // setShowDebit(true);
            setLoader(false);
            swal("ERR - 06077", "No Data Found", "error");
            setDebitAccount("");
            setCurrentBalance(Number(0).toFixed(2));

            // console.log("no data");
          } else if (response.data.length === 1) {
            if (
              response.data[0]?.status_desc === "TOTAL BLOCKAGE" ||
              response.data[0]?.status_desc === "DEBIT BLOCK" ||
              response.data[0]?.status_desc === "DORMANT"
            ) {
              setLoader(false);
              swal({
                title: "ERR - 00150",
                text: "This Account is either Dormant or Blocked From Debit Transactions",
                icon: "error",
              }).then((res) => {
                if (res) {
                  document.getElementById(`debit_account_field`).focus();
                  document.getElementById(`debit_account_field`).select();
                }
              });
            } else if (response.data[0]?.status_desc === "TOTAL BLOCKAGE") {
              setLoader(false);
              swal({
                title: "ERR - 07417",
                text: "This Account has Total Blockage",
                icon: "error",
              }).then((res) => {
                if (res) {
                  document.getElementById(`debit_account_field`).focus();
                  document.getElementById(`debit_account_field`).select();
                }
              });
            } else {
              setDebitAccount(response.data[0]?.account_descrption);
              setCurrentBalance(
                formatNumber2dp(response.data[0]?.acct_balance)
              );
              setDebitAccountNumber(response.data[0]?.tacct);
              setTypeOfAccount(response.data[0]?.type_of_acct);
              setdebit_acct_currency(response.data[0]?.currency);
              setLoader(false);
              document.getElementById("scan_doc_debit_field").focus();
            }
          } else if (response.data.length > 1) {
            setLoader(false);
            setShowDebit(true);
            setDebitData(response.data);
            // console.log("data is here")
          }
        });
    } catch (error) {
      setLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
    // }
    // trimData();
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (currencyValue == "") {
        swal(
          "Currency not selected!!!",
          "kindly select one to search for account",
          { icon: "warning" }
        );
      } else if (debitAccount.length === 0) {
        swal(
          "Account number/name not entered!!!",
          "kindly enter one to search for account",
          { icon: "warning" }
        );
      } else {
        setLoader(true);
        handleKeyDownDebitAccount();
      }
    }
  }

  const handleShowPostedTransaction = (flag) => {
    setLoadingCustomTable(true);
    setShow(true);
    try {
      axios
        .post(
          API_SERVER + "/api/get-posted-transactions",
          flag === "R"
            ? {
                batch_number: "",
                r_trans_type: "PYMT",
                p_user: postingUser,
                batch_amount: "",
                approval_flag: "",
                value_date: "",
              }
            : {
                batch_number: batch_number,
                r_trans_type: "PYMT",
                p_user: postingUser,
                batch_amount: batch_amount,
                approval_flag: approvalFlagFilter,
                value_date: value_Date ? formatDate(value_Date) : "",
              },
          { headers }
        )
        .then((response) => {
          if (response.data.length != 0) {
            let arr = [];
            // setFetchData(false);
            // setShow(true);
            response.data.map((i) => {
              arr.push([
                // postedData.push([
                i.batch_no,
                formatDate(i.value_date),
                i.batch_desc,
                i.trans_count,
                formatNumber1(i.batch_amount),
                i.batch_status,
                <div className="grid items-center place-items-center">
                  <ButtonComponent
                    // buttonIcon={<AiOutlineDoubleRight size={18} />}
                    buttonIcon={CustomButtons["viewDetails"].icon}
                    onClick={() => {
                      setFetchData1(true);
                      async function postedTransactions() {
                        axios
                          .post(
                            API_SERVER + "/api/get-posted-transaction-details",
                            {
                              batch_no: i.batch_no,
                              r_trans_type: "PYMT",
                            },
                            { headers }
                          )
                          .then((response) => {
                            if (response.data.length != 0) {
                              setFetchData1(false);
                              setOpenPostedModalDetails(true);
                              setPostedModalDetailsData(response.data);
                              setApprovalFlag(i.approval_flag);
                            } else {
                              setFetchData1(false);
                              swal("ERR - 06077", "No Data Found", {
                                icon: "error",
                              });
                              // setLoader(false)
                            }
                          });
                      }
                      postedTransactions();
                      // console.log("Edit row:", rowIndex,rowData);
                    }}
                  />
                </div>,
              ]);
              setPostedData(arr);
              setLoadingCustomTable(false);
              // setFetchData1(false);
            });
            // setLoader(false)
            // setS(true)

            // setPostedData(response.data);
            // setPostTransLoader(false);
            // console.log(response.data,"filter")
          } else {
            setLoadingCustomTable(false);
            // setFetchData(false);
            // setFetchData1(false);
            // swal("ERR - 06077", "No Data Loaded", "error");
            // setLoader(false)
          }
        });
    } catch (error) {
      setLoadingCustomTable(false);
      // setFetchData(false);
      // setFetchData1(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  };
  // console.log(postedData, "posted data")

  const handleShowViewSuspended = (flag) => {
    setLoadingCustomTable(true);
    setShow2(true);
    try {
      axios
        .post(
          API_SERVER + "/api/get-view-suspended-details",
          // {
          //   batch_no: batch_number,
          //   p_user: postingUser,
          //   r_trans_type: "PYMT",
          // },
          flag === "R"
            ? {
                batch_number: "",
                r_trans_type: "PYMT",
                p_user: postingUser,
                batch_amount: "",
                approval_flag: "",
                value_date: "",
              }
            : {
                batch_number: batch_number,
                r_trans_type: "PYMT",
                p_user: postingUser,
                batch_amount: batch_amount,
                approval_flag: approvalFlagFilter,
                value_date: value_Date ? formatDate(value_Date) : "",
              },
          { headers }
        )
        .then((response) => {
          if (response.data.length != 0) {
            let arr = [];
            // setFetchData(false);
            // setFetchData3(false);
            // setShow2(true);
            response.data.map((i) => {
              arr.push([
                i.batch_no,
                formatDate(i.value_date),
                i.batch_desc,
                i.trans_count,
                formatNumber1(i.batch_amount),
                <div className="grid items-center place-items-center">
                  <ButtonComponent
                    // buttonIcon={<AiOutlineDoubleRight size={18} />}
                    buttonIcon={CustomButtons["next"].icon}
                    onClick={() => {
                      ClearAfterPosting();
                      setFetchData2(true);
                      setBatch_numberSuspend(i.batch_no);
                      axios
                        .post(
                          API_SERVER + "/api/get-suspended-transaction-details",
                          {
                            batch_no: i.batch_no,
                            voucher_number: "PYMT",
                          },
                          { headers }
                        )
                        .then((response) => {
                          if (response.length !== 0) {
                            // setArrowButtonSuspendedState(true);
                            setSuspendedArrowDetailsData(response.data);
                            setFetchData2(false);
                            setShow2(false);
                            setViewSuspendedData([]);
                          } else {
                            setFetchData2(false);
                            swal("ERR - 06077", "No Data Loaded", "error");
                          }
                          // setShowArrowComponent(true);
                        });
                      // console.log(suspendDetails,"suspendDetails")
                    }}
                  />
                </div>,
              ]);
            });
            setViewSuspendedData(arr);
            // setFetchData3(false);
            setLoadingCustomTable(false);
          } else {
            setLoadingCustomTable(false);
            // setFetchData(false);
            // setFetchData3(false);
            setViewSuspendedData([]);
            // swal("ERR - 06077", "No Data Loaded", "error");
          }
        });
    } catch (error) {
      // setFetchData(false);
      // setFetchData3(false);
      setLoadingCustomTable(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  };

  //handle clck arrow button for suspended trnasactions
  // const handleClickSuspendedArrowButton = (value, tableMeta, updateValue) => {
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center" }}>
  //       <ButtonComponent
  //         label={<HiOutlineArrowSmRight size={30} color="white" />}
  //         onClick={() => {
  //           handleClose2();
  //           const batch_number = tableMeta.rowData[2];
  //           axios
  //             .post(
  //               API_SERVER + "/api/get-suspended-transaction-details",
  //               {
  //                 batch_no: batch_number,
  //                 // p_user: postingUser,
  //                 // voucher_number: "PYMT",
  //                 // currency: "010",
  //               },
  //               { headers }
  //             )
  //             .then((response) => {
  //               if (response.length !== 0) {
  //                 setArrowButtonSuspendedState(true);
  //                 // setArrowButtonSuspendedState(true);
  //                 setSuspendedArrowDetailsData(response.data);
  //               } else {
  //                 swal("ERR - 06077", "No Data Loaded", "error");
  //               }
  //               // setShowArrowComponent(true);
  //             });
  //         }}
  //         buttonWidth={"40%"}
  //         type={"button"}
  //         buttonHeight={"30%"}
  //       />
  //     </div>
  //   );
  // };

  const p_debit_account_array = [
    {
      p_debit_acct: debitAccountNumber,
      p_debit_amt: NumberWithoutCommas(total),
      p_debit_bra: branchValue,
      p_debit_doc_ref: documentReference,
      p_debit_scan_doc_id: scanDocDebit,
      p_debit_trans_desc: transactionDetails,
      p_debit_nrtn: transactionDetails,
    },
  ];

  // Posting Procedure
  const handlePosting = () => {
    try {
      let credits_arr = [];
      setPostLoader(true);

      rows.map((row) => {
        if (
          Object.keys(row).length > 0 &&
          Object.values(row).some((value) => value !== "")
        ) {
          console.log(row.account_currency);
          if (row.account_currency !== currencyValue) {
            currencyMismatch = true;
            return;
          } else {
            currencyMismatch = false;
          }
        }
      });

      if (totalDebit === "") {
        setPostLoader(false);
        swal("Sorry", "Total Debit cannot be empty", "warning");
      } else if (
        NumberWithoutCommas(totalDebit) !== NumberWithoutCommas(total)
      ) {
        setPostLoader(false);
        swal({
          title: "Error",
          text: "Total Amount mismatch",
          icon: "error",
        });
      } else if (currencyValue !== debit_acct_currency || currencyMismatch) {
        // currencyMismatch = true;
        setPostLoader(false);
        swal({
          icon: "error",
          title: "ERR - 05664",
          text: "Currency mismatch. Please select and ensure all accounts are in the appropriate currency.",
          closeOnClickOutside: false,
        });
      } else {
        // p_credit_acs.map((acs) => {
        //   acs.p_credit_amt = NumberWithoutCommas(acs.p_credit_amt);
        // });

        rows.map((row) => {
          if (
            Object.keys(row).length > 0 &&
            Object.values(row).some((value) => value !== "")
          ) {
            credits_arr.push({
              p_credit_acct: row.p_credit_acct,
              p_credit_amt: NumberWithoutCommas(row.p_credit_amt),
              p_credit_bra: row.p_credit_bra,
              p_credit_doc_ref: documentReference,
              p_credit_scan_doc_id: row.p_credit_scan_doc_id
                ? row.p_credit_scan_doc_id
                : scanDocDebit,
              p_credit_trans_desc: row.p_credit_trans_desc
                ? row.p_credit_trans_desc
                : transactionDetails,
              p_credit_nrtn: transactionDetails,
            });
          }
        });

        axios
          .post(
            API_SERVER + "/api/post_prc_receipt_payment_journal_backvalue",
            {
              r_trans_type: paymentTransType,
              currency: currencyValue,
              p_user: postingUser,
              valueDate: valueDate,
              branch: userBranch,
              p_destination: postingDestination,
              post_channel: postingChannel,
              module: postingModule,
              // terminal_id: postingTerminalID,
              // machine_ip: postingMachineIp,
              p_debit_amount_total: total,
              p_debit_acs: p_debit_account_array,
              p_credit_acs: credits_arr,
              batch_number: batch_numberSuspend,
              // p_credit_acs: creditAccountsArray,
            },
            { headers }
          )
          .then((response) => {
            setPostLoader(false);
            if (response.data.success === "Y") {
              swal({ title: response.data.message, icon: "success" });
              ClearAfterPosting();
            } else {
              swal({ title: response.data.message, icon: "error" });
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  };

  // Suspend Procedure

  const handleSuspend = () => {
    try {
      let credits_arr = [];
      setPostLoader(true);
      if (totalDebit === "") {
        setPostLoader(false);
        swal("Sorry", "Total Debit amount not entered", "warning");
      } else if (
        NumberWithoutCommas(totalDebit) !== NumberWithoutCommas(total)
      ) {
        setPostLoader(false);
        swal("Sorry", "Total Amount mismatch", "warning");
      } else {
        // p_credit_acs.map((acs) => {
        //   acs.p_credit_amt = NumberWithoutCommas(acs.p_credit_amt);
        // });

        rows.map((row) => {
          if (
            Object.keys(row).length > 0 &&
            Object.values(row).some((value) => value !== "")
          ) {
            credits_arr.push({
              p_credit_acct: row.p_credit_acct,
              p_credit_amt: NumberWithoutCommas(row.p_credit_amt),
              p_credit_bra: row.p_credit_bra,
              p_credit_doc_ref: documentReference,
              p_credit_scan_doc_id: row.p_credit_scan_doc_id
                ? row.p_credit_scan_doc_id
                : scanDocDebit,
              p_credit_trans_desc: row.p_credit_trans_desc
                ? row.p_credit_trans_desc
                : transactionDetails,
              p_credit_nrtn: transactionDetails,
            });
          }
        });

        axios
          .post(
            API_SERVER + "/api/post_prc_receipt_payment_journal_backvalue",
            {
              r_trans_type: paymentTransType,
              currency: currencyValue,
              p_user: JSON.parse(localStorage.getItem("userInfo")).id,
              valueDate: valueDate,
              branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
              p_destination: postingDestinationSuspend,
              post_channel: postingChannel,
              module: postingModule,
              // terminal_id: postingTerminalID,
              // machine_ip: postingMachineIp,
              p_debit_amount_total: total,
              p_debit_acs: p_debit_account_array,
              p_credit_acs: credits_arr,
              batch_number: batch_numberSuspend,
            },
            { headers }
          )
          .then((response) => {
            setPostLoader(false);
            if (response.data.success === "Y") {
              // swal("Data posted successfully", response.data.message, "success");
              swal({ title: response.data.message, icon: "success" });
              ClearAfterPosting();
            } else {
              swal({ title: response.data.message, icon: "error" });
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  };

  // function formatNumber(num, id) {
  //   // containsLetters(num,debit_amount_field)
  //   const regex = /[a-zA-Z]/;
  //   if (regex.test(num) == true) {
  //     swal({
  //       title: "Error",
  //       text: "kindly ensure amount entered doesn't contain any letters",
  //       icon: "warning",
  //       closeOnClickOutside: false,
  //       button: {
  //         text: "OK",
  //       },
  //     }).then((res) => {
  //       if (res) {
  //         document.getElementById(id).focus();
  //         document.getElementById(id).select();
  //       }
  //     });
  //   } else {
  //     const numericInput = String(num).replace(/[^0-9.-]/g, "");
  //     // Convert the input to a number and check if it's valid
  //     const number = parseFloat(numericInput);

  //     const formatted = number.toLocaleString("en-US", {
  //       minimumFractionDigits: 2,
  //     });

  //     return formatted;
  //   }
  // }

  const totalDebitField = document.getElementById("total_debit_field");

  function totalDebitHandleBlur() {
    if (totalDebit) {
      if (
        typeOfAccount !== "9" &&
        NumberWithoutCommas(currentBalance) < NumberWithoutCommas(totalDebit)
      ) {
        swal({
          title: "ERR - 01586",
          text: "The transaction will overdraw customer's account, please check!!!",
          icon: "error",
          closeOnClickOutside: false,
        }).then((result) => {
          if (result) {
            totalDebitField.focus();
            totalDebitField.select();
          }
        });
      } else {
        setTotalDebit(formatNumber(totalDebit, totalDebitField));
      }
    }
  }

  // function formatNumber2dp(num) {
  //   const numericInput = String(num).replace(/[^0-9.-]/g, "");
  //   // Convert the input to a number and check if it's valid
  //   const number = parseFloat(numericInput);

  //   const formatted = number.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   });
  //   // console.log({ formatted }, amount);

  //   return formatted;
  // }

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

  function handleEditClick(batch) {
    let arr = [];
    setOpenPostedModalDetails(false);
    setBatch_numberSuspend(batch);
    handleClose();
    ClearAfterPosting();
    postedModalDetailsData.map((i) => {
      if (Number(i.local_equivalent_cr) > 0) {
        const newObj = {
          credit_acc_desc: i.account_desc + " - " + i.acct_link,
          p_credit_acct: i.acct_link,
          p_credit_amt: formatNumber1(i.local_equivalent_cr),
          p_credit_bra: i.inter_branch,
          p_credit_scan_doc_id: i.scan_doc_id,
          p_credit_trans_desc: i.transaction_details,
          p_credit_doc_ref: i.document_ref,
          p_credit_nrtn: i.narration,
          account_currency: i.currency_code,
        };
        arr.push(newObj);
        // rows.unshift(newObj);
        setP_credit_acs(arr);
      } else {
        setCurrencyValue(i.currency_code);
        setBranchValue(i.inter_branch);
        setDebitAccount(i.account_desc + " - " + i.acct_link);
        setDebitAccountNumber(i.acct_link);
        setScanDocDebit(i.scan_doc_id);
        setTransactionDetails(i.transaction_details);
        setDocumentReference(i.document_ref);
        setTotalDebit(formatNumber(i.local_equivalent_db));
        setTotal(formatNumber(i.local_equivalent_db));
        setValueDate(i.value_date);
        setdebit_acct_currency(i.currency_code);
        setCurrentBalance(i.acct_balance);
        // setP_credit_amt(i.local_equivalent_cr);
      }
    });
    setRows([...arr, {}, {}, {}, {}, {}]);
  }
  //  console.log("type of", typeof (total));
  return (
    <div style={{}}>
      <div
        style={{
          // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{}}>
          <Header headerShade={true} title={"DEBIT DETAILS"} />
          <div
            className="rounded-sm p-4 mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          >
            <OverlayLoader
              postLoader={postLoader || fetchData}
              // color={"#0580c0"}
              textColor={true}
              displayText={postLoader ? "Loading..." : "Fetching Data..."}
            />
            <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ flex: 0.5 }}>
                <ListOfValue
                  label={"Currency"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  required={true}
                  data={currency}
                  value={currencyValue}
                  onChange={(value) => {
                    setCurrencyValue(value);
                    setValueDate(formattedDate);
                    setTimeout(() => {
                      const input = document.getElementById("branch_field");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "branch_field");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("branch_field");
                      input.focus();
                    }
                  }}
                />
              </div>
              <div style={{ flex: 0.5 }}>
                <ListOfValue
                  label={"Branch"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  data={branch}
                  required={true}
                  value={branchValue}
                  onChange={(value) => {
                    setBranchValue(value);
                    setTimeout(() => {
                      const input = document.getElementById(
                        "debit_account_field"
                      );
                      input.focus();
                    }, 0);
                  }}
                  id={"branch_field"}
                  onKeyDown={(e) => {
                    switchFocus(e, "debit_account_field");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById(
                        "debit_account_field"
                      );
                      input.focus();
                    }
                  }}

                  // onChange={(value) => setCurrencyValue(value)}
                />
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", flex: 0.5 }}>
                <div style={{ flex: 0.88 }}>
                  <InputField
                    label={"Debit Account"}
                    labelWidth={"34%"}
                    inputWidth={"62%"}
                    required={true}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setCurrentBalance("");
                      }
                      setDebitAccount(e.target.value);
                    }}
                    onKeyDown={handleKeyPress}
                    value={debitAccount}
                    id={"debit_account_field"}
                  />
                </div>

                {
                  <div
                    style={{ flex: 0.1, position: "relative", left: "-30px" }}
                  >
                    {loader ? <Loader size={20} /> : null}
                  </div>
                }
              </div>
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Value Date"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  disabled={true}
                  value={valueDate}
                  textAlign={"center"}
                />
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Current Balance"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  paddingRight={"5px"}
                  disabled={true}
                  value={currentBalance}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: 0.5 }}>
                <div style={{ display: "flex", flex: 1 }}>
                  <div style={{ flex: 0.7 }}>
                    <InputField
                      label={"Scan Document ID"}
                      labelWidth={"43%"}
                      inputWidth={"50%"}
                      onChange={(e) => setScanDocDebit(e.target.value)}
                      value={scanDocDebit}
                      id={"scan_doc_debit_field"}
                      onKeyDown={(e) => switchFocus(e, "trans_details_field")}
                    />
                  </div>
                  <div style={{ flex: 0.3 }}>
                    <ButtonComponent
                      label={""}
                      buttonBackgroundColor={"#0580c0"}
                      buttonHeight={"25px"}
                      buttonWidth={"30px"}
                      buttonIcon={<FcDocument />}
                      onClick={() => handleClickViewDoc()}
                    />

                    {sweetAlertConfirmed && (
                      <Modal
                        className="p-0 m-0"
                        opened={sweetAlertConfirmed}
                        size="75%"
                        style={{ margin: 0, padding: 0 }}
                        withCloseButton={false}
                        transitionProps={"mounted"}
                        onClose={() => setSweetAlertConfirmed(false)}
                      >
                        <div className="flex items-center justify-between mx-2 p-2">
                          <div className="font-extrabold text-black">
                            View Document
                          </div>
                          <div
                            className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                            onClick={() => setSweetAlertConfirmed(false)}
                          >
                            x
                          </div>
                        </div>
                        <Modal.Body>
                          <DocumentViewing documentID={scanDocDebit} />
                        </Modal.Body>
                      </Modal>
                      // 1683042691
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Transaction Details"}
                  labelWidth={"30%"}
                  inputWidth={"55%"}
                  required={true}
                  rows={2}
                  onChange={(e) => setTransactionDetails(e.target.value)}
                  value={transactionDetails}
                  id={"trans_details_field"}
                  onKeyDown={(e) => switchFocus(e, "doc_ref_field")}
                  inputheight={"25px"}
                />
              </div>
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Document Reference"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  required={true}
                  onChange={(e) => setDocumentReference(e.target.value)}
                  value={documentReference}
                  id={"doc_ref_field"}
                  onKeyDown={(e) => switchFocus(e, "total_debit_field")}
                />
              </div>
            </div>

            <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Total Debit Amount"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  required={true}
                  textAlign={"right"}
                  paddingRight={"4px"}
                  onChange={(e) => setTotalDebit(e.target.value)}
                  onBlur={totalDebitHandleBlur}
                  value={totalDebit}
                  id={"total_debit_field"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      totalDebitHandleBlur();
                      switchFocus(e, `0_p_credit_acct`);
                    }
                    switchFocus(e, `0_p_credit_acct`);
                  }}
                />
              </div>
              <div style={{ flex: 0.5 }}></div>
            </div>
          </div>

          <hr style={{ marginBottom: "10px" }} />
          <div style={{ marginBottom: "15px", display: "flex", flex: 1 }}>
            <div
              style={{
                display: "flex",
                flex: 0.35,
                justifyContent: "space-evenly",
              }}
            >
              <ButtonComponent
                label={"Posted Transactions"}
                buttonHeight={"30px"}
                buttonWidth={"195px"}
                buttonColor={"white"}
                // buttonBackgroundColor={"#c4549c"}
                // buttonHeight={"25px"}
                // buttonWidth={"160px"}
                onClick={() => {
                  // setFetchData(true);
                  handleShowPostedTransaction("R");
                }}
              />
              <ButtonComponent
                label={"View Suspended"}
                buttonHeight={"30px"}
                buttonWidth={"160px"}
                // buttonBackgroundColor={"#c4549c"}
                buttonColor={"white"}
                onClick={() => {
                  // setFetchData(true);
                  handleShowViewSuspended();
                }}
              />
            </div>
            <div style={{ flex: 0.45 }}></div>
            <div style={{ flex: 0.3, justifyContent: "flex-end" }}>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <ButtonComponent
                  label={"Clear"}
                  buttonColor={"white"}
                  // buttonBackgroundColor={"teal"}
                  buttonHeight={"30px"}
                  buttonWidth={"55px"}
                  onClick={handleClear}
                />
                <ButtonComponent
                  label={"Save as Draft"}
                  buttonHeight={"30px"}
                  buttonWidth={"120px"}
                  onClick={handleSuspend}
                />
                <ButtonComponent
                  label={"Post"}
                  buttonHeight={"30px"}
                  buttonWidth={"55px"}
                  // buttonBackgroundColor={"teal"}
                  buttonColor={"white"}
                  onClick={handlePosting}
                />
                <ButtonComponent
                  label={"Exit"}
                  buttonHeight={"30px"}
                  buttonWidth={"55px"}
                  // buttonBackgroundColor={"teal"}
                  buttonColor={"white"}
                  onClick={handleExitClick}
                />
              </div>
            </div>
          </div>
          <hr style={{ marginBottom: "10px" }} />
          <div>
            {/* main container   */}
            {/* <div> */}
            <div>
              <Header title={"CREDIT DETAILS"} headerShade={true} />
            </div>
            {/* debit header   */}
            <div
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                paddingBottom: "10px",
                borderRadius: "3px",
                backgroundColor: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "25px",
                  flex: 1,
                  position: "sticky",
                  top: 0,
                  // paddingTop: "2px",
                  // backgroundColor: "whitesmoke",
                  background: "#0580c0",
                  // `url(` +
                  // window.location.origin +
                  // `/assets/images/headerBackground/` +
                  // getTheme.theme.headerImage +
                  // `)`
                  color: "white",
                }}
              >
                {/* account name    */}
                <div style={{ flex: 0.245, background: "" }}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      borderRight: "1px solid #ffffff3b",
                    }}
                  >
                    Account Name
                  </div>
                </div>

                {/*  Credit Amount   */}
                <div style={{ flex: 0.12, background: "" }}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      borderRight: "1px solid #ffffff3b",
                    }}
                  >
                    Credit Amount
                  </div>
                </div>

                {/* branch  */}
                <div style={{ flex: 0.145, background: "" }}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      borderRight: "1px solid #ffffff3b",
                    }}
                  >
                    Branch
                  </div>
                  {/* button and input  */}
                  {/* <div style={{ flex: 1 }}>
                <ListOfValue inputWidth={"95%"} />
              </div> */}
                </div>

                {/* Scan Document    */}
                <div style={{ flex: 0.19, background: "" }}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      borderRight: "1px solid #ffffff3b",
                    }}
                  >
                    Scan Document
                  </div>
                </div>

                {/* narration  */}
                <div style={{ flex: 0.29, background: "" }}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    Narration
                  </div>
                </div>
              </div>

              {/* new row component   work here */}
              <div
                style={{
                  padding: "5px 0",
                  overflowY: "auto",
                  // display:'flex',
                  // flexDirection:"column-reverse",
                  // flexGrow:1,
                  height: "200px",
                }}
              >
                {/* columns like account name, debit amount and the others   */}
                <div style={{}}>
                  {rows.map((row, index) => (
                    <div key={index}>
                      <RowComponent
                        index={index}
                        creditValidation={debitAccount}
                        rowData={row}
                        showNotification={showNotification}
                        onChange={handleInputChange}
                        onEnter={handleEnter}
                        onRemove={handleRemoveRow}
                        onClear={handleClearValuesInRow}
                        branchLOV={branch}
                        currency={currencyValue}
                        onBlur={handleTotal}
                        debit_narration={transactionDetails}
                        debit_doc_ref={documentReference}
                        branchValue={branchValue}
                        scanDocDebit={scanDocDebit}
                        transactionDetails={transactionDetails}
                        cleared={cleared}
                        setAccName={setAccName}
                        setLoading={setLoading}
                        setCreditAccountCurrentBalance={
                          setCreditAccountCurrentBalance
                        }
                        setChartGroup={setChartGroup}
                        setCreditAccountModalData={(rowData) => {
                          // console.log(rowData, "gagaga");
                          setCreditAccountData(rowData);
                          setAccName(rowData.account_descrption);
                          setChartGroup(rowData.description);
                          setCreditAccountCurrentBalance(
                            formatNumber2dp(rowData.acct_balance)
                          );
                        }}
                        emptyfields={emptyFieldState}
                      />
                    </div>
                  ))}
                </div>
                {/* button to add a row  */}
              </div>

              <hr style={{ margin: "0 5px", padding: 0 }} />

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 0.115, background: "" }}></div>
                <div
                  style={{ flex: 0.395, background: "", paddingLeft: "5px" }}
                >
                  <InputField
                    label={"Total Credit"}
                    marginRight={"5px"}
                    labelWidth={"30%"}
                    inputWidth={"29%"}
                    disabled={true}
                    paddingRight={"4px"}
                    value={total ? (total === "NaN" ? " " : total) : " "}
                    textAlign={"right"}
                    // color={"blue"}
                  />
                </div>
                <div style={{ flex: 0.19, background: "" }}></div>

                <div
                  style={{
                    display: "flex",
                    flex: 0.3,
                    justifyContent: "flex-end",
                    marginRight: "20px",
                    // margin: "10px",
                    position: "sticky",

                    // bottom: "10px",
                    // background: "#e6e6e6",
                  }}
                >
                  <button
                    style={{
                      background: "#0580c0",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "grid",
                      placeItems: "center",
                      color: "white",
                      alignItems: "center",
                    }}
                    onClick={renderComponent}
                  >
                    <HiPlus size={20} />
                  </button>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* <div style={{ display: "flex", flex: 1, margin: "15px 0" }}>
            <div style={{ flex: 0.45 }}>
              <InputField
                label={"Account Name"}
                labelWidth={"25%"}
                inputWidth={"65%"}
                disabled={"true"}
                value={accName}
              />
            </div>
            <div style={{ flex: 0.3 }}>
              <InputField
                label={"Chart Group"}
                labelWidth={"30%"}
                disabled={"true"}
                value={chartGroup}
                textAlign={"center"}
              />
            </div>
            <div style={{ flex: 0.3 }}>
              <InputField
                label={"Current Balance"}
                labelWidth={"35%"}
                disabled={"true"}
                value={creditAccountCurrentBalance}
                textAlign={"right"}
                paddingRight={"4px"}
              />
            </div>
          </div> */}

          <div className="flex justify-evenly py-4">
            <p className="flex gap-2 items-center">
              <span className="text-md text-gray-500 font-medium">
                Account Name :{" "}
              </span>{" "}
              <span className="flex text-gray-600 font-medium">
                {loading ? <SkeletonInput size="small" active /> : `${accName}`}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="text-md text-gray-500 font-medium">
                Chart Group :{" "}
              </span>{" "}
              <span className="flex text-gray-600 font-medium">
                {loading ? (
                  <SkeletonInput size="small" active />
                ) : (
                  `${chartGroup}`
                )}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="text-md text-gray-500 font-medium">
                Current Balance :{" "}
              </span>{" "}
              <span className="flex text-gray-600 font-medium">
                {loading ? (
                  <SkeletonInput size="small" active />
                ) : (
                  `${creditAccountCurrentBalance}`
                )}
              </span>
            </p>
          </div>
          <hr style={{ marginTop: "8px" }} />

          {/* posted transaction modal  */}
          {show ? (
            <Modal
              className="p-0 m-0"
              opened={show}
              size="75%"
              padding={0}
              withCloseButton={false}
              transitionProps={"mounted"}
              closeOnClickOutside={false}
              onClose={handleClose}
            >
              <PostedTransactions
                show={show}
                postedTransData={postedData}
                handleClose={handleClose}
                handleShowPostedTransaction={handleShowPostedTransaction}
                setPostedData={setPostedData}
                fetchData1={fetchData1}
                setFetchData1={setFetchData1}
                setBatch_number={setBatch_number}
                batch_number={batch_number}
                setBatchAmount={setBatchAmount}
                batch_amount={batch_amount}
                setValue_Date={setValue_Date}
                value_date={value_Date}
                setApprovalFlagFilter={setApprovalFlagFilter}
                loadingCustomTable={loadingCustomTable}
              />
            </Modal>
          ) : (
            ""
          )}

          {openPostedModalDetails && (
            <Modal
              className="p-0 m-0"
              opened={openPostedModalDetails}
              size="80%"
              padding={0}
              withCloseButton={false}
              transitionProps={"mounted"}
              closeOnClickOutside={false}
              onClose={() => {
                setOpenPostedModalDetails(false);
                setPostedCredit([]);
              }}
            >
              <PostedTransactionDetails
                postedCredit={postedCredit}
                postedDebit={postedDebit}
                handleEditClick={handleEditClick}
                setPostedCredit={setPostedCredit}
                setOpenPostedModalDetails={setOpenPostedModalDetails}
                approvalFlag={approvalFlag}
                handleShowPostedTransaction={handleShowPostedTransaction}
              />
            </Modal>
          )}

          {/* view suspended modal  */}
          {show2 ? (
            <ViewSuspended
              show2={show2}
              viewSuspendedData={viewSuspendedData}
              fetchData2={fetchData2}
              fetchData3={fetchData3}
              setFetchData3={setFetchData3}
              handleClose2={handleClose2}
              // customBodyRender={handleClickSuspendedArrowButton}
              handleShowViewSuspended={handleShowViewSuspended}
              setBatch_number={setBatch_number}
              batch_number={batch_number}
              setBatchAmount={setBatchAmount}
              batch_amount={batch_amount}
              setValue_Date={setValue_Date}
              value_date={value_Date}
              setApprovalFlagFilter={setApprovalFlagFilter}
              approvalFlagFilter={approvalFlagFilter}
              loadingCustomTable={loadingCustomTable}
            />
          ) : (
            ""
          )}

          <SearchModal
            setShowModal={setShowDebit}
            showModal={showDebit}
            currency={currencyValue}
            filter1={debitData}
            handleSelected={handleSelected}
          />

          {/* notifcation alert   */}
          {notification ? (
            <div
              style={{
                position: "absolute",
                zIndex: "9999",
                left: "40%",
                bottom: "92%",
                width: "20%",
                animation: "ease-out",
              }}
              id="animatedDiv"
            >
              <Notification
                icon={<FaCheck />}
                color="teal"
                title="Data Added"
                withCloseButton={false}
                onClose={handleCloseNotification}
              ></Notification>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
