import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import SelectField from "../components/fields/SelectField";
import TextAreaField from "../components/fields/TextArea";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import HeaderComponent from "../components/header/HeaderComponent";
// import ReclassificationModal from "../components/modals/ReclassificationModal";
import axios from "axios";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../config/constant";

const LoanReclassification = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [showModal, setShowModal] = useState(false);
  const [cusLov, setCusLov] = useState([]);
  const [customerNo, setCustomerNo] = useState("");
  const [prinLov, setPrinLov] = useState([]);
  const [loanAcct, setLoanAcct] = useState("");
  const [loanBal, setLoanBal] = useState("");
  const [intSus, setIntSus] = useState("");
  const [penSus, setPenSus] = useState("");
  const [totalInt, setTotalInt] = useState("");
  const [clas, setClas] = useState("");
  const [daysArr, setDaysArr] = useState("");
  const [facNo, setFacNo] = useState("");

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const handleClear = () => {
    setFacNo("");
    setLoanAcct("");
    setLoanBal("");
    setIntSus("");
    setPenSus("");
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
    async function getReclassCustomers() {
      let response = await axios.get(
        API_SERVER + "/api/get-loan-reclass-customers",
        // { branchCode: JSON.parse(localStorage.getItem("userInfo")).branchCode },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setCusLov(response.data);
    }
    getReclassCustomers();
  }, []);

  return (
    <div style={{ zoom: 0.9 }}>
      <div style={{ padding: "10px" }}>
        <ActionButtons
          displayFetch={"none"}
          onExitClick={handleExitClick}
          displayDelete={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayView={"none"}
          displayRefresh={"none"}
          displayHelp={"none"}
          displayReject={"none"}
        />
        {/* <ReclassificationModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSelected={(row) => {
            console.log({ row });
            setShowModal(false);
          }}
        /> */}
        <br />
        <div style={{ marginBottom: "5px" }}>
          <HeaderComponent title={"Search"} height={"35px"} />
        </div>
        <div
          style={{
            padding: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
            // display: "flex",
          }}
        >
          <div>
            <div>
              <ListOfValue
                label={"Customer Number"}
                labelWidth={"15%"}
                inputWidth={"40%"}
                lovdata={cusLov}
                value={customerNo}
                onChange={(value) => {
                  setCustomerNo(value);
                  handleClear();
                  axios
                    .post(
                      API_SERVER + "/api/get-prin-reclass-acct-loans",
                      {
                        cusNo: value,
                      },
                      {
                        headers,
                      }
                    )
                    .then(function (response) {
                      if (response.data.length > 0) {
                        setPrinLov(response.data);
                      } else {
                        axios
                          .post(
                            API_SERVER + "/api/get-prin-reclass-acct-od",
                            {
                              cusNo: value,
                            },
                            {
                              headers,
                            }
                          )
                          .then(function (response) {
                            setPrinLov(response.data);
                          });
                      }
                    });
                }}
              />
            </div>
            <div>
              <ListOfValue
                label={"Loan Account"}
                labelWidth={"15%"}
                inputWidth={"40%"}
                value={loanAcct}
                lovdata={prinLov}
                onChange={(value) => {
                  setLoanAcct(value);
                  axios
                    .post(
                      API_SERVER + "/api/get-reclass-details",
                      {
                        prin_acct: value.trim(),
                      },
                      {
                        headers,
                      }
                    )
                    .then(function (response) {
                      setFacNo(response.data[0]?.facility_no);
                      setIntSus(
                        formatNumber(parseFloat(response.data[0]?.interest))
                      );
                      setPenSus(
                        formatNumber(parseFloat(response.data[0]?.pen))
                      );
                      setLoanBal(
                        formatNumber(
                          parseFloat(response.data[0]?.shadow_balance_today)
                        )
                      );
                      axios
                        .post(
                          API_SERVER + "/api/get-reclass-details2",
                          {
                            prin_acct: value.trim(),
                          },
                          {
                            headers,
                          }
                        )
                        .then(function (response) {
                          setDaysArr(response.data[0]?.days_arr);
                          axios
                            .post(
                              API_SERVER + "/api/get-class-desc",
                              {
                                cur_class: response.data[0]?.acct_class,
                              },
                              {
                                headers,
                              }
                            )
                            .then(function (response) {
                              setClas(response.data[0]?.description);
                            });
                        });
                    });
                }}
              />
            </div>
            <div style={{}}>
              <InputField
                label={"Facility Number"}
                labelWidth={"15%"}
                inputWidth={"20%"}
                required
                disabled
                value={facNo}
                textAlign={"right"}
              />
            </div>
            {/* <div>
                <ButtonComponent
                  label={"Loan Enquiry"}
                  buttonHeight={"40px"}
                  buttonWidth={"130px"}
                  buttonColor={"white"}
                />
              </div> */}
          </div>
        </div>
        <br />
        <div style={{ marginBottom: "5px" }}>
          <HeaderComponent title={"Information"} height={"35px"} />
        </div>
        <div
          style={{
            padding: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            display: "flex",
            backgroundColor: "white",
          }}
        >
          <div style={{ flex: 0.5 }}>
            <div>
              <InputField
                label={"Current Class"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled
                value={clas}
              />
            </div>
            <div>
              <InputField
                label={"Loan Balance"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled
                value={loanBal}
                textAlign={"right"}
              />
            </div>
            <div>
              <InputField
                label={"Days in Arrears"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled
                value={daysArr}
              />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div>
              <InputField
                label={"Interest in Suspense"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled
                value={intSus}
                textAlign={"right"}
              />
            </div>
            <div>
              <InputField
                label={"Penal in Suspense"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled
                value={penSus}
                textAlign={"right"}
              />
            </div>
            <div>
              <InputField
                label={"Total Interest"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                disabled
                value={totalInt}
                textAlign={"right"}
              />
            </div>
          </div>
        </div>
        <br />
        <div style={{ marginBottom: "5px" }}>
          <HeaderComponent title={"Action"} height={"35px"} />
        </div>
        <div
          style={{
            padding: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
            display: "flex",
          }}
        >
          <div style={{ flex: 0.5 }}>
            <div>
              <SelectField
                label={"New Class"}
                labelWidth={"30%"}
                inputWidth={"25%"}
                required
              />
            </div>
            <div>
              <TextAreaField
                label={"Reason"}
                labelWidth={"30%"}
                cols={50}
                rows={4}
                required
              />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div>
              <InputField
                type={"date"}
                label={"Expity Date"}
                labelWidth={"30%"}
                inputWidth={"25%"}
                required
              />
            </div>
            <div>
              <InputField
                type={"date"}
                label={"Next Review Date"}
                labelWidth={"30%"}
                inputWidth={"25%"}
                required
              />
            </div>
            <div>
              <InputField
                label={"Document ID"}
                labelWidth={"30%"}
                inputWidth={"25%"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanReclassification;
