import React, { useState, useEffect, useRef } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import HeaderComponent from "../components/header/HeaderComponent";
import ButtonType from "../components/button/ButtonType";
import { Checkbox } from "@mantine/core";
import TextAreaField from "../components/fields/TextArea";
import SelectField from "../components/fields/SelectField";
import Label from "../components/label/Label";
import { API_SERVER } from "../../../../config/constant";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import swal from "sweetalert";
// import CustomTable from "../components/data-table/CustomTable";
import CustomTable from "../../teller-ops/components/CustomTable";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import { AiFillPrinter } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import { Modal } from "@mantine/core";
import coop from "../../../../assets/coop.png";
import Swal from "sweetalert2";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const LoanQuotation = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const handleClear = () => {
    setApplicantName("");
    setNetMonthlyIncomeSlashSalary("");
    setDebtServiceRatio("");
    setEffectiveDate("");
    setLoanProduct("");
    setSelectedCurrency("");
    setFacilityNumber("");
    setInterestRate("");
    setTenorInMonths("");
    setExemptMonth("");
    setInterestType("");
    setPrincipalRepaymentFrequency("");
    setInterestRepaymentFrequency("");
    setPrincipalRepaymentCount("");
    setInterestRepaymentCount("");
    setMoratorium("");
    setWithInterest("");
    setLastWorkingDay("");
    setBalloonInstallment("");
    setFirstRepaymentDate("");
    setLastRepaymentDate("");
    setData([]);
  };
  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const [applicantName, setApplicantName] = useState("");
  const [netMonthlyIncomeSlashSalary, setNetMonthlyIncomeSlashSalary] =
    useState("");
  const [debtServiceRatio, setDebtServiceRatio] = useState();

  const [allLoanProducts, setAllLoanProducts] = useState([]);
  const [loanProduct, setLoanProduct] = useState();

  const [allInterestType, setAllInterestType] = useState([]);
  const [interestType, setInterestType] = useState();

  const [currency, setCurrency] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState([]);

  // const [dat, setDat] = useState();
  const [facilityNumber, setFacilityNumber] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  //   const [currency, setCurrency] = useState(0);
  const [facilityAmount, setFacilityAmount] = useState(0);
  const [interestRate, setInterestRate] = useState();
  const [tenorInMonths, setTenorInMonths] = useState("");
  const [exemptMonth, setExemptMonth] = useState("");
  const [withInterest, setWithInterest] = useState("");
  const [lastWorkingDay, setLastWorkingDay] = useState("");
  const [expiryDate, setExpiryDate] = useState();

  const [allPrincipalRepaymentFrequency, setAllPrincipalRepaymentFrequency] =
    useState([]);
  const [principalRepaymentFrequency, setPrincipalRepaymentFrequency] =
    useState();

  const [allInterestRepaymentFrequency, setAllInterestRepaymentFrequency] =
    useState([]);

  const [interestRepaymentFrequency, setInterestRepaymentFrequency] =
    useState();

  const [principalRepaymentCount, setPrincipalRepaymentCount] = useState();
  const [interestRepaymentCount, setInterestRepaymentCount] = useState();
  const [moratoriumPeriod, setMoratorium] = useState("");
  const [moratoriumInterest, setMoratoriumInterest] = useState("");
  //   const [lastWorkingDay, setLastWorkingDay] = useState("");

  const [balloonInstallment, setBalloonInstallment] = useState("");
  const [firstRepaymentDate, setFirstRepaymentDate] = useState("");
  const [processingFees, setProcessingFees] = useState("");
  const [balloonInstallmentNumber, setBalloonInstallmentNumber] = useState("");
  const [lastRepaymentDate, setLastRepaymentDate] = useState("");
  const [legalForm, setLegalForm] = useState("");
  const [printing, setPrinting] = useState(false);
  const [loanScheduleModal, setLoanScheduleModal] = useState();
  const [intRate, setIntRate] = useState("");
  const [load, setLoad] = useState(false);

  const [data, setData] = useState([]);

  // console.log(
  //   facilityNumber +
  //     "," +
  //     effectiveDate +
  //     ", " +
  //     currency +
  //     "," +
  //     facilityAmount +
  //     "," +
  //     interestRate +
  //     "," +
  //     tenorInMonths +
  //     "," +
  //     exemptMonth +
  //     "," +
  //     principalRepaymentFrequency +
  //     "," +
  //     interestRepaymentFrequency +
  //     "," +
  //     principalRepaymentCount +
  //     "," +
  //     interestRepaymentCount +
  //     "," +
  //     moratoriumPeriod +
  //     "," +
  //     moratoriumInterest +
  //     "," +
  //     lastWorkingDay +
  //     "," +
  //     interestType +
  //     "," +
  //     balloonInstallment +
  //     "," +
  //     firstRepaymentDate +
  //     "," +
  //     processingFees +
  //     "," +
  //     balloonInstallmentNumber +
  //     "," +
  //     lastRepaymentDate +
  //     "," +
  //     legalForm
  // );

  const [quotationNumber, setQuotationNumber] = useState(null);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  var branch = JSON.parse(localStorage.getItem("userInfo")).branch;

  useEffect(() => {
    async function getQuotationNumber() {
      let response = await fetch(API_SERVER + "/api/get-unique-ref", {
        headers,
      });
      response = await response.json();
      setQuotationNumber(response[0]["unique_ref"]);
      //   console.log(response[0]["unique_ref"]);
    }

    getQuotationNumber();
  }, []);

  useEffect(() => {
    // async function getLoanProducts() {
    //   let response = await fetch(API_SERVER + "/api/get-loan-products", {
    //     headers,
    //   });
    //   response = await response.json();
    //   setAllLoanProducts(response);
    //   //   console.log(response);
    // }

    async function getLoanProducts() {
      let response = await axios.post(
        API_SERVER + "/api/get-loan-products",
        { customer_type: "I" },
        {
          headers,
        }
      );
      // response = await response.json();
      setAllLoanProducts(response.data);
      // console.log(response);
    }

    async function getCurrency() {
      let response = await fetch(API_SERVER + "/api/get-currency", { headers });
      response = await response.json();
      setCurrency(response);
      //   console.log(response);
    }

    async function getInterestType() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRT" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setAllInterestType(response.data);
    }

    async function getPrincipalRepaymentFrequency() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setAllPrincipalRepaymentFrequency(response.data);
    }

    async function getInterestRepaymentFrequency() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setAllInterestRepaymentFrequency(response.data);
    }

    getInterestRepaymentFrequency();
    getPrincipalRepaymentFrequency();
    getInterestType();
    getCurrency();
    getLoanProducts();
  }, []);

  const handleApplicantNameChange = (event) => {
    const value = event.target.value;
    // console.log(value);
    setApplicantName(value);
  };

  const handleLoanProductChange = (value) => {
    setLoanProduct(value);
    setTimeout(() => {
      const input = document.getElementById("currency");
      input.focus();
    }, 0);
  };

  const handleCurrencyChange = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-product-details",
        {
          legal_form: loanProduct?.trim(),
          currency: value?.trim(),
        },
        {
          headers,
        }
      )
      .then(function (response) {
        setInterestType(response.data[0]?.int_type);
        setPrincipalRepaymentFrequency(response.data[0]?.repayment_frequency);
        setInterestRepaymentFrequency(response.data[0]?.int_freq);
        setTenorInMonths(response.data[0]?.maturity_period);
        setPrincipalRepaymentCount(
          Math.round(parseFloat(response.data[0]?.prin_pay_count))
        );
        setInterestRepaymentCount(
          Math.round(parseFloat(response.data[0]?.int_pay_count))
        );
        setLastWorkingDay(response.data[0]?.last_day);
        setExemptMonth(response.data[0]?.weeks_in_month);
        setWithInterest(response.data[0]?.mora_all);
        setMoratorium("0");
      });

    // setTenorInMonths("12");
    // setInterestType("02");
    // setPrincipalRepaymentFrequency("03");
    // setInterestRepaymentFrequency("03");
    // setPrincipalRepaymentCount("12");
    // setInterestRepaymentCount("12");
    // setMoratorium("0");

    // setLastWorkingDay("Y");

    setSelectedCurrency(value);
    setTimeout(() => {
      const input = document.getElementById("facilityAmount");
      input.focus();
    }, 0);
  };

  const handleInterestType = (value) => {
    setInterestType(value);
  };

  const handlePrincipalRepaymentFrequency = (value) => {
    if (value === "03") {
      setInterestRepaymentCount(tenorInMonths * 1);
      setPrincipalRepaymentCount(tenorInMonths * 1);
    } else if (value === "01") {
      setInterestRepaymentCount(Math.round(parseFloat(tenorInMonths * 4.35)));
      setPrincipalRepaymentCount(Math.round(parseFloat(tenorInMonths * 4.35)));
    } else if (value === "02") {
      setInterestRepaymentCount(
        Math.round(parseFloat(tenorInMonths * 2.16666667))
      );
      setPrincipalRepaymentCount(
        Math.round(parseFloat(tenorInMonths * 2.16666667))
      );
    } else if (value === "04") {
      setInterestRepaymentCount(Math.round(parseFloat(12 / 3)));
      setPrincipalRepaymentCount(Math.round(parseFloat(12 / 3)));
    } else if (value === "05") {
      setInterestRepaymentCount(tenorInMonths * 1);
      setPrincipalRepaymentCount(tenorInMonths * 1);
    } else if (value === "06") {
      setInterestRepaymentCount(tenorInMonths / tenorInMonths);
      setPrincipalRepaymentCount(tenorInMonths / tenorInMonths);
    } else if (value === "07") {
      setInterestRepaymentCount(tenorInMonths / 2);
      setPrincipalRepaymentCount(tenorInMonths / 2);
    } else if (value === "08") {
      setInterestRepaymentCount(parseFloat(12 / 6));
      setPrincipalRepaymentCount(parseFloat(12 / 6));
    } else if (value === "09") {
      setInterestRepaymentCount(tenorInMonths / tenorInMonths);
      setPrincipalRepaymentCount(tenorInMonths / tenorInMonths);
    }

    setPrincipalRepaymentFrequency(value);
    setInterestRepaymentFrequency(value);
  };

  const handleInterestRepaymentFrequency = (value) => {
    setInterestRepaymentFrequency(value);
    if (value === "03") {
      setInterestRepaymentCount(parseFloat(tenorInMonths * 1));
    } else if (value === "01") {
      setInterestRepaymentCount(parseFloat(tenorInMonths * 4.35));
    } else if (value === "02") {
      setInterestRepaymentCount(parseFloat(tenorInMonths * 2.16666667));
    } else if (value === "04") {
      setInterestRepaymentCount(parseFloat(12 / 3));
    } else if (value === "05") {
      setInterestRepaymentCount(tenorInMonths * 1);
    } else if (value === "06") {
      setInterestRepaymentCount(tenorInMonths / tenorInMonths);
    } else if (value === "07") {
      setInterestRepaymentCount(tenorInMonths / 2);
    } else if (value === "08") {
      setInterestRepaymentCount(parseFloat(12 / 6));
    } else if (value === "09") {
      setInterestRepaymentCount(tenorInMonths / tenorInMonths);
    }
  };

  // console.log(interestRepaymentFrequency, "interest frequencies");

  // console.log(principalRepaymentFrequency, "freq");

  // console.log(interestType, "int");
  // console.log(loanProduct, selectedCurrency);

  const handleNetMonthlyIncomeSalaryChange = (event) => {
    // const value = event.target.value;
    const inputValue = event.target.value;
    if (!inputValue || /^\d*\.?\d*$/.test(inputValue)) {
      setNetMonthlyIncomeSlashSalary(inputValue);
      // setAmount(inputValue);
    }
  };

  const handleEffectiveDateChange = (event) => {
    const value = event.target.value;
    // console.log(value);
    setEffectiveDate(value);
  };

  const handleFacilityNumberChange = (event) => {
    if (!event?.target?.value || /^\d*\.?\d*$/.test(event?.target?.value)) {
      const inputValue = event.target.value;
      setFacilityNumber(inputValue);
    }
  };

  function RequestAmountBlur(e) {
    if (!facilityNumber.includes(",")) {
      if (!(facilityNumber === "")) {
        setFacilityNumber(formatNumber(parseFloat(e?.target?.value)));
      }
    }
  }

  const handleInterestRateChange = (event) => {
    const inputValue = event.target.value;
    if (!inputValue || /^\d*\.?\d*$/.test(inputValue)) {
      setInterestRate(inputValue);
    }
  };

  const handleTenorInMonthsChange = (event) => {
    const value = event.target.value;
    // console.log(value);
    setTenorInMonths(value);
  };

  //   exempt month
  const handleChangeExemptMonths = (value) => {
    setExemptMonth(value);
  };
  //   console.log(exemptMonth,"month")

  // with interest
  const handleChangeWithInterest = (value) => {
    setWithInterest(value);
    // setMoratoriumInterest(value);
  };
  //   console.log(withInterest, "interest");

  //  last working day
  const handleChangeLastWorkingDay = (value) => {
    setLastWorkingDay(value);
  };
  //   console.log(lastWorkingDay, "last working day");

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

  function formatDate(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    // Pad the day with a leading zero if it's a single digit
    var day = inputDate.getDate();
    var paddedDay = day < 10 ? "0" + day : day;

    return (
      paddedDay +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }

  function formatDatee(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var year = inputDate.getFullYear();
    var month = addLeadingZero(inputDate.getMonth() + 1); // Add 1 to get the month in the 1-12 range
    var day = addLeadingZero(inputDate.getDate());

    // Use a helper function to add leading zeros
    function addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    }

    return year + "-" + month + "-" + day;
  }

  async function postLoanScheduleEnquiry() {
    const facilityNumber = document.getElementById("quotationNumber").value;
    const applicantName = document.getElementById("applicantName").value;
    const netMonthlyIncomeSalary = document.getElementById(
      "netMonthlyIncomeSalary"
    ).value;
    const effectiveDate = document.getElementById("effectiveDate").value;

    // const eDate = new Date(effectiveDate);
    // const effective_date = eDate
    //   .toLocaleDateString("en-GB", {
    //     day: "numeric",
    //     month: "short",
    //     year: "numeric",
    //   })
    //   .replace(/ /g, "-");

    // return console.log(loanProduct);
    // return console.log(selectedCurrency);

    const facilityAmount = document.getElementById("facilityAmount").value;
    const interestRate = document.getElementById("interestRate").value;
    const tenorInMonths = document.getElementById("tenorInMonths").value;

    // return console.log(exemptMonth);

    if (document.getElementById("principalRepaymentFrequency")) {
      const principalRepaymentFrequency = document.getElementById(
        "principalRepaymentFrequency"
      ).value;
    }
    if (document.getElementById("interestRepaymentFrequency")) {
      const interestRepaymentFrequency = document.getElementById(
        "interestRepaymentFrequency"
      ).value;
    }
    if (document.getElementById("principalRepaymentCount")) {
      const principalRepaymentCount = document.getElementById(
        "principalRepaymentCount"
      ).value;
    }
    if (document.getElementById("interestRepaymentCount")) {
      const interestRepaymentCount = document.getElementById(
        "interestRepaymentCount"
      ).value;
    }
    if (document.getElementById("moratoriumPeriod")) {
      const moratoriumPeriod =
        document.getElementById("moratoriumPeriod").value;
    }
    if (document.getElementById("moratoriumInterest")) {
      const moratoriumInterest =
        document.getElementById("moratoriumInterest").value;
    }
    if (document.getElementById("lastWorkingDay")) {
      const lastWorkingDay = document.getElementById("lastWorkingDay").value;
    }
    if (document.getElementById("interestType")) {
      const interestType = document.getElementById("interestType").value;
    }
    if (document.getElementById("balloonInstallment")) {
      const balloonInstallment =
        document.getElementById("balloonInstallment").value;
    }
    if (document.getElementById("firstRepaymentDate")) {
      const firstRepaymentDate =
        document.getElementById("firstRepaymentDate").value;
    }
    if (document.getElementById("processingFees")) {
      const processingFees = document.getElementById("processingFees").value;
    }
    if (document.getElementById("balloonInstallmentNumber")) {
      const balloonInstallmentNumber = document.getElementById(
        "balloonInstallmentNumber"
      ).value;
    }
    if (document.getElementById("lastRepaymentDate")) {
      const lastRepaymentDate =
        document.getElementById("lastRepaymentDate").value;
    }
    // if (document.getElementById("legalForm")) {
    //   const legalForm = document.getElementById("legalForm").value;
    // }

    // console.log(
    //   {
    //     facility_number: quotationNumber,
    //     interest_rate: interestRate,
    //     facility_amount: facilityAmount,
    //     principal_moratorium: moratoriumPeriod,
    //     interest_moratorium: moratoriumInterest,
    //     loan_tenor_in_months: tenorInMonths,
    //     effective_date: effective_date,
    //     interest_type: interestType,
    //     principal_repayment_frequency: principalRepaymentFrequency,
    //     principal_repayment_count: principalRepaymentCount,
    //     schedule_start_date: effectiveDate,
    //     processing_fees: processingFees,
    //     last_working_day_of_the_month: lastWorkingDay,
    //     interest_repayment_frequency: interestRepaymentFrequency,
    //     interest_repayment_count: interestRepaymentCount,
    //     ballon_installment_to_be_applied: balloonInstallment,
    //     ballon_on_installment_number: balloonInstallmentNumber,
    //     first_principal_repay_date: firstRepaymentDate,
    //     last_repayment_date: lastRepaymentDate,
    //     legal_form: legalForm,
    //     currency: selectedCurrency,
    //     exempt_month: exemptMonth,
    //     net_monthly_income: netMonthlyIncomeSalary,
    //   },
    //   "cool things.."
    // );

    if (
      interestRate === "" ||
      facilityAmount === "" ||
      tenorInMonths === "" ||
      effectiveDate === "" ||
      interestType === "" ||
      principalRepaymentFrequency === "" ||
      // principalRepaymentCount === "" ||
      effectiveDate === "" ||
      // processingFees === "" ||
      interestRepaymentFrequency === "" ||
      // interestRepaymentCount === "" ||
      // firstRepaymentDate === "" ||
      // lastRepaymentDate === "" ||
      // legalForm === "" ||
      selectedCurrency === ""
    ) {
      Swal.fire({
        icon: "info",
        title: "All Fields Are Required",
        html: 'Please fill all required fields with <span style="color: red; font-weight: bold;">asterisk (*)</span>',
      }).then((result) => {
        // Do something here..
        // document.getElementById("postBTN").disabled = false;
      });
    } else {
      setLoad(true);
      // console.log(
      //   {
      //     f_no_v: quotationNumber,
      //     int_rate_v: interestRate * tenorInMonths,
      //     fac_amount_v: facilityAmount.replaceAll(",", ""),
      //     primora_v: moratoriumPeriod,
      //     intmora_v: withInterest,
      //     loan_tenor_v: parseFloat(tenorInMonths),
      //     eff_date_v: effectiveDate ? formatDate(effectiveDate) : "",
      //     int_type_v: interestType,
      //     rep_plan_v: principalRepaymentFrequency,
      //     rep_cnt_v: principalRepaymentCount,
      //     date_st_v: effectiveDate ? formatDate(effectiveDate) : "",
      //     proc_fees_v: processingFees,
      //     last_day_v: lastWorkingDay,
      //     rep_plan_i: interestRepaymentFrequency,
      //     i_rep_cnt_v: interestRepaymentCount,
      //     ballon_v: "Y",
      //     ballon_install_v: balloonInstallment,
      //     first_prinrepay_date: "",
      //     last_repay_date: "",
      //     legal_form_v: legalForm,
      //     currency_v: selectedCurrency,
      //     exempt_month_v: exemptMonth,
      //     netMonthSal_v: netMonthlyIncomeSalary?.replaceAll(",", ""),
      //   },
      //   "inputttt"
      // );
      await axios
        .post(
          API_SERVER + "/api/lending-quotation",
          {
            f_no_v: quotationNumber,
            int_rate_v: interestRate * tenorInMonths,
            fac_amount_v: facilityAmount.replaceAll(",", ""),
            primora_v: moratoriumPeriod,
            intmora_v: withInterest,
            loan_tenor_v: parseFloat(tenorInMonths),
            eff_date_v: effectiveDate ? formatDate(effectiveDate) : "",
            int_type_v: interestType,
            rep_plan_v: principalRepaymentFrequency,
            rep_cnt_v: principalRepaymentCount,
            date_st_v: effectiveDate ? formatDate(effectiveDate) : "",
            proc_fees_v: processingFees,
            last_day_v: lastWorkingDay,
            rep_plan_i: interestRepaymentFrequency,
            i_rep_cnt_v: interestRepaymentCount,
            ballon_v: "Y",
            ballon_install_v: parseInt(balloonInstallment),
            first_prinrepay_date: "",
            last_repay_date: "",
            legal_form_v: legalForm,
            currency_v: selectedCurrency,
            exempt_month_v: exemptMonth,
            netMonthSal_v: netMonthlyIncomeSalary?.replaceAll(",", ""),
          },
          { headers }
        )
        .then(function (response) {
          loanScheduleEnquiry();
          if (netMonthlyIncomeSlashSalary) {
            getExtraLoanInfo();
          }
          // console.log(response);

          // console.log(response.data[0].responseCode);

          // if (response.data.responseCode === "000") {
          //   swal({
          //     icon: "success",
          //     text: response.data.responseMessage,
          //     title: "",
          //     button: false,

          //     timer: 1000,
          //   }).then((result) => {
          //     // Do something here..
          //     // document.getElementById("postBTN").disabled = false;

          //     loanScheduleEnquiry();
          //     if (netMonthlyIncomeSlashSalary) {
          //       getExtraLoanInfo();
          //     }
          //     // setLoad(false);
          //   });
          // }

          async function loanScheduleEnquiry() {
            // setLoad(true);
            await axios
              .post(
                API_SERVER + "/api/loan-schedule-enquiry",
                {
                  facility_number: quotationNumber,
                },
                { headers }
              )
              .then(function (response) {
                setLoad(false);
                // let data = response;
                // console.log(response.data.responseMessage);

                // console.log(quotationNumber, "quotationNumber");

                let resp = response.data.responseMessage;

                let details = [];
                let principalSum = 0;
                let interestSum = 0;
                let paymentSum = 0;

                for (let i = 0; i < resp.length; i++) {
                  const repay_seq_no = resp[i].repay_seq_no;
                  const date_due = resp[i].date_due;
                  const principal = resp[i].principal;
                  const interest = resp[i].interest;
                  const monthp = resp[i].monthp;

                  const parsedPrincipal = parseFloat(principal);
                  const parsedInterest = parseFloat(interest);
                  const parsedMonthp = parseFloat(monthp);

                  details.push([
                    <div style={{ textAlign: "center" }}>{repay_seq_no}</div>,
                    <div style={{ textAlign: "center" }}>
                      {formatDate(date_due)}
                    </div>,
                    <div className="font-bold" style={{ textAlign: "right" }}>
                      {formatNumber(parsedPrincipal)}
                    </div>,
                    <div className="font-bold" style={{ textAlign: "right" }}>
                      {formatNumber(parsedInterest)}
                    </div>,
                    <div className="font-bold" style={{ textAlign: "right" }}>
                      {formatNumber(parsedMonthp)}
                    </div>,
                  ]);

                  principalSum += parsedPrincipal;
                  interestSum += parsedInterest;
                  paymentSum += parsedMonthp;
                }

                // Empty Row
                details.push([]);

                // Add the total sum row
                const totalRow = [
                  "",
                  <div className="font-bold" style={{ textAlign: "right" }}>
                    Total :
                  </div>,
                  <div className="font-bold" style={{ textAlign: "right" }}>
                    {formatNumber(principalSum)}
                  </div>,
                  <div className="font-bold" style={{ textAlign: "right" }}>
                    {formatNumber(interestSum)}
                  </div>,
                  <div className="font-bold" style={{ textAlign: "right" }}>
                    {formatNumber(paymentSum)}
                  </div>,
                ];
                details.push(totalRow);

                setData(details);
              });
          }

          // Get DSR
          async function getExtraLoanInfo() {
            let resp = await axios
              .post(
                API_SERVER + "/api/get-extra-loan-info",
                {
                  facility_number: quotationNumber,
                  net_monthly_salary: netMonthlyIncomeSlashSalary?.replaceAll(
                    ",",
                    ""
                  ),
                },
                { headers }
              )
              .then(function (response) {
                // console.log
                if (response) {
                  let resp1 = response.data.responseMessage;
                  // console.log(response, "am dey here some..");
                  setDebtServiceRatio(formatNumber(parseFloat(resp1[0]?.dsr)));
                  setFirstRepaymentDate(
                    response.data.responseMessage[0]?.first_principal_repay_date
                  );
                  setLastRepaymentDate(
                    response.data.responseMessage[0]?.last_repay_date
                  );
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div style={{ zoom: "0.9", marginBottom: "100px" }}>
      <div style={{ padding: "20px" }}>
        <ActionButtons
          displayFetch={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayRefresh={"none"}
          displayReject={"none"}
          displayView={"none"}
          onOkClick={postLoanScheduleEnquiry}
          onNewClick={handleClear}
          onExitClick={handleExitClick}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              padding: "5px",
              border: "2px solid #d6d7d9",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "5px",
              // width: "23%",
              // backgroundColor: "#f6fbff",
            }}
          >
            <div>
              <InputField
                label={"Quotation Number"}
                labelWidth={"38%"}
                id="quotationNumber"
                value={quotationNumber}
                textAlign={"center"}
                className={"font-bold"}
                disabled
              />
            </div>
          </div>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "2px solid #d6d7d9",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          {/* <div style={{ borderBottom: "0.5px solid grey" }}>
            <h6 style={{ margin: "10px" }}>Applicant Details</h6>
          </div> */}
          {/* <div>
            <HeaderComponent title={"Applicant Details"} />
          </div> */}
          <div style={{ marginTop: "", display: "flex" }}>
            <div style={{ flex: 0.37 }}>
              <InputField
                label={"Applicant Name"}
                labelWidth={"30%"}
                id="applicantName"
                onChange={handleApplicantNameChange}
                autoComplete={"off"}
                inputWidth={"60%"}
                value={applicantName?.toUpperCase()}
                onKeyPress={(e) => {
                  // console.log("object")
                  if (e.key === "Enter") {
                    if (document.getElementById("netMonthlyIncomeSalary")) {
                      document
                        .getElementById("netMonthlyIncomeSalary")
                        ?.focus();
                    }
                  }
                }}
              />
            </div>
            <div style={{ flex: 0.32 }}>
              <InputField
                label={"Net Monthly Income/Salary"}
                id="netMonthlyIncomeSalary"
                onChange={handleNetMonthlyIncomeSalaryChange}
                labelWidth={"50%"}
                autoComplete={"off"}
                className={"font-bold"}
                value={netMonthlyIncomeSlashSalary}
                inputWidth={"40%"}
                textAlign={"right"}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setNetMonthlyIncomeSlashSalary(
                      formatNumber(parseFloat(e.target.value))
                    );
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(
                      2,
                      "0"
                    );
                    const day = String(currentDate.getDate()).padStart(2, "0");
                    const formattedDate = `${year}-${month}-${day}`;
                    setEffectiveDate(
                      formatDatee(
                        JSON.parse(localStorage.getItem("userInfo")).postingDate
                      )
                    );
                    // setEffectiveDate("2023-06-14");
                    // console.log(effectiveDate, "effffff");
                    document.getElementById("loanProduct").focus();
                  }
                }}
              />
            </div>
            <div style={{ flex: 0.3 }}>
              <InputField
                value={debtServiceRatio}
                id="debtServiceRatio"
                label={"Debt Service Ratio (DSR)"}
                labelWidth={"50%"}
                disabled
                color={"red"}
                inputColor={"red"}
                className={"font-bold"}
                textAlign={"center"}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <ButtonComponent
                label="Print"
                buttonWidth={"90px"}
                buttonIcon={<AiFillPrinter size={20} />}
                buttonHeight={"35px"}
                // buttonBackgroundColor={"#c4549c"}
                buttonBackgroundColor={"#0063d1"}
                onClick={() => {
                  setLoanScheduleModal(true);
                }}
              />
            </div>
          </div>
        </div>
        <br />
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              flex: 0.55,
              padding: "5px",
              border: "2px solid #d6d7d9",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            <div>
              <HeaderComponent title={"Loan Details"} />
            </div>
            <div>
              <InputField
                type={"date"}
                label={"Effective Date"}
                labelWidth={"30%"}
                inputWidth={"23%"}
                required
                id="effectiveDate"
                onChange={handleEffectiveDateChange}
                value={effectiveDate}
              />
            </div>
            <div>
              <ListOfValue
                label={"Loan Product"}
                onChange={handleLoanProductChange}
                lovdata={allLoanProducts}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required
                id="loanProduct"
                value={loanProduct}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("currency");
                    input.focus();
                  }
                }}
              />
            </div>
            <div>
              <SelectField
                label={"Currency"}
                labelWidth={"30%"}
                inputWidth={"23%"}
                onChange={handleCurrencyChange}
                required
                lovdata={currency}
                id="currency"
                className="focusCurr"
                value={selectedCurrency}
                // onChange={(e) => setCurrency(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("facilityAmount");
                    input.focus();
                  }
                }}
              />
            </div>
            <div style={{ marginTop: "5px" }}>
              <InputField
                label={"Facility Amount"}
                labelWidth={"30%"}
                inputWidth={"23%"}
                className={"font-bold"}
                required
                autoComplete={"off"}
                onChange={handleFacilityNumberChange}
                onBlur={(e) => {
                  RequestAmountBlur(e);
                }}
                onFocus={(e) => {
                  setFacilityNumber(facilityNumber?.replaceAll(",", ""));
                }}
                value={facilityNumber}
                id="facilityAmount"
                textAlign={"right"}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // setFacilityNumber(formatNumber(parseFloat(e.target.value)));
                    // setInterestRate("1.66666667");
                    RequestAmountBlur(e);

                    axios
                      .post(
                        API_SERVER + "/api/get-interest-charges",
                        {
                          legal_form: loanProduct ? loanProduct : "",
                          currency: selectedCurrency ? selectedCurrency : "",
                          amt: e.target.value,
                        },
                        {
                          headers,
                        }
                      )
                      .then(function (response) {
                        if (response.data[0]?.base_rate && tenorInMonths) {
                          setInterestRate(
                            parseFloat(
                              response.data[0]?.base_rate / tenorInMonths
                            ).toFixed(4)
                          );
                          setIntRate(
                            parseFloat(
                              response.data[0]?.base_rate / tenorInMonths
                            )
                          );
                        }
                      });

                    document.getElementById("facilityAmount").blur();
                  }
                }}
              />
            </div>
            {/* <div style={{ display: "flex" }}>
              <div style={{ flex: 0.33, marginTop: "5px", marginRight: "4px" }}>
                <Label
                  required
                  label={"Interest Rate P.M / P.A"}
                  fontSize={"85%"}
                />
              </div>
              <div style={{ flex: 0.18, marginTop: "" }}>
                <InputField
                  inputWidth={"98%"}
                  onChange={(e) => {
                    setInterestRate(e.target.value);
                  }}
                />
              </div>
              <div style={{ flex: 0.2, marginTop: "" }}>
                <InputField
                  inputWidth={"90%"}
                  onChange={(e) => {
                    setInterestRate(e.target.value);
                  }}
                />
              </div>
            </div> */}
            <div
              style={{
                display: "flex",
                marginTop: "-14px",
                marginBottom: "-16px",
              }}
            >
              <div style={{ marginBottom: "5px", flex: 0.466 }}>
                <InputField
                  label={"Interest Rate P.M"}
                  labelWidth={"73%"}
                  inputWidth={"29%"}
                  className={"font-bold"}
                  required
                  onChange={handleInterestRateChange}
                  id="interestRate"
                  textAlign={"right"}
                  value={interestRate}
                />
              </div>
              <div
                style={{
                  flex: 0.4,
                  marginLeft: "-10px",
                  marginTop: "17px",
                  color: "red",
                }}
              >
                %
              </div>
            </div>
            <div style={{ marginBottom: "5px" }}>
              <InputField
                label={"Tenor (In Months)"}
                labelWidth={"30%"}
                inputWidth={"12%"}
                required
                onChange={handleTenorInMonthsChange}
                id="tenorInMonths"
                value={tenorInMonths}
                textAlign={"center"}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setPrincipalRepaymentCount(tenorInMonths);
                    setInterestRepaymentCount(tenorInMonths);
                  }
                }}
                onBlur={(e) => {
                  setPrincipalRepaymentCount(tenorInMonths);
                  setInterestRepaymentCount(tenorInMonths);
                }}
              />
            </div>
            <div>
              <SelectField
                label={"Apply Exempt Months"}
                labelWidth={"30%"}
                inputWidth={"12%"}
                lovdata={[
                  { label: "Yes", value: "Y" },
                  { label: "No", value: "N" },
                ]}
                id="applyExemptMonths"
                onChange={handleChangeExemptMonths}
                value={exemptMonth}
                // onChange={(value) => setExemptMonth(value)}
              />
            </div>
            <div>
              <ListOfValue
                label={"Interest Type"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required
                lovdata={allInterestType}
                id="interestType"
                onChange={handleInterestType}
                value={interestType}
              />
            </div>
            <div>
              <ListOfValue
                label={"Principal Repayment Frequency"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required
                onChange={handlePrincipalRepaymentFrequency}
                lovdata={allPrincipalRepaymentFrequency}
                id="principalRepaymentFrequency"
                value={principalRepaymentFrequency}
                // onChange={(e) => setPrincipalRepaymentFrequency(e)}
              />
            </div>
            <div>
              <ListOfValue
                label={"Interest Repayment Frequency"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required
                disabled
                value={interestRepaymentFrequency}
                onChange={handleInterestRepaymentFrequency}
                lovdata={allInterestRepaymentFrequency}
                id="interestRepaymentFrequency"
                // onChange={(value) => setInterestRepaymentFrequency(value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                marginBottom: "-15px",
                marginTop: "-17px",
              }}
            >
              <div
                style={{
                  flex: 0.294,
                  marginTop: "15px",
                  // marginLeft: "1%",
                  // background: "red",
                }}
              >
                <div style={{ marginLeft: "10%", textAlign: "right" }}>
                  <Label
                    label={"Principal/Interest Repay. Count"}
                    labelWidth={"100%"}
                    fontSize={"85%"}
                  />
                </div>
              </div>
              <div style={{ flex: 0.17, marginTop: "", marginLeft: "-14px" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  onChange={(e) => setPrincipalRepaymentCount(e.target.value)}
                  id="principalRepaymentCount"
                  value={principalRepaymentCount}
                  textAlign={"center"}
                />
              </div>
              <div style={{ flex: 0.2, marginLeft: "-20px" }}>
                <InputField
                  inputWidth={"60%"}
                  disabled
                  onChange={(e) => setInterestRepaymentCount(e.target.value)}
                  id="interestRepaymentCount"
                  value={interestRepaymentCount}
                  textAlign={"center"}
                />
              </div>
            </div>
            <div>
              <InputField
                label={"Moratorium Period"}
                labelWidth={"30%"}
                inputWidth={"12%"}
                textAlign={"center"}
                onChange={(e) => setMoratorium(e.target.value)}
                id="moratoriumPeriod"
                value={moratoriumPeriod}
                type={"number"}
              />
            </div>
            <div>
              <SelectField
                label={"With Interest"}
                labelWidth={"30%"}
                inputWidth={"12%"}
                lovdata={[
                  { label: "Yes", value: "Y" },
                  { label: "No", value: "N" },
                ]}
                onChange={handleChangeWithInterest}
                id="moratoriumInterest"
                value={withInterest}
              />
            </div>
            <div>
              <SelectField
                label={"Last Working Day"}
                labelWidth={"30%"}
                inputWidth={"12%"}
                lovdata={[
                  { label: "Yes", value: "Y" },
                  { label: "No", value: "N" },
                ]}
                onChange={handleChangeLastWorkingDay}
                id="lastWorkingDay"
                value={lastWorkingDay}
              />
            </div>
            <div>
              <InputField
                label={"Balloon Installment"}
                labelWidth={"30%"}
                inputWidth={"12%"}
                textAlign={"center"}
                onChange={(e) => setBalloonInstallment(e.target.value)}
                id="balloonInstallment"
                value={balloonInstallment}
                type={"number"}
                autoComplete={"off"}
              />
            </div>
            <div>
              <InputField
                label={"First Repayment Date"}
                labelWidth={"30%"}
                inputWidth={"23%"}
                // onChange={(e) => setFirstRepaymentDate(e.target.value)}
                disabled
                textAlign={"center"}
                id="firstRepaymentDate"
                value={firstRepaymentDate}
              />
            </div>
            <div>
              <InputField
                label={"Expiry Date"}
                labelWidth={"30%"}
                // onChange={(e) => setExpiryDate(e.target.value)}
                inputWidth={"23%"}
                disabled
                textAlign={"center"}
                id="expiryDate"
                value={lastRepaymentDate}
              />
            </div>
          </div>
          <div
            style={{
              flex: 0.45,
              padding: "5px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            id="datadata"
          >
            <div>
              <HeaderComponent
                title={"Loan Quotation Repayment Schedule"}
                backgroundColor={"#AFE1AF7A"}
              />
            </div>
            {/* <DataTable
              print={true}
              textAlign={"center"}
              rowsPerPage={15}
              columns={[
                "Seq Number",
                "Due Date",
                "Principal",
                "Interest",
                "Payment",
              ]}
              data={data}
            /> */}
            <CustomTable
              rowsPerPage={20}
              headers={[
                "Seq No",
                "Due Date",
                "Principal",
                "Interest",
                "Payment",
              ]}
              style={{ headerAlignRight: [3, 4, 5] }}
              data={data}
              loading={{
                status: load,
                message: "INF - GENERATING SCHEDULE ...",
              }}
            />
          </div>
          <Modal
            opened={loanScheduleModal}
            size="70%"
            onClose={() => setLoanScheduleModal(false)}
            trapFocus="false"
            padding={"10px"}
            withCloseButton={false}
            style={{ zoom: "0.85" }}
          >
            <div>
              <HeaderComponent title="LOAN SCHEDULE" />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  border: "2px solid #d6d7d9",
                  borderRadius: "5px",
                }}
              >
                <div style={{}}>
                  <ButtonComponent
                    label={"Close"}
                    buttonIcon={<IoExitOutline size={20} />}
                    buttonWidth={"90px"}
                    buttonHeight={"35px"}
                    buttonBackgroundColor={"red"}
                    onClick={() => {
                      setLoanScheduleModal(false);
                    }}
                  />
                </div>
                <div style={{}}>
                  <ButtonComponent
                    label="Print Loan Schedule"
                    buttonWidth={"190px"}
                    buttonIcon={<AiFillPrinter size={20} />}
                    buttonHeight={"35px"}
                    buttonBackgroundColor={"#0063d1"}
                    onClick={handlePrint}
                  />
                </div>
                {/* <div></div> */}
              </div>
              <br />
              <div ref={componentRef} style={{ padding: "50px" }}>
                <div
                  className="space-y-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    marginTop: "-40px",
                    textAlign: "center",
                  }}
                >
                  <div></div>
                  <div className="space-y-2 mr-4">
                    <br />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={coop}
                        alt="Coop Tech"
                        style={{ height: "80px" }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "800",
                      }}
                    >
                      COOPTECH
                    </div>

                    <div
                      style={{
                        fontSize: "15px",
                        textDecoration: "capitalize",
                      }}
                    >
                      Branch : {branch}
                    </div>

                    {/* <div style={{ fontSize: "15px" }}>
                      Run Date:{" "}
                      {formatDate(currentDate) ===
                      "Invalid Date-INVALID DATE-Invalid Date"
                        ? ""
                        : formatDate(currentDate)}
                    </div> */}

                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      LOAN QUOTATION REPAYMENT SCHEDULE
                    </div>
                  </div>
                </div>
                <div
                  className="printii"
                  style={{
                    display: "flex",
                    padding: "10px",
                    border: "2px solid #d6d7d9",
                    borderRadius: "5px",
                  }}
                >
                  <div style={{ flex: 0.5 }}>
                    <div>
                      <InputField
                        label={"Applicant Name"}
                        value={applicantName?.toUpperCase()}
                        labelWidth={"35%"}
                        inputWidth={"40%"}
                        margin={"5px"}
                        textAlign={"right"}
                        disabled
                      />
                    </div>
                    {/* <div>
                      <InputField
                        label={"Facility Amount"}
                        value={facilityNumber}
                        labelWidth={"35%"}
                        inputWidth={"40%"}
                        margin={"5px"}
                        textAlign={"right"}
                        disabled
                      />
                    </div> */}
                    <div>
                      <InputField
                        label={"Interest Rate P.M"}
                        value={interestRate}
                        labelWidth={"35%"}
                        inputWidth={"40%"}
                        margin={"5px"}
                        textAlign={"right"}
                        disabled
                      />
                    </div>
                    <div>
                      <InputField
                        label={"Repayment Type"}
                        value={
                          interestType === "02" ? "REDUCING BALANCE" : "FLAT"
                        }
                        labelWidth={"35%"}
                        inputWidth={"40%"}
                        margin={"5px"}
                        textAlign={"right"}
                        disabled
                      />
                    </div>
                  </div>
                  <div style={{ flex: "0.5" }}>
                    <div>
                      <InputField
                        label={"DSR"}
                        value={debtServiceRatio}
                        labelWidth={"45%"}
                        inputWidth={"40%"}
                        margin={"5px"}
                        textAlign={"right"}
                        disabled
                      />
                    </div>
                    {/* <div>
                      <InputField
                        label={"Number of Repayments"}
                        value={tenorInMonths}
                        labelWidth={"45%"}
                        inputWidth={"40%"}
                        margin={"5px"}
                        textAlign={"right"}
                        disabled
                      />
                    </div> */}
                    <div>
                      <InputField
                        label={"First Repayment Date"}
                        value={firstRepaymentDate}
                        labelWidth={"45%"}
                        inputWidth={"40%"}
                        margin={"5px"}
                        textAlign={"right"}
                        disabled
                      />
                    </div>
                    <div>
                      <InputField
                        label={"Expiry Date"}
                        value={lastRepaymentDate}
                        labelWidth={"45%"}
                        inputWidth={"40%"}
                        margin={"5px"}
                        textAlign={"right"}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div style={{ zoom: 0.9 }}>
                  <CustomTable
                    headers={[
                      "Seq No",
                      "Due Date",
                      "Principal",
                      "Interest",
                      "Payment",
                    ]}
                    style={{ headerAlignRight: [3, 4, 5] }}
                    data={data}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default LoanQuotation;
