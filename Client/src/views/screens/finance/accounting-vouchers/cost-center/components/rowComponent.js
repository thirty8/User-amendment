import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { VscClose } from "react-icons/vsc";
import { Loader, Modal } from "@mantine/core";
import { FcDocument } from "react-icons/fc";
import DocumentViewing from "../../../../../../components/others/DocumentViewing";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import swal from "sweetalert";
import SearchModal from "../../receipt/components/Modal";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import {
  NumberWithoutCommas,
  formatNumber,
  formatNumber2dp,
  regex,
} from "../../../components/helpers";

function RowComponent({
  index,
  onChange,
  costCenterlov,
  currency,
  rowData,
  onTotalDebitBlur,
  onTotalCreditBlur,
  setAccountBalance,
  onEnter,
  documentReference,
  transactionDetails,
  scandocumentID,
  setBudgetDetails,
  cleared,
  onClear,
  setLoading,
  setBudgetLoading,
}) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [filterDebitData, setFilterDebitData] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [disableInput1, setDisableInput1] = useState(false);
  const [disableInput2, setDisableInput2] = useState(false);
  const [scandocID, setScandocID] = useState("");
  const [account, setAccount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountStatus, setAccountStatus] = useState("");

  useEffect(() => {
    setScandocID("");
    setAccount("");
    setAccountNumber("");
    setAccountStatus("");
    setDisableInput1(false);
    setDisableInput2(false);
    // setDebitAccountBalance("")
  }, [cleared]);

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

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (currency === "") {
        swal(
          "Currency not selected!!!",
          "kindly select one to search for account",
          { icon: "warning" }
        );
      } else if (account.length === 0) {
        swal({
          title: "Account name/number not entered!!!",
          text: "kindly enter one to search for account",
          icon: "warning",
          closeOnClickOutside: false,
        });
      } else {
        setLoader(true);
        setLoading(true);
        filterAccountDebit();
      }
    }
  }

  async function filterAccountDebit() {
    try {
      await axios
        .post(
          API_SERVER +
            "/api/get-account-details-by-account-name-or-account-desc",
          {
            currency: currency,
            account_desc: account,
            account_number: account,
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
            // setAccountStatus(response.data[0]?.status_desc);
            rowData.acct_status = response.data[0]?.status_desc;
            rowData.account_currency = response.data[0]?.currency;
            setAccount(response.data[0]?.account_descrption);
            rowData.acct = response.data[0]?.account_descrption;
            rowData.typeOfAccount = response.data[0]?.type_of_acct;
            setAccountNumber(response.data[0]?.tacct);
            setAccountBalance(formatNumber2dp(response.data[0]?.acct_balance));
            rowData.acct_bal = formatNumber2dp(response.data[0]?.acct_balance);
            rowData.scan_doc_id = scandocumentID;
            rowData.trans_desc = transactionDetails;
            rowData.p_account = response.data[0]?.tacct;
            // setP_debit_acct(response.data[0]?.account_descrption);
            // setAccount(response.data[0]?.tacct);
            // setCreditAccountModalData(response.data[0]);
            setLoader(false);
            setLoading(false);
            document.getElementById(`${index}cost_center`).focus();
          } else {
            setLoader(false);
            setLoading(false);
            swal("ERR - 05707", "No Data Found", { icon: "error" });

            // setShowModal(false);
          }
        });
    } catch (error) {
      setLoader(false);
      setLoading(false);
      swal({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  }

  function handleSelected(value) {
    if (value.status_desc === "TOTAL BLOCKAGE") {
      swal({
        title: "ERR - 07417",
        text: "This Account has Total Blockage",
        icon: "error",
        closeOnClickOutside: false,
      }).then((result) => {
        if (result) {
          document.getElementById(`${index}acct`).focus();
        }
      });
    } else {
      // setAccountStatus(value.status_desc);
      rowData.acct_status = value.status_desc;
      rowData.account_currency = value.currency;
      setShowModalSearch(false);
      setAccount(value.account_descrption);
      rowData.acct = value.account_descrption;
      setAccountNumber(value.tacct);
      setAccountBalance(formatNumber2dp(value.acct_balance));
      rowData.acct_bal = formatNumber2dp(value.acct_balance);
      rowData.scan_doc_id = scandocumentID;
      rowData.trans_desc = transactionDetails;
      rowData.p_account = value.tacct;
      rowData.typeOfAccount = value.type_of_acct;
      setLoading(false);
      setTimeout(() => {
        document.getElementById(`${index}cost_center`).focus();
      }, 100);
    }
    // }
  }

  const handleAccountChange = (event, index) => {
    const { name, value } = event.target;
    if (event.target.value === "") {
      // setAccountBalance("");
      // setChartGroup("");
      // setAccName("");
      setBudgetDetails([]);
      setAccountBalance("");
    }
    setAccount(value);
    rowData.acct = value;
    // rowData.scan_doc_id = scandocID2;
    // rowData.trans_desc = transactionDetails;
    onChange(index, name, value);
  };

  const lovCostCenterChange = (value, index) => {
    const name = "cost_center";
    if (!accountNumber) {
      swal({
        title: "Account not selected",
        text: "Kindly select an account to continue!!!",
        icon: "warning",
        closeOnClickOutside: false,
      }).then((res) => {
        if (res) {
          document.getElementById(index + "acct").focus();
          rowData.cost_center = "";
        }
      });
    } else {
      onChange(index, name, value);
      lovCostCenterBlur(rowData.accountNumber, value, index);
    }
  };

  const lovCostCenterBlur = async (accountNum, costCenterID) => {
    try {
      // if (!accountNumber) {
      //   swal({
      //     title: "Account not selected",
      //     text: "Kindly select an account to continue!!!",
      //     icon: "warning",
      //     closeOnClickOutside: false,
      //   }).then((res) => {
      //     if (res) {
      //       document.getElementById(index + "acct").focus();
      //       rowData.cost_center = "";
      //     }
      //   });
      // } else {
      setBudgetLoading(true);
      await axios
        .post(
          API_SERVER + "/api/get-cost-center-budget-details",
          {
            acctLink: accountNum,
            cost_center_code: costCenterID,
          },
          { headers }
        )
        .then((res) => {
          if (res.data) {
            setBudgetDetails(res.data);
          }
          setBudgetLoading(false);
        });
    } catch (error) {
      setBudgetLoading(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
    // }
  };

  const handleInput1Change = (e, index) => {
    // const value = e.target.value;
    // setInput1Value(value);
    const name = e.target.name;
    const value = e.target.value;

    if (rowData.acct_status === "DEBIT BLOCK") {
      swal({
        title: "ERR - 00150",
        text: "This Account is Blocked From Debit Transactions",
        icon: "error",
      }).then((result) => {
        if (result) {
          setDisableInput1(true);
          document.getElementById(`${index}_p_credit_amt`).focus();
        }
        // id.select()
      });
    } else if (rowData.acct_status === "DORMANT") {
      swal({
        title: "ERR - 00150",
        text: "This Account is either Dormant or blocked from debit transactions",
        icon: "error",
      }).then((result) => {
        if (result) {
          setDisableInput1(true);
          document.getElementById(`${index}_p_credit_amt`).focus();
        }
      });
    } else {
      setDisableInput2(value !== "");
      onChange(index, name, value);
    }
  };

  const handleInput2Change = (e, index) => {
    // const value = e.target.value;
    // setInput1Value(value);
    const name = e.target.name;
    const value = e.target.value;

    if (rowData.acct_status === "CREDIT BLOCK") {
      swal(
        "ERR - 00150",
        "This Account is Blocked From Credit Transactions",
        "error"
      ).then((result) => {
        if (result) {
          setDisableInput2(true);
          document.getElementById(`${index}_p_debit_amt`).focus();
        }
        // id.select()
      });
    } else {
      setDisableInput1(value !== "");
      onChange(index, name, value);
    }
  };

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

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
        onChange(
          index,
          "p_credit_amt",
          formatNumber(rowData.p_credit_amt, `${index}_p_credit_amt`)
        );
        onTotalCreditBlur();
      }
    } else {
      onTotalCreditBlur();
    }
  }

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
        onChange(
          index,
          "p_debit_amt",
          // rowData.p_debit_amt
          formatNumber(rowData.p_debit_amt, `${index}_p_debit_amt`)
        );
        onTotalDebitBlur();
      }
    } else {
      onTotalDebitBlur();
    }
  }

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    onChange(index, name, value);
  };

  const handleKeyDown = (event, index) => {
    let newRowData;
    if (event.key === "Enter") {
      const rowObject = rowData;
      if (rowObject.hasOwnProperty("p_debit_amt")) {
        newRowData = {
          ...rowObject,
          p_debit_nrtn: transactionDetails,
          p_debit_doc_ref: documentReference,
          p_account: rowData.p_account ? rowData.p_account : rowObject.acct,
        };
      } else {
        newRowData = {
          ...rowObject,
          p_credit_doc_ref: documentReference,
          p_credit_nrtn: transactionDetails,
          p_account: rowData.p_account ? rowData.p_account : rowObject.acct,
        };
      }
      // console.log(newRowData, "rowObject");
      onEnter(index, newRowData);
      const nextRowIndex = index + 1;
      const nextInputId = `${nextRowIndex}acct`;
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
      setBudgetDetails([]);
      setAccountBalance("");
    }
  };

  const blurNarrationInput = (index) => {
    let newRowData;
    const rowObject = rowData;
    // console.log(rowObject, "rowObjectrowObject");
    if (rowObject.hasOwnProperty("p_debit_amt")) {
      newRowData = {
        ...rowObject,
        p_debit_nrtn: transactionDetails,
        p_debit_doc_ref: documentReference,
        p_account: rowData.p_account ? rowData.p_account : rowObject.acct,
      };
    } else {
      newRowData = {
        ...rowObject,
        p_credit_doc_ref: documentReference,
        p_credit_nrtn: transactionDetails,
        p_account: rowData.p_account ? rowData.p_account : rowObject.acct,
      };
    }
    onEnter(index, newRowData);
    if (rowObject) {
      onEnter(index, newRowData);
      setBudgetDetails([]);
      setAccountBalance("");
    }
  };

  const handleClear = () => {
    setAccount("");
    setAccountBalance("");
    setBudgetDetails([]);
    const rowObject = rowData;
    const debitTotal = rowObject.p_debit_amt;
    const creditTotal = rowObject.p_credit_amt;
    setDisableInput1(false);
    setDisableInput2(false);
    // console.log(rowObject, "row obj")
    const clearedRowData = Object.keys(rowObject).reduce((object, key) => {
      object[key] = "";
      rowObject.cost_center = "";
      rowObject.acct = "";
      rowObject.scan_doc_id = "";
      rowObject.trans_desc = "";
      return object;
    }, {});
    // console.log(debitTotal, "clearedRowData")
    onClear(index, clearedRowData, debitTotal, creditTotal);
  };

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
        <div style={{ flex: 0.24, background: "" }}>
          {/* button and input  */}
          <div style={{ display: "flex", flex: 1 }}>
            <div
              style={{
                flex: 0.08,
                background: "",
                marginLeft: "4px",
                marginRight: "3px",
              }}
            >
              <ButtonComponent
                buttonIcon={<VscClose size={20} />}
                buttonHeight={"25px"}
                buttonBackgroundColor={"#0580c0"}
                buttonColor={"white"}
                onClick={handleClear}
              />
            </div>
            <div style={{ flex: 0.9 }}>
              <InputField
                inputWidth={"100%"}
                noMarginRight
                onChange={(e) => handleAccountChange(e, index)}
                name={"acct"}
                key={index + "acct"}
                id={`${index}acct`}
                onKeyDown={handleKeyPress}
                // value={account}
                value={account ? account : rowData.acct || ""}
              />
            </div>
            <div style={{ flex: 0.02, position: "absolute", left: "325px" }}>
              {loader ? <Loader size={20} /> : null}
            </div>
            <SearchModal
              setShowModal={setShowModalSearch}
              showModal={showModalSearch}
              currency={currency}
              filter1={filterDebitData}
              handleSelected={handleSelected}
            />
          </div>
        </div>

        <div style={{ flex: 0.15, background: "" }}>
          {/* button and input  */}
          <div style={{ flex: 1 }}>
            <ListOfValue
              inputWidth={"98%"}
              noMarginRight={true}
              data={costCenterlov}
              id={`${index}cost_center`}
              key={index + "cost_center"}
              value={rowData.cost_center || ""}
              onChange={(e) => {
                lovCostCenterChange(e, index);
                setTimeout(() => {
                  const input = document.getElementById(`${index}_p_debit_amt`);
                  input.focus();
                }, 0);
              }}
              // onBlur={lovCostCenterBlur}
            />
          </div>
        </div>

        <div style={{ flex: 0.1, background: "" }}>
          {/*  input  */}
          <div style={{ flex: 1 }}>
            <InputField
              inputWidth={"95%"}
              name="p_debit_amt"
              noMarginRight
              id={`${index}_p_debit_amt`}
              key={index + "_p_debit_amt"}
              textAlign={"right"}
              value={disableInput1 ? "" : rowData.p_debit_amt || ""}
              disabled={disableInput1}
              onChange={(e) => handleInput1Change(e, index)}
              onBlur={debitblur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (rowData.p_debit_amt) {
                    // debitblur();
                    switchFocus(e, `${index}scan_doc_id`);
                    // if (rowData.scan_doc_id && rowData.trans_desc) {
                    //   handleKeyDown(e, index);
                    // } else {
                    //   switchFocus(e, `${index}scan_doc_id`);
                    // }
                  } else {
                    switchFocus(e, `${index}_p_credit_amt`);
                  }
                }
                // rowData.p_debit_amt
                //   ? switchFocus(e, `${index}p_bra`)
                //   : switchFocus(e, `${index}_p_credit_amt`);
              }}
            />
          </div>
        </div>

        <div style={{ flex: 0.1, background: "" }}>
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <InputField
              inputWidth={"95%"}
              noMarginRight
              name="p_credit_amt"
              value={disableInput2 ? "" : rowData.p_credit_amt || ""}
              onChange={(e) => handleInput2Change(e, index)}
              disabled={disableInput2}
              id={`${index}_p_credit_amt`}
              key={index + "_p_credit_amt"}
              onBlur={creditblur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (rowData.p_credit_amt) {
                    creditblur();
                    switchFocus(e, `${index}scan_doc_id`);
                    // if (rowData.scan_doc_id && rowData.trans_desc) {
                    //   handleKeyDown(e, index);
                    // } else {
                    //   switchFocus(e, `${index}scan_doc_id`);
                    // }
                  } else {
                    switchFocus(e, `${index}scan_doc_id`);
                  }
                }
                // rowData.p_debit_amt
                //   ? switchFocus(e, `${index}p_bra`)
                //   : switchFocus(e, `${index}_p_credit_amt`);
              }}
            />
          </div>
        </div>

        <div style={{ flex: 0.17, background: "" }}>
          {/* button and input  */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 0.84 }}>
              <InputField
                inputWidth={"99%"}
                noMarginRight
                onChange={(e) => {
                  handleScanDocInputChange(e, index);
                }}
                value={rowData.scan_doc_id || ""}
                name={"scan_doc_id"}
                id={`${index}scan_doc_id`}
                key={index + "scan_doc_id"}
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
              noMarginRight
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => {
                handleKeyDown(e, index);
              }}
              onBlur={() => blurNarrationInput(index)}
              id={`${index}trans_desc`}
              key={index + "trans_desc"}
              name={"trans_desc"}
              value={rowData.trans_desc || ""}
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

export default RowComponent;
