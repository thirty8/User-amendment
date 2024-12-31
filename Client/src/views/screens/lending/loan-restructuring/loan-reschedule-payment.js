import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import TextAreaField from "../components/fields/TextArea";
import SelectField from "../components/fields/SelectField";
import { Modal, ScrollArea, Tabs } from "@mantine/core";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import Swal from "sweetalert2";
import Header from "../../../../components/others/Header/Header";
import { FiX, FiEye, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import CustomTable from "../../control-setups/components/CustomTable";
import DocumentViewing from "../../../../components/others/DocumentViewing";
import swal from "sweetalert";
import LoanGeneralEnquiry from "../facility-enquiry/loan-general-enquiry";
import NewLoanGeneralEnquiry from "../facility-enquiry/new-loan-general-enquiry.jsx";
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

// HANDLE ON CLICK OF EXIT BUTTON
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

const effectiveDateString = localStorage.getItem("userInfo");
const userInfo = JSON.parse(effectiveDateString);

const postingDate = userInfo?.postingDate?.split("T")[0];
const postingDate0 = userInfo?.postingDate;

// DATE COMPARISONS
function compareDates(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return date1.getTime() < date2.getTime(); // Use > for "greater than" comparison
}

// CURRENT DATE
const currentDate = new Date();

const LoanReschedule = ({ memberDetails }) => {
  const [loanCustomers, setLoanCustomers] = useState("");
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
  const [schedulePreviewed, setSchedulePreviewed] = useState({});
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
  const [nextSchedule, setNextSchedule] = useState("");
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
  const [showEnquiryScreen, setShowEnquiryScreen] = useState(false);
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
  const [interestRepaymentCount, setInterestRepaymentCount] = useState("");
  const [principalRepaymentCount, setPrincipalRepaymentCount] = useState("");

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

  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;
  //   let numericAndPunctuationValue = inputValue?.replace(/[^\d,.]/g, ""); // Allow digits, commas, and periods

  //   if (numericAndPunctuationValue.indexOf(".") === -1) {
  //     numericAndPunctuationValue += ".";
  //   }

  //   setTopUpAmount(numericAndPunctuationValue);
  // };

  // MANTINE TESTS
  const [currentValuev, setCurrentValuev] = useState(1); // Set initial value to 1

  // Function to handle click event and change the value
  const handleContinueClick = () => {
    // Logic to update the value based on your requirements
    // For example, incrementing the value in this case
    if (currentValuev < 4) {
      // Assuming you have 4 values (1, 2, 3, 4)
      setCurrentValuev(currentValuev + 1);
    }
  };

  const handlePreviousClick = () => {
    // Logic to update the value based on your requirements
    // For example, incrementing the value in this case
    if (currentValuev > 1) {
      // Assuming you have 4 values (1, 2, 3, 4)
      setCurrentValuev(currentValuev - 1);
    }
  };

  // FUNCTIONS
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
      getPreviewSchedule(formDetails[0]?.facility_no);

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

    // get next schedule
    axios
      .post(
        API_SERVER + "/api/get-nxtSchedule",
        {
          facility_no: formDetails[0]?.facility_no,
        },
        { headers }
      )
      .then((response) => {
        setNextSchedule(response.data[0]?.MAX);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formDetails]);

  let totalArrears;
  let totalSuspense;

  // GETTING TOTAL ARREARS
  totalArrears =
    parseFloat(principalArrears) +
    parseFloat(interestArrears) +
    parseFloat(formDetails[0]?.cot_amount) +
    parseFloat(formDetails[0]?.arrears_int);

  totalSuspense =
    parseFloat(formDetails[0]?.od_intin_susp) +
    parseFloat(formDetails[0]?.pen_intin_susp) +
    parseFloat(arrInterestSusp);

  useEffect(() => {
    if (formDetails.length !== 0) {
      const principal = parseFloat(formDetails[0]?.shadow_balance_today);
      const interest = parseFloat(formDetails[0]?.od_accrued_int);
      const penalty = parseFloat(formDetails[0]?.cot_amount);
      const arrInterest = parseFloat(formDetails[0]?.arrears_int);

      setTotal(
        parseFloat(formDetails[0]?.shadow_balance_today) +
          parseFloat(formDetails[0]?.od_accrued_int) +
          parseFloat(formDetails[0]?.cot_amount) +
          parseFloat(formDetails[0]?.arrears_int)
      );

      setActAmount({
        interest: formatNumber(parseFloat(formDetails[0]?.od_accrued_int)),
        penalty: formatNumber(parseFloat(formDetails[0]?.cot_amount)),
        arrears: formatNumber(parseFloat(formDetails[0]?.arrears_int)),
      });
      setTotalToBePaid({
        interest: formatNumber(parseFloat(formDetails[0]?.od_accrued_int)),
        penalty: formatNumber(parseFloat(formDetails[0]?.cot_amount)),
        arrears: formatNumber(parseFloat(formDetails[0]?.arrears_int)),
        loanPrincipal: formatNumber(
          parseFloat(formDetails[0]?.shadow_balance_today)
        ),
        newLoanAfterWaivers: formatNumber(
          principal + interest + penalty + arrInterest
        ),
      });
      setTotalToBePaid2({
        interest: formatNumber(parseFloat(formDetails[0]?.od_accrued_int)),
        penalty: formatNumber(parseFloat(formDetails[0]?.cot_amount)),
        arrears: formatNumber(parseFloat(formDetails[0]?.arrears_int)),
        loanPrincipal: formatNumber(
          parseFloat(formDetails[0]?.shadow_balance_today)
        ),
        newLoanAfterWaivers: formatNumber(
          principal + interest + penalty + arrInterest
        ),
      });
    }
  }, [formDetails]);

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
          parseFloat(actAmounts.interest?.replaceAll(",", ""));
        setWaiverAmount((prev) => ({
          ...prev,
          interest: formatNumber(interest),
        }));

        setTotalToBePaid2({
          ...totalToBePaid2,
          interest: formatNumber(
            parseFloat(totalToBePaid?.interest?.replaceAll(",", "")) - interest
          ),
        });

        // console.log(interest, actAmounts.interest, waiverPercentage.interest);
      } else {
        // Interest Percentage = (Interest Amount / Principal Amount) * 100
        const percentage =
          (waiverAmount.interest?.replaceAll(",", "") /
            actAmounts.interest?.replaceAll(",", "")) *
          100;
        setWaiverPercentage((prev) => ({
          ...prev,
          interest: percentage?.toFixed(2),
        }));
        setTotalToBePaid2({
          ...totalToBePaid2,
          interest: formatNumber(
            parseFloat(totalToBePaid?.interest?.replaceAll(",", "")) -
              parseFloat(waiverAmount?.interest?.replaceAll(",", ""))
          ),
        });
      }
      // setTotalToBePaid((prev)=>({...prev , interest }))
    } else if (type === "penalty") {
      if (side === 1) {
        const interest =
          (waiverPercentage.penalty / 100) *
          parseFloat(actAmounts?.penalty?.replaceAll(",", ""));
        setWaiverAmount((prev) => ({
          ...prev,
          penalty: formatNumber(interest),
        }));

        setTotalToBePaid2({
          ...totalToBePaid2,
          penalty: formatNumber(
            parseFloat(totalToBePaid?.penalty?.replaceAll(",", "")) - interest
          ),
        });

        // console.log(interest, actAmounts.penalty, waiverPercentage.penalty);
      } else {
        // Interest Percentage = (Interest Amount / Principal Amount) * 100
        const percentage =
          (waiverAmount.penalty?.replaceAll(",", "") /
            actAmounts.penalty?.replaceAll(",", "")) *
          100;
        setWaiverPercentage((prev) => ({
          ...prev,
          penalty: percentage?.toFixed(2),
        }));
        setTotalToBePaid2({
          ...totalToBePaid2,
          penalty: formatNumber(
            parseFloat(totalToBePaid?.penalty?.replaceAll(",", "")) -
              parseFloat(waiverAmount.penalty?.replaceAll(",", ""))
          ),
        });
      }
    } else if (type === "arrears") {
      if (side === 1) {
        const interest =
          (waiverPercentage.arrears / 100) *
          parseFloat(actAmounts.arrears?.replaceAll(",", ""));
        setWaiverAmount((prev) => ({
          ...prev,
          arrears: formatNumber(interest),
        }));
        // console.log(interest, actAmounts.arrears, waiverPercentage.arrears);

        setTotalToBePaid2({
          ...totalToBePaid2,
          arrears: formatNumber(
            parseFloat(totalToBePaid?.arrears?.replaceAll(",", "")) - interest
          ),
        });
      } else {
        // Interest Percentage = (Interest Amount / Principal Amount) * 100
        const percentage =
          (waiverAmount.arrears?.replaceAll(",", "") /
            actAmounts.arrears?.replaceAll(",", "")) *
          100;
        setWaiverPercentage((prev) => ({
          ...prev,
          arrears: percentage?.toFixed(2),
        }));

        setTotalToBePaid2({
          ...totalToBePaid2,
          arrears: formatNumber(
            parseFloat(totalToBePaid?.arrears?.replaceAll(",", "")) -
              parseFloat(waiverAmount.arrears?.replaceAll(",", ""))
          ),
        });
      }
    }
  }

  async function getPreviewSchedule(facility_no) {
    setLoading(true);
    await axios
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
        console.log(response.data, "sonny");
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
            waiver === "01" ||
            waiver === "02" ||
            waiver === "03" ||
            waiver === "99"
              ? remainingBalanceWithAmount
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
            waiver === "01" ||
            waiver === "02" ||
            waiver === "03" ||
            waiver === "99"
              ? remainingBalanceWithAmount
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
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        { key: "loanCustomers" },
        { headers }
      )
      .then((response) => {
        setLoanCustomersArr(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        { key: "waiver" },
        { headers }
      )
      .then((response) => {
        setWaiverArr(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });

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
  }, []);

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
          cust_no: loanCustomers || memberDetails?.customer_no,
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

  const handleAccruedInterestandAccruedPenal = (principal_acct) => {
    axios
      .post(
        API_SERVER + "/api/get-accInt-get-accSusp",
        {
          principal_acct: principal_acct,
        },
        { headers: headers }
      )
      .then(function (response) {
        setAccruedInt(response.data[0]?.ACR_CHG);
        setAccruedPenal(response.data[0]?.ACR_PENAL);
      })
      .catch((err) => console.log(err));
  };

  const handleOnChangeOfPrincipalAccount = (prin_amt) => {
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        {
          key: "formDetails",
          principal_acct: prin_amt,
        },
        { headers }
      )
      .then((response) => {
        setFormDetails(response?.data);
        handleTheOtherArrears(response?.data[0]?.facility_no);
        handleAccruedInterestandAccruedPenal(
          response?.data[0]?.maintenance_fee_account
        );
        setWaiver("00");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loanPayment = () => {
    const ip = localStorage.getItem("ipAddress");
    const arrIntVal = totalToBePaid2?.arrears?.replace(/,/g, "");
    const penToBePaid = totalToBePaid2?.penalty?.replace(/,/g, "");
    const intToBePaid = totalToBePaid2?.interest?.replace(/,/g, "");
    const accBalance = formDetails[0]?.avbal_mfa?.replace(/,/g, "");
    const d = JSON.parse(localStorage.getItem("userInfo"));
    const user = JSON.stringify(d?.username);
    const hostname = JSON.stringify(d?.id);
    axios
      .post(
        API_SERVER + "/api/lending-payments",
        {
          PRINCIPAL_ACCT_V: principalAmount, // principal account
          effective_date_v: formDetails[0]?.effective_date, // effective date
          CUSTOMER_NO_v: loanCustomers, // customer number
          facility_no_v: formDetails[0]?.facility_no, // facility number
          payment_type_v: transType, // transaction type
          amt_v:
            transType === "T"
              ? parseFloat(topUpAmount)
              : transType === "E"
              ? parseFloat(formDetails[0]?.shadow_balance_today)
              : transType === "C"
              ? parseFloat(capitalReduction)
              : 0, // amount to work it -  number
          REASON_v: reason, // reason - text
          document_ref_v: parseFloat(documentNumber),
          EARLY_FEE_AMOUNT_v: parseFloat(fee), // charges details section
          EARLY_PENAL_AMOUNT_v: 0, // charges details section
          min_reduct_v: capitalReduction, // must find
          arr_int_v: parseFloat(arrIntVal), // arrears to be paid
          PEN_ADJUST_v: penToBePaid === "" ? 0 : parseFloat(penToBePaid), // penalty to be paid
          INT_ADJUST_v: intToBePaid === "" ? 0 : parseFloat(intToBePaid), // interest to be paid
          SHADOW_BALANCE_TODAY_v: parseFloat(
            formDetails[0]?.shadow_balance_today
          ), // shadow balance
          PRINCIPAL_TO_PAY_v: parseFloat(formDetails[0]?.shadow_balance_today), // must find
          FORCE_DB_v: forceDebit, // force debit
          SUM_FEE_AMOUNT_v:
            totalFeesAmount === "" ? 0 : parseFloat(totalFeesAmount), // total fees amount
          credit_bal_v: parseFloat(accBalance), // account balance
          INT_RATE_v: parseFloat(interestRatePM) * 12, // interest rate
          REPNT_PERIOD_MONTHS_v: parseFloat(newTenorVal), // new tenor value
          INT_REPAY_PLAN_v: interestRepayFreqVal,
          REPAYMENT_PLAN_v: principalRepayFreqVal,
          username_v: user,
          RESCH_AFTER_PAY_v: "Y", // a check box
          branch_code_v: formDetails[0]?.branch_code,
          WAIVER_OPTION_v: waiver,
          EARLY_FEES_v: 0, // fee first box NOT SHOWING ????
          EARLY_PENAL_v: 0, // penalty first box NOT SHOWING ????
          INSURANCE_v: insuranceRate === "" ? 0 : parseFloat(insuranceRate),
          INSURANCE_AMOUNT_v: insurance === "" ? 0 : parseFloat(insurance),
          ARR_WAIVE_v:
            waiverAmount.arrears === "" ? 0 : parseFloat(waiverAmount.arrears),
          INT_WAIVE_v:
            waiverAmount.interest === ""
              ? 0
              : parseFloat(waiverAmount.interest),
          PEN_WAIVE_v:
            waiverAmount.penalty === "" ? 0 : parseFloat(waiverAmount.penalty),
          INT_PAY_COUNT_v: intCnt,
          PRIN_PAY_COUNT_v: repayCnt,
          INT_TYPE_v: interestTypeVal,
          INT_MORATO_v: moratoriumWithInterest,
          MORATORIUM_PERIOD_v: moratoriumPeriod,
          LAST_DAY_v: "N",
          EXEMPT_MONTH_v:
            transType === "R" || transType === "T" || transType === "C"
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
        console.log(response.data?.responseMessage);

        var checkingStatus = response.data?.responseMessage?.split(" - ")[0];
        console.log(checkingStatus);
        if (checkingStatus?.trim() === "ERR") {
          Swal.fire(response.data?.responseMessage, "", "error");
        } else {
          Swal.fire(response.data?.responseMessage, "", "success");
          setTransType("");
          setLoanCustomers("");
          setFormDetails([]);
          setArrInterestSusp("");
          setPrincipalArrears("");
          setArrInterestSusp("");
          setAccruedInt("");
          setAccruedPenal("");
          setRemainingLoanBalanceAfterReduction("");
          setInterestTypeVal("");
          setInsurance(0);
          setInsuranceRate(0);
          setPrincipalRepayFreqVal("");
          setTotalFeesAmount(0);
          setFee(0);
          setTopUpAmount(0);
          setPreviewScheduleState(false);
          setTotalFeesAmountVal("");
          setNewTenorVal("");
          setInterestRatePM("");
          setCurrentValuev("1");
          setWaiverAmount({
            interest: "",
            penalty: "",
            arrears: "",
          });
          setWaiverPercentage({
            interest: "",
            penalty: "",
            arrears: "",
          });
          setReason("");
          setDocumentNumber("");
        }
      })
      .catch((error) => console.log(error));
  };

  const [remainingBalanceWithAmount, setremainingBalanceWithAmount] = useState(
    totalToBePaid2?.newLoanAfterWaivers
  );

  // useEffect(() => {
  //   setremainingBalanceWithAmount(totalToBePaid2?.newLoanAfterWaivers);
  // }, [totalToBePaid2]);

  const handleLoanPaymentSchedulePrc = () => {
    console.log(
      {
        principalRepaymentCount: principalRepaymentCount,
        interestRepaymentCount: interestRepaymentCount,
      },
      "COUNTS"
    );
    axios
      .post(
        API_SERVER + `/api/loan-payment-sched-table-prc`,
        {
          f_no_v: formDetails[0]?.facility_no,
          OUT_PRIN_BAL_v: remainingBalanceWithAmount,
          int_rate_v: interestRatePM,
          int_type_v: interestTypeVal,
          repayment_plan_v: principalRepayFreqVal,
          moratorium_period_v: moratoriumPeriod,
          exempt_month_v:
            transType === "R" || transType === "T" || transType === "C"
              ? "N"
              : "",
          PRIN_PAY_COUNT_v: principalRepaymentCount,
          type_of_acct_v: formDetails?.type_of_acct,
          legal_form_v: formDetails[0]?.legal_form,
          currency_code_v: formDetails[0]?.currency_code,
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
        setSchedulePreviewed(response.data);
        getPreviewSchedule(formDetails[0]?.facility_no);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ marginBottom: "150px" }}>
      <div style={{ padding: "10px" }}>
        <ActionButtons
          displayFetch={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayReject={"none"}
          displayView={"none"}
          onExitClick={() => {
            handleExitClick();
          }}
          onNewClick={() => {
            setCurrentValuev(1);
            setTransType("");
            setLoanCustomers("");
            setFormDetails([]);
            setArrInterestSusp("");
            setPrincipalArrears("");
            setArrInterestSusp("");
            setAccruedInt("");
            setAccruedPenal("");
            setRemainingLoanBalanceAfterReduction("");
            setInterestTypeVal("");
            setInsurance(0);
            setInsuranceRate(0);
            setPrincipalRepayFreqVal("");
            setTotalFeesAmount(0);
            setFee(0);
            setTopUpAmount(0);
            setPreviewScheduleState(false);
            setTotalFeesAmountVal("");
            setNewTenorVal("");
            setInterestRatePM("");
            setReason("");
            setDocumentNumber("");
            setremainingBalanceWithAmount(totalToBePaid2?.newLoanAfterWaivers);
            setWaiverAmount({
              interest: "",
              penalty: "",
              arrears: "",
            });
            setWaiverPercentage({
              interest: "",
              penalty: "",
              arrears: "",
            });
          }}
          onOkClick={() => loanPayment()}
        />
        <br />

        <div
          style={{
            padding: "5px",
            border: "1.5px solid #d6d7d9",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          <Header
            title="Member Details"
            textTransform={"capitalize"}
            headerShade
          />
          <div style={{ display: "flex" }}>
            <div style={{ flex: "0.4" }}>
              <ListOfValue
                label={"Member Number"}
                required
                labelWidth={"30%"}
                inputWidth={"70%"}
                lovdata={loanCustomersArr}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("principal_acct");
                    input?.focus();
                  }
                }}
                onChange={(value) => {
                  setLoanCustomers(value);
                  setTimeout(() => {
                    const input = document.getElementById("principal_acct");
                    input?.focus();
                  }, 0);
                  setRemainingLoanBalanceAfterReduction("");
                }}
                value={loanCustomers}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Facility Number"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={
                  formDetails.length === 0 ? "" : formDetails[0]?.facility_no
                }
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Account Class"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formDetails[0]?.acct_class_desc
                }
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "-15px" }}>
            <div style={{ flex: "0.4" }}>
              <ListOfValue
                label={"Principal Account"}
                labelWidth={"30%"}
                required
                inputWidth={"70%"}
                id={"principal_acct"}
                lovdata={principalAmountArray}
                value={principalAmount}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("trans_type");
                    input?.focus();
                  }
                }}
                onChange={(value) => {
                  setprincipalAmount(value);
                  handleOnChangeOfPrincipalAccount(value);
                  handleAccruedInterestandAccruedPenal();
                  setTimeout(() => {
                    const input = document.getElementById("trans_type");
                    input?.focus();
                  }, 0);

                  setTimeout(() => {
                    if (parseFloat(total) === 0) {
                      Swal.fire(
                        "ERR-000333: Zero Or Positive Balance On Credit Record. Transaction Not Allowed",
                        "",
                        "error"
                      );
                    }
                  }, 1000);
                }}
              />
            </div>
            <div style={{ flex: "0.15" }}>
              <InputField
                label={"Rate"}
                labelWidth={"70%"}
                inputWidth={"30%"}
                disabled
                value={
                  formDetails.length === 0 ? "" : formDetails[0]?.interest_rate
                }
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
                  value={
                    formDetails.length === 0
                      ? ""
                      : formDetails[0]?.repnt_period_months
                  }
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
                  buttonWidth={"160px"}
                  buttonIcon={<FiEye />}
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
                  <NewLoanGeneralEnquiry
                    closeModal={() => setShowEnquiryScreen(false)}
                    facilityDetails={formDetails[0]}
                    selectedCustomer={formDetails[0]}
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
                labelWidth={"48%"}
                inputWidth={"40%"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatDate(formDetails[0]?.effective_date)
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
                  formDetails.length === 0
                    ? ""
                    : formatDate(formDetails[0]?.last_repay_date)
                }
              />
            </div>
            <div style={{ flex: "0.25" }}>
              <InputField
                label={"Amount Granted"}
                labelWidth={"50%"}
                inputWidth={"39%"}
                disabled
                value={
                  formDetails.length === 0
                    ? ""
                    : formatNumber(parseFloat(formDetails[0]?.facility_amount))
                }
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
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "1.5px solid #d6d7d9",
            }}
          >
            <Header
              title="Balance, Arrears & Suspense"
              textTransform={"capitalize"}
              headerShade
            />
            <div
              style={{
                marginTop: "14px",
                marginBottom: "14px",
                display: "flex",
              }}
            >
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
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(
                          parseFloat(formDetails[0]?.shadow_balance_today)
                        )
                  }
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(principalArrears))
                  }
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}></div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Interest"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(formDetails[0]?.od_accrued_int))
                  }
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(interestArrears))
                  }
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(formDetails[0]?.od_intin_susp))
                  }
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
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(formDetails[0]?.cot_amount))
                  }
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(formDetails[0]?.cot_amount))
                  }
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(formDetails[0]?.pen_intin_susp))
                  }
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
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(formDetails[0]?.arrears_int))
                  }
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(formDetails[0]?.arrears_int))
                  }
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={
                    formDetails.length === 0
                      ? ""
                      : formatNumber(parseFloat(arrInterestSusp))
                  }
                  textAlign={"right"}
                />
              </div>
            </div>
            <br />
            <br />
            <div style={{ marginTop: "-25px" }}>
              <hr />
              {/* 
              <div>
                <Header
                  title={"Account Details"}
                  textTransform={"capitalize"}
                  headerShade
                />
              </div> */}

              <div style={{ marginTop: "", display: "flex" }}>
                <div style={{ flex: "0.48" }}>
                  <InputField
                    label={"Total"}
                    labelWidth={"58%"}
                    inputWidth={"35%"}
                    disabled
                    className={"font-bold"}
                    value={formatNumber(parseFloat(total))}
                    textAlign={"right"}
                  />
                </div>
                <div style={{ flex: "0.22" }}>
                  <InputField
                    inputWidth={"100%"}
                    disabled
                    value={formatNumber(parseFloat(totalArrears))}
                    textAlign={"right"}
                    className={"font-bold"}
                    inputColor={"red"}
                  />
                </div>
                <div style={{ flex: "0.25" }}>
                  <InputField
                    inputWidth={"90%"}
                    disabled
                    className={"font-bold"}
                    value={formatNumber(parseFloat(totalSuspense))}
                    textAlign={"right"}
                  />
                </div>
              </div>

              <div
                style={{
                  borderRadius: "5px",
                  // padding: "10px",
                }}
              >
                <div>
                  <Header
                    title={"Repayment Account Details"}
                    textTransform={"capitalize"}
                    headerShade
                  />
                </div>

                <div style={{ marginTop: "20px" }}>
                  <div>
                    <InputField
                      label={"Repayment Account"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={
                        formDetails.length === 0
                          ? ""
                          : formDetails[0]?.maintenance_fee_account
                      }
                      textAlign={"center"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Account Balance"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      className="font-bold"
                      value={
                        formDetails.length === 0
                          ? ""
                          : formatNumber(parseFloat(formDetails[0]?.avbal_mfa))
                      }
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
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "1.5px solid #d6d7d9",
            }}
          >
            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div>
                <Header
                  title={"Payment Options"}
                  textTransform={"capitalize"}
                  headerShade
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <SelectField
                  label={"Transaction Type"}
                  labelWidth={"25%"}
                  required
                  inputWidth={"30%"}
                  id="trans_type"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("top_up_amount");
                      input?.focus();
                    }
                  }}
                  onChange={(value) => {
                    setTransType(value);
                    const lastDayExpiry = formatDate(
                      formDetails[0]?.last_repay_date
                    );

                    setTimeout(() => {
                      const input = document.getElementById("top_up_amount");
                      input?.focus();
                    }, 0);

                    // SHOWING THE REMAINING BALANCE BASED ON THE TRANS TYPE
                    if (value === "E") {
                      setRemainingLoanBalanceAfterReduction(0);
                    }

                    if (value === "T" || value === "R") {
                      setRemainingLoanBalanceAfterReduction(
                        parseFloat(total) -
                          parseFloat(waiverAmount.interest) +
                          parseFloat(waiverAmount.penalty) +
                          parseFloat(topUpAmount)
                      );
                    }

                    const isDate1GreaterThanDate2 = compareDates(
                      lastDayExpiry,
                      formatDate(currentDate)
                    );

                    // IF PAYMENT TYPE IS E - EARLY SETTLEMENT AND EXPIRY DATE IS PAST OR DUE, THROW AN ERROR
                    if (value === "E" && isDate1GreaterThanDate2) {
                      Swal.fire(
                        "ERR - 05768:",
                        "Your loan is expired. Early settlement is not allowed.",
                        "error"
                      );
                      setTransType("");
                    }

                    // IF PAYMENT TYPE IS C - CAPITAL REDUCTION AND EXPIRY DATE IS PAST OR DUE, THROW AN ERROR
                    if (value === "C" && isDate1GreaterThanDate2) {
                      Swal.fire(
                        "ERR - 05767:",
                        "Your loan is expired. Capital reduction is not allowed.",
                        "error"
                      );
                      setTransType("");
                    }
                  }}
                  lovdata={[
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
                  value={transType}
                />
              </div>
              <div style={{ marginTop: "15px", color: "red" }}>
                {transType === "T" ? (
                  <InputField
                    labelWidth={"25%"}
                    inputWidth={"30%"}
                    label={"Top Up Amount"}
                    type={"number"}
                    required
                    id="top_up_amount"
                    onChange={(e) => {
                      setTopUpAmount(e.target.value);

                      if (e.target.value === "") {
                        setTopUpAmount(0);
                      }
                    }}
                    onBlur={(e) => {
                      e.preventDefault();
                      const input = document.getElementById("forceDebit");
                      input?.focus();

                      if (e.target.value?.trim() !== "") {
                        setRemainingLoanBalanceAfterReduction(
                          parseFloat(total) + parseFloat(e.target.value)
                        );

                        if (
                          waiver === "01" ||
                          waiver === "02" ||
                          waiver === "03" ||
                          waiver === "99"
                        ) {
                          setRemainingLoanBalanceAfterReduction(
                            parseFloat(total) + parseFloat(e.target.value)
                          );
                        }

                        if (
                          (waiver === "01" ||
                            waiver === "02" ||
                            waiver === "03" ||
                            waiver === "99") &&
                          topUpAmount
                        ) {
                          let newLoanAfterWaivers;

                          if (
                            typeof totalToBePaid2?.newLoanAfterWaivers ===
                            "string"
                          ) {
                            // Remove commas from the string
                            const stringWithoutCommas =
                              totalToBePaid2?.newLoanAfterWaivers?.replace(
                                /,/g,
                                ""
                              );
                            newLoanAfterWaivers =
                              parseFloat(topUpAmount) +
                              parseFloat(stringWithoutCommas);
                          } else {
                            // If it's not a string, directly perform the calculation
                            newLoanAfterWaivers =
                              parseFloat(topUpAmount) +
                              parseFloat(totalToBePaid2?.newLoanAfterWaivers);
                          }

                          // setTotalToBePaid2({
                          //   ...totalToBePaid2,
                          //   newLoanAfterWaivers: newLoanAfterWaivers,
                          // });

                          setremainingBalanceWithAmount(newLoanAfterWaivers);
                        }

                        // TODO: To set New VARIABLE || THIRD VARIABLE
                      } else {
                        setRemainingLoanBalanceAfterReduction(
                          parseFloat(total)
                        );

                        if (
                          (waiver === "01" ||
                            waiver === "02" ||
                            waiver === "03" ||
                            waiver === "99") &&
                          !topUpAmount
                        ) {
                          setremainingBalanceWithAmount(
                            totalToBePaid2?.newLoanAfterWaivers
                          );
                        }
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("forceDebit");
                        input?.focus();

                        if (e.target.value?.trim() !== "") {
                          setRemainingLoanBalanceAfterReduction(
                            parseFloat(total) + parseFloat(e.target.value)
                          );

                          if (
                            waiver === "01" ||
                            waiver === "02" ||
                            waiver === "03" ||
                            waiver === "99"
                          ) {
                            setRemainingLoanBalanceAfterReduction(
                              parseFloat(total) + parseFloat(e.target.value)
                            );
                          }

                          if (
                            (waiver === "01" ||
                              waiver === "02" ||
                              waiver === "03" ||
                              waiver === "99") &&
                            topUpAmount
                          ) {
                            let newLoanAfterWaivers;

                            if (
                              typeof totalToBePaid2?.newLoanAfterWaivers ===
                              "string"
                            ) {
                              // Remove commas from the string
                              const stringWithoutCommas =
                                totalToBePaid2?.newLoanAfterWaivers?.replace(
                                  /,/g,
                                  ""
                                );
                              newLoanAfterWaivers =
                                parseFloat(topUpAmount) +
                                parseFloat(stringWithoutCommas);
                            } else {
                              // If it's not a string, directly perform the calculation
                              newLoanAfterWaivers =
                                parseFloat(topUpAmount) +
                                parseFloat(totalToBePaid2?.newLoanAfterWaivers);
                            }

                            // setTotalToBePaid2({
                            //   ...totalToBePaid2,
                            //   newLoanAfterWaivers: newLoanAfterWaivers,
                            // });

                            setremainingBalanceWithAmount(newLoanAfterWaivers);
                          }

                          // TODO: To set New VARIABLE || THIRD VARIABLE
                        } else {
                          setRemainingLoanBalanceAfterReduction(
                            parseFloat(total)
                          );

                          if (
                            (waiver === "01" ||
                              waiver === "02" ||
                              waiver === "03" ||
                              waiver === "99") &&
                            !topUpAmount
                          ) {
                            setremainingBalanceWithAmount(
                              totalToBePaid2?.newLoanAfterWaivers
                            );
                          }
                        }
                      }
                    }}
                    onFocus={(e) => {
                      if (e.target.value?.trim() !== "") {
                        setRemainingLoanBalanceAfterReduction(
                          parseFloat(total) + parseFloat(e.target.value)
                        );
                      } else {
                        setRemainingLoanBalanceAfterReduction(
                          parseFloat(total)
                        );
                      }
                    }}
                  />
                ) : transType === "E" ? (
                  <InputField
                    labelWidth={"25%"}
                    inputWidth={"30%"}
                    label={"Total Settlement Amount"}
                    required
                    value={formatNumber(
                      parseFloat(formDetails[0]?.shadow_balance_today)
                    )}
                    disabled
                    textAlign={"right"}
                    // onChange={(e)=>setEarlySettlement(e.target.value)}
                  />
                ) : transType === "R" ? (
                  <InputField
                    labelWidth={"25%"}
                    inputWidth={"30%"}
                    label={"Amount"}
                    value={0}
                    required
                    textAlign={"right"}
                    disabled
                  />
                ) : transType === "C" ? (
                  <InputField
                    labelWidth={"25%"}
                    inputWidth={"30%"}
                    label={"Reduction Amount"}
                    required
                    value={capitalReduction}
                    onChange={(e) => setCapitalReduction(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (e.target.value?.trim() !== "") {
                          setRemainingLoanBalanceAfterReduction(
                            parseFloat(total) - parseFloat(e.target.value)
                          );

                          if (
                            waiver === "01" ||
                            waiver === "02" ||
                            waiver === "03" ||
                            waiver === "99"
                          ) {
                            const newLoanAfterWaiversWithoutCommas = parseFloat(
                              totalToBePaid2?.newLoanAfterWaivers?.replace(
                                /,/g,
                                ""
                              )
                            );

                            setTotalToBePaid2({
                              ...totalToBePaid2,
                              newLoanAfterWaivers:
                                newLoanAfterWaiversWithoutCommas -
                                parseFloat(e.target.value),
                            });
                          }

                          if (parseFloat(e.target.value) >= total) {
                            Swal.fire(
                              "INF - 01581: The Reduction Amount cannot be equal or greater than Total Loan Balance. Use Early Settlement Option to perform such operation",
                              "",
                              "info"
                            );
                            setRemainingLoanBalanceAfterReduction(0);
                            setCapitalReduction(0);
                          }
                        }
                        if (e.target.value?.trim() === "") {
                          setRemainingLoanBalanceAfterReduction(
                            parseFloat(total)
                          );
                        }
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value?.trim() !== "") {
                        setRemainingLoanBalanceAfterReduction(
                          parseFloat(total) - parseFloat(e.target.value)
                        );

                        if (parseFloat(e.target.value) >= total) {
                          Swal.fire(
                            "INF - 01581: The Reduction Amount cannot be equal or greater than Total Loan Balance. Use Early Settlement Option to perform such operation",
                            "",
                            "info"
                          );
                          setRemainingLoanBalanceAfterReduction(0);

                          setCapitalReduction(0);
                        }
                      } else {
                        setRemainingLoanBalanceAfterReduction(
                          parseFloat(total)
                        );
                      }
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div style={{ marginTop: "15px" }}>
                <SelectField
                  label={"Force Debit"}
                  labelWidth={"25%"}
                  inputWidth={"30%"}
                  color="red"
                  // id={"forceDebit"}
                  onChange={(value) => {
                    setForceDebit(value);
                  }}
                  lovdata={[
                    {
                      label: "Yes",
                      value: "Y",
                    },
                    {
                      label: "No",
                      value: "N",
                    },
                  ]}
                  value={transType === "R" ? "Y" : "N"}
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
                  {/* <div></div> */}
                  {/* <div>
                    <ButtonComponent
                      label={"View Collateral"}
                      buttonWidth={"150px"}
                      buttonHeight={"40px"}
                      onClick={() => setShowCollateralScreen(true)}
                    />
                  </div> */}

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
              {/* <Tabs
                color="yellow"
                radius="xs"
                variant="pills"
                defaultValue="gallery"
              > */}
              {/* <Tabs.List>
                  <Tabs.Tab value="gallery">Waiver Options</Tabs.Tab>
                  <Tabs.Tab
                    value="messages"
                    disabled={transType !== "" ? false : true}
                  >
                    Charges Details
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="settings"
                    disabled={
                      transType !== "" ? false : transType === "R" ? true : true
                    }
                  >
                    Reschedule Details
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="payment"
                    disabled={
                      previewScheduleState || transType === "E" ? false : true
                    }
                    onClick={() => {
                      if (previewScheduleState === false) {
                        Swal.fire("", "", "error");
                      }
                    }}
                  >
                    Payment Reason
                  </Tabs.Tab>
                </Tabs.List> */}
              <Tabs
                value={String(currentValuev)}
                color="yellow"
                radius="xs"
                variant="pills"
              >
                <Tabs.List>
                  <Tabs.Tab value="1">Waiver Options</Tabs.Tab>
                  <Tabs.Tab value="2" disabled={currentValuev !== 1}>
                    Charges Details
                  </Tabs.Tab>
                  <Tabs.Tab value="3" disabled={currentValuev !== 2}>
                    Reschedule Details
                  </Tabs.Tab>
                  <Tabs.Tab value="4" disabled={currentValuev !== 3}>
                    Payment Reason
                  </Tabs.Tab>
                </Tabs.List>
                <hr />

                <Tabs.Panel value="1" pt="xs">
                  <div style={{ padding: "10px" }}>
                    <div style={{ marginTop: "-20px" }}>
                      <ListOfValue
                        label={"Waiver"}
                        labelWidth={"25%"}
                        inputWidth={"50%"}
                        lovdata={waiverArr}
                        value={waiver}
                        onChange={(value) => {
                          setWaiver(value);
                          if (!topUpAmount) {
                            setTopUpAmount(0);
                          }

                          if (value === "01") {
                            setTotalToBePaid2({
                              ...totalToBePaid,
                              interest: "0.00",
                            });
                            setWaiverAmount({
                              interest: "",
                              penalty: "",
                              arrears: "",
                            });
                            setWaiverPercentage({
                              interest: "",
                              penalty: "",
                              arrears: "",
                            });
                          } else if (value === "02") {
                            setTotalToBePaid2({
                              ...totalToBePaid,
                              penalty: "0.00",
                            });
                            setWaiverAmount({
                              interest: "",
                              penalty: "",
                              arrears: "",
                            });
                            setWaiverPercentage({
                              interest: "",
                              penalty: "",
                              arrears: "",
                            });
                          } else if (value === "03") {
                            setTotalToBePaid2({
                              ...totalToBePaid,
                              penalty: "0.00",
                              interest: "0.00",
                            });
                            setWaiverAmount({
                              interest: "",
                              penalty: "",
                              arrears: "",
                            });
                            setWaiverPercentage({
                              interest: "",
                              penalty: "",
                              arrears: "",
                            });
                          } else if (value === "00" || value === "99") {
                            setTotalToBePaid2({ ...totalToBePaid });
                            setWaiverAmount({
                              interest: "",
                              penalty: "",
                              arrears: "",
                            });
                            setWaiverPercentage({
                              interest: "",
                              penalty: "",
                              arrears: "",
                            });
                          }
                          setCalc(!calc);
                        }}
                        disabled={
                          waiver === "E"
                            ? true
                            : isDate1GreaterThanDate2s === true
                            ? false
                            : false
                        }
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
                          value={waiverPercentage.interest}
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
                            waiver === "01" || waiver === "03"
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
                            waiver === "02" || waiver === "03"
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
                          value={totalToBePaid2?.interest}
                          textAlign={"right"}
                        />
                      </div>
                      <div style={{}}>
                        <InputField
                          label={"Total Penalty To be Paid"}
                          labelWidth={"50%"}
                          inputWidth={"43%"}
                          disabled
                          value={totalToBePaid2?.penalty}
                          textAlign={"right"}
                        />
                      </div>
                      <div style={{}}>
                        <InputField
                          label={"Total Arr To be Paid"}
                          labelWidth={"50%"}
                          inputWidth={"43%"}
                          disabled
                          value={totalToBePaid2?.arrears}
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
                          value={totalToBePaid2?.loanPrincipal}
                        />
                      </div>
                      <div style={{}}>
                        <InputField
                          label={"New Loan Balance After Waiver(s)"}
                          labelWidth={"50%"}
                          inputWidth={"43%"}
                          disabled
                          textAlign={"right"}
                          value={totalToBePaid2?.newLoanAfterWaivers}
                        />
                      </div>
                      <div style={{ color: "red" }}>
                        {/* TORSGOD */}
                        <InputField
                          label={"Remaining Loan Balance After Reduction"}
                          labelWidth={"50%"}
                          textAlign={"right"}
                          inputWidth={"43%"}
                          disabled
                          color={"red"}
                          inputColor={"red"}
                          value={
                            waiver === "01" ||
                            waiver === "02" ||
                            waiver === "03" ||
                            waiver === "99"
                              ? parseFloat(
                                  totalToBePaid2?.interest?.replace(/,/g, "")
                                ) +
                                parseFloat(
                                  totalToBePaid2?.penalty?.replace(/,/g, "")
                                ) +
                                parseFloat(
                                  totalToBePaid2?.arrears?.replace(/,/g, "")
                                ) +
                                parseFloat(
                                  totalToBePaid2?.loanPrincipal?.replace(
                                    /,/g,
                                    ""
                                  )
                                ) +
                                parseFloat(topUpAmount)
                              : // when there is no TOP UP AMOUNT
                                // !topUpAmount?.trim()
                                // ? parseFloat(
                                //     totalToBePaid2?.interest?.replace(/,/g, "")
                                //   ) +
                                //   parseFloat(
                                //     totalToBePaid2?.penalty?.replace(/,/g, "")
                                //   ) +
                                //   parseFloat(
                                //     totalToBePaid2?.arrears?.replace(/,/g, "")
                                //   ) +
                                //   parseFloat(
                                //     totalToBePaid2?.loanPrincipal?.replace(
                                //       /,/g,
                                //       ""
                                //     )
                                //   )
                                // :
                                formatNumber(
                                  parseFloat(remainingLoanBalanceAfterReduction)
                                )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="2" pt="xs">
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
                        labelWidth={"31%"}
                        inputWidth={"39%"}
                        textAlign={"right"}
                        value={fee}
                        type={"number"}
                        onChange={(e) => {
                          setFee(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            if (!e.target.value) {
                              setTotalFeesAmount(parseFloat(insurance));
                            }
                            if (e.target.value?.trim() !== "")
                              setTotalFeesAmount(
                                parseFloat(fee) + parseFloat(insurance)
                              );
                          } else {
                            setTotalFeesAmount((prev) => prev);
                          }
                        }}
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setTotalFeesAmount(parseFloat(insurance));
                            setFee(0);
                          }
                          if (e.target.value?.trim() !== "")
                            setTotalFeesAmount(
                              parseFloat(fee) + parseFloat(insurance)
                            );
                        }}
                      />

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <InputField
                          label={"Insurance"}
                          labelWidth={"40%"}
                          inputWidth={"50%"}
                          id={"insurance_rate"}
                          textAlign={"right"}
                          onChange={(e) => setInsuranceRate(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              getInsuranceAmount(parseFloat(e.target.value));
                            }
                          }}
                          onBlur={(e) => {
                            getInsuranceAmount(parseFloat(e.target.value));
                          }}
                          value={insuranceRate}
                        />

                        <InputField
                          inputWidth={"50%"}
                          textAlign={"right"}
                          onChange={(e) => {
                            setInsurance(e.target.value);
                          }}
                          value={insurance}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              getInsuranceRate(parseFloat(e.target.value));
                            }
                          }}
                          onBlur={(e) => {
                            getInsuranceRate(parseFloat(e.target.value));
                          }}
                        />
                      </div>
                      <InputField
                        label={"Total Fees Amount"}
                        labelWidth={"31%"}
                        inputWidth={"39%"}
                        disabled
                        type={"text"}
                        id={"tot_fees_amt"}
                        value={totalFeesAmount}
                        textAlign={"right"}
                      />
                    </div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="3" pt="xs">
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
                          value={
                            waiver === "01" ||
                            waiver === "02" ||
                            waiver === "03" ||
                            waiver === "99"
                              ? parseFloat(
                                  totalToBePaid2?.interest?.replace(/,/g, "")
                                ) +
                                parseFloat(
                                  totalToBePaid2?.penalty?.replace(/,/g, "")
                                ) +
                                parseFloat(
                                  totalToBePaid2?.arrears?.replace(/,/g, "")
                                ) +
                                parseFloat(
                                  totalToBePaid2?.loanPrincipal?.replace(
                                    /,/g,
                                    ""
                                  )
                                ) +
                                parseFloat(topUpAmount)
                              : formatNumber(
                                  parseFloat(remainingLoanBalanceAfterReduction)
                                )
                          }
                          textAlign={"right"}
                        />
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div>
                          <InputField
                            label={"Interest Rate P.M / P.A"}
                            labelWidth={"62%"}
                            inputWidth={"30%"}
                            required
                            textAlign={"right"}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const input =
                                  document.getElementById("next_tenor");
                                input?.focus();
                              }
                            }}
                            onChange={(e) => setInterestRatePM(e.target.value)}
                            value={interestRatePM}
                          />
                        </div>

                        <div>
                          <InputField
                            inputWidth={"45%"}
                            value={formatNumber(
                              parseFloat(interestRatePM) * 12
                            )}
                            textAlign={"right"}
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
                          value={newTenorVal}
                          onChange={(e) => {
                            setNewTenorVal(e.target.value);
                            setPrincipalRepaymentCount(e.target.value);
                            setInterestRepaymentCount(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <ListOfValue
                          label={"Interest Type"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          required
                          id={"int_type"}
                          lovdata={interestType}
                          value={interestTypeVal}
                          onChange={(value) => {
                            setInterestTypeVal(value);
                            setTimeout(() => {
                              const input = document.getElementById("prf");
                              input?.focus();
                            }, 0);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const input = document.getElementById("prf");
                              input?.focus();
                            }
                          }}
                        />
                      </div>
                      <div>
                        <ListOfValue
                          label={"Principal Repayment Frequency"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          id={"prf"}
                          required
                          lovdata={principalRepayFreq}
                          onChange={(value) => {
                            setPrincipalRepayFreqVal(value);
                            setInterestRepayFreqVal(value);
                            handlePrincipalRepaymentFrequency(value);
                          }}
                          value={principalRepayFreqVal}
                        />
                      </div>
                      <div>
                        <ListOfValue
                          label={"Interest Repayment Frequency"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          required
                          lovdata={principalRepayFreq}
                          onChange={() =>
                            setInterestRepayFreqVal(principalRepayFreqVal)
                          }
                          value={interestRepayFreqVal}
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
                        />
                      </div>
                      <div>
                        <SelectField
                          label={"Moratorium with Interest"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          lovdata={[
                            {
                              label: "Yes",
                              value: "Y",
                            },
                            {
                              label: "No",
                              value: "N",
                            },
                          ]}
                          defaultValue={"N"}
                          onChange={(value) => {
                            setMoratoriumWithInterest(value);
                            if (
                              value === "Y" &&
                              moratoriumPeriod?.trim() === "" &&
                              parseFloat(moratoriumPeriod) <
                                parseFloat(repayCnt)
                            ) {
                              Swal.fire(
                                "ERR-01451: Moratorium period must be less than the repayment count",
                                "",
                                "error"
                              );
                              setMoratoriumWithInterest("N");
                            }
                          }}
                          value={moratoriumWithInterest}
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Next Schedule Date"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
                          value={formatDate(nextSchedule)}
                          disabled
                        />
                      </div>
                      <div>
                        <InputField
                          type={"date"}
                          label={"Effective Date"}
                          labelWidth={"40%"}
                          inputWidth={"35%"}
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
                            buttonHeight={"31px"}
                            buttonWidth={"180px"}
                            buttonColor={"white"}
                            buttonIcon={<FiEye />}
                            onClick={() => {
                              if (
                                interestRatePM?.trim() === "" ||
                                newTenorVal?.trim() === "" ||
                                interestTypeVal?.trim() === "" ||
                                principalRepayFreqVal?.trim() === "" ||
                                interestRepayFreqVal?.trim() === ""
                              ) {
                                Swal.fire(
                                  "ERR - 02326: Confirm the new schedule and its parameters before proceeding",
                                  "",
                                  "error"
                                );
                              } else {
                                handleLoanPaymentSchedulePrc();
                                if (schedulePreviewed?.responseCode === "998") {
                                  getPreviewSchedule(
                                    formDetails[0]?.facility_no
                                  );
                                }
                                getPreviewSchedule(formDetails[0]?.facility_no);
                                setOpenPreviewSchedule(true);
                                setPreviewScheduleState(true);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="4" pt="xs">
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
                            inputWidth={"50%"}
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                          />
                        </div>

                        <Modal
                          opened={sweetAlertConfirmed}
                          size="lg"
                          centered
                          style={{ height: "100%" }}
                          className="shadow-md shadow-black"
                          closeOnClickOutside
                          onClose={() => setSweetAlertConfirmed(false)}
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
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div
                      style={{
                        borderRadius: "5px",
                        padding: "20px",
                        border: "1px solid #b8babb",
                      }}
                    >
                      <TextAreaField
                        label={"Reason"}
                        required
                        inputWidth={"70%"}
                        labelWidth={"20%"}
                        onChange={(e) => {
                          setReason(e.target.value);
                        }}
                        value={reason}
                      />
                    </div>
                  </div>
                </Tabs.Panel>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                  }}
                >
                  <div></div>
                  <div style={{ display: "flex" }}>
                    {currentValuev !== 1 && (
                      <div style={{ marginRight: "20px" }}>
                        <ButtonComponent
                          label={"Previous"}
                          onClick={handlePreviousClick}
                          buttonHeight={"40px"}
                          buttonWidth={"130px"}
                          buttonIcon={<FiArrowLeft />}
                        />
                      </div>
                    )}

                    {currentValuev !== 4 && (
                      <div>
                        <ButtonComponent
                          buttonHeight={"40px"}
                          buttonWidth={"130px"}
                          buttonIcon={<FiArrowRight />}
                          label={"Continue"}
                          onClick={() => {
                            if (transType === "T" || transType === "R") {
                              handleContinueClick();
                            }
                            if (
                              transType === "C" &&
                              parseFloat(capitalReduction) <
                                parseFloat(totalArrears)
                            ) {
                              Swal.fire(
                                "ERR - 02315: Reduction amount should be more than total arrears balance",
                                "",
                                "error"
                              );
                              setCurrentValuev("1");
                              setRemainingLoanBalanceAfterReduction(0);
                              setCapitalReduction(0);
                            }

                            if (
                              parseFloat(capitalReduction) >
                                parseFloat(totalArrears) &&
                              parseFloat(capitalReduction) >
                                parseFloat(formDetails[0]?.avbal_mfa)
                            ) {
                              Swal.fire(
                                "ERR - 01574: There is insufficient funds in the Repayment Account",
                                "",
                                "error"
                              );
                            }

                            if (
                              // transType === "C" &&
                              // parseFloat(capitalReduction) >
                              //   parseFloat(totalToBePaid2?.arrears) +
                              //     parseFloat(totalToBePaid2?.interest) +
                              //     parseFloat(totalToBePaid2?.penalty)
                              transType === "C" &&
                              parseFloat(capitalReduction) ===
                                parseFloat(totalToBePaid2?.newLoanAfterWaivers)
                            ) {
                              Swal.fire(
                                "ERR - 01504: Use the Early Settlement Option to perform such transaction",
                                "",
                                "error"
                              );

                              setRemainingLoanBalanceAfterReduction(0);
                              setCapitalReduction(0);
                            }

                            if (transType === "") {
                              Swal.fire(
                                "ERR - 01505: Select Payment Type",
                                "",
                                "error"
                              );
                              // handlePreviousClick();
                              setCurrentValuev("1");
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Tabs>
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

export default LoanReschedule;
