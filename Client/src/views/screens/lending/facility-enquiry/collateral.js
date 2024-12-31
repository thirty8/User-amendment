import React, { useEffect, useState } from "react";
import Header from "../../../../components/others/Header/Header";
import CustomTable from "../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { headers } from "./../../teller-ops/teller/teller-activities";

function Collateral({ principalAccount }) {
  const collateralHeaders = [
    "Sr.No",
    "Collateral No",
    "Collateral Type",
    "Amount Considered",
    "Loan Amount",
    "Loan % Covered",
    "Amount utilized",
  ];

  // FUNCTIONS
  // NUMBER FORMATTER
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const [loading, setLoading] = useState(true);
  const [collateralData, setCollateralData] = useState([]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-get-collateral",
        {
          principalAccount: principalAccount,
        },
        { headers: headers }
      )
      .then(function (response) {
        setLoading(false);
        setCollateralData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var collData = collateralData?.map((i) => {
    return [
      <div>{i?.sr_no}</div>,
      <div>{i?.collateral_no}</div>,
      <div>{i?.coll_type}</div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.amount_considered))}
      </div>,
      <div className="text-right">{formatNumber(parseFloat(i?.amount))}</div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.loan_p_covered))}
      </div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.value_used))}
      </div>,
    ];
  });

  return (
    <div>
      <div>
        <Header title="Collateral" backgroundColor={"#a4e7bd"} headerShade />
        <CustomTable
          hidePagination
          headers={collateralHeaders}
          load={loading}
          data={collData}
        />
      </div>
    </div>
  );
}

export default Collateral;
