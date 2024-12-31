import React, { useState, useEffect } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import Header from "../../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
function CashScreen({
  customerNumber,
  data,
  formData,
  body,
  handleSubmit,
  setFormData,
}) {
  const [additionalAccount, setAdditionalAccount] = useState([]);
  const [sourceAccount, setSourceAccount] = useState("");
  const [accountLink, setAccountLink] = useState("");
  const [accountDesc, setAccountDesc] = useState("");
  const [currency, setCurrency] = useState("");
  const [closingBal, setClosingBal] = useState("");
  const [collateralAmount, setCollateralAmount] = useState("");
  const [comment, setComment] = useState("");
  const [nextReview, setNextReview] = useState("");
  const [expiry, setExpiry] = useState("");
  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

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

  console.log(nextReview);

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });
    // console.log({ formatted }, amount);

    return formatted;
  }
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }
  // function getNextYearDate(dateString) {
  //   // Create a new Date object from the input date string
  //   var date = new Date(dateString);

  //   // Increment the year by 1
  //   date.setFullYear(date.getFullYear() + 1);

  //   // Format the next year date as a string in the same format as the input date
  //   var nextYearDate = date.toISOString().split("T")[0];
  //   setExpiry(nextYearDate);
  //   // return nextYearDate;
  // }
  // console.log(customerNumber);
  // useEffect(() => {
  //   async function getAdditionalAccount() {
  //     const response = await axios.post(
  //       API_SERVER + "/api/customerNumber",
  //       {
  //         customerNumber: customerNumber,
  //       },
  //       { headers }
  //     );
  //     console.log(response, "addtional accounts from api");
  //     const array = [];
  //     response.data.map((details) => {
  //       array.push({
  //         label: `${details.acct_link}- ${details.account_descrp}`,
  //         value: `${details.acct_link}- ${details.account_descrp}-${details.currency_code}-${details.closing_balance_today}`,
  //       });
  //     });
  //     setAdditionalAccount(array);
  //   }
  //   getAdditionalAccount();
  // }, [customerNumber]);
  useEffect(() => {
    const split = sourceAccount.split("-");
    setAccountLink(split[0]);
    setAccountDesc(split[1]);
    setCurrency(split[2]);
    setClosingBal(formatNumber(parseFloat(split[3])));
  }, [sourceAccount]);
  console.log(collateralAmount.replaceAll(",",""), "source account")
  

  useEffect(() => {
    setFormData({
      currency,
      nextReview,
      collateralAmount,
      accountLink,
      comment,
      expiry,
    });
  }, [currency, nextReview, collateralAmount, accountLink, comment]);

  console.log(additionalAccount, "additional account");
  return (
    <div>
      <div className="rounded h-auto pb-2 pt-2 px-2 -mb-20  bg-white">
        <div
          style={{
            background: "#daecfe",
          }}
          className=" uppercase py-1 px-3 mb-2 font-bold text-gray-800 "
        >
          Cash Collateral
        </div>
        <div style={{ width: "100%" }} className="wrapper  rounded border-2">
          <div className="flex mb-3 py-2 justify-start">
            {/* left side  */}
            <div className="w-[75%] rounded  md:mr-2 md:mb-0">
              <div className="mb-4">
                <ListOfValue
                  label={"Source Account"}
                  id={"Source Account"}
                  labelWidth={"20%"}
                  inputWidth={"40%"}
                  required={true}
                  data={data}
                  onChange={(value) => {
                    setSourceAccount(value);
                  }}
                  value={sourceAccount}
                  onKeyPress={(e) => {
                    switchFocus(e, "Collateral Amount");
                  }}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Currency"}
                  disabled={true}
                  required={true}
                  labelWidth={"20%"}
                  inputWidth={"10%"}
                  value={currency}
                />
              </div>
            </div>

            {/* right side  */}
            {/* <div>
              <ButtonComponent label={"Attach Document"} />
            </div> */}
          </div>
          <div className="flex py-2 px-3">
            {/* left side  */}
            <div className="w-[75%] rounded md:mr-2 md:mb-0 ">
              <div className="mb-4 items-center md:flex w-[100%] space-x-6">
                <div className="w-1/2">
                  <InputField
                    label={"Source Account Balance"}
                    disabled={true}
                    labelWidth={"41.5%"}
                    inputWidth={"60%"}
                    value={closingBal}
                    onKeyDown={(e) => {
                      switchFocus(e, "Collateral Amount");
                    }}
                    // required={true}
                  />
                </div>
                <div className="w-1/2">
                  <InputField
                    label={"Total Amount"}
                    disabled={true}
                    labelWidth={"37%"}
                    inputWidth={"60%"}
                    // required={true}
                  />
                </div>
              </div>
              <div className="mb-4 items-center md:flex w-[100%] space-x-6">
                <div className="w-1/2">
                  <InputField
                    label={"Approved Amount"}
                    disabled={true}
                    labelWidth={"41.5%"}
                    inputWidth={"60%"}
                    // required={true}
                  />
                </div>
                <div className="w-1/2">
                  <InputField
                    label={"Unapproved Amount"}
                    disabled={true}
                    labelWidth={"37%"}
                    inputWidth={"60%"}
                    // required={true}
                  />
                </div>
              </div>
              <div className="mb-4 items-center md:flex w-[100%] space-x-6">
                <div className="w-1/2">
                  <InputField
                    label={"Collateral Amount"}
                    id={"Collateral Amount"}
                    labelWidth={"41.5%"}
                    inputWidth={"60%"}
                    required={true}
                    onChange={(e) => {
                      setCollateralAmount(e.target.value);
                    }}
                    value={collateralAmount}
                    onBlur={(e) => {
                      if (!(collateralAmount === "")) {
                        setCollateralAmount(
                          formatNumber(parseFloat(e.target.value))
                        );
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (!(collateralAmount === "")) {
                          setCollateralAmount(
                            formatNumber(parseFloat(e.target.value))
                          );
                        }
                      }
                      switchFocus(e, "Next Review Date");
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <InputField
                    label={"Available Amount"}
                    disabled={true}
                    labelWidth={"37%"}
                    inputWidth={"60%"}
                    // required={true}
                  />
                </div>
              </div>
            </div>

            {/* right side  */}
            <div className="w-[25%]">
              <div className="mb-4">
                <InputField
                  type={"date"}
                  label={"Next Review Date"}
                  id={"Next Review Date"}
                  required={true}
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
                />
              </div>
              <div className="mb-4">
                <InputField
                  type={"date"}
                  label={"Expiry Date"}
                  id={"Expiry Date"}
                  labelWidth={"40%"}
                  required={true}
                  inputWidth={"50%"}
                  value={expiry}
                  onChange={(e) => {
                    setExpiry(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2 py-3 border-2 rounded mt-2">
          <InputField
            id={"Comment"}
            labelWidth={"15%"}
            inputWidth={"45%"}
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
          {/* <InputField
            id={"Rejection Reason"}
            labelWidth={"15%"}
            inputWidth={"35%"}
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
          /> */}
        </div>
        {/* <div className="mb-2">
       <DataTable
          columns={[
            "Collateral Number",
            "Collateral Type",
            "Collateral Amount",
            "Amount",
            "Comment",
            "Rejection Reason",
            "Status",
          ]}
        />
       </div>
        <DataTable
          columns={[
            "Collateral Number",
            "Collateral Type",
            "Collateral Amount",
            "Amount",
            "Comment",
            "Posted By",
          ]}
        /> */}
      </div>
    </div>
  );
}

export default CashScreen;
