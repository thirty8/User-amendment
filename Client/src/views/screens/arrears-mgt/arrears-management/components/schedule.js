import React, { useEffect, useState } from "react";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../../../components/others/Fields/InputField";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";

function LoanGeneralSchedule({ facilityNumber, onClose }) {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

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

  //   NUMBER FORMATTER
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // STATES AND VARIABLES
  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleTableData, setScheduleTableData] = useState([]);
  const scheduleHeaders = [
    <div>Seq. No</div>,
    <div>Date Due</div>,
    <div>Principal</div>,
    <div>Interest</div>,
    <div>Total Installment</div>,
    <div>Principal Paid</div>,
    <div>Interest Paid</div>,
    <div>Princ. Repay Date</div>,
    <div>Int. Repay Date</div>,
  ];

  //   EFFECTs
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-arrears-loan-general-data",
        { facility_no: facilityNumber },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setScheduleData(response.data[0]);
        console.log(response.data[0], "SCHHE");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    axios
      .post(
        API_SERVER + "/api/get-arrears-loan-general-schedule",
        { facility_no: facilityNumber },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setScheduleTableData(response.data);
        console.log(response.data[0], "AATRAVIS");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //   TABLE DATE
  var schTable = scheduleTableData?.map((i) => {
    return [
      <div>{i?.repay_seq_no}</div>,
      <div>{formatDate(i?.date_due)}</div>,
      <div style={{ textAlign: "right" }}>{formatNumber(i?.principal)}</div>,
      <div style={{ textAlign: "right" }}>{formatNumber(i?.interest)}</div>,
      <div style={{ textAlign: "right" }}>{formatNumber(i?.monthp)}</div>,
      <div style={{ textAlign: "right" }}>{formatNumber(i?.prp)}</div>,
      <div style={{ textAlign: "right" }}>{formatNumber(i?.int_paid)}</div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(i?.prin_repay_date)}
      </div>,
      <div style={{ textAlign: "right" }}>{i?.intpaide_date}</div>,
    ];
  });
  return (
    <div>
      <Header
        headerShade
        title={"Loan General Enquiry"}
        closeIcon={true}
        handleClose={() => onClose()}
      />

      <div style={{ flex: 1, display: "flex", marginTop: "3px" }}>
        {/* TOP SECTION - LEFT <<< */}
        <div
          style={{ flex: 0.5, border: "1px solid #ccc", marginRight: "5px" }}
          className="space-y-4"
        >
          <Header headerShade title={"Loan Details"} />

          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "50%" }} className="space-y-4">
              <InputField
                label={"Facility No."}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={scheduleData?.facility_no}
                color={"orange"}
              />

              <InputField
                label={"Effective Date"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={
                  formatDate(scheduleData?.effective_date) ===
                  "Invalid Date-INV-Invalid Date"
                    ? ""
                    : formatDate(scheduleData?.effective_date)
                }
              />

              <InputField
                label={"Principal A/C"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={scheduleData?.principal_account}
              />

              <InputField
                label={"Amount Granted"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(scheduleData?.facility_amount)}
              />

              <InputField
                label={"Interest Type"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={scheduleData?.int_type}
              />

              <InputField
                label={"Princ. Repay Plan"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={scheduleData?.repay_plan}
              />
            </div>
            <div style={{ width: "50%" }} className="space-y-4">
              <InputField
                inputWidth={"90%"}
                disabled
                value={scheduleData?.type_of_acct}
              />

              <InputField
                label={"Tenor"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={scheduleData?.tenor}
              />

              <InputField
                label={"Expiry Date"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={
                  formatDate(scheduleData?.last_repay_date) ===
                  "Invalid Date-INV-Invalid Date"
                    ? ""
                    : formatDate(scheduleData?.last_repay_date)
                }
              />

              <InputField
                label={"Repayment A/C"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={scheduleData?.maintenance_fee_account}
              />

              <InputField
                label={"Interest Rate"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={formatNumber(parseFloat(scheduleData?.interest_rate))}
                textAlign={"right"}
              />

              <InputField
                label={"Classification"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={scheduleData?.ac_class}
              />

              <InputField
                label={"Int. Repay Plan"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={scheduleData?.int_repay}
              />
              <br />
            </div>
          </div>
        </div>

        {/* TOP SECTION - RIGHT >>> */}
        <div
          style={{ flex: 0.5, border: "1px solid #ccc" }}
          className="space-y-4"
        >
          <Header headerShade title={"Loan Balance Details"} />

          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "50%" }} className="space-y-6">
              <InputField
                label={"Principal Balance"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(scheduleData?.loan_bal))}
              />

              <InputField
                label={"Accrued Interest"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(scheduleData?.accr_int))}
              />

              <InputField
                label={"Accrued Penal"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(scheduleData?.penal_amt))}
              />

              <div>
                <b>
                  <InputField
                    label={"Total Loan Balance"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    disabled
                    textAlign={"right"}
                    color={"red"}
                    value={formatNumber(parseFloat(scheduleData?.total_amt))}
                  />
                </b>
              </div>
            </div>
            <div style={{ width: "50%" }} className="space-y-6">
              <InputField
                label={"Principal Past Due"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(scheduleData?.prin_pastdue))}
              />

              <InputField
                label={"Interest Past Due"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(scheduleData?.od_int_pastdue))}
              />

              <InputField
                label={"Penal Past Due"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(scheduleData?.pen_int_pastdue))}
              />

              <InputField
                label={"Interest in Susp."}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(scheduleData?.int_susp))}
              />

              <InputField
                label={"Penal in Susp."}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                textAlign={"right"}
                value={formatNumber(parseFloat(scheduleData?.penal_susp))}
              />
            </div>
          </div>
        </div>
      </div>

      <br />

      <div style={{ zoom: 0.85 }}>
        <CustomTable
          data={schTable}
          // green
          headers={scheduleHeaders}
          load={loading}
        />
      </div>
    </div>
  );
}

export default LoanGeneralSchedule;
