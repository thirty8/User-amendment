import React, { useState, useEffect, useRef } from "react";
import coop from "../../../../assets/coop.png";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import CustomTable from "../../control-setups/components/CustomTable";
import { useReactToPrint } from "react-to-print";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";

function PrintRepayments({ fn, setShowBg }) {
  // print functionality
  const componentRef = useRef();

  // print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [printRepaymentsSchedule, setPrintRepaymentsSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/loan-repayments",
        {
          facility_number: fn,
        },
        { headers: headers }
      )
      .then(function (response) {
        setPrintRepaymentsSchedule(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  var repaymentData = printRepaymentsSchedule?.map((i) => {
    return [
      <div>{i?.int_seq_no}</div>,
      <div>{formatDate(i?.activity_date)}</div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.calc_principal_amount))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.calc_int_amount))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.monthly_p))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.pr))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.int))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.total_rep))}
      </div>,
      <div>
        {formatDate(i?.ppd) === "INVALID DATE-Invalid Date-Invalid Date"
          ? ""
          : formatDate(i?.ppd)}
      </div>,
      <div>
        {formatDate(i?.int_date) === "INVALID DATE-Invalid Date-Invalid Date"
          ? ""
          : formatDate(i?.int_date)}
      </div>,
    ];
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px",
          zoom: "0.95",
        }}
      >
        <ButtonComponent
          label={"Print Report"}
          // buttonWidth={"100px"}
          onClick={handlePrint}
          buttonHeight={"40px"}
          buttonWidth={"200px"}
        />
      </div>
      <div ref={componentRef}>
        <div className="space-y-2 mr-4">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            COOPTECH
          </div>

          <div
            style={{
              fontSize: "15px",
              textDecoration: "capitalize",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Loan Repayments
          </div>
        </div>

        {/* details */}
        <div></div>

        {/* table */}
        <div style={{ zoom: "0.8" }}>
          <CustomTable
            headers={[
              <div>No.</div>,
              <div>Repayment Date</div>,
              <div style={{ textAlign: "right" }}>Principal Amt</div>,
              <div style={{ textAlign: "right" }}>Interest Amt</div>,
              <div style={{ textAlign: "right" }}>Installments</div>,
              <div style={{ textAlign: "right" }}>Principal Paid</div>,
              <div style={{ textAlign: "right" }}>Interest Paid</div>,
              <div style={{ textAlign: "right" }}>Total Paid</div>,
              <div style={{ textAlign: "center" }}>Prin. Date Paid</div>,
              <div style={{ textAlign: "center" }}>Int. Date Paid</div>,
            ]}
            data={repaymentData}
            load={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default PrintRepayments;
