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
import RadioButtons from "../../../../../../../../../components/others/Fields/RadioButtons";

const EmploymentVer = ({ custNo }) => {
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

  const getEmpDetails = () => {
    axios
      .post(
        API_SERVER + "/api/get-employment-details",
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
    getEmpDetails();
  }, [custNo]);

  const emp = data.map((item) => {
    // console.log(item, "stoff");

    return [
      <div>
        {item.employment_category === "null"
          ? ""
          : item.employment_category === "001"
          ? "PREVIOUS EMPLOYMENT"
          : "CURRENT EMPLOYMENT"}
      </div>,
      <div>{item.customer_number === "null" ? "" : item.customer_number}</div>,
      <div>{item.address1 === "null" ? "" : item.address1}</div>,
      <div>{item.position_held === "null" ? "" : item.position_held}</div>,
      <div>
        {item.employed_since === "null" ? "" : formatDate(item.employed_since)}
      </div>,
      <div>{item.city === "null" ? "" : item.city}</div>,
      <div>{item.phone1 === "null" ? "" : item.phone1}</div>,
    ];
  });

  return (
    <div>
      <div>
        <HeaderComponent title={"Employment Details"} height={"35px"} />
      </div>
      <div>
        <CustomTable
          headers={[
            "Employment Category",
            "Customer Number",
            "Address",
            "Position Held",
            "Employed Since",
            "City",
            "Phone",
          ]}
          data={emp}
        />
      </div>
    </div>
  );
};

export default EmploymentVer;
