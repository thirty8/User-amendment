import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../../../../../../components/others/Header/Header";
import {
  AiOutlineClose,
  AiOutlineFolderView,
  AiOutlineVerified,
} from "react-icons/ai";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";

import { SiFarfetch } from "react-icons/si";
import { MdOutlineOpenInNew } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { SiWebauthn } from "react-icons/si";
import { LuView } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";
import { BiHelpCircle } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import TextArea from "../../../../../../components/others/Fields/TextArea";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import { API_SERVER } from "../../../../../../config/constant";
import { Modal } from "@mantine/core";
import SignatureVerification from "../SignatureVerification";
import ViewVourcher from "../ViewVourcher";
import Swal from "sweetalert2";

function CashierLimitApproval({
  onNewClick,
  onExitClick,
  onHelpClick,
  onRejectClick,
  onCancelClick,
  onOkClick,
  onRefreshClick,
  onDeleteClick,
  onAuthoriseClick,
  onViewClick,
  onFetchClick,
  displayNew,
  displayFetch,
  displayRefresh,
  displayDelete,
  displayAuthorise,
  displayView,
  displayOk,
  displayCancel,
  displayReject,
  displayHelp,
  displayExit,
  batchNo,
  accountSourceBranch,
  setCloseModal,
  setApproved,
}) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [rejectionReason, setRejectionReason] = useState([]);
  const [approvalReason, setApprovalReason] = useState([]);
  const [tellerApprovalDetails, setTellerApprovalDetails] = useState([]);

  const [rejectReason, setRejectReason] = useState("");

  const [transactionDate, setTransactionDate] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountLink, setAccountLink] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountName, setAccountName] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transAmount, setTransAmount] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [sysDate, setSysDate] = useState("");
  const [terminalID, setTerminalID] = useState("");
  const [approvalFlag, setApprovalFlag] = useState("");
  const [documentRef, setDocumentRef] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactionNarration, setTransactionNarration] = useState("");
  const [cashierReason, setCashierReason] = useState("");

  const [showSignatureVerificationModal, setShowSignatureVerificationModal] =
    useState(false);
  const [showViewVourcherModal, setShowViewVourcherModal] = useState(false);

  const handleViewVourcher = () => {
    setShowViewVourcherModal(true);
  };

  const handleSignatureVerification = () => {
    setShowSignatureVerificationModal(true);
  };

  // State to manage the selected value
  const [appReason, setAppReason] = useState("correct_details");

  const [rejReason, setRejReason] = useState();

  function removeUnderscoreAndCapitalize(str) {
    // Split the string by underscores
    const words = str.split("_");

    // Capitalize each first letter of the words
    const capitalizedWords = words.map((word) => {
      // Ensure the word is not empty before capitalizing
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word; // Return the original word if it's empty (e.g., consecutive underscores)
    });

    // Join the capitalized words with spaces to form the final result
    const result = capitalizedWords.join(" ");

    return result;
  }

   function formatAmount(number, decimalPlaces = 2) {
     // Convert the number to a string and split into integer and decimal parts
     const parts = number.toFixed(decimalPlaces).toString().split(".");

     // Add commas as thousands separators to the integer part
     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

     // Combine the integer and decimal parts
     return parts.join(".");
   }

  useEffect(() => {
    setAppReason(appReason);
  }, [appReason]);

  // Event handler for onChange
  const handleAppReasonChange = (appR) => {
    setRejReason('');
    setAppReason(appR);
  };

  const handleRejReasonChange = (rejRCC) => {
    setAppReason('');
    // alert(rejRCC);
    setRejReason(rejRCC);
  };

  const handleClose = () => setShowSignatureVerificationModal(false);

  useEffect(() => {
    axios
      .post(API_SERVER + "/api/get-code-details", { code: "REJ" }, { headers })
      .then((res) => {
        setRejectionReason(res.data);
      });
  }, [rejectionReason]);

  useEffect(() => {
    setApprovalReason([
      { label: "Correct Details", value: "correct_details" },
      { label: "Amount Granted", value: "amount_granted" },
      { label: "Others", value: "others" },
    ]);
  }, [approvalReason]);

  useEffect(() => {
    async function getTellerApprovalDetails() {
      let data = [];
      let response = await axios.post(
        API_SERVER + "/api/get-cashier-limit-details",
        { trans_number: batchNo },
        { headers }
      );

      response.data.map((d, index) => {
        data.push([
          d.user_name,
          d.terminal_id,
          d.acct_link,
          d.document_ref,
          d.trans_amount,
          d.approved_by,
          d.approved,
          d.trans_number,
          d.branch_code,
          d.posting_sys_date,
          d.posting_sys_time,
          d.approval_sys_date,
          d.approval_sys_time,
          d.cashier_reason,
          d.account_number,
          d.account_descrp,
          d.currency,
          d.rejection_reason,
          d.trans_type,
          d.balance_at_app,
          d.risk_approvedby,
          d.risk_app_date,
          d.narration,
          d.app_cnt,
          d.app_chk,
          d.src_fund,
          d.contact_p,
          d.with_prod_type,
        ]);

        const dateObj = new Date(d.trans_date);

        const day = dateObj.getUTCDate().toString().padStart(2, "0");
        const month = new Intl.DateTimeFormat("en-US", { month: "short" })
          .format(dateObj)
          .toUpperCase();
        const year = dateObj.getUTCFullYear();

        const dateObj1 = new Date(d.posting_sys_date);

        const day1 = dateObj.getUTCDate().toString().padStart(2, "0");
        const month1 = new Intl.DateTimeFormat("en-US", { month: "short" })
          .format(dateObj1)
          .toUpperCase();
        const year1 = dateObj1.getUTCFullYear();

        let sys_date = `${day1}-${month1}-${year1}`;

        let transaction_date = `${day}-${month}-${year}`;

        setAccountLink(d.acct_link);
        setBranchCode(d.branch_code);
        setTransactionDate(transaction_date);
        setTransactionNumber(d.trans_number);
        setAccountNumber(d.account_number);
        setAccountName(d.account_descrp);
        setCurrency(d.currency);
        setCurrencyCode(d.curr_code);
        setTransactionAmount(d.trans_amount);
        setTransAmount(formatAmount(d.trans_amount));
        setApprovedBy(d.approved_by);
        setSysDate(sys_date);
        setTerminalID(d.terminal_id);
        setApprovalFlag(d.approved);
        setDocumentRef(d.document_ref);
        setTransactionNarration(d.narration);
        setTransactionType(d.trans_type);
        setCashierReason(d.cashier_reason);
        setRejectReason(d.rejection_reason);
      });

      setTellerApprovalDetails(data);

      // alert(JSON.stringify(data));
    }

    getTellerApprovalDetails();
  }, []);

  function rejectFunc() {

    setAppReason('');

    if(!rejReason){
      return  Swal.fire({
        icon: 'error',
        title: 'Select a Reject Reason!',
      });
    }

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    let approved_by = userInfo.id;

    const dateObj = new Date(userInfo.postingDate);

    const day = dateObj.getUTCDate().toString().padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(dateObj)
      .toUpperCase();
    const year = dateObj.getUTCFullYear();

    let postingDate = `${day}-${month}-${year}`;

    Swal.fire({
      icon: 'question',
      title: 'Are you really sure you want to reject this transaction?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((res) => {

      if (res.isConfirmed) {

      // alert(rejReason);

    axios
      .post(
        API_SERVER + "/api/reject-cashier-limit",
        {
          account_link: accountLink,
          branch_code: branchCode,
          currency_code: currencyCode,
          approval_flag: approvalFlag,
          transaction_amount: transactionAmount,
          approved_by: approved_by,
          username: username,
          posting_date: postingDate,
          sys_date: sysDate,
          terminal_id: terminalID,
          trans_type: transactionType,
          trans_number: transactionNumber,
          reason: rejReason,
        },
        { headers }
      )
      .then((res) => {
        let response = res.data;

        // return alert(JSON.stringify(response.response_message));

        if (
          response.response_code === "999" ||
          response.response_code === 999
        ) {
          Swal.fire({
            icon: "error",
            title: response.response_message,
          }).then((res) => {});
        } else {
          Swal.fire({
            icon: "success",
            title: response.response_message,
          }).then((res) => {
            setCloseModal(false);

            setApproved(Math.random());
          });
        }
      });


    } else {
      // User clicked "No" or closed the modal
      // Handle the cancel action or do nothing
      console.log('Transaction approval canceled');
    }

    });

}



  function approveFunc() {

    setRejReason('');

    if(!appReason){
      return  Swal.fire({
        icon: 'error',
        title: 'Select an Approval Reason!',
      });
    }

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    let approved_by = userInfo.id;

    const dateObj = new Date(userInfo.postingDate);

    const day = dateObj.getUTCDate().toString().padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(dateObj)
      .toUpperCase();
    const year = dateObj.getUTCFullYear();

    let postingDate = `${day}-${month}-${year}`;

    Swal.fire({
      icon: 'question',
      title: 'Are you really sure you want to approve this transaction?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((res) => {

      if (res.isConfirmed) {

        // return alert(JSON.stringify({
        //   accountLink,
        //   branchCode,
        //   currencyCode,
        //   approvalFlag,
        //   transactionAmount,

        //   approved_by,
        //   username,
        //   postingDate,
        //   sysDate,
        //   terminalID,
        //   transactionType,
        //   transactionNumber,
        //   appReason,
        // }));

    axios
      .post(
        API_SERVER + "/api/approve-cashier-limit",
        {
          account_link: accountLink,
          branch_code: branchCode,
          currency_code: currencyCode,
          approval_flag: approvalFlag,
          transaction_amount: transactionAmount,
          approved_by: approved_by,
          username: username,
          posting_date: postingDate,
          sys_date: sysDate,
          terminal_id: terminalID,
          trans_type: transactionType,
          trans_number: transactionNumber,
          reason: appReason,
        },
        { headers }
      )
      .then((res) => {
        let response = res.data;

        // return alert(JSON.stringify(response.response_message));

        if (
          response.response_code === "999" ||
          response.response_code === 999
        ) {
          Swal.fire({
            icon: "error",
            title: response.response_message,
          }).then((res) => {});
        } else {
          Swal.fire({
            icon: "success",
            title: response.response_message,
          }).then((res) => {
            setCloseModal(false);

            setApproved(Math.random());
          });
        }
      });

    } else {
      // User clicked "No" or closed the modal
      // Handle the cancel action or do nothing
      console.log('Transaction approval canceled');
    }

    });
  }
  

  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px", zoom: "0.91" }}>
      {showSignatureVerificationModal ? (
        <Modal
          className="p-0 m-0"
          opened={showSignatureVerificationModal}
          size="35%"
          // fullScreen={true}
          styles={{
            modal: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: 0,
              position: "fixed",
            },
          }}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={handleClose}
        >
          <SignatureVerification
            setShowSignatureVerificationModal={
              setShowSignatureVerificationModal
            }
            accountNumber={accountNumber}
          />
        </Modal>
      ) : (
        ""
      )}

      {showViewVourcherModal ? (
        <Modal
          className="p-0 m-0"
          opened={showViewVourcherModal}
          size="45%"
          // fullScreen={true}
          styles={{
            modal: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: 0,
              position: "fixed",
            },
          }}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={handleClose}
        >
          <ViewVourcher
            setShowViewVourcherModal={setShowViewVourcherModal}
            docCode={transactionNumber}
          />
        </Modal>
      ) : (
        ""
      )}

      <div
        className="flex"
        style={{
          zoom: "0.7",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        centered
      >
        <div
          style={{ display: displayFetch }} // can be set to 'none'
          className="header-button ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            onClick={onFetchClick}
          >
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="file-alt"
            /> */}
            <SiFarfetch
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />

            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Fetch
            </p>
          </div>
        </div>

        <div
          style={{ display: displayNew }} // can be set to 'none'
          className="header-button ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            onClick={onNewClick}
          >
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="file-alt"
            /> */}

            <MdOutlineOpenInNew
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">New</p>
          </div>
        </div>

        <div
          style={{ display: displayRefresh }}
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onRefreshClick}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="sync"
            /> */}
            <FiRefreshCcw
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Refresh
            </p>
          </div>
        </div>

        <div
          style={{
            display: displayAuthorise,
            background: "e0f2fe",
            paddingBottom: "13px",
            paddingTop: "-100px",
          }}
          className="header-button  ml-3 flex flex-col items-center w-[95px]  justify-center rounded hover:bg-gray-200"
          onClick={() => approveFunc()}
        >
          <div className="flex flex-col justify-center items-center  ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="thumbs-up"
            /> */}
            <SiWebauthn
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 px-2 text-lg mt-[-3px] font-semibold">
              Approve
            </p>
          </div>
        </div>

        <div
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onViewClick}
          style={{ display: displayView }}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="eye"
            /> */}
            <LuView
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              View
            </p>
          </div>
        </div>

        <div
          onClick={() => {
            // swal("Record successfully uploaded!");
          }}
          style={{ display: displayOk }}
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            onClick={onOkClick}
          >
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="check"
            /> */}

            <FaCheck
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">Ok</p>
          </div>
        </div>

        <div
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={() => rejectFunc()}
          style={{
            display: displayReject,
            background: "e0f2fe",
            paddingBottom: "13px",
            paddingTop: "-100px",
          }}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="thumbs-down"
            /> */}
            <TiCancel
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Reject
            </p>
          </div>
        </div>

        <div
          className="header-button  mx-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onHelpClick}
          style={{ display: displayHelp }}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", fontSize: 20, paddingTop: "15px" }}
              fas
              icon="question-circle"
            /> */}
            <BiHelpCircle
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Help
            </p>
          </div>
        </div>

        <div
          className="header-button  mx-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={() => setCloseModal(false)}
          style={{
            display: displayExit,
            background: "e0f2fe",
            paddingBottom: "13px",
            paddingTop: "-100px",
          }}
        >
          <div
            // onClick={() => {
            //   document.getElementById("closeModalBTN").click();
            // }}
            className=" flex flex-col items-center justify-center"
            style={
              {
                // background:
                //   `url(` +
                //   window.location.origin +
                //   `/assets/images/headerBackground/` +
                //   getTheme.theme.headerImage +
                //   `)`,
              }
            }
          >
            {/* <MDBIcon
              style={{ color: "grey", fontSize: 20, paddingTop: "15px" }}
              fas
              icon="sign-out-alt"
            /> */}

            <ImExit
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Exit
            </p>
          </div>
        </div>
      </div>

      <hr style={{ marginTop: "4px" }} />

      <div
        className="flex"
        style={{
          zoom: "0.7",
          marginTop: "18px",
          marginBottom: "14px",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        // centered
      >
        <div
          className="pull-left align-items-left"
          style={{ fontSize: "18.5px" }}
        >
          Transaction Type :{" "}
          <span
            style={{
              padding: "5px",
              background: "#daecfe",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {transactionType}
          </span>
        </div>

        <div className="flex pull-right align-items-right">
          <div
            style={{
              marginTop: "-4.5px",
              marginLeft: "150px",
              fontSize: "18px",
            }}
          >
            <ButtonComponent
              onClick={handleViewVourcher}
              buttonIcon={
                <AiOutlineFolderView
                  size={22}
                  style={{ paddingLeft: "5px", fontSize: "17px" }}
                />
              }
              label={"View Vourcher"}
              buttonHeight={"38px"}
              buttonWidth={"175px"}
            />
          </div>

          <div
            style={{
              marginTop: "-4.5px",
              marginLeft: "30px",
              fontSize: "18px",
            }}
          >
            <ButtonComponent
              onClick={handleSignatureVerification}
              buttonIcon={
                <AiOutlineVerified
                  size={22}
                  style={{ paddingLeft: "5px", fontSize: "17px" }}
                />
              }
              label={"Signature Verification"}
              buttonHeight={"38px"}
              buttonWidth={"235px"}
            />
          </div>
        </div>
      </div>

      <hr style={{ marginTop: "4px" }} />

      <div style={{ zoom: "0.8", paddingTop: "5px" }}>
        {/* <Header title={"Cashier Limit Approval"} headerShade={"true"} fontSize="17px" /> */}
        <p
          style={{
            background: "#daecfe",
            color: "#0580c0",
            padding: "3.8px",
            width: "100%",
            textTransform: "uppercase",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Cashier Limit Approval
        </p>
      </div>

      <div className="flex w-full mt-2" style={{ zoom: "1.1" }}>
        <div className="w-3/10" style={{ width: "65%", paddingRight: "5px" }}>
          <hr style={{ marginTop: "4px", marginTop: "-0.3px" }} />

          <p style={{ fontSize: "13px", marginTop: "2px", fontWeight: "bold" }}>
            Cashier Reasons :{" "}
          </p>

          <hr style={{ marginTop: "4px" }} />

          <div className="pull-left align-left mb-1 mt-1">
            <div style={{ marginLeft: "-20px", marginTop: "5px" }}>
              <TextArea
                disabled={"disabled"}
                inputWidth={"100%"}
                value={cashierReason}
                inputheight={"90px"}
              />
            </div>
          </div>

          <hr style={{ marginTop: "4px" }} />

          <p style={{ fontSize: "13px", marginTop: "2px", fontWeight: "bold" }}>
            Transaction Details :{" "}
          </p>

          <hr style={{ marginTop: "4px" }} />

          <div className="flex w-full mt-2" style={{ zoom: "1.1" }}>
            <div className="w-3/10" style={{ width: "30%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "-2px",
                  textAlign: "left",
                  padding: "2px",
                }}
              >
                Account Number :{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "5px",
                  textAlign: "left",
                  padding: "2px",
                }}
              >
                Account Name :{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "5px",
                  textAlign: "left",
                  padding: "2px",
                }}
              >
                Currency :{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "5px",
                  textAlign: "left",
                  padding: "2px",
                }}
              >
                Transaction Amount :{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "5px",
                  textAlign: "left",
                  padding: "2px",
                }}
              >
                Document Reference :{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "5px",
                  textAlign: "left",
                  padding: "2px",
                }}
              >
                Transaction Narration :{" "}
              </p>
            </div>
            <div className="w-7/10 pl-3" style={{ width: "70%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  color: "grey",
                  marginTop: "-2px",
                  paddingRight: "8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  background: "whitesmoke",
                  padding: "2px",
                }}
              >
                {accountNumber}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  color: "grey",
                  marginTop: "5px",
                  paddingRight: "8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  background: "whitesmoke",
                  padding: "2px",
                }}
              >
                {accountName}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  color: "grey",
                  marginTop: "5px",
                  paddingRight: "8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  background: "whitesmoke",
                  padding: "2px",
                }}
              >
                {currency}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  color: "grey",
                  marginTop: "5px",
                  paddingRight: "8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  background: "whitesmoke",
                  padding: "2px",
                }}
              >
                {transAmount}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  color: "grey",
                  marginTop: "5px",
                  paddingRight: "8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  background: "whitesmoke",
                  padding: "2px",
                }}
              >
                {documentRef}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  color: "grey",
                  marginTop: "5px",
                  paddingRight: "8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  background: "whitesmoke",
                  padding: "2px",
                }}
              >
                &nbsp;{transactionNarration}
              </p>
            </div>
          </div>
        </div>

        <div
          className="w-7/10 pl-3"
          style={{ width: "35%", background: "whitesmoke" }}
        >
          {/* <hr style={{ marginTop: "4px" }} /> */}

          <p style={{ fontSize: "13px", marginTop: "3px", fontWeight: "bold" }}>
            Approval For :{" "}
          </p>

          <hr style={{ marginTop: "4px" }} />

          <p style={{ fontSize: "12.5px", marginTop: "7px" }}>
            Transaction Date :{" "}
            <span style={{ fontWeight: "bold" }}>{transactionDate}</span>
          </p>

          <p style={{ fontSize: "12.5px", marginTop: "8px" }}>
            Transaction Number :{" "}
            <span style={{ fontWeight: "bold" }}>{transactionNumber}</span>
          </p>

          <hr style={{ marginTop: "15px" }} />

          <p
            style={{ fontSize: "14px", marginTop: "2px", textAlign: "center" }}
          >
            Balance Before :{" "}
          </p>

          <hr style={{ marginTop: "4px" }} />

          <div className="flex w-full mt-2" style={{ zoom: "1.1" }}>
            <div className="w-3/10" style={{ width: "50%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "2px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Customer Status{" "}
              </p>
            </div>
            <div className="w-7/10 pl-3" style={{ width: "50%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "2px",
                  paddingRight: "8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                OTHERS{" "}
              </p>
            </div>
          </div>

          <hr style={{ marginTop: "4px" }} />

          <div className="flex w-full mt-2" style={{ zoom: "1.1" }}>
            <div className="w-3/10" style={{ width: "40%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "-2px",
                  textAlign: "left",
                }}
              >
                Available&nbsp;Balance&nbsp;:{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "7px",
                  textAlign: "left",
                }}
              >
                Ledger Balance :{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "7px",
                  textAlign: "left",
                }}
              >
                Available Limit :{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "7px",
                  textAlign: "left",
                }}
              >
                Acct&nbsp;Source&nbsp;Branch&nbsp;:{" "}
              </p>
            </div>
            <div className="w-7/10 pl-3" style={{ width: "60%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "-2px",
                  paddingRight: "8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                ***{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "7px",
                  paddingRight: "8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                ***{" "}
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "7px",
                  paddingRight: "8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                0
              </p>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "7px",
                  paddingRight: "8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {accountSourceBranch}
              </p>
            </div>
          </div>

          <br />
        </div>
      </div>

      <hr style={{ marginTop: "15px" }} />

      <div className="flex w-full mt-1" style={{ zoom: "1.1" }}>
        <div className="w-3/10" style={{ width: "40%", paddingRight: "5px" }}>
          <div className="flex w-full mt-2" style={{ zoom: "1.1" }}>
            <div className="w-3/10" style={{ width: "30%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "-2px",
                  textAlign: "left",
                  padding: "2px",
                }}
              >
                Approval&nbsp;Reason&nbsp;:{" "}
              </p>
            </div>
            <div
              className="w-7/10 pl-3"
              style={{ width: "70%", zoom: "0.82", position: "relative" }}
            >
              <ListOfValue
                data={approvalReason}
                value={appReason}
                inputWidth={"100%"}
                onChange={handleAppReasonChange}
              />
            </div>
          </div>
        </div>

        <div className="w-3/10" style={{ width: "60%" }}>
          <div className="flex w-full mt-2" style={{ zoom: "1.1" }}>
            <div className="w-3/10" style={{ width: "23%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "-2px",
                  marginRight: "-17px",
                  textAlign: "right",
                  padding: "2px",
                }}
              >
                Rejection Reason :{" "}
              </p>
            </div>
            <div
              className="w-7/10 pl-3"
              style={{ width: "77%", zoom: "0.82", position: "relative" }}
            >
              <ListOfValue
                data={rejectionReason}
                value={rejReason}
                inputWidth={"100%"}
                onChange={handleRejReasonChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-1 -mb-3" style={{ zoom: "1.1" }}>
        <div className="w-3/10" style={{ width: "100%" }}>
          <div
            className="flex w-full mt-2"
            style={{ zoom: "1.1", marginTop: "10px" }}
          >
            <div className="w-3/10" style={{ width: "12%" }}>
              <p
                style={{
                  fontSize: "11.8px",
                  marginTop: "-2px",
                  textAlign: "left",
                  padding: "2px",
                }}
              >
                OD&nbsp;Comment&nbsp;:{" "}
              </p>
            </div>
            <div className="w-7/10 pl-3" style={{ width: "88%", zoom: "0.8" }}>
              <InputField inputWidth={"100%"} id={""} type={""} value={""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashierLimitApproval;
