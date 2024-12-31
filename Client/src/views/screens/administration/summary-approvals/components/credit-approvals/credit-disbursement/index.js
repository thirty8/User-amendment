import React, { useState, useEffect } from "react";
import InputField from "./components/fields/InputField";
import ListOfValue from "./components/fields/ListOfValue";
import ButtonComponent from "./components/button/ButtonComponent";
import DataTable from "./components/data-table/DataTable";
import HeaderComponent from "./components/header/HeaderComponent";
import ButtonType from "./components/button/ButtonType";
import { Checkbox } from "@mantine/core";
import TextAreaField from "./components/fields/TextArea";
import SelectField from "./components/fields/SelectField";
// import ArrowStepper from "../components/arrow-stepper/arrow-stepper";
import { MDBIcon } from "mdb-react-ui-kit";
import { API_SERVER } from "../../../../../../../config/constant";
import axios from "axios";
import ActionButtons from "../../../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "./components/tab-component/tab-component";
import swal from "sweetalert";
import Swal from "sweetalert2";
import GeneralApp from "./components/credit-approval/GeneralApp";
import TranchesApp from "./components/credit-approval/TrancheApp";
import FinancialsApp from "./components/credit-approval/FinancialsApp";
import EmploymentApp from "./components/credit-approval/EmploymentApp";
import GuarantorsApp from "./components/credit-approval/GuarantorsApp";
import DocumentApp from "./components/credit-approval/DocumentApp";
import CollateralApp from "./components/credit-approval/CollateralApp";
import BureauApp from "./components/credit-approval/BureauApp";
import { DEFAULT_THEME, LoadingOverlay, Loader } from "@mantine/core";
import { FiX } from "react-icons/fi";
import { Modal } from "@mantine/core";
import Header from "../../../../../../../components/others/Header/Header";
import { MdOutlineFreeCancellation, MdLibraryAddCheck } from "react-icons/md";
import CheckApp from "../../../../../lending/components/check/CheckApp";
import { IoMdCloseCircle } from "react-icons/io";
import { BsFillPatchCheckFill } from "react-icons/bs/index.esm";
import { Spin } from "antd";
import { FaUserCircle } from "react-icons/fa";

const CreditApproval = ({
  batchNo,
  accountSourceBranch,
  setCloseModal,
  setApproveChanged,
  setApproved,
}) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [lovFacilityTypeCategory, setLovFacilityTypeCategory] = useState([]);
  const [facilityTypeCategory, setFacilityTypeCategory] = useState();

  const [lovLoanProducts, setLovLoanProducts] = useState([]);
  const [loanProduct, setLoanProduct] = useState();

  const [lovInterestType, setLovInterestType] = useState([]);
  const [interestType, setInterestType] = useState();

  const [interestRate, setInterestRate] = useState();
  const [interestRateAnnum, setInterestRateAnnum] = useState();

  const [effectiveInterestRate, setEffectiveInterestRate] = useState();
  const [effectiveInterestRateAnnum, setEffectiveInterestRateAnnum] =
    useState();

  const [lovPrincipalRepayFreq, setLovPrincipalRepayFreq] = useState([]);
  const [principalRepaymentFrequency, setPrincipalRepaymentFrequency] =
    useState();

  const [lovInterestRepayFreq, setLovInterestRepayFreq] = useState([]);
  const [interestRepaymentFrequency, setInterestRepaymentFrequency] =
    useState();

  const [principalRepaymentCount, setPrincipalRepaymentCount] = useState();
  const [interestRepaymentCount, setInterestRepaymentCount] = useState();

  const [exemptMonth, setExemptMonth] = useState("");
  const [lastWorkingDay, setLastWorkingDay] = useState();

  const [lovIntroSource, setLovIntroSource] = useState([]);
  const [introSource, setIntroSource] = useState();

  const [lovDealerCode, setLovDealerCode] = useState([]);
  const [dealerCode, setDealerCode] = useState();

  const [lovPurpose, setLovPurpose] = useState([]);
  const [purpose, setPurpose] = useState();

  const [otherPurpose, setOtherPurpose] = useState("");

  const [lovSector, setLovSector] = useState([]);
  // const [sector, setSector] = useState([]);

  const [lovSubSector, setLovSubSector] = useState([]);
  const [subSector, setSubSector] = useState();

  const [lovStaff, setLovStaff] = useState([]);
  const [staff, setStaff] = useState();

  const [requestedAmount, setRequestedAmount] = useState();

  const [count, setCount] = useState();
  const [tenorInMonths, setTenorInMonths] = useState();

  const [lienPercencate, setLienPercentage] = useState();
  const [lienAmount, setLienAmount] = useState();

  const [insurancePercentage, setInsurancePercentage] = useState();
  const [insuranceAmount, setInsuranceAmount] = useState();

  const [processingFeePercentage, setProcessingFeePercentage] = useState();
  const [processingFeeAmount, setProcessingFeeAmount] = useState();

  const [moratoriumPeriod, setMoratorium] = useState("");
  const [withInterest, setWithInterest] = useState("");
  const [loanScheduleModal, setLoanScheduleModal] = useState();

  const [quotationNumber, setQuotationNumber] = useState();
  const [data, setData] = useState([]);

  const [responseData, setResponseData] = useState();
  const [error, setError] = useState();

  const [selectedOption, setSelectedOption] = useState("");
  const [disableInput, setDisableInput] = useState();

  const [facilityType, setFacilityType] = useState("");
  // const [facType, setFacType] = useState("");
  const [lovFacilityType, setLovFacilityType] = useState([]);

  const [lovCustomerType, setLovCustomerType] = useState([]);
  const [customerType, setCustomerType] = useState("");

  const [lovFacilityServiceAccount, setLovFacilityServiceAccount] = useState(
    []
  );
  const [facilityServiceAccount, setFacilityServiceAccount] = useState();

  const [accountName, setAccountName] = useState("");

  const [allAccount, setAllAccount] = useState();

  const [applicationNumber, setApplicationNumber] = useState();

  const [currency, setCurrency] = useState();

  const [category, setCategory] = useState();

  const [pepStatus, setPepStatus] = useState();

  const [riskStatus, setRiskStatus] = useState();

  const [withInt, setWithInt] = useState();
  const [currencyCode, setCurrencyCode] = useState("");
  const [customer_Number, setCustomer_Number] = useState("");
  const [typeOfAccount, setTypeOfAccount] = useState("");
  const [sector, setSector] = useState([]);
  const [sectorCode, setSectorCode] = useState();
  const [subSectorCode, setSubSectorCode] = useState();
  const [lienAmt, setLienAmt] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  ////////////////////////////////////////////////////////

  const [facType, setFacType] = useState("");
  const [legal, setLegal] = useState("");
  const [cur, setCur] = useState("");
  const [intType, setIntType] = useState("");
  const [intRate, setIntRate] = useState("");
  const [intPlan, setIntPlan] = useState("");
  const [prinPlan, setPrinPlan] = useState("");
  const [per, setPer] = useState("");
  const [pur, setPur] = useState("");
  const [custNo, setCustNo] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [benAcct, setBenAcct] = useState("");
  const [lien, setLien] = useState("");
  const [reason, setReason] = useState("");
  const [amt, setAmt] = useState("");
  const [branch, setBranch] = useState("");
  const [sourceFunds, setSourceFunds] = useState("");
  const [rejectReasonModal, setRejectReasonModal] = useState(false);

  const [auditModal, setAuditModal] = useState();

  const [amtCheck, setAmtCheck] = useState(false);
  const [rateCheck, setRateCheck] = useState(false);
  const [tenorCheck, setTenorCheck] = useState(false);
  const [documentCheck, setDocumentCheck] = useState(false);
  const [intTypeCheck, setIntTypeCheck] = useState(false);
  const [burrowerCheck, setBurrowerCheck] = useState(false);
  const [guarantorCheck, setGuarantorCheck] = useState(false);
  const [financialCheck, setFinancialCheck] = useState(false);
  const [collateralCheck, setCollateralCheck] = useState(false);
  const [acctStatsCheck, setAcctStatsCheck] = useState(false);

  const handleSelectChange = (value) => {
    const selectedValue = value;
    setSelectedOption(selectedValue);
    setFacilityType(selectedValue);
    // Disable input fields based on selected option
    // setDisableInput(selectedValue === "disabled");
  };
  // console.log(currencyCode, "hkjkjkjlkj");

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const NumberWithoutCommas = (number) => {
    const formattedNumber = String(number).replace(/,/g, "");
    return Number(formattedNumber);
  };

  const uncheck = () => {
    setAmtCheck(false);
    setRateCheck(false);
    setTenorCheck(false);
    setDocumentCheck(false);
    setIntTypeCheck(false);
    setBurrowerCheck(false);
    setGuarantorCheck(false);
    setFinancialCheck(false);
    setCollateralCheck(false);
    setAcctStatsCheck(false);
  };

  const rejectLoan = () => {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var ip = localStorage.getItem("ipAddress");
    var hostname = userInfo?.id;
    var branch = userInfo?.branchCode;
    setLoadingReject(true);
    // console.log(
    //   {
    //     source_v: "1A",
    //     app_flag_v: "01",
    //     loan_app_no_v: loanApplicationNo,
    //     username_v: hostname,
    //     decide1_v: "99",
    //     hostname_v: hostname,
    //     cancel_reason_v: "testtttt",
    //     item_code_v: hostname,
    //     loan_disb_acct_v: facilityAccount,
    //     branch_v: branch,
    //     currency_v: cur,
    //     request_amt_v: parseFloat(amt),
    //     frmcode_v: "AHZ1",
    //     relation_officer_v: "002",
    //     prog_v: "React",
    //   },
    //   "wayyyyyyyyyyyyyyyyy"
    // );
    axios
      .post(
        API_SERVER + "/api/lending-approval-reject",
        {
          source_v: "07",
          app_flag_v: "1A",
          loan_app_no_v: applicationNumber,
          username_v: branch,
          decide1_v: "99",
          hostname_v: hostname,
          cancel_reason_v: reason,
          item_code_v: "CDS",
          loan_disb_acct_v: facilityServiceAccount,
          branch_v: branch,
          currency_v: cur,
          request_amt_v: parseFloat(amt),
          frmcode_v: "AHAO",
          relation_officer_v: "",
          prog_v: "React",
        },
        { headers: headers }
      )
      .then(function (response) {
        setLoadingReject(false);
        console.log(response.data, "CREATE");
        console.log(response.data?.responseMessage?.split(" - ")[0], "JORJORR");
        if (response.data?.responseCode === "998") {
          Swal.fire(response.data?.responseMessage, "", "success").then(
            (result) => {
              setRejectReasonModal(false);
              setCloseModal(false);
            }
          );
        } else {
          Swal.fire(response.data?.responseMessage, "", "error");
        }
      })
      .catch((err) => console.log("ERRRRRR"));
  };

  const confirmApproval = () => {
    Swal.fire({
      icon: "question",
      title: "Are You Sure You Want To Approve This Transaction?",
      // text: "Click OK to confirm all details and approve",
      html: 'Click <span style="color: darkblue; font-weight: bold;">OK</span> to confirm all details to disburse loan',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setAuditModal(true);
      }
    });
  };

  function saveLoanApplication() {
    setLoadingAudit(true);
    // console.log(repay_acct, typeof repay_acct, "repay_acct");
    console.log(
      {
        repay_acct_v: facilityServiceAccount.trim(), // Repayment account number
        customer_account: facilityServiceAccount.trim(),
        legal_form_v: legal, // Product code Eg: (CUSTOMER SALARY LOAN 59)
        branch: JSON.parse(localStorage.getItem("userInfo")).branchCode, // Branch of the customer or Headoffice branch code Eg:000
        currency_v: cur, // Currency code
        repnt_period_months_v: parseFloat(tenorInMonths), // Tenor in months
        int_type: intType, // 01-FLAT,02-REDUCING BALANCE,03-AMORTIZATION METHOD,05-FLOATING RATE
        rate: parseFloat(intRate), // Interest rate
        mora: moratoriumPeriod, // moratorium
        int_mora: withInterest,
        AMT: NumberWithoutCommas(requestedAmount), // Loan Amount
        EFF_DATE: JSON.parse(localStorage.getItem("userInfo")).postingDate, // Effective date
        int_repay_plan_v: intPlan, // Interest repayment plan
        repayment_plan_v: prinPlan, // Repayment plan
        last_repay_date_v: "", // Last repayment date
        LAST_DAY_V: lastWorkingDay, // Last day of the month for repayment
        exempt_month_v: exemptMonth, // Exempted month for repayment
        sector_v: sectorCode, // Sector code
        sub_sector_v: subSectorCode, // Sub-sector code
        lienamt_v: null, // Lien amount
        username_v: JSON.parse(localStorage.getItem("userInfo")).id, // Username
        NO_OF_TRANCHES_V: null, // Number of tranches
        bank_code_v: "", // Bank code
        hostname_v: "", // Hostname
        facility_no_v: "", // Facility number
        fac_type_v: facType, // Facility type
        prime_rate_v: null, // Prime rate
        trans_details: pur, // Transaction details
        other_purpose_v: otherPurpose, // Other purpose
        documents_ref_no_v: "", // Document reference number
        staff_cat_v: "", // Staff category
        vendor_code_v: "", // Vendor code
        ballon_installment_v: null, // Balloon installment
        introductory_source_v: "", // Introductory source
        employer_code_v: "", // Employer code
        source_funds_v: "004", // Source of funds
        no_of_disb_v: null, // Number of disbursements
        agreed_amount_v: NumberWithoutCommas(requestedAmount), // Agreed amount
        dealer_code_v: "", // Dealer code
        cust_no: "",
        action_v: "D",
        typeOfAccount: "",
        loan_app_no_v: applicationNumber.trim(),
        prin_pay_count_v: parseInt(principalRepaymentCount),
        int_pay_count_v: parseInt(interestRepaymentCount),
        bnk_code_v: bankCode,
        ben_acct_v: benAcct,
        para1: "", // Parameter 1
        para2: "", // Parameter 2
        para3: "", // Parameter 3
        para4: "", // Parameter 4
        para5: "", // Parameter 5
      },
      "disbbbbbbbbbbbb"
    );
    axios
      .post(
        API_SERVER + "/api/lending-onboarding",
        {
          repay_acct_v: facilityServiceAccount.trim(), // Repayment account number
          customer_account: facilityServiceAccount.trim(),
          legal_form_v: legal, // Product code Eg: (CUSTOMER SALARY LOAN 59)
          branch: JSON.parse(localStorage.getItem("userInfo")).branchCode, // Branch of the customer or Headoffice branch code Eg:000
          currency_v: cur, // Currency code
          repnt_period_months_v: parseFloat(tenorInMonths), // Tenor in months
          int_type: intType, // 01-FLAT,02-REDUCING BALANCE,03-AMORTIZATION METHOD,05-FLOATING RATE
          rate: parseFloat(intRate), // Interest rate
          mora: moratoriumPeriod, // moratorium
          int_mora: withInterest,
          AMT: NumberWithoutCommas(requestedAmount), // Loan Amount
          EFF_DATE: JSON.parse(localStorage.getItem("userInfo")).postingDate, // Effective date
          int_repay_plan_v: intPlan, // Interest repayment plan
          repayment_plan_v: prinPlan, // Repayment plan
          last_repay_date_v: "", // Last repayment date
          LAST_DAY_V: lastWorkingDay, // Last day of the month for repayment
          exempt_month_v: "N", // Exempted month for repayment
          sector_v: sectorCode, // Sector code
          sub_sector_v: subSectorCode, // Sub-sector code
          lienamt_v: lienAmount ? NumberWithoutCommas(lienAmount) : null, // Lien amount
          username_v: JSON.parse(localStorage.getItem("userInfo")).id, // Username
          NO_OF_TRANCHES_V: null, // Number of tranches
          bank_code_v: null, // Bank code
          // hostname_v: "", // Hostname
          facility_no_v: "", // Facility number
          fac_type_v: facType, // Facility type
          prime_rate_v: null, // Prime rate
          trans_details: pur, // Transaction details
          other_purpose_v: otherPurpose, // Other purpose
          documents_ref_no_v: null, // Document reference number
          staff_cat_v: "", // Staff category
          vendor_code_v: null, // Vendor code
          ballon_installment_v: null, // Balloon installment
          introductory_source_v: introSource, // Introductory source
          employer_code_v: null, // Employer code
          source_funds_v: sourceFunds, // Source of funds
          no_of_disb_v: null, // Number of disbursements
          agreed_amount_v: NumberWithoutCommas(requestedAmount), // Agreed amount
          dealer_code_v: dealerCode, // Dealer code
          cust_no: "",
          action_v: "D",
          typeOfAccount: null,
          loan_app_no_v: applicationNumber.trim(),
          prin_pay_count_v: parseInt(principalRepaymentCount),
          int_pay_count_v: parseInt(interestRepaymentCount),
          bnk_code_v: bankCode,
          ben_acct_v: benAcct,
          para1: "", // Parameter 1
          para2: "", // Parameter 2
          para3: "", // Parameter 3
          para4: "", // Parameter 4
          para5: "", // Parameter 5
        },
        { headers: headers }
      )
      .then((response) => {
        setLoadingAudit(false);
        console.log(response.data);
        if (response.data.responseCode === "998") {
          Swal.fire({
            icon: "success",
            title: response.data.responseMessage,
          }).then((result) => {
            setCloseModal(false);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: response.data.responseMessage,
          }).then((result) => {
            // setCloseModal(false);
            console.log("err");
          });
        }
      })
      .catch((error) => {
        setLoadingAudit(false); // Hide the loader in case of an error

        console.error("Error:", error);
        // Handle error scenario
        Swal.fire({
          icon: "error",
          title: "An error occurred.",
        });
      });
  }

  // const customLoader = <Loader size="xl" />;

  // function loading() {
  //   return <LoadingOverlay loader={customLoader} visible />;
  // }
  // var loan_app_no;

  const getFees = () => {
    axios
      .post(
        API_SERVER + "/api/get-fees-fid",
        { loan_app_no: batchNo },
        { headers }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFees();
  }, []);

  const fee = data.map((i) => {
    // console.log(item, "stoff");

    return [
      <div>{i.fee_desc === "null" ? "" : i.fee_desc}</div>,
      <div className="font-bold text-center">
        {i.fee_rate != "null" ? formatNumber(parseFloat(i.fee_rate)) : ""}
      </div>,
      <div className="font-bold text-right">
        {i.fee_amount != "null" ? formatNumber(parseFloat(i.fee_amount)) : ""}
      </div>,
    ];
  });

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-origination-details",
        {
          loan_app_no: batchNo,
        },
        { headers: headers }
      )
      .then(function (response) {
        setLoading(false);
        setBranch(response.data[0]?.origin_branch_desc);
        setCurrency(response.data[0]?.currency_desc);
        setLegal(response.data[0]?.type_of_acct);
        setCustNo(response.data[0]?.customer_number);
        setBankCode(response.data[0]?.bank_code);
        setBenAcct(response.data[0]?.ben_acct);
        setPrinPlan(response.data[0]?.repayment_plan);
        setIntPlan(response.data[0]?.int_repayment_plan);
        setIntRate(response.data[0]?.eff_int_rate);
        setIntType(response.data[0]?.int_type);
        setCur(response.data[0]?.currency);
        setPer(response.data[0]?.gf_rate);
        setSector(response.data[0]?.sector_desc);
        setFacilityType(response.data[0]?.facility_type_desc);
        setFacType(response.data[0]?.facility_type);
        setSectorCode(response.data[0]?.sector);
        setPurpose(response.data[0]?.purpose_desc);
        setPur(response.data[0]?.purpose);
        setIntroSource(response.data[0]?.introductory_source);
        setApplicationNumber(response.data[0]?.loan_app_no);
        setRequestedAmount(formatNumber(+response.data[0]?.amount));
        setTenorInMonths(response.data[0]?.repnt_period_months);
        setAmt(response.data[0]?.amount);
        setLoanProduct(response.data[0]?.product_desc);
        setPrincipalRepaymentCount(response.data[0]?.prin_pay_count);
        setInterestRepaymentCount(response.data[0]?.int_pay_count);
        setFacilityServiceAccount(response.data[0]?.loan_ser_acct);
        setInterestType(response.data[0]?.int_type_desc);
        setDealerCode(response.data[0]?.dealer_code);
        setSubSector(response.data[0]?.sub_sector_desc);
        setSubSectorCode(response.data[0]?.sub_sector);
        setMoratorium(response.data[0]?.prin_morato);
        setWithInt(response.data[0]?.int_morato);
        setPrincipalRepaymentCount(response.data[0]?.prin_pay_count);
        setInterestRepaymentCount(response.data[0]?.int_pay_count);
        setLastWorkingDay(response.data[0]?.last_day);
        setExemptMonth(response.data[0]?.exempt_month);
        setFacilityType(response.data[0]?.facility_type_desc);
        setAccountName(response.data[0]?.acct_desc);
        setPrincipalRepaymentFrequency(response.data[0]?.repayment_plan_desc);
        setInterestRepaymentFrequency(response.data[0]?.frequency_desc);
        setExemptMonth(response.data[0]?.exempt_month);
        setLastWorkingDay(response.data[0]?.last_day);
        setOtherPurpose(response.data[0]?.other_purpose);
        setLienAmount(formatNumber(+response.data[0]?.lienamt));
        setLien(response.data[0]?.lienamt);
        setSourceFunds(response.data[0]?.source_funds);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const tabsData = [
    {
      value: "general",
      label: "General",
      component: (
        <GeneralApp
          selectedOption={selectedOption}
          sector={sector}
          purpose={purpose}
          introSource={introSource}
          requestedAmount={requestedAmount}
          tenorInMonths={tenorInMonths}
          loanProduct={loanProduct}
          principalRepaymentFrequency={principalRepaymentFrequency}
          interestRepaymentFrequency={interestRepaymentFrequency}
          facilityServiceAccount={facilityServiceAccount}
          interestType={interestType}
          dealerCode={dealerCode}
          subSector={subSector}
          moratoriumPeriod={moratoriumPeriod}
          withInt={withInt}
          principalRepaymentCount={principalRepaymentCount}
          interestRepaymentCount={interestRepaymentCount}
          facilityType={facType}
          exemptMonth={exemptMonth}
          lastWorkingDay={lastWorkingDay}
          lienAmount={lienAmount}
          otherPurpose={otherPurpose}
          intRate={intRate}
          per={per}
          bankCode={bankCode}
          benAcct={benAcct}
          fee={fee}
          sourceFunds={sourceFunds}
        />
      ),
    },
    // {
    //   value: "tranches",
    //   label: "Tranches",
    //   component: <TranchesApp />,
    // },
    {
      value: "financials",
      label: "Financials (Individual)",
      component: <FinancialsApp custNo={custNo} />,
    },
    {
      value: "employment",
      label: "Employment",
      component: <EmploymentApp custNo={custNo} />,
    },
    {
      value: "guarantors",
      label: "Guarantors",
      component: (
        <GuarantorsApp custNo={custNo} applicationNumber={applicationNumber} />
      ),
    },
    {
      value: "document",
      label: "Document",
      component: <DocumentApp />,
    },
    {
      value: "collateral",
      label: "Collateral",
      component: <CollateralApp />,
    },
    {
      value: "bureau",
      label: "External Credit Bureau",
      component: <BureauApp />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0].value);
  return (
    <div style={{ zoom: 0.9 }}>
      {loading && (
        <div className=" h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-90 absolute z-10">
          <div className="z-30 opacity-100  rounded-full">
            <Spin size="large" />
          </div>
        </div>
      )}
      <div style={{ padding: "10px" }}>
        <ActionButtons
          onExitClick={() => setCloseModal(false)}
          displayFetch={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayOk={"none"}
          displayNew={"none"}
          displayRefresh={"none"}
          displayView={"none"}
          onAuthoriseClick={confirmApproval}
          onRejectClick={() => {
            setRejectReasonModal(true);
          }}
        />
        <br />
        <div
          className="mt-1"
          style={{
            padding: "15px",
            border: "2px solid #dfdce6",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              fontSize: "85%",
            }}
          >
            <div style={{ display: "flex", flex: 0.4 }}>
              <div className="pr-2 pt-2">
                <FaUserCircle size={50} color="gray" />
              </div>
              <div className="p-2">
                <div
                  className="font-bold text-gray-500 text-xl"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {accountName}
                </div>
                <div className="flex">
                  <span
                    className="font-bold text-gray-500 pr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Member No :
                  </span>
                  <span className="text-gray-400">{custNo}</span>
                </div>
                <div className="flex">
                  <span
                    className="font-bold text-gray-500 pr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Facility Account :
                  </span>
                  <span className="text-gray-400">
                    {facilityServiceAccount === "null"
                      ? ""
                      : facilityServiceAccount}
                  </span>
                </div>
              </div>
            </div>
            <div className=" flex-[0.3] pt-1.5">
              <div className="flex">
                <span
                  className="font-bold text-gray-500 pr-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Branch :
                </span>
                <span className="text-gray-400">{branch}</span>
              </div>
              <div className="flex">
                <span
                  className="font-bold text-gray-500 pr-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Facility Type :
                </span>
                <span className="text-gray-400">
                  {facilityType === "null" ? "" : facilityType}
                </span>
              </div>
              <div className="flex">
                <span
                  className="font-bold text-gray-500 pr-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Currency :
                </span>
                <span className="text-gray-400">{currency}</span>
              </div>
            </div>
            <div className=" flex-[0.3] pt-1.5">
              <div></div>
              <div className="flex">
                <span
                  className="font-bold text-gray-500 pr-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Application Number :
                </span>
                <span className="text-gray-400">
                  {applicationNumber === "null" ? "" : applicationNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          style={{
            padding: "10px",
            border: "2px solid #d6d7d9",
            // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",

              background: "white",
            }}
          >
            <div style={{ flex: "0.6" }}>
              <div>
                <InputField
                  label={"Facility Type"}
                  labelWidth={"25%"}
                  inputWidth={"45%"}
                  disabled
                  value={facilityType === "null" ? "" : facilityType}
                  textAlign={"center"}
                />
              </div>
              <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Facility Service Account"}
                  labelWidth={"25%"}
                  inputWidth={"45%"}
                  disabled
                  textAlign={"center"}
                  value={
                    facilityServiceAccount === "null"
                      ? ""
                      : facilityServiceAccount
                  }
                />
              </div>
              <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Account Name"}
                  labelWidth={"25%"}
                  disabled
                  textAlign={"center"}
                  inputWidth={"45%"}
                  value={accountName === "null" ? "" : accountName}
                />
              </div>
              <div style={{}}>
                <div style={{ marginTop: "-5px" }}>
                  <InputField
                    label={"Currency"}
                    labelWidth={"25%"}
                    disabled
                    inputWidth={"45%"}
                    textAlign={"center"}
                    value={currency === "null" ? "" : currency}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "0.35",
              }}
            >
              <div
                style={{
                  padding: "5px",
                  border: "0.5px solid #d6d7d9",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "5px",
                  marginTop: "25px",
                }}
              >
                <div>
                  <InputField
                    label={"Application Number"}
                    labelWidth={"35%"}
                    value={
                      applicationNumber === "null" ? "" : applicationNumber
                    }
                    disabled
                    textAlign={"center"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <br />
        <div>
          <TabsComponent
            tabsData={tabsData}
            inactiveColor={"white"}
            activeColor={"#40c057"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div></div>
          <div style={{ display: "flex", gap: "20px" }}></div>
        </div>
      </div>
      <Modal
        opened={rejectReasonModal}
        size={"80%"}
        padding={2}
        withCloseButton={false}
        onClose={() => {
          setRejectReasonModal(false);
        }}
      >
        <div className=" p-2 space-y-4 mb-1 pb-4 h-56">
          {loadingReject && (
            <div className=" h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-90 absolute z-10">
              <div className="z-30 opacity-100  rounded-full">
                <Spin size="large" />
              </div>
            </div>
          )}
          <Header
            title="Reject Reason"
            headerShade
            closeIcon={<FiX />}
            handleClose={() => setRejectReasonModal(false)}
          />

          <TextAreaField
            label={"Comment"}
            inputheight={"80px"}
            labelWidth={"15%"}
            inputWidth={"75%"}
            cols={50}
            value={reason}
            required
            onChange={(e) => setReason(e.target.value)}
          />

          <div className="flex justify-end mr-10">
            <ButtonComponent
              label="Reject"
              buttonWidth={"90px"}
              buttonHeight={"35px"}
              buttonBackgroundColor={"#0063d1"}
              buttonIcon={<MdOutlineFreeCancellation size={20} />}
              onClick={() => {
                if (reason === "") {
                  Swal.fire({
                    icon: "info",
                    title: "INF - Enter Reason to Reject Loan",
                  }).then((result) => {});
                } else {
                  Swal.fire({
                    icon: "question",
                    title: "Are You Sure You Want To Reject This Transaction?",
                    // text: "Click OK to confirm all details and approve",
                    html: 'Click <span style="color: darkblue; font-weight: bold;">OK</span> to reject loan',
                    showCancelButton: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      rejectLoan();
                    }
                  });
                }
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        opened={auditModal}
        size={"45%"}
        padding={"10px"}
        withCloseButton={false}
        style={{ backgroundColor: "red" }}
      >
        <div style={{ zoom: 0.85 }}>
          {loadingAudit && (
            <div className=" h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-90 absolute z-10">
              <div className="z-30 opacity-100  rounded-full">
                <Spin size="large" />
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "5px",
            }}
          >
            <IoMdCloseCircle
              size={25}
              color="red"
              onClick={() => {
                uncheck();
                setAuditModal(false);
              }}
            />
          </div>
          <div style={{}} className="sticky top-0 z-50">
            <HeaderComponent
              title="Approval Check Notification"
              backgroundColor={"#0063d1"}
              color={"white"}
              icon={<MdLibraryAddCheck size={20} />}
            />
          </div>
          <div style={{ zoom: 0.9 }}>
            <div className="p-2 my-2 bg-orange-100 border-l-8 border-orange-600 rounded-r-md">
              {/* <Notification
                  className="font-bold"
                  withCloseButton={false}
                  color="orange"
                  title="You are to check all fields to approve this transaction"
                ></Notification> */}
              You are to check all fields to approve this transaction
            </div>
            <div>
              <CheckApp
                label={"Loan Amount Confirmed ?"}
                value={requestedAmount}
                getChecked={amtCheck}
                setCheckedProp={setAmtCheck}
              />
              <CheckApp
                label={"Loan Interest Rate Per Annum Confirmed ?"}
                value={intRate ? parseFloat(intRate).toFixed(2) : ""}
                getChecked={rateCheck}
                setCheckedProp={setRateCheck}
              />
              <CheckApp
                label={"Loan Tenor Confirmed ?"}
                value={tenorInMonths !== "null" ? tenorInMonths : ""}
                getChecked={tenorCheck}
                setCheckedProp={setTenorCheck}
              />
              <CheckApp
                label={"Document Received Confirmed ?"}
                // value={""}
                getChecked={documentCheck}
                setCheckedProp={setDocumentCheck}
              />
              <CheckApp
                label={"Interest Type Confirmed ?"}
                value={interestType !== "null" ? interestType : ""}
                getChecked={intTypeCheck}
                setCheckedProp={setIntTypeCheck}
              />
              <CheckApp
                label={"Burrower Details Confirmed ?"}
                getChecked={burrowerCheck}
                setCheckedProp={setBurrowerCheck}
              />
              <CheckApp
                label={"Guarantors Confirmed ?"}
                getChecked={guarantorCheck}
                setCheckedProp={setGuarantorCheck}
              />
              <CheckApp
                label={"Financials Confirmed ?"}
                getChecked={financialCheck}
                setCheckedProp={setFinancialCheck}
              />
              <CheckApp
                label={"Collaterals Confirmed ?"}
                getChecked={collateralCheck}
                setCheckedProp={setCollateralCheck}
              />
              <CheckApp
                label={"Account Statistics Confirmed ?"}
                getChecked={acctStatsCheck}
                setCheckedProp={setAcctStatsCheck}
              />
            </div>
            <br />
            <div className="flex justify-end pb-2 px-5">
              <ButtonComponent
                label={"Approve"}
                buttonIcon={<BsFillPatchCheckFill />}
                buttonHeight={"35px"}
                buttonWidth={"130px"}
                buttonBackgroundColor={
                  amtCheck === false ||
                  rateCheck === false ||
                  tenorCheck === false ||
                  documentCheck === false ||
                  intTypeCheck === false ||
                  burrowerCheck === false ||
                  guarantorCheck === false ||
                  financialCheck === false ||
                  collateralCheck === false ||
                  acctStatsCheck === false
                    ? "gray"
                    : "#42ba2c"
                }
                onClick={() => {
                  if (
                    amtCheck === false ||
                    rateCheck === false ||
                    tenorCheck === false ||
                    documentCheck === false ||
                    intTypeCheck === false ||
                    burrowerCheck === false ||
                    guarantorCheck === false ||
                    financialCheck === false ||
                    collateralCheck === false ||
                    acctStatsCheck === false
                  ) {
                    Swal.fire({
                      icon: "warning",
                      title: "All Fields Are Required",
                      html: "Please check all fields to approve transaction",
                    });
                  } else {
                    saveLoanApplication();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreditApproval;
