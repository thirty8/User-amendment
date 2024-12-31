import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ButtonComponent from "../components/button/ButtonComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import TextAreaField from "../components/fields/TextArea";
import { Loader, LoadingOverlay, Modal, ScrollArea, Tabs } from "@mantine/core";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import Swal from "sweetalert2";
import Header from "../../../../components/others/Header/Header";
import { FiX, FiEye } from "react-icons/fi";
import CustomTable from "../../control-setups/components/CustomTable";
import DocumentViewing from "../../../../components/others/DocumentViewing";
import swal from "sweetalert";
import LoanGeneralEnquiry from "../facility-enquiry/loan-general-enquiry";
import Collateral from "./collateral";

// HEADERS
const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const quotationScheduleHeaders = [
  <div>Seq No.</div>,
  <div>Date Due</div>,
  <div style={{ textAlign: "right" }}>Principal</div>,
  <div style={{ textAlign: "right" }}>Interest</div>,
  <div style={{ textAlign: "right" }}>Payment</div>,
  <div style={{ textAlign: "right" }}>Proc. Fees</div>,
];

// DATE FORMATTER
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

const effectiveDateString = localStorage.getItem("userInfo");
const userInfo = JSON.parse(effectiveDateString);

const postingDate = userInfo?.postingDate?.split("T")[0];

// DATE COMPARISONS
function compareDates(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return date1.getTime() < date2.getTime(); // Use > for "greater than" comparison
}

// CURRENT DATE
const currentDate = new Date();

const LoanPaymentApproval = ({ facilityNo, setShowModal }) => {
  const [loanCustomers, setLoanCustomers] = useState("");
  const [loadingApproval, setLoadingApproval] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [moratoriumPeriod, setMoratoriumPeriod] = useState(0);
  const [loanCustomersArr, setLoanCustomersArr] = useState([]);
  const [principalAmountArray, setPrincipalAmountArray] = useState([]);
  const [principalAmount, setprincipalAmount] = useState("");
  const [waiver, setWaiver] = useState("");
  const [waiverArr, setWaiverArr] = useState([]);
  const [transType, setTransType] = useState("");
  const [formDetails, setFormDetails] = useState([]);
  const [documentNumber, setDocumentNumber] = useState("");
  const [fee, setFee] = useState(0);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [insurance, setInsurance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewScheduleState, setPreviewScheduleState] = useState(false);
  const [openPreviewSchedule, setOpenPreviewSchedule] = useState(false);
  const [insuranceRate, setInsuranceRate] = useState(0);
  const [insuranceAmount, setInsuranceAmount] = useState(0);
  const [principalToPay, setPrincipalToPay] = useState(0);
  const [newTenorVal, setNewTenorVal] = useState("");
  const [moratoriumWithInterest, setMoratoriumWithInterest] = useState("N");
  const [interestRatePM, setInterestRatePM] = useState("");
  const [totalFeesAmount, setTotalFeesAmount] = useState(0);
  const [totalFeesAmountVal, setTotalFeesAmountVal] = useState(0);
  const [interestType, setInterestType] = useState([]);
  const [interestTypeVal, setInterestTypeVal] = useState("");
  const [principalRepayFreq, setPrincipalRepayFreq] = useState([]);
  const [principalRepayFreqVal, setPrincipalRepayFreqVal] = useState("");
  const [interestRepayFreqVal, setInterestRepayFreqVal] = useState("");
  const [total, setTotal] = useState(0);
  const [repayCnt, setRepayCnt] = useState("");
  const [intCnt, setIntCnt] = useState("");
  const [principalArrears, setPrincipalArrears] = useState("");
  const [interestArrears, setInterestArrears] = useState("");
  const [arrInterestSusp, setArrInterestSusp] = useState("");
  const [accruedInt, setAccruedInt] = useState("");
  const [accruedPenal, setAccruedPenal] = useState("");
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [previewData, setPreviewData] = useState([]);
  const [reason, setReason] = useState("");
  const [forceDebit, setForceDebit] = useState("N");
  const [nextSchedule, setNextSchedule] = useState("");
  const [showEnquiryScreen, setShowEnquiryScreen] = useState(false);
  const [rejectionComment, setRejectionComment] = useState("");
  const [showCollateralScreen, setShowCollateralScreen] = useState(false);
  const [earlySettlement, setEarlySettlement] = useState(
    formDetails[0]?.shadow_balance_today
  );
  const [capitalReduction, setCapitalReduction] = useState(0);
  const [balanceToReschedule, setBalanceToReschedule] = useState(0);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [
    remainingLoanBalanceAfterReduction,
    setRemainingLoanBalanceAfterReduction,
  ] = useState(0);
  const [actAmounts, setActAmount] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
  });
  const [waiverPercentage, setWaiverPercentage] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
  });
  const [waiverAmount, setWaiverAmount] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
  });
  const [totalToBePaid, setTotalToBePaid] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
    loanPrincipal: 0,
    newLoanAfterWaivers: 0,
  });
  const [totalToBePaid2, setTotalToBePaid2] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
    loanPrincipal: 0,
    newLoanAfterWaivers: 0,
  });

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    let numericAndPunctuationValue = inputValue.replace(/[^\d,.]/g, ""); // Allow digits, commas, and periods

    if (numericAndPunctuationValue.indexOf(".") === -1) {
      numericAndPunctuationValue += ".";
    }

    setTopUpAmount(numericAndPunctuationValue);
  };

  function handleClick() {
    if (documentNumber === "") {
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
      setSweetAlertConfirmed(true);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      getPreviewSchedule(facilityNo);
      handleLoanPaymentSchedulePrc(data2[0]?.REPAYMENT_PLAN);

      axios
        .post(
          API_SERVER + "/api/get-repaycnt-outstanding",
          { facility_number: data2[0]?.FACILITY_NO },
          { headers: headers }
        )
        .then(function (response) {
          setRepayCnt(response?.data[0]?.COUNT);
        })
        .catch((err) => console.log(err));

      axios
        .post(
          API_SERVER + "/api/get-intcnt-outstanding",
          { facility_number: data2[0]?.FACILITY_NO },
          { headers: headers }
        )
        .then(function (response) {
          setIntCnt(response?.data[0]?.COUNT);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, []);

  useEffect(() => {}, []);

  let lastDayExpiry2 = formatDate(formDetails[0]?.last_repay_date);

  let isDate1GreaterThanDate2s = compareDates(
    formatDate(currentDate),
    lastDayExpiry2
  );

  function calculateInterest(type, side) {
    if (type === "interest") {
      if (side === 1) {
        const interest =
          (waiverPercentage.interest / 100) *
          parseFloat(actAmounts.interest.replaceAll(",", ""));
        setWaiverAmount((prev) => ({
          ...prev,
          interest: formatNumber(interest),
        }));

        setTotalToBePaid2({
          ...totalToBePaid2,
          interest: formatNumber(
            parseFloat(totalToBePaid?.interest.replaceAll(",", "")) - interest
          ),
        });

        // console.log(interest, actAmounts.interest, waiverPercentage.interest);
      } else {
        // Interest Percentage = (Interest Amount / Principal Amount) * 100
        const percentage =
          (waiverAmount.interest?.replaceAll(",", "") /
            actAmounts.interest.replaceAll(",", "")) *
          100;
        setWaiverPercentage((prev) => ({
          ...prev,
          interest: percentage?.toFixed(2),
        }));
        setTotalToBePaid2({
          ...totalToBePaid2,
          interest: formatNumber(
            parseFloat(totalToBePaid?.interest.replaceAll(",", "")) -
              parseFloat(waiverAmount.interest.replaceAll(",", ""))
          ),
        });
      }
      // setTotalToBePaid((prev)=>({...prev , interest }))
    } else if (type === "penalty") {
      if (side === 1) {
        const interest =
          (waiverPercentage.penalty / 100) *
          parseFloat(actAmounts.penalty.replaceAll(",", ""));
        setWaiverAmount((prev) => ({
          ...prev,
          penalty: formatNumber(interest),
        }));

        setTotalToBePaid2({
          ...totalToBePaid2,
          penalty: formatNumber(
            parseFloat(totalToBePaid?.penalty.replaceAll(",", "")) - interest
          ),
        });

        // console.log(interest, actAmounts.penalty, waiverPercentage.penalty);
      } else {
        // Interest Percentage = (Interest Amount / Principal Amount) * 100
        const percentage =
          (waiverAmount.penalty?.replaceAll(",", "") /
            actAmounts.penalty.replaceAll(",", "")) *
          100;
        setWaiverPercentage((prev) => ({
          ...prev,
          penalty: percentage?.toFixed(2),
        }));
        setTotalToBePaid2({
          ...totalToBePaid2,
          penalty: formatNumber(
            parseFloat(totalToBePaid?.penalty.replaceAll(",", "")) -
              parseFloat(waiverAmount.penalty.replaceAll(",", ""))
          ),
        });
      }
    } else if (type === "arrears") {
      if (side === 1) {
        const interest =
          (waiverPercentage.arrears / 100) *
          parseFloat(actAmounts.arrears.replaceAll(",", ""));
        setWaiverAmount((prev) => ({
          ...prev,
          arrears: formatNumber(interest),
        }));
        // console.log(interest, actAmounts.arrears, waiverPercentage.arrears);

        setTotalToBePaid2({
          ...totalToBePaid2,
          arrears: formatNumber(
            parseFloat(totalToBePaid?.arrears.replaceAll(",", "")) - interest
          ),
        });
      } else {
        // Interest Percentage = (Interest Amount / Principal Amount) * 100
        const percentage =
          (waiverAmount.arrears?.replaceAll(",", "") /
            actAmounts.arrears.replaceAll(",", "")) *
          100;
        setWaiverPercentage((prev) => ({
          ...prev,
          arrears: percentage?.toFixed(2),
        }));

        setTotalToBePaid2({
          ...totalToBePaid2,
          arrears: formatNumber(
            parseFloat(totalToBePaid?.arrears.replaceAll(",", "")) -
              parseFloat(waiverAmount.arrears.replaceAll(",", ""))
          ),
        });
      }
    }
  }

  function getPreviewSchedule(facility_no) {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-preview-sch",
        {
          facility_number: facility_no,
        },
        { headers: headers }
      )
      .then(function (response) {
        setLoading(false);
        setPreviewData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  // Preview Schedule Data
  let totalPrincipal = 0;
  let totalInterest = 0;
  let totalMonthP = 0;
  let totalProcFees = 0;

  var qs = previewData?.map((i) => {
    const principalValue = parseFloat(i?.PRINCIPAL);
    const interestValue = parseFloat(i?.INTEREST);
    const monthPValue = parseFloat(i?.MONTHP);
    const procFeesValue = parseFloat(i?.PROC_FEES);

    if (!isNaN(principalValue)) {
      totalPrincipal += principalValue;
    }
    if (!isNaN(interestValue)) {
      totalInterest += interestValue;
    }
    if (!isNaN(monthPValue)) {
      totalMonthP += monthPValue;
    }
    if (!isNaN(procFeesValue)) {
      totalProcFees += procFeesValue;
    }

    return [
      <div>{i?.REPAY_SEQ_NO}</div>,
      <div>{formatDate(i?.DATE_DUE)}</div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.PRINCIPAL))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.INTEREST))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.MONTHP))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.PROC_FEES))}
      </div>,
    ];
  });

  function getInsuranceAmount(insurance_rate) {
    axios
      .post(
        API_SERVER + "/api/get-insurance-amt",
        {
          balance_remaining:
            waiver === "01" || waiver === "02" || waiver === "99"
              ? totalToBePaid2.newLoanAfterWaivers
              : remainingLoanBalanceAfterReduction,
          insurance: insurance_rate,
        },
        { headers: headers }
      )
      .then(function (response) {
        setInsurance(response.data[0]?.INSURANCE_AMT);
        setTotalFeesAmount(
          parseFloat(response.data[0]?.INSURANCE_AMT) +
            (parseFloat(fee) !== "" ? parseFloat(fee) : 0)
        );
        console.log(response.data[0], "the weeknd");
      })
      .catch((err) => console.log(err));
  }

  function getInsuranceRate(insurance_amt) {
    axios
      .post(
        API_SERVER + "/api/get-insurance-rate",
        {
          balance_remaining:
            waiver === "01" || waiver === "02" || waiver === "99"
              ? totalToBePaid2.newLoanAfterWaivers
              : remainingLoanBalanceAfterReduction,
          insurance_amt: insurance_amt,
        },
        { headers: headers }
      )
      .then(function (response) {
        setInsuranceRate(response.data[0]?.INSURANCE_RATE);
        setTotalFeesAmount(
          parseFloat(insurance) + (parseFloat(fee) !== "" ? parseFloat(fee) : 0)
        );
      })
      .catch((err) => console.log(err));
  }

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  function clearFields() {
    setPrincipalAmountArray([]);
    setprincipalAmount("");
    setTotal("");
    setWaiver("");
    setTotalToBePaid({
      interest: "",
      penalty: "",
      arrears: "",
      loanPrincipal: "",
      newLoanAfterWaivers: "",
    });
    setTotalToBePaid2({
      interest: "",
      penalty: "",
      arrears: "",
      loanPrincipal: "",
      newLoanAfterWaivers: "",
    });

    setActAmount({
      interest: "",
      penalty: "",
      arrears: "",
    });
    setWaiver("");
    setTransType("");
  }

  const [calc, setCalc] = useState(false);
  useEffect(() => {
    calculateTotal();
  }, [calc]);
  function calculateTotal() {
    const x = { ...totalToBePaid2, newLoanAfterWaivers: 0 };
    let sum = 0;
    Object.values(x).map((i) => {
      //  sum += typeof i === "string" ? : i;
      if (typeof i === "string") {
        sum += parseFloat(i?.replaceAll(",", ""));
      } else {
        sum += i;
      }
    });
    // console.log({ sum });
    setTotalToBePaid2((prev) => ({
      ...prev,
      newLoanAfterWaivers: formatNumber(sum),
    }));
  }
  useEffect(() => {
    clearFields();
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        {
          key: "principaAccount",
          cust_no: loanCustomers,
        },
        { headers }
      )
      .then((response) => {
        setPrincipalAmountArray(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loanCustomers]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        {
          key: "formDetails",
          principal_acct: principalAmount,
        },
        { headers }
      )
      .then((response) => {
        setFormDetails(response?.data);
        console.log(response?.data, "formzy");
        setWaiver("00");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [principalAmount]);

  const confirmApproval = () => {
    Swal.fire({
      icon: "question",
      title: "Are You Sure You Want To Approve This Transaction?",
      // text: "Click OK to confirm all details and approve",
      html: 'Click <span style="color: darkblue; font-weight: bold;">OK</span> to confirm all details to approve',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        approveLoanPayment();
      }
    });
  };

  const customLoader = <Loader size="xl" />;

  const approveLoanPayment = () => {
    const arrIntVal = actAmounts.arrears.replace(/,/g, "");
    const penToBePaid = actAmounts.penalty.replace(/,/g, "");
    const intToBePaid = actAmounts.interest.replace(/,/g, "");
    const accBalance = formDetails[0]?.avbal_mfa.replace(/,/g, "");
    const d = JSON.parse(localStorage.getItem("userInfo"));
    const ipAddress = localStorage.getItem("ipAddress");
    const user = d?.username;
    const hostname = d?.id;

    setLoadingApproval(true);

    // MAIN DEAL
    axios
      .post(
        API_SERVER + "/api/app-lending-payments",
        {
          repayment_acct_v: data2[0]?.MAINTENANCE_FEE_ACCOUNT,
          principal_acct_v: data3[0]?.PRINCIPAL_ACCOUNT,
          SHADOW_BALANCE_TODAY_v: data3[0]?.SHADOW_BALANCE_TODAY,
          acct_class_v: data2[0]?.ACCT_CLASS,
          force_debit_v: data1?.FORCE_DEBIT,
          DOC_REF_V: data1?.DOCUMENT_ID,
          waiver_option_v: data1?.WAIVER_OPTION,
          payment_type_v: data1?.PAYMENT_TYPE,
          facility_no_v: data1?.FACILITY_NO,
          legal_form_v: data3[0]?.LEGAL_FORM,
          customer_no_v: data3[0]?.CUSTOMER_NUMBER,
          current_amount_v: parseFloat(total) + data1?.REPAYMENT_AMOUNT,
          INTEREST_REVENUE_ACCT_v: data2[0]?.MAINTENANCE_FEE_ACCOUNT,
          TT_TOPAY_v: parseFloat(total), // NEED TO CHECK THIS
          SUM_FEE_AMOUNT_v: data1?.INSURANCE_AMOUNT + data1?.EARLY_FEE_AMOUNT,
          AMT_v:
            data1?.PAYMENT_TYPE === "T"
              ? data1?.REPAYMENT_AMOUNT
              : data1?.PAYMENT_TYPE === "E"
              ? data2[0]?.SHADOW_BALANCE_TODAY
              : "", // amount to perform top up or whatever
          INT_ADJUST_v: parseFloat(intToBePaid),
          PEN_ADJUST_v: parseFloat(penToBePaid),
          ARR_INT_v: parseFloat(arrIntVal),
          resch_after_pay_v: data1?.RESCHEDULE, // check this out
          username_v: user,
          HOSTNAME_v: hostname,
          OD_INTEREST_AMOUNT_v: data2[0]?.OD_INTEREST_AMOUNT,
          arrears_bal_v: data2[0]?.ARREARS_INT,
          machine_ip_v: ipAddress,
          reason_v: data1?.REASON,
          prov_amt_v: data1?.PROVISION_AMT,
          prinbal_v: data2[0]?.SHADOW_BALANCE_TODAY,
          total_bal_v: parseFloat(totalBalance),
          early_penal_amount_v: data1?.EARLY_PENAL_AMOUNT,
          early_fee_amount_v: data1?.EARLY_FEE_AMOUNT,
          ARREARS_SUS_v: parseFloat(arrInterestSusp),
          OUT_PRIN_BAL_v: parseFloat(total) + data1?.REPAYMENT_AMOUNT,
          TOTAL_BALS_v: data2[0]?.SHADOW_BALANCE_TODAY, //check this from procedure
          last_day_v: "N",
          EXEMPT_MONTH_v:
            data1?.PAYMENT_TYPE === "R" ||
            data1?.PAYMENT_TYPE === "T" ||
            data1?.PAYMENT_TYPE === "C"
              ? "N"
              : "",
          int_pay_count_v: parseFloat(intCnt), // COUNT
          int_repay_plan_v: data2[0]?.INTEREST_REPAY_FREQ,
          int_rate_v: data3[0]?.INTEREST_RATE,
          moratorium_period_v: data2[0]?.MORATORIUM_PERIOD,
          int_morato_v: data2[0]?.INT_MORATORIUM,
          repnt_period_months_v: data2[0]?.REPNT_PERIOD_MONTHS,
          int_type_v: data2[0]?.INT_TYPE,
          repayment_plan_v: data2[0]?.REPAYMENT_PLAN,
          prin_pay_count_v: parseFloat(repayCnt), // COUNT
          pay_app_no_v: data1?.PAY_APP_NO,
          FACILITY_AMOUNT_v: data2[0]?.FACILITY_AMOUNT,
          current_app_flag_v: "02",
        },
        { headers: headers }
      )
      .then(function (response) {
        setLoadingApproval(false);
        console.log(response.data?.responseMessage, "APPROVAL MESSAGE");
        console.log("APPROVAL MESSAGE: loading - false: success");
        var checkingStatus = response.data?.responseMessage?.split(" - ")[0];
        console.log(checkingStatus);
        if (checkingStatus?.trim() === "ERR") {
          Swal.fire(response.data?.responseMessage, "", "error");
        } else {
          Swal.fire(response.data?.responseMessage, "", "success");
          // close modal
        }
        setShowModal(false);
      })
      .catch((error) => {
        setLoadingApproval(false);
        console.log(error, "APPROVAL MESSAGE - ERROR");
        Swal.fire(error, "", "error");
        console.log("APPROVAL MESSAGE: loading - false: error");
      });
  };

  // REJECT PAYMENT

  const rejectPayment = () => {
    const d = JSON.parse(localStorage.getItem("userInfo"));
    const user = d?.id;

    setLoadingApproval(true)

    axios
      .post(
        API_SERVER + "/api/rej-lending-payments",
        {
          username_v: user,
          f_no_v: data2[0]?.FACILITY_NO,
          amount_v: data3[0]?.AVBAL_MFA,
          pay_app_no_v: data1?.PAY_APP_NO,
          c_no_v: data3[0]?.PRINCIPAL_ACCOUNT,
          br_code_v: data1?.BRANCH,
          currency_code_v: data2[0]?.CURRENCY_CODE,
          FACILITY_AMOUNT_v: data2[0]?.FACILITY_AMOUNT,
          rejection_comment: rejectionComment,
        },
        { headers: headers }
      )
      .then(function (response) {
        setLoadingApproval(false)
        console.log(response.data?.responseMessage, "APPROVAL MESSAGE");
        console.log("APPROVAL MESSAGE: loading - false: success");
        var checkingStatus = response.data?.responseMessage?.split(" - ")[0];
        console.log(checkingStatus);
        if (checkingStatus?.trim() === "ERR") {
          Swal.fire(response.data?.responseMessage, "", "error");
        } else {
          Swal.fire(response.data?.responseMessage, "", "success");
          // close modal
        }
        setShowModal(false);
        setOpenRejectModal(false);
      })
      .catch((err) => {console.log("Something went wrong: " + err); setLoadingApproval(false)});
  };

  //   GETTING THE DETAILS VIA THE FACILITY NUMBER
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  //   DATA ON LOAD
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-code-details",
        { code: "LRT" },
        { headers: headers }
      )
      .then(function (response) {
        setInterestType(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        { headers: headers }
      )
      .then(function (response) {
        setPrincipalRepayFreq(response.data);
      })
      .catch((err) => console.log(err));

    // data 1
    axios
      .post(
        API_SERVER + "/api/data-for-loan-payment-approv",
        {
          facility_no: facilityNo,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response?.data[response.data?.length - 1], "Appdata 1");
        setData1(response?.data[response.data?.length - 1]);
      })
      .catch((err) => console.log(err));

    // data 2
    axios
      .post(
        API_SERVER + "/api/data2-for-loan-payment-approv",
        {
          facility_no: facilityNo,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response?.data, "Appdata 2");
        setData2(response?.data);
      })
      .catch((err) => console.log(err));

    axios
      .post(
        API_SERVER + "/api/get-loan-arrears-details",
        { facility_number: facilityNo },
        { headers: headers }
      )
      .then(function (response) {
        setPrincipalArrears(response?.data[0]?.PRINCIPAL_ARREARS);
        setInterestArrears(response?.data[0]?.INTEREST_ARREARS);
        setArrInterestSusp(response?.data[0]?.ARRINTEREST_SUSP);
      })
      .catch((err) => console.log(err));

    // get total balance
    axios
      .post(
        API_SERVER + "/api/get-balance-acct-loan-payment",
        {
          facility_no: facilityNo,
        },
        { headers }
      )
      .then((response) => {
        setData3(response.data);
        console.log(response.data, "Appdata 3");
      })
      .catch((err) => {
        console.log(err);
      });

    // get next schedule
    axios
      .post(
        API_SERVER + "/api/get-nxtSchedule",
        {
          facility_no: facilityNo,
        },
        { headers }
      )
      .then((response) => {
        setNextSchedule(response.data[0]?.MAX);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-accInt-get-accSusp",
        {
          principal_acct: data2[0]?.MAINTENANCE_FEE_ACCOUNT,
        },
        { headers: headers }
      )
      .then(function (response) {
        setAccruedInt(response.data[0]?.ACR_CHG);
        setAccruedPenal(response.data[0]?.ACR_PENAL);
      })
      .catch((err) => console.log(err));

    const principal = parseFloat(data2[0]?.SHADOW_BALANCE_TODAY);
    const interest = parseFloat(data2[0]?.OD_ACCRUED_INT);
    const penalty = parseFloat(data2[0]?.COT_AMOUNT);
    const arrInterest = parseFloat(data2[0]?.ARREARS_INT);

    setTotal(
      parseFloat(data2[0]?.SHADOW_BALANCE_TODAY) +
        parseFloat(data2[0]?.OD_INTEREST_AMOUNT) +
        parseFloat(data2[0]?.COT_AMOUNT) +
        parseFloat(data2[0]?.ARREARS_INT)
    );

    setActAmount({
      interest: formatNumber(parseFloat(data2[0]?.OD_ACCRUED_INT)),
      penalty: formatNumber(parseFloat(data2[0]?.COT_AMOUNT)),
      arrears: formatNumber(parseFloat(data2[0]?.ARREARS_INT)),
    });
    setTotalToBePaid({
      interest: formatNumber(parseFloat(data2[0]?.OD_ACCRUED_INT)),
      penalty: formatNumber(parseFloat(data2[0]?.COT_AMOUNT)),
      arrears: formatNumber(parseFloat(data2[0]?.ARREARS_INT)),
      loanPrincipal: formatNumber(parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)),
      newLoanAfterWaivers: formatNumber(
        principal + interest + penalty + arrInterest
      ),
    });
    setTotalToBePaid2({
      interest: formatNumber(parseFloat(data2[0]?.OD_ACCRUED_INT)),
      penalty: formatNumber(parseFloat(data2[0]?.COT_AMOUNT)),
      arrears: formatNumber(parseFloat(data2[0]?.ARREARS_INT)),
      loanPrincipal: formatNumber(parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)),
      newLoanAfterWaivers: formatNumber(
        principal + interest + penalty + arrInterest
      ),
    });
  }, [data2]);

  const totalBalance =
    parseFloat(data2[0]?.SHADOW_BALANCE_TODAY) +
    parseFloat(data2[0]?.OD_INTEREST_AMOUNT) +
    parseFloat(data2[0]?.COT_AMOUNT) +
    parseFloat(data2[0]?.ARREARS_INT);

  // 22-november-2023
  const totalArrear =
    parseFloat(principalArrears) +
    parseFloat(interestArrears) +
    parseFloat(data2[0]?.COT_AMOUNT) +
    parseFloat(data2[0]?.ARREARS_INT);

  const totalSusp =
    parseFloat(data2[0]?.OD_INTIN_SUSP) +
    parseFloat(data2[0]?.PEN_INTIN_SUSP) +
    parseFloat(arrInterestSusp);

  const [interestRepaymentCount, setInterestRepaymentCount] = useState("");
  const [principalRepaymentCount, setPrincipalRepaymentCount] = useState("");

  const handlePrincipalRepaymentFrequency = (value) => {
    if (value === "03") {
      setInterestRepaymentCount(newTenorVal * 1);
      setPrincipalRepaymentCount(newTenorVal * 1);
    } else if (value === "01") {
      setInterestRepaymentCount(Math.round(parseFloat(newTenorVal * 4.35)));
      setPrincipalRepaymentCount(Math.round(parseFloat(newTenorVal * 4.35)));
    } else if (value === "02") {
      setInterestRepaymentCount(
        Math.round(parseFloat(newTenorVal * 2.16666667))
      );
      setPrincipalRepaymentCount(
        Math.round(parseFloat(newTenorVal * 2.16666667))
      );
    } else if (value === "04") {
      setInterestRepaymentCount(Math.round(parseFloat(12 / 3)));
      setPrincipalRepaymentCount(Math.round(parseFloat(12 / 3)));
    } else if (value === "05") {
      setInterestRepaymentCount(newTenorVal * 1);
      setPrincipalRepaymentCount(newTenorVal * 1);
    } else if (value === "06") {
      setInterestRepaymentCount(newTenorVal / newTenorVal);
      setPrincipalRepaymentCount(newTenorVal / newTenorVal);
    } else if (value === "07") {
      setInterestRepaymentCount(newTenorVal / 2);
      setPrincipalRepaymentCount(newTenorVal / 2);
    } else if (value === "08") {
      setInterestRepaymentCount(parseFloat(12 / 6));
      setPrincipalRepaymentCount(parseFloat(12 / 6));
    } else if (value === "09") {
      setInterestRepaymentCount(newTenorVal / newTenorVal);
      setPrincipalRepaymentCount(newTenorVal / newTenorVal);
    }

    // setPrincipalRepaymentFrequency(value);
    // setInterestRepaymentFrequency(value);
  };

  // PREVIEW SCHEDULE
  const handleLoanPaymentSchedulePrc = () => {
    const postingDate0 = userInfo?.postingDate;
    axios
      .post(
        API_SERVER + `/api/loan-payment-sched-table-prc`,
        {
          f_no_v: formDetails[0]?.facility_no,
          OUT_PRIN_BAL_v: total,
          int_rate_v: interestRatePM,
          int_type_v: interestTypeVal,
          repayment_plan_v: principalRepayFreqVal,
          moratorium_period_v: moratoriumPeriod,
          exempt_month_v:
            data1?.PAYMENT_TYPE === "R" ||
            data1?.PAYMENT_TYPE === "T" ||
            data1?.PAYMENT_TYPE === "C"
              ? "N"
              : "",
          PRIN_PAY_COUNT_v: principalRepaymentCount,
          type_of_acct_v: data2[0]?.TYPE_OF_ACCT,
          legal_form_v: data2[0]?.LEGAL_FORM,
          currency_code_v: data2[0]?.CURRENCY_CODE,
          last_day_v: "N",
          repnt_period_months_v: newTenorVal,
          date_v: formatDate(postingDate0),
          loan_amt_v: parseFloat(topUpAmount),
          int_morato_v: moratoriumWithInterest,
          int_repay_plan_v: interestRepayFreqVal,
          int_pay_count_v: interestRepaymentCount,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "SCHEDULE GENERATED SUCCESSFULLY !!");
        // setSchedulePreviewed(response.data);
        getPreviewSchedule(formDetails[0]?.facility_no);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        zoom: 0.95,
        marginBottom: "60px",
        display: openRejectModal ? "none" : "block",
      }}
    >
      {/* <div className={"scale-[0.93] -mx-32 -mt-14"}> */}
      <LoadingOverlay
        loader={customLoader}
        visible={loadingApproval}
        variant="bars"
      />
      <div style={{ padding: "10px" }}>
        <ActionButtons
          displayFetch={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayView={"none"}
          displayNew={"none"}
          displayRefresh={"none"}
          displayExit={"none"}
          onAuthoriseClick={confirmApproval}
          onRejectClick={() => setOpenRejectModal(true)}
          displayOk={"none"}
          // onOkClick={() => loanPayment()}
        />
        <br />
        <div
          style={{
            padding: "5px",
            border: "1.5px solid #d6d7d9",
            // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ flex: "0.4" }}>
              <InputField
                label={"Member Number"}
                required
                labelWidth={"30%"}
                inputWidth={"70%"}
                lovdata={loanCustomersArr}
                disabled
                value={
                  data2[0]?.CUSTOMER_NUMBER +
                    " - " +
                    data2[0]?.ACCOUNT_DESCRP !==
                  "undefined - undefined"
                    ? data2[0]?.CUSTOMER_NUMBER +
                      " - " +
                      data2[0]?.ACCOUNT_DESCRP
                    : ""
                }
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Facility Number"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={data2[0]?.FACILITY_NO}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Account Class"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={data3[0]?.ACCT_CLASS_DESC}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "-15px" }}>
            <div style={{ flex: "0.4" }}>
              <InputField
                label={"Principal Account"}
                labelWidth={"30%"}
                required
                inputWidth={"70%"}
                value={
                  data2[0]?.PRINCIPAL_ACCOUNT +
                    " - " +
                    data2[0]?.DESCRIPTION !==
                  "undefined - undefined"
                    ? data2[0]?.PRINCIPAL_ACCOUNT +
                      " - " +
                      data2[0]?.DESCRIPTION
                    : ""
                }
                disabled
              />
            </div>
            <div style={{ flex: "0.15" }}>
              <InputField
                label={"Rate"}
                labelWidth={"70%"}
                inputWidth={"30%"}
                disabled
                value={data2[0]?.INTEREST_RATE}
                textAlign={"right"}
              />
            </div>
            <div style={{ flex: "0.25" }}>
              <div>
                <InputField
                  label={"Tenor"}
                  labelWidth={"25%"}
                  inputWidth={"20%"}
                  disabled
                  value={data2[0]?.REPNT_PERIOD_MONTHS}
                />
              </div>
            </div>
            <div
              style={{
                flex: "0.2",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div></div>
              <div style={{ marginRight: "50px", marginTop: "10px" }}>
                <ButtonComponent
                  label={"Loan Enquiry"}
                  buttonHeight={"30px"}
                  buttonIcon={<FiEye />}
                  buttonWidth={"160px"}
                  buttonColor={"white"}
                  onClick={() => setShowEnquiryScreen(true)}
                />
              </div>

              <Modal
                opened={showEnquiryScreen}
                size={"80%"}
                padding={0}
                withCloseButton={false}
                trapFocus={false}
                scrollAreaComponent={ScrollArea.Autosize}
                onClose={() => setShowEnquiryScreen(false)}
              >
                <div>
                  <LoanGeneralEnquiry
                    closeModal={() => setShowEnquiryScreen(false)}
                    facilityDetails={data3[0]}
                  />
                </div>
              </Modal>
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ flex: "0.25" }}>
              <InputField
                label={"Effective Date"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                value={
                  formatDate(data2[0]?.EFFECTIVE_DATE?.split("T")[0]) !==
                  "Invalid Date-INV-Invalid Date"
                    ? formatDate(data2[0]?.EFFECTIVE_DATE?.split("T")[0])
                    : ""
                }
              />
            </div>
            <div style={{ flex: "0.2" }}>
              <InputField
                label={"Expiry Date"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={
                  formatDate(data2[0]?.LAST_REPAY_DATE?.split("T")[0]) !==
                  "Invalid Date-INV-Invalid Date"
                    ? formatDate(data2[0]?.LAST_REPAY_DATE?.split("T")[0])
                    : ""
                }
              />
            </div>
            <div style={{ flex: "0.25" }}>
              <InputField
                label={"Amount Granted"}
                labelWidth={"50%"}
                inputWidth={"39%"}
                disabled
                value={formatNumber(parseFloat(data2[0]?.FACILITY_AMOUNT))}
                textAlign={"right"}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Repayment Count Outstanding"}
                labelWidth={"65%"}
                inputWidth={"25%"}
                disabled
                textAlign={"right"}
                value={repayCnt}
              />
            </div>
          </div>
        </div>
        <br></br>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              flex: "0.5",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "1.5px solid #d6d7d9",
            }}
          >
            <div style={{ marginTop: "", display: "flex" }}>
              <div style={{ flex: "0.35" }}></div>
              <div style={{ flex: "0.25" }}>
                <h6>Balance</h6>
              </div>
              <div style={{ flex: "0.25" }}>
                <h6>Arrears</h6>
              </div>
              <div style={{ flex: "0.25" }}>
                <h6>Suspense</h6>
              </div>
            </div>
            <div style={{ marginTop: "-10px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Principal"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={formatNumber(
                    parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)
                  )}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={formatNumber(parseFloat(principalArrears))}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                {/* <InputField inputWidth={"90%"} disabled/> */}

                {/* 
                
                
                */}
              </div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Interest"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={data2[0]?.OD_INTEREST_AMOUNT}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={formatNumber(parseFloat(interestArrears))}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={formatNumber(parseFloat(data2[0]?.OD_INTIN_SUSP))}
                  textAlign={"right"}
                />
              </div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Penalty"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={formatNumber(parseFloat(data2[0]?.COT_AMOUNT))}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={formatNumber(parseFloat(data2[0]?.COT_AMOUNT))}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={formatNumber(parseFloat(data2[0]?.PEN_INTIN_SUSP))}
                  textAlign={"right"}
                />
              </div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Arr Interest"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={formatNumber(parseFloat(data2[0]?.ARREARS_INT))}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={formatNumber(parseFloat(data2[0]?.ARREARS_INT))}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={formatNumber(parseFloat(arrInterestSusp))}
                  textAlign={"right"}
                />
              </div>
            </div>
            <br />
            <br />
            <div style={{ marginTop: "-25px" }}>
              <hr />

              <div>
                <HeaderComponent title={"Account Details"} />
              </div>

              <div style={{ marginTop: "", display: "flex" }}>
                <div style={{ flex: "0.48" }}>
                  <InputField
                    label={"Total"}
                    labelWidth={"58%"}
                    inputWidth={"35%"}
                    disabled
                    value={formatNumber(parseFloat(totalBalance))}
                    textAlign={"right"}
                  />
                </div>
                <div style={{ flex: "0.22" }}>
                  <InputField
                    inputWidth={"100%"}
                    disabled
                    value={formatNumber(parseFloat(totalArrear))}
                    textAlign={"right"}
                    inputColor={"red"}
                  />
                </div>
                <div style={{ flex: "0.25" }}>
                  <InputField
                    inputWidth={"90%"}
                    disabled
                    value={formatNumber(parseFloat(totalSusp))}
                    textAlign={"right"}
                  />
                </div>
              </div>

              <div
                style={{
                  // border: "1px solid #b8babb",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <div>
                  <HeaderComponent title={"Repayment Account Details"} />
                </div>

                <div style={{ marginTop: "20px" }}>
                  <div>
                    <InputField
                      label={"Repayment Account"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={data2[0]?.MAINTENANCE_FEE_ACCOUNT}
                      textAlign={"center"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Account Balance"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={formatNumber(parseFloat(data3[0]?.AVBAL_MFA))}
                      textAlign={"right"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Accrued Interest"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={formatNumber(parseFloat(accruedInt))}
                      textAlign={"right"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Accrued Penal"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={formatNumber(parseFloat(accruedPenal))}
                      textAlign={"right"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: "0.5",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "1.5px solid #d6d7d9",
            }}
          >
            <div
              style={{
                // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                // padding: "10px",
                // border: "1.5px solid #d6d7d9",
                backgroundColor: "white",
              }}
            >
              {/* <div style={{ borderBottom: "1px solid" }}>
                <h4 style={{ margin: "10px" }}>Repayment Account Details</h4>
              </div> */}
              <div>
                <HeaderComponent title={"Payment Options"} />
              </div>
              <div style={{ marginTop: "15px" }}>
                <InputField
                  label={"Transaction Type"}
                  labelWidth={"25%"}
                  required
                  inputWidth={"30%"}
                  disabled
                  value={
                    data1?.PAYMENT_TYPE === "T"
                      ? "Top Up"
                      : data1?.PAYMENT_TYPE === "R"
                      ? "Reschedule"
                      : data1?.PAYMENT_TYPE === "E"
                      ? "Early Settlement"
                      : data1?.PAYMENT_TYPE === "C"
                      ? "Capital Reduction"
                      : ""
                  }
                />
              </div>
              <div style={{ marginTop: "15px", color: "red" }}>
                {data1?.PAYMENT_TYPE === "T" ? (
                  <InputField
                    disabled
                    labelWidth={"25%"}
                    inputWidth={"30%"}
                    label={"Top Up Amount"}
                    type={"number"}
                    required
                    id="top_up_amount"
                    value={data1?.REPAYMENT_AMOUNT}
                    textAlign={"right"}
                  />
                ) : data1?.PAYMENT_TYPE === "E" ? (
                  <InputField
                    disabled
                    labelWidth={"25%"}
                    inputWidth={"30%"}
                    label={"Total Settlement Amount"}
                    required
                    value={formatNumber(
                      parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)
                    )}
                    textAlign={"right"}
                  />
                ) : data1?.PAYMENT_TYPE === "R" ? (
                  <InputField
                    disabled
                    labelWidth={"25%"}
                    inputWidth={"30%"}
                    label={"Amount"}
                    value={0}
                    required
                    textAlign={"right"}
                  />
                ) : data1?.PAYMENT_TYPE === "C" ? (
                  <InputField
                    disabled
                    labelWidth={"25%"}
                    inputWidth={"30%"}
                    label={"Reduction Amount"}
                    required
                    value={capitalReduction}
                    onChange={(e) => setCapitalReduction(e.target.value)}
                  />
                ) : (
                  ""
                )}
              </div>
              <div style={{ marginTop: "15px" }}>
                <InputField
                  label={"Force Debit"}
                  labelWidth={"25%"}
                  inputWidth={"30%"}
                  color="red"
                  // id={"forceDebit"}
                  disabled
                  value={data1?.FORCE_DEBIT === "N" ? "No" : "Yes"}
                />
              </div>
              {transType === "T" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "45px",
                  }}
                >
                  <div></div>
                  <div>
                    <ButtonComponent
                      label={"View Collateral"}
                      buttonWidth={"150px"}
                      buttonHeight={"40px"}
                      //   onClick={() => setShowCollateralScreen(true)}
                    />
                  </div>

                  <Modal
                    opened={showCollateralScreen}
                    size={"60%"}
                    padding={0}
                    withCloseButton={false}
                    trapFocus={false}
                    scrollAreaComponent={ScrollArea.Autosize}
                    onClose={() => setShowCollateralScreen(false)}
                  >
                    <div>
                      <Collateral
                        handleClose={() => setShowCollateralScreen(false)}
                        data={formDetails[0]}
                      />
                    </div>
                  </Modal>
                </div>
              )}
            </div>
            <br />
            <div>
              <Tabs
                color="yellow"
                radius="xs"
                variant="pills"
                defaultValue="gallery"
              >
                <Tabs.List>
                  <Tabs.Tab value="gallery">Waiver Options</Tabs.Tab>
                  <Tabs.Tab value="messages">Charges Details</Tabs.Tab>
                  <Tabs.Tab value="settings">Reschedule Details</Tabs.Tab>
                  <Tabs.Tab value="payment">Payment Reason</Tabs.Tab>
                </Tabs.List>
                <hr />

                <Tabs.Panel value="gallery" pt="xs">
                  <div style={{ padding: "10px" }}>
                    <div style={{ marginTop: "-20px" }}>
                      <InputField
                        label={"Waiver"}
                        labelWidth={"25%"}
                        inputWidth={"50%"}
                        value={
                          data1?.WAIVER_OPTION === "99"
                            ? "99 - MANUAL WAIVERS"
                            : data1?.WAIVER_OPTION === "00"
                            ? "00 - NOT APPLICABLE"
                            : data1?.WAIVER_OPTION === "01"
                            ? "01 - WAIVE ACCRUED INTEREST"
                            : data1?.WAIVER_OPTION === "02"
                            ? "WAIVE ACCRUED PENALTY"
                            : data1?.WAIVER_OPTION === "03"
                            ? "03 - WAIVE INTEREST AND PENALTY"
                            : ""
                        }
                        disabled
                      />
                    </div>
                    <hr />
                    <div style={{ marginTop: "-10px", display: "flex" }}>
                      <div style={{ flex: "0.35" }}></div>
                      <div style={{ flex: "0.25" }} className="mt-3">
                        <h6 style={{ padding: "10px" }}>Waiver %</h6>
                      </div>
                      <div style={{ flex: "0.25" }} className="mt-3">
                        <h6 style={{ padding: "10px" }}>Waiver Amount</h6>
                      </div>
                      <div style={{ flex: "0.25" }} className="mt-3">
                        <h6 style={{ padding: "10px" }}>Actual Amount</h6>
                      </div>
                    </div>
                    <div style={{ marginTop: "-15px", display: "flex" }}>
                      <div style={{ flex: "0.48" }}>
                        <InputField
                          label={"Interest"}
                          labelWidth={"58%"}
                          inputWidth={"38%"}
                          disabled={waiver !== "99"}
                          textAlign={"right"}
                          onChange={(e) => {
                            setWaiverPercentage((prev) => ({
                              ...prev,
                              interest: e.target.value,
                            }));
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              calculateInterest("interest", 1);
                              setCalc(!calc);
                            }
                          }}
                          onBlur={() => {
                            calculateInterest("interest", 1);
                            setCalc(!calc);
                          }}
                          value={formatNumber(
                            parseFloat(waiverPercentage.interest)
                          )}
                        />
                      </div>
                      <div style={{ flex: "0.22" }}>
                        <InputField
                          inputWidth={"100%"}
                          disabled={waiver !== "99"}
                          onChange={(e) => {
                            setWaiverAmount((prev) => ({
                              ...prev,
                              interest: e.target.value,
                            }));
                          }}
                          value={
                            waiver === "01"
                              ? actAmounts.interest
                              : waiverAmount.interest
                          }
                          onKeyPress={(e) => {
                            if (
                              e.key === "Enter" &&
                              e.target.value?.trim() !== ""
                            ) {
                              calculateInterest("interest", 2);
                              setCalc(!calc);
                            }
                          }}
                          onBlur={() => {
                            calculateInterest("interest", 2);
                            setCalc(!calc);
                          }}
                          textAlign={"right"}
                        />
                      </div>
                      <div style={{ flex: "0.25" }}>
                        <InputField
                          inputWidth={"90%"}
                          disabled
                          value={
                            // formDetails.length === 0
                            //   ? ""
                            //   : formatNumber(
                            //       parseFloat(formDetails[0]?.od_accrued_int )
                            //     )
                            actAmounts.interest
                          }
                          textAlign={"right"}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "-15px", display: "flex" }}>
                      <div style={{ flex: "0.48" }}>
                        <InputField
                          label={"Penalty"}
                          labelWidth={"58%"}
                          inputWidth={"38%"}
                          disabled={waiver !== "99"}
                          onChange={(e) => {
                            setWaiverPercentage((prev) => ({
                              ...prev,
                              penalty: e.target.value,
                            }));
                          }}
                          // type={"number"}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              calculateInterest("penalty", 1);
                              setCalc(!calc);
                            }
                          }}
                          onBlur={() => {
                            calculateInterest("penalty", 1);
                            setCalc(!calc);
                          }}
                          textAlign={"right"}
                          value={waiverPercentage.penalty}
                        />
                      </div>
                      <div style={{ flex: "0.22" }}>
                        <InputField
                          inputWidth={"100%"}
                          disabled={waiver !== "99"}
                          onChange={(e) => {
                            setWaiverAmount((prev) => ({
                              ...prev,
                              penalty: e.target.value,
                            }));
                          }}
                          textAlign={"right"}
                          value={
                            waiver === "02"
                              ? actAmounts.penalty
                              : waiverAmount.penalty
                          }
                          onKeyPress={(e) => {
                            if (
                              e.key === "Enter" &&
                              e.target.value?.trim() !== ""
                            ) {
                              calculateInterest("penalty", 2);
                              setCalc(!calc);
                            }
                          }}
                          onBlur={() => {
                            calculateInterest("penalty", 2);
                            setCalc(!calc);
                          }}
                          // type={"number"}
                        />
                      </div>
                      <div style={{ flex: "0.25" }}>
                        <InputField
                          inputWidth={"90%"}
                          disabled
                          value={actAmounts.penalty}
                          textAlign={"right"}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "-15px", display: "flex" }}>
                      <div style={{ flex: "0.48" }}>
                        <InputField
                          label={"Arrears"}
                          labelWidth={"58%"}
                          inputWidth={"38%"}
                          disabled={waiver !== "99"}
                          onChange={(e) => {
                            setWaiverPercentage((prev) => ({
                              ...prev,
                              arrears: e.target.value,
                            }));
                          }}
                          value={waiverPercentage.arrears}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              calculateInterest("arrears", 1);
                              setCalc(!calc);
                            }
                          }}
                          onBlur={() => {
                            calculateInterest("arrears", 1);
                            setCalc(!calc);
                          }}
                          // type={"number"}
                          textAlign={"right"}
                        />
                      </div>
                      <div style={{ flex: "0.22" }}>
                        <InputField
                          inputWidth={"100%"}
                          disabled={waiver !== "99"}
                          onChange={(e) => {
                            setWaiverAmount((prev) => ({
                              ...prev,
                              arrears: e.target.value,
                            }));
                          }}
                          textAlign={"right"}
                          onKeyPress={(e) => {
                            if (
                              e.key === "Enter" &&
                              e.target.value?.trim() !== ""
                            ) {
                              calculateInterest("arrears", 2);
                              setCalc(!calc);
                            }
                          }}
                          onBlur={() => {
                            calculateInterest("arrears", 2);
                            setCalc(!calc);
                          }}
                          value={
                            waiver === "03"
                              ? actAmounts.arrears
                              : waiverAmount.arrears
                          }
                          // type={"number"}
                        />
                      </div>
                      <div style={{ flex: "0.25" }}>
                        <InputField
                          inputWidth={"90%"}
                          disabled
                          value={actAmounts.arrears}
                          textAlign={"right"}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        borderRadius: "5px",
                        padding: "5px",
                        border: "1px solid #b8babb",
                      }}
                    >
                      <div style={{}}>
                        <InputField
                          label={"Total Interest To be Paid"}
                          labelWidth={"50%"}
                          inputWidth={"43%"}
                          disabled
                          value={actAmounts.interest}
                          textAlign={"right"}
                        />
                      </div>
                      <div style={{}}>
                        <InputField
                          label={"Total Penalty To be Paid"}
                          labelWidth={"50%"}
                          inputWidth={"43%"}
                          disabled
                          value={actAmounts.penalty}
                          textAlign={"right"}
                        />
                      </div>
                      <div style={{}}>
                        <InputField
                          label={"Total Arr To be Paid"}
                          labelWidth={"50%"}
                          inputWidth={"43%"}
                          disabled
                          value={actAmounts.interest}
                          textAlign={"right"}
                        />
                      </div>
                      <div style={{}}>
                        <InputField
                          label={"Loan Principal"}
                          labelWidth={"50%"}
                          inputWidth={"43%"}
                          disabled
                          textAlign={"right"}
                          value={formatNumber(
                            parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)
                          )}
                        />
                      </div>
                      <div style={{}}>
                        <InputField
                          label={"New Loan Balance After Waiver(s)"}
                          labelWidth={"50%"}
                          inputWidth={"43%"}
                          disabled
                          textAlign={"right"}
                          value={total}
                        />
                      </div>
                      <div style={{ color: "red" }}>
                        <InputField
                          label={"Remaining Loan Balance After Reduction"}
                          labelWidth={"50%"}
                          textAlign={"right"}
                          inputWidth={"43%"}
                          disabled
                          color={"red"}
                          inputColor={"red"}
                          // value={
                          //   waiver === "01" ||
                          //   waiver === "02" ||
                          //   waiver === "99"
                          //     ? totalToBePaid2.newLoanAfterWaivers
                          //     : formatNumber(
                          //         parseFloat(remainingLoanBalanceAfterReduction)
                          //       )
                          // }
                          // value={
                          //   parseFloat(
                          //     totalToBePaid2?.interest?.replace(/,/g, "")
                          //   ) +
                          //   parseFloat(
                          //     totalToBePaid2?.penalty?.replace(/,/g, "")
                          //   ) +
                          //   parseFloat(
                          //     totalToBePaid2?.arrears?.replace(/,/g, "")
                          //   ) +
                          //   parseFloat(
                          //     totalToBePaid2?.loanPrincipal?.replace(/,/g, "")
                          //   ) +
                          //   parseFloat(data1?.REPAYMENT_AMOUNT)
                          //   // TORSGOD
                          // }
                          value={total + data1?.REPAYMENT_AMOUNT}
                        />
                      </div>
                    </div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="messages" pt="xs">
                  <div style={{ padding: "20px", display: "grid" }}>
                    <div
                      style={{
                        borderRadius: "5px",
                        padding: "10px",
                        border: "1px solid #b8babb",
                      }}
                    >
                      <InputField
                        label={"Fee"}
                        labelWidth={"30%"}
                        inputWidth={"40%"}
                        textAlign={"right"}
                        value={data1?.EARLY_FEE_AMOUNT}
                        type={"number"}
                        disabled
                      />

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <InputField
                          label={"Insurance"}
                          labelWidth={"30%"}
                          inputWidth={"60%"}
                          id={"insurance_rate"}
                          textAlign={"right"}
                          disabled
                          value={data1?.INSURANCE}
                        />

                        <InputField
                          inputWidth={"60%"}
                          textAlign={"right"}
                          disabled
                          value={data1?.INSURANCE_AMOUNT}
                        />
                      </div>
                      <InputField
                        label={"Total Fees Amount"}
                        labelWidth={"30%"}
                        inputWidth={"40%"}
                        disabled
                        type={"text"}
                        id={"tot_fees_amt"}
                        value={
                          data1?.INSURANCE_AMOUNT + data1?.EARLY_FEE_AMOUNT
                        }
                        textAlign={"right"}
                      />
                    </div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="settings" pt="xs">
                  <div style={{ padding: "20px" }}>
                    <div
                      style={{
                        borderRadius: "5px",
                        padding: "20px",
                        border: "1px solid #b8babb",
                      }}
                    >
                      <div>
                        <InputField
                          label={"Balance To Reschedule"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          disabled
                          value={total + data1?.REPAYMENT_AMOUNT}
                          // value={principalToPay}
                          textAlign={"right"}
                        />
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div>
                          <InputField
                            label={"Interest Rate P.M / P.A"}
                            labelWidth={"60%"}
                            inputWidth={"35%"}
                            required
                            textAlign={"right"}
                            disabled
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const input =
                                  document.getElementById("next_tenor");
                                input?.focus();
                              }
                            }}
                            onChange={(e) => setInterestRatePM(e.target.value)}
                            value={data2[0]?.INTEREST_RATE}
                          />
                        </div>

                        <div>
                          <InputField
                            inputWidth={"65%"}
                            value={formatNumber(
                              parseFloat(data2[0]?.INTEREST_RATE) * 12
                            )}
                            textAlign={"right"}
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        <InputField
                          label={"New Tenor (In Months)"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          id={"next_tenor"}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const input = document.getElementById("int_type");
                              input?.focus();
                            }
                          }}
                          required
                          value={data3[0]?.REPNT_PERIOD_MONTHS}
                          onChange={(e) => setNewTenorVal(e.target.value)}
                          disabled
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Interest Type"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          required
                          id={"int_type"}
                          value={
                            data2[0]?.INT_TYPE === "00"
                              ? "00 - UNASSIGN"
                              : data2[0]?.INT_TYPE === "01"
                              ? "01 - FLAT"
                              : data2[0]?.INT_TYPE === "02"
                              ? "02 - REDUCING BALANCE"
                              : data2[0]?.INT_TYPE === "03"
                              ? "03 - AMORTIZATION METHOD"
                              : data2[0]?.INT_TYPE === "04"
                              ? "04 - DISCOUNTED RATE"
                              : data2[0]?.INT_TYPE === "05"
                              ? "05 - FLOATING RATE"
                              : data2[0]?.INT_TYPE === "06"
                              ? "06 - RULE 78 SPREAD"
                              : ""
                          }
                          disabled
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Principal Repayment Frequency"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          id={"prf"}
                          required
                          value={
                            data2[0]?.REPAYMENT_PLAN === "07"
                              ? "07 - BI-MONTHLY"
                              : data2[0]?.REPAYMENT_PLAN === "01"
                              ? "01 - WEEKLY"
                              : data2[0]?.REPAYMENT_PLAN === "02"
                              ? "02 - BI-WEEKLY"
                              : data2[0]?.REPAYMENT_PLAN === "03"
                              ? "03 - MONTHLY"
                              : data2[0]?.REPAYMENT_PLAN === "04"
                              ? "04 - QUARTERLY"
                              : data2[0]?.REPAYMENT_PLAN === "05"
                              ? "05 - BULLET WITHOUT INTEREST"
                              : data2[0]?.REPAYMENT_PLAN === "06"
                              ? "06 - BULLET WITH INTEREST"
                              : data2[0]?.REPAYMENT_PLAN === "08"
                              ? "08 - SEMI-ANNUAL"
                              : data2[0]?.REPAYMENT_PLAN === "09"
                              ? "09 - ANNUAL"
                              : ""
                          }
                          disabled
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Interest Repayment Frequency"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          required
                          value={
                            data2[0]?.INTEREST_REPAY_FREQ === "07"
                              ? "07 - BI-MONTHLY"
                              : data2[0]?.INTEREST_REPAY_FREQ === "01"
                              ? "01 - WEEKLY"
                              : data2[0]?.INTEREST_REPAY_FREQ === "02"
                              ? "02 - BI-WEEKLY"
                              : data2[0]?.INTEREST_REPAY_FREQ === "03"
                              ? "03 - MONTHLY"
                              : data2[0]?.INTEREST_REPAY_FREQ === "04"
                              ? "04 - QUARTERLY"
                              : data2[0]?.INTEREST_REPAY_FREQ === "05"
                              ? "05 - BULLET WITHOUT INTEREST"
                              : data2[0]?.INTEREST_REPAY_FREQ === "06"
                              ? "06 - BULLET WITH INTEREST"
                              : data2[0]?.INTEREST_REPAY_FREQ === "08"
                              ? "08 - SEMI-ANNUAL"
                              : data2[0]?.INTEREST_REPAY_FREQ === "09"
                              ? "09 - ANNUAL"
                              : ""
                          }
                          disabled
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Moratorium Period"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          onChange={(e) => setMoratoriumPeriod(e.target.value)}
                          value={moratoriumPeriod}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              if (
                                parseFloat(moratoriumPeriod) >=
                                parseFloat(repayCnt)
                              ) {
                                Swal.fire(
                                  "ERR - 01451: Moratorium period must be less than repayment count",
                                  "",
                                  "error"
                                );
                                setMoratoriumPeriod(0);
                              }
                            }
                          }}
                          disabled
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Moratorium with Interest"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          disabled
                          value={
                            data2[0]?.INT_MORATORIUM === "N" ? "No" : "Yes"
                          }
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Next Schedule Date"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          disabled
                          value={formatDate(nextSchedule)}
                        />
                      </div>
                      <div>
                        <InputField
                          type={"date"}
                          label={"Effective Date"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          disabled
                          required
                          defaultValue={postingDate}
                          onChange={(e) => setEffectiveDate(e.target.value)}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div></div>
                        <div>
                          <ButtonComponent
                            label={"Preview Schedule"}
                            buttonHeight={"30px"}
                            buttonWidth={"180px"}
                            buttonColor={"white"}
                            buttonIcon={<FiEye />}
                            onClick={() => {
                              setOpenPreviewSchedule(true);
                              setPreviewScheduleState(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="payment" pt="xs">
                  <div>
                    <br />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "5px" }}>
                          <InputField
                            label="Attach Document"
                            labelWidth={"50%"}
                            type={"number"}
                            required
                            disabled
                            inputWidth={"50%"}
                            value={data1?.DOCUMENT_ID}
                          />
                        </div>

                        <Modal
                          show={sweetAlertConfirmed}
                          size="lg"
                          centered
                          style={{ height: "100%" }}
                          className="shadow-md shadow-black"
                        >
                          <Modal.Body>
                            <DocumentViewing documentID={documentNumber} />
                          </Modal.Body>
                        </Modal>

                        <div>
                          <ButtonComponent
                            label="View Document"
                            labelWidth={"50%"}
                            inputWidth={"50%"}
                            buttonHeight="25px"
                            buttonColor={"white"}
                            // onClick={handleClick}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <br /> */}
                    <div
                      style={{
                        borderRadius: "5px",
                        padding: "20px",
                        // border: "1px solid #b8babb",
                      }}
                    >
                      <TextAreaField
                        label={"Reason"}
                        required
                        inputHeight="60px"
                        inputWidth={"40%"}
                        labelWidth={"20%"}
                        value={data1?.REASON}
                        disabled
                      />
                    </div>
                  </div>
                </Tabs.Panel>
              </Tabs>

              {/* <div>
                <ButtonComponent label={"Continue"} buttonHeight={"40px"} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* PREVIEW SCHEDULE */}
      <Modal
        opened={openPreviewSchedule}
        size={"80%"}
        padding={0}
        withCloseButton={false}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
        onClose={() => {
          setOpenPreviewSchedule(false);
        }}
      >
        <div
          style={{ zoom: 0.95, paddingBottom: "40px", paddingInline: "5px" }}
        >
          <Header
            title="Quotations Schedule"
            headerShade
            closeIcon={<FiX />}
            handleClose={() => setOpenPreviewSchedule(false)}
          />
          <div>
            <CustomTable
              load={loading}
              data={qs}
              headers={quotationScheduleHeaders}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "50%" }}></div>
              <div style={{ width: "50%", fontWeight: "600" }}>Total</div>
              <div style={{ width: "50%" }}>
                <InputField
                  inputWidth={"100%"}
                  textAlign={"right"}
                  value={formatNumber(parseFloat(totalPrincipal))}
                  disabled
                  inputColor={"green"}
                />
              </div>

              <div style={{ width: "50%" }}>
                <InputField
                  inputWidth={"100%"}
                  textAlign={"right"}
                  value={formatNumber(parseFloat(totalInterest))}
                  disabled
                  inputColor={"green"}
                />
              </div>

              <div style={{ width: "50%" }}>
                <InputField
                  inputWidth={"100%"}
                  textAlign={"right"}
                  value={formatNumber(parseFloat(totalMonthP))}
                  disabled
                  inputColor={"green"}
                />
              </div>

              <div style={{ width: "50%" }}>
                <InputField
                  inputWidth={"100%"}
                  textAlign={"right"}
                  value={formatNumber(parseFloat(totalProcFees))}
                  disabled
                  inputColor={"green"}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        opened={openRejectModal}
        size={"50%"}
        padding={"10px"}
        withCloseButton={false}
        closeOnEscape
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
        onClose={() => {
          setOpenRejectModal(false);
        }}
        centered
      >
        <Header headerShade title="Reason" />

        <div className="space-y-5 p-2">
          <TextAreaField
            label={"Add reason for rejecting"}
            onChange={(e) => setRejectionComment(e.target.value)}
            labelWidth={"30%"}
            inputWidth={"60%"}
          />

          <div className="p-4">
            <ButtonComponent
              onClick={rejectPayment}
              label={"Reject"}
              buttonBackgroundColor={"tomato"}
              buttonWidth={"120px"}
              buttonHeight={"30px"}
              buttonIcon={<FiX />}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

function Input({ extra, disabled, onKeyPress, onChange, type }) {
  return (
    <>
      <InputField
        label={`${extra} Amount`}
        labelWidth={"25%"}
        inputWidth={"30%"}
        disabled={disabled}
        onKeyPress={onKeyPress}
        onChange={onChange}
        type={type}
      />
    </>
  );
}

export default LoanPaymentApproval;
