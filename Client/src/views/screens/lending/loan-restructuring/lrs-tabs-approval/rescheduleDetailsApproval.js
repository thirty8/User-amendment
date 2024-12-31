import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiEye } from "react-icons/fi";
import { Modal, ScrollArea } from "@mantine/core";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../../../App";
import Header from "../../../../../components/others/Header/Header";

function RescheduleDetailsApproval({ data1, data2, data4, balToResch }) {
  // STATES
  const [scheduleModal, setScheduleModal] = useState(false);
  const [scheduledData, setScheduledData] = useState([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [nextScheduleDate, setNextScheduleDate] = useState("");

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

  // GET PREVIEW SCHEDULE
  async function getPreviewSchedule() {
    setPreviewLoading(true);
    await axios
      .post(
        API_SERVER + "/api/get-preview-sch",
        {
          facility_number: data2[0]?.FACILITY_NO,
        },
        { headers: headers }
      )
      .then(function (response) {
        setScheduledData(response.data);
        setPreviewLoading(false);
        setScheduleModal(true);
      })
      .catch((err) => {
        console.log(err);
        setPreviewLoading(false);
      });
  }

  // VARIABLES AND HEADERS
  // HEADERS
  const quotationHeaders = [
    <div>Seq No.</div>,
    <div>Date Due</div>,
    <div>Principal</div>,
    <div>Interest</div>,
    <div>Payment</div>,
    <div>Processing Fees</div>,
  ];

  // DATA
  var previewScheduleData = scheduledData?.map((i) => {
    return [
      <div>{i?.REPAY_SEQ_NO}</div>,
      <div>{formatDate(i?.DATE_DUE)}</div>,
      <div>{formatNumber(parseFloat(i?.PRINCIPAL))}</div>,
      <div>{formatNumber(parseFloat(i?.INTEREST))}</div>,
      <div>{formatNumber(parseFloat(i?.MONTHP))}</div>,
      <div>{formatNumber(parseFloat(i?.PROC_FEES))}</div>,
    ];
  });

  useEffect(() => {
    // get next schedule
    axios
      .post(
        API_SERVER + "/api/get-nxtSchedule",
        {
          facility_no: data2[0]?.FACILITY_NO,
        },
        { headers }
      )
      .then((response) => {
        setNextScheduleDate(response.data[0]?.MAX?.split("T")[0]);
        console.log(response.data[0]?.MAX?.split("T")[0], "App data next sche");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data2]);

  return (
    <div>
      <br />
      <div className="space-y-4 pl-10 rounded-md mx-8 p-4">
        <InputField
          label={"Balance To Reschedule"}
          textAlign={"right"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={
            data1?.PAYMENT_TYPE === "T"
              ? formatNumber(
                  parseFloat(balToResch?.totalBal) + parseFloat(balToResch?.amt)
                )
              : data1?.PAYMENT_TYPE === "C"
              ? formatNumber(
                  parseFloat(balToResch?.totalBal) - parseFloat(balToResch?.amt)
                )
              : data1?.PAYMENT_TYPE === "R"
              ? formatNumber(parseFloat(balToResch?.totalBal))
              : data1?.PAYMENT_TYPE === "E"
              ? 0
              : ""
          }
        />

        <div className="flex w-full">
          <div className="w-[80%]">
            <InputField
              label={"Interest Rate P.M / P.A"}
              textAlign={"right"}
              labelWidth={"110%"}
              inputWidth={"30%"}
              required
              disabled
              value={isNaN(data4?.INT_RATE / 12) ? "" : data4?.INT_RATE / 12}
            />
          </div>
          <div className="w-1/2">
            <InputField
              textAlign={"right"}
              disabled
              inputWidth={"48%"}
              value={data4?.INT_RATE}
            />
          </div>
        </div>

        <InputField
          label={"New Tenor (in Months)"}
          textAlign={"right"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          disabled
          value={data4?.REPNT_PERIOD_MONTHS}
        />

        <InputField
          label={"Interest Type"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          textAlign={"center"}
          disabled
          value={
            data4?.INT_TYPE === "00"
              ? "00 - UNASSIGN"
              : data4?.INT_TYPE === "01"
              ? "01 - FLAT"
              : data4?.INT_TYPE === "02"
              ? "02 - REDUCING BALANCE"
              : data4?.INT_TYPE === "03"
              ? "03 - AMORTIZATION METHOD"
              : data4?.INT_TYPE === "04"
              ? "04 - DISCOUNTED RATE"
              : data4?.INT_TYPE === "05"
              ? "05 - FLOATING RATE"
              : data4?.INT_TYPE === "06"
              ? "06 - RULE 78 SPREAD"
              : ""
          }
        />

        <InputField
          label={"Principal Repayment Frequency"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          textAlign={"center"}
          required
          disabled
          value={
            data2[0]?.REPAYMENT_PLAN === "07"
              ? "07 - BI-MONTHLY"
              : data2[0]?.REPAYMENT_PLAN === "01"
              ? "01 - WEEKLY"
              : data2[0]?.REPAYMENT_PLAN === "02"
              ? "02 - BI-WEEKLY"
              : data2[0]?.REPAYMENT_PLAN === "03"
              ? "03 - MONTHLY"
              : data2[0]?.REPAYMENT_PLAN === "04"
              ? "04 - QUARTERLY"
              : data2[0]?.REPAYMENT_PLAN === "05"
              ? "05 - BULLET WITHOUT INTEREST"
              : data2[0]?.REPAYMENT_PLAN === "06"
              ? "06 - BULLET WITH INTEREST"
              : data2[0]?.REPAYMENT_PLAN === "08"
              ? "08 - SEMI-ANNUAL"
              : data2[0]?.REPAYMENT_PLAN === "09"
              ? "09 - ANNUAL"
              : ""
          }
        />

        <InputField
          label={"Interest Repayment Frequency"}
          textAlign={"center"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          disabled
          value={
            data2[0]?.INTEREST_REPAY_FREQ === "07"
              ? "07 - BI-MONTHLY"
              : data2[0]?.INTEREST_REPAY_FREQ === "01"
              ? "01 - WEEKLY"
              : data2[0]?.INTEREST_REPAY_FREQ === "02"
              ? "02 - BI-WEEKLY"
              : data2[0]?.INTEREST_REPAY_FREQ === "03"
              ? "03 - MONTHLY"
              : data2[0]?.INTEREST_REPAY_FREQ === "04"
              ? "04 - QUARTERLY"
              : data2[0]?.INTEREST_REPAY_FREQ === "05"
              ? "05 - BULLET WITHOUT INTEREST"
              : data2[0]?.INTEREST_REPAY_FREQ === "06"
              ? "06 - BULLET WITH INTEREST"
              : data2[0]?.INTEREST_REPAY_FREQ === "08"
              ? "08 - SEMI-ANNUAL"
              : data2[0]?.INTEREST_REPAY_FREQ === "09"
              ? "09 - ANNUAL"
              : ""
          }
        />

        <InputField
          label={"Moratorium Period"}
          textAlign={"right"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={data2[0]?.MORATORIUM_PERIOD}
        />

        <InputField
          label={"Moratorium with Interest"}
          textAlign={"center"}
          labelWidth={"45%"}
          disabled
          inputWidth={"35%"}
          value={data4?.INT_MORATO === "N" ? "No" : "Yes"}
        />

        <InputField
          label={"Next Schedule Date"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          textAlign={"center"}
          disabled
          value={formatDate(nextScheduleDate)}
        />

        <InputField
          label={"Effective Date"}
          textAlign={"center"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          disabled
          value={
            formatDate(data4?.POSTING_DATE) === "Invalid Date-INV-Invalid Date"
              ? ""
              : formatDate(data4?.POSTING_DATE)
          }
        />

        <hr />

        <div className="flex justify-end mr-24" style={{ zoom: 0.9 }}>
          <ButtonComponent
            label={"Preview Schedule"}
            buttonHeight={"30px"}
            buttonBackgroundColor={"#070269"}
            buttonWidth={"180px"}
            fontSize={"95%"}
            buttonIcon={<FiEye />}
            onClick={() => {
              getPreviewSchedule();

              // handleButtonFunctionalityPreviewSchedule();
            }}
          />
        </div>
      </div>

      {/* MODAL FOR PREVIEWING SCHEDULE */}
      <Modal
        opened={scheduleModal}
        onClose={() => setScheduleModal(false)}
        size={"60%"}
        padding={"14px"}
        withCloseButton={false}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div style={{ zoom: 0.87 }}>
          <Header
            headerShade
            title="Quotations Schedule"
            handleClose={() => setScheduleModal(false)}
            closeIcon
          />
          <div>
            <CustomTable
              headers={quotationHeaders}
              data={previewScheduleData}
              rowsPerPage={10000}
              hidePagination
              load={previewLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RescheduleDetailsApproval;
