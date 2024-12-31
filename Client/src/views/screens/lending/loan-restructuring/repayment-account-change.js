import React, { useState, useEffect, useRef } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import SelectField from "../components/fields/SelectField";
import TextAreaField from "../components/fields/TextArea";
import HeaderComponent from "../components/header/HeaderComponent";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../config/constant";

const RepaymentAccountChange = () => {
  const [customerLov, setCustomerLov] = useState([]);
  const [prinLov, setPrinLov] = useState([]);
  const [customerNumber, setCustomerNumber] = useState("");
  const [prinAcct, setPrinAcct] = useState("");
  const [facilityNumber, setFacilityNumber] = useState("");
  const [loanProduct, setLoanProduct] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [repayAcct, setRepayAcct] = useState("");
  const [repayAcctDesc, setRepayAcctDesc] = useState("");
  const [effDate, setEffDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [amt, setAmt] = useState("");
  const [bal, setBal] = useState("");
  const [newRepayAcct, setNewRepayAcct] = useState("");
  const [newRepayAcctDesc, setNewRepayAcctDesc] = useState("");
  const [newRepayAcctLov, setNewRepayAcctLov] = useState([]);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const handleClear = () => {
    setCustomerNumber("");
    setPrinAcct("");
    setFacilityNumber("");
    setLoanProduct("");
    setEffDate("");
    setExpiryDate("");
    setAmt("");
    setBal("");
    setCurrency("");
    setRepayAcct("");
    setNewRepayAcct("");
    setNewRepayAcctDesc("");
    setPrinLov([]);
  };

  const handleValidate = () => {
    // setCustomerNumber("");
    setPrinAcct("");
    setFacilityNumber("");
    setLoanProduct("");
    setEffDate("");
    setExpiryDate("");
    setAmt("");
    setBal("");
    setCurrency("");
    setRepayAcct("");
    setNewRepayAcct("");
    setNewRepayAcctDesc("");
    // setPrinLov([]);
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
        API_SERVER + "/api/get-loan-customers",
        { branchCode: JSON.parse(localStorage.getItem("userInfo")).branchCode },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setCustomerLov(response.data);
    }
    getCustomers();
  }, []);
  console.log(customerNumber, "cusss");

  return (
    <div style={{ zoom: 0.9 }}>
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
            // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
            display: "flex",
          }}
        >
          <div style={{ flex: 0.5 }}>
            <div>
              <ListOfValue
                label={"Customer Number"}
                labelWidth={"23.5%"}
                inputWidth={"50%"}
                lovdata={customerLov}
                value={customerNumber}
                onChange={(value) => {
                  setCustomerNumber(value);
                  // setPrinAcct("");
                  handleValidate();
                  async function getPrin() {
                    let response = await axios.post(
                      API_SERVER + "/api/get-prin-acct",
                      { cusNo: value },
                      {
                        headers,
                      }
                    );
                    // response = await response();
                    //  console.log(response);
                    setPrinLov(response.data);
                  }
                  getPrin();
                }}
              />
            </div>
            <div>
              <ListOfValue
                label={"Principal Account"}
                labelWidth={"23.5%"}
                inputWidth={"50%"}
                lovdata={prinLov}
                value={prinAcct}
                onChange={(value) => {
                  value.split("-")[0].trim();
                  setRepayAcctDesc(value.split("-")[1].trim());
                  setFacilityNumber(value.split("-")[2].trim());
                  axios
                    .post(
                      API_SERVER + "/api/get-repay-acct-details",
                      {
                        facNo: value.split("-")[2].trim(),
                      },
                      { headers: headers }
                    )
                    .then(function (response) {
                      setFacilityNumber(response.data[0]?.facility_no);
                      setCurrency(response.data[0]?.cur);
                      setCurrencyCode(response.data[0]?.currency_code);
                      setRepayAcct(response.data[0]?.maintenance_fee_account);
                      setAmt(
                        formatNumber(
                          parseFloat(response.data[0]?.facility_amount)
                        )
                      );
                      setBal(
                        formatNumber(
                          parseFloat(response.data[0]?.principal_balance)
                        )
                      );
                      setLoanProduct(response.data[0]?.description);
                      setEffDate(formatDate(response.data[0]?.effective_date));
                      setExpiryDate(
                        formatDate(response.data[0]?.last_repay_date)
                      );

                      axios
                        .post(
                          API_SERVER + "/api/get-new-repay-acct",
                          {
                            cus_no: customerNumber,
                            cur: response.data[0]?.currency_code,
                            repay_acct:
                              response.data[0]?.maintenance_fee_account,
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          // response = await response();
                          //  console.log(response);
                          setNewRepayAcctLov(response.data);
                        });
                    })
                    .catch((err) => Swal.fire(err));

                  setPrinAcct(value);
                }}
              />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div style={{}}>
              <div>
                <InputField
                  label={""}
                  labelWidth={"20%"}
                  inputWidth={"60%"}
                  disabled
                  textAlign={"center"}
                  value={loanProduct}
                />
              </div>
            </div>
            <div>
              <InputField
                label={"Facility Number"}
                labelWidth={"20%"}
                inputWidth={"30%"}
                disabled
                textAlign={"center"}
                value={facilityNumber}
              />
            </div>
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            padding: "5px",
            gap: "10px",
            // border: "0.5px solid #d6d7d9",
            // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            // borderRadius: "5px",
          }}
        >
          <div
            style={{
              flex: 0.4,
              border: "2.5px solid #d6d7d9",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            <div>
              <HeaderComponent title={"Loan Details"} />
            </div>
            <div>
              <InputField
                label={"Effective Date"}
                labelWidth={"30%"}
                inputWidth={"35%"}
                disabled
                value={effDate}
                textAlign={"center"}
              />
            </div>
            <div>
              <InputField
                label={"Expiry Date"}
                labelWidth={"30%"}
                inputWidth={"35%"}
                disabled
                value={expiryDate}
                textAlign={"center"}
              />
            </div>
            <div>
              <InputField
                label={"Amount Granted"}
                inputColor={"red"}
                labelWidth={"30%"}
                inputWidth={"35%"}
                disabled
                value={amt}
                textAlign={"right"}
              />
            </div>
            <div>
              <InputField
                label={"Principal Balance"}
                labelWidth={"30%"}
                inputWidth={"35%"}
                disabled
                value={bal}
                textAlign={"right"}
              />
            </div>
          </div>
          <div
            style={{
              flex: 0.6,
              border: "2.5px solid #d6d7d9",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            <div>
              <HeaderComponent title={"Account Details"} />
            </div>
            <div>
              <InputField
                label={"Currency"}
                labelWidth={"33.5%"}
                inputWidth={"10%"}
                disabled
                value={currency}
                textAlign={"center"}
              />
            </div>
            <div>
              <InputField
                label={"Current Repayment Account"}
                labelWidth={"33.5%"}
                inputWidth={"25%"}
                disabled
                value={repayAcct}
                textAlign={"center"}
              />
            </div>
            {/* <div>
              <InputField
                label={"Current Repayment Account Name"}
                labelWidth={"33.5%"}
                inputWidth={"50%"}
                disabled
                value={repayAcctDesc}
                textAlign={"center"}
              />
            </div> */}
            <div>
              <ListOfValue
                label={"New Repayment Account"}
                labelWidth={"33.5%"}
                inputWidth={"50%"}
                required
                lovdata={newRepayAcctLov}
                value={newRepayAcct}
                onChange={(value) => {
                  setNewRepayAcct(value);
                  setNewRepayAcctDesc(value.split("-")[2].trim());
                }}
              />
            </div>
            <div>
              <InputField
                label={""}
                labelWidth={"33.5%"}
                inputWidth={"50%"}
                disabled
                value={newRepayAcctDesc}
                textAlign={"center"}
              />
            </div>
          </div>
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 0.4 }}>
            <HeaderComponent title={"Reasons"} />
            <div style={{ marginTop: "15px" }}>
              <TextAreaField cols={90} rows={7} />
            </div>
          </div>
          <div style={{ flex: 0.5 }}></div>
        </div>
      </div>
    </div>
  );
};

export default RepaymentAccountChange;
