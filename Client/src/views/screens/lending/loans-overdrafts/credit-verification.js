import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import HeaderComponent from "../components/header/HeaderComponent";
import ButtonType from "../components/button/ButtonType";
import { Checkbox } from "@mantine/core";
import TextAreaField from "../components/fields/TextArea";
import SelectField from "../components/fields/SelectField";
// import ArrowStepper from "../components/arrow-stepper/arrow-stepper";
import { MDBIcon } from "mdb-react-ui-kit";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../components/tab-component/tab-component";
import swal from "sweetalert";
import GeneralVer from "../components/credit-verification/GeneralVer";
// import TranchesApp from "./components/credit-approval/TrancheApp";
import FinancialsVer from "../components/credit-verification/FinancialsVer";
import EmploymentVer from "../components/credit-verification/EmploymentVer";
import GuarantorsVer from "../components/credit-verification/GuarantorVer";
import DocumentVer from "../components/credit-verification/DocumentVer";
import CollateralVer from "../components/credit-verification/CollateralVer";
import BureauVer from "../components/credit-verification/BureauVer";
import { DEFAULT_THEME, LoadingOverlay, Loader } from "@mantine/core";
// import LoadingOverlay from "react-loading-overlay";

const CreditVerification = (
  {
    //   batchNo,
    //   accountSourceBranch,
    //   setCloseModal,
    //   setApproveChanged,
    //   setApproved,
  }
) => {
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
  const [withInterest, setWithInterest] = useState();
  const [loanScheduleModal, setLoanScheduleModal] = useState();

  const [quotationNumber, setQuotationNumber] = useState();
  const [data, setData] = useState([]);

  const [responseData, setResponseData] = useState();
  const [error, setError] = useState();

  const [selectedOption, setSelectedOption] = useState("");
  const [disableInput, setDisableInput] = useState();

  const [facilityType, setFacilityType] = useState("");
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

  function saveLoanApplication() {
    setLoading(true);
    // console.log(repay_acct, typeof repay_acct, "repay_acct");
    axios
      .post(
        API_SERVER + "/api/lending-onboarding",
        {
          repay_acct_v: facilityServiceAccount.trim(), // Repayment account number
          customer_account: facilityServiceAccount.trim(),
          legal_form_v: "50", // Product code Eg: (CUSTOMER SALARY LOAN 59)
          branch: JSON.parse(localStorage.getItem("userInfo")).branchCode, // Branch of the customer or Headoffice branch code Eg:000
          currency_v: "010", // Currency code
          repnt_period_months_v: tenorInMonths, // Tenor in months
          int_type: "02", // 01-FLAT,02-REDUCING BALANCE,03-AMORTIZATION METHOD,05-FLOATING RATE
          rate: 20, // Interest rate
          mora: moratoriumPeriod, // moratorium
          int_mora: withInterest,
          AMT: NumberWithoutCommas(requestedAmount), // Loan Amount
          EFF_DATE: JSON.parse(localStorage.getItem("userInfo")).postingDate, // Effective date
          int_repay_plan_v: "03", // Interest repayment plan
          repayment_plan_v: "03", // Repayment plan
          last_repay_date_v: "", // Last repayment date
          LAST_DAY_V: lastWorkingDay, // Last day of the month for repayment
          exempt_month_v: exemptMonth, // Exempted month for repayment
          sector_v: sectorCode, // Sector code
          sub_sector_v: subSectorCode, // Sub-sector code
          lienamt_v: "", // Lien amount
          username_v: JSON.parse(localStorage.getItem("userInfo")).id, // Username
          NO_OF_TRANCHES_V: "", // Number of tranches
          bank_code_v: "", // Bank code
          hostname_v: "", // Hostname
          facility_no_v: "", // Facility number
          fac_type_v: "16", // Facility type
          prime_rate_v: "", // Prime rate
          trans_details: "001", // Transaction details
          other_purpose_v: "", // Other purpose
          documents_ref_no_v: "", // Document reference number
          staff_cat_v: "", // Staff category
          vendor_code_v: "", // Vendor code
          ballon_installment_v: "", // Balloon installment
          introductory_source_v: "", // Introductory source
          employer_code_v: "", // Employer code
          source_funds_v: "004", // Source of funds
          no_of_disb_v: "", // Number of disbursements
          agreed_amount_v: NumberWithoutCommas(requestedAmount), // Agreed amount
          dealer_code_v: "", // Dealer code
          cust_no: "",
          action_v: "D",
          typeOfAccount: "1",
          loan_app_no_v: applicationNumber.trim(),
          prin_pay_count_v: parseInt(principalRepaymentCount),
          int_pay_count_v: parseInt(interestRepaymentCount),
          para1: "", // Parameter 1
          para2: "", // Parameter 2
          para3: "", // Parameter 3
          para4: "", // Parameter 4
          para5: "", // Parameter 5
        },
        { headers: headers }
      )
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        if (response.data.responseCode === "000") {
          swal({
            icon: "success",
            title: response.data.responseMessage,
          }).then((result) => {
            "";
          });
        } else {
          swal({
            icon: "success",
            title: response.data.responseMessage,
          }).then((result) => {
            "";
          });
        }
      })
      .catch((error) => {
        setLoading(false); // Hide the loader in case of an error

        console.error("Error:", error);
        // Handle error scenario
        swal({
          icon: "error",
          title: "An error occurred.",
        });
      });
  }

  const customLoader = (
    // <svg
    //   width="54"
    //   height="54"
    //   viewBox="0 0 38 38"
    //   xmlns="http://www.w3.org/2000/svg"
    //   stroke={DEFAULT_THEME.colors.blue[6]}
    // >
    //   <g fill="none" fillRule="evenodd">
    //     <g transform="translate(1 1)" strokeWidth="3">
    //       <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
    //       <path d="M36 18c0-9.94-8.06-18-18-18">
    //         <animateTransform
    //           attributeName="transform"
    //           type="rotate"
    //           from="0 18 18"
    //           to="360 18 18"
    //           dur="1s"
    //           repeatCount="indefinite"
    //         />
    //       </path>
    //     </g>
    //   </g>
    // </svg>
    <Loader size="xl" />
  );

  // function loading() {
  //   return <LoadingOverlay loader={customLoader} visible />;
  // }
  // var loan_app_no;

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-origination-details",
        {
          loan_app_no: "",
        },
        { headers: headers }
      )
      .then(function (response) {
        setCurrency(response.data[0]?.currency_desc);
        setSector(
          response.data[0]?.sector + " - " + response.data[0]?.sector_desc
        );
        setFacilityType(response.data[0]?.facility_type_desc);
        setSectorCode(response.data[0]?.sector);
        setPurpose(
          response.data[0]?.purpose + " - " + response.data[0]?.purpose_desc
        );
        setIntroSource(
          response.data[0]?.introductory_source +
            " - " +
            response.data[0]?.source_desc
        );
        setApplicationNumber(response.data[0]?.loan_app_no);
        setRequestedAmount(formatNumber(+response.data[0]?.amount));
        setTenorInMonths(response.data[0]?.repnt_period_months);
        setLoanProduct(response.data[0]?.product_desc);
        setPrincipalRepaymentCount(response.data[0]?.prin_pay_count);
        setInterestRepaymentCount(response.data[0]?.int_pay_count);
        setFacilityServiceAccount(response.data[0]?.loan_ser_acct);
        setInterestType(
          response.data[0]?.int_type + " - " + response.data[0]?.int_type_desc
        );
        setDealerCode(
          response.data[0]?.dealer_code + " - " + response.data[0]?.dealer_desc
        );
        setSubSector(
          response.data[0]?.sub_sector +
            " - " +
            response.data[0]?.sub_sector_desc
        );
        setSubSectorCode(response.data[0]?.sub_sector);
        setMoratorium(response.data[0]?.prin_morato);
        setWithInt(response.data[0]?.int_morato);
        setPrincipalRepaymentCount(response.data[0]?.prin_pay_count);
        setInterestRepaymentCount(response.data[0]?.int_pay_count);
        setLastWorkingDay(response.data[0]?.last_day);
        setExemptMonth(response.data[0]?.exempt_month);
        setFacilityType(response.data[0]?.facility_type_desc);
        setAccountName(response.data[0]?.acct_desc);
        setPrincipalRepaymentFrequency(
          response.data[0]?.repayment_plan +
            " - " +
            response.data[0]?.repayment_plan_desc
        );
        setInterestRepaymentFrequency(
          response.data[0]?.repfrequency +
            " - " +
            response.data[0]?.frequency_desc
        );
        setExemptMonth(response.data[0]?.exempt_month);
        setLastWorkingDay(response.data[0]?.last_day);
        setOtherPurpose(response.data[0]?.other_purpose);
        setLienAmount(formatNumber(+response.data[0]?.lienamt));
      })
      .catch((err) => console.log(err));

    // axios
    //   .post(
    //     "http://10.203.14.195:3320/api/get-risk-status",
    //     {
    //       customerNumber: data.customer_number,
    //     },
    //     { headers }
    //   )
    //   .then((res) => {
    //     // console.log(res, "riskkkkk");
    //     setPepStatus(res.data.pep_status);
    //     setRiskStatus(res.data.risk_status);
    //   });
  });

  const tabsData = [
    {
      value: "general",
      label: "General",
      component: (
        <GeneralVer
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
          facilityType={facilityType}
          exemptMonth={exemptMonth}
          lastWorkingDay={lastWorkingDay}
          lienAmount={lienAmount}
          otherPurpose={otherPurpose}
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
      component: <FinancialsVer />,
    },
    {
      value: "employment",
      label: "Employment",
      component: <EmploymentVer />,
    },
    {
      value: "guarantors",
      label: "Guarantors",
      component: <GuarantorsVer />,
    },
    {
      value: "document",
      label: "Document",
      component: <DocumentVer />,
    },
    {
      value: "collateral",
      label: "Collateral",
      component: <CollateralVer />,
    },
    {
      value: "bureau",
      label: "External Credit Bureau",
      component: <BureauVer />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0].value);
  return (
    <div style={{ zoom: "0.9" }}>
      <LoadingOverlay loader={customLoader} visible={loading} />
      {/* <Loader size="lg" variant="bars" visible={loading} /> */}
      <div style={{ padding: "10px" }}>
        <ActionButtons
          //   onExitClick={() => setCloseModal(false)}
          displayFetch={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayOk={"none"}
          displayNew={"none"}
          displayRefresh={"none"}
          displayView={"none"}
          onAuthoriseClick={() => {
            swal({
              icon: "info",
              title: "Are you sure you want to approve this transaction?",
              buttons: true,
            }).then((result) => {
              if (result) {
                saveLoanApplication();
              }
            });
          }}
        />
        <br />
        <div
          style={{
            padding: "10px",
            border: "2px solid #d6d7d9",
            // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "5px",
          }}
        >
          <div>
            <HeaderComponent title={"Account Details"} />
          </div>
          <div
            style={{
              display: "flex",

              background: "white",
            }}
          >
            <div style={{ flex: "0.7" }}>
              <div>
                <InputField
                  label={"Facility Type"}
                  labelWidth={"25%"}
                  inputWidth={"15%"}
                  disabled
                  value={facilityType}
                  textAlign={"center"}
                />
              </div>
              {/* <div style={{ marginTop: "-5px" }}>
              <InputField
                label={"Customer Type"}
                labelWidth={"25%"}
                inputWidth={"30%"}
                disabled
              />
            </div> */}
              <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Facility Service Account"}
                  labelWidth={"25%"}
                  inputWidth={"30%"}
                  disabled
                  value={facilityServiceAccount}
                />
              </div>
              <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Account Name"}
                  labelWidth={"25%"}
                  disabled
                  inputWidth={"30%"}
                  value={accountName}
                />
              </div>
              <div style={{}}>
                <div style={{ marginTop: "-5px" }}>
                  <InputField
                    label={"Currency"}
                    labelWidth={"25%"}
                    disabled
                    inputWidth={"15%"}
                    textAlign={"center"}
                    value={currency}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "0.3",
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
                    labelWidth={"45%"}
                    value={applicationNumber}
                    disabled
                    textAlign={"center"}
                  />
                </div>
                {/* <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Pep Status"}
                  labelWidth={"45%"}
                  disabled
                  value={pepStatus}
                  textAlign={"center"}
                  inputColor={"red"}
                  labelColor={"red"}
                />
              </div>
              <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Risk Status"}
                  labelWidth={"45%"}
                  disabled
                  value={riskStatus}
                  textAlign={"center"}
                  inputColor={"red"}
                  labelColor={"red"}
                />
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <TabsComponent
            tabsData={tabsData}
            inactiveColor={"#AFE1AF7A"}
            activeColor={"green"}
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
    </div>
  );
};

export default CreditVerification;
