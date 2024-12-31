import React, { useState, useEffect } from "react";
import Header from "../../../../components/others/Header/Header";
import InputField from "../../../../components/others/Fields/InputField";
import { FiX } from "react-icons/fi";
import RadioButtons from "../../../../components/others/Fields/RadioButtons";
import CustomTable from "../../control-setups/components/CustomTable";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";

function ChargesStatements({ closeModal, principal_details }) {
  //  TABLE HEADERS
  const interestPenalEnquiryHeaders = [
    "Principal A/C",
    "Interest Balance",
    "Accrued Amount",
    "Rate",
    "Posting Date",
    "Previous Date",
    "Narration",
    "Inc. Status",
    "Type",
  ];

  // Effects
  useEffect(() => {
    fetchCharges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // states
  const [accountNumber, setAccountNumber] = useState(
    principal_details?.principal_account
  );
  const [transtype, setTranstype] = useState("INT");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [chargesData, setChargesData] = useState([]);

  // functions
  const fetchCharges = () => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-charges-statements",
        {
          account_link: accountNumber,
          trans_type: transtype,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response.data, "charges");
        setChargesData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //FORMAT DATE
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

  // FORMAT NUMBER
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  // VARIABLES
  var arr = chargesData?.map((i) => {
    return [
      <div>{i.acct_link}</div>,
      <div className="text-right">
        {i.int_bal === "Null" || null || "null"
          ? ""
          : formatNumber(parseFloat(i?.int_bal))}
      </div>,
      <div className="text-right">
        {formatNumber(parseFloat(i.acr_amt_tday))}
      </div>,
      <div className="text-right">
        {formatNumber(parseFloat(i.rate)) + "%"}
      </div>,
      <div>{formatDate(i.posting_date)}</div>,
      <div>
        {formatDate(i.prev_int_date) ===
        "INVALID DATE-Invalid Date-Invalid Date"
          ? ""
          : formatDate(i.prev_int_date)}
      </div>,
      <div className="text-left">{i.naration}</div>,
      <div className="text-left">{i.inc_status}</div>,
      <div>{i.typ}</div>,
    ];
  });

  return (
    <div className="p-3">
      <Header
        title={"Loan Statement Enquiry"}
        headerShade
        closeIcon={<FiX size={20} />}
        handleClose={() => {
          closeModal();
          // setShowBg();
        }}
      />

      <div className="space-y-2">
        <div
          style={{ display: "flex", width: "100%", zoom: 0.9 }}
          className="py-5"
        >
          <div style={{ width: "30%" }}>
            <InputField
              label={"Principal Account"}
              labelWidth={"50%"}
              inputWidth={"50%"}
              defaultValue={principal_details?.principal_account}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div style={{ width: "30%" }}>
            <InputField
              label="Posting Date"
              type={"date"}
              labelWidth={"50%"}
              onChange={(e) => setStartDate(e.target.value)}
              inputWidth={"50%"}
            />
          </div>

          <div style={{ width: "30%" }}>
            <InputField
              label="To"
              type={"date"}
              labelWidth={"50%"}
              inputWidth={"50%"}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "rgb(92, 92, 92)",
          }}
        >
          <div style={{ width: "60%" }} className="ml-8">
            <RadioButtons
              labelWidth={"30%"}
              label={"Select Statement Type"}
              radioLabel={"Interest Statement"}
              radioLabel2={"Penalty Statement"}
              radioLabel3={"Arrears Statement"}
              display={true}
              display2={true}
              display3={true}
              radioButtonsWidth={"100%"}
              name={"Select Statement Type"}
              value={"INT"}
              value2={"PEN"}
              value3={"ARR"}
              checked={transtype === "INT"}
              checked2={transtype === "PEN"}
              checked3={transtype === "ARR"}
              onChange={(e) => {
                setTranstype(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />

      <div
        className="flex items-center justify-between ml-9"
        style={{ zoom: 0.9 }}
      >
        <div className="flex items-center gap-4">
          <ButtonComponent
            label={"Fetch"}
            onClick={() => {
              fetchCharges();
            }}
            buttonBackgroundColor={"green"}
            buttonWidth={"100px"}
            buttonHeight={"28px"}
            // buttonIcon={<FiCheck />}
          />

          <ButtonComponent
            label={"Exit"}
            onClick={closeModal}
            buttonBackgroundColor={"red"}
            buttonWidth={"80px"}
            buttonHeight={"28px"}
            buttonIcon={<FiX />}
          />
        </div>

        <div></div>
      </div>

      <br />
      <hr />

      {/* CUSTOM TABLE */}
      <div style={{ marginTop: "20px", zoom: 0.8, paddingInline: "10px" }}>
        <Header title="Interest/Penal Enquiry" headerShade />
        <CustomTable
          headers={interestPenalEnquiryHeaders}
          data={arr}
          load={loading}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
}

export default ChargesStatements;
