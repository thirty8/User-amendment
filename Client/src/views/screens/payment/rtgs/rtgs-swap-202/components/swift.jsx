import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";

import SelectField from "../../../../../../components/others/Fields/SelectField";
import "../../../index.css"

import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";

function SwapSwift({
  accDetails, sndInst, ordCust, sndrCorre, amt, beneficiaryNum, beneficiaryNam
}
){
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const [theD, setTheD] = useState(accDetails)

  // states
  const [dat, setDat] = useState([])

  // headers
  const headers = {
    'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    'Content-Type': 'application/json'
  };
  //localstorage stuff
  var CustomerAddr50K = localStorage.getItem("accountDescription")


  //Get the current date
  const today = new Date();

  // Format the date as yyyy-mm-dd
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = yyyy + '-' + mm + '-' + dd


  // api requests
  const [senderCorre, setSenderCorre] = useState([]);
  const [accountInst, setAccountInst] = useState([]);
  const [currencyCode, setCurrencyCode] = useState([]);
  const [acCleaning, setAccCleaning] = useState([]);
  const [receiverInstitution, setReceiverInstitution] = useState("")

  // senderCorre
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/senderCorre", {
        headers: headers
      })
      .then(function (response) {
        let newData = [];
        for (var i = 0; i < response.data.length; i++) {
          newData.push(
            response.data[i]?.bicode + " - " + response.data[i].bank_desc
          );
        }
        setSenderCorre(newData);
      })
      .catch((err) => console.log(err));


    // accountInst
    axios
      .get(API_SERVER + "/api/accountInst", {
        headers: headers
      })
      .then(function (response) {
        // let newData0 = [];

        // for (var i = 0; i < response.data.length; i++) {
        //   newData0.push(
        //     response.data[i]?.bic_code + " - " + response.data[i].bank_desc
        //   );
        // }
        setAccountInst(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(accountInst, "account inst stoff")




  // RECEIVER INSTITUTION
  // axios.post(API_SERVER + "/api/receiverInstitution", {
  //   bicCode: ""
  // }, { headers: headers }).then(function (response) {
  //   console.log(response, "receiverInst")
  //   setReceiverInstitution(response.data?.SenderInstitution)
  // }).catch((err) => console.log(err)) 


  const handleChangeofAccountInst = (value) => {
    setAccCleaning(value)
    console.log(value, "the val")
  }
  function formatNumber(num) {
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });
    // console.log({ formatted }, amount);

    return formatted;
  }
  // focus on next inputField
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  // sender institutions
  // axios.post(API_SERVER + "/api/senderInstitutions", {
  //   currencyCode: currencyCode
  // }, {
  //   headers: headers
  // }).then(function (response) {
  //   console.log(response.data)
  // }).catch((err) => {
  //   console.log(err)
  // })




  //lovs
  const InstructedAmount33B = ['ZWL', 'ZWD', 'ZWM', 'ZMK', 'ZAR', 'ZAL', 'YUN', 'YUM',
    'YUD', 'YER', 'YDD', 'XSU', 'XPT', 'XPF', 'XPD', 'XOF', 'XFU', 'XFO', 'XEU', 'XDR', 'XCD', 'XBD',
    'XBC', 'XBB', 'XBA', 'XAU', 'XAG', 'XAF', 'WST', 'VUV', 'VND', 'VEF', 'VEB', 'UZS', 'UYU', 'UYP', 'UYI', 'USS', 'USN', 'USD', 'USX', 'UGS',
    'UAH', 'TZS', 'TWD', 'TTD', 'TRY', 'TRL', 'TPE', 'TOP', 'TND', 'TMT', 'TMM', 'TJS', 'TJR', 'THB', 'SZL', 'SYP', 'SVC',
    'SUR', 'STD', 'SSP', 'SRG', 'SRD', 'SOS', 'SLL', 'SKK', 'SIT', 'SHP', 'SGD', 'SEK', 'SDP', 'SDG', 'SDD', 'SCR', 'SBL', 'SBD',
    'SAR', 'RWF', 'RUB', 'RSD', 'RON', 'ROL', 'QAR', 'PYG', 'PTE', 'PLZ', 'PLN', 'PHP', 'PKR', 'PGK', 'PES', 'PEN',
    'PAB', 'OMR', 'NZD', 'NPR', 'NOK', 'NIO', 'NLG', 'NIC', 'NGN', 'NAD', 'MZN', 'MZM', 'MYR', 'MXV', 'MXP', 'MXN',
    'MWK', 'MVR', 'MUR', 'MTP', 'MTL', 'MRO', 'MOP', 'MNT', 'MMK', 'MLF', 'MKD', 'MGF', 'MGA', 'MDL', 'MAD', 'LYD',
    'LVL', 'LUF', 'LTL', 'LSM', 'LSL', 'LRD', 'LKR', 'LBP', 'LAK', 'KZT', 'KYD', 'KWD', 'KRW', 'KPW', 'KMF', 'KHR',
    'KGS', 'KES', 'JPY', 'JOD', 'JMD', 'ITL', 'ISK', 'IRR', 'IQD', 'INR', 'ILS', 'IEP', 'IDR', 'HUF', 'HTG', 'HRK', 'HNL',
    'HKD', 'GYD', 'GWP', 'GTQ', 'GRD', 'GQE', 'GNS', 'GNF', 'GMD', 'GIP', 'GHS', 'GHC', 'GEL', 'GBP', 'FRF', 'FKP', 'FJD',
    'FIM', 'EUR', 'ETB', 'ESP', 'ERN', 'EGP', 'EEK', 'ECS', 'DZD', 'DOP', 'DKK', 'DJF', 'DEM', 'DDM', 'CZK', 'CYP', 'CVE',
    'CUP', 'CUC', 'CSK', 'CSD', 'CRC', 'COU', 'COP', 'CNY', 'CLP', 'CLF', 'CHW', 'CHF', 'CHE', 'CDZ', 'CDF', 'CAD', 'BZD', 'BYR',
    'BWP', 'BUK', 'BTR', 'BTN', 'BSD', 'BRL', 'BRC', 'BOV', 'BOP', 'BOB', 'BND', 'BMD', 'BIF', 'BHD', 'BGN', 'BGL', 'BEL',
    'BEF', 'BEC', 'BDT', 'BBD', 'BAM', 'BAK', 'AZN', 'AZM', 'AWG', 'AWF', 'AUD', 'ATS', 'ATS', 'ARS', 'ARP', 'AON', 'AOK',
    'AOA', 'ANG', 'AMD', 'ALL', 'AFN', 'AFA', 'AED', 'ADP', ''];


  const TransTypeCode26t = ['GOODS', 'TRANSPORTATION SERVICES', 'TRAVEL', 'Construction',
    'Postal, courier and telecommunication', 'Insurance', 'Financial and Leasing', 'Computer and Information',
    'Compensation of workers and employees', 'Direct investment income1', 'Portfolio Investment',
    'Payment related to financial derivatives', 'Trade Credits', 'Loans', 'Deposits', 'Payments'
  ];



  const BankOperationCode23B = ['Normal Credit Transfer', 'Priority', 'Standard', 'SwiftFTPay', 'Test message'];
  return (
    <div className="">
      <br />
      <div className="w-full flex mb-4  pr-12 pl-12">
      <div className="px-2 w-1/2"> 
      <div className="mb-2">
          <SelectField
            id={"DOC"}
            label={"Details of Charges 71A"}
            labelWidth={"21%"}
            inputWidth={"69%"}
            defaultValue={"1"}
            data={[{ label: "Shared Charges", value: "1" }]}
            disabled
            onKeyPress={(e) =>{
              switchFocus(e, "BOC");
              if (e.key === "Enter") {
                e.preventDefault();
                const input = document.getElementById("BOC");
                input.focus();
              }
            }}
          />
          </div>
      </div>
      <div className="px-2 w-1/2">
      <div className="mb-2">
          <SelectField
            id={"BOC"}
            label={"Bank Operation Code 23B"}
            labelWidth={"28%"}
            inputWidth={"67%"}
            data={BankOperationCode23B}
            defaultValue={0}
            onKeyPress={(e) =>{
              switchFocus(e, "InstructCode");
              if (e.key === "Enter") {
                e.preventDefault();
                const input = document.getElementById("InstructCode");
                input.focus();
              }
            }}
          />
          </div>
         </div>
      </div>
    
      <Card

        className="bg-white shadow rounded scale-[0.85] p-3 -mx-20 -mb-14 -mt-14"
      
      >
        <Card.Body>
          <div className="w-full flex">
            {/* left Side */}
            <div className="px-2 w-1/2">
            <div className="mb-2">
         <InputField 
                  id={"SenderInst"}
                  label={"Sender Institution"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  disabled={true}
                  value={sndInst}
                />
         </div>
         <div className="mb-2">
                <InputField
                id={"OrderingCust"}
                  // marginBottom="15px" 
                  label={"Ordering Cust A/c 50k"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  disabled={true}
                  value={ordCust}
                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  //  marginBottom="15px" 
                  id={"CustomerAddress"}
                  label={"Customer Address 50k"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  disabled={true}
                  // value={accDes}
                  value={accDetails?.account_name}
                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  id={"Address2"}
                  label={"Address 2. 50k"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  disabled={true}
                />
              </div>
              <div className=" flex mb-2 space-x-2">
             <div className="w-[70%]">
             <SelectField
                    id={"InstructedAmount"}
                    label={"Instructed Amount 33B"}
                    labelWidth={"30%"}
                    inputWidth={"70%"}
                    required={true}
                    data={InstructedAmount33B}
                  />
             </div>
                  <div className="w-[30%]">
                  <InputField id={""}  inputWidth={"66%"} />
                  </div>

             </div>
             <div className="mb-2">
              <InputField 
              id={"RelatedRef"}
              label={"Related Ref 21"}
              labelWidth={"20%"}
              inputWidth={"70%"}
              required={true}
                        />
              </div>
              <div className="flex mb-2 space-x-2">
              <div className="w-[70%]">
              <SelectField
                    id={"SenderCharges"}
                    label={"Sender's Charges 71F"}
                    labelWidth={"30%"}
                    inputWidth={"70%"}
                    required={true}
                    data={InstructedAmount33B}
                  />
              </div>
              <div className="w-[30%]">
              <InputField inputWidth={"66%"} />
              </div>

             </div>
               </div>
             {/* Right Side */}
             <div className="px-2 w-1/2">
             <div className="mb-2">
              <SelectField
                  id={"InstructCode"}
                  label={"Instruct Code 23E"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  data={['Same Day Value', 'Telecommunication', 'Phone Beneficiary', 'Intra-Company Payment', 'Related Payment', 'Corporate Trade', 'Hold', 'Cheque', 'Telephone', 'Phone Intermediary', 'TELI', 'RFB', 'NONE']}
                />
              </div>
              <div className="mb-2" >
                <SelectField
                  id={"TransType"}
                  label={"Trans Type Code 26T"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  data={TransTypeCode26t}
                  defaultValue={0}
                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  id={"Address3"}
                  label={"Address 3. 50k"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}

                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  //  marginBottom="15px" 
                  label={"Address 4. 50k"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}

                />
              </div>
              <div className="mb-2">
                  <InputField 
                
                    label={"Exchange Rate"}
                    labelWidth={"30%"}
                    inputWidth={"70%"}
                  />
                </div>
                <div className="flex mb-2 space-x-2">
                <div className="w-[70%]">
                <SelectField
                    id={"ReceiverCharges"}
                    label={"Receiver's Charges 71G"}
                    labelWidth={"44%"}
                    inputWidth={"56%"}
                    data={InstructedAmount33B}
                  />
                </div>
                <div className="w-[30%]">
                <InputField  inputWidth={"90%"} />
                </div>
              </div>
               </div>
          </div>
          <hr />
          <div className="w-full flex mt-2">
             {/* Left Side */}
             <div className="px-2 w-1/2">
             <div className="mb-2" style={{ background: "", }}>
                <InputField
                   id={"ReceiverInstitution"}
                  // marginBottom="15px" 
                  label={"Receiver Institution"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  disabled={true}
                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  // marginBottom="15px" 
                  label={"Beneficiary Address 59"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  disabled={true}
                  value={beneficiaryNam}
                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  //  marginBottom="15px" 
                  label={"Address 2.59"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}

                />
              </div>
              </div>
               {/* Right Side */}
             <div className="px-2 w-1/2">
             <div className="mb-2" style={{ background: ""}}>
                <InputField
                  id={"BeneficiaryCust"}
                  label={"Beneficiary Cust A/C 59"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  disabled={true}
                  value={beneficiaryNum}
                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  //  marginBottom="15px" 
                  label={"Address 3 59"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}

                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  // marginBottom="15px" 
                  label={"Address 4 59"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}

                />
              </div>
              </div>
             </div>
             <hr />
             <div className="w-full flex mt-2">
            {/* Left Side */}
            <div className="px-2 w-1/2">
            <div className="mb-2" style={{ background: "" }}>
                <InputField
                  id={"SettledAmount"} 
                  label={"Settled Amount"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  disabled={true}
                  value={accDetails?.currency}
                />
              </div>
              <div className="flex mb-2 space-x-2">
              <div className="w-[70%]">
              <SelectField
                    id={""}
                    label={"Sender-Rec Code Info.72"}
                    labelWidth={"30%"}
                    inputWidth={"70%"}
                    required={true}
                    data={[
                      "Account with Institution",
                      "Instructing institution",
                      "Intermediary institution",
                      "Receiver",
                      "CODTYPTR",
                    ]}
                  />
              </div>
              <div className="w-[30%]">
              <InputField inputWidth={"66%"}  />

              </div>
             </div>
               </div>
             {/* Right Side */}
             <div className="px-2 w-1/2"> 
             <div className="mb-2" style={{ background: "" }}>
                <InputField
                  id={"ValueDate"}
                  label={"Value Date 32A"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  type="date"
                  disabled={true}
                  value={formattedDate}
                />
              </div>
              <div className="mb-2">
                <InputField
                  id={"SendertoRecInfo72"}
                  label={"Sender to Rec Info. 72"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}

                />
              </div>

             </div>
            </div>
            <hr />
            <div className="w-full flex mt-2">
            {/* Left Side */}
            <div className="px-2 w-1/2">
            <div className="mb-2" style={{ background: "" }}>
                <InputField
                  id={"SenderRecInfo.72"}
                  label={"Sender to Rec Info. 72"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}


                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  id={"Sender's A/C53a"}
                  label={"Sender's Corre A/C53a"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  required={true}
                // value={sndrCorre}
                />

              </div>
              <div className="mb-2" style={{ background: "" }}>
                <InputField
                  id={"A/C Code57a"}
                  label={"A/C Cleaning Code57a"}
                  labelWidth={"20%"}
                  inputWidth={"70%"}
                  required={true}
                  value={acCleaning}
                />
              </div>

            </div>
             {/* Right Side */}
             <div className="px-2 w-1/2">
             <div className="mb-2" style={{ background: "" }}>
                <InputField
                  id={"SenderRecInfo72"}
                  label={"Sender to Rec Info. 72"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}

                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <ListOfValue
                  id={"SenderCoreA/C53a"}
                  label={"Sender Core A/C53a"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  data={senderCorre}
                  defaultValue={"UTBSSLFR - UNION TRUST BANK"} // to be changed to default value
                />
              </div>
              <div className="mb-2" style={{ background: "" }}>
                <ListOfValue
                  id={"AccountInst57a"}
                  label={"Account With Inst. 57a"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  data={accountInst}
                  onChange={(value) => handleChangeofAccountInst(value)} />
              </div>
              
              </div>
            </div>
      
        </Card.Body>
      </Card>
    </div>
    )
};
export default SwapSwift;