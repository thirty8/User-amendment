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
import { SiMicrosoftexcel } from "react-icons/si";
import { IoExitOutline } from "react-icons/io5";
import { AiFillPrinter } from "react-icons/ai";
// import TrialBalance from "./trialbalance";

function TrialBalance({clearModal,currencylov,reportName}) {
  const componentRef = useRef();
//   const [details, setDetails] = useState([]);
  const [customTableArray, setCustomTableArray] = useState([]);
  const [showModalWorkings, setShowModalWorkings] = useState(false);
  const [currency, setCurrency] = useState("");
  const [reportDate, setReportDate] = useState("");
  const[aa, setAa] = useState([]);

  let lcyBalanceSum = 0;
  let creditSum = 0;
  let debitSum = 0;
  let totalcount = 0;
  let totalsArray = [];

  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

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

  console.log(aa,"deeezydothis")
  async function fetchDetails() {
    let response = await axios.post(
      API_SERVER + "/api/get-trial-balance-translated",
      { currency: currency,
        reportDate: formatDate(reportDate)
      },{headers}
    );

    let results = response.data
    

    if (response.data.length > 0) {
      let arr = [];
      response.data?.map((i) => {
          let glBalanceSum = 0;
         
          creditSum = 0;
          debitSum = 0;
          totalcount += parseFloat(results.length);
          totalsArray.push(lcyBalanceSum)
          lcyBalanceSum = 0;
        setAa(totalsArray)
        console.log(totalsArray,"sstotalsArray")
        arr.push([
            
          <span className="font-semibold text-lg text-gray-700">
            {i.item_descrp}
          </span>,
          "",
          "",
          "",
          "",
          "",
        ]);
        i.data.map((e) => {
          glBalanceSum += parseFloat(e.fcy_balance);
          lcyBalanceSum += parseFloat(e.lcy_balance);
          if (e.cr == 'null'){
            creditSum += parseFloat(0);
          }
          else{
            creditSum += parseFloat(e.cr);
          }

          if (e.db == 'null'){
            debitSum += parseFloat(0);
          }
          else{
            debitSum += parseFloat(e.db);
          }
      
          arr.push([
            e.acct_link,
            e.account_descrp,
            e.iso,
            formatNumber(e.fcy_balance),
            e.exchange_rate,
            formatNumber(e.lcy_balance),
            formatNumber(e.db),
            formatNumber(e.cr),
          ]);
        });

        arr.push([
          <span className="font-semibold text-gray-700">{i.data.length}</span>,
          "",
          "",
          "",
          "",
          <span className="font-semibold text-gray-700">
            {formatNumber(lcyBalanceSum)}
          </span>,
            <span className="font-semibold text-gray-700">
            {formatNumber(debitSum)}
          </span>,
          <span className="font-semibold text-gray-700">
            {formatNumber(creditSum)}
          </span>
        ]);
        
      });
    //   arr.push([
    //     <span className="font-semibold text-gray-700">
    //       {`Count: ` + totalcount}
    //     </span>,
    //     "",
    //     <span className="font-semibold text-gray-700">{`Total: `}</span>,
    //     <span className="font-semibold text-gray-700">
    //       {formatNumber(totalGlBalanceSum)}
    //     </span>,
    //     <span className="font-semibold text-gray-700">
    //       {formatNumber(totalLcyBalanceSum)}
    //     </span>,
    //     <span className="font-semibold text-gray-700">
    //       {formatNumber(totalCreditSum)}
    //     </span>,
    //      <span className="font-semibold text-gray-700">
    //      {formatNumber(totalDebitSum)}
    //    </span>,
    //     "",
    //   ]);
    //   totalsArray.push([glBalanceSum])
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

  console.log(aa,"deezy")
  console.log(totalsArray,"totalsArray")

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
            <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // padding: "10px",
                  // border: "2px solid #d6d7d9",
                  borderRadius: "5px",
                }}
              >
                <div>
                  <ButtonComponent
                    label={"Close"}
                    buttonIcon={<IoExitOutline size={20} />}
                    buttonWidth={"90px"}
                    buttonHeight={"35px"}
                    buttonBackgroundColor={"black"}
                    onClick={() => {
                      setShowModalWorkings(false);
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <ButtonComponent
                      label="Print"
                      buttonWidth={"90px"}
                      buttonIcon={<AiFillPrinter size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"#0063d1"}
                      onClick={handlePrint}
                    />
                    <ButtonComponent
                      label="Download Excel"
                      buttonWidth={"160px"}
                      buttonIcon={<SiMicrosoftexcel size={20} />}
                      buttonHeight={"35px"}
                      buttonBackgroundColor={"green"}
                      onClick={generateExcel}
                    />
                </div>
                {/* <div></div> */}
              </div>

                  {/* <div style={{}}> */}
                   
        {/*           </div> */}
              {/* <div className="flex justify-end pr-7 gap-2 mt-2 ">
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
              </div> */}
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
                        "GL Balance",
                        "Rate",
                        "LCY Balance",
                        "Debit",
                        "Credit",
                      ]}
                      data={customTableArray}
                      style={{
                          columnAlignLeft: [1,2],
                        columnAlignCenter: [3,5],
                         columnAlignRight: [4,5,6,7,8]
                      }}
                    />
                  </div>
                </div>
                {/* {totalsArray?.toString()} */}
                <br></br>
                {customTableArray.length > 0 ? 
      <div style={{display:"flex",marginBottom:"2px",zoom:0.85 }}>
        <div style={{flex:0.55}}></div>
        <div style={{flex:0.45,backgroundColor:"#F0F8FF"}}>
              <div style={{display:"flex",padding:"1px 0px"}} className="font-bold">
                <div style={{flex:0.25,backgroundColor:"white",fontSize:"18px",paddingLeft:"5px"}}> ASSETS : </div>
                <div style={{display:"flex",justifyContent:"flex-start",paddingLeft:"15px",paddingRight:"5px",flex:0.75}} className="font-semibold border-b border-gray-300">{formatNumber(aa[2])}</div>
             </div>
             <div style={{display:"flex",padding:"1px 0px"}}  className="font-bold">
                <div style={{flex:0.25,backgroundColor:"white",fontSize:"18px",paddingLeft:"5px"}}> LIABILITY : </div>
                <div style={{display:"flex",justifyContent:"flex-end",paddingRight:"5px",paddingLeft:"15px",flex:0.75}} className="font-semibold border-b border-gray-300">{formatNumber(aa[1])}</div>
             </div>
             <div style={{display:"flex",padding:"1px 0px"}}  className="font-bold">
                <div style={{flex:0.25,backgroundColor:"white",fontSize:"18px",paddingLeft:"5px"}}> EQUITY : </div>
                <div style={{display:"flex",justifyContent:"flex-end",paddingRight:"5px",paddingLeft:"15px",flex:0.75}} className="font-semibold border-b border-gray-300">{formatNumber(aa[3])}</div>
             </div>
             <div style={{display:"flex",padding:"1px 0px"}}  className="font-bold">
                <div style={{flex:0.25,backgroundColor:"white",fontSize:"18px",paddingLeft:"5px"}}> INCOME : </div>
                <div style={{display:"flex",justifyContent:"flex-end",paddingRight:"5px",paddingLeft:"15px",flex:0.75}} className="font-semibold border-b border-gray-300">{formatNumber(aa[4])}</div>
             </div>
             <div style={{display:"flex",padding:"1px 0px"}}  className="font-bold">
                <div style={{flex:0.25,backgroundColor:"white",fontSize:"18px",paddingLeft:"5px"}}> EXPENSE : </div>
                <div style={{display:"flex",justifyContent:"flex-start",paddingRight:"5px",paddingLeft:"15px",flex:0.75}} className="font-semibold border-b border-gray-300">{formatNumber(aa[5])}</div>
             </div>
             <div style={{display:"flex",padding:"1px 0px"}}  className="font-bold">
                <div style={{flex:0.25,backgroundColor:"white",fontSize:"18px",paddingLeft:"5px"}}> TOTALS : </div>
                <div style={{display:"flex",flex:0.75,paddingRight:"5px",paddingLeft:"15px",backgroundColor:"#bdd5e8"}}>
                    <div style={{display:"flex",flex:0.5,justifyContent:"flex-start"}}>{formatNumber(aa[2] + aa[5])}</div>
                    <div style={{display:"flex",flex:0.5,justifyContent:"flex-end"}}>{formatNumber(aa[1] + aa[3] + aa[4])}</div>
                </div>
             </div>
              {/* <div style={{}} className="font-semibold">LIABILITY : {arr[0]}</div>
              <div style={{}} className="font-semibold">EQUITY :{arr[2]}</div>
              <div style={{}} className="font-semibold">INCOME :{arr[6]}</div>
              <div style={{}} className="font-semibold">EXPENSE : {arr[7]}</div>
              <div style={{}} className="font-semibold">TOTALS :</div> */}
        </div>
      </div> 
      : null}
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

export default TrialBalance;
