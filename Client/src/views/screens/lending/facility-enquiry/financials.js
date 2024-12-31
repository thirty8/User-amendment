import React, { useEffect, useState } from "react";
import InputField from "../../../../components/others/Fields/InputField";
import Header from "../../../../components/others/Header/Header";
import CustomTable from "../../control-setups/components/CustomTable";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";

function Financials({ principal_account }) {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // NUMBER FORMATTER
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  // STATES
  const [financials, setFinancials] = useState([]);
  const [incomeDetails, setIncomeDetails] = useState([]);
  const [expenditureData, setExpenditureData] = useState([]);
  const [assetDetailsData, setAssetDetailsData] = useState([]);
  const [liabilityData, setLiabilityData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-financials",
        {
          principal_acct: principal_account,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        setLoading(false);
        setFinancials(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // INCOME
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-income-details-financials",
        {
          principal_acct: principal_account,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        setLoading(false);
        setIncomeDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // EXPENDITURE
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-expenditure-details-financials",
        {
          principal_acct: principal_account,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        setLoading(false);
        setExpenditureData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // ASSETS
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-assets-details-financials",
        {
          principal_acct: principal_account,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        setLoading(false);
        setAssetDetailsData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // LIABILITY
    axios
      .post(
        API_SERVER + "/api/loan-general-enquiry-liability-details-financials",
        {
          principal_acct: principal_account,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        setLoading(false);
        setLiabilityData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TABLE DATA
  var incomeResults = incomeDetails?.map((i) => {
    return [
      <div>{i?.income_type}</div>,
      <div>{formatNumber(parseFloat(i?.amount))}</div>,
      <div>{formatNumber(parseFloat(i?.considered_amt))}</div>,
    ];
  });

  var expenditureResults = expenditureData?.map((i) => {
    return [
      <div>{i?.income_type}</div>,
      <div>{formatNumber(parseFloat(i?.amount))}</div>,
    ];
  });

  var assetsResults = assetDetailsData?.map((i) => {
    return [
      <div>{i?.income_type}</div>,
      <div>{formatNumber(parseFloat(i?.amount))}</div>,
    ];
  });

  var liabilityResults = liabilityData?.map((i) => {
    return [
      <div>{i?.income_type}</div>,
      <div>{formatNumber(parseFloat(i?.amount))}</div>,
    ];
  });

  return (
    <div>
      <div className="space-y-4">
        <Header title={"Debit-To-Income Ration - DTI"} headerShade />

        <div className="flex w-full">
          <div className="w-1/2">
            <InputField
              disabled
              labelWidth={"50%"}
              inputWidth={"30%"}
              textAlign={"right"}
              label="Net Income"
            />
          </div>

          <div className="w-1/2">
            <InputField
              disabled
              labelWidth={"30%"}
              inputWidth={"30%"}
              textAlign={"right"}
              label="Total Loans"
              labelColor={"red"}
              color={"red"}
              value={
                formatNumber(parseFloat(financials?.total_loan)) === "NaN"
                  ? ""
                  : formatNumber(parseFloat(financials?.total_loan))
              }
            />
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-1/2">
            <InputField
              disabled
              labelWidth={"50%"}
              inputWidth={"30%"}
              textAlign={"right"}
              label="Yearly Interest"
              value={
                formatNumber(parseFloat(financials?.yearly_interest)) === "NaN"
                  ? ""
                  : formatNumber(parseFloat(financials?.yearly_interest))
              }
            />
          </div>

          <div className="w-1/2">
            <InputField
              disabled
              labelWidth={"30%"}
              inputWidth={"30%"}
              textAlign={"right"}
              label="Monthly Interest"
              value={
                formatNumber(parseFloat(financials?.monthly_interest)) === "NaN"
                  ? ""
                  : formatNumber(parseFloat(financials?.monthly_interest))
              }
            />
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-1/2">
            <InputField
              disabled
              labelWidth={"50%"}
              inputWidth={"30%"}
              textAlign={"right"}
              label="Total Monthly Installment"
              labelColor={"red"}
              color={"red"}
              value={
                formatNumber(parseFloat(financials?.total_installment)) ===
                "NaN"
                  ? ""
                  : formatNumber(parseFloat(financials?.total_installment))
              }
            />
          </div>

          <div className="w-1/2">
            <InputField
              disabled
              labelWidth={"30%"}
              inputWidth={"30%"}
              textAlign={"right"}
              label="No Of Facility"
              value={
                formatNumber(parseFloat(financials?.no_of_facility)) === "NaN"
                  ? ""
                  : formatNumber(parseFloat(financials?.no_of_facility))
              }
            />
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-1/2">
            <InputField
              disabled
              labelWidth={"50%"}
              inputWidth={"30%"}
              textAlign={"right"}
              label="Total Interest"
              labelColor={"red"}
              color={"red"}
              value={
                formatNumber(parseFloat(financials?.total_interest)) === "NaN"
                  ? ""
                  : formatNumber(parseFloat(financials?.total_interest))
              }
            />
          </div>

          <div className="w-1/2">
            <InputField
              disabled
              labelWidth={"30%"}
              inputWidth={"30%"}
              textAlign={"right"}
              label="Total Principal"
              labelColor={"red"}
              color={"red"}
              value={
                formatNumber(parseFloat(financials?.total_principal)) === "NaN"
                  ? ""
                  : formatNumber(parseFloat(financials?.total_principal))
              }
            />
          </div>
        </div>

        <br />

        {/* TABLES */}
        <div className="space-y-4 px-9">
          {/* FIRST ROW OF TWO TABLES */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <Header headerShade title="Income Details (Individual)" />
              <CustomTable
                hidePagination
                data={incomeResults}
                load={loading}
                rowsPerPage={9999}
                headers={["Income Item", "Income Amount", "Amount to Consider"]}
              />
            </div>

            <div className="w-1/2">
              <Header
                headerShade
                title="Expenditure and Other Contributions Details (Individual)"
              />
              <CustomTable
                data={expenditureResults}
                hidePagination
                load={loading}
                rowsPerPage={9999}
                headers={["Expenditure Item", "Amount"]}
              />
            </div>
          </div>

          {/* SECOND ROW OF TWO TABLES */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <Header headerShade title="Asset Details (Individual)" />
              <CustomTable
                hidePagination
                load={loading}
                rowsPerPage={9999}
                data={assetsResults}
                headers={["Assets Item", "Amount"]}
              />
            </div>

            <div className="w-1/2">
              <Header headerShade title="Liability Details (Individual)" />
              <CustomTable
                hidePagination
                data={liabilityResults}
                headers={["Liability Item", "Amount"]}
                load={loading}
                rowsPerPage={9999}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Financials;
