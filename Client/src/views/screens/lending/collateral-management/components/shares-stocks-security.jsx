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
export default function SharesStocksSecurity({
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
  const [amountConsidered, setAmountConsidered] = useState("");
  const [comment, setComment] = useState("");
  const [rejection, setRejection] = useState("");
  const [folioNumber, setFolioNumber] = useState("");
  const [folioStartNumber, setFolioStartNumber] = useState("");
  const [folioEndNumber, setFolioEndNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [securityCodeArr, setSecurityCodeArr] = useState([]);
  const [index, setIndex] = useState("");
  const [indexArr, setIndexArr] = useState([]);
  const [marketValue, setMarketValue] = useState("");
  const [numberOfShares, setNumberOfShares] = useState("");
  const [securityAmount, setSecurityAmount] = useState("");

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });
    // console.log({ formatted }, amount);

    return formatted;
  }
  useEffect(() => {
    setFormData({
      accountNumber,
      securityCode,
      index,
      marketValue,
      numberOfShares,
      securityAmount,
      amountConsidered,
      nextReview,
      expiry,
      folioNumber,
      folioStartNumber,
      folioEndNumber,
    });
  }, [
    accountNumber,
    securityCode,
    index,
    marketValue,
    numberOfShares,
    securityAmount,
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
          code: "SHA",
          orderingBy: "actualCode",
        },
        { headers }
      )
      .then((response) => {
        // console.log({response})
        setSecurityCodeArr(response.data);
      });
    axios
      .post(
        API_SERVER + "/api/get-code-details-2",
        {
          code: "IND",
          orderingBy: "actualCode",
        },
        { headers }
      )
      .then((response) => {
        // console.log({response})
        setIndexArr(response.data);
      });
  }, []);

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
  return (
    <div>
      <div className=" rounded h-auto pb-2 pt-2 px-2 -mb-20  bg-white ">
        <div
          style={{
            background: "#daecfe",
          }}
          className=" uppercase py-1 px-3 mb-2 font-bold text-gray-800 "
        >
          Shares/Stocks/Security Collateral
        </div>
        <div
          style={{ width: "100%" }}
          className="wrapper  rounded  md:flex border-2"
        >
          {/* left side  */}
          <div className="w-[65%] rounded py-2 md:mr-2 md:mb-0">
            <div className="mb-2">
              <ListOfValue
                label={"Account Number"}
                labelWidth={"24.2%"}
                inputWidth={"40%"}
                required={true}
                data={data}
              />
            </div>
            <div className="mb-2">
              <ListOfValue
                label={"Share/Security Code"}
                labelWidth={"24.2%"}
                inputWidth={"40%"}
                required={true}
                onChange={(value) => {
                  setSecurityCode(value);
                }}
                value={securityCode}
                data={securityCodeArr}
              />
            </div>
            <div className="mb-2">
              <ListOfValue
                label={"Index"}
                labelWidth={"24.2%"}
                inputWidth={"40%"}
                required={true}
                data={indexArr}
                value={index}
                onChange={(value) => {
                  setIndex(value);
                }}
              />
            </div>

            <div className="mb-2">
              <InputField
                label={"Market Value"}
                labelWidth={"24.2%"}
                inputWidth={"20%"}
                required={true}
                onChange={(e) => {
                  setMarketValue(e.target.value);
                }}
                value={marketValue}
              />
            </div>
            <div className="mb-2">
              <InputField
                label={"Number of Shares/Securities"}
                labelWidth={"24.2%"}
                inputWidth={"20%"}
                required={true}
                value={numberOfShares}
                onChange={(e) => {
                  setNumberOfShares(e.target.value);
                }}
              />
            </div>
            <div className="mb-2 items-center md:flex w-[100%] space-x-6">
              <div className="w-1/2">
                <InputField
                  label={"Security Amount"}
                  labelWidth={"51%"}
                  inputWidth={"48%"}
                  required={true}
                  value={securityAmount}
                  onChange={(e) => {
                    setSecurityAmount(e.target.value);
                  }}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"Amount Considered"}
                  labelWidth={"36.5%"}
                  inputWidth={"60.5%"}
                  required={true}
                  value={amountConsidered}
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
                  }}
                />
              </div>
            </div>
            <div className="mb-2">
              <InputField
                id={"Comment"}
                labelWidth={"25.7%"}
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
            {/* <div className="mb-2">
              <InputField
                id={"Rejection Reason"}
                labelWidth={"25%"}
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
          <div className=" w-[35%] py-2  rounded px-4 ">
            {/* <div className="mb-4">
              <ButtonComponent label={"Attach Document"} />
            </div> */}
            <div className="mb-8">
              <div className="mb-2">
                <InputField
                  label={"Folio Number"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div className="mb-2">
                <InputField
                  label={"Folio Start Number"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div className="mb-2">
                <InputField
                  label={"Folio End Number"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
            </div>
            <div className="">
              <div className="mb-2">
                <InputField
                  type={"date"}
                  label={"Review Date"}
                  id={"Review Date"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
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
                  required
                />
              </div>
              <div className="mb-2">
                <InputField
                  type={"date"}
                  label={"Expiry Date"}
                  id={"Expiry Date"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  value={expiry}
                  onChange={(e) => {
                    setExpiry(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
