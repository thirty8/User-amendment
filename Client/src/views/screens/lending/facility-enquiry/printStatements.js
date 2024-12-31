import React, { useState, useEffect } from "react";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../control-setups/components/CustomTable";
import { Modal, ScrollArea } from "@mantine/core";
import coop from "../../../../assets/coop.png";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import InputField from "../../../../components/others/Fields/InputField";
import Header from "../../../../components/others/Header/Header";

function PrintStatements({ account_number }) {
  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  var userId = JSON.parse(localStorage.getItem("userInfo")).id;

  // data used
  const [showPrintStatementData, setShowPrintStatementData] = useState([]);
  const [showPenalStatementData, setShowPenalStatementData] = useState([]);
  const [showPrintInterestStatementData, setShowPrintInterestStatementData] =
    useState([]);

  // table headers
  const penalHeaders = [
    "Principal In Arrears",
    "Interest In Arrears",
    "Penal On",
    "Penalty Rate",
    "Prev Pen Date",
    "Posting Date",
    "Penal Charge",
  ];

  const interestHeaders = [
    "Compute Date",
    "Principal Balance",
    "Rate",
    "Previous Date",
    "Accrued Amt. Today",
  ];

  const statementActions = [
    [
      <div>
        <InputField />
      </div>,
      <div>
        <InputField />
      </div>,

      <div>
        <InputField />
      </div>,

      <div>
        <ButtonComponent label={"Print Schedule"} />
      </div>,
    ],
    [
      <div>
        <InputField />
      </div>,
      <div>
        <InputField />
      </div>,

      <div>
        <InputField />
      </div>,

      <div>
        <ButtonComponent label={"Print Schedule"} />
      </div>,
    ],

    [
      <div>
        <InputField />
      </div>,
      <div>
        <InputField />
      </div>,

      <div>
        <InputField />
      </div>,

      <div>
        <ButtonComponent label={"Print Schedule"} />
      </div>,
    ],

    [
      <div>
        <InputField />
      </div>,
      <div>
        <InputField />
      </div>,

      <div>
        <InputField />
      </div>,

      <div>
        <ButtonComponent label={"Print Schedule"} />
      </div>,
    ],
  ];

  // requests
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/loan-print-statements",
        {
          account_number: account_number,
          user_id: userId,
        },
        { headers: headers }
      )
      .then(function (response) {
        setShowPrintStatementData(response.data);
      })
      .catch((err) => console.log(err));

    // penal
    // axios
    //   .post(
    //     API_SERVER + "/api/loan-penal-statements",
    //     {
    //       // principal_account: principal_account, start_date: start_date, end_date:end_date
    //     },
    //     { headers: headers }
    //   )
    //   .then(function (response) {
    //     setShowPrintStatementData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  // table headers
  const statementHeaders = [
    <div>Posting Date</div>,
    <div>Value Date</div>,
    <div>Transaction Details</div>,
    <div>Document Ref</div>,
    <div style={{ textAlign: "left" }}>Debit</div>,
    <div style={{ textAlign: "right" }}>Credit</div>,
    <div style={{ textAlign: "right" }}>Balance</div>,
  ];

  // date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get individual parts of the date
    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase();
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    // Combine the parts with hyphens
    return `${month}-${day}-${year}`;
  }

  // number formatter
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  // states
  const [loading, setLoading] = useState(false);
  const [showPrintStatement, setShowPrintStatement] = useState(false);
  const [showPenalStatement, setShowPenalStatement] = useState(false);
  const [showPrintInterestStatement, setShowPrintInterestStatement] =
    useState(false);

  const [disappear, setDisappear] = useState(false);

  return (
    <div style={{ display: disappear ? "none" : "block" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "15px",
          zoom: "0.95",
        }}
      >
        <div>
          <ButtonComponent
            label={"Print Statement"}
            buttonHeight={"30px"}
            onClick={() => {
              setShowPrintStatement(true);
              setDisappear(true);
            }}
          />
        </div>

        <div>
          <ButtonComponent
            label={"Print Penal Statement"}
            buttonHeight={"30px"}
            onClick={() => {
              setShowPenalStatement(true);
              setDisappear(true);
            }}
          />
        </div>

        <div>
          <ButtonComponent
            label={"Print Interest Statement"}
            buttonHeight={"30px"}
            onClick={() => {
              setShowPrintInterestStatement(true);
              setDisappear(true);
            }}
          />
        </div>
      </div>

      <div style={{ zoom: "0.8" }}>
        <CustomTable
          headers={[
            "Facility No.",
            "Reschedule Date",
            "Username",
            "Print Schedule",
          ]}
          data={statementActions}
        />
      </div>

      {/* modals */}
      {/* STATEMENT */}
      <Modal
        className=""
        size={"80%"}
        opened={showPrintStatement}
        padding={0}
        withCloseButton={false}
        onClose={() => {
          setShowPrintStatement(false);
          setDisappear(false);
        }}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div>
          <Header
            title={"Statements"}
            headerShade
            handleClose={() => {
              setShowPrintStatement(false);
            }}
          />
          <div
            className="space-y-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div></div>
            <div className="space-y-2 mr-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                COOPTECH
              </div>

              <div
                style={{
                  fontSize: "15px",
                  textDecoration: "capitalize",
                  textAlign: "center",
                }}
              >
                Statements
              </div>

              <div style={{ fontSize: "15px" }}>
                <CustomTable
                  load={loading}
                  headers={statementHeaders}
                  data={showPrintStatementData}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* PENAL */}
      <Modal
        className=""
        size={"80%"}
        opened={showPenalStatement}
        padding={0}
        withCloseButton={false}
        onClose={() => {
          setShowPenalStatement(false);
          setDisappear(false);
        }}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div>
          <Header
            title={"Statements"}
            headerShade
            handleClose={() => {
              setShowPenalStatement(false);
            }}
          />
          <div
            className="space-y-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div></div>
            <div className="space-y-2 mr-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                COOPTECH
              </div>

              <div
                style={{
                  fontSize: "15px",
                  textDecoration: "capitalize",
                  textAlign: "center",
                }}
              >
                Penal Statements
              </div>

              <div style={{ fontSize: "15px" }}>
                <CustomTable
                  load={loading}
                  headers={penalHeaders}
                  data={showPenalStatementData}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* INTEREST STATEMENT */}
      <Modal
        className=""
        size={"80%"}
        opened={showPrintInterestStatement}
        padding={0}
        withCloseButton={false}
        onClose={() => {
          setShowPrintInterestStatement(false);
          setDisappear(false);
        }}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div>
          <Header
            title={"Interest Statements"}
            headerShade
            handleClose={() => {
              setShowPrintInterestStatement(false);
            }}
          />
          <div
            className="space-y-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div></div>
            <div className="space-y-2 mr-4">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                COOPTECH
              </div>

              <div
                style={{
                  fontSize: "15px",
                  textDecoration: "capitalize",
                  textAlign: "center",
                }}
              >
                Interest Statements
              </div>

              <div style={{ fontSize: "15px" }}>
                <CustomTable
                  load={loading}
                  headers={interestHeaders}
                  data={showPrintInterestStatementData}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PrintStatements;
