import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../components/others/Fields/SelectField";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../../../App";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiEye } from "react-icons/fi";
import { Modal, ScrollArea } from "@mantine/core";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";
import Swal from "sweetalert2";

function RescheduleDetails({
  balanceToReschedule,
  amount,
  formDetails,
  setFormDetails,
  rescheduleDetails,
}) {
  // STATES AND VARIABLES
  const [interestTypes, setInterestTypes] = useState([]);
  const [interestValue, setInterestValue] = useState("");
  const [interestTypeValue, setInterestTypeValue] = useState("");
  const [scheduleModal, setScheduleModal] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [tenor, setTenor] = useState("");
  const [moratoriumPeriod, setMoratoriumPeriod] = useState(0);
  const [nextScheduleDate, setNextScheduleDate] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [moratoriumWithInterest, setMoratoriumWithInterest] = useState("N");
  const [interestRepaymentCount, setInterestRepaymentCount] = useState("");
  const [principalRepaymentCount, setPrincipalRepaymentCount] = useState("");
  const [
    previewScheduleButtonFunctionality,
    setPreviewScheduleButtonFunctionality,
  ] = useState(false);
  const [scheduledData, setScheduledData] = useState([]);
  const [principalRepaymentFrequency, setPrincipalRepaymentFrequency] =
    useState([]);
  const [
    principalRepaymentFrequencyValue,
    setPrincipalRepaymentFrequencyValue,
  ] = useState("");
  const [interestRepaymentFrequencyValue, setInterestRepaymentFrequencyValue] =
    useState("");

  // HEADERS
  const quotationHeaders = [
    <div>Seq No.</div>,
    <div>Date Due</div>,
    <div>Principal</div>,
    <div>Interest</div>,
    <div>Payment</div>,
    <div>Processing Fees</div>,
  ];

  // DATA
  var previewScheduleData = scheduledData?.map((i) => {
    return [
      <div>{i?.REPAY_SEQ_NO}</div>,
      <div>{formatDate(i?.DATE_DUE)}</div>,
      <div>{formatNumber(parseFloat(i?.PRINCIPAL))}</div>,
      <div>{formatNumber(parseFloat(i?.INTEREST))}</div>,
      <div>{formatNumber(parseFloat(i?.MONTHP))}</div>,
      <div>{formatNumber(parseFloat(i?.PROC_FEES))}</div>,
    ];
  });

  // USEFUL FUNCTIONS
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

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

  // FUNCTION TO HANDLE WHEN YOU INPUT THE INTEREST RATE PER MONTH / PER ANNUM
  const handleInterestRateValue = (interestValue) => {
    let interest = parseFloat(interestValue);
    setInterestRate(interest * 12);
  };

  const effectiveDateString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(effectiveDateString);

  const postingDate = userInfo?.postingDate?.split("T")[0];
  const postingDateWithT = userInfo?.postingDate;

  // EFFECTS
  useEffect(() => {
    // INTEREST TYPE LOV
    axios
      .post(
        API_SERVER + "/api/get-code-details",
        { code: "LRT" },
        { headers: headers }
      )
      .then(function (response) {
        setInterestTypes(response.data);
      })
      .catch((err) => console.log(err));

    // PRINCIPAL REPAYMENT FREQUENCY LOV
    axios
      .post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        { headers: headers }
      )
      .then(function (response) {
        setPrincipalRepaymentFrequency(response.data);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInterestRate(0);
    setTenor("");
    setInterestTypeValue("");
    setInterestRepaymentFrequencyValue("");
    setPrincipalRepaymentFrequencyValue("");
    setMoratoriumPeriod("");
    setInterestValue("");

    // get next schedule
    axios
      .post(
        API_SERVER + "/api/get-nxtSchedule",
        {
          facility_no: formDetails?.facility_no,
        },
        { headers }
      )
      .then((response) => {
        setNextScheduleDate(response.data[0]?.MAX?.split("T")[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formDetails]);

  // FUNCTION TO HANDLE THE VALUE OF THE FOLLOWING FREQUENCIES
  const handlePrincipalRepaymentFrequency = (value) => {
    if (value === "03") {
      setInterestRepaymentCount(tenor * 1);
      setPrincipalRepaymentCount(tenor * 1);
    } else if (value === "01") {
      setInterestRepaymentCount(Math.round(parseFloat(tenor * 4.35)));
      setPrincipalRepaymentCount(Math.round(parseFloat(tenor * 4.35)));
    } else if (value === "02") {
      setInterestRepaymentCount(Math.round(parseFloat(tenor * 2.16666667)));
      setPrincipalRepaymentCount(Math.round(parseFloat(tenor * 2.16666667)));
    } else if (value === "04") {
      setInterestRepaymentCount(Math.round(parseFloat(12 / 3)));
      setPrincipalRepaymentCount(Math.round(parseFloat(12 / 3)));
    } else if (value === "05") {
      setInterestRepaymentCount(tenor * 1);
      setPrincipalRepaymentCount(tenor * 1);
    } else if (value === "06") {
      setInterestRepaymentCount(tenor / tenor);
      setPrincipalRepaymentCount(tenor / tenor);
    } else if (value === "07") {
      setInterestRepaymentCount(tenor / 2);
      setPrincipalRepaymentCount(tenor / 2);
    } else if (value === "08") {
      setInterestRepaymentCount(parseFloat(12 / 6));
      setPrincipalRepaymentCount(parseFloat(12 / 6));
    } else if (value === "09") {
      setInterestRepaymentCount(tenor / tenor);
      setPrincipalRepaymentCount(tenor / tenor);
    }

    // setPrincipalRepaymentFrequency(value);
    // setInterestRepaymentFrequency(value);
  };

  // GET THE PREVIEW SCHEDULE WITH FACILITY NUMBER
  async function getPreviewSchedule(value) {
    setPreviewLoading(true);
    await axios
      .post(
        API_SERVER + "/api/get-preview-sch",
        {
          facility_number: value,
        },
        { headers: headers }
      )
      .then(function (response) {
        setScheduledData(response.data);
        setPreviewLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPreviewLoading(false);
      });
  }

  const handleMoratoValidation = () => {
    axios
      .post(
        API_SERVER + "/api/morato-validation",
        {
          MORATORIUM_PERIOD_v: moratoriumPeriod,
          prin_pay_count_v: principalRepaymentCount,
          int_morato_v: moratoriumWithInterest,
        },
        { headers: headers }
      )
      .then(function (response) {
        if (response?.data?.responseMessage !== null) {
          Swal.fire({
            title: response.data?.responseMessage,
            text: "",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        setPreviewLoading(false);
      });
  };

  // HANDLE VIEW SCHEDULE
  const handleLoanPaymentSchedulePrc = () => {
    setPreviewLoading(true);

    axios
      .post(
        API_SERVER + `/api/loan-payment-sched-table-prc`,
        {
          f_no_v: formDetails?.facility_no,
          OUT_PRIN_BAL_v: parseFloat(
            balanceToReschedule?.remainingLoanBalanceAfterReduction
          ),
          int_rate_v: interestRate,
          int_type_v: interestTypeValue,
          repayment_plan_v: principalRepaymentFrequencyValue,
          moratorium_period_v: moratoriumPeriod,
          exempt_month_v: "N",
          PRIN_PAY_COUNT_v: principalRepaymentCount,
          type_of_acct_v: formDetails?.type_of_acct,
          legal_form_v: formDetails?.legal_form,
          currency_code_v: formDetails?.currency_code,
          last_day_v: "N",
          repnt_period_months_v: tenor,
          date_v: formatDate(postingDateWithT),
          loan_amt_v: parseFloat(amount),
          int_morato_v: moratoriumWithInterest,
          int_repay_plan_v: interestRepaymentFrequencyValue,
          int_pay_count_v: interestRepaymentCount,
        },
        { headers: headers }
      )
      .then(function (response) {
        getPreviewSchedule(formDetails?.facility_no);
      })
      .catch((error) => console.log(error));
  };

  const handleButtonFunctionalityPreviewSchedule = () => {
    if (
      tenor?.trim() === "" ||
      interestTypeValue?.trim() === "" ||
      principalRepaymentFrequencyValue?.trim() === "" ||
      interestRepaymentFrequencyValue?.trim() === ""
    ) {
      setPreviewScheduleButtonFunctionality(false);
    } else {
      setPreviewScheduleButtonFunctionality(true);
    }
  };

  useEffect(() => {
    handleButtonFunctionalityPreviewSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tenor,
    interestTypeValue,
    interestRepaymentFrequencyValue,
    principalRepaymentFrequencyValue,
    moratoriumPeriod,
  ]);

  useEffect(() => {
    if (rescheduleDetails) {
      rescheduleDetails({
        balanceToReschedule,
        interestRate,
        interestTypeValue,
        tenor,
        principalRepaymentFrequencyValue,
        interestRepaymentFrequencyValue,
        moratoriumPeriod,
        moratoriumWithInterest,
        nextScheduleDate,
      });
    }
  }, [
    balanceToReschedule,
    interestRate,
    interestRepaymentFrequencyValue,
    moratoriumPeriod,
    moratoriumWithInterest,
    nextScheduleDate,
    principalRepaymentFrequencyValue,
    rescheduleDetails,
    interestTypeValue,
    tenor,
  ]);

  return (
    <div>
      <br />
      <div className="space-y-4 pl-10 rounded-md mx-8 p-4">
        <InputField
          label={"Balance To Reschedule"}
          textAlign={"right"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          value={
            amount
              ? formatNumber(
                  parseFloat(
                    balanceToReschedule?.remainingLoanBalanceAfterReduction
                  )
                )
              : balanceToReschedule?.remainingLoanBalanceAfterReduction
          }
          disabled
        />

        <div className="flex w-full">
          <div className="w-[80%]">
            <InputField
              label={"Interest Rate P.M / P.A"}
              textAlign={"right"}
              labelWidth={"110%"}
              inputWidth={"30%"}
              required
              value={interestValue}
              onChange={(e) => {
                handleInterestRateValue(e.target.value);
                setInterestValue(e.target.value);
              }}
            />
          </div>
          <div className="w-1/2">
            <InputField
              textAlign={"right"}
              disabled
              inputWidth={"48%"}
              value={isNaN(interestRate) ? "" : parseFloat(interestRate)}
            />
          </div>
        </div>

        <InputField
          label={"New Tenor (in Months)"}
          textAlign={"right"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          onChange={(e) => {
            setTenor(e.target.value);
          }}
          value={tenor}
        />

        <ListOfValue
          label={"Interest Type"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          data={interestTypes}
          value={interestTypeValue}
          onChange={(value) => setInterestTypeValue(value)}
        />

        <ListOfValue
          label={"Principal Repayment Frequency"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          data={principalRepaymentFrequency}
          onChange={(value) => {
            setPrincipalRepaymentFrequencyValue(value);
            setInterestRepaymentFrequencyValue(value);
            handlePrincipalRepaymentFrequency(value);
          }}
          value={principalRepaymentFrequencyValue}
        />

        <ListOfValue
          label={"Interest Repayment Frequency"}
          textAlign={"right"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          data={principalRepaymentFrequency}
          onChange={(value) => setInterestRepaymentFrequencyValue(value)}
          value={interestRepaymentFrequencyValue}
        />

        <InputField
          label={"Moratorium Period"}
          textAlign={"right"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          type={"number"}
          onChange={(e) => setMoratoriumPeriod(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMoratoValidation();
            }
          }}
          onBlur={() => {
            handleMoratoValidation();
          }}
          value={moratoriumPeriod}
        />

        <SelectField
          label={"Moratorium with Interest"}
          textAlign={"right"}
          labelWidth={"45%"}
          data={[
            {
              label: "Yes",
              value: "Y",
            },
            {
              label: "No",
              value: "N",
            },
          ]}
          inputWidth={"35%"}
          onChange={(value) => setMoratoriumWithInterest(value)}
          value={moratoriumWithInterest}
        />

        <InputField
          label={"Next Schedule Date"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          textAlign={"center"}
          disabled
          value={nextScheduleDate}
        />

        <InputField
          label={"Effective Date"}
          textAlign={"center"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          required
          type={"date"}
          // value={formDetails?.effective_date}
          defaultValue={postingDate}
          onChange={(e) => {
            setFormDetails({
              ...formDetails,
              effective_date: e.target.value,
            });
          }}
        />

        <hr />

        <div className="flex justify-end mr-24" style={{ zoom: 0.9 }}>
          <ButtonComponent
            label={"Preview Schedule"}
            buttonHeight={"30px"}
            buttonBackgroundColor={
              previewScheduleButtonFunctionality ? "#070269" : "#ccc"
            }
            buttonColor={previewScheduleButtonFunctionality ? "white" : "gray"}
            buttonWidth={"180px"}
            fontSize={"95%"}
            buttonIcon={<FiEye />}
            onClick={() => {
              if (previewScheduleButtonFunctionality) {
                setScheduleModal(true);
                handleLoanPaymentSchedulePrc();
              }
              // handleButtonFunctionalityPreviewSchedule();
            }}
          />
        </div>
      </div>

      {/* MODAL FOR PREVIEWING SCHEDULE */}
      <Modal
        opened={scheduleModal}
        onClose={() => setScheduleModal(false)}
        size={"60%"}
        padding={"14px"}
        withCloseButton={false}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div style={{ zoom: 0.87 }}>
          <Header
            headerShade
            title="Quotations Schedule"
            handleClose={() => setScheduleModal(false)}
            closeIcon
          />
          <div>
            <CustomTable
              headers={quotationHeaders}
              data={previewScheduleData}
              rowsPerPage={10000}
              hidePagination
              load={previewLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RescheduleDetails;
