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

const GuarantorsApp = ({ custNo, applicationNumber }) => {
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

  const getGuaDet = () => {
    axios
      .post(
        API_SERVER + "/api/get-guarantor-data",
        { loan_app_no: applicationNumber },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              index + 1,
              i.guarantor_member_id,
              i.guarantor_member_name,
              i.guarantee_amount
                ? formatNumber(parseFloat(i.guarantee_amount))
                : "",
              formatDate(i.posting_sysdate),
              i.posted_by,
            ]);
          });
          setData(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGuaDet();
  }, [custNo]);

  return (
    <div>
      <div>
        <HeaderComponent title={"Guarantor Details"} height={"35px"} />
      </div>
      <div>
        <CustomTable
          headers={[
            "#",
            "Member ID",
            "Member Name",
            "Guarantee Amount",
            "Posting Date",
            "Posted By",
          ]}
          data={data}
        />
      </div>
    </div>
  );
};

export default GuarantorsApp;
