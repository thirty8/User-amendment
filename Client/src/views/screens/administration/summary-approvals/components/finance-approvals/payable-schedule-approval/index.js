import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../../../../components/others/Header/Header";
import InputField from "../../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../../components/others/Fields/TextArea";
import axios from "axios";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../../../config/constant";
import OverlayLoader from "../../../../../../../components/others/OverlayLoader";

function PayableScheduleApproval({ batchNo, setShowModal }) {
  const [details, setDetails] = useState([]);
  const [acctlink1, setAcctlink1] = useState([]);
  const [acctlink2, setAcctlink2] = useState([]);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  useEffect(() => {
    async function fetchApprovalDetails() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-payable_schedule_manual_details",
          { paymentID: batchNo },
          { headers }
        );
        if (response.data.length > 0) {
          setDetails(response.data);
          setAcctlink1(response.data[0].acct_link1.split(" - ")[0]);
          setAcctlink2(response.data[0].acct_link2.split(" - ")[0]);
        }
      } catch (error) {
        swal({
          icon: "error",
          title: "Error",
          text: "Something went wrong...Kindly contact your Administrator.",
          closeOnClickOutside: false,
        });
      }
    }
    fetchApprovalDetails();
  }, []);

  function decode(flag) {
    if (flag === "Suspended") {
      return "S";
    } else if (flag === "Reversed") {
      return "R";
    } else if (flag === "Paid") {
      return "P";
    } else if (flag === "Cancelled") {
      return "C";
    }
  }

  function formatNumber(num) {
    const number = parseFloat(num);

    if (isNaN(number)) {
      return ""; // Return an empty string for invalid input
    }

    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  function RejectTransaction() {
    try {
      swal({
        title: "Are you sure",
        icon: "warning",
        text: "Click 'Yes' to confirm Rejection",
        buttons: true,
      }).then((res) => {
        if (res) {
          setPostLoader(true);
          axios
            .post(
              API_SERVER + "/api/post_payable_schedule_manual",
              {
                flag: "R",
                action: decode(details[0]?.payment_flag),
                type: "PAYA",
                branchCode: JSON.parse(localStorage.getItem("userInfo"))
                  .branchCode,
                valueDate: todayDate,
                paymentID: batchNo,
                ACCT_LINK1: acctlink1,
                ACCT_LINK2: acctlink2,
                dueAmount: details[0]?.due_amount,
                username: JSON.parse(localStorage.getItem("userInfo")).id,
                narration: details[0]?.doc_descrp,
                approvalScanDoc: details[0]?.document_ref,
              },
              { headers }
            )
            .then((response) => {
              if (response.data.success === "Y") {
                setPostLoader(false);
                swal("Success", response.data.message, "success").then(
                  (res) => {
                    if (res) {
                      setShowModal(false);
                    }
                  }
                );
              } else {
                setPostLoader(false);
                swal("Error", response.data.message, "error");
              }
            });
        }
      });
    } catch (error) {
      swal({
        icon: "error",
        title: "Error",
        text: "Something went wrong...Kindly contact your Administrator.",
        closeOnClickOutside: false,
      });
    }
  }

  function ApproveTransaction() {
    try {
      swal({
        title: "Are you sure",
        icon: "info",
        text: "Click 'Yes' to confirm Approval",
        buttons: true,
      }).then((res) => {
        if (res) {
          setPostLoader(true);
          axios
            .post(
              API_SERVER + "/api/post_payable_schedule_manual",
              {
                flag: "Y",
                action: decode(details[0]?.payment_flag),
                type: "PAYA",
                branchCode: JSON.parse(localStorage.getItem("userInfo"))
                  .branchCode,
                valueDate: todayDate,
                paymentID: batchNo,
                ACCT_LINK1: acctlink1,
                ACCT_LINK2: acctlink2,
                dueAmount: details[0]?.due_amount,
                username: JSON.parse(localStorage.getItem("userInfo")).id,
                narration: details[0]?.doc_descrp,
                approvalScanDoc: details[0]?.scan_doc_id,
              },
              { headers }
            )
            .then((response) => {
              if (response.data.success === "Y") {
                setPostLoader(false);
                swal("Success", response.data.message, "success").then(
                  (res) => {
                    if (res) {
                      setShowModal(false);
                    }
                  }
                );
              } else {
                setPostLoader(false);
                swal("Error", response.data.message, "error");
              }
            });
        }
      });
    } catch (error) {
      swal({
        icon: "error",
        title: "Error",
        text: "Something went wrong...Kindly contact your Administrator.",
        closeOnClickOutside: false,
      });
    }
  }
  return (
    <div className="px-2" style={{ zoom: 0.9 }}>
      <ActionButtons
        displayFetch={"none"}
        displayRefresh={"none"}
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayHelp={"none"}
        displayDelete={"none"}
        displayNew={"none"}
        displayView={"none"}
        onOkClick={ApproveTransaction}
        onRejectClick={RejectTransaction}
        exitbuttonfunction={() => setShowModal(false)}
      />
      <hr className="mb-3" />
      <Header headerShade={true} title={"Transaction Details"} />
      <div
        className="mt-1 py-3"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <OverlayLoader
          postLoader={postLoader || fetchData}
          // color={"#0580c0"}
          textColor={true}
          displayText={postLoader ? "Loading..." : "Fetching Data..."}
        />
        <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Batch Number"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              disabled={true}
              value={details[0]?.payable_id}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Status"}
              labelWidth={"30%"}
              inputWidth={"62%"}
              disabled={true}
              value={details[0]?.payment_flag}
            />
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Vendor Account"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              disabled={true}
              value={details[0]?.acct_link1}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"AP Account"}
              labelWidth={"30%"}
              inputWidth={"62%"}
              disabled={true}
              value={details[0]?.acct_link2}
            />
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Frequency"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              disabled={true}
              value={details[0]?.frequency}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Due Date"}
              labelWidth={"30%"}
              inputWidth={"62%"}
              disabled={true}
              value={details[0]?.due_date}
            />
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Due Amount"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              disabled={true}
              value={formatNumber(details[0]?.due_amount)}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Payment ID"}
              labelWidth={"30%"}
              inputWidth={"62%"}
              disabled={true}
              value={details[0]?.payment_id}
            />
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Scan Document"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              disabled={true}
              value={details[0]?.scan_doc_id}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <TextAreaField
              label={"Narration"}
              labelWidth={"30%"}
              inputWidth={"62%"}
              disabled={true}
              rows={2}
              value={details[0]?.doc_descrp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayableScheduleApproval;
