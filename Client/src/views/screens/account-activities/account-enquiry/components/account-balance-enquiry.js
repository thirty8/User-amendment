import { React, useState, useEffect } from "react";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { Modal } from "@mantine/core";
import { Tabs } from "@mantine/core";
import swal from "sweetalert";

import { API_SERVER } from "../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import DataTable from "../../../../../components/others/customtable";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import PrintStatement from "./account-balance-enquiry-modals/print-statement";
import ImageVerification from "../../../../../components/others/ImageVerification";
import PhotoSignatureVerification from "./account-balance-enquiry-modals/photoSignatureVerification";
import Spinner from "../../../../../components/others/Spin";
import SearchModal from "../../../trans-processes/back-office/shares-transfer/components/SearchModal";
import "../../account-enquiry/customer-search.css";

import BatchTransaction from "../components/account-balance-enquiry-modals/batch-trans";
import TransDetails from "../components/account-balance-enquiry-modals/trans-details";
import BalanceAccountDetails from "../components/account-balance-enquiry-modals/balance-account-details";
import AccountHolders from "./account-balance-enquiry-modals/account-holders";
import BlockedAmount from "./account-balance-enquiry-modals/blocked-amount-modal";
import FloatTransaction from "./account-balance-enquiry-modals/float-transaction";
import DebitLimit from "./account-balance-enquiry-modals/debitLimit";
import CreditLimit from "./account-balance-enquiry-modals/credit-limit";
import CustomerSearchByName from "./customer-search-by-name";
import CustomerDetails from "./customer-search-modals/customer-details";
import CustomButtons from "../../../../../components/others/CustomButtons";
import ProductDetails from "./account-balance-enquiry-modals/product-details";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const smsHeader = {
  "x-api-key": "usgnotificationtest",
  "Content-Type": "application/json",
};

function AccountBalanceEnquiry({ state, ACnumber, setMatrixState }) {
  const [relationNo, setRelationNo] = useState("");
  const [balanceBroughtForward, setBalanceBroughtForward] = useState("");
  const [showAccountBalanceDetails, setShowAccountBalanceDetails] =
    useState(false);
  const [printStatement, setPrintStatement] = useState(false);
  const [sendbySMS, setSendbySMS] = useState(false);
  const [NoH, setNoH] = useState([]);
  let holders = [];
  let holdersSignatories = [];
  const [holdSignatories, setHoldSignatories] = useState([]);
  let mobileNumbers = [];
  const [mob, setMob] = useState([]);
  const [NoOfHolders, setNoOfHolders] = useState(false);
  const [products, setProducts] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [tab1, setTab1] = useState("gallery");
  const handleTabChange = (newValue) => {
    setTab1(newValue);
  };

  const openPrintStatement = () => {
    setPrintStatement(true);
  };
  const closePrintStatement = () => {
    setPrintStatement(false);
  };

  const openSendbySMS = () => {
    setSendbySMS(true);
    swal({
      title: "No Contact Number",
      text: "The contact number could not be found in our records..",
      icon: "warning",
      buttons: "OK",
      dangerMode: true,
    });
  };
  const closeSendbySMS = () => {
    setSendbySMS(false);
  };

  const tabsData = [
    {
      value: "default",
      label: "Setup Balance Sheet Co..",
      component: <CustomerSearchByName />,
    },
    {
      value: "tab-2",
      label: "Balance Sheet - Hierachical",
      component: <CustomerDetails />,
    },
  ];

  let turnedCheques = [];
  const [turnCheques, setTurnCheques] = useState([]);
  let statistics = [];
  const [stats, setStats] = useState([]);
  let services = [];
  const [serv, setServ] = useState([]);

  const [batchNumberr, setBatchNumberr] = useState("");
  const [transNo, setTransNo] = useState("");
  const [activeTab, setActiveTab] = useState(tabsData[0].value);

  let transDetails = [];

  // const handleMouseEnter = () =>
  // {
  //   document.getElementById("kk").style.color= '#047fc0';
  //   document.getElementById("kick").style.color= '#047fc0';

  // }

  // const handleMouseLeave = ()=> {
  //   document.getElementById("kk").style.color= 'black';
  //   document.getElementById("kick").style.color= 'black';

  // }
  const [finalSum, setFinalSum] = useState("");
  let sum = 0;
  const [debitSum, setDebitSum] = useState("");
  let dSum = 0;

  const [customerNumber, setCustomerNumber] = useState("");

  const [bbg, setbbg] = useState([]);
  const [data, setData] = useState([]);

  const [passportVerification, setPassportVerification] = useState("");
  //Sub-Modals
  const [showSig, setShowSig] = useState(false);
  const handleSig = () => {
    setShowSig(true);
  };
  const closeSig = () => {
    setShowSig(false);
  };

  const [showPhotoSig, setShowPhotoSig] = useState(false);
  const handlePhotoSigVerification = () => {
    setShowPhotoSig(true);
  };
  const closePhotoSigVerification = () => {
    setShowPhotoSig(false);
  };

  const [showBatchTrans, setShowBatchTrans] = useState(false);
  const openBatchTrans = () => {
    setShowBatchTrans(true);
  };
  const closeBatchTrans = () => {
    setShowBatchTrans(false);
  };

  const [showTransDetails, setShowTransDetails] = useState(false);
  const openTransDetails = () => {
    setShowTransDetails(true);
  };
  const closeTransDetails = () => {
    setShowTransDetails(false);
  };

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberFromSearchModal, setAccountNumberFromSearchModal] =
    useState("");
  const [AcN, setAcN] = useState("");

  const [balanceAccountDetailsModal, setBalanceAccountDetailsModal] =
    useState(false);
  const openBalanceAccountDetailsModal = () => {
    setBalanceAccountDetailsModal(true);
  };
  const closeBalanceAccountDetailsModal = () => {
    setBalanceAccountDetailsModal(false);
  };

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  // const date = document.getElementById("end Date");
  // console.log(date,"::;asdfsfasdfsdf")

  const [findById, setFindById] = useState(false);
  const openFindByIDmodal = () => {
    setFindById(true);
  };

  function handleSelected(value) {
    console.log(value.accountNumber, "ghaa");
    setAccountNumber(value.accountNumber);
    setAccountNumberFromSearchModal(value.accountNumber);
    document.getElementById("accNumber11").value = value.accountNumber;
    setFindById(false);
  }

  const openNoOfHolders = () => {
    setNoOfHolders(true);
    handleNumberOfHolders();
  };

  const closeNoOfHolders = () => {
    setNoOfHolders(false);
  };

  const openProducts = () => {
    setProducts(true);
  };

  const closeProducts = () => {
    setProducts(false);
  };

  function formatDate(startDate) {
    // Parse the input date
    const sDate = new Date(startDate);

    // // Add 1 day to the date
    // sDate.setDate(sDate.getDate() + 1);

    // Create an array of month abbreviations
    const monthAbbreviations = [
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

    // Format the date in "dd-MMM-yyyy" format with lowercase month abbreviation
    const day = String(sDate.getDate()).padStart(2, "0");
    const month = monthAbbreviations[sDate.getMonth()].toLowerCase();
    const year = sDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  const handleNumberOfHolders = () => {
    // console.log(customersNumber, "customersNumber");
    axios
      .post(
        API_SERVER + "/getNoOfHolders",
        {
          accountNumber: accountNumber,
        },
        { headers }
      )
      .then((response) => {
        let results = response.data;
        results.map((i) => {
          mobileNumbers.push(i.phone1);
        });

        results.map((i) => {
          // console.log("iiiiiiiiiiiiiiiiiii", i)
          holdersSignatories.push([
            i.relation_no,
            i.first_name,
            i.middle_name,
            i.surname,
            i.date_established,
            i.phone1,
            i.email_address,
            i.gender,
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonComponent
                label={"Sign. Ver"}
                buttonHeight={"30px"}
                buttonWidth={"70%"}
                buttonIcon={CustomButtons["sigVer"].icon}
                buttonBackgroundColor={CustomButtons["sigVer"].bgColor}
                onClick={() => {
                  setRelationNo(i.relation_no);
                  handlePhotoSigVerification();
                }}
              />
            </div>,
          ]);
        });

        setMob(mobileNumbers);
        // setNoH(holders);
        setHoldSignatories(holdersSignatories);
        // console.log(holders, "sr");
        // console.log(NoH, "noh");
      });

    axios
      .post(
        API_SERVER + "/getOtherDetails",
        {
          customerNumber: stateOne.customerNumber,
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "response");
        let results = response.data;
        results.map((i) => {
          holders.push([
            i.relation_no,
            i.relation_name,
            i.date_established,
            i.contact,
            i.email,
            null,
          ]);
        });
        setNoH(holders);
      });
  };
  // handleNumberOfHolders();
  // setNoOfHolders(true);

  const [clearFieldsArray, setClearFieldsArray] = useState([]);
  let blocked = [];
  const [BA, setBA] = useState([]);
  const [BlockedAmountModal, setBlockedAmountModal] = useState(false);
  const openBlockedAmount = () => {
    const handleBlockedAmount = () => {
      console.log(accountNumber, "dikdmkod");
      axios
        .post(
          API_SERVER + "/getBlockedAmount",
          {
            accountNumber: accountNumber,
          },
          { headers }
        )
        .then((response) => {
          let results = response.data;
          console.log(results, "fffffffifa");
          results.map((i) => {
            blocked.push([
              i.posted_by,
              i.branch,
              <div style={{ textAlign: "left" }}>{i.narration}</div>,
              <div style={{ textAlign: "right" }}>
                {formatNumber(i.db_amt)}
              </div>,
            ]);
            console.log(i, "jogging");
          });
          setBA(blocked);
        });
    };
    handleBlockedAmount();
    setBlockedAmountModal(true);
  };
  const closeBlockedAmount = () => {
    setBlockedAmountModal(false);
  };

  let uncleared = [];
  const [UCB, setUCB] = useState([]);
  const [FloatTransax, setFloatTransax] = useState(false);
  const openFloatTransax = () => {
    const handleUnclearedBalances = () => {
      console.log(accountNumber, "dikdmkod");
      axios
        .post(
          API_SERVER + "/getUnclearedBalances",
          {
            accountNumber: accountNumber,
          },
          { headers }
        )
        .then((response) => {
          let results = response.data;
          results.map((i) => {
            uncleared.push([
              i.value_date,
              <div style={{ textAlign: "left" }}>{i.transaction_details}</div>,
              <div style={{ textAlign: "right" }}>
                {formatNumber(i.local_equivalent_cr)}
              </div>,
              <div style={{ textAlign: "right" }}>
                {formatNumber(i.local_equivalent_db)}
              </div>,
              i.batch_no,
              i.branch_code,
              i.channel,
            ]);
          });
          console.log(results, "jsj");
          setUCB(uncleared);
        });
    };
    handleUnclearedBalances();
    setFloatTransax(true);
  };
  const closeFloaxTrans = () => {
    setFloatTransax(false);
  };

  const [AccountBlockageListModal, setAccountBlockageListModal] =
    useState(false);
  let blockeds = [];
  const [BlockedAccounts, setBlockedAccounts] = useState([]);
  const openAccountBlockageListModal = () => {
    const handleAccountStatus = () => {
      console.log(accountNumber, "dikdmkod");
      axios
        .post(
          API_SERVER + "/getAccountStatus",
          {
            accountNumber: accountNumber,
          },
          { headers }
        )
        .then((response) => {
          let results = response.data;
          results.map((i) => {
            blockeds.push([
              i.reason,
              i.date_altered,
              i.status_desc,
              i.branch_desc,
            ]);
          });
          console.log(results, "jsj");
          // console.log(debits,"sss");
          setBlockedAccounts(blockeds);
        });
    };
    handleAccountStatus();
    setAccountBlockageListModal(true);
  };
  const closeAccountBlockageListModal = () => {
    setAccountBlockageListModal(false);
  };
  let debits = [];
  const [DebitLimitModal, setDebitLimitModal] = useState(false);
  const [DBM, setDBM] = useState([]);
  const openDebitLimitModal = () => {
    const handleDebitLimit = () => {
      console.log(accountNumber, "dikdmkod");
      axios
        .post(
          API_SERVER + "/getDebitLimit",
          {
            accountNumber: accountNumber,
          },
          { headers }
        )
        .then((response) => {
          let results = response.data;
          results.map((i) => {
            debits.push([
              <div style={{ textAlign: "left" }}>{i.description}</div>,
              <div style={{ textAlign: "right" }}>
                {formatNumber(i.utilized_amount)}
              </div>,
              <div style={{ textAlign: "right" }}>
                {formatNumber(i.facility_amount)}
              </div>,
              i.interest_rate,
              i.effective_date,
              i.expiry_date,
              i.ultilization_expiry,
              i.penalty_rate,
              i.posted_by,
            ]);
          });
          console.log(results, "jsj");
          console.log(debits, "sss");
          setDBM(debits);
        });
    };
    handleDebitLimit();
    setDebitLimitModal(true);
  };
  const closeDebitLimitModal = () => {
    setDebitLimitModal(false);
  };

  let credits = [];
  // let sum = 0;
  const [creditLimitModal, setCreditLimitModal] = useState(false);
  const [CRM, setCRM] = useState([]);
  const openCreditLimitModal = () => {
    const handleCreditLimit = () => {
      console.log(accountNumber, "dikdmkod");
      axios
        .post(
          API_SERVER + "/getCreditLimit",
          {
            accountNumber: accountNumber,
          },
          { headers }
        )
        .then((response) => {
          let results = response.data;
          results.map((i) => {
            credits.push([
              i.lien_number,
              <div style={{ textAlign: "right" }}>
                {formatNumber(i.lien_amount)}
              </div>,
              i.expiry_date,
              i.effective_date,
              i.branch_code,
              i.posting_terminal,
              <div style={{ textAlign: "left" }}>{i.comments}</div>,
            ]);
          });
          console.log(results, "jsj");
          console.log(debits, "sss");
          setCRM(credits);
        });
    };
    handleCreditLimit();
    setCreditLimitModal(true);
  };
  const closeCreditLimitModal = () => {
    setCreditLimitModal(false);
  };

  //

  // console.log(accountNumber)
  //BATCHTRANS
  const [loaderSpinner, setLoaderSpinner] = useState(false);
  const [transNumber, setTransNumber] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [voucherNumber, setVoucherNumber] = useState("");
  const [terminalID, setTerminalID] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [contraAccount, setContraAccount] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [postingSystemDate, setPostingSystemDate] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [postingSystemTime, setPostingSystemTime] = useState("");
  const [channel, setChannel] = useState("");
  const [approvalSystemDate, setApprovalSystemDate] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [approvalSystemTime, setApprovalSystemTime] = useState("");
  const [stateOne, setStateOne] = useState({});
  // const [matrixState, setMatrixState] = useState({});
  const [stateTwo, setStateTwo] = useState({});
  const [transState, setTransState] = useState({});

  // ,APPROVED_BY,APPROVAL_SYS_TIME

  const getBalanceBroughtForward = () => {
    axios
      .post(
        API_SERVER + "/api/getBalanceBroughtForward",
        {
          accountNumber: accountNumber,
          startDate: formatDate(startDate),
        },
        { headers }
      )
      .then((response) => {
        let results = response.data[0];
        setBalanceBroughtForward(results.bal_forward);
        console.log(response, "gutttttt");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (accountNumberFromSearchModal.length > 5) {
      handleInput();
    }
  }, [accountNumberFromSearchModal]);

  const handleInput = (e) => {
    setData([]);

    setLoaderSpinner(true);
    // <OverlayLoader postLoader displayText color={"black"}/>

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

        if (data === undefined) {
          setLoaderSpinner(false);
          swal({
            title: "Invalid Account Number",
            text: "The account number could not be found in our records..",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          }).then((result) => {
            if (result) {
              var input = document.getElementById("accNumber11");
              input?.focus();
              // document.getElementsByClassName("dateField")[0].value = "";
              // document.getElementsByClassName("dateField")[1].value = "";
            }
          });
          setShowAccountBalanceDetails(false);
        } else {
          setLoaderSpinner(false);
          setShowAccountBalanceDetails(true);
          setClearFieldsArray(accountNumber.length);
          console.log(accountNumber, "numberaccount");
          console.log(data, "kkk");

          setStateOne((prevState) => ({
            ...prevState,
            currency: data?.currency_code,
            product: data?.prod_code,
            productCode: data?.prod_code,
            branch: data?.branch_code,
            description: data?.account_descrp,
            accountStatus: data?.status_indicator,
            crAccruedInterest: data?.cumulative_interest,
            dbAccruedInterest: data?.od_interest_amount,
            dbAccruedPenalty: data?.cot_amount,
            arrearsInterest: data?.arrears_int,
            arrearsInterestRate: data?.arrears_int_rate,
            crAccruedInterestRate: data?.cr_int_rate,
            dbAccruedInterestRate: data?.od_int_rate,
            dbAccruedPenaltyRate: data?.cot_rate,
            interestIntSuspense: data?.od_intin_susp,
            penaltyIntSuspense: data?.pen_intin_susp,
            arrearsIntSuspense: data?.arrears_intin_susp,
            debitLimit: data?.overdrawn_limit,
            creditLimit: data?.lien_amount,
            unclearedBalance: data?.shadow_uncleared,
            clearedBalance: data?.shadow_balance_today,
            ledgerBalance: data?.post_bookbal,
            availableBalance: data?.post_av_bal,
            totalArrears: data?.total_arrears,
            blockedAmount: data?.unapp_debit,
            numberOfHolders: data?.acct_holder,
            riskCode: data?.risk_code,
            customerNumber: data?.customer_number,
          }));
          document.getElementById("Start Date")?.focus();
          setMatrixState(data?.customer_number);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearFields = () => {
    setShowAccountBalanceDetails(false);
    setStateOne((prevState) => ({
      currency: "",
      product: "",
      branch: "",
      description: "",
      accountStatus: "",
      crAccruedInterest: "",
      dbAccruedInterest: "",
      dbAccruedPenalty: "",
      arrearsInterest: "",
      arrearsInterestRate: "",
      crAccruedInterestRate: "",
      dbAccruedInterestRate: "",
      dbAccruedPenaltyRate: "",
      interestIntSuspense: "",
      penaltyIntSuspense: "",
      arrearsIntSuspense: "",
      debitLimit: "",
      creditLimit: "",
      unclearedBalance: "",
      clearedBalance: "",
      ledgerBalance: "",
      availableBalance: "",
      totalArrears: "",
      blockedAmount: "",
      numberOfHolders: "",
      riskCode: "",
    }));
    setStartDate("");
    setEndDate("");
    setData([]);
    setTurnCheques([]);
    setStats([]);
    setServ([]);
    setMob([]);
    setBalanceBroughtForward("");
    // formatNumber(undefined);
  };
  useEffect(() => {
    if (accountNumber?.length !== clearFieldsArray) {
      clearFields();
    }
  }, [accountNumber]);

  console.log(stateOne);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleInput();
    }
  };

  const handleFetch = () => {
    console.log(formatDate(startDate), "sDate111");
    console.log(formatDate(endDate), "eDate111");
    console.log(accountNumber, "pooo");
    axios
      .post(
        API_SERVER + "/api/getTransac",
        {
          accountNumber: accountNumber,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "seseme");
        let results = response.data.response;
        if (results.length == 0) {
          swal({
            title: "WRN - 07235",
            text: "There are no transactions for the specified dates.",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          });
        } else {
          getBalanceBroughtForward();
          console.log(results, "eee");

          results.map((i) => {
            transDetails.push([
              i.posting_date,
              i.value_date,
              <div style={{ textAlign: "left" }}>{i.transaction_details}</div>,
              i.document_ref,
              <button
                className="batchTrans"
                onClick={(e) => {
                  setBatchNumberr(e.target.textContent);
                  openBatchTrans();
                }}
              >
                {i.batch_no}
              </button>,
              <div style={{ textAlign: "right" }}>
                {formattedNumber(i.debit)}
              </div>,
              <div style={{ textAlign: "right" }}>
                {formattedNumber(i.credit)}
              </div>,
              <div style={{ textAlign: "right" }}>
                {formattedNumber(i.balance)}
              </div>,
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonComponent
                  onClick={() => {
                    setTransNo(i.trans_no);
                    openTransDetails();
                  }}
                  buttonIcon={<AiOutlineEye size={20} />}
                  buttonHeight={"27px"}
                  buttonWidth={"27px"}
                  id="miniModalButton"
                  // buttonBackgroundColor={"#003366"}
                />
                {/* <button
                  className="transactionDetails"
                  onClick={(e) => {
                    setTransNo(e.target.textContent);
                    openTransDetails();
                  }}
                >
                  {" "}
                  {i.trans_no}
                </button> */}
              </div>,
            ]);
          });
          setData(transDetails);

          // for (let i = 0; i < results.length; i++) {
          //   const batch_no = results[i].batch_no;
          //   console.log({results})
          //   const document_ref = results[i].document_ref;
          //   const local_equivalent_cr = formattedNumber(results[i].credit);
          //   const local_equivalent_db = formattedNumber(results[i].debit);
          //   const posting_date = results[i].posting_date;
          //   const value_date = results[i].value_date;
          //   const transaction_details = results[i].transaction_details;
          //   const trans_no = results[i].trans_no;
          //   const Bal = formattedNumber(results[i].balance);

          //   // <MdOutlineRadioButtonUnchecked/>
          //   transDetails.push([
          //     posting_date,
          //     value_date,
          //     <div style={{ textAlign: "left" }}>{transaction_details}</div>,
          //     document_ref,
          //     <button
          //       className="batchTrans"
          //       onClick={(e) => {
          //         setBatchNumberr(e.target.textContent);
          //         openBatchTrans();
          //       }}
          //     >
          //       {batch_no}
          //     </button>,
          //     <div style={{ textAlign: "right" }}>
          //       {local_equivalent_db}
          //     </div>,
          //     <div style={{ textAlign: "right" }}>
          //       {local_equivalent_cr}
          //     </div>,
          //     <div style={{ textAlign: "right" }}>{Bal}</div>,
          //     <div style={{ display: "flex", justifyContent: "center" }}>
          //       <button
          //         className="transactionDetails"
          //         onClick={(e) => {
          //           setTransNo(e.target.textContent);
          //           openTransDetails();
          //         }}
          //       >
          //         {" "}
          //         {trans_no}
          //       </button>
          //     </div>,
          //   ]);
          // }
          // console.log(transNo, "heeeaa");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchReturnedCheques = () => {
    const sDate = new Date(startDate);
    const start_date = sDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    const eDate = new Date(endDate);
    const end_date = eDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    console.log(start_date, "sDate111");
    console.log(end_date, "eDate111");
    console.log(accountNumber, "pooo");
    axios
      .post(
        API_SERVER + "/api/getReturnedCheques",
        {
          accountNumber: accountNumber,
          startDate: start_date,
          endDate: end_date,
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "lets get it");
        let results = response.data;
        if (results.length == 0) {
          swal({
            title: "WRN - 07235",
            text: "There are no Returned Cheques for the specified dates.",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          });
        } else {
          console.log(results, "here");

          results.map((i) => {
            turnedCheques.push([
              i.cheque_number,
              i.return_date,
              <div style={{ textAlign: "left" }}>{i.reason}</div>,
              <div style={{ textAlign: "right" }}>
                {formatNumber(i.amount)}
              </div>,
            ]);
          });
          setTurnCheques(turnedCheques);

          // for (let i = 0; i < results.length; i++) {
          //   const batch_no = results[i].cheque_number;
          //   const document_ref = results[i].return_date;
          //   const local_equivalent_cr = results[i].credit;
          //   const local_equivalent_db = results[i].debit;
          //   const posting_date = results[i].posting_date;
          //   const value_date = results[i].value_date;
          //   const transaction_details = results[i].transaction_details;
          //   const trans_no = results[i].trans_no;
          //   const Bal = results[i].balance;

          //   // <MdOutlineRadioButtonUnchecked/>
          //   transDetails.push([
          //     posting_date,
          //     value_date,
          //     <div style={{ textAlign: "left" }}>{transaction_details}</div>,
          //     document_ref,
          //     <button
          //       className="batchTrans"
          //       onClick={(e) => {
          //         setBatchNumberr(e.target.textContent);
          //         openBatchTrans();
          //       }}
          //     >
          //       {batch_no}
          //     </button>,
          //     <div style={{ textAlign: "right" }}>
          //       {formatNumber(local_equivalent_db)}
          //     </div>,
          //     <div style={{ textAlign: "right" }}>
          //       {formatNumber(local_equivalent_cr)}
          //     </div>,
          //     <div style={{ textAlign: "right" }}>{formatNumber(Bal)}</div>,
          //     <div style={{ display: "flex", justifyContent: "center" }}>
          //       <button
          //         className="transactionDetails"
          //         onClick={(e) => {
          //           setTransNo(e.target.textContent);
          //           openTransDetails();
          //         }}
          //       >
          //         {" "}
          //         {trans_no}
          //       </button>
          //     </div>,
          //   ]);
          // }
          // console.log(transNo, "heeeaa");
          // setData(transDetails);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchStatistics = () => {
    const sDate = new Date(startDate);
    const start_date = sDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    const eDate = new Date(endDate);
    const end_date = eDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    console.log(start_date, "sDate111");
    console.log(end_date, "eDate111");
    console.log(accountNumber, "pooo");
    axios
      .post(
        API_SERVER + "/api/getStatistics",
        {
          accountNumber: accountNumber,
          startDate: start_date,
          endDate: end_date,
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "lets get it");
        let results = response.data;
        if (results.length == 0) {
          swal({
            title: "WRN - 07235",
            text: "There are no Statistics for the specified dates.",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          });
        } else {
          console.log(results, "here");

          results.map((i) => {
            statistics.push([
              i.month_date,
              i.highest_balance,
              i.lowest_balance,
              i.average_balance,
              i.debit_turnover,
              i.credit_turnover,
              i.cot,
              i.commission,
              i.interest,
            ]);
          });
          setStats(statistics);

          // for (let i = 0; i < results.length; i++) {
          //   const batch_no = results[i].cheque_number;
          //   const document_ref = results[i].return_date;
          //   const local_equivalent_cr = results[i].credit;
          //   const local_equivalent_db = results[i].debit;
          //   const posting_date = results[i].posting_date;
          //   const value_date = results[i].value_date;
          //   const transaction_details = results[i].transaction_details;
          //   const trans_no = results[i].trans_no;
          //   const Bal = results[i].balance;

          //   // <MdOutlineRadioButtonUnchecked/>
          //   transDetails.push([
          //     posting_date,
          //     value_date,
          //     <div style={{ textAlign: "left" }}>{transaction_details}</div>,
          //     document_ref,
          //     <button
          //       className="batchTrans"
          //       onClick={(e) => {
          //         setBatchNumberr(e.target.textContent);
          //         openBatchTrans();
          //       }}
          //     >
          //       {batch_no}
          //     </button>,
          //     <div style={{ textAlign: "right" }}>
          //       {formatNumber(local_equivalent_db)}
          //     </div>,
          //     <div style={{ textAlign: "right" }}>
          //       {formatNumber(local_equivalent_cr)}
          //     </div>,
          //     <div style={{ textAlign: "right" }}>{formatNumber(Bal)}</div>,
          //     <div style={{ display: "flex", justifyContent: "center" }}>
          //       <button
          //         className="transactionDetails"
          //         onClick={(e) => {
          //           setTransNo(e.target.textContent);
          //           openTransDetails();
          //         }}
          //       >
          //         {" "}
          //         {trans_no}
          //       </button>
          //     </div>,
          //   ]);
          // }
          // console.log(transNo, "heeeaa");
          // setData(transDetails);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchServices = () => {
    const sDate = new Date(startDate);
    const start_date = sDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    const eDate = new Date(endDate);
    const end_date = eDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    console.log(start_date, "sDate111");
    console.log(end_date, "eDate111");
    console.log(accountNumber, "pooo");
    axios
      .post(
        API_SERVER + "/api/getServices",
        {
          accountNumber: accountNumber,
          startDate: start_date,
          endDate: end_date,
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "lets get it");
        let results = response.data;
        if (results.length == 0) {
          swal({
            title: "WRN - 07235",
            text: "There are no Services for the specified dates.",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          });
        } else {
          console.log(results, "here");

          results.map((i) => {
            services.push([
              <div style={{ textAlign: "left" }}>{i.description}</div>,
              i.no,
              i.acct_link,
              i.account_descrp,
            ]);
          });
          setServ(services);

          // for (let i = 0; i < results.length; i++) {
          //   const batch_no = results[i].cheque_number;
          //   const document_ref = results[i].return_date;
          //   const local_equivalent_cr = results[i].credit;
          //   const local_equivalent_db = results[i].debit;
          //   const posting_date = results[i].posting_date;
          //   const value_date = results[i].value_date;
          //   const transaction_details = results[i].transaction_details;
          //   const trans_no = results[i].trans_no;
          //   const Bal = results[i].balance;

          //   // <MdOutlineRadioButtonUnchecked/>
          //   transDetails.push([
          //     posting_date,
          //     value_date,
          //     <div style={{ textAlign: "left" }}>{transaction_details}</div>,
          //     document_ref,
          //     <button
          //       className="batchTrans"
          //       onClick={(e) => {
          //         setBatchNumberr(e.target.textContent);
          //         openBatchTrans();
          //       }}
          //     >
          //       {batch_no}
          //     </button>,
          //     <div style={{ textAlign: "right" }}>
          //       {formatNumber(local_equivalent_db)}
          //     </div>,
          //     <div style={{ textAlign: "right" }}>
          //       {formatNumber(local_equivalent_cr)}
          //     </div>,
          //     <div style={{ textAlign: "right" }}>{formatNumber(Bal)}</div>,
          //     <div style={{ display: "flex", justifyContent: "center" }}>
          //       <button
          //         className="transactionDetails"
          //         onClick={(e) => {
          //           setTransNo(e.target.textContent);
          //           openTransDetails();
          //         }}
          //       >
          //         {" "}
          //         {trans_no}
          //       </button>
          //     </div>,
          //   ]);
          // }
          // console.log(transNo, "heeeaa");
          // setData(transDetails);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDates = () => {
    console.log("we we geaux");
    axios.get(API_SERVER + "/api/get-dates", { headers }).then((response) => {
      let dateResponse = response.data[0];
      console.log(dateResponse, "dateResponse");

      setStartDate(dateResponse.start_date);
      setEndDate(dateResponse.end_date);
    });
  };

  useEffect(() => {
    if (stateOne.currency?.length > 0) {
      getDates();
      handleNumberOfHolders();
    }
  }, [stateOne.currency]);

  useEffect(() => {
    if (state) {
      setAccountNumber(state?.accountNumber);
      setLoaderSpinner(true);
      // console.log(state?.accountNumber,"wendy")
      axios
        .post(
          API_SERVER + "/api/getBalance",
          {
            accountNumber: state?.accountNumber,
          },
          { headers }
        )
        .then((response) => {
          let data = response.data[0];

          if (data === undefined) {
            setLoaderSpinner(false);
            swal({
              title: "Invalid Account Number",
              text: "The account number could not be found in our records..",
              icon: "warning",
              buttons: "OK",
              dangerMode: true,
            }).then((result) => {
              if (result) {
                var input = document.getElementById("accNumber11");
                input?.focus();
                // document.getElementsByClassName("dateField")[0].value = "";
                // document.getElementsByClassName("dateField")[1].value = "";
              }
            });
            setShowAccountBalanceDetails(false);
          } else {
            setLoaderSpinner(false);
            setShowAccountBalanceDetails(true);
            console.log(accountNumber, "numberaccount");
            console.log(data, "kkk");

            setStateOne((prevState) => ({
              ...prevState,
              currency: data?.currency_name,
              product: data?.product_descrp,
              branch: data?.branch_descrp,
              description: data?.account_descrp,
              accountStatus: data?.status_descrp,
              crAccruedInterest: data?.cumulative_interest,
              dbAccruedInterest: data?.od_interest_amount,
              dbAccruedPenalty: data?.cot_amount,
              arrearsInterest: data?.arrears_int,
              arrearsInterestRate: data?.arrears_int_rate,
              crAccruedInterestRate: data?.cr_int_rate,
              dbAccruedInterestRate: data?.od_int_rate,
              dbAccruedPenaltyRate: data?.cot_rate,
              interestIntSuspense: data?.od_intin_susp,
              penaltyIntSuspense: data?.pen_intin_susp,
              arrearsIntSuspense: data?.arrears_intin_susp,
              debitLimit: data?.overdrawn_limit,
              creditLimit: data?.lien_amount,
              unclearedBalance: data?.shadow_uncleared,
              clearedBalance: data?.shadow_balance_today,
              ledgerBalance: data?.post_bookbal,
              availableBalance: data?.post_av_bal,
              totalArrears: data?.total_arrears,
              blockedAmount: data?.unapp_debit,
              numberOfHolders: data?.acct_holder,
              riskCode: data?.risk_code,
              customerNumber: data?.customer_number,
            }));
            document.getElementById("Start Date")?.focus();
            setMatrixState(data?.customer_number);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [state]);

  const BalanceEnqFromGeneralEnq = () => {
    console.log(ACnumber, "numbreeee");
    axios
      .post(
        API_SERVER + "/api/getBalance",
        {
          accountNumber: ACnumber,
        },
        { headers }
      )
      .then((response) => {
        let data = response.data[0];
        console.log(data, "kkk");
        setStateOne((prevState) => ({
          ...prevState,
          currency: data?.currency_name,
          product: data?.product_descrp,
          branch: data?.branch_descrp,
          description: data?.account_descrp,
          accountStatus: data?.status_descrp,
          crAccruedInterest: data?.cumulative_interest,
          dbAccruedInterest: data?.od_interest_amount,
          dbAccruedPenalty: data?.cot_amount,
          arrearsInterest: data?.arrears_int,
          arrearsInterestRate: data?.arrears_int_rate,
          crAccruedInterestRate: data?.cr_int_rate,
          dbAccruedInterestRate: data?.od_int_rate,
          dbAccruedPenaltyRate: data?.cot_rate,
          interestIntSuspense: data?.od_intin_susp,
          penaltyIntSuspense: data?.pen_intin_susp,
          arrearsIntSuspense: data?.arrears_intin_susp,
          debitLimit: data?.overdrawn_limit,
          creditLimit: data?.lien_amount,
          unclearedBalance: data?.shadow_uncleared,
          clearedBalance: data?.shadow_balance_today,
          ledgerBalance: data?.post_bookbal,
          availableBalance: data?.post_av_bal,
          totalArrears: data?.total_arrears,
          blockedAmount: data?.unapp_debit,
          numberOfHolders: data?.acct_holder,
          riskCode: data?.risk_code,
          accountNumber: data?.account_number,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (ACnumber?.length > 10) {
      BalanceEnqFromGeneralEnq();
    }
  }, [ACnumber]);

  const Signature = () => {
    axios
      .post(
        API_SERVER + "/api/getS",
        {
          accountNumber: accountNumber,
        },
        { headers }
      )
      .then((response) => {
        let results = response.data;
        console.log(results, "thisistheresults");

        setPassportVerification(results);
        // setSignatureVerification(results.accsign);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (accountNumber?.length === clearFieldsArray) {
      Signature();
    }
  }, [accountNumber]);

  const handleBatchTrans = () => {
    const currentBatchNumber = batchNumberr;
    axios
      .post(
        API_SERVER + "/api/getBatchTrans",
        {
          batchNumber: currentBatchNumber,
        },
        { headers }
      )
      .then((res) => {
        const newBbg = res.data.map((i) => [
          i.acct_link,
          i.account_descrp,
          <div style={{ textAlign: "left" }}>{i.transaction_details}</div>,
          i.document_ref,
          i.currency_code,
          <div style={{ textAlign: "right" }}>{formattedNumber(i.debit)}</div>,
          <div style={{ textAlign: "right" }}>{formattedNumber(i.credit)}</div>,
        ]);

        res.data.forEach((row) => {
          const columnValue = Number(row.credit);
          if (!isNaN(columnValue)) {
            sum += columnValue;
          }
        });

        res.data.forEach((row) => {
          const columnValue = Number(row.debit);
          if (!isNaN(columnValue)) {
            dSum += columnValue;
          }
        });
        setDebitSum(formattedNumber(dSum));
        setFinalSum(formattedNumber(sum));
        setbbg(newBbg);
        // console.log(currentBatchNumber, "batchhhh");
        console.log(res.data, "bbggg");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (batchNumberr.length > 0) {
      handleBatchTrans();
    }
  }, [batchNumberr]);

  const handleTransactionDetails = () => {
    const currentTransNumber = transNo;
    console.log(currentTransNumber, "here guys");

    axios
      .post(
        API_SERVER + "/api/getTransactionDetails",
        {
          transNo: currentTransNumber,
        },
        { headers }
      )
      .then((res) => {
        setTransState((prevState) => ({
          ...prevState,
          transNumber: res.data[0]?.trans_no,
          exchangeRate: res.data[0]?.exchange_rate,
          voucherNumber: res.data[0]?.voucher_number,
          terminalId: res.data[0]?.terminal_id,
          transactionType: res.data[0]?.transaction_type,
          contraAccount: res.data[0]?.contra_account,
          branchCode: res.data[0]?.branch_code,
          postingSystemDate: res.data[0]?.posting_system_date,
          postingDate: res.data[0]?.posting_date,
          postingSysTime: res.data[0]?.posting_sys_time,
          channel: res.data[0]?.channel,
          approvalSystemDate: res.data[0]?.approval_system_date,
          approvedBy: res.data[0]?.approved_by,
          approvalSysTime: res.data[0]?.approval_sys_time,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (transNo !== 0) {
      handleTransactionDetails();
    }
  }, [transNo]);

  const openAccountDetails = () => {
    axios
      .post(
        API_SERVER + "/getAccountBalanceDetails",
        {
          accountNumber: accountNumber,
        },
        { headers }
      )
      .then((response) => {
        let results = response.data[0];
        console.log(results, "wo ye bie");
        setStateTwo((prevState) => ({
          ...prevState,
          accountNumber: results?.account_number,
          acctClass: results?.acct_class,
          productDescrp: results?.product_descrp,
          dateOpened: results?.date_opened,
          statusDescrp: results?.status_descrp,
          lastOdDate: results?.last_od_date,
          customerNumber: results?.customer_number,
          dateOfLastActivity: results?.date_of_last_activity,
          noOfDeposits: results?.no_of_deposits,
          lastDebitDate: results?.last_debit_date,
          noOfWithdrawals: results?.no_of_withdrawals,
          firstDebitDate: results?.first_debit_date,
          creditIntCode: results?.credit_int_code,
          firstCrDate: results?.first_cr_date,
          debitIntCode: results?.debit_int_code,
          dateAccountClosed: results?.date_account_closed,
          prodCode: results?.prod_code,
          dateOfDormancy: results?.date_of_dormancy,
          sector: results?.sector,
          subSector: results?.sub_sector,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const switchFocus = (e, nextFieldId) => {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId)?.focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  };

  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num)) {
      return "0.00";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf(".");

      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted =
          numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        const formattedDecimalPart =
          decimalPart === ".00" ? "0.00" : decimalPart;
        return formattedInteger + formattedDecimalPart;
      }
    }
  }

  function formattedNumber(num) {
    if (
      num === undefined ||
      num === " " ||
      isNaN(num) ||
      num === "0.00" ||
      num === ".00" ||
      num === "0" ||
      num === ""
    ) {
      return "";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf(".");

      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted =
          numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        return formattedInteger + decimalPart;
      }
    }
  }

  // const onMouseHover = () =>{
  //   document.getElementById("makeWeSee").style.color = `url(` + window.location.origin +
  //   `/assets/images/headerBackground/` +
  //   getTheme.theme.headerImage +
  //   `)`
  // }

  const sendSMS = () => {
    if (mob.length > 0) {
      mob.forEach((phoneNumber) => {
        axios
          .post(
            "http://10.203.14.16:8080/waste/create_notification",
            {
              activity_code: "BALENQ",
              entrySource: "MOB",
              branch: "000",
              created_by: "UNIONADMIN",
              device_id: "vxxf",
              para1: "hubertamarfio@gmail.com",
              para2: phoneNumber,
              para3: stateOne.description,
              para4: stateOne.availableBalance,
              ref_no: "563456465",
              notify: "Y",
            },
            { headers: smsHeader }
          )
          .then((response) => {
            console.log(response, "react");
            if (response.data.responseCode === "000") {
              swal({
                title: response.data.message,
                text: "Account Balance has been sent by SMS",
                icon: "success",
                buttons: "OK",
                dangerMode: false,
              });
            } else {
              swal({
                title: "No Contact Found",
                text: "The Contact could not be found in our records..",
                icon: "warning",
                buttons: "OK",
                dangerMode: true,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      swal({
        title: "No Contact Found",
        text: "The Contact could not be found in our records..",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      });
    }
  };

  console.log(data, "mobileNumbers");
  console.log(stateOne?.accountNumber, "ofain3");
  console.log(clearFieldsArray, "ofain3 waaa");

  return (
    <div>
      <div style={{ zoom: 0.9 }}>
        {/* <div className="">
          <div className="p-0 m-0">
            <div style={{backgroundColor:"rgb(3,105,161)"}} className=" w-full rounded-t shadow">
              <div className=" flex justify-between py-1 px-1 text-[90%] items-center ">
                <div className="text-white font-bold uppercase tracking-wider">ACCOUNT BALANCE ENQUIRY</div>
              </div>
            </div>
          </div>
          </div> */}
        <div
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
            padding: "5px 3px 5px 3px",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "5px 0px 15px 0px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 0.02 }}></div>
              <div style={{ flex: 0.96, paddingTop: "5px" }}>
                {/* {showAccountBalanceDetails : */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.8fr 1.1fr 0.9fr",
                    columnGap: "20px",
                    rowGap: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "3px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 0.78 }}>
                      <InputField
                        label={"Account Number :"}
                        id="accNumber11"
                        labelWidth={"41.5%"}
                        inputWidth={"58.5%"}
                        // type={"number"}
                        onChange={(e) => {
                          setAccountNumber(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          onEnter(e);
                        }}
                        value={stateOne?.accountNumber ?? accountNumber}
                        // onBlur={onBlur}
                        // onKeyDown={onEnter}
                      />
                    </div>
                    <Spinner spinning={loaderSpinner} />
                    <div style={{ flex: 0.11 }}>
                      <ButtonComponent
                        label={"GO"}
                        buttonColor={"white"}
                        buttonWidth={"100%"}
                        buttonHeight={"27px"}
                        onClick={handleInput}
                        buttonBackgroundColor={"green"}
                      />
                    </div>
                    <div style={{ flex: 0.11 }}>
                      <ButtonComponent
                        label={"Search"}
                        buttonColor={"white"}
                        buttonWidth={"100%"}
                        buttonHeight={"27px"}
                        onClick={openFindByIDmodal}
                      />
                    </div>
                  </div>

                  {showAccountBalanceDetails && (
                    <>
                      <InputField
                        label={"Currency :"}
                        labelWidth={"55%"}
                        inputWidth={"31%"}
                        value={stateOne.currency}
                        readOnly
                        id={"description"}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: "3px",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ flex: 0.86 }}>
                          <InputField
                            label={"Product :"}
                            labelWidth={" 58.5% "}
                            inputWidth={" 41.5% "}
                            readOnly
                            value={stateOne.product}
                            textAlign={"left"}
                            paddingRight={"5px"}
                            id={"description"}
                          />
                        </div>
                        <div style={{ flex: 0.09 }}>
                          <ButtonComponent
                            buttonIcon={<BiSearchAlt color="black" id="kk" />}
                            buttonWidth={"28.5px"}
                            buttonHeight={"25px"}
                            buttonColor={"white"}
                            outline={"none"}
                            buttonBackgroundColor={"none"}
                            onClick={openProducts}
                            onMouseEnter={() => {
                              document.getElementById("kk").style.color =
                                "#047fc0";
                            }}
                            onMouseLeave={() => {
                              document.getElementById("kk").style.color =
                                "black";
                            }}
                            // id={"e"}
                            // onMouseEnter={onMouseHover}
                          />
                        </div>
                      </div>
                      <InputField
                        label={"Branch :"}
                        labelWidth={"44%"}
                        inputWidth={"56%"}
                        value={stateOne.branch}
                        readOnly
                        id={"description"}
                      />
                    </>
                  )}
                </div>
                {showAccountBalanceDetails && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 0.8fr 0.9fr 0.9fr",
                      columnGap: "20px",
                      rowGap: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <div>
                      <InputField
                        label={"Description :"}
                        labelWidth={"26.8%"}
                        inputWidth={"73.2%"}
                        value={stateOne.description}
                        id={"description"}
                        readOnly
                      />
                    </div>
                    <InputField
                      label={"Risk Code :"}
                      labelWidth={"32.2%"}
                      inputWidth={"67.8%"}
                      value={stateOne.riskCode}
                      id={"description"}
                      readOnly
                    />
                    <div>
                      <InputField
                        label={"Account Status :"}
                        labelWidth={"35%"}
                        inputWidth={"45%"}
                        value={stateOne.accountStatus}
                        id={"description"}
                        readOnly
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.7 }}>
                        <InputField
                          label={"No. Of Holders :"}
                          labelWidth={"65.5%"}
                          inputWidth={"34.5%"}
                          readOnly
                          value={stateOne.numberOfHolders}
                          textAlign={"right"}
                          paddingRight={"5px"}
                          id={"description"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="kk" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openNoOfHolders}
                          onMouseEnter={() => {
                            document.getElementById("kk").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kk").style.color = "black";
                          }}
                          // id={"e"}
                          // onMouseEnter={onMouseHover}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.5fr 0.6fr 0.9fr 1fr",
                      columnGap: "50px",
                      rowGap: "10px",
                      paddingTop: "10px",
                      paddingBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.5 }}>
                        <InputField
                          label={"No. Of Holders :"}
                          labelWidth={"65.5%"}
                          inputWidth={"34.5%"}
                          readOnly
                          value={stateOne.numberOfHolders}
                          textAlign={"right"}
                          paddingRight={"5px"}
                          id={"description"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="kk" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openNoOfHolders}
                          onMouseEnter={() => {
                            document.getElementById("kk").style.color = "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kk").style.color = "black";
                          }}
                          // id={"e"}
                          // onMouseEnter={onMouseHover}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.83 }}>
                        <InputField
                          label={"Debit Limit :"}
                          labelWidth={"47%"}
                          inputWidth={"53%"}
                          value={formatNumber(stateOne.debitLimit)}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"5px"}
                          id={"description"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="kkk" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openDebitLimitModal}
                          onMouseEnter={() => {
                            document.getElementById("kkk").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kkk").style.color = "black";
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.9 }}>
                        <InputField
                          label={"Credit Limit :"}
                          labelWidth={"47%"}
                          inputWidth={"53%"}
                          value={formatNumber(stateOne.creditLimit)}
                          readOnly
                          textAlign={"right"}
                          id={"description"}
                          paddingRight={"5px"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="kkkk" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openCreditLimitModal}
                          id={"makeWeSee"}
                          onMouseEnter={() => {
                            document.getElementById("kkkk").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kkkk").style.color = "black";
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.89 }}>
                        <InputField
                          label={"Blocked Amount :"}
                          labelWidth={"49%"}
                          inputWidth={"51%"}
                          value={formatNumber(stateOne.blockedAmount)}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"5px"}
                          id={"description"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="kkkkick" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openBlockedAmount}
                          onMouseEnter={() => {
                            document.getElementById("kkkkick").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kkkkick").style.color =
                              "black";
                          }}
                        />
                      </div>
                    </div>
                  </div> */}

                {/* </div> */}
              </div>
              <div style={{ flex: 0.02 }}></div>
            </div>
          </div>
          {showAccountBalanceDetails && <br></br>}
          {showAccountBalanceDetails && (
            <div
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.01 }}></div>
                <div style={{ flex: 0.97 }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      columnGap: "8%",
                      rowGap: "10px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.915 }}>
                        <InputField
                          label={"Uncleared Balance :"}
                          labelWidth={"39.5%"}
                          inputWidth={"60.5%"}
                          value={formatNumber(stateOne.unclearedBalance)}
                          readOnly
                          id={"description"}
                          textAlign={"right"}
                          paddingRight={"5px"}
                        />
                      </div>
                      <div style={{ flex: 0.085 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="kkrkkk" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openFloatTransax}
                          onMouseEnter={() => {
                            document.getElementById("kkrkkk").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kkrkkk").style.color =
                              "black";
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div style={{ flex: 0.84 }}>
                        <InputField
                          label={"CR Accrued Interest :"}
                          labelWidth={"55%"}
                          inputWidth={"45%"}
                          value={formatNumber(stateOne?.crAccruedInterest)}
                          textAlign={"right"}
                          paddingRight={"5px"}
                          id={"description"}
                          readOnly
                        />
                      </div>
                      <div style={{ flex: 0.16 }}>
                        <InputField
                          inputWidth={"100%"}
                          value={formatNumber(stateOne?.crAccruedInterestRate)}
                          textAlign={"right"}
                          paddingRight={"9px"}
                          placeholder={"Rate"}
                          id={"description"}
                          noMarginRight
                          readOnly
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.87 }}>
                        <InputField
                          label={"Debit Limit :"}
                          labelWidth={"47%"}
                          inputWidth={"53%"}
                          value={formatNumber(stateOne.debitLimit)}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"5px"}
                          id={"description"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="kkk" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openDebitLimitModal}
                          onMouseEnter={() => {
                            document.getElementById("kkk").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kkk").style.color =
                              "black";
                          }}
                        />
                      </div>
                    </div>
                    <InputField
                      label={"Ledger Balance :"}
                      labelWidth={"35.7%"}
                      inputWidth={"64.3%"}
                      value={formatNumber(stateOne.ledgerBalance)}
                      id={"description"}
                      readOnly
                      textAlign={"right"}
                      paddingRight={"5px"}
                    />
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div style={{ flex: 0.84 }}>
                        <InputField
                          label={"DB Accrued Interest :"}
                          labelWidth={"55%"}
                          inputWidth={"45%"}
                          value={formatNumber(stateOne.dbAccruedInterest)}
                          id={"description"}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"5px"}
                        />
                      </div>
                      <div style={{ flex: 0.16 }}>
                        <InputField
                          inputWidth={"100%"}
                          value={formatNumber(stateOne.dbAccruedInterestRate)}
                          id={"description"}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"9px"}
                          placeholder={"Rate"}
                          noMarginRight
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.87 }}>
                        <InputField
                          label={"Credit Limit :"}
                          labelWidth={"47%"}
                          inputWidth={"53%"}
                          value={formatNumber(stateOne.creditLimit)}
                          readOnly
                          textAlign={"right"}
                          id={"description"}
                          paddingRight={"5px"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="kkkk" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openCreditLimitModal}
                          id={"makeWeSee"}
                          onMouseEnter={() => {
                            document.getElementById("kkkk").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kkkk").style.color =
                              "black";
                          }}
                        />
                      </div>
                    </div>
                    <InputField
                      label={"Cleared Balance :"}
                      labelWidth={"35.7%"}
                      inputWidth={"64.3%"}
                      value={formatNumber(stateOne.clearedBalance)}
                      id={"description"}
                      readOnly
                      textAlign={"right"}
                      paddingRight={"5px"}
                    />
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div style={{ flex: 0.84 }}>
                        <InputField
                          label={"DB Accrued Penalty :"}
                          labelWidth={"55%"}
                          inputWidth={"45%"}
                          value={formatNumber(stateOne.dbAccruedPenalty)}
                          id={"description"}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"5px"}
                        />
                      </div>
                      <div style={{ flex: 0.16 }}>
                        <InputField
                          inputWidth={"100%"}
                          value={formatNumber(stateOne.dbAccruedPenaltyRate)}
                          id={"description"}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"9px"}
                          placeholder={"Rate"}
                          noMarginRight
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.87 }}>
                        <InputField
                          label={"Blocked Amount :"}
                          labelWidth={"47%"}
                          inputWidth={"53%"}
                          value={formatNumber(stateOne.blockedAmount)}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"5px"}
                          id={"description"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={
                            <BiSearchAlt color="black" id="kkkkick" />
                          }
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          onClick={openBlockedAmount}
                          onMouseEnter={() => {
                            document.getElementById("kkkkick").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("kkkkick").style.color =
                              "black";
                          }}
                        />
                      </div>
                    </div>
                    <InputField
                      label={"Available Balance :"}
                      labelWidth={"35.7%"}
                      inputWidth={"64.3%"}
                      value={formatNumber(stateOne.availableBalance)}
                      id={"description"}
                      readOnly
                      textAlign={"right"}
                      paddingRight={"5px"}
                    />
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div style={{ flex: 0.84 }}>
                        <InputField
                          label={"Arrears Interest :"}
                          labelWidth={"55%"}
                          inputWidth={"45%"}
                          value={formatNumber(stateOne.arrearsInterest)}
                          id={"description"}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"5px"}
                        />
                      </div>
                      <div style={{ flex: 0.16 }}>
                        <InputField
                          inputWidth={"100%"}
                          value={formatNumber(stateOne.arrearsInterestRate)}
                          id={"description"}
                          readOnly
                          textAlign={"right"}
                          paddingRight={"9px"}
                          placeholder={"Rate"}
                          noMarginRight
                        />
                      </div>
                    </div>
                    {/* <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.87 }}>
                        <InputField
                          label={"Total Arrears :"}
                          labelWidth={"53%"}
                          inputWidth={"46%"}
                          value={formatNumber(stateOne.totalArrears)}
                          readOnly
                          id={"description"}
                          textAlign={"right"}
                          paddingRight={"5px"}
                        />
                      </div>
                      <div style={{ flex: 0.09 }}>
                        <ButtonComponent
                          buttonIcon={<BiSearchAlt color="black" id="ick" />}
                          buttonWidth={"28.5px"}
                          buttonHeight={"25px"}
                          buttonColor={"white"}
                          outline={"none"}
                          buttonBackgroundColor={"none"}
                          textAlign={"right"}
                          paddingRight={"5px"}
                          onMouseEnter={() => {
                            document.getElementById("ick").style.color =
                              "#047fc0";
                          }}
                          onMouseLeave={() => {
                            document.getElementById("ick").style.color = "black";
                          }}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div style={{ flex: 0.02 }}></div>
              </div>
            </div>
          )}
        </div>
        {showAccountBalanceDetails && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 0px 10px 0px",
            }}
          >
            <div style={{ flex: 0.7 }}></div>
            <div
              style={{
                display: "flex",
                flex: 0.3,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  borderRadius: "4px",
                }}
              >
                <ButtonComponent
                  label={"Balance By SMS"}
                  buttonColor={"white"}
                  onClick={sendSMS}
                  buttonWidth={"100%"}
                  buttonHeight={"30px"}
                  buttonBackgroundColor={"#5DBB63"}
                  // onClick={signatureVerification?handleSig:handleShoww}
                />
              </div>
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  borderRadius: "4px",
                  backgroundColor: "red",
                }}
              >
                <ButtonComponent
                  label={"Sign. Ver"}
                  buttonHeight={"30px"}
                  buttonWidth={"100%"}
                  buttonIcon={CustomButtons["sigVer"].icon}
                  buttonBackgroundColor={CustomButtons["sigVer"].bgColor}
                  onClick={handleSig}
                />
              </div>
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  borderRadius: "4px",
                }}
              >
                <ButtonComponent
                  label={"Account Details"}
                  buttonColor={"white"}
                  onClick={() => {
                    openAccountDetails();
                    openBalanceAccountDetailsModal();
                  }}
                  buttonWidth={"100%"}
                  buttonHeight={"30px"}
                />
              </div>
            </div>
          </div>
        )}
        {showAccountBalanceDetails && (
          <>
            <br></br>
            <Tabs variant="pills" onTabChange={handleTabChange} value={tab1}>
              <Tabs.List
                style={{
                  borderTop: "1px solid lightgrey",
                  borderBottom: "1px solid lightgrey",
                  padding: "1px 0px 1px 0px",
                }}
              >
                <Tabs.Tab
                  value="gallery"
                  style={{
                    backgroundColor:
                      tab1 === "gallery" ? "#228BE6" : "#007BE626",
                    color: tab1 === "gallery" ? "whitesmoke" : "black",
                  }}
                >
                  TRANSACTION DETAILS
                </Tabs.Tab>
                <Tabs.Tab
                  value="signatories"
                  style={{
                    backgroundColor:
                      tab1 === "signatories" ? "#228BE6" : "#007BE626",
                    color: tab1 === "signatories" ? "whitesmoke" : "black",
                  }}
                >
                  SIGNATORIES
                </Tabs.Tab>
                <Tabs.Tab
                  value="former"
                  style={{
                    backgroundColor:
                      tab1 === "former" ? "#228BE6" : "#007BE626",
                    color: tab1 === "former" ? "whitesmoke" : "black",
                  }}
                >
                  RETURNED CHEQUES
                </Tabs.Tab>
                <Tabs.Tab
                  value="messages"
                  style={{
                    backgroundColor:
                      tab1 === "messages" ? "#228BE6" : "#007BE626",
                    color: tab1 === "messages" ? "whitesmoke" : "black",
                  }}
                >
                  SERVICES
                </Tabs.Tab>
                <Tabs.Tab
                  value="latter"
                  style={{
                    backgroundColor:
                      tab1 === "latter" ? "#228BE6" : "#007BE626",
                    color: tab1 === "latter" ? "whitesmoke" : "black",
                  }}
                >
                  STATISTICS
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="gallery" pt="xs">
                <div
                  style={{
                    boxShadow:
                      "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                    padding: "5px 3px 5px 3px",
                  }}
                >
                  <div
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.01 }}></div>
                      <div style={{ flex: 0.33 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <InputField
                            label={"Start Date :"}
                            labelWidth={"35%"}
                            id="Start Date"
                            className="dateField"
                            value={startDate}
                            inputWidth={"52%"}
                            onChange={(e) => setStartDate(e.target.value)}
                            type={"date"}
                            onKeyDown={(e) => {
                              switchFocus(e, "end Date");
                            }}
                          />

                          <InputField
                            label={"End Date :"}
                            labelWidth={"35%"}
                            id="end Date"
                            className="dateField"
                            defaultValue={endDate}
                            inputWidth={"52%"}
                            onChange={(e) => setEndDate(e.target.value)}
                            type={"date"}
                            value={endDate}
                            // onKeyDown={()=>{switchFocus}}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 0.03 }}>
                        <ButtonComponent
                          onClick={handleFetch}
                          // label={"Fetch"}
                          buttonColor={"white"}
                          buttonWidth={"35px"}
                          buttonHeight={"28px"}
                          buttonIcon={<MdOutlineDoubleArrow size={20} />}
                        />
                      </div>
                      <div style={{ flex: 0.33 }}></div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flex: 0.28,
                        }}
                      >
                        <div
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                            borderRadius: "4px",
                          }}
                        >
                          <ButtonComponent
                            label={"Print Statement"}
                            buttonColor={"white"}
                            // onClick={signatureVerification?handleSig:handleShoww}
                            onClick={openPrintStatement}
                            buttonWidth={"150px"}
                            buttonHeight={"30px"}
                            buttonBackgroundColor={
                              CustomButtons["print"].bgColor
                            }
                            buttonIcon={CustomButtons["print"].icon}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 0.02 }}></div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "10px 0px 10px 0px",
                    }}
                  >
                    <div style={{ display: "flex", flex: 0.6 }}></div>
                    <div style={{ display: "flex", flex: 0.36 }}>
                      <InputField
                        label={"Balance Brought Forward :"}
                        labelWidth={"70%"}
                        inputWidth={"30%"}
                        onChange={(e) => {
                          setBalanceBroughtForward(e.target.value);
                        }}
                        value={formattedNumber(balanceBroughtForward)}
                        textAlign={"right"}
                        id={"description"}
                        disabled
                      />
                    </div>
                    <div style={{ display: "flex", flex: 0.04 }}></div>
                  </div>
                  <div>
                    <DataTable
                      rowsPerPage={10}
                      pagination={true}
                      data={data}
                      headers={[
                        "Posting Date",
                        "Value Date",
                        "Transaction Details",
                        "Document Ref",
                        "Batch No.",
                        "Debit",
                        "Credit",
                        "Balance",
                        " ",
                      ]}
                    />
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="signatories" pt="xs">
                <div
                  style={{
                    boxShadow:
                      "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                    padding: "5px 3px 5px 3px",
                  }}
                >
                  <div>
                    <DataTable
                      data={holdSignatories}
                      headers={[
                        "Relation No.",
                        "First Name",
                        "Middle Name",
                        "Surname",
                        "Date Of Birth",
                        "Mobile",
                        "E-mail Address",
                        "Gender",
                        "Photo/Sig",
                      ]}
                    />
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="former" pt="xs">
                <div
                  style={{
                    boxShadow:
                      "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                    padding: "5px 3px 5px 3px",
                  }}
                >
                  <div
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.01 }}></div>
                      <div style={{ flex: 0.33 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <InputField
                            label={"Start Date :"}
                            labelWidth={"35%"}
                            id="Start Date"
                            className="dateField"
                            value={startDate}
                            inputWidth={"52%"}
                            onChange={(e) => setStartDate(e.target.value)}
                            type={"date"}
                            onKeyDown={(e) => {
                              switchFocus(e, "end Date");
                            }}
                          />

                          <InputField
                            label={"End Date :"}
                            labelWidth={"35%"}
                            id="end Date"
                            className="dateField"
                            defaultValue={endDate}
                            inputWidth={"52%"}
                            onChange={(e) => setEndDate(e.target.value)}
                            type={"date"}
                            value={endDate}
                            // onKeyDown={()=>{switchFocus}}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 0.03 }}>
                        <ButtonComponent
                          onClick={fetchReturnedCheques}
                          // label={"Fetch"}
                          buttonColor={"white"}
                          buttonWidth={"35px"}
                          buttonHeight={"28px"}
                          buttonIcon={<MdOutlineDoubleArrow size={20} />}
                        />
                      </div>
                      <div style={{ flex: 0.33 }}></div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flex: 0.28,
                        }}
                      >
                        <div
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                            borderRadius: "4px",
                          }}
                        >
                          <ButtonComponent
                            label={"Print Statement"}
                            buttonColor={"white"}
                            // onClick={signatureVerification?handleSig:handleShoww}
                            onClick={openPrintStatement}
                            buttonWidth={"150px"}
                            buttonHeight={"30px"}
                            buttonBackgroundColor={
                              CustomButtons["print"].bgColor
                            }
                            buttonIcon={CustomButtons["print"].icon}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 0.02 }}></div>
                    </div>
                  </div>
                  <br></br>
                  <div>
                    <DataTable
                      rowsPerPage={5}
                      data={turnCheques}
                      headers={[
                        "Cheque Number",
                        "Returned Date",
                        "Reason",
                        "Amount",
                      ]}
                    />
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="messages" pt="xs">
                <div
                  style={{
                    boxShadow:
                      "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                    padding: "5px 3px 5px 3px",
                  }}
                >
                  <div
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.01 }}></div>
                      <div style={{ flex: 0.33 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <InputField
                            label={"Start Date :"}
                            labelWidth={"35%"}
                            id="Start Date"
                            className="dateField"
                            value={startDate}
                            inputWidth={"52%"}
                            onChange={(e) => setStartDate(e.target.value)}
                            type={"date"}
                            onKeyDown={(e) => {
                              switchFocus(e, "end Date");
                            }}
                          />

                          <InputField
                            label={"End Date :"}
                            labelWidth={"35%"}
                            id="end Date"
                            className="dateField"
                            defaultValue={endDate}
                            inputWidth={"52%"}
                            onChange={(e) => setEndDate(e.target.value)}
                            type={"date"}
                            value={endDate}
                            // onKeyDown={()=>{switchFocus}}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 0.03 }}>
                        <ButtonComponent
                          onClick={fetchServices}
                          // label={"Fetch"}
                          buttonColor={"white"}
                          buttonWidth={"35px"}
                          buttonHeight={"28px"}
                          buttonIcon={<MdOutlineDoubleArrow size={20} />}
                        />
                      </div>
                      <div style={{ flex: 0.33 }}></div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flex: 0.28,
                        }}
                      >
                        <div
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                            borderRadius: "4px",
                          }}
                        >
                          <ButtonComponent
                            label={"Print Statement"}
                            buttonColor={"white"}
                            // onClick={signatureVerification?handleSig:handleShoww}
                            onClick={openPrintStatement}
                            buttonWidth={"150px"}
                            buttonHeight={"30px"}
                            buttonBackgroundColor={
                              CustomButtons["print"].bgColor
                            }
                            buttonIcon={CustomButtons["print"].icon}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 0.02 }}></div>
                    </div>
                  </div>
                  <br></br>
                  <div>
                    <DataTable
                      rowsPerPage={5}
                      data={serv}
                      headers={[
                        "Description",
                        "No",
                        "Account Number",
                        "Account Description",
                      ]}
                    />
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="latter" pt="xs">
                <div
                  style={{
                    boxShadow:
                      "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                    padding: "5px 3px 5px 3px",
                  }}
                >
                  <div
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 0.01 }}></div>
                      <div style={{ flex: 0.33 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <InputField
                            label={"Start Date :"}
                            labelWidth={"35%"}
                            id="Start Date"
                            className="dateField"
                            value={startDate}
                            inputWidth={"52%"}
                            onChange={(e) => setStartDate(e.target.value)}
                            type={"date"}
                            onKeyDown={(e) => {
                              switchFocus(e, "end Date");
                            }}
                          />

                          <InputField
                            label={"End Date :"}
                            labelWidth={"35%"}
                            id="end Date"
                            className="dateField"
                            defaultValue={endDate}
                            inputWidth={"52%"}
                            onChange={(e) => setEndDate(e.target.value)}
                            type={"date"}
                            value={endDate}
                            // onKeyDown={()=>{switchFocus}}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 0.03 }}>
                        <ButtonComponent
                          onClick={fetchStatistics}
                          // label={"Fetch"}
                          buttonColor={"white"}
                          buttonWidth={"35px"}
                          buttonHeight={"28px"}
                          buttonIcon={<MdOutlineDoubleArrow size={20} />}
                        />
                      </div>
                      <div style={{ flex: 0.33 }}></div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flex: 0.28,
                        }}
                      >
                        <div
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                            borderRadius: "4px",
                          }}
                        >
                          <ButtonComponent
                            label={"Print Statement"}
                            buttonColor={"white"}
                            // onClick={signatureVerification?handleSig:handleShoww}
                            onClick={openPrintStatement}
                            buttonWidth={"150px"}
                            buttonHeight={"30px"}
                            buttonBackgroundColor={
                              CustomButtons["print"].bgColor
                            }
                            buttonIcon={CustomButtons["print"].icon}
                          />
                        </div>
                      </div>
                      <div style={{ flex: 0.02 }}></div>
                    </div>
                  </div>
                  <br></br>
                  <div>
                    <DataTable
                      rowsPerPage={5}
                      data={stats}
                      headers={[
                        "Date",
                        "Best Balance",
                        "Worst Balance",
                        "Average Balance",
                        "Debit Turnover",
                        "Credit Turnover",
                        "COT",
                        "Fees and Comm.",
                        "Interest",
                      ]}
                    />
                  </div>
                </div>
              </Tabs.Panel>
            </Tabs>
          </>
        )}
      </div>
      <Modal size="md" opened={showSig} withCloseButton={false} centered>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  Signature Verification
                </div>

                <svg
                  onClick={closeSig}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b ">
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <ImageVerification accountNumber={accountNumber} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="lg" opened={showPhotoSig} withCloseButton={false} centered>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  Photo/Image Verification
                </div>

                <svg
                  onClick={closePhotoSigVerification}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b ">
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <PhotoSignatureVerification relationNo={relationNo} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="70%" opened={showBatchTrans} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  BATCH TRANSACTION
                </div>

                <svg
                  onClick={closeBatchTrans}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "20px" }}>
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <BatchTransaction
                bbg={bbg}
                finalSum={finalSum}
                debitSum={debitSum}
              />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="70%" opened={showTransDetails} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  CHN-BALANCES - TRANSACTION DETAILS
                </div>

                <svg
                  onClick={closeTransDetails}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b ">
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <TransDetails transState={transState} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        size="70%"
        opened={balanceAccountDetailsModal}
        withCloseButton={false}
      >
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  Account Details
                </div>

                <svg
                  onClick={closeBalanceAccountDetailsModal}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b ">
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <BalanceAccountDetails stateTwo={stateTwo} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="70%" opened={NoOfHolders} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  Account Holders
                </div>

                <svg
                  onClick={closeNoOfHolders}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "20px" }}>
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <AccountHolders NoH={NoH} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="70%" opened={products} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginTop: "-20px",
            marginBottom: "-15px",
            marginLeft: "-17px",
            marginRight: "-16px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  Product Details
                </div>

                <svg
                  onClick={closeProducts}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "20px" }}>
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <ProductDetails
                product={stateOne.productCode}
                currency={stateOne.currency}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/* <Modal size="70%" opened={AccountBlockageListModal}>
        <div
            className="text-gray-700"
            style={{
              marginBottom: "-30px",
              marginLeft: "-17px",
              marginRight: "-16px",
              marginTop: "-20px",
              overflowY: "none",
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: "#0369A1",
                }}
                className="w-full shadow"
              >
                <div className=" flex justify-between py-[6px] px-2 items-center ">
                  <div
                    style={{ fontSize: "14px" }}
                    className="text-white font-semibold"
                  >
                 OUTSTANDING DEBIT TRANS
                  </div>
  
                  <svg
                    onClick={closeAccountBlockageListModal}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    // style={{ padding: "10px" }}
                    viewBox="0 0 24 24"
                    // strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-b ">
              <div
                className="bg-white shadow rounded px-0 pt-1 pb-8 "
                style={{ marginBottom: "-25px" }}
              >
             <AccountBlockageList BlockedAccounts={BlockedAccounts} />
              </div>
            </div>
          </div>
        </Modal> */}
      <Modal size="70%" opened={BlockedAmountModal} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  OUTSTANDING DEBIT TRANS
                </div>

                <svg
                  onClick={closeBlockedAmount}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "20px" }}>
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <BlockedAmount BA={BA} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="70%" opened={FloatTransax} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  FLOAT TRANSACTION
                </div>

                <svg
                  onClick={closeFloaxTrans}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "20px" }}>
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <FloatTransaction UCB={UCB} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="70%" opened={DebitLimitModal} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  OVERDRAFT DETAILS
                </div>

                <svg
                  onClick={closeDebitLimitModal}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "20px" }}>
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <DebitLimit DBM={DBM} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="70%" opened={creditLimitModal} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  LIEN DETAILS
                </div>

                <svg
                  onClick={closeCreditLimitModal}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "20px" }}>
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <CreditLimit CRM={CRM} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="70%" opened={printStatement} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  TRANSACTION DETAILS
                </div>

                <svg
                  onClick={closePrintStatement}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b ">
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "-25px" }}
            >
              <PrintStatement
                data={data}
                stateOne={stateOne}
                accountNumber={accountNumber}
                balanceBroughtForward={balanceBroughtForward}
              />
            </div>
          </div>
        </div>
      </Modal>
      <SearchModal
        showModal={findById}
        setShowModal={setFindById}
        handleSelected={handleSelected}
      />
    </div>
  );
}
export default AccountBalanceEnquiry;
