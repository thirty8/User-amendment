import React, { useEffect, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { VscClose } from "react-icons/vsc";
import { AiOutlineEye } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import InputField from "../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import JournalRowsComponent from "./components/journal-rows";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
// import { Modal, Button } from 'react-bootstrap';
import { Modal, Notification } from "@mantine/core";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { FcDocument } from "react-icons/fc";
import swal from "sweetalert";
import DocumentViewing from "../../../../../components/others/DocumentViewing";
import Header from "../../../../../components/others/Header/Header";
import PostedDataPage from "./components/postedDataPage";
// import CustomTable from "../../../../../components/others/customtable";
import CustomTable from "../../../teller-ops/components/CustomTable";
import CustomButtons from "../../../../../components/others/CustomButtons";
import PostedData from "./components/postedDataPage";
import ViewPosted from "./components/postedJournals";
import OverlayLoader from "../../../../../components/others/OverlayLoader";
import {
  NumberWithoutCommas,
  formatDate,
  formatNumber,
  formatNumber1,
  formatNumber2dp,
  formatNumberclear,
} from "../../components/helpers";
import SkeletonInput from "antd/es/skeleton/Input";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";

const Journal = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  // const headers={
  //   'x-api-key': process.env.REACT_APP_API_KEY,
  //   'Content-Type':'application/json'
  // };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [branchlov, setBranchlov] = useState([]);
  const [currencylov, setCurrencylov] = useState([]);
  const [scandocID, setScanDocid] = useState("");
  const [documentReference, setDocumentReference] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [rows, setRows] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  const [currency, setCurrency] = useState("");
  const [r_trans_type, setR_trans_type] = useState("");
  const [p_user, setP_user] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [branch, setBranch] = useState("");
  const [post_channel, setPost_channel] = useState("");
  const [terminal_id, setTerminal_id] = useState("");
  const [batch_number, setBatch_number] = useState("");
  const [batch_amount, setBatchAmount] = useState("");
  const [value_Date, setValue_Date] = useState("");
  const [approvalFlagFilter, setApprovalFlagFilter] = useState("");
  const [module, setModule] = useState("");
  const [value_date, setValue_date] = useState("");
  const [p_debit_acs, setP_debit_acs] = useState([]);
  const [p_credit_acs, setP_credit_acs] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [accountBalance, setAccountBalance] = useState("");
  const [totalDebit, setTotalDebit] = useState("");
  const [totalCredit, setTotalCredit] = useState("");
  const [postedModal, setPostedModal] = useState(false);
  const [suspendModal, setSuspendModal] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [dataTableComponent, setDataTableComponent] = useState(false);
  const [postedJournalData, setPostedJournalData] = useState(false);
  const [postedJournalData1, setPostedJournalData1] = useState([]);
  const [postedJournalData2, setPostedJournalData2] = useState([]);
  const [postedData, setPostedData] = useState([]);
  const [suspendedData, setSuspendedData] = useState([]);
  const [suspendDetails, setSuspendDetails] = useState([]);
  const [chartGroup, setChartGroup] = useState("");
  const [accName, setAccName] = useState("");
  const [batch_numberSuspend, setBatch_numberSuspend] = useState("");
  const [approvalFlag, setApprovalFlag] = useState("");
  const [notification, setNotification] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [fetchData1, setFetchData1] = useState(false);
  const [fetchData2, setFetchData2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCustomTable, setLoadingCustomTable] = useState(false);

  let currencyMismatch;
  // const [currencyMismatch, setCurrencyMismatch] = useState(false);

  const renderComponent = () => {
    // Create a new instance of MyComponent and add it to the componentArray
    const newRows = [...rows, {}];
    setRows(newRows);
  };

  function closeViewPostedModal() {
    setDataTableComponent(true);
  }

  useEffect(() => {
    setR_trans_type("JRNL");
    setP_user(JSON.parse(localStorage.getItem("userInfo")).id);
    setPost_channel("BRA");
    setModule("prc_fin_act_vcr_rt");
    // setP_destination("P")
    setTerminal_id("USG-DC");
    // setMachine_ip("192.168.1.23")
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
  // console.log(p_credit_acs,"apppppp.js")

  const showNotification = () => {
    setNotification(true);
    const timeout = setTimeout(() => {
      setNotification(false);
    }, 1500);

    return () => clearTimeout(timeout);
  };
  // handleCLose Notification
  const handleCloseNotification = () => setNotification(false);

  const handleTotalDebit = () => {
    const newTotal = rows.reduce((acc, row) => {
      if (row && row.p_debit_amt) {
        const num = parseFloat(row.p_debit_amt.replace(/,/g, ""));
        return isNaN(num) ? acc : acc + num;
      }
      return acc;
    }, 0);

    const formattedTotal = formatNumber(newTotal);
    setTotalDebit(formattedTotal);
  };

  const handleTotalCredit = () => {
    const newTotal = rows.reduce((acc, row) => {
      if (row && row.p_credit_amt) {
        const num = parseFloat(row.p_credit_amt.replace(/,/g, ""));
        return isNaN(num) ? acc : acc + num;
      }
      return acc;
    }, 0);

    const formattedTotal = formatNumber(newTotal);
    setTotalCredit(formattedTotal);
  };

  const handleRemoveRow = (index, rowObject1, amt_type) => {
    if (amt_type == "p_debit_amt") {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      const newdebitTotal2 =
        NumberWithoutCommas(totalDebit) - NumberWithoutCommas(rowObject1);
      setTotalDebit(formatNumber(newdebitTotal2));
      setAccountBalance("");
      setAccountData(["", "", "", "", ""]);
      setChartGroup("");
      setAccName("");
    } else if (amt_type == "p_credit_amt") {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      const newdebitTotal2 =
        NumberWithoutCommas(totalCredit) - NumberWithoutCommas(rowObject1);
      setTotalCredit(formatNumber(newdebitTotal2));
      setAccountBalance("");
      setAccountData(["", "", "", "", ""]);
      setChartGroup("");
      setAccName("");
    } else {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      setAccountBalance("");
      setChartGroup("");
      setAccName("");
      setAccountData(["", "", "", "", ""]);
    }
    // localStorage.setItem('rows', JSON.stringify(updatedRows));
  };

  const handleClear = (index, clearedRowData, debitTotal, creditTotal) => {
    const updatedRows = [...rows];
    setAccName("");
    setChartGroup("");
    setAccountBalance("");
    if (updatedRows[index].id !== undefined) {
      updatedRows.splice(index, 1);
    } else {
      updatedRows[index] = clearedRowData;
      if (debitTotal) {
        setRows(updatedRows);

        const newdebitTotal =
          NumberWithoutCommas(totalDebit) - NumberWithoutCommas(debitTotal);
        setTotalDebit(formatNumberclear(newdebitTotal));
        // console.log(clearedRowData,"clearedRowDataclearedRowData")
      } else {
        if (creditTotal) {
          setRows(updatedRows);
          const newdebitTotal =
            NumberWithoutCommas(totalCredit) - NumberWithoutCommas(creditTotal);
          setTotalCredit(formatNumberclear(newdebitTotal));
        }
      }
    }
  };

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

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

  const handleInputChange = (index, name, value) => {
    const newRow = { ...rows[index], [name]: value };
    const newRows = [...rows.slice(0, index), newRow, ...rows.slice(index + 1)];
    setRows(newRows);
    // console.log(rows,"rowsssss")
  };

  const addAccNumToRows = (index, rowData) => {
    const updatedRows = [...rows];
    updatedRows[index] = rowData;
    setRows(updatedRows);
  };

  const handleEnter = (index, rowData) => {
    const updatedRows = [...rows];
    // console.log(rowData,"rowDatarowDatarowData")
    updatedRows[index] = rowData;
    // console.log(updatedRows[index], "updatedRows[index]");
    setRows(updatedRows);
    showNotification();
    setChartGroup("");
    setAccName("");
    setAccountBalance("");
    // console.log(rows,"updatedRows")
    // renderComponent()
  };

  function clearAllData() {
    setCurrency("");
    setDocumentReference("");
    setScanDocid("");
    setTransactionDetails("");
    setValue_date("");
    setRows([{}, {}, {}, {}, {}, {}, {}, {}]);
    setAccountData([]);
    setP_credit_acs([]);
    setP_debit_acs([]);
    setTotalDebit("");
    setTotalCredit("");
    setAccountBalance("");
    setChartGroup("");
    setAccName("");
    setCleared(!cleared);
    setSuspendDetails([]);
    setBatch_numberSuspend("");
  }

  function ClearButton() {
    swal({
      title: "Are you sure?",
      text: "All entered data can't be recovered!!",
      icon: "warning",
      dangerMode: true,
      buttons: true,
      closeOnClickOutside: false,
    }).then((result) => {
      if (result) {
        setCurrency("");
        setDocumentReference("");
        setScanDocid("");
        setTransactionDetails("");
        setRows([{}, {}, {}, {}, {}, {}, {}, {}]);
        setAccountData([]);
        setP_credit_acs([]);
        setP_debit_acs([]);
        setTotalDebit("");
        setTotalCredit("");
        setAccountBalance("");
        setChartGroup("");
        setAccName("");
        setValue_date("");
        setCleared(!cleared);
        setSuspendDetails([]);
        setBatch_numberSuspend("");
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

  function handleJournalPosting() {
    try {
      setPostLoader(true);
      let credits_arr = [];
      let debits_arr = [];
      // let currencyMismatch;

      rows.map((row) => {
        if (
          (row.hasOwnProperty("p_debit_amt") && row.p_debit_amt) ||
          (row.hasOwnProperty("p_credit_amt") && row.p_credit_amt)
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
      } else {
        rows.map((row) => {
          if (row.hasOwnProperty("p_debit_amt") && row.p_debit_amt) {
            debits_arr.push({
              // p_debit_acct: row.p_account ? row.p_account : row.p_acct,
              p_debit_acct: row.p_account,
              p_debit_amt: NumberWithoutCommas(row.p_debit_amt),
              p_debit_bra: row.p_bra,
              p_debit_doc_ref: row.p_debit_doc_ref
                ? row.p_debit_doc_ref
                : documentReference,
              p_debit_scan_doc_id: row.scan_doc_id
                ? row.scan_doc_id
                : scandocID,
              p_debit_nrtn: transactionDetails,
              p_debit_trans_desc: row.trans_desc
                ? row.trans_desc
                : transactionDetails,
            });
          } else if (row.hasOwnProperty("p_credit_amt") && row.p_credit_amt) {
            credits_arr.push({
              p_credit_acct: row.p_account ? row.p_account : row.p_acct,
              p_credit_amt: NumberWithoutCommas(row.p_credit_amt),
              p_credit_bra: row.p_bra,
              p_credit_doc_ref: row.p_credit_doc_ref
                ? row.p_credit_doc_ref
                : documentReference,
              p_credit_scan_doc_id: row.scan_doc_id
                ? row.scan_doc_id
                : scandocID,
              p_credit_nrtn: transactionDetails,
              p_credit_trans_desc: row.trans_desc
                ? row.trans_desc
                : transactionDetails,
            });
          }
        });
        axios
          .post(
            API_SERVER + "/api/post_prc_receipt_payment_journal_backvalue",
            {
              r_trans_type,
              currency,
              p_user,
              valueDate,
              branch,
              p_destination: "P",
              post_channel,
              module,
              terminal_id,
              p_credit_acs: credits_arr,
              p_debit_acs: debits_arr,
              batch_number: batch_numberSuspend,
            },
            { headers }
          )
          .then((response) => {
            if (response.data.success === "Y") {
              setPostLoader(false);
              swal({ title: response.data.message, icon: "success" });
              clearAllData();
            } else {
              setPostLoader(false);
              swal({ title: response.data.message, icon: "error" });
              // setP_credit_acs([]);
              // setP_debit_acs([]);
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function handleJournalSuspend() {
    try {
      let credits_arr = [];
      let debits_arr = [];
      setPostLoader(true);

      rows.map((row) => {
        if (
          (row.hasOwnProperty("p_debit_amt") && row.p_debit_amt) ||
          (row.hasOwnProperty("p_credit_amt") && row.p_credit_amt)
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
      } else {
        rows.map((row) => {
          // console.log(row,"rowwwwww")
          if (row.hasOwnProperty("p_debit_amt") && row.p_debit_amt) {
            debits_arr.push({
              // p_debit_acct: row.p_account ? row.p_account : row.p_acct,
              p_debit_acct: row.p_account,
              p_debit_amt: NumberWithoutCommas(row.p_debit_amt),
              p_debit_bra: row.p_bra,
              p_debit_doc_ref: documentReference,
              p_debit_scan_doc_id: row.scan_doc_id,
              p_debit_nrtn: transactionDetails,
              p_debit_trans_desc: row.trans_desc,
            });
          } else if (row.hasOwnProperty("p_credit_amt") && row.p_credit_amt) {
            credits_arr.push({
              p_credit_acct: row.p_account ? row.p_account : row.p_acct,
              p_credit_amt: NumberWithoutCommas(row.p_credit_amt),
              p_credit_bra: row.p_bra,
              p_credit_doc_ref: documentReference,
              p_credit_scan_doc_id: row.scan_doc_id,
              p_credit_nrtn: transactionDetails,
              p_credit_trans_desc: row.trans_desc,
            });
          }
        });
        axios
          .post(
            API_SERVER + "/api/post_prc_receipt_payment_journal_backvalue",
            {
              r_trans_type,
              currency,
              p_user,
              valueDate,
              branch,
              p_destination: "S",
              post_channel,
              module,
              terminal_id,
              p_credit_acs: credits_arr,
              p_debit_acs: debits_arr,
              batch_number: batch_numberSuspend,
            },
            { headers }
          )
          .then((response) => {
            if (response.data.success === "Y") {
              setPostLoader(false);
              swal({ title: response.data.message, icon: "success" });
              clearAllData();
            } else {
              setPostLoader(false);
              swal({ title: response.data.message, icon: "error" });
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      // e.preventDefault()
      document.getElementById(nextFieldId).focus();
    }
  }

  async function postedTransactions(flag) {
    setPostedModal(true);
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
          // setFetchData(false);
          // setFetchData1(false);
          if (response.data.length != 0) {
            {
              response.data.map((res, index) => {
                arr.push([
                  res.batch_no,
                  res.batch_status,
                  res.batch_desc,
                  formatDate(res.value_date),
                  res.trans_count,
                  formatNumber2dp(res.batch_amount),
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ButtonComponent
                      onClick={() => {
                        setFetchData1(true);
                        showPostedData(res.batch_no);
                        setApprovalFlag(res.batch_status);
                      }}
                      buttonIcon={CustomButtons["viewDetails"].icon}
                      buttonHeight={"25px"}
                    />
                  </div>,
                ]);
              });
              setPostedData(arr);
              setLoadingCustomTable(false);
            }
            // setFetchData(false);
            // setFetchData1(false);
            // setPostedModal(true);
            //  setDataTableComponent(true)
            //  handleViewPostedModalOpen()
            // console.log(response.data,"filter")
          } else {
            setLoadingCustomTable(false);
            // setFetchData(false);
            // setFetchData1(false);
            // swal("ERR - 06077", "No Data Loaded", { icon: "error" });
            // setLoader(false)
          }
        });
    } catch (error) {
      setLoadingCustomTable(false);
      // setFetchData(false);
      // setFetchData1(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  const showPostedData = (index) => {
    // console.log(index,"posteddataaa")
    async function postedTransactions() {
      try {
        axios
          .post(
            API_SERVER + "/api/get-posted-transaction-details",
            {
              batch_no: index,
              r_trans_type: r_trans_type,
            },
            { headers }
          )
          .then((response) => {
            // console.log(index,"posteddataaa")
            if (response.data.length > 0) {
              let arr = [];
              response.data?.map((i) => {
                arr.push([
                  i.account_desc,
                  i.acct_link,
                  i.narration,
                  i.scan_doc_id,

                  formatNumber1(i.local_equivalent_db),
                  formatNumber1(i.local_equivalent_cr),
                  i.branch,
                ]);
              });
              setFetchData1(false);
              setPostedJournalData(true);
              setPostedJournalData1(arr);
              setPostedJournalData2(response.data);
            } else {
              setFetchData1(false);
              swal("ERR - 06077", "No Data Found", { icon: "error" });
              // setLoader(false)
            }
          });
      } catch (error) {
        setFetchData1(false);
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }
    postedTransactions();
    // console.log("Edit row:", rowIndex,rowData);
  };

  function closePostedModal() {
    setPostedModal(false);
    setPostedData([]);
  }

  async function getSuspendedDetails(flag) {
    setLoadingCustomTable(true);
    setSuspendModal(true);
    // async function suspended() {
    try {
      axios
        .post(
          API_SERVER + "/api/get-view-suspended-details",
          // {
          //   batch_no: batch_number,
          //   r_trans_type: r_trans_type,
          //   p_user: p_user,
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
          let arr = [];
          if (response.data.length > 0) {
            response.data.map((res, index) => {
              arr.push([
                res.batch_no,
                res.batch_desc,
                formatDate(res.value_date),
                res.trans_count,
                formatNumber2dp(res.batch_amount),
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ButtonComponent
                    // buttonIcon={<AiOutlineDoubleRight />}
                    buttonIcon={CustomButtons["next"].icon}
                    buttonHeight={"25px"}
                    onClick={() => {
                      clearAllData();
                      setFetchData2(true);
                      setBatch_numberSuspend(res.batch_no);
                      axios
                        .post(
                          API_SERVER + "/api/get-suspended-transaction-details",
                          {
                            batch_no: res.batch_no,
                            voucher_number: "JRNL",
                          },
                          { headers }
                        )
                        .then((response) => {
                          if (response.data.length > 0) {
                            setFetchData2(false);
                            setSuspendModal(false);
                            setSuspendDetails(response.data);
                            setSuspendedData([]);
                            // setArrowButtonSuspendedState(true);
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

                // <button onClick={()=>showPostedData(postedData[index][0])}>posted</button>
              ]);
            });
            // setFetchData(false);
            // setFetchData2(false);
            // setSuspendModal(true);
            setSuspendedData(arr);
            setLoadingCustomTable(false);
          } else {
            setLoadingCustomTable(false);
            // swal({
            //   title: "ERR - 06077",
            //   text: "No Data found",
            //   icon: "error",
            // });
            // setFetchData(false);
            // setFetchData2(false);
          }
        });
    } catch (error) {
      setLoadingCustomTable(false);
      // setFetchData(false);
      // setFetchData2(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
    // }
    // suspended();
  }

  useEffect(() => {
    if (suspendDetails.length > 0) {
      let newRows = [];
      suspendDetails.map((view) => {
        if (view.local_equivalent_db !== "null") {
          // setP_credit_acct(view.account_descrption);
          setCurrency(view.currency_code);
          setScanDocid(view.scan_doc_id);
          setDocumentReference(view.document_ref);
          setTransactionDetails(view.transaction_details);
          setValue_date(view.value_date);
          const newObj = {
            p_acct: view.acct_link,
            p_account: view.acct_link,
            p_debit_acct: view.account_descrption,
            p_debit_amt: formatNumber2dp(view.local_equivalent_db),
            p_bra: view.inter_branch,
            scan_doc_id: view.scan_doc_id,
            trans_desc: view.transaction_details,
            p_debit_doc_ref: view.document_ref,
            p_debit_nrtn: view.narration,
            account_currency: view.currency_code,
            typeOfAccount: view.type_of_acct,
            acct_bal: view.acct_balance,
            acct_status: view.status,
          };
          newRows.unshift(newObj);
        } else if (view.local_equivalent_cr !== "null") {
          // setAccountDesc(view.account_descrption)
          const newObj = {
            p_acct: view.acct_link,
            p_account: view.acct_link,
            p_debit_acct: view.account_descrption,
            p_credit_amt: formatNumber2dp(view.local_equivalent_cr),
            p_bra: view.inter_branch,
            scan_doc_id: view.scan_doc_id,
            trans_desc: view.transaction_details,
            p_credit_doc_ref: view.document_ref,
            p_credit_nrtn: view.narration,
            account_currency: view.currency_code,
            typeOfAccount: view.type_of_acct,
            acct_bal: view.acct_balance,
            acct_status: view.status,
          };
          newRows.unshift(newObj);
          // p_debit_acs.push(newObj);
          // console.log(p_credit_doc_ref,"newObj")
        }
      });
      setRows([...newRows, {}, {}, {}, {}, {}, {}, {}]);
    }
  }, [suspendDetails]);

  // console.log(rows,"rowssssrowssssss")

  //  console.log(postedData,"postedData")
  function openPostedModal() {
    setPostedModal(true);
  }
  function viewPostedComponents() {
    openPostedModal();
    // postedTransactions()
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

  function handleEditClick(batch) {
    let arr = [];
    let tdebit = 0;
    let tcredit = 0;
    clearAllData();
    setBatch_numberSuspend(batch);
    setPostedJournalData(false);
    closePostedModal();
    postedJournalData2.map((i) => {
      if (Number(i.local_equivalent_db) > 0) {
        setCurrency(i.currency_code);
        setScanDocid(i.scan_doc_id);
        setDocumentReference(i.document_ref);
        setTransactionDetails(i.transaction_details);
        setValue_date(i.value_date);
        tdebit += NumberWithoutCommas(i.local_equivalent_db);
        const newObj = {
          p_acct: i.acct_link,
          p_account: i.acct_link,
          p_debit_acct: i.account_desc + " - " + i.acct_link,
          p_debit_amt: formatNumber2dp(i.local_equivalent_db),
          p_bra: i.inter_branch,
          scan_doc_id: i.scan_doc_id,
          trans_desc: i.transaction_details,
          p_debit_doc_ref: i.document_ref,
          p_debit_nrtn: i.narration,
          account_currency: i.currency_code,
          typeOfAccount: i.type_of_acct,
          acct_bal: i.acct_balance,
        };
        arr.push(newObj);
        // rows.unshift(newObj);
        // setP_debit_acs(arr);
      } else {
        tcredit += NumberWithoutCommas(i.local_equivalent_cr);
        const newObj = {
          p_acct: i.acct_link,
          p_account: i.acct_link,
          p_debit_acct: i.account_desc + " - " + i.acct_link,
          p_credit_amt: formatNumber2dp(i.local_equivalent_cr),
          p_bra: i.inter_branch,
          scan_doc_id: i.scan_doc_id,
          trans_desc: i.transaction_details,
          p_credit_doc_ref: i.document_ref,
          p_credit_nrtn: i.narration,
          account_currency: i.currency_code,
          typeOfAccount: i.type_of_acct,
          acct_bal: i.acct_balance,
        };
        arr.push(newObj);
      }
    });
    setRows([...arr, {}, {}, {}, {}, {}, {}]);
    setTotalDebit(formatNumber2dp(tdebit));
    setTotalCredit(formatNumber2dp(tcredit));
  }

  return (
    <div
    // style={{zoom:0.9}}
    >
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ padding: "10px" }}>
          <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
            <div style={{ flex: 0.5 }}>
              <ListOfValue
                label={"Currency"}
                labelWidth={"30%"}
                inputWidth={"40%"}
                required={true}
                data={currencylov}
                onChange={(value) => {
                  setCurrency(value);
                  setTimeout(() => {
                    const input = document.getElementById("scandocID");
                    input.focus();
                  }, 0);
                }}
                onKeyDown={(e) => {
                  switchFocus(e, "scandocID");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("scandocID");
                    input.focus();
                  }
                }}
                value={currency}
                id={"currency"}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <div style={{ display: "flex", flex: 1 }}>
                <div style={{ flex: 0.7 }}>
                  <InputField
                    label={"Scan Document ID"}
                    labelWidth={"43%"}
                    onChange={(e) => setScanDocid(e.target.value)}
                    value={scandocID}
                    inputWidth={"51%"}
                    id={"scandocID"}
                    onKeyDown={(e) => {
                      switchFocus(e, "docReference");
                    }}
                  />
                </div>
                <div style={{ flex: 0.3 }}>
                  <ButtonComponent
                    label={""}
                    buttonHeight={"25px"}
                    buttonWidth={"30px"}
                    buttonBackgroundColor={"#0580c0"}
                    onClick={handleClick1}
                    buttonIcon={<FcDocument />}
                    backgroundColor={
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`
                    }
                  />
                </div>
              </div>

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
                  {/* <ImageVerification accountNumber={imageAccount} /> */}
                  {/* <DocumentCapture documentID={p_credit_scan_doc_id} /> */}
                  <DocumentViewing documentID={scandocID} />
                  {/* <Modal.Footer>
            <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
          </Modal.Footer> */}
                </Modal>
              )}
            </div>
          </div>
          <OverlayLoader
            postLoader={postLoader || fetchData}
            // color={"#0580c0"}
            textColor={true}
            displayText={postLoader ? "Loading..." : "Fetching Data..."}
          />
          <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Document Reference"}
                labelWidth={"30%"}
                inputWidth={"40%"}
                value={documentReference}
                onChange={(e) => setDocumentReference(e.target.value)}
                id={"docReference"}
                onKeyDown={(e) => {
                  switchFocus(e, "transdetails");
                }}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Value Date"}
                labelWidth={"30%"}
                inputWidth={"36%"}
                disabled={true}
                required={true}
                value={value_date ? value_date : todayDate}
              />
            </div>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <div style={{}}>
              <InputField
                label={"Transaction Details"}
                labelWidth={"15%"}
                inputWidth={"30%"}
                required={true}
                inputheight={"25px"}
                onChange={(e) => setTransactionDetails(e.target.value)}
                value={transactionDetails}
                id={"transdetails"}
                onKeyDown={(e) => {
                  switchFocus(e, `0p_acct`);
                }}
              />
            </div>
          </div>
          <hr style={{ marginBottom: "15px" }} />
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
                onClick={() => {
                  // setFetchData(true);
                  postedTransactions("R");
                }}
              />

              {postedModal && (
                <Modal
                  className="p-0 m-0"
                  opened={postedModal}
                  size="75%"
                  padding={0}
                  withCloseButton={false}
                  transitionProps={"mounted"}
                  onClose={() => {
                    closePostedModal();
                  }}
                  closeOnClickOutside={false}
                >
                  <ViewPosted
                    postedData={postedData}
                    closePostedModal={closePostedModal}
                    setPostedData={setPostedData}
                    setPostedModal={setPostedModal}
                    approvalFlag={approvalFlag}
                    fetchData1={fetchData1}
                    postedTransactions={postedTransactions}
                    setFetchData1={setFetchData1}
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
              )}

              <ButtonComponent
                label={"View Suspended"}
                onClick={() => {
                  // setFetchData(true);
                  getSuspendedDetails();
                }}
                buttonHeight={"30px"}
                buttonWidth={"160px"}
                buttonColor={"white"}
                // buttonBackgroundColor={"#c4549c"}
              />

              {suspendModal && (
                <Modal
                  className="p-0 m-0"
                  opened={suspendModal}
                  size="75%"
                  padding={0}
                  withCloseButton={false}
                  transitionProps={"mounted"}
                  onClose={() => {
                    setSuspendModal(false);
                    setSuspendedData([]);
                  }}
                  closeOnClickOutside={false}
                >
                  <div>
                    <Header
                      title={"SUSPENDED JOURNAL TRANSACTIONS"}
                      fontWeight={"500"}
                      closeIcon={
                        <AiOutlineCloseCircle
                          size={20}
                          className="mr-2 cursor-pointer"
                        />
                      }
                      backgroundColor={"#0580c0"}
                      handleClose={() => {
                        setSuspendModal(false);
                        setSuspendedData([]);
                      }}
                    />
                  </div>
                  <OverlayLoader
                    postLoader={fetchData2}
                    // color={"#0580c0"}
                    textColor={true}
                    displayText={"Fetching Data..."}
                  />
                  <div className="p-2">
                    <div>
                      <Header title={"Filters"} headerShade={true} />
                    </div>
                    <div
                      className="px-2 py-4 flex flex-col gap-3 rounded-sm mt-1"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <InputField
                          label={"Batch Number"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          onChange={(e) => setBatch_number(e.target.value)}
                          value={batch_number}
                        />
                        <InputField
                          label={"Batch Amount"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          onChange={(e) => setBatchAmount(e.target.value)}
                          value={batch_amount}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <InputField
                          label={"Value Date"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          type={"date"}
                          onChange={(e) => setValue_Date(e.target.value)}
                          value={value_Date}
                        />
                        <RadioButtons
                          label={"Batch Status"}
                          labelWidth={"30%"}
                          name={"batch_status"}
                          id={"pending_approval"}
                          radioLabel={"Pending Approval"}
                          display={true}
                          id2={"rejected"}
                          radioLabel2={"Rejected"}
                          display2={true}
                          value={"N"}
                          checked={approvalFlagFilter === "N"}
                          value2={"R"}
                          checked2={approvalFlagFilter === "R"}
                          onChange={(e) =>
                            setApprovalFlagFilter(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "5px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "8px",
                        margin: "10px 0",
                        padding: "5px",
                        borderBottom: "1px solid lightgray",
                      }}
                    >
                      <ButtonComponent
                        label={"Fetch"}
                        buttonHeight={"30px"}
                        buttonWidth={"55px"}
                        onClick={() => {
                          // setFetchData2(true);
                          getSuspendedDetails();
                        }}
                      />
                      <ButtonComponent
                        label={"Refresh"}
                        buttonHeight={"30px"}
                        buttonWidth={"65px"}
                        onClick={() => {
                          // setFetchData2(true);
                          setBatch_number("");
                          setApprovalFlagFilter("");
                          setBatchAmount("");
                          setValue_Date("");
                          getSuspendedDetails("R");
                        }}
                      />
                      <ButtonComponent
                        label={"Exit"}
                        buttonHeight={"30px"}
                        buttonWidth={"55px"}
                        onClick={() => {
                          setSuspendModal(false);
                          setSuspendedData([]);
                        }}
                      />
                    </div>
                    {/* <div><p>DataTable</p></div> */}
                    <CustomTable
                      rowsPerPage={10}
                      headers={[
                        "Batch Number",
                        "Batch Description",
                        "Value Date",
                        "Trans Count",
                        "Batch Amount",
                        "Action",
                      ]}
                      data={suspendedData}
                      loading={{
                        status: loadingCustomTable,
                        message: "Processing Data...",
                      }}
                      style={{ columnAlignRight: [6], columnAlignCenter: [5] }}
                    />
                  </div>
                </Modal>
              )}
              {postedJournalData ? (
                <Modal
                  className="p-0 m-0"
                  opened={postedJournalData}
                  size="85%"
                  padding={0}
                  withCloseButton={false}
                  transitionProps={"mounted"}
                  onClose={() => {
                    setPostedJournalData(false);
                    // setSuspendedData([]);
                  }}
                >
                  <PostedData
                    setPostedJournalData={setPostedJournalData}
                    postedJournalData1={postedJournalData1}
                    postedJournalData2={postedJournalData2}
                    approvalFlag={approvalFlag}
                    handleEditClick={handleEditClick}
                    setBatch_numberSuspend={setBatch_numberSuspend}
                  />
                </Modal>
              ) : null}
            </div>
            <div style={{ flex: 0.45 }}></div>
            <div style={{ flex: 0.3, justifyContent: "flex-end" }}>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <ButtonComponent
                  label={"Clear"}
                  onClick={ClearButton}
                  buttonHeight={"30px"}
                  buttonWidth={"55px"}
                  // buttonBackgroundColor={"teal"}
                />
                <ButtonComponent
                  label={"Save as Draft"}
                  buttonHeight={"30px"}
                  buttonWidth={"120px"}
                  // buttonBackgroundColor={"teal"}
                  onClick={handleJournalSuspend}
                />
                <ButtonComponent
                  label={"Post"}
                  buttonHeight={"30px"}
                  buttonWidth={"55px"}
                  type={"button"}
                  //  buttonBackgroundColor={"teal"}
                  onClick={handleJournalPosting}
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

          <div>
            {/* main container   */}
            <div>
              <Header
                title={"TRANSACTION DETAILS"}
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
                  paddingBottom: "10px",
                  borderRadius: "2px",
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
                    backgroundColor: "whitesmoke",
                    color: "white",
                    alignItems: "center",
                    background: "#0580c0",
                  }}
                >
                  {/* account name    */}
                  <div
                    style={{
                      flex: 0.255,
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
                      Account Description
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 0.1,
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
                      Debit
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 0.095,
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
                      Credit
                    </div>
                  </div>

                  {/* branch  */}
                  <div
                    style={{
                      flex: 0.13,
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
                      flex: 0.167,
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
                      Scan Document ID
                    </div>
                  </div>

                  {/* narration  */}
                  <div style={{ flex: 0.24, background: "" }}>
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
                  style={{
                    paddingTop: "5px",
                    overflowY: "auto",
                    // display:'flex',
                    // flexDirection:"column-reverse",
                    // flexGrow:1,
                    height: "255px",
                  }}
                >
                  {/* columns like account name, debit amount and the others   */}
                  <div style={{}}>
                    {rows.map((row, index) => (
                      <div key={index}>
                        <JournalRowsComponent
                          index={index}
                          rowData={row}
                          branchlov={branchlov}
                          onChange={handleInputChange}
                          onEnter={handleEnter}
                          onEnter2={addAccNumToRows}
                          documentReference={documentReference}
                          transactionDetails={transactionDetails}
                          p_debit_acs={p_debit_acs}
                          cleared={cleared}
                          p_credit_acs={p_credit_acs}
                          scandocID2={scandocID}
                          currency={currency}
                          scandocumentID={scandocID}
                          onTotalDebitBlur={handleTotalDebit}
                          onTotalCreditBlur={handleTotalCredit}
                          onRemoveRow={handleRemoveRow}
                          onClear={handleClear}
                          setAccName={setAccName}
                          setChartGroup={setChartGroup}
                          setAccountBalance={setAccountBalance}
                          setLoading={setLoading}
                          setCreditAccountModalData={(rowData) => {
                            setAccountData(rowData);
                            setChartGroup(rowData.description);
                            setAccName(rowData.account_descrption);
                            setAccountBalance(
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
                      flex: 1,
                      justifyContent: "space-between",
                      position: "sticky",
                      borderTop: "1px solid lightgray",
                      paddingTop: "7px",
                    }}
                  >
                    {/* account name    */}
                    <div style={{ flex: 0.255, background: "" }}></div>
                    <div style={{ flex: 0.1, background: "" }}>
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          // justifyContent: "center",
                        }}
                      >
                        <InputField
                          inputWidth={"96%"}
                          disabled={"true"}
                          value={totalDebit}
                          noMarginRight
                          textAlign={"right"}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 0.1, background: "" }}>
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <InputField
                          inputWidth={"95%"}
                          disabled={"true"}
                          value={totalCredit}
                          noMarginRight
                          textAlign={"right"}
                        />
                      </div>
                    </div>

                    {/* branch  */}
                    <div style={{ flex: 0.13, background: "" }}></div>

                    {/* Scan Document    */}
                    <div style={{ flex: 0.17, background: "" }}></div>

                    {/* narration  */}
                    <div style={{ flex: 0.24, background: "" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginRight: "20px",
                        }}
                      >
                        <button
                          onClick={renderComponent}
                          // className="rounded-full"
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
                        >
                          <HiPlus size={20} />
                        </button>
                        {/* <ButtonComponent className='rounded-t-full'
          buttonIcon={<BsPlus />}
          onClick={renderComponent} /> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* end hereee */}
              </div>

              <hr />
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
                  />
                </div>
                <div style={{ flex: 0.3 }}>
                  <InputField
                    label={"Current Balance"}
                    labelWidth={"35%"}
                    disabled={"true"}
                    value={accountBalance}
                  />
                </div>
              </div> */}
              <div className="flex justify-evenly py-4">
                <p className="flex gap-2 items-center">
                  <span className="text-md text-gray-500 font-medium">
                    Account Name :{" "}
                  </span>{" "}
                  <span className="flex text-gray-600 font-medium">
                    {loading ? (
                      <SkeletonInput size="small" active />
                    ) : (
                      `${accName}`
                    )}
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
                      `${accountBalance}`
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
