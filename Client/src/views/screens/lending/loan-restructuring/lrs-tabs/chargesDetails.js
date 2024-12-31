import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../../../App";

function ChargesDetails({ formDetails, chargesDetails, waiver }) {
  // STATES AND VARIABLES
  const [fee, setFee] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [insuranceRate, setInsuranceRate] = useState(0);

  // FUNCTIONS
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // TOTAL FEES
  const handleCalculateTotalFee = (feeValue) => {
    if (insurance === "") {
      setInsurance(0);
    }

    setTotalFee(parseFloat(feeValue) + parseFloat(insurance) * 11.35);
  };

  // GET INSURANCE RATE
  function getInsuranceRate(insurance_amt) {
    axios
      .post(
        API_SERVER + "/api/get-insurance-rate",
        {
          // TODO: fix this
          // balance_remaining:
          //   waiver === "01" ||
          //   waiver === "02" ||
          //   waiver === "03" ||
          //   waiver === "99"
          //     ? remainingBalanceWithAmount
          //     : remainingLoanBalanceAfterReduction,
          insurance_amt: insurance_amt,
        },
        { headers: headers }
      )
      .then(function (response) {
        setInsuranceRate(response.data[0]?.INSURANCE_RATE);
      })
      .catch((err) => console.log(err));
  }

  // EFFECTS
  useEffect(() => {
    handleCalculateTotalFee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fee]);

  useEffect(() => {
    setFee(0);
    setInsurance(0);
    setTotalFee(0);
  }, [formDetails]);

  useEffect(() => {
    if (chargesDetails) {
      chargesDetails({
        fee,
        insurance,
        totalFee,
        insuranceRate,
      });
    }
  }, [fee, insurance, chargesDetails, totalFee, insuranceRate]);

  return (
    <div>
      <br />

      <div className="space-y-4  rounded-md mx-8 p-4">
        <InputField
          label={"Fee"}
          textAlign={"right"}
          labelWidth={"30%"}
          inputWidth={"45%"}
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCalculateTotalFee(fee);
            }
          }}
        />

        <div className="flex">
          <InputField
            label={"Insurance"}
            textAlign={"right"}
            labelWidth={"60%"}
            inputWidth={"30%"}
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCalculateTotalFee(fee);
                getInsuranceRate();
              }
            }}
          />

          <InputField
            textAlign={"right"}
            inputWidth={"50%"}
            value={insurance === "" ? 0 : parseFloat(insurance) * 11.35}
          />
        </div>

        <hr />

        <InputField
          label={"Total Fees Amount"}
          textAlign={"right"}
          labelWidth={"30%"}
          inputWidth={"45%"}
          disabled
          value={
            totalFee === "NaN" || isNaN(totalFee)
              ? 0
              : formatNumber(parseFloat(totalFee))
          }
        />
      </div>
    </div>
  );
}

export default ChargesDetails;
