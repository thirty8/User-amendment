import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField";
import ListOfValue from "../fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../../../../../config/constant";

const FinancialsVer = ({ custNo }) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [data, setData] = useState([]);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
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

  const getFinancials = () => {
    axios
      .post(
        API_SERVER + "/api/get-financial-summary",
        { customerNumber: custNo },
        { headers }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFinancials();
  }, [custNo]);

  const fin = data.map((item) => {
    // console.log(item, "stoff");

    return [
      <div>{item.fac_type === "null" ? "" : item.fac_type}</div>,
      <div>{item.loan_ac === "null" ? "" : item.loan_ac}</div>,
      <div>{item.ccy === "null" ? "" : item.ccy}</div>,
      <div>
        {item.loan_amt === "null"
          ? ""
          : formatNumber(parseFloat(item.loan_amt))}
      </div>,
      <div>
        {item.install_amt === "null"
          ? ""
          : formatNumber(parseFloat(item.install_amt))}
      </div>,
      <div>{item.exp_date === "null" ? "" : formatDate(item.exp_date)}</div>,
    ];
  });

  return (
    <div>
      <div>
        <div>
          <HeaderComponent
            title={"Existing Facilities (This Bank)"}
            height={"35px"}
          />
        </div>
        <CustomTable
          headers={[
            "Facility Type",
            "Account Number",
            "CCY",
            "Facility Amount",
            "Installment",
            "Expiry Date",
          ]}
          data={fin}
        />
      </div>
    </div>
  );
};

export default FinancialsVer;
