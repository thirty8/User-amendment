import React, { useState, useEffect } from "react";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";
import {
  FiCheckCircle,
  FiEye,
  FiMail,
  FiPhone,
  FiUser,
  FiX,
} from "react-icons/fi";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import { headers } from "./../../../teller-ops/teller/teller-activities";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { BsFilePerson } from "react-icons/bs/index.esm";
import ButtonComponent from "./../../../../../components/others/Button/ButtonComponent";
import Swal from "sweetalert2";
import { Modal, ScrollArea } from "@mantine/core";
import LoanGeneralEnquiry from "../../../lending/facility-enquiry/loan-general-enquiry";
import AccountBalanceEnquiry from "../../../account-activities/account-enquiry/components/account-balance-enquiry";

function LoanCollectionDetail({ customerDetails, onClose }) {
  // VARIABLES
  const customerFeedbackHeaders = [
    <div style={{ textAlign: "left" }}>Collector Name</div>,
    <div style={{ textAlign: "left" }}>Reason Description</div>,
    <div style={{ textAlign: "left" }}>Feedback Description</div>,
    <div style={{ textAlign: "left" }}>Notes</div>,
    <div>Posting Date</div>,
    <div>Promise Date</div>,
  ];

  var total =
    parseFloat(customerDetails?.princ_in_arr) +
    parseFloat(customerDetails?.int_in_arr);

  //   STATES
  const [selectedOption, setSelectedOption] = useState("");
  const [failureReasons, setFailureReasons] = useState([]);
  const [failureReasonsValue, setFailureReasonsValue] = useState("");
  const [customerFeedbackValue, setCustomerFeedbackValue] = useState("");
  const [customerFeedback, setCustomerFeedback] = useState([]);
  const [customerFeedbackTable, setCustomerFeedbackTable] = useState([]);
  const [showBalScreen, setShowBalScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSchedule, setshowSchedule] = useState(false);
  const [currency, setCurrency] = useState("");
  const [comments, setComments] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [product, setProduct] = useState("");
  const [rm, setRm] = useState("");
  const [email, setEmail] = useState("");
  const [facilityNumber, setFacilityNumber] = useState("");
  const [accountClass, setAccountClass] = useState("");

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
        console.log(response?.data);
        setCustomerFeedbackTable(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //   FUNCTIONS
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
          Swal.fire(response?.data?.responseMessage, "", "success");
          onClose();
        }
        // Swal.fire(response?.data?.responseMessage, "", "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(customerDetails, "CUST DEE");

  //   TABLE DATA
  var tableData = customerFeedbackTable?.map((i) => {
    return [
      <div style={{ textAlign: "left" }}>{i?.fullname}</div>,
      <div style={{ textAlign: "left" }}>{i?.reason_desc}</div>,
      <div style={{ textAlign: "left" }}>{i?.feedback_desc}</div>,
      <div style={{ textAlign: "left" }}>{i?.notes}</div>,
      <div>{i?.posting_date}</div>,
      <div>{i?.promise_date}</div>,
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

  return (
    <div
      style={{
        display: showBalScreen || showSchedule ? "none" : "block",
        padding: "10px",
      }}
    >
      <Header
        title={"Loan Collection Detail"}
        headerShade
        handleClose={() => onClose()}
        closeIcon={true}
      />

      <br />

      <div>
        {/* MAIN SECTION */}
        <div className="flex">
          {/* LEFT SIDE */}
          <div className="flex-[0.7] space-y-4 border border-[#ccc] rounded-sm p-2 mr-2 pb-4">
            <Header title={"Customer Details"} headerShade />
            <div className="flex">
              <div className="w-1/2">
                <InputField
                  label="Principal A/C"
                  required
                  labelWidth={"30%"}
                  inputWidth={"65%"}
                  disabled
                  value={customerDetails?.principal_account}
                />
              </div>

              <div className="flex items-center w-1/2">
                <div className="w-[47%]">
                  <InputField
                    labelWidth={"0%"}
                    inputWidth={"100%"}
                    disabled
                    className={"font-bold"}
                    value={customerDetails?.account_descrp}
                  />
                </div>

                <div className="w-[50%]">
                  <InputField
                    labelWidth={"0%"}
                    inputWidth={"100%"}
                    disabled
                    className={"font-bold !text-orange-400"}
                    value={
                      currency?.currency === "undefined"
                        ? ""
                        : currency?.currency
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <InputField
                  label="Product Type"
                  labelWidth={"30%"}
                  inputWidth={"65%"}
                  disabled
                  value={product?.product_type}
                />
              </div>

              <div className="w-1/2">
                <InputField
                  required
                  label="Repayment A/C"
                  labelWidth={"50%"}
                  inputWidth={"50%"}
                  disabled
                  value={customerDetails?.repayment_acct}
                />
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <InputField
                  label="Phone No"
                  labelWidth={"30%"}
                  inputWidth={"65%"}
                  disabled
                  value={
                    customerDetails?.phone1 === null
                      ? ""
                      : customerDetails?.phone1
                  }
                />
              </div>

              <div className="w-1/2">
                <InputField
                  label="Phone No 2"
                  labelWidth={"50%"}
                  inputWidth={"50%"}
                  disabled
                  value={
                    customerDetails?.phone2 === null
                      ? ""
                      : customerDetails?.phone2
                  }
                />
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <InputField
                  label="Email"
                  labelWidth={"30%"}
                  inputWidth={"65%"}
                  disabled
                  value={email?.e_mail}
                />
              </div>

              <div className="w-1/2">
                <InputField
                  label="Relation Manager"
                  labelWidth={"50%"}
                  inputWidth={"50%"}
                  disabled
                  value={rm?.rm}
                />
              </div>
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="flex-[0.3] h-fit">
            <div className="space-y-4 border border-[#ccc] rounded-sm p-2 pb-4">
              <Header title={"Arrears Details"} headerShade />
              <div className="flex">
                <div className="w-1/2">
                  <InputField
                    label="Facility Type"
                    labelWidth={"40%"}
                    inputWidth={"60%"}
                    disabled
                    className="font-bold !text-red-500 text-center"
                    value={facilityNumber?.facility_no}
                  />
                </div>

                <div className="w-1/2">
                  <InputField
                    label="Princ In Arr"
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    disabled
                    textAlign={"right"}
                    className="font-bold"
                    value={formatNumber(customerDetails?.princ_in_arr)}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2">
                  <InputField
                    label="Arr Days"
                    labelWidth={"40%"}
                    inputWidth={"60%"}
                    disabled
                    textAlign={"right"}
                    value={customerDetails?.days_in_arr}
                  />
                </div>

                <div className="w-1/2">
                  <InputField
                    label="Int In Arr"
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    textAlign={"right"}
                    disabled
                    className="font-bold"
                    value={formatNumber(customerDetails?.int_in_arr)}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2">
                  <InputField
                    label="Acct Class"
                    labelWidth={"40%"}
                    inputWidth={"60%"}
                    disabled
                    className="font-bold text-center"
                    value={accountClass?.account_class}
                  />
                </div>

                <div className="w-1/2">
                  <InputField
                    label="Total In Arr"
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    textAlign={"right"}
                    className="font-bold !text-red-500"
                    disabled
                    value={formatNumber(total)}
                  />
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-end  mt-4"
              style={{ zoom: 0.9 }}
            >
              <ButtonComponent
                label={"View Schedule"}
                buttonHeight={"29px"}
                buttonWidth={"150px"}
                buttonBackgroundColor={"black"}
                buttonIcon={<FiEye />}
                onClick={() => setshowSchedule(true)}
              />

              <div className="ml-4">
                <ButtonComponent
                  label={"Employer Details"}
                  buttonHeight={"29px"}
                  buttonWidth={"170px"}
                  buttonIcon={<FiUser />}
                />
              </div>

              <div className="ml-4">
                <ButtonComponent
                  label={"Customer Exposure"}
                  buttonHeight={"29px"}
                  buttonWidth={"180px"}
                  buttonIcon={<BsFilePerson />}
                  onClick={() => setShowBalScreen(true)}
                  //   buttonBackgroundColor={"orange"}
                />
              </div>
            </div>
          </div>
        </div>

        <br />

        {/* LOWER SECTION */}
        <div className="mb-2">
          {/* FIELD SECTION */}
          <div className="space-y-4 rounded-sm border border-[#ccc] p-2">
            <div className="flex">
              <div className="flex-[0.625] space-y-4 mr-2">
                <Header title="Reason and Comments" headerShade />
                <div className="flex">
                  <div className="w-[50%]">
                    <ListOfValue
                      label="Failure Reason"
                      required
                      data={failureReasons}
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      onChange={(value) => setFailureReasonsValue(value)}
                      value={failureReasonsValue}
                    />
                  </div>

                  <div className="w-[50%]">
                    <InputField
                      label="Review Date"
                      required
                      type={"date"}
                      labelWidth={"40%"}
                      inputWidth={"40%"}
                      value={reviewDate}
                      onChange={(e) => setReviewDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="w-[100%]">
                    <ListOfValue
                      label="Cust. Feedback"
                      required
                      onChange={(value) => setCustomerFeedbackValue(value)}
                      data={customerFeedback}
                      value={customerFeedbackValue}
                      labelWidth={"19%"}
                      inputWidth={"70%"}
                    />
                  </div>
                </div>

                {customerFeedbackValue === "02" && (
                  <div className="flex">
                    <div className="w-[50%]">
                      <InputField
                        label="Promise To Pay Amt"
                        required
                        labelWidth={"40%"}
                        inputWidth={"60%"}
                        textAlign={"right"}
                      />
                    </div>

                    <div className="w-[50%]">
                      <InputField
                        label="Promise To Pay Date"
                        required
                        type={"date"}
                        labelWidth={"40%"}
                        inputWidth={"40%"}
                      />
                    </div>
                  </div>
                )}

                <div className="pb-4">
                  <TextAreaField
                    labelWidth={"19%"}
                    inputWidth={"70%"}
                    label={"Comments"}
                    inputheight={"100px"}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* REASONS AND COMMENTS RIGHT SIDE  */}
              <div className="flex-[0.375]">
                <Header title="Risk Status" headerShade />
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center justify-between p-1">
                    <input
                      type="radio"
                      className="w-1/2"
                      value="LOW"
                      checked={selectedOption === "LOW"}
                      onChange={handleOptionChange}
                    />
                    <div className="text-gray-400 text-center ml-4 font-semibold">
                      Low
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1">
                    <input
                      type="radio"
                      className="w-1/2"
                      value="MEDIUM"
                      checked={selectedOption === "MEDIUM"}
                      onChange={handleOptionChange}
                    />
                    <div className="text-center ml-4 text-orange-500 font-semibold">
                      Medium
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1">
                    <input
                      type="radio"
                      className="w-1/2"
                      value="HIGH"
                      checked={selectedOption === "HIGH"}
                      onChange={handleOptionChange}
                    />
                    <div className="text-red-500 text-center ml-4 font-semibold">
                      High
                    </div>
                  </div>
                </div>

                <br />
                <hr />
                <br />

                {/* RISK AND BTNs */}
                <div className="flex items-baseline justify-end mt-4">
                  <div
                    className="flex-[0.5] items-baseline p-2"
                    style={{ zoom: 0.9 }}
                  >
                    <div className="flex items-center justify-end">
                      <ButtonComponent
                        label={"Save"}
                        buttonHeight={"32px"}
                        buttonWidth={"130px"}
                        buttonBackgroundColor={"green"}
                        buttonIcon={<FiCheckCircle />}
                        onClick={handleOkPressArrearsManagement}
                      />

                      <div className="ml-4">
                        <ButtonComponent
                          label={"Exit"}
                          buttonHeight={"32px"}
                          buttonWidth={"130px"}
                          buttonBackgroundColor={"red"}
                          buttonIcon={<FiX />}
                          onClick={() => onClose()}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end  mt-4">
                      <ButtonComponent
                        label={"Send Email"}
                        buttonHeight={"29px"}
                        buttonWidth={"130px"}
                        buttonColor={email?.e_mail === null ? "black" : "white"}
                        buttonBackgroundColor={
                          email?.e_mail === null ? "#ccc" : "blueviolet"
                        }
                        buttonIcon={
                          <FiMail
                            color={email?.e_mail === null ? "gray" : "white"}
                          />
                        }
                        disabled
                      />

                      <div className="ml-4">
                        <ButtonComponent
                          label={"Send SMS"}
                          buttonHeight={"29px"}
                          buttonWidth={"130px"}
                          buttonColor={
                            customerDetails?.phone1 === null ? "black" : "white"
                          }
                          buttonBackgroundColor={
                            customerDetails?.phone1 === null ? "#ccc" : ""
                          }
                          buttonIcon={
                            <FiPhone
                              color={
                                customerDetails?.phone1 === null
                                  ? "gray"
                                  : "white"
                              }
                            />
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEEDBACK TABLE */}
        <div style={{ zoom: 0.85 }}>
          <Header title={"Collector's Feedback"} headerShade />
          <CustomTable
            headers={customerFeedbackHeaders}
            data={tableData}
            load={loading}
          />
        </div>
      </div>

      {/*
 
         __  __           _       _     
        |  \/  | ___   __| | __ _| |___ 
        | |\/| |/ _ \ / _` |/ _` | / __|
        | |  | | (_) | (_| | (_| | \__ \
        |_|  |_|\___/ \__,_|\__,_|_|___/ 
*/}
      <Modal
        size={"90%"}
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
          <LoanGeneralEnquiry
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

export default LoanCollectionDetail;
