import React, { useEffect, useState } from "react";
import CustomTable from "../../control-setups/components/CustomTable";
import Header from "../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { FiX } from "react-icons/fi";
import InputField from "../../../../components/others/Fields/InputField";

function ViewAllLoans({ customer_number, closeLoansModal }) {
  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

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

  // table headers
  const allLoansHeaders = [
    "Facility Type",
    "Account No.",
    "CCY",
    "Loan Amount",
    "Loan Amount Fcy",
    "Exp Date",
  ];

  //states
  const [allLoans, setAllLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-view-all-loans",
        {
          customer_number: customer_number,
        },
        { headers }
      )
      .then(function (response) {
        console.log(response.data, "lindate");
        setAllLoans(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  let totalMonthlyInstallments = 0;

  //insertion into the table
  var loans = allLoans.map((i) => {
    const installAmt = parseFloat(i?.install_amt);

    // Add the values to the totals if they are not NaN
    if (!isNaN(installAmt)) {
      totalMonthlyInstallments += installAmt;
    }
    return [
      <div>{i?.fac_type}</div>,
      <div>{i?.facility_no}</div>,
      <div>{i?.ccy}</div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.loan_amt))}
      </div>,
      <div style={{ textAlign: "right" }}>
        {formatNumber(parseFloat(i?.loan_amt_fcy))}
      </div>,
      <div>{formatDate(i?.exp_date)}</div>,
    ];
  });

  return (
    <div>
      <div style={{ zoom: 0.87, padding: "9px" }}>
        <Header
          title="All Loans"
          headerShade
          handleClose={closeLoansModal}
          closeIcon
        />
        <CustomTable
          headers={allLoansHeaders}
          data={loans}
          rowsPerPage={15}
          load={loading}
          hidePagination
        />

        <div style={{ margin: "5px", paddingBottom: "10px" }}>
          <InputField
            label={"Total Monthly Installment"}
            labelWidth={"20%"}
            textAlign={"right"}
            inputWidth={"20%"}
            value={formatNumber(parseFloat(totalMonthlyInstallments))}
            disabled
            labelColor={"green"}
            color={"green"}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewAllLoans;
