import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import CustomTable from "../../../control-setups/components/CustomTable";
import Header from "../../../../../components/others/Header/Header";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiCheck, FiFileMinus, FiX } from "react-icons/fi";

function ArrearsCustomerFeedback({ onClose }) {
  // HEADERS
  var arrearsHeaders = [
    <div>Principal Account</div>,
    <div style={{ textAlign: "left" }}>Comments</div>,
    <div>Promise Date</div>,
    <div>Total Amount</div>,
    <div>Days To Arrears</div>,
    <div style={{ textAlign: "left" }}>Risk</div>,
  ];

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // VARIABLES AND CONSTANTS
  const [loading, setLoading] = useState(true);
  const [arrearsData, setArrearsData] = useState([]);
  const [principalAccount, setPrincipalAccount] = useState("");
  const [promiseDate, setPromiseDate] = useState("");
  const [daysInArrears, setDaysInArrears] = useState("");

  // FUNCTIONS
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

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // ONCLICK OF FETCH
  const handleNewClick = () => {
    setPrincipalAccount("");
    setPromiseDate("");
    setDaysInArrears("");
  };

  const handleFetchClick = () => {
    setLoading(true);

    var pd = formatDate(promiseDate);
    axios
      .post(
        API_SERVER + "/api/get-arrears-customers-feedback",
        {
          principal_account: principalAccount,
          days_in_arrears: daysInArrears,
          promise_date: promiseDate ? pd : promiseDate,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "ARR DATA");
        setArrearsData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Something went wrong:` + error);
        setLoading(false);
      });
  };

  // EFFECTS
  useEffect(() => {
    handleFetchClick();
  }, []);

  var totalAmount = 0;

  var data = arrearsData?.map((i) => {
    var totalArr = i?.total_amt;
    totalAmount += totalArr;

    return [
      <div style={{ textAlign: "left" }}>{i?.fascility_no}</div>,
      <div style={{ textAlign: "left" }}>{i?.notes}</div>,
      <div>{formatDate(i?.promise_date)}</div>,
      <div style={{ textAlign: "right" }}>{formatNumber(i?.total_amt)}</div>,
      <div>{i?.days_in_arr}</div>,
      <div
        style={{
          fontWeight: "700",
          textAlign: "left",
          color:
            i?.risk === "LOW"
              ? "grey"
              : i?.risk === "MEDIUM"
              ? "orange"
              : i?.risk === "HIGH"
              ? "tomato"
              : "black",
        }}
      >
        {i?.risk}
      </div>,
    ];
  });

  return (
    <div>
      <div className="space-y-4">
      <br />
        <InputField
          label="Principal Account"
          inputWidth={"30%"}
          labelWidth={"30%"}
          onChange={(e) => setPrincipalAccount(e.target.value)}
          value={principalAccount}
        />

        <InputField
          label="Days in Arrears"
          inputWidth={"30%"}
          labelWidth={"30%"}
          onChange={(e) => setDaysInArrears(e.target.value)}
          value={daysInArrears}
        />

        <InputField
          type={"date"}
          label="Promised Date"
          inputWidth={"30%"}
          labelWidth={"30%"}
          onChange={(e) => setPromiseDate(e.target.value)}
          value={promiseDate}
        />
      </div>

      <br />
      <hr />

      <div className="flex items-center gap-4 justify-end p-3">
        <ButtonComponent
          label={"Fetch"}
          buttonIcon={<FiCheck />}
          buttonBackgroundColor={"green"}
          buttonWidth={"100px"}
          buttonHeight={"30px"}
          onClick={handleFetchClick}
        />
        <ButtonComponent
          label={"Clear"}
          buttonIcon={<FiFileMinus />}
          buttonBackgroundColor={"orange"}
          buttonWidth={"80px"}
          buttonHeight={"30px"}
          onClick={handleNewClick}
        />

        <ButtonComponent
          label={"Exit"}
          buttonIcon={<FiX />}
          buttonBackgroundColor={"red"}
          buttonWidth={"80px"}
          buttonHeight={"30px"}
          onClick={onClose}
        />
      </div>

      <hr />
      <br />
      <Header headerShade title="Arrears Customer Feedback Details" />
      <div style={{ zoom: 0.94 }}>
        <CustomTable
          headers={arrearsHeaders}
          load={loading}
          data={data}
          rowsPerPage={20}
        />
        <div className="text-white">
          {arrearsData?.length > 0 &&
            data.push([
              <div>Total Arrears Amount</div>,
              <div></div>,
              <div></div>,
              <div
                style={{ textAlign: "right", color: "red", fontWeight: "500" }}
              >
                {formatNumber(totalAmount)}
              </div>,
              <div></div>,
              <div></div>,
            ])}
        </div>
      </div>
    </div>
  );
}

export default ArrearsCustomerFeedback;
