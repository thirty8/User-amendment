import React, { useState, useRef } from "react";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../components/others/Fields/InputField";
import Header from "../../../../../components/others/Header/Header";
import axios from "axios";
import { Modal, ScrollArea } from "@mantine/core";
import coop from "../../../../../assets/coop.png";
import { useReactToPrint } from "react-to-print";
import CustomTable from "../../../teller-ops/components/CustomTable";
import * as XLSX from "xlsx";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../config/constant";

function ProfitAndLossWorkings({clearModal,currencylov,reportName}) {
  const componentRef = useRef();
  const [details, setDetails] = useState([]);
  const [customTableArray, setCustomTableArray] = useState([]);
  const [showModalWorkings, setShowModalWorkings] = useState(false);
  const [currency, setCurrency] = useState("");
  const [reportDate, setReportDate] = useState("");

  let totalpreviousYearSum = 0;
  let totalvarianceSum = 0;
  let totalcurrentYearSum = 0;
  let totalcount = 0;

  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === ".00" ) {
      return "";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf('.');
  
      if (decimalIndex === -1  ) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

  function formatDate(startDate) {
    // Parse the input date
    const sDate = new Date(startDate);
  
    // // Add 1 day to the date
    // sDate.setDate(sDate.getDate() + 1);
  
    // Create an array of month abbreviations
    const monthAbbreviations = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Format the date in "dd-MMM-yyyy" format with lowercase month abbreviation
    const day = String(sDate.getDate()).padStart(2, '0');
    const month = monthAbbreviations[sDate.getMonth()].toLowerCase();
    const year = sDate.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function fetchDetails() {
    let response = await axios.post(
      API_SERVER + "/api/get-year-on-year-PnL-workings-translated",
      { currencyCode: currency,
        balanceAsAt: formatDate(reportDate)
      },{headers}
    );

    console.log(response.data,"deeezydothis")

    if (response.data.length > 0) {
      let arr = [];
      response.data?.map((i) => {
        let currentYearSum = 0;
        let previousYearSum = 0;
        let varianceSum = 0;
        totalcount += parseFloat(i.data.length);
        arr.push([
          "",
          <span className="font-semibold text-md text-gray-700">
            {i.item_descrp}
          </span>,
          "",
          "",
          "",
          "",
          "",
        ]);
        i.data.map((e) => {
          currentYearSum += parseFloat(e.current_year_balance);
          previousYearSum += parseFloat(e.previous_year_balance);
          varianceSum += parseFloat(e.variance_amount);
          totalcount += parseFloat(i.data.length);

          totalcurrentYearSum += parseFloat(e.current_year_balance);
          totalpreviousYearSum += parseFloat(e.previous_year_balance);
          totalvarianceSum += parseFloat(e.variance_amount);
          arr.push([
            e.acct_link,
            e.account_descrp,
            e.currency_iso,
            formatNumber(e.current_year_balance),
            formatNumber(e.previous_year_balance),
            formatNumber(e.variance_amount),
            e.variance_per,
          ]);
        });
        arr.push([
          <span className="font-semibold text-gray-700">{i.data.length}</span>,
          "",
          "",
          <span className="font-semibold text-gray-700">
            {formatNumber(currentYearSum)}
          </span>,
          <span className="font-semibold text-gray-700">
            {formatNumber(previousYearSum)}
          </span>,
          <span className="font-semibold text-gray-700">
            {formatNumber(varianceSum)}
          </span>,
          "",
        ]);
      });
      arr.push([
        <span className="font-semibold text-gray-700">
          {`Count: ` + totalcount}
        </span>,
        "",
        <span className="font-semibold text-gray-700">{`Total: `}</span>,
        <span className="font-semibold text-gray-700">
          {formatNumber(totalcurrentYearSum)}
        </span>,
        <span className="font-semibold text-gray-700">
          {formatNumber(totalpreviousYearSum)}
        </span>,
        <span className="font-semibold text-gray-700">
          {formatNumber(totalvarianceSum)}
        </span>,
        "",
      ]);
      setCustomTableArray(arr);
      setShowModalWorkings(true);
    } else {
      swal("No data found", "Kindly check the parameters selected!!", "error");
    }
  }

  function generateExcel() {
    // Acquire Data (reference to the HTML table)
    var table_elt = document.getElementById("my-table-id");

    // Extract Data (create a workbook object from the table)
    var workbook = XLSX.utils.table_to_book(table_elt);

    // Process Data (add a new row)
    // var ws = workbook.Sheets["Sheet1"];
    // XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toDateString()]], {
    //   origin: -1,
    // });

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(workbook, "BS_Breakdown_Report.xlsb");
  }

  console.log(customTableArray,"deezy")

  return (
    <div className="">
      <div className="mb-1">
        <Header backgroundColor={"#0580c0"} title={"Report Parameters"} />
      </div>
      <div
        className="w-full rounded-sm p-4"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        <div className="mb-4">
          <InputField
            label={"Current Report"}
            labelWidth={"30%"}
            inputWidth={"60%"}
            disabled={true}
            value={reportName}

            //   data={cbrcode}
          />
        </div>
        <div className="mb-5">
          <InputField
            type={"date"}
            label={"Date As At"}
            labelWidth={"30%"}
            inputWidth={"30%"}
            onChange={(e) => {
              setReportDate(e.target.value);
            }}
            value={reportDate}
          />
        </div>
        <div className="mb-7">
          <ListOfValue
            label={"Currency"}
            labelWidth={"30%"}
            inputWidth={"30%"}
            data={currencylov}
            onChange={(value) => {
              setCurrency(value);
            }}
            value={currency}
          />
        </div>
        <div className="flex w-full justify-end gap-2 P-2 ">
          <ButtonComponent label={"Fetch Report"} onClick={fetchDetails} />
          <ButtonComponent label={"Exit"} onClick={() => clearModal()} />
        </div>
      </div>

      {/* report modal */}

      {showModalWorkings && (
        <Modal
          padding={0}
          opened={showModalWorkings}
          size="100%"
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => {
            setShowModalWorkings(false);
          }}
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <div>
            <div className=" py-1">
              <div className="flex justify-end pr-7 gap-2 mt-2 ">
                <span className="">
                  <ButtonComponent
                    label={"Print Report"}
                    onClick={handlePrint}
                  />
                </span>
                <span>
                  <ButtonComponent
                    label={"Download Excel"}
                    onClick={generateExcel}
                  />
                </span>
                <span>
                  <ButtonComponent
                    label={"Exit"}
                    onClick={() => {
                      setShowModalWorkings(false);
                    }}
                    buttonWidth={"40px"}
                  />
                </span>
              </div>
              <div ref={componentRef}>
                <div
                  className="pt-[50px]"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
                </div>
                <div className=" mt-2 px-2" style={{}}>
                  <div className=" w-full">
                    <Header
                      backgroundColor={"#0580c0"}
                      headerShade={true}
                      title={"YEAR ON YEAR PROFIT AND LOSS TRANSLATED ACCOUNTS WORKINGS"}
                      // zoom={0.9}
                    />
                  </div>
                  <div id="my-table-id">
                    <CustomTable
                      headers={[
                        "Account Number",
                        "Account Description",
                        "Currency",
                        "Current Year",
                        "Previous Year",
                        "Variance",
                        "Variance(%)",
                      ]}
                      data={customTableArray}
                      style={{
                        columnAlignRight: [4, 5, 6],
                        columnAlignCenter: [7],
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-2 justify-center">
                  <span>{`<<<<<<<<<<<<<<<<<<<<<<<<< End of Report >>>>>>>>>>>>>>>>>>>>>>>>>`}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* report modal */}
    </div>
  );
}

export default ProfitAndLossWorkings;
