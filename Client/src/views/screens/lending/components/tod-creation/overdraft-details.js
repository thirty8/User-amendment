import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField";
import ListOfValue from "../fields/ListOfValue";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import AccountSummary from "../../../../../components/others/AccountSummary";
import Swal from "sweetalert2";
import TextAreaField from "../fields/TextArea";
import ButtonComponent from "../button/ButtonComponent";

const OverdraftDetails = ({
  data,
  onClickOfContinue,
  limit,
  proposedFacilityData,
}) => {
  // STATES
  const [formData, setFormData] = useState({
    tenor: "",
    requestedAmount: "",
    variance: 0,
    sourceOfPayment: "",
    comment: "",
    monthlySalary: "",
    todPurposes: [],
  });
  const [todAcccounts, setTodAccounts] = useState([]);
  const [todAcccountValue, setTodAccountValue] = useState("");
  const [currency, setCurrency] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [intRate, setIntRate] = useState(0);
  const [totalBestRate, setTotalBestRate] = useState();
  const [expiryDate, setExpiryDate] = useState("");
  const [utilizationDate, setUtilizationDate] = useState("");
  const [acctDetails, setAcctDetails] = useState({});
  const [purposesValue, setPurposesValue] = useState("");
  const [customerStatistics, setCustomerStatistics] = useState([]);
  const [limitNo, setLimitNo] = useState("");

  //HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // CONSTANTS
  const effectiveDateString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(effectiveDateString);

  const postingDate = userInfo?.postingDate?.split("T")[0];

  // DATE FORMATTER
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

  // EFFECTS
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/get-acct-numbers-tod", {
        headers: headers,
      })
      .then(function (response) {
        console.log(response.data);
        setTodAccounts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(API_SERVER + "/api/get-purposes-tod", {
        headers: headers,
      })
      .then(function (response) {
        console.log(response.data);
        setFormData({
          ...formData,
          todPurposes: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(API_SERVER + "/api/get-int-rate-tod", {
        headers: headers,
      })
      .then(function (response) {
        setIntRate(response.data[0]?.rate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // FUNCTIONS

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  const handleAccountChange = (value) => {
    console.log(value);

    // PRODUCT DESCRIPTION
    axios
      .post(
        API_SERVER + "/api/get-other-tod-details",
        {
          key: "get-prod-description",
          product_code: value?.split(" - ")[3],
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data[0]?.description, "prod desc");
        setProdDescription(response.data[0]?.description);
      })
      .catch((err) => console.log(err));

    // OTHER DETAILS
    axios
      .post(
        API_SERVER + "/api/get-other-tod-details",
        {
          key: "get-currency-description",
          currency_code: value?.split(" - ")[2],
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data[0]?.currency);
        setCurrency(response.data[0]?.currency);
      })
      .catch((err) => console.log(err));
  };

  // PASSING DATA AS A PROP
  useEffect(() => {
    function getData() {
      data(todAcccountValue);
    }

    getData();
  }, [todAcccountValue, data]);

  // LIMIT NO API
  const handleLimitNo = () => {
    axios
      .get(API_SERVER + "/api/get-limit-no-tod", { headers: headers })
      .then(function (response) {
        setLimitNo(response.data[0]?.limit_no);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    function getData() {
      limit(limitNo);
    }

    getData();
  }, [limit, limitNo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FOCUS ON NEX
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  // CALCULATION THE NEXT DATE FUNCTION
  const addDaysToDate = (givenDate, daysToAdd) => {
    const months = [
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

    const date = new Date(givenDate);
    date.setDate(date.getDate() + daysToAdd);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the new date as required (dd-mmm-yyyy)
    const formattedNewDate = `${day}-${month}-${year}`;

    setExpiryDate(formattedNewDate);

    return formattedNewDate;
  };

  // ON ENTER PRESS OF TENOR
  const handleTenorChange = () => {
    addDaysToDate(formatDate(postingDate), parseInt(formData.tenor));
  };

  // GET UTILIZATION DATE
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-next-review-date-tod",
        {
          expiry_date: expiryDate,
          start_date: formatDate(postingDate),
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setUtilizationDate(response.data[0]?.result);
      })
      .catch((err) => console.log(err));
  }, [expiryDate]);

  useEffect(() => {
    function getData() {
      proposedFacilityData({
        facilityType: "Temporal Overdraft",
        currency: currency,
        requestedAmt: formData?.requestedAmount,
        tenor: formData?.tenor,
        bestRate: totalBestRate,
      });
    }

    getData();
  }, [proposedFacilityData, formData, totalBestRate, currency]);

  return (
    <div style={{ marginBottom: "150px" }}>
      <div style={{ padding: "10px" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 0.7 }}>
            <div>
              <div
                style={{
                  padding: "5px",
                  border: "0.5px solid #d6d7d9",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  display: "flex",
                }}
              >
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Facility Limit Number"}
                    labelWidth={"41%"}
                    disabled
                    required
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Batch Number"}
                    labelWidth={"30%"}
                    disabled
                    required
                  />
                </div>
              </div>
            </div>
            <br />
            <div>
              <HeaderComponent title={"Account Details"} height={"35px"} />
            </div>
            <div
              style={{
                padding: "5px",
                border: "1.5px solid #d6d7d9",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div>
                <ListOfValue
                  label={"Account Number"}
                  labelWidth={"20%"}
                  inputWidth={"50%"}
                  required
                  lovdata={todAcccounts}
                  onChange={(value) => {
                    setTodAccountValue(value);
                    handleAccountChange(value);

                    if (acctDetails) {
                      setTimeout(() => {
                        const input = document.getElementById("tenor");
                        input?.focus();
                      }, 0);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (acctDetails) {
                        e.preventDefault();
                        const input = document.getElementById("tenor");
                        input?.focus();
                      }
                    }
                  }}
                  value={todAcccountValue}
                />
              </div>
              <div>
                <InputField
                  label={"Product Type"}
                  labelWidth={"20%"}
                  inputWidth={"40%"}
                  disabled
                  value={prodDescription}
                />
              </div>
              <div>
                <InputField
                  label={"Currency"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                  disabled
                  value={currency}
                />
              </div>
            </div>
            <br />
            <div>
              <HeaderComponent title={"Overdraft Details"} height={"35px"} />
            </div>
            <div
              style={{
                padding: "5px",
                border: "1.5px solid #d6d7d9",
                borderRadius: "5px",
                backgroundColor: "white",
                display: "flex",
              }}
            >
              <div style={{ flex: 0.65 }}>
                <div>
                  <InputField
                    label={"Tenor (In Days)"}
                    labelWidth={"30%"}
                    inputWidth={"50%"}
                    required
                    type={"number"}
                    name={"tenor"}
                    id={"tenor"}
                    textAlign={"right"}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (parseFloat(e.target.value) <= 0) {
                        Swal.fire(
                          "ERR - 02166: Tenor cannot be less than 1 day ",
                          "",
                          "error"
                        );
                        setExpiryDate("");
                        setUtilizationDate("");
                      }

                      if (e.target.value?.trim() === "") {
                        Swal.fire(
                          "INF - 02395: Limit tenor is required",
                          "",
                          "info"
                        );
                        setExpiryDate("");
                        setUtilizationDate("");
                      } else {
                        switchFocus(e, "requestedAmount");
                        handleTenorChange();
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (parseFloat(e.target.value) <= 0) {
                          Swal.fire(
                            "ERR - 02166: Tenor cannot be less than 1 day ",
                            "",
                            "error"
                          );
                          setExpiryDate("");
                          setUtilizationDate("");
                        }

                        if (e.target.value?.trim() === "") {
                          Swal.fire(
                            "INF - 02395: Limit tenor is required",
                            "",
                            "info"
                          );
                          setExpiryDate("");
                          setUtilizationDate("");
                        } else {
                          switchFocus(e, "requestedAmount");
                          handleTenorChange();
                        }
                      }
                    }}
                  />
                </div>
                <div>
                  <InputField
                    label={"Requested Amount"}
                    labelWidth={"30%"}
                    inputWidth={"30%"}
                    required
                    name={"requestedAmount"}
                    id={"requestedAmount"}
                    endTitle={currency}
                    onChange={handleChange}
                    textAlign={"right"}
                    value={formData?.requestedAmount}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        switchFocus(e, "variance");

                        if (parseFloat(e.target.value) <= 0) {
                          Swal.fire(
                            "ERR - 00019: Amount Must Be Greater Than Zero. Please Correct.",
                            "",
                            "error"
                          );
                        }
                        if (e.target.value?.trim() === "") {
                          Swal.fire(
                            "INF - 02396: OD/Lien amount is required",
                            "",
                            "info"
                          );
                        } else {
                          setFormData({
                            ...formData,
                            requestedAmount: formatNumber(
                              parseFloat(e.target.value)
                            ),
                          });
                        }
                      }
                    }}
                    onBlur={(e) => {
                      switchFocus(e, "variance");

                      if (parseFloat(e.target.value) <= 0) {
                        Swal.fire(
                          "ERR - 00019: Amount Must Be Greater Than Zero. Please Correct.",
                          "",
                          "error"
                        );
                      }
                      if (e.target.value?.trim() === "") {
                        Swal.fire(
                          "INF - 02396: OD/Lien amount is required",
                          "",
                          "info"
                        );
                      } else {
                        setFormData({
                          ...formData,
                          requestedAmount: formatNumber(
                            parseFloat(e.target.value)
                          ),
                        });
                      }
                    }}
                  />
                </div>
                <div style={{ display: "flex", marginTop: "-15px" }}>
                  <div style={{ flex: 0.5 }}>
                    <InputField
                      label={"Best Rate % P.A + Variance % P.A"}
                      labelWidth={"66%"}
                      inputWidth={"30%"}
                      disabled
                      required
                      value={intRate}
                      textAlign={"right"}
                    />
                  </div>
                  <div style={{ marginTop: "15px", marginRight: "4px" }}>+</div>
                  <div style={{ flex: 0.2 }}>
                    <InputField
                      inputWidth={"95%"}
                      id={"variance"}
                      name={"variance"}
                      onChange={handleChange}
                      value={formData?.variance}
                      type={"number"}
                      onKeyPress={(e) => {
                        if (
                          e.key === "Enter" &&
                          e.target.value?.trim() !== ""
                        ) {
                          setTotalBestRate(
                            parseFloat(intRate) + parseFloat(e.target.value)
                          );
                        } else if (
                          e.key === "Enter" &&
                          e.target.value?.trim() === ""
                        ) {
                          setTotalBestRate(parseFloat(intRate) + parseFloat(0));
                        }
                      }}
                      onBlur={(e) => {
                        setTotalBestRate(
                          parseFloat(intRate) + parseFloat(e.target.value)
                        );
                      }}
                    />
                  </div>
                  <div style={{ marginTop: "15px" }}>=</div>
                  <div style={{ flex: 0.2 }}>
                    <InputField
                      inputWidth={"95%"}
                      disabled
                      value={totalBestRate}
                      textAlign={"right"}
                    />
                  </div>
                </div>
              </div>
              <div style={{ flex: 0.35 }}>
                <div>
                  <InputField
                    label={"Effective Date"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                    disabled
                    value={formatDate(postingDate)}
                  />
                </div>
                <div>
                  <InputField
                    label={"Expiry Date"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                    disabled
                    value={expiryDate}
                  />
                </div>
                <div>
                  <InputField
                    label={"Utilization Date"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                    required
                    disabled
                    value={utilizationDate}
                  />
                </div>
              </div>
            </div>
            <br />
            <div>
              <HeaderComponent title={"Other Details"} height={"35px"} />
            </div>
            <div
              style={{
                padding: "5px",
                border: "1.5px solid #d6d7d9",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div>
                <ListOfValue
                  label={"Purpose Code"}
                  labelWidth={"20%"}
                  inputWidth={"50%"}
                  required
                  lovdata={formData?.todPurposes}
                  onChange={(value) => {
                    setPurposesValue(value);
                  }}
                  value={purposesValue}
                />
              </div>
              <div>
                <InputField
                  label={"Source of Payment"}
                  labelWidth={"20%"}
                  inputWidth={"60%"}
                  required
                  onChange={handleChange}
                  name={"sourceOfPayment"}
                />
              </div>
              <div>
                <TextAreaField
                  label={"Comment"}
                  labelWidth={"21%"}
                  inputWidth={"20%"}
                  onChange={handleChange}
                  name={"comment"}
                />
              </div>
              <div>
                <InputField
                  label={"Monthly Income (Salary)"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                  name={"monthlySalary"}
                />
              </div>
              <div>
                <InputField
                  label={"TOD Charges"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                  disabled
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "15px",
              }}
            >
              <div></div>
              <div>
                <ButtonComponent
                  label={"Continue"}
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  onClick={() => {
                    onClickOfContinue();
                    handleLimitNo();
                  }}
                  // onClick={() => {
                  //   if (
                  //     formData.sourceOfPayment?.trim() === "" ||
                  //     purposesValue === "" ||
                  //     formData?.variance?.trim() === "" ||
                  //     formData?.requestedAmount?.trim() === "" ||
                  //     formData?.tenor?.trim() === "" ||
                  //     todAcccountValue?.trim() === ""
                  //   ) {
                  //     Swal.fire(
                  //       "Required",
                  //       "Fill all fields marked with asterisk before proceeding",
                  //       "info"
                  //     );
                  //   } else {
                  //     onClickOfContinue();
                  //     handleLimitNo();
                  //   }
                  // }}
                />
              </div>
            </div>
          </div>
          <div style={{ flex: 0.3, zoom: 1 }}>
            <div>
              <AccountSummary
                accountNumber={todAcccountValue?.split(" - ")[0]}
                setAccountDetails={setAcctDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdraftDetails;
