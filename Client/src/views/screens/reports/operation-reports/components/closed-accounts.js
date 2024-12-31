import React, { useState, useRef, useEffect } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../../components/others/customtable";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import Header from "../../../../../components/others/Header/Header";
import { Modal, ScrollArea } from "@mantine/core";
import { SiMicrosoftexcel } from "react-icons/si";
import { AiFillPrinter } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { TbWorldDownload } from "react-icons/tb";
import coop from "../../../../../assets/coop.png";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../../config/constant";

function CloseAccount({ clearModal, reportName, formatDate }) {
  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const componentRef = useRef();
  const [showModalWorkings, setShowModalWorkings] = useState(false);
  const [details, setDetails] = useState([]);
  const [myObj, setMyObj] = useState({
    branch_code: "",
    start_date: "",
    end_date: "",
  });
  const [branchLOV, setBranchLOV] = useState([]);

  useEffect(() => {
    try {
      //  branch
      async function branchFunc() {
        return await axios.post(
          API_SERVER + "/api/closed-accounts-report",
          { branch: "true", branch_code: "" },
          { headers }
        );
      }

      Promise.all([branchFunc()]).then((response) => {
        setBranchLOV(response[0].data);
      });
    } catch (err) {
      console.error("error :" + err);
    }
  }, []);

  function generateReportWorkings() {
    if (myObj?.branch_code === "" || myObj?.branch_code === null) {
      axios
        .post(
          API_SERVER + "/api/get-error-message",
          { code: "01308" },
          { headers }
        )
        .then((response) => {
          if (response) {
            Swal.fire({
              text: response?.data,
              icon: "error",
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }
        });
    } else if (myObj?.start_date === "" || myObj?.start_date === null) {
      axios
        .post(
          API_SERVER + "/api/get-error-message",
          { code: "05883" },
          { headers }
        )
        .then((response) => {
          if (response) {
            Swal.fire({
              text: response?.data,
              icon: "error",
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }
        });
    } else {
      fetchDetails();
    }
  }

  console.log({
    start_date: formatDate(myObj?.start_date),
    end_date: formatDate(myObj?.end_date),
  });

  // Parse the input date
  const sDate = new Date();

  // // Add 1 day to the date
  // sDate.setDate(sDate.getDate() + 1);

  // Create an array of month abbreviations
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date in "dd-MMM-yyyy" format with lowercase month abbreviation
  const day = String(sDate.getDate()).padStart(2, "0");
  const month = monthAbbreviations[sDate.getMonth()]?.toUpperCase();
  const year = sDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  function formatDate(startDate) {
    // Parse the input date
    const sDate = new Date(startDate);

    if (isNaN(sDate)) {
      return ""; // Return an empty string if the date is invalid
    }

    // // Add 1 day to the date
    // sDate.setDate(sDate.getDate() + 1);

    // Create an array of month abbreviations
    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Format the date in "dd-MMM-yyyy" format with lowercase month abbreviation
    const day = String(sDate.getDate()).padStart(2, "0");
    const month = monthAbbreviations[sDate.getMonth()]?.toUpperCase();
    const year = sDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === ".00") {
      return "";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf(".");

      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted =
          numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        return formattedInteger + decimalPart;
      }
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function fetchDetails() {
    console.log({ myObj });
    await axios
      .post(
        API_SERVER + "/api/closed-accounts-report",
        {
          fetch: "true",
          branch_code: myObj ? myObj?.branch_code : "",
          start_date: myObj ? formatDate(myObj?.start_date) : "",
          end_date: myObj ? formatDate(myObj?.end_date) : "",
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "enquiry");
        const arr = [];
        let sum = 0;
        const newArray = [];
        if (response?.data?.length > 0) {
          response?.data?.map((i) => {
            sum += i?.data?.length;
            const splitted = i?.item_descrp?.split("*");
            arr.push([
              <span className="font-semibold text-left">{`${splitted[0]} `}</span>,
              "",
              "",
              "",
              "",
              "",
              "",
            ]);
            arr.push([
              <span className="font-semibold text-left">{`${splitted[1]}`}</span>,
              "",
              "",
              "",
              "",
              "",
              "",
            ]);

            i?.data?.map((i) => {
              const {
                acct_link,
                account_descrp,
                shadow_balance_today,
                date_opened,
                closed_by,
                clos_app_by,
                date_account_closed,
              } = i;
              arr.push([
                acct_link,
                account_descrp,
                <span className="font-semibold text-right">
                  {" "}
                  {formatNumber(shadow_balance_today)}
                </span>,
                <span> {formatDate(date_opened)}</span>,

                `${
                  i?.closed_by === null
                    ? ""
                    : i?.closed_by === "null"
                    ? ""
                    : i?.closed_by
                }`,
                `${
                  i?.clos_app_by === null
                    ? ""
                    : i?.clos_app_by === "null"
                    ? ""
                    : i?.clos_app_by
                }`,
                <span> {formatDate(date_account_closed)}</span>,
              ]);
            });

            arr.push([
              "",
              <span className="font-semibold text-left capitalize">{`count per currency: ${i?.data?.length}`}</span>,
              "",
              "",
              "",
              "",
              "",
            ]);
            arr.push([
              "",
              <span className="font-semibold text-left capitalize">{`count per product: ${i?.data?.length}`}</span>,
              "",
              "",
              "",
              "",
              "",
            ]);
          });
          newArray.push([
            "",
            "",
            "",
            "",
            "",
            "",
            <span className="font-semibold text-left capitalize">{`count per branch: ${sum}`}</span>,
          ]);
          newArray.push([
            "",
            "",
            "",
            "",
            "",
            "",
            <span className="font-semibold text-left capitalize">{`count per report: ${sum}`}</span>,
          ]);

          setShowModalWorkings(true);
        } else {
          Swal.fire({
            text: "No data found, Kindly check parameters selected",
            icon: "error",
          });
        }
        setDetails([...arr, ...newArray]);
      })
      .catch((err) => {
        console.log(err);
      });
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
    XLSX.writeFile(workbook, "Close_Accounts.xlsb");
  }

  const handleOnChange = (name, value, name2, data) => {
    const selectedOption = data
      ?.find((i) => i.value === value)
      ?.label?.split("-")[1];

    if (data?.length === 0) {
      setMyObj((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setMyObj((prev) => ({
        ...prev,
        [name]: value,
        [name2]: selectedOption,
      }));
    }
  };

  console.log(myObj);
  return (
    <div>
      <div className="pb-[130px]">
        <div className="mb-1">
          <Header backgroundColor={"#0580c0"} title={"Report Parameters"} />
        </div>
        <div
          className="w-full border rounded-sm p-4"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="mb-4">
            <InputField
              label={"Current Report"}
              labelWidth={"30%"}
              inputWidth={"55%"}
              disabled={true}
              value={reportName?.toUpperCase()}
            />
          </div>
          <div className="mb-4 pt-1">
            <ListOfValue
              label={"Branch"}
              labelWidth={"30%"}
              inputWidth={"55%"}
              data={branchLOV}
              onChange={(value) =>
                handleOnChange("branch_code", value, "branch_name", branchLOV)
              }
              value={myObj ? myObj?.branch_code : ""}
            />
          </div>
          <div className="flex mb-4 pt-1 space-x-1">
            <span className="w-[50%]">
              <InputField
                type={"date"}
                label={"Start Date"}
                labelWidth={"60%"}
                inputWidth={"34%"}
                name={"start_date"}
                onChange={(e) =>
                  handleOnChange(e.target.name, e.target.value, null, [])
                }
                value={myObj ? myObj?.start_date : ""}
              />
            </span>
            <span className="w-[50%]">
              <InputField
                type={"date"}
                label={"End Date"}
                labelWidth={"35%"}
                inputWidth={"35%"}
                name={"end_date"}
                onChange={(e) =>
                  handleOnChange(e.target.name, e.target.value, null, [])
                }
                value={myObj ? myObj?.end_date : ""}
              />
            </span>
          </div>

          <div className="flex w-full justify-end gap-2 pt-[20px]">
            <ButtonComponent
              label={"Fetch Report"}
              onClick={generateReportWorkings}
              buttonHeight={"35px"}
              buttonIcon={<TbWorldDownload size={20} />}
              buttonBackgroundColor={"green"}
            />
            <ButtonComponent
              label={"Exit"}
              onClick={() => clearModal()}
              buttonHeight={"35px"}
              buttonIcon={<IoExitOutline size={20} />}
              buttonBackgroundColor={"#f04355"}
              buttonWidth={"70px"}
            />
          </div>

          {showModalWorkings && (
            <Modal
              padding={0}
              opened={showModalWorkings}
              size="90%"
              withCloseButton={false}
              trapFocus={false}
              transitionProps={"mounted"}
              onClose={() => {
                setShowModalWorkings(false);
              }}
              scrollAreaComponent={ScrollArea?.Autosize}
            >
              <div className="px-1 py-1">
                <div className="flex justify-end pr-7 gap-2 mt-2 ">
                  <span>
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
                      buttonIcon={<IoExitOutline size={20} />}
                      buttonWidth={"90px"}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"black"}
                      onClick={() => setShowModalWorkings(false)}
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
                  <p className="flex justify-center items-center mt-3 mb-1 capitalize">
                    Branch :{" "}
                    <span className="uppercase ms-2 font-semibold">
                      {" "}
                      {`${myObj ? myObj?.branch_name : ""}`}
                    </span>{" "}
                  </p>

                  <p className="flex justify-center items-center mt-3 mb-2 capitalize">
                    All closed accounts between{" "}
                    <span className="uppercase ms-2 me-2 font-semibold">
                      {" "}
                      {`${myObj ? formatDate(myObj?.start_date) : ""}`}
                    </span>{" "}
                    And
                    <span className="uppercase ms-2 font-semibold">{`${
                      myObj?.end_date !== ""
                        ? formatDate(myObj?.end_date)
                        : formattedDate
                    }`}</span>
                  </p>

                  <div className="mx-1" style={{ zoom: 0.9 }}>
                    <div className="sticky top-0 w-full">
                      <Header
                        backgroundColor={"#0580c0"}
                        title={"closed accounts"}
                      />
                    </div>

                    <div className="w-full" id="my-table-id">
                      <CustomTable
                        headers={[
                          "BBAN",
                          "Account Name",
                          "Balance",
                          "Date Opened",
                          "Closed By",
                          "Approved By",
                          "Closure Date",
                        ]}
                        style={{ columnAlignRight: [3] }}
                        data={details}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 justify-center">
                    <span>{`<<<<<<<<<<<<<<<<<<<<<<<<< End of Report >>>>>>>>>>>>>>>>>>>>>>>>>`}</span>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default CloseAccount;
