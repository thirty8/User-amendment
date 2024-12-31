import React, { useState, useEffect, useRef } from "react";
import InputField from "../fields/InputField.jsx";
import ListOfValue from "../fields/ListOfValue.jsx";
import SelectField from "../fields/SelectField.jsx";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea.jsx";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
// import { Modal, Textarea } from "@mantine/core";
import { ConfigProvider, Modal } from "antd";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import TableLoader from "../../../trans-processes/uploads/components/loader";
import { GrView } from "react-icons/gr";
import { AiFillPrinter } from "react-icons/ai";
import coop from "../../../../../assets/coop.png";
import { useReactToPrint } from "react-to-print";
import { GrFormNextLink } from "react-icons/gr";
// import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
import RadioButtons from "../fields/RadioButtons.jsx";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Notification } from "@mantine/core";
import { Collapse } from "antd";

const General = ({
  selectedOption,
  // withInterests,
  facilityServiceAccount,
  appNumber,
  currency,
  customerNumber,
  typeOfAccount,
  setAppNumber,
  secondTab,
  thirdTab,
  setLoanAmount,
  // appNumber={appNumber}
  quotationNo,
  setQuotationNo,
  accountName,
  name,
  setGuarantorLimit,
  setGuarantorBeneficiaryLimit,
  facilityType,
  total,
  availableBalance,
  curDesc,
  memberStatus,
  setLoanIns,
  setInt,
  setTn,
  loanLmt,
  customerType,
}) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const repay_acct = facilityServiceAccount;

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [testSub, setTestSub] = useState("");

  var facilityServiceAcct = customerNumber;

  // var loanScheduleHeaders = [
  //   "Seq Number",
  //   "Due Date",
  //   "Principal",
  //   "Interest",
  //   "Payment",
  // ];

  var loanScheduleHeaders = [
    "SeqNumber",
    "DueDate",
    "Principal",
    "Interest",
    "Payment",
  ];

  // console.log(name, "hiiiiii");

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-sector-subsector",
        {
          customerNumber: customerNumber,
          // customerNumber: facilityServiceAccount?.split("-")[1]?.trim(),
        },
        { headers }
      )
      .then((response) => {
        // console.log(response.data, "waakye");
        // setSector("");
        if (
          facilityServiceAcct &&
          response.data &&
          response.data[0] &&
          response.data[0][0]
        ) {
          setSector(response.data[0][0]);

          axios
            .post(
              API_SERVER + "/api/get-subb-sector",
              // { sector: "" },
              { sector: response.data[0][0] }, // Use the value from the response for the sector
              {
                headers,
              }
            )
            .then(function (response) {
              // Check if the response contains data and is in the expected format
              if (response.data && Array.isArray(response.data)) {
                setLovSubSector(response.data);
                // setSector(value);
              } else {
                console.log("Invalid response format for sub-sectors");
              }
            })
            .catch((err) => {
              console.log("Error fetching sub-sectors:", err);
            });

          if (response.data[0][1]) {
            setSubSector(response.data[0][1]);
          } else {
            console.log("Sub-sector data not available in the response");
          }
        } else {
          console.log("Invalid response format or missing data");
        }
      })
      .catch((error) => {
        console.log("Error fetching sectors:", error);
      });
  }, [customerNumber]);

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const [lovFacilityTypeCategory, setLovFacilityTypeCategory] = useState([]);
  const [facilityTypeCategory, setFacilityTypeCategory] = useState("");

  const [lovLoanProducts, setLovLoanProducts] = useState([]);
  const [loanProduct, setLoanProduct] = useState();

  const [lovInterestType, setLovInterestType] = useState([]);
  const [interestType, setInterestType] = useState();

  const [interestRate, setInterestRate] = useState();
  const [interestRateAnnum, setInterestRateAnnum] = useState();

  const [effectiveInterestRate, setEffectiveInterestRate] = useState();
  const [effectiveInterestRateAnnum, setEffectiveInterestRateAnnum] =
    useState();

  const [lovPrincipalRepayFreq, setLovPrincipalRepayFreq] = useState([]);
  const [principalRepaymentFrequency, setPrincipalRepaymentFrequency] =
    useState();

  const [lovInterestRepayFreq, setLovInterestRepayFreq] = useState([]);
  const [interestRepaymentFrequency, setInterestRepaymentFrequency] =
    useState();

  const [principalRepaymentCount, setPrincipalRepaymentCount] = useState();
  const [interestRepaymentCount, setInterestRepaymentCount] = useState();

  const [exemptMonth, setExemptMonth] = useState("");
  const [lastWorkingDay, setLastWorkingDay] = useState();

  const [lovIntroSource, setLovIntroSource] = useState([]);
  const [introSource, setIntroSource] = useState("");

  const [lovDealerCode, setLovDealerCode] = useState([]);
  const [dealerCode, setDealerCode] = useState("");

  const [lovPurpose, setLovPurpose] = useState([]);
  const [purpose, setPurpose] = useState("");

  const [otherPurpose, setOtherPurpose] = useState("");

  const [lovSector, setLovSector] = useState([]);
  const [sector, setSector] = useState("");

  const [lovSubSector, setLovSubSector] = useState([]);
  const [subSector, setSubSector] = useState("");

  const [lovStaff, setLovStaff] = useState([]);
  const [staff, setStaff] = useState("");

  const [requestedAmount, setRequestedAmount] = useState("");

  const [count, setCount] = useState();
  const [tenorInMonths, setTenorInMonths] = useState("");

  const [lienPercencate, setLienPercentage] = useState();
  const [lienAmount, setLienAmount] = useState();

  const [insurancePercentage, setInsurancePercentage] = useState();
  const [insuranceAmount, setInsuranceAmount] = useState();

  const [processingFeePercentage, setProcessingFeePercentage] = useState();
  const [processingFeeAmount, setProcessingFeeAmount] = useState();

  const [moratoriumPeriod, setMoratorium] = useState("");
  const [withInterest, setWithInterest] = useState("");
  const [loanScheduleModal, setLoanScheduleModal] = useState();

  const [quotationNumber, setQuotationNumber] = useState("");
  const [data, setData] = useState([]);
  const [chargesData, setChargesData] = useState([]);

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const [chargesArr, setChargesArr] = useState();
  const [amountComputation, setAmountComputation] = useState("");
  const [checked, setChecked] = useState(false);
  const [disburse, setDisburse] = useState("");
  const [bank, setBank] = useState("");
  const [lovBanks, setLovBanks] = useState([]);
  const [bankAcct, setBankAcct] = useState("");
  const [sourceFunds, setSourceFunds] = useState("");
  const [load, setLoad] = useState();

  const chargeArr = [
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"Lien on Loan"}
          margin={"0px"}
          textAlign={"left"}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          value={lienPercencate}
          onChange={(e) => setLienPercentage(e.target.value)}
          textAlign={"center"}
          margin={"0px"}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          value={lienAmount}
          onChange={(e) => setLienAmount(e.target.value)}
          textAlign={"right"}
          margin={"0px"}
        />
      </div>,
    ],
  ];

  var facno;

  const handlePostData = () => {
    // Define the request data
    const data = JSON.stringify({
      repay_acct_v: "004001210015027145",
      repa_acct_v: "004001210015027145",
      legal_form_v: "50",
      branch: "001",
      currency_v: "010",
      repnt_period_months_v: "12",
      int_type: "02",
      rate: "20",
      mora: "0",
      int_mora: "N",
      AMT: "99999",
      EFF_DATE: "30-06-2023",
      int_repay_plan_v: "03",
      repayment_plan_v: "03",
      last_repay_date_v: "",
      LAST_DAY_V: "Y",
      exempt_month_v: "Y",
      sector_v: "10",
      sub_sector_v: "0110",
      lienamt_v: "",
      username_v: "henry",
      NO_OF_TRANCHES_V: "",
      bank_code_v: "",
      hostname_v: "",
      facility_no_v: "",
      fac_type_v: "16",
      prime_rate_v: "",
      trans_details: "001",
      other_purpose_v: "",
      documents_ref_no_v: "",
      staff_cat_v: "",
      vendor_code_v: "",
      ballon_installment_v: "",
      introductory_source_v: "004",
      employer_code_v: "",
      source_funds_v: "004",
      no_of_disb_v: "0",
      agreed_amount_v: "999",
      dealer_code_v: "001",
      para1: "",
      para2: "",
      para3: "",
      para4: "",
      para5: "",
    });

    // Define the Axios configuration
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://x100plus.unionsg.com:10443/ULA/public/api/v1/lending-onboarding",
      headers: {
        Accept: "application/json",
        "x-api-key": "base64:L3job8HQ64khHSEBxEAQ5zL+tOoQgibjqfSDH8Sj7Yk=",
        "Content-Type": "application/json",
      },
      data: data,
    };

    // Make the API call using Axios
    axios
      .request(config)
      .then((response) => {
        // console.log("dddddddddd");
        // console.log(JSON.stringify(response.data));
        setResponseData(response.data); // Store the response data in state
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.log(error);
        setResponseData(null); // Clear any previous response data
        setError(error.message || "An error occurred."); // Store the error message in state
      });
  };

  useEffect(() => {
    async function getQuotationNumber() {
      let response = await axios.get(API_SERVER + "/api/get-unique-ref", {
        headers,
      });
      const data = await response.data;
      setQuotationNumber(data[0].unique_ref);
      setQuotationNo(data[0].unique_ref);

      // console.log(data, "yooo");
    }

    getQuotationNumber();
  }, []);

  function getAccumInterest(interestRateAnnum, effectiveInterestRateAnnum) {
    if (facilityType === "16") {
      setInterestRate((parseFloat(interestRateAnnum) / 12).toFixed(4));
      setInt((parseFloat(interestRateAnnum) / 12).toFixed(4));
      setEffectiveInterestRate(
        (parseFloat(effectiveInterestRateAnnum) / 12).toFixed(4)
      );
    } else {
      setInterestRate(formatNumber(0));
      setEffectiveInterestRate(formatNumber(0));
    }
  }

  const runLoanDets = () => {
    if (requestedAmount) {
      axios
        .post(
          API_SERVER + "/api/get-product-details",
          {
            legal_form: loanProduct?.trim(),
            currency: currency?.trim(),
          },
          {
            headers,
          }
        )
        .then(function (response) {
          setInterestType(response.data[0]?.int_type);
          setPrincipalRepaymentFrequency(response.data[0]?.repayment_frequency);
          setInterestRepaymentFrequency(response.data[0]?.int_freq);
          setGuarantorLimit(response.data[0]?.guarantor_limit);
          setGuarantorBeneficiaryLimit(
            response.data[0]?.guarantor_beneficiary_limit
          );
          setTenorInMonths(response.data[0]?.maturity_period);
          setPrincipalRepaymentCount(response.data[0]?.prin_pay_count);
          setInterestRepaymentCount(response.data[0]?.int_pay_count);
        });

      axios
        .post(
          API_SERVER + "/api/get-interest-charges",
          {
            legal_form: loanProduct?.trim(),
            currency: currency?.trim(),
            amt: `${requestedAmount}`,
          },
          {
            headers,
          }
        )
        .then(function (response) {
          setInterestRateAnnum(
            formatNumber(parseFloat(response.data[0]?.base_rate))
          );
          setEffectiveInterestRateAnnum(
            formatNumber(parseFloat(response.data[0]?.eff_interest))
          );
          getAccumInterest(
            response.data[0]?.base_rate,
            response.data[0]?.eff_interest
          );
        });

      const requestedAmountValue = parseFloat(req);
      const lienPercentageValue = 20.0;
      const insurancePercentageValue = 2.5;
      const processingFeePercentageValue = 2.5;
      // const tenorInMonthsValue = 12;
      // document.getElementById("introSource").focus();

      const calculateValue = (percentage, amount) => {
        return formatNumber((percentage / 100) * amount);
      };

      // setRequestedAmount(formatNumber(requestedAmountValue));

      // setInterestRate("1.66667");
      // setInterestRateAnnum("20.0000");
      // setEffectiveInterestRate("1.66667");
      // setEffectiveInterestRateAnnum("20.0000");
      // setTenorInMonths(tenorInMonthsValue);
      // setInterestType("02");
      // setPrincipalRepaymentFrequency("03");
      // setInterestRepaymentFrequency("03");
      // setPrincipalRepaymentCount(tenorInMonthsValue);
      // setInterestRepaymentCount(tenorInMonthsValue);
      setExemptMonth("N");
      setLastWorkingDay("Y");
      setLienPercentage(lienPercentageValue.toFixed(2));
      setLienAmount(calculateValue(lienPercentageValue, requestedAmountValue));
      setInsurancePercentage(insurancePercentageValue.toFixed(2));
      setInsuranceAmount(
        formatNumber(
          calculateValue(insurancePercentageValue, requestedAmountValue)
        )
      );
      setProcessingFeePercentage(processingFeePercentageValue.toFixed(2));
      setProcessingFeeAmount(
        formatNumber(
          calculateValue(processingFeePercentageValue, requestedAmountValue)
        )
      );
    }
  };

  // useEffect(() => {
  //   getLoanCharges();
  // }, []);

  const getLoanCharges = (requestedAmount, lienPercencate, lienAmount) => {
    axios
      .post(
        API_SERVER + "/api/get-loan-charges",
        {
          legal_form: loanProduct,
          currency: currency,
          amt: requestedAmount,
          fac_type: facilityType,
        },
        { headers }
      )
      .then((res) => {
        setChargesData(res.data);
        const loanCharges = res.data.map((item) => {
          console.log(item.perc, "chargeeeeeeeeeee");
          return [
            <div>
              <InputField
                inputWidth={"100%"}
                margin={"0px"}
                className={"font-bold"}
                value={item.description}
                disabled
              />
            </div>,
            <div>
              <InputField
                inputWidth={"100%"}
                margin={"0px"}
                className={"font-bold"}
                value={
                  item.perc !== "null" ? parseFloat(item.perc).toFixed(2) : ""
                }
                textAlign={"center"}
                disabled
              />
            </div>,
            <div>
              <InputField
                inputWidth={"100%"}
                margin={"0px"}
                className={"font-bold"}
                value={
                  item.perc == "null"
                    ? formatNumber(parseFloat(item.val))
                    : item.fee_type
                    ? formatNumber(
                        Math.round((item.perc * requestedAmount) / 100)
                      ) || 0
                    : "0.00"
                }
                textAlign={"right"}
                disabled
              />
            </div>,
          ];
        });
        setChargesArr([
          [
            <div>
              <InputField
                inputWidth={"100%"}
                disabled
                className={"font-bold"}
                value={"Lien on Loan"}
                margin={"0px"}
                textAlign={"left"}
              />
            </div>,
            <div>
              <InputField
                inputWidth={"100%"}
                className={"font-bold"}
                value={lienPercencate}
                onChange={(e) => setLienPercentage(e.target.value)}
                textAlign={"center"}
                margin={"0px"}
                disabled
              />
            </div>,
            <div>
              <InputField
                inputWidth={"100%"}
                className={"font-bold"}
                value={lienAmount}
                onChange={(e) => setLienAmount(e.target.value)}
                textAlign={"right"}
                margin={"0px"}
                disabled
              />
            </div>,
          ],
          ,
          ...loanCharges,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOdCharges = (requestedAmount) => {
    axios
      .post(
        API_SERVER + "/api/get-od-charges",
        {
          currency: currency,
          amt: requestedAmount,
          fac_type: facilityType,
        },
        { headers }
      )
      .then((res) => {
        setChargesData(res.data);
        const loanCharges = res.data.map((item) => {
          console.log(item.perc, "chargeeeeeeeeeee");
          return [
            <div>
              <InputField
                inputWidth={"100%"}
                margin={"0px"}
                className={"font-bold"}
                value={item.description === "null" ? "" : item.description}
                disabled
              />
            </div>,
            <div>
              <InputField
                inputWidth={"100%"}
                margin={"0px"}
                className={"font-bold"}
                value={
                  item.perc !== "null" ? parseFloat(item.perc).toFixed(2) : ""
                }
                textAlign={"center"}
                disabled
              />
            </div>,
            <div>
              <InputField
                inputWidth={"100%"}
                margin={"0px"}
                className={"font-bold"}
                value={
                  item.perc == "null"
                    ? formatNumber(parseFloat(item.val))
                    : item.fee_type
                    ? formatNumber(
                        Math.round((item.perc * requestedAmount) / 100)
                      ) || 0
                    : "0.00"
                }
                textAlign={"right"}
                disabled
              />
            </div>,
          ];
        });
        setChargesArr(loanCharges);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertLoanFees = (loanAppNo, feeCharges, requestedAmount) => {
    axios
      .post(
        API_SERVER + "/api/insert-loan-fees",
        {
          loanAppNo,
          feeCharges,
          requestedAmount,
        },
        { headers }
      )
      .then((res) => {
        console.log(res.data.message); // Confirmation message
      })
      .catch((err) => {
        console.error("Error inserting loan fees:", err);
      });
  };

  useEffect(() => {
    setLoanAmount(requestedAmount);
  }, [requestedAmount]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  var branch = JSON.parse(localStorage.getItem("userInfo")).branch;

  // const [withInterest, setWithInterest] = useState();

  // const handleRequestedAmount = (event) => {
  //   const inputValue = event.target.value;
  //   if (!inputValue || /^\d*\.?\d*$/.test(inputValue)) {
  //     setFacilityNumber(inputValue);
  //   }
  // };
  // console.log(subSector, "subbbbb");

  async function handleSector(value) {
    await axios
      .post(
        API_SERVER + "/api/get-subb-sector",
        { sector: value },
        {
          headers,
        }
      )
      .then(function (response) {
        setLovSubSector(response.data);
        setSector(value);
        setSubSector(subSector);
      })
      .catch((err) => {
        console.log(err);
      });
    // response = await response();
    // console.log(response);
  }
  // console.log(sector);
  // console.log(lovSubSector, "lovsubbbbbb");

  useEffect(() => {
    async function getLoanProducts() {
      let response = await axios.post(
        API_SERVER + "/api/get-loan-products",
        { customer_type: customerType },
        {
          headers,
        }
      );
      // response = await response.json();
      setLovLoanProducts(response.data);
      // console.log(response);
    }
    getLoanProducts();
  }, [customerType]);

  useEffect(() => {
    async function getInterestType() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRT" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovInterestType(response.data);
    }

    async function getPrincipalRepayFreq() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovPrincipalRepayFreq(response.data);
    }

    async function getInterestRepayFreq() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovInterestRepayFreq(response.data);
    }

    async function getIntroSource() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "INT" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovIntroSource(response.data);
    }

    async function getPurpose() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "PUR" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovPurpose(response.data);
    }

    async function getSector() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "MAS" },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setLovSector(response.data);
    }

    // async function getFacilityType() {
    //   let response = await axios.post(
    //     API_SERVER + "/api/get-code-details",
    //     { code: "LTC", fac_type_2: "16", short_descrp: "I" },
    //     {
    //       headers,
    //     }
    //   );
    //   // response = await response();
    //   //  console.log(response);
    //   setLovFacilityTypeCategory(response.data);
    // }

    async function getDealerCode() {
      let response = await fetch(API_SERVER + "/api/get-dealer-code", {
        headers,
      });
      response = await response.json();
      setLovDealerCode(response);
      // console.log(response);
    }

    async function getBanks() {
      let response = await fetch(API_SERVER + "/api/get-banks", {
        headers,
      });
      response = await response.json();
      setLovBanks(response);
      // console.log(response);
    }

    getBanks();
    getInterestType();
    getPrincipalRepayFreq();
    getIntroSource();
    getInterestRepayFreq();
    getPurpose();
    getDealerCode();
    getSector();
    // getFacilityType();
  }, []);

  useEffect(() => {
    async function getFacType() {
      let response = await axios.post(
        API_SERVER + "/api/get-facility-type-cat",
        { fac_type_v: facilityType, cust_type_v: customerType },
        {
          headers,
        }
      );
      // response = await response.json();
      setLovFacilityTypeCategory(response.data);
      // console.log(response);
    }

    getFacType();
  }, [facilityType]);

  useEffect(() => {
    async function getStaff() {
      let response = await fetch(API_SERVER + "/api/get-staff", {
        headers,
      });
      response = await response.json();
      setLovStaff(response);
      // console.log(response);
    }

    getStaff();
  }, []);

  const handlePrincipalRepaymentFrequency = (value) => {
    if (value === "03") {
      setInterestRepaymentCount(parseInt(tenorInMonths) * 1);
      setPrincipalRepaymentCount(parseInt(tenorInMonths) * 1);
    } else if (value === "01") {
      setInterestRepaymentCount(parseInt(tenorInMonths * 4.35));
      setPrincipalRepaymentCount(parseInt(tenorInMonths * 4.35));
    } else if (value === "02") {
      setInterestRepaymentCount(parseInt(tenorInMonths) * 2.16666667);
      setPrincipalRepaymentCount(parseInt(tenorInMonths) * 2.16666667);
    } else if (value === "04") {
      setInterestRepaymentCount(parseInt(12 / 3));
      setPrincipalRepaymentCount(parseInt(12 / 3));
    } else if (value === "05") {
      setInterestRepaymentCount(tenorInMonths * 1);
      setPrincipalRepaymentCount(tenorInMonths * 1);
    } else if (value === "06") {
      setInterestRepaymentCount(tenorInMonths / tenorInMonths);
      setPrincipalRepaymentCount(tenorInMonths / tenorInMonths);
    } else if (value === "07") {
      setInterestRepaymentCount(tenorInMonths / 2);
      setPrincipalRepaymentCount(tenorInMonths / 2);
    } else if (value === "08") {
      setInterestRepaymentCount(parseInt(12 / 6));
      setPrincipalRepaymentCount(parseInt(12 / 6));
    } else if (value === "09") {
      setInterestRepaymentCount(tenorInMonths / tenorInMonths);
      setPrincipalRepaymentCount(tenorInMonths / tenorInMonths);
    }

    setPrincipalRepaymentFrequency(value);
    setInterestRepaymentFrequency(value);
  };

  const handleInterestRepaymentFrequency = (value) => {
    setInterestRepaymentFrequency(value);
    if (value === "03") {
      setInterestRepaymentCount(parseInt(tenorInMonths * 1));
    } else if (value === "01") {
      setInterestRepaymentCount(parseInt(tenorInMonths * 4.35));
    } else if (value === "02") {
      setInterestRepaymentCount(parseInt(tenorInMonths * 2.16666667));
    } else if (value === "04") {
      setInterestRepaymentCount(parseInt(12 / 3));
    } else if (value === "05") {
      setInterestRepaymentCount(tenorInMonths * 1);
    } else if (value === "06") {
      setInterestRepaymentCount(tenorInMonths / tenorInMonths);
    } else if (value === "07") {
      setInterestRepaymentCount(tenorInMonths / 2);
    } else if (value === "08") {
      setInterestRepaymentCount(parseInt(12 / 6));
    } else if (value === "09") {
      setInterestRepaymentCount(tenorInMonths / tenorInMonths);
    }
  };
  // console.log(currency, "currrrrrr");

  function formatNumberAmount(num, id) {
    // containsLetters(num,debit_amount_field)
    const regex = /[a-zA-Z]/;
    if (regex.test(num) == true) {
      Swal.fire(
        "Error",
        "kindly ensure amount entered doesn't contain any letters",
        "warning"
      ).then((result) => {
        id.focus();
        id.select();
      });
    } else {
      const numericInput = String(num).replace(/[^0-9.]/g, "");
      // Convert the input to a number and check if it's valid
      const number = parseFloat(numericInput);

      const formatted = number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      });
      // console.log({ formatted }, amount);

      return formatted;
    }

    // }
  }

  const handleMouseLeave = () => {
    alert("am leaving now..");
    setPrincipalRepaymentCount(tenorInMonths);
    setInterestRepaymentCount(tenorInMonths);
  };

  const NumberWithoutCommas = (number) => {
    const formattedNumber = String(number).replace(/,/g, "");
    return Number(formattedNumber);
  };

  function validateBlock() {
    if (
      loanProduct === "" ||
      facilityTypeCategory === "" ||
      requestedAmount === "" ||
      introSource === "" ||
      purpose === "" ||
      sector === "" ||
      subSector === "" ||
      staff === "" ||
      disburse === "" ||
      tenorInMonths === ""
    ) {
      Swal.fire({
        icon: "info",
        title: "All Fields Are Required",
        html: 'Please fill all required fields with <span style="color: red; font-weight: bold;">asterisk (*)</span>',
      });
    } else {
      saveLoanApplication();
      if (appNumber) {
        secondTab();
      }
    }
  }

  function saveLoanApplication() {
    console.log(
      {
        repay_acct_v: repay_acct, // Repayment account number
        customer_account: repay_acct,
        legal_form_v: loanProduct, // Product code Eg: (CUSTOMER SALARY LOAN 59)
        branch: JSON.parse(localStorage.getItem("userInfo")).branchCode, // Branch of the customer or Headoffice branch code Eg:000
        currency_v: currency, // Currency code
        repnt_period_months_v: parseInt(tenorInMonths), // Tenor in months
        int_type: interestType, // 01-FLAT,02-REDUCING BALANCE,03-AMORTIZATION METHOD,05-FLOATING RATE
        rate: parseFloat(interestRateAnnum), // Interest rate
        mora: moratoriumPeriod, // moratorium
        int_mora: withInterest,
        AMT: NumberWithoutCommas(requestedAmount), // Loan Amount
        EFF_DATE: JSON.parse(localStorage.getItem("userInfo")).postingDate, // Effective date
        int_repay_plan_v: interestRepaymentFrequency, // Interest repayment plan
        repayment_plan_v: principalRepaymentFrequency, // Repayment plan
        LAST_DAY_V: lastWorkingDay, // Last day of the month for repayment
        exempt_month_v: exemptMonth, // Exempted month for repayment
        sector_v: sector, // Sector code
        sub_sector_v: subSector, // Sub-sector code
        lienamt_v: NumberWithoutCommas(lienAmount), // Lien amount
        username_v: JSON.parse(localStorage.getItem("userInfo")).id, // Username
        NO_OF_TRANCHES_V: null, // Number of tranches
        bank_code_v: null, // Bank code
        // hostname_v: JSON.parse(localStorage.getItem("userInfo")).id, // Hostname
        fac_type_v: facilityType, // Facility type
        prime_rate_v: null, // Prime rate
        trans_details: purpose, // Transaction details
        other_purpose_v: otherPurpose, // Other purpose
        documents_ref_no_v: null, // Document reference number
        staff_cat_v: staff, // Staff category
        vendor_code_v: null, // Vendor code
        ballon_installment_v: null, // Balloon installment
        introductory_source_v: introSource, // Introductory source
        employer_code_v: null, // Employer code
        source_funds_v: sourceFunds, // Source of funds
        no_of_disb_v: null, // Number of disbursements
        agreed_amount_v: NumberWithoutCommas(requestedAmount), // Agreed amount
        dealer_code_v: dealerCode, // Dealer code
        cust_no: customerNumber,
        action_v: null,
        typeOfAccount: "",
        loan_app_no_v: "",
        prin_pay_count_v: parseInt(principalRepaymentCount),
        int_pay_count_v: parseInt(interestRepaymentCount),
        bnk_code_v: bank,
        ben_acct_v: bankAcct,
        para1: "", // Parameter 1
        para2: "", // Parameter 2
        para3: "", // Parameter 3
        para4: "", // Parameter 4
        para5: "", // Parameter 5
      },
      "saveeeeeee"
    );
    // console.log(repay_acct, typeof repay_acct, "repay_acct");
    axios
      .post(
        API_SERVER + "/api/lending-onboarding",
        // "http://10.203.14.195:3320/api/lending-onboarding",
        {
          repay_acct_v: repay_acct, // Repayment account number
          customer_account: repay_acct,
          legal_form_v: loanProduct, // Product code Eg: (CUSTOMER SALARY LOAN 59)
          branch: JSON.parse(localStorage.getItem("userInfo")).branchCode, // Branch of the customer or Headoffice branch code Eg:000
          currency_v: currency, // Currency code
          repnt_period_months_v: parseInt(tenorInMonths), // Tenor in months
          int_type: interestType, // 01-FLAT,02-REDUCING BALANCE,03-AMORTIZATION METHOD,05-FLOATING RATE
          rate: parseFloat(interestRateAnnum), // Interest rate
          mora: moratoriumPeriod, // moratorium
          int_mora: withInterest,
          AMT: NumberWithoutCommas(requestedAmount), // Loan Amount
          EFF_DATE: JSON.parse(localStorage.getItem("userInfo")).postingDate, // Effective date
          int_repay_plan_v: interestRepaymentFrequency, // Interest repayment plan
          repayment_plan_v: principalRepaymentFrequency, // Repayment plan
          LAST_DAY_V: lastWorkingDay, // Last day of the month for repayment
          exempt_month_v: exemptMonth, // Exempted month for repayment
          sector_v: sector, // Sector code
          sub_sector_v: subSector, // Sub-sector code
          lienamt_v: NumberWithoutCommas(lienAmount), // Lien amount
          username_v: JSON.parse(localStorage.getItem("userInfo")).id, // Username
          NO_OF_TRANCHES_V: null, // Number of tranches
          bank_code_v: null, // Bank code
          // hostname_v: JSON.parse(localStorage.getItem("userInfo")).id, // Hostname
          fac_type_v: facilityType, // Facility type
          prime_rate_v: null, // Prime rate
          trans_details: purpose, // Transaction details
          other_purpose_v: otherPurpose, // Other purpose
          documents_ref_no_v: null, // Document reference number
          staff_cat_v: staff, // Staff category
          vendor_code_v: null, // Vendor code
          ballon_installment_v: null, // Balloon installment
          introductory_source_v: introSource, // Introductory source
          employer_code_v: null, // Employer code
          source_funds_v: sourceFunds, // Source of funds
          no_of_disb_v: null, // Number of disbursements
          agreed_amount_v: NumberWithoutCommas(requestedAmount), // Agreed amount
          dealer_code_v: dealerCode, // Dealer code
          cust_no: customerNumber,
          action_v: null,
          typeOfAccount: "",
          loan_app_no_v: "",
          prin_pay_count_v: parseInt(principalRepaymentCount),
          int_pay_count_v: parseInt(interestRepaymentCount),
          bnk_code_v: bank,
          ben_acct_v: bankAcct,
          para1: "", // Parameter 1
          para2: "", // Parameter 2
          para3: "", // Parameter 3
          para4: "", // Parameter 4
          para5: "", // Parameter 5
        },
        { headers: headers }
      )
      .then((response) => {
        console.log(response.data, "ghannnnnnnnnn");
        if (response.data.responseCode === "000") {
          const message = response.data.responseMessage;
          const regex = /Approval\s(\d+)/; // Adjust regex to match 'Approval' followed by the number
          const match = message.match(regex);
          let referenceNumber;
          if (match && match[1]) {
            referenceNumber = match[1];
          }
          setAppNumber(referenceNumber);

          insertLoanFees(referenceNumber, chargesData, requestedAmount);

          // if (count > 0) {
          //   secondTab();
          // } else {
          //   thirdTab();
          // }
          secondTab();
        } else {
          Swal.fire({
            icon: "error",
            title: response.data.responseMessage,
          });
        }
      });
  }
  const [req, setReq] = useState("");
  const handleFacilityNumberChange = (event) => {
    if (!event?.target?.value || /^\d*\.?\d*$/.test(event?.target?.value)) {
      const inputValue = event.target.value;
      // if (!inputValue || /^\d*\.?\d*$/.test(inputValue)) {
      setRequestedAmount(inputValue);
      setReq(inputValue);
    }

    // }
  };

  // console.log(response.data[0]?.count, "testtttttt");
  // console.log(currency, "cur");
  // console.log(facilityServiceAccount, "facacc");
  // const requestAmount = document.getElementById("requestAmount");

  function RequestAmountBlur(e) {
    // if (req) {
    //   setReq(formatNumberAmount(req, req));
    // }
    if (!req.includes(",")) {
      if (!(req === "")) {
        setReq(formatNumber(parseFloat(e?.target?.value)));
      }
    }
  }
  // console.log({ requestedAmount });
  const [call, setCall] = useState();
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-schedule-enquiry",
        { facility_number: quotationNumber },
        { headers }
      )
      .then(function (response) {
        setLoad(false);
        let resp = response.data.responseMessage;
        let details = [];
        let principalSum = 0;
        let interestSum = 0;
        let paymentSum = 0;
        for (let i = 0; i < resp.length; i++) {
          const repay_seq_no = resp[i].repay_seq_no;
          const date_due = formatDate(resp[i].date_due);
          const dates = new Date(date_due);
          const month = dates.getMonth() + 1;
          const day = dates.getDate() + 1;
          const year = dates.getFullYear();
          // const dueDate = `${month}/${day}/${year}`;
          // console.log(date_due);
          // const dDue = new Date(dueDate);
          // const dateDue = dDue
          //   .toLocaleDateString("en-US", {
          //     day: "numeric",
          //     month: "short",
          //     year: "numeric",
          //   })
          //   .replace(/ /g, "-")
          //   .replace(/,/g, "");
          const principal = resp[i].principal;
          const interest = resp[i].interest;
          const monthp = resp[i].monthp;
          const parsedPrincipal = parseFloat(principal);
          const parsedInterest = parseFloat(interest);
          const parsedMonthp = parseFloat(monthp);
          details.push([
            repay_seq_no,
            date_due,
            <div className="font-bold" style={{ textAlign: "right" }}>
              {formatNumber(parsedPrincipal)}
            </div>,
            <div className="font-bold" style={{ textAlign: "right" }}>
              {formatNumber(parsedInterest)}
            </div>,
            <div className="font-bold" style={{ textAlign: "right" }}>
              {formatNumber(parsedMonthp)}
            </div>,
          ]);
          principalSum += parsedPrincipal;
          interestSum += parsedInterest;
          paymentSum += parsedMonthp;

          setLoanIns(parsedMonthp);
        }
        // Empty Row
        details.push([]);
        // Add the total sum row
        const totalRow = [
          "",
          <div className="font-bold">Total :</div>,
          <div className="font-bold" style={{ textAlign: "right" }}>
            {formatNumber(principalSum)}
          </div>,
          <div className="font-bold" style={{ textAlign: "right" }}>
            {formatNumber(interestSum)}
          </div>,
          <div className="font-bold" style={{ textAlign: "right" }}>
            {formatNumber(paymentSum)}
          </div>,
        ];
        details.push(totalRow);
        setData(details);
      });
  }, [call]);

  function formatDate(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    // Pad the day with a leading zero if it's a single digit
    var day = inputDate.getDate();
    var paddedDay = day < 10 ? "0" + day : day;

    return (
      paddedDay +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }

  async function postLoanScheduleEnquiry() {
    if (false) {
      swal({
        title: "All Fields Are Required",
        text: "Please fill all the fields",
        icon: "warning",
        button: "Ok",
      });
    } else {
      setLoad(true);
      axios
        .post(
          API_SERVER + "/api/loan-schedule-quotation",
          {
            ballon_installment_to_be_applied: "",
            ballon_on_installment_number: "",
            currency: currency,
            effective_date: formatDate(
              JSON.parse(localStorage.getItem("userInfo")).postingDate
            ),
            exempt_month: "",
            facility_amount: `${requestedAmount}`,
            facility_number: quotationNumber,
            first_principal_repay_date: "",
            interest_moratorium: "",
            interest_rate: interestRateAnnum,
            interest_repayment_count: interestRepaymentCount,
            interest_repayment_frequency: interestRepaymentFrequency,
            interest_type: interestType,
            last_repayment_date: "",
            last_working_day_of_the_month: lastWorkingDay,
            legal_form: "",
            loan_tenor_in_months: tenorInMonths,
            principal_moratorium: 0,
            principal_repayment_count: principalRepaymentCount,
            principal_repayment_frequency: principalRepaymentFrequency,
            processing_fees: 0,
            schedule_start_date: formatDate(
              JSON.parse(localStorage.getItem("userInfo")).postingDate
            ),
            net_monthly_salary: 0,
          },
          { headers }
        )
        .then(function (response) {
          if (response.data[0].responseCode === "000") {
            setCall(!call);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const loanCharacter = (
    <div>
      {/* <div style={{ borderBottom: "1px solid" }}>
            <h6>Loan Plan</h6>
          </div> */}

      {selectedOption === "16" ? (
        <div style={{}}>
          <div style={{}}>
            <InputField
              label={"Interest Rate P.M"}
              // labelWidth={"68%"}
              inputWidth={"100%"}
              className={"font-bold"}
              disabled={selectedOption === "02"}
              value={interestRate}
              onChange={(e) => {
                setInterestRate(e.target.value);
                setInt(e.target.value);
                let ann = e.target.value * 12;
                setInterestRateAnnum(ann?.toFixed(2));
              }}
              textAlign={"right"}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  let ann = e.target.value * 12;
                  setInterestRateAnnum(ann?.toFixed(2));
                }
              }}
              // fontSize={"85%"}
            />
          </div>
          <div style={{}}>
            <InputField
              label={"Interest Rate P.A"}
              inputWidth={"100%"}
              className={"font-bold"}
              // disabled={selectedOption === "02"}
              value={interestRateAnnum}
              onChange={(e) => {
                setInterestRateAnnum(e.target.value);
                let rtt = e.target.value / 12;
                setInterestRate(rtt?.toFixed(4));
              }}
              textAlign={"right"}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  let rtt = e.target.value / 12;
                  setInterestRate(rtt?.toFixed(4));
                }
              }}
            />
          </div>
        </div>
      ) : (
        <div style={{}}>
          <div style={{}}>
            <InputField
              label={"Effective Interest Rate (P.M)"}
              inputWidth={"100%"}
              className={"font-bold"}
              disabled
              value={interestRate}
              textAlign={"right"}
            />
          </div>
          <div style={{}}>
            <InputField
              label={"Effective Interest Rate (P.A)"}
              inputWidth={"100%"}
              className={"font-bold"}
              value={interestRateAnnum}
              disabled
              textAlign={"right"}
            />
          </div>
        </div>
      )}
      {/* <div style={{}}>
              <div style={{}}>
                <InputField
                  label={"Effective Interest Rate (P.M)"}
                  // labelWidth={"68%"}
                  inputWidth={"80%"}
                  className={"font-bold"}
                  // fontSize={"85%"}
                  // disabled={selectedOption === "02"}
                  disabled
                  value={interestRate}
                  textAlign={"right"}
                />
              </div>
              <div style={{}}>
                <InputField
                  label={"Effective Interest Rate (P.A)"}
                  inputWidth={"80%"}
                  className={"font-bold"}
                  value={interestRateAnnum}
                  disabled
                  textAlign={"right"}
                />
              </div>
            </div> */}
      <div style={{}}>
        <InputField
          label={"Tenor (Months)"}
          // labelWidth={"44%"}
          inputWidth={"100%"}
          required
          value={tenorInMonths}
          onChange={(e) => {
            setTenorInMonths(e.target.value);
            setTn(e.target.value);
            setPrincipalRepaymentCount(e.target.value);
            setInterestRepaymentCount(e.target.value);
          }}
          textAlign={"center"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setPrincipalRepaymentCount(tenorInMonths);
              setInterestRepaymentCount(tenorInMonths);
            }
          }}
          onBlur={(e) => {
            setPrincipalRepaymentCount(tenorInMonths);
            setInterestRepaymentCount(tenorInMonths);
          }}
        />
      </div>
      <div style={{}}>
        <ListOfValue
          label={"Interest Type"}
          // labelWidth={"44%"}
          inputWidth={"100%"}
          lovdata={lovInterestType}
          disabled={selectedOption === "02"}
          value={interestType}
          onChange={(value) => {
            setInterestType(value);
          }}
        />
      </div>
      <div style={{}}>
        <ListOfValue
          label={"Principal Repay Freq."}
          // labelWidth={"44%"}
          inputWidth={"100%"}
          lovdata={lovPrincipalRepayFreq}
          disabled={selectedOption === "02"}
          value={principalRepaymentFrequency}
          onChange={handlePrincipalRepaymentFrequency}
        />
      </div>
      <div style={{}}>
        <ListOfValue
          label={"Interest Repay Freq."}
          // labelWidth={"44%"}
          inputWidth={"100%"}
          lovdata={lovInterestRepayFreq}
          disabled={selectedOption === "02"}
          onChange={handleInterestRepaymentFrequency}
          value={interestRepaymentFrequency}
        />
      </div>
      <div>
        <div style={{}}>
          <InputField
            label={"Principal Count"}
            // labelWidth={"68%"}
            inputWidth={"100%"}
            // disabled={selectedOption === "02"}
            disabled
            textAlign={"center"}
            // fontSize={"85%"}
            value={principalRepaymentCount}
            onChange={(e) => setPrincipalRepaymentCount(e.target.value)}
          />
        </div>
        <div style={{}}>
          <InputField
            label={"Interest Count"}
            inputWidth={"100%"}
            // disabled={selectedOption === "02"}
            textAlign={"center"}
            disabled
            value={interestRepaymentCount}
            onChange={(e) => setInterestRepaymentCount(e.target.value)}
          />
        </div>
      </div>
      {selectedOption === "16" ? (
        <div style={{}}>
          <SelectField
            label={"Apply Exempt Months"}
            // labelWidth={"44%"}
            inputWidth={"100%"}
            lovdata={[
              { label: "Yes", value: "Y" },
              { label: "No", value: "N" },
            ]}
            value={exemptMonth}
            onChange={(value) => {
              setExemptMonth(value);
            }}
          />
        </div>
      ) : (
        <div style={{}}>
          <SelectField
            label={"Interest Date Option"}
            // labelWidth={"44%"}
            inputWidth={"100%"}
            lovdata={[
              { label: "Fixed Interest Rate", value: "fixed" },
              { label: "Variable Interest Rate", value: "variable" },
            ]}
          />
        </div>
      )}
      <div style={{}}>
        <SelectField
          label={"Last Working Day"}
          // labelWidth={"44%"}
          inputWidth={"100%"}
          lovdata={[
            { label: "Yes", value: "Y" },
            { label: "No", value: "N" },
          ]}
          disabled={selectedOption === "02"}
          value={lastWorkingDay}
          onChange={(value) => {
            setLastWorkingDay(value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <div></div>
        <div>
          <ButtonComponent
            label={"Preview Schedule"}
            // background={selectedOption === "02" ? "grey" : "#c4549c"}
            buttonColor={facilityType === "16" ? "blue" : "gray"}
            buttonIcon={<HiOutlineClipboardDocumentList size={20} />}
            buttonHeight={"40px"}
            buttonWidth={"170px"}
            // disabled={selectedOption === "02"}
            onClick={() => {
              if (facilityType === "16") {
                if (requestedAmount === "") {
                  Swal.fire({
                    icon: "info",
                    title: "INF - Enter Amount to Preview Loan Schedule",
                    text: "",
                  }).then((result) => {
                    document.getElementById("requestAmount").focus();
                  });
                } else {
                  setLoanScheduleModal(true);
                  postLoanScheduleEnquiry();
                }
              }
            }}
            buttonBackgroundColor={
              facilityType === "16" ? "#d4e2ff" : "lightgray"
            }
          />
        </div>
        <Modal
          open={loanScheduleModal}
          // size="55%"
          width={650}
          // onClose={() => setLoanScheduleModal(false)}
          onCancel={() => setLoanScheduleModal(false)}
          // trapFocus="false"
          // padding={"10px"}
          // withCloseButton={false}
          footer={null}
        >
          <div style={{ zoom: "0.9" }}>
            <HeaderComponent title="LOAN SCHEDULE" />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
                border: "2px solid #d6d7d9",
                borderRadius: "5px",
                gap: "10px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div style={{}}>
                <ButtonComponent
                  label="Print Loan Schedule"
                  buttonWidth={"190px"}
                  buttonIcon={<AiFillPrinter size={20} />}
                  buttonHeight={"35px"}
                  buttonBackgroundColor={"#0063d1"}
                  onClick={handlePrint}
                />
              </div>
              <div style={{}}>
                <ButtonComponent
                  label={"Close"}
                  buttonIcon={<IoExitOutline size={20} />}
                  buttonWidth={"90px"}
                  buttonHeight={"35px"}
                  buttonBackgroundColor={"red"}
                  onClick={() => {
                    setLoanScheduleModal(false);
                  }}
                />
              </div>
              {/* <div></div> */}
            </div>
            <br />
            <div ref={componentRef} style={{ padding: "50px" }}>
              <div
                className="space-y-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                  marginTop: "-40px",
                  textAlign: "center",
                }}
              >
                <div></div>
                <div className="space-y-2 mr-4">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={coop}
                      alt="Coop Tech"
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "800",
                    }}
                  >
                    COOPTECH
                  </div>

                  <div
                    className="font-bold"
                    style={{
                      fontSize: "15px",
                      textDecoration: "capitalize",
                    }}
                  >
                    Branch : {branch}
                  </div>
                  <div
                    className="font-bold"
                    style={{
                      fontSize: "18px",
                      // fontWeight: "500",
                    }}
                  >
                    LOAN REPAYMENT SCHEDULE
                  </div>
                </div>
              </div>
              <div
                className="printii"
                style={{
                  display: "flex",
                  padding: "10px",
                  border: "2px solid #d6d7d9",
                  borderRadius: "5px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <div style={{ flex: 0.5 }}>
                  <div>
                    <InputField
                      label={"Applicant Name"}
                      value={accountName}
                      labelWidth={"35%"}
                      inputWidth={"60%"}
                      margin={"10px"}
                      textAlign={"right"}
                      className={"font-bold"}
                      disabled
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Facility Amount"}
                      value={formatNumber(+requestedAmount)}
                      labelWidth={"35%"}
                      inputWidth={"60%"}
                      margin={"10px"}
                      textAlign={"right"}
                      className={"font-bold"}
                      disabled
                    />
                  </div>
                </div>
                <div style={{ flex: 0.5 }}>
                  <div>
                    <InputField
                      label={"Interest Rate P.A"}
                      value={interestRateAnnum}
                      labelWidth={"35%"}
                      inputWidth={"60%"}
                      margin={"10px"}
                      textAlign={"right"}
                      className={"font-bold"}
                      disabled
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Repayment Type"}
                      value={
                        interestType === "02" ? "REDUCING BALANCE" : "FLAT"
                      }
                      labelWidth={"35%"}
                      inputWidth={"60%"}
                      margin={"10px"}
                      textAlign={"right"}
                      className={"font-bold"}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <br />
              <div
                style={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CustomTable
                  headers={[
                    "Seq No",
                    "Due Date",
                    "Principal",
                    "Interest",
                    "Payment",
                  ]}
                  style={{
                    headerAlignRight: [3, 4, 5],
                    columnAlignCenter: [1, 2],
                  }}
                  data={data}
                  loading={{
                    status: load,
                    message: "INF - GENERATING SCHEDULE ...",
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );

  const loanChargesDetails = (
    <div>
      <CustomTable
        headers={["Charges", "%", "Fee Amount"]}
        style={{ headerAlignLeft: [1], headerAlignRight: [3] }}
        data={chargesArr}
      />
    </div>
  );

  const loanPlan = [
    {
      key: "1",
      label: facilityType === "16" ? "Loan Plan" : "Overdraft Plan",
      children: loanCharacter,
    },
  ];

  const loanFees = [
    {
      key: "1",
      label: facilityType === "16" ? "Loan Fees" : "Overdraft Fees",
      children: loanChargesDetails,
    },
  ];

  // useEffect(() => {
  //   getLoanCharges(req);
  // }, [checked]);

  // console.log(typeof requestedAmount, "acctlinkkkkkkkk");
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            colorBgContainer: "#f8fbff",
            // colorTextHeading: "blue",
            colorFillAlter: "#dfedff",
          },
        },
      }}
    >
      <div className="h-[495px] overflow-y-scroll">
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <div className="absolute top-0 left-0 z-10 h-full opacity-50 bg-white flex justify-center align-middle w-full">
        <TableLoader />
      </div> */}
          <div
            style={{
              flex: 0.55,
              paddingRight: "10px",
              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              backgroundColor: "white",
              // borderRadius: "5px",
              borderRight: "2px dashed #dce2e3",
            }}
          >
            <div>
              <HeaderComponent
                title={
                  facilityType == "16" ? "Loan Details" : "Overdraft Details"
                }
              />
            </div>
            {selectedOption === "16" ? (
              <div>
                <ListOfValue
                  label={"Loan Product"}
                  // labelWidth={"30%"}
                  inputWidth={"100%"}
                  required
                  id={"loanProductFocus"}
                  lovdata={lovLoanProducts}
                  value={loanProduct}
                  onChange={(value) => {
                    setLoanProduct(value);
                    // console.log(memberStatus, "memmmmmmmmmmm");
                    // console.log(value, "proddddd");
                    // console.log(currency, "currrrrr");
                    // axios
                    //   .post(
                    //     API_SERVER + "/api/get-number-of-tranches",
                    //     { loan_product: value },
                    //     {
                    //       headers,
                    //     }
                    //   )
                    //   .then(function (response) {
                    //     setCount(response.data[0]?.count);
                    //   });
                    console.log(value, "dattt");
                    console.log(currency, "currr");
                    // console.log(name, "dattt");

                    axios
                      .post(
                        API_SERVER + "/api/get-existing-repayment-account",
                        {
                          loanProduct: value?.trim(),
                          currency: currency?.trim(),
                          customerNumber: customerNumber?.trim(),
                        },
                        {
                          headers,
                        }
                      )
                      .then(function (response) {
                        // Extract the response data to a variable
                        const responseData = response.data;
                        // console.log(responseData, "ressssss");

                        if (parseFloat(responseData[0]?.count) > 0) {
                          Swal.fire({
                            icon: "warning",
                            title:
                              "INF - Member already has a running Loan for the selected Product",
                            text: "Please Select a Different Loan Product",
                          }).then((result) => {
                            setLoanProduct("");
                            document
                              .getElementById("loanProductFocus")
                              ?.focus();
                          });
                        }
                        // else {
                        //   if (responseData[0]?.prod_active_status === "A") {
                        //     if (memberStatus === "A") {
                        //       console.log("continue");
                        //     } else {
                        //       Swal.fire({
                        //         icon: "warning",
                        //         title: `INF - Member is not <span style="color: red;">ACTIVE</span> for this Loan Product`,
                        //         text: "Please Select a Different Loan Product",
                        //       }).then((result) => {
                        //         setLoanProduct("");
                        //         document
                        //           .getElementById("loanProductFocus")
                        //           ?.focus();
                        //       });
                        //     }
                        //   }
                        // }
                      })
                      .catch(function (error) {
                        // Handle errors here if needed
                        console.error("An error occurred:", error);
                      });

                    // axios
                    //   .post(
                    //     API_SERVER + "/api/get-existing-repayment-acc",
                    //     {
                    //       loanProduct: value?.trim(),
                    //       currency: currency?.trim(),
                    //       facilityServiceAccount: name?.trim(),
                    //     },
                    //     {
                    //       headers,
                    //     }
                    //   )
                    //   .then(function (response) {
                    //     console.log(response.data, "ressssss");
                    //     if (parseFloat(response.data[0]?.count) > 0) {
                    //       Swal.fire({
                    //         icon: "warning",
                    //         title:
                    //           "Member already has a running Loan for the selected Product",
                    //         text: "Please Select a Different Loan Product",
                    //       }).then((result) => {
                    //         document.getElementById("loanProductFocus")?.focus();
                    //       });
                    //     }
                    //   });

                    /////////// ReFRESH LOAN DETails ///////////////////////////////////////////////
                    // if (requestedAmount) {
                    //   axios
                    //     .post(
                    //       API_SERVER + "/api/get-product-details",
                    //       {
                    //         legal_form: value?.trim(),
                    //         currency: currency?.trim(),
                    //       },
                    //       {
                    //         headers,
                    //       }
                    //     )
                    //     .then(function (response) {
                    //       setInterestType(response.data[0]?.int_type);
                    //       setPrincipalRepaymentFrequency(
                    //         response.data[0]?.repayment_frequency
                    //       );
                    //       setInterestRepaymentFrequency(
                    //         response.data[0]?.int_freq
                    //       );
                    //       setGuarantorLimit(response.data[0]?.guarantor_limit);
                    //       setGuarantorBeneficiaryLimit(
                    //         response.data[0]?.guarantor_beneficiary_limit
                    //       );
                    //       setTenorInMonths(response.data[0]?.maturity_period);
                    //       setPrincipalRepaymentCount(
                    //         response.data[0]?.prin_pay_count
                    //       );
                    //       setInterestRepaymentCount(
                    //         response.data[0]?.int_pay_count
                    //       );
                    //       setLastWorkingDay(response.data[0]?.last_day);
                    //       setExemptMonth(response.data[0]?.weeks_in_month);
                    //     });

                    //   axios
                    //     .post(
                    //       API_SERVER + "/api/get-interest-charges",
                    //       {
                    //         legal_form: value?.trim(),
                    //         currency: currency?.trim(),
                    //         amt: `${requestedAmount}`,
                    //       },
                    //       {
                    //         headers,
                    //       }
                    //     )
                    //     .then(function (response) {
                    //       setInterestRateAnnum(
                    //         formatNumber(parseFloat(response.data[0]?.base_rate))
                    //       );
                    //       setEffectiveInterestRateAnnum(
                    //         formatNumber(
                    //           parseFloat(response.data[0]?.eff_interest)
                    //         )
                    //       );
                    //       getAccumInterest(
                    //         response.data[0]?.base_rate,
                    //         response.data[0]?.eff_interest
                    //       );
                    //     });

                    //   const requestedAmountValue = parseFloat(req);
                    //   const lienPercentageValue = 20.0;
                    //   const insurancePercentageValue = 2.5;
                    //   const processingFeePercentageValue = 2.5;
                    //   // const tenorInMonthsValue = 12;
                    //   // document.getElementById("introSource").focus();

                    //   const calculateValue = (percentage, amount) => {
                    //     return formatNumber((percentage / 100) * amount);
                    //   };
                    //   // setExemptMonth("N");
                    //   // setLastWorkingDay("Y");
                    //   setLienPercentage(lienPercentageValue.toFixed(2));
                    //   setLienAmount(
                    //     formatNumber(
                    //       calculateValue(
                    //         lienPercentageValue,
                    //         requestedAmountValue
                    //       )
                    //     )
                    //   );
                    //   setInsurancePercentage(insurancePercentageValue.toFixed(2));
                    //   setInsuranceAmount(
                    //     formatNumber(
                    //       calculateValue(
                    //         insurancePercentageValue,
                    //         requestedAmountValue
                    //       )
                    //     )
                    //   );
                    //   setProcessingFeePercentage(
                    //     processingFeePercentageValue.toFixed(2)
                    //   );
                    //   setProcessingFeeAmount(
                    //     formatNumber(
                    //       calculateValue(
                    //         processingFeePercentageValue,
                    //         requestedAmountValue
                    //       )
                    //     )
                    //   );
                    // }
                  }}
                />
              </div>
            ) : (
              <div>
                <InputField
                  label={"Source of Payment"}
                  onChange={(e) => {
                    setSourceFunds(e.target.value);
                  }}
                  inputWidth={"100%"}
                  required
                  value={sourceFunds}
                />
              </div>
            )}
            <div style={{}}>
              <ListOfValue
                label={"Facility Type Category"}
                // labelWidth={"30%"}
                inputWidth={"100%"}
                required
                lovdata={lovFacilityTypeCategory}
                value={facilityTypeCategory}
                onChange={(value) => {
                  setFacilityTypeCategory(value);
                }}
              />
            </div>
            {/* <div style={{ marginTop: "20px" }}>
              <InputField
                label={"Currency"}
                labelWidth={"35%"}
                inputWidth={"15%"}
                required
                disabled
              />
            </div> */}
            <div style={{}}>
              <InputField
                label={"Requested Amount"}
                // labelWidth={"30%"}
                inputWidth={"50%"}
                required
                textAlign={"right"}
                id={"requestAmount"}
                autoComplete={"off"}
                className={"font-bold"}
                value={req}
                onChange={handleFacilityNumberChange}
                onBlur={(e) => {
                  RequestAmountBlur(e);
                }}
                onFocus={(e) => {
                  setReq(req?.replaceAll(",", ""));
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (facilityType === "16") {
                      if (!loanProduct) {
                        Swal.fire({
                          icon: "info",
                          title: "Please Select a Loan Product",
                          text: "",
                        }).then((result) => {
                          document.getElementById("loanProductFocus")?.focus();
                          setReq("");
                          setRequestedAmount("");
                        });
                      }
                      // else if (
                      //   parseFloat(e.target.value) > parseFloat(total)
                      // ) {
                      //   Swal.fire({
                      //     icon: "warning",
                      //     title: `Requested Amount cannot exceed <span style="color: red;">(${loanLmt})</span> times of Member's deposit of <span style="color: darkblue; font-style: italic;">${curDesc} ${formatNumber(
                      //       availableBalance
                      //     )}</span>`,
                      //     text: "",
                      //   }).then((result) => {
                      //     setReq("");
                      //     setRequestedAmount("");
                      //   });
                      // }
                      else {
                        const lienPercentageValue = 20.0;

                        getLoanCharges(
                          e.target.value,
                          lienPercentageValue.toFixed(2),
                          formatNumber(
                            (lienPercentageValue / 100) * e.target.value
                          )
                        );
                        RequestAmountBlur(e);

                        axios
                          .post(
                            API_SERVER + "/api/get-product-details",
                            {
                              legal_form: loanProduct?.trim(),
                              currency: currency?.trim(),
                            },
                            {
                              headers,
                            }
                          )
                          .then(function (response) {
                            setInterestType(response.data[0]?.int_type);
                            setPrincipalRepaymentFrequency(
                              response.data[0]?.repayment_frequency
                            );
                            setInterestRepaymentFrequency(
                              response.data[0]?.int_freq
                            );
                            setGuarantorLimit(
                              response.data[0]?.guarantor_limit
                            );
                            setGuarantorBeneficiaryLimit(
                              response.data[0]?.guarantor_beneficiary_limit
                                ? response.data[0]?.guarantor_beneficiary_limit
                                : "3"
                            );
                            setTenorInMonths(response.data[0]?.maturity_period);
                            setTn(response.data[0]?.maturity_period);
                            setPrincipalRepaymentCount(
                              response.data[0]?.prin_pay_count
                            );
                            setInterestRepaymentCount(
                              response.data[0]?.int_pay_count
                            );
                            setLastWorkingDay(response.data[0]?.last_day);
                            setExemptMonth(
                              response.data[0]?.weeks_in_month === "null"
                                ? "N"
                                : response.data[0]?.weeks_in_month
                            );
                          });

                        axios
                          .post(
                            API_SERVER + "/api/get-interest-charges",
                            {
                              legal_form: loanProduct?.trim(),
                              currency: currency?.trim(),
                              amt: `${requestedAmount}`,
                            },
                            {
                              headers,
                            }
                          )
                          .then(function (response) {
                            setInterestRateAnnum(
                              formatNumber(
                                parseFloat(response.data[0]?.base_rate)
                              )
                            );
                            // setInt(response.data[0]?.base_rate);
                            setEffectiveInterestRateAnnum(
                              formatNumber(
                                parseFloat(response.data[0]?.eff_interest)
                              )
                            );
                            getAccumInterest(
                              response.data[0]?.base_rate,
                              response.data[0]?.eff_interest
                            );
                          });

                        // setLoanIns(
                        //   requestedAmount / tenorInMonths +
                        //     (20 / 100) * requestedAmount
                        // );
                        // console.log(setLoanIns, "insssss");
                      }
                    } else {
                      RequestAmountBlur(e);
                      getOdCharges(e.target.value);
                      axios
                        .post(
                          API_SERVER + "/api/get-od-interest-charges",
                          {
                            cur: currency?.trim(),
                            amt: `${requestedAmount}`,
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setInterestRate(
                            formatNumber(
                              parseFloat(response.data[0]?.get_loan_baserate)
                            )
                          );
                          setInterestRateAnnum(
                            formatNumber(
                              parseFloat(response.data[0]?.interest_variance)
                            )
                          );
                        });
                    }
                  }
                }}
              />
            </div>

            <div style={{}}>
              <ListOfValue
                label={"Intro Source"}
                // labelWidth={"30%"}
                inputWidth={"100%"}
                required
                lovdata={lovIntroSource}
                value={introSource}
                onChange={(value) => {
                  setIntroSource(value);
                }}
                id={"introSource"}
              />
            </div>
            <div style={{}}>
              <ListOfValue
                label={"Dealer Code"}
                // labelWidth={"30%"}
                inputWidth={"100%"}
                lovdata={lovDealerCode}
                value={dealerCode}
                onChange={(value) => {
                  setDealerCode(value);
                }}
              />
            </div>
            <div style={{}}>
              <ListOfValue
                label={"Purpose"}
                // labelWidth={"30%"}
                inputWidth={"100%"}
                required
                lovdata={lovPurpose}
                value={purpose}
                onChange={(value) => {
                  setPurpose(value);
                }}
              />
            </div>
            <div style={{}}>
              <TextAreaField
                label={"Other Purpose"}
                cols={30}
                rows={2}
                // labelWidth={"30.7%"}
                value={otherPurpose}
                onChange={(e) => {
                  setOtherPurpose(e.target.value);
                }}
                // onBlur={() => console.log(otherPurpose, "opppppppppp")}
              />
            </div>

            <div style={{}}>
              <ListOfValue
                label={"Sector"}
                // labelWidth={"30%"}
                inputWidth={"100%"}
                required
                lovdata={lovSector}
                onChange={handleSector}
                value={sector}
              />
            </div>
            <div style={{}}>
              <ListOfValue
                label={"Sub Sector"}
                // labelWidth={"30%"}
                inputWidth={"100%"}
                required
                lovdata={lovSubSector}
                value={subSector}
                onChange={(value) => {
                  setSubSector(value);
                }}
              />
            </div>
            <div style={{}}>
              <ListOfValue
                label={"Sales/Intro Staff"}
                // labelWidth={"30%"}
                inputWidth={"100%"}
                required
                lovdata={lovStaff}
                value={staff}
                onChange={(value) => {
                  setStaff(value);
                }}
              />
            </div>

            <div style={{}}>
              <InputField
                label={"Moratorium Period"}
                // labelWidth={"30%"}
                inputWidth={"50%"}
                value={moratoriumPeriod}
                onChange={(e) => setMoratorium(e.target.value)}
              />
            </div>
            <div style={{}}>
              <SelectField
                label={"With Interest"}
                // labelWidth={"30%"}
                inputWidth={"50%"}
                // value={withInterests && "N"}
                lovdata={[
                  { label: "Yes", value: "Y" },
                  { label: "No", value: "N" },
                ]}
                value={withInterest}
                onChange={(value) => {
                  setWithInterest(value);
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <RadioButtons
                label={"Disburse Loan to Other Bank"}
                labelWidth={"31%"}
                display={true}
                display2={true}
                required
                name={"anyname"}
                value={"Y"}
                value2={"N"}
                checked={disburse === "Y"}
                checked2={disburse === "N"}
                onChange={(e) => {
                  setDisburse(e.target.value);
                  if (e.target.value === "N") {
                    setBank("");
                    setBankAcct("");
                  }
                }}
                radioLabel={"Yes"}
                radioLabel2={"No"}
                radioButtonsWidth={"15%"}
              />
            </div>
            {disburse === "Y" ? (
              <div>
                <div>
                  <ListOfValue
                    label={"Bank"}
                    // labelWidth={"30%"}
                    inputWidth={"100%"}
                    lovdata={lovBanks}
                    value={bank}
                    onChange={(value) => {
                      setBank(value);
                    }}
                  />
                </div>
                <div>
                  <InputField
                    label={"Bank Account"}
                    // labelWidth={"30%"}
                    inputWidth={"100%"}
                    value={bankAcct}
                    onChange={(e) => setBankAcct(e.target.value)}
                    type={"number"}
                  />
                </div>
              </div>
            ) : disburse === "N" ? (
              // <p
              //   style={{
              //     fontSize: "80%",
              //     color: "red",
              //     textAlign: "center",
              //     marginLeft: "20%",
              //     marginTop: "10px",
              //   }}
              // >
              //   Note: By selecting NO, the loan will be disbursed to the same
              //   bank.
              // </p>
              <div style={{}}>
                <div
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Notification
                    withCloseButton={false}
                    withBorder
                    color="blue"
                    title="Note:"
                  >
                    The loan will be disbursed to the same bank account.
                  </Notification>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            style={{
              flex: 0.45,
              // padding: "10px",
              // border: "2px solid #d6d7d9",
              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              backgroundColor: "white",
              // borderRadius: "5px",
              // border: "2px solid #d6d7d9",
            }}
          >
            <Collapse
              items={loanPlan}
              // defaultActiveKey={["1"]}
              // onChange={onChange}
            />
            <div className="pt-2">
              <Collapse
                items={loanFees}
                // defaultActiveKey={["1"]}
                // onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <div></div>
          <div>
            <ButtonComponent
              label={"Next"}
              background={"#c4549c"}
              buttonColor={"white"}
              buttonHeight={"40px"}
              buttonWidth={"100px"}
              buttonBackgroundColor={"#0063d1"}
              onClick={() => {
                if (appNumber != "") {
                  secondTab();
                } else {
                  validateBlock();
                }
              }}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default General;
