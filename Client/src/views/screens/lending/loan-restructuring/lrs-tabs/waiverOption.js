import React, { useEffect, useState } from "react";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../../../App";
import InputField from "../../../../../components/others/Fields/InputField";

function WaiverOption({
  formDetails,
  amount,
  transactionType,
  remainingBalance,
  waiverOption,
  total,
}) {
  // STATES AND VARIABLES
  const [waiverOptions, setWaiverOptions] = useState([]);
  const [waiverOptionValue, setWaiverOptionValue] = useState("00");

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
  const [
    remainingLoanBalanceAfterReduction,
    setRemainingLoanBalanceAfterReduction,
  ] = useState(totalLoanBalances?.newLoanAfterWaivers);

  // FUNCTIONS AND USEFUL FORMATTERS
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // CHECKING IF WAIVER IS MANUAL OR NOT
  const isWaiverManual = (value) => {
    if (value === "99") {
      return true;
    } else {
      return false;
    }
  };

  // EFFECTS
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-reschedule-payment",
        { key: "waiver" },
        { headers: headers }
      )
      .then((response) => {
        setWaiverOptions(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // VARIABLES
    const principal = parseFloat(formDetails[0]?.shadow_balance_today);
    const interest = parseFloat(formDetails[0]?.od_accrued_int);
    const penalty = parseFloat(formDetails[0]?.cot_amount);
    const arrInterest = parseFloat(formDetails[0]?.arrears_int);

    setActualAmounts({
      interest: formatNumber(parseFloat(formDetails[0]?.od_accrued_int)),
      penalty: formatNumber(parseFloat(formDetails[0]?.cot_amount)),
      arrears: formatNumber(parseFloat(formDetails[0]?.arrears_int)),
    });

    setTotalLoanBalances({
      interest: formatNumber(parseFloat(formDetails[0]?.od_accrued_int)),
      penalty: formatNumber(parseFloat(formDetails[0]?.cot_amount)),
      arrears: formatNumber(parseFloat(formDetails[0]?.arrears_int)),
      loanPrincipal: formatNumber(
        parseFloat(formDetails[0]?.shadow_balance_today)
      ),
      newLoanAfterWaivers: formatNumber(
        principal + interest + penalty + arrInterest
      ),
    });
  }, [formDetails]);

  useEffect(() => {
    // VARIABLES WE WILL NEED TO PERFORM THE CALCULATIONS
    let principal = parseFloat(formDetails[0]?.shadow_balance_today);
    let interest = parseFloat(formDetails[0]?.od_accrued_int);
    let penalty = parseFloat(formDetails[0]?.cot_amount);
    let arrInterest = parseFloat(formDetails[0]?.arrears_int);
    let amt = parseFloat(amount);
    let newLoanBalance = principal + interest + penalty + arrInterest;

    // LOAN TOP UP, WE DO AN INCREASE HERE
    if (transactionType === "T") {
      setRemainingLoanBalanceAfterReduction(amt + newLoanBalance);
    }

    // CAPITAL REDUCTION WE DO A DEDUCTION HERE
    if (transactionType === "C") {
      setRemainingLoanBalanceAfterReduction(newLoanBalance - amt);
    }

    // RESCHEDULE WE DO NOTHING HERE
    if (transactionType === "R") {
      setRemainingLoanBalanceAfterReduction(newLoanBalance);
    }

    if (transactionType === "") {
      setRemainingLoanBalanceAfterReduction(0.0);
    }
  }, [
    amount,
    formDetails,
    remainingLoanBalanceAfterReduction,
    transactionType,
  ]);

  useEffect(() => {
    // RETURNING AND RECEIVING THE REMAINING LOAN BALANCE AND PASSING IT AS A PROP TO THE RESCHEDULE DETAILS PAGE
    if (remainingBalance) {
      remainingBalance({
        remainingLoanBalanceAfterReduction: isNaN(
          remainingLoanBalanceAfterReduction
        )
          ? totalLoanBalances?.newLoanAfterWaivers
          : remainingLoanBalanceAfterReduction,
      });
    }
  }, [
    remainingBalance,
    remainingLoanBalanceAfterReduction,
    totalLoanBalances?.newLoanAfterWaivers,
  ]);

  useEffect(() => {
    if (waiverOption) {
      waiverOption({
        totalLoanBalances,
        waiverOptionValue,
        waiverPercentage,
        waiverAmount,
        actualAmounts,
        remainingLoanBalanceAfterReduction,
      });
    }
  }, [
    actualAmounts,
    remainingLoanBalanceAfterReduction,
    totalLoanBalances,
    waiverAmount,
    waiverOption,
    waiverOptionValue,
    waiverPercentage,
  ]);

  // FUNCTIONS FOR WAIVERS
  // HANDLE THE WAIVERS
  const handleWaivers = () => {
    let odInterestAmount = parseFloat(formDetails[0]?.od_accrued_int);
    let intWaivePer = isNaN(parseFloat(waiverPercentage?.interest))
      ? 0
      : parseFloat(waiverPercentage?.interest);
    let penaltyAmount = parseFloat(formDetails[0]?.cot_amount);
    let penWaivePer = isNaN(parseFloat(waiverPercentage?.penalty))
      ? 0
      : parseFloat(waiverPercentage?.penalty);
    let arrearsBalance = parseFloat(formDetails[0]?.arrears_int);
    let arrWaivePer = isNaN(parseFloat(waiverPercentage?.arrears))
      ? 0
      : parseFloat(waiverPercentage?.arrears);

    axios
      .post(
        API_SERVER + "/api/waiver-calculation",
        {
          OD_INTEREST_AMOUNT_v: odInterestAmount,
          INT_WAIVE_PER_v: intWaivePer,
          PENAL_AMOUNT_v: penaltyAmount,
          PEN_WAIVE_PER_v: penWaivePer,
          ARREARS_BAL_v: arrearsBalance,
          ARR_WAIVE_PER_v: arrWaivePer,
        },
        { headers: headers }
      )
      .then(function (response) {
        setWaiverAmount({
          ...waiverAmount,
          interest: response.data?.data?.interestWaiver,
          penalty: response.data?.data?.penaltyWaiver,
          arrears: response.data?.data?.arrearsWaiver,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleWaiverPercentage = () => {
    // Extract form details and waiver percentages as needed
    let waiverOption = waiverOptionValue;
    let shadowBalanceToday = parseFloat(formDetails[0]?.shadow_balance_today);
    let intAdjust = parseFloat(totalLoanBalances?.interest);
    let penAdjust = parseFloat(totalLoanBalances?.penalty);
    let arrInt = parseFloat(totalLoanBalances?.arrears);
    let totalBalance = parseFloat(total);

    let odInterestAmount = parseFloat(formDetails[0]?.od_accrued_int);
    let intWaive = parseFloat(waiverAmount?.interest);

    let penaltyAmount = parseFloat(formDetails[0]?.cot_amount);
    let penWaive = parseFloat(waiverAmount?.penalty);

    let arrearsBalance = parseFloat(formDetails[0]?.arrears_int);
    let arrWaive = parseFloat(waiverAmount?.arrears);

    axios
      .post(
        API_SERVER + "/api/waiver-percentage-calculation",
        {
          PAYMENT_TYPE_V: transactionType,
          WAIVER_OPTION_V: waiverOption,
          SHADOW_BALANCE_TODAY_V: shadowBalanceToday,
          INT_ADJUST_V: intAdjust,
          PEN_ADJUST_V: penAdjust,
          ARR_INT_V: arrInt,
          TOTAL_BAL_V: totalBalance,
          OD_INTEREST_AMOUNT_V: odInterestAmount,
          INT_WAIVE_V: intWaive,
          PENAL_AMOUNT_V: penaltyAmount,
          PEN_WAIVE_V: penWaive,
          ARREARS_BAL_V: arrearsBalance,
          ARR_WAIVE_V: arrWaive,
        },
        { headers: headers }
      )
      .then(function (response) {
        setWaiverPercentage({
          ...waiverPercentage,
          interest: response.data?.data?.interestPercentage,
          penalty: response.data?.data?.penaltyPercentage,
          arrears: response.data?.data?.arrearsPercentage,
          totalAmount: response.data?.data?.amount,
        });

        console.log(response.data, "WAIVER PERCENTAGE %");
      })
      .catch((err) => console.log("Error:", err));
  };

  const handleAccruedWaiverValue = (value) => {
    // VARIABLES
    // let principal = parseFloat(formDetails[0]?.shadow_balance_today);
    // let interest = parseFloat(formDetails[0]?.od_accrued_int);
    // let penalty = parseFloat(formDetails[0]?.cot_amount);
    // let arrInterest = parseFloat(formDetails[0]?.arrears_int);
    // // 02 - WAIVE ACCRUED INTEREST
    // if (value === "01") {
    //   setWaiverAmount({
    //     ...waiverAmount,
    //     interest: actualAmounts?.interest,
    //   });
    //   setTotalLoanBalances({
    //     ...totalLoanBalances,
    //     interest: 0.0,
    //   });
    // }
    // // 02 - WAIVE ACCRUED PENALTY
    // if (value === "02") {
    //   setWaiverAmount({
    //     ...waiverAmount,
    //     penalty: actualAmounts?.penalty,
    //   });
    //   setTotalLoanBalances({
    //     ...totalLoanBalances,
    //     penalty: 0.0,
    //   });
    // }
    // // 00 - NOT APPLICABLE
    // if (value === "00") {
    //   setWaiverAmount({
    //     ...waiverAmount,
    //     penalty: 0,
    //     interest: 0,
    //     arrears: 0,
    //   });
    //   setTotalLoanBalances({
    //     ...totalLoanBalances,
    //     penalty: actualAmounts?.penalty,
    //     interest: actualAmounts?.interest,
    //     arrears: actualAmounts?.arrears,
    //   });
    // }
  };

  return (
    <div className="space-y-4">
      <div className="mt-4">
        {/* WAIVER OPTION */}
        <ListOfValue
          label={"Waiver"}
          required
          data={waiverOptions}
          labelWidth={"25%"}
          inputWidth={"40%"}
          value={waiverOptionValue}
          onChange={(value) => {
            setWaiverOptionValue(value);
            handleAccruedWaiverValue(value);
            // setTotalLoanBalances({
            //   ...totalLoanBalances,
            //   newLoanAfterWaivers: totalLoanBalances?.newLoanAfterWaivers
            // })
          }}
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
            disabled={!isWaiverManual(waiverOptionValue)}
            value={waiverPercentage?.interest}
            onChange={(e) => {
              setWaiverPercentage({
                ...waiverPercentage,
                interest: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleWaivers();
              }
            }}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled={!isWaiverManual(waiverOptionValue)}
            value={waiverAmount?.interest}
            onChange={(e) => {
              setWaiverAmount({
                ...waiverAmount,
                interest: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleWaiverPercentage();
              }
            }}
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
            disabled={!isWaiverManual(waiverOptionValue)}
            value={waiverPercentage?.penalty}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleWaivers();
              }
            }}
            onChange={(e) => {
              setWaiverPercentage({
                ...waiverPercentage,
                penalty: e.target.value,
              });
            }}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled={!isWaiverManual(waiverOptionValue)}
            value={waiverAmount?.penalty}
            onChange={(e) => {
              setWaiverAmount({
                ...waiverAmount,
                penalty: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleWaiverPercentage();
              }
            }}
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
            disabled={!isWaiverManual(waiverOptionValue)}
            value={waiverPercentage?.arrears}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleWaivers();
              }
            }}
            onChange={(e) => {
              setWaiverPercentage({
                ...waiverPercentage,
                arrears: e.target.value,
              });
            }}
          />
        </div>

        <div className="flex-[0.25]">
          <InputField
            inputWidth={"80%"}
            textAlign={"right"}
            disabled={!isWaiverManual(waiverOptionValue)}
            value={waiverAmount?.arrears}
            onChange={(e) => {
              setWaiverAmount({
                ...waiverAmount,
                arrears: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleWaiverPercentage();
              }
            }}
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
        value={totalLoanBalances?.newLoanAfterWaivers}
      />

      <InputField
        label={"Remaining Loan Balance After Reduction"}
        labelWidth={"50%"}
        inputWidth={"45%"}
        disabled
        textAlign={"right"}
        value={
          isNaN(remainingLoanBalanceAfterReduction)
            ? totalLoanBalances?.newLoanAfterWaivers
            : formatNumber(parseFloat(remainingLoanBalanceAfterReduction))
        }
      />
    </div>
  );
}

export default WaiverOption;
