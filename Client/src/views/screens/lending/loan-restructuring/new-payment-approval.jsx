import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../components/others/Header/Header";
import InputField from "../../../../components/others/Fields/InputField";
import TabsComponent from "../../../../components/others/tab-component/tab-component";
import WaiverOptionApproval from "./lrs-tabs-approval/waiverOptionApproval";
import ChargesDetailsApproval from "./lrs-tabs-approval/chargesDetailsApproval";
import RescheduleDetailsApproval from "./lrs-tabs-approval/rescheduleDetailsApproval";
import PaymentReasonApproval from "./lrs-tabs-approval/paymentReasonApproval";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { headers } from "../../../../App";
import { Spin } from "antd";
import Swal from "sweetalert2";
import { MdLibraryAddCheck } from "react-icons/md";
import CheckApp from "../components/check/CheckApp";
import { Modal } from "@mantine/core";

function NewPaymentApproval({ facilityNo, setShowModal }) {
  // STATES
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [passedWaiverOptionData, setPassedWaiverOptionData] = useState([]);
  const [accruedInt, setAccruedInt] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [accruedPenal, setAccruedPenal] = useState("");
  const [principalArrears, setPrincipalArrears] = useState("");
  const [interestArrears, setInterestArrears] = useState("");
  const [arrInterestSusp, setArrInterestSusp] = useState("");
  const [balToResch, setBalToResch] = useState(0);
  const [repayCnt, setRepayCnt] = useState("");
  const [auditModal, setAuditModal] = useState(false);
  const [amtCheck, setAmtCheck] = useState(false);
  const [approvalLoadingStatus, setApprovalLoadingStatus] = useState(false);

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

  // STATES AND VARIABLES
  // THE RESPECTIVE TABS AND THEIR RESPECTIVE COMPONENTS
  const loanPaymentTabs = [
    {
      value: "1",
      label: "Waiver Options",
      component: (
        <WaiverOptionApproval
          data1={data1}
          data2={data2}
          balanceToRescheduleValue={setBalToResch}
          passedWaiverOptionDetails={setPassedWaiverOptionData}
        />
      ),
    },
    {
      value: "2",
      label: "Charges Details",
      component: <ChargesDetailsApproval data1={data1} />,
    },
    {
      value: "3",
      label: "Reschedule Details",
      component: (
        <RescheduleDetailsApproval
          data1={data1}
          data2={data2}
          data4={data4}
          balToResch={balToResch}
        />
      ),
    },
    {
      value: "4",
      label: "Payment Reason",
      component: <PaymentReasonApproval data1={data1} />,
    },
  ];

  //   STATES
  const [activeTab, setActiveTab] = useState("1");

  //   CONSTANTS
  const totalBalance =
    parseFloat(data2[0]?.SHADOW_BALANCE_TODAY) +
    parseFloat(data2[0]?.OD_INTEREST_AMOUNT) +
    parseFloat(data2[0]?.COT_AMOUNT) +
    parseFloat(data2[0]?.ARREARS_INT);

  const totalBalance0 =
    parseFloat(data2[0]?.OD_INTEREST_AMOUNT) +
    parseFloat(data2[0]?.COT_AMOUNT) +
    parseFloat(data2[0]?.ARREARS_INT);

  const totalArrear =
    parseFloat(principalArrears) +
    parseFloat(interestArrears) +
    parseFloat(data2[0]?.COT_AMOUNT) +
    parseFloat(data2[0]?.ARREARS_INT);

  const totalSusp =
    parseFloat(data2[0]?.OD_INTIN_SUSP) +
    parseFloat(data2[0]?.PEN_INTIN_SUSP) +
    parseFloat(arrInterestSusp);

  //   EFFECTS
  useEffect(() => {
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
        console.log(response?.data, "Appdata 1");
        setData1(response.data[0]);
        setDataLoading(false);
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
        setDataLoading(false);
      })
      .catch((err) => console.log(err));

    //   data 3
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
        setDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // data 4
    axios
      .post(
        API_SERVER + "/api/data4-for-loan-payment-approv",
        {
          facility_no: facilityNo,
          pay_app_no: data1?.PAY_APP_NO,
        },
        { headers: headers }
      )
      .then(function (response) {
        setData4(response?.data[0]);
        console.log(response.data[0], "App data 4");
      })
      .catch((err) => console.log(err));

    //   accruals
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

    //   loan arrears details
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

    //   RCO - REPAYMENT COUNT OUTSTANDING
    axios
      .post(
        API_SERVER + "/api/get-repaycnt-outstanding",
        { facility_number: facilityNo },
        { headers: headers }
      )
      .then(function (response) {
        setRepayCnt(response?.data[0]?.COUNT);
      })
      .catch((err) => console.log(err));
  }, [data1?.PAY_APP_NO, data2, facilityNo]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/data4-for-loan-payment-approv",
        {
          facility_no: facilityNo,
          pay_app_no: data1?.PAY_APP_NO,
        },
        { headers: headers }
      )
      .then(function (response) {
        setData4(response?.data[0]);
        console.log(response.data[0], "App data 4");
      })
      .catch((err) => console.log(err));
  }, [data1, facilityNo]);

  const confirmLoanPayment = () => {
    Swal.fire({
      icon: "question",
      title: "Are You Sure You Want To Approve This Transaction?",
      // text: "Click OK to confirm all details and approve",
      html: 'Click <span style="color: darkblue; font-weight: bold;">OK</span> to confirm all details to approve',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // setAuditModal(true);
        approveLoanPayment();
        setApprovalLoadingStatus(true);
      }
    });
  };

  const approveLoanPayment = () => {
    const ipAddress = localStorage.getItem("ipAddress");
    setApprovalLoadingStatus(true);

    const principalToPay =
      parseFloat(data1?.REPAYMENT_AMOUNT) -
        parseFloat(passedWaiverOptionData?.totalLoanBalances?.interest) -
        parseFloat(passedWaiverOptionData?.totalLoanBalances?.penalty) >
        parseFloat(data3[0]?.SHADOW_BALANCE_TODAY) &&
      data1?.PAYMENT_TYPE !== "T"
        ? parseFloat(data3[0]?.SHADOW_BALANCE_TODAY)
        : parseFloat(data1?.REPAYMENT_AMOUNT) -
            parseFloat(passedWaiverOptionData?.totalLoanBalances?.interest) -
            parseFloat(passedWaiverOptionData?.totalLoanBalances?.penalty) >
            0 && data1?.PAYMENT_TYPE !== "T"
        ? parseFloat(data1?.REPAYMENT_AMOUNT) -
          parseFloat(passedWaiverOptionData?.totalLoanBalances?.interest) -
          parseFloat(passedWaiverOptionData?.totalLoanBalances?.penalty)
        : 0;

    console.log(
      {
        repayment_acct_v: data2[0]?.MAINTENANCE_FEE_ACCOUNT,
        principal_acct_v: data3[0]?.PRINCIPAL_ACCOUNT,
        SHADOW_BALANCE_TODAY_v: parseFloat(data3[0]?.SHADOW_BALANCE_TODAY),
        acct_class_v: data2[0]?.ACCT_CLASS,
        force_debit_v: data1?.FORCE_DEBIT,
        DOC_REF_V: data1?.DOCUMENT_ID,
        waiver_option_v: data1?.WAIVER_OPTION,
        payment_type_v: data1?.PAYMENT_TYPE,
        facility_no_v: data1?.FACILITY_NO,
        legal_form_v: data3[0]?.LEGAL_FORM,
        customer_no_v: data3[0]?.CUSTOMER_NUMBER,
        current_amount_v: parseFloat(data3[0]?.SHADOW_BALANCE_TODAY)
          ? parseFloat(data3[0]?.SHADOW_BALANCE_TODAY)
          : parseFloat(data1?.REPAYMENT_AMOUNT),
        INTEREST_REVENUE_ACCT_v: data2[0]?.MAINTENANCE_FEE_ACCOUNT,
        TT_TOPAY_v: parseFloat(
          passedWaiverOptionData?.totalLoanBalances?.newLoanAfterWaivers
        ),
        SUM_FEE_AMOUNT_v: isNaN(
          parseFloat(data1?.INSURANCE_AMOUNT) +
            parseFloat(data1?.EARLY_FEE_AMOUNT)
        )
          ? 0
          : parseFloat(data1?.INSURANCE_AMOUNT) +
            parseFloat(data1?.EARLY_FEE_AMOUNT),
        AMT_v:
          data1?.PAYMENT_TYPE === "T"
            ? parseFloat(data1?.REPAYMENT_AMOUNT)
            : data1?.PAYMENT_TYPE === "E"
            ? parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)
            : data1?.PAYMENT_TYPE === "R"
            ? 0
            : data1?.PAYMENT_TYPE === "C"
            ? parseFloat(data1?.REPAYMENT_AMOUNT)
            : "", // amount to perform top up or whatever
        INT_ADJUST_v: parseFloat(
          passedWaiverOptionData?.totalLoanBalances?.interest
        ),
        PEN_ADJUST_v: parseFloat(
          passedWaiverOptionData?.totalLoanBalances?.penalty
        ),
        ARR_INT_v: parseFloat(
          passedWaiverOptionData?.totalLoanBalances?.arrears
        ),
        resch_after_pay_v: data1?.RESCHEDULE, // check this out
        username_v: data4?.POSTED_BY,
        HOSTNAME_v: ipAddress,
        OD_INTEREST_AMOUNT_v: parseFloat(data2[0]?.OD_INTEREST_AMOUNT),
        arrears_bal_v: parseFloat(data2[0]?.ARREARS_INT),
        machine_ip_v: ipAddress,
        reason_v: data1?.REASON,
        prov_amt_v: data1?.PROVISION_AMT === null ? 0 : data1?.PROVISION_AMT,
        prinbal_v: parseFloat(data2[0]?.SHADOW_BALANCE_TODAY),
        total_bal_v: parseFloat(totalBalance0),
        early_penal_amount_v:
          data1?.EARLY_PENAL_AMOUNT === null
            ? 0
            : parseFloat(data1?.EARLY_PENAL_AMOUNT),
        early_fee_amount_v:
          data1?.EARLY_FEE_AMOUNT === null
            ? 0
            : parseFloat(data1?.EARLY_FEE_AMOUNT),
        ARREARS_SUS_v: parseFloat(arrInterestSusp),
        OUT_PRIN_BAL_v:
          data1?.PAYMENT_TYPE === "T"
            ? parseFloat(
                passedWaiverOptionData?.totalLoanBalances?.newLoanAfterWaivers
              ) + data1?.REPAYMENT_AMOUNT
            : data1?.PAYMENT_TYPE === "C"
            ? parseFloat(data3[0]?.SHADOW_BALANCE_TODAY) -
              parseFloat(principalToPay)
            : data1?.PAYMENT_TYPE === "E"
            ? parseFloat(data3[0]?.SHADOW_BALANCE_TODAY) -
              parseFloat(principalToPay)
            : parseFloat(
                passedWaiverOptionData?.totalLoanBalances?.newLoanAfterWaivers
              ) + data1?.REPAYMENT_AMOUNT,
        TOTAL_BALS_v:
          data1?.PAYMENT_TYPE === "T"
            ? parseFloat(totalBalance0) + parseFloat(data1?.REPAYMENT_AMOUNT)
            : data1?.PAYMENT_TYPE === "E"
            ? -parseFloat(totalBalance0)
            : data1?.PAYMENT_TYPE === "C"
            ? parseFloat(totalBalance0) - parseFloat(data1?.REPAYMENT_AMOUNT)
            : parseFloat(totalBalance0) - parseFloat(data1?.REPAYMENT_AMOUNT), //check this from procedure
        last_day_v: data4?.LAST_DAY,
        EXEMPT_MONTH_v: data4?.EXEMPT_MONTH === null ? "N" : "N",
        int_pay_count_v: parseFloat(data4?.REPFREQUENCY),
        int_repay_plan_v: data2[0]?.INTEREST_REPAY_FREQ,
        int_rate_v: data4?.INT_RATE,
        moratorium_period_v:
          data2[0]?.MORATORIUM_PERIOD === "" ? 0 : data2[0]?.MORATORIUM_PERIOD,
        int_morato_v: data4?.INT_MORATO,
        repnt_period_months_v: data4?.REPNT_PERIOD_MONTHS,
        int_type_v: data2[0]?.INT_TYPE,
        repayment_plan_v: data4?.REPAYMENT_PLAN,
        prin_pay_count_v: parseFloat(data4?.REPFREQUENCY), // COUNT
        pay_app_no_v: data4?.PAY_APP_NO,
        FACILITY_AMOUNT_v: parseFloat(data2[0]?.FACILITY_AMOUNT),
        current_app_flag_v: "02",
      },
      "DOLLARS"
    );

    // MAIN DEAL
    axios
      .post(
        API_SERVER + "/api/app-lending-payments",
        {
          repayment_acct_v: data2[0]?.MAINTENANCE_FEE_ACCOUNT,
          principal_acct_v: data3[0]?.PRINCIPAL_ACCOUNT,
          SHADOW_BALANCE_TODAY_v: parseFloat(data3[0]?.SHADOW_BALANCE_TODAY),
          acct_class_v: data2[0]?.ACCT_CLASS,
          force_debit_v: data1?.FORCE_DEBIT,
          DOC_REF_V: data1?.DOCUMENT_ID,
          waiver_option_v: data1?.WAIVER_OPTION,
          payment_type_v: data1?.PAYMENT_TYPE,
          facility_no_v: data1?.FACILITY_NO,
          legal_form_v: data3[0]?.LEGAL_FORM,
          customer_no_v: data3[0]?.CUSTOMER_NUMBER,
          current_amount_v: parseFloat(data3[0]?.SHADOW_BALANCE_TODAY)
            ? parseFloat(data3[0]?.SHADOW_BALANCE_TODAY)
            : parseFloat(data1?.REPAYMENT_AMOUNT),
          INTEREST_REVENUE_ACCT_v: data2[0]?.MAINTENANCE_FEE_ACCOUNT,
          TT_TOPAY_v: parseFloat(
            passedWaiverOptionData?.totalLoanBalances?.newLoanAfterWaivers
          ),
          SUM_FEE_AMOUNT_v: isNaN(
            parseFloat(data1?.INSURANCE_AMOUNT) +
              parseFloat(data1?.EARLY_FEE_AMOUNT)
          )
            ? 0
            : parseFloat(data1?.INSURANCE_AMOUNT) +
              parseFloat(data1?.EARLY_FEE_AMOUNT),
          AMT_v:
            data1?.PAYMENT_TYPE === "T"
              ? parseFloat(data1?.REPAYMENT_AMOUNT)
              : data1?.PAYMENT_TYPE === "E"
              ? parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)
              : data1?.PAYMENT_TYPE === "R"
              ? 0
              : data1?.PAYMENT_TYPE === "C"
              ? parseFloat(data1?.REPAYMENT_AMOUNT)
              : "", // amount to perform top up or whatever
          INT_ADJUST_v: parseFloat(
            passedWaiverOptionData?.totalLoanBalances?.interest
          ),
          PEN_ADJUST_v: parseFloat(
            passedWaiverOptionData?.totalLoanBalances?.penalty
          ),
          ARR_INT_v: parseFloat(
            passedWaiverOptionData?.totalLoanBalances?.arrears
          ),
          resch_after_pay_v: data1?.RESCHEDULE, // check this out
          username_v: data4?.POSTED_BY,
          HOSTNAME_v: ipAddress,
          OD_INTEREST_AMOUNT_v: parseFloat(data2[0]?.OD_INTEREST_AMOUNT),
          arrears_bal_v: parseFloat(data2[0]?.ARREARS_INT),
          machine_ip_v: ipAddress,
          reason_v: data1?.REASON,
          prov_amt_v: data1?.PROVISION_AMT === null ? 0 : data1?.PROVISION_AMT,
          prinbal_v: parseFloat(data2[0]?.SHADOW_BALANCE_TODAY),
          total_bal_v: parseFloat(totalBalance0),
          early_penal_amount_v:
            data1?.EARLY_PENAL_AMOUNT === null
              ? 0
              : parseFloat(data1?.EARLY_PENAL_AMOUNT),
          early_fee_amount_v:
            data1?.EARLY_FEE_AMOUNT === null
              ? 0
              : parseFloat(data1?.EARLY_FEE_AMOUNT),
          ARREARS_SUS_v: parseFloat(arrInterestSusp),
          OUT_PRIN_BAL_v:
            data1?.PAYMENT_TYPE === "T"
              ? parseFloat(
                  passedWaiverOptionData?.totalLoanBalances?.newLoanAfterWaivers
                ) + data1?.REPAYMENT_AMOUNT
              : data1?.PAYMENT_TYPE === "C"
              ? parseFloat(data3[0]?.SHADOW_BALANCE_TODAY) -
                parseFloat(principalToPay)
              : data1?.PAYMENT_TYPE === "E"
              ? parseFloat(
                  passedWaiverOptionData?.totalLoanBalances?.newLoanAfterWaivers
                ) - data1?.REPAYMENT_AMOUNT
              : parseFloat(data3[0]?.SHADOW_BALANCE_TODAY),
          TOTAL_BALS_v:
            data1?.PAYMENT_TYPE === "T"
              ? parseFloat(totalBalance0) + parseFloat(data1?.REPAYMENT_AMOUNT)
              : data1?.PAYMENT_TYPE === "E"
              ? -parseFloat(totalBalance0)
              : data1?.PAYMENT_TYPE === "C"
              ? // ? -parseFloat(data1?.REPAYMENT_AMOUNT)
                parseFloat(totalBalance0) - parseFloat(data1?.REPAYMENT_AMOUNT)
              : parseFloat(totalBalance0) - parseFloat(data1?.REPAYMENT_AMOUNT), //check this from procedure
          last_day_v: data4?.LAST_DAY,
          EXEMPT_MONTH_v: data4?.EXEMPT_MONTH === null ? "N" : "N",
          int_pay_count_v: parseFloat(data4?.REPFREQUENCY), // COUNT
          int_repay_plan_v: data2[0]?.INTEREST_REPAY_FREQ,
          int_rate_v: data4?.INT_RATE,
          moratorium_period_v:
            data2[0]?.MORATORIUM_PERIOD === ""
              ? 0
              : data2[0]?.MORATORIUM_PERIOD,
          int_morato_v: data4?.INT_MORATO,
          repnt_period_months_v: data4?.REPNT_PERIOD_MONTHS,
          int_type_v: data2[0]?.INT_TYPE,
          repayment_plan_v: data4?.REPAYMENT_PLAN,
          prin_pay_count_v: parseFloat(data4?.REPFREQUENCY), // COUNT
          pay_app_no_v: data4?.PAY_APP_NO,
          FACILITY_AMOUNT_v: parseFloat(data2[0]?.FACILITY_AMOUNT),
          current_app_flag_v: "02",
        },
        { headers: headers }
      )
      .then(function (response) {
        // setloadingApproval(false);
        setApprovalLoadingStatus(false);
        setShowModal(false);

        console.log(response.data?.responseMessage, "APPROVAL MESSAGE");
        var checkingStatus = response.data?.responseMessage?.split(" - ")[0];
        console.log(checkingStatus);
        if (checkingStatus?.trim() === "ERR") {
          Swal.fire(response.data?.responseMessage, "", "error");
        }
        if (checkingStatus?.trim() === "INF") {
          Swal.fire(response.data?.responseMessage, "", "success");
          // setShowModal(false);
        } else {
          Swal.fire(response.data?.responseMessage, "", "error");
        }
      })
      .catch((error) => {
        setApprovalLoadingStatus(false);
        console.log(error, "APPROVAL MESSAGE - ERROR");
        Swal.fire(error, "", "error");
        console.log("APPROVAL MESSAGE: loading - false: error");
      });
  };

  return (
    <div className="mb-36 px-3">
      {(dataLoading || auditModal || approvalLoadingStatus) && (
        <div className=" h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-90 absolute z-10">
          <div className="z-30 opacity-100  rounded-full">
            <Spin size="large" />
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div>
        <ActionButtons
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayView={"none"}
          displayFetch={"none"}
          displayNew={"none"}
          displayOk={"none"}
          displayRefresh={"none"}
          displayExit={"none"}
          onAuthoriseClick={confirmLoanPayment}
        />
      </div>
      <br />

      <div className="flex gap-4 flex-1">
        {/* LEFT SIDE COLUMN */}
        <div className="flex-[0.5] border border-[#ccc] rounded-md p-2 space-y-4">
          <Header headerShade title={"Member Details"} />
          {/* MEMBER NUMBER */}
          <InputField
            label={"Member Number"}
            required
            labelWidth={"25%"}
            inputWidth={"70%"}
            disabled
            value={
              data2[0]?.CUSTOMER_NUMBER + " - " + data2[0]?.ACCOUNT_DESCRP !==
              "undefined - undefined"
                ? data2[0]?.CUSTOMER_NUMBER + " - " + data2[0]?.ACCOUNT_DESCRP
                : ""
            }
          />

          {/* PRINCIPAL ACCOUNT */}
          <InputField
            label={"Principal Account"}
            labelWidth={"25%"}
            required
            id={"principalAccount"}
            inputWidth={"70%"}
            disabled
            value={
              data2[0]?.PRINCIPAL_ACCOUNT + " - " + data2[0]?.DESCRIPTION !==
              "undefined - undefined"
                ? data2[0]?.PRINCIPAL_ACCOUNT + " - " + data2[0]?.DESCRIPTION
                : ""
            }
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
                  formatDate(data2[0]?.EFFECTIVE_DATE?.split("T")[0]) !==
                  "Invalid Date-INV-Invalid Date"
                    ? formatDate(data2[0]?.EFFECTIVE_DATE?.split("T")[0])
                    : ""
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
                  formatDate(data2[0]?.LAST_REPAY_DATE?.split("T")[0]) !==
                  "Invalid Date-INV-Invalid Date"
                    ? formatDate(data2[0]?.LAST_REPAY_DATE?.split("T")[0])
                    : ""
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
                value={facilityNo}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Account Class"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                value={data3[0]?.ACCT_CLASS_DESC}
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
                value={data2[0]?.INTEREST_RATE}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Tenor"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                textAlign={"right"}
                disabled
                value={data2[0]?.REPNT_PERIOD_MONTHS}
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
                value={formatNumber(parseFloat(data2[0]?.FACILITY_AMOUNT))}
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
                value={repayCnt}
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
                textAlign={"left"}
                disabled
                value={data2[0]?.MAINTENANCE_FEE_ACCOUNT}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label={"Account Balance"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(data3[0]?.AVBAL_MFA))}
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
                value={formatNumber(parseFloat(data2[0]?.SHADOW_BALANCE_TODAY))}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(principalArrears))}
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
                value={data2[0]?.OD_INTEREST_AMOUNT}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(interestArrears))}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(data2[0]?.OD_INTIN_SUSP))}
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
                value={formatNumber(parseFloat(data2[0]?.COT_AMOUNT))}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(data2[0]?.COT_AMOUNT))}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(data2[0]?.PEN_INTIN_SUSP))}
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
                value={formatNumber(parseFloat(data2[0]?.ARREARS_INT))}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(data2[0]?.ARREARS_INT))}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(arrInterestSusp))}
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
                className={"font-bold"}
                value={formatNumber(parseFloat(totalBalance))}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(totalArrear))}
                className={"!text-red-500 font-bold"}
              />
            </div>

            <div className="flex-[0.25]">
              <InputField
                inputWidth={"80%"}
                textAlign={"right"}
                disabled
                value={formatNumber(parseFloat(totalSusp))}
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
          <InputField
            label={"Transaction Type"}
            labelWidth={"40%"}
            required
            id={"transactionType"}
            inputWidth={"25%"}
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

          {/* FIELDS BASED ON TRANSACTION TYPE */}
          {data1?.PAYMENT_TYPE === "T" ? (
            <InputField
              inputWidth={"25%"}
              label={"Top Up Amount"}
              labelWidth={"40%"}
              required
              textAlign={"right"}
              type={"number"}
              disabled
              value={data1?.REPAYMENT_AMOUNT}
            />
          ) : data1?.PAYMENT_TYPE === "C" ? (
            <InputField
              inputWidth={"25%"}
              label={"Reduction Amount"}
              labelWidth={"40%"}
              required
              disabled
              value={data1?.REPAYMENT_AMOUNT}
              textAlign={"right"}
            />
          ) : data1?.PAYMENT_TYPE === "R" ? (
            <InputField
              inputWidth={"25%"}
              label={"Amount"}
              labelWidth={"40%"}
              required
              disabled
              value={0}
              textAlign={"right"}
            />
          ) : data1?.PAYMENT_TYPE === "E" ? (
            <InputField
              inputWidth={"25%"}
              label={"Total Settlement Amount"}
              labelWidth={"40%"}
              required
              disabled
              textAlign={"right"}
              type={"number"}
              value={parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)}
            />
          ) : (
            ""
          )}

          {/* FORCE DEBIT */}
          <InputField
            label={"Force Debit"}
            labelWidth={"40%"}
            disabled
            inputWidth={"25%"}
            value={data1?.FORCE_DEBIT === "N" ? "No" : "Yes"}
          />

          {/* <div className="flex items-center justify-center ml-32">
            <ButtonComponent
              label={"Loan Enquiry"}
              buttonHeight={"29px"}
              buttonBackgroundColor={"#070269"}
              fontSize={"95%"}
              buttonWidth={"145px"}
              buttonIcon={<FiFileText />}
              onClick={() => {
                setShowEnquiryScreen(true);
              }}
            />
          </div> */}

          <br />

          <hr />

          {/* TAB COMPONENT */}
          <TabsComponent
            tabsData={loanPaymentTabs}
            activeTab={String(activeTab)}
            setActiveTab={setActiveTab}
            activeColor={"#87adff"}
          />
        </div>
      </div>

      {/* MODALS */}
      {/* LOAN GENERAL ENQUIRY MODAL */}
      {/* <Modal
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
          facilityDetails={data2[0]}
          selectedCustomer={data2[0]}
        />
      </Modal> */}

      <Modal
        opened={auditModal}
        size={"45%"}
        padding={"10px"}
        withCloseButton={false}
      >
        <div className="sticky top-0 z-50">
          <Header
            title="Approval Check Notification"
            backgroundColor={"#0063d1"}
            color={"white"}
            closeIcon
            handleClose={() => setAuditModal(false)}
            icon={<MdLibraryAddCheck size={20} />}
          />
        </div>
        <div style={{ zoom: 0.9 }}>
          <div className="p-2 my-2 bg-orange-100 border-l-8 border-orange-600 rounded-r-md">
            You are to check all fields to approve this transaction
          </div>
          <div>
            <CheckApp
              label={
                data1?.PAYMENT_TYPE === "T"
                  ? "Top Up Amount Confirmed?"
                  : data1?.PAYMENT_TYPE === "E"
                  ? "Early Settlement Amount Confirmed?"
                  : data1?.PAYMENT_TYPE === "R"
                  ? "Reschedule Amount Confirmed?"
                  : data1?.PAYMENT_TYPE === "C"
                  ? "Capital Reduction Amount Confirmed?"
                  : "Loan Amount confirmed?"
              }
              value={data1?.REPAYMENT_AMOUNT}
              getChecked={amtCheck}
              setCheckedProp={setAmtCheck}
            />
          </div>
          <br />
          <div className="flex justify-end pb-2 px-5">
            {/* <ButtonComponent
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
              /> */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NewPaymentApproval;
