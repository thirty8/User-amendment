import React, { useState, useEffect } from "react";
import {Modal, } from "react-bootstrap";

import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import "../../../index.css"

import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import AccountSummary from "../../../../../../components/others/AccountSummary";
import Header from "../../../../../../components/others/Header/Header";
import DocumentViewing from "../../../../../../components/others/DocumentViewing";
import swal from "sweetalert";


function SwapDetails({accDes}){
   //Get the current date
   const today = new Date();

   // Format the date as yyyy-mm-dd
   const yyyy = today.getFullYear();
   const mm = String(today.getMonth() + 1).padStart(2, "0");
   const dd = String(today.getDate()).padStart(2, "0");
   const formattedDate = yyyy + "-" + mm + "-" + dd;
 
   // states
   const [accNumber, setAccNumber] = useState('')
   const [accountDetails, setAccountDetails] = useState({})
   const [accSummaryAccNum, setAccSummaryAccNum] = useState('')
   const [accountDescription, setAccountDescription] = useState('')
   const [batchNumber, setBatchNumber] = useState('')
   const [amount, setAmount] = useState(0)
   const [receivingBanks, setReceivingBanks] = useState([])
   const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
   const [show, setShow] = useState(false);
   const [documentNumber, setDocumentNumber] = useState('')
 
   // headers
   const headers = {
     'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
     'Content-Type': 'application/json'
   };
 
   // functions
    // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

   const handleEnterOfPayerBBAN = (e) => {
     if (e.keyCode === 13) {
       setAccSummaryAccNum(accNumber)
       document.getElementById("amount").focus();
     }
     if (accountDetails === {}) {
       swal("Incorrect account number")
     }
   }
 
   const handleClose = () => {
     setSweetAlertConfirmed(false)
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
         setBatchNumber(response.data[0]?.unique_ref)
       })
       .catch((err) => {
         console.log(err);
       });
 
     //receiving banks
     axios.post(API_SERVER + "/api/receiving_banks", {
       ottCurrency: accountDetails?.currency
     }, {
       headers: headers,
     }).then(function (response) {
       setReceivingBanks(response.data);
       console.log(response.data, "receiving banks")
     }).catch((err) => { console.log(err) })
   }, [])
  //  console.log(accountDetails, "account details")
   accDes(accountDetails)
   return (
    <div>

    {/* main body */}
    <div style={{ display: "flex", flex: 1 }}>
      <div style={{ flex: 0.7, marginRight: "50px" }}>
        <div className="w-full flex mb-2 mt-2">
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

    <div style={{ display: 'flex', flex: 1 }}>
      {/* left side */}
      <div style={{ flex: 0.7, marginRight: '50px' }}>
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
          {/* left side */}
          <div className="px-2 w-1/2">
          <div className="mb-2">
            <InputField id={"amount"} label="Amount" required={true} labelWidth={"25%"} inputWidth={'65%'} />
          </div>
          <div className="mb-2">
            <InputField label="Debit Amount" textAlign={"right"} disabled labelWidth={"25%"} inputWidth={'65%'} value={amount} />
          </div>
        

          </div>
            {/* right side */}
            <div className="px-2 w-1/2">
            <div className="mb-2">
              <InputField label="Customer Rate" disabled labelWidth={'30%'} inputWidth={'70%'} />
            </div>
            <div className="mb-2">
              <InputField required={true} label="Value Date" value={formattedDate} type="date" labelWidth={'30%'} inputWidth={'70%'} />
            </div>
            <div className="flex  space-x-2 mb-2">
              <div className="w-[80%]">
                <InputField
                  label={"Attach Document"}
                  labelWidth={"41%"}
                  inputWidth={"52%"}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  id={"AttachDoc"}
                />
              </div>

              <div className="" onClick={handleClick}>
                <ButtonComponent label="View Document"  buttonColor={"white"}/>

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
        <hr />
        <div className="w-full flex mt-2"> 
        {/* left side */}
        <div className="px-2 w-1/2">
        <div className="mb-2">
            <ListOfValue id={"ReceivingBank"} label="Receiving Bank" required={true} labelWidth={'25%'} inputWidth={'65%'} data={receivingBanks} />
          </div>
          <div className="mb-2">
              <InputField id={"BeneInst"} label={"Beneficiary Inst. A/C58a"} disabled={true} labelWidth={"25%"} inputWidth={'65%'} />
            </div>
            <div className="">
            <InputField id={"purposeOfTransfer"} label="Purpose Of Transfer" labelWidth={'25%'} inputWidth={'65%'} required={true} />
          </div>

        </div>
         {/* right side */}
         <div className="px-2 w-1/2">
         <div className="mb-2">
            <ListOfValue id={"BeneBic"} label="Beneficiary BIC58a" required={true} labelWidth={'30%'} inputWidth={'70%'} />
          </div>
          <div className="mb-2">
              <InputField id={"TelAddress"} label="Tel or Address" labelWidth={'30%'} inputWidth={'70%'} />
            </div>
         </div>
        </div>

      </div>
      {/* right side */}
      <div style={{ flex: 0.3 }}>
        {/* Account Summary */}
        <div>
          <AccountSummary accountNumber={accSummaryAccNum} setAccountDetails={setAccountDetails} />
        </div>
         <br />
         {/* RTGS MINIMUM LIMIT */}
        <div>
          <Header title="RTGS MINIMUM LIMIT" headerShade={true}/>
        </div>
        {/* LIMIT */}
        &nbsp;
        <div>
          <InputField
           labelWidth={"50%"}
            inputWidth={"50%"}
             disabled />
        </div>
      </div>
    </div>
  </div >
  )
};
export default SwapDetails;