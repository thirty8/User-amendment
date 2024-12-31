// import React, { useState, useEffect, useRef } from "react";
// import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
// import Header from "../../../../components/others/Header/Header";
// import RadioButtons from "../../../../components/others/Fields/RadioButtons";
// import CustomTable from "../../../screens/control-setups/components/CustomTable";
// import InputField from "../../../../components/others/Fields/InputField";
// import ListOfValue from "../../../../components/others/Fields/ListOfValue";
// import SelectField from "../../../../components/others/Fields/SelectField";
// import { API_SERVER } from "../../../../config/constant";
// import axios from "axios";
// import { FiChevronRight } from "react-icons/fi";
// import { Modal, ScrollArea } from "@mantine/core";
// import LoanGeneralEnquiry from "./loan-general-enquiry";
// import coop from "../../../../assets/coop.png";
// import { GiSandsOfTime } from "react-icons/gi";
// import { FaCheckCircle } from "react-icons/fa";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// import { SiMicrosoftexcel } from "react-icons/si";
// import ButtonComponent from "../components/button/ButtonComponent";
// import HeaderComponent from "../components/header/HeaderComponent";
// import { IoExitOutline } from "react-icons/io5";
// import { AiFillPrinter } from "react-icons/ai";
// import { useReactToPrint } from "react-to-print";
// import { FaUserCheck } from "react-icons/fa";
// import { BsBank2 } from "react-icons/bs";
// import { IoFilterCircleSharp } from "react-icons/io5";
// import CustomTable2 from "../components/data-table/CustomTable";
// import { LoadingOverlay, Loader } from "@mantine/core";
// import NewLoanGeneralEnquiry from "./new-loan-general-enquiry";

// function FacilityEnquiry() {
//   //headers
//   const headers = {
//     "x-api-key":
//       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };

//   // table headers
//   var tableHeaders = [
//     "Facility A/C",
//     <div style={{ textAlign: "left" }}>Member Name</div>,
//     "Currency",
//     "Tenor",
//     "Effective Date",
//     "Expiry Date",
//     <div style={{ textAlign: "right" }}>Rate</div>,
//     <div style={{ textAlign: "right" }}>Amount Granted</div>,
//     <div style={{ textAlign: "right" }}>Facility Bal.</div>,
//     <div style={{ textAlign: "right" }}>Accrued Int.</div>,
//     <div style={{ textAlign: "right" }}>Accrued Pen.</div>,
//     <div style={{ textAlign: "left" }}>Class</div>,
//     <div style={{ textAlign: "left" }}>Status</div>,
//     "Action",
//   ];

//   // states
//   const [loading, setLoading] = useState(false);
//   const [dueLoading, setDueLoading] = useState(false);
//   const [disLoading, setDisLoading] = useState(false);
//   const [appLoading, setAppLoading] = useState(false);
//   const [byLoading, setByLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [customerNumber, setCustomerNumber] = useState("");
//   const [facilityAccount, setFacilityAccount] = useState("");
//   const [repaymentAccount, setRepaymentAccount] = useState("");
//   const [facilityTypeValue, setFacilityTypeValue] = useState("");
//   const [facilityStatusValue, setFacilityStatusValue] = useState("");
//   const [currencyValue, setCurrencyValue] = useState("");
//   const [effectiveDateFrom, setEffectiveDateFrom] = useState("");
//   const [effectiveDateTo, setEffectiveDateTo] = useState("");
//   const [disbursedDateFrom, setDisbursedDateFrom] = useState("");
//   const [disbursedDateTo, setDisbursedDateTo] = useState("");
//   const [expiryDateFrom, setExpiryDateFrom] = useState("");
//   const [expiryDateTo, setExpiryDateTo] = useState("");
//   const [amountGrantedBetweenFrom, setAmountGrantedBetweenFrom] = useState("");
//   const [amountGrantedBetweenTo, setAmountGrantedBetweenTo] = useState("");
//   const [loanEnquiryData, setLoanEnquiryData] = useState("");
//   const [selectedCustomerItem, setSelectedCustomerItem] = useState("");
//   const [showLoanGeneralEnquiry, setShowLoanGeneralEnquiry] = useState(false);
//   const [facilityDetails, setFacilityDetails] = useState({});
//   const [currrency, setCurrency] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [branchesValue, setBranchesValue] = useState("");
//   const [sector, setSector] = useState([]);
//   const [sectorValue, setSectorValue] = useState("");
//   const [ro, setRo] = useState([]);
//   const [roValue, setRoValue] = useState("");
//   const [product, setProduct] = useState([]);
//   const [productValue, setProductValue] = useState("");
//   const [acClassificationValue, setACClassificationValue] = useState("");
//   const [memberNames, setMemberNames] = useState([]);
//   const [memberNameValue, setMemberNameValue] = useState("");
//   const [memberNameValue0, setMemberNameValue0] = useState("");
//   const [customerNameBasedOnNumber, setCustomerNameBasedOnNumber] =
//     useState("");
//   const [intsus, setIntSus] = useState("");
//   const [pensus, setPenSus] = useState("");
//   const [backdate, setBackDate] = useState("");
//   const [cancelled, setCancelled] = useState("");
//   const [restructured, setRestructured] = useState("");
//   const [inArrears, setInArrears] = useState("");
//   const [withPenal, setWithPenal] = useState("");
//   const [expiredCheck, setExpiredCheck] = useState("");
//   const [classifiedCheck, setClassifiedCheck] = useState("");
//   const [arrearsInterest, setArrearsInterest] = useState("");
//   const [daysExpiryFrom, setDaysExpiryFrom] = useState("");
//   const [daysExpiryTo, setDaysExpiryTo] = useState("");
//   const [nextRepayFrom, setNextRepayFrom] = useState("");
//   const [nextRepayTo, setNextRepayTo] = useState("");
//   const [loansDueModal, setLoansDueModal] = useState();
//   const [loansDisbursedModal, setLoansDisbursedModal] = useState();
//   const [loansReportModal3, setLoansReportModal3] = useState();
//   const [loansReportModal4, setLoansReportModal4] = useState();
//   const [dat, setDat] = useState([]);
//   const [datt, setDatt] = useState([]);
//   const [data3, setData3] = useState([]);
//   const [data4, setData4] = useState([]);
//   const [filterBranch, setFilterBranch] = useState("");
//   const [filterBranchLov, setFilterBranchLov] = useState([]);
//   const [loansDueSd, setLoansDueSd] = useState("");
//   const [loansDueEd, setLoansDueEd] = useState("");
//   const [loansDisSd, setLoansDisSd] = useState("");
//   const [loansDisEd, setLoansDisEd] = useState("");
//   const [loansAppSd, setLoansAppSd] = useState("");
//   const [loansAppEd, setLoansAppEd] = useState("");

//   // useful functions
//   // date formatter
//   function formatDate(dateString) {
//     const date = new Date(dateString);

//     // Get individual parts of the date
//     const day = date.toLocaleString("en-GB", { day: "2-digit" });
//     const month = date
//       .toLocaleString("en-GB", { month: "short" })
//       .toUpperCase();
//     const year = date.toLocaleString("en-GB", { year: "numeric" });

//     // Combine the parts with hyphens
//     return `${day}-${month}-${year}`;
//   }

//   function getCurrentMonth() {
//     // Create a new Date object
//     const currentDate = new Date();

//     // Get the month name using toLocaleString
//     const monthName = currentDate.toLocaleString("default", { month: "long" });

//     return monthName;
//   }

//   var branch = JSON.parse(localStorage.getItem("userInfo")).branch;

//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   // list of values
//   useEffect(() => {
//     axios
//       .get(API_SERVER + "/api/get-contingent-branch-code", { headers })
//       .then(function (response) {
//         setFilterBranchLov(response.data);
//       })
//       .catch((err) => console.log(err));

//     axios
//       .get(API_SERVER + "/api/get-currency", { headers })
//       .then(function (response) {
//         setCurrency(response.data);
//       })
//       .catch((err) => console.log(err));

//     axios
//       .get(API_SERVER + "/api/get-all-branches", { headers })
//       .then(function (response) {
//         setBranches(response.data);
//       })
//       .catch((err) => console.log(err));

//     axios
//       .get(API_SERVER + "/api/loan-general-enquiry-get-sector", { headers })
//       .then(function (response) {
//         setSector(response.data);
//       })
//       .catch((err) => console.log(err));

//     axios
//       .get(API_SERVER + "/api/loan-general-enquiry-get-ro", { headers })
//       .then(function (response) {
//         setRo(response.data);
//       })
//       .catch((err) => console.log(err));

//     axios
//       .get(API_SERVER + "/api/loan-general-enquiry-get-product", { headers })
//       .then(function (response) {
//         setProduct(response.data);
//       })
//       .catch((err) => console.log(err));

//     axios
//       .get(API_SERVER + "/api/get-customer-name-and-number", { headers })
//       .then(function (response) {
//         setMemberNames(response.data);
//       })
//       .catch((err) => console.log(err));

//     fetchFacilityEnquiry();
//   }, []);

//   const numberBasedOnNumberAndName = () => {
//     axios
//       .post(
//         API_SERVER + "/api/get-customer-name-basedOn-Number",
//         { customer_number: customerNumber },
//         { headers }
//       )
//       .then(function (response) {
//         // setMemberNames(response.data);
//         setCustomerNameBasedOnNumber(response.data[0]?.name);
//         setMemberNameValue(response.data[0]?.name);
//       })
//       .catch((err) => console.log(err));
//   };

//   console.log(memberNameValue, "mnv");

//   // number formatter
//   function formatNumber(amount) {
//     const formattedAmount = amount.toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//     });

//     const amountWithoutCurrency = formattedAmount.replace("$", "");
//     return amountWithoutCurrency;
//   }

//   const handleDueDownload = () => {
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-due",
//         {
//           sd: loansDueSd ? formatDate(loansDueSd) : "",
//           ed: loansDueEd ? formatDate(loansDueEd) : "",
//         },
//         { headers }
//       )
//       .then((res) => {
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.facility_no,
//               i.customer_number,
//               i.customer_name,
//               i.principal_account,
//               {
//                 t: "n",
//                 v: parseFloat(i.principal_due),
//               },
//               {
//                 t: "n",
//                 v: parseFloat(i.interest_due),
//               },
//               {
//                 t: "n",
//                 v: parseFloat(i.total_amount),
//               },
//             ]);
//           });

//           const ws = XLSX.utils.aoa_to_sheet([
//             [
//               "#",
//               "Facility No",
//               "Customer Number",
//               "Customer Name",
//               "Principal Account",
//               "Principal Due",
//               "Interest Due",
//               "Total Amount",
//             ],
//             ...arr,
//           ]);
//           const wb = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(wb, ws, "Loans Due");

//           const excelFileName = "Loans_Due.xlsx";
//           XLSX.writeFile(wb, excelFileName);
//           saveAs(
//             new Blob([XLSX.write(wb, { bookType: "xlsx", type: "blob" })]),
//             excelFileName
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleDownload = () => {
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-disbursed",
//         {
//           sd: loansDisSd ? formatDate(loansDisSd) : "",
//           ed: loansDisEd ? formatDate(loansDisEd) : "",
//         },
//         { headers }
//       )
//       .then((res) => {
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.facility_no,
//               i.customer_number,
//               i.customer_name,
//               i.principal_account,
//               {
//                 t: "n",
//                 v: parseFloat(i.facility_amount),
//               },
//               { t: "s", v: new Date(i.approval_date).toLocaleDateString() }, // Convert date to string in desired format
//               i.bank_code === "null" ? "" : i.bank_code,
//               i.ben_acct === "null" ? "" : i.ben_acct,
//             ]);
//           });

//           const ws = XLSX.utils.aoa_to_sheet([
//             [
//               "#",
//               "Facility No",
//               "Customer Number",
//               "Customer Name",
//               "Principal Account",
//               "Facility Amount",
//               "Approval Date",
//               "Bank Code",
//               "Ben Acct",
//             ],
//             ...arr,
//           ]);
//           const wb = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(wb, ws, "Loans Disbursed");

//           const excelFileName = "Loans_Disbursed.xlsx";
//           XLSX.writeFile(wb, excelFileName);
//           saveAs(
//             new Blob([XLSX.write(wb, { bookType: "xlsx", type: "blob" })]),
//             excelFileName
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleApprovalDownload = () => {
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-report3",
//         {
//           sd: loansAppSd ? formatDate(loansAppSd) : "",
//           ed: loansAppEd ? formatDate(loansAppEd) : "",
//         },
//         { headers }
//       )
//       .then((res) => {
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.account_number,
//               i.beneficiary_name,
//               i.bank_code === "null" ? "" : i.bank_code,
//               i.beneficiary_account_no === "null"
//                 ? ""
//                 : i.beneficiary_account_no,
//               {
//                 t: "n",
//                 v: parseFloat(i.payment_amount),
//               },
//               i.transaction_type_code,
//               i.purpose_of_payment,
//               i.beneficiary_addr_line_1 === "null"
//                 ? ""
//                 : i.beneficiary_addr_line_1,
//               i.charge_type,
//               i.transaction_currency,
//               i.payment_type,
//             ]);
//           });

//           const ws = XLSX.utils.aoa_to_sheet([
//             [
//               "#",
//               "Account Number",
//               "Beneficiary Name",
//               "Bank Code",
//               "Beneficiary Account No",
//               "Payment Amount",
//               "Transaction Type Code",
//               "Purpose of Payment",
//               "Beneficiary Address",
//               "Charge Type",
//               "Currency",
//               "Payment Type",
//             ],
//             ...arr,
//           ]);
//           const wb = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(wb, ws, "Approved Loans");

//           const excelFileName = "Approved_Loans.xlsx";
//           XLSX.writeFile(wb, excelFileName);
//           saveAs(
//             new Blob([XLSX.write(wb, { bookType: "xlsx", type: "blob" })]),
//             excelFileName
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleByproductDownload = () => {
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-report44",
//         { branch_code: filterBranch },
//         { headers }
//       )
//       .then((res) => {
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.account_number,
//               i.name,
//               i.branch,
//               {
//                 t: "n",
//                 v: parseFloat(i.total_applied),
//               },
//               {
//                 t: "n",
//                 v: parseFloat(i.instal_without_int),
//               },
//               {
//                 t: "n",
//                 v: parseFloat(i.monthly_int),
//               },
//               {
//                 t: "n",
//                 v: parseFloat(i.interest),
//               },
//               {
//                 t: "n",
//                 v: parseFloat(i.principal),
//               },
//               {
//                 t: "n",
//                 v: parseFloat(i.amt_month),
//               },
//               i.duration,
//             ]);
//           });

//           const ws = XLSX.utils.aoa_to_sheet([
//             [
//               "#",
//               "Account Number",
//               "Member Name",
//               "Branch",
//               "Total",
//               "Installment",
//               "Monthly Interest",
//               "Interest",
//               "Principal",
//               "Monthly Amount",
//               "Duration",
//             ],
//             ...arr,
//           ]);
//           const wb = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(wb, ws, "Byproduct Report");

//           const excelFileName = "ByProduct.xlsx";
//           XLSX.writeFile(wb, excelFileName);
//           saveAs(
//             new Blob([XLSX.write(wb, { bookType: "xlsx", type: "blob" })]),
//             excelFileName
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const [defDue, setDefDue] = useState([]);
//   const [defDis, setDefDis] = useState([]);
//   const [defApp, setDefApp] = useState([]);
//   const [defBy, setDefBy] = useState([]);

//   useEffect(() => {
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-due",
//         { sd: loansDueSd, ed: loansDueEd },
//         { headers }
//       )
//       .then((res) => {
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.facility_no,
//               i.customer_number,
//               i.customer_name,
//               i.principal_account,
//               <div style={{ textAlign: "right" }}>
//                 {formatNumber(parseFloat(i.principal_due))}
//               </div>,
//               <div style={{ textAlign: "right" }}>
//                 {formatNumber(parseFloat(i.interest_due))}
//               </div>,
//               <div style={{ textAlign: "right" }}>
//                 {formatNumber(parseFloat(i.total_amount))}
//               </div>,
//             ]);
//           });
//           setDat(arr);
//           setDefDue(arr);
//         }
//         // console.log(formattedData, "callover");
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     /////////////////////////////////////

//     axios
//       .post(
//         API_SERVER + "/api/get-loans-disbursed",
//         { sd: loansDisSd, ed: loansDisEd },
//         { headers }
//       )
//       .then((res) => {
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.facility_no,
//               i.customer_number,
//               i.customer_name,
//               i.principal_account,
//               <div
//                 style={{
//                   textAlign: "right",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {formatNumber(parseFloat(i.facility_amount))}
//               </div>,
//               <div style={{}}>{formatDate(i.approval_date)}</div>,
//               i.bank_code === "null" ? "" : i.bank_code,
//               i.ben_acct === "null" ? "" : i.ben_acct,
//             ]);
//           });
//           setDatt(arr);
//           setDefDis(arr);
//         }
//         // console.log(formattedData, "callover");
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     /////////////////////////////////////////////

//     axios
//       .post(
//         API_SERVER + "/api/get-loans-report3",
//         { sd: loansAppSd, ed: loansAppEd },
//         { headers }
//       )
//       .then((res) => {
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.account_number,
//               i.beneficiary_name,
//               i.bank_code === "null" ? "" : i.bank_code,
//               i.beneficiary_account_no === "null"
//                 ? ""
//                 : i.beneficiary_account_no,
//               <div
//                 style={{
//                   textAlign: "right",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {formatNumber(parseFloat(i.payment_amount))}
//               </div>,
//               i.transaction_type_code,
//               i.purpose_of_payment,
//               i.beneficiary_addr_line_1 === "null"
//                 ? ""
//                 : i.beneficiary_addr_line_1,
//               i.charge_type,
//               i.transaction_currency,
//               i.payment_type,
//             ]);
//           });
//           setData3(arr);
//           setDefApp(arr);
//         }
//         // console.log(formattedData, "callover");
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     /////////////////////////////////////////////////////////////////////////////

//     axios
//       .get(API_SERVER + "/api/get-loans-report4", { headers })
//       .then((res) => {
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.account_number,
//               i.name,
//               i.branch,
//               <div>{formatNumber(parseFloat(i.total_applied))}</div>,
//               <div>{formatNumber(parseFloat(i.instal_without_int))}</div>,
//               <div>{formatNumber(parseFloat(i.monthly_int))}</div>,
//               <div>{formatNumber(parseFloat(i.interest))}</div>,
//               <div>{formatNumber(parseFloat(i.principal))}</div>,
//               <div>{formatNumber(parseFloat(i.amt_month))}</div>,
//               i.duration,
//             ]);
//           });
//           setData4(arr);
//           setDefBy(arr);
//         }
//         // console.log(formattedData, "callover");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   function handleFilter() {
//     setByLoading(true);
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-report44",
//         { branch_code: filterBranch },
//         { headers }
//       )
//       .then((res) => {
//         setByLoading(false);
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.account_number,
//               i.name,
//               i.branch,
//               <div>{formatNumber(parseFloat(i.total_applied))}</div>,
//               <div>{formatNumber(parseFloat(i.instal_without_int))}</div>,
//               <div>{formatNumber(parseFloat(i.monthly_int))}</div>,
//               <div>{formatNumber(parseFloat(i.interest))}</div>,
//               <div>{formatNumber(parseFloat(i.principal))}</div>,
//               <div>{formatNumber(parseFloat(i.amt_month))}</div>,
//               i.duration,
//             ]);
//           });
//           setData4(arr);
//         }
//         // console.log(formattedData, "callover");
//       })
//       .catch((err) => {
//         setByLoading(false);
//         console.log(err);
//       });
//   }

//   function handleDueFilter() {
//     setDueLoading(true);
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-due",
//         {
//           sd: loansDueSd ? formatDate(loansDueSd) : "",
//           ed: loansDueEd ? formatDate(loansDueEd) : "",
//         },
//         { headers }
//       )
//       .then((res) => {
//         setDueLoading(false);
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.facility_no,
//               i.customer_number,
//               i.customer_name,
//               i.principal_account,
//               <div
//                 style={{ textAlign: "right", color: "red", fontWeight: "bold" }}
//               >
//                 {formatNumber(parseFloat(i.principal_due))}
//               </div>,
//               <div
//                 style={{ textAlign: "right", color: "red", fontWeight: "bold" }}
//               >
//                 {formatNumber(parseFloat(i.interest_due))}
//               </div>,
//               <div style={{ textAlign: "right", fontWeight: "bold" }}>
//                 {formatNumber(parseFloat(i.total_amount))}
//               </div>,
//             ]);
//           });
//           setDat(arr);
//         }
//         // console.log(formattedData, "callover");
//       })
//       .catch((err) => {
//         setDueLoading(false);
//         console.log(err);
//       });
//   }

//   function handleDisFilter() {
//     setDisLoading(true);
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-disbursed",
//         {
//           sd: loansDisSd ? formatDate(loansDisSd) : "",
//           ed: loansDisEd ? formatDate(loansDisEd) : "",
//         },
//         { headers }
//       )
//       .then((res) => {
//         setDisLoading(false);
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.facility_no,
//               i.customer_number,
//               i.customer_name,
//               i.principal_account,
//               <div
//                 style={{
//                   textAlign: "right",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {formatNumber(parseFloat(i.facility_amount))}
//               </div>,
//               <div style={{}}>{formatDate(i.approval_date)}</div>,
//               i.bank_code === "null" ? "" : i.bank_code,
//               i.ben_acct === "null" ? "" : i.ben_acct,
//             ]);
//           });
//           setDatt(arr);
//         }
//         // console.log(formattedData, "callover");
//       })
//       .catch((err) => {
//         setDisLoading(false);
//         console.log(err);
//       });
//   }

//   function handleAppFilter() {
//     setAppLoading(true);
//     axios
//       .post(
//         API_SERVER + "/api/get-loans-report3",
//         {
//           sd: loansAppSd ? formatDate(loansAppSd) : "",
//           ed: loansAppEd ? formatDate(loansAppEd) : "",
//         },
//         { headers }
//       )
//       .then((res) => {
//         setAppLoading(false);
//         if (res.data) {
//           let arr = [];
//           res.data.map((i, index) => {
//             arr.push([
//               index + 1,
//               i.account_number,
//               i.beneficiary_name,
//               i.bank_code === "null" ? "" : i.bank_code,
//               i.beneficiary_account_no === "null"
//                 ? ""
//                 : i.beneficiary_account_no,
//               <div
//                 style={{
//                   textAlign: "right",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {formatNumber(parseFloat(i.payment_amount))}
//               </div>,
//               i.transaction_type_code,
//               i.purpose_of_payment,
//               i.beneficiary_addr_line_1 === "null"
//                 ? ""
//                 : i.beneficiary_addr_line_1,
//               i.charge_type,
//               i.transaction_currency,
//               i.payment_type,
//             ]);
//           });
//           setData3(arr);
//         }
//         // console.log(formattedData, "callover");
//       })
//       .catch((err) => {
//         setAppLoading(false);
//         console.log(err);
//       });
//   }

//   const customLoader = <Loader color="pink" size="lg" />;

//   // console outputs

//   //functions
//   const fetchFacilityEnquiry = () => {
//     setLoading(true);

//     axios
//       .post(
//         API_SERVER + "/api/loan-general-enquiry-fetch-data",
//         {
//           name: memberNameValue0,
//           branch: branchesValue,
//           customer_number: customerNumber,
//           currency_code: currencyValue,
//           facility_account: facilityAccount,
//           facility_type: facilityTypeValue,
//           effective_date_from:
//             formatDate(effectiveDateFrom) ===
//             "Invalid Date-INVALID DATE-Invalid Date"
//               ? ""
//               : formatDate(effectiveDateFrom),
//           effective_date_to:
//             formatDate(effectiveDateTo) ===
//             "Invalid Date-INVALID DATE-Invalid Date"
//               ? ""
//               : formatDate(effectiveDateTo),
//           disbursed_date_from:
//             formatDate(disbursedDateFrom) ===
//             "Invalid Date-INVALID DATE-Invalid Date"
//               ? ""
//               : formatDate(disbursedDateFrom),
//           disbursed_date_to:
//             formatDate(disbursedDateTo) ===
//             "Invalid Date-INVALID DATE-Invalid Date"
//               ? ""
//               : formatDate(disbursedDateTo),
//           expiry_date_from:
//             formatDate(expiryDateFrom) ===
//             "Invalid Date-INVALID DATE-Invalid Date"
//               ? ""
//               : formatDate(expiryDateFrom),
//           expiry_date_to:
//             formatDate(expiryDateTo) ===
//             "Invalid Date-INVALID DATE-Invalid Date"
//               ? ""
//               : formatDate(expiryDateTo),
//           amount_granted_between_from: amountGrantedBetweenFrom,
//           amount_granted_between_to: amountGrantedBetweenTo,
//           facility_status: facilityStatusValue,
//           repayment_account: repaymentAccount,
//           ac_class: acClassificationValue,
//           sect: sectorValue,
//           ro: roValue,
//           prod_code: productValue,
//           INTSUSP_CHK: intsus,
//           PENSUS_CHK: pensus,
//           BACKDATE_CHK: backdate,
//           CANCELLED_CHK: cancelled,
//           RESTRUCTURED_CHK: restructured,
//           inarrears_CHK: inArrears,
//           withpenal_CHK: withPenal,
//           EXPIRED_CHK: expiredCheck,
//           CLASSIFIED_CHK: classifiedCheck,
//           ARREARSINT_CHK: arrearsInterest,
//           days_expiry_from: daysExpiryFrom,
//           days_expiry_to: daysExpiryTo,
//         },
//         { headers: headers }
//       )
//       .then(function (response) {
//         setLoanEnquiryData(response.data, "loan data");
//         setLoading(false);
//       })
//       .catch((err) => console.log(err));
//   };

//   var ld = Array.isArray(loanEnquiryData)
//     ? loanEnquiryData?.map((i, key) => {
//         return [
//           <div>{i?.repayment_account}</div>,
//           <div style={{ textAlign: "left" }}>{i?.name}</div>,
//           <div>{i?.iso_code}</div>,
//           <div>{i?.tenor}</div>,
//           <div>{formatDate(i?.effective_date)}</div>,
//           <div>{formatDate(i?.expiry_date)}</div>,
//           <div style={{ textAlign: "right" }}>
//             {formatNumber(parseFloat(i?.interest_rate))}
//           </div>,
//           <div style={{ textAlign: "right" }}>
//             {formatNumber(parseFloat(i?.amount_granted))}
//           </div>,
//           <div style={{ textAlign: "right" }}>
//             {formatNumber(parseFloat(i?.loan_balance))}
//           </div>,
//           <div style={{ textAlign: "right" }}>
//             {formatNumber(parseFloat(i?.accrued_int))}
//           </div>,
//           <div style={{ textAlign: "right" }}>
//             {formatNumber(parseFloat(i?.accrued_penalty))}
//           </div>,
//           <div style={{ textAlign: "left" }}>{i?.class_descrp}</div>,
//           <div style={{ textAlign: "left" }}>{i?.loan_status_descrp}</div>,
//           <div className="flex justify-center">
//             <ButtonComponent
//               buttonHeight={"20px"}
//               buttonWidth={"40px"}
//               onClick={() => {
//                 setSelectedCustomerItem(i);
//                 setShowLoanGeneralEnquiry(true);
//                 setFacilityDetails({
//                   principal_account: loanEnquiryData[key].principal_account,
//                   facility_no: loanEnquiryData[key].facility_no,
//                   customer_no: loanEnquiryData[key].customer_no,
//                 });
//               }}
//               buttonIcon={<FiChevronRight size={20} />}
//             />
//           </div>,
//         ];
//       })
//     : [];

//   // HANDLE ON CLICK OF EXIT BUTTON
//   const handleExitClick = () => {
//     if (document.getElementById("exitBTN1")) {
//       const exitBTN = document.getElementById("exitBTN1");
//       const clickEvent = new MouseEvent("click", {
//         bubbles: true,
//         cancelable: true,
//         view: window,
//       });
//       exitBTN.dispatchEvent(clickEvent);
//     }
//   };

//   return (
//     <div style={{ marginBottom: "100px" }}>
//       <ActionButtons
//         onFetchClick={fetchFacilityEnquiry}
//         onRefreshClick={fetchFacilityEnquiry}
//         displayAuthorise={"none"}
//         displayCancel={"none"}
//         displayDelete={"none"}
//         displayHelp={"none"}
//         displayReject={"none"}
//         displayView={"none"}
//         displayOk={"none"}
//         onExitClick={() => {
//           handleExitClick();
//         }}
//         // displayRefresh={"none"}
//         onNewClick={() => {
//           setName("");
//           setCustomerNumber("");
//           setFacilityAccount("");
//           setFacilityTypeValue("");
//           setCurrencyValue("");
//           setEffectiveDateFrom("");
//           setEffectiveDateTo("");
//           setDisbursedDateFrom("");
//           setDisbursedDateTo("");
//           setExpiryDateFrom("");
//           setExpiryDateTo("");
//           setAmountGrantedBetweenFrom("");
//           setAmountGrantedBetweenTo("");
//           setBranchesValue("");
//           setSectorValue("");
//           setRoValue("");
//           setProductValue("");
//           setACClassificationValue("");
//           setEffectiveDateFrom("");
//           setEffectiveDateTo("");
//           setDisbursedDateFrom("");
//           setDisbursedDateTo("");
//           setExpiryDateFrom("");
//           setExpiryDateTo("");
//           setLoanEnquiryData([]);
//           setMemberNameValue("");
//           setIntSus("");
//           setPenSus("");
//           setBackDate("");
//           setCancelled("");
//           setRestructured("");
//           setInArrears("");
//           setWithPenal("");
//           setExpiredCheck("");
//           setClassifiedCheck("");
//           setArrearsInterest("");
//           setDaysExpiryFrom("");
//           setDaysExpiryTo("");
//           setMemberNameValue0("");
//         }}
//       />

//       {/* facility enquiry */}
//       <div>
//         <Header title="Facility Enquiry" headerShade={true} />

//         <div style={{ flex: 1, display: "flex", marginBottom: "10px" }}>
//           {/* customer details */}
//           <div
//             style={{
//               flex: 0.7,
//               marginTop: "5px",
//               marginRight: "5px",
//               paddingTop: "30px",
//             }}
//             className=" border-2 rounded py-2"
//           >
//             <div
//               style={{
//                 display: "flex",
//                 marginBottom: "15px",
//                 marginTop: "5px",
//               }}
//             >
//               <div style={{ width: "35%" }}>
//                 <InputField
//                   label="Member No."
//                   labelWidth="45.5%"
//                   inputWidth="46%"
//                   onChange={(e) => setCustomerNumber(e.target.value)}
//                   value={customerNumber}
//                   onBlur={numberBasedOnNumberAndName}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       numberBasedOnNumberAndName();
//                     }
//                   }}
//                 />
//               </div>

//               {memberNameValue !== "" ? (
//                 <div style={{ width: "65%" }}>
//                   <InputField
//                     label="Member Name"
//                     labelWidth="40%"
//                     inputWidth="55%"
//                     onChange={(e) => setMemberNameValue(e.target.value)}
//                     value={memberNameValue}
//                     // data={memberNames}
//                   />
//                 </div>
//               ) : (
//                 <div style={{ width: "65%" }}>
//                   <ListOfValue
//                     label="Member Name"
//                     labelWidth="40%"
//                     inputWidth="55%"
//                     onChange={(value) => setMemberNameValue0(value)}
//                     value={memberNameValue0}
//                     data={memberNames}
//                   />
//                 </div>
//               )}
//             </div>
//             {/* customer section */}
//             <div style={{ display: "flex", width: "100%" }}>
//               <div style={{ display: "flex", width: "70%" }}>
//                 <div className="space-y-4 px-2" style={{ width: "70%" }}>
//                   <ListOfValue
//                     label="Currency"
//                     labelWidth="50%"
//                     inputWidth="60%"
//                     data={currrency}
//                     onChange={(value) => setCurrencyValue(value)}
//                     value={currencyValue}
//                   />
//                   <InputField
//                     label="Effective Date"
//                     labelWidth="50%"
//                     inputWidth="60%"
//                     type="date"
//                     onChange={(e) => setEffectiveDateFrom(e.target.value)}
//                     value={effectiveDateFrom}
//                   />
//                   <InputField
//                     label="Disbursed Date"
//                     labelWidth="50%"
//                     inputWidth="60%"
//                     type="date"
//                     onChange={(e) => setDisbursedDateFrom(e.target.value)}
//                     value={disbursedDateFrom}
//                   />
//                   <InputField
//                     label="Expired Date"
//                     labelWidth="50%"
//                     inputWidth="60%"
//                     type="date"
//                     onChange={(e) => setExpiryDateFrom(e.target.value)}
//                     value={expiryDateFrom}
//                   />
//                   <InputField
//                     label="Amt Granted Between"
//                     labelWidth="50%"
//                     inputWidth="60%"
//                     textAlign={"right"}
//                     onChange={(e) =>
//                       setAmountGrantedBetweenFrom(e.target.value)
//                     }
//                     value={amountGrantedBetweenFrom}
//                   />
//                   <InputField
//                     label="Days to Exp. Betwn."
//                     labelWidth="50%"
//                     inputWidth="60%"
//                     onChange={(e) => setDaysExpiryFrom(e.target.value)}
//                   />
//                   <ListOfValue
//                     label="Product"
//                     labelWidth="50%"
//                     inputWidth="60%"
//                     data={product}
//                     onChange={(value) => setProductValue(value)}
//                     value={productValue}
//                   />
//                   {/* <InputField
//                     label="Days to Nxt Repay Betwn."
//                     labelWidth="50%"
//                     inputWidth="60%"
//                     onChange={(e) => setNextRepayFrom(e.target.value)}
//                   /> */}
//                 </div>

//                 <div className="space-y-4 px-2" style={{ width: "50%" }}>
//                   {/* <InputField inputWidth="100%" disabled /> */}
//                   <ListOfValue
//                     label="Branch"
//                     labelWidth="30%"
//                     inputWidth="70%"
//                     data={branches}
//                     onChange={(value) => setBranchesValue(value)}
//                     value={branchesValue}
//                   />
//                   <InputField
//                     label="To"
//                     labelWidth="30%"
//                     inputWidth="70%"
//                     type="date"
//                     onChange={(e) => setEffectiveDateTo(e.target.value)}
//                     value={effectiveDateTo}
//                   />
//                   <InputField
//                     label="To"
//                     labelWidth="30%"
//                     inputWidth="70%"
//                     type="date"
//                     onChange={(e) => setDisbursedDateTo(e.target.value)}
//                     value={disbursedDateTo}
//                   />
//                   <InputField
//                     label="To"
//                     labelWidth="30%"
//                     inputWidth="70%"
//                     type="date"
//                     onChange={(e) => setExpiryDateTo(e.target.value)}
//                     value={expiryDateTo}
//                   />
//                   <InputField
//                     label="And"
//                     labelWidth="30%"
//                     inputWidth="70%"
//                     onChange={(e) => setAmountGrantedBetweenTo(e.target.value)}
//                     value={amountGrantedBetweenTo}
//                   />
//                   <InputField
//                     label="And"
//                     labelWidth="30%"
//                     inputWidth="70%"
//                     onChange={(e) => setDaysExpiryTo(e.target.value)}
//                     value={daysExpiryTo}
//                   />
//                   {/* <InputField
//                     label="And"
//                     labelWidth="30%"
//                     inputWidth="70%"
//                     onChange={(e) => setNextRepayTo(e.target.value)}
//                   /> */}
//                 </div>
//               </div>

//               <div className="space-y-4" style={{ width: "40%" }}>
//                 {/* <InputField
//                   label="Customer Name"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   onChange={(e) => setName(e.target.value)}
//                   value={name}
//                 /> */}
//                 <SelectField
//                   label="Facility Type"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   data={[
//                     {
//                       label: "Loan",
//                       value: "LN",
//                     },
//                     {
//                       label: "Overdraft",
//                       value: "OD",
//                     },
//                   ]}
//                   onChange={(value) => {
//                     setFacilityTypeValue(value);
//                   }}
//                   value={facilityTypeValue}
//                 />
//                 <InputField
//                   label="Facility A/C"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   onChange={(e) => setFacilityAccount(e.target.value)}
//                   value={facilityAccount}
//                 />
//                 <InputField
//                   label="Repayment A/C"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   onChange={(e) => setRepaymentAccount(e.target.value)}
//                   value={repaymentAccount}
//                 />
//                 <SelectField
//                   label="Facility Status"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   data={[
//                     { value: "01", label: "Active Loans" },
//                     { value: "02", label: "Suspended Loans" },
//                     { value: "03", label: "Stopped Loans" },
//                   ]}
//                   onChange={(value) => setFacilityStatusValue(value)}
//                   value={facilityStatusValue}
//                 />
//                 <SelectField
//                   label="A/C Classification"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   data={[
//                     { value: "1", label: "Current" },
//                     { value: "2", label: "Olem" },
//                     { value: "3", label: "Sub standard" },
//                     { value: "4", label: "Doubtful" },
//                     { value: "5", label: "Loss" },
//                     { value: "", label: "" },
//                   ]}
//                   onChange={(value) => setACClassificationValue(value)}
//                   value={acClassificationValue}
//                 />
//                 <ListOfValue
//                   label="Sector"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   data={sector}
//                   onChange={(value) => setSectorValue(value)}
//                   value={sectorValue}
//                 />
//                 {/* <ListOfValue
//                   label="RO"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   data={ro}
//                   onChange={(value) => setRoValue(value)}
//                   value={roValue}
//                 /> */}
//                 {/* <ListOfValue
//                   label="Product"
//                   labelWidth="40%"
//                   inputWidth="50%"
//                   data={product}
//                   onChange={(value) => setProductValue(value)}
//                   value={productValue}
//                 /> */}
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 // marginRight: "25px",
//                 marginTop: "30px",
//                 gap: "30px",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   // justifyContent: "flex-end", // Align to the right
//                   // alignItems: "flex-start", // Align to the top
//                   position: "relative", // Required for absolute positioning
//                   // marginRight: "25px",
//                   // marginTop: "60px",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute", // Position absolute so it's positioned relative to the parent
//                     top: "-15px", // Adjust the top position based on your preference
//                     right: "-16px", // Adjust the right position based on your preference
//                     width: "30px", // Adjust the width based on your preference
//                     height: "30px", // Adjust the height based on your preference
//                     borderRadius: "50%", // Make it a circle
//                     backgroundColor: "#ea6a9b", // Red color
//                     zIndex: 1,
//                     color: "white",
//                     fontSize: "13px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {dat.length}
//                 </div>
//                 <ButtonComponent
//                   label={"All Loans Due"}
//                   buttonIcon={<GiSandsOfTime size={20} color="" />}
//                   buttonColor={"white"}
//                   buttonHeight={"36px"}
//                   buttonWidth={"145px"}
//                   buttonBackgroundColor={"#557be9"}
//                   onClick={() => {
//                     setLoansDueModal(true);
//                   }}
//                   // buttonBackgroundColor={"black"}
//                 />
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   // justifyContent: "flex-end", // Align to the right
//                   // alignItems: "flex-start", // Align to the top
//                   position: "relative", // Required for absolute positioning
//                   // marginRight: "25px",
//                   // marginTop: "60px",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute", // Position absolute so it's positioned relative to the parent
//                     top: "-15px", // Adjust the top position based on your preference
//                     right: "-16px", // Adjust the right position based on your preference
//                     width: "30px", // Adjust the width based on your preference
//                     height: "30px", // Adjust the height based on your preference
//                     borderRadius: "50%", // Make it a circle
//                     backgroundColor: "#ea6a9b", // Red color
//                     zIndex: 1,
//                     color: "white",
//                     fontSize: "13px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {datt.length}
//                 </div>
//                 <ButtonComponent
//                   label={"All Loans Disbursed"}
//                   buttonIcon={<FaCheckCircle size={20} color="" />}
//                   buttonColor={"white"}
//                   buttonHeight={"36px"}
//                   buttonWidth={"190px"}
//                   buttonBackgroundColor={"#557be9"}
//                   onClick={() => {
//                     setLoansDisbursedModal(true);
//                   }}
//                   // buttonBackgroundColor={"black"}
//                 />
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   // justifyContent: "flex-end", // Align to the right
//                   // alignItems: "flex-start", // Align to the top
//                   position: "relative", // Required for absolute positioning
//                   // marginRight: "25px",
//                   // marginTop: "60px",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute", // Position absolute so it's positioned relative to the parent
//                     top: "-15px", // Adjust the top position based on your preference
//                     right: "-16px", // Adjust the right position based on your preference
//                     width: "30px", // Adjust the width based on your preference
//                     height: "30px", // Adjust the height based on your preference
//                     borderRadius: "50%", // Make it a circle
//                     backgroundColor: "#ea6a9b", // Red color
//                     zIndex: 1,
//                     color: "white",
//                     fontSize: "13px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {data3.length}
//                 </div>
//                 <ButtonComponent
//                   label={"Approved Loans"}
//                   buttonIcon={<FaUserCheck size={20} color="" />}
//                   buttonColor={"white"}
//                   buttonHeight={"36px"}
//                   buttonWidth={"170px"}
//                   buttonBackgroundColor={"#557be9"}
//                   onClick={() => {
//                     setLoansReportModal3(true);
//                   }}
//                   // buttonBackgroundColor={"black"}
//                 />
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   // justifyContent: "flex-end", // Align to the right
//                   // alignItems: "flex-start", // Align to the top
//                   position: "relative", // Required for absolute positioning
//                   // marginRight: "25px",
//                   // marginTop: "60px",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute", // Position absolute so it's positioned relative to the parent
//                     top: "-15px", // Adjust the top position based on your preference
//                     right: "-16px", // Adjust the right position based on your preference
//                     width: "35px", // Adjust the width based on your preference
//                     height: "35px", // Adjust the height based on your preference
//                     borderRadius: "50%", // Make it a circle
//                     backgroundColor: "#ea6a9b", // Red color
//                     zIndex: 1,
//                     color: "white",
//                     fontSize: "13px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {data4.length}
//                 </div>
//                 <ButtonComponent
//                   label={"ByProduct"}
//                   buttonIcon={<BsBank2 size={20} color="" />}
//                   buttonColor={"white"}
//                   buttonHeight={"36px"}
//                   buttonWidth={"150px"}
//                   buttonBackgroundColor={"#557be9"}
//                   onClick={() => {
//                     setLoansReportModal4(true);
//                   }}
//                   // buttonBackgroundColor={"black"}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* interest section */}
//           <div style={{ flex: 0.3, marginTop: "5px" }}>
//             <Header title="Interests" headerShade={true} />
//             <div className="space-y-4 border-2 rounded py-9 px-2">
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"Interest Suspense"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"interest suspense"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={intsus === "Y"}
//                 checked2={intsus === "N"}
//                 checked3={intsus === ""}
//                 onChange={(e) => setIntSus(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"Penal in Suspense"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"penal in suspense"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={pensus === "Y"}
//                 checked2={pensus === "N"}
//                 checked3={pensus === ""}
//                 onChange={(e) => setPenSus(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"Backdated Loans"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"backdated loans"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={backdate === "Y"}
//                 checked2={backdate === "N"}
//                 checked3={backdate === ""}
//                 onChange={(e) => setBackDate(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"Cancelled"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"cancelled"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={cancelled === "Y"}
//                 checked2={cancelled === "N"}
//                 checked3={cancelled === ""}
//                 onChange={(e) => setCancelled(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"Restructured"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"restructured"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={restructured === "Y"}
//                 checked2={restructured === "N"}
//                 checked3={restructured === ""}
//                 onChange={(e) => setRestructured(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"In Arrears"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"in arrears"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={inArrears === "Y"}
//                 checked2={inArrears === "N"}
//                 checked3={inArrears === ""}
//                 onChange={(e) => setInArrears(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"With Penalty"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"with penalty"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={withPenal === "Y"}
//                 checked2={withPenal === "N"}
//                 checked3={withPenal === ""}
//                 onChange={(e) => setWithPenal(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"Expired"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"expired"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={expiredCheck === "Y"}
//                 checked2={expiredCheck === "N"}
//                 checked3={expiredCheck === ""}
//                 onChange={(e) => setExpiredCheck(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"Classified"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"classified"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={classifiedCheck === "Y"}
//                 checked2={classifiedCheck === "N"}
//                 checked3={classifiedCheck === ""}
//                 onChange={(e) => setClassifiedCheck(e.target.value)}
//               />
//               <RadioButtons
//                 labelWidth={"40%"}
//                 label={"Arrears Interest"}
//                 radioLabel={"Yes"}
//                 radioLabel2={"No"}
//                 radioLabel3={"All"}
//                 display={true}
//                 display2={true}
//                 display3={true}
//                 radioButtonsWidth={"50%"}
//                 name={"arrears interest"}
//                 value={"Y"}
//                 value2={"N"}
//                 value3={""}
//                 checked={arrearsInterest === "Y"}
//                 checked2={arrearsInterest === "N"}
//                 checked3={arrearsInterest === ""}
//                 onChange={(e) => setArrearsInterest(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* loan general enquiry */}
//         <Modal
//           size={"80%"}
//           opened={showLoanGeneralEnquiry}
//           padding={0}
//           withCloseButton={false}
//           onClose={() => {
//             setShowLoanGeneralEnquiry(false);
//           }}
//           trapFocus={false}
//           scrollAreaComponent={ScrollArea.Autosize}
//         >
//           <NewLoanGeneralEnquiry
//             facilityDetails={facilityDetails}
//             selectedCustomer={selectedCustomerItem}
//             closeModal={() => setShowLoanGeneralEnquiry(false)}
//           />
//         </Modal>

//         {/* data table */}
//         <Header title={"Enquiry Table"} headerShade={true} />
//         <div style={{ zoom: 0.98 }}>
//           <CustomTable
//             headers={tableHeaders}
//             data={ld}
//             rowsPerPage={10}
//             load={loading}
//             nopagination={true}
//           />
//           {/* )} */}

//           <Modal
//             opened={loansDueModal}
//             size="80%"
//             onClose={() => setLoansDueModal(false)}
//             trapFocus="false"
//             // padding={"10px"}
//             withCloseButton={false}
//             style={{ zoom: "0.85" }}
//           >
//             <div>
//               <HeaderComponent title="ALL LOANS DUE" />
//               <br />
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   // padding: "10px",
//                   // border: "2px solid #d6d7d9",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <div style={{}}>
//                   <ButtonComponent
//                     label={"Close"}
//                     buttonIcon={<IoExitOutline size={20} />}
//                     buttonWidth={"90px"}
//                     buttonHeight={"35px"}
//                     buttonBackgroundColor={"red"}
//                     onClick={() => {
//                       setDat(defDue);
//                       setLoansDueSd("");
//                       setLoansDueEd("");
//                       setLoansDueModal(false);
//                       // Due();
//                     }}
//                   />
//                 </div>
//                 <div style={{ display: "flex", gap: "20px" }}>
//                   <div style={{}}>
//                     <ButtonComponent
//                       label="Print"
//                       buttonWidth={"90px"}
//                       buttonIcon={<AiFillPrinter size={20} />}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"#0063d1"}
//                       onClick={handlePrint}
//                     />
//                   </div>
//                   <div style={{}}>
//                     <ButtonComponent
//                       label="Download Excel"
//                       buttonWidth={"160px"}
//                       buttonIcon={<SiMicrosoftexcel size={20} />}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"green"}
//                       onClick={handleDueDownload}
//                     />
//                   </div>
//                 </div>
//                 {/* <div></div> */}
//               </div>
//               <hr />
//               <br />
//               <div
//                 style={{
//                   padding: "10px",
//                   border: "2px solid #d6d7d9",
//                   // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//                   borderRadius: "5px",
//                   backgroundColor: "white",
//                   marginBottom: "30px",
//                 }}
//               >
//                 <div className="font-bold text-green-400 text-sm mb-3 ">
//                   FILTERS
//                 </div>
//                 {/* <hr className="mt-0 mb-3" /> */}
//                 <div style={{ display: "flex" }}>
//                   <div style={{ flex: 0.5 }}>
//                     <InputField
//                       type={"date"}
//                       label={"Start Date"}
//                       inputWidth={"30%"}
//                       value={loansDueSd}
//                       onChange={(e) => setLoansDueSd(e.target.value)}
//                     />
//                   </div>
//                   <div style={{ flex: 0.5 }}>
//                     <InputField
//                       type={"date"}
//                       label={"End Date"}
//                       inputWidth={"30%"}
//                       value={loansDueEd}
//                       onChange={(e) => setLoansDueEd(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <ButtonComponent
//                       label={"Filter"}
//                       buttonWidth={"100px"}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"black"}
//                       buttonIcon={<IoFilterCircleSharp size={20} />}
//                       onClick={handleDueFilter}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div ref={componentRef}>
//                 <div
//                   className="space-y-4"
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginBottom: "10px",
//                     // marginTop: "-40px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <div></div>
//                   <div className="space-y-2 mr-4">
//                     <br />
//                     <div style={{ display: "flex", justifyContent: "center" }}>
//                       <img
//                         src={coop}
//                         alt="Coop Tech"
//                         style={{ height: "80px" }}
//                       />
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "20px",
//                         fontWeight: "800",
//                       }}
//                     >
//                       COOPTECH
//                     </div>

//                     <div
//                       style={{
//                         fontSize: "15px",
//                         textDecoration: "capitalize",
//                         fontSize: "17px",
//                         fontWeight: "500",
//                       }}
//                     >
//                       Branch : {branch}
//                     </div>
//                     {/* <div style={{ fontSize: "15px" }}>
//                       Run Date:{" "}
//                       {formatDate(currentDate) ===
//                       "Invalid Date-INVALID DATE-Invalid Date"
//                         ? ""
//                         : formatDate(currentDate)}
//                     </div> */}

//                     <div
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: "700",
//                       }}
//                     >
//                       ALL <span style={{ color: "red" }}>{dat.length}</span>{" "}
//                       LOANS DUE
//                       {/* (
//                       <span style={{ color: "" }}>
//                         {getCurrentMonth().toUpperCase()}
//                       </span>
//                       ) */}
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ zoom: 0.85 }}>
//                   {/* <LoadingOverlay loader={customLoader} visible={dueLoading} /> */}
//                   <CustomTable2
//                     headers={[
//                       "#",
//                       "Facility Number",
//                       "Member ID",
//                       "Member Name",
//                       "Principal Account",
//                       "Principal Due",
//                       "Interest Due",
//                       "Total Amount",
//                     ]}
//                     data={dat}
//                     style={{ columnAlignCenter: [1, 2, 3, 4, 5] }}
//                     loading={{
//                       status: dueLoading,
//                       message: "INF - RETRIEVING DATA ...",
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Modal>

//           <Modal
//             opened={loansDisbursedModal}
//             size="80%"
//             onClose={() => setLoansDisbursedModal(false)}
//             trapFocus="false"
//             // padding={"10px"}
//             withCloseButton={false}
//             style={{ zoom: "0.85" }}
//           >
//             <div>
//               <HeaderComponent title="ALL LOANS DISBURSED" />
//               <br />
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   // padding: "10px",
//                   // border: "2px solid #d6d7d9",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <div style={{}}>
//                   <ButtonComponent
//                     label={"Close"}
//                     buttonIcon={<IoExitOutline size={20} />}
//                     buttonWidth={"90px"}
//                     buttonHeight={"35px"}
//                     buttonBackgroundColor={"red"}
//                     onClick={() => {
//                       setDatt(defDis);
//                       setLoansDisSd("");
//                       setLoansDisEd("");
//                       setLoansDisbursedModal(false);
//                     }}
//                   />
//                 </div>
//                 <div style={{ display: "flex", gap: "20px" }}>
//                   <div style={{}}>
//                     <ButtonComponent
//                       label="Print"
//                       buttonWidth={"90px"}
//                       buttonIcon={<AiFillPrinter size={20} />}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"#0063d1"}
//                       onClick={handlePrint}
//                     />
//                   </div>
//                   <div style={{}}>
//                     <ButtonComponent
//                       label="Download Excel"
//                       buttonWidth={"160px"}
//                       buttonIcon={<SiMicrosoftexcel size={20} />}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"green"}
//                       onClick={handleDownload}
//                     />
//                   </div>
//                 </div>
//                 {/* <div></div> */}
//               </div>
//               <hr />
//               <br />
//               <div
//                 style={{
//                   padding: "10px",
//                   border: "2px solid #d6d7d9",
//                   // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//                   borderRadius: "5px",
//                   backgroundColor: "white",
//                   marginBottom: "30px",
//                 }}
//               >
//                 <div className="font-bold text-green-400 text-sm mb-3 ">
//                   FILTERS
//                 </div>
//                 {/* <hr className="mt-0 mb-3" /> */}
//                 <div style={{ display: "flex" }}>
//                   <div style={{ flex: 0.5 }}>
//                     <InputField
//                       type={"date"}
//                       label={"Start Date"}
//                       inputWidth={"30%"}
//                       value={loansDisSd}
//                       onChange={(e) => setLoansDisSd(e.target.value)}
//                     />
//                   </div>
//                   <div style={{ flex: 0.5 }}>
//                     <InputField
//                       type={"date"}
//                       label={"End Date"}
//                       inputWidth={"30%"}
//                       value={loansDisEd}
//                       onChange={(e) => setLoansDisEd(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <ButtonComponent
//                       label={"Filter"}
//                       buttonWidth={"100px"}
//                       buttonHeight={"30px"}
//                       buttonBackgroundColor={"black"}
//                       buttonIcon={<IoFilterCircleSharp size={20} />}
//                       onClick={handleDisFilter}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div ref={componentRef}>
//                 <div
//                   className="space-y-4"
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginBottom: "10px",
//                     // marginTop: "-40px",
//                     textAlign: "center",
//                     // margin: "20px",
//                   }}
//                 >
//                   <div></div>
//                   <div className="space-y-2 mr-4">
//                     <div style={{ display: "flex", justifyContent: "center" }}>
//                       <img
//                         src={coop}
//                         alt="Coop Tech"
//                         style={{ height: "80px" }}
//                       />
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "20px",
//                         fontWeight: "800",
//                       }}
//                     >
//                       COOPTECH
//                     </div>

//                     <div
//                       style={{
//                         fontSize: "15px",
//                         textDecoration: "capitalize",
//                         fontSize: "17px",
//                         fontWeight: "500",
//                       }}
//                     >
//                       Branch : {branch}
//                     </div>
//                     {/* <div style={{ fontSize: "15px" }}>
//                       Run Date:{" "}
//                       {formatDate(currentDate) ===
//                       "Invalid Date-INVALID DATE-Invalid Date"
//                         ? ""
//                         : formatDate(currentDate)}
//                     </div> */}

//                     <div
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: "700",
//                       }}
//                     >
//                       ALL <span style={{}}>{datt.length}</span> LOANS DISBURSED
//                       {/* (
//                       <span style={{ color: "darkblue" }}>
//                         {getCurrentMonth().toUpperCase()}
//                       </span>
//                       ) */}
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ zoom: 0.85 }}>
//                   <LoadingOverlay loader={customLoader} visible={disLoading} />
//                   <CustomTable2
//                     // rowsPerPage={"1000"}
//                     headers={[
//                       "#",
//                       "Facility Number",
//                       "Member ID",
//                       "Member Name",
//                       "Principal Account",
//                       "Facility Amount",
//                       "Approval Date",
//                       "Bank Code",
//                       "Beneficiary Account",
//                     ]}
//                     data={datt}
//                     // pagination={true}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Modal>

//           <Modal
//             opened={loansReportModal3}
//             size="95%"
//             onClose={() => setLoansReportModal3(false)}
//             trapFocus="false"
//             // padding={"10px"}
//             withCloseButton={false}
//             style={{ zoom: "0.85" }}
//           >
//             <div>
//               <HeaderComponent title="ALL APPROVED LOANS" />
//               <br />
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   // padding: "10px",
//                   // border: "2px solid #d6d7d9",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <div style={{}}>
//                   <ButtonComponent
//                     label={"Close"}
//                     buttonIcon={<IoExitOutline size={20} />}
//                     buttonWidth={"90px"}
//                     buttonHeight={"35px"}
//                     buttonBackgroundColor={"red"}
//                     onClick={() => {
//                       setData3(defApp);
//                       setLoansAppSd("");
//                       setLoansAppEd("");
//                       setLoansReportModal3(false);
//                     }}
//                   />
//                 </div>
//                 <div style={{ display: "flex", gap: "20px" }}>
//                   <div style={{}}>
//                     <ButtonComponent
//                       label="Print"
//                       buttonWidth={"90px"}
//                       buttonIcon={<AiFillPrinter size={20} />}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"#0063d1"}
//                       onClick={handlePrint}
//                     />
//                   </div>
//                   <div style={{}}>
//                     <ButtonComponent
//                       label="Download Excel"
//                       buttonWidth={"160px"}
//                       buttonIcon={<SiMicrosoftexcel size={20} />}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"green"}
//                       onClick={handleApprovalDownload}
//                     />
//                   </div>
//                 </div>
//                 {/* <div></div> */}
//               </div>
//               <hr />
//               <br />
//               <div
//                 style={{
//                   padding: "10px",
//                   border: "2px solid #d6d7d9",
//                   // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//                   borderRadius: "5px",
//                   backgroundColor: "white",
//                   marginBottom: "30px",
//                 }}
//               >
//                 <div className="font-bold text-green-400 text-sm mb-3 ">
//                   FILTERS
//                 </div>
//                 {/* <hr className="mt-0 mb-3" /> */}
//                 <div style={{ display: "flex" }}>
//                   <div style={{ flex: 0.5 }}>
//                     <InputField
//                       type={"date"}
//                       label={"Start Date"}
//                       inputWidth={"30%"}
//                       value={loansAppSd}
//                       onChange={(e) => setLoansAppSd(e.target.value)}
//                     />
//                   </div>
//                   <div style={{ flex: 0.5 }}>
//                     <InputField
//                       type={"date"}
//                       label={"End Date"}
//                       inputWidth={"30%"}
//                       value={loansAppEd}
//                       onChange={(e) => setLoansAppEd(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <ButtonComponent
//                       label={"Filter"}
//                       buttonWidth={"100px"}
//                       buttonHeight={"30px"}
//                       buttonBackgroundColor={"black"}
//                       buttonIcon={<IoFilterCircleSharp size={20} />}
//                       onClick={handleAppFilter}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div ref={componentRef}>
//                 <div
//                   className="space-y-4"
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginBottom: "10px",
//                     // marginTop: "-40px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <div></div>
//                   <div className="space-y-2 mr-4">
//                     <div style={{ display: "flex", justifyContent: "center" }}>
//                       <img
//                         src={coop}
//                         alt="Coop Tech"
//                         style={{ height: "80px" }}
//                       />
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "20px",
//                         fontWeight: "800",
//                       }}
//                     >
//                       COOPTECH
//                     </div>

//                     <div
//                       style={{
//                         fontSize: "15px",
//                         textDecoration: "capitalize",
//                         fontSize: "17px",
//                         fontWeight: "500",
//                       }}
//                     >
//                       Branch : {branch}
//                     </div>
//                     {/* <div style={{ fontSize: "15px" }}>
//                       Run Date:{" "}
//                       {formatDate(currentDate) ===
//                       "Invalid Date-INVALID DATE-Invalid Date"
//                         ? ""
//                         : formatDate(currentDate)}
//                     </div> */}

//                     <div
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: "700",
//                       }}
//                     >
//                       ALL <span style={{}}>{data3.length}</span> APPROVED LOANS
//                       REPORT
//                       {/* (
//                       <span style={{ color: "darkblue" }}>
//                         {getCurrentMonth().toUpperCase()}
//                       </span>
//                       ) */}
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ zoom: 0.85 }}>
//                   <LoadingOverlay loader={customLoader} visible={appLoading} />
//                   <CustomTable2
//                     // rowsPerPage={"1000"}
//                     headers={[
//                       "#",
//                       "Account Number",
//                       "Beneficiary Name",
//                       "Bank Code",
//                       "Beneficiary Account No",
//                       "Payment Amount",
//                       "Transaction Type Code",
//                       "Purpose of Payment",
//                       "Beneficiary Address",
//                       "Charge Type",
//                       "Currency",
//                       "Payment Type",
//                     ]}
//                     data={data3}
//                     // pagination={true}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Modal>

//           <Modal
//             opened={loansReportModal4}
//             size="90%"
//             onClose={() => setLoansReportModal4(false)}
//             trapFocus="false"
//             // padding={"10px"}
//             withCloseButton={false}
//             style={{ zoom: "0.85" }}
//           >
//             <div>
//               <HeaderComponent title="BYPRODUCT REPORT" />
//               <br />
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   // padding: "10px",
//                   // border: "2px solid #d6d7d9",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <div style={{}}>
//                   <ButtonComponent
//                     label={"Close"}
//                     buttonIcon={<IoExitOutline size={20} />}
//                     buttonWidth={"90px"}
//                     buttonHeight={"35px"}
//                     buttonBackgroundColor={"red"}
//                     onClick={() => {
//                       setData4(defBy);
//                       setFilterBranch("");
//                       setLoansReportModal4(false);
//                     }}
//                   />
//                 </div>
//                 <div style={{ display: "flex", gap: "20px" }}>
//                   <div style={{}}>
//                     <ButtonComponent
//                       label="Print"
//                       buttonWidth={"90px"}
//                       buttonIcon={<AiFillPrinter size={20} />}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"#0063d1"}
//                       onClick={handlePrint}
//                     />
//                   </div>
//                   <div style={{}}>
//                     <ButtonComponent
//                       label="Download Excel"
//                       buttonWidth={"160px"}
//                       buttonIcon={<SiMicrosoftexcel size={20} />}
//                       buttonHeight={"35px"}
//                       buttonBackgroundColor={"green"}
//                       onClick={handleByproductDownload}
//                     />
//                   </div>
//                 </div>
//                 {/* <div></div> */}
//               </div>
//               <hr />
//               <br />
//               <div
//                 style={{
//                   padding: "10px",
//                   border: "2px solid #d6d7d9",
//                   // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//                   borderRadius: "5px",
//                   backgroundColor: "white",
//                   marginBottom: "30px",
//                 }}
//               >
//                 <div className="font-bold text-green-400 text-sm mb-3 ">
//                   FILTERS
//                 </div>
//                 {/* <hr className="mt-0 mb-3" /> */}
//                 <div>
//                   <ListOfValue
//                     label={"Branch Code"}
//                     inputWidth={"30%"}
//                     value={filterBranch}
//                     onChange={(value) => {
//                       setFilterBranch(value);
//                     }}
//                     data={filterBranchLov}
//                   />
//                 </div>
//                 <div className="flex justify-end">
//                   <ButtonComponent
//                     label={"Filter"}
//                     buttonWidth={"100px"}
//                     buttonHeight={"35px"}
//                     buttonBackgroundColor={"black"}
//                     buttonIcon={<IoFilterCircleSharp size={20} />}
//                     onClick={handleFilter}
//                   />
//                 </div>
//               </div>
//               <br />
//               <div ref={componentRef}>
//                 <div
//                   className="space-y-4"
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginBottom: "10px",
//                     // marginTop: "-40px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <div></div>
//                   <div className="space-y-2 mr-4">
//                     <div style={{ display: "flex", justifyContent: "center" }}>
//                       <img
//                         src={coop}
//                         alt="Coop Tech"
//                         style={{ height: "80px" }}
//                       />
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "20px",
//                         fontWeight: "800",
//                       }}
//                     >
//                       COOPTECH
//                     </div>

//                     <div
//                       style={{
//                         fontSize: "15px",
//                         textDecoration: "capitalize",
//                         fontSize: "17px",
//                         fontWeight: "500",
//                       }}
//                     >
//                       Branch : {branch}
//                     </div>
//                     {/* <div style={{ fontSize: "15px" }}>
//                       Run Date:{" "}
//                       {formatDate(currentDate) ===
//                       "Invalid Date-INVALID DATE-Invalid Date"
//                         ? ""
//                         : formatDate(currentDate)}
//                     </div> */}

//                     <div
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: "700",
//                       }}
//                     >
//                       BYPRODUCT REPORT
//                       {/* (
//                       <span style={{ color: "darkblue" }}>
//                         {getCurrentMonth().toUpperCase()}
//                       </span>
//                       ) */}
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ zoom: 0.85 }}>
//                   <LoadingOverlay loader={customLoader} visible={byLoading} />
//                   <CustomTable2
//                     // rowsPerPage={"100"}
//                     headers={[
//                       "#",
//                       "Account Number",
//                       "Member Name",
//                       "Branch",
//                       "Total",
//                       "Installment",
//                       "Monthly Interest",
//                       "Interest",
//                       "Principal",
//                       "Monthly Amount",
//                       "Duration",
//                     ]}
//                     data={data4}
//                     // pagination={true}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FacilityEnquiry;
import React, { useState, useEffect, useRef } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../components/others/Header/Header";
import RadioButtons from "../../../../components/others/Fields/RadioButtons";
import CustomTable from "../../../screens/control-setups/components/CustomTable";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../components/others/Fields/SelectField";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import { FiChevronRight } from "react-icons/fi";
import { Modal, ScrollArea } from "@mantine/core";
// import LoanGeneralEnquiry from "./loan-general-enquiry";
import coop from "../../../../assets/coop.png";
import { GiSandsOfTime } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import ButtonComponent from "../components/button/ButtonComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import { IoExitOutline } from "react-icons/io5";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { FaUserCheck } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { IoFilterCircleSharp } from "react-icons/io5";
import CustomTable2 from "../components/data-table/CustomTable";
import { LoadingOverlay, Loader } from "@mantine/core";
import NewLoanGeneralEnquiry from "./new-loan-general-enquiry";

function FacilityEnquiry() {
  //headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // table headers
  var tableHeaders = [
    "Facility A/C",
    <div style={{ textAlign: "left" }}>Member Name</div>,
    "Currency",
    "Tenor",
    "Effective Date",
    "Expiry Date",
    <div style={{ textAlign: "right" }}>Rate</div>,
    <div style={{ textAlign: "right" }}>Amount Granted</div>,
    <div style={{ textAlign: "right" }}>Facility Bal.</div>,
    <div style={{ textAlign: "right" }}>Accrued Int.</div>,
    <div style={{ textAlign: "right" }}>Accrued Pen.</div>,
    <div style={{ textAlign: "left" }}>Class</div>,
    <div style={{ textAlign: "left" }}>Status</div>,
    "Action",
  ];

  // states
  const [loading, setLoading] = useState(false);
  const [dueLoading, setDueLoading] = useState(false);
  const [disLoading, setDisLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(false);
  const [byLoading, setByLoading] = useState(false);
  const [name, setName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [facilityAccount, setFacilityAccount] = useState("");
  const [repaymentAccount, setRepaymentAccount] = useState("");
  const [facilityTypeValue, setFacilityTypeValue] = useState("");
  const [facilityStatusValue, setFacilityStatusValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("");
  const [effectiveDateFrom, setEffectiveDateFrom] = useState("");
  const [effectiveDateTo, setEffectiveDateTo] = useState("");
  const [disbursedDateFrom, setDisbursedDateFrom] = useState("");
  const [disbursedDateTo, setDisbursedDateTo] = useState("");
  const [expiryDateFrom, setExpiryDateFrom] = useState("");
  const [expiryDateTo, setExpiryDateTo] = useState("");
  const [amountGrantedBetweenFrom, setAmountGrantedBetweenFrom] = useState("");
  const [amountGrantedBetweenTo, setAmountGrantedBetweenTo] = useState("");
  const [loanEnquiryData, setLoanEnquiryData] = useState("");
  const [selectedCustomerItem, setSelectedCustomerItem] = useState("");
  const [showLoanGeneralEnquiry, setShowLoanGeneralEnquiry] = useState(false);
  const [facilityDetails, setFacilityDetails] = useState({});
  const [currrency, setCurrency] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchesValue, setBranchesValue] = useState("");
  const [sector, setSector] = useState([]);
  const [sectorValue, setSectorValue] = useState("");
  const [ro, setRo] = useState([]);
  const [roValue, setRoValue] = useState("");
  const [product, setProduct] = useState([]);
  const [productValue, setProductValue] = useState("");
  const [acClassificationValue, setACClassificationValue] = useState("");
  const [memberNames, setMemberNames] = useState([]);
  const [memberNameValue, setMemberNameValue] = useState("");
  const [memberNameValue0, setMemberNameValue0] = useState("");
  const [customerNameBasedOnNumber, setCustomerNameBasedOnNumber] =
    useState("");
  const [intsus, setIntSus] = useState("");
  const [pensus, setPenSus] = useState("");
  const [backdate, setBackDate] = useState("");
  const [cancelled, setCancelled] = useState("");
  const [restructured, setRestructured] = useState("");
  const [inArrears, setInArrears] = useState("");
  const [withPenal, setWithPenal] = useState("");
  const [expiredCheck, setExpiredCheck] = useState("");
  const [classifiedCheck, setClassifiedCheck] = useState("");
  const [arrearsInterest, setArrearsInterest] = useState("");
  const [daysExpiryFrom, setDaysExpiryFrom] = useState("");
  const [daysExpiryTo, setDaysExpiryTo] = useState("");
  const [nextRepayFrom, setNextRepayFrom] = useState("");
  const [nextRepayTo, setNextRepayTo] = useState("");
  const [loansDueModal, setLoansDueModal] = useState();
  const [loansDisbursedModal, setLoansDisbursedModal] = useState();
  const [loansReportModal3, setLoansReportModal3] = useState();
  const [loansReportModal4, setLoansReportModal4] = useState();
  const [dat, setDat] = useState([]);
  const [datt, setDatt] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [filterBranch, setFilterBranch] = useState("");
  const [filterBranchLov, setFilterBranchLov] = useState([]);
  const [loansDueSd, setLoansDueSd] = useState("");
  const [loansDueEd, setLoansDueEd] = useState("");
  const [loansDisSd, setLoansDisSd] = useState("");
  const [loansDisEd, setLoansDisEd] = useState("");
  const [loansAppSd, setLoansAppSd] = useState("");
  const [loansAppEd, setLoansAppEd] = useState("");

  // useful functions
  // date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get individual parts of the date
    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase();
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    // Combine the parts with hyphens
    return `${day}-${month}-${year}`;
  }

  function getCurrentMonth() {
    // Create a new Date object
    const currentDate = new Date();

    // Get the month name using toLocaleString
    const monthName = currentDate.toLocaleString("default", { month: "long" });

    return monthName;
  }

  var branch = JSON.parse(localStorage.getItem("userInfo")).branch;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // list of values
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/get-contingent-branch-code", { headers })
      .then(function (response) {
        setFilterBranchLov(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/get-currency", { headers })
      .then(function (response) {
        setCurrency(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/get-all-branches", { headers })
      .then(function (response) {
        setBranches(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/loan-general-enquiry-get-sector", { headers })
      .then(function (response) {
        setSector(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/loan-general-enquiry-get-ro", { headers })
      .then(function (response) {
        setRo(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/loan-general-enquiry-get-product", { headers })
      .then(function (response) {
        setProduct(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/get-customer-name-and-number", { headers })
      .then(function (response) {
        setMemberNames(response.data);
      })
      .catch((err) => console.log(err));

    fetchFacilityEnquiry();
  }, []);

  const numberBasedOnNumberAndName = () => {
    axios
      .post(
        API_SERVER + "/api/get-customer-name-basedOn-Number",
        { customer_number: customerNumber },
        { headers }
      )
      .then(function (response) {
        // setMemberNames(response.data);
        setCustomerNameBasedOnNumber(response.data[0]?.name);
        setMemberNameValue(response.data[0]?.name);
      })
      .catch((err) => console.log(err));
  };

  console.log(memberNameValue, "mnv");

  // number formatter
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const handleDueDownload = () => {
    axios
      .post(
        API_SERVER + "/api/get-loans-due",
        {
          sd: loansDueSd ? formatDate(loansDueSd) : "",
          ed: loansDueEd ? formatDate(loansDueEd) : "",
        },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.facility_no,
              i.customer_number,
              i.customer_name,
              i.principal_account,
              {
                t: "n",
                v: parseFloat(i.principal_due),
              },
              {
                t: "n",
                v: parseFloat(i.interest_due),
              },
              {
                t: "n",
                v: parseFloat(i.total_amount),
              },
            ]);
          });

          const ws = XLSX.utils.aoa_to_sheet([
            [
              "#",
              "Facility No",
              "Customer Number",
              "Customer Name",
              "Principal Account",
              "Principal Due",
              "Interest Due",
              "Total Amount",
            ],
            ...arr,
          ]);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Loans Due");

          const excelFileName = "Loans_Due.xlsx";
          XLSX.writeFile(wb, excelFileName);
          saveAs(
            new Blob([XLSX.write(wb, { bookType: "xlsx", type: "blob" })]),
            excelFileName
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDownload = () => {
    axios
      .post(
        API_SERVER + "/api/get-loans-disbursed",
        {
          sd: loansDisSd ? formatDate(loansDisSd) : "",
          ed: loansDisEd ? formatDate(loansDisEd) : "",
        },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.facility_no,
              i.customer_number,
              i.customer_name,
              i.principal_account,
              {
                t: "n",
                v: parseFloat(i.facility_amount),
              },
              { t: "s", v: new Date(i.approval_date).toLocaleDateString() }, // Convert date to string in desired format
              i.bank_code === "null" ? "" : i.bank_code,
              i.ben_acct === "null" ? "" : i.ben_acct,
            ]);
          });

          const ws = XLSX.utils.aoa_to_sheet([
            [
              "#",
              "Facility No",
              "Customer Number",
              "Customer Name",
              "Principal Account",
              "Facility Amount",
              "Approval Date",
              "Bank Code",
              "Ben Acct",
            ],
            ...arr,
          ]);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Loans Disbursed");

          const excelFileName = "Loans_Disbursed.xlsx";
          XLSX.writeFile(wb, excelFileName);
          saveAs(
            new Blob([XLSX.write(wb, { bookType: "xlsx", type: "blob" })]),
            excelFileName
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApprovalDownload = () => {
    axios
      .post(
        API_SERVER + "/api/get-loans-report3",
        {
          sd: loansAppSd ? formatDate(loansAppSd) : "",
          ed: loansAppEd ? formatDate(loansAppEd) : "",
        },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.account_number,
              i.beneficiary_name,
              i.bank_code === "null" ? "" : i.bank_code,
              i.beneficiary_account_no === "null"
                ? ""
                : i.beneficiary_account_no,
              {
                t: "n",
                v: parseFloat(i.payment_amount),
              },
              i.transaction_type_code,
              i.purpose_of_payment,
              i.beneficiary_addr_line_1 === "null"
                ? ""
                : i.beneficiary_addr_line_1,
              i.charge_type,
              i.transaction_currency,
              i.payment_type,
            ]);
          });

          const ws = XLSX.utils.aoa_to_sheet([
            [
              "#",
              "Account Number",
              "Beneficiary Name",
              "Bank Code",
              "Beneficiary Account No",
              "Payment Amount",
              "Transaction Type Code",
              "Purpose of Payment",
              "Beneficiary Address",
              "Charge Type",
              "Currency",
              "Payment Type",
            ],
            ...arr,
          ]);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Approved Loans");

          const excelFileName = "Approved_Loans.xlsx";
          XLSX.writeFile(wb, excelFileName);
          saveAs(
            new Blob([XLSX.write(wb, { bookType: "xlsx", type: "blob" })]),
            excelFileName
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleByproductDownload = () => {
    axios
      .post(
        API_SERVER + "/api/get-loans-report44",
        { branch_code: filterBranch },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.account_number,
              i.name,
              i.branch,
              {
                t: "n",
                v: parseFloat(i.total_applied),
              },
              {
                t: "n",
                v: parseFloat(i.instal_without_int),
              },
              {
                t: "n",
                v: parseFloat(i.monthly_int),
              },
              {
                t: "n",
                v: parseFloat(i.interest),
              },
              {
                t: "n",
                v: parseFloat(i.principal),
              },
              {
                t: "n",
                v: parseFloat(i.amt_month),
              },
              i.duration,
            ]);
          });

          const ws = XLSX.utils.aoa_to_sheet([
            [
              "#",
              "Account Number",
              "Member Name",
              "Branch",
              "Total",
              "Installment",
              "Monthly Interest",
              "Interest",
              "Principal",
              "Monthly Amount",
              "Duration",
            ],
            ...arr,
          ]);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Byproduct Report");

          const excelFileName = "ByProduct.xlsx";
          XLSX.writeFile(wb, excelFileName);
          saveAs(
            new Blob([XLSX.write(wb, { bookType: "xlsx", type: "blob" })]),
            excelFileName
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [defDue, setDefDue] = useState([]);
  const [defDis, setDefDis] = useState([]);
  const [defApp, setDefApp] = useState([]);
  const [defBy, setDefBy] = useState([]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-loans-due",
        { sd: loansDueSd, ed: loansDueEd },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.facility_no,
              i.customer_number,
              i.customer_name,
              i.principal_account,
              <div style={{ textAlign: "right" }}>
                {formatNumber(parseFloat(i.principal_due))}
              </div>,
              <div style={{ textAlign: "right" }}>
                {formatNumber(parseFloat(i.interest_due))}
              </div>,
              <div style={{ textAlign: "right" }}>
                {formatNumber(parseFloat(i.total_amount))}
              </div>,
            ]);
          });
          setDat(arr);
          setDefDue(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        console.log(err);
      });

    /////////////////////////////////////

    axios
      .post(
        API_SERVER + "/api/get-loans-disbursed",
        { sd: loansDisSd, ed: loansDisEd },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.facility_no,
              i.customer_number,
              i.customer_name,
              i.principal_account,
              <div
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(parseFloat(i.facility_amount))}
              </div>,
              <div style={{}}>{formatDate(i.approval_date)}</div>,
              i.bank_code === "null" ? "" : i.bank_code,
              i.ben_acct === "null" ? "" : i.ben_acct,
            ]);
          });
          setDatt(arr);
          setDefDis(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        console.log(err);
      });

    /////////////////////////////////////////////

    axios
      .post(
        API_SERVER + "/api/get-loans-report3",
        { sd: loansAppSd, ed: loansAppEd },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.account_number,
              i.beneficiary_name,
              i.bank_code === "null" ? "" : i.bank_code,
              i.beneficiary_account_no === "null"
                ? ""
                : i.beneficiary_account_no,
              <div
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(parseFloat(i.payment_amount))}
              </div>,
              i.transaction_type_code,
              i.purpose_of_payment,
              i.beneficiary_addr_line_1 === "null"
                ? ""
                : i.beneficiary_addr_line_1,
              i.charge_type,
              i.transaction_currency,
              i.payment_type,
            ]);
          });
          setData3(arr);
          setDefApp(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        console.log(err);
      });

    /////////////////////////////////////////////////////////////////////////////

    axios
      .get(API_SERVER + "/api/get-loans-report4", { headers })
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.account_number,
              i.name,
              i.branch,
              <div>{formatNumber(parseFloat(i.total_applied))}</div>,
              <div>{formatNumber(parseFloat(i.instal_without_int))}</div>,
              <div>{formatNumber(parseFloat(i.monthly_int))}</div>,
              <div>{formatNumber(parseFloat(i.interest))}</div>,
              <div>{formatNumber(parseFloat(i.principal))}</div>,
              <div>{formatNumber(parseFloat(i.amt_month))}</div>,
              i.duration,
            ]);
          });
          setData4(arr);
          setDefBy(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleFilter() {
    setByLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-loans-report44",
        { branch_code: filterBranch },
        { headers }
      )
      .then((res) => {
        setByLoading(false);
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.account_number,
              i.name,
              i.branch,
              <div>{formatNumber(parseFloat(i.total_applied))}</div>,
              <div>{formatNumber(parseFloat(i.instal_without_int))}</div>,
              <div>{formatNumber(parseFloat(i.monthly_int))}</div>,
              <div>{formatNumber(parseFloat(i.interest))}</div>,
              <div>{formatNumber(parseFloat(i.principal))}</div>,
              <div>{formatNumber(parseFloat(i.amt_month))}</div>,
              i.duration,
            ]);
          });
          setData4(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        setByLoading(false);
        console.log(err);
      });
  }

  function handleDueFilter() {
    setDueLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-loans-due",
        {
          sd: loansDueSd ? formatDate(loansDueSd) : "",
          ed: loansDueEd ? formatDate(loansDueEd) : "",
        },
        { headers }
      )
      .then((res) => {
        setDueLoading(false);
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.facility_no,
              i.customer_number,
              i.customer_name,
              i.principal_account,
              <div
                style={{ textAlign: "right", color: "red", fontWeight: "bold" }}
              >
                {formatNumber(parseFloat(i.principal_due))}
              </div>,
              <div
                style={{ textAlign: "right", color: "red", fontWeight: "bold" }}
              >
                {formatNumber(parseFloat(i.interest_due))}
              </div>,
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {formatNumber(parseFloat(i.total_amount))}
              </div>,
            ]);
          });
          setDat(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        setDueLoading(false);
        console.log(err);
      });
  }

  function handleDisFilter() {
    setDisLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-loans-disbursed",
        {
          sd: loansDisSd ? formatDate(loansDisSd) : "",
          ed: loansDisEd ? formatDate(loansDisEd) : "",
        },
        { headers }
      )
      .then((res) => {
        setDisLoading(false);
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.facility_no,
              i.customer_number,
              i.customer_name,
              i.principal_account,
              <div
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(parseFloat(i.facility_amount))}
              </div>,
              <div style={{}}>{formatDate(i.approval_date)}</div>,
              i.bank_code === "null" ? "" : i.bank_code,
              i.ben_acct === "null" ? "" : i.ben_acct,
            ]);
          });
          setDatt(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        setDisLoading(false);
        console.log(err);
      });
  }

  function handleAppFilter() {
    setAppLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-loans-report3",
        {
          sd: loansAppSd ? formatDate(loansAppSd) : "",
          ed: loansAppEd ? formatDate(loansAppEd) : "",
        },
        { headers }
      )
      .then((res) => {
        setAppLoading(false);
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.account_number,
              i.beneficiary_name,
              i.bank_code === "null" ? "" : i.bank_code,
              i.beneficiary_account_no === "null"
                ? ""
                : i.beneficiary_account_no,
              <div
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(parseFloat(i.payment_amount))}
              </div>,
              i.transaction_type_code,
              i.purpose_of_payment,
              i.beneficiary_addr_line_1 === "null"
                ? ""
                : i.beneficiary_addr_line_1,
              i.charge_type,
              i.transaction_currency,
              i.payment_type,
            ]);
          });
          setData3(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        setAppLoading(false);
        console.log(err);
      });
  }

  const customLoader = <Loader color="pink" size="lg" />;

  // console outputs

  //functions
  const fetchFacilityEnquiry = () => {
    setLoading(true);

    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-fetch-data",
        {
          name: memberNameValue0,
          branch: branchesValue,
          customer_number: customerNumber,
          currency_code: currencyValue,
          facility_account: facilityAccount,
          facility_type: facilityTypeValue,
          effective_date_from:
            formatDate(effectiveDateFrom) ===
            "Invalid Date-INVALID DATE-Invalid Date"
              ? ""
              : formatDate(effectiveDateFrom),
          effective_date_to:
            formatDate(effectiveDateTo) ===
            "Invalid Date-INVALID DATE-Invalid Date"
              ? ""
              : formatDate(effectiveDateTo),
          disbursed_date_from:
            formatDate(disbursedDateFrom) ===
            "Invalid Date-INVALID DATE-Invalid Date"
              ? ""
              : formatDate(disbursedDateFrom),
          disbursed_date_to:
            formatDate(disbursedDateTo) ===
            "Invalid Date-INVALID DATE-Invalid Date"
              ? ""
              : formatDate(disbursedDateTo),
          expiry_date_from:
            formatDate(expiryDateFrom) ===
            "Invalid Date-INVALID DATE-Invalid Date"
              ? ""
              : formatDate(expiryDateFrom),
          expiry_date_to:
            formatDate(expiryDateTo) ===
            "Invalid Date-INVALID DATE-Invalid Date"
              ? ""
              : formatDate(expiryDateTo),
          amount_granted_between_from: amountGrantedBetweenFrom,
          amount_granted_between_to: amountGrantedBetweenTo,
          facility_status: facilityStatusValue,
          repayment_account: repaymentAccount,
          ac_class: acClassificationValue,
          sect: sectorValue,
          ro: roValue,
          prod_code: productValue,
          INTSUSP_CHK: intsus,
          PENSUS_CHK: pensus,
          BACKDATE_CHK: backdate,
          CANCELLED_CHK: cancelled,
          RESTRUCTURED_CHK: restructured,
          inarrears_CHK: inArrears,
          withpenal_CHK: withPenal,
          EXPIRED_CHK: expiredCheck,
          CLASSIFIED_CHK: classifiedCheck,
          ARREARSINT_CHK: arrearsInterest,
          days_expiry_from: daysExpiryFrom,
          days_expiry_to: daysExpiryTo,
        },
        { headers: headers }
      )
      .then(function (response) {
        setLoanEnquiryData(response.data, "loan data");
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  var ld = Array.isArray(loanEnquiryData)
    ? loanEnquiryData?.map((i, key) => {
        return [
          <div style={{ textAlign: "left" }}>{i?.repayment_account}</div>,
          <div style={{ textAlign: "left" }}>{i?.name}</div>,
          <div>{i?.iso_code}</div>,
          <div>{i?.tenor}</div>,
          <div>{formatDate(i?.effective_date)}</div>,
          <div>{formatDate(i?.expiry_date)}</div>,
          <div style={{ textAlign: "right" }}>
            {formatNumber(parseFloat(i?.interest_rate))}
          </div>,
          <div style={{ textAlign: "right" }}>
            {formatNumber(parseFloat(i?.amount_granted))}
          </div>,
          <div style={{ textAlign: "right" }}>
            {formatNumber(parseFloat(i?.loan_balance))}
          </div>,
          <div style={{ textAlign: "right" }}>
            {formatNumber(parseFloat(i?.accrued_int))}
          </div>,
          <div style={{ textAlign: "right" }}>
            {formatNumber(parseFloat(i?.accrued_penalty))}
          </div>,
          <div style={{ textAlign: "left" }}>{i?.class_descrp}</div>,
          <div style={{ textAlign: "left" }}>{i?.loan_status_descrp}</div>,
          <div className="flex justify-center">
            <ButtonComponent
              buttonHeight={"20px"}
              buttonWidth={"40px"}
              onClick={() => {
                setSelectedCustomerItem(i);
                setShowLoanGeneralEnquiry(true);
                setFacilityDetails({
                  principal_account: loanEnquiryData[key].principal_account,
                  facility_no: loanEnquiryData[key].facility_no,
                  customer_no: loanEnquiryData[key].customer_no,
                });
              }}
              buttonIcon={<FiChevronRight size={20} />}
            />
          </div>,
        ];
      })
    : [];

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

  return (
    <div style={{ marginBottom: "100px" }}>
      <ActionButtons
        onFetchClick={fetchFacilityEnquiry}
        onRefreshClick={fetchFacilityEnquiry}
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayReject={"none"}
        displayView={"none"}
        displayOk={"none"}
        onExitClick={() => {
          handleExitClick();
        }}
        // displayRefresh={"none"}
        onNewClick={() => {
          setName("");
          setCustomerNumber("");
          setFacilityAccount("");
          setFacilityTypeValue("");
          setCurrencyValue("");
          setEffectiveDateFrom("");
          setEffectiveDateTo("");
          setDisbursedDateFrom("");
          setDisbursedDateTo("");
          setExpiryDateFrom("");
          setExpiryDateTo("");
          setAmountGrantedBetweenFrom("");
          setAmountGrantedBetweenTo("");
          setBranchesValue("");
          setSectorValue("");
          setRoValue("");
          setProductValue("");
          setACClassificationValue("");
          setEffectiveDateFrom("");
          setEffectiveDateTo("");
          setDisbursedDateFrom("");
          setDisbursedDateTo("");
          setExpiryDateFrom("");
          setExpiryDateTo("");
          setLoanEnquiryData([]);
          setMemberNameValue("");
          setIntSus("");
          setPenSus("");
          setBackDate("");
          setCancelled("");
          setRestructured("");
          setInArrears("");
          setWithPenal("");
          setExpiredCheck("");
          setClassifiedCheck("");
          setArrearsInterest("");
          setDaysExpiryFrom("");
          setDaysExpiryTo("");
          setMemberNameValue0("");
        }}
      />

      {/* facility enquiry */}
      <div>
        <Header title="Facility Enquiry" headerShade={true} />

        <div style={{ flex: 1, display: "flex", marginBottom: "10px" }}>
          {/* customer details */}
          <div
            style={{
              flex: 0.7,
              marginTop: "5px",
              marginRight: "5px",
              paddingTop: "30px",
            }}
            className=" border-2 rounded py-2"
          >
            <div
              style={{
                display: "flex",
                marginBottom: "15px",
                marginTop: "5px",
              }}
            >
              <div style={{ width: "35%" }}>
                <InputField
                  label="Member No."
                  labelWidth="45.5%"
                  inputWidth="35%"
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  value={customerNumber}
                  onBlur={numberBasedOnNumberAndName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      numberBasedOnNumberAndName();
                    }
                  }}
                />
              </div>

              {memberNameValue !== "" ? (
                <div style={{ width: "65%" }}>
                  <InputField
                    label="Member Name"
                    labelWidth="15%"
                    inputWidth="80%"
                    onChange={(e) => setMemberNameValue(e.target.value)}
                    value={memberNameValue}
                    // data={memberNames}
                  />
                </div>
              ) : (
                <div style={{ width: "65%" }}>
                  <ListOfValue
                    label="Member Name"
                    labelWidth="15%"
                    inputWidth="80%"
                    onChange={(value) => setMemberNameValue0(value)}
                    value={memberNameValue0}
                    data={memberNames}
                    whiteSpace
                  />
                </div>
              )}
            </div>
            {/* customer section */}
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ display: "flex", width: "70%" }}>
                <div className="space-y-4 px-2" style={{ width: "70%" }}>
                  <ListOfValue
                    label="Currency"
                    labelWidth="50%"
                    inputWidth="60%"
                    data={currrency}
                    onChange={(value) => setCurrencyValue(value)}
                    value={currencyValue}
                  />
                  <InputField
                    label="Effective Date"
                    labelWidth="50%"
                    inputWidth="60%"
                    type="date"
                    onChange={(e) => setEffectiveDateFrom(e.target.value)}
                    value={effectiveDateFrom}
                  />
                  <InputField
                    label="Disbursed Date"
                    labelWidth="50%"
                    inputWidth="60%"
                    type="date"
                    onChange={(e) => setDisbursedDateFrom(e.target.value)}
                    value={disbursedDateFrom}
                  />
                  <InputField
                    label="Expired Date"
                    labelWidth="50%"
                    inputWidth="60%"
                    type="date"
                    onChange={(e) => setExpiryDateFrom(e.target.value)}
                    value={expiryDateFrom}
                  />
                  <InputField
                    label="Amt Granted Between"
                    labelWidth="50%"
                    inputWidth="60%"
                    textAlign={"right"}
                    onChange={(e) =>
                      setAmountGrantedBetweenFrom(e.target.value)
                    }
                    value={amountGrantedBetweenFrom}
                  />
                  <InputField
                    label="Days to Exp. Betwn."
                    labelWidth="50%"
                    inputWidth="60%"
                    onChange={(e) => setDaysExpiryFrom(e.target.value)}
                  />
                  <ListOfValue
                    label="Product"
                    labelWidth="50%"
                    inputWidth="60%"
                    data={product}
                    onChange={(value) => setProductValue(value)}
                    value={productValue}
                  />
                  {/* <InputField
                    label="Days to Nxt Repay Betwn."
                    labelWidth="50%"
                    inputWidth="60%"
                    onChange={(e) => setNextRepayFrom(e.target.value)}
                  /> */}
                </div>

                <div className="space-y-4 px-2" style={{ width: "50%" }}>
                  {/* <InputField inputWidth="100%" disabled /> */}
                  <ListOfValue
                    label="Branch"
                    labelWidth="30%"
                    inputWidth="70%"
                    data={branches}
                    onChange={(value) => setBranchesValue(value)}
                    value={branchesValue}
                  />
                  <InputField
                    label="To"
                    labelWidth="30%"
                    inputWidth="70%"
                    type="date"
                    onChange={(e) => setEffectiveDateTo(e.target.value)}
                    value={effectiveDateTo}
                  />
                  <InputField
                    label="To"
                    labelWidth="30%"
                    inputWidth="70%"
                    type="date"
                    onChange={(e) => setDisbursedDateTo(e.target.value)}
                    value={disbursedDateTo}
                  />
                  <InputField
                    label="To"
                    labelWidth="30%"
                    inputWidth="70%"
                    type="date"
                    onChange={(e) => setExpiryDateTo(e.target.value)}
                    value={expiryDateTo}
                  />
                  <InputField
                    label="And"
                    labelWidth="30%"
                    inputWidth="70%"
                    onChange={(e) => setAmountGrantedBetweenTo(e.target.value)}
                    value={amountGrantedBetweenTo}
                  />
                  <InputField
                    label="And"
                    labelWidth="30%"
                    inputWidth="70%"
                    onChange={(e) => setDaysExpiryTo(e.target.value)}
                    value={daysExpiryTo}
                  />
                  {/* <InputField
                    label="And"
                    labelWidth="30%"
                    inputWidth="70%"
                    onChange={(e) => setNextRepayTo(e.target.value)}
                  /> */}
                </div>
              </div>

              <div className="space-y-4" style={{ width: "40%" }}>
                {/* <InputField
                  label="Customer Name"
                  labelWidth="40%"
                  inputWidth="50%"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                /> */}
                <SelectField
                  label="Facility Type"
                  labelWidth="40%"
                  inputWidth="50%"
                  data={[
                    {
                      label: "Loan",
                      value: "LN",
                    },
                    {
                      label: "Overdraft",
                      value: "OD",
                    },
                  ]}
                  onChange={(value) => {
                    setFacilityTypeValue(value);
                  }}
                  value={facilityTypeValue}
                />
                <InputField
                  label="Facility A/C"
                  labelWidth="40%"
                  inputWidth="50%"
                  onChange={(e) => setFacilityAccount(e.target.value)}
                  value={facilityAccount}
                />
                <InputField
                  label="Repayment A/C"
                  labelWidth="40%"
                  inputWidth="50%"
                  onChange={(e) => setRepaymentAccount(e.target.value)}
                  value={repaymentAccount}
                />
                <SelectField
                  label="Facility Status"
                  labelWidth="40%"
                  inputWidth="50%"
                  data={[
                    { value: "01", label: "Active Loans" },
                    { value: "02", label: "Suspended Loans" },
                    { value: "03", label: "Stopped Loans" },
                  ]}
                  onChange={(value) => setFacilityStatusValue(value)}
                  value={facilityStatusValue}
                />
                <SelectField
                  label="A/C Classification"
                  labelWidth="40%"
                  inputWidth="50%"
                  data={[
                    { value: "1", label: "Current" },
                    { value: "2", label: "Olem" },
                    { value: "3", label: "Sub standard" },
                    { value: "4", label: "Doubtful" },
                    { value: "5", label: "Loss" },
                    { value: "", label: "" },
                  ]}
                  onChange={(value) => setACClassificationValue(value)}
                  value={acClassificationValue}
                />
                <ListOfValue
                  label="Sector"
                  labelWidth="40%"
                  inputWidth="50%"
                  data={sector}
                  onChange={(value) => setSectorValue(value)}
                  value={sectorValue}
                />
                {/* <ListOfValue
                  label="RO"
                  labelWidth="40%"
                  inputWidth="50%"
                  data={ro}
                  onChange={(value) => setRoValue(value)}
                  value={roValue}
                /> */}
                {/* <ListOfValue
                  label="Product"
                  labelWidth="40%"
                  inputWidth="50%"
                  data={product}
                  onChange={(value) => setProductValue(value)}
                  value={productValue}
                /> */}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                // marginRight: "25px",
                marginTop: "30px",
                gap: "30px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // justifyContent: "flex-end", // Align to the right
                  // alignItems: "flex-start", // Align to the top
                  position: "relative", // Required for absolute positioning
                  // marginRight: "25px",
                  // marginTop: "60px",
                }}
              >
                <div
                  style={{
                    position: "absolute", // Position absolute so it's positioned relative to the parent
                    top: "-15px", // Adjust the top position based on your preference
                    right: "-16px", // Adjust the right position based on your preference
                    width: "30px", // Adjust the width based on your preference
                    height: "30px", // Adjust the height based on your preference
                    borderRadius: "50%", // Make it a circle
                    backgroundColor: "#ea6a9b", // Red color
                    zIndex: 1,
                    color: "white",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  {dat.length}
                </div>
                <ButtonComponent
                  label={"All Loans Due"}
                  buttonIcon={<GiSandsOfTime size={20} color="" />}
                  buttonColor={"white"}
                  buttonHeight={"36px"}
                  buttonWidth={"145px"}
                  buttonBackgroundColor={"#557be9"}
                  onClick={() => {
                    setLoansDueModal(true);
                  }}
                  // buttonBackgroundColor={"black"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "flex-end", // Align to the right
                  // alignItems: "flex-start", // Align to the top
                  position: "relative", // Required for absolute positioning
                  // marginRight: "25px",
                  // marginTop: "60px",
                }}
              >
                <div
                  style={{
                    position: "absolute", // Position absolute so it's positioned relative to the parent
                    top: "-15px", // Adjust the top position based on your preference
                    right: "-16px", // Adjust the right position based on your preference
                    width: "30px", // Adjust the width based on your preference
                    height: "30px", // Adjust the height based on your preference
                    borderRadius: "50%", // Make it a circle
                    backgroundColor: "#ea6a9b", // Red color
                    zIndex: 1,
                    color: "white",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  {datt.length}
                </div>
                <ButtonComponent
                  label={"All Loans Disbursed"}
                  buttonIcon={<FaCheckCircle size={20} color="" />}
                  buttonColor={"white"}
                  buttonHeight={"36px"}
                  buttonWidth={"190px"}
                  buttonBackgroundColor={"#557be9"}
                  onClick={() => {
                    setLoansDisbursedModal(true);
                  }}
                  // buttonBackgroundColor={"black"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "flex-end", // Align to the right
                  // alignItems: "flex-start", // Align to the top
                  position: "relative", // Required for absolute positioning
                  // marginRight: "25px",
                  // marginTop: "60px",
                }}
              >
                <div
                  style={{
                    position: "absolute", // Position absolute so it's positioned relative to the parent
                    top: "-15px", // Adjust the top position based on your preference
                    right: "-16px", // Adjust the right position based on your preference
                    width: "30px", // Adjust the width based on your preference
                    height: "30px", // Adjust the height based on your preference
                    borderRadius: "50%", // Make it a circle
                    backgroundColor: "#ea6a9b", // Red color
                    zIndex: 1,
                    color: "white",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  {data3.length}
                </div>
                <ButtonComponent
                  label={"Approved Loans"}
                  buttonIcon={<FaUserCheck size={20} color="" />}
                  buttonColor={"white"}
                  buttonHeight={"36px"}
                  buttonWidth={"170px"}
                  buttonBackgroundColor={"#557be9"}
                  onClick={() => {
                    setLoansReportModal3(true);
                  }}
                  // buttonBackgroundColor={"black"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "flex-end", // Align to the right
                  // alignItems: "flex-start", // Align to the top
                  position: "relative", // Required for absolute positioning
                  // marginRight: "25px",
                  // marginTop: "60px",
                }}
              >
                <div
                  style={{
                    position: "absolute", // Position absolute so it's positioned relative to the parent
                    top: "-15px", // Adjust the top position based on your preference
                    right: "-16px", // Adjust the right position based on your preference
                    width: "35px", // Adjust the width based on your preference
                    height: "35px", // Adjust the height based on your preference
                    borderRadius: "50%", // Make it a circle
                    backgroundColor: "#ea6a9b", // Red color
                    zIndex: 1,
                    color: "white",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  {data4.length}
                </div>
                <ButtonComponent
                  label={"ByProduct"}
                  buttonIcon={<BsBank2 size={20} color="" />}
                  buttonColor={"white"}
                  buttonHeight={"36px"}
                  buttonWidth={"150px"}
                  buttonBackgroundColor={"#557be9"}
                  onClick={() => {
                    setLoansReportModal4(true);
                  }}
                  // buttonBackgroundColor={"black"}
                />
              </div>
            </div>
          </div>

          {/* interest section */}
          <div style={{ flex: 0.3, marginTop: "5px" }}>
            <Header title="Interests" headerShade={true} />
            <div className="space-y-4 border-2 rounded py-9 px-2">
              <RadioButtons
                labelWidth={"40%"}
                label={"Interest Suspense"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"interest suspense"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={intsus === "Y"}
                checked2={intsus === "N"}
                checked3={intsus === ""}
                onChange={(e) => setIntSus(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"Penal in Suspense"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"penal in suspense"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={pensus === "Y"}
                checked2={pensus === "N"}
                checked3={pensus === ""}
                onChange={(e) => setPenSus(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"Backdated Loans"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"backdated loans"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={backdate === "Y"}
                checked2={backdate === "N"}
                checked3={backdate === ""}
                onChange={(e) => setBackDate(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"Cancelled"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"cancelled"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={cancelled === "Y"}
                checked2={cancelled === "N"}
                checked3={cancelled === ""}
                onChange={(e) => setCancelled(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"Restructured"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"restructured"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={restructured === "Y"}
                checked2={restructured === "N"}
                checked3={restructured === ""}
                onChange={(e) => setRestructured(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"In Arrears"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"in arrears"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={inArrears === "Y"}
                checked2={inArrears === "N"}
                checked3={inArrears === ""}
                onChange={(e) => setInArrears(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"With Penalty"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"with penalty"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={withPenal === "Y"}
                checked2={withPenal === "N"}
                checked3={withPenal === ""}
                onChange={(e) => setWithPenal(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"Expired"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"expired"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={expiredCheck === "Y"}
                checked2={expiredCheck === "N"}
                checked3={expiredCheck === ""}
                onChange={(e) => setExpiredCheck(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"Classified"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"classified"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={classifiedCheck === "Y"}
                checked2={classifiedCheck === "N"}
                checked3={classifiedCheck === ""}
                onChange={(e) => setClassifiedCheck(e.target.value)}
              />
              <RadioButtons
                labelWidth={"40%"}
                label={"Arrears Interest"}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioLabel3={"All"}
                display={true}
                display2={true}
                display3={true}
                radioButtonsWidth={"50%"}
                name={"arrears interest"}
                value={"Y"}
                value2={"N"}
                value3={""}
                checked={arrearsInterest === "Y"}
                checked2={arrearsInterest === "N"}
                checked3={arrearsInterest === ""}
                onChange={(e) => setArrearsInterest(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* loan general enquiry */}
        <Modal
          size={"80%"}
          opened={showLoanGeneralEnquiry}
          padding={0}
          withCloseButton={false}
          onClose={() => {
            setShowLoanGeneralEnquiry(false);
          }}
          trapFocus={false}
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <NewLoanGeneralEnquiry
            facilityDetails={facilityDetails}
            selectedCustomer={selectedCustomerItem}
            closeModal={() => setShowLoanGeneralEnquiry(false)}
          />
        </Modal>

        {/* data table */}
        <Header title={"Enquiry Table"} headerShade={true} />
        <div style={{ zoom: 0.98 }}>
          <CustomTable
            headers={tableHeaders}
            data={ld}
            rowsPerPage={10}
            load={loading}
            nopagination={true}
          />
          {/* )} */}

          <Modal
            opened={loansDueModal}
            size="80%"
            onClose={() => setLoansDueModal(false)}
            trapFocus="false"
            // padding={"10px"}
            withCloseButton={false}
            style={{ zoom: "0.85" }}
          >
            <div>
              <HeaderComponent title="ALL LOANS DUE" />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // padding: "10px",
                  // border: "2px solid #d6d7d9",
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
                      setDat(defDue);
                      setLoansDueSd("");
                      setLoansDueEd("");
                      setLoansDueModal(false);
                      // Due();
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{}}>
                    <ButtonComponent
                      label="Print"
                      buttonWidth={"90px"}
                      buttonIcon={<AiFillPrinter size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"#0063d1"}
                      onClick={handlePrint}
                    />
                  </div>
                  <div style={{}}>
                    <ButtonComponent
                      label="Download Excel"
                      buttonWidth={"160px"}
                      buttonIcon={<SiMicrosoftexcel size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"green"}
                      onClick={handleDueDownload}
                    />
                  </div>
                </div>
                {/* <div></div> */}
              </div>
              <hr />
              <br />
              <div
                style={{
                  padding: "10px",
                  border: "2px solid #d6d7d9",
                  // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  marginBottom: "30px",
                }}
              >
                <div className="font-bold text-green-400 text-sm mb-3 ">
                  FILTERS
                </div>
                {/* <hr className="mt-0 mb-3" /> */}
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 0.5 }}>
                    <InputField
                      type={"date"}
                      label={"Start Date"}
                      inputWidth={"30%"}
                      value={loansDueSd}
                      onChange={(e) => setLoansDueSd(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 0.5 }}>
                    <InputField
                      type={"date"}
                      label={"End Date"}
                      inputWidth={"30%"}
                      value={loansDueEd}
                      onChange={(e) => setLoansDueEd(e.target.value)}
                    />
                  </div>
                  <div>
                    <ButtonComponent
                      label={"Filter"}
                      buttonWidth={"100px"}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"black"}
                      buttonIcon={<IoFilterCircleSharp size={20} />}
                      onClick={handleDueFilter}
                    />
                  </div>
                </div>
              </div>
              <div ref={componentRef}>
                <div
                  className="space-y-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    // marginTop: "-40px",
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
                        fontSize: "17px",
                        fontWeight: "500",
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
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      ALL <span style={{ color: "red" }}>{dat.length}</span>{" "}
                      LOANS DUE
                      {/* (
                      <span style={{ color: "" }}>
                        {getCurrentMonth().toUpperCase()}
                      </span>
                      ) */}
                    </div>
                  </div>
                </div>
                <div style={{ zoom: 0.85 }}>
                  {/* <LoadingOverlay loader={customLoader} visible={dueLoading} /> */}
                  <CustomTable2
                    headers={[
                      "#",
                      "Facility Number",
                      "Member ID",
                      "Member Name",
                      "Principal Account",
                      "Principal Due",
                      "Interest Due",
                      "Total Amount",
                    ]}
                    data={dat}
                    style={{ columnAlignCenter: [1, 2, 3, 4, 5] }}
                    loading={{
                      status: dueLoading,
                      message: "INF - RETRIEVING DATA ...",
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            opened={loansDisbursedModal}
            size="80%"
            onClose={() => setLoansDisbursedModal(false)}
            trapFocus="false"
            // padding={"10px"}
            withCloseButton={false}
            style={{ zoom: "0.85" }}
          >
            <div>
              <HeaderComponent title="ALL LOANS DISBURSED" />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // padding: "10px",
                  // border: "2px solid #d6d7d9",
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
                      setDatt(defDis);
                      setLoansDisSd("");
                      setLoansDisEd("");
                      setLoansDisbursedModal(false);
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{}}>
                    <ButtonComponent
                      label="Print"
                      buttonWidth={"90px"}
                      buttonIcon={<AiFillPrinter size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"#0063d1"}
                      onClick={handlePrint}
                    />
                  </div>
                  <div style={{}}>
                    <ButtonComponent
                      label="Download Excel"
                      buttonWidth={"160px"}
                      buttonIcon={<SiMicrosoftexcel size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"green"}
                      onClick={handleDownload}
                    />
                  </div>
                </div>
                {/* <div></div> */}
              </div>
              <hr />
              <br />
              <div
                style={{
                  padding: "10px",
                  border: "2px solid #d6d7d9",
                  // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  marginBottom: "30px",
                }}
              >
                <div className="font-bold text-green-400 text-sm mb-3 ">
                  FILTERS
                </div>
                {/* <hr className="mt-0 mb-3" /> */}
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 0.5 }}>
                    <InputField
                      type={"date"}
                      label={"Start Date"}
                      inputWidth={"30%"}
                      value={loansDisSd}
                      onChange={(e) => setLoansDisSd(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 0.5 }}>
                    <InputField
                      type={"date"}
                      label={"End Date"}
                      inputWidth={"30%"}
                      value={loansDisEd}
                      onChange={(e) => setLoansDisEd(e.target.value)}
                    />
                  </div>
                  <div>
                    <ButtonComponent
                      label={"Filter"}
                      buttonWidth={"100px"}
                      buttonHeight={"30px"}
                      buttonBackgroundColor={"black"}
                      buttonIcon={<IoFilterCircleSharp size={20} />}
                      onClick={handleDisFilter}
                    />
                  </div>
                </div>
              </div>
              <div ref={componentRef}>
                <div
                  className="space-y-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    // marginTop: "-40px",
                    textAlign: "center",
                    // margin: "20px",
                  }}
                >
                  <div></div>
                  <div className="space-y-2 mr-4">
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
                        fontSize: "17px",
                        fontWeight: "500",
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
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      ALL <span style={{}}>{datt.length}</span> LOANS DISBURSED
                      {/* (
                      <span style={{ color: "darkblue" }}>
                        {getCurrentMonth().toUpperCase()}
                      </span>
                      ) */}
                    </div>
                  </div>
                </div>
                <div style={{ zoom: 0.85 }}>
                  <LoadingOverlay loader={customLoader} visible={disLoading} />
                  <CustomTable2
                    // rowsPerPage={"1000"}
                    headers={[
                      "#",
                      "Facility Number",
                      "Member ID",
                      "Member Name",
                      "Principal Account",
                      "Facility Amount",
                      "Approval Date",
                      "Bank Code",
                      "Beneficiary Account",
                    ]}
                    data={datt}
                    // pagination={true}
                  />
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            opened={loansReportModal3}
            size="95%"
            onClose={() => setLoansReportModal3(false)}
            trapFocus="false"
            // padding={"10px"}
            withCloseButton={false}
            style={{ zoom: "0.85" }}
          >
            <div>
              <HeaderComponent title="ALL APPROVED LOANS" />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // padding: "10px",
                  // border: "2px solid #d6d7d9",
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
                      setData3(defApp);
                      setLoansAppSd("");
                      setLoansAppEd("");
                      setLoansReportModal3(false);
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{}}>
                    <ButtonComponent
                      label="Print"
                      buttonWidth={"90px"}
                      buttonIcon={<AiFillPrinter size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"#0063d1"}
                      onClick={handlePrint}
                    />
                  </div>
                  <div style={{}}>
                    <ButtonComponent
                      label="Download Excel"
                      buttonWidth={"160px"}
                      buttonIcon={<SiMicrosoftexcel size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"green"}
                      onClick={handleApprovalDownload}
                    />
                  </div>
                </div>
                {/* <div></div> */}
              </div>
              <hr />
              <br />
              <div
                style={{
                  padding: "10px",
                  border: "2px solid #d6d7d9",
                  // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  marginBottom: "30px",
                }}
              >
                <div className="font-bold text-green-400 text-sm mb-3 ">
                  FILTERS
                </div>
                {/* <hr className="mt-0 mb-3" /> */}
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 0.5 }}>
                    <InputField
                      type={"date"}
                      label={"Start Date"}
                      inputWidth={"30%"}
                      value={loansAppSd}
                      onChange={(e) => setLoansAppSd(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 0.5 }}>
                    <InputField
                      type={"date"}
                      label={"End Date"}
                      inputWidth={"30%"}
                      value={loansAppEd}
                      onChange={(e) => setLoansAppEd(e.target.value)}
                    />
                  </div>
                  <div>
                    <ButtonComponent
                      label={"Filter"}
                      buttonWidth={"100px"}
                      buttonHeight={"30px"}
                      buttonBackgroundColor={"black"}
                      buttonIcon={<IoFilterCircleSharp size={20} />}
                      onClick={handleAppFilter}
                    />
                  </div>
                </div>
              </div>
              <div ref={componentRef}>
                <div
                  className="space-y-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    // marginTop: "-40px",
                    textAlign: "center",
                  }}
                >
                  <div></div>
                  <div className="space-y-2 mr-4">
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
                        fontSize: "17px",
                        fontWeight: "500",
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
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      ALL <span style={{}}>{data3.length}</span> APPROVED LOANS
                      REPORT
                      {/* (
                      <span style={{ color: "darkblue" }}>
                        {getCurrentMonth().toUpperCase()}
                      </span>
                      ) */}
                    </div>
                  </div>
                </div>
                <div style={{ zoom: 0.85 }}>
                  <LoadingOverlay loader={customLoader} visible={appLoading} />
                  <CustomTable2
                    // rowsPerPage={"1000"}
                    headers={[
                      "#",
                      "Account Number",
                      "Beneficiary Name",
                      "Bank Code",
                      "Beneficiary Account No",
                      "Payment Amount",
                      "Transaction Type Code",
                      "Purpose of Payment",
                      "Beneficiary Address",
                      "Charge Type",
                      "Currency",
                      "Payment Type",
                    ]}
                    data={data3}
                    // pagination={true}
                  />
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            opened={loansReportModal4}
            size="90%"
            onClose={() => setLoansReportModal4(false)}
            trapFocus="false"
            // padding={"10px"}
            withCloseButton={false}
            style={{ zoom: "0.85" }}
          >
            <div>
              <HeaderComponent title="BYPRODUCT REPORT" />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // padding: "10px",
                  // border: "2px solid #d6d7d9",
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
                      setData4(defBy);
                      setFilterBranch("");
                      setLoansReportModal4(false);
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{}}>
                    <ButtonComponent
                      label="Print"
                      buttonWidth={"90px"}
                      buttonIcon={<AiFillPrinter size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"#0063d1"}
                      onClick={handlePrint}
                    />
                  </div>
                  <div style={{}}>
                    <ButtonComponent
                      label="Download Excel"
                      buttonWidth={"160px"}
                      buttonIcon={<SiMicrosoftexcel size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"green"}
                      onClick={handleByproductDownload}
                    />
                  </div>
                </div>
                {/* <div></div> */}
              </div>
              <hr />
              <br />
              <div
                style={{
                  padding: "10px",
                  border: "2px solid #d6d7d9",
                  // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  marginBottom: "30px",
                }}
              >
                <div className="font-bold text-green-400 text-sm mb-3 ">
                  FILTERS
                </div>
                {/* <hr className="mt-0 mb-3" /> */}
                <div>
                  <ListOfValue
                    label={"Branch Code"}
                    inputWidth={"30%"}
                    value={filterBranch}
                    onChange={(value) => {
                      setFilterBranch(value);
                    }}
                    data={filterBranchLov}
                  />
                </div>
                <div className="flex justify-end">
                  <ButtonComponent
                    label={"Filter"}
                    buttonWidth={"100px"}
                    buttonHeight={"35px"}
                    buttonBackgroundColor={"black"}
                    buttonIcon={<IoFilterCircleSharp size={20} />}
                    onClick={handleFilter}
                  />
                </div>
              </div>
              <br />
              <div ref={componentRef}>
                <div
                  className="space-y-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    // marginTop: "-40px",
                    textAlign: "center",
                  }}
                >
                  <div></div>
                  <div className="space-y-2 mr-4">
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
                        fontSize: "17px",
                        fontWeight: "500",
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
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      BYPRODUCT REPORT
                      {/* (
                      <span style={{ color: "darkblue" }}>
                        {getCurrentMonth().toUpperCase()}
                      </span>
                      ) */}
                    </div>
                  </div>
                </div>
                <div style={{ zoom: 0.85 }}>
                  <LoadingOverlay loader={customLoader} visible={byLoading} />
                  <CustomTable2
                    // rowsPerPage={"100"}
                    headers={[
                      "#",
                      "Account Number",
                      "Member Name",
                      "Branch",
                      "Total",
                      "Installment",
                      "Monthly Interest",
                      "Interest",
                      "Principal",
                      "Monthly Amount",
                      "Duration",
                    ]}
                    data={data4}
                    // pagination={true}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default FacilityEnquiry;
