import { React, useState, useEffect } from "react";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Tabs } from "@mantine/core";
import AccordionForms from '../../../../customer-activities/individual-account-opening/components/AccordionForms';
import { API_SERVER } from "../../../../../../config/constant";

import TabsComponent from "../../../../../../components/others/tab-component/tab-component";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../components/others/Fields/InputField";

import ImageVerification from "../../../../../../components/others/ImageVerification";

import BatchTransaction from "../../components/account-balance-enquiry-modals/batch-trans";
import TransDetails from "../../components/account-balance-enquiry-modals/trans-details";
import BalanceAccountDetails from "../../components/account-balance-enquiry-modals/balance-account-details";
import "../../../account-enquiry/customer-search.css";

import { Modal, Group, Button } from "@mantine/core";

import swal from "sweetalert";
import Personal_Details from "../../../../customer-activities/individual-account-opening/components/personal-details";
import Occupation_other_details from "../../../../customer-activities/individual-account-opening/components/occupation-other-details";
import Mode_Of_Communication from "../../../../customer-activities/individual-account-opening/components/mode-of-communication";
import Next_Of_King from "../../../../customer-activities/individual-account-opening/components/next-of-king";
import Current_Address from "../../../../customer-activities/individual-account-opening/components/current-address";
import SharesAcquired from "./share-details/shares-acquired";
import Dividend from "./share-details/dividend";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function MemberDetails({state,ACnumber,hideRadioButtons,selectedOptions,storedFormData,accountTypes,setAccountTypes,selectedOptionJoint,tableData,handleSubmit,formData, setFormData, handleChange, customerDataTable ,customerData,response, error,}) 
{
  const [currency, setCurrency] = useState("");
  const [product, setProduct] = useState("");
  const [branch, setBranch] = useState("");
  const [description, setDescription] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [numberOfHolders, setNumberOfHolders] = useState("");
  const [riskCode, setRiskCode] = useState("");
  const [letsee, setLetsee] = useState(state);
  const [craccruedInterest, setCrAccruedInterest] = useState("");
  const [dbaccruedInterest, setDbAccruedInterest] = useState("");
  const [dbaccruedPenalty, setDbAccruedPenalty] = useState("");
  const [arrearsInterest, setArrearsInterest] = useState("");

  const [craccruedInterestRate, setCrAccruedInterestRate] = useState("");
  const [dbaccruedInterestRate, setDbAccruedInterestRate] = useState("");
  const [dbaccruedPenaltyRate, setDbAccruedPenaltyRate] = useState("");
  const [arrearsInterestRate, setArrearsInterestRate] = useState("");

  const [interestIntSuspense, setInterestIntSuspense] = useState("");
  const [penaltyIntSuspense, setPenaltyIntSuspense] = useState("");
  const [arrearsIntSuspense, setArrearsIntSuspense] = useState("");

  const [debitLimit, setDebitLimit] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [blockedAmount, setBlockedAmount] = useState("");
  const [totalArrears, setTotalArrears] = useState("");

  const [unclearedBalance, setUnclearedBalance] = useState("");
  const [clearedBalance, setClearedBalance] = useState("");
  const [ledgerBalance, setLedgerBalance] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [batchNumberr, setBatchNumberr] = useState("");
  const [transNo, setTransNo] = useState("");

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
  const [NoH, setNoH] = useState([]);
  let holders = [];
  const [NoOfHolders, setNoOfHolders] = useState(false);
  const openNoOfHolders = () => {
    const handleNumberOfHolders = () => {
      let customersNumber = stateOne.customerNumber;
      console.log(customersNumber, "customersNumber");
      axios
        .post(
          API_SERVER + "/getNoOfHolders",
          {
            customerNumber: customersNumber,
          },
          { headers }
        )
        .then((response) => {
          let results = response.data;
          results.map((i) => {
            holders.push([
              i.relation_no,
              i.customer_name,
              i.date_established,
              i.phone1,
              i.gender,
              i.email_address,
            ]);
          });

          setNoH(holders);
          console.log(holders, "sr");
          console.log(NoH, "noh");
        });
    };
    handleNumberOfHolders();
    setNoOfHolders(true);
  };
  const closeNoOfHolders = () => {
    setNoOfHolders(false);
  };

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
          results.map((i) => {
            blocked.push([i.posted_by, i.branch_code, i.narration, i.db_amt]);
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
              i.transaction_details,
              i.local_equivalent_cr,
              i.local_equivalent_db,
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
              i.description,
              i.utilized_amount,
              i.facility_amount,
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
              i.lien_amount,
              i.expiry_date,
              i.effective_date,
              i.branch_code,
              i.posting_terminal,
              i.comments,
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
  const [stateTwo, setStateTwo] = useState({});
  const [transState, setTransState] = useState({});

  // ,APPROVED_BY,APPROVAL_SYS_TIME

  //  const handleInput = () => {
  //   axios.post(API_SERVER + "/api/getBalance", {
  //       accountNumber: accountNumber,
  //     }, { headers })
  //     .then((response) => {

  //       let data = response.data[0];
  //       console.log(data,"kkk")
  //         setCurrency(data.currency_name);
  //         setProduct(data.product_descrp);
  //         setBranch(data.branch_descrp);
  // setDescription(data.account_descrp);
  // setAccountStatus(data.status_descrp);
  // setCrAccruedInterest(data.cumulative_interest);
  // setDbAccruedInterest(data.od_interest_amount);
  // setDbAccruedPenalty(data.cot_amount);
  // setArrearsInterest(data.arrears_int);
  // setCrAccruedInterestRate(data.cr_int_rate);
  // setDbAccruedInterestRate(data.od_int_rate);
  // setDbAccruedPenaltyRate(data.cot_rate);
  // setArrearsInterestRate(data.arrears_int_rate);
  // setInterestIntSuspense(data.od_intin_susp);
  // setPenaltyIntSuspense(data.pen_intin_susp);
  // setArrearsIntSuspense(data.arrears_intin_susp);
  // setDebitLimit(data.overdrawn_limit);
  // setCreditLimit(data.lien_amount);
  // setUnclearedBalance(data.shadow_uncleared);
  // setClearedBalance(data.shadow_balance_today);
  // setLedgerBalance(data.post_bookbal);
  // setAvailableBalance(data.post_av_bal);
  // setTotalArrears(data.total_arrears);
  // setBlockedAmount(data.unapp_debit);
  // setNumberOfHolders(data.acct_holder);
  // setRiskCode(data.risk_code);
  //    })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // };

  const handleInput = (e) => {
    setData([]);

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
          swal({
            title: "Invalid Account Number",
            text: "The account number could not be found in our records..",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          }).then((result) => {
            if (result) {
              var input = document.getElementById("accNumber11");
              input.focus();
              document.getElementsByClassName("dateField")[0].value = "";
              document.getElementsByClassName("dateField")[1].value = "";
            }
          });
        } else {
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
        }
        document.getElementById("Start Date")?.focus();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearFields = () => {
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
    // formatNumber(undefined);
  };
  useEffect(() => {
    if (accountNumber?.length !== 18) {
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
        API_SERVER + "/api/getTransac",
        {
          accountNumber: accountNumber,
          startDate: start_date,
          endDate: end_date,
        },
        { headers }
      )
      .then((response) => {
        let results = response.data.response;
        if (results.length == 0){
          swal({
            title: "WRN - 07235",
            text: "There are no transactions for the specified dates.",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          })
        } else{
        console.log(results, "eee");

        for (let i = 0; i < results.length; i++) {
          const batch_no = results[i].batch_no;
          const document_ref = results[i].document_ref;
          const local_equivalent_cr = results[i].credit;
          const local_equivalent_db = results[i].debit;
          const posting_date = results[i].posting_date;
          const value_date = results[i].value_date;
          const transaction_details = results[i].transaction_details;
          const trans_no = results[i].trans_no;
          const Bal = results[i].balance;

          // <MdOutlineRadioButtonUnchecked/>
          transDetails.push([
            posting_date,
            value_date,
            <div style={{textAlign:"left"}}>{transaction_details}</div>,
           document_ref,
            <button
              className="batchTrans"
              onClick={(e) => {
                setBatchNumberr(e.target.textContent);
                openBatchTrans();
              }}
            >
              {batch_no}
            </button>,
            <div style={{textAlign:"right"}}>
              {formatNumber(local_equivalent_db)}
            </div>,
            <div style={{ textAlign: "right" }}>
              {formatNumber(local_equivalent_cr)}
            </div>,
            <div style={{ textAlign: "right" }}>
              {formatNumber(Bal)}
            </div>,
            <div style={{display:"flex",justifyContent:"center"}}>
            <button
              className="transactionDetails"
              onClick={(e) => {
                setTransNo(e.target.textContent);
                openTransDetails();
              }}
            >
              {" "}
              {trans_no}
            </button>
            </div>
          ]);
        }
        console.log(transNo, "heeeaa");
        setData(transDetails);
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
    }
  }, [stateOne.currency]);

  const BalanceEnqFromAccountList = () => {
    setAccountNumber(state?.accountNumber);
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
    BalanceEnqFromAccountList();
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
    BalanceEnqFromGeneralEnq();
  }, []);

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
    if (accountNumber?.length === 18) {
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
          i.account_number,
          i.transaction_details,
          i.document_ref,
          i.currency_code,
          i.debit,
          i.credit,
        ]);
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

console.log(stateTwo,"setStateOnesetStateTwo")

  const switchFocus = (e, nextFieldId) => {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  };

  function formatNumber(num) {
    if (num === undefined || num === "") {
      return " ";
    } else {
      const formatted =
        num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      return formatted;
    }
  }

 

  // const onMouseHover = () =>{
  //   document.getElementById("makeWeSee").style.color = `url(` + window.location.origin +
  //   `/assets/images/headerBackground/` +
  //   getTheme.theme.headerImage +
  //   `)`
  // }

  return (
  <div>
      <AccordionForms title="Share Details" isInitiallyExpanded={true}>
        <SharesAcquired/>
      </AccordionForms>
      <AccordionForms title="Dividend">
        <Dividend/>
      </AccordionForms>
 </div>
  );
}
export default MemberDetails;
