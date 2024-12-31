import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { Modal } from "@mantine/core";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { useReactToPrint } from "react-to-print";
import coop from "../../../../../assets/coop.png";
import CustomTable from "../../../../../components/others/customtable";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function PrintStatement({
  // fn,
  accountNumber,
  // personalDetails,
  // data,
  handleClose,
  showModal,
  accountName,
  bookBalance,
  unclearedBalance,
  product,
  currency,
  clearedBalance,
  // currentDate,
  isHidden,
  setClose,
  newTotal,
  end_date,
  start_date,
  formatDate,
  formatDate2,
  setTotalPages3,
  balance_brought_forward,
}) {
  // states
  const [reportsData, setReportsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [load, setload] = useState(false);

  // let userInfo = JSON.localStorage("userInfo")

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  // print functionality
  const componentRef = useRef();

  // let finalData = [];
  // local storage
  const branch = JSON.parse(localStorage.getItem("userInfo"))?.branch;

  // number formatter
  function formatNumber(num) {
    if (num === undefined || num === "") {
      return " ";
    } else {
      const formatted =
        num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      return formatted;
    }
  }

  const printStatementHeaders = [
    "Posting Date",
    "Value Date",
    "Transaction Details",
    "Document Reference",
    "Debit",
    "Credit",
    "Balance",
  ];

  useEffect(() => {
    setload(true);

    axios
      .post(
        API_SERVER + "/api/account-statement-request",
        {
          report: "true",
          account_number: "004001100248250119",
          // account_number: "004001110312700168",
          // account_number: accountNumber,
          start_date: "21-FEB-2019",
          // start_date: "20-JAN-2018",
          end_date: "",
          // current_date: currentDate,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        // console.log(response, "dennis");
        let totalDebit = 0;
        let totalCredit = 0;

        const arr = [];
        response.data?.forEach((i, key) => {
          // Add the values to the totals if they are not NaN
          const debit = parseFloat(i?.local_equivalent_db);
          const credit = parseFloat(i?.local_equivalent_cr);

          if (!isNaN(debit)) {
            totalDebit += debit;
          }

          if (!isNaN(credit)) {
            totalCredit += credit;
          }

          arr.push([
            <div className="whitespace-nowrap ps-3 text-center">
              {formatDate2(i?.voucher_date)}
            </div>,
            <div className="whitespace-nowrap  text-center">
              {formatDate2(i?.value_date)}
            </div>,
            <div>{i?.transaction_details}</div>,
            <div className="text-left">{i?.document_ref}</div>,
            <div className="text-right">
              {i?.local_equivalent_db === null
                ? ""
                : i?.local_equivalent_db === " "
                ? ""
                : formatNumber(parseInt(i?.local_equivalent_db))}
            </div>,
            <div className="text-right">
              {i?.local_equivalent_cr === null
                ? ""
                : i?.local_equivalent_cr === " "
                ? ""
                : formatNumber(parseInt(i?.local_equivalent_cr))}
            </div>,

            <div className="text-right pe-[30px]">
              {formatNumber(parseInt(i?.balance))}
            </div>,
          ]);
        });

        const balanceBroughtForward = [
          <div></div>,
          <div></div>,
          <div className="uppercase">
            {balance_brought_forward ? "Balance brought forward" : ""}
          </div>,
          <div></div>,
          <div></div>,
          <div></div>,
          <div className="text-right pe-[30px]">
            {balance_brought_forward
              ? formatNumber(parseFloat(balance_brought_forward))
              : ""}
          </div>,
        ];

        const newArray = [
          <div></div>,
          <div></div>,
          <div></div>,
          <div
            style={{
              height: "40px",
              display: "grid",
              placeItems: "center",
              fontWeight: "700",
              textDecoration: "underline",
            }}
          >
            Total:
          </div>,
          <div
            style={{
              backgroundColor: "#a8ffcf",
              height: "40px",
              display: "grid",
              placeItems: "center",
              fontWeight: "700",
              borderRadius: "5px",
            }}
          >
            {formatNumber(totalDebit)}
          </div>,
          <div
            style={{
              backgroundColor: "#a8ffcf",
              height: "40px",
              display: "grid",
              placeItems: "center",
              fontWeight: "700",
              borderRadius: "5px",
            }}
          >
            {formatNumber(totalCredit)}
          </div>,
          <div></div>,
        ];

        setReportsData([balanceBroughtForward, ...arr, newArray]);
        setload(false);
      })
      .catch((err) => {
        setload(false);
        console.error(`error here : ${err}`);
      });
  }, [showModal, isHidden]);

  const generateExcel = () => {
    // Acquire Data (reference to the HTML table)
    const table_elt = document.getElementById("container");

    // Extract Data (create a workbook object from the table)
    const workbook = XLSX.utils.table_to_book(table_elt);

    // Process Data (add a new row)
    // var ws = workbook.Sheets["Sheet1"];
    // XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], {
    //   origin: -1,
    // });

    // Package and Release Data (writeFile tries to write and save an XLSB file)
    XLSX.writeFile(workbook, "Account_Statement.xlsb");
  };

  // console.log(reportsData, "derrick");

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   onAfterPrint: () => setZoom(1),
  //   pageStyle: ` @page { size: auto; margin: 11mm 17mm 17mm 17mm; @top-right-corner { content: "Page " counter(page); } }`,
  //   documen
  const [totalPages2, setTotalPages2] = useState("");

  const doc = new jsPDF({
    orientation: "portrait", // or 'landscape'
    unit: "mm",
    format: "a4", // Set a smaller page size, e.g., A4
  });
  const calculateTotalPages = () => {
    const contentHeight = componentRef?.current?.offsetHeight; // Height of the content
    const pageHeight = 1000; // Height of each printed page (adjust as needed)
    const totalPages = Math.ceil(contentHeight / pageHeight);
    setTotalPages3(totalPages);

    setTimeout(() => {
      setClose(false);
    }, 100);
  };

  console.log(totalPages2, "torsco");
  // });
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setZoom(1),
  });

  //   pageStyle: `
  //   @media print {
  //     body * {
  //       margin: 0 !important;
  //     }
  //   }
  // `,
  const handleZoom = () => setZoom(0.5);

  // function generatePDF() {
  //   // Add content from the div to the PDF
  //   const element = document.getElementById("pdf-content");
  //   let pWidth = doc.internal.pageSize.width; // 595.28 is the width of a4
  //   let srcWidth = document.getElementById("pdf-content")?.scrollWidth;
  //   let margin = 18; // narrow margin - 1.27 cm (36);
  //   let scale = (pWidth - margin * 2) / srcWidth;
  //   const totalPages = doc.internal.getNumberOfPages();
  //   doc.html(element, {
  //     x: margin,
  //     y: margin,
  //     html2canvas: {
  //       scale: scale,
  //     },
  //     callback: function (doc) {
  //       // Loop through each page to add page numbers in the header
  //       // for (let i = 1; i <= totalPages; i++) {
  //       //   doc.setPage(i);
  //       //   doc.setFontSize(5);

  //       //   // Set header text
  //       //   const headerText = `Page ${i} of ${totalPages}`;

  //       //   // Calculate x and y coordinates for header
  //       //   // const textWidth =
  //       //   //   doc.getStringUnitWidth(headerText) * doc.internal.getFontSize();
  //       //   // const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
  //       //   // const headerX = textOffset;
  //       //   // const headerY = 5;

  //       //   // Add header to each page
  //       //   // doc.text(headerText, headerX, headerY);
  //       // }
  //       // Set the zoom factor to 1 (100% zoom)
  //       doc.save("document.pdf");
  //       console.log({ totalPages });
  //     },
  //     // scale: scale, // Adjust scale factor as needed
  //     // scale: 0.75, // Adjust scale factor as needed
  //   });
  //   // Save the PDF without zooming
  // }

  // function generatePDF() {
  //   const element = document.getElementById("pdf-content");
  //   const doc = new jsPDF(); // Initialize jsPDF instance
  //   let pWidth = doc.internal.pageSize.width;
  //   let srcWidth = document.getElementById("pdf-content")?.scrollWidth;
  //   let margin = 5;
  //   // let margin = 18;
  //   let scale = (pWidth - margin * 2) / srcWidth;
  //   const totalPages = doc.internal.getNumberOfPages();
  //   console.log({ totalPages });

  //   doc.html(element, {
  //     x: margin,
  //     y: margin,
  //     html2canvas: {
  //       scale: scale,
  //     },
  //     callback: function (doc) {
  //       const totalPages = doc.internal.getNumberOfPages();

  //       // Loop through each page to add page numbers in the header
  //       for (let i = 1; i <= totalPages; i++) {
  //         doc.setPage(i);

  //         // Set header text
  //         const headerText = `Page ${i} of ${totalPages}`;

  //         // Calculate x and y coordinates for header
  //         // const textWidth =
  //         //   doc.getStringUnitWidth(headerText) * doc.internal.getFontSize();
  //         // const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
  //         // const headerX = textOffset;
  //         // const headerY = 10;

  //         // // Add header to each page
  //         // doc.text(headerText, headerX, headerY);

  //         // Calculate x and y coordinates for header
  //         const textWidth =
  //           doc.getStringUnitWidth(headerText) * doc.internal.getFontSize();
  //         const textOffset = doc.internal.pageSize.width - textWidth - margin;
  //         const headerX = textOffset;
  //         const headerY = doc.internal.pageSize.height - margin;

  //         // Add header to each page
  //         doc.text(headerText, headerX, headerY);
  //       }

  //       // Save the PDF
  //       // doc.save("document.pdf");

  //       // open the iframe
  //       const pdfDataUri = doc.output("datauristring");
  //       const iframe = document.createElement("iframe");
  //       iframe.src = pdfDataUri;
  //       document.body.appendChild(iframe);
  //     },
  //   });
  // }

  console.log({ doc });

  // function generatePDF() {
  //   const doc = new jsPDF();

  //   // Add content from the div to the PDF
  //   const element = document.getElementById("pdf-content");

  //   // Define the width and height of the content element
  //   const width = 800; // Adjust this value as needed
  //   const height = 600; // Adjust this value as needed

  //   doc.html(element, {
  //     callback: function (doc) {
  //       const totalPages = doc.internal.getNumberOfPages();

  //       // Loop through each page to add page numbers in the header
  //       for (let i = 1; i <= totalPages; i++) {
  //         doc.setPage(i);

  //         // Set header text
  //         const headerText = `Page ${i} of ${totalPages}`;

  //         // Calculate x and y coordinates for header
  //         const textWidth =
  //           doc.getStringUnitWidth(headerText) * doc.internal.getFontSize();
  //         const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
  //         const headerX = textOffset;
  //         const headerY = 10;

  //         // Add header to each page
  //         doc.text(headerText, headerX, headerY);
  //       }
  //     },
  //     x: 0,
  //     y: 0,
  //     html2canvas: {
  //       width: width, // Set the width of the content element
  //       height: height, // Set the height of the content element
  //     },
  //     scale: 0.75, // Adjust scale factor as needed
  //   });

  //   // Save the PDF
  //   doc.save("document.pdf");
  // }

  // -------here
  // function generatePDF() {
  //   const element = document.getElementById("pdf-content");
  //   const doc = new jsPDF(); // Initialize jsPDF instance
  //   let pWidth = doc.internal.pageSize.width;
  //   let srcWidth = document.getElementById("pdf-content")?.scrollWidth;
  //   let margin = 5;
  //   let scale = (pWidth - margin * 2) / srcWidth;
  //   const totalPages = doc.internal.getNumberOfPages();
  //   console.log({ totalPages });

  //   doc.html(element, {
  //     x: margin,
  //     y: margin,
  //     html2canvas: {
  //       scale: scale,
  //     },
  //     callback: function (doc) {
  //       const totalPages = doc.internal.getNumberOfPages();

  //       // Loop through each page to add page numbers in the header
  //       for (let i = 1; i <= totalPages; i++) {
  //         doc.setPage(i);

  //         // Set header text
  //         const headerText = `Page ${i} of ${totalPages}`;

  //         // Calculate x and y coordinates for header
  //         const textWidth =
  //           doc.getStringUnitWidth(headerText) * doc.internal.getFontSize();
  //         const textOffset = doc.internal.pageSize.width - textWidth - margin;
  //         const headerX = textOffset;
  //         const headerY = doc.internal.pageSize.height - margin;

  //         // Add header to each page
  //         doc.text(headerText, headerX, headerY);
  //       }

  //       // Save the PDF
  //       // doc.save("document.pdf");

  //       // Open the PDF in an iframe
  //       // Save the PDF as Blob
  //       const string = doc.output("datauristring");
  //       const embed =
  //         "<embed width='100%' height='100%' src='" + string + "'/>";
  //       const x = window.open();
  //       if (x) {
  //         x.document.open();
  //         x.document.write(embed);
  //         x.document.close();
  //       } else {
  //         console.log("bro");
  //       }
  //     },
  //   });
  // }
  console.log({ doc });

  useEffect(() => {
    if (reportsData?.length > 0) {
      setTimeout(() => {
        calculateTotalPages();
      }, 200);
    }
  }, [isHidden, reportsData]);

  console.log({ isHidden, showModal });

  return (
    <div>
      <Modal
        opened={`${
          isHidden === true ? true : showModal === true ? true : false
        }`}
        trapFocus={false}
        size={"80%"}
        padding={0}
        className={`${isHidden ? "opacity-0" : "opacity-100"}`}
        withCloseButton={false}
        onClose={handleClose}
      >
        <div style={{ zoom: 0.68 }}>
          <div
            style={{
              //   display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
            className="flex space-x-5"
          >
            <ButtonComponent
              label={"Print Report"}
              // buttonWidth={"100px"}
              onClick={() => {
                setTimeout(() => {
                  handlePrint();
                }, 200);
                handleZoom();
              }}
              buttonHeight={"40px"}
              buttonWidth={"200px"}
            />

            <ButtonComponent
              label={"Download To Excel"}
              // buttonWidth={"100px"}
              onClick={generateExcel}
              buttonHeight={"40px"}
              buttonWidth={"200px"}
            />
          </div>

          {/* body of report */}
          <div ref={componentRef} id={"pdf-content"}>
            <div
              className="space-y-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              <div className="space-y-2 mt-[40px]">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                  }}
                >
                  COOPTECH
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    textDecoration: "capitalize",
                  }}
                >
                  Branch : {branch}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    textDecoration: "capitalize",
                  }}
                >
                  Currency : {currency}
                </div>

                <div style={{ fontSize: "15px" }}>
                  Run Date: {formatDate(formattedDate)}
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    display: "flex",
                    textDecoration: "capitalize",
                  }}
                >
                  From :{" "}
                  <span className="font-bold ms-2 me-4">
                    {formatDate2(start_date)}
                  </span>{" "}
                  To :{" "}
                  <span className=" ms-2 font-bold">
                    {formatDate2(end_date)}
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <br />

            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flex: 1 }}>
                <div style={{ flex: 0.02 }}></div>
                <div style={{ flex: 0.96 }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      rowGap: "15px",
                      padding: "0px 5px 10px 5px",
                    }}
                  >
                    <InputField
                      label="Account Name  :"
                      labelWidth={"25%"}
                      inputWidth={"50%"}
                      // value={stateOne.description}
                      value={accountName}
                      id={"description"}
                      readOnly
                    />
                    <InputField
                      label="Book Balance  :"
                      labelWidth={"45%"}
                      inputWidth={"40%"}
                      // value={stateOne.availableBalance}
                      value={bookBalance}
                      readOnly
                      id={"description"}
                    />
                    <InputField
                      label="Account Number  :"
                      labelWidth={"25%"}
                      inputWidth={"50%"}
                      value={accountNumber}
                      readOnly
                      id={"description"}
                    />
                    <InputField
                      label="Uncleared Balance  :"
                      labelWidth={"45%"}
                      inputWidth={"40%"}
                      // value={stateOne.unclearedBalance}
                      value={unclearedBalance}
                      id={"description"}
                      //   value={personalDetails?.customer_number}
                      readOnly
                    />
                    <InputField
                      label="Product  :"
                      labelWidth={"25%"}
                      inputWidth={"50%"}
                      value={product}
                      // value={stateOne.product}
                      id={"description"}
                      //   value={personalDetails?.name}
                      readOnly
                    />

                    <InputField
                      label="Cleared Balance  :"
                      labelWidth={"45%"}
                      inputWidth={"40%"}
                      value={clearedBalance}
                      id={"description"}
                      //   value={personalDetails?.customer_number}
                      readOnly
                    />
                  </div>
                </div>
                <div style={{ flex: 0.02 }}></div>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-[85%]">
                <div className="flex justify-between">
                  <p className="text-lg flex">
                    <span className="font-semibold">Account Name :</span>{" "}
                    <span>100000000</span>
                  </p>
                  <p className="text-lg flex">
                    <span className="font-semibold">Book Balance : </span>{" "}
                    <span>2000000</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg flex">
                    <span className="font-semibold">Account Name :</span>{" "}
                    <span>100000000</span>
                  </p>
                  <p className="text-lg flex">
                    <span className="font-semibold">Book Balance : </span>{" "}
                    <span>2000000</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg flex">
                    <span className="font-semibold">Account Name :</span>{" "}
                    <span>100000000</span>
                  </p>
                  <p className="text-lg flex">
                    <span className="font-semibold">Book Balance : </span>{" "}
                    <span>2000000</span>
                  </p>
                </div>
              </div>
            </div>

            {/* table */}
            <div className="px-[10px]" style={{ zoom: zoom }} id={"container"}>
              <CustomTable
                headers={printStatementHeaders}
                data={reportsData}
                load={load}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PrintStatement;
