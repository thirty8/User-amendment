import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import SelectField from "../components/fields/SelectField";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import HeaderComponent from "../components/header/HeaderComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../config/constant";
import DocumentViewing from "../../../../components/DocumentViewing";
import { Modal, Textarea } from "@mantine/core";

const WriteOffRecovery = () => {
  const [custLov, setCustLov] = useState([]);
  const [prinLov, setPrinLov] = useState([]);
  const [custNo, setCustNo] = useState("");
  const [prin, setPrin] = useState("");

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const handleClear = () => {};

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
        API_SERVER + "/api/get-writeoff-rec-customers",
        {
          headers,
        }
      );
      setCustLov(response.data);
    }
    getCustomers();
  }, []);

  return (
    <div style={{ zoom: 0.9 }}>
      <div style={{ padding: "10px" }}>
        <ActionButtons displayFetch={"none"} onExitClick={handleExitClick} />
        <br />
        <div
          style={{
            padding: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          <div>
            <ListOfValue
              label={"Customer Number"}
              labelWidth={"15%"}
              inputWidth={"30%"}
              required
              value={custNo}
              lovdata={custLov}
              onChange={(value) => {
                setCustNo(value);
                axios
                  .post(
                    API_SERVER + "/api/get-writeoff-rec-accts",
                    {
                      prin_acct: value.trim(),
                    },
                    {
                      headers,
                    }
                  )
                  .then(function (response) {
                    setPrinLov(response.data);
                  });
              }}
            />
          </div>
          <div>
            <ListOfValue
              label={"Principal Account"}
              labelWidth={"15%"}
              inputWidth={"30%"}
              required
              value={prin}
              lovdata={prinLov}
              onChange={(value) => {
                setPrin(value);
              }}
            />
          </div>
        </div>
        <br />
        <div style={{ marginBottom: "5px" }}>
          <HeaderComponent title={"Write-Off Details"} height={"35px"} />
        </div>
        <div
          style={{
            display: "flex",
            padding: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex", flex: 0.5 }}>
            <div style={{ flex: 0.7 }}>
              <InputField
                label={"Write-Off Amount"}
                labelWidth={"45%"}
                inputWidth={"50%"}
                disabled
              />
            </div>
            <div style={{ flex: 0.3, marginTop: "12px" }}>
              <ButtonComponent
                label={">"}
                buttonBackgroundColor={"black"}
                buttonColor={"white"}
                buttonHeight={"30px"}
                buttonWidth={"30px"}
              />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div>
              <InputField
                label={"Write-Off Date"}
                labelWidth={"25%"}
                inputWidth={"50%"}
                disabled
              />
            </div>
          </div>
        </div>
        <br />
        <div style={{ display: "flex", gap: "15px" }}>
          <div style={{ flex: 0.5 }}>
            <div style={{ marginBottom: "5px" }}>
              <HeaderComponent title={"Loan Details"} height={"35px"} />
            </div>
          </div>
          <div style={{ flex: 0.5 }}>
            <div style={{ marginBottom: "5px" }}>
              <HeaderComponent title={"Recovery"} height={"35px"} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <div
            style={{
              flex: 0.5,
              padding: "5px",
              border: "1.5px solid #d6d7d9",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            <div>
              <InputField
                label={"Amount Granted"}
                labelWidth={"25%"}
                inputWidth={"50%"}
                disabled
              />
            </div>
            <div>
              <InputField
                label={"Date Granted"}
                labelWidth={"25%"}
                inputWidth={"50%"}
                disabled
              />
            </div>
            <div>
              <InputField
                label={"Written Off By"}
                labelWidth={"25%"}
                inputWidth={"50%"}
                disabled
              />
            </div>
            <div>
              <InputField
                label={"Approved By"}
                labelWidth={"25%"}
                inputWidth={"50%"}
                disabled
              />
            </div>
          </div>
          <div
            style={{
              flex: 0.5,
              padding: "5px",
              border: "1.5px solid #d6d7d9",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            <div>
              <div style={{ display: "flex", marginBottom: "-15px" }}>
                <div style={{ flex: 0.72 }}>
                  <InputField
                    label={"Amount Recovered Earlier"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.2, marginTop: "12px" }}>
                  <ButtonComponent
                    label={">"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"30px"}
                    buttonWidth={"30px"}
                  />
                </div>
              </div>
            </div>
            <div>
              <InputField
                label={"Amount Recovered Reference"}
                labelWidth={"35%"}
                inputWidth={"50%"}
                required
              />
            </div>
            <div>
              <InputField
                label={"Amount Recovered Now"}
                labelWidth={"35%"}
                inputWidth={"50%"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteOffRecovery;
