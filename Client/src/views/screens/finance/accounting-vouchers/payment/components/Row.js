import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { VscClose } from "react-icons/vsc";
import { FcDocument } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import { MDBIcon } from "mdb-react-ui-kit";
import { Modal } from "@mantine/core";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import swal from "sweetalert";
import DocumentViewing from "../../../../../../components/others/DocumentViewing";
import { Loader } from "@mantine/core";
import SearchModal from "../../receipt/components/Modal";
import {
  NumberWithoutCommas,
  formatNumber,
  formatNumber2dp,
  formatNumberclear,
  regex,
} from "../../../components/helpers";

function RowComponent(props) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [showCredit, setshowCredit] = useState(false);
  const [p_credit_acct, setP_credit_acct] = useState("");
  const [filterCreditData, setFilterCreditData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [creditAccount, setCreditAccount] = useState("");
  const [creditAccountBalance, setCreditAccountBalance] = useState("");
  const [creditAccountAmount, setCreditAccountAmount] = useState("");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [scandocID, setScandocID] = useState("");

  const handleCloseCredit = () => setshowCredit(false);
  const handleOpenCredit = () => setshowCredit(true);
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    props.onChange(index, name, value);
  };

  const handleCreditAccountChange = (event, index) => {
    const { name, value } = event.target;
    if (event.target.value === "") {
      props.setChartGroup("");
      props.setAccName("");
      props.setCreditAccountCurrentBalance("");
    }
    setP_credit_acct(value);
    props.rowData.credit_acc_desc = value;

    // value="ssss"
    props.onChange(index, name, value);
  };

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  const lovInputChange = (value, index) => {
    const name = "p_credit_bra";
    props.onChange(index, name, value);
  };

  const handleScanDocInputChange = (event, index) => {
    const { name, value } = event.target;
    setScandocID(value);
    props.onChange(index, name, value);
  };

  const blurNarrationInput = (index) => {
    const rowObject = props.rowData;
    const newRowData = {
      ...rowObject,
      p_credit_acct: creditAccount ? creditAccount : rowObject.p_credit_acct,
      p_credit_nrtn: props.debit_narration,
      p_credit_doc_ref: props.debit_doc_ref,
      credit_acc_desc: p_credit_acct
        ? p_credit_acct
        : rowObject.credit_acc_desc,
    };
    if (rowObject) {
      props.onEnter(index, newRowData);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      const rowObject = props.rowData;
      const newRowData = {
        ...rowObject,
        p_credit_acct: creditAccount ? creditAccount : rowObject.p_credit_acct,
        p_credit_nrtn: props.debit_narration,
        p_credit_doc_ref: props.debit_doc_ref,
        credit_acc_desc: p_credit_acct
          ? p_credit_acct
          : rowObject.credit_acc_desc,
        credit_acct_balance: creditAccountBalance,
      };
      props.onEnter(index, newRowData);
      if (props.emptyfields === true) {
        setTimeout(() => {
          document.getElementById(`${index}credit_trans_desc_field`).focus();
        }, 100);
        // document.getElementById(`${index}credit_trans_desc_field`)?.focus();
      } else {
        const nextRowIndex = index + 1;
        const nextInputId = `${nextRowIndex}_p_credit_acct`;
        const nextInput = document.getElementById(nextInputId);
        if (nextInput) {
          nextInput?.focus();
        }
      }
    }
  };

  const handleRemoveRow = () => {
    const rowObject1 = props.rowData.p_credit_amt;
    props.onRemove(props.index, rowObject1);
  };

  const handleClear = () => {
    setP_credit_acct("");
    const rowObject = props.rowData;
    const creditTotal = rowObject.p_credit_amt;
    const clearedRowData = Object.keys(rowObject).reduce((object, key) => {
      object[key] = "";
      rowObject.p_credit_bra = "";
      return object;
    }, {});
    props.onClear(props.index, clearedRowData, creditTotal);
  };

  const handleBlur = () => {
    const credit_amount_field = document.getElementById(
      `${props.index}_p_credit_amt`
    );

    if (props.rowData.p_credit_amt) {
      if (regex.test(props.rowData.p_credit_amt)) {
        swal({
          title: "Error",
          text: "kindly ensure amount entered doesn't contain any letters",
          icon: "warning",
          closeOnClickOutside: false,
        }).then((result) => {
          if (result) {
            credit_amount_field.focus();
            credit_amount_field.select();
          }
        });
        return;
      } else {
        const rowObject = props.rowData;
        rowObject.p_credit_amt = formatNumberclear(props.rowData.p_credit_amt);

        if (
          props.rowData.p_credit_bra &&
          props.rowData.p_credit_scan_doc_id &&
          props.rowData.p_credit_trans_desc
        ) {
          const newRowData = {
            ...rowObject,
            p_credit_acct: creditAccount
              ? creditAccount
              : rowObject.p_credit_acct,
            // p_credit_nrtn: props.debit_narration,
            // p_credit_doc_ref: props.debit_doc_ref,
            credit_acc_desc: p_credit_acct
              ? p_credit_acct
              : rowObject.credit_acc_desc,
            credit_acct_balance: creditAccountBalance
              ? creditAccountBalance
              : props.rowData.credit_acct_balance,
          };
          if (rowObject) {
            // props.onEnter(props.index, newRowData);
            props.onEnter(props.index, newRowData);
          }
          props.onBlur();
        } else {
          props.onBlur();
        }
      }
    } else {
      props.onBlur();
    }
  };
  // const handleBlur = () => {
  //   const debit_amount_field = document.getElementById(
  //     `${props.index}_p_credit_amt`
  //   );
  //   if (props.rowData.p_credit_amt) {
  //     props.onChange(
  //       props.index,
  //       "p_credit_amt",
  //       formatNumber(props.rowData.p_credit_amt, debit_amount_field)
  //     );
  //     setCreditAccountAmount(props.rowData.p_credit_amt);

  //     const regex = /[a-zA-Z]/;
  //     if (regex.test(props.rowData.p_credit_amt) === true) {
  //       swal({
  //         title: "Error",
  //         text: "kindly ensure amount entered doesn't contain any letters",
  //         icon: "warning",
  //         closeOnClickOutside: false,
  //       }).then((result) => {
  //         if (result) {
  //           debit_amount_field.focus();
  //           debit_amount_field.select();
  //         }
  //       });
  //     } else {
  //       props.onBlur();
  //     }
  //   } else {
  //     props.onBlur();
  //   }
  // };

  // scan doc credit

  function handleClickViewDoc(scan_id) {
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

  async function filterAccountCredit() {
    try {
      await axios
        .post(
          API_SERVER +
            "/api/get-account-details-by-account-name-or-account-desc",
          {
            currency: props.currency,
            account_desc: p_credit_acct,
            account_number: p_credit_acct,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.length > 1) {
            setLoader(false);
            handleOpenCredit();
            setFilterCreditData(response.data);
          } else if (response.data.length === 1) {
            if (response.data[0].status_desc === "TOTAL BLOCKAGE") {
              setLoader(false);
              swal({
                title: "ERR - 07417",
                text: "This Account has Total Blockage",
                icon: "error",
                closeOnClickOutside: false,
              }).then((res) => {
                if (res) {
                  document
                    .getElementById(`${props.index}_p_credit_acct`)
                    .focus();
                  document
                    .getElementById(`${props.index}_p_credit_acct`)
                    .select();
                }
              });
            }
            if (response.data[0].status_desc === "CREDIT BLOCK") {
              setLoader(false);
              swal({
                title: "ERR - 05461",
                text: "This Account is not valid for this transaction - CREDIT BLOCK.",
                icon: "error",
                closeOnClickOutside: false,
              }).then((res) => {
                if (res) {
                  document
                    .getElementById(`${props.index}_p_credit_acct`)
                    .focus();
                  document
                    .getElementById(`${props.index}_p_credit_acct`)
                    .select();
                }
              });
            } else {
              setP_credit_acct(response.data[0]?.account_descrption);
              props.rowData.credit_acc_desc =
                response.data[0]?.account_descrption;
              setCreditAccount(response.data[0]?.tacct);
              setCreditAccountBalance(
                formatNumber2dp(response.data[0]?.acct_balance)
              );
              props.setCreditAccountModalData(response.data[0]);
              props.rowData.p_credit_bra = props.branchValue;
              props.rowData.p_credit_scan_doc_id = props.scanDocDebit;
              props.rowData.p_credit_trans_desc = props.transactionDetails;
              props.rowData.account_currency = response.data[0]?.currency;
              setLoader(false);
              props.setLoading(false);
              document.getElementById(`${props.index}_p_credit_amt`).focus();
            }
          } else {
            swal("ERR - 05707", "No Data Found", { icon: "error" });
            setLoader(false);
            handleCloseCredit();
            // setP_credit_acct("");
          }
        });
    } catch (error) {
      setLoader(false);
      props.setLoading(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function handleKeyPress2(event) {
    if (event.key === "Enter") {
      if (props.currency == "") {
        swal(
          "Currency not selected!!!",
          "kindly select one to search for account",
          { icon: "warning" }
        );
      } else if (p_credit_acct.length === 0) {
        swal(
          "Account number/name not entered!!!",
          "kindly enter one to search for account",
          { icon: "warning" }
        );
      } else {
        setLoader(true);
        props.setLoading(true);
        filterAccountCredit();
      }
    }
  }

  function handleSelected(value) {
    if (value.status_desc === "TOTAL BLOCKAGE") {
      swal({
        title: "ERR - 07417",
        text: "This Account has Total Blockage",
        icon: "error",
        closeOnClickOutside: false,
      });
    } else if (value.status_desc === "CREDIT BLOCK") {
      swal({
        title: "ERR - 05461",
        text: "This Account is not valid for this transaction - CREDIT BLOCK.",
        icon: "error",
        closeOnClickOutside: false,
      });
    } else {
      props.setCreditAccountModalData(value);
      setshowCredit(false);
      // handleCloseCredit()
      setP_credit_acct(value.account_descrption);
      props.rowData.credit_acc_desc = value.account_descrption;
      setCreditAccount(value.tacct);
      setCreditAccountBalance(formatNumber2dp(value.acct_balance));
      props.rowData.p_credit_bra = props.branchValue;
      props.rowData.p_credit_scan_doc_id = props.scanDocDebit;
      props.rowData.p_credit_trans_desc = props.transactionDetails;
      props.rowData.account_currency = value.currency;
      props.setLoading(false);
      setTimeout(() => {
        document.getElementById(`${props.index}_p_credit_amt`).focus();
      }, 100);
    }
  }

  // const handleRowClickCreditAccount = (rowData) => {
  //   if (props.creditValidation === rowData[0]) {
  //     swal(
  //       "ERR - 00005",
  //       "Transfer Cannot Be Made Between The Same Account",
  //       "error"
  //     );

  //     handleCloseCredit();
  //     setP_credit_acct("");
  //   } else {
  //     handleCloseCredit();
  //     // setCreditValidation(p_credit_acct)
  //     setP_credit_acct(rowData[0]);
  //     setCreditAccount(rowData[1]);
  //     setCreditAccountBalance(formatNumber2dp(rowData[5]));
  //     props.setCreditAccountModalData(rowData);
  //     document.getElementById(`${props.index}_p_credit_amt`).focus();
  //     // handle();
  //   }
  // };

  // HANDLING CLEARANCE OF ROW INPUT FIELDS WHEN CLLICKED ON CLEAR
  useEffect(() => {
    setP_credit_acct("");
    setCreditAccountBalance("");
  }, [props.cleared]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flex: 1,
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 0.25 }}>
          {/* button and input  */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 0.1, marginLeft: "4px" }}>
              <ButtonComponent
                buttonBackgroundColor={"#0580c0"}
                buttonColor={"white"}
                buttonIcon={<VscClose size={20} />}
                buttonHeight={"25px"}
                onClick={props.index < 6 ? handleClear : handleRemoveRow}
              />
            </div>
            <div style={{ flex: 0.9 }}>
              <InputField
                inputWidth={"98%"}
                noMarginRight
                name="p_credit_acct"
                onChange={(e) => handleCreditAccountChange(e, props.index)}
                value={
                  p_credit_acct
                    ? p_credit_acct
                    : props.rowData.credit_acc_desc || ""
                }
                key={props.index + "_p_credit_acct"}
                onKeyDown={handleKeyPress2}
                id={`${props.index}_p_credit_acct`}
              />
            </div>
            <div style={{ flex: 0.02, position: "absolute", left: "336px" }}>
              {loader ? <Loader size={20} /> : null}
            </div>
          </div>
        </div>

        {/* credit modal   */}

        <SearchModal
          setShowModal={() => {
            setshowCredit();
            props.setLoading(false);
            props.setAccName("");
            props.setChartGroup("");
            props.setCreditAccountCurrentBalance("");
          }}
          showModal={showCredit}
          currency={props.currency}
          filter1={filterCreditData}
          handleSelected={handleSelected}
        />
        <div style={{ flex: 0.12 }}>
          {/*  input  credit amount*/}
          <div style={{ flex: 1 }}>
            <InputField
              noMarginRight
              inputWidth={"95%"}
              textAlign={"right"}
              paddingRight={"4px"}
              name="p_credit_amt"
              onChange={(e) => handleInputChange(e, props.index)}
              onBlur={() => handleBlur()}
              value={
                props.rowData.p_credit_amt == "NaN"
                  ? ""
                  : props.rowData.p_credit_amt || ""
              }
              key={props.index + "_p_credit_amt"}
              id={`${props.index}_p_credit_amt`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (
                    props.rowData.p_credit_bra &&
                    props.rowData.p_credit_scan_doc_id &&
                    props.rowData.p_credit_trans_desc &&
                    props.rowData.p_credit_amt
                  ) {
                    switchFocus(e, `${props.index + 1}_p_credit_acct`);
                  } else {
                    switchFocus(e, `${props.index}credit_branch_field`);
                  }
                  // handleBlur();
                  // switchFocus(e, `${props.index}credit_branch_field`);
                }
              }}
              // id={'debit_amount_field'}
            />
          </div>
        </div>

        <div style={{ flex: 0.15 }}>
          {/* branch lov */}
          <div style={{ flex: 1 }}>
            <ListOfValue
              inputWidth={"95%"}
              noMarginRight={true}
              data={props.branchLOV}
              name="p_credit_bra"
              onChange={(e) => {
                lovInputChange(e, props.index);
                setTimeout(() => {
                  const input = document.getElementById(
                    `${props.index}scan_doc_credit_field`
                  );
                  input.focus();
                }, 0);
              }}
              value={props.rowData.p_credit_bra || ""}
              key={props.index + "_p_credit_bra"}
              id={`${props.index}credit_branch_field`}
              onKeyDown={(e) => {
                switchFocus(e, `${props.index}scan_doc_credit_field`);
                if (e.key === "Enter") {
                  e.preventDefault();
                  const input = document.getElementById(
                    `${props.index}scan_doc_credit_field`
                  );
                  input.focus();
                }
              }}
            />
          </div>
        </div>

        <div style={{ flex: 0.19 }}>
          {/* scan document  */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 0.85 }}>
              <InputField
                inputWidth={"98%"}
                noMarginRight
                type={"text"}
                name="p_credit_scan_doc_id"
                onChange={(e) => handleScanDocInputChange(e, props.index)}
                value={props.rowData.p_credit_scan_doc_id || ""}
                key={props.index + "_p_credit_scan_doc_id"}
                id={`${props.index}scan_doc_credit_field`}
                onKeyDown={(e) =>
                  switchFocus(e, `${props.index}credit_trans_desc_field`)
                }
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
                    {/* <ImageVerification accountNumber={imageAccount} /> */}
                    {/* <DocumentCapture documentID={p_credit_scan_doc_id} /> */}
                    <DocumentViewing documentID={scandocID} />
                  </Modal.Body>
                  {/* <Modal.Footer>
            <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
          </Modal.Footer> */}
                </Modal>
                // 1683042691
              )}
            </div>
            {/* button   */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flex: 0.15,
              }}
            >
              <ButtonComponent
                buttonBackgroundColor={"#0580c0"}
                buttonColor={"white"}
                buttonIcon={<FcDocument />}
                buttonHeight={"25px"}
                buttonWidth={"30px"}
                onClick={() =>
                  handleClickViewDoc(props.rowData.p_credit_scan_doc_id)
                }
              />
            </div>
          </div>
        </div>

        <div style={{ flex: 0.29 }}>
          {/*  narration  */}
          <div style={{ flex: 1 }}>
            <InputField
              inputWidth={"98%"}
              noMarginRight
              type={"text"}
              name="p_credit_trans_desc"
              onChange={(e) => handleInputChange(e, props.index)}
              onKeyDown={(e) => handleKeyDown(e, props.index)}
              value={props.rowData.p_credit_trans_desc || ""}
              key={props.index + "_p_credit_trans_desc"}
              id={`${props.index}credit_trans_desc_field`}
              onBlur={() => blurNarrationInput(props.index)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowComponent;
