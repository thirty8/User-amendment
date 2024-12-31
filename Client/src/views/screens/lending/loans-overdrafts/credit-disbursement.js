import React, { useState, useEffect, useRef } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import SelectField from "../components/fields/SelectField";
import CustomTable from "../components/data-table/CustomTable";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import HeaderComponent from "../components/header/HeaderComponent";
import Swal from "sweetalert2";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { Modal, ScrollArea } from "@mantine/core";
// import { Modal } from "antd";
import { SiWebmoney } from "react-icons/si";
import { IoExit } from "react-icons/io5";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { GiReceiveMoney } from "react-icons/gi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GiCash } from "react-icons/gi";
import { IoDocumentText } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";
import { MdLibraryAddCheck, MdOutbond } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { GiPoolTriangle } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { HiViewfinderCircle } from "react-icons/hi2";
import { useReactToPrint } from "react-to-print";
import Header from "../../../../components/others/Header/Header";
import { IoMdCloseCircle } from "react-icons/io";
import Burrower from "../fidelity/components/burrower";
import Guarantor from "../fidelity/components/guarantor";
import Financials from "../fidelity/components/financials";
import Document from "../fidelity/components/document";
import Collateral from "../fidelity/components/collateral";
import Comment from "../fidelity/components/comment";
import Bureau from "../fidelity/components/bureau";
import { DEFAULT_THEME, LoadingOverlay, Loader } from "@mantine/core";
import CheckApp from "../components/check/CheckApp";
import { Notification } from "@mantine/core";
import { BsFillPatchCheckFill } from "react-icons/bs/index.esm";

const CreditDisbursement = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

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

  const [loanType, setLoanType] = useState("");
  const [loanTypeLov, setLoanTypeLov] = useState([]);
  const [branch, setBranch] = useState("");
  const [branchLov, setBranchLov] = useState([]);
  const [channel, setChannel] = useState("");
  const [channelLov, setChannelLov] = useState([]);
  const [applicationNo, setApplicationNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [action, setAction] = useState("");
  const [amount, setAmount] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dat, setDat] = useState([]);
  const [disbursementDetailsModal, setDisbursementDetailsModal] = useState();
  const [rejectionReasonModal, setRejectionModal] = useState(false);
  const [otherDetailsModal, setOtherDetailsModal] = useState(false);
  const [loanAppNo, setLoanAppNo] = useState("");
  const [riskStatus, setRiskStatus] = useState("");
  const [pepStatus, setPepStatus] = useState("");
  const [facilityNo, setFacilityNo] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [disbursementAcct, setDisbursementAcct] = useState("");
  const [facTypeCategory, setFacTypeCategory] = useState("");
  const [acctName, setAcctName] = useState("");
  const [repaymentAcct, setRepaymentAcct] = useState("");
  const [productType, setProductType] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [amountDisbursed, setAmountDisbursed] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [tranches, setTranches] = useState("");
  const [tranchesDisbursed, setTranchesDisbursed] = useState("");
  const [tranchesDue, setTranchesDue] = useState("");
  const [disbursedAccts, setDisbursedAccts] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [loanAcct, setLoanAcct] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [creditGrade, setCreditGrade] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [intRatePM, setIntRatePM] = useState("");
  const [tenor, setTenor] = useState("");
  const [interestType, setInterestType] = useState("");
  const [prinRepayFrequency, setPrinRepayFrequency] = useState("");
  const [intRepayFrequency, setIntRepayFrequency] = useState("");
  const [prinCount, setPrinCount] = useState("");
  const [intCount, setIntCount] = useState("");
  const [lastWorkingDay, setLastWorkingDay] = useState("");
  const [balloonInstallment, setBalloonInstallment] = useState("");
  const [mora, setMora] = useState("");
  const [withInt, setWithInt] = useState("");
  const [exemptMonth, setExemptMonth] = useState("");
  const [loanScheduleModal, setLoanScheduleModal] = useState();
  const [auditModal, setAuditModal] = useState();
  const [prodType, setProdType] = useState("");
  const [cur, setCur] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [repayFrequency, setRepayFrequency] = useState("");
  const [intType, setIntType] = useState("");
  const [amt, setAmt] = useState("");
  const [originBranch, setOriginBranch] = useState("");
  const [chann, setChann] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [data, setData] = useState([]);
  ///////////////// CHECKS //////////////////////
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

  const [activeComponent, setActiveComponent] = useState(null);

  const [introSource, setIntroSource] = useState("");
  const [dealer, setDealer] = useState("");
  const [sector, setSector] = useState("");
  const [subSector, setSubSector] = useState("");
  const [relation, setRelation] = useState("");

  const handleClose = () => {
    setLoanAppNo("");
    setRiskStatus("");
    setPepStatus("");
    setFacilityNo("");
    setFacilityType("");
    setCustomerNo("");
    setDisbursementAcct("");
    setFacTypeCategory("");
    setAcctName("");
    setRepaymentAcct("");
    setProductType("");
    setRequestedAmount("");
    setAmountDue("");
    setTranches("");
    setTranchesDisbursed("");
    setTranchesDue("");
    setDisbursedAccts("");
    setEffectiveDate("");
    setReviewDate("");
    setCreditScore("");
    setCreditGrade("");
    setInterestRate("");
    setTenor("");
    setInterestType("");
    setPrinRepayFrequency("");
    setIntRepayFrequency("");
    setPrinCount("");
    setIntCount("");
    setLastWorkingDay("");
    setBalloonInstallment("");
    setMora("");
    setWithInt("");
    setExemptMonth("");
    setProdType("");
    setCur("");
    setApprovedBy("");
    setRepayFrequency("");
    setIntType("");
    setAmt("");
    setOriginBranch("");
    setChann("");
    setPostingDate("");
  };

  const handleOpenModal = (component) => {
    setActiveComponent(component);
    setOtherDetailsModal(true);
  };

  useEffect(() => {
    async function getLoanType() {
      let response = await axios.get(API_SERVER + "/api/get-loan-types-fid", {
        headers,
      });
      setLoanTypeLov(response.data);
    }

    async function getBranch() {
      let response = await axios.get(API_SERVER + "/api/get-branch-fid", {
        headers,
      });
      setBranchLov(response.data);
    }

    async function getChannel() {
      let response = await axios.get(API_SERVER + "/api/get-channel-fid", {
        headers,
      });
      setChannelLov(response.data);
    }

    getLoanType();
    getBranch();
    getChannel();
  }, []);

  const splitName = (fullName) => {
    fullName = fullName.trim();
    const lastSpaceIndex = fullName.lastIndexOf(" ");
    const lastName = fullName.substring(lastSpaceIndex + 1);
    const firstNames = fullName.substring(0, lastSpaceIndex);
    return { firstNames, lastName };
  };

  const [firstNames, setFirstNames] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (acctName) {
      const { firstNames, lastName } = splitName(acctName);
      setFirstNames(firstNames);
      setLastName(lastName);
      console.log(firstNames, "FN");
      console.log(lastName, "LN");
    }
  }, [acctName]);

  async function postLoanSchedule() {
    console.log(
      {
        action_v: "P",
        loanNumber: loanAppNo,
        effectiveDate: postingDate,
        origBranch: originBranch,
        facilityAmount: parseFloat(amt),
        tenor: parseFloat(tenor),
        loanProdCode: prodType,
        interestRate: parseFloat(interestRate),
        loanCurrency: cur,
        postedBy: approvedBy,
        repaymentFrequency: repayFrequency,
        interestType: intType,
        channel: chann,
        customerNumber: customerNo,
        firstName: acctName,
        lastName: "",
        repayAccount: repaymentAcct,
        zoneCode: "",
        repayProdCode: prodType,
        repayCurrency: cur,
        repayBranch: originBranch,
        hostname: JSON.parse(localStorage.getItem("userInfo")).id,
      },
      "datttttttt"
    );
    setLoad(true);
    await axios
      .post(
        API_SERVER + "/api/baserec",
        {
          action_v: "P",
          loanNumber: loanAppNo,
          effectiveDate: postingDate,
          origBranch: originBranch,
          facilityAmount: parseFloat(amt),
          tenor: parseFloat(tenor),
          loanProdCode: prodType,
          interestRate: parseFloat(interestRate),
          loanCurrency: cur,
          postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
          repaymentFrequency: repayFrequency,
          interestType: intType,
          channel: chann,
          customerNumber: customerNo,
          firstName: acctName,
          lastName: "",
          repayAccount: repaymentAcct,
          zoneCode: "",
          repayProdCode: prodType,
          repayCurrency: cur,
          repayBranch: originBranch,
          // hostname: JSON.parse(localStorage.getItem("userInfo")).id,
        },
        { headers }
      )
      .then(function (response) {
        if (response) {
          console.log("sucessssss");
          loanScheduleEnquiry();
        } else {
          console.log("FAILEDDDD");
        }

        async function loanScheduleEnquiry() {
          setLoad(true);
          await axios
            .post(
              API_SERVER + "/api/loan-schedule-enquiry",
              {
                facility_number: loanAppNo,
              },
              { headers }
            )
            .then(function (response) {
              setLoad(false);
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
                  <div style={{ textAlign: "right" }}>
                    {formatNumber(parsedPrincipal)}
                  </div>,
                  <div style={{ textAlign: "right" }}>
                    {formatNumber(parsedInterest)}
                  </div>,
                  <div style={{ textAlign: "right" }}>
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
                <div className="font-semibold" style={{ textAlign: "right" }}>
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        // disburseLoan();
      }
    });
  };

  const customLoader = <Loader size="xl" />;

  async function disburseLoan() {
    console.log(
      {
        action_v: "P",
        loanNumber: loanAppNo,
        effectiveDate: postingDate,
        origBranch: originBranch,
        facilityAmount: parseFloat(amt),
        tenor: parseFloat(tenor),
        loanProdCode: `5${prodType}`,
        interestRate: parseFloat(interestRate),
        loanCurrency: cur,
        postedBy: approvedBy,
        repaymentFrequency: repayFrequency,
        interestType: intType,
        channel: chann,
        customerNumber: customerNo,
        firstName: acctName,
        lastName: "",
        repayAccount: repaymentAcct,
        zoneCode: "",
        repayProdCode: `5${prodType}`,
        repayCurrency: cur,
        repayBranch: originBranch,
        hostname: JSON.parse(localStorage.getItem("userInfo")).id,
      },
      "datttttttt"
    );
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/baserec",
        {
          action_v: "Y",
          loanNumber: loanAppNo,
          effectiveDate: postingDate,
          origBranch: originBranch,
          facilityAmount: parseFloat(amt),
          tenor: parseFloat(tenor),
          loanProdCode: `5${prodType}`,
          interestRate: parseFloat(interestRate),
          loanCurrency: cur,
          postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
          repaymentFrequency: repayFrequency,
          interestType: intType,
          channel: chann,
          customerNumber: customerNo,
          firstName: firstNames,
          lastName: lastName,
          repayAccount: repaymentAcct,
          zoneCode: "",
          repayProdCode: prodType,
          repayCurrency: cur,
          repayBranch: originBranch,
          // hostname: JSON.parse(localStorage.getItem("userInfo")).id,
        },
        { headers }
      )
      .then(function (response) {
        setLoading(false);
        if (response.data?.responseCode === "998") {
          Swal.fire(response.data?.responseMessage, "", "success").then(
            (result) => {
              generateGrid();
              setDisbursementDetailsModal(false);
              setAuditModal(false);
            }
          );
        } else {
          Swal.fire(response.data?.responseMessage, "", "error");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Swal.fire(err);
      });
  }

  const generateGrid = () => {
    setLoad(true);
    axios
      .post(
        API_SERVER + "/api/get-disbursement-grid",
        {
          cust_name_v: customerName ? customerName.toUpperCase() : "",
          amt_v: amount?.replaceAll(",", ""),
          app_no_v: applicationNo ? applicationNo : "",
          channel_v: channel ? channel : "",
          approved_by_v: action ? action : "",
          branch_code_v: branch ? branch : "",
          facility_type_v: loanType ? loanType : "",
        },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          setLoad(false);
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.applicant_no,
              i.facility_type,
              i.curr,
              i.applicant_name,
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {formatNumber(parseFloat(i.amount))}
              </div>,
              i.no_of_tranches,
              i.branch_desc,
              <div style={{ textAlign: "center" }}>
                {formatDate(i.posting_sys_date)}
              </div>,
              i.channel,
              i.approved_by,
              <div
                onClick={() => {
                  getDisbursementDetails(i.applicant_no);
                  setDisbursementDetailsModal(true);
                }}
                className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 stroke-cyan-300 fill-gray-800"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>,
            ]);
          });
          setDat(arr);
          console.log(arr, "arrrrrrrr");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDisbursementDetails = (appNo) => {
    axios
      .post(
        API_SERVER + "/api/get-disbursement-details-fid",
        {
          loan_app_no: appNo,
        },
        { headers: headers }
      )
      .then(function (response) {
        axios
          .post(
            API_SERVER + "/api/get-risk-status",
            {
              customerNumber: response.data[0]?.customer_number,
            },
            { headers }
          )
          .then((res) => {
            // console.log(res, "riskkkkk");
            setPepStatus(res.data.pep_status);
            setRiskStatus(res.data.risk_status);
          });
        axios
          .post(
            API_SERVER + "/api/get-tranches-disbursed-fid",
            {
              loan_app_no: response.data[0]?.loan_app_no,
            },
            {
              headers,
            }
          )
          .then(function (response) {
            setTranchesDisbursed(response.data[0]?.tranche_disburesed);
          });
        axios
          .post(
            API_SERVER + "/api/get-tranches-due-fid",
            {
              loan_app_no: response.data[0]?.loan_app_no,
            },
            {
              headers,
            }
          )
          .then(function (response) {
            setTranchesDue(response.data[0]?.tranche_due);
          });
        axios
          .get(API_SERVER + "/api/get-loan-dates-fid", {
            headers,
          })
          .then(function (response) {
            setEffectiveDate(formatDate(response.data[0]?.eff_date));
            setReviewDate(formatDate(response.data[0]?.next_review_date));
          });
        setLoanAppNo(response.data[0]?.loan_app_no);
        setIntroSource(
          response.data[0]?.source_desc === "null"
            ? ""
            : response.data[0]?.source_desc
        );
        setDealer(
          response.data[0]?.dealer_desc === "null"
            ? ""
            : response.data[0]?.dealer_desc
        );
        setSector(
          response.data[0]?.sector_desc === "null"
            ? ""
            : response.data[0]?.sector_desc
        );
        setSubSector(
          response.data[0]?.sub_sector_desc === "null"
            ? ""
            : response.data[0]?.sub_sector_desc
        );
        setRelation(
          response.data[0]?.relation_officer === "null"
            ? ""
            : response.data[0]?.relation_officer
        );
        setFacilityNo(response.data[0]?.facility_no);
        setFacilityType(response.data[0]?.facility_type_desc);
        setCustomerNo(response.data[0]?.customer_number);
        setAcctName(response.data[0]?.acct_desc);
        setDisbursementAcct(response.data[0]?.loan_disb_acct);
        setRepaymentAcct(response.data[0]?.loan_repay_acct);
        setFacTypeCategory(response.data[0]?.loan_type_desc);
        setProductType(response.data[0]?.product_desc);
        setProdType(response.data[0]?.type_of_acct);
        setCur(response.data[0]?.currency);
        setApprovedBy(response.data[0]?.approved_by);
        setRepayFrequency(response.data[0]?.repayment_plan);
        setIntType(response.data[0]?.int_type);
        setAmt(response.data[0]?.request_amt);
        setChann(response.data[0]?.channel);
        setOriginBranch(response.data[0]?.origination_branch);
        setPostingDate(formatDate(response.data[0]?.posting_date));
        setRequestedAmount(
          response.data[0]?.request_amt
            ? formatNumber(parseFloat(response.data[0]?.request_amt))
            : ""
        );
        setAmountDue(
          response.data[0]?.amount
            ? formatNumber(parseFloat(response.data[0]?.amount))
            : ""
        );
        setDisbursedAccts(response.data[0]?.no_of_disb_ac);
        setTranches(response.data[0]?.no_of_tranches);
        setCreditGrade(response.data[0]?.credit_grade);
        setCreditScore(response.data[0]?.credit_score);
        setInterestRate(response.data[0]?.int_rate);
        setTenor(response.data[0]?.repnt_period_months);
        setInterestType(response.data[0]?.int_type_desc);
        setPrinRepayFrequency(response.data[0]?.frequency_desc);
        setIntRepayFrequency(response.data[0]?.repayment_plan_desc);
        setPrinCount(response.data[0]?.prin_pay_count);
        setIntCount(response.data[0]?.int_pay_count);
        setLastWorkingDay(response.data[0]?.last_day);
        setBalloonInstallment(response.data[0]?.ballon_installment);
        setMora(response.data[0]?.prin_morato);
        setWithInt(response.data[0]?.int_morato);
        setExemptMonth(response.data[0]?.exempt_month);
      })
      .catch((err) => {
        Swal.fire("Error");
        console.log(err);
      });
  };

  useEffect(() => {
    generateGrid();
  }, []);

  const handleAmountChange = (event) => {
    if (!event?.target?.value || /^\d*\.?\d*$/.test(event?.target?.value)) {
      const inputValue = event.target.value;
      setAmount(inputValue);
    }
  };

  function RequestAmountBlur(e) {
    if (!amount.includes(",")) {
      if (!(amount === "")) {
        setAmount(formatNumber(parseFloat(e?.target?.value)));
      }
    }
  }

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

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

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{ zoom: 0.85 }}>
      <div style={{ padding: "10px" }}>
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayOk={"none"}
          displayRefresh={"none"}
          displayReject={"none"}
          displayView={"none"}
          onExitClick={handleExitClick}
          onFetchClick={generateGrid}
        />
        <br />
        {/* <div className="font-bold text-green-400 text-lg mb-2 ">FILTERS</div> */}
        <div style={{ marginBottom: "5px" }}>
          <HeaderComponent title={"Search Criteria"} height={"35px"} />
        </div>
        <div
          style={{
            padding: "12px",
            border: "2.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
            display: "flex",
            // justifyContent: "space-evenly",
          }}
        >
          <div style={{ flex: 0.3 }}>
            <div>
              <InputField
                label={"Application Number"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                value={applicationNo}
                onChange={(e) => {
                  setApplicationNo(e.target.value);
                }}
                type={"number"}
              />
            </div>
            <div>
              <InputField
                label={"Applicant Name"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ flex: 0.3 }}>
            <div>
              <ListOfValue
                label={"Loan Type"}
                labelWidth={"20%"}
                inputWidth={"80%"}
                value={loanType}
                lovdata={loanTypeLov}
                onChange={(value) => {
                  setLoanType(value);
                }}
              />
            </div>
            <div>
              <ListOfValue
                label={"Branch"}
                labelWidth={"20%"}
                inputWidth={"80%"}
                value={branch}
                lovdata={branchLov}
                onChange={(value) => {
                  setBranch(value);
                }}
              />
            </div>
          </div>
          <div style={{ flex: 0.25 }}>
            <div>
              <ListOfValue
                label={"Channel"}
                labelWidth={"20%"}
                inputWidth={"70%"}
                value={channel}
                lovdata={channelLov}
                onChange={(value) => {
                  setChannel(value);
                }}
              />
            </div>
            <div>
              <InputField
                label={"Action By"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ flex: 0.15 }}>
            <div>
              <InputField
                label={"Amount >"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                value={amount}
                onChange={handleAmountChange}
                onBlur={(e) => {
                  RequestAmountBlur(e);
                }}
                onFocus={(e) => {
                  setAmount(amount?.replaceAll(",", ""));
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    RequestAmountBlur(e);
                  }
                }}
                textAlign={"right"}
              />
            </div>
          </div>
        </div>
        <br />
        <div style={{ marginBottom: "5px" }}>
          <HeaderComponent title={"F4 Facility Disbursement"} height={"35px"} />
        </div>
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", zoom: 0.95 }}
        >
          <CustomTable
            headers={[
              "#",
              "Application Number",
              "Loan Type",
              "Currency",
              "Applicant Name",
              "Requested Amount",
              "No of Tranches",
              "Source Branch",
              "Date",
              "Channel",
              "Posted By",
              "",
            ]}
            data={dat}
            loading={{
              status: load,
              message: "INF - GENERATING DATA ...",
            }}
            style={{
              columnAlignCenter: [1, 4, 7, 8, 10, 11, 12],
              headerAlignLeft: [2, 3, 5],
            }}
          />
        </div>
        <Modal
          opened={disbursementDetailsModal}
          size="85%"
          onClose={() => setDisbursementDetailsModal(false)}
          trapFocus="false"
          padding={
            loanScheduleModal || otherDetailsModal === true ? "0px" : "5px"
          }
          withCloseButton={false}
        >
          <div
            style={{
              zoom: "0.75",
              display:
                loanScheduleModal || otherDetailsModal === true
                  ? "none"
                  : "block",
            }}
            className="h-[1000px]"
          >
            <div style={{ marginBottom: "10px" }} className="sticky top-0 z-50">
              <HeaderComponent
                title="CREDIT DISBURSEMENT"
                backgroundColor={"#0063d1"}
                color={"white"}
                icon={<SiWebmoney size={20} />}
              />
            </div>
            <div>
              <ActionButtons
                displayCancel={"none"}
                displayDelete={"none"}
                displayHelp={"none"}
                displayOk={"none"}
                displayRefresh={"none"}
                displayNew={"none"}
                displayView={"none"}
                displayFetch={"none"}
                displayReject={"none"}
                onExitClick={() => {
                  handleClose();
                  setDisbursementDetailsModal(false);
                }}
                onAuthoriseClick={confirmApproval}
              />
            </div>
            <br />
            <div
              style={{
                display: "flex",
                padding: "10px",
                borderRadius: "5px",
                border: "2.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <InputField
                  label={"Application No"}
                  inputWidth={"60%"}
                  disabled
                  value={loanAppNo}
                  className="font-bold"
                />
              </div>
              <div>
                <InputField
                  label={"Pep Status"}
                  inputWidth={"60%"}
                  disabled
                  color={"red"}
                  inputColor={"red"}
                  value={pepStatus}
                  textAlign={"center"}
                  className="font-bold"
                />
              </div>
              <div>
                <InputField
                  label={"Risk Status"}
                  inputWidth={"60%"}
                  disabled
                  color={"red"}
                  inputColor={"red"}
                  textAlign={"center"}
                  value={riskStatus}
                  className="font-bold"
                />
              </div>
              <div>
                <InputField
                  label={"Facility No"}
                  inputWidth={"60%"}
                  disabled
                  value={facilityNo === "null" ? "" : facilityNo}
                />
              </div>
            </div>
            <br />
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 0.57 }}>
                <div style={{ marginBottom: "5px" }}>
                  <HeaderComponent title={"Loan Details"} />
                </div>
                <div
                  style={{
                    flex: 0.6,
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2.5px solid #d6d7d9",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.5 }}>
                      <div>
                        <InputField
                          label={"Facility type"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={facilityType}
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Customer Number"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={customerNo}
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Disbursement Account"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={disbursementAcct}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 0.5 }}>
                      <div>
                        <InputField
                          label={"Facility Type Category"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={facTypeCategory}
                        />
                      </div>
                      <div style={{ margin: "15px 0px" }}>
                        <InputField
                          inputWidth={"90%"}
                          disabled
                          value={acctName}
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Repayment Account"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={repaymentAcct}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2.5px solid #d6d7d9",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.5 }}>
                      <div>
                        <InputField
                          label={"Product Type"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={productType}
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Total Request Amount"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={requestedAmount}
                          textAlign={"right"}
                          className="font-bold"
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Total Amount Disb."}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={amountDisbursed}
                          textAlign={"right"}
                          className="font-bold"
                        />
                      </div>
                      <div>
                        <InputField
                          label={"Amount Due"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={amountDue}
                          textAlign={"right"}
                          className="font-bold"
                        />
                      </div>
                    </div>
                    <div style={{ flex: 0.5 }}>
                      <div>
                        <InputField
                          label={"No. Of Tranches"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={tranches}
                          textAlign={"right"}
                        />
                      </div>
                      <div>
                        <InputField
                          label={"No. Of Tranches Disb."}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={tranchesDisbursed}
                          textAlign={"right"}
                        />
                      </div>
                      <div>
                        <InputField
                          label={"No. Of Tranches Due"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={tranchesDue}
                          textAlign={"right"}
                        />
                      </div>
                      <div>
                        <InputField
                          label={"No. Of Disbursed A/Cs"}
                          inputWidth={"50%"}
                          labelWidth={"40%"}
                          disabled
                          value={disbursedAccts}
                          textAlign={"right"}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginRight: "8%",
                        }}
                      >
                        <ButtonComponent
                          label={"View A/Cs"}
                          buttonIcon={<MdAccountCircle size={20} />}
                          buttonWidth={"140px"}
                          buttonHeight={"33px"}
                          buttonBackgroundColor={"#0063d1"}
                          // onClick={() => {
                          //   setDisbursementDetailsModal(false);
                          // }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2.5px solid #d6d7d9",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  <div style={{ flex: 0.5 }}>
                    <div>
                      <InputField
                        label={"Loan Effective Date"}
                        inputWidth={"50%"}
                        labelWidth={"40%"}
                        disabled
                        value={effectiveDate}
                        textAlign={"center"}
                      />
                    </div>
                    <div>
                      <InputField
                        label={"Loan Account Number"}
                        inputWidth={"50%"}
                        labelWidth={"40%"}
                        disabled
                        value={loanAcct}
                      />
                    </div>
                  </div>
                  <div style={{ flex: 0.5 }}>
                    <div>
                      <InputField
                        label={"Next Review Date"}
                        inputWidth={"50%"}
                        labelWidth={"40%"}
                        disabled
                        value={reviewDate}
                        textAlign={"center"}
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div style={{ marginBottom: "5px" }}>
                  <HeaderComponent title={"Credit Score"} />
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2.5px solid #d6d7d9",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  <div style={{ flex: 0.4 }}>
                    <InputField
                      label={"Current Score"}
                      inputWidth={"40%"}
                      labelWidth={"52%"}
                      disabled
                      value={creditScore}
                      className="font-bold"
                      // inputColor={"red"}
                    />
                  </div>
                  <div style={{ flex: 0.3 }}>
                    <InputField
                      label={"Grade"}
                      inputWidth={"60%"}
                      // labelWidth={"40%"}
                      disabled
                      className="font-bold"
                      // value={creditGrade}
                      // inputColor={"red"}
                    />
                  </div>
                  <div
                    style={{
                      flex: 0.3,
                      marginTop: "12px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div style={{ marginRight: "8%" }}>
                      <ButtonComponent
                        label={"View Details"}
                        buttonIcon={<HiViewfinderCircle size={20} />}
                        buttonWidth={"160px"}
                        buttonHeight={"35px"}
                        buttonBackgroundColor={"#0063d1"}
                        // onClick={() => {
                        //   setDisbursementDetailsModal(false);
                        // }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ flex: 0.43 }}>
                <div style={{ marginBottom: "5px" }}>
                  <HeaderComponent title={"Loan Plan"} />
                </div>
                <div
                  style={{
                    flex: 0.4,
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2.5px solid #d6d7d9",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    backgroundColor: "#f6fbff",
                  }}
                >
                  <div style={{ display: "flex", marginBottom: "-16px" }}>
                    <div style={{ flex: 0.68 }}>
                      <InputField
                        label={"Interest Rate P.M / P.A"}
                        labelWidth={"55%"}
                        inputWidth={"35%"}
                        disabled
                        className="font-bold"
                        textAlign={"right"}
                        value={
                          interestRate ? (interestRate / tenor).toFixed(4) : ""
                        }
                      />
                    </div>
                    <div style={{ flex: 0.32, marginLeft: "-30px" }}>
                      <InputField
                        inputWidth={"65%"}
                        disabled
                        margin={"15px 0px"}
                        className="font-bold"
                        value={
                          interestRate
                            ? parseFloat(interestRate).toFixed(2)
                            : ""
                        }
                        textAlign={"right"}
                      />
                    </div>
                  </div>
                  <div>
                    <InputField
                      label={"Effective Interest Rate P.A"}
                      labelWidth={"38.7%"}
                      inputWidth={"24.5%"}
                      disabled
                      className="font-bold"
                      value={
                        interestRate ? parseFloat(interestRate).toFixed(2) : ""
                      }
                      textAlign={"right"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Tenor (In Months)"}
                      labelWidth={"38.7%"}
                      inputWidth={"24.5%"}
                      disabled
                      value={tenor}
                      textAlign={"center"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Interest Type"}
                      labelWidth={"38.7%"}
                      inputWidth={"52%"}
                      disabled
                      value={interestType}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Principal Repay. Frequency"}
                      labelWidth={"38.7%"}
                      inputWidth={"52%"}
                      disabled
                      value={prinRepayFrequency}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Interest Repay. Frequency"}
                      labelWidth={"38.7%"}
                      inputWidth={"52%"}
                      disabled
                      value={intRepayFrequency}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "-16px",
                      marginTop: "-15px",
                    }}
                  >
                    <div style={{ flex: 0.68 }}>
                      <InputField
                        label={"Prin. Count / Int. Count"}
                        labelWidth={"55%"}
                        inputWidth={"35%"}
                        disabled
                        value={prinCount}
                        textAlign={"center"}
                      />
                    </div>
                    <div style={{ flex: 0.32, marginLeft: "-30px" }}>
                      <InputField
                        inputWidth={"65%"}
                        disabled
                        margin={"15px 0px"}
                        value={intCount}
                        textAlign={"center"}
                      />
                    </div>
                  </div>
                  <div>
                    <SelectField
                      label={"Last Working Day"}
                      labelWidth={"38.7%"}
                      inputWidth={"24.5%"}
                      lovdata={[
                        { label: "YES", value: "Y" },
                        { label: "NO", value: "N" },
                      ]}
                      value={lastWorkingDay}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Balloon Installment"}
                      labelWidth={"38.7%"}
                      inputWidth={"24.5%"}
                      disabled
                      value={balloonInstallment}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Moratorium Period"}
                      labelWidth={"38.7%"}
                      inputWidth={"24.5%"}
                      disabled
                      value={mora}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"With Interest ?"}
                      labelWidth={"38.7%"}
                      inputWidth={"24.5%"}
                      disabled
                      value={
                        withInt === "N" ? "NO" : withInt === "Y" ? "YES" : ""
                      }
                    />
                  </div>
                  <div>
                    <SelectField
                      label={"Apply Month(s) Exemption"}
                      labelWidth={"38.7%"}
                      inputWidth={"24.5%"}
                      lovdata={[
                        { label: "YES", value: "Y" },
                        { label: "NO", value: "N" },
                      ]}
                      value={exemptMonth}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    <ButtonComponent
                      label={"Preview Schedule"}
                      buttonIcon={<HiClipboardDocumentList size={20} />}
                      buttonWidth={"200px"}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"#0063d1"}
                      onClick={() => {
                        postLoanSchedule();
                        setLoanScheduleModal(true);
                      }}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <div style={{ marginBottom: "5px" }}>
                    <HeaderComponent title={"View Other Details"} />
                  </div>
                </div>
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2.5px solid #d6d7d9",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <ButtonComponent
                        label={"Burrower"}
                        buttonIcon={<GiReceiveMoney size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        onClick={() => {
                          handleOpenModal("Burrower");
                        }}
                      />
                    </div>
                    <div>
                      <ButtonComponent
                        label={"Guarantor"}
                        buttonIcon={<BsFillPersonLinesFill size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        onClick={() => {
                          handleOpenModal("Guarantor");
                        }}
                      />
                    </div>
                    <div>
                      <ButtonComponent
                        label={"Financials"}
                        buttonIcon={<GiCash size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        onClick={() => {
                          handleOpenModal("Financials");
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <ButtonComponent
                        label={"Documents"}
                        buttonIcon={<IoDocumentText size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        onClick={() => {
                          handleOpenModal("Document");
                        }}
                      />
                    </div>
                    <div>
                      <ButtonComponent
                        label={"Bureau"}
                        buttonIcon={<BsBank2 size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        onClick={() => {
                          handleOpenModal("Bureau");
                        }}
                      />
                    </div>
                    <div>
                      <ButtonComponent
                        label={"Collateral"}
                        buttonIcon={<MdOutbond size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        onClick={() => {
                          handleOpenModal("Collateral");
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div>
                      <ButtonComponent
                        label={"Add Comment"}
                        buttonIcon={<AiOutlineComment size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        onClick={() => {
                          handleOpenModal("Comment");
                        }}
                      />
                    </div>
                    <div>
                      <ButtonComponent
                        label={"Tranches"}
                        buttonIcon={<GiPoolTriangle size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        onClick={() => {
                          if (tranches < 1) {
                            Swal.fire({
                              icon: "info",
                              title:
                                "INF - 17392: No tranches have been set up for this product",
                            });
                          }
                        }}
                      />
                    </div>
                    <div style={{ width: "165px" }}>
                      {/* <ButtonComponent
                        label={"Burrower Details"}
                        buttonIcon={<IoExit size={20} />}
                        buttonWidth={"165px"}
                        buttonHeight={"35px"}
                        // buttonBackgroundColor={"red"}
                        // onClick={() => {
                        //   setDisbursementDetailsModal(false);
                        // }}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          opened={loanScheduleModal}
          size={"43%"}
          padding={"10px"}
          withCloseButton={false}
        >
          <div className="h-[1000px]" style={{ zoom: 0.9 }}>
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
                  setLoanScheduleModal(false);
                  setData([]);
                }}
              />
            </div>
            <div style={{}} className="sticky top-0 z-50">
              <HeaderComponent
                title="LOAN REPAYMENT SCHEDULE"
                // backgroundColor={"#0063d1"}
                // color={"white"}
                icon={<SiWebmoney size={20} />}
              />
            </div>
            <div style={{ zoom: 0.9 }}>
              <CustomTable
                headers={[
                  "Seq No",
                  "Due Date",
                  "Principal",
                  "Interest",
                  "Total Payment",
                ]}
                style={{ headerAlignRight: [3, 4, 5] }}
                data={data}
                loading={{
                  status: load,
                  message: "INF - GENERATING SCHEDULE ...",
                }}
              />
            </div>
          </div>
        </Modal>
        <Modal
          opened={otherDetailsModal}
          size={"70%"}
          padding={"10px"}
          withCloseButton={false}
          onClose={() => setOtherDetailsModal(false)}
        >
          <div className="h-[1000px]" style={{ zoom: 0.9 }}>
            <div>
              {activeComponent === "Burrower" && (
                <Burrower
                  loanAppNo={loanAppNo}
                  setOtherDetailsModal={setOtherDetailsModal}
                  dealer={dealer}
                  sector={sector}
                  subSector={subSector}
                  introSource={introSource}
                  relation={relation}
                />
              )}
              {activeComponent === "Guarantor" && (
                <Guarantor setOtherDetailsModal={setOtherDetailsModal} />
              )}
              {activeComponent === "Financials" && (
                <Financials setOtherDetailsModal={setOtherDetailsModal} />
              )}
              {activeComponent === "Document" && (
                <Document setOtherDetailsModal={setOtherDetailsModal} />
              )}
              {activeComponent === "Collateral" && (
                <Collateral setOtherDetailsModal={setOtherDetailsModal} />
              )}
              {activeComponent === "Comment" && (
                <Comment setOtherDetailsModal={setOtherDetailsModal} />
              )}
              {activeComponent === "Bureau" && (
                <Bureau setOtherDetailsModal={setOtherDetailsModal} />
              )}
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
            <LoadingOverlay loader={customLoader} visible={loading} />
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
                  setAuditModal(false);
                }}
              />
            </div>
            <div style={{}} className="sticky top-0 z-50">
              <HeaderComponent
                title="Account Check's Notification"
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
                  value={
                    interestRate ? parseFloat(interestRate).toFixed(2) : ""
                  }
                  getChecked={rateCheck}
                  setCheckedProp={setRateCheck}
                />
                <CheckApp
                  label={"Loan Tenor Confirmed ?"}
                  value={tenor}
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
                  value={interestType}
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
                      disburseLoan();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CreditDisbursement;
