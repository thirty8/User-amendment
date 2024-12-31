import React, { useState, useEffect } from "react";
import { FcDocument } from "react-icons/fc";
import { HiPlus } from "react-icons/hi";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import { Modal } from "@mantine/core";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import swal from "sweetalert";
import RowComponent from "./components/row3";
import { Loader } from "@mantine/core";
import ViewPosted from "./components/viewPosted";
import DocumentViewing from "../../../../../components/others/DocumentViewing";
import ViewSuspended from "./components/viewSuspended";
import { Notification } from "@mantine/core";
import Header from "../../../../../components/others/Header/Header";
import SearchModal from "./components/Modal";
import CustomTable from "../../../teller-ops/components/CustomTable";
import CustomButtons from "../../../../../components/others/CustomButtons";
import PostedTransactionDetails from "./components/postedTransactions";
import OverlayLoader from "../../../../../components/others/OverlayLoader";
import {
  NumberWithoutCommas,
  formatDate,
  formatNumber,
  formatNumber2dp,
  formatNumberclear,
} from "../../components/helpers";
import { FaCheck } from "react-icons/fa";
import SkeletonInput from "antd/es/skeleton/Input";
function Receipt() {
  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [branchlov, setBranchlov] = useState([]);
  const [branch, setBranch] = useState();
  const [currencylov, setCurrencylov] = useState([]);
  const [currency, setCurrency] = useState("");
  const [r_trans_type, setR_trans_type] = useState("");
  const [p_user, setP_user] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [p_destination, setP_destination] = useState("");
  const [module, setModule] = useState("");
  const [post_channel, setPost_channel] = useState("");
  const [terminal_id, setTerminal_id] = useState("");
  const [machine_ip, setMachine_ip] = useState("");
  // const [batch_number,setBatch_number]=useState("")
  const [p_credit_acct, setP_credit_acct] = useState("");
  const [p_credit_amt, setP_credit_amt] = useState("");
  const [p_credit_bra, setP_credit_bra] = useState("");
  const [p_credit_doc_ref, setP_credit_doc_ref] = useState("");
  const [p_credit_scan_doc_id, setP_credit_scan_doc_id] = useState("");
  const [p_credit_trans_desc, setP_credit_trans_desc] = useState("");
  const [p_credit_nrtn, setP_credit_nrtn] = useState("");
  const [debitAccountData, setDebitAccountData] = useState([]);
  const [p_debit_doc_ref, setP_debit_doc_ref] = useState("");
  const [p_debit_nrtn, setP_debit_nrtn] = useState("");
  const [p_credit_acs, setP_credit_acs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [credit_acct, setCredit_acct] = useState("");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [p_debit_acs, setP_debit_acs] = useState([]);
  const [cleared, setCleared] = useState(false);
  const [rows, setRows] = useState([{}, {}, {}, {}, {}, {}]);
  const [total, setTotal] = useState("");
  const [filter1, setFilter1] = useState([]);
  const [currentBalance, setCurrentBalance] = useState("");
  const [batch_number, setBatch_number] = useState("");
  const [postedData, setPostedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [batch_no, setBatch_no] = useState("");
  const [suspenseData, setSuspenseData] = useState([]);
  const [suspendDetails, setSuspendDetails] = useState([]);
  const [postedDataDetails, setPostedDataDetails] = useState([]);
  const [value_date, setValue_date] = useState("");
  const [p_debit_acct2, setP_debit_acct2] = useState("");
  // const [accountDesc,setAccountDesc]=useState("")
  const [chartGroup, setChartGroup] = useState("");
  const [accName, setAccName] = useState("");
  const [totalCredit, setTotalCredit] = useState("");
  const [notification, setNotification] = useState(false);
  const [emptyFieldState, setEmptyFieldState] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [fetchData1, setFetchData1] = useState(false);
  const [fetchData2, setFetchData2] = useState(false);
  const [fetchData3, setFetchData3] = useState(false);
  const [openPostedModalDetails, setOpenPostedModalDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credit_acct_currency, setCredit_acct_currency] = useState("");
  const [postedModalDetailsData, setPostedModalDetailsData] = useState([]);
  const [postedDebit, setPostedDebit] = useState([]);
  const [postedCredit, setPostedCredit] = useState([]);
  const [approvalFlag, setApprovalFlag] = useState("");
  const [onELOVE, setOnELOVE] = useState([]);
  const [batch_numberSuspend, setBatch_numberSuspend] = useState("");
  const [batch_amount, setBatchAmount] = useState("");
  const [value_Date, setValue_Date] = useState("");
  const [approvalFlagFilter, setApprovalFlagFilter] = useState("");
  const [loadingCustomTable, setLoadingCustomTable] = useState(false);

  let currencyMismatch;

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  function handleClick1() {
    if (p_credit_scan_doc_id === "") {
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

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      // e.preventDefault()
      document.getElementById(nextFieldId).focus();
    }
  }

  function switchFocuslov(e, nextFieldId) {
    if (e.key === "Enter") {
      // e.preventDefault()
      document.getElementById(nextFieldId).focus();
    }
  }

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  function transDescriptionChange(e) {
    setP_credit_nrtn(e.target.value);
    setP_credit_trans_desc(e.target.value);
    setP_debit_nrtn(e.target.value);
  }

  function handleDocRefChange(e) {
    setP_credit_doc_ref(e.target.value);
    setP_debit_doc_ref(e.target.value);
  }

  const [accountDescription, setAccountDescription] = useState("");
  const handleRowClickDebitAccount = (rowData) => {
    setShowModal(false);
    setP_credit_acct(rowData[0]);
    setCredit_acct(rowData[1]);
    setCurrentBalance(formatNumber2dp(rowData[5]));
    document.getElementById("credit_scan_doc").focus();
  };

  const dataObj = {
    p_credit_acct: credit_acct,
    p_credit_amt: NumberWithoutCommas(total),
    p_credit_bra: p_credit_bra,
    p_credit_doc_ref: p_credit_doc_ref,
    p_credit_scan_doc_id: p_credit_scan_doc_id,
    p_credit_nrtn: p_credit_nrtn,
    p_credit_trans_desc: p_credit_nrtn,
  };

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

  async function filterAccount() {
    try {
      axios
        .post(
          API_SERVER +
            "/api/get-account-details-by-account-name-or-account-desc",
          {
            currency: currency,
            account_desc: p_credit_acct,
            account_number: p_credit_acct,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.length === 1) {
            if (response.data[0]?.status_desc === "TOTAL BLOCKAGE") {
              setLoader(false);
              swal({
                title: "ERR - 07417",
                text: "This Account has Total Blockage",
                icon: "error",
              }).then((result) => {
                if (result) {
                  document.getElementById(`Credit_Account`).focus();
                  document.getElementById(`Credit_Account`).select();
                }
              });
            } else if (response.data[0]?.status_desc === "CREDIT BLOCK") {
              setLoader(false);
              swal({
                title: "ERR - 05461",
                text: "This Account is not valid for this transaction - CREDIT BLOCK",
                icon: "error",
              }).then((result) => {
                if (result) {
                  document.getElementById(`Credit_Account`).focus();
                  document.getElementById(`Credit_Account`).select();
                }
              });
            } else {
              setP_credit_acct(response.data[0]?.account_descrption);
              setCurrentBalance(
                formatNumber2dp(response.data[0]?.acct_balance)
              );
              setCredit_acct(response.data[0]?.tacct);
              setCredit_acct_currency(response.data[0]?.currency);
              setLoader(false);
              document.getElementById("credit_scan_doc").focus();
            }
          } else if (response.data.length > 1) {
            setLoader(false);
            // setShowModal(true);
            setShowModalSearch(true);
            setFilter1(response.data);
            // console.log(response.data, "filter22222");
          } else {
            swal("ERR - 05707", "No Data Found", { icon: "error" });
            setLoader(false);
            setP_credit_acct("");
            setCredit_acct("");
            setCurrentBalance("");
          }
        });
    } catch (error) {
      setLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  const handleInputChange = (index, name, value) => {
    const newRow = { ...rows[index], [name]: value };
    const newRows = [...rows.slice(0, index), newRow, ...rows.slice(index + 1)];
    setRows(newRows);
  };

  const handleEnter = (index, rowData) => {
    const updatedRows = [...rows];
    updatedRows[index] = rowData;
    //  Check if any of the inputs in the row is empty

    if (
      updatedRows[index].p_debit_acct == "" ||
      updatedRows[index].p_debit_amt == "" ||
      updatedRows[index].p_debit_bra == "" ||
      updatedRows[index].p_debit_scan_doc_id == "" ||
      updatedRows[index].p_debit_trans_desc == ""
    ) {
      swal({
        icon: "warning",
        title: "Empty field(s) found",
        text: "Please fill out all fields in the row",
        button: "OK",
        closeOnClickOutside: false,
      });
    } else if (
      updatedRows[index].p_debit_acct == undefined ||
      updatedRows[index].p_debit_amt == undefined ||
      updatedRows[index].p_debit_bra == undefined ||
      updatedRows[index].p_debit_scan_doc_id == undefined ||
      updatedRows[index].p_debit_trans_desc == undefined
    ) {
      swal({
        icon: "warning",
        title: "Empty field(s) found",
        text: "Please fill out all fields in the row",
        button: "OK",
        closeOnClickOutside: false,
      });
    } else {
      // If all inputs have values, update the rows with the new data
      setRows(updatedRows);

      if (index >= 4) {
        handleClick();
      }

      showNotification();
      setAccountDescription("");
      setDebitAccountData(["", "", "", "", ""]);
      setAccName("");
      setChartGroup("");
    }
  };

  // const performPostRequest = (data) => {
  //   // const filteredData = data.filter(row => row !== {});
  //   const nonEmptyRows = data.filter((row) => Object.keys(row).length > 0);
  //   const newinfo = nonEmptyRows.filter((row) =>
  //     Object.values(row).some((value) => value !== "")
  //   );

  //   const updatedArray = newinfo.map((obj) => {
  //     // Create a copy of the object
  //     const updatedObject = { ...obj };

  //     // Remove the key-value pair
  //     // delete updatedObject["debit_acct_desc"];

  //     return updatedObject;
  //   });

  //   setP_debit_acs(updatedArray);
  //   console.log(updatedArray, "newinfoooooo");
  // };

  const handleClick = () => {
    const newRows = [...rows, {}];
    setRows(newRows);
  };

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
      setTotal(formatNumberclear(newdebitTotal2));
      setAccountDescription("");
      setDebitAccountData(["", "", "", "", ""]);
      setAccName("");
      setChartGroup("");
    }
    // localStorage.setItem('rows', JSON.stringify(updatedRows));
  };

  const handleTotal = () => {
    const newTotal = rows.reduce((acc, row) => {
      if (row && row.p_debit_amt) {
        const num = parseFloat(row.p_debit_amt.replace(/,/g, ""));
        return isNaN(num) ? acc : acc + num;
      }
      return acc;
    }, 0);

    const formattedTotal = formatNumber(newTotal);
    setTotal(formattedTotal);
  };

  const handleClear = (index, clearedRowData, debitTotal) => {
    const updatedRows = [...rows];
    if (updatedRows[index].id !== undefined) {
      updatedRows.splice(index, 1);
    } else {
      updatedRows[index] = clearedRowData;
    }
    setRows(updatedRows);
    const newdebitTotal =
      NumberWithoutCommas(total) - NumberWithoutCommas(debitTotal);
    setTotal(formatNumberclear(newdebitTotal));
    setAccountDescription("");
    setDebitAccountData(["", "", "", "", ""]);
    setAccName("");
    setChartGroup("");
  };

  const credit_total = document.getElementById("totalCreditBlur");

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

  async function postedTransactions(flag) {
    handleViewPostedModalOpen();
    setLoadingCustomTable(true);
    try {
      let arr = [];
      axios
        .post(
          API_SERVER + "/api/get-posted-transactions",

          flag === "R"
            ? {
                batch_number: "",
                r_trans_type: r_trans_type,
                p_user: p_user,
                batch_amount: "",
                approval_flag: "",
                value_date: "",
              }
            : {
                batch_number: batch_number,
                r_trans_type: r_trans_type,
                p_user: p_user,
                batch_amount: batch_amount,
                approval_flag: approvalFlagFilter,
                value_date: value_Date ? formatDate(value_Date) : "",
              },
          { headers }
        )
        .then((response) => {
          if (response.data.length != 0) {
            response.data.map((i) => {
              arr.push([
                i.batch_no,
                formatDate(i.value_date),
                i.batch_desc,
                i.trans_count,
                formatNumber2dp(i.batch_amount),
                i.batch_status,
                <div className="flex justify-center">
                  <ButtonComponent
                    // buttonIcon={<AiOutlineDoubleRight size={18} />}
                    buttonIcon={CustomButtons["viewDetails"].icon}
                    onClick={() => {
                      setFetchData2(true);
                      async function postedTransactions() {
                        axios
                          .post(
                            API_SERVER + "/api/get-posted-transaction-details",
                            {
                              batch_no: i.batch_no,
                              r_trans_type: r_trans_type,
                            },
                            { headers }
                          )
                          .then((response) => {
                            if (response.data.length != 0) {
                              setFetchData2(false);
                              setApprovalFlag(i.approval_flag);
                              setOpenPostedModalDetails(true);
                              setPostedModalDetailsData(response.data);
                              setPostedDataDetails(response.data);
                            } else {
                              setFetchData2(false);
                              swal("ERR - 06077", "No Data Loaded", {
                                icon: "error",
                              });
                            }
                          });
                      }
                      postedTransactions();
                    }}
                  />
                </div>,
              ]);
            });
            setPostedData(arr);
            setFetchData(false);
            setFetchData2(false);
            setLoadingCustomTable(false);
            // handleViewPostedModalOpen();
          } else {
            setLoadingCustomTable(false);
            // setFetchData(false);
            // setFetchData2(false);
            // swal("ERR - 06077", "No Data Loaded", { icon: "error" });
          }
        });
    } catch (error) {
      setFetchData(false);
      setFetchData2(false);
      setLoadingCustomTable(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function postReceipt() {
    try {
      let debits_arr = [];
      setPostLoader(true);

      if (currency !== credit_acct_currency) {
        // currencyMismatch = true;
        setPostLoader(false);
        swal({
          icon: "error",
          title: "ERR - 05664",
          text: "Currency mismatch. Please select and ensure all accounts are in the appropriate currency.",
          closeOnClickOutside: false,
        });
        return;
      }

      rows.map((row) => {
        if (
          Object.keys(row).length > 0 &&
          Object.values(row).some((value) => value !== "")
        ) {
          if (row.account_currency !== currency) {
            currencyMismatch = true;
            return;
          } else {
            currencyMismatch = false;
          }
        }
      });

      if (currencyMismatch) {
        setPostLoader(false);
        swal({
          icon: "error",
          title: "ERR - 05664",
          text: "Currency mismatch. Please select and ensure all accounts are in the appropriate currency.",
          closeOnClickOutside: false,
        });
      } else if (totalCredit.length == " ") {
        setPostLoader(false);
        swal(
          "Total Credit amount not entered",
          "kindly enter an amount in the total credit field",
          "warning"
        );
      } else if (
        NumberWithoutCommas(totalCredit) !== NumberWithoutCommas(total)
      ) {
        setPostLoader(false);
        swal(
          "Sorry...Total Mismatch!!!",
          "kindly ensure the credit total entered matches the total debit amount.",
          "error"
        );
      } else {
        rows.map((row) => {
          if (
            Object.keys(row).length > 0 &&
            Object.values(row).some((value) => value !== "")
          ) {
            debits_arr.push({
              p_debit_acct: row.p_debit_acct,
              p_debit_amt: NumberWithoutCommas(row.p_debit_amt),
              p_debit_bra: row.p_debit_bra,
              p_debit_doc_ref: p_credit_doc_ref,
              p_debit_scan_doc_id: row.p_debit_scan_doc_id
                ? row.p_debit_scan_doc_id
                : p_credit_scan_doc_id,
              p_debit_trans_desc: row.p_debit_trans_desc
                ? row.p_debit_trans_desc
                : p_credit_trans_desc,
              p_debit_nrtn: p_credit_nrtn,
            });
          }
        });
        axios
          .post(
            API_SERVER + "/api/post_prc_receipt_payment_journal_backvalue",
            {
              r_trans_type,
              currency,
              p_user: JSON.parse(localStorage.getItem("userInfo")).id,
              valueDate,
              branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
              p_destination: "P",
              post_channel,
              module,
              p_credit_acs: [dataObj],
              p_debit_acs: debits_arr,
              batch_number: batch_numberSuspend,
            },
            { headers }
          )
          .then((response) => {
            if (response.data.success === "Y") {
              setPostLoader(false);
              swal("Receipt posted successfully", response.data.message, {
                icon: "success",
              });
              clearafterposting();
            } else {
              setPostLoader(false);
              swal("ERR - 01346", response.data.message, { icon: "error" });
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function handleSuspendReceiptPosting() {
    try {
      let debits_arr = [];
      setPostLoader(true);

      if (currency !== credit_acct_currency) {
        // currencyMismatch = true;
        setPostLoader(false);
        swal({
          icon: "error",
          title: "ERR - 05664",
          text: "Currency mismatch. Please select and ensure all accounts are in the appropriate currency.",
          closeOnClickOutside: false,
        });
        return;
      }

      rows.map((row) => {
        if (
          Object.keys(row).length > 0 &&
          Object.values(row).some((value) => value !== "")
        ) {
          if (row.account_currency !== currency) {
            currencyMismatch = true;
            return;
          } else {
            currencyMismatch = false;
          }
        }
      });
      if (currencyMismatch) {
        setPostLoader(false);
        swal({
          icon: "error",
          title: "ERR - 05664",
          text: "Currency mismatch. Please select and ensure all accounts are in the appropriate currency.",
          closeOnClickOutside: false,
        });
      } else if (totalCredit.length == " ") {
        setPostLoader(false);
        swal(
          "Total Credit amount not entered",
          "kindly enter an amount in the total credit field",
          "warning"
        );
      } else if (
        NumberWithoutCommas(totalCredit) !== NumberWithoutCommas(total)
      ) {
        setPostLoader(false);
        swal(
          "Sorry...Total Mismatch!!!",
          "kindly ensure the credit total entered matches the total debit amount.",
          "error"
        );
      } else {
        rows.map((row) => {
          if (
            Object.keys(row).length > 0 &&
            Object.values(row).some((value) => value !== "")
          ) {
            debits_arr.push({
              p_debit_acct: row.p_debit_acct,
              p_debit_amt: NumberWithoutCommas(row.p_debit_amt),
              p_debit_bra: row.p_debit_bra,
              p_debit_doc_ref: p_credit_doc_ref,
              p_debit_scan_doc_id: row.p_debit_scan_doc_id
                ? row.p_debit_scan_doc_id
                : p_credit_scan_doc_id,
              p_debit_trans_desc: row.p_debit_trans_desc
                ? row.p_debit_trans_desc
                : p_credit_trans_desc,
              p_debit_nrtn: p_credit_nrtn,
            });
          }
        });
        axios
          .post(
            API_SERVER + "/api/post_prc_receipt_payment_journal_backvalue",
            {
              r_trans_type,
              currency,
              p_user: JSON.parse(localStorage.getItem("userInfo")).id,
              valueDate,
              branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
              p_destination: "S",
              post_channel,
              module,
              // terminal_id,
              // machine_ip,
              p_credit_acs: [dataObj],
              p_debit_acs: debits_arr,
              batch_number: batch_numberSuspend,
            },
            { headers }
          )
          .then((response) => {
            if (response.data.success === "Y") {
              setPostLoader(false);
              swal("Receipt suspended successfully", response.data.message, {
                icon: "success",
              });
              clearafterposting();
            } else {
              setPostLoader(false);
              swal("ERR - 01346", response.data.message, { icon: "error" });
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function totalCreditHandleBlur() {
    if (totalCredit) {
      setTotalCredit(formatNumber(totalCredit, credit_total));
    }
  }

  useEffect(() => {
    setR_trans_type("RCPT");
    setP_user(info.id);
    setPost_channel("BRA");
    setModule("prc_fin_act_vcr_rt");
    setBranch(info.branchCode);
    setValueDate(todayDate);
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
    async function getCurrency() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "CUR" },
          { headers }
        );
        setCurrencylov(response.data);
      } catch (error) {
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }
    getBranch();
    getCurrency();
  }, []);

  function viewPost() {
    // setFetchData(true);
    postedTransactions("R");
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (currency == "") {
        swal({
          title: "Currency not selected!!!",
          text: "kindly select one to search for account",
          icon: "warning",
        }).then((result) => {
          if (result) {
            setTimeout(() => {
              document.getElementById("currency").focus();
            }, 5000);
          }
        });
      } else if (p_credit_acct.length === 0) {
        swal(
          "Account number/name not entered!!!",
          "kindly enter one to search for account",
          { icon: "warning" }
        );
      } else {
        setLoader(true);
        filterAccount();
      }
    }
  }

  function clearafterposting() {
    setCleared(!cleared);
    setCurrency("");
    setP_debit_acs([]);
    setP_credit_acs([]);
    setP_credit_acct("");
    setTotal("");
    setP_credit_bra("");
    setAccountDescription("");
    setCurrentBalance("");
    setP_credit_doc_ref("");
    setP_credit_scan_doc_id("");
    setP_credit_nrtn("");
    setP_credit_trans_desc("");
    setP_debit_nrtn("");
    setCredit_acct("");
    setTotalCredit("");
    setP_credit_acct("");
    setSuspendDetails([]);
    setRows([{}, {}, {}, {}, {}, {}]);
    setDebitAccountData(["", "", "", "", ""]);
    setAccName("");
    setChartGroup("");
    setBatch_numberSuspend("");
  }

  function clearAllDetails() {
    swal({
      title: "Are you sure?",
      text: "All entered data can't be recovered!!",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((result) => {
      if (result) {
        setCleared(!cleared);
        setCurrency("");
        setTerminal_id("");
        setMachine_ip("");
        setP_debit_acs([]);
        setP_credit_acs([]);
        setP_credit_acct("");
        setTotal("");
        setP_credit_bra("");
        setAccountDescription("");
        setCurrentBalance("");
        setP_credit_doc_ref("");
        setP_credit_scan_doc_id("");
        setP_credit_nrtn("");
        setP_credit_trans_desc("");
        setP_debit_nrtn("");
        setTotalCredit("");
        setCredit_acct("");
        setAccName("");
        setChartGroup("");
        setBatch_numberSuspend("");
        setRows([{}, {}, {}, {}, {}, {}]);
        setSuspendDetails([]);
        setDebitAccountData([]);
        swal({
          title: "Data cleared",
          text: "All inputs cleared successfully",
          icon: "success",
          buttons: "OK",
          timer: 1000,
        });
      }
    });
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  function handleViewPostedModalClose() {
    setShowModal3(false);
    setPostedData([]);
  }
  function handleViewPostedModalOpen() {
    setShowModal3(true);
  }
  const [suspendModal, setSuspendModal] = useState(false);
  const opensuspenseModal = () => {
    setSuspendModal(true);
  };
  const closesuspenseModal = () => {
    setSuspendModal(false);
    setSuspenseData([]);
  };

  function handleSelected(value) {
    if (value.status_desc === "TOTAL BLOCKAGE") {
      swal({
        title: "ERR - 07417",
        text: "This Account has Total Blockage",
        icon: "error",
      }).then((res) => {
        if (res) {
          document.getElementById(`Credit_Account`).focus();
        }
      });
    } else if (value.status_desc === "CREDIT BLOCK") {
      swal({
        title: "ERR - 05461",
        text: "This Account is not valid for this transaction - (CREDIT BLOCK)",
        icon: "error",
      }).then((res) => {
        if (res) {
          document.getElementById(`Credit_Account`).focus();
        }
      });
    } else {
      setOnELOVE(value);
      setShowModalSearch(false);
      setP_credit_acct(value.account_descrption);
      setCredit_acct(value.tacct);
      setCredit_acct_currency(value.currency);
      setCurrentBalance(formatNumber2dp(value.acct_balance));
      setTimeout(() => {
        document.getElementById("credit_scan_doc").focus();
      }, 100);
    }
  }

  async function getViewSuspendReceiptData(flag) {
    setLoadingCustomTable(true);
    opensuspenseModal();
    try {
      axios
        .post(
          API_SERVER + "/api/get-view-suspended-details",
          // {
          //   batch_no: batch_no,
          //   p_user: p_user,
          //   r_trans_type: r_trans_type,
          // },
          flag === "R"
            ? {
                batch_number: "",
                r_trans_type: r_trans_type,
                p_user: p_user,
                batch_amount: "",
                approval_flag: "",
                value_date: "",
              }
            : {
                batch_number: batch_no,
                r_trans_type: r_trans_type,
                p_user: p_user,
                batch_amount: batch_amount,
                approval_flag: approvalFlagFilter,
                value_date: value_Date ? formatDate(value_Date) : "",
              },
          { headers }
        )
        .then((response) => {
          if (response.data.length !== 0) {
            let arr = [];
            response.data.map((i) => {
              arr.push([
                formatDate(i.value_date),
                i.batch_no,
                i.batch_desc,
                i.trans_count,
                formatNumber(i.batch_amount),
                <div className="grid items-center place-items-center">
                  <ButtonComponent
                    // buttonIcon={<AiOutlineDoubleRight size={18} />}
                    buttonIcon={CustomButtons["next"].icon}
                    onClick={() => {
                      clearafterposting();
                      setFetchData1(true);
                      setBatch_numberSuspend(i.batch_no);
                      axios
                        .post(
                          API_SERVER + "/api/get-suspended-transaction-details",
                          {
                            batch_no: i.batch_no,
                            voucher_number: "RCPT",
                          },
                          { headers }
                        )
                        .then((response) => {
                          if (response.length !== 0) {
                            setFetchData1(false);
                            closesuspenseModal();
                            // setArrowButtonSuspendedState(true);
                            setSuspendDetails(response.data);
                          } else {
                            setFetchData1(false);
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
            setSuspenseData(arr);
            // setSuspenseData(response.data);
            setFetchData(false);
            // opensuspenseModal();
            setFetchData3(false);
            setLoadingCustomTable(false);
          } else {
            setLoadingCustomTable(false);
            // setFetchData(false);
            // setFetchData3(false);
            // swal("ERR - 06077", "No Data Loaded", "error");
          }
        });
    } catch (error) {
      setFetchData(false);
      setFetchData3(false);
      setLoadingCustomTable(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function showSuspenseData() {
    // setFetchData(true);
    getViewSuspendReceiptData("R");
    // opensuspenseModal()
    // console.log(suspenseData,"suspenseData")
  }

  useEffect(() => {
    if (suspendDetails.length > 0) {
      let newRows = [];
      suspendDetails.map((view) => {
        if (view.local_equivalent_cr !== "null") {
          setP_credit_acct(view.account_descrption);
          setCurrency(view.currency_code);
          setP_credit_doc_ref(view.document_ref);
          setP_credit_trans_desc(view.transaction_details);
          setP_credit_nrtn(view.transaction_details);
          setP_credit_scan_doc_id(view.scan_doc_id);
          setValue_date(view.value_date);
          setP_credit_amt(formatNumber1(view.local_equivalent_cr));
          setP_credit_bra(view.inter_branch);
          setCurrentBalance(formatNumber1(view.acct_balance));
          setTotal(formatNumber1(view.local_equivalent_cr));
          setCredit_acct(view.acct_link);
          setTotalCredit(formatNumber1(view.local_equivalent_cr));
          setCredit_acct_currency(view.currency_code);
        } else if (view.local_equivalent_db !== "null") {
          // setAccountDesc(view.account_descrption)
          const newObj = {
            debit_acct_desc: view.account_descrption,
            p_debit_acct: view.acct_link,
            p_debit_amt: formatNumber1(view.local_equivalent_db),
            p_debit_bra: view.inter_branch,
            p_debit_scan_doc_id: view.scan_doc_id,
            p_debit_trans_desc: view.transaction_details,
            p_debit_doc_ref: view.document_ref,
            p_debit_nrtn: view.narration,
            account_currency: view.currency_code,
            typeOfAccount: view.type_of_acct,
            acct_bal: view.acct_balance,
          };
          newRows.unshift(newObj);
          // p_debit_acs.push(newObj);
          // console.log(p_credit_doc_ref,"newObj")
        }
        setRows([...newRows, {}, {}, {}, {}, {}]);
      });
    }
  }, [suspendDetails]);

  useEffect(() => {
    let arr = [];
    if (postedModalDetailsData) {
      clearafterposting();
      postedModalDetailsData.map((d) => {
        if (d.local_equivalent_cr > 0) {
          setPostedCredit(d);
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
    }
    setPostedDebit(arr);
  }, [postedModalDetailsData]);

  function handleEditClick(batch) {
    let arr = [];
    let arr2 = [];
    clearafterposting();
    setBatch_numberSuspend(batch);
    setOpenPostedModalDetails(false);
    handleViewPostedModalClose();
    postedModalDetailsData.map((i) => {
      if (Number(i.local_equivalent_db) > 0) {
        const newObj = {
          debit_acct_desc: i.account_desc + " - " + i.acct_link,
          p_debit_acct: i.acct_link,
          p_debit_amt: formatNumber1(i.local_equivalent_db),
          p_debit_bra: i.inter_branch,
          p_debit_scan_doc_id: i.scan_doc_id,
          p_debit_trans_desc: i.transaction_details,
          p_debit_doc_ref: i.document_ref,
          p_debit_nrtn: i.narration,
          account_currency: i.currency_code,
          typeOfAccount: i.type_of_acct,
          acct_bal: i.acct_balance,
        };
        arr.push(newObj);
        // rows.unshift(newObj);
        setP_debit_acs(arr);
      } else {
        setCurrency(i.currency_code);
        setCredit_acct_currency(i.currency_code);
        setP_credit_bra(i.inter_branch);
        setP_credit_acct(i.account_desc + " - " + i.acct_link);
        setCredit_acct(i.acct_link);
        setP_credit_scan_doc_id(i.scan_doc_id);
        setP_credit_trans_desc(i.transaction_details);
        setP_credit_doc_ref(i.document_ref);
        setTotalCredit(formatNumber(i.local_equivalent_cr));
        setTotal(formatNumber(i.local_equivalent_cr));
        setP_credit_nrtn(i.transaction_details);
        setValue_date(i.value_date);
        setP_credit_amt(i.local_equivalent_cr);
        setCurrentBalance(formatNumber1(i.acct_balance));
      }
    });
    setRows([...arr, {}, {}, {}, {}, {}]);
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

  return (
    <div style={{}}>
      <div
        style={{
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <OverlayLoader
          postLoader={postLoader || fetchData}
          // color={"#0580c0"}
          textColor={true}
          displayText={postLoader ? "Loading..." : "Fetching Data..."}
        />

        <div style={{ padding: "10px 0" }}>
          <SearchModal
            setShowModal={setShowModalSearch}
            showModal={showModalSearch}
            currency={currency}
            filter1={filter1}
            handleSelected={handleSelected}
          />
          <Header headerShade={true} title={"CREDIT DETAILS"} />
          <div
            className="rounded-sm p-4 mt-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          >
            {/* {loader2 && <ModalLoader />} */}
            <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ flex: 0.5 }}>
                <ListOfValue
                  label={"Currency"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  required={true}
                  data={currencylov}
                  id={"currency"}
                  onChange={(value) => {
                    setCurrency(value);
                    setTimeout(() => {
                      const input = document.getElementById("branch");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocuslov(e, "branch");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("branch");
                      input.focus();
                    }
                  }}
                  value={currency}
                />
                {showModal3 ? (
                  <Modal
                    className="p-0 m-0"
                    opened={showModal3}
                    size="75%"
                    padding={0}
                    withCloseButton={false}
                    transitionProps={"mounted"}
                    onClose={handleViewPostedModalClose}
                    closeOnClickOutside={false}
                  >
                    <ViewPosted
                      showModal3={showModal3}
                      handleClose={handleViewPostedModalClose}
                      postedDataReceipt={postedData}
                      postedTransactions={postedTransactions}
                      r_trans_type={r_trans_type}
                      fetchData2={fetchData2}
                      setFetchData2={setFetchData2}
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
                      setPostedDebit([]);
                    }}
                  >
                    <PostedTransactionDetails
                      setPostedDebit={setPostedDebit}
                      postedDebit={postedDebit}
                      setOpenPostedModalDetails={setOpenPostedModalDetails}
                      postedCredit={postedCredit}
                      approvalFlag={approvalFlag}
                      handleEditClick={handleEditClick}
                    />
                  </Modal>
                )}

                {suspendModal && (
                  <Modal
                    className="p-0 m-0"
                    opened={suspendModal}
                    size="75%"
                    padding={0}
                    withCloseButton={false}
                    transitionProps={"mounted"}
                    onClose={closesuspenseModal}
                    closeOnClickOutside={false}
                  >
                    <ViewSuspended
                      showModalSuspended={suspendModal}
                      handleClose={closesuspenseModal}
                      suspendedDataReceipt={suspenseData}
                      branchlov={branchlov}
                      currency={currencylov}
                      getViewSuspendReceiptData={getViewSuspendReceiptData}
                      setFetchData3={setFetchData3}
                      fetchData={fetchData1}
                      fetchData3={fetchData3}
                      setBatch_number={setBatch_number}
                      batch_number={batch_number}
                      setBatchAmount={setBatch_number}
                      batch_amount={batch_amount}
                      setValue_Date={setValue_Date}
                      value_date={value_Date}
                      setApprovalFlagFilter={setApprovalFlagFilter}
                      approvalFlagFilter={approvalFlagFilter}
                      loadingCustomTable={loadingCustomTable}
                      // customBodyRender={handleClickSuspendedArrowButton}
                    />
                  </Modal>
                )}
              </div>
              <div style={{ flex: 0.5 }}>
                <ListOfValue
                  label={"Branch"}
                  labelWidth={"30%"}
                  inputWidth={"39%"}
                  data={branchlov}
                  required={true}
                  id={"branch"}
                  onChange={(value) => {
                    setP_credit_bra(value);
                    setTimeout(() => {
                      const input = document.getElementById("Credit_Account");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "Credit_Account");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("Credit_Account");
                      input.focus();
                    }
                  }}
                  value={p_credit_bra}
                />
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", flex: 0.5 }}>
                <div style={{ flex: 0.88 }}>
                  <InputField
                    label={"Credit Account"}
                    labelWidth={"37%"}
                    name={"p_credit_acct"}
                    inputWidth={"68%"}
                    id={"Credit_Account"}
                    required={true}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setCurrentBalance("");
                      }
                      setP_credit_acct(e.target.value);
                    }}
                    value={p_credit_acct}
                  />
                </div>
                {
                  <div
                    style={{ flex: 0.1, position: "relative", left: "-25px" }}
                  >
                    {loader ? <Loader size={20} /> : null}
                  </div>
                }
              </div>
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Value Date"}
                  labelWidth={"30%"}
                  inputWidth={"39%"}
                  disabled={true}
                  value={value_date ? value_date : todayDate}
                  //  onChange={(e)=>setValueDate(e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ flex: 0.5, color: "red" }}>
                <InputField
                  label={"Current Balance"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  disabled={true}
                  paddingRight={"5px"}
                  //  onChange={(e)=>setCurrent_balance(e.target.value)}
                  value={
                    currentBalance
                      ? currentBalance == "NaN"
                        ? Number("0").toFixed(2)
                        : currentBalance
                      : currentBalance
                  }
                  // color={"red"}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: 0.5 }}>
                <div style={{ display: "flex", flex: 1 }}>
                  <div style={{ flex: 0.73 }}>
                    <InputField
                      label={"Scan Document ID"}
                      labelWidth={"41%"}
                      //  name={"p_credit_scan_doc_id"}
                      inputWidth={"53%"}
                      id={"credit_scan_doc"}
                      onKeyDown={(e) => {
                        switchFocus(e, "Credit_Transaction_Details");
                      }}
                      onChange={(e) => setP_credit_scan_doc_id(e.target.value)}
                      value={p_credit_scan_doc_id}
                    />
                  </div>
                  {/* <div style={{flex:0.02}}></div> */}
                  <div style={{ flex: 0.22 }}>
                    <ButtonComponent
                      label={""}
                      buttonHeight={"25px"}
                      buttonWidth={"30px"}
                      buttonColor={"white"}
                      buttonBackgroundColor={"#0580c0"}
                      onClick={handleClick1}
                      buttonIcon={<FcDocument />}
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
                        <DocumentViewing documentID={p_credit_scan_doc_id} />
                      </Modal>
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
                  inputheight={"25px"}
                  id={"Credit_Transaction_Details"}
                  onKeyDown={(e) => {
                    switchFocus(e, "document_reference");
                  }}
                  //   name={"p_credit_nrtn"}
                  onChange={transDescriptionChange}
                  value={p_credit_trans_desc}
                  //  rows={1}
                />
              </div>
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Document Reference"}
                  labelWidth={"30%"}
                  inputWidth={"39%"}
                  required={true}
                  id={"document_reference"}
                  onKeyDown={(e) => {
                    switchFocus(e, "totalCreditBlur");
                  }}
                  //   name={"p_credit_doc_ref"}
                  onChange={handleDocRefChange}
                  value={p_credit_doc_ref}
                />
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Total Credit Amount"}
                  labelWidth={"30%"}
                  inputWidth={"35%"}
                  required={true}
                  inputheight={"25px"}
                  onChange={(e) => setTotalCredit(e.target.value)}
                  value={totalCredit}
                  textAlign={"right"}
                  paddingRight={"5px"}
                  onBlur={totalCreditHandleBlur}
                  id={"totalCreditBlur"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      totalCreditHandleBlur();
                      switchFocus(e, `0_p_debit_acct`);
                    }
                  }}
                  //   name={"p_credit_nrtn"}
                />
              </div>
              <div style={{ flex: 0.5 }}></div>
            </div>
          </div>
          <hr style={{ marginTop: 0, marginBottom: "8px" }} />
          <div style={{ display: "flex", flex: 1 }}>
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
                onClick={() => viewPost()}
                buttonWidth={"195px"}
                buttonColor={"white"}
                // buttonBackgroundColor={"#c4549c"}
              />
              <ButtonComponent
                label={"View Suspended"}
                buttonHeight={"30px"}
                buttonWidth={"160px"}
                //  buttonBackgroundColor={"#c4549c"}
                buttonColor={"white"}
                onClick={showSuspenseData}
              />
            </div>
            <div style={{ flex: 0.45 }}></div>
            <div style={{ flex: 0.3, justifyContent: "flex-end" }}>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <ButtonComponent
                  label={"Clear"}
                  buttonHeight={"30px"}
                  buttonWidth={"55px"}
                  //  buttonBackgroundColor={"teal"}
                  buttonColor={"white"}
                  onClick={clearAllDetails}
                />
                <ButtonComponent
                  label={"Save as Draft"}
                  buttonHeight={"30px"}
                  buttonWidth={"120px"}
                  onClick={handleSuspendReceiptPosting}
                />
                <ButtonComponent
                  label={"Post"}
                  buttonHeight={"30px"}
                  buttonWidth={"55px"}
                  type={"button"}
                  //  buttonBackgroundColor={"teal"}
                  // buttonColor={"white"}
                  onClick={postReceipt}
                />
                <ButtonComponent
                  label={"Exit"}
                  buttonHeight={"30px"}
                  buttonWidth={"55px"}
                  onClick={handleExitClick}
                />
              </div>
            </div>
          </div>
          <hr style={{ marginBottom: "8px", marginTop: "8px" }} />
          <div>
            {/* main container   */}
            <div>
              <Header
                title={"DEBIT DETAILS"}
                headerShade={true}
                fontWeight={"500"}
              />
            </div>
            <div>
              {/* debit header   */}
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  paddingBottom: "5px",
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
                    color: "white",
                    background: "#0580c0",
                  }}
                >
                  {/* account name    */}
                  <div
                    style={{
                      flex: 0.245,
                      background: "",
                      borderRight: "1px solid #ffffff3b",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      Account Name
                    </div>
                  </div>

                  {/*  Debit Amount   */}
                  <div
                    style={{
                      flex: 0.115,
                      background: "",
                      borderRight: "1px solid #ffffff3b",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      Debit Amount
                    </div>
                  </div>

                  {/* branch  */}
                  <div
                    style={{
                      flex: 0.15,
                      background: "",
                      borderRight: "1px solid #ffffff3b",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      Branch
                    </div>
                  </div>

                  {/* Scan Document    */}
                  <div
                    style={{
                      flex: 0.19,
                      background: "",
                      borderRight: "1px solid #ffffff3b",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
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
                <div
                  // class="scrollbar-hide"
                  style={{
                    paddingTop: "5px",
                    overflowY: "auto",
                    height: "200px",
                  }}
                >
                  {/* columns like account name, debit amount and the others   */}
                  <div style={{}}>
                    {rows.map((row, index) => (
                      <div key={index}>
                        <RowComponent
                          index={index}
                          rowData={row}
                          onChange={handleInputChange}
                          onEnter={handleEnter}
                          onRemove={handleRemoveRow}
                          onClear={handleClear}
                          branchLOV={branchlov}
                          p_credit_bra={p_credit_bra}
                          currency={currency}
                          onBlur={handleTotal}
                          debit_narration={p_credit_nrtn}
                          debit_doc_ref={p_credit_doc_ref}
                          p_debit_acct2={p_debit_acct2}
                          cleared={cleared}
                          p_credit_scan_doc_id={p_credit_scan_doc_id}
                          p_credit_trans_desc={p_credit_trans_desc}
                          credit_Account={credit_acct}
                          showNotification={showNotification}
                          setChartGroup={setChartGroup}
                          setAccName={setAccName}
                          setLoading={setLoading}
                          setAccountDescription={setAccountDescription}
                          setCreditAccountModalData={(rowData) => {
                            // console.log(rowData,"gagaga")
                            setDebitAccountData(rowData);
                            setChartGroup(rowData.description);
                            setAccName(rowData.account_descrption);
                            setAccountDescription(
                              formatNumber2dp(rowData.acct_balance)
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
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
                  {/* button to add a row  */}
                </div>
                <div style={{ padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      paddingTop: "7px",
                      borderTop: "1px solid lightgray",
                    }}
                  >
                    <div style={{ flex: 0.2 }}></div>
                    <div style={{ flex: 0.22, justifyContent: "center" }}>
                      <InputField
                        inputWidth={"55%"}
                        paddingRight={"5px"}
                        label={"Total debit"}
                        labelWidth={"20%"}
                        textAlign={"right"}
                        value={total ? (total === "NaN" ? " " : total) : " "}
                        onChange={(e) => setP_credit_amt(e.target.value)}
                        disabled={true}
                      />
                    </div>
                    <div style={{ flex: 0.15 }}></div>
                    <div style={{ flex: 0.19 }}></div>
                    <div
                      style={{
                        flex: 0.29,
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "10px",
                        position: "sticky",
                        bottom: "10px",
                      }}
                    >
                      <button
                        onClick={handleClick}
                        style={{
                          background: "#0580c0",
                          // `url(` +
                          // window.location.origin +
                          // `/assets/images/headerBackground/` +
                          // getTheme.theme.headerImage +
                          // `)`
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "grid",
                          placeItems: "center",
                          color: "white",
                          alignItems: "center",
                        }}
                      >
                        <HiPlus size={20} />
                      </button>
                      {/* <ButtonComponent label={"Add Row"} onClick={renderComponent} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div style={{ display: "flex", flex: 1 }}>
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
              />
            </div>
            <div style={{ flex: 0.3 }}>
              <InputField
                label={"Current Balance"}
                labelWidth={"35%"}
                disabled={"true"}
                value={accountDescription}
                textAlign={"right"}
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
                  `${accountDescription}`
                )}
              </span>
            </p>
          </div>
          <hr style={{ marginTop: "8px", marginBottom: "8px" }} />
        </div>
      </div>
    </div>
  );
}

export default Receipt;
