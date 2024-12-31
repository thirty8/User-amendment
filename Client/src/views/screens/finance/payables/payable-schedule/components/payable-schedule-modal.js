import React, { useEffect, useState } from "react";
import Header from "../../../../../../components/others/Header/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import InputField from "../../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import ButtonType from "../../../../../../components/others/Button/ButtonType";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import swal from "sweetalert";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import { useMemo } from "react";
import { formatDate } from "../../../components/helpers";
function PayableScheduleModal({
  setshowModal,
  payableID,
  payableData,
  tickCheckbox,
  setTickCheckbox,
  clearCheckboxes,
}) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [action, setAction] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [statusfilter, setStatusfilter] = useState("");
  const [payableData1, setPayableData1] = useState([]);
  const [scheduleArray, setScheduleArray] = useState([]);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setPayableData1(payableData);
  }, []);

  function decode(flag) {
    if (flag === "Suspended") {
      return "S";
    } else if (flag === "Unpaid") {
      return "Y";
    } else if (flag === "Paid") {
      return "P";
    } else if (flag === "Cancelled") {
      return "C";
    }
  }

  const NumberWithoutCommas = (number) => {
    const formattedNumber = String(number).replace(/,/g, "");
    return Number(formattedNumber);
  };

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

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

  const fetchPayableSchedule1 = (payable_id, due, status) => {
    try {
      setloading(true);
      let arr = [];
      axios
        .post(
          API_SERVER + "/api/get-payable-schedule-details-manual",
          { payableID: payable_id, due: due, status: status },
          { headers }
        )
        .then((response) => {
          response.data?.map((i, index) => {
            arr.push([
              i.payment_id,
              i.ap_accct,
              i.expense_acct,
              formatNumber(i.due_amount),
              i.frequency,
              i.due_date,
              i.doc_descrp,
              i.status,
              <div className="flex justify-center">
                <div className="hidden">{i.due}</div>,
                <ButtonType
                  type={"checkbox"}
                  id={"checkbox" + index}
                  name={"checkboxx"}
                  checked={tickCheckbox[`${index}`]}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setTickCheckbox((prev) => ({ ...prev, [index]: true }));
                    } else {
                      setTickCheckbox((prev) => ({ ...prev, [index]: false }));
                    }
                  }}
                />
              </div>,
            ]);
          });
          setPayableData1(arr);
          setloading(false);

          // }
        });
    } catch (error) {
      setloading(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  };

  function clickOK() {
    try {
      setPostLoader(true);
      let arr = [];
      payableData1.map((i, index) => {
        if (tickCheckbox[`${index}`] === true) {
          let acct_link1 = i[1].split(" - ");
          let acct_link2 = i[2].split(" - ");
          let data = {
            p_ACCT_LINK1: acct_link1[0],
            p_ACCT_LINK2: acct_link2[0],
            p_DUE_DATE: i[5],
            p_DUE_AMOUNT: NumberWithoutCommas(i[3]),
            p_AMENDED_BY: JSON.parse(localStorage.getItem("userInfo")).id,
            p_AMENDED_DATE: todayDate,
            p_AMENDED_IP: localStorage.getItem("ipAddress"),
            p_BATCH_NO: payableID,
            p_PAYMENT_ID: i[0],
            p_STATUS: decode(i[7]),
            p_REFERENCE_NBR: i[6],
          };
          arr.push(data);
        }
      });
      setScheduleArray(arr);
      axios
        .post(
          API_SERVER + "/api/post_payable_schedule_manual",

          {
            flag: "N",
            action: action,
            type: "PAYA",
            branchCode: JSON.parse(localStorage.getItem("userInfo")).branchCode,
            scheduleData: arr,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.success === "Y") {
            setPostLoader(false);
            swal(response.data.message, "", "success").then((res) => {
              if (res) {
                clearCheckboxes();
                setRefresh((prev) => !prev);
              }
            });
          } else {
            setPostLoader(false);
            swal(response.data.message, "", "error");
          }
        });
    } catch (error) {
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function handleDueDateChange(value) {
    setDueDate(value);
    fetchPayableSchedule1(payableID, value, statusfilter);
  }

  function statusOnchange(value) {
    setStatusfilter(value);
    fetchPayableSchedule1(payableID, dueDate, value);
  }

  function handleRefresh() {
    fetchPayableSchedule1(payableID, "", "");
    setDueDate("");
    setStatusfilter("");
  }

  useMemo(() => handleRefresh(), [refresh]);

  return (
    <div>
      <Header
        title={"Payable Transaction Schedule"}
        backgroundColor={"#0580c0"}
        closeIcon={
          <AiOutlineCloseCircle size={18} onClick={() => setshowModal(false)} />
        }
      />
      <OverlayLoader
        postLoader={postLoader || fetchData}
        // color={"#0580c0"}
        textColor={true}
        displayText={postLoader ? "Loading..." : "Fetching Data..."}
      />
      <div className="p-2">
        <div>
          <legend>Filters</legend>
          <div className="flex mb-4">
            <div style={{ flex: 0.5 }}>
              <SelectField
                label={"Due Date Status"}
                labelWidth={"25%"}
                inputWidth={"55%"}
                data={[
                  { label: "Due for Payment", value: "Y" },
                  { label: "Not Due", value: "N" },
                  { label: "All", value: "" },
                ]}
                onChange={(value) => handleDueDateChange(value)}
                value={dueDate}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <SelectField
                label={"Payment Status"}
                labelWidth={"25%"}
                inputWidth={"55%"}
                data={[
                  { label: "Paid", value: "P" },
                  { label: "Unpaid", value: "Y" },
                  { label: "Suspended", value: "S" },
                  { label: "Cancelled", value: "C" },
                ]}
                onChange={(value) => statusOnchange(value)}
                value={statusfilter}
              />
            </div>
          </div>
          <hr className="mb-2" />
          <div className="flex px-2 mb-2">
            <div className="w-[50%] justify-end">
              {" "}
              <SelectField
                label={"Action"}
                labelWidth={"24%"}
                inputWidth={"55%"}
                data={[
                  { label: "Pay", value: "P" },
                  { label: "Cancel", value: "C" },
                  { label: "Suspend", value: "S" },
                  { label: "Reverse", value: "R" },
                ]}
                required={true}
                onChange={(value) => setAction(value)}
              />
            </div>
            <div className="flex justify-end gap-2 w-[50%]">
              <ButtonComponent
                label={"OK"}
                buttonHeight={"30px"}
                buttonWidth={"55px"}
                onClick={clickOK}
              />
              <ButtonComponent
                label={"Refresh"}
                buttonHeight={"30px"}
                buttonWidth={"65px"}
                onClick={handleRefresh}
              />
              <ButtonComponent
                label={"Exit"}
                buttonHeight={"30px"}
                buttonWidth={"45px"}
                onClick={() => {
                  setshowModal(false);
                  setPayableData1([]);
                  clearCheckboxes();
                }}
              />
            </div>
          </div>

          <Header title={"Schedule Details"} headerShade={true} />
          <div className="" style={{ zoom: 0.85 }}>
            <CustomTable
              headers={[
                "Payment ID",
                "Account Payable",
                "Expense Account",
                "Due Amount",
                "Frequency",
                "Due Date",
                "Narration",
                "Status",
                "Check",
              ]}
              data={payableData1}
              loading={{ status: loading, message: "Processing Data..." }}
              rowsPerPage={10}
              style={{ columnAlignRight: [4] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayableScheduleModal;
