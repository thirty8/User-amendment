import React, { useEffect, useState, useRef } from "react";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import Header from "../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { Modal, ScrollArea } from "@mantine/core";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import coop from "../../../../assets/coop.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
// import Loan from '../sasra-report/loan-classification';
import swal from "sweetalert";

function StatementOfFinancialReport() {
  const [details, setDetails] = useState([]);
  const [cbrcode, setCbrcode] = useState([]);
  const [date, setDate] = useState("");
  const [report_code, setReport_code] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalWorkings, setShowModalWorkings] = useState(false);
  const componentRef = useRef();
  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    async function getCBRCode() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details-3",
        { code: "CBR" },
        { headers }
      );
      setCbrcode(response.data);
    }
    getCBRCode();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function fetchReport() {
    await axios
      .post(
        API_SERVER + "/api/get-statement-of-financial-position",
        {
          returnCode: report_code,
          reportDate: formatDate(date),
        },
        { headers }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setDetails(response.data);
          setShowModal(true);
        } else {
          swal({
            title: "No data found",
            text: "kindly check the parameters selected!!!",
            icon: "error",
            buttons: "OK",
          });
        }
      });
  }

  async function fetchReportWorkings() {
    // await axios.post(API_SERVER +"/api/get-statement-of-financial-position-workings",
    await axios
      .post(
        API_SERVER + "/api/get-statement-of-financial-position-workings",
        {
          returnCode: report_code,
          reportDate: formatDate(date),
        },
        { headers }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setDetails(response.data);
          setShowModalWorkings(true);
        } else {
          swal({
            title: "No data found",
            text: "kindly check the parameters selected!!!",
            icon: "error",
            buttons: "OK",
          });
        }
      });
  }
  console.log(details, "detailsssss");

  function printReport() {
    fetchReport();
    handlePrint();
  }

  const handleExportToExcel = () => {
    const filteredData = details.map(
      ({
        currency_iso,
        report_class,
        closing_balance_today_frgn,
        return_code,
        group_id,
        item_code,
        level_id,
        ...rest
      }) => rest
    );
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Add a custom heading row at the top
    const heading = [["Ref Number"], ["Item Description"], ["Amount"]];
    XLSX.utils.sheet_add_aoa(worksheet, [heading], { origin: "A1" });

    // Set column widths
    const columnWidths = [{ wch: 20 }, { wch: 50 }, { wch: 30 }]; // Adjust the width values as needed
    worksheet["!cols"] = columnWidths;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TableData");
    XLSX.writeFile(workbook, "Statement of Financial Position.xlsx");
  };

  const handleExportToExcelWorkings = () => {
    const filteredData = details.map(
      ({
        currency_iso,
        iso,
        ordering,
        closing_balance_today,
        currency_code,
        item_code,
        item_descrp,
        report_class,
        return_code,
        return_descrp,
        ...rest
      }) => rest
    );
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Add a custom heading row at the top
    // const heading = [['Ref Number'],['Item Description'],["Amount"]];
    // XLSX.utils.sheet_add_aoa(worksheet, [heading], { origin: 'A1' });

    // Set column widths
    const columnWidths = [{ wch: 20 }, { wch: 50 }, { wch: 30 }]; // Adjust the width values as needed
    worksheet["!cols"] = columnWidths;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TableData");
    XLSX.writeFile(workbook, "Statement of Financial Position(workings).xlsx");
  };

  function handleCloseModal() {
    setShowModal(false);
    setDetails([]);
  }

  function generateReport() {
    fetchReport();
  }
  function generateReportWorkings() {
    fetchReportWorkings();
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

  const formatDate = (inputDate) => {
    const dateParts = inputDate.split("-");
    const day = dateParts[2];
    const month = getMonthName(dateParts[1]);
    const year = dateParts[0];

    return `${day}-${month}-${year}`;
  };

  const getMonthName = (monthNumber) => {
    const months = [
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
    return months[parseInt(monthNumber, 10) - 1];
  };

  console.log("dettttttt", formatDate(date));
  return (
    <div>
      {/* <Loan /> */}
      <div className="w-[60%] mx-auto">
        <div className="mb-1">
          <Header headerShade={true} title={"Report Parameters"} />
        </div>
        <div
          className="w-full rounded-sm p-3"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="mb-4">
            <ListOfValue
              label={"CBR Return Code"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              data={cbrcode}
              onChange={(value) => {
                const selectedOption = cbrcode.find(
                  (option) => option.value === value
                );
                console.log(selectedOption.label.split("-")[1], "kaysoooooo");
                setTitle(selectedOption.label.split("-")[1]);
                setReport_code(value);
              }}
            />
          </div>
          <div className="mb-4">
            <InputField
              type={"date"}
              label={"Date As At"}
              labelWidth={"30%"}
              inputWidth={"30%"}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full justify-end gap-2 ">
            <ButtonComponent
              label={"Fetch CBR Workings Report"}
              onClick={generateReportWorkings}
            />
            <ButtonComponent
              label={"Fetch CBR Breakdown Report"}
              onClick={generateReport}
            />
            <ButtonComponent label={"Exit"} onClick={handleCloseModal} />
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal
          padding={0}
          opened={showModal}
          size="85%"
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={handleCloseModal}
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <div>
            <div className="flex justify-end pr-7 gap-2 mt-2">
              <span className="">
                <ButtonComponent label={"Print Report"} onClick={handlePrint} />
              </span>
              <span>
                <ButtonComponent
                  label={"Download Excel"}
                  onClick={handleExportToExcel}
                />
              </span>
              <span>
                <ButtonComponent
                  label={"Exit"}
                  onClick={handleCloseModal}
                  buttonWidth={"40px"}
                />
              </span>
            </div>
            <div className="px-1" ref={componentRef}>
              <div
                className="pt-[50px]"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
              </div>
              <div className="flex justify-end pr-7 mb-1">
                <span className="mr-2">
                  <p>
                    {`Year to Date : `}
                    <b>{`${formatDate(date)}`}</b>
                  </p>
                </span>
              </div>
              <div className="sticky top-0 w-full">
                <Header
                  backgroundColor={"#0580c0"}
                  title={`${title} (BREAKDOWN)`}
                />
              </div>
              <div className="">
                <table className="w-full border overflow-y-scroll  border-gray-300 rounded-sm ">
                  <thead className="bg-gray-300 sticky top-[31px]">
                    <tr className="bg-blue-200 position-sticky ">
                      <th className="py-2 px-4 text-left font-semibold">
                        Ref Number
                      </th>
                      <th className="py-2 px-4 text-left font-semibold">
                        Item Description
                      </th>
                      <th className="py-2 px-4 text-center font-semibold">
                        Amount
                      </th>
                      <th className="py-2 px-4 text-left font-semibold">
                        {"    "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((detail, index) => {
                      return (
                        <tr
                          className={`${
                            detail.level_id === "H"
                              ? "font-bold border-t border-b border-gray-300"
                              : detail.level_id === "T"
                              ? "font-semibold"
                              : ""
                          } ${
                            detail.level_id === "H" || detail.level_id === "T"
                              ? "bg-gray-100"
                              : "bg-white"
                          }`}
                        >
                          <td className="text-center">
                            {detail.group_id == "null" ? " " : detail.group_id}
                          </td>
                          <td className="py-2 px-4">{detail.item_descrp}</td>
                          {detail.level_id === "H" ? (
                            <td></td>
                          ) : (
                            <td className="py-2 px-4 text-right">
                              {formatNumber(detail.closing_balance_today)}
                            </td>
                          )}
                          <td className="py-2 px-4">{"         "}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      {showModalWorkings ? (
        <Modal
          padding={0}
          opened={showModalWorkings}
          size="85%"
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => {
            setShowModalWorkings(false);
          }}
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <div>
            <div className="flex justify-end pr-7 gap-2 mt-2">
              <span className="">
                <ButtonComponent label={"Print Report"} onClick={handlePrint} />
              </span>
              {/* <span>    
        <ButtonComponent label={"Download Excel"}
      onClick={handleExportToExcelWorkings}
      />
      </span> */}
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
            <div className="px-1" ref={componentRef}>
              <div
                className="pt-[50px]"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
              </div>
              <div className="flex justify-end pr-7 mb-1">
                <span className="mr-2">
                  <p>
                    {`Year to Date : `}
                    <b>{`${formatDate(date)}`}</b>
                  </p>
                </span>
              </div>
              <div className="sticky top-0 w-full">
                <Header
                  backgroundColor={"#0580c0"}
                  //  headerShade={true}
                  title={`${title} (WORKINGS)`}
                  //  closeIcon={<AiOutlineCloseCircle size={18} />}
                  //  handleClose={handleCloseModal}
                />
              </div>
              <div className="w-full">
                <div className="w-full border border-gray-300 rounded-sm ">
                  <div className="bg-gray-300 sticky top-[31px]">
                    <div className="bg-blue-200  flex ">
                      <div className="py-2 px-4 text-left font-semibold w-[20%]">
                        Account Number
                      </div>
                      <div className="py-2 px-4 text-center font-semibold w-[60%]">
                        Item Description
                      </div>
                      <div className="py-2 px-4 text-center font-semibold w-[20%]">
                        Amount
                      </div>
                      {/* <div className='py-2 px-4 text-left font-semibold w-[5%]'>{"    "}</div> */}
                    </div>
                  </div>
                  <div>
                    {details.map((i, index) => {
                      return (
                        <div className="w-full">
                          <div className="text-center w-full font-bold bg-gray-100 p-1">
                            {i.item_descrp}
                          </div>
                          {i.data.map((j) => {
                            return (
                              <div className="flex items-center justify-between border-b border-gray-300 hover:bg-blue-200">
                                <div className="w-[20%] text-center">
                                  {j.acct_link}
                                </div>
                                <div className="w-[60%] text-center">
                                  {j.account_descrp}
                                </div>
                                <div className="w-[20%] text-right mr-2">
                                  {formatNumber(j.closing_balance_today_frgn)}
                                </div>
                                {/* <div className='w-[5%]'>{" "}</div> */}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                    {/* {details.map((detail,index)=>{
          return(<tr className={`${
            (detail.level_id === 'H') ? 'font-bold border-t border-b border-gray-300' : (detail.level_id === 'T') ? "font-semibold" : ''
        } ${(detail.level_id === 'H' || detail.level_id === 'T') ? 'bg-gray-100' : 'bg-white'}`}>
          <td className='text-center'>{detail.group_id=="null" ? " " : detail.group_id}</td>
            <td className='py-2 px-4'>{detail.item_descrp}</td>
            {detail.level_id === "H" ? <td></td> : <td className='py-2 px-4 text-right'>{formatNumber(detail.closing_balance_today)}</td>}
            <td className='py-2 px-4'>{"         "}</td>
            </tr>)
        })
      } */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
export default StatementOfFinancialReport;
