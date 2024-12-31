import React, { useState, useRef } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import Header from "../../../../../components/others/Header/Header";
import { Modal, ScrollArea } from "@mantine/core";
// import coop from "../../../../../assets/";
import coop from "../../../../../assets/coop.png";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../config/constant";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoExitOutline } from "react-icons/io5";
import { AiFillPrinter } from "react-icons/ai";

function ProfitAndLossBreakdown({
  clearModal,
  reportName,
  formatDate,
  currencylov,
}) {
  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const componentRef = useRef();
  const [showModalWorkings, setShowModalWorkings] = useState(false);
  const [details, setDetails] = useState([]);
  const [currency, setCurrency] = useState("");
  const [reportDate, setReportDate] = useState("");

  function generateReportWorkings() {
    fetchDetails();
  }

  function formatNumber(num) {
    const number = parseFloat(num);

    if (isNaN(number)) {
      return ""; // Return an empty string for invalid input
    }

    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function fetchDetails() {
    let response = await axios.post(
      API_SERVER + "/api/get-profit-and-loss-breakdown",
      { currency: currency, reportDate: formatDate(reportDate) },
      { headers }
    );
    if (response.data.length > 0) {
      setDetails(response.data);
      setShowModalWorkings(true);
    } else {
      swal("No data found", "Kindly check parameters selected!!", "error");
    }
  }

  function generateExcel() {
    // Acquire Data (reference to the HTML table)
    var table_elt = document.getElementById("my-table-id");

    // Extract Data (create a workbook object from the table)
    var workbook = XLSX.utils.table_to_book(table_elt);

    // Process Data (add a new row)
    // var ws = workbook.Sheets["Sheet1"];
    // XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], {
    //   origin: -1,
    // });

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(workbook, "P&L_Breakdown.xlsb");
  }

  return (
    <div>
      <div className="">
        <div className="mb-1">
          <Header backgroundColor={"#0580c0"} title={"Report Parameters"} />
        </div>
        <div
          className="w-full rounded-sm p-4 "
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="mb-4 pt-1">
            <InputField
              label={"Current Report"}
              labelWidth={"30%"}
              inputWidth={"55%"}
              disabled={true}
              value={reportName}
            />
          </div>
          <div className="mb-4 pt-1">
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
          <div className="mb-4 pt-1">
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
          <div className="flex w-full justify-end gap-2 pt-2 ">
            <ButtonComponent
              label={"Fetch Report"}
              onClick={generateReportWorkings}
            />
            <ButtonComponent label={"Exit"} onClick={() => clearModal()} />
          </div>

          {showModalWorkings ? (
            <Modal
              padding={0}
              opened={showModalWorkings}
              size="90%"
              withCloseButton={false}
              transitionProps={"mounted"}
              onClose={() => {
                setShowModalWorkings(false);
              }}
              scrollAreaComponent={ScrollArea.Autosize}
            >
              <div className="px-1 py-1">
                <div className="flex justify-end pr-7 gap-2 mt-2 ">
                  <span className="">
                    <ButtonComponent
                      label={"Print"}
                      onClick={handlePrint}
                      buttonWidth={"90px"}
                      buttonIcon={<AiFillPrinter size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"#0063d1"}
                    />
                  </span>
                  <span>
                    <ButtonComponent
                      label={"Download Excel"}
                      onClick={generateExcel}
                      buttonWidth={"160px"}
                      buttonIcon={<SiMicrosoftexcel size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"green"}
                    />
                  </span>
                  <span>
                    <ButtonComponent
                      label={"Exit"}
                      onClick={() => {
                        setShowModalWorkings(false);
                      }}
                      buttonIcon={<IoExitOutline size={20} />}
                      buttonWidth={"90px"}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"black"}
                    />
                  </span>
                </div>
                <div ref={componentRef}>
                  <div
                    className="pt-[50px]"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={coop}
                      alt="Coop Tech"
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div className="flex justify-end pr-7 mb-1">
                    <span className="mr-2">
                      <p>
                        {/* {`Year to Date : `} */}
                        {/* <b>{`${formatDate(date)}`}</b> */}
                      </p>
                    </span>
                  </div>
                  <div className="mx-1" style={{ zoom: 0.9 }}>
                    <div className="sticky top-0 w-full">
                      <Header
                        backgroundColor={"#0580c0"}
                        title={"PROFIT AND LOSS - BREAKDOWN"}
                      />
                    </div>
                    <div className="w-full" id="my-table-id">
                      <table className="w-full border overflow-y-scroll  border-gray-300 rounded-sm">
                        <thead className="bg-gray-300 sticky top-[31px]">
                          <tr className="bg-blue-200 position-sticky ">
                            <th className="py-2 px-4 text-left font-semibold">
                              Item Description
                            </th>
                            <th className="py-2 px-4 text-center font-semibold">
                              Current Year
                            </th>
                            <th className="py-2 px-4 text-center font-semibold">
                              Previous Year
                            </th>
                            <th className="py-2 px-4 text-center font-semibold">
                              Variance Amount
                            </th>
                            <th className="py-2 px-4 text-center font-semibold">
                              Variance(%)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.map((i, index) => {
                            return (
                              <tr
                                className={`border border-t-1 border-gray-300 ${
                                  i.level_indicator === "T"
                                    ? "font-semibold bg-gray-100"
                                    : ""
                                }`}
                              >
                                <td className=" py-1 px-2 text-left">
                                  {i.pl_desc}
                                </td>
                                <td className=" py-1 px-2 text-right">
                                  {formatNumber(i.current_balance_today)}
                                </td>
                                <td className=" py-1 px-2 text-right">
                                  {formatNumber(i.previous_year_balance)}
                                </td>
                                <td className=" py-1 px-2 text-right">
                                  {formatNumber(i.variance_amount)}
                                </td>
                                <td className=" py-1 px-2 text-center">
                                  {formatNumber(i.variance_per) + "%"}
                                </td>
                              </tr>
                            );
                          })}
                          {/* {details.map((i, index) => {
                            return (
                              <div
                                className={`flex border border-t-1 border-gray-300 ${
                                  i.level_indicator === "T"
                                    ? "font-semibold bg-gray-100"
                                    : ""
                                }`}
                              >
                                <div className="w-[25%] py-1 px-2 text-left">
                                  {i.pl_desc}
                                </div>
                                <div className="w-[19%] py-1 px-2 text-right">
                                  {formatNumber(i.current_balance_today)}
                                </div>
                                <div className="w-[18%] py-1 px-2 text-right">
                                  {formatNumber(i.previous_year_balance)}
                                </div>
                                <div className="w-[19%] py-1 px-2 text-right">
                                  {formatNumber(i.variance_amount)}
                                </div>
                                <div className="w-[19%] py-1 px-2 text-center">
                                  {formatNumber(i.variance_per) + "%"}
                                </div>
                              </div>
                            );
                          })} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 justify-center">
                    <span>{`<<<<<<<<<<<<<<<<<<<<<<<<< End of Report >>>>>>>>>>>>>>>>>>>>>>>>>`}</span>
                  </div>
                </div>
              </div>
            </Modal>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfitAndLossBreakdown;
