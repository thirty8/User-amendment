import React, { useEffect, useState } from "react";
// import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import TextAreaField from "./../../../../../components/others/Fields/TextArea";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { Modal, ScrollArea } from "@mantine/core";
import AccountBalanceEnquiry from "./../../../account-activities/account-enquiry/components/account-balance-enquiry";
import LoanGeneralSchedule from "./schedule";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import Swal from "sweetalert2";

function LoanCollectionDetail({ customerDetails, onClose }) {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const customerFeedbackHeaders = [
    <div style={{ textAlign: "left" }}>Collector Name</div>,
    <div style={{ textAlign: "left" }}>Reason Description</div>,
    <div style={{ textAlign: "left" }}>Feedback Description</div>,
    <div style={{ textAlign: "left" }}>Notes</div>,
    <div>Posting Date</div>,
    <div>Promise Date</div>,
  ];

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
  const [comments, setComments] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [risk, setRisk] = useState("");

  //   EFFECTS
  useEffect(() => {
    axios
      .get(API_SERVER + `/api/get-arrears-failure-reason`, { headers })
      .then(function (response) {
        console.log(response);
        setFailureReasons(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    axios
      .get(API_SERVER + `/api/get-arrears-customer-feedback`, { headers })
      .then(function (response) {
        console.log(response);
        setCustomerFeedback(response.data);
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

  //   FUNCTIONS
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  var total =
    parseFloat(customerDetails?.princ_in_arr) +
    parseFloat(customerDetails?.int_in_arr);

  // format number
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // format date
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

  // HANDLE OK PRESS
  const handleOkPressArrearsManagement = () => {
    const d = JSON.parse(localStorage.getItem("userInfo"));
    const user = d?.id;
    const postingDate = d?.postingDate;

    console.log(
      {
        promised_date_v: reviewDate,
        rc_code_v: failureReasonsValue,
        notes_v: comments,
        feedbk_code_v: customerFeedbackValue,
        princ_acc_v: customerDetails?.principal_account,
        username_v: user,
        Total_AMT_v: parseFloat(total),
        BR_CODE_v: customerDetails?.branch_code,
        risk_v: selectedOption,
        DAYS_IN_ARR_v: customerDetails?.days_in_arr,
      },
      "ARREARS MGMT"
    );

    axios
      .post(
        API_SERVER + "/api/arrears-mgmt-ok",
        {
          promised_date_v: formatDate(reviewDate),
          rc_code_v: failureReasonsValue,
          notes_v: comments,
          feedbk_code_v: customerFeedbackValue,
          princ_acc_v: customerDetails?.principal_account,
          username_v: user,
          Total_AMT_v: parseFloat(total),
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

  return (
    <div>
      <Header
        title={"Loan Collection Detail"}
        headerShade
        handleClose={() => onClose()}
        closeIcon={true}
      />
      <br />
      <div
        style={{
          zoom: 0.9,
          display: showBalScreen || showSchedule ? "none" : "block",
          paddingInline: "15px",
        }}
      >
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayReject={"none"}
          displayView={"none"}
          displayFetch={"none"}
          displayExit={"none"}
          onOkClick={handleOkPressArrearsManagement}
          onNewClick={() => {
            setComments("");
            setFailureReasonsValue("");
            setCustomerFeedbackValue("");
            setReviewDate("");
            setSelectedOption("");
            setRisk("");
          }}
        />

        <br />
        <hr />
        <br />

        {/* DISABLED SECTION */}
        <div style={{ display: "flex", flex: 1 }}>
          <div className="space-y-4" style={{ flex: 0.5 }}>
            <div style={{ display: "flex" }}>
              <InputField
                label={"Principal A/C"}
                labelWidth={"30%"}
                inputWidth={"56%"}
                disabled
                value={customerDetails?.principal_account}
              />
              {/* <ButtonComponent
              buttonIcon={<FiFile />}
              margin={0}
              // buttonWidth={"180px"}
              onClick={() => setShowBalScreen(true)}
              //   buttonBackgroundColor={"orange"}
            /> */}
            </div>
            <InputField
              label={"Repayment A/C"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              value={customerDetails?.repayment_acct}
            />
            <InputField
              label={"Customer Name"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              value={customerDetails?.account_descrp}
            />
            <InputField
              label={"Phone Number"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              value={customerDetails?.phone1}
            />
            <InputField
              label={"Email"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
            />
          </div>

          <div className="space-y-4" style={{ flex: 0.5 }}>
            <InputField
              label={"Principal in Arrears"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              textAlign={"right"}
              value={formatNumber(customerDetails?.princ_in_arr)}
            />
            <InputField
              label={"Interest in Arrears"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              textAlign={"right"}
              value={formatNumber(customerDetails?.int_in_arr)}
            />

            <InputField
              label={"Total Amount"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              value={formatNumber(total)}
              textAlign={"right"}
            />
            <InputField
              label={"Phone Number 2"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              value={
                customerDetails?.phone2 === null ? "" : customerDetails?.phone2
              }
            />
            {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "100px",
            }}
          >
            <div></div>
            <div>
              <ButtonComponent
                label={"View Schedule"}
                buttonHeight={"28px"}
                buttonWidth={"120px"}
                onClick={() => setshowSchedule(true)}
              />
            </div>
          </div> */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px",
                  gap: "10px",
                  marginRight: "100px",
                }}
              >
                <ButtonComponent
                  label={"Account Enquiry"}
                  buttonHeight={"28px"}
                  buttonWidth={"135px"}
                  onClick={() => setShowBalScreen(true)}
                />

                <ButtonComponent
                  label={"View Schedule"}
                  buttonHeight={"28px"}
                  buttonWidth={"120px"}
                  onClick={() => setshowSchedule(true)}
                />
              </div>
            </div>
          </div>
        </div>

        <br />

        {/* FILLABLE SECTION */}
        <div style={{ border: "1px solid #ccc", borderRadius: "3px" }}>
          <Header title={"Feedback"} headerShade />
          <br />
          <div style={{ display: "flex", flex: 1 }}>
            <div className="space-y-4" style={{ flex: 0.5 }}>
              <ListOfValue
                label={"Failure Reason"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required
                data={failureReasons}
                onChange={(value) => setFailureReasonsValue(value)}
                value={failureReasonsValue}
              />
              <ListOfValue
                label={"Customer Feedback"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required
                onChange={(value) => setCustomerFeedbackValue(value)}
                data={customerFeedback}
                value={customerFeedbackValue}
              />
              <InputField
                label={"Review Date"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                type={"date"}
                required
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
              />
              <TextAreaField
                label={"Comments"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                inputheight={"120px"}
                required
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />

              <br />
            </div>

            <div className="space-y-4" style={{ flex: 0.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 0.5 }}></div>

                {/* RISK STATUS */}
                <div
                  style={{
                    flex: 0.5,
                    marginRight: "100px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "4px",
                  }}
                  className="space-y-4"
                >
                  <Header title={"Risk Status"} headerShade />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px",
                    }}
                  >
                    <div style={{ width: "30%", textAlign: "left" }}>LOW</div>
                    <input
                      type="radio"
                      style={{ width: "50%" }}
                      value="LOW"
                      checked={selectedOption === "LOW"}
                      onChange={handleOptionChange}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px",
                      width: "100%",
                    }}
                  >
                    <div style={{ width: "30%", textAlign: "left" }}>
                      MEDIUM
                    </div>
                    <input
                      type="radio"
                      style={{ width: "50%" }}
                      value="MEDIUM"
                      checked={selectedOption === "MEDIUM"}
                      onChange={handleOptionChange}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ width: "30%", textAlign: "left" }}>HIGH</div>
                    <input
                      type="radio"
                      style={{ width: "50%" }}
                      value="HIGH"
                      checked={selectedOption === "HIGH"}
                      onChange={handleOptionChange}
                    />
                  </div>
                </div>
              </div>
              {/* BUTTONS FOR SENDING EMAIL AND SMS */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px",
                    gap: "10px",
                    marginRight: "100px",
                  }}
                >
                  <ButtonComponent
                    label={"Send SMS"}
                    buttonHeight={"28px"}
                    buttonWidth={"120px"}
                  />

                  <ButtonComponent
                    label={"Send Email"}
                    buttonHeight={"28px"}
                    buttonWidth={"120px"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <Header title={"Collector's Feedback"} headerShade />
        <div style={{ zoom: 0.9 }}>
          <CustomTable
            headers={customerFeedbackHeaders}
            data={tableData}
            load={loading}
          />
        </div>

        {/* MODALS */}
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
          <Header title={"Account Balance Enquiry"} headerShade />
          <AccountBalanceEnquiry
            state={{ accountNumber: customerDetails?.repayment_acct }}
          />
        </Modal>

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
          <div style={{ zoom: 0.86 }}>
            <LoanGeneralSchedule
              facilityNumber={customerDetails?.facility_no}
              onClose={() => setshowSchedule(false)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default LoanCollectionDetail;
