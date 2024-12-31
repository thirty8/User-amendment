import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import HeaderComponent from "../components/header/HeaderComponent";
import { Checkbox } from "@mantine/core";
import TextAreaField from "../components/fields/TextArea";
import { MdMoneyOff } from "react-icons/md";
import { MDBIcon } from "mdb-react-ui-kit";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import CustomTable from "../components/data-table/CustomTable";
import axios from "axios";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../config/constant";

const LoanCancellation = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [cancelLov, setCancelLov] = useState([]);
  const [cancelAcctLov, setCancelAcctLov] = useState([]);
  const [customerNumber, setCustomerNumber] = useState("");
  const [cancelAcct, setCancelAcct] = useState("");
  const [facilityNo, setFacilityNo] = useState("");
  const [amtClass, setAmtClass] = useState("");
  const [rate, setRate] = useState("");
  const [effDate, setEffDate] = useState("");
  const [exDate, setExDate] = useState("");
  const [resAmt, setResAmt] = useState("");
  const [amtGranted, setAmtGranted] = useState("");
  const [loanProd, setLoanProd] = useState("");
  const [prinBal, setPrinBal] = useState("");
  const [intBal, setIntBal] = useState("");
  const [penBal, setPenBal] = useState("");
  const [prinArr, setPrinArr] = useState("");
  const [intArr, setIntArr] = useState("");
  const [payBal, setPayBal] = useState("");
  const [payArr, setPayArr] = useState("");
  const [repayAcct, setRepayAcct] = useState("");
  const [descAcct, setDescAcct] = useState("");
  const [acctBal, setAcctBal] = useState("");
  const [intAccrued, setIntAccrued] = useState("");
  const [penAccrued, setPenAccrued] = useState("");

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const handleClear = () => {
    setCustomerNumber("");
    setFacilityNo("");
    setAmtClass("");
    setRate("");
    setLoanProd("");
    setEffDate("");
    setExDate("");
    setResAmt("");
    setAmtGranted("");
    setPrinBal("");
    setPrinArr("");
    setIntBal("");
    setIntArr("");
    setPenBal("");
    setPayBal("");
    setPayArr("");
    setDescAcct("");
    setRepayAcct("");
    setAcctBal("");
    setIntAccrued("");
    setPenAccrued("");
    setCancelAcct("");
    setCancelAcctLov([]);
  };

  const handleValidate = () => {
    // setCustomerNumber("");
    setFacilityNo("");
    setAmtClass("");
    setRate("");
    setLoanProd("");
    setEffDate("");
    setExDate("");
    setResAmt("");
    setAmtGranted("");
    setPrinBal("");
    setPrinArr("");
    setIntBal("");
    setIntArr("");
    setPenBal("");
    setPayBal("");
    setPayArr("");
    setDescAcct("");
    setRepayAcct("");
    setAcctBal("");
    setIntAccrued("");
    setPenAccrued("");
    setCancelAcct("");
    // setCancelAcctLov([]);
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
      let response = await axios.post(
        API_SERVER + "/api/get-loan-cancel-customers",
        { branchCode: JSON.parse(localStorage.getItem("userInfo")).branchCode },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setCancelLov(response.data);
    }
    getCustomers();
  }, []);

  return (
    <div style={{ zoom: "0.9" }}>
      <div style={{ padding: "10px" }}>
        <ActionButtons
          displayFetch={"none"}
          onNewClick={handleClear}
          onExitClick={handleExitClick}
          displayDelete={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayView={"none"}
          displayRefresh={"none"}
          displayHelp={"none"}
          displayReject={"none"}
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
                lovdata={cancelLov}
                value={customerNumber}
                onChange={(value) => {
                  setCustomerNumber(value);
                  handleValidate();
                  async function getPrin() {
                    let response = await axios.post(
                      API_SERVER + "/api/get-cancel-acct",
                      {
                        cusNo: value,
                        branchCode: JSON.parse(localStorage.getItem("userInfo"))
                          .branchCode,
                      },
                      {
                        headers,
                      }
                    );
                    // response = await response();
                    //  console.log(response);
                    setCancelAcctLov(response.data);
                  }
                  getPrin();
                }}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Facility Number"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={facilityNo}
                textAlign={"right"}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Account Class"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={amtClass}
                textAlign={"center"}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "-15px" }}>
            <div style={{ flex: "0.4" }}>
              <ListOfValue
                label={"Principal Account"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                value={cancelAcct}
                onChange={(value) => {
                  setCancelAcct(value);
                  axios
                    .post(
                      API_SERVER + "/api/get-cancel-acct-details",
                      {
                        prin_acct: value.split("-")[0].trim(),
                      },
                      { headers: headers }
                    )
                    .then(function (response) {
                      axios
                        .post(
                          API_SERVER + "/api/get-accrued-bal",
                          {
                            acct_link:
                              response.data[0]?.maintenance_fee_account,
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setAcctBal(
                            formatNumber(
                              parseFloat(response.data[0]?.post_av_bal)
                            )
                          );
                          setIntAccrued(
                            formatNumber(parseFloat(response.data[0]?.acr_chg))
                          );
                          setPenAccrued(
                            formatNumber(
                              parseFloat(response.data[0]?.acr_penal)
                            )
                          );
                        });
                      setFacilityNo(response.data[0]?.facility_no);
                      setRepayAcct(response.data[0]?.maintenance_fee_account);
                      setDescAcct(response.data[0]?.acct_desc);
                      setAmtClass(response.data[0]?.class_desc);
                      setLoanProd(response.data[0]?.description);
                      setResAmt(
                        formatNumber(
                          parseFloat(response.data[0]?.facility_amount)
                        )
                      );
                      setAmtGranted(
                        formatNumber(
                          parseFloat(response.data[0]?.facility_amount)
                        )
                      );
                      setRate(
                        parseFloat(response.data[0]?.interest_rate).toFixed(2)
                      );
                      setExDate(formatDate(response.data[0]?.last_repay_date));
                      setEffDate(formatDate(response.data[0]?.effective_date));
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
                      setPenBal(
                        formatNumber(parseFloat(response.data[0]?.cot_amount))
                      );
                      axios
                        .post(
                          API_SERVER + "/api/get-prin-arr",
                          { facNo: response.data[0]?.facility_no },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setPrinArr(
                            formatNumber(parseFloat(response.data[0]?.prin_arr))
                          );
                        });
                      axios
                        .post(
                          API_SERVER + "/api/get-int-arr",
                          { acct_link: response.data[0]?.principal_account },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setIntArr(
                            formatNumber(
                              parseFloat(response.data[0]?.arrears_int)
                            )
                          );
                        });
                      axios
                        .post(
                          API_SERVER + "/api/get-pay-bal",
                          { facNo: response.data[0]?.facility_no },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setPayBal(
                            formatNumber(parseFloat(response.data[0]?.pay_bal))
                          );
                        });
                      axios
                        .post(
                          API_SERVER + "/api/get-pay-arr",
                          {
                            facNo: response.data[0]?.facility_no,
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setPayArr(
                            formatNumber(parseFloat(response.data[0]?.pay_arr))
                          );
                        });
                    })
                    .catch((err) => Swal.fire(err));
                }}
                lovdata={cancelAcctLov}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Rate"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={rate}
                textAlign={"right"}
              />
            </div>
            <div style={{ flex: "0.3" }}>
              <InputField
                label={"Loan Product"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                value={loanProd}
                textAlign={"center"}
              />
            </div>
            {/* <div
              style={{
                flex: "0.3",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div></div>
              <div style={{ marginRight: "50px", marginTop: "10px" }}>
                <ButtonComponent
                  label={"Loan Enquiry"}
                  background={"#c4549c"}
                  buttonHeight={"35px"}
                  buttonWidth={"120px"}
                  buttonColor={"white"}
                />
              </div>
            </div> */}
          </div>
          <div style={{ display: "flex", marginTop: "-15px" }}>
            <div style={{ flex: "0.25" }}>
              <InputField
                label={"Effective Date"}
                labelWidth={"48%"}
                inputWidth={"40%"}
                disabled
                value={effDate}
                textAlign={"center"}
              />
            </div>
            <div style={{ flex: "0.2" }}>
              <InputField
                label={"Expiry Date"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                disabled
                value={exDate}
                textAlign={"center"}
              />
            </div>
            <div style={{ flex: "0.25" }}>
              <InputField
                label={"Reschedule Amount"}
                labelWidth={"50%"}
                inputWidth={"38%"}
                disabled
                value={resAmt}
                textAlign={"right"}
              />
            </div>
            <div style={{ flex: "0.25" }}>
              <InputField
                label={"Amount Granted"}
                labelWidth={"37%"}
                inputWidth={"40%"}
                disabled
                value={amtGranted}
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
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "1.5px solid #d6d7d9",
            }}
          >
            {/* <div style={{ borderBottom: "1px solid" }}>
              <h6 style={{ margin: "10px" }}>Principal Account Details</h6>
            </div> */}
            <div>
              <HeaderComponent title={"Principal Account Details"} />
            </div>
            <div style={{ marginTop: "10px", display: "flex" }}>
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
                  value={prinBal === "NaN" ? "" : prinBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={prinArr === "NaN" ? "" : prinArr}
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
                  value={intBal === "NaN" ? "" : intBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField inputWidth={"100%"} disabled />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField inputWidth={"90%"} disabled />
              </div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Penalty"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={penBal === "NaN" ? "" : penBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={penBal === "NaN" ? "" : penBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField inputWidth={"90%"} disabled />
              </div>
            </div>
            <div style={{ marginTop: "-20px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Arr Interest"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={intArr === "NaN" ? "" : intArr}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={intArr === "NaN" ? "" : intArr}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField inputWidth={"90%"} disabled />
              </div>
            </div>
            <div style={{ marginTop: "5px", display: "flex" }}>
              <div style={{ flex: "0.35" }}></div>
              <div style={{ flex: "0.25" }}>
                <h6>Interest </h6>
              </div>
              <div style={{ flex: "0.25" }}>
                <h6>Principal</h6>
              </div>
              <div style={{ flex: "0.25" }}>
                <h6>Penalty</h6>
              </div>
            </div>
            <div style={{ marginTop: "-10px", display: "flex" }}>
              <div style={{ flex: "0.48" }}>
                <InputField
                  label={"Payments"}
                  labelWidth={"58%"}
                  inputWidth={"38%"}
                  disabled
                  value={payBal === "NaN" ? "" : payBal}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.22" }}>
                <InputField
                  inputWidth={"100%"}
                  disabled
                  value={payArr === "NaN" ? "" : payArr}
                  textAlign={"right"}
                />
              </div>
              <div style={{ flex: "0.25" }}>
                <InputField
                  inputWidth={"90%"}
                  disabled
                  value={penBal === "NaN" ? "" : penBal}
                  textAlign={"right"}
                />
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div>
                <HeaderComponent title={"Processing Fees and Charges"} />
              </div>
              {/* <DataTable columns={["Charges", "%", "Fee Amount"]} /> */}
              <CustomTable headers={["Charges", "%", "Fee Amount"]} />
            </div>
          </div>
          <div
            style={{
              flex: "0.5",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "1.5px solid #d6d7d9",
            }}
          >
            {/* <div style={{ borderBottom: "1px solid" }}>
              <h6 style={{ margin: "10px" }}>Principal Account Details</h6>
            </div> */}
            <div>
              <HeaderComponent title={"Repayment Account Details"} />
            </div>
            {/* <br></br> */}
            {/* <br></br> */}
            {/* <br></br>
            <br></br> */}
            <div style={{ display: "flex", marginTop: "5px" }}>
              <div style={{ flex: "0.55" }}>
                <InputField
                  label={"Repayment Account"}
                  inputWidth={"70%"}
                  labelWidth={"80%"}
                  disabled
                  value={repayAcct}
                />
              </div>
              <div style={{ flex: "0.45", marginLeft: "-30px" }}>
                <InputField inputWidth={"100%"} disabled value={descAcct} />
              </div>
            </div>
            <div style={{ marginTop: "-20px" }}>
              <InputField
                label={"Repayment Account Balance"}
                labelWidth={"27.7%"}
                inputWidth={"25%"}
                disabled
                value={acctBal === "NaN" ? "" : acctBal}
                textAlign={"right"}
              />
            </div>
            <div style={{ marginTop: "-5px" }}>
              <InputField
                label={"Interest Accrued"}
                labelWidth={"27.7%"}
                inputWidth={"25%"}
                disabled
                value={intAccrued === "NaN" ? "" : intAccrued}
                textAlign={"right"}
              />
            </div>
            <div style={{ marginTop: "-5px" }}>
              <InputField
                label={"Penalty Accrued"}
                labelWidth={"27.7%"}
                inputWidth={"25%"}
                disabled
                value={penAccrued === "NaN" ? "" : penAccrued}
                textAlign={"right"}
              />
            </div>
            <div style={{ display: "flex", marginTop: "-20px" }}>
              <div style={{ flex: "0.55" }}>
                <InputField
                  label={"Disbursement Account"}
                  inputWidth={"70%"}
                  labelWidth={"80%"}
                  disabled
                  value={repayAcct}
                />
              </div>
              <div style={{ flex: "0.45", marginLeft: "-30px" }}>
                <InputField inputWidth={"100%"} disabled value={descAcct} />
              </div>
            </div>
            <br></br>
            <div style={{ margin: "15px", marginTop: "11px" }}>
              <Checkbox
                label="Tick To Reverse Processing Fees"
                color="green"
                size="sm"
              />
            </div>
            <br></br>
            <div>
              <HeaderComponent title={"Reasons"} />
              <TextAreaField rows={5} cols={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCancellation;
