import React, { useState, useEffect } from "react";
import Header from "../../../../components/others/Header/Header";
import CustomTable from "../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";

function Guarantors({ principal_account }) {
  // table Headers
  const guarantorsHeaders = [
    "Guarantor's Name",
    "Relation",
    "ID Type",
    "ID Number",
    "ID Expiry Date",
    "Residence Address",
    "Phone",
    "Net Income Month",
  ];

  // Functions
  //   FORMAT NUMBER
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // FORMAT DATE
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

  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // states
  const [guarantors, setGuarantors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-guarantor",
        {
          principal_acct: principal_account,
        },
        { headers }
      )
      .then(function (response) {
        console.log(response?.data, "GUAA");
        setGuarantors(response?.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var guarantor = guarantors?.map((i) => {
    return [
      <div className="text-left">{i?.fullname}</div>,
      <div>{i?.rel_desc}</div>,
      <div>{i?.id_desc}</div>,
      <div>{i?.id_number}</div>,
      <div>
        {formatDate(i?.id_issue_date_1) === "Invalid Date-INV-Invalid Date"
          ? ""
          : formatDate(i?.id_issue_date_1)}
      </div>,
      <div>{i?.res_address}</div>,
      <div>{i?.telephone}</div>,
      <div>{i?.next_income_month}</div>,
    ];
  });

  return (
    <div>
      <Header title="Guarantor" backgroundColor={"#a4e7bd"} headerShade />
      <CustomTable
        headers={guarantorsHeaders}
        hidePagination
        data={guarantor}
        load={loading}
      />
    </div>
  );
}

export default Guarantors;
