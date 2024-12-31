// // 004001160169700292

// import React, { useState, useEffect } from "react";
// import {
//   Row,
//   Col,
//   Modal,
//   Card,
// } from "react-bootstrap";
// import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
// import InputField from "../../../../../../../components/others/Fields/InputField";
// import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
// import SelectField from "../../../../../../../components/others/Fields/SelectField";
// import "../../../index.css";
// import { API_SERVER } from "./../../../../../../config/constant";
// import axios from "axios";
// import AccountSummary from "../../../../../../../components/others/AccountSummary";
// import ImageVerification from "../../../../../../../components/ImageVerification";

// function Details({
//   setState,
//   availBal,
//   ledgBal,
//   receivingBanks,
//   transLim,
//   accSta,
//   curr,
//   accDes,
//   prod,
//   amt,
//   dbtamt,
//   netdbtamt,
//   beneficiaryNum,
//   beneficiaryNam,
//   theAccNum,
// }) {
//   const [getTheme, setTheme] = useState(
//     JSON.parse(localStorage.getItem("theme"))
//   );

//   // attach document state
//   const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
//   const [documentNumber, setDocumentNumber] = useState('')

//   // formatting numbers in amount section
//   function formatNumberWithCommas(number) {
//     return number?.toLocaleString();
//   }

//   // attach/ view doc function
//   function handleClick() {
//     if (documentNumber === "") {
//       swal({
//         title: "ERR - 01346",
//         text: "A Valid Document ID is required",
//         icon: "warning",
//         buttons: "OK",
//       }).then((result) => {
//         if (result) {
//         }
//       });
//     } else {
//       setSweetAlertConfirmed(true);
//     }
//   }
//   // formatted value
//   const [formattedNumber, setFormattedNumber] = useState('');

//   const headers = {
//     "x-api-key": process.env.REACT_APP_API_KEY,
//     "Content-Type": "application/json",
//   };

//   // focus on next input field
//   function switchFocus(e, nextFieldId) {
//     if (e.key === "Enter") {
//       document.getElementById(nextFieldId).focus();
//       console.log(document.getElementById(nextFieldId), "component");
//     }
//   }

//   //Get the current date
//   const today = new Date();

//   // Format the date as yyyy-mm-dd
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   const dd = String(today.getDate()).padStart(2, "0");
//   const formattedDate = yyyy + "-" + mm + "-" + dd;

//   // console.log(data, "the result of the data")

//   // useStates
//   const [accountNumber, setAccountNumber] = useState("");
//   const [availableBalance, setAvailableBalance] = useState("");
//   const [accountDetails, setAccountDetails] = useState({});
//   // const [amount, setAmount] = useState('')
//   const [debitAmount, setDebitAmount] = useState("");

//   const [netDebitAmount, setNetDebitAmount] = useState("");
//   // const [receivingBanks, setReceivingBanks] = useState('')
//   const [beneficiaryName, setBeneficiaryName] = useState("");
//   const [beneficiaryNumber, setBeneficiaryNumber] = useState("");
//   const [cal, setCal] = useState(0);

//   var calVal = localStorage.getItem('cal')

//   useEffect(() => {
//     // get batch number
//     axios
//       .get(API_SERVER + "/api/get-unique-ref", {
//         headers: headers,
//       })
//       .then(function (response) {
//         console.log(response.data[0]?.unique_ref, "unique ref");
//         localStorage.setItem("batch_no", response.data[0]?.unique_ref);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleChangeOfAccountNumber = (e) => {
//     setAccountNumber(e.target.value);
//   };

//   // signature verification states
//   const [showSignatureverification, setShowSignatureVerfication] = useState(false)

//   console.log(arr, "array1");
//   // var accNum = localStorage.getItem('accNum')

//   const val = localStorage.getItem("onChangeAC");

//   const amountVal = localStorage.getItem("onChangeAmount");

//   const benefiBBAN = localStorage.getItem("beneficiaryBBAN");

//   const debitAmtVal = localStorage.getItem("debitAmtVal")

//   // receiving banks
//   // async function getReceivingBanks() {
//   //   let response = await fetch(API_SERVER + "/api/receiving_banks", {
//   //     headers,
//   //   });
//   //   response = await response.json();
//   //   console.log(response)
//   //   setReceivingBanks(response.data.bicode);
//   //   // console.log(response);
//   // }

//   // getReceivingBanks()

//   // axios.post(API_SERVER + '/api/receiving_banks', {
//   //   ottCurrency: isoCode
//   // }, {
//   //   headers: headers
//   // }).then(function (response) {
//   //   const result = response.data.map(str => {
//   //     return { value, label } = str;
//   //   });
//   //   setReceivingBanks(result)
//   // }).catch((error) => {
//   //   console.log(error)
//   // })

//   // handling on events on Enter

//   const handleonEnterAccountNumber = async (e) => {
//     if (e.keyCode === 13) {
//       alert(accountNumber);
//       // await axios.post(API_SERVER + "/api/payerBBAN", {
//       //   // accountNumber: accountNumber
//       //   accountNumber: accountNumber
//       // }, {
//       //   headers: headers
//       // }).then(function (response) {
//       //   console.log(response.data, "account Number details")

//       //   localStorage.setItem('availableBalance', response.data.availableBalance)
//       //   localStorage.setItem('ledgerBalance', response.data.bookBalance)
//       //   localStorage.setItem('rtgs_trans_limit', response.data.rtgs_trans_limit)
//       //   localStorage.setItem("accountStatus", response.data.status_description)
//       //   localStorage.setItem("description", response.data.DESCRIPTION)
//       //   localStorage.setItem("isoCode", response.data.ISO_CODE)
//       //   localStorage.setItem("statusIndicator", response.data.STATUS_INDICATOR)
//       //   localStorage.setItem("accountDescription", response.data.ACCOUNT_DESCRP)

//       // }).catch((err) => {
//       //   console.log(err)
//       // })
//     }
//   };

//   // getting from local storage
//   // var availableBal = localStorage.getItem('availableBalance')
//   var ledgerBal = localStorage.getItem("ledgerBalance");
//   var transLimit = localStorage.getItem("rtgs_trans_limit");
//   var accountStatus = localStorage.getItem("accountStatus");
//   var description = localStorage.getItem("description");
//   var isoCode = localStorage.getItem("isoCode");
//   var statusIndicator = localStorage.getItem("statusIndicator");
//   var accountDescription = localStorage.getItem("accountDescription");
//   var batchNo = localStorage.getItem("batch_no");

//   // handling section
//   const handleonEnterBeneficiaryNumber = async (e) => {
//     if (e.keyCode === 13) {
//       // 2. get account description
//       await axios
//         .post(
//           API_SERVER + "/api/getAccountDescription",
//           {
//             accountNumber: beneficiaryNumber,
//           },
//           {
//             headers: headers,
//           }
//         )
//         .then(function (response) {
//           setBeneficiaryName(response.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   //const { t } = useTranslation();

//   // const swal = require('sweetalert');

//   // function closeModal(formName) {
//   //     let userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   //     var closedModalName = t(formName.toLowerCase().replace(/\s/g, ''));

//   //     if (userInfo.lang.toLowerCase().slice(0, 2) === 'en') {
//   //         swal({
//   //             title: 'Are you sure?',
//   //             text: "You're about to close the '" + closedModalName + "' form",
//   //             icon: 'warning',
//   //             buttons: ['Cancel', 'Yes, Close Form'],
//   //             dangerMode: true
//   //         }).then((result) => {
//   //             if (result) {
//   //                 var minimizedModals = [];
//   //                 var formName = localStorage.getItem('formName');
//   //                 if (localStorage.getItem('namesOfMinimizedModals')) {
//   //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
//   //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
//   //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
//   //                 }
//   //                 document.getElementById('globalModalCloseBtn').click();
//   //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
//   //             }
//   //         });
//   //     } else if (userInfo.lang.toLowerCase().slice(0, 2) === 'fr') {
//   //         swal({
//   //             title: 'Es-tu Sûr?',
//   //             text: "Vous êtes sur le point de fermer le '" + closedModalName + "' formulaire",
//   //             icon: 'warning',
//   //             buttons: ['Annuler', 'Oui, Fermer Le Formulaire'],
//   //             dangerMode: true
//   //         }).then((result) => {
//   //             if (result) {
//   //                 var minimizedModals = [];
//   //                 var formName = localStorage.getItem('formName');
//   //                 if (localStorage.getItem('namesOfMinimizedModals')) {
//   //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
//   //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
//   //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
//   //                 }
//   //                 document.getElementById('globalModalCloseBtn').click();
//   //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
//   //             }
//   //         });
//   //     } else if (userInfo.lang.toLowerCase().slice(0, 2) === 'sp') {
//   //         swal({
//   //             title: 'Estas Seguro?',
//   //             text: "Estás a punto de cerrar '" + closedModalName + "' forma",
//   //             icon: 'warning',
//   //             buttons: ['Cancelar', 'Sí, Cerrar Formulario'],
//   //             dangerMode: true
//   //         }).then((result) => {
//   //             if (result) {
//   //                 var minimizedModals = [];
//   //                 var formName = localStorage.getItem('formName');
//   //                 if (localStorage.getItem('namesOfMinimizedModals')) {
//   //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
//   //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
//   //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
//   //                 }
//   //                 document.getElementById('globalModalCloseBtn').click();
//   //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
//   //             }
//   //         });
//   //     }
//   // }

//   const [payerBBAN, setPayerBBAN] = useState("")

//   // useEffect(() => {

//   axios.post(API_SERVER + "/api/payerBBAN", {
//     // accountNumber: accountNumber
//     accountNumber: payerBBAN  // account number
//   }, {
//     headers: headers
//   }).then(function (response) {
//     // setAvailableBalance(response.data.availableBalance)
//     // setLedgerBalance(response.data.bookBalance)
//     // setTransLimit(response.data.rtgs_trans_limit)
//     // setAccountStatus(response.data.status_description)
//     // setDescription(response.data.DESCRIPTION)
//     // setIsoCode(response.data.ISO_CODE)
//     // setStatusIndicator(response.data.STATUS_INDICATOR)
//     // setAccountDescription(response.data.ACCOUNT_DESCRP)
//     // setAllResults(response.data)
//     console.log(response.data, "response is over here")
//   }).catch((err) => {
//     console.log(err)
//   })

//   console.log(payerBBAN, "payer bban wai")
//   // }, [generalState])

//   return (
//     <div>
//       <div className="">
//         <Row className="g-2">
//           <Row>
//             <Col md={8}>
//               <br />
//               <div
//                 style={{
//                   display: 'flex',
//                   width: '100%',
//                   marginBottom: "15px"
//                 }}
//               >
//                 <div
//                   style={{ width: '50%' }}
//                 >
//                   <InputField
//                     label={"Deal No(Except Rate)"}
//                     labelWidth={"40%"}
//                     inputWidth={"50%"}
//                     type="number"
//                     onKeyDown={(e) => switchFocus(e, "payerBBAN")}
//                   />
//                 </div>

//                 <div
//                   style={{
//                     width: '50%'
//                   }}
//                 >
//                   <InputField
//                     label={"Reference"}
//                     labelWidth={"30%"}
//                     inputWidth={"50%"}
//                     type="text"
//                     value={batchNo}
//                     disabled
//                     textAlign={'center'}
//                   />
//                 </div>
//               </div>
//               <Card
//                 className="bg-light"
//                 border="light"
//                 style={{
//                   boxShadow:
//                     "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
//                 }}
//               >
//                 <Card.Body>
//                   <div style={{ width: "100%", background: "" }}>
//                     <div className="" style={{ background: "" }}>
//                       <div
//                         className="account-name"
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           background: "",
//                           marginBottom: "15px",
//                           width: "100%",
//                         }}
//                       >

//                         <div style={{
//                           width: '100%',
//                           display: 'flex',
//                           alignItems: 'center'
//                         }}>
//                           <InputField
//                             id="payerBBAN"
//                             name="accountNumber"
//                             label={"Payer BBAN"}
//                             labelWidth={"35%"}
//                             inputWidth={"40%"}
//                             required={true}
//                             onChange={(e) => {
//                               setPayerBBAN(e.target.value)
//                             }}
//                             onKeyDown={(e) => switchFocus(e, "amount")}
//                             // value={allInouts.accountNumber}
//                             value={val}
//                           />

//                           <div style={{ marginLeft: "10px", width: '68%', marginRight: '20px' }}>
//                             <InputField
//                               disabled
//                               inputWidth={"100%"}
//                               labelWidth={0}
//                               value={accDes}
//                             />

//                           </div>
//                         </div>

//                         <div
//                           className="payer--btn"
//                           style={{ width: '50%' }}

//                         >
//                           <ButtonComponent
//                             label="Sign Ver"
//                             onClick={() => setShowSignatureVerfication(true)}
//                           //buttonBackgroundColor=getTheme.theme.navBarColor

//                           />

//                           {showSignatureverification && (

//                             <Modal
//                               show={showSignatureverification}
//                               size="lg"
//                               centered
//                               // onHide={setShowSignatureVerfication(false)}
//                               style={{ height: "100%" }}
//                               className="shadow-md shadow-black"
//                             >
//                               <div className="flex items-center justify-between mx-2 p-2">
//                                 <div className="font-extrabold text-black">View Document</div>
//                                 <div
//                                   className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
//                                   onClick={(e) => setShowSignatureVerfication(false)}
//                                 >
//                                   x
//                                 </div>
//                               </div>
//                               <Modal.Body>
//                                 {/* <ImageVerification accountNumber={imageAccount} /> */}
//                                 <ImageVerification accountNumber={accountNumber} />
//                               </Modal.Body>
//                             </Modal>
//                             // 1683042691
//                           )}
//                         </div>
//                       </div>

//                       <hr />
//                     </div>

//                     <div style={{ width: "100%", display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//                       <div
//                         style={{ width: "50%" }}
//                       >
//                         <SelectField
//                           label={"Currency"}
//                           labelWidth={"36%"}
//                           inputWidth={"35%"}
//                           data={[{ label: "KES", value: "010" }]}
//                         />
//                       </div>

//                       <div style={{ width: "50%", display: 'flex', alignItems: 'center' }}>
//                         <div >
//                           <InputField
//                             marginBottom="15px"
//                             id={"amount"}
//                             label={"Amount"}
//                             labelWidth={"35%"}
//                             inputWidth={"60%"}
//                             textAlign={"right"}
//                             type="number"
//                             required={true}
//                             onChange={(e) => {
//                               amt(e.target.value);
//                               // dbtamt((e.target.value).toLocaleString())
//                               localStorage.setItem(
//                                 "onChangeAmount",
//                                 e.target.value
//                               );
//                             }}
//                             onKeyDown={(e) => {
//                               switchFocus(e, "receivingBank");
//                               var num = localStorage.getItem("onChangeAmount")
//                               const convertedToString = parseInt(num)
//                               if (e.keyCode == 13) {
//                                 setCal(convertedToString?.toLocaleString())
//                                 localStorage.setItem('cal', cal)
//                               }
//                             }}
//                             defaultValue={amountVal}
//                           />
//                         </div>

//                         <div
//                         >
//                           <InputField
//                             marginBottom="15px"
//                             disabled={true}
//                             label={"Total Charges"}
//                             labelWidth={"80%"}
//                             inputWidth={"90%"}
//                             type="number"
//                           />
//                         </div>
//                       </div>

//                     </div>

//                     {/* second row */}
//                     <div style={{ width: "100%", display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
//                       <div
//                         style={{ width: "50%" }}
//                       >
//                         <InputField
//                           label={"Rate"}
//                           labelWidth={"36%"}
//                           inputWidth={"35%"}
//                           disabled={true}
//                         />
//                       </div>

//                       <div style={{ width: "50%", display: 'flex', alignItems: 'center' }}>
//                         <div >
//                           <InputField
//                             marginBottom="15px"
//                             label={"Debit Amount"}
//                             labelWidth={"35%"}
//                             inputWidth={"43%"}
//                             // type="number"
//                             value={cal}
//                             textAlign={"right"}
//                             onChange={(e) => {
//                               localStorage.setItem('debitAmtVal', setCal(e.target.value))
//                             }}
//                             disabled={true}
//                             defaultValue={debitAmtVal}
//                           />
//                         </div>

//                         <div
//                         >
//                           <InputField
//                             marginBottom="15px"
//                             type="date"
//                             label={"Value Date"}
//                             labelWidth={"80%"}
//                             inputWidth={"92%"}
//                             value={formattedDate}
//                           />
//                         </div>
//                       </div>

//                     </div>

//                     <div style={{ width: "100%" }}>
//                       <div
//                         style={{ marginBottom: "15px", width: '50%' }}
//                       >
//                         <InputField
//                           // marginBottom="15px"
//                           label={"Net Debit Amount"}
//                           labelWidth={"36%"}
//                           inputWidth={"35%"}
//                           // type="text"
//                           disabled={true}
//                           value={cal}
//                           textAlign={"right"}
//                         />
//                       </div>
//                     </div>

//                     <hr />
//                     <div className="achc--payer">
//                       <div
//                         className="account-name"
//                         style={{ marginBottom: "15px" }}
//                       >
//                         <ListOfValue
//                           // marginBottom={"15px"}
//                           id="receivingBank"
//                           label={"Receiving Bank"}
//                           labelWidth={"26%"}
//                           inputWidth={"48%"}
//                           required={true}
//                           data={receivingBanks}
//                           onKeyDown={(e) => { switchFocus(e, "beneficiaryB"); }}
//                         />
//                       </div>
//                     </div>
//                     <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px", width: '100%' }}>
//                       <div
//                         style={{ width: '50%' }}
//                       >
//                         <InputField
//                           // marginBottom="15px"
//                           id="beneficiaryB"
//                           label={"Beneficiary BBAN"}
//                           labelWidth={"36%"}
//                           inputWidth={"50%"}
//                           type="number"
//                           required={true}
//                           onChange={(e) => {
//                             beneficiaryNum(e.target.value);
//                             localStorage.setItem(
//                               "beneficiaryBBAN",
//                               e.target.value
//                             );
//                           }}
//                           onKeyDown={(e) => {
//                             handleonEnterBeneficiaryNumber();
//                             switchFocus(e, "beneficiaryName");
//                           }}
//                           defaultValue={benefiBBAN}
//                         />
//                       </div>

//                       <div style={{ width: '50%' }}>
//                         <InputField
//                           id="beneficiaryName"
//                           label={"Beneficiary Name"}
//                           type="text"
//                           required={true}
//                           labelWidth={"30%"}
//                           inputWidth={"50%"}
//                           // value={beneficiaryNam}
//                           onKeyDown={(e) => {
//                             switchFocus(e, "tel/address");
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="achc--payer" style={{ background: "" }}>
//                       <div
//                         className="account-name"
//                         style={{ background: "", marginBottom: "15px" }}
//                       >
//                         <InputField
//                           // marginBottom="15px"
//                           id="tel/address"
//                           label={"Tel/Address"}
//                           labelWidth={"26%"}
//                           inputWidth={"73%"}
//                           onKeyDown={(e) => {
//                             switchFocus(e, "purposeOfTransfer");
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="achc--payer" style={{ background: "" }}>
//                       <div
//                         className="account-name"
//                         style={{ background: "", marginBottom: "15px" }}
//                       >
//                         <InputField
//                           id="purposeOfTransfer"
//                           // marginBottom="15px"
//                           label={"Purpose of Transfer"}
//                           labelWidth={"26%"}
//                           inputWidth={"73%"}
//                           required={true}
//                           onKeyDown={(e) => {
//                             switchFocus(e, "attachDocument");
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
//                       <div style={{ width: '36%' }}>
//                         <InputField
//                           marginBottom="15px"
//                           id="attachDocument"
//                           label={"Attach Document"}
//                           labelWidth={"50%"}
//                           inputWidth={"40%"}
//                           type="text"
//                           onChange={(e) => setDocumentNumber(e.target.value)}
//                         />
//                       </div>
//                       <div>
//                         <ButtonComponent
//                           id="viewDocument"
//                           label="View Document"
//                           onClick={() => handleClick()}
//                         />
//                       </div>
//                     </div>

//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* Right Card */}
//             <Col md={4}>
//               <br />
//               <br />
//               {/**the account details section */}
//               <AccountSummary
//                 accountNumber={theAccNum}
//                 setAccountDetails={setAccountDetails}
//               />
//               <br />
//               <Card>
//                 <Card.Body>
//                   <div className="read-only-section" style={{ background: "" }}>
//                     <header
//                       className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
//                       style={{
//                         background:
//                           `url(` +
//                           window.location.origin +
//                           `/assets/images/headerBackground/` +
//                           getTheme.theme.headerImage +
//                           `)`,
//                         textAlign: "center",
//                         marginLeft: "-25px",
//                         marginRight: "-25px",
//                         marginTop: "-30px",
//                       }}
//                     >
//                       RTGS Minimum Limit
//                     </header>
//                     <br />

//                     <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//                       <div></div>
//                       <div>
//                         <InputField
//                           value={transLim}
//                           // type="number"
//                           inputWidth={"100%"}
//                           disabled={true}
//                           textAlign={'right'}
//                         />

//                       </div>
//                     </div>

//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Row>
//       </div>
//     </div >
//   );
// }
// export default Details;

import React, { useState, useEffect } from "react";

import AccountSummary from "../../../../../../components/others/AccountSummary";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import DocumentViewing from "../../../../../../components/others/DocumentViewing";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";


function Details({
  receivingB,
  accDes,
  accNum,
  beneficiaryBBAN,
  beneficiaryNam,
  amt,
  accName,
  acctInst,
}) {
  //Get the current date
  const today = new Date();

  // Format the date as yyyy-mm-dd
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = yyyy + "-" + mm + "-" + dd;

  // states
  const [accNumber, setAccNumber] = useState("");
  const [accountDetails, setAccountDetails] = useState({});
  const [accSummaryAccNum, setAccSummaryAccNum] = useState("");
  const [accountDescription, setAccountDescription] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [receivingBanks, setReceivingBanks] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [show, setShow] = useState(false);
  const [documentNumber, setDocumentNumber] = useState("");
  const [accountInst, setAccountInst] = useState([]);
  const [transLimit, setTransLimit] = useState("");
  const [targetAcct, setTargetAcct] = useState("");

  // headers
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // functions
  const handleEnterOfPayerBBAN = (e) => {
    if (e.keyCode === 13) {
      setAccSummaryAccNum(accNumber);
      accNum(accNumber);

      if (accountDetails !== {}) {
        switchFocus(e, "amountField");
      }

      // account name
      axios
        .post(
          API_SERVER + "/api/payerBBAN",
          {
            accountNumber: accNumber, // account number
          },
          {
            headers: headers,
          }
        )
        .then(function (response) {
          setTransLimit(response.data.rtgs_trans_limit);
          setAccountDescription(response.data.ACCOUNT_DESCRP);
          accName(response.data.ACCOUNT_DESCRP);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (accountDetails === {}) {
      swal("Incorrect account number");
    }
  };

  const handleClose = () => {
    setSweetAlertConfirmed(false);
  };
  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  // attach / view doc function
  function handleClick() {
    if (documentNumber === "") {
      swal({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        buttons: "OK",
      }).then((result) => {
        if (result) {
        }
      });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  useEffect(() => {
    // get batch number
    axios
      .get(API_SERVER + "/api/get-unique-ref", {
        headers: headers,
      })
      .then(function (response) {
        console.log(response.data[0]?.unique_ref, "unique ref");
        setBatchNumber(response.data[0]?.unique_ref);
      })
      .catch((err) => {
        console.log(err);
      });

    //receiving banks
    axios
      .post(
        API_SERVER + "/api/receiving_banks",
        {
          ottCurrency: accountDetails?.currency,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setReceivingBanks(response.data);
        console.log(response.data, "receiving banks");
      })
      .catch((err) => {
        console.log(err);
      });

    // let response = fetch(API_SERVER + "/api/receiving_banks", {
    //   headers: headers,
    // });
    // response = response.json();
    // console.log(response)
    // setReceivingBanks(response.data.bicode);
    // console.log(response);

    // accountInst
    axios
      .get(API_SERVER + "/api/accountInst", {
        headers: headers,
      })
      .then(function (response) {
        console.log(response.data, "acct inst");
        setAccountInst(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // }, [generalState])
  console.log(accountDetails, "account details");

  acctInst(targetAcct);

  accDes(accountDetails);

  function formatNumber(num) {
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });
    // console.log({ formatted }, amount);

    return formatted;
  }

  return (
    <div>
      {/* main body */}

      <div className="mt-4" style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 0.7, marginRight: "50px" }}>
          <div className="w-full flex mb-2">
            <div className="px-2 w-1/2">
              <InputField
                id="dealNumber"
                label={"Deal No"}
                labelWidth={"25%"}
                inputWidth={"65%"}
                onKeyDown={(e) => switchFocus(e, "payerBBAN")}
              />
            </div>
            <div className="px-2 w-1/2">
              <InputField
                label={"Reference"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                disabled
                value={batchNumber}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div style={{ display: "flex", flex: 1 }}>
        {/* left side */}
        <div style={{ flex: 0.7, marginRight: "50px" }}>
          <div className="w-full flex mt-2 mb-2">
            <div className="px-2 w-1/2">
              <InputField
                label={"Payer BBAN"}
                labelWidth={"25%"}
                inputWidth={"65%"}
                id="payerBBAN"
                onChange={(e) => setAccNumber(e.target.value)}
                onKeyDown={handleEnterOfPayerBBAN}
              />
            </div>
            <div className="px-2 w-1/2">
              <InputField
                labelWidth={"30%"}
                inputWidth={"70%"}
                disabled
                value={accountDescription}
              />
            </div>
          </div>
          <hr />
          <div className="w-full flex mt-2">
            <div className="px-2 w-1/2">
              <div className="mb-2">
                <InputField
                  label="Rate"
                  disabled
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                />
              </div>
              <div className="mb-2">
                <InputField
                  label="Net Debit Amount"
                  textAlign={"right"}
                  disabled
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  value={formatNumber(parseInt(amount))}
                  onChange={(e) => {
                    formatNumber(parseInt(e.target.value));
                  }}
                />
              </div>
              <div className="mb-2">
                <InputField
                  label="Total Charges"
                  disabled
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-2">
                <InputField
                  id="amountField"
                  label="Amount"
                  textAlign={"right"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    amt(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      switchFocus(e, "receivingBank");
                      if (parseInt(e.target.value) < parseInt(transLimit)) {
                        swal(
                          "ERR - 1032: Amount should not be less than the limit"
                        );
                      }
                    }
                  }}
                />
              </div>

              <div className="mb-2">
                <InputField
                  label="Debit Amount"
                  textAlign={"right"}
                  disabled
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  value={formatNumber(parseInt(amount))}
                  onChange={(e) => formatNumber(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <InputField
                  label="Value Date"
                  value={formattedDate}
                  type="date"
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full flex mt-2">
            <div className="px-2 w-1/2">
              <div className="mb-2">
                <ListOfValue
                  id={"receivingBank"}
                  label="Receiving Bank"
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  data={accountInst}
                  onKeyDown={(e) => {
                    switchFocus(e, "BeneficiaryBBAN");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("BeneficiaryBBAN");
                      input.focus();
                    }
                  }}
                  onChange={(e) => {
                    setTargetAcct(e.target.value);
                    setTimeout(() => {
                      const input = document.getElementById("BeneficiaryBBAN");
                      input.focus();
                      var stoff =
                        document.getElementById("receivingBank")?.value;
                      console.log(stoff, "stoff chale");
                      receivingB(stoff);
                    }, 0);
                  }}
                />
              </div>
              <div className="mb-2">
                <InputField
                  label="Beneficiary Name"
                  id="BeneficiaryName"
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  onKeyDown={(e) => switchFocus(e, "Tel")}
                  onChange={(e) => beneficiaryNam(e.target.value)}
                />
              </div>
              <div>
                <InputField
                  label="Purpose Of Transfer"
                  id="POT"
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  onKeyDown={(e) => switchFocus(e, "AttachDoc")}
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-2">
                <InputField
                  label={"Beneficiary BBAN"}
                  id="BeneficiaryBBAN"
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  onKeyDown={(e) => switchFocus(e, "BeneficiaryName")}
                  onChange={(e) => {
                    beneficiaryBBAN(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2">
                <InputField
                  label="Tel/Address"
                  id="Tel"
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  onKeyDown={(e) => switchFocus(e, "POT")}
                />
              </div>
              <div className="flex  space-x-2">
                <div className="w-[80%]">
                  <InputField
                    label={"Attach Document"}
                    labelWidth={"39%"}
                    inputWidth={"52%"}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    id={"AttachDoc"}
                  />
                </div>

                <div className="" onClick={handleClick}>
                  <ButtonComponent label="View Document" buttonColor={"white"}/>

                  {/**modal section */}
                  {sweetAlertConfirmed && (
                    <Modal
                      show={sweetAlertConfirmed}
                      size="lg"
                      centered
                      style={{ height: "100%" }}
                      onHide={handleClose}
                      className="shadow-md shadow-black"
                    >
                      <Modal.Header closeButton></Modal.Header>

                      <Modal.Body>
                        <div className="flex items-center justify-between mx-2 p-2">
                          <div className="font-extrabold text-black">
                            View Document
                          </div>
                          <div
                            className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                            onClick={() => setSweetAlertConfirmed(false)}
                          >
                            x
                          </div>
                        </div>
                        <DocumentViewing documentID={documentNumber} />
                      </Modal.Body>
                    </Modal>
                    // 1683042691
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div style={{ flex: 0.3 }}>
          <div className="mt-2">
            <AccountSummary
              accountNumber={accSummaryAccNum}
              setAccountDetails={setAccountDetails}
            />
          </div>
          <br />
          <div>
            <Header title="RTGS MINIMUM LIMIT" headerShade={true}/>
            &nbsp;
          </div>

          <div>
            <InputField
              labelWidth={"50%"}
              inputWidth={"50%"}
              disabled
              value={parseInt(transLimit)}
              textAlign={"right"}
              defaultValue="0.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
