import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import { API_SERVER } from "../../../../../../config/constant";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { VscClose } from "react-icons/vsc";
import { FcDocument } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import swal from "sweetalert";
import { Loader } from "@mantine/core";
import { Modal } from "@mantine/core";
import DocumentViewing from "../../../../../../components/others/DocumentViewing";
import SearchModal from "../components/Modal";
import {
  NumberWithoutCommas,
  formatNumber,
  formatNumber2dp,
  formatNumberclear,
  regex,
} from "../../../components/helpers";
// import AccountList from "./AccountList";

function RowComponent(props) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [showDebit, setShowDebit] = useState(false);
  const handleCloseDebit = () => setShowDebit(false);
  const handleOpenDebit = () => setShowDebit(true);
  const [p_debit_acct, setP_debit_acct] = useState("");
  const [filterDebitData, setFilterDebitData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [debitAccount, setdebitAccount] = useState("");
  const [debitAccountBalance, setDebitAccountBalance] = useState("");
  const [debitAccountAmount, setDebitAccountAmount] = useState("");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [scandocID, setScandocID] = useState("");
  const [showModalSearch, setShowModalSearch] = useState(false);

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

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    props.onChange(index, name, value);
  };

  const handleScanDocInputChange = (event, index) => {
    const { name, value } = event.target;
    props.onChange(index, name, value);
    setScandocID(value);
  };

  const handleDebitAccountChange = (event, index) => {
    const { name, value } = event.target;
    if (event.target.value === "") {
      props.setAccName("");
      props.setChartGroup("");
      props.setAccountDescription("");
    }

    setP_debit_acct(value);
    props.rowData.debit_acct_desc = value;

    // value="ssss"
    props.onChange(index, name, value);
  };
  // console.log(p_debit_acct,"p_debit_acct")

  const lovInputChange = (value, index) => {
    const name = "p_debit_bra";
    props.onChange(index, name, value);
  };

  const blurNarrationInput = (index) => {
    const rowObject = props.rowData;
    const newRowData = {
      ...rowObject,
      p_debit_acct: debitAccount ? debitAccount : rowObject.p_debit_acct,
      debit_acct_desc: p_debit_acct ? p_debit_acct : rowObject.debit_acct_desc,
      debit_acct_balance: debitAccountBalance,
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
        p_debit_acct: debitAccount ? debitAccount : rowObject.p_debit_acct,
        // p_debit_nrtn: props.debit_narration,
        // p_debit_doc_ref: props.debit_doc_ref,
        debit_acct_desc: p_debit_acct
          ? p_debit_acct
          : rowObject.debit_acct_desc,
        debit_acct_balance: debitAccountBalance,
      };
      props.onEnter(index, newRowData);
      // Set focus to the next input on the next row
      const nextRowIndex = index + 1;
      const nextInputId = `${nextRowIndex}_p_debit_acct`;
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleRemoveRow = () => {
    const rowObject1 = props.rowData.p_debit_amt;
    props.onRemove(props.index, rowObject1);
  };

  const handleClear = () => {
    setP_debit_acct("");
    const rowObject = props.rowData;
    const debitTotal = rowObject.p_debit_amt;
    // console.log(rowObject, "row obj")
    const clearedRowData = Object.keys(rowObject).reduce((object, key) => {
      object[key] = "";
      rowObject.p_debit_bra = "";
      return object;
    }, {});
    props.onClear(props.index, clearedRowData, debitTotal);
  };

  const handleBlur = () => {
    const debit_amount_field = document.getElementById(
      `${props.index}_p_debit_amt`
    );

    if (props.rowData.p_debit_amt) {
      if (regex.test(props.rowData.p_debit_amt)) {
        swal({
          title: "Error",
          text: "kindly ensure amount entered doesn't contain any letters",
          icon: "warning",
          closeOnClickOutside: false,
        }).then((result) => {
          if (result) {
            document.getElementById(`${props.index}_p_debit_amt`).focus();
            debit_amount_field.select();
          }
        });
      } else if (
        // props.rowData.typeOfAccount &&
        props.rowData.typeOfAccount !== "9" &&
        NumberWithoutCommas(props.rowData.acct_bal) <
          NumberWithoutCommas(props.rowData.p_debit_amt)
      ) {
        swal({
          icon: "error",
          text: "The transaction will overdrawed customer's account, please check!!!",
          title: "ERR - 01586",
          closeOnClickOutside: false,
        }).then((res) => {
          if (res) {
            debit_amount_field.select();
            debit_amount_field.focus();
          }
        });
      } else {
        const rowObject = props.rowData;

        rowObject.p_debit_amt = formatNumberclear(props.rowData.p_debit_amt);
        if (
          props.rowData.p_debit_bra &&
          props.rowData.p_debit_scan_doc_id &&
          props.rowData.p_debit_trans_desc
        ) {
          const newRowData = {
            ...rowObject,
            p_debit_acct: debitAccount ? debitAccount : rowObject.p_debit_acct,
            debit_acct_desc: p_debit_acct
              ? p_debit_acct
              : rowObject.debit_acct_desc,
            debit_acct_balance: debitAccountBalance,
          };
          if (rowObject) {
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

  async function filterAccountDebit() {
    try {
      await axios
        .post(
          API_SERVER +
            "/api/get-account-details-by-account-name-or-account-desc",
          {
            currency: props.currency,
            account_desc: p_debit_acct,
            account_number: p_debit_acct,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.length === 1) {
            if (
              response.data[0]?.status_desc === "DEBIT BLOCK" ||
              response.data[0].status_desc === "TOTAL BLOCKAGE" ||
              response.data[0]?.status_desc === "DORMANT"
            ) {
              setLoader(false);
              props.setLoading(false);
              swal({
                title: "ERR - 00150",
                text: "This Account is either Dormant or Blocked From Debit Transactions",
                icon: "error",
              }).then((result) => {
                if (result) {
                  document
                    .getElementById(`${props.index}_p_debit_acct`)
                    .focus();
                }
              });
            } else {
              props.rowData.p_debit_bra = props.p_credit_bra;
              props.rowData.p_debit_scan_doc_id = props.p_credit_scan_doc_id;
              props.rowData.p_debit_trans_desc = props.p_credit_trans_desc;
              setP_debit_acct(response.data[0]?.account_descrption);
              props.rowData.debit_acct_desc =
                response.data[0]?.account_descrption;
              setdebitAccount(response.data[0]?.tacct);
              props.setLoading(false);
              setDebitAccountBalance(
                formatNumber2dp(response.data[0]?.acct_balance)
              );
              props.setCreditAccountModalData(response.data[0]);
              props.rowData.typeOfAccount = response.data[0]?.type_of_acct;
              props.rowData.account_currency = response.data[0]?.currency;
              props.rowData.acct_bal = formatNumber2dp(
                response.data[0]?.acct_balance
              );
              setLoader(false);
              document.getElementById(`${props.index}_p_debit_amt`).focus();
            }
          } else if (response.data.length > 1) {
            setLoader(false);
            setShowModalSearch(true);
            setFilterDebitData(response.data);
            props.rowData.p_debit_bra = props.p_credit_bra;
            props.rowData.p_debit_scan_doc_id = props.p_credit_scan_doc_id;
            props.rowData.p_debit_trans_desc = props.p_credit_trans_desc;
          } else {
            swal("ERR - 05707", "No Data Found", { icon: "error" });
            setLoader(false);
            props.setLoading(false);
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
      if (!props.currency) {
        swal({
          title: "Currency not selected!!!",
          text: "kindly select one to search for account",
          icon: "warning",
        });
      } else if (p_debit_acct.length === 0) {
        swal({
          title: "Account number/name not entered!!!",
          text: "kindly enter one to search for account",
          icon: "warning",
          closeOnClickOutside: false,
        });
      } else {
        setLoader(true);
        props.setLoading(true);
        filterAccountDebit();
      }
    }
  }

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      // e.preventDefault()
      document.getElementById(nextFieldId).focus();
    }
  }

  // HANDLING CLEARANCE OF ROW INPUT FIELDS WHEN CLLICKED ON CLEAR
  useEffect(() => {
    setP_debit_acct("");
    setDebitAccountBalance("");
  }, [props.cleared]);

  function handleSelected(value) {
    if (
      value.status_desc === "DEBIT BLOCK" ||
      value.status_desc === "TOTAL BLOCKAGE" ||
      value.status_desc === "DORMANT"
    ) {
      // handleCloseDebit()
      setShowModalSearch(false);
      props.setLoading(false);
      // setP_debit_acct("");
      setdebitAccount("");
      swal(
        // "Invalid Entry",
        "ERR - 00150",
        "This Account is either Dormant or Blocked From Debit Transactions",
        "error"
      ).then((result) => {
        if (result) {
          document.getElementById(`${props.index}_p_debit_acct`).focus();
          props.setLoading(false);
        }
        // document.getElementById(`${props.index}_p_debit_acct`).select()
      });
    } else {
      // setShowCredit(false);
      props.setLoading(false);
      props.rowData.p_debit_bra = props.p_credit_bra;
      props.rowData.p_debit_scan_doc_id = props.p_credit_scan_doc_id;
      props.rowData.p_debit_trans_desc = props.p_credit_trans_desc;
      setShowModalSearch(false);
      setP_debit_acct(value.account_descrption);
      props.rowData.debit_acct_desc = value.account_descrption;
      setdebitAccount(value.tacct);
      setDebitAccountBalance(formatNumber2dp(value.acct_balance));
      props.setCreditAccountModalData(value);
      props.rowData.typeOfAccount = value.type_of_acct;
      props.rowData.account_currency = value.currency;
      props.rowData.acct_bal = formatNumber2dp(value.acct_balance);

      setTimeout(() => {
        document.getElementById(`${props.index}_p_debit_amt`).focus();
      }, 100);
    }
  }

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
        <div style={{ flex: 0.25, background: "" }}>
          {/* button and input  */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 0.1, background: "", marginLeft: "4px" }}>
              <ButtonComponent
                buttonBackgroundColor={"#0580c0"}
                buttonColor={"white"}
                buttonIcon={<VscClose size={20} />}
                buttonHeight={"25px"}
                buttonWidth={"30px"}
                onClick={props.index < 6 ? handleClear : handleRemoveRow}
              />
            </div>
            <div style={{ flex: 0.9 }}>
              <InputField
                noMarginRight
                inputWidth={"98%"}
                name="p_debit_acct"
                onChange={(e) => handleDebitAccountChange(e, props.index)}
                value={
                  p_debit_acct
                    ? p_debit_acct
                    : props.rowData.debit_acct_desc || ""
                }
                key={props.index + "_p_debit_acct"}
                onKeyDown={handleKeyPress2}
                id={`${props.index}_p_debit_acct`}
              />
            </div>
            <div style={{ flex: 0.02, position: "absolute", left: "333px" }}>
              {loader ? <Loader size={20} /> : null}
            </div>
          </div>
        </div>

        <SearchModal
          setShowModal={() => {
            setShowModalSearch();
            props.setLoading(false);
            props.setAccName("");
            props.setChartGroup("");
            props.setAccountDescription("");
          }}
          showModal={showModalSearch}
          currency={props.currency}
          filter1={filterDebitData}
          handleSelected={handleSelected}
        />

        <div style={{ flex: 0.12, background: "" }}>
          {/*  input  credit amount*/}
          <div style={{ flex: 1 }}>
            <InputField
              noMarginRight
              inputWidth={"95%"}
              textAlign={"right"}
              type={"text"}
              paddingRight={"4px"}
              name="p_debit_amt"
              onChange={(e) => handleInputChange(e, props.index)}
              onBlur={() => handleBlur()}
              value={
                props.rowData.p_debit_amt === "NaN"
                  ? ""
                  : props.rowData.p_debit_amt || ""
              }
              key={props.index + "_p_debit_amt"}
              id={`${props.index}_p_debit_amt`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (props.rowData.p_debit_amt) {
                    switchFocus(e, `${props.index + 1}_p_debit_acct`);
                  } else {
                    switchFocus(e, `${props.index}_p_debit_bra`);
                  }
                }
              }}
            />
          </div>
        </div>

        <div style={{ flex: 0.15, background: "" }}>
          {/* branch lov */}
          <div style={{ flex: 1 }}>
            <ListOfValue
              inputWidth={"95%"}
              noMarginRight={true}
              data={props.branchLOV}
              name="p_debit_bra"
              onChange={(e) => {
                lovInputChange(e, props.index);
                setTimeout(() => {
                  const input = document.getElementById(
                    `${props.index}p_debit_scan_doc_id`
                  );
                  input.focus();
                }, 0);
              }}
              value={props.rowData.p_debit_bra || ""}
              key={props.index + "_p_debit_bra"}
              id={`${props.index}_p_debit_bra`}
              onKeyDown={(e) => {
                switchFocus(e, `${props.index}p_debit_scan_doc_id`);
                if (e.key === "Enter") {
                  e.preventDefault();
                  const input = document.getElementById(
                    `${props.index}p_debit_scan_doc_id`
                  );
                  input.focus();
                }
              }}
            />
          </div>
        </div>

        <div style={{ flex: 0.19, background: "" }}>
          {/* scan document  */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 0.85 }}>
              <InputField
                noMarginRight
                inputWidth={"100%"}
                type={"text"}
                name="p_debit_scan_doc_id"
                onChange={(e) => handleScanDocInputChange(e, props.index)}
                value={props.rowData.p_debit_scan_doc_id || ""}
                key={props.index + "_p_debit_scan_doc_id"}
                id={`${props.index}p_debit_scan_doc_id`}
                onKeyDown={(e) => {
                  switchFocus(e, `${props.index}p_debit_trans_desc`);
                }}
              />
            </div>
            {/* button   */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flex: 0.13,
                background: "",
              }}
            >
              <ButtonComponent
                buttonBackgroundColor={"#0580c0"}
                buttonColor={"white"}
                buttonIcon={<FcDocument />}
                buttonHeight={"25px"}
                buttonWidth={"30px"}
                // buttonColor={'white'}
                onClick={() => handleClick1(props.rowData.p_debit_scan_doc_id)}
              />
            </div>
          </div>
        </div>
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
              <div className="font-extrabold text-black">View Document</div>
              <div
                className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                onClick={() => setSweetAlertConfirmed(false)}
              >
                x
              </div>
            </div>
            <Modal.Body>
              <DocumentViewing documentID={scandocID} />
            </Modal.Body>
          </Modal>
        )}

        <div style={{ flex: 0.29, background: "" }}>
          {/*  narration  */}
          <div style={{ flex: 1 }}>
            <InputField
              noMarginRight
              inputWidth={"98%"}
              type={"text"}
              name="p_debit_trans_desc"
              onChange={(e) => handleInputChange(e, props.index)}
              onKeyDown={(e) => {
                if (props.rowData.p_debit_trans_desc) {
                  handleKeyDown(e, props.index);
                }
              }}
              value={props.rowData.p_debit_trans_desc || ""}
              key={props.index + "_p_debit_trans_desc"}
              id={`${props.index}p_debit_trans_desc`}
              onBlur={() => {
                if (props.rowData.p_debit_trans_desc) {
                  blurNarrationInput(props.index);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowComponent;
