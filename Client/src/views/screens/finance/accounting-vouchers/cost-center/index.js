import React, { useEffect, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import DocumentViewing from "../../../../../components/others/DocumentViewing";
import { FcDocument } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { Modal, Notification } from "@mantine/core";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import swal from "sweetalert";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import Header from "../../../../../components/others/Header/Header";
import RowComponent from "./components/rowComponent";
import { HiPlus } from "react-icons/hi";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import CustomTable from "../../../teller-ops/components/CustomTable";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CustomButtons from "../../../../../components/others/CustomButtons";
import OverlayLoader from "../../../../../components/others/OverlayLoader";
import CostCenterPostedDetails from "./components/costcenterposteddetails";
import CostCenterTransactions from "./components/costcentertransactions";

import {
  NumberWithoutCommas,
  formatDate,
  formatNumber1,
  formatNumber2dp,
  formatNumberclear,
  handleExitClick,
} from "../../components/helpers";
import { Skeleton } from "antd";
import SkeletonInput from "antd/es/skeleton/Input";

function CostCenterPosting() {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [postedModal, setPostedModal] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [rows, setRows] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  const [scanDocid, setScanDocid] = useState("");
  const [currencylov, setCurrencylov] = useState([]);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [postedTransactionsDetails, setPostedTransactionsDetails] = useState(
    []
  );
  const [postedTransactionsDetails2, setPostedTransactionsDetails2] = useState(
    []
  );
  const [postedTransactions, setPostedTransactions] = useState([]);
  // const [debit_acs, setDebit_acs] = useState([]);
  // const [credit_acs, setCredit_acs] = useState([]);
  const [costCenterlov, setCostCenterlov] = useState([]);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [fetchData1, setFetchData1] = useState(false);
  const [fetchData2, setFetchData2] = useState(false);
  const [postedDetailsModal, setPostedDetailsModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [batchNumber, setBatchNumber] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [currency, setCurrency] = useState("");
  const [totalDebit, setTotalDebit] = useState("");
  const [totalCredit, setTotalCredit] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [documentReference, setDocumentReference] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [batch_amount, setBatchAmount] = useState("");
  const [value_Date, setValue_Date] = useState("");
  const [approvalFlagFilter, setApprovalFlagFilter] = useState("");
  const [date_t, setDate_t] = useState("");
  const [loadingCustomTable, setLoadingCustomTable] = useState(false);

  // const [batchNumber, setbatchNumber] = useState("");

  useEffect(() => {
    async function getCurrency() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "CUR" },
          { headers }
        );
        setCurrencylov(response.data);
      } catch (error) {
        swal({ icon: "error", title: error.message });
      }
    }

    //cost center lov
    async function getCostCenterLov() {
      try {
        let response = await axios.get(
          API_SERVER + "/api/get-cost-center-lov",
          {
            headers,
          }
        );
        setCostCenterlov(response.data);
      } catch (error) {
        swal({ icon: "error", title: error.message });
      }
    }
    getCurrency();
    getCostCenterLov();
    setValueDate(todayDate);
  }, []);

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  function handleClick1() {
    if (scanDocid === "") {
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

  function fetchPostedTransactions(flag) {
    setPostedModal(true);
    setLoadingCustomTable(true);
    try {
      let arr = [];
      axios
        .post(
          API_SERVER + "/api/get-posted-transactions",
          // {
          //   username: JSON.parse(localStorage.getItem("userInfo")).id,
          //   BATCH_NO: batchNumber,
          // },
          flag === "R"
            ? {
                batch_number: "",
                r_trans_type: "CCP",
                p_user: JSON.parse(localStorage.getItem("userInfo")).id,
                batch_amount: "",
                approval_flag: "",
                value_date: "",
              }
            : {
                batch_number: batchNumber,
                r_trans_type: "CCP",
                p_user: JSON.parse(localStorage.getItem("userInfo")).id,
                batch_amount: batch_amount,
                approval_flag: approvalFlagFilter,
                value_date: date_t ? formatDate(date_t) : "",
              },
          { headers }
        )
        .then((response) => {
          response.data?.map((i) => {
            arr.push([
              i.batch_status,
              formatDate(i.value_date),
              i.batch_no,
              i.batch_desc,
              i.trans_count,
              formatNumber1(i.batch_amount),
              <div className="flex items-center justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["viewDetails"].icon}
                  onClick={() => {
                    fetchPostedCostCenterTransactions(i.batch_no);
                    setApprovalStatus(i.batch_status);
                  }}
                />
              </div>,
            ]);
          });
          // setFetchData(false);
          // setFetchData1(false);
          setLoadingCustomTable(false);
          // setPostedModal(true);
          setPostedTransactions(arr);
          // setPostedTransactions2(arr)
        });
    } catch (e) {
      // setFetchData(false);
      // setFetchData1(false);
      setLoadingCustomTable(false);
      swal({ icon: "error", title: "Error", text: e.message });
    }
  }

  const renderComponent = () => {
    // Create a new instance of MyComponent and add it to the componentArray
    setRows([...rows, {}]);
  };

  // function refreshClick() {
  //   try {
  //     setFetchData1(true);
  //     setBatchNumber("");
  //     let arr = [];
  //     axios
  //       .post(
  //         API_SERVER + "/api/get-cost-center-posted-transactions",
  //         {
  //           username: JSON.parse(localStorage.getItem("userInfo")).id,
  //           BATCH_NO: "",
  //         },
  //         { headers }
  //       )
  //       .then((response) => {
  //         response.data?.map((i) => {
  //           arr.push([
  //             i.batch_status,
  //             formatDate(i.value_date),
  //             i.batch_no,
  //             i.batch_desc,
  //             i.trans_count,
  //             formatNumber1(i.batch_amount),
  //             <div className="flex items-center justify-center">
  //               <ButtonComponent
  //                 buttonIcon={CustomButtons["viewDetails"].icon}
  //                 onClick={() => {
  //                   fetchPostedCostCenterTransactions(i.batch_no);
  //                   setApprovalStatus(i.batch_status);
  //                 }}
  //               />
  //             </div>,
  //           ]);
  //         });
  //         // setPostedModal(true);
  //         setPostedTransactions(arr);
  //         setFetchData1(false);
  //         // setPostedTransactions2(arr)
  //       });
  //   } catch (error) {
  //     setFetchData1(false);
  //     swal({ icon: "error", text: error.message, title: "Error" });
  //   }
  // }

  function fetchPostedCostCenterTransactions(b) {
    try {
      setFetchData1(true);
      let arr = [];
      axios
        .post(
          API_SERVER + "/api/get-posted-cost-center-details",
          {
            batch_number: b,
          },
          { headers }
        )
        .then((res) => {
          if (res.data.length > 0) {
            setPostedTransactionsDetails2(res.data);
            res.data?.map((i) => {
              // if(i.local_equivalent_db = null)
              i.local_equivalent_cr === "null"
                ? arr.push([
                    i.account_description,
                    i.acct_link,
                    i.transaction_details,
                    i.scan_doc_id,
                    formatNumberclear(i.local_equivalent_db),
                    "",
                    i.inter_branch,
                  ])
                : arr.push([
                    i.account_description,
                    i.acct_link,
                    i.transaction_details,
                    i.scan_doc_id,
                    "",
                    formatNumberclear(i.local_equivalent_cr),
                    i.inter_branch,
                  ]);
            });
            setPostedTransactionsDetails(arr);
            setFetchData1(false);
            setPostedDetailsModal(true);
          }
        });
    } catch (error) {
      setFetchData1(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  const handleInputChange = (index, name, value) => {
    const newRow = { ...rows[index], [name]: value };
    const newRows = [...rows.slice(0, index), newRow, ...rows.slice(index + 1)];
    setRows(newRows);
    // console.log(rows,"rowsssss")
  };

  const handleTotalDebit = () => {
    const newTotal = rows.reduce((acc, row) => {
      if (row && row.p_debit_amt) {
        const num = parseFloat(row.p_debit_amt.replace(/,/g, ""));
        return isNaN(num) ? acc : acc + num;
      }
      return acc;
    }, 0);

    const formattedTotal = formatNumberclear(newTotal);
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

    const formattedTotal = formatNumberclear(newTotal);
    setTotalCredit(formattedTotal);
  };

  const handleEnter = (index, rowData) => {
    const updatedRows = [...rows];
    updatedRows[index] = rowData;
    // if (
    //   !(
    //     updatedRows[index].hasOwnProperty("p_credit_amt") &&
    //     updatedRows[index].hasOwnProperty("p_debit_amt")
    //   )
    // ) {
    //   swal({
    //     icon: "warning",
    //     title: "Empty field(s) found",
    //     text: "Please fill out all fields in the row-both",
    //     button: "OK",
    //     closeOnClickOutside: false,
    //   }).then((res) => {
    //     if (res) {
    //       document.getElementById(index + "scan_doc_id").focus();
    //     }
    //   });
    // }
    if (
      (updatedRows[index].p_debit_amt == "" &&
        updatedRows[index].p_credit_amt == "") ||
      (updatedRows[index].p_debit_amt == undefined &&
        updatedRows[index].p_credit_amt == undefined)
    ) {
      swal({
        icon: "warning",
        title: "Empty field(s) found",
        text: "Please fill out all fields in the row",
        button: "OK",
        closeOnClickOutside: false,
      }).then((res) => {
        if (res) {
          document.getElementById(index + "scan_doc_id").focus();
        }
      });
    } else {
      // console.log(updatedRows[index], "updatedRows[index]");
      setRows(updatedRows);
      showNotification();
    }
    //  else if (
    //   updatedRows[index].hasOwnProperty("p_debit_amt") ||
    //   updatedRows[index].p_credit_amt != ""
    // ) {
    //   if (
    //     updatedRows[index].acct == "" ||
    //     updatedRows[index].cost_center == "" ||
    //     updatedRows[index].scan_doc_id == "" ||
    //     updatedRows[index].trans_desc == "" ||
    //     updatedRows[index].p_debit_amt == ""
    //   ) {
    //     swal({
    //       icon: "warning",
    //       title: "Empty field(s) found",
    //       text: "Please fill out all fields in the row - debit",
    //       button: "OK",
    //       closeOnClickOutside: false,
    //     }).then((res) => {
    //       if (res) {
    //         document.getElementById(index + "scan_doc_id").focus();
    //       }
    //     });
    //   } else if (
    //     updatedRows[index].acct == undefined ||
    //     updatedRows[index].cost_center == undefined ||
    //     updatedRows[index].scan_doc_id == undefined ||
    //     updatedRows[index].trans_desc == undefined ||
    //     updatedRows[index].p_debit_amt == undefined
    //   ) {
    //     swal({
    //       icon: "warning",
    //       title: "Empty field(s) found",
    //       text: "Please fill out all fields in the row",
    //       button: "OK",
    //       closeOnClickOutside: false,
    //     }).then((res) => {
    //       if (res) {
    //         document.getElementById(index + "scan_doc_id").focus();
    //       }
    //     });
    //   } else {
    //     // console.log(updatedRows[index], "updatedRows[index]");
    //     setRows(updatedRows);
    //     showNotification();
    //   }
    // }
    //  else if (updatedRows[index].hasOwnProperty("p_credit_amt")) {
    //   if (
    //     updatedRows[index].acct == "" ||
    //     updatedRows[index].cost_center == "" ||
    //     updatedRows[index].scan_doc_id == "" ||
    //     updatedRows[index].trans_desc == "" ||
    //     updatedRows[index].p_credit_amt == ""
    //   ) {
    //     swal({
    //       icon: "warning",
    //       title: "Empty field(s) found",
    //       text: "Please fill out all fields in the row-credit",
    //       button: "OK",
    //       closeOnClickOutside: false,
    //     }).then((res) => {
    //       if (res) {
    //         document.getElementById(index + "scan_doc_id").focus();
    //       }
    //     });
    //   } else if (
    //     updatedRows[index].acct == undefined ||
    //     updatedRows[index].cost_center == undefined ||
    //     updatedRows[index].scan_doc_id == undefined ||
    //     updatedRows[index].trans_desc == undefined ||
    //     updatedRows[index].p_credit_amt == undefined
    //   ) {
    //     swal({
    //       icon: "warning",
    //       title: "Empty field(s) found",
    //       text: "Please fill out all fields in the row",
    //       button: "OK",
    //       closeOnClickOutside: false,
    //     }).then((res) => {
    //       if (res) {
    //         document.getElementById(index + "scan_doc_id").focus();
    //       }
    //     });
    //   } else {
    //     // console.log(updatedRows[index], "updatedRows[index]");
    //     setRows(updatedRows);
    //     showNotification();
    //   }
    // }
  };

  const showNotification = () => {
    setNotification(true);
    const timeout = setTimeout(() => {
      setNotification(false);
    }, 1500);

    return () => clearTimeout(timeout);
  };

  //HANDLE CLOSE NOTIFICATION
  const handleCloseNotification = () => setNotification(false);

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      // e.preventDefault()
      document.getElementById(nextFieldId).focus();
    }
  }

  // console.log(credit_acs, "rowssssss");
  let currencyMismatch;

  const PostCostCenter = async () => {
    try {
      setPostLoader(true);
      let debit_arr = [];
      let credit_arr = [];

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
          // if (row.p_credit_amt != "") {
          if (row.hasOwnProperty("p_credit_amt") && row.p_credit_amt !== "") {
            credit_arr.push({
              p_credit_acct: row.p_account,
              p_credit_amt: NumberWithoutCommas(row.p_credit_amt),
              p_credit_bra: row.cost_center,
              p_credit_doc_ref: row.p_credit_doc_ref
                ? row.p_credit_doc_ref
                : documentReference,
              p_credit_scan_doc_id: row.scan_doc_id
                ? row.scan_doc_id
                : scanDocid,
              p_credit_trans_desc: row.trans_desc
                ? row.trans_desc
                : transactionDetails,
              p_credit_nrtn: row.trans_desc
                ? row.trans_desc
                : transactionDetails,
              credit_unit_code: "",
              credit_dept_code: "",
            });
          } else if (
            row.hasOwnProperty("p_debit_amt") &&
            row.p_debit_amt !== ""
          ) {
            debit_arr.push({
              p_debit_acct: row.p_account,
              p_debit_amt: NumberWithoutCommas(row.p_debit_amt),
              p_debit_bra: row.cost_center,
              p_debit_doc_ref: row.p_credit_doc_ref
                ? row.p_credit_doc_ref
                : documentReference,
              p_debit_scan_doc_id: row.scan_doc_id
                ? row.scan_doc_id
                : scanDocid,
              p_debit_trans_desc: row.trans_desc
                ? row.trans_desc
                : transactionDetails,
              p_debit_nrtn: row.trans_desc
                ? row.trans_desc
                : transactionDetails,
              debit_unit_code: "",
              debit_dept_code: "",
            });
          }
        });
        axios
          .post(
            API_SERVER + "/api/post_cost_center",
            {
              flag: "N",
              currency: currency,
              scanDocument: scanDocid,
              batchNumber: batchNumber,
              postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
              valueDate: todayDate,
              transDetails: transactionDetails,
              postingBranch: JSON.parse(localStorage.getItem("userInfo"))
                .branchCode,
              documentRef: documentReference,
              debit_acs: debit_arr,
              credit_acs: credit_arr,
            },
            { headers }
          )
          .then((res) => {
            if (res.data.success === "Y") {
              setPostLoader(false);
              swal({ title: res.data.message, text: "", icon: "success" }).then(
                (res) => {
                  if (res) {
                    clearAllFields();
                  }
                }
              );
            } else {
              setPostLoader(false);
              swal({ title: res.data.message, text: "", icon: "error" });
            }
          });
      }
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  };

  function clearAllFields() {
    setCurrency("");
    setScanDocid("");
    setDocumentReference("");
    setTransactionDetails("");
    setBatchNumber("");
    setAccountBalance("");
    setRows([{}, {}, {}, {}, {}, {}, {}, {}]);
    setBudgetDetails([]);
    setTotalCredit("");
    setTotalDebit("");
    setLoading(false);
    setCleared(!cleared);
  }

  function clearButton() {
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
        setScanDocid("");
        setDocumentReference("");
        setTransactionDetails("");
        setAccountBalance("");
        setBatchNumber("");
        setRows([{}, {}, {}, {}, {}, {}, {}, {}]);
        setBudgetDetails([]);
        setTotalCredit("");
        setTotalDebit("");
        setLoading(false);
        setCleared(!cleared);
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

  const handleClear = (index, clearedRowData, debitTotal, creditTotal) => {
    const updatedRows = [...rows];
    // setAccName("");
    // setChartGroup("");
    // setAccountBalance("");
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

  function handleEditClick() {
    let arr = [];
    let tdebit = 0;
    let tcredit = 0;
    setPostedDetailsModal(false);
    setPostedModal(false);

    postedTransactionsDetails2.map((i) => {
      if (Number(i.local_equivalent_db) > 0) {
        setCurrency(i.currency_code);
        setScanDocid(i.scan_doc_id);
        setDocumentReference(i.document_ref);
        setTransactionDetails(i.transaction_details);
        setBatchNumber(i.batch_no);
        setValueDate(i.value_date);
        tdebit += NumberWithoutCommas(i.local_equivalent_db);
        const newObj = {
          p_account: i.acct_link,
          acct: i.account_description + " - " + i.acct_link,
          p_debit_amt: formatNumber2dp(i.local_equivalent_db),
          cost_center: i.cost_center,
          scan_doc_id: i.scan_doc_id,
          trans_desc: i.transaction_details,
          p_debit_doc_ref: i.document_ref,
          p_debit_nrtn: i.transaction_details,
          account_currency: i.currency_code,
          typeOfAccount: i.type_of_acct,
          acct_bal: i.acct_balance,
          acct_status: i.status,
        };
        arr.push(newObj);
        // rows.unshift(newObj);
        // setP_debit_acs(arr);
      } else {
        tcredit += NumberWithoutCommas(i.local_equivalent_cr);
        const newObj = {
          p_account: i.acct_link,
          acct: i.account_description + " - " + i.acct_link,
          p_credit_amt: formatNumber2dp(i.local_equivalent_cr),
          cost_center: i.cost_center,
          scan_doc_id: i.scan_doc_id,
          trans_desc: i.transaction_details,
          p_credit_doc_ref: i.document_ref,
          p_credit_nrtn: i.transaction_details,
          account_currency: i.currency_code,
          typeOfAccount: i.type_of_acct,
          acct_bal: i.acct_balance,
          acct_status: i.status,
        };
        arr.push(newObj);
      }
    });
    setRows([...arr, {}, {}, {}, {}, {}, {}]);
    setTotalDebit(formatNumber2dp(tdebit));
    setTotalCredit(formatNumber2dp(tcredit));
  }

  return (
    <div>
      <OverlayLoader
        postLoader={postLoader || fetchData}
        // color={"#0580c0"}
        textColor={true}
        displayText={postLoader ? "Loading..." : "Fetching Data..."}
      />
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        {postedDetailsModal && (
          <Modal
            className="p-0 m-0"
            opened={postedDetailsModal}
            size="90%"
            padding={0}
            withCloseButton={false}
            transitionProps={"mounted"}
            onClose={() => setPostedDetailsModal(false)}
            closeOnClickOutside={false}
          >
            <CostCenterPostedDetails
              setPostedDetailsModal={setPostedDetailsModal}
              postedTransactionsDetails={postedTransactionsDetails}
              approvalStatus={approvalStatus}
              postedTransactionsDetails2={postedTransactionsDetails2}
              handleEditClick={handleEditClick}
            />
          </Modal>
        )}
        <div className="p-2">
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
                    inputWidth={"51%"}
                    onChange={(e) => setScanDocid(e.target.value)}
                    value={scanDocid}
                    required={true}
                    id={"scandocID"}
                    onKeyDown={(e) => {
                      switchFocus(e, "documentReference");
                    }}
                  />
                </div>
                <div style={{ flex: 0.3 }}>
                  <ButtonComponent
                    // label={""}
                    buttonHeight={"25px"}
                    buttonWidth={"30px"}
                    buttonBackgroundColor={"#0580c0"}
                    onClick={handleClick1}
                    buttonIcon={<FcDocument />}
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
                  <DocumentViewing documentID={scanDocid} />
                  {/* <Modal.Footer>
            <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
          </Modal.Footer> */}
                </Modal>
              )}

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
                    // icon={<MDBIcon fas icon="check" size="1.1rem" />}
                    color="teal"
                    title="Data Added"
                    withCloseButton={false}
                    onClose={handleCloseNotification}
                  ></Notification>
                </div>
              ) : (
                ""
              )}

              {postedModal && (
                <Modal
                  className="p-0 m-0"
                  opened={postedModal}
                  size="75%"
                  padding={0}
                  withCloseButton={false}
                  transitionProps={"mounted"}
                  onClose={() => setPostedModal(false)}
                  closeOnClickOutside={false}
                >
                  <CostCenterTransactions
                    postedTransactions={postedTransactions}
                    setPostedModal={setPostedModal}
                    setBatchNumber={setBatchNumber}
                    fetchPostedTransactions={fetchPostedTransactions}
                    batchNumber={batchNumber}
                    fetchData1={fetchData1}
                    setFetchData1={setFetchData1}
                    setBatchAmount={setBatchAmount}
                    batch_amount={batch_amount}
                    setValue_Date={setValue_Date}
                    value_date={value_Date}
                    setApprovalFlagFilter={setApprovalFlagFilter}
                    approvalFlagFilter={approvalFlagFilter}
                    date_t={date_t}
                    setDate_t={setDate_t}
                    loadingCustomTable={loadingCustomTable}
                  />
                </Modal>
              )}
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Value Date"}
                labelWidth={"30%"}
                inputWidth={"40%"}
                disabled={true}
                required={true}
                value={valueDate}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Document Reference"}
                labelWidth={"30%"}
                inputWidth={"41%"}
                required={true}
                value={documentReference}
                id={"documentReference"}
                onChange={(e) => setDocumentReference(e.target.value)}
                onKeyDown={(e) => {
                  switchFocus(e, "transdetails");
                }}
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
                onChange={(e) => setTransactionDetails(e.target.value)}
                value={transactionDetails}
                id={"transdetails"}
                onKeyDown={(e) => {
                  switchFocus(e, `0acct`);
                }}
              />
            </div>
          </div>
          <hr style={{ marginBottom: "15px" }} />
          <div className="flex justify-between px-6">
            <div>
              <ButtonComponent
                label={"Posted Transactions"}
                buttonHeight={"30px"}
                buttonWidth={"170px"}
                onClick={() => {
                  // setFetchData(true);
                  fetchPostedTransactions("R");
                }}
              />
            </div>
            <div className="flex gap-2">
              <ButtonComponent
                label={"Clear"}
                buttonHeight={"30px"}
                buttonWidth={"55px"}
                onClick={clearButton}
              />
              <ButtonComponent
                label={"Post"}
                buttonHeight={"30"}
                buttonWidth={"65px"}
                onClick={PostCostCenter}
              />
              <ButtonComponent
                label={"Exit"}
                buttonHeight={"30"}
                buttonWidth={"55px"}
                onClick={() => {
                  setPostedModal(false);
                  setBatchNumber("");
                  handleExitClick();
                }}
              />
            </div>
          </div>
          <div className="mt-3">
            <Header
              title={"TRANSACTION DETAILS"}
              headerShade={true}
              fontWeight={"500"}
            />
          </div>
          <div>
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
                <div
                  style={{
                    flex: 0.235,
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
                {/* branch  */}
                <div
                  style={{
                    flex: 0.148,
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
                    Cost Center
                  </div>
                </div>
                <div
                  style={{
                    flex: 0.096,
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
                    flex: 0.099,
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
                {rows.map((row, index) => (
                  <div key={index}>
                    <RowComponent
                      index={index}
                      onChange={handleInputChange}
                      costCenterlov={costCenterlov}
                      currency={currency}
                      rowData={row}
                      onTotalDebitBlur={handleTotalDebit}
                      onTotalCreditBlur={handleTotalCredit}
                      setAccountBalance={setAccountBalance}
                      setLoading={setLoading}
                      setBudgetLoading={setBudgetLoading}
                      onEnter={handleEnter}
                      documentReference={documentReference}
                      transactionDetails={transactionDetails}
                      scandocumentID={scanDocid}
                      setBudgetDetails={setBudgetDetails}
                      cleared={cleared}
                      onClear={handleClear}
                    />
                  </div>
                ))}
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
                  <div style={{ flex: 0.24, background: "" }}></div>
                  <div style={{ flex: 0.14, background: "" }}></div>

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
                        noMarginRight={true}
                        value={totalDebit}
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
                        noMarginRight
                        value={totalCredit}
                        textAlign={"right"}
                      />
                    </div>
                  </div>

                  {/* branch  */}

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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex justify-evenly py-4">
            <div>
              <InputField
                label={"Balance"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled={true}
                textAlign={"right"}
                value={accountBalance}
              />
            </div>
            <div>
              <InputField
                label={"Budget"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled={true}
                value={
                  budgetDetails.length > 0
                    ? formatNumberclear(budgetDetails[0]?.budget)
                    : ""
                }
                textAlign={"right"}
              />
            </div>
            <div>
              <InputField
                label={"Amount Utilized"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled={true}
                value={
                  budgetDetails.length > 0
                    ? formatNumberclear(budgetDetails[0]?.utilized)
                    : ""
                }
                textAlign={"right"}
              />
            </div>
            <div>
              <InputField
                label={"Amount Unutilized"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                disabled={true}
                value={
                  budgetDetails.length > 0
                    ? formatNumberclear(budgetDetails[0]?.unutilized)
                    : ""
                }
                textAlign={"right"}
              />
            </div>
          </div> */}

          <div className="flex justify-evenly py-4">
            <p className="flex gap-2 items-center">
              <span className="text-md text-gray-500 font-semibold">
                Balance :{" "}
              </span>{" "}
              <span className="flex text-gray-600">
                {loading ? (
                  <SkeletonInput size="small" active />
                ) : (
                  `${accountBalance}`
                )}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="text-md text-gray-500 font-semibold">
                Budget :{" "}
              </span>{" "}
              <span className="flex text-gray-600">
                {budgetLoading ? (
                  <SkeletonInput size="small" active />
                ) : (
                  `${
                    budgetDetails.length > 0
                      ? formatNumberclear(budgetDetails[0]?.budget)
                      : ""
                  }`
                )}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="text-md text-gray-500 font-semibold">
                Amount Utilized :{" "}
              </span>{" "}
              <span className="flex text-gray-600">
                {budgetLoading ? (
                  <SkeletonInput size="small" active />
                ) : (
                  `${
                    budgetDetails.length > 0
                      ? formatNumberclear(budgetDetails[0]?.utilized)
                      : ""
                  }`
                )}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="text-md text-gray-500 font-semibold">
                Amount Unutilized :{" "}
              </span>
              <span className="flex text-gray-600">
                {budgetLoading ? (
                  <SkeletonInput size="small" active />
                ) : (
                  `${
                    budgetDetails.length > 0
                      ? formatNumberclear(budgetDetails[0]?.unutilized)
                      : ""
                  }`
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostCenterPosting;
