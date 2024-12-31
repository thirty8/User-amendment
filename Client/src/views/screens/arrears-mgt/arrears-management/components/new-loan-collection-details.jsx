import React, { useState, useEffect } from "react";
// import user from "../../../../../assets/images/user.png";
import Header from "../../../../../components/others/Header/Header";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiCheck, FiEye, FiMail, FiPhone, FiUser, FiX } from "react-icons/fi";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../components/others/Fields/SelectField";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../teller-ops/teller/teller-activities";
import { Modal, ScrollArea } from "@mantine/core";
import AccountBalanceEnquiry from "../../../account-activities/account-enquiry/components/account-balance-enquiry";
// import LoanGeneralEnquiry from "../../../lending/facility-enquiry/loan-general-enquiry";
import Swal from "sweetalert2";
import { Spin } from "antd";
import NewLoanGeneralEnquiry from "../../../lending/facility-enquiry/new-loan-general-enquiry";

function NewLoanCollectionDetails({ customerDetails, onClose }) {
  // collector details
  var collectorDetailsHeader = [
    <div style={{ textAlign: "left" }}>Collector Name</div>,
    <div style={{ textAlign: "left" }}>Reason Description</div>,
    <div style={{ textAlign: "left" }}>Feedback Description</div>,
    <div style={{ textAlign: "left" }}>Comments</div>,
    <div>Posting Date</div>,
    <div>Promise Date</div>,
  ];

  console.log(customerDetails, "KEYYY");

  //   variables
  var total =
    parseFloat(customerDetails?.princ_in_arr) +
    parseFloat(customerDetails?.int_in_arr);

  //   States
  const [tableLoadState, setTableLoadState] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [failureReasons, setFailureReasons] = useState([]);
  const [failureReasonsValue, setFailureReasonsValue] = useState("");
  const [customerFeedbackValue, setCustomerFeedbackValue] = useState("");
  const [customerFeedback, setCustomerFeedback] = useState([]);
  const [customerFeedbackTable, setCustomerFeedbackTable] = useState([]);
  const [showBalScreen, setShowBalScreen] = useState(false);
  const [dataLoading, setdataLoading] = useState(true);
  const [showSchedule, setshowSchedule] = useState(false);
  const [currency, setCurrency] = useState("");
  const [comments, setComments] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [product, setProduct] = useState("");
  const [rm, setRm] = useState("");
  const [email, setEmail] = useState("");
  const [facilityNumber, setFacilityNumber] = useState("");
  const [accountClass, setAccountClass] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  //   EFFECTS
  useEffect(() => {
    // FAILURE REASONS
    axios
      .get(API_SERVER + `/api/get-arrears-failure-reason`, { headers })
      .then(function (response) {
        setFailureReasons(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    //   CUSTOMER FEEDBACK LOV
    axios
      .get(API_SERVER + `/api/get-arrears-customer-feedback`, { headers })
      .then(function (response) {
        setCustomerFeedback(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER CURRENCY
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-curr`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setCurrency(response.data[0]);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER PRODUCT
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-prod`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setProduct(response.data[0]);
        setdataLoading(false);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER RELATIONS MANAGER
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-rm`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setRm(response.data[0]);
        setdataLoading(false);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER EMAIL
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-email`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setEmail(response.data[0]);
        setdataLoading(false);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER FACILITY TYPE
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-facility-type`,
        {
          facility_no: customerDetails?.facility_no,
        },
        { headers }
      )
      .then(function (response) {
        setFacilityNumber(response.data[0]);
        setdataLoading(false);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    //   CUSTOMER ACCOUNT CLASS
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-account-class`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setAccountClass(response.data[0]);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    console.log(
      {
        principal_account: customerDetails?.principal_account,
      },
      "FEED PAYLOAD"
    );

    //cust table
    axios
      .post(
        API_SERVER + "/api/get-cust-arrears-feedback-table",
        {
          principal_account: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        console.log(response?.data, "FEED");
        setCustomerFeedbackTable(response?.data);
        setTableLoadState(false);
      })
      .catch((error) => {
        console.log(error);
        setTableLoadState(false);
      });
  }, []);

  //   TABLE DATA
  var tableData = customerFeedbackTable?.map((i) => {
    return [
      <div style={{ textAlign: "left" }}>{i?.fullname}</div>,
      <div style={{ textAlign: "left" }}>{i?.reason_desc}</div>,
      <div style={{ textAlign: "left" }}>{i?.feedback_desc}</div>,
      <div style={{ textAlign: "left" }}>{i?.notes}</div>,
      <div>{formatDate(i?.posting_date)}</div>,
      <div>{formatDate(i?.promise_date)}</div>,
    ];
  });

  //   FORMAT NUMBER
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // FORMAT DATE
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

  //   HANDLE OK CLICK
  const handleOkPressArrearsManagement = () => {
    const d = JSON.parse(localStorage.getItem("userInfo"));
    const user = d?.id;

    const totalAmt = parseFloat(total);
    var promisedDate;

    if (reviewDate === "Invalid Date-INV-Invalid Date") {
      promisedDate = "";
    } else {
      promisedDate = formatDate(reviewDate);
    }

    axios
      .post(
        API_SERVER + "/api/arrears-mgmt-ok",
        {
          promised_date_v:
            promisedDate === "Invalid Date-INV-Invalid Date"
              ? ""
              : promisedDate,
          rc_code_v: failureReasonsValue,
          notes_v: comments,
          feedbk_code_v: customerFeedbackValue,
          princ_acc_v: customerDetails?.principal_account,
          username_v: user,
          Total_AMT_v: totalAmt,
          BR_CODE_v: customerDetails?.branch_code,
          risk_v: selectedOption,
          DAYS_IN_ARR_v: customerDetails?.days_in_arr,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "PRPP");
        if (response?.data?.responseMessage?.split(" - ")[0] === "ERR") {
          Swal.fire(response?.data?.responseMessage, "", "error");
        } else {
          Swal.fire(
            "INF - 01893: Actions/Notes Saved Successfully",
            "",
            "success"
          );
          onClose();
        }
        // Swal.fire(response?.data?.responseMessage, "", "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // NOTIFICATIONS SYSTEM SEND SMS
  const handleSendSMS = () => {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var ip = localStorage.getItem("ipAddress");

    var branch = userInfo?.branchCode;
    var user = userInfo?.id;

    axios
      .post(
        "http://10.203.14.16:8080/notifications/send",
        {
          activity_code: "ARRMG",
          entrySource: "NET",
          branch: branch,
          createdBy: user,
          device_id: ip,
          para1: "", //EMAIL
          para2: customerDetails?.phone1, // PHONE
          para3: formatNumber(total), // AMOUNT
          notify: "Y",
          deviceName: ip, // HOSTNAME
          country: "ghana",
          deviceID: ip,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data?.responseCode === "000") {
          Swal.fire({
            text: "INF-07786: SMS sent successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Something went wrong while sending SMS",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // NOTIFICATIONS SYSTEM SEND EMAIL
  const handleSendEmail = () => {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var ip = localStorage.getItem("ipAddress");

    var branch = userInfo?.branchCode;
    var user = userInfo?.id;

    axios
      .post(
        "http://10.203.14.16:8080/notifications/send",
        {
          activity_code: "ARRMG",
          entrySource: "NET",
          branch: branch,
          createdBy: user,
          device_id: ip,
          para1: email?.e_mail, //EMAIL
          para2: customerDetails?.phone1, // PHONE
          para3: formatNumber(total), // AMOUNT
          notify: "Y",
          deviceName: ip, // HOSTNAME
          country: "ghana",
          deviceID: ip,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data?.responseCode === "000") {
          Swal.fire({
            text: "INF-06886: Email sent successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Something went wrong while sending email",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="space-y-1 p-2"
      style={{
        display: showBalScreen || showSchedule ? "none" : "block",
        padding: "10px",
        zoom: 0.9,
      }}
    >
      {/* OVERLAY LOADER */}
      {dataLoading && (
        <div className=" h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-90 absolute z-10">
          <div className="z-30 opacity-100  rounded-full">
            <Spin size="large" />
          </div>
        </div>
      )}
      <Header title={"Customer and Arrears Details"} headerShade />

      <br />

      <div className="text-xl font-bold capitalize ml-10 mb-5">
        {customerDetails?.account_descrp}
      </div>
      <br />
      {/* FIRST COLUMN */}
      <div className="flex justify-start" style={{ zoom: 0.89 }}>
        {/* <div className="mr-2 ">
          <img
            src={user}
            alt="User Icon"
            className="h-16 w-16 object-contain"
          />
        </div> */}
        {/* 1 */}
        <div className="w-1/3 space-y-4">
          <div className="flex">
            <div className="w-1/2 text-right font-bold">Principal Acct : </div>
            <div className="ml-1">{customerDetails?.principal_account}</div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">Repayment Acct : </div>
            <div className="ml-1">{customerDetails?.repayment_acct}</div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">Product Type : </div>
            <div
              className="ml-1 whitespace-nowrap"
              title={product?.product_type}
            >
              {product?.product_type?.length > 15
                ? `${product.product_type.slice(0, 15)}...`
                : product?.product_type}
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">Currency : </div>
            <div className="ml-1">
              {" "}
              {currency?.currency === "undefined" ? "" : currency?.currency}
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="w-1/3 space-y-4">
          <div className="flex">
            <div className="w-1/2 text-right font-bold">Facility Type : </div>
            <div className="ml-1">{facilityNumber?.facility_no}</div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">Arrears Days : </div>
            <div className="ml-1">{customerDetails?.days_in_arr}</div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">Account Class : </div>
            <div className="ml-1">{accountClass?.account_class}</div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">Address : </div>
            <div className="ml-1">Address</div>
          </div>
        </div>

        {/* 3 */}
        <div className="w-1/3 space-y-4">
          <div className="flex">
            <div className="w-1/2 text-right font-bold">
              Prin. in Arrears :{" "}
            </div>
            <div className="ml-1">
              {formatNumber(customerDetails?.princ_in_arr)}
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">Int. in Arrears : </div>
            <div className="ml-1">
              {formatNumber(customerDetails?.int_in_arr)}
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">
              Total in Arrears :{" "}
            </div>
            <div className="ml-1">{formatNumber(total)}</div>
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold">Branch : </div>
            <div className="ml-1">{customerDetails?.br_description}</div>
          </div>
        </div>

        {/* 4 */}
        <div className="w-1/3 space-y-2">
          <div className="flex">
            <div className="w-1/2 text-right font-bold">Email :</div>
            <div className="ml-1">{email?.e_mail}</div>
          </div>

          <div className="flex justify-center items-center">
            <ButtonComponent
              label={"Send Email"}
              buttonWidth={"120px"}
              buttonHeight={"26px"}
              buttonColor={email?.e_mail === null ? "black" : "white"}
              buttonBackgroundColor={email?.e_mail === null ? "#ccc" : "green"}
              buttonIcon={
                <FiMail color={email?.e_mail === null ? "gray" : "white"} />
              }
              onClick={
                email?.e_mail === null ? () => {} : () => handleSendEmail()
              }
            />
          </div>

          <div className="flex">
            <div className="w-1/2 text-right font-bold whitespace-nowrap">
              Phone :
            </div>
            <div className="ml-1">{customerDetails?.phone1}</div>
          </div>

          <div className="flex justify-center items-center">
            <ButtonComponent
              label={"Send SMS"}
              buttonWidth={"120px"}
              buttonHeight={"26px"}
              buttonColor={customerDetails?.phone1 === null ? "black" : "white"}
              buttonBackgroundColor={
                customerDetails?.phone1 === null ? "#ccc" : "green"
              }
              buttonIcon={
                <FiPhone
                  color={customerDetails?.phone1 === null ? "gray" : "white"}
                />
              }
              onClick={
                customerDetails?.phone1 === null
                  ? () => {}
                  : () => handleSendSMS()
              }
            />
          </div>
        </div>
      </div>
      {/* REPLACE HERE */}

      {/* HR */}
      <hr color="#ccc" />

      <div className="flex gap-5 p-5 justify-between" style={{ zoom: 0.9 }}>
        <div className="flex gap-5">
          <ButtonComponent
            label={"View Schedule"}
            buttonBackgroundColor={"#3b82f6"}
            buttonWidth={"150px"}
            buttonHeight={"30px"}
            buttonIcon={<FiEye />}
            onClick={() => setshowSchedule(true)}
          />

          <ButtonComponent
            label={"Customer Exposure"}
            buttonBackgroundColor={"#070269"}
            buttonWidth={"190px"}
            buttonHeight={"30px"}
            buttonIcon={<FiUser />}
            onClick={() => setShowBalScreen(true)}
          />
        </div>

        <div className="flex gap-4">
          <ButtonComponent
            label={"Save"}
            buttonBackgroundColor={comments?.trim() !== "" ? "green" : "#ccc"}
            buttonWidth={"80px"}
            buttonHeight={"28px"}
            buttonIcon={<FiCheck />}
            onClick={() => handleOkPressArrearsManagement()}
          />

          <ButtonComponent
            label={"Exit"}
            onClick={onClose}
            buttonBackgroundColor={"red"}
            buttonWidth={"80px"}
            buttonHeight={"28px"}
            buttonIcon={<FiX />}
          />
        </div>
      </div>

      <div className="space-y-4 p-1 m-2 border-solid border-2 border-[#ececec]">
        <Header title={"Reason and Comments"} headerShade />

        <div className="flex w-full">
          <div className="w-1/2">
            <ListOfValue
              label="Failure Reason"
              data={failureReasons}
              onChange={(value) => setFailureReasonsValue(value)}
              labelWidth={"40%"}
              required
              value={failureReasonsValue}
              inputWidth={"50%"}
            />
          </div>

          <div className="w-1/2">
            <ListOfValue
              label="Customer Feedback"
              required
              data={customerFeedback}
              value={customerFeedbackValue}
              onChange={(value) => setCustomerFeedbackValue(value)}
              labelWidth={"30%"}
              inputWidth={"50%"}
            />
          </div>
        </div>

        {customerFeedbackValue === "02" && (
          <div className="flex w-full">
            <div className="w-1/2">
              <InputField
                label="Promise to Pay Date"
                type={"date"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                required
              />
            </div>

            <div className="w-1/2">
              <InputField
                label="Promise to Pay Amount"
                labelWidth={"30%"}
                inputWidth={"50%"}
                textAlign={"right"}
                required
              />
            </div>
          </div>
        )}

        <div className="flex w-full">
          <div className="w-1/2">
            <InputField
              label="Next Review Date"
              required
              type={"date"}
              labelWidth={"40%"}
              value={reviewDate}
              onChange={(e) => setReviewDate(e.target.value)}
              inputWidth={"50%"}
            />
          </div>

          <div className="w-1/2">
            <SelectField
              label="Risk Status"
              labelWidth={"30%"}
              value={selectedOption}
              data={[
                { label: "Select a risk status", value: "" },
                { label: "Low", value: "LOW" },
                { label: "Medium", value: "MEDIUM" },
                { label: "High", value: "HIGH" },
              ]}
              onChange={(value) => setSelectedOption(value)}
              inputWidth={"50%"}
              textAlign={"right"}
            />
          </div>
        </div>

        <div className="w-full">
          <TextAreaField
            inputheight={"100px"}
            label={"Comments"}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
            labelWidth={"20%"}
            inputWidth={"70%"}
          />
        </div>

        <div style={{ zoom: 0.95 }}>
          <Header title={"Collector's Feedback"} headerShade />

          <div>
            <CustomTable
              headers={collectorDetailsHeader}
              data={tableData}
              load={tableLoadState}
              rowsPerPage={5}
              hidePagination
            />
          </div>
        </div>
      </div>

      {/* MODALS */}
      <Modal
        size={"80%"}
        opened={showSchedule}
        padding={0}
        withCloseButton={false}
        onClose={() => {
          setshowSchedule(false);
        }}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div>
          <NewLoanGeneralEnquiry
            facilityDetails={customerDetails}
            closeModal={() => setshowSchedule(false)}
          />
        </div>
      </Modal>

      <Modal
        size={"80%"}
        opened={showBalScreen}
        padding={0}
        withCloseButton={false}
        onClose={() => {
          setShowBalScreen(false);
        }}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div style={{ zoom: 0.9 }}>
          <Header title={"Account Balance Enquiry"} headerShade />
          <AccountBalanceEnquiry
            state={{ accountNumber: customerDetails?.repayment_acct }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default NewLoanCollectionDetails;

// <div
//         className="flex justify-between p-5"
//         style={{ zoom: 0.9, color: "rgb(92, 92, 92)" }}
//       >
//         <div className="flex">
//           <div className="mr-5">
//             <img src={user} alt="User Icon" className="h-12 w-12" />
//           </div>
//           <div className="flex flex-col space-y-3">
//             <span className="text-xl font-bold capitalize">
//               {customerDetails?.account_descrp}
//             </span>
//             <div className="flex">
//               <div className="font-bold mr-2   whitespace-nowrap ">
//                 Principal Account :
//               </div>
//               <div className="w-1/2">{customerDetails?.principal_account}</div>
//             </div>

//             <div className="flex">
//               <div className="font-bold mr-2   whitespace-nowrap ">
//                 Repayment Account :
//               </div>
//               <div className="w-1/2">{customerDetails?.repayment_acct}</div>
//             </div>

//             <div className="flex">
//               <div className="font-bold mr-2   whitespace-nowrap ">
//                 Product Type :
//               </div>
//               <div
//                 className="w-1/2 whitespace-nowrap cursor-default"
//                 title={product?.product_type}
//               >
//                 {product?.product_type?.length > 25
//                   ? `${product.product_type.slice(0, 25)}...`
//                   : product?.product_type}
//               </div>
//             </div>

//             <div className="flex">
//               <div className="font-bold mr-2   whitespace-nowrap ">
//                 Currency :
//               </div>
//               <div className="w-1/2">
//                 {currency?.currency === "undefined" ? "" : currency?.currency}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* SECOND COLUMN */}
//         <div className="flex flex-col space-y-3 mt-10">
//           <div className="flex">
//             <div className="font-bold mr-2">Facility Type :</div>
//             <div>{facilityNumber?.facility_no}</div>
//           </div>

//           <div className="flex">
//             <div className="font-bold mr-2">Arrears Days :</div>
//             <div>{customerDetails?.days_in_arr}</div>
//           </div>

//           <div className="flex">
//             <div className="font-bold mr-2">Account Class :</div>
//             <div>{accountClass?.account_class}</div>
//           </div>

//           <div className="flex">
//             <div className="font-bold mr-2">Address :</div>
//             <div></div>
//           </div>
//         </div>

//         {/* THIRD COLUMN */}
//         <div className="flex flex-col space-y-3 mt-10">
//           <div className="flex">
//             <div className="font-bold mr-2">Principal in Arrears :</div>
//             <div>{formatNumber(customerDetails?.princ_in_arr)}</div>
//           </div>

//           <div className="flex">
//             <div className="font-bold mr-2">Interest in Arrears :</div>
//             <div>{formatNumber(customerDetails?.int_in_arr)}</div>
//           </div>

//           <div className="flex">
//             <div className="font-bold mr-2">Total in Arrears :</div>
//             <div>{formatNumber(total)}</div>
//           </div>

//           <div className="flex">
//             <div className="font-bold mr-2">Branch :</div>
//             <div>{customerDetails?.br_description}</div>
//           </div>
//         </div>

//         {/* FOURTH COLUMN */}
// <div className="flex flex-col space-y-2 mt-10">
//   <div className="flex">
//     <div className="font-bold mr-2">Email :</div>
//     <div></div>
//   </div>

//   <div>
//     <ButtonComponent
//       label={"Send Email"}
//       buttonWidth={"120px"}
//       buttonHeight={"26px"}
//       buttonColor={email?.e_mail === null ? "black" : "white"}
//       buttonBackgroundColor={email?.e_mail === null ? "#ccc" : "green"}
//       buttonIcon={
//         <FiMail color={email?.e_mail === null ? "gray" : "white"} />
//       }
//     />
//   </div>

//   <div className="flex">
//     <div className="font-bold mr-2">Phone :</div>
//     <div>{customerDetails?.phone1}</div>
//   </div>

//   <div>
//     <ButtonComponent
//       label={"Send SMS"}
//       buttonWidth={"120px"}
//       buttonHeight={"26px"}
//       buttonColor={customerDetails?.phone1 === null ? "black" : "white"}
//       buttonBackgroundColor={
//         customerDetails?.phone1 === null ? "#ccc" : "green"
//       }
//       buttonIcon={
//         <FiPhone
//           color={customerDetails?.phone1 === null ? "gray" : "white"}
//         />
//       }
//     />
//   </div>
// </div>
//       </div>
