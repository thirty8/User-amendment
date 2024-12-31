import React, { useState, useEffect, useContext } from "react";
import { GiReceiveMoney } from "react-icons/gi/index.esm";
// import ListOfValue from "../components/ListOfValue";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
// import InputField from "../components/inputField";
import InputField from "../../../../components/others/Fields/InputField";

import Label from "../../../../components/others/Label/Label";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import swal from "sweetalert";
import AccountSummary from "../../../../components/others/AccountSummary";
import { checkInternetConnection } from "../components/checkConnection";
import FindBy from "../components/Modal";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import Denominations from "../components/Denominations";
import PhoneNumber from "../components/Phone_number";
import ThirdPartyModalX from "../components/ThirdPartyModal";
import { headers } from "./teller-activities";
import { Modal } from "@mantine/core";
import { globalContext } from "../../../../App";
import Swal from "sweetalert2";
function CashWithdrawal({
  setSigVer,
  sigVer,
  handleSubmit,
  formData,
  setFormData,
  setBatchNo,
  body,
  okClick,
  setChecked,
  checked,
  batchNo,
  setActiveAccountNumber,
  setDenominationEntries,
  setThirdPartyEntries,
}) {
  const [response, setResponse] = useState("");
  const [inWords, setInWords] = useState("");
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedSourceOfFund, setSelectedSourceOfFund] = useState("");

  const [accountNumberChange, setAccountNumberChange] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [noAc, setNoAc] = useState(false);
  const [amount, setAmount] = useState("");
  const [rejReason, setRejReason] = useState("");
  const [reference, setReference] = useState("");
  const [narration, setNarration] = useState("");
  const [withdrawalBy, setWithdrawalBy] = useState("");
  const [contact, setContact] = useState("233");
  const [isThirdParty, setisThirdParty] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [inWord, setInWord] = useState("");
  const [sourceOfFund, setSourceOfFund] = useState("");
  const [narration2, setNarration2] = useState("");
  const [denomination, setDenomination] = useState(false);
  const [ThirdPartyModal, setThirdPartyModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [prevAmount, setPrevAmount] = useState("");
  const [R, setR] = useState(false);

  const [validate, setValidate] = useState(false);
  const [appCheck, setAppCheck] = useState(false);
  const [validateResponse, setValidateResponse] = useState(false);
  const [approved, setApproved] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState("");
  const [notSuffice, setNotSuffice] = useState(false);
  const [classCode, setClassCode] = useState("");

  const {
    approvalClick,
    setApprovalClick,
    setApprovalData,
    generalData,
    refreshApproval,
    setRefreshApproval,
  } = useContext(globalContext);
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  function handlePostRejectedTrans() {
    axios
      .post(
        API_SERVER + "/api/transaction-validation",
        {
          vaultAccount: JSON.parse(localStorage.getItem("userInfo")).id,
          amount,
          accountNumber,
          batchNo,
          narration,
          branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
          key: "approval",
        },
        { headers }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Pending Approval",
          showConfirmButton: false,
          timer: 1500,
        });
        // setValidate(false);
        setChecked(!checked);
      });
    document.getElementById("accountNumber").focus();
  }

  // useEffect(() => {
  //   let isFirstMount = true;
  //   if (rejReason && !isFirstMount) {
  //     handlePostRejectedTrans();
  //   }
  //   isFirstMount = false;
  // }, [okClick]);

  console.log(approvalClick, "pp");
  useEffect(() => {
    console.log("responsexxxxx", approvalClick, { generalData });
    if (approvalClick) {
      setSelectedApproval(approvalClick);
      handleApprovedChange(approvalClick);
    }
  }, [approvalClick]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        document.getElementById("reference")?.focus();
      }, 1000);
      setAmount(prevAmount);
    }
  }, [success]);

  useEffect(() => {
    if (accountDetails) {
      if (accountDetails.summary?.length > 0) {
        setAccountName(accountDetails?.summary[0]?.account_name);
        setContact(accountDetails?.summary[0]?.phone);
        if (!selectedApproval) {
          document.getElementById("Amount")?.focus();
        }
      }
      if (!amount) {
        setSigVer(true);
      }
      console.log("acr", approvalClick);
      if (accountDetails.message) {
        // console.log("togo", accountDetails.message);

        setShowMessage(true);
        Swal.fire({
          title: "<div class='text-[17px] font-semibold'>ACCOUNT MESSAGE</div>",
          html: generateAccountMessageHtml(accountDetails?.message),
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            setShowMessage(false);
            document.getElementById("Amount")?.focus();
          }
        });

        function generateAccountMessageHtml(messages) {
          if (!messages || messages.length === 0) {
            return "<p>No messages to display.</p>";
          }

          return messages
            .map(
              (message) => `
                <div class="text-sm shadow-sm flex items-center space-x-2 rounded px-2 py-1 mb-2">
                <svg
                 xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                 stroke="currentColor"
                 class="w-6 h-6 stroke-green-500"
                >
                 <path
                   strokeLinecap="round"
        strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
               </svg>
                  <div class="">${message}</div>
                </div>
              `
            )
            .join("");
        }
      }

      if (
        (accountDetails?.summary[0]?.available_balance?.includes("*")
          ? 0.0
          : parseFloat(
              accountDetails?.summary[0]?.available_balance?.replaceAll(",", "")
            )) < parseFloat(amount?.replaceAll(",", ""))
      ) {
        axios
          .post(
            API_SERVER + "/api/get-error-message",
            { code: "06510" },
            { headers }
          )
          .then((response) => {
            swal({
              // title: "Required ",
              text: response.data,
              icon: "warning",
              buttons: "OK",
            }).then((res) => {
              if (res) {
                if (approvalClick) {
                  setApprovalClick("");
                  setApprovalData("");
                }
                // localStorage.setItem("approval", "0");
                setAccountNumber("");
                setAccountNumberChange("");
                setActiveAccountNumber("");
                setAccountName("");
                setSelectedApproval("");
                setAmount("");

                setChecked(!checked);
              }
            });
          });
        return;
        // }
      } else if (amount !== "") {
        if (!rejReason) {
          setDenomination(true);
        }
      }
    }

    return () => {
      setApprovalClick("");
      setApprovalData("");
    };
  }, [accountDetails]);

  const eDate = new Date(
    JSON.parse(localStorage.getItem("userInfo"))?.postingDate
  );
  const value_date = eDate
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "/");

  useEffect(() => {
    // format(8494849);
    setFormData({
      accountNumber,
      valueDate: value_date,
      amount: parseFloat(amount) ? parseFloat(amount) : amount,
      reference,
      isThirdParty,
      narration,
      withdrawalBy,
      email:
        accountDetails?.summary?.length > 0
          ? accountDetails?.summary[0]?.email?.trim()
          : "",
      accountName,
      ledgerBalance:
        accountDetails?.summary?.length > 0
          ? accountDetails?.summary[0]?.ledger_balance?.trim()
          : "",
      availableBalance:
        accountDetails?.summary?.length > 0
          ? accountDetails?.summary[0]?.available_balance?.trim()
          : "",
      contact,
    });
  }, [
    narration,
    withdrawalBy,
    amount,
    reference,
    isThirdParty,
    narration,
    withdrawalBy,
    accountDetails,
    contact,
  ]);

  useEffect(() => {
    const getSourceofFund = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "SOF",
          },
          { headers }
        )
        .then(function (response) {
          console.log({ response });
          setSourceOfFund(response.data);
        });
    };

    const approvedTrans = () => {
      axios
        .post(
          API_SERVER + "/api/cash-withdrawal",
          {
            key: "approved-CAW",
            username: JSON.parse(localStorage.getItem("userInfo")).id,
          },
          { headers }
        )
        .then(function (response) {
          console.log({ response });
          setApproved(response.data);
        });
    };

    approvedTrans();
    getSourceofFund();
  }, []);

  function handleNew() {
    setAccountNumber("");
    // setRejReason("");
    // setValueDate: value_date,
    setActiveAccountNumber("");
    setAccountNumberChange("");
    setAmount("");
    setReference("");
    setisThirdParty(false);
    setNarration("CASH WITHDRAWAL");
    setWithdrawalBy("");
    setContact("233");
    setOtherInfo("");
    setAccountName("");
    setSuccess(false);
    setPrevAmount("");
    setAppCheck(false);
    setValidate(false);
    setR(false);
    setRejReason("");
    setAccountDetails("");
    setClassCode("");
    setSelectedApproval("");
    document.getElementById("accountNumber")?.focus();
  }
  useEffect(() => {
    handleNew();
  }, [checked]);

  function onBlur(e) {
    checkInternetConnection();
    setAccountNumber(e.target.value);
    // getAccountName();
  }

  function onKeyPress(e) {
    checkInternetConnection();
    if (e.key === "Enter") {
      e.persist();
      // setAccountNumberChange(e.target.value);
      axios
        .post(
          API_SERVER + "/api/validateAcctNumber",
          {
            accountNumber: accountNumber,
          },
          { headers }
        )
        .then(async (response) => {
          if (!response?.data?.success) {
            const response = await axios.post(
              API_SERVER + "/api/get-error-message",
              { code: "01330" },
              { headers }
            );

            swal({
              text: response.data,
              icon: "warning",
              buttons: "OK",
              dangerMode: true,
            }).then((result) => {
              if (result) {
                var input = document.getElementById("accountNumber");
                input.focus();
                setAccountName("");
                setAccountNumberChange("");
              }
            });
          } else {
            // switchFocus(e, "Amount");
            // var input = document.getElementById("Amount");
            // input.focus();
            const response = await axios.post(
              API_SERVER + "/api/cash-withdrawal",
              {
                account_number: accountNumber,
                key: "validate",
              },
              { headers }
            );

            console.log(response, "gh");

            if (response.data === true) {
              axios
                .post(
                  API_SERVER + "/api/get-error-message",
                  { code: "06743" },
                  { headers }
                )
                .then((res) => {
                  Swal.fire({
                    allowOutsideClick: false,
                    icon: "warning",
                    text: res.data,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setChecked(!checked);
                    }
                  });
                });
            } else {
              setAccountNumberChange(e.target.value);
            }
          }
        });
    }
  }

  function onAccountNumberChange(e) {
    setAccountNumber(e.target.value);
    setActiveAccountNumber(e.target.value);
  }

  function onAmountChange(e) {
    const inputValue = e.target.value;
    // setAmount(inputValue);

    if (/^[0-9]*(?:\.[0-9]*)?$/.test(inputValue)) {
      setAmount(inputValue);
    } else if (inputValue?.includes(",")) {
      setAmount(inputValue.replaceAll(",", ""));
    }
  }

  function onReference(e) {
    setReference(e.target.value);
  }

  function onNarrationChange(e) {
    setNarration(e.target.value);
    // setFormData((prev) => ({ ...prev, narration: narration }));
  }

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      if (e.target.id === "Amount") {
        // console.log(formatNumber(parseFloat(e.target.value)), "ghanananan");
        setAmount(formatNumber(parseFloat(e.target.value)));
        // setDenomination(true);
      }
      document.getElementById(nextFieldId).focus();
    }
  }
  function handleSelected(value) {
    setAccountNumberChange(value?.accountNumber);
    setAccountNumber(value?.accountNumber);
    setActiveAccountNumber(value?.accountNumber);
    document.getElementById("Amount").focus();
    setShowModal(false);
  }

  function onNarrationChange(e) {
    setNarration(e.target.value);
    // setFormData((prev) => ({ ...prev, narration: narration }));
  }

  console.log({ validate, success, amount, prevAmount, noAc });
  function onNarration2Change(e) {
    setNarration2(e.target.value);
    // setFormData((prev) => ({ ...prev, narration: narration }));
  }

  async function handleApprovedChange(value) {
    handleNew();
    const response = await axios.post(
      API_SERVER + "/api/cash-withdrawal",
      {
        batch_no: value,
        key: "approval-details",
        approvalStatus: generalData?.approvalStatus,
        username: JSON.parse(localStorage.getItem("userInfo")).id,
      },
      { headers }
    );

    if (response?.data?.length > 0) {
      console.log({ response }, "responsessssss");
      // return;

      setClassCode(response?.data[0][4]);

      setBatchNo(response?.data[0][2]);
      setRejReason(response?.data[0][3]);
      if (response?.data[0][4] == "N") {
        Swal.fire({
          allowOutsideClick: false,
          title:
            "<div class='text-[17px] text-red-600 font-semibold'>REJECTED TRANSACTION (NOT AMENDABLE)</div>",
          html: `<div class='text-[17px] font-semibold'>
          <div class='font-semibold uppercase mb-2'>
          Rejection Reason
          </div>
          <div>
          "${response?.data[0][3]}"
          </div>
          </div>`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            setChecked(!checked);
            document.getElementById("accountNumber")?.focus();
          }
        });
        return;
      }
      setAccountNumberChange(response?.data[0][0]);
      setAccountNumber(response?.data[0][0]);
      setActiveAccountNumber(response?.data[0][0]);

      setAmount(formatNumber(parseFloat(`${response?.data[0][1]}`)));

      if (!response?.data[0][3]) {
        setAppCheck(true);
      }
    }
  }

  useEffect(() => {
    if (showMessage) {
      Swal.fire({
        title: "<div class='text-[17px] font-semibold'>ACCOUNT MESSAGE</div>",
        html: generateAccountMessageHtml(accountDetails?.message),
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setShowMessage(false);
          document.getElementById("Amount")?.focus();
        }
      });

      function generateAccountMessageHtml(messages) {
        if (!messages || messages.length === 0) {
          return "<p>No messages to display.</p>";
        }

        return messages
          .map(
            (message) => `
              <div class="text-sm shadow-sm flex items-center space-x-2 rounded px-2 py-1 mb-2">
              <svg
               xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
               stroke="currentColor"
               class="w-6 h-6 stroke-green-500"
              >
               <path
                 strokeLinecap="round"
      strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
             </svg>
                <div class="">${message}</div>
              </div>
            `
          )
          .join("");
      }
    }
  }, [showMessage]);

  useEffect(() => {
    if (validate) {
      Swal.fire({
        allowOutsideClick: false,
        showDenyButton: true,
        denyButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Proceed",
        denyButtonText: "Cancel",
        icon: "info",

        html: ` <div class="text-sm">${validateResponse}</div>`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              API_SERVER + "/api/transaction-validation",
              {
                vaultAccount: JSON.parse(localStorage.getItem("userInfo")).id,
                amount,
                accountNumber,
                batchNo,
                narration,
                branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
                key: "approval",
              },
              { headers }
            )
            .then((res) => {
              Swal.fire({
                icon: "success",
                text: "Pending Approval",
                showConfirmButton: false,
                timer: 1500,
              });
              setValidate(false);
              setChecked(!checked);
            });
          document.getElementById("accountNumber").focus();
        } else if (result.isDenied) {
          setAmount("");
          setValidate(false);
        }
      });
    }
  }, [validate]);

  function AccountMessage() {
    return (
      <div
        className="border-4 rounded  bg-[#ffffffbc] backdrop-filter backdrop-blur-sm"
        style={{ zoom: "85%" }}
      >
        <div className="font-semibold border-b-2 flex justify-between uppercase py-2 px-1  text-gray-800">
          <div>Account Message</div>
          <svg
            onClick={(e) => {
              setShowMessage(false);
              // switchFocus(e, "Amount");
              document.getElementById("Amount")?.focus();
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 stroke-red-500 font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="p-2   text-gray-800  ">
          <div className="flex font-semibold space-x-3 items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <div>Please Note :</div>
          </div>

          {accountDetails?.message?.map((i, key) => (
            <div className="bg-[#d1d1d1] shadow-sm flex items-center space-x-2 rounded  px-2 py-1 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 stroke-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>{i}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // function AccountValidate() {
  //   return (
  //     <div
  //       className="border-4 rounded  bg-[#ffffffbc] backdrop-filter backdrop-blur-sm"
  //       style={{ zoom: "85%" }}
  //     >
  //       <div className="font-semibold border-b-2 flex justify-between uppercase py-2 px-1  text-gray-800">
  //         <div>Account Validation</div>
  //         <svg
  //           onClick={() => {
  //             setValidate(false);
  //             setR(true);
  //             setChecked(!checked);
  //           }}
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           strokeWidth={1.5}
  //           stroke="currentColor"
  //           className="w-6 h-6 stroke-red-500 font-bold"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             d="M6 18L18 6M6 6l12 12"
  //           />
  //         </svg>
  //       </div>
  //       <div className="p-2   text-gray-800  ">
  //         <div className="flex font-semibold space-x-3 items-center mb-2">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="w-6 h-6 stroke-blue-400"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
  //             />
  //           </svg>
  //           <div>Please Note :</div>
  //         </div>

  //         <div className="bg-[#d1d1d1] shadow-sm flex items-center space-x-2 rounded  px-2 py-1 mb-2">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="w-8 h-8 stroke-green-500"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //             />
  //           </svg>
  //           <div>{validateResponse}</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (denomination === true) {
      setPrevAmount(amount);
    }
  }, [denomination]);
  // console.log({ validate, success, amount, prevAmount });
  return (
    <>
      <Denominations
        showModal={denomination}
        setChecked={setChecked}
        appCheck={appCheck}
        setAmount={setAmount}
        amount={amount}
        checked={checked}
        setSuccess={setSuccess}
        prevAmount={prevAmount}
        setPrevAmount={setPrevAmount}
        setShowModal={setDenomination}
        setDenominationEntries={setDenominationEntries}
        currency_code={
          accountDetails.summary?.length > 0
            ? accountDetails?.summary[0]?.currency_code
            : null
        }
        transType={"O"}
      />

      <ThirdPartyModalX
        setContact={setContact}
        showModal={ThirdPartyModal}
        setShowModal={setThirdPartyModal}
        setisThirdParty={setisThirdParty}
        isThirdParty={isThirdParty}
        setThirdPartyEntries={setThirdPartyEntries}
      />

      <div className="">
        <div className=" rounded h-auto pb-2 pt-2 px-2 -mb-20  bg-white ">
          <div
            style={{
              background: "#daecfe",
            }}
            className=" uppercase py-1 px-3 mb-2 font-bold text-gray-800"
          >
            Cash Withdrawal
          </div>
          <div className="w-full flex  my-2 px-2 ">
            {/* <div className="w-[50%] "> */}
            {/* <ListOfValue
              label={"Approved Transactions"}
              labelWidth={"12%"}
              id={"approvedTrans"}
              inputWidth={"44.5%"}
              data={approved}
              value={selectedApproval}
              onChange={(value) => {
                setSelectedApproval(value);
                handleApprovedChange(value);
              }}
            /> */}
            {/* </div> */}
          </div>
          {rejReason && (
            <div className="bg-red-200 p-3 rounded text-red-500 flex justify-between items-center mb-2">
              <div className="flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gh"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 mr-2 fill-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <span className="font-semibold mr-2">Rejection Reason:</span>
                <span>{rejReason}</span>
              </div>
              <div className="font-semibold border-2 rounded px-2 py-1 border-white">
                {(classCode == "Y" || classCode == "" || !classCode) && (
                  <span className="text-gray-800">AMENDABLE</span>
                )}
              </div>
            </div>
          )}
          <div
            style={{ width: "100%" }}
            className="wrapper border-2  rounded  md:flex  "
          >
            <hr />

            <div className="md:w-[65%] rounded py-2 px-3     md:mr-2 md:mb-0 first  ">
              <div className=" w-full  mb-[28px]">
                <div className="w-[63%] mb-2  flex items-center">
                  <InputField
                    label={"Debit Account"}
                    labelWidth={"35.2%"}
                    inputWidth={"58.5%"}
                    required={true}
                    type={"number"}
                    disabled={appCheck}
                    id={"accountNumber"}
                    name={"accountNumber"}
                    value={accountNumber}
                    onBlur={(e) => {
                      if (e.target.value !== "") {
                        onKeyPress(e);
                      }
                    }}
                    onKeyPress={(e) => {
                      onKeyPress(e);
                      // switchFocus(e, "Amount");
                    }}
                    onChange={onAccountNumberChange}
                  />
                  <ButtonComponent
                    onClick={() => {
                      setShowModal(true);
                    }}
                    label="Search"
                    buttonWidth="20%"
                    buttonHeight="30px"
                    buttonColor="white"
                  />
                  <FindBy
                    setShowModal={setShowModal}
                    showModal={showModal}
                    handleSelected={handleSelected}
                  />
                </div>
                {/* <div className="w-[35%]">
                  <InputField
                    label={"Value Date"}
                    labelWidth={"35%"}
                    inputWidth={"65%"}
                    name={"valueDate"}
                    disabled={true}
                    value={`${day}/${month}/${year}`}
                  />
                </div> */}
                <div className="flex items-center w-[100%] mb-2">
                  <div className="w-[100%]">
                    <InputField
                      label={"Account Name"}
                      labelWidth={"18%"}
                      inputWidth={"70%"}
                      disabled={true}
                      name={"accountName"}
                      value={accountName}
                      // setFormData={setFormData}
                      // onChange={(e) => handleChange(e, "amount")}
                    />
                  </div>
                </div>
              </div>
              {/* <hr className="mb-[10px] mt-0 my-3" /> */}
              <div className="mb-[28px]">
                <div className=" mb-2">
                  <InputField
                    id={"Amount"}
                    label={"Amount "}
                    value={amount}
                    labelWidth={"18%"}
                    inputWidth={"30%"}
                    required={true}
                    textAlign={"right"}
                    disabled={appCheck}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (accountNumber === "") {
                          setNoAc(true);
                          axios
                            .post(
                              API_SERVER + "/api/get-error-message",
                              { code: "06497" },
                              { headers }
                            )
                            .then((response) => {
                              swal({
                                // title: "Required ",
                                text: response.data,
                                icon: "warning",
                                buttons: "OK",
                              }).then((res) => {
                                if (res) {
                                  document
                                    .getElementById("accountNumber")
                                    .focus();
                                  setAmount("");
                                }
                              });
                            });
                        } else if (
                          (accountDetails?.summary[0]?.available_balance?.includes(
                            "*"
                          )
                            ? 0.0
                            : parseFloat(
                                accountDetails?.summary[0]?.available_balance?.replaceAll(
                                  ",",
                                  ""
                                )
                              )) < parseFloat(amount?.replaceAll(",", ""))
                        ) {
                          setNotSuffice(true);

                          axios
                            .post(
                              API_SERVER + "/api/get-error-message",
                              { code: "07132" },
                              { headers }
                            )
                            .then((response) => {
                              swal({
                                // title: "Required ",
                                text: response.data,
                                icon: "warning",
                                buttons: "OK",
                              }).then((res) => {
                                if (res) {
                                  setNotSuffice(false);
                                  setAmount("");
                                  document.getElementById("Amount").focus();
                                }
                              });
                            });
                          return;
                        } else if (
                          e.target.value !== "" ||
                          parseFloat(e.target.value) !== 0
                        ) {
                          axios
                            .post(
                              API_SERVER + "/api/transaction-validation",
                              {
                                vaultAccount: JSON.parse(
                                  localStorage.getItem("userInfo")
                                ).id,
                                amount,
                                accountNumber,
                                batchNo,
                                branch: JSON.parse(
                                  localStorage.getItem("userInfo")
                                ).branchCode,
                              },
                              { headers }
                            )
                            .then((response) => {
                              console.log("validate", response.data);
                              if (
                                response.data?.responseMessage &&
                                !rejReason
                              ) {
                                setValidateResponse(
                                  response.data.responseMessage
                                );
                                setValidate(true);
                              } else {
                                // setAmount(amount);
                                // console.log({a})
                                if (!rejReason) setDenomination(true);
                              }
                            });
                        }
                      }

                      // return e.charCode >= 48 && e.charCode <= 57;
                    }}
                    onChange={onAmountChange}
                    onBlur={(e) => {
                      if (
                        (e.target.value.trim() !== "" ||
                          e.target.value !== undefined,
                        parseFloat(e.target.value) !== 0)
                      ) {
                        axios
                          .post(
                            API_SERVER + "/api/transaction-validation",
                            {
                              vaultAccount: JSON.parse(
                                localStorage.getItem("userInfo")
                              ).id,
                              amount,
                              accountNumber,
                              batchNo,
                              branch: JSON.parse(
                                localStorage.getItem("userInfo")
                              ).branchCode,
                            },
                            { headers }
                          )
                          .then((response) => {
                            console.log("validate", response.data);
                            if (
                              response.data?.responseMessage &&
                              !rejReason &&
                              !sigVer
                            ) {
                              setValidateResponse(
                                response.data.responseMessage
                              );
                              // setValidate(true);
                            } else {
                              if (!(amount === "")) {
                                setAmount(
                                  formatNumber(
                                    parseFloat(
                                      e.target.value?.replaceAll(",", "")
                                    )
                                  )
                                );
                                if (
                                  parseFloat(amount.replaceAll(",", "")) !==
                                    parseFloat(
                                      prevAmount.replaceAll(",", "")
                                    ) &&
                                  !validate &&
                                  !noAc &&
                                  amount !== "" &&
                                  !notSuffice &&
                                  !R &&
                                  !rejReason
                                ) {
                                  // console.log("ghananaana");
                                  swal({
                                    allowOutsideClick: false,

                                    text: success
                                      ? "Kindly re-enter the denominations as the amount has been altered"
                                      : "Kindly enter the denominations ",
                                    icon: "warning",
                                    buttons: "Proceed",
                                    dangerMode: true,
                                  }).then((result) => {
                                    if (result) {
                                      setDenomination(true);
                                    }
                                  });
                                  // setDenomination(true);
                                }
                              }
                            }
                          });

                        return;
                      }
                    }}
                  />
                </div>
                <div className=" mb-2">
                  <InputField
                    id={"voucherRef"}
                    label={"Charges"}
                    labelWidth={"18%"}
                    inputWidth={"30%"}
                    // value={reference}
                    disabled={true}
                  />
                </div>
                <div className=" mb-2">
                  <InputField
                    id={"reference"}
                    label={"Reference"}
                    labelWidth={"18%"}
                    inputWidth={"30%"}
                    onChange={onReference}
                    value={reference}
                    onKeyPress={(e) => {
                      switchFocus(e, "thirdParty");
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className=" ">
                  <div className=" mb-2 flex items-center ">
                    <label className="w-[18%] poppins-regular text-[80%] text-gray-600 text-right mr-[20px] whitespace-nowrap">
                      Third Party Transaction
                    </label>
                    <input
                      id={"thirdParty"}
                      checked={isThirdParty}
                      type="checkbox"
                      className="h-[13px] w-[13px] border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-sm ring-offset-0"
                      onChange={(e) => {
                        setThirdPartyModal(true);
                        // if (e.target.checked) {
                        //   setisThirdParty(true);
                        // } else {
                        //   setisThirdParty(false);
                        //   setThirdPartyModal(false);
                        // }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setTimeout(() => {
                            document.getElementById("narration1").focus();
                          }, 0);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" md:w-[35%] py-2  rounded px-4 ">
              <AccountSummary
                transType={"CAW"}
                accountNumber={accountNumberChange}
                setAccountDetails={setAccountDetails}
              />
            </div>
          </div>
          <div className="space-y-2  px-2 py-3 border-2 rounded mt-2">
            <InputField
              id={"narration1"}
              labelWidth={"12%"}
              inputWidth={"44.5%"}
              label={"Narration 1"}
              required={true}
              onChange={onNarrationChange}
              value={narration}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setTimeout(() => {
                    document.getElementById("narration2").focus();
                  }, 0);
                }
              }}
            />
            <InputField
              labelWidth={"12%"}
              inputWidth={"44.5%"}
              // labelWidth={"14.5%"}
              id={"narration2"}
              // inputWidth={"50%"}
              label={"Narration 2"}
              // required={true}
              value={narration2}
              onChange={onNarration2Change}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CashWithdrawal;
