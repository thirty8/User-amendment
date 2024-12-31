import React, { useEffect, useState } from "react";
import Header from "../../../../components/others/Header/Header";
import CustomTable from "../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";

function Schedule({ fn }) {
  // states
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [reportingSchedule, setReportingSchedule] = useState("");

  // table headers
  var loanScheduleHeaders = [
    "Seq No",
    "Date Due",
    <div style={{ textAlign: "right" }}>Principal</div>,
    <div style={{ textAlign: "right" }}>Interest</div>,
    <div style={{ textAlign: "right" }}>Total Installment</div>,
    <div style={{ textAlign: "right" }}>Principal Paid</div>,
    <div style={{ textAlign: "right" }}>Interest Paid</div>,
    "Pri. Repay Date",
    "Int Repay Date",
  ];

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
    return `${month}-${day}-${year}`;
  }

  // number formatter
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  //headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // use effects
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-schedule-dets",
        {
          facility_no: fn,
        },
        { headers: headers }
      )
      .then(function (response) {
        setScheduleData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let totalPrincipalDueValue = 0;
  let totalInterestDueValue = 0;
  let totalMonthP = 0;

  // insertion
  var schedules = scheduleData.map((i) => {
    const principalDueValue = parseFloat(i?.principal);
    const interestValue = parseFloat(i?.interest);
    const monthPValue = parseFloat(i?.monthp);

    // Add the values to the totals if they are not NaN
    if (!isNaN(principalDueValue)) {
      totalPrincipalDueValue += principalDueValue;
    }
    if (!isNaN(interestValue)) {
      totalInterestDueValue += interestValue;
    }
    if (!isNaN(monthPValue)) {
      totalMonthP += monthPValue;
    }
    return [
      <div>{i?.repay_seq_no}</div>,
      <div>{formatDate(i?.date_due)}</div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.principal))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.interest))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.monthp))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.prp))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.int_paid))}
      </div>,
      <div>
        {formatDate(i?.ppd) === "INVALID DATE-Invalid Date-Invalid Date"
          ? ""
          : formatDate(i?.ppd)}
      </div>,
      <div>
        {formatDate(i?.intpaide_date) === "null" ||
        formatDate(i?.intpaide_date) ===
          "INVALID DATE-Invalid Date-Invalid Date"
          ? ""
          : formatDate(i?.intpaide_date)}
      </div>,
    ];
  });

  return (
    <div>
      <Header title="Schedule/Repayment" headerShade />
      <CustomTable
        headers={loanScheduleHeaders}
        data={schedules}
        hidePagination
        rowsPerPage={99999}
        load={loading}
      />

      {/* total */}
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            height: "40px",
            display: "grid",
            placeItems: "center",
            fontWeight: "700",
            textDecoration: "underline",
            fontSize: "20px",
          }}
        >
          Total
        </div>
        <div></div>
        <div
          style={{
            // backgroundColor: "#a8ffcf",
            height: "40px",
            display: "grid",
            placeItems: "center",
            fontWeight: "700",
            borderRadius: "5px",
          }}
        >
          Total Principal: {formatNumber(parseFloat(totalPrincipalDueValue))}
        </div>
        <div
          style={{
            // backgroundColor: "#a8ffcf",
            height: "40px",
            display: "grid",
            placeItems: "center",
            fontWeight: "700",
            borderRadius: "5px",
          }}
        >
          Total Interest: {formatNumber(parseFloat(totalInterestDueValue))}
        </div>
        <div
          style={{
            // backgroundColor: "#a8ffcf",
            height: "40px",
            display: "grid",
            placeItems: "center",
            fontWeight: "700",
            borderRadius: "5px",
          }}
        >
          Total Installment: {" " + formatNumber(parseFloat(totalMonthP))}
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Schedule;
