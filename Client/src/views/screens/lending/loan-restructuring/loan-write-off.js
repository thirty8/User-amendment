import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import HeaderComponent from "../components/header/HeaderComponent";
import TextAreaField from "../components/fields/TextArea";
import SelectField from "../components/fields/SelectField";
import { AiFillMoneyCollect } from "react-icons/ai";
import { MDBIcon } from "mdb-react-ui-kit";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import CustomTable from "../components/data-table/CustomTable";
import axios from "axios";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../config/constant";
import DocumentViewing from "../../../../components/DocumentViewing";
import { Modal, Textarea } from "@mantine/core";

const LoanWriteOff = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const [customerLov, setCustomerLov] = useState([]);
  const [customer, setCustomer] = useState("");
  const [prinLov, setPrinLov] = useState([]);
  const [prin, setPrin] = useState("");
  const [odLov, setOdLov] = useState([]);
  const [od, setOd] = useState("");
  const [facNo, setFacNo] = useState("");
  const [rate, setRate] = useState("");
  const [tenor, setTenor] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [effDate, setEffDate] = useState("");
  const [exDate, setExDate] = useState("");
  const [amt, setAmt] = useState("");
  const [repayAcctOutstanding, setRepayAcctOutstanding] = useState("");
  const [prinBal, setPrinBal] = useState("");
  const [prinArr, setPrinArr] = useState("");
  const [intBal, setIntBal] = useState("");
  const [intArr, setIntArr] = useState("");
  const [intSus, setIntSus] = useState("");
  const [penBal, setPenBal] = useState("");
  const [penArr, setPenArr] = useState("");
  const [penSus, setPenSus] = useState("");
  const [arrBal, setArrBal] = useState("");
  const [arrArr, setArrArr] = useState("");
  const [arrSus, setArrSus] = useState("");
  const [totBal, setTotBal] = useState("");
  const [totArr, setTotArr] = useState("");
  const [totSus, setTotSus] = useState("");
  const [repayAcct, setRepayAcct] = useState("");
  const [acctBal, setAcctBal] = useState("");
  const [accrInt, setAccrInt] = useState("");
  const [accrPen, setAccrPen] = useState("");
  const [acctStatus, setAcctStatus] = useState("");
  const [recoveryOff, setRecoveryOff] = useState("");
  const [recoveryOffLov, setRecoveryOffLov] = useState([]);
  const [reason, setReason] = useState("");
  const [count, setCount] = useState("");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const saveStuff = () => {
    if (reason?.trim() === "") {
      Swal.fire({
        icon: "info",
        title: "INF - 01564: Reason for writeoff is required.",
      }).then((result) => {});
    } else {
      Swal.fire({
        icon: "info",
        title: "Procedure Pending...",
      }).then((result) => {});
    }
  };

  const handleClear = () => {
    setFacNo("");
    setPrin("");
    setRate("");
    setTenor("");
    setEffDate("");
    setExDate("");
    setRepayAcctOutstanding("");
    setAmt("");
    setAcctStatus("");
    setPrinBal("");
    setPrinArr("");
    setIntBal("");
    setIntArr("");
    setIntSus("");
    setArrBal("");
    setArrArr("");
    setArrSus("");
    setPenBal("");
    setPenArr("");
    setPenSus("");
    setTotBal("");
    setTotArr("");
    setTotSus("");
    setRepayAcct("");
    setAcctBal("");
    setAccrInt("");
    setAccrPen("");
    setReason("");
    setRecoveryOff("");
  };

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };

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

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  useEffect(() => {
    async function getCustomers() {
      let response = await axios.get(
        API_SERVER + "/api/get-loan-writeoff-customers",
        {
          headers,
        }
      );
      setCustomerLov(response.data);
    }

    async function getOfficers() {
      let response = await axios.get(API_SERVER + "/api/get-rec-officer", {
        headers,
      });
      setRecoveryOffLov(response.data);
    }

    getOfficers();
    getCustomers();
  }, []);

  useEffect(() => {
    let sum1 = 0;
    sum1 +=
      parseFloat(prinBal ? prinBal?.replaceAll(",", "") : 0) +
      parseFloat(intBal ? intBal?.replaceAll(",", "") : 0) +
      parseFloat(penBal ? penBal?.replaceAll(",", "") : 0) +
      parseFloat(arrBal ? arrBal?.replaceAll(",", "") : 0);
    setTotBal(formatNumber(sum1));
  }, [arrBal, intBal, prinBal, penBal]);

  useEffect(() => {
    let sum2 = 0;
    sum2 +=
      parseFloat(prinArr ? prinArr?.replaceAll(",", "") : 0) +
      parseFloat(intArr ? intArr?.replaceAll(",", "") : 0) +
      parseFloat(penArr ? penArr?.replaceAll(",", "") : 0) +
      parseFloat(arrArr ? arrArr?.replaceAll(",", "") : 0);
    setTotArr(formatNumber(sum2));
  }, [arrBal, intBal, prinBal, penBal]);

  useEffect(() => {
    let sum3 = 0;
    sum3 +=
      parseFloat(intSus ? intSus?.replaceAll(",", "") : 0) +
      parseFloat(penSus ? penSus?.replaceAll(",", "") : 0) +
      parseFloat(arrSus ? arrSus?.replaceAll(",", "") : 0);
    setTotSus(formatNumber(sum3));
  }, [arrBal, intBal, prinBal, penBal]);

  return (
    <div style={{ zoom: "0.9" }}>
      <div style={{ padding: "10px" }}>
        <ActionButtons
          displayFetch={"none"}
          onOkClick={saveStuff}
          onExitClick={handleExitClick}
        />
        <br />
        <div
          style={{
            padding: "5px",
            border: "2.5px solid #d6d7d9",
            // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ flex: "0.4" }}>
              <ListOfValue
                label={"Customer Number"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                value={customer}
                onChange={(value) => {
                  setCustomer(value);
                  handleClear();
                  axios
                    .post(
                      API_SERVER + "/api/get-customer-count",
                      {
                        customer_number: value,
                      },
                      {
                        headers,
                      }
                    )
                    .then(function (response) {
                      if (response.data > 0) {
                        axios
                          .post(
                            API_SERVER + "/api/get-customer-accounts",
                            {
                              customer_number: value,
                            },
                            {
                              headers,
                            }
                          )
                          .then(function (response) {
                            setPrinLov(response.data);
                          });
                      } else {
                        axios
                          .post(
                            API_SERVER + "/api/get-customer-od-accounts",
                            {
                              customer_number: value,
                            },
                            {
                              headers,
                            }
                          )
                          .then(function (response) {
                            setPrinLov(response.data);
                          });
                      }
                      setCount(response.data);
                    });
                }}
                lovdata={customerLov}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Facility Number"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={facNo}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Batch Number"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={batchNo}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "-15px" }}>
            <div style={{ flex: "0.4" }}>
              <ListOfValue
                label={"Principal Account"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                value={prin}
                onChange={(value) => {
                  setPrin(value);
                  axios
                    .post(
                      API_SERVER + "/api/get-writeoff-acct-details",
                      {
                        prin_acct: value.trim(),
                      },
                      {
                        headers,
                      }
                    )
                    .then(function (response) {
                      setFacNo(response.data[0]?.facility_no);
                      setRate(
                        formatNumber(
                          parseFloat(response.data[0]?.interest_rate)
                        )
                      );
                      setTenor(response.data[0]?.repnt_period_months);
                      setEffDate(formatDate(response.data[0]?.effective_date));
                      setExDate(formatDate(response.data[0]?.last_repay_date));
                      setAmt(
                        formatNumber(
                          parseFloat(response.data[0]?.facility_amount)
                        )
                      );
                      setPrinBal(
                        formatNumber(
                          parseFloat(response.data[0]?.shadow_balance_today)
                        )
                      );
                      setIntBal(
                        formatNumber(
                          parseFloat(response.data[0]?.od_interest_amount)
                        )
                      );
                      setIntSus(
                        formatNumber(
                          parseFloat(response.data[0]?.od_intin_susp)
                        )
                      );
                      setPenBal(
                        formatNumber(parseFloat(response.data[0]?.cot_amount))
                      );
                      setPenSus(
                        formatNumber(
                          parseFloat(response.data[0]?.pen_intin_susp)
                        )
                      );
                      setPenArr(
                        formatNumber(parseFloat(response.data[0]?.cot_amount))
                      );
                      setAmt(
                        formatNumber(
                          parseFloat(response.data[0]?.facility_amount)
                        )
                      );
                      setAcctStatus(response.data[0]?.acct_status);
                      setRepayAcct(response.data[0]?.maintenance_fee_account);
                      setFacNo(response.data[0]?.facility_no);
                      setFacNo(response.data[0]?.facility_no);
                      setFacNo(response.data[0]?.facility_no);
                      setFacNo(response.data[0]?.facility_no);
                      setFacNo(response.data[0]?.facility_no);
                      setFacNo(response.data[0]?.facility_no);
                      setFacNo(response.data[0]?.facility_no);
                      axios
                        .post(
                          API_SERVER + "/api/get-prin-arr",
                          {
                            fac_no: response.data[0]?.facility_no,
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setPrinArr(
                            formatNumber(parseFloat(response.data[0]?.prin_arr))
                          );
                          setIntArr(
                            formatNumber(parseFloat(response.data[0]?.int_arr))
                          );
                        });

                      axios
                        .post(
                          API_SERVER + "/api/get-acct-balances",
                          {
                            prin_acct_rev:
                              response.data[0]?.maintenance_fee_account,
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setAcctBal(
                            formatNumber(
                              parseFloat(response.data[0]?.syspost_av_bal)
                            )
                          );
                          setAccrInt(
                            response.data[0]?.acr_chg === "null"
                              ? formatNumber(0)
                              : formatNumber(
                                  parseFloat(response.data[0]?.acr_chg)
                                )
                          );
                          setAccrPen(
                            response.data[0]?.acr_penal === "null"
                              ? formatNumber(0)
                              : formatNumber(
                                  parseFloat(response.data[0]?.acr_penal)
                                )
                          );
                        });

                      axios
                        .post(
                          API_SERVER + "/api/get-repayment-count",
                          {
                            fac_no: response.data[0]?.facility_no,
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setRepayAcctOutstanding(response.data[0]?.count);
                        });

                      axios
                        .post(
                          API_SERVER + "/api/get-arr-bal",
                          {
                            acct_link: response.data[0]?.principal_account,
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setArrBal(
                            formatNumber(
                              parseFloat(response.data[0]?.arrears_int)
                            )
                          );
                          setArrArr(
                            formatNumber(
                              parseFloat(response.data[0]?.arrears_int)
                            )
                          );
                          setArrSus(
                            formatNumber(
                              parseFloat(response.data[0]?.arrears_intin_susp)
                            )
                          );
                        });
                    });
                }}
                lovdata={prinLov}
              />
            </div>
            <div style={{ flex: "0.15" }}>
              <InputField
                label={"Rate"}
                labelWidth={"70%"}
                inputWidth={"30%"}
                disabled
                value={rate}
                textAlign={"right"}
              />
            </div>
            <div style={{ flex: "0.25" }}>
              <div>
                <InputField
                  label={"Tenor"}
                  labelWidth={"25%"}
                  inputWidth={"20%"}
                  disabled
                  value={tenor}
                />
              </div>
            </div>
            {/* <div
              style={{
                flex: "0.2",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div></div>
              <div style={{ marginRight: "30px", marginTop: "10px" }}>
                <ButtonComponent
                  label={"Loan Enquiry"}
                  background={"#c4549c"}
                  buttonHeight={"40px"}
                  buttonWidth={"160px"}
                  buttonColor={"white"}
                />
              </div>
            </div> */}
          </div>
          <div
            style={{
              display: "flex",
              // border: "1px solid #b8babb",
              // borderRadius: "5px",
              // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <div style={{ flex: "0.25" }}>
              <InputField
                label={"Effective Date"}
                labelWidth={"48%"}
                inputWidth={"40%"}
                disabled
                value={effDate}
              />
            </div>
            <div style={{ flex: "0.2" }}>
              <InputField
                label={"Expiry Date"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={exDate}
              />
            </div>
            <div style={{ flex: "0.25" }}>
              <InputField
                label={"Amount Granted"}
                labelWidth={"50%"}
                inputWidth={"39%"}
                disabled
                value={amt}
                textAlign={"right"}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Repayment Count Outstanding"}
                labelWidth={"65%"}
                inputWidth={"25%"}
                disabled
                value={repayAcctOutstanding}
                textAlign={"right"}
              />
            </div>
          </div>
        </div>
        <br></br>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              flex: "0.5",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "2.5px solid #d6d7d9",
            }}
          >
            <div style={{ marginTop: "", display: "flex" }}>
              <div style={{ flex: "0.35" }}></div>
              <div style={{ flex: "0.25" }}>
                <h6>Balance</h6>
              </div>
              <div style={{ flex: "0.25" }}>
                <h6>Arrears</h6>
              </div>
              <div style={{ flex: "0.25" }}>
                <h6>Suspense</h6>
              </div>
            </div>
            <div style={{ marginTop: "-10px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Principal"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={prinBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={prinArr}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                {/* <InputField inputWidth={"90%"} disabled/> */}
              </div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Interest"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={intBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={intArr}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={intSus}
                  textAlign={"right"}
                />
              </div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Penalty"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={penBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={penArr}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={penSus}
                  textAlign={"right"}
                />
              </div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Arr Interest"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={arrBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={arrArr}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={arrSus}
                  textAlign={"right"}
                />
              </div>
            </div>
            <div style={{ marginTop: "-25px" }}>
              <br />
              <div style={{ marginTop: "", display: "flex" }}>
                <div style={{ flex: "0.48" }}>
                  <InputField
                    label={"Total"}
                    labelWidth={"58%"}
                    inputWidth={"38%"}
                    disabled
                    value={totBal}
                    textAlign={"right"}
                  />
                </div>
                <div style={{ flex: "0.22" }}>
                  <InputField
                    inputWidth={"100%"}
                    disabled
                    value={totArr}
                    textAlign={"right"}
                    inputColor={"red"}
                  />
                </div>
                <div style={{ flex: "0.25" }}>
                  <InputField
                    inputWidth={"90%"}
                    disabled
                    value={totSus}
                    textAlign={"right"}
                  />
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #c7c7cb",
                  borderRadius: "5px",
                  padding: "10px",
                  // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  backgroundColor: "white",
                }}
              >
                <div style={{ borderBottom: "1px solid" }}>
                  <h6 style={{ margin: "10px" }}>Repayment Account Details</h6>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <div>
                    <InputField
                      label={"Repayment Account"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={repayAcct}
                      // textAlign={"right"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Account Balance"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={acctBal}
                      textAlign={"right"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Accrued Interest"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={accrInt}
                      textAlign={"right"}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Accrued Penal"}
                      labelWidth={"25%"}
                      inputWidth={"42%"}
                      disabled
                      value={accrPen}
                      textAlign={"right"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: "0.5",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "2.5px solid #d6d7d9",
            }}
          >
            <div
              style={{
                // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "white",
                border: "1.5px solid #d6d7d9",
              }}
            >
              {/* <div style={{ borderBottom: "1px solid" }}>
                <h4 style={{ margin: "10px" }}>Repayment Account Details</h4>
              </div> */}
              <div>
                <HeaderComponent
                  title={"Repayment Account Details"}
                  background={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <InputField
                  label={"Account Status"}
                  labelWidth={"35%"}
                  inputWidth={"35%"}
                  value={acctStatus}
                  disabled
                />
              </div>
              <div style={{ marginTop: "15px", color: "red" }}>
                <ListOfValue
                  label={"Recovery Officer / Collector"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  value={recoveryOff}
                  onChange={(value) => {
                    setRecoveryOff(value);
                  }}
                  lovdata={recoveryOffLov}
                  required
                />
              </div>
            </div>
            <br />
            <div
              style={{
                textAlign: "center",
                placeItems: "center",
                display: "grid",
              }}
            >
              <div
                style={{
                  // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "5px",
                  padding: "10px",
                  width: "50%",
                  border: "0.5px solid #d6d7d9",
                  backgroundColor: "white",
                  display: "flex",
                  gap: "20px",
                }}
              >
                <div>
                  <InputField
                    inputWidth={"100%"}
                    textAlign={"center"}
                    margin={"0px"}
                  />
                </div>
                <div style={{ marginTop: "" }}>
                  <ButtonComponent
                    label={"View Document"}
                    buttonHeight={"27px"}
                    buttonBackgroundColor={"black"}
                    buttonWidth={"150px"}
                    buttonColor={"white"}
                    onClick={() => {
                      setSweetAlertConfirmed(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <br />
            <div>
              <div>
                <HeaderComponent title={"Write-Off Reason"} />
              </div>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "5px",
                  padding: "20px",
                  border: "1px solid #b8babb",
                  backgroundColor: "white",
                }}
              >
                <TextAreaField
                  label={"Reason"}
                  labelWidth={"20%"}
                  cols={70}
                  rows={5}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {sweetAlertConfirmed && (
        <Modal
          className="p-0 m-0"
          opened={sweetAlertConfirmed}
          size="75%"
          style={{ margin: 0, padding: 0 }}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => setSweetAlertConfirmed(false)}
        >
          <div className="flex items-center justify-between mx-2 p-2">
            <div className="font-extrabold text-black">View Document</div>
            <div
              className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
              onClick={() => setSweetAlertConfirmed(false)}
            >
              x
            </div>
          </div>
          <DocumentViewing documentID={""} />
        </Modal>
      )}
    </div>
  );
};

export default LoanWriteOff;
