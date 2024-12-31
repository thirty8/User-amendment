import React from "react";
import { useState, useEffect} from 'react';
import { Tabs } from "@mantine/core";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";


import { Modal, Group, Button } from "@mantine/core";

import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};


function AccountDetails({Dataa}) {
  let array1 = []
  const [accountNumbersArray, setAccountNumbersArray] = useState([]);
  const [AcNumber,setAcNumber] = useState("");
  const [masterState,setMasterState] = useState({});
  
  const handleAccountNumbers = () => {
    axios.post(API_SERVER + "/api/getGeneralAccountDetails", {
      customerNumber: Dataa?.customerNumber,
    },{headers})
    .then((response) => {
        let results = response.data;
        console.log(results,"sultss")
        results.map((i)=> {
          array1.push(i.account_number)
          setAccountNumbersArray(array1)
        })
    })
  .catch((error) => {
        console.log(error);
      });
  };

  const getAccountInfo = () => {
    axios.post(API_SERVER + "/api/getInvidualRelationshipAmendment/AccountInfo", {
      accountNumber: AcNumber,
    },{headers})
    .then((response) => {
        let results = response.data.response[0];
        let codeDescriptions = response.data.response2[0];
        console.log(codeDescriptions, "yolos");
        setMasterState((prevState) => ({
          ...prevState,
          accountName: results?.account_descrp,
          product: codeDescriptions?.productdescription,
          dateOpened: results?.date_opened,
          currency:codeDescriptions?.currencycode + "        -        " + codeDescriptions?.currencydescription,
          dateOfLastActivity: results?.date_of_last_activity,
          branch: codeDescriptions?.branchdescription,
          transCount: results?.trans_count,
          shortName: results?.short_name,
          viewFlag: results?.view_flag,
          statusIndicator:codeDescriptions?.accountstatuscode + "      -       " + codeDescriptions?.accountstatusdescription,
          cr_int_rate: results?.cr_int_rate,
          db_int_rate: results?.od_int_rate,
          interest_account_no: results?.interest_account_no,
          debit_account_no: results?.od_account_no,
          credit_int_code: results?.credit_int_code,
          debit_int_code: results?.debit_int_code,
          sector: results?.sector,
          sub_sector: results?.sub_sector,
          delivery_method: results?.delivery_method,
          institute_class: results?.institute_class,
          isic: results?.isic_1,
          statementFreq: results?.state_freq_days,
          cash_flag: results?.cash_flag,
          chq_flag: results?.chq_flag,
          int_state_freq: results?.int_state_freq,
          int_next_state_date: results?.int_next_state_date,
          number_stat_reqd: results?.number_stat_reqd,
          statement_cnt: results?.statement_cnt,
          last_statement_date: results?.last_statement_date,
          next_statement_date: results?.next_statement_date,
          
        }))
  
    })
  .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleAccountNumbers()
  },[]);

  useEffect(() => {
    getAccountInfo()
  },[AcNumber]);

  return (
    <div className="parent" style={{padding:""}}>
      <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
          <div style={{ marginRight:"10px",marginBottom:"10px",marginLeft:"10px",marginTop:"1px",paddingRight:"10px",paddingLeft:"10px",paddingTop:"2px",paddingBottom:"30px"}}>
              <div style={{marginBottom:"10px"}} >
              <Header headerShade={true} title={"ACCOUNT DETAILS"} />
              </div>
              <div style={{ display: "flex",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{flex:0.04}}></div>
                <div style={{flex:0.92}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"10px",paddingTop:"15px",paddingBottom:"10px"}}>
                    <ListOfValue label={"Account Number"} labelWidth={"34.5%"} inputWidth={"51%"} data={accountNumbersArray} onChange={(e)=>{setAcNumber(e)}} required/>
                    <InputField label={"Account Name"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.accountName} disabled/>
                    <InputField label={"Product"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.product} disabled/>
                    <InputField label={"Date Opened"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.dateOpened} type={"date"}  disabled/>
                    <InputField label={"Currency Code"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.currency} disabled/>
                    <InputField label={"Date Of Last Activity"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.dateOfLastActivity} type={"date"} disabled/>
                    <InputField label={"Source Branch"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.branch} disabled/>
                    <InputField label={"Transaction Count"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.transCount} disabled/>
                   <InputField label={"Short Name"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.shortName} disabled/>
                    <InputField label={"FX Category"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.fxCategory} disabled/>
                    <InputField label={"View Flag"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.viewFlag} disabled/>
                    <InputField label={"Account Status"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.statusIndicator} disabled/>
                </div>
                </div>
                <div style={{flex:0.04}}></div>
            </div>
            <br></br>
            <div style={{ display: "flex",padding:"5px",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{flex:0.04}}></div>
                <div style={{flex:0.92}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"10px",paddingTop:"15px",paddingBottom:"10px"}}>
                    <InputField label={"Credit Rate"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState.cr_int_rate?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} textAlign={"right"} paddingRight={"9px"} disabled/>
                    <InputField label={"Credit Interest Account"} labelWidth={"39%"} inputWidth={"50%"} value={masterState.interest_account_no?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} textAlign={"right"} paddingRight={"9px"}  disabled/>
                    <InputField label={"Credit Int. Prod. Code"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState.credit_int_code?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} textAlign={"right"} paddingRight={"9px"}  disabled/>
                    <InputField label={"Debit Rate"} labelWidth={"39%"} inputWidth={"50%"} value={masterState.db_int_rate?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} textAlign={"right"} paddingRight={"9px"}  disabled/>
                    <InputField label={"Debit Interest Account"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState.debit_account_no?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} textAlign={"right"} paddingRight={"9px"}  disabled/>
                    <InputField label={"Debit Int. Prod. Code "} labelWidth={"39%"} inputWidth={"50%"} value={masterState.debit_int_code?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} textAlign={"right"} paddingRight={"9px"}  disabled/>
                </div>
            </div>
                <div style={{flex:0.04}}></div>
            </div> 
            <br></br>
              <div style={{ display:"flex",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{flex:0.04}}></div>
                <div style={{flex:0.92}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"10px",paddingTop:"15px",paddingBottom:"10px"}}>
                    <InputField label={"Sector"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.sector} disabled/>
                    <InputField label={"Cash Allowed"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.cash_flag} disabled/>
                    <InputField label={"Sub-Sector"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.sub_sector} disabled/>
                    <InputField label={"Cheque Allowed"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.chq_flag} disabled/>
                    <InputField label={"Delivery Method"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.delivery_method} disabled/>
                    <InputField label={"Int. Statement Frequency"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.int_state_freq} disabled/>
                    <InputField label={"Institute Class"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.institute_class} disabled/>
                    <InputField label={"Next Int. Statement Freq."}labelWidth={"39%"} inputWidth={"50%"} value={masterState?.int_next_state_date}  disabled/>
                   <InputField label={"Isic"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.isic} disabled/>
                    <InputField label={"Number Of Statement Required"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.number_stat_reqd} disabled/>
                    <InputField label={"Statement Frequency"} labelWidth={"34.5%"} inputWidth={"51%"} value={masterState?.statementFreq} disabled/>
                    <InputField label={"Copies To Be Printed"} labelWidth={"39%"} inputWidth={"50%"} value={masterState?.statement_cnt} disabled/>
                    <InputField label={"Last Statement Date"} labelWidth={"34.5%"} inputWidth={"51%"} type={"date"} value={masterState?.last_statement_date} disabled/>
                    <InputField label={"Next Statement Date"} labelWidth={"39%"} inputWidth={"50%"} type={"date"} value={masterState?.next_statement_date} disabled/> 
                </div>
                
                </div>  
                <div style={{flex:0.04}}></div>
            </div>
            </div>
     </div>
  </div>
      );
}

export default AccountDetails;
