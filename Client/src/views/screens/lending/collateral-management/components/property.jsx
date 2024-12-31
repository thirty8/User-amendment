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
export default function Property({
  customerNumber,
  data,
  formData,
  setFormData,
  handleSubmit,
  body,
}) {
  const [nextReview, setNextReview] = useState("");
  const [expiry, setExpiry] = useState("");
  const [valuation, setValuation] = useState("");
  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [accountNumber, setAccountNumber] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyTypeArr, setPropertyTypeArr] = useState([]);
  const [subPropertyType, setSubPropertyType] = useState("");
  const [subPropertyTypeArr, setSubPropertyTypeArr] = useState([]);
  const [ownershipName, setOwnershipName] = useState("");
  const [location, setLocation] = useState("");
  const [valuerName, setValuerName] = useState("");
  const [valuerContact, setValuerContact] = useState("");
  const [marketValue, setMarketValue] = useState("");
  const [forcedSaleValue, setForcedSaleValue] = useState("");
  const [amountConsidered, setAmountConsidered] = useState("");
  const [comment, setComment] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
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
  useEffect(() => {
    setFormData({
      accountNumber,
      propertyType,
      subPropertyType,
      ownershipName,
      location,
      valuerName,
      valuerContact,
      marketValue,
      forcedSaleValue,
      amountConsidered,
      nextReview,
      expiry,
      valuation,
      comment,
      rejectionReason,
    });
  }, [
    accountNumber,
    propertyType,
    subPropertyType,
    ownershipName,
    location,
    valuerName,
    valuerContact,
    marketValue,
    forcedSaleValue,
    amountConsidered,
    nextReview,
    expiry,
    valuation,
    comment,
    rejectionReason,
  ]);

  useEffect(() => {
    async function property() {
      await axios
        .post(
          API_SERVER + "/api/collateral-lovs",
          { key: "property" },
          { headers }
        )
        .then((res) => {
          console.log(res, "property");
          setPropertyTypeArr(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    property();
    subProperty();
  }, []);

  useEffect(() => {
    subProperty();
  }, [propertyType]);



  async function subProperty() {
    await axios
      .post(
        API_SERVER + "/api/collateral-lovs",
        { key: "sub property", short_descrp: propertyType },
        { headers }
      )
      .then((res) => {
        console.log(res, "sub property");
        setSubPropertyTypeArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    subPropertys();
  }
  console.log({ subPropertyTypeArr });
  console.log({ propertyTypeArr });

  
  let propertyArray = [];
  function property() {
    propertyTypeArr.map((property) => {
      propertyArray.push({
        value: property.actual_code,
        label: property.description,
      });
    });
  }
  property();

  let subPropertyArray = [];
  function subPropertys() {
    subPropertyTypeArr.map((subpropertyarr) => {
      subPropertyArray.push({
        value: subpropertyarr.actual_code,
        label: subpropertyarr.description,
      });
    });
  }
  subPropertys();

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
          Property Collateral
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
                  }}
                  value={accountNumber}
                  onKeyPress={(e) => {
                    switchFocus(e, "Property Type");
                  }}
                />
              </div>
              <div className="mb-4">
                <ListOfValue
                  label={"Property Type"}
                  id={"Property Type"}
                  labelWidth={"20%"}
                  inputWidth={"40%"}
                  required={true}
                  onChange={(value) => {
                    setPropertyType(value);
                  }}
                  data={propertyArray}
                  value={propertyType}
                />
              </div>
            </div>

            {/* right side  */}
            {/* <div>
              <ButtonComponent label={"Attach Document"} />
            </div> */}
          </div>
          <div className="flex mb-4 py-2 pr-3 ">
            {/* left side  */}
            <div className="w-[75%] rounded  md:mr-2 md:mb-0">
              <div className="mb-4">
                <ListOfValue
                  label={"Sub Property Type"}
                  id={"Sub Property Type"}
                  labelWidth={"20%"}
                  inputWidth={"40.6%"}
                  data={subPropertyArray}
                  onChange={(value) => {
                    setSubPropertyType(value);
                  }}
                  value={subPropertyType}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Ownership Name"}
                  id={"Ownership Name"}
                  labelWidth={"20%"}
                  inputWidth={"40.6%"}
                  required={true}
                  value={ownershipName}
                  onChange={(e) => {
                    setOwnershipName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Location"}
                  id={"Location"}
                  labelWidth={"20%"}
                  inputWidth={"40.6%"}
                  required={true}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Valuer Name"}
                  id={"Valuer Name"}
                  labelWidth={"20%"}
                  inputWidth={"40.6%"}
                  required={true}
                  value={valuerName}
                  onChange={(e) => {
                    setValuerName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Valuer Contact Number"}
                  id={"Valuer Contact Number"}
                  labelWidth={"20%"}
                  inputWidth={"26.5%"}
                  required={true}
                  placeholder={"e.g 0302678178"}
                  type="number"
                  value={valuerContact}
                  onChange={(e) => {
                    setValuerContact(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Market Value"}
                  id={"Market Value"}
                  labelWidth={"19.9%"}
                  inputWidth={"26.5%"}
                  type={"number"}
                  required={true}
                  value={marketValue}
                  onChange={(e) => {
                    setMarketValue(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (!(marketValue === "")) {
                      setMarketValue(formatNumber(parseFloat(e.target.value)));
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      if (!(marketValue === "")) {
                        setMarketValue(
                          formatNumber(parseFloat(e.target.value))
                        );
                      }
                    }
                    switchFocus(e, "Forced Sale Value");
                  }}
                />
              </div>
              <div className="mb-4 items-center md:flex w-[100%] space-x-6">
                <div className="w-1/2">
                  <InputField
                    label={"Forced Sale Value"}
                    id={"Forced Sale Value"}
                    labelWidth={"42%"}
                    inputWidth={"57%"}
                    required={true}
                    type="number"
                    value={forcedSaleValue}
                    onChange={(e) => {
                      setForcedSaleValue(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (!(forcedSaleValue === "")) {
                        setForcedSaleValue(
                          formatNumber(parseFloat(e.target.value))
                        );
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (!(forcedSaleValue === "")) {
                          setForcedSaleValue(
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
                    labelWidth={"36.5%"}
                    inputWidth={"60.5%"}
                    required={true}
                    type="number"
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
                  labelWidth={"20%"}
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
                  label={"Valuation Date"}
                  id={"Valuation Date"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  required
                  onChange={(e) => {
                    setValuation(e.target.value);
                    // console.log(e)
                  }}
                />
              </div>
              <div className="mb-4">
                <InputField
                  type={"date"}
                  label={"Next Review Date"}
                  id={"Next Review Date"}
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
