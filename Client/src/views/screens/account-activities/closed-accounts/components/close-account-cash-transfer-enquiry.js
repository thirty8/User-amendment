
import { React, useState, useEffect, startTransition } from "react";
import HeaderComponent from "../../../lending/components/header/HeaderComponent";
import InputField from "../../../../../components/others/Fields/InputField";
import { Modal } from '@mantine/core';
import CustomTable from "../../../../../components/others/customtable";
import { API_SERVER } from "../../../../../config/constant";
import moment from "moment";
import { Loader } from '@mantine/core';
import ButtonType from "../../../../../components/others/Button/ButtonType";

import axios from "axios";
import ScreenBase from "../../m/ScreenBase";
import "./close-account-cash-transfer-enquiry.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import swal from "sweetalert";



function CloseAccountCashTransferEnquiry() {
  // const [cashEnquiry, setCashEnquiry] = useState([]);
  const [refrNumber, setRefrNumber] = useState("");
  const [clsaccount, setClsAccount] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [cashEnquiryData, setCashEnquiryData] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [iLoading, setiLoading] = useState(true);
  const [batchno, setbatchno] = useState(true);




  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // useEffect(() => {
  // function cashTrans(){


    async function CashEnquiry() {
      try {
        const response = await axios
          .post(
            //view for populating the table
            API_SERVER + "/api/closed-cash-transfer-approval-table",
            {


              referenceNo: refrNumber,
              clseAcct: clsaccount,
              branchCode: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,

            },
            {
              headers,
            }
          )
          .then(function (response) {
            console.log(response.data, "here");
            setCashEnquiryData(response.data);

            // if (!messageData.includes("INF - 06682")) {
            //   swal({
            //     title: "  Fail",
            //     text: messageData,
            //     icon: "warning",
            //     buttons: "OK",
            //     dangerMode: true,
            //   });
            // } else {
            //   swal({
            //     title: "Success",
            //     text: messageData,
            //     icon: "success",
            //     buttons: "OK",
            //     dangerMode: false,
            //   });
            // }

          });
      }
      catch (error) {
        console.error(error);
      }
    }
  useEffect(() => {
    CashEnquiry();
  }, []);

  console.log(cashEnquiryData);

  const currentDate = moment().format("DD MMMM YYYY");

  // async function cashTransaction(e) {
  //   if (e.key === "Enter") {
  //     console.log("her i am");
  //     let response = await axios.post(
  //       API_SERVER + "/api/closed-cash-transfer-approval-table",
  //       {
  //         referenceNumber: refrNumber,
  //         closeAccount: clsaccount,
  //       },
  //       {
  //         headers,
  //       }
  //     );
  //     setCashEnquiry(response.data);
  //     console.log(response.data);
  //   }
  // }


  const handleButtonClick = () => {
    html2canvas(document.querySelector("#report")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("report.pdf");
    });
  };

  var cashEData = cashEnquiryData?.map((i) => {
    return [
      <div>{i?.REFERENCE_NO}</div>,
      <div>{i?.CLSE_ACCT}</div>,
      <div>{i?.CLSE_ACCT_DESC}</div>,
      <div>{i?.TRANSFER_ACCT}</div>,
      <div>{i?.TRANSFER_ACCT_DESC}</div>,
      <div>{i?.TRANSFER_CURRENCY_DESC}</div>,
      <div>{i?.TRANSFER_AMOUNT}</div>,
      <div>{i?.POSTING_DATE}</div>,




      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked === true) {
              setShowReport(true)
              console.log(i, "weeeeeeeeeeeeeeeeeeeeeeeeeeee");
              setIsChecked(false);
              setbatchno(i?.REFERENCE_NO);
              console.log(batchno, "hpw have i come ")

              // axios
              //   .post(

              //     API_SERVER + "/api/get-closed-account",
              //     {
              //       accountNumber: i.ACCOUNT_NUMBER,
              //     },
              //     {
              //       headers,
              //     }
              //   )
              //   .then((response) => {
              //     setclsdata(response.data[0]);
              //     console.log(response.data, "i am a weasel");
              //     console.log(clsdata);
              //     // dormantAccountFeeRow();
              //   });


            }
          }}

        />
      </div>,
    ];

  })

  function handleIframeLoad(){
    setiLoading(false);
  } 
  

  return (
    <div>
      {isChecked ? (
        <ScreenBase
          card_div1a={
            <div>
              <HeaderComponent
                title={"Search Parameters"} />
              <div
                style={{
                  display: "flex",
                  marginBottom: "15px",
                  marginLeft: "2px",
                  marginTop: "15px",
                }}
              >
                <div style={{ flex: "0.5" }}>
                  <InputField
                    label={"Reference Number"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    value={refrNumber}
                    onChange={(e) => {
                      setRefrNumber(e.target.value);
                    }}
                  onKeyDown={CashEnquiry}
                  />
                </div>

                <div style={{ flex: "0.5" }}>
                  <InputField
                    label={"Closed Account"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    value={clsaccount}
                    onChange={(e) => {
                      setClsAccount(e.target.value);
                    }}
                    onKeyDown={CashEnquiry}
                  />
                </div>
              </div>
            </div>
          }
          card_div2a={
            // <DataTable
            //   columns={[
            //     { name: "reference_no", label: "Reference Number" },
            //     { name: "clse_acct", label: "Close Account" },
            //     { name: "transfer_acct", label: "Tranfer Account Number " },
            //     // {name:"reference_no",label:"Tranfer Account Name "},
            //     { name: "transfer_currency", label: "Currency" },
            //     { name: "transfer_amount", label: "Transfer Amount" },
            //     { name: "posting_date", label: "Posted Date " },
            //     {
            //       name: "",
            //       label: "Select",
            //       options: {
            //         filter: false,
            //         sort: false,
            //         empty: true,
            //         customBodyRender: (tableMeta) => {
            //           return (
            //             <ButtonType
            //               type={"checkbox"}
            //               onChange={() => setIsChecked(!isChecked)}
            //               onClick={handleButtonClick}
            //             />



            //           );
            //         },
            //       },
            //     },
            //   ]}
            //   data={cashEnquiry}
            // />

            // <div>
            //   heloo
            // </div>

            <CustomTable

              headers={["Reference Number ", "Close Account", "Close Account Name", "Transfer Account", "Transfer Account Name", "Currency", "Transfer Amount", "Posting Date", "View Voucher"]}
              data={cashEData}


            // cashEData


            />
          }
        />
      ) : (

        <Modal
          title={
            <div className="font-semibold">
              Showing Report for Closed Account
            </div>
          }
          opened={showReport}
          onClose={() => {
            setShowReport(false);
            setiLoading(true);
            setIsChecked(true);
            console.log(batchno, "okurr");
          }}
          size={"80%"}
        >
          {iLoading && (
            <div className=" flex justify-center items-center h-[600px]">
              <span className="h-10 animate-bounce flex items-center font-semibold space-x-2">
                <Loader color="rgba(66, 66, 66, 1)" />
                <span>Loading...</span>
              </span>
            </div>
          )}
          huhuh {batchno?.substring(3 , batchno.length)}
          {/* batchno?.substring(3 , batchno.length) */}
          {parseInt(batchno.toString().slice(3))}
    
          <iframe
            onLoad={handleIframeLoad}
            className="w-full h-[600px]"
            src=
            // {`http://10.203.14.61:9002/reports/rwservlet?report=acctclosure_RECEIPT.rdf&destype=cache&desformat=pdf&server=rep_wls_reports_win-rg7u98m0qt8&cmdkey=login&paramform=no&btn=2021020213288`}


            {`http://10.203.14.185:9002/reports/rwservlet?report=acctclosure_RECEIPT.rdf&destype=cache&desformat=pdf&server=rep_wls_reports_WIN-NAU4INKFT3U&cmdkey=login&paramform=no&btn=202002252274`}
            // 202007142348saidu
            // 202007142348hassan
            // 2021020226163brms
            // 2021020213288UNIOINDEMO
           
          ></iframe> 
        </Modal>
        // 2021020226163
        
        // <div className="report">
        //   <div className="heading">
        //     <h1>Account Closure Cash Voucher</h1>
        //   </div>
        //   <div className="date">
        //     <p>Date: {new Date().toLocaleDateString()}</p>
        //   </div>

        //   <div className="account-details">
        //     <h2>Account Details</h2>
        //     <p>Account No: XXXXXXXX110024000135</p>
        //     <p>Account Name: &MRS R.E UNION17684</p>
        //     <p>Branch No: 001</p>
        //   </div>
        //   <div className="closure-details">
        //     <h2>Closure Details</h2>
        //     <p>Closure Branch: SHANZU BRANCH</p>
        //     <p>User ID: UNION SYSTEMS ADMINISTRATOR</p>
        //     <p>Closure Date: 02 February 2021</p>
        //     <p>Amount: 6,383,682.69</p>
        //   </div>
        //   <div className="instruction">
        //     <h2>Instructions</h2>
        //     <p>To be valid this Voucher must bear the CSO's stamp.</p>
        //     <p>Proceed to the Cashier to claim funds.</p>
        //   </div>
        //   <div className="signature">
        //     <p>Customer's Signature : .......................</p>
        //   </div>
        // </div>
      )}
    </div>
  );
}

export default CloseAccountCashTransferEnquiry;


































// oldd
// import { React, useState, useEffect, startTransition } from "react";
// import HeaderComponent from "../../../lending/components/header/HeaderComponent";
// import InputField from "../../../../../components/others/Fields/InputField";

// import CustomTable from "../../../../../components/others/customtable";
// import { API_SERVER } from "../../../../../config/constant";
// import moment from "moment";
// import ButtonType from "../../../../../components/others/Button/ButtonType";

// import axios from "axios";
// import ScreenBase from "../../m/ScreenBase";
// import "./close-account-cash-transfer-enquiry.css";
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import swal from "sweetalert";



// function CloseAccountCashTransferEnquiry() {
//   // const [cashEnquiry, setCashEnquiry] = useState([]);
//   const [refrNumber, setRefrNumber] = useState("");
//   const [clsaccount, setClsAccount] = useState("");
//   const [isChecked, setIsChecked] = useState(true);
//   const [cashEnquiryData, setCashEnquiryData] = useState([]);

//   const headers = {
//     "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };

//   // useEffect(() => {
//   // function cashTrans(){


//     async function CashEnquiry() {
//       try {
//         const response = await axios
//           .post(
//             API_SERVER + "/api/closed-cash-transfer-approval-table",
//             {


//               referenceNo: refrNumber,
//               clseAcctt: clsaccount,
//               branchCode: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,

//             },
//             {
//               headers,
//             }
//           )
//           .then(function (response) {
//             console.log(response.data, "here");
//             setCashEnquiryData(response.data);

//             // if (!messageData.includes("INF - 06682")) {
//             //   swal({
//             //     title: "  Fail",
//             //     text: messageData,
//             //     icon: "warning",
//             //     buttons: "OK",
//             //     dangerMode: true,
//             //   });
//             // } else {
//             //   swal({
//             //     title: "Success",
//             //     text: messageData,
//             //     icon: "success",
//             //     buttons: "OK",
//             //     dangerMode: false,
//             //   });
//             // }

//           });
//       }
//       catch (error) {
//         console.error(error);
//       }
//     }
//   useEffect(() => {
//     CashEnquiry();
//   }, []);

//   console.log(cashEnquiryData);

//   const currentDate = moment().format("DD MMMM YYYY");

//   // async function cashTransaction(e) {
//   //   if (e.key === "Enter") {
//   //     console.log("her i am");
//   //     let response = await axios.post(
//   //       API_SERVER + "/api/closed-cash-transfer-approval-table",
//   //       {
//   //         referenceNumber: refrNumber,
//   //         closeAccount: clsaccount,
//   //       },
//   //       {
//   //         headers,
//   //       }
//   //     );
//   //     setCashEnquiry(response.data);
//   //     console.log(response.data);
//   //   }
//   // }

//   const handleButtonClick = () => {
//     html2canvas(document.querySelector("#report")).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       pdf.addImage(imgData, "PNG", 0, 0);
//       pdf.save("report.pdf");
//     });
//   };

//   var cashEData = cashEnquiryData?.map((i) => {
//     return [
//       <div>{i?.REFERENCE_NO}</div>,
//       <div>{i?.CLSE_ACCT}</div>,
//       <div>{i?.CLSE_ACCT_DESC}</div>,
//       <div>{i?.TRANSFER_ACCT}</div>,
//       <div>{i?.TRANSFER_ACCT_DESC}</div>,
//       <div>{i?.TRANSFER_CURRENCY_DESC}</div>,
//       <div>{i?.TRANSFER_AMOUNT}</div>,
//       <div>{i?.POSTING_DATE}</div>,




//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <input
//           type="checkbox"
//           onChange={(e) => {
//             if (e.target.checked === true) {
//               console.log(i, "weeeeeeeeeeeeeeeeeeeeeeeeeeee");
//               setIsChecked(false);

//               // axios
//               //   .post(

//               //     API_SERVER + "/api/get-closed-account",
//               //     {
//               //       accountNumber: i.ACCOUNT_NUMBER,
//               //     },
//               //     {
//               //       headers,
//               //     }
//               //   )
//               //   .then((response) => {
//               //     setclsdata(response.data[0]);
//               //     console.log(response.data, "i am a weasel");
//               //     console.log(clsdata);
//               //     // dormantAccountFeeRow();
//               //   });


//             }
//           }}

//         />
//       </div>,
//     ];

//   })



//   return (
//     <div>
//       {isChecked ? (
//         <ScreenBase
//           card_div1a={
//             <div>
//               <HeaderComponent
//                 title={"Search Parameters"} />
//               <div
//                 style={{
//                   display: "flex",
//                   marginBottom: "15px",
//                   marginLeft: "2px",
//                   marginTop: "15px",
//                 }}
//               >
//                 <div style={{ flex: "0.5" }}>
//                   <InputField
//                     label={"Reference Number"}
//                     labelWidth={"30%"}
//                     inputWidth={"60%"}
//                     value={refrNumber}
//                     onChange={(e) => {
//                       setRefrNumber(e.target.value);
//                     }}
//                   onKeyDown={CashEnquiry}
//                   />
//                 </div>

//                 <div style={{ flex: "0.5" }}>
//                   <InputField
//                     label={"Closed Account"}
//                     labelWidth={"30%"}
//                     inputWidth={"60%"}
//                     value={clsaccount}
//                     onChange={(e) => {
//                       setClsAccount(e.target.value);
//                     }}
//                     onKeyDown={CashEnquiry}
//                   />
//                 </div>
//               </div>
//             </div>
//           }
//           card_div2a={
//             // <DataTable
//             //   columns={[
//             //     { name: "reference_no", label: "Reference Number" },
//             //     { name: "clse_acct", label: "Close Account" },
//             //     { name: "transfer_acct", label: "Tranfer Account Number " },
//             //     // {name:"reference_no",label:"Tranfer Account Name "},
//             //     { name: "transfer_currency", label: "Currency" },
//             //     { name: "transfer_amount", label: "Transfer Amount" },
//             //     { name: "posting_date", label: "Posted Date " },
//             //     {
//             //       name: "",
//             //       label: "Select",
//             //       options: {
//             //         filter: false,
//             //         sort: false,
//             //         empty: true,
//             //         customBodyRender: (tableMeta) => {
//             //           return (
//             //             <ButtonType
//             //               type={"checkbox"}
//             //               onChange={() => setIsChecked(!isChecked)}
//             //               onClick={handleButtonClick}
//             //             />



//             //           );
//             //         },
//             //       },
//             //     },
//             //   ]}
//             //   data={cashEnquiry}
//             // />

//             // <div>
//             //   heloo
//             // </div>

//             <CustomTable

//               headers={["Reference Number ", "Close Account", "Close Account Name", "Transfer Account", "Transfer Account Name", "Currency", "Transfer Amount", "Posting Date", "View Voucher"]}
//               data={cashEData}


//             // cashEData


//             />
//           }
//         />
//       ) : (
//         <div className="report">
//           <div className="heading">
//             <h1>Account Closure Cash Voucher</h1>
//           </div>
//           <div className="date">
//             <p>Date: {new Date().toLocaleDateString()}</p>
//           </div>

//           <div className="account-details">
//             <h2>Account Details</h2>
//             <p>Account No: XXXXXXXX110024000135</p>
//             <p>Account Name: &MRS R.E UNION17684</p>
//             <p>Branch No: 001</p>
//           </div>
//           <div className="closure-details">
//             <h2>Closure Details</h2>
//             <p>Closure Branch: SHANZU BRANCH</p>
//             <p>User ID: UNION SYSTEMS ADMINISTRATOR</p>
//             <p>Closure Date: 02 February 2021</p>
//             <p>Amount: 6,383,682.69</p>
//           </div>
//           <div className="instruction">
//             <h2>Instructions</h2>
//             <p>To be valid this Voucher must bear the CSO's stamp.</p>
//             <p>Proceed to the Cashier to claim funds.</p>
//           </div>
//           <div className="signature">
//             <p>Customer's Signature : .......................</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CloseAccountCashTransferEnquiry;
