import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../components/others/Header/Header";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { headers } from "./../../teller-ops/teller/teller-activities";
import SelectField from "../../../../components/others/Fields/SelectField";
import TabsComponent from "../../../../components/others/tab-component/tab-component";
import WaiverOption from "./lrs-tabs/waiverOption";
import ChargesDetails from "./lrs-tabs/chargesDetails";
import RescheduleDetails from "./lrs-tabs/rescheduleDetails";
import PaymentReason from "./lrs-tabs/paymentReason";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { FiFileText } from "react-icons/fi";
import NewLoanGeneralEnquiry from "../facility-enquiry/new-loan-general-enquiry";
import { Modal, ScrollArea } from "@mantine/core";
import Swal from "sweetalert2";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import { Spin } from "antd";

function NewLoanReschedulePayment() {
  // USEFUL FUNCTIONS
  // DATE FORMATTER FUNCTION
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase()
      .slice(0, 3);
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    return `${day}-${month}-${year}`;
  }

  // FORMAT NUMBER FUNCTION
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // REMOVE THE E IN TYPE OF NUMBER
  const handleKeyDown = (e) => {
    // Prevent "e", "+", "-", and other invalid keys
    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }
  };

  // ALL STATES AND VARIABLES HERE
  const [memberNumber, setMemberNumber] = useState([]);
  const [amount, setAmount] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [rescheduleAmount, setRescheduleAmount] = useState(0);
  const [showEnquiryScreen, setShowEnquiryScreen] = useState(false);
  const [memberNumberValue, setMemberNumberValue] = useState("");
  const [forceDebit, setForceDebit] = useState("N");
  const [transactionType, setTransactionType] = useState("");
  const [principalAccount, setPrincipalAccount] = useState([]);
  const [formDetails, setFormDetails] = useState([]);
  const [reductionAmount, setReductionAmount] = useState(0);
  const [principalAccountValue, setPrincipalAccountValue] = useState("");
  const [repayCnt, setRepayCnt] = useState("");
  const [intCnt, setIntCnt] = useState("");
  const [repaymentCountOutstanding, setRepaymentCountOutstanding] =
    useState("");
  const [accruedInt, setAccruedInt] = useState(0);
  const [accruedPenal, setAccruedPenal] = useState(0);
  const [total, setTotal] = useState(0);
  const [earlySettlementAmount, setEarlySettlementAmount] = useState(0);
  const [principalArrears, setPrincipalArrears] = useState(0);
  const [interestArrears, setInterestArrears] = useState(0);
  const [arrInterestSusp, setArrInterestSusp] = useState(0);
  const [remainingLoanBalance, setRemainingLoanBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentReasonsData, setPaymentReasonsData] = useState({});
  const [chargesDetailsData, setChargesDetailsData] = useState({});
  const [rescheduleDetailsData, setRescheduleDetailsData] = useState({});
  const [waiverOptionData, setWaiverOptionData] = useState({});
  const [earlySettlementData, setEarlySettlementData] = useState([]);

  // STATES AND VARIABLES
  // THE RESPECTIVE TABS AND THEIR RESPECTIVE COMPONENTS
  const loanPaymentTabs = [
    {
      value: "1",
      label: "Waiver Options",
      component: (
        <WaiverOption
          formDetails={formDetails}
          amount={amount}
          transactionType={transactionType}
          remainingBalance={setRemainingLoanBalance}
          waiverOption={setWaiverOptionData}
          total={total}
        />
      ),
    },
    {
      value: "2",
      label: "Charges Details",
      component: (
        <ChargesDetails
          formDetails={formDetails}
          chargesDetails={setChargesDetailsData}
        />
      ),
    },
    {
      value: "3",
      label: "Reschedule Details",
      component: (
        <RescheduleDetails
          balanceToReschedule={remainingLoanBalance}
          amount={amount}
          formDetails={formDetails[0]}
          setFormDetails={setFormDetails}
          rescheduleDetails={setRescheduleDetailsData}
        />
      ),
    },
    {
      value: "4",
      label: "Payment Reason",
      component: (
        <PaymentReason
          paymentReason={setPaymentReasonsData}
          formDetails={formDetails}
        />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState("1");
  const getDisabledTabs = (activeTab) => {
    switch (activeTab) {
      case 1:
        return ["2", "3", "4"];
      case 2:
        return ["1", "3", "4"];
      case 3:
        return ["1", "2", "4"];
      case 4:
        return ["1", "2", "3"];
      default:
        return ["2", "3", "4"]; // No tabs are disabled
    }
  };
  // DISABLED ARR

  console.log(rescheduleDetailsData, "LATELYY 3");
  console.log(chargesDetailsData, "LATELYY 2");
  console.log(waiverOptionData, "LATELYY 1");

  // EFFECTS
  useEffect(() => {
    // GETTING THE MEMBERS THAT YOU WOULD LIKE TO PERFORM A LOAN PAYMENT ON
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        { key: "loanCustomers" },
        { headers }
      )
      .then((response) => {
        setMemberNumber(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      axios
        .post(
          API_SERVER + "/api/get-repaycnt-outstanding",
          { facility_number: formDetails[0]?.facility_no },
          { headers: headers }
        )
        .then(function (response) {
          setRepayCnt(response?.data[0]?.COUNT);
        })
        .catch((err) => console.log(err));

      axios
        .post(
          API_SERVER + "/api/get-intcnt-outstanding",
          { facility_number: formDetails[0]?.facility_no },
          { headers: headers }
        )
        .then(function (response) {
          setIntCnt(response?.data[0]?.COUNT);
        })
        .catch((err) => console.log(err));
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // GETTING THE PRINCIPAL ACCOUNT OF THE SELECTED MEMBER
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        {
          key: "principaAccount",
          cust_no: memberNumberValue,
        },
        { headers }
      )
      .then((response) => {
        setPrincipalAccount(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // GETTING THE REPAYMENT COUNT OUTSTANDING
    axios
      .post(
        API_SERVER + "/api/get-repaycnt-outstanding",
        { facility_number: formDetails[0]?.facility_no },
        { headers: headers }
      )
      .then(function (response) {
        setRepaymentCountOutstanding(response?.data[0]?.COUNT);
      })
      .catch((err) => console.log(err));

    // THE TOTAL BALANCE OF THE MEMBER
    setTotal(
      parseFloat(formDetails[0]?.shadow_balance_today) +
        parseFloat(formDetails[0]?.od_accrued_int) +
        parseFloat(formDetails[0]?.cot_amount) +
        parseFloat(formDetails[0]?.arrears_int)
    );

    let earlySettlementCash =
      parseFloat(formDetails[0]?.shadow_balance_today) +
      parseFloat(formDetails[0]?.od_accrued_int) +
      parseFloat(formDetails[0]?.cot_amount) +
      parseFloat(formDetails[0]?.arrears_int);

    let settlingCash = earlySettlementCash;

    // FOR EARLY SETTLEMENT
    setEarlySettlementAmount(settlingCash);
    handleAccruedInterestandAccruedPenal();
    handleEarlySettlementRescheduleDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDetails, memberNumberValue, transactionType]);

  // SETTING THE AMOUNTS BASED ON THE TRANSACTION TYPE
  useEffect(() => {
    if (transactionType === "T") {
      setAmount(topUpAmount);
    } else if (transactionType === "E") {
      setAmount(earlySettlementAmount);
    } else if (transactionType === "C") {
      setAmount(reductionAmount);
    } else if (transactionType === "R") {
      setAmount(rescheduleAmount);
    }
  }, [
    earlySettlementAmount,
    reductionAmount,
    rescheduleAmount,
    topUpAmount,
    transactionType,
  ]);

  // FUNCTIONS
  // HANDLE FORCE DEBIT OF CHANGED OF TRANSACTION TYPE
  const handleForceDebit = (transactionValue) => {
    if (transactionValue === "T" || transactionValue === "R") {
      setForceDebit("Y");
    } else {
      setForceDebit("N");
    }
  };

  // HANDLE THE VALIDATIONS AND WHAT HAPPENS WHEN YOU DO AN ONCHANGE ON THE TRANSACTION TYPE
  const handleOnchangeOfTransactionType = (value) => {
    let expiryDate = formatDate(formDetails[0]?.last_repay_date);

    // TODO: WORK ON THE FEE GAINED WHEN CHANGING THE TRANSACTION TYPE
    axios
      .post(
        API_SERVER + "/api/onchange-transaction-type",
        {
          PAYMENT_TYPE_v: value,
          LAST_REPAY_DATE_v: expiryDate,
          INTEREST_REVENUE_ACCT_v: formDetails[0]?.maintenance_fee_account,
          F_NO_v: formDetails[0]?.facility_no,
        },
        { headers: headers }
      )
      .then(function (response) {
        if (response.data?.responseMessage) {
          Swal.fire({
            title: response.data?.responseMessage,
            text: "",
            icon: "error",
          });
          setTransactionType("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // HANDLE RESET ALL THE TRANSACTION TYPES
  const handleResetTransactionTypes = () => {
    setTopUpAmount(0);
    setReductionAmount(0);
    setEarlySettlementAmount(0);
  };

  // HANDLE THE VALIDATIONS AND WHAT HAPPENS WHEN YOU CLICK ON THE NEXT BUTTON
  const handleOnClickOfContinue = () => {
    let expiryDate = formatDate(formDetails[0]?.last_repay_date);

    if (transactionType === "T") {
      setAmount(topUpAmount);
    } else if (transactionType === "E") {
      setAmount(earlySettlementAmount);
    } else if (transactionType === "C") {
      setAmount(reductionAmount);
    } else if (transactionType === "R") {
      setAmount(rescheduleAmount);
    }

    // HANDLE VALIDATION ON CLICKING NEXT TO PROCEED LOAN PAYMENT
    if (activeTab === 1) {
      console.log(
        {
          PAYMENT_TYPE_v: transactionType,
          amt_v: parseFloat(amount),
          min_reduct_v: parseFloat(totalArrears),
          arr_int_v: parseFloat(formDetails[0]?.arrears_int),
          PEN_ADJUST_v: parseFloat(formDetails[0]?.cot_amount),
          INT_ADJUST_v: parseFloat(formDetails[0]?.od_accrued_int),
          PRINCIPAL_TO_PAY_v: parseFloat(formDetails[0]?.shadow_balance_today),
          SHADOW_BALANCE_TODAY_v: parseFloat(
            formDetails[0]?.shadow_balance_today
          ),
          FORCE_DB_v: forceDebit,
          SUM_FEE_AMOUNT_v: 0,
          credit_bal_v: parseFloat(formDetails[0]?.avbal_mfa),
          LAST_REPAY_DATE_v: expiryDate,
        },
        "CAPPP"
      );
      axios
        .post(
          API_SERVER + "/api/onchange-transaction-type-validations",
          {
            PAYMENT_TYPE_v: transactionType,
            amt_v: parseFloat(amount),
            min_reduct_v: parseFloat(totalArrears),
            arr_int_v: parseFloat(formDetails[0]?.arrears_int),
            PEN_ADJUST_v: parseFloat(formDetails[0]?.cot_amount),
            INT_ADJUST_v: parseFloat(formDetails[0]?.od_accrued_int),
            PRINCIPAL_TO_PAY_v: parseFloat(
              formDetails[0]?.shadow_balance_today
            ),
            SHADOW_BALANCE_TODAY_v: parseFloat(
              formDetails[0]?.shadow_balance_today
            ),
            FORCE_DB_v: forceDebit,
            SUM_FEE_AMOUNT_v: 0,
            credit_bal_v: parseFloat(formDetails[0]?.avbal_mfa),
            LAST_REPAY_DATE_v: expiryDate,
          },
          { headers: headers }
        )
        .then(function (response) {
          if (
            response.data?.responseMessage !== null &&
            response.data?.responseMessage?.split(" - ")[0] === "ERR"
          ) {
            Swal.fire({
              title: response.data?.responseMessage,
              // text: response.data?.responseMessage,
              icon: "error",
            });
            setTransactionType("");
            setActiveTab(1);
          } else if (
            response.data?.responseMessage?.split(" - ")[0] === "INF"
          ) {
            Swal.fire({
              title: response.data?.responseMessage,
              // text: response.data?.responseMessage,
              icon: "info",
            });

            setActiveTab(2);
          } else {
            setActiveTab(2);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab === 2 && transactionType === "E" && forceDebit === "N") {
      setActiveTab(4);
    } else {
      setActiveTab((prev) => prev + 1);
    }
  };

  // HANDLE THE VALIDATIONS AND WHAT HAPPENS WHEN YOU CLICK ON THE PREVIOUS BUTTON
  const handleOnClickOfPrevious = () => {
    if (activeTab <= 4 || activeTab > 1) {
      setActiveTab((prev) => prev - 1);
    }
    if (activeTab === 4 && transactionType === "E" && forceDebit === "Y") {
      setActiveTab(2);
    }
  };

  // HANDLE WHAT HAPPENS WHEN YOU SELECT A PARTICULAR PRINCIPAL ACCOUT OF A CUSTOMER
  const handleOnChangeOfPrincipalAccount = (principalAccount) => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        {
          key: "formDetails",
          principal_acct: principalAccount,
        },
        { headers }
      )
      .then((response) => {
        setFormDetails(response?.data);
        setLoading(false);
        console.log(response?.data, "FORM DETAILS");
        handleTheOtherArrears(response?.data[0]?.facility_no);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // HANDLE THE ACCRUED INTEREST AND ACCRUED PENAL WHEN YOU SELECT A PARTICULAR PRINCIPAL ACCOUNT OF A CUSTOMER
  const handleAccruedInterestandAccruedPenal = () => {
    axios
      .post(
        API_SERVER + "/api/get-accInt-get-accSusp",
        {
          principal_acct: formDetails[0]?.maintenance_fee_account,
        },
        { headers: headers }
      )
      .then(function (response) {
        setAccruedInt(response.data[0]?.ACR_CHG);
        setAccruedPenal(response.data[0]?.ACR_PENAL);
      })
      .catch((err) => console.log(err));
  };

  // HANDLE THE PRINCIPAL, INTEREST AND ARREARS INTEREST SUSPENSE DATA
  const handleTheOtherArrears = (facility_no) => {
    axios
      .post(
        API_SERVER + "/api/get-loan-arrears-details",
        { facility_number: facility_no },
        { headers: headers }
      )
      .then(function (response) {
        setPrincipalArrears(response?.data[0]?.PRINCIPAL_ARREARS);
        setInterestArrears(response?.data[0]?.INTEREST_ARREARS);
        setArrInterestSusp(response?.data[0]?.ARRINTEREST_SUSP);
      })
      .catch((err) => console.log(err));
  };

  // VARIABLES AND CALCULATIONS
  let totalArrears;
  let totalSuspense;

  // TOTAL ARREARS CALCULATED AT THE TOTAL ARREARS
  totalArrears =
    parseFloat(principalArrears) +
    parseFloat(interestArrears) +
    parseFloat(formDetails[0]?.cot_amount) +
    parseFloat(formDetails[0]?.arrears_int);

  // TOTAL SUSPENSE CALCULATED AT THE TOTAL SUSPENSE AREA
  totalSuspense =
    parseFloat(formDetails[0]?.od_intin_susp) +
    parseFloat(formDetails[0]?.pen_intin_susp) +
    parseFloat(arrInterestSusp);

  const handleEarlySettlementRescheduleDetails = () => {
    axios
      .post(
        API_SERVER + "/api/early-settle-loan",
        {
          facility_no: formDetails[0]?.facility_no,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setEarlySettlementData(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // OK BUTTON
  const loanPayment = () => {
    const ip = localStorage.getItem("ipAddress");
    const arrIntVal = waiverOptionData?.totalLoanBalances?.arrears?.replace(
      /,/g,
      ""
    );
    const penToBePaid = waiverOptionData?.totalLoanBalances?.penalty?.replace(
      /,/g,
      ""
    );
    const intToBePaid = waiverOptionData?.totalLoanBalances?.interest?.replace(
      /,/g,
      ""
    );
    const accBalance = formDetails[0]?.avbal_mfa?.replace(/,/g, "");
    const d = JSON.parse(localStorage.getItem("userInfo"));
    const user = d?.id;
    const hostname = d?.id;

    const principalToPay =
      parseFloat(amount) - parseFloat(intToBePaid) - parseFloat(penToBePaid) >
        parseFloat(formDetails[0]?.shadow_balance_today) &&
      transactionType !== "T"
        ? parseFloat(formDetails[0]?.shadow_balance_today)
        : parseFloat(amount) -
            parseFloat(intToBePaid) -
            parseFloat(penToBePaid) >
            0 && transactionType !== "T"
        ? parseFloat(amount) - parseFloat(intToBePaid) - parseFloat(penToBePaid)
        : 0;

    axios
      .post(
        API_SERVER + "/api/lending-payments",
        {
          PRINCIPAL_ACCT_V: principalAccountValue, // principal account
          effective_date_v: formDetails[0]?.effective_date, // effective date
          CUSTOMER_NO_v: memberNumberValue, // customer number
          facility_no_v: formDetails[0]?.facility_no, // facility number
          payment_type_v: transactionType, // transaction type
          amt_v: parseFloat(amount),
          REASON_v: paymentReasonsData?.comment, // reason - text
          document_ref_v: parseFloat(paymentReasonsData?.documentNumber),
          EARLY_FEE_AMOUNT_v: parseFloat(chargesDetailsData?.fee), // charges details section
          EARLY_PENAL_AMOUNT_v: 0, // charges details section
          min_reduct_v: parseFloat(reductionAmount), // must find
          arr_int_v: parseFloat(arrIntVal), // arrears to be paid
          PEN_ADJUST_v: penToBePaid === "" ? 0 : parseFloat(penToBePaid), // penalty to be paid
          INT_ADJUST_v: intToBePaid === "" ? 0 : parseFloat(intToBePaid), // interest to be paid
          SHADOW_BALANCE_TODAY_v: parseFloat(
            formDetails[0]?.shadow_balance_today
          ), // shadow balance
          PRINCIPAL_TO_PAY_v: parseFloat(principalToPay), // must find
          FORCE_DB_v: forceDebit, // force debit
          SUM_FEE_AMOUNT_v: parseFloat(chargesDetailsData?.totalFee), // total fees amount
          credit_bal_v: parseFloat(accBalance), // account balance
          INT_RATE_v:
            transactionType === "E"
              ? parseFloat(earlySettlementData?.interest_rate)
              : parseFloat(rescheduleDetailsData?.interestRate), // interest rate
          REPNT_PERIOD_MONTHS_v:
            transactionType === "E"
              ? parseFloat(earlySettlementData?.repnt_period_months)
              : parseFloat(rescheduleDetailsData?.tenor), // new tenor value
          INT_REPAY_PLAN_v:
            transactionType === "E"
              ? earlySettlementData?.interest_repay_freq
              : rescheduleDetailsData?.interestRepaymentFrequencyValue,
          REPAYMENT_PLAN_v:
            transactionType === "E"
              ? earlySettlementData?.repayment_plan
              : rescheduleDetailsData?.principalRepaymentFrequencyValue,
          username_v: user,
          RESCH_AFTER_PAY_v: "Y", // a check box
          branch_code_v: formDetails[0]?.branch_code,
          WAIVER_OPTION_v: waiverOptionData?.waiverOptionValue,
          EARLY_FEES_v: 0, // fee first box NOT SHOWING ????
          EARLY_PENAL_v: 0, // penalty first box NOT SHOWING ????
          INSURANCE_v:
            chargesDetailsData?.insurance === ""
              ? 0
              : parseFloat(chargesDetailsData?.insurance),
          INSURANCE_AMOUNT_v:
            chargesDetailsData?.insurance === ""
              ? 0
              : parseFloat(chargesDetailsData?.insurance),
          ARR_WAIVE_v:
            waiverOptionData?.waiverAmount?.arrears === ""
              ? 0
              : parseFloat(waiverOptionData?.waiverAmount?.arrears),
          INT_WAIVE_v:
            waiverOptionData?.waiverAmount.interest === ""
              ? 0
              : parseFloat(waiverOptionData?.waiverAmount.interest),
          PEN_WAIVE_v:
            waiverOptionData?.waiverAmount.penalty === ""
              ? 0
              : parseFloat(waiverOptionData?.waiverAmount.penalty),
          INT_PAY_COUNT_v: parseFloat(intCnt),
          PRIN_PAY_COUNT_v: parseFloat(repayCnt),
          INT_TYPE_v:
            transactionType === "E"
              ? earlySettlementData?.int_type
              : rescheduleDetailsData?.interestTypeValue,
          INT_MORATO_v:
            transactionType === "E"
              ? earlySettlementData?.int_moratorium
              : rescheduleDetailsData?.moratoriumWithInterest,
          MORATORIUM_PERIOD_v: isNaN(
            parseFloat(rescheduleDetailsData?.moratoriumPeriod)
          )
            ? 0
            : transactionType === "E"
            ? parseFloat(earlySettlementData?.pri_moratorium)
            : parseFloat(rescheduleDetailsData?.moratoriumPeriod),
          LAST_DAY_v: "N",
          EXEMPT_MONTH_v:
            transactionType === "R" ||
            transactionType === "T" ||
            transactionType === "C"
              ? "N"
              : "",
          machine_id_v: ip,
          new_class_v: formDetails[0]?.acct_class,
          currency_v: formDetails[0]?.currency_code,
          hostname_v: hostname,
          ACTION_V: "C",
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data?.responseMessage, "THE OK");

        var checkingStatus = response.data?.responseMessage?.split(" - ")[0];
        console.log(checkingStatus);
        if (checkingStatus?.trim() === "ERR") {
          Swal.fire(response.data?.responseMessage, "", "error");
        } else {
          Swal.fire(response.data?.responseMessage, "", "success");
          setFormDetails([]);
          setPrincipalAccountValue("");
          setMemberNumberValue("");
          setActiveTab("1");
          setTransactionType("");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error, "THE OK");
      });
  };

  useEffect(() => {
    setActiveTab(activeTab);
    getDisabledTabs(activeTab);
  }, [activeTab]);

  return (
    <div className="mb-36 px-3">
      {/* LOADING OVERLAY  */}
      {loading && (
        <div className="h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-70 absolute z-10">
          <div className="z-30 opacity-100 text-center rounded-full">
            <Spin size="large" />
            <div className="text-sm mt-3 ">Fetching data...</div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div>
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayView={"none"}
          displayReject={"none"}
          displayFetch={"none"}
          onNewClick={() => {
            setFormDetails([]);
            setPrincipalAccountValue("");
            setMemberNumberValue("");
            setActiveTab("1");
            setTransactionType("");
          }}
          onRefreshClick={() => {
            handleOnChangeOfPrincipalAccount(principalAccount);
          }}
          onOkClick={() => {
            loanPayment();
          }}
        />
      </div>
      <br />

      <div className="flex gap-4 flex-1">
        {/* LEFT SIDE COLUMN */}
        <div className="flex-[0.5] border border-[#ccc] rounded-md p-2 space-y-4">
          <Header headerShade title={"Member Details"} />
          {/* MEMBER NUMBER */}
          <ListOfValue
            label={"Member Number"}
            required
            labelWidth={"25%"}
            inputWidth={"70%"}
            data={memberNumber}
            onChange={(value) => {
              setMemberNumberValue(value);
              setTimeout(() => {
                const input = document.getElementById("principalAccount");
                input?.focus();
              }, 0);
              setFormDetails([]);
              setPrincipalAccountValue("");
            }}
            value={memberNumberValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = document.getElementById("principalAccount");
                input?.focus();
              }
            }}
          />

          {/* PRINCIPAL ACCOUNT */}
          <ListOfValue
            label={"Principal Account"}
            labelWidth={"25%"}
            required
            id={"principalAccount"}
            inputWidth={"70%"}
            data={principalAccount}
            onChange={(value) => {
              setPrincipalAccountValue(value);
              handleOnChangeOfPrincipalAccount(value);
              handleAccruedInterestandAccruedPenal(value);
            }}
            value={principalAccountValue}
          />

          {/* EFFECTIVE DATE AND EXPIRY DATE */}
          <div className="flex items-center w-full">
            <div className="w-1/2">
              <InputField
                label={"Effective Date"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatDate(formDetails[0]?.effective_date)
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Expiry Date"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatDate(formDetails[0]?.last_repay_date)
                }
              />
            </div>
          </div>

          {/* FACILITY NUMBER AND ACCOUNT CLASS */}
          <div className="flex items-center w-full">
            <div className="w-1/2">
              <InputField
                label={"Facility Number"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                textAlign={"center"}
                disabled
                value={
                  formDetails.length === 0 ? "" : formDetails[0]?.facility_no
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Account Class"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formDetails[0]?.acct_class_desc
                }
              />
            </div>
          </div>

          {/* RATE AND TENOR */}
          <div className="flex items-center w-full">
            <div className="w-1/2">
              <InputField
                label={"Rate"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                textAlign={"right"}
                value={
                  formDetails.length === 0 ||
                  formDetails[0]?.interest_rate === "null"
                    ? ""
                    : formDetails[0]?.interest_rate
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Tenor"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formDetails[0]?.repnt_period_months
                }
              />
            </div>
          </div>

          {/* AMOUNT GRANTED AND REPAYMENT COUNT OUTSTANDING */}
          <div className="flex items-center w-full">
            <div className="w-1/2">
              <InputField
                label={"Amount Granted"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                textAlign={"right"}
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.facility_amount))
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                title={"Repayment Count Outstanding"}
                label={"RCO"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                textAlign={"right"}
                disabled
                value={repaymentCountOutstanding}
              />
            </div>
          </div>

          {/* <div className="flex justify-end">
            <ButtonComponent
              label={"Loan Enquiry"}
              buttonBackgroundColor={"#3b82f6"}
              buttonIcon={<FiEye />}
              buttonHeight={"31px"}
              buttonWidth={"150px"}
            />
          </div> */}

          <hr />

          {/* REPAYMENT ACCOUNT DETAILS */}
          <Header headerShade title={"Repayment Details"} />
          <div className="flex items-center w-full">
            <div className="w-1/2">
              <InputField
                label={"Repayment Account"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                textAlign={"center"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formDetails[0]?.maintenance_fee_account
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Account Balance"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                textAlign={"right"}
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.avbal_mfa))
                }
              />
            </div>
          </div>

          <div className="flex items-center w-full">
            <div className="w-1/2">
              <InputField
                label={"Accrued Interest"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                textAlign={"right"}
                value={
                  formatNumber(parseFloat(accruedInt)) === null
                    ? 0.0
                    : formatNumber(parseFloat(accruedInt))
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Accrued Penal"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                textAlign={"right"}
                value={
                  formatNumber(parseFloat(accruedPenal)) === null
                    ? 0.0
                    : formatNumber(parseFloat(accruedPenal))
                }
              />
            </div>
          </div>

          <hr />

          <Header headerShade title={"Balance, Arrears and Suspense"} />
          {/* BALANCE, ARREARS AND SUSPENCE */}
          <div className="flex flex-1">
            <div className="flex-[0.25] text-white text-right">balance.</div>
            <div className="flex-[0.25] text-center">Balance</div>
            <div className="flex-[0.25] text-center">Arrears</div>
            <div className="flex-[0.25] text-center">Suspence</div>
          </div>

          {/* PRINCIPLE */}
          <div className="flex flex-1">
            <div className="flex-[0.25] text-right text-sm">Principal</div>
            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(
                        parseFloat(formDetails[0]?.shadow_balance_today)
                      )
                }
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(principalArrears))
                }
              />
            </div>

            <div className="flex-[0.25] text-white">...</div>
          </div>

          {/* INTEREST */}
          <div className="flex flex-1">
            <div className="flex-[0.25] text-right text-sm">Interest</div>
            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.od_accrued_int))
                }
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(interestArrears))
                }
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.od_intin_susp))
                }
              />
            </div>
          </div>

          {/* PENALTY */}
          <div className="flex flex-1">
            <div className="flex-[0.25] text-right text-sm">Penalty</div>
            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.cot_amount))
                }
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.cot_amount))
                }
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.pen_intin_susp))
                }
              />
            </div>
          </div>

          {/* ARREARS INTEREST */}
          <div className="flex flex-1">
            <div className="flex-[0.25] text-right text-sm">
              Arrears Interest
            </div>
            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.arrears_int))
                }
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.arrears_int))
                }
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(arrInterestSusp))
                }
              />
            </div>
          </div>

          <hr />

          {/* TOTAL */}
          <div className="flex flex-1">
            <div className="flex-[0.25] text-right text-sm">Total</div>
            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(total))}
                className={"font-bold"}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(totalArrears))}
                className={"!text-red-500 font-bold"}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(totalSuspense))}
                className={"font-bold"}
              />
            </div>
          </div>
          <br />
        </div>

        {/* PAYMENT OPTIONS - RIGHT SIDE */}
        <div className="flex-[0.5] border border-[#ccc] rounded-md p-2 space-y-4">
          <Header headerShade title={"Payment Options"} />

          {/* TRANSACTION TYPE */}
          <SelectField
            label={"Transaction Type"}
            labelWidth={"40%"}
            required
            id={"transactionType"}
            inputWidth={"25%"}
            onChange={(value) => {
              setTransactionType(value);
              handleForceDebit(value);
              handleOnchangeOfTransactionType(value);
              handleResetTransactionTypes();
              setActiveTab(1);
            }}
            value={transactionType}
            data={[
              {
                label: "Capital Reduction",
                value: "C",
              },
              {
                label: "Top Up",
                value: "T",
              },
              {
                label: "Early Settlement",
                value: "E",
              },
              {
                label: "Reschedule",
                value: "R",
              },
            ]}
          />

          {/* FIELDS BASED ON TRANSACTION TYPE */}
          {transactionType === "T" ? (
            <InputField
              inputWidth={"25%"}
              label={"Top Up Amount"}
              labelWidth={"40%"}
              onChange={(e) => setTopUpAmount(e.target.value)}
              required
              textAlign={"right"}
              value={topUpAmount}
              type={"number"}
              onKeyDown={handleKeyDown}
              onWheel={(e) => e.target.blur()}
            />
          ) : transactionType === "C" ? (
            <InputField
              inputWidth={"25%"}
              label={"Reduction Amount"}
              labelWidth={"40%"}
              onChange={(e) => setReductionAmount(e.target.value)}
              required
              textAlign={"right"}
              value={reductionAmount}
              type={"number"}
              onKeyDown={handleKeyDown}
              onWheel={(e) => e.target.blur()}
            />
          ) : transactionType === "R" ? (
            <InputField
              inputWidth={"25%"}
              label={"Amount"}
              labelWidth={"40%"}
              onChange={(e) => setRescheduleAmount(e.target.value)}
              required
              disabled
              textAlign={"right"}
              value={rescheduleAmount}
              type={"number"}
              onKeyDown={handleKeyDown}
              onWheel={(e) => e.target.blur()}
            />
          ) : transactionType === "E" ? (
            <InputField
              inputWidth={"25%"}
              label={"Total Settlement Amount"}
              labelWidth={"40%"}
              onChange={(e) => setEarlySettlementAmount(e.target.value)}
              required
              disabled
              textAlign={"right"}
              value={earlySettlementAmount?.toFixed(2)}
              type={"number"}
              onKeyDown={handleKeyDown}
              onWheel={(e) => e.target.blur()}
            />
          ) : (
            ""
          )}

          {/* FORCE DEBIT */}
          {transactionType === "T" || transactionType === "R" ? (
            <InputField
              label={"Force Debit"}
              labelWidth={"40%"}
              disabled
              inputWidth={"25%"}
              value={"Yes"}
            />
          ) : (
            <SelectField
              label={"Force Debit"}
              labelWidth={"40%"}
              id={"forceDebit"}
              inputWidth={"25%"}
              cursor={
                transactionType === "T" || transactionType === "R"
                  ? "not-allowed !important"
                  : "default"
              }
              textColor={
                transactionType === "T" || transactionType === "R"
                  ? "#ccc !important"
                  : "rgb(92, 92, 92)"
              }
              data={[
                { label: "Yes", value: "Y" },
                { label: "No", value: "N" },
              ]}
              onChange={(value) => {
                setForceDebit(value);
              }}
              value={forceDebit}
            />
          )}

          <div
            className="flex items-center justify-center ml-32"
            style={{
              zoom: 0.9,
              cursor:
                formDetails?.length !== 0
                  ? "pointer"
                  : "not-allowed !important",
            }}
          >
            <ButtonComponent
              label={"Loan Enquiry"}
              buttonHeight={"29px"}
              buttonBackgroundColor={
                formDetails?.length !== 0 ? "#070269" : "#ccc"
              }
              onClick={
                formDetails?.length !== 0
                  ? () => setShowEnquiryScreen(true)
                  : null
              }
              fontSize={"95%"}
              buttonWidth={"145px"}
              buttonIcon={<FiFileText />}
            />
          </div>

          <br />

          <hr />

          {/* TAB COMPONENT */}
          <TabsComponent
            tabsData={loanPaymentTabs}
            activeTab={String(activeTab)}
            setActiveTab={(value) => {
              setActiveTab(value);
              getDisabledTabs(value);
            }}
            // activeColor={"#40c057"}
            disabledTabs={getDisabledTabs(activeTab)}
            activeColor={"#87adff"}
          />

          <hr />

          <div className="flex gap-3 justify-end">
            {activeTab > 1 && (
              <ButtonComponent
                label={"Previous"}
                buttonHeight={"30px"}
                buttonWidth={"110px"}
                buttonIcon={<BiLeftArrowCircle />}
                onClick={() => {
                  handleOnClickOfPrevious();
                }}
                buttonBackgroundColor={"black"}
              />
            )}
            {activeTab < 4 && (
              <ButtonComponent
                label={"Continue"}
                buttonHeight={"30px"}
                buttonWidth={"110px"}
                buttonIcon={<BiRightArrowCircle />}
                onClick={() => {
                  if (transactionType === "") {
                    Swal.fire({
                      title: "ERR-01573: Select a payment type",
                      icon: "error",
                    });
                  } else {
                    handleOnClickOfContinue();
                  }
                }}
                buttonBackgroundColor={"black"}
              />
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {/* LOAN GENERAL ENQUIRY MODAL */}
      <Modal
        opened={showEnquiryScreen}
        size={"80%"}
        padding={0}
        withCloseButton={false}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
        onClose={() => setShowEnquiryScreen(false)}
      >
        <NewLoanGeneralEnquiry
          closeModal={() => setShowEnquiryScreen(false)}
          facilityDetails={formDetails[0]}
          selectedCustomer={formDetails[0]}
        />
      </Modal>
    </div>
  );
}

export default NewLoanReschedulePayment;
