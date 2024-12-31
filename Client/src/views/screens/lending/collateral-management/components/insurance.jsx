import React, { useState, useEffect } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
export default function Insuarance({
  data,
  formData,
  setFormData,
  handleSubmit,
  body,
}) {
  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [accountNumber, setAccountNumber] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [insuranceCode, setInsuranceCode] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [sumAssured, setSumAssured] = useState("");
  const [amountConsidered, setAmountConsidered] = useState("");
  const [company, setCompany] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [nextReview, setNextReview] = useState("");
  const [expiry, setExpiry] = useState("");

  // const response = await axios.post(
  //         API_SERVER + "/api/company",
  //         {
  //           customerNumber: customerNumber,
  //         },
  //         { headers }
  //       );

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });
    // console.log({ formatted }, amount);

    return formatted;
  }

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setNextReview(newStartDate);

    // Calculate the end date by adding a year to the start date
    if (newStartDate) {
      const newEndDate = new Date(newStartDate);
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
      setExpiry(newEndDate.toISOString().split("T")[0]); // Format the end date as YYYY-MM-DD
    }
  };
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }
  useEffect(() => {
    async function Company() {
      await axios
        .get(API_SERVER + "/api/company", { headers })
        .then((res) => {
          console.log(res, "company response");
          setCompany(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function Policy() {
      await axios
        .get(API_SERVER + "/api/policy", { headers })
        .then((res) => {
          console.log(res, "company response");
          setPolicy(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    Company();
    Policy();
  }, []);

  let companyArray = [];
  function Company() {
    company.map((company) => {
      companyArray.push({
        value: company.actual_code,
        label: company.description,
      });
    });
  }
  Company();

  let policyArray = [];
  function Policy() {
    policy.map((policy) => {
      policyArray.push({
        value: policy.actual_code,
        label: policy.description,
      });
    });
  }
  Policy();

  useEffect(() => {
    setFormData({
      accountNumber,
      insuranceCompany,
      insuranceCode,
      policyType,
      policyNumber,
      sumAssured,
      amountConsidered,
      nextReview,
      expiry,
    });
  }, [
    accountNumber,
    insuranceCompany,
    insuranceCode,
    policyType,
    policyNumber,
    sumAssured,
    amountConsidered,
    nextReview,
    expiry,
  ]);

  return (
    <div>
      <div className=" rounded h-auto pb-2 pt-2 px-2 -mb-20  bg-white ">
        <div
          style={{
            background: "#daecfe",
          }}
          className=" uppercase py-1 px-3 mb-2 font-bold text-gray-800 "
        >
          Insurance Collateral
        </div>
        <div style={{ width: "100%" }} className="wrapper  rounded border-2">
          <div className="flex mb-4 py-2">
            {/* left side  */}
            <div className="w-[75%] rounded  md:mr-2 md:mb-0">
              <div className="mb-4">
                <ListOfValue
                  label={"Account Number"}
                  id={"Account Number"}
                  labelWidth={"20%"}
                  inputWidth={"40%"}
                  required={true}
                  data={data}
                  onChange={(value) => {
                    setAccountNumber(value);
                    var company = document.getElementById("Insurance Company");
                    company.focus();
                  }}
                  value={accountNumber}
                />
              </div>
              <div className="mb-4">
                <ListOfValue
                  label={"Insurance Company"}
                  id={"Insurance Company"}
                  labelWidth={"20%"}
                  inputWidth={"40%"}
                  required={true}
                  data={companyArray}
                  onChange={(value) => {
                    setInsuranceCompany(value);
                  }}
                  value={insuranceCompany}
                />
              </div>
            </div>

            {/* right side  */}
            {/* <div>
              <ButtonComponent label={"Attach Document"} />
            </div> */}
          </div>
          <div className="flex mb-4 py-2 pr-3">
            {/* left side  */}
            <div className="w-[75%] rounded  md:mr-2 md:mb-0">
              <div className="mb-4">
                <InputField
                  label={"Insurance Code"}
                  id={"Insurance Code"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                  required={true}
                  value={insuranceCode}
                  onChange={(e) => {
                    setInsuranceCode(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <ListOfValue
                  label={"Policy Type"}
                  id={"Policy Type"}
                  labelWidth={"20%"}
                  inputWidth={"30%"}
                  required={true}
                  value={policyType}
                  data={policyArray}
                  onChange={(value) => {
                    setPolicyType(value);
                  }}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Policy Number"}
                  id={"Policy Number"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                  required={true}
                  value={policyNumber}
                  onChange={(e) => {
                    setPolicyNumber(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4 items-center md:flex w-[100%] space-x-6">
                <div className="w-1/2">
                  <InputField
                    label={"Sum Assured"}
                    id={"Sum Assured"}
                    labelWidth={"41.8%"}
                    inputWidth={"57%"}
                    required={true}
                    value={sumAssured}
                    onChange={(e) => {
                      setSumAssured(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (!(amountConsidered === "")) {
                        setSumAssured(formatNumber(parseFloat(e.target.value)));
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (!(amountConsidered === "")) {
                          setSumAssured(
                            formatNumber(parseFloat(e.target.value))
                          );
                        }
                      }
                      switchFocus(e, "Amount Considered");
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <InputField
                    label={"Amount Considered"}
                    id={"Amount Considered"}
                    // disabled={true}
                    labelWidth={"36.5%"}
                    inputWidth={"60.5%"}
                    required={true}
                    value={amountConsidered}
                    onChange={(e) => {
                      setAmountConsidered(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (!(amountConsidered === "")) {
                        setAmountConsidered(
                          formatNumber(parseFloat(e.target.value))
                        );
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (!(amountConsidered === "")) {
                          setAmountConsidered(
                            formatNumber(parseFloat(e.target.value))
                          );
                        }
                      }
                      switchFocus(e, "Next Review Date");
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <InputField
                  id={"Comment"}
                  labelWidth={"20%"}
                  inputWidth={"78.5%"}
                  label={"Comment"}
                  // required={true}
                  // disabled={true}
                  // value={shortDescription}
                  // // onChange={onNarrationChange}
                  // // value={narration}
                  // onKeyPress={(e) => {
                  //   switchFocus(e, "Debit Charge Account");
                  // }}
                />
              </div>
              {/* <div className="mb-4">
                <InputField
                  id={"Rejection Reason"}
                  labelWidth={"20.2%"}
                  inputWidth={"78.5%"}
                  label={"Rejection Reason"}
                  // required={true}
                  disabled={true}
                  // onChange={onNarrationChange}
                  // value={charges}
                  // onChange={(e) => {
                  //   e.target.value;
                  // }}
                  // onKeyPress={(e) => {
                  //   switchFocus(e, "Debit Charge Account");
                  // }}
                />
              </div> */}
            </div>

            {/* right side  */}
            <div className="w-[25%]">
              <div className="mb-4">
                <InputField
                  type={"date"}
                  label={"Review Date"}
                  id={"Next Review Date"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required={true}
                  onChange={(e) => {
                    setNextReview(e.target.value);
                    // console.log(e)
                  }}
                  onBlur={(e) => {
                    handleStartDateChange(e);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleStartDateChange(e);
                    }
                    switchFocus(e, "Expiry Date");
                  }}
                  value={nextReview}
                />
              </div>
              <div className="mb-4">
                <InputField
                  type={"date"}
                  label={"Expiry Date"}
                  id={"Expiry Date"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required={true}
                  value={expiry}
                  onChange={(e) => {
                    setExpiry(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
