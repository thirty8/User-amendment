import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";

function WaiverOptionApproval({
  data1,
  data2,
  balanceToRescheduleValue,
  passedWaiverOptionDetails,
}) {
  // STATES AND CONSTANTS
  const [totalLoanBalances, setTotalLoanBalances] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
    loanPrincipal: 0,
    newLoanAfterWaivers: 0,
  });
  const [actualAmounts, setActualAmounts] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
  });
  const [waiverPercentage, setWaiverPercentage] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
    totalAmount: 0,
  });
  const [waiverAmount, setWaiverAmount] = useState({
    interest: 0,
    penalty: 0,
    arrears: 0,
  });

  // USEFUL FUNCTIONS
  // DATE FORMATTER FUNCTION
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

  // FORMAT NUMBER FUNCTION
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // EFFECTS
  useEffect(() => {
    const principal = parseFloat(data2[0]?.SHADOW_BALANCE_TODAY);
    const interest = parseFloat(data2[0]?.OD_INTEREST_AMOUNT);
    const penalty = parseFloat(data2[0]?.COT_AMOUNT);
    const arrInterest = parseFloat(data2[0]?.ARREARS_INT);

    setActualAmounts({
      interest: formatNumber(parseFloat(data2[0]?.OD_INTEREST_AMOUNT)),
      penalty: formatNumber(parseFloat(data2[0]?.COT_AMOUNT)),
      arrears: formatNumber(parseFloat(data2[0]?.ARREARS_INT)),
    });

    setTotalLoanBalances({
      interest: formatNumber(parseFloat(data2[0]?.OD_INTEREST_AMOUNT)),
      penalty: formatNumber(parseFloat(data2[0]?.COT_AMOUNT)),
      arrears: formatNumber(parseFloat(data2[0]?.ARREARS_INT)),
      loanPrincipal: formatNumber(parseFloat(data2[0]?.SHADOW_BALANCE_TODAY)),
      newLoanAfterWaivers: principal + interest + penalty + arrInterest,
    });
  }, [data2]);

  // PASSING VALUES FROM HERE TO PARENT
  useEffect(() => {
    if (balanceToRescheduleValue) {
      balanceToRescheduleValue({
        totalBal: parseFloat(totalLoanBalances?.newLoanAfterWaivers),
        amt: parseFloat(data1?.REPAYMENT_AMOUNT),
      });
    }
  }, [
    balanceToRescheduleValue,
    data1?.REPAYMENT_AMOUNT,
    totalLoanBalances?.newLoanAfterWaivers,
  ]);

  useEffect(() => {
    if (passedWaiverOptionDetails) {
      passedWaiverOptionDetails({
        totalLoanBalances,
      });
    }
  }, [passedWaiverOptionDetails, totalLoanBalances]);

  return (
    <div className="space-y-4">
      <div className="mt-4">
        {/* WAIVER OPTION */}
        <InputField
          label={"Waiver"}
          required
          labelWidth={"25%"}
          inputWidth={"40%"}
          disabled
          value={
            data1?.WAIVER_OPTION === "99"
              ? "99 - MANUAL WAIVERS"
              : data1?.WAIVER_OPTION === "00"
              ? "00 - NOT APPLICABLE"
              : data1?.WAIVER_OPTION === "01"
              ? "01 - WAIVE ACCRUED INTEREST"
              : data1?.WAIVER_OPTION === "02"
              ? "WAIVE ACCRUED PENALTY"
              : data1?.WAIVER_OPTION === "03"
              ? "03 - WAIVE INTEREST AND PENALTY"
              : ""
          }
        />
      </div>

      <hr />

      {/* WAIVER %, WAIVER AMOUNT AND ACTUAL AMOUNT */}
      <div className="flex flex-1">
        <div className="flex-[0.25] text-white text-right">balance.</div>
        <div className="flex-[0.25] text-center">Waiver %</div>
        <div className="flex-[0.25] text-center">Waiver Amount</div>
        <div className="flex-[0.25] text-center">Actual Amount</div>
      </div>

      {/* INTEREST */}
      <div className="flex flex-1">
        <div className="flex-[0.25] text-center text-sm">Interest</div>
        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={waiverPercentage?.interest}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={waiverAmount?.interest}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={actualAmounts?.interest}
          />
        </div>
      </div>

      {/* PENALTY */}
      <div className="flex flex-1">
        <div className="flex-[0.25] text-center text-sm">Penalty</div>
        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={waiverPercentage?.penalty}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={waiverAmount?.penalty}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={actualAmounts?.penalty}
          />
        </div>
      </div>

      {/* ARREARS */}
      <div className="flex flex-1">
        <div className="flex-[0.25] text-center text-sm">Arrears</div>
        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={waiverPercentage?.arrears}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={waiverAmount?.arrears}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled
            value={actualAmounts?.arrears}
          />
        </div>
      </div>

      <hr />

      {/* LOAN BALANCE */}
      <InputField
        label={"Total Interest To be Paid"}
        labelWidth={"50%"}
        inputWidth={"45%"}
        disabled
        textAlign={"right"}
        value={totalLoanBalances?.interest}
      />

      <InputField
        label={"Total Penalty To be Paid"}
        labelWidth={"50%"}
        inputWidth={"45%"}
        disabled
        textAlign={"right"}
        value={totalLoanBalances?.penalty}
      />

      <InputField
        label={"Total Arrears To be Paid"}
        labelWidth={"50%"}
        inputWidth={"45%"}
        disabled
        textAlign={"right"}
        value={totalLoanBalances?.arrears}
      />

      <InputField
        label={"Loan Principal"}
        labelWidth={"50%"}
        inputWidth={"45%"}
        disabled
        textAlign={"right"}
        value={totalLoanBalances?.loanPrincipal}
      />

      <InputField
        label={"New Loan Balance After Waiver(s)"}
        labelWidth={"50%"}
        inputWidth={"45%"}
        disabled
        textAlign={"right"}
        value={formatNumber(parseFloat(totalLoanBalances?.newLoanAfterWaivers))}
      />

      <InputField
        label={"Remaining Loan Balance After Reduction"}
        labelWidth={"50%"}
        inputWidth={"45%"}
        disabled
        textAlign={"right"}
        value={
          data1?.PAYMENT_TYPE === "T"
            ? formatNumber(
                parseFloat(totalLoanBalances?.newLoanAfterWaivers) +
                  parseFloat(data1?.REPAYMENT_AMOUNT)
              )
            : data1?.PAYMENT_TYPE === "C"
            ? formatNumber(
                parseFloat(totalLoanBalances?.newLoanAfterWaivers) -
                  parseFloat(data1?.REPAYMENT_AMOUNT)
              )
            : data1?.PAYMENT_TYPE === "R"
            ? formatNumber(parseFloat(totalLoanBalances?.newLoanAfterWaivers))
            : data1?.PAYMENT_TYPE === "E"
            ? 0
            : ""
        }
      />
    </div>
  );
}

export default WaiverOptionApproval;
