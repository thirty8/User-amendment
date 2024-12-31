import React, { useEffect, useState } from "react";
import Header from "../../../../components/others/Header/Header";
import CustomTable from "../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { headers } from "./../../teller-ops/teller/teller-activities";

function Documents({ principal_account }) {
  const documentHeaders = [
    "S/No",
    "Description",
    "Document No.",
    "View",
    "Doc. Date",
    "Doc. Expiry Date",
    "Mand",
    "Received Date",
  ];

  // FUNCTIONS
  function formatDate(dateString) {
    const originalDate = new Date(dateString);
    if (isNaN(originalDate?.getTime())) {
      return ""; // Return empty string for invalid dates
    }

    const formattedDate = originalDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase()
      .replace(/ /g, "-");
    return formattedDate;
  }

  // STATES
  const [loading, setLoading] = useState(false);
  const [documentsData, setDocumentsData] = useState([]);

  // EFFECTS
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
        setDocumentsData(response?.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // VARIABLES
  var docs = documentsData?.map((i) => {
    return [
      <div className="text-left">{i?.fullname}</div>,
      <div>{i?.sr_no}</div>,
      <div>{i?.sr_no}</div>,
      <div>{i?.doc_no}</div>,
      <div>
        {formatDate(i?.doc_date) === "Invalid Date-INV-Invalid Date"
          ? ""
          : formatDate(i?.doc_date)}
      </div>,

      <div>
        {formatDate(i?.expiry_date) === "Invalid Date-INV-Invalid Date"
          ? ""
          : formatDate(i?.expiry_date)}
      </div>,
      <div>{i?.mandatory}</div>,
      <div>
        {formatDate(i?.received_date) === "Invalid Date-INV-Invalid Date"
          ? ""
          : formatDate(i?.received_date)}
      </div>,
    ];
  });

  return (
    <div>
      <Header title="Documents" headerShade />
      <CustomTable
        headers={documentHeaders}
        green
        hidePagination
        load={loading}
        data={docs}
      />
    </div>
  );
}

export default Documents;
