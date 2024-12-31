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
export default function Gurantee({
  customerNumber,
  data,
  formData,
  body,
  handleSubmit,
  setFormData,
}) {
  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const [nextReview, setNextReview] = useState("");
  const [expiry, setExpiry] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [financialInstitution, setFinancialInstitution] = useState("");
  const [financialInstitutionArr, setFinalInstitutionArr] = useState([]);
  const [currency, setCurrency] = useState("");
  const [currencyArr, setCurrencyArr] = useState([]);
  const [depositType, setDepositType] = useState("");
  const [depositTypeArr, setDepositTypeArr] = useState([]);
  const [branch, setBranch] = useState("");
  const [collateralType, setCollateralType] = useState("");
  const [collateralTypeArr, setCollateralTypeArr] = useState([]);
  const [interestRate, setInterestRate] = useState("");
  const [numberOfMonths, setNumberOfMonths] = useState("");
  const [guranteeAmount, setGuranteeAmount] = useState("");
  const [amountConsidered, setAmountConsidered] = useState("");
  const [comment, setComment] = useState("");
  const [rejection, setRejection] = useState("");
  const [folioNumber, setFolioNumber] = useState("");
  const [folioStartNumber, setFolioStartNumber] = useState("");
  const [folioEndNumber, setFolioEndNumber] = useState("");

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
    setFormData({
      accountNumber,
      financialInstitution,
      currency,
      depositType,
      branch,
      collateralType,
      interestRate,
      numberOfMonths,
      guranteeAmount,
      amountConsidered,
      nextReview,
      expiry,
      folioNumber,
      folioStartNumber,
      folioEndNumber,
    });
  }, [
    accountNumber,
    financialInstitution,
    currency,
    depositType,
    branch,
    collateralType,
    interestRate,
    numberOfMonths,
    guranteeAmount,
    amountConsidered,
    nextReview,
    expiry,
    folioNumber,
    folioStartNumber,
    folioEndNumber,
  ]);
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-code-details-2",
        {
          code: "ICC",
          orderingBy: "actualCode",
        },
        { headers }
      )
      .then((response) => {
        // console.log({response})
        setFinalInstitutionArr(response.data);
      });

    axios
      .post(
        API_SERVER + "/api/collateral-lovs",
        {
          key: "currency",
        },
        { headers }
      )
      .then((response) => {
        // console.log({response})
        setCurrencyArr(response.data);
      });
    axios
      .post(
        API_SERVER + "/api/collateral-lovs",
        {
          key: "depositType",
        },
        { headers }
      )
      .then((response) => {
        console.log({ response, adfsadfs: "" });
        setDepositTypeArr(response.data);
      });
    axios
      .post(
        API_SERVER + "/api/collateral-lovs",
        {
          key: "collateralType",
        },
        { headers }
      )
      .then((response) => {
        console.log({ response, adfsadfs: "" });
        setCollateralTypeArr(response.data);
      });
  }, []);
  return (
    <div>
      <div className=" rounded h-auto pb-2 pt-2 px-2 -mb-20  bg-white ">
        <div
          style={{
            background: "#daecfe",
          }}
          className=" uppercase py-1 px-3 mb-2 font-bold text-gray-800 "
        >
          Gurantee Collateral
        </div>
        <div
          style={{ width: "100%" }}
          className="wrapper  rounded  md:flex border-2"
        >
          {/* left side  */}
          <div className="w-[65%] rounded py-2 px-3 md:mr-2 md:mb-0">
            <div className="mb-4">
              <ListOfValue
                label={"Account Number"}
                labelWidth={"19.5%"}
                inputWidth={"40%"}
                required={true}
                data={data}
                value={accountNumber}
                onChange={(value) => {
                  setAccountNumber(value);
                }}
              />
            </div>
            <div className="mb-4">
              <ListOfValue
                label={"Financial Institution"}
                labelWidth={"19.5%"}
                inputWidth={"40%"}
                required={true}
                value={financialInstitution}
                onChange={(value) => {
                  setFinancialInstitution(value);
                }}
                data={financialInstitutionArr}
              />
            </div>
            <div className="mb-4">
              <ListOfValue
                label={"Currency"}
                labelWidth={"19.5%"}
                inputWidth={"40%"}
                required={true}
                value={currency}
                onChange={(value) => {
                  setCurrency(value);
                }}
                data={currencyArr}
              />
            </div>
            <div className="mb-4">
              <ListOfValue
                label={"Deposit Type"}
                labelWidth={"19.5%"}
                inputWidth={"40%"}
                required={true}
                value={depositType}
                onChange={(value) => {
                  setDepositType(value);
                }}
                data={depositTypeArr}
              />
            </div>

            <div className="mb-4">
              <InputField
                label={"Branch"}
                labelWidth={"19.5%"}
                inputWidth={"30%"}
                required={true}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <ListOfValue
                label={"Collateral Type"}
                labelWidth={"19.5%"}
                inputWidth={"40%"}
                required={true}
                onChange={(value) => {
                  setCollateralType(value);
                }}
                value={collateralType}
                data={collateralTypeArr}
              />
            </div>

            <div className="mb-4 items-center md:flex w-[100%] space-x-6">
              <div className="w-1/2">
                <InputField
                  label={"Interest Rate"}
                  labelWidth={"40%"}
                  inputWidth={"40%"}
                  required={true}
                  value={interestRate}
                  onChange={(e) => {
                    setInterestRate(e.target.value);
                  }}
                />
                {/* % */}
              </div>
              <div className="w-1/2">
                <InputField
                  label={"Number of Months"}
                  labelWidth={"37%"}
                  inputWidth={"20%"}
                  value={numberOfMonths}
                  onChange={(e) => {
                    setNumberOfMonths(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-4 items-center md:flex w-[100%] space-x-6">
              <div className="w-1/2">
                <InputField
                  label={"Gurantee Amount"}
                  labelWidth={"41.8%"}
                  inputWidth={"58%"}
                  required={true}
                  value={guranteeAmount}
                  onChange={(e) => {
                    setGuranteeAmount(e.target.value);
                  }}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"Amount Considered"}
                  labelWidth={"37%"}
                  inputWidth={"59%"}
                  required={true}
                  value={amountConsidered}
                  onChange={(e) => {
                    setAmountConsidered(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <InputField
                id={"Comment"}
                labelWidth={"19.5%"}
                inputWidth={"78.5%"}
                label={"Comment"}
                // required={true}
                // disabled={true}
                // value={shortDescription}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                // // value={narration}
                // onKeyPress={(e) => {
                //   switchFocus(e, "Debit Charge Account");
                // }}
              />
            </div>
            {/* <div className="mb-4">
              <InputField
                id={"Rejection Reason"}
                labelWidth={"19.5%"}
                inputWidth={"78.5%"}
                label={"Rejection Reason"}
                value={rejection}

                // required={true}
                disabled={true}
                onChange={(e) => {
                 setRejection( e.target.value);
                }}
                // onKeyPress={(e) => {
                //   switchFocus(e, "Debit Charge Account");
                // }}
              />
            </div> */}
          </div>
          {/* right side  */}
          <div className=" w-[35%] py-2  rounded px-4 ">
            {/* <div className="mb-8">
              <ButtonComponent label={"Attach Document"} />
            </div> */}
            <div className="mb-8">
              <div className="mb-4">
                <InputField
                  label={"Folio Number"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Folio Start Number"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Folio End Number"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
            </div>
            <div className="">
              <div className="mb-4">
                <InputField
                  type={"date"}
                  label={"Review Date"}
                  id={"Review Date"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required
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
                  required
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
