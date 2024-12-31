import React, { useEffect, useState } from "react";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../lending/components/fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiX } from "react-icons/fi";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import TextAreaField from "./../../../../../components/others/Fields/TextArea";
import CustomTable from "../../../control-setups/components/CustomTable";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import { Modal, ScrollArea } from "@mantine/core";
import LoanGeneralSchedule from "./schedule";

function CollectorsNote({ closeModal, userDetails }) {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const collectorHeaders = [
    <div style={{ textAlign: "left" }}>Collector Name</div>,
    <div style={{ textAlign: "left" }}>Reason Description</div>,
    <div style={{ textAlign: "left" }}>Feedback Description</div>,
    <div style={{ textAlign: "left" }}>Notes</div>,
    <div>Pending Date</div>,
    <div>Promise Date</div>,
  ];

  // FUNCTIONS
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // DATE FORMATTER
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

  // STATES
  const [loading, setLoading] = useState(true);
  const [collectorDetails, setCollectorDetails] = useState([]);
  const [failureReasons, setFailureReasons] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [failureReasonValue, setFailureReasonValue] = useState("");
  const [feedbackValue, setFeedbackValue] = useState("");
  const [viewSchedule, setViewSchedule] = useState(false);

  //   EFFECTS
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-arrears-collector-details",
        {
          facility_no: userDetails?.facility_no,
        },
        { headers: headers }
      )
      .then(function (response) {
        setCollectorDetails(response.data);
        setLoading(false);
        console.log(response.data, "REPP");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    axios
      .get(API_SERVER + "/api/get-arrears-failure-reason", {
        headers: headers,
      })
      .then(function (response) {
        setFailureReasons(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/get-arrears-customer-feedback", {
        headers: headers,
      })
      .then(function (response) {
        setFeedbacks(response.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var collectorData = collectorDetails?.map((i) => {
    return [
      <div style={{ textAlign: "left" }}>{i?.fullname}</div>,
      <div style={{ textAlign: "left" }}>{i?.reason_desc}</div>,
      <div style={{ textAlign: "left" }}>{i?.feedback_desc}</div>,
      <div style={{ textAlign: "left" }}>{i?.notes}</div>,
      <div>{formatDate(i?.posting_date)}</div>,
      <div>{formatDate(i?.promise_date)}</div>,
    ];
  });

  return (
    <div style={{ display: viewSchedule ? "none" : "block" }}>
      <Header
        headerShade
        title="Collector's Note"
        closeIcon={<FiX />}
        handleClose={closeModal}
      />

      <br />
      <Header headerShade title="Account Information" />
      <br />

      <div style={{ display: "flex" }}>
        <div className="space-y-4" style={{ width: "50%" }}>
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Principal Account"}
            value={userDetails?.principal_account}
          />
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Repayment Account"}
            value={userDetails?.repayment_acct}
          />
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Customer Name"}
            value={userDetails?.account_descrp}
          />
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Principal in Arrears"}
            value={formatNumber(parseFloat(userDetails?.princ_in_arr))}
            textAlign={"right"}
          />
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Interest in Arrears"}
            value={formatNumber(parseFloat(userDetails?.int_in_arr))}
            textAlign={"right"}
          />
        </div>

        <div className="space-y-4" style={{ width: "50%" }}>
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Phone Number 1"}
            value={userDetails?.phone1}
          />
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Phone Number 2"}
            value={userDetails?.phone2}
          />
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Total Amount"}
            value={formatNumber(parseFloat(userDetails?.total_amount))}
            textAlign={"right"}
            color={"red"}
            inputColor={"red"}
          />
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            disabled
            label={"Email"}
            // value={userDetails?.int_in_arr}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div style={{ marginRight: "10px" }}>
              <ButtonComponent
                buttonWidth={"120px"}
                buttonHeight={"30px"}
                label={"View Schedule"}
                onClick={() => setViewSchedule(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <br />

      <Header title={"Actions/Notes"} headerShade />
      <br />
      <div className="flex">
        <div className="space-y-4" style={{ width: "50%" }}>
          <ListOfValue
            label="Failure Reason"
            labelWidth={"40%"}
            inputWidth={"60%"}
            required
            data={failureReasons}
            onChange={(value) => setFailureReasonValue(value)}
            value={failureReasonValue}
          />
          <ListOfValue
            label="Customer Feedback"
            labelWidth={"40%"}
            inputWidth={"60%"}
            required
            data={feedbacks}
            onChange={(value) => setFeedbackValue(value)}
            value={feedbackValue}
          />

          <TextAreaField
            label={"Comments"}
            labelWidth={"40%"}
            inputWidth={"60%"}
            required
          />
        </div>

        <div className="space-y-4" style={{ width: "50%" }}>
          <InputField
            inputWidth={"60%"}
            labelWidth={"40%"}
            label={"Promised Date"}
            type={"date"}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div style={{ marginRight: "10px" }}>
              <ButtonComponent
                buttonWidth={"120px"}
                buttonHeight={"30px"}
                label={"Send SMS"}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div style={{ marginRight: "10px" }}>
              <ButtonComponent
                buttonWidth={"120px"}
                buttonHeight={"30px"}
                label={"Send Email"}
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div style={{ zoom: 0.85 }}>
        <CustomTable
          headers={collectorHeaders}
          data={collectorData}
          loading={loading}
        />
      </div>

      <Modal
        size={"90%"}
        opened={viewSchedule}
        padding={0}
        withCloseButton={false}
        onClose={() => setViewSchedule(false)}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div style={{ zoom: 0.86 }}>
          <LoanGeneralSchedule
            facilityNumber={userDetails?.facility_no}
            onClose={() => setViewSchedule(false)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CollectorsNote;
