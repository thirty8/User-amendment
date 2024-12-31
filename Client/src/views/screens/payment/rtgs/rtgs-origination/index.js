// import React, { useState, useEffect } from "react";
// import ArrowStepper from "../../../../../../components/others/arrow-stepper/arrow-stepper";
// import "../../index.css";
// import Details from "./components/details";
// import SwiftDetails from "./components/swift";
// import { MDBIcon } from "mdb-react-ui-kit";
// import axios from "axios"
// import { API_SERVER } from "../../../../../../config/constant";
// import ActionButtons from './../../../../../components/others/action-buttons/ActionButtons';

// function RTGS() {
//   const [getTheme, setTheme] = useState(
//     JSON.parse(localStorage.getItem("theme"))
//   );
//   const [activeStep, setActiveStep] = useState(0);
//   const headers = {
//     'x-api-key': process.env.REACT_APP_API_KEY,
//     'Content-Type': 'application/json'
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleClick = (index) => {
//     setActiveStep(index);
//   };

//   useEffect(() => {
//     localStorage.removeItem("onChangeAC")
//     localStorage.removeItem("onChangeAmount")
//     localStorage.removeItem("beneficiaryBBAN")
//   }, [])

//   // major states
//   const [generalState, setGeneralState] = useState("")
//   const [getAmount, setAmount] = useState()
//   const [valueFormat, setValueFormat] = useState(0)

//   // formatting numbers in amount section
//   function formatNumberWithCommas(number) {
//     return number?.toLocaleString();
//   }

//   var valueToBeFormatted = localStorage.getItem("onChangeAmount")

//   var parsedValue = parseFloat(valueToBeFormatted)

//   // console.log(formatNumberWithCommas(parsedValue), "<<< here")

//   //states
//   const [availableBalance, setAvailableBalance] = useState(null);
//   const [ledgerBalance, setLedgerBalance] = useState(null);
//   const [transLimit, setTransLimit] = useState(null);
//   const [accountStatus, setAccountStatus] = useState(null);
//   const [description, setDescription] = useState(null);
//   const [isoCode, setIsoCode] = useState(null);
//   const [statusIndicator, setStatusIndicator] = useState(null);
//   const [accountDescription, setAccountDescription] = useState(null);
//   const [beneficiaryNumber, setBeneficiaryNumber] = useState("")
//   const [beneficiaryName, setBeneficiaryName] = useState("")
//   const [senderInstitution, setSenderInstitution] = useState("")
//   const [senderCorre53, setSenderCorre53] = useState("")

//   // useEffect(() => {

//   axios.post(API_SERVER + "/api/payerBBAN", {
//     // accountNumber: accountNumber
//     accountNumber: generalState  // account number
//   }, {
//     headers: headers
//   }).then(function (response) {
//     setAvailableBalance(response.data.availableBalance)
//     setLedgerBalance(response.data.bookBalance)
//     setTransLimit(response.data.rtgs_trans_limit)
//     setAccountStatus(response.data.status_description)
//     setDescription(response.data.DESCRIPTION)
//     setIsoCode(response.data.ISO_CODE)
//     setStatusIndicator(response.data.STATUS_INDICATOR)
//     setAccountDescription(response.data.ACCOUNT_DESCRP)
//     // setAllResults(response.data)
//   }).catch((err) => {
//     console.log(err)
//   })
//   // }, [generalState])

//   console.log(formatNumberWithCommas(transLimit), "trans lim")

//   //banks
//   var arr = []
//   axios.post(API_SERVER + "/api/receiving_banks", {
//     ottCurrency: isoCode
//   }, {
//     headers: headers
//   }).then(function (response) {
//     for (var i = 0; i < response.data.length; i++) {
//       arr.push({ "label": response.data[i].label, "value": response.data[i].value })
//       console.log(response.data, "the res data")
//       console.log(arr, "pushing into arr")
//     }
//     // setArr0(arr)
//   }).catch((err) => {
//     console.log(err)
//   })

//   console.log(arr, 'receiving banks')

//   // beneficiary data
//   axios.post(API_SERVER + "/api/getAccountDescription", {
//     accountNumber: beneficiaryNumber
//   }, {
//     headers: headers
//   }).then(function (response) {
//     setBeneficiaryName(response.data)
//   }).catch((err) => {
//     console.log(err)
//   })

//   console.log(isoCode, "isoCode")
//   useEffect(() => {
//     // SENDER INSTITUTION
//     axios.post(API_SERVER + "/api/senderInstitutions", {
//       currencyCode: "KES"
//     }, { headers: headers }).then(function (response) {
//       setSenderInstitution(response.data?.SenderInstitution)
//       setSenderCorre53(response.data?.SenderCorre53a)
//       console.log(response.data, "sender Institutions")
//     }).catch((err) => console.log(err))
//   }, [generalState])

//   const steps = [
//     {
//       count: 1,
//       number: "RTGS Details",
//       content: (
//         <div>
//           <Details
//             setState={setGeneralState}
//             availBal={availableBalance}
//             ledgBal={ledgerBalance}
//             transLim={formatNumberWithCommas(transLimit)}
//             accSta={accountStatus}
//             curr={isoCode}
//             accDes={accountDescription}
//             prod={description}
//             amt={setAmount}
//             dbtamt={getAmount}
//             netdbtamt={valueFormat}
//             beneficiaryNum={setBeneficiaryNumber}
//             beneficiaryNam={beneficiaryName}
//             theAccNum={generalState}
//             receivingBanks={arr}
//           // data={allResults}
//           />
//         </div>
//       ),
//     },
//     {
//       count: 2,
//       number: "Swift Details",
//       content: (
//         <div>
//           <SwiftDetails
//             ordCust={generalState}
//             sndInst={senderInstitution}
//             accDes={accountDescription}
//             sndrCorre={senderCorre53}
//             amt={getAmount}
//             beneficiaryNum={beneficiaryNumber}
//             beneficiaryNam={beneficiaryName} />
//         </div>
//       ),
//     },
//   ];
//   const custom = `url(` +
//     window.location.origin +
//     `/assets/images/headerBackground/` +
//     getTheme.theme.headerImage +
//     `)`;
//   return (
//     <div className="" style={{ zoom: "0.8" }}>
//       <ActionButtons onNewClick={() => {
//         // document.getElementById("closeModalBTN").click();
//         localStorage.removeItem("onChangeAC")
//         // document.getElementById("closeModalBTN").click();
//         localStorage.removeItem('availableBalance')
//         localStorage.removeItem('ledgerBalance')
//         localStorage.removeItem('rtgs_trans_limit')
//         localStorage.removeItem("accountStatus")
//         localStorage.removeItem("description")
//         localStorage.removeItem("isoCode")
//         localStorage.removeItem("statusIndicator")
//         localStorage.removeItem("accountDescription")

//         localStorage.removeItem("batch_no")

//         localStorage.removeItem("onChangeAmount")

//         localStorage.removeItem("beneficiaryBBAN")
//       }}
//         onExitClick={() => {
//           document.getElementById("closeModalBTN").click();
//           localStorage.removeItem("onChangeAC")
//           localStorage.removeItem('availableBalance')
//           localStorage.removeItem('ledgerBalance')
//           localStorage.removeItem('rtgs_trans_limit')
//           localStorage.removeItem("accountStatus")
//           localStorage.removeItem("description")
//           localStorage.removeItem("isoCode")
//           localStorage.removeItem("statusIndicator")
//           localStorage.removeItem("accountDescription")
//           localStorage.removeItem("batch_no")
//           localStorage.setItem("onChangeAmount", "");
//           localStorage.removeItem("beneficiaryBBAN")
//         }}

//       />

//       <div className="bg-gray-100 p-2">
//         <ul className="stepper rounded mb-4">
//           {steps.map((step, index) => (
//             <li
//               key={step.number}
//               className={`stepper__item cursor-pointer flex h-10 items-center justify-center`}
//               style={{
//                 background: index === activeStep ? custom : "",
//                 color: index === activeStep ? "white" : "",
//                 border: index < activeStep ? "1px" : "",
//                 borderRadius: index < activeStep ? "10%" : "",
//               }}
//               onClick={() => handleClick(index)}
//             >
//               <div className="flex space-x-5 items-center justify-center">
//                 <div className="border-2 rounded-full flex justify-center items-center w-7 h-7 p-1 bg-black text-white">
//                   {step.count}
//                 </div>
//                 <div>{step.number}</div>
//               </div>
//             </li>
//           ))}
//         </ul>
//         {steps[activeStep].content}
//         <div className="flex justify-between mt-4">
//           <button
//             className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${activeStep === 0 ? "cursor-not-allowed opacity-50" : ""
//               }`}
//             onClick={handleBack}
//             disabled={activeStep === 0}
//           >
//             Back
//           </button>
//           <button
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${activeStep === steps.length - 1
//               ? "cursor-not-allowed opacity-50"
//               : ""
//               }`}
//             onClick={handleNext}
//             disabled={activeStep === steps.length - 1}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//     </div>
//   );

// }
// export default RTGS;

// // onClick={() => {
// //   document.getElementById("closeModalBTN").click();
// //   localStorage.removeItem("onChangeAC")
// //   document.getElementById("closeModalBTN").click();
// //   localStorage.removeItem('availableBalance')
// //   // setLedgerBalance(response.data.bookBalance)
// //   localStorage.removeItem('ledgerBalance')
// //   // setTransLimit(response.data.rtgs_trans_limit)
// //   localStorage.removeItem('rtgs_trans_limit')
// //   // setAccountStatus(response.data.status_description)
// //   localStorage.removeItem("accountStatus")
// //   // setDescription(response.data.DESCRIPTION)
// //   localStorage.removeItem("description")
// //   // setIsoCode(response.data.ISO_CODE)
// //   localStorage.removeItem("isoCode")
// //   // setStatusIndicator(response.data.STATUS_INDICATOR)
// //   localStorage.removeItem("statusIndicator")
// //   // setAccountDescription(response.data.ACCOUNT_DESCRP)
// //   localStorage.removeItem("accountDescription")

// //   localStorage.removeItem("batch_no")

// //   localStorage.removeItem("onChangeAmount")

// //   localStorage.removeItem("beneficiaryBBAN")
// // }}

import React, { useState } from "react";

import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import SwiftDetails from "./components/swift";
import Details from "./components/details";
import Header from "../../../../../components/others/Header/Header";
import { MDBIcon } from "mdb-react-ui-kit";


function RTGS() {
  const [accDescription, setAccDescription] = useState("");
  const [accNumber, setAccNum] = useState("");
  const [accountName, setAccountName] = useState("");
  const [beneficiaryBBan, setBeneficiaryBBan] = useState("");
  const [beneficiaryNam, setBeneficiaryNam] = useState("");
  const [receivingB, setReceivingB] = useState("");
  const [amount, setAmount] = useState("");
  const [accountInst, setAccountInst] = useState("");

  console.log(accountInst, "account inst ");
  const tabsData = [
    {
      value: "default",
      label: "Details",
      component: (
        <Details
          amt={setAmount}
          accName={setAccountName}
          receivingB={setReceivingB}
          accDes={setAccDescription}
          accNum={setAccNum}
          beneficiaryBBAN={setBeneficiaryBBan}
          beneficiaryNam={setBeneficiaryNam}
          acctInst={setAccountInst}
        />
      ),
    },
    {
      value: "tab-2",
      label: "Swift",
      component: (
        <SwiftDetails
          amt={amount}
          accName={accountName}
          accDetails={accDescription}
          receivingB={receivingB}
          accNum={accNumber}
          beneficiaryBBAN={beneficiaryBBan}
          beneficiaryNam={beneficiaryNam}
          acctInst={accountInst}
        />
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabsData[0].value);

  return (
    <div style={{ }}>
      <div>
        <ActionButtons />
        <Header 
      
        />
      </div>

      {/* main body */}
      <div >
        <TabsComponent
          tabsData={tabsData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}

export default RTGS;
