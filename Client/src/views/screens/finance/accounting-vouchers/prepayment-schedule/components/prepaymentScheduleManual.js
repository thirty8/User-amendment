import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import ButtonType from "../../../../../../components/others/Button/ButtonType";
import swal from "sweetalert";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import OverlayLoader from "../../../../../../components/others/OverlayLoader";
import { formatDate } from "../../../components/helpers";

function PrepaymentScheduleManual({
  setshowModal,
  prepaymentDataSchedule,
  tickCheckbox,
  clearCheckboxes,
  batchNum,
  setTickCheckbox,
}) {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [scheduleArray, setScheduleArray] = useState([]);
  const [prepaymentDataSchedule1, setPrepaymentDataSchedule1] = useState([]);
  const [action, setAction] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [stuatusfilter, setStuatusfilter] = useState("");
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setPrepaymentDataSchedule1(prepaymentDataSchedule);
  }, []);

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

  function clickOK() {
    try {
      setPostLoader(true);
      let arr = [];
      prepaymentDataSchedule.map((i, index) => {
        if (tickCheckbox[`${index}`] === true) {
          let acct_link1 = i[1]?.split(" - ");
          let acct_link2 = i[2]?.split(" - ");
          let data = {
            p_ACCT_LINK1: acct_link1[0],
            p_ACCT_LINK2: acct_link2[0],
            p_DUE_DATE: i[4],
            p_DUE_AMOUNT: NumberWithoutCommas(i[3]),
            p_AMENDED_BY: JSON.parse(localStorage.getItem("userInfo")).id,
            p_AMENDED_DATE: todayDate,
            p_BATCH_NO: i[0],
            p_PAYMENT_ID: i[5],
            p_STATUS: decode(i[8]),
            p_REFERENCE_NBR: i[7],
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
            type: "PREP",
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

  function handleRefresh() {
    fetchPrepaymentSchedule1(batchNum, "", "");
    setDueDate("");
    setStuatusfilter("");
  }

  useMemo(() => handleRefresh(), [refresh]);

  function fetchPrepaymentSchedule1(batchNumber, due, status) {
    try {
      setloading(true);
      let arr = [];
      axios
        .post(
          API_SERVER + "/api/get-prepayment-schedule-details-manual",
          { batch_no: batchNumber, due: due, statusFlag: status },
          { headers }
        )
        .then((response) => {
          response.data?.map((i, index) => {
            arr.push([
              i?.schedule_id,
              i?.acct_link1,
              i?.acct_link2,
              formatNumber(i?.due_amount),
              i?.due_date,
              i?.payment_id,
              i?.frequency,
              i?.doc_descrp,
              i?.payment_flag,
              <div className="flex justify-center">
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
          setPrepaymentDataSchedule1(arr);
          setloading(false);
        });
    } catch (error) {
      setloading(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  function handleDueDateChange(value) {
    setDueDate(value);
    fetchPrepaymentSchedule1(batchNum, value, stuatusfilter);
  }

  function statusOnchange(value) {
    setStuatusfilter(value);
    fetchPrepaymentSchedule1(batchNum, dueDate, value);
  }

  return (
    <div>
      <Header
        title={"Prepayment"}
        backgroundColor={"#0580c0"}
        closeIcon={
          <AiOutlineCloseCircle size={18} onClick={() => setshowModal(false)} />
        }
      />
      <div className="p-1">
        <div
          className="pt-3"
          style={{ display: "flex", flex: 1, marginBottom: "15px" }}
        >
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Prepayment Account"}
              labelWidth={"25%"}
              inputWidth={"65%"}
              disabled={true}
              value={prepaymentDataSchedule[0][1]}
            />
          </div>
          <OverlayLoader
            postLoader={postLoader || fetchData}
            // color={"#0580c0"}
            textColor={true}
            displayText={postLoader ? "Loading..." : "Fetching Data..."}
          />
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
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <InputField
              label={"Expense Account"}
              labelWidth={"25%"}
              inputWidth={"65%"}
              disabled={true}
              value={prepaymentDataSchedule[0][2]}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <SelectField
              label={"Status"}
              labelWidth={"25%"}
              inputWidth={"55%"}
              data={[
                { label: "Paid", value: "P" },
                { label: "Unpaid", value: "Y" },
                { label: "Suspended", value: "S" },
                { label: "Cancelled", value: "C" },
              ]}
              onChange={(value) => statusOnchange(value)}
              value={stuatusfilter}
            />
          </div>
        </div>
      </div>
      <hr className="mb-2" />
      <div className="flex px-2 mb-2">
        <div className="w-[50%] justify-end">
          {" "}
          <SelectField
            label={"Action"}
            labelWidth={"25%"}
            inputWidth={"45%"}
            required={true}
            data={[
              { label: "Pay", value: "P" },
              { label: "Cancel", value: "C" },
              { label: "Suspend", value: "S" },
              { label: "Reverse", value: "R" },
            ]}
            onChange={(value) => setAction(value)}
          />
        </div>
        <div className="flex justify-end gap-2 w-[50%]">
          <ButtonComponent
            label={"OK"}
            buttonHeight={"30px"}
            buttonWidth={"55px"}
            onClick={() => clickOK()}
          />
          <ButtonComponent
            label={"Refresh"}
            buttonHeight={"30px"}
            buttonWidth={"65px"}
            onClick={() => handleRefresh()}
          />
          <ButtonComponent
            label={"Exit"}
            buttonHeight={"30px"}
            buttonWidth={"45px"}
            onClick={() => {
              setshowModal(false);
              clearCheckboxes();
            }}
          />
        </div>
      </div>
      <div className="px-1" style={{ zoom: 0.85 }}>
        <CustomTable
          data={
            prepaymentDataSchedule1
              ? prepaymentDataSchedule1
              : prepaymentDataSchedule
          }
          rowsPerPage={10}
          loading={{ status: loading, message: "Processing Data..." }}
          style={{ columnAlignRight: [4], columnFormat: [4] }}
          headers={[
            "Batch Number",
            "Prepayment Account",
            "Expense Account",
            "Due Amount",
            "Due Date",
            "Payment ID",
            "Frequency",
            "Document Description",
            "Status",
            "Check",
          ]}
        />
      </div>
    </div>
  );
}

export default PrepaymentScheduleManual;
