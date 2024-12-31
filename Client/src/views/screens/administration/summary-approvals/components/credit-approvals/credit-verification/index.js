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
import GeneralVer from "./components/credit-verification/GeneralVer";
// import TranchesApp from "./components/credit-approval/TrancheApp";
import FinancialsVer from "./components/credit-verification/FinancialsVer";
import EmploymentVer from "./components/credit-verification/EmploymentVer";
import GuarantorsVer from "./components/credit-verification/GuarantorVer";
import DocumentVer from "./components/credit-verification/DocumentVer";
import CollateralVer from "./components/credit-verification/CollateralVer";
import BureauVer from "./components/credit-verification/BureauVer";
import { DEFAULT_THEME, LoadingOverlay, Loader } from "@mantine/core";
import Header from "../../../../../../../components/others/Header/Header";
import { Modal } from "@mantine/core";
import { FiX } from "react-icons/fi";
import { MdOutlineFreeCancellation, MdLibraryAddCheck } from "react-icons/md";
import { BsFillPatchCheckFill } from "react-icons/bs/index.esm";
import CheckApp from "../../../../../lending/components/check/CheckApp";
import { IoMdCloseCircle } from "react-icons/io";
import { Spin } from "antd";
import { FaUserCircle } from "react-icons/fa";

const CreditOriginationVerification = ({ batchNo, setCloseModal }) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [loanApplicationNo, setLoanApplicationNo] = useState("");
  const [facilityAccount, setFacilityAccount] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [accountName, setAccountName] = useState("");
  const [currency, setCurrency] = useState("");
  const [amt, setAmt] = useState("");
  const [introSource, setIntroSource] = useState("");
  const [dealerCode, setDealerCode] = useState("");
  const [purpose, setPurpose] = useState("");
  const [moratorium, setMoratorium] = useState("");
  const [sector, setSector] = useState("");
  const [sectorCode, setSectorCode] = useState("");
  const [subSector, setSubSector] = useState("");
  const [subSectorCode, setSubSectorCode] = useState("");
  const [withInt, setWithInt] = useState("");
  const [tenor, setTenor] = useState("");
  const [interestType, setInterestType] = useState("");
  const [interestTypeCode, setInterestTypeCode] = useState("");
  const [interestRateMonthly, setInterestRateMonthly] = useState("");
  const [interestRateAnnum, setInterestRateAnnum] = useState("");
  const [principalRepayFreq, setPrincipalRepayFreq] = useState("");
  const [principalRepayFreqCode, setPrincipalRepayFreqCode] = useState("");
  const [interestRepayFreq, setInterestRepayFreq] = useState("");
  const [interestRepayFreqCode, setInterestRepayFreqCode] = useState("");
  const [principalCount, setPrincipalCount] = useState("");
  const [interestCount, setInterestCount] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [exemptMonth, setExemptMonth] = useState("");
  const [lienAmt, setLienAmt] = useState("");
  const [lienPer, setLienPer] = useState("");
  const [loanProd, setLoanProd] = useState("");
  const [legal, setLegal] = useState("");
  const [custNo, setCustNo] = useState("");
  const [otherPur, setOtherPur] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [benAcct, setBenAcct] = useState("");
  const [purDesc, setPurDesc] = useState("");
  const [cur, setCur] = useState("");
  const [branch, setBranch] = useState("");
  const [sourceFunds, setSourceFunds] = useState("");
  const [data, setData] = useState([]);

  /////////////////////////////////////////////////////////////

  const [lastWorkingDay, setLastWorkingDay] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [disableInput, setDisableInput] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  ////////////////////////////////////////////////////////////

  const [reason, setReason] = useState("");
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
    // setFacilityType(selectedValue);
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

  const confirmApproval = () => {
    Swal.fire({
      icon: "question",
      title: "Are You Sure You Want To Approve This Transaction?",
      // text: "Click OK to confirm all details and approve",
      html: 'Click <span style="color: darkblue; font-weight: bold;">OK</span> to confirm all details to verify loan',
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
    axios
      .post(
        API_SERVER + "/api/lending-onboarding",
        {
          repay_acct_v: facilityAccount?.trim(), // Repayment account number
          customer_account: facilityAccount?.trim(),
          legal_form_v: legal, // Product code Eg: (CUSTOMER SALARY LOAN 59)
          branch: JSON.parse(localStorage.getItem("userInfo")).branchCode, // Branch of the customer or Headoffice branch code Eg:000
          currency_v: cur, // Currency code
          repnt_period_months_v: tenor, // Tenor in months
          int_type: interestTypeCode, // 01-FLAT,02-REDUCING BALANCE,03-AMORTIZATION METHOD,05-FLOATING RATE
          rate: interestRateAnnum, // Interest rate
          mora: moratorium ? parseFloat(moratorium) : null, // moratorium
          int_mora: withInt,
          AMT: amt, // Loan Amount
          EFF_DATE: JSON.parse(localStorage.getItem("userInfo")).postingDate, // Effective date
          int_repay_plan_v: interestRepayFreqCode, // Interest repayment plan
          repayment_plan_v: principalRepayFreqCode, // Repayment plan
          last_repay_date_v: "", // Last repayment date
          LAST_DAY_V: lastDay, // Last day of the month for repayment
          exempt_month_v: exemptMonth, // Exempted month for repayment
          sector_v: sectorCode, // Sector code
          sub_sector_v: subSectorCode, // Sub-sector code
          lienamt_v: "", // Lien amount
          username_v: JSON.parse(localStorage.getItem("userInfo")).id, // Username
          NO_OF_TRANCHES_V: null, // Number of tranches
          bank_code_v: null, // Bank code
          // hostname_v: "", // Hostname
          facility_no_v: "", // Facility number
          fac_type_v: facilityType, // Facility type
          prime_rate_v: null, // Prime rate
          trans_details: purpose, // Transaction details
          other_purpose_v: otherPur, // Other purpose
          documents_ref_no_v: null, // Document reference number
          staff_cat_v: "", // Staff category
          vendor_code_v: null, // Vendor code
          ballon_installment_v: null, // Balloon installment
          introductory_source_v: introSource, // Introductory source
          employer_code_v: null, // Employer code
          source_funds_v: "Income", // Source of funds
          no_of_disb_v: null, // Number of disbursements
          agreed_amount_v: amt, // Agreed amount
          dealer_code_v: dealerCode, // Dealer code
          cust_no: custNo,
          action_v: "V",
          typeOfAccount: null,
          loan_app_no_v: loanApplicationNo?.trim(),
          prin_pay_count_v: parseInt(principalCount),
          int_pay_count_v: parseInt(interestCount),
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
          source_v: "1A",
          app_flag_v: "01",
          loan_app_no_v: loanApplicationNo,
          username_v: branch,
          decide1_v: "99",
          hostname_v: hostname,
          cancel_reason_v: reason,
          item_code_v: "CRV",
          loan_disb_acct_v: facilityAccount,
          branch_v: branch,
          currency_v: cur,
          request_amt_v: parseFloat(amt),
          frmcode_v: "AHZ1",
          relation_officer_v: "1101",
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
      .catch((err) => console.log("ERRRRRRRR"));
  };

  useEffect(() => {
    // console.log({
    //   loan_app_no: batchNo,
    // });
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
        setLoanApplicationNo(response.data[0]?.loan_app_no);
        setCustNo(response.data[0]?.customer_number);
        setBankCode(response.data[0]?.bank_code);
        setBenAcct(response.data[0]?.ben_acct);
        setOtherPur(response.data[0]?.other_purpose);
        setFacilityType(response.data[0]?.facility_type);
        setFacilityAccount(response.data[0]?.loan_repay_acct);
        setCurrency(response.data[0]?.currency_desc);
        setCur(response.data[0]?.currency);
        setAmt(response.data[0]?.request_amt);
        setIntroSource(response.data[0]?.introductory_source);
        setDealerCode(response.data[0]?.dealer_code);
        setPurpose(response.data[0]?.purpose);
        setPurDesc(response.data[0]?.purpose_desc);
        setBranch(response.data[0]?.origin_branch_desc);
        setMoratorium(response.data[0]?.prin_morato);
        setInterestRateAnnum(response.data[0]?.eff_int_rate);
        setTenor(response.data[0]?.repnt_period_months);
        setWithInt(response.data[0]?.int_morato);
        setPrincipalCount(response.data[0]?.prin_pay_count);
        setInterestCount(response.data[0]?.int_pay_count);
        setLastDay(response.data[0]?.last_day);
        setExemptMonth(response.data[0]?.exempt_month);
        setLienAmt(response.data[0]?.lienamt);
        setLienPer(response.data[0]?.gf_rate);
        setAccountName(response.data[0]?.acct_desc);
        setLoanProd(response.data[0]?.product_desc);
        setSector(response.data[0]?.sector_desc);
        setSubSector(response.data[0]?.sub_sector_desc);
        setInterestType(response.data[0]?.int_type_desc);
        setPrincipalRepayFreq(response.data[0]?.frequency_desc);
        setInterestRepayFreq(response.data[0]?.repayment_plan_desc);
        setSectorCode(response.data[0]?.sector);
        setSubSectorCode(response.data[0]?.sub_sector);
        setLegal(response.data[0]?.type_of_acct);
        setInterestTypeCode(response.data[0]?.int_type);
        setPrincipalRepayFreqCode(response.data[0]?.repfrequency);
        setInterestRepayFreqCode(response.data[0]?.int_repayment_plan);
        setSourceFunds(response.data[0]?.source_funds);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire(err);
      });
  }, []);

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
      <div className="text-center font-bold">
        {i.fee_rate != "null" ? formatNumber(parseFloat(i.fee_rate)) : ""}
      </div>,
      <div className="text-right font-bold">
        {i.fee_amount != "null" ? formatNumber(parseFloat(i.fee_amount)) : ""}
      </div>,
    ];
  });

  const tabsData = [
    {
      value: "general",
      label: "General",
      component: (
        <GeneralVer
          amt={amt}
          introSource={introSource}
          dealerCode={dealerCode}
          purDesc={purDesc}
          moratorium={moratorium}
          interestRateAnnum={interestRateAnnum}
          tenor={tenor}
          withInt={withInt}
          principalCount={principalCount}
          interestCount={interestCount}
          lastDay={lastDay}
          exemptMonth={exemptMonth}
          lienAmt={lienAmt}
          lienPer={lienPer}
          loanProd={loanProd}
          sector={sector}
          subSector={subSector}
          interestType={interestType}
          principalRepayFreq={principalRepayFreq}
          interestRepayFreq={interestRepayFreq}
          otherPur={otherPur}
          bankCode={bankCode}
          benAcct={benAcct}
          fee={fee}
          facilityType={facilityType}
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
      component: <FinancialsVer custNo={custNo} />,
    },
    {
      value: "employment",
      label: "Employment",
      component: <EmploymentVer custNo={custNo} />,
    },
    {
      value: "guarantors",
      label: "Guarantors",
      component: (
        <GuarantorsVer custNo={custNo} loanApplicationNo={loanApplicationNo} />
      ),
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
          onExitClick={() => {
            setCloseModal(false);
          }}
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
                    {facilityAccount === "null" ? "" : facilityAccount}
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
                  {facilityType === "16"
                    ? "LOAN"
                    : facilityType === "02"
                    ? "OVERDRAFT"
                    : ""}
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
                  {loanApplicationNo === "null" ? "" : loanApplicationNo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          style={{
            padding: "10px",
            border: "2px solid #d6d7d9",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
                  value={
                    facilityType === "16"
                      ? "LOAN"
                      : facilityType === "02"
                      ? "OVERDRAFT"
                      : ""
                  }
                  textAlign={"center"}
                />
              </div>
              <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Facility Service Account"}
                  labelWidth={"25%"}
                  inputWidth={"45%"}
                  textAlign={"center"}
                  disabled
                  value={facilityAccount === "null" ? "" : facilityAccount}
                />
              </div>
              <div style={{ marginTop: "-5px" }}>
                <InputField
                  label={"Account Name"}
                  labelWidth={"25%"}
                  disabled
                  inputWidth={"45%"}
                  value={accountName === "null" ? "" : accountName}
                  textAlign={"center"}
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
                    value={currency}
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
                  // width: "90%",
                }}
              >
                <div>
                  <InputField
                    label={"Application Number"}
                    labelWidth={"35%"}
                    value={
                      loanApplicationNo === "null" ? "" : loanApplicationNo
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
          {/* <LoadingOverlay loader={customLoader} visible={loading} /> */}
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
                value={amt ? formatNumber(parseFloat(amt)) : ""}
                getChecked={amtCheck}
                setCheckedProp={setAmtCheck}
              />
              <CheckApp
                label={"Loan Interest Rate Per Annum Confirmed ?"}
                value={
                  interestRateAnnum
                    ? parseFloat(interestRateAnnum).toFixed(2)
                    : ""
                }
                getChecked={rateCheck}
                setCheckedProp={setRateCheck}
              />
              <CheckApp
                label={"Loan Tenor Confirmed ?"}
                value={tenor !== "null" ? tenor : ""}
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

export default CreditOriginationVerification;
