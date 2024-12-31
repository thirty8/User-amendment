import React, { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import { AiOutlineEye } from "react-icons/ai";
import { MDBIcon } from "mdb-react-ui-kit";
import { API_SERVER } from "../../../../../../config/constant";
import InputField from "../../../../../../components/others/Fields/InputField";
// import TextAreaField from '../../../../../../../components/others/Fields/TextArea';
// import { Modal, Button } from 'react-bootstrap';
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import { FcDocument } from "react-icons/fc";
import swal from "sweetalert";
import axios from "axios";
import { Loader } from "@mantine/core";
import { Modal } from "@mantine/core";
import DocumentViewing from "../../../../../../components/others/DocumentViewing";
import SearchModal from "../../receipt/components/Modal";
import {
  formatNumber2dp,
  formatNumberclear,
  NumberWithoutCommas,
  regex,
} from "../../../components/helpers";

function JournalRowsComponent({
  branchlov,
  onChange,
  index,
  rowData,
  onEnter,
  onEnter2,
  documentReference,
  transactionDetails,
  currency,
  scandocID2,
  setCreditAccountModalData,
  onTotalDebitBlur,
  onTotalCreditBlur,
  onRemoveRow,
  onClear,
  cleared,
  setAccountBalance,
  setChartGroup,
  setAccName,
  scandocumentID,
  setLoading,
}) {
  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [creditAmount, setCreditAmount] = useState(false);
  const [debitAmount, setDebitAmount] = useState(false);
  const [filterDebitData, setFilterDebitData] = useState([]);
  const [input2Value, setInput2Value] = useState("");
  const [disableInput1, setDisableInput1] = useState(false);
  const [disableInput2, setDisableInput2] = useState(false);
  const [scandocID, setScandocID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [p_debit_acct, setP_debit_acct] = useState("");
  const [account, setAccount] = useState("");
  // const [accountStatus, setAccountStatus] = useState("");
  const [scanDocument, setScanDocument] = useState("");
  const [transDetails, setTransDetails] = useState("");
  const [loader, setLoader] = useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);

  useEffect(() => {
    setScandocID("");
    setAccount("");
    setP_debit_acct("");
    setDisableInput1(false);
    setDisableInput2(false);
    setTransDetails(transactionDetails);
    setScanDocument(scandocumentID);
    // setDebitAccountBalance("")
  }, [cleared]);

  const handleInput1Change = (e, index) => {
    // const value = e.target.value;
    // setInput1Value(value);
    const name = e.target.name;
    const value = e.target.value;

    if (rowData.acct_status == "DEBIT BLOCK") {
      swal(
        "ERR - 00150",
        "This Account is Blocked From Debit Transactions",
        "error"
      ).then((result) => {
        if (result) {
          setDisableInput1(true);
          document.getElementById(`${index}_p_credit_amt`).focus();
        }
        // id.select()
      });
    } else if (rowData.acct_status == "DORMANT") {
      swal(
        "ERR - 00150",
        "This Account is either Dormant or blocked from debit transactions",
        "error"
      ).then((result) => {
        if (result) {
          setDisableInput1(true);
          document.getElementById(`${index}_p_credit_amt`).focus();
        }
        // id.select()
      });
    } else {
      setDisableInput2(value !== "");
      onChange(index, name, value);
    }
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleInput2Change = (e, index) => {
    const value = e.target.value;
    const name = "p_credit_amt";
    setDisableInput1(value !== "");
    if (rowData.acct_status == "CREDIT BLOCK") {
      swal(
        "ERR - 00150",
        "This Account is Blocked From Credit Transactions",
        "error"
      ).then((result) => {
        setDisableInput2(true);
        document.getElementById(`${index}_p_debit_amt`).focus();
        // id.select()
      });
    } else {
      setDisableInput1(value !== "");
      onChange(index, name, value);
    }
  };
  // console.log(disableInput1,"disableinput1")

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    onChange(index, name, value);
  };

  const handleScanDocInputChange = (event, index) => {
    const { name, value } = event.target;
    onChange(index, name, value);
    setScandocID(value);
  };

  function handleClick1(scan_id) {
    if (scan_id === "") {
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
      setScandocID(scan_id);
      setSweetAlertConfirmed(true);
    }
  }

  const blurNarrationInput = (index) => {
    let newRowData;
    if (rowData.p_debit_amt || rowData.p_credit_amt) {
      if (
        rowData.p_acct &&
        rowData.scan_doc_id &&
        rowData.trans_desc &&
        rowData.p_bra
      ) {
        const rowObject = rowData;
        newRowData = {
          ...rowObject,
          // p_credit_doc_ref: documentReference,
          // p_credit_nrtn: transactionDetails,
          p_account: account ? account : rowObject.p_acct,
        };
        // }
        onEnter(index, newRowData);
      } else {
        swal({
          icon: "warning",
          title: "Empty field(s) found",
          text: "Please fill out all fields in the row",
          closeOnClickOutside: false,
        });
      }
    } else {
      swal({
        icon: "warning",
        title: "Empty field(s) found",
        text: "Please fill out all fields in the row",
        closeOnClickOutside: false,
        // confirmButtonText: "OK",
      });
    }
  };

  function handleKeyDown(event, index) {
    let newRowData;
    if (event.key === "Enter") {
      if (rowData.p_debit_amt || rowData.p_credit_amt) {
        if (
          rowData.p_acct &&
          rowData.scan_doc_id &&
          rowData.trans_desc &&
          rowData.p_bra
        ) {
          const rowObject = rowData;
          newRowData = {
            ...rowObject,
            // p_credit_doc_ref: documentReference,
            // p_credit_nrtn: transactionDetails,
            p_account: account ? account : rowObject.p_acct,
          };
          // }
          onEnter(index, newRowData);
          const nextRowIndex = index + 1;
          const nextInputId = `${nextRowIndex}p_acct`;
          const nextInput = document.getElementById(nextInputId);
          if (nextInput) {
            nextInput.focus();
          }
        } else {
          swal({
            icon: "warning",
            title: "Empty field(s) found",
            text: "Please fill out all fields in the row",
            closeOnClickOutside: false,
          });
        }
      } else {
        swal({
          icon: "warning",
          title: "Empty field(s) found",
          text: "Please fill out all fields in the row",
          closeOnClickOutside: false,
          // confirmButtonText: "OK",
        });
      }
    }
  }

  // const handleKeyDown = (event, index) => {
  //   let newRowData;
  //   if (event.key === "Enter") {
  //     console.log(rowData, "ppppppppp");
  //     if (rowData.hasOwnProperty("p_debit_amt") && rowData.p_debit_amt !== "") {
  //       if (
  //         rowData.p_acct &&
  //         rowData.scan_doc_id &&
  //         rowData.trans_desc &&
  //         rowData.p_bra &&
  //         rowData.p_debit_amt
  //       ) {
  //         const rowObject = rowData;
  //         // if (rowObject.hasOwnProperty("p_debit_amt")) {
  //         //   newRowData = {
  //         //     ...rowObject,
  //         //     p_debit_nrtn: transactionDetails,
  //         //     p_debit_doc_ref: documentReference,
  //         //     p_account: account ? account : rowObject.p_acct,
  //         //   };
  //         // } else {
  //         newRowData = {
  //           ...rowObject,
  //           // p_credit_doc_ref: documentReference,
  //           // p_credit_nrtn: transactionDetails,
  //           p_account: account ? account : rowObject.p_acct,
  //         };
  //         // }
  //         onEnter(index, newRowData);
  //         const nextRowIndex = index + 1;
  //         const nextInputId = `${nextRowIndex}p_acct`;
  //         const nextInput = document.getElementById(nextInputId);
  //         if (nextInput) {
  //           nextInput.focus();
  //         }
  //       } else {
  //         swal({
  //           icon: "warning",
  //           title: "Empty field(s) found",
  //           text: "Please fill out all fields in the row",
  //           closeOnClickOutside: false,
  //           // confirmButtonText: "OK",
  //         }).then((result) => {
  //           if (result) {
  //             setTimeout(() => {
  //               document.getElementById(`${index}scan_doc_id`).focus();
  //             }, 1000);
  //           }
  //         });
  //       }
  //     } else if (rowData.hasOwnProperty("p_credit_amt")) {
  //       if (
  //         rowData.p_acct &&
  //         rowData.scan_doc_id &&
  //         rowData.trans_desc &&
  //         rowData.p_bra &&
  //         rowData.p_credit_amt
  //       ) {
  //         const rowObject = rowData;
  //         // if (rowObject.hasOwnProperty("p_debit_amt")) {
  //         //   newRowData = {
  //         //     ...rowObject,
  //         //     p_debit_nrtn: transactionDetails,
  //         //     p_debit_doc_ref: documentReference,
  //         //     p_account: account ? account : rowObject.p_acct,
  //         //   };
  //         // } else {
  //         newRowData = {
  //           ...rowObject,
  //           // p_credit_doc_ref: documentReference,
  //           // p_credit_nrtn: transactionDetails,
  //           p_account: account ? account : rowObject.p_acct,
  //         };
  //         // }
  //         onEnter(index, newRowData);
  //         const nextRowIndex = index + 1;
  //         const nextInputId = `${nextRowIndex}p_acct`;
  //         const nextInput = document.getElementById(nextInputId);
  //         if (nextInput) {
  //           nextInput.focus();
  //         }
  //       } else {
  //         swal({
  //           icon: "warning",
  //           title: "Empty field(s) found",
  //           text: "Please fill out all fields in the row",
  //           confirmButtonText: "OK",
  //         }).then((result) => {
  //           if (result) {
  //             document.getElementById(`${index}scan_doc_id`).focus();
  //           }
  //         });
  //       }
  //     } else {
  //       swal({
  //         icon: "warning",
  //         title: "Empty field(s) found",
  //         text: "Please fill out all fields in the row",
  //         confirmButtonText: "OK",
  //       });
  //       // const rowObject = rowData;
  //       // // if (rowObject.hasOwnProperty("p_debit_amt")) {
  //       // //   newRowData = {
  //       // //     ...rowObject,
  //       // //     p_debit_nrtn: transactionDetails,
  //       // //     p_debit_doc_ref: documentReference,
  //       // //     p_account: account ? account : rowObject.p_acct,
  //       // //   };
  //       // // } else {
  //       // newRowData = {
  //       //   ...rowObject,
  //       //   // p_credit_doc_ref: documentReference,
  //       //   // p_credit_nrtn: transactionDetails,
  //       //   p_account: account ? account : rowObject.p_acct,
  //       // };
  //       // // }
  //       // onEnter(index, newRowData);
  //       // const nextRowIndex = index + 1;
  //       // const nextInputId = `${nextRowIndex}p_acct`;
  //       // const nextInput = document.getElementById(nextInputId);
  //       // if (nextInput) {
  //       //   nextInput.focus();
  //       // }
  //     }

  //     // console.log(disableInput2,"disableinput")
  //     // // props.showNotification()
  //     // const nextRowIndex = index + 1;
  //     // const nextInputId = `${nextRowIndex}_p_debit_acct`;
  //     // const nextInput = document.getElementById(nextInputId);
  //     // if (nextInput) {
  //     //   nextInput.focus();
  //     // }
  //   }
  // };

  const handleRemoveRow = () => {
    let rowObject1;
    let amt_type;
    if (rowData.p_debit_amt) {
      rowObject1 = rowData.p_debit_amt;
      amt_type = "p_debit_amt";
      onRemoveRow(index, rowObject1, amt_type);
      setP_debit_acct("");
      setDisableInput2(false);
    } else if (rowData.p_credit_amt) {
      rowObject1 = rowData.p_credit_amt;
      amt_type = "p_credit_amt";
      onRemoveRow(index, rowObject1, amt_type);
      setP_debit_acct("");
      setDisableInput1(false);
    }
  };

  const handleClear = () => {
    setP_debit_acct("");
    const rowObject = rowData;
    const debitTotal = rowObject.p_debit_amt;
    const creditTotal = rowObject.p_credit_amt;
    setDisableInput1(false);
    setDisableInput2(false);
    // console.log(rowObject, "row obj")
    const clearedRowData = Object.keys(rowObject).reduce((object, key) => {
      object[key] = "";
      rowObject.p_bra = "";
      rowObject.p_acct = "";
      rowObject.p_debit_acct = "";
      rowObject.scan_doc_id = "";
      rowObject.trans_desc = "";
      return object;
    }, {});
    // console.log(debitTotal, "clearedRowData")
    onClear(index, clearedRowData, debitTotal, creditTotal);
  };

  async function filterAccountDebit() {
    try {
      await axios
        .post(
          API_SERVER +
            "/api/get-account-details-by-account-name-or-account-desc",
          {
            currency: currency,
            account_desc: p_debit_acct,
            account_number: p_debit_acct,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.length > 1) {
            setLoader(false);
            // setShowModal(true)
            setShowModalSearch(true);
            setFilterDebitData(response.data);
            // console.log(response.data,"filter")
          } else if (response.data.length === 1) {
            setP_debit_acct(response.data[0]?.account_descrption);
            rowData.p_debit_acct = response.data[0]?.account_descrption;
            setAccount(response.data[0]?.tacct);
            // setAccountStatus(response.data[0]?.status_desc);
            rowData.acct_status = response.data[0]?.status_desc;
            // setDebitAccountBalance(formatNumber(rowData[5]))
            setCreditAccountModalData(response.data[0]);
            setLoader(false);
            setLoading(false);
            rowData.scan_doc_id = scandocID2;
            rowData.trans_desc = transactionDetails;
            rowData.typeOfAccount = response.data[0]?.type_of_acct;
            rowData.account_currency = response.data[0]?.currency;
            rowData.acct_bal = formatNumber2dp(response.data[0]?.acct_balance);
            let newData = { ...rowData, p_account: response.data[0]?.tacct };
            onEnter2(index, newData);
            document.getElementById(`${index}_p_debit_amt`).focus();
          } else {
            setLoader(false);
            setLoading(false);
            swal("ERR - 05707", "No Data Found", { icon: "error" });
            //  setLoader(false)
            //  handleCloseDebit()
            setShowModal(false);
          }
        });
    } catch (error) {
      setLoader(false);
      setLoading(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function handleKeyPress2(event) {
    if (event.key === "Enter") {
      if (currency == "") {
        swal(
          "Currency not selected!!!",
          "kindly select one to search for account",
          { icon: "warning" }
        );
      } else if (p_debit_acct.length === 0) {
        swal(
          "Account name/number not entered!!!",
          "kindly enter one to search for account",
          { icon: "warning" }
        );
      } else {
        setLoader(true);
        setLoading(true);
        filterAccountDebit();
      }
    }
  }

  const handleAccountChange = (event, index) => {
    const { name, value } = event.target;
    if (event.target.value === "") {
      setAccountBalance("");
      setChartGroup("");
      setAccName("");
    }
    setP_debit_acct(value);
    rowData.p_debit_acct = value;
    onChange(index, name, value);
  };

  const lovInputChange = (value, index) => {
    const name = "p_bra";
    onChange(index, name, value);
  };

  // console.log(account,"account")

  function debitblur() {
    if (rowData.p_debit_amt) {
      if (regex.test(rowData.p_debit_amt)) {
        swal({
          title: "Error",
          text: "kindly ensure amount entered doesn't contain any letters",
          icon: "warning",
          closeOnClickOutside: false,
        }).then((result) => {
          if (result) {
            document.getElementById(`${index}_p_debit_amt`).focus();
            document.getElementById(`${index}_p_debit_amt`).select();
          }
        });
      } else if (
        rowData.typeOfAccount !== "9" &&
        NumberWithoutCommas(rowData.acct_bal) <
          NumberWithoutCommas(rowData.p_debit_amt)
      ) {
        swal({
          title: "ERR - 01586",
          text: "The transaction will overdraw customer's account, please check!!!",
          icon: "error",
          closeOnClickOutside: false,
        }).then((result) => {
          if (result) {
            document.getElementById(`${index}_p_debit_amt`).focus();
            document.getElementById(`${index}_p_debit_amt`).select();
          }
        });
      } else {
        const rowObject = rowData;
        rowObject.p_debit_amt = formatNumberclear(rowData.p_debit_amt);
        onTotalDebitBlur();
      }
    } else {
      onTotalDebitBlur();
    }
  }

  // function debitblur() {
  //   if (rowData.p_debit_amt) {
  //     onChange(
  //       index,
  //       "p_debit_amt",
  //       formatNumber(rowData.p_debit_amt, `${index}_p_debit_amt`)
  //     );
  //     const regex = /[a-zA-Z]/;
  //     if (regex.test(rowData.p_debit_amt) == true) {
  //       swal({
  //         title: "Error",
  //         text: "kindly ensure amount entered doesn't contain any letters",
  //         icon: "warning",
  //         closeOnClickOutside: false,
  //       }).then((result) => {
  //         if (result) {
  //           document.getElementById(`${index}_p_debit_amt`).focus();
  //           document.getElementById(`${index}_p_debit_amt`).select();
  //         }
  //       });
  //     } else {
  //       onTotalDebitBlur();
  //     }
  //   } else {
  //     onTotalDebitBlur();
  //   }
  // }

  function creditblur() {
    if (rowData.p_credit_amt) {
      if (regex.test(rowData.p_credit_amt)) {
        swal({
          title: "Error",
          text: "kindly ensure amount entered doesn't contain any letters",
          icon: "warning",
          closeOnClickOutside: false,
        }).then((result) => {
          if (result) {
            document.getElementById(`${index}_p_credit_amt`).focus();
            document.getElementById(`${index}_p_credit_amt`).select();
          }
        });
      } else {
        rowData.p_credit_amt = formatNumberclear(rowData.p_credit_amt);
        onTotalCreditBlur();
      }
    } else {
      onTotalCreditBlur();
    }
  }

  function handleSelected(value) {
    if (value.status_desc === "DORMANT") {
      // setShowModal(false)
      // setAccountStatus(value.status_desc);
      setShowModalSearch(false);
      setP_debit_acct(value.account_descrption);
      rowData.p_debit_acct = value.account_descrption;
      setAccount(value.tacct);
      setCreditAccountModalData(value);
      setDisableInput1(true);
      setTransDetails(transactionDetails);
      setScanDocument(scandocumentID);
      setLoading(false);
      rowData.scan_doc_id = scandocID2;
      rowData.trans_desc = transactionDetails;
      rowData.typeOfAccount = value.type_of_acct;
      rowData.account_currency = value.currency;
      rowData.acct_status = value.status_desc;
      rowData.acct_bal = formatNumber2dp(value.acct_balance);
      let newData = { ...rowData, p_account: value.tacct };
      onEnter2(index, newData);
      setTimeout(() => {
        document.getElementById(`${index}_p_credit_amt`).focus();
      }, 100);
    } else if (value.status_desc === "DEBIT BLOCK") {
      // setAccountStatus(value.status_desc);
      setShowModalSearch(false);
      setP_debit_acct(value.account_descrption);
      rowData.p_debit_acct = value.account_descrption;
      setAccount(value.tacct);
      // setDebitAccountBalance(formatNumber(rowData[5]))
      setCreditAccountModalData(value);
      setDisableInput1(true);
      setTransDetails(transactionDetails);
      setScanDocument(scandocumentID);
      rowData.scan_doc_id = scandocID2;
      rowData.trans_desc = transactionDetails;
      rowData.typeOfAccount = value.type_of_acct;
      rowData.account_currency = value.currency;
      rowData.acct_bal = formatNumber2dp(value.acct_balance);
      rowData.acct_status = value.status_desc;
      let newData = { ...rowData, p_account: value.tacct };
      setLoading(false);
      onEnter2(index, newData);
      setTimeout(() => {
        document.getElementById(`${index}_p_credit_amt`).focus();
      }, 100);
      // document.getElementById(`${index}_p_credit_amt`).focus()
    } else if (value.status_desc === "CREDIT BLOCK") {
      // setAccountStatus(value.status_desc);
      setShowModalSearch(false);
      setP_debit_acct(value.account_descrption);
      rowData.p_debit_acct = value.account_descrption;
      setAccount(value.tacct);
      // setDebitAccountBalance(formatNumber(rowData[5]))
      setCreditAccountModalData(value);
      setDisableInput2(true);
      setTransDetails(transactionDetails);
      setScanDocument(scandocumentID);
      rowData.scan_doc_id = scandocID2;
      rowData.trans_desc = transactionDetails;
      rowData.typeOfAccount = value.type_of_acct;
      rowData.account_currency = value.currency;
      rowData.acct_bal = formatNumber2dp(value.acct_balance);
      rowData.acct_status = value.status_desc;
      let newData = { ...rowData, p_account: value.tacct };
      onEnter2(index, newData);
      setLoading(false);
      setTimeout(() => {
        document.getElementById(`${index}_p_debit_amt`).focus();
      }, 100);
      // document.getElementById(`${index}_p_debit_amt`).focus()
    } else if (value.status_desc === "TOTAL BLOCKAGE") {
      swal({
        title: "ERR - 07417",
        text: "This Account has Total Blockage",
        icon: "error",
      });
    } else {
      // setShowCredit(false);
      // setAccountStatus(value.status_desc);
      setShowModalSearch(false);
      setP_debit_acct(value.account_descrption);
      rowData.p_debit_acct = value.account_descrption;
      setAccount(value.tacct);
      setTransDetails(transactionDetails);
      setScanDocument(scandocumentID);
      rowData.scan_doc_id = scandocID2;
      rowData.trans_desc = transactionDetails;
      rowData.typeOfAccount = value.type_of_acct;
      rowData.account_currency = value.currency;
      rowData.acct_bal = formatNumber2dp(value.acct_balance);
      rowData.acct_status = value.status_desc;
      let newData = { ...rowData, p_account: value.tacct };
      onEnter2(index, newData);
      setLoading(false);
      // setDebitAccountBalance(formatNumber(rowData[5]))
      setCreditAccountModalData(value);
      setTimeout(() => {
        document.getElementById(`${index}_p_debit_amt`).focus();
      }, 100);
    }
  }

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  return (
    <div>
      {/* rerendering the whole row   */}
      {/* button and input  */}
      <div
        style={{
          display: "flex",
          flex: 1,
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 0.26, background: "" }}>
          {/* button and input  */}
          <div style={{ display: "flex", flex: 1 }}>
            <div
              style={{
                flex: 0.1,
                background: "",
                marginLeft: "4px",
                // marginRight: "3px",
              }}
            >
              <ButtonComponent
                buttonIcon={<VscClose size={20} />}
                buttonHeight={"25px"}
                buttonBackgroundColor={"#0580c0"}
                buttonColor={"white"}
                // onClick={handleClear}
                // onClick={handleRemoveRow}
                onClick={handleClear}
              />
            </div>
            <div style={{ flex: 0.89 }}>
              <InputField
                inputWidth={"99%"}
                noMarginRight
                onChange={(e) => handleAccountChange(e, index)}
                name={"p_acct"}
                onKeyDown={handleKeyPress2}
                value={p_debit_acct ? p_debit_acct : rowData.p_debit_acct || ""}
                // value={
                //   rowData.account
                //     ? rowData.account
                //     : p_debit_acct
                //     ? p_debit_acct
                //     : rowData.p_acct || ""
                // }
                key={index + "p_acct"}
                id={`${index}p_acct`}
              />
            </div>
            <div style={{ flex: 0.02, position: "absolute", left: "355px" }}>
              {loader ? <Loader size={20} /> : null}
            </div>
          </div>
        </div>
        <SearchModal
          setShowModal={() => {
            setShowModalSearch();
            setLoading(false);
            setAccName("");
            setChartGroup("");
            setAccountBalance("");
          }}
          showModal={showModalSearch}
          currency={currency}
          filter1={filterDebitData}
          handleSelected={handleSelected}
        />

        <div style={{ flex: 0.1, background: "" }}>
          {/*  input  */}
          <div style={{ flex: 1 }}>
            <InputField
              inputWidth={"95%"}
              name="p_debit_amt"
              value={disableInput1 ? "" : rowData.p_debit_amt || ""}
              onChange={(e) => handleInput1Change(e, index)}
              onBlur={debitblur}
              disabled={rowData.p_credit_amt ? true : disableInput1}
              id={`${index}_p_debit_amt`}
              key={index + "_p_debit_amt"}
              noMarginRight
              textAlign={"right"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (rowData.p_debit_amt) {
                    // debitblur();
                    switchFocus(e, `${index}p_bra`);
                  } else {
                    switchFocus(e, `${index}_p_credit_amt`);
                  }
                }
                // rowData.p_debit_amt
                //   ? switchFocus(e, `${index}p_bra`)
                //   : switchFocus(e, `${index}_p_credit_amt`);
              }}
              //  disabled={creditAmount !==""}
              // onChange={handleDebitAmountChange}
            />
          </div>
        </div>

        <div style={{ flex: 0.1, background: "" }}>
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <InputField
              inputWidth={"95%"}
              name="p_credit_amt"
              value={disableInput2 ? "" : rowData.p_credit_amt || ""}
              onChange={(e) => handleInput2Change(e, index)}
              disabled={rowData.p_debit_amt ? true : disableInput2}
              id={`${index}_p_credit_amt`}
              key={index + "_p_credit_amt"}
              noMarginRight
              textAlign={"right"}
              onBlur={creditblur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // creditblur();
                  switchFocus(e, `${index}p_bra`);
                }
              }}
              //  disabled={debitAmount!==""}
              //  onChange={handleCreditAmountChange}
            />
          </div>
        </div>

        <div style={{ flex: 0.13, background: "" }}>
          {/* button and input  */}
          <div style={{ flex: 1 }}>
            <ListOfValue
              inputWidth={"95%"}
              data={branchlov}
              noMarginRight={true}
              // onDropdownClose={handleBlur}
              onChange={(e) => {
                lovInputChange(e, index);
                setTimeout(() => {
                  const input = document.getElementById(`${index}scan_doc_id`);
                  input.focus();
                }, 0);
              }}
              // name={disableInput2 ? "p_debit_bra" :"p_credit_bra"}
              id={`${index}p_bra`}
              key={index + "p_bra"}
              onKeyDown={(e) => {
                switchFocus(e, `${index}scan_doc_id`);
                if (e.key === "Enter") {
                  e.preventDefault();
                  const input = document.getElementById(`${index}scan_doc_id`);
                  input.focus();
                }
              }}
              value={rowData.p_bra || ""}
            />
          </div>
        </div>

        <div style={{ flex: 0.17, background: "" }}>
          {/* button and input  */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 0.84 }}>
              <InputField
                inputWidth={"99%"}
                onChange={(e) => {
                  handleScanDocInputChange(e, index);
                }}
                name={"scan_doc_id"}
                id={`${index}scan_doc_id`}
                key={index + "scan_doc_id"}
                noMarginRight
                value={rowData.scan_doc_id || ""}
                onKeyDown={(e) => {
                  switchFocus(e, `${index}trans_desc`);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flex: 0.15,
                background: "",
              }}
            >
              <ButtonComponent
                buttonIcon={<FcDocument />}
                buttonBackgroundColor={"#0580c0"}
                buttonColor={"white"}
                buttonHeight={"25px"}
                buttonWidth={"30px"}
                onClick={() => handleClick1(rowData.scan_doc_id)}
              />
            </div>
          </div>
        </div>

        <div style={{ flex: 0.24, background: "" }}>
          {/*  input  */}
          <div style={{ flex: 1 }}>
            <InputField
              inputWidth={"98%"}
              name={"trans_desc"}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onBlur={() => blurNarrationInput(index)}
              id={`${index}trans_desc`}
              key={index + "trans_desc"}
              value={rowData.trans_desc || ""}
              noMarginRight
            />
          </div>

          {sweetAlertConfirmed && (
            <Modal
              className="p-0 m-0"
              opened={sweetAlertConfirmed}
              size="75%"
              padding={0}
              withCloseButton={false}
              transitionProps={"mounted"}
              onClose={() => {
                setSweetAlertConfirmed(false);
              }}
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
            // 1683042691
          )}
        </div>
      </div>
    </div>
  );
}

export default JournalRowsComponent;
