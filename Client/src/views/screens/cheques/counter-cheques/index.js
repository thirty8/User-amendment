import React, { useState, useEffect } from "react";
import AccountSummary from "../../../../components/others/AccountSummary";
import axios from "axios";
import swal from "sweetalert";
import { API_SERVER } from "../../../../config/constant";
import InputField from "../../../.../../../components/others/Fields/InputField";
import TextAreaField from "../../../.../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../.../../../components/others/Button/ButtonComponent";
import DocumentViewing from "../../../.../../../components/others/DocumentViewing";
import ListOfValue from "../../../.../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../.../../../components/others/customtable";
import { AiOutlineDelete } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { MDBIcon } from "mdb-react-ui-kit";
import SearchModal from "../../cheques/book-request/components/SearchModal";
import ChargesModal from "../../cheques/book-request/components/Modal";
import ActionButtons from "../../../.../../../components/others/action-buttons/ActionButtons";
import Swal from "sweetalert2";
import CustomModal from "./component/customModal";

const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

export default function CounterChequeRequisite() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberChange, setAccountNumberChange] = useState("");
  const [debitAccountNumberChange, setDebitAccountNumberChange] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountDetails, setAccountDetails] = useState({});
  const [numberOfBooks, setNumberOfBooks] = useState("");
  const [debitChargeAccount, setDebitChargeAccount] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [dateOpened, setDateOpened] = useState("");
  const [dateOfLastAct, setDateOfLastAct] = useState("");
  const [channel, setChannel] = useState("");
  const [channelArray, setChannelArray] = useState([]);
  const [formData, setFormData] = useState({});
  const [batchNo, setBatchNo] = useState(0);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [insertArray, setInsertArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState("");
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [leavesNo, setLeavesNo] = useState("");
  const [comment, setComment] = useState("");
  const [count, setCount] = useState(0);
  const [charges, setCharges] = useState("");
  const [totalCharge, setTotalCharge] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [allCustomerAccountNumbers, setAllCustomerAccountNumbers] = useState([]);
  const [requestedBy, setRequestedBy] = useState("");
  const [handleRowEditState, setHandleRowEditState] = useState(false);
  const [updatedRowState, setUpdatedRowState] = useState(false);
  const [indexState, setIndexState] = useState("");
  const [newBtnState, setNewBtnState] = useState(false);
  const [amount, setAmount] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId)?.focus();
      console.log(document.getElementById(nextFieldId), "component");
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

  function onAccountNumberChange(e) {
    setAccountNumber(e.target.value);
  }
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });
    return formatted;
  }

  function formatDate(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Parse the input date
    const dateObj = new Date(inputDate);
    // Extract the day, month, and year from the date object
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    // Format the date in the desired format "M/D/YYYY"
    const formattedDate = `${month + 1}/${day}/${year}`;
    return formattedDate;
  }

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dates = new Date(JSON.parse(localStorage.getItem("userInfo")).postingDate);
  const month = dates.getMonth() + 1; // getMonth() returns a zero-indexed value, so add 1 to get the actual month number
  const day = dates.getDate();
  const year = dates.getFullYear();

  function onKeyPress(e) {
    // checkInternetConnection();
    if (e.key === "Enter") {
      setAccountNumberChange(e.target.value);
      axios
        .post(
          API_SERVER + "/api/getBalance",
          {
            accountNumber: accountNumber,
          },
          { headers }
        )
        .then((response) => {
          let data = response.data[0];
          let data2 = response.data;

          if (data === undefined) {
            Swal.fire({
              title: "Invalid Account Number",
              text: "The account number could not be found in our records..",
              icon: "warning",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                var input = document.getElementById("accountNumber");
                input.focus();
                setAccountName("");
                setDateOfLastAct("");
                setDateOpened("");
                setDebitChargeAccount("");
              }
            });
          } else if (data.length > 0) {
            if (accountName !== "") {
              setTimeout(() => {
                var input = document.getElementById("Cheque Number");
                input.focus();
              }, 0);
            }
          } else {
            return null;
          }
        });
    }
  }

  useEffect(() => {
    if (accountNumber !== "" && accountDetails !== {}) {
      setTimeout(() => {
        var input = document.getElementById("Cheque Number");
        input.focus();
      }, 0);
    } else {
      setTimeout(() => {
        var input = document.getElementById("accountNumber");
        input.focus();
      }, 0);
    }
  }, [showModal]);

  function handleDebitAccount(e) {
    setDebitChargeAccount(e.target.value);
  }

  // using new button to do a new transaction  and generating a new request id
  useEffect(() => {
    if (newBtnState) {
      if (newBtnState && count > 0) {
        async function getBatchNumber() {
          const response = await axios.get(API_SERVER + "/api/get-unique-ref", {
            headers,
          });

          setBatchNo(response.data[0]["unique_ref"]);
        }
        getBatchNumber();
      }
    }
  }, [newBtnState, count]);

  //  get batch number when new button is clicked
  useEffect(() => {
    async function getBatchNumber() {
      const response = await axios.get(API_SERVER + "/api/get-unique-ref", {
        headers,
      });

      setBatchNo(response.data[0]["unique_ref"]);
    }
    getBatchNumber();
  }, []);

  useEffect(() => {
    if (accountDetails) {
      if (accountDetails.summary?.length > 0) {
        setAccountName(accountDetails?.summary[0]?.account_name);
        setDateOpened(formatDate(accountDetails?.summary[0]?.date_opened));
        setDateOfLastAct(formatDate(accountDetails?.summary[0]?.date_of_last_activity));
        setTimeout(() => {
          var input = document.getElementById("Cheque Number");
          input.focus();
        }, 0);
      } else if (Object.keys(accountDetails).length === 0) {
        setAccountName("");
        setDateOfLastAct("");
        setDateOpened("");
        setAllCustomerAccountNumbers([]);
      }
    }
  }, [accountDetails]);

  console.log("name", accountDetails);

  useEffect(() => {
    setFormData({
      accountNumber,
      chequeNumber,
      amount,
      requestedBy,
      comment,
    });
  }, [accountNumber, chequeNumber, amount, requestedBy, comment]);

  //end of form submission
  const [getTheme, setGetTheme] = useState(JSON.parse(localStorage.getItem("theme")));

  // using new btn to generate a new batch number
  function handleNewBtnClick() {
    setAccountNumber("");
    setAccountNumberChange("");
    setDocumentNo("");
    setAccountDetails({});
    setAccountName("");
    setDateOfLastAct("");
    setDateOpened("");
    setComment("");
    setNewBtnState(true);
    setFormData({});
    setChequeNumber("");
    setRequestedBy("");
    setAmount("");
    setCount((prev) => prev + 1);
  }

  // validation on charge account
  //  ---------------------------------------------------
  useEffect(() => {
    if (charges && accountDetails && accountDetails.summary && accountDetails.summary.length > 0) {
      const availableBalance = parseFloat(
        accountDetails.summary[0].availabe_balance.replace(/\s/g, "").replace(/,/g, "")
      );
      if (availableBalance > 0) {
        swal({
          title: "Error",
          text: "Insufficient Funds",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            // setShowModal(false);
          }
        });
      }
    }
  }, [charges, accountDetails]);

  // ------------------------------------------

  async function handleSubmit() {
    if (accountNumber === "" || chequeNumber === "" || amount === "" || requestedBy === "") {
      Notify({
        title: "Kindly Fill all required fields",
        text: "All Fields with asterisk are required",
        icon: "warning",
        confirmButtonText: "OK",
      });
      // notify.success({
      //   title: "Kindly Fill all required fields",
      //   id: "Fill alll fields",
      //   message: "All Fields with asterisk are required",
      // });
    } else {
      const chequeRequest = await axios.post(
        API_SERVER + "/api/counter_cheque_req",

        {
          key: "callprc",
          batchNo: batchNo,
          accountNumber: accountNumber,
          postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
          chequeNumber: chequeNumber,
          approvedBy: null,
          amount: parseFloat(amount),
          approvedTerminal: null,
          approvedFlag: null,
          branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
          comment: comment ? comment : null,
          terminalId: localStorage.getItem("ipAddress"),
          approvedIp: null,
          requestedBy: requestedBy,
          send: null,
          scanDoc: documentNo ? documentNo : null,
          currency: accountDetails?.summary[0]?.currency_code,
        },

        { headers }
      );
      let responseMessage = chequeRequest.data["responseMessage"];

      if (chequeRequest.data["responseCode"] === "000") {
        swal({
          title: "Success",
          text: responseMessage,
          icon: "success",
          buttons: "OK",
        }).then((result) => {
          if (result) {
            setAccountNumber("");
            setDocumentNo("");
            setDateOfLastAct("");
            setDateOpened("");
            setAccountName("");
            setDebitChargeAccount("");
            setComment("");
            setRequestedBy("");
            setChequeNumber("");
            setAmount("");
            setAccountDetails({});
            setAccountNumberChange("");
          }
          // notify.success({
          //   autoClose: checked,
          //   title: "Recent",
          //   message: responseMessage,
          //   id: "Cheque book created",
          // });
        });
      } else {
        swal({
          title: "Error",
          text: responseMessage,
          icon: "warning",
          buttons: "OK",
        }).then((result) => {
          if (result) {
          }
        });
      }
    }
  }
  function onBlur(e) {
    // checkInternetConnection();
    setAccountNumber(e.target.value);
  }
  function onBlur2(e) {
    // checkInternetConnection();
    setDebitChargeAccount(e.target.value);
  }
  async function handleClick() {
    if (documentNo === "") {
      Swal.fire({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          var doc = document.getElementById("Document Number");
          doc.focus();
        }
        if (result.isDenied) {
          var doc = document.getElementById("Document Number");
          doc.focus();
        }
      });
      // notify.warn({
      //   title: "ERR - 01346",
      //   id: "No Document ID",
      //   message: "A Valid Document ID is required",
      // });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  function handleChange() {}

  function handleSelected(value) {
    setAccountNumberChange(value);
    setAccountNumber(value);
    setShowModal(false);
  }

  function handleDocumentNo() {
    if (documentNo === "") {
      Notify({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        confirmButtonText: "OK",
      });

      // notify.warn({
      //   title: "ERR - 01346",
      //   id: "No Document ID",
      //   message: "A Valid Document ID is required",
      // });
    } else {
      setShowModal1(true);
      setForm("View Document");
    }
  }
  function Notify({ title, icon, confirmButtonText, text }) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: confirmButtonText,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  //handle onKeyDown on radio buttons
  const handleRadioBtnsOnKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setTimeout(() => {
        var input = document.getElementById("Number of Books");
        input.focus();
      }, 0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setTimeout(() => {
        var input = document.getElementById("Delivery Branch");
        input.focus();
      }, 0);
    }
  };

  function onAmountChange(e) {
    const inputValue = e.target.value;
    if (!inputValue || /^\d*\.?\d*$/.test(inputValue)) {
      setAmount(inputValue);
    } else {
      setAmount(inputValue.replaceAll(",", ""));
    }
  }

  function handleChequeValidation() {
    axios
      .post(
        API_SERVER + "/api/counter_cheque_req",
        {
          key: "validateCheque",
          chequeNumber: chequeNumber,
          accountNumber: accountNumber,
        },
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        const responseCode = response.data?.responseCode;
        if (responseCode === "000") {
          setChequeNumber(response.data?.responseMessage);
        } else if (responseCode === "998") {
          Swal.fire({
            title: "An Error Occured",
            text: response.data?.responseMessage,
            icon: "warning",
            confirmButtonText: "OK",
            // confirmButtonColor:"red"
          }).then((result) => {
            if (result.isConfirmed) {
              var input = document.getElementById("Cheque Number");
              input.focus();
            }
          });
        }
      });
  }

  function validateAmount() {
    axios
      .post(
        API_SERVER + "/api/counter_cheque_req",
        {
          key: "validateAmount",
          amount: amount,
        },
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        const responseCode = response.data?.responseCode;
        if (responseCode === "000") {
          axios
            .post(
              API_SERVER + "/api/counter_cheque_req",
              {
                key: "postFee",
                accountNumber: accountNumber,
                amount: parseFloat(amount),
                batchNo: batchNo,
                postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
                chequeNumber: chequeNumber,
                terminalId: localStorage.getItem("ipAddress"),
                branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
              },
              { headers }
            )
            .then((response) => {
              if (response.data?.responseCode === "000") {
                var input = document.getElementById("Requested By");
                input.focus();
              } else {
                console.log(response.data?.responseMessage);
              }
            });
        } else if (responseCode === "998") {
          Swal.fire({
            title: "An Error Occurred",
            text: response.data?.responseMessage,
            icon: "warning",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              var input = document.getElementById("Amount");
              input.focus();
            }
          });
        }
      });
  }
  return (
    <div style={{ zoom: 0.97 }}>
      {/* <Notifications position="top-center" zIndex={2077} limit={5} /> */}

      {/* // 1683042691  */}
      <div>
        <ActionButtons
          displayFetch={"none"}
          displayRefresh={"none"}
          displayDelete={"none"}
          displayCancel={"none"}
          displayAuthorise={"none"}
          displayView={"none"}
          displayReject={"none"}
          displayHelp={"none"}
          onNewClick={handleNewBtnClick}
          onOkClick={handleSubmit}
          onExitClick={handleExitClick}
        />
      </div>

      <hr className="my-[3px] mt-3" />
      {/* start of body  */}
      <div className=" bg-white flex justify-end py-[10px] px-4 mb-2">
        <div>
          <InputField
            label={"Request ID"}
            labelWidth={"35%"}
            inputWidth={"60%"}
            disabled={true}
            value={batchNo}
          />
        </div>
      </div>
      {/* </div> */}
      <hr className="my-[3px]" />

      <div className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white ">
        <div style={{ width: "100%" }} className="wrapper rounded border-2  md:flex">
          {/* left side  */}
          <div className="md:w-[65%] rounded py-2 px-1 md:mr-2 md:mb-0 first">
            <div className=" w-full   mt-1">
              <div className="w-[58%] flex items-center" style={{ marginBottom: "13px" }}>
                <InputField
                  label={"Account Number"}
                  labelWidth={"33.2%"}
                  inputWidth={"55%"}
                  required={true}
                  type={"number"}
                  id={"accountNumber"}
                  name={"accountNumber"}
                  value={accountNumber}
                  onBlur={onBlur}
                  onChange={onAccountNumberChange}
                  onKeyPress={(e) => {
                    onKeyPress(e);
                  }}
                />
                <ButtonComponent
                  onClick={() => {
                    setShowModal(true);
                  }}
                  label="Search"
                  buttonBackgroundImage={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                  buttonBackgroundColor={"#0580c0"}
                  buttonWidth="20%"
                  buttonHeight="27px"
                  buttonColor="white"
                />
                <SearchModal
                  setShowModal={setShowModal}
                  showModal={showModal}
                  handleSelected={handleSelected}
                />
              </div>

              <div className="flex items-center w-[100%]" style={{ marginBottom: "13px" }}>
                <div className="w-[100%] ">
                  <InputField
                    label={"Account Name"}
                    labelWidth={"16.1%"}
                    inputWidth={"68.9%"}
                    disabled={true}
                    name={"accountName"}
                    value={accountName}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-6 items-center w-[100%]" style={{ marginBottom: "13px" }}>
              <InputField
                label={"Date Opened"}
                id={"Date Opened"}
                disabled={true}
                labelWidth={"33%"}
                inputWidth={"55%"}
                value={dateOpened}
              />

              <InputField
                label={"Date of Last Activity"}
                labelWidth={"27%"}
                inputWidth={"42%"}
                disabled={true}
                value={dateOfLastAct}
              />
            </div>

            <div className="flex space-x-6 items-center w-[100%]" style={{ marginBottom: "13px" }}>
              <InputField
                label={"Cheque Number"}
                id={"Cheque Number"}
                labelWidth={"33.2%"}
                required={true}
                inputWidth={"55%"}
                type={"number"}
                onChange={(e) => {
                  setChequeNumber(e.target.value);
                }}
                onBlur={(e) => {
                  handleChequeValidation();
                }}
                value={chequeNumber}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleChequeValidation();
                    var input = document.getElementById("Amount");
                    input.focus();
                  }
                }}
              />

              <InputField
                label={"Amount"}
                id={"Amount"}
                labelWidth={"27%"}
                inputWidth={"42%"}
                textAlign={"right"}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    validateAmount();
                  }
                }}
                onChange={onAmountChange}
                onBlur={(e) => {
                  if (!amount.includes(",")) {
                    if (!(amount === "")) {
                      setAmount(formatNumber(parseFloat(e.target.value)));
                    }
                  }
                }}
                required={true}
                value={amount}
              />
            </div>
            <div className="flex space-x-44 items-center w-[100%]">
              <div className="w-[58%] flex items-center">
                <InputField
                  id={"Document Number"}
                  label={"Document Number"}
                  onChange={(e) => setDocumentNo(e.target.value)}
                  labelWidth={"33.3%"}
                  inputWidth={"55.5%"}
                  type={"number"}
                  value={documentNo}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleDocumentNo();
                    }
                  }}
                />
                <ButtonComponent
                  label={"View Doc"}
                  buttonWidth={"20%"}
                  type={"button"}
                  buttonHeight={"27px"}
                  buttonColor={"white"}
                  buttonBackgroundColor={"#0580c0"}
                  onClick={handleDocumentNo}
                />
              </div>
              <div className=" w-[16%] ">
                <ButtonComponent
                  onClick={() => {
                    setShowModal1(true);

                    setForm("View Charges");
                  }}
                  label="View Charges"
                  buttonBackgroundColor={"green"}
                  buttonWidth="71%"
                  buttonHeight="27px"
                  buttonColor="white"
                />
                <CustomModal
                  showModal1={showModal1}
                  setShowModal1={setShowModal1}
                  form={form}
                  setForm={setForm}
                  documentNo={documentNo}
                  batchNumber={batchNo}
                />
              </div>
            </div>
          </div>
          {/* right side  */}
          <div className=" md:w-[35%] py-2 rounded px-4 ">
            <AccountSummary
              accountNumber={accountNumberChange}
              setAccountDetails={setAccountDetails}
              backgroundColor={"#0580c0"}
            />
          </div>
        </div>
        <div className="space-y-2  py-3 border-2 rounded mt-2">
          <div className="w-[70%] flex items-center" style={{ marginBottom: "13px" }}>
            <div className="w-[82.4%] ">
              <InputField
                id={"Requested By"}
                labelWidth={"18%"}
                inputWidth={"76.5%"}
                label={"Requested By"}
                required={true}
                onChange={(e) => {
                  setRequestedBy(e.target.value);
                }}
                value={requestedBy}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    var input = document.getElementById("Comment");
                    input.focus();
                  }
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "13px" }}>
            <TextAreaField
              label={"Comment"}
              id={"Comment"}
              labelWidth={"10.32%"}
              inputWidth={"44.3%"}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
