import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../../../control-setups/components/CustomTable";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";

const Summary = ({
  account,
  onClickOfContinue,
  onClickOfPrevious,
  limitNum,
  proposedFacilityDetails,
}) => {
  const [customerStatistics, setCustomerStatistics] = useState([]);
  const [existingFacilityDetails, setexistingFacilityDetails] = useState([]);
  const [proposedFacility, setproposedFacility] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // NUMBER FORMATTER
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  useEffect(() => {
    // get customer statistics
    console.log(account);
    axios
      .post(
        API_SERVER + "/api/get-cust-monthly-statistics-tod",
        {
          acct_link: account?.split(" - ")[0],
        },
        { headers: headers }
      )
      .then(function (response) {
        setCustomerStatistics(response.data, "statistics");
      })
      .catch((err) => console.log(err));

    // get existing facility details
    axios
      .post(
        API_SERVER + "/api/get-existing-facility-deets-tod",
        {
          customer_number: account?.split(" - ")[4],
        },
        { headers: headers }
      )
      .then(function (response) {
        setexistingFacilityDetails(response.data);
      })
      .catch((err) => console.log(err));
  }, [account]);

  // TABLE DATA
  // customer statistics
  var cs = customerStatistics?.map((i) => {
    return [
      <div>{formatDate(i?.month_date)}</div>,
      <div>{formatNumber(parseFloat(i?.highest_balance))}</div>,
      <div>{formatNumber(parseFloat(i?.lowest_balance))}</div>,
      <div>{formatNumber(parseFloat(i?.average_balance))}</div>,
      <div>{formatNumber(parseFloat(i?.debit_turnover))}</div>,
      <div>{formatNumber(parseFloat(i?.credit_turnover))}</div>,
    ];
  });

  // existing facility details
  var ed = existingFacilityDetails?.map((i) => {
    return [
      <div>{i?.fac_type}</div>,
      <div>{i?.loan_ac}</div>,
      <div>{i?.ccy}</div>,
      <div>{formatNumber(parseFloat(i?.rate))}</div>,
      <div>{formatNumber(parseFloat(i?.loan_amt))}</div>,
      <div>{formatNumber(parseFloat(i?.curr_bal))}</div>,
      <div>{formatDate(i?.exp_date)}</div>,
    ];
  });

  var proposFac = [
    {
      facilityType: "Temporal Overdraft",
      currency: proposedFacilityDetails?.currency,
      requestedAmt: proposedFacilityDetails?.requestedAmt,
      tenor: proposedFacilityDetails?.tenor,
      bestRate: proposedFacilityDetails?.bestRate,
    },
  ];

  var pf = proposFac?.map((i) => {
    return [
      <div>{i?.facilityType}</div>,
      <div>{i?.currency}</div>,
      <div>{i?.bestRate}</div>,
      <div>{i?.requestedAmt}</div>,
      <div>
        {parseInt(i?.tenor) > 1 ? `${i?.tenor} days` : `${i?.tenor} day`}
      </div>,
    ];
  });

  return (
    <div style={{ paddingBottom: "90px" }}>
      <div style={{ padding: "10px" }}>
        <div
          style={{
            padding: "5px",
            border: "0.5px solid #d6d7d9",
            borderRadius: "5px",
            width: "35%",
            backgroundColor: "white",
            display: "flex",
          }}
        >
          <div>
            <InputField
              label={"Current Score / Grade"}
              labelWidth={"60%"}
              inputWidth={"40%"}
              disabled
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <ButtonComponent
              label={"View Details"}
              buttonHeight={"33px"}
              buttonWidth={"120px"}
              buttonColor={"white"}
            />
          </div>
        </div>
        <br />
        <div>
          <HeaderComponent
            title={"Customer Monthly Statistics"}
            height={"35px"}
          />
        </div>
        <div>
          <CustomTable
            headers={[
              "Date",
              "Best Balance",
              "Worst Balance",
              "Average Balance",
              "Debit Turnover",
              "Credit Turnover",
            ]}
            data={cs}
            green
            load={loading}
          />
        </div>
        <br />
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 0.5 }}>
            <div>
              <HeaderComponent
                title={"Existing Facility Details"}
                height={"35px"}
              />
            </div>
            <div>
              <CustomTable
                headers={[
                  "Facility Type",
                  "Account Number",
                  "CCY",
                  "Rate",
                  "Limit",
                  "Current Balance",
                  "Expiry Date",
                ]}
                data={ed}
                green
                load={loading}
              />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div>
              <HeaderComponent title={"Proposed Facility"} height={"35px"} />
            </div>
            <div>
              <CustomTable
                headers={[
                  "Facility Type",
                  "Currency",
                  "CCY",
                  "Amount",
                  "Period",
                ]}
                data={pf}
                green
                load={loading}
              />
            </div>
          </div>
        </div>
        <br />
        <div>
          <HeaderComponent title={"Security Details"} height={"35px"} />
        </div>
        <div>
          <CustomTable
            headers={[
              "Reference Number",
              "Collateral Details",
              "CCY",
              "Market Value",
              "Current Value",
              "",
            ]}
            green
            load={loading}
            data={[]}
          />
        </div>

        <div style={{ display: "flex", marginTop: "20px" }}>
          <div>
            <ButtonComponent
              label={"Previous"}
              onClick={onClickOfPrevious}
              buttonHeight={"40px"}
              buttonWidth={"150px"}
            />
          </div>
          <div style={{ marginLeft: "10px" }}>
            <ButtonComponent
              label={"Continue"}
              onClick={onClickOfContinue}
              buttonHeight={"40px"}
              buttonWidth={"150px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
