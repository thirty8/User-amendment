import React, { useState, useEffect } from "react";
import axios from 'axios';
import swal from 'sweetalert';

import InputField from "../../../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../../../components/others/Fields/RadioButtons";
import {API_SERVER} from '../../../../../../../config/constant';

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function MemberModeOfCommunication({memberID}) {
  const [data,setData] = useState({});

  useEffect(()=>{
    if(memberID.length === 6 ){
    axios.post(
        API_SERVER + "/api/getMemberRelationDetails",
        {
          customerID: memberID,
        },
        { headers }
      )
      .then((response) => {
        let data = response.data.response[0];
        let dateOfBirth= response.data.dataTwo.rows[0];
  
          console.log(data, "kwekuTheTraveller");
          setData((prevState) => ({
            ...prevState,
            mobile1: data?.mobile1,
            email_address: data?.email_address,
            officePhoneNo: data?.office_phone_no,
            officeEmail: data?.office_email,
            homeEmail: data?.email_address,
            enableIB: data?.enable_ib,
            enableMobileBanking: data?.enable_mobileb,
            enableUSSD: data?.enable_ussd,
            enambeSmsAlert: data?.enambe_sms_alert,
            enableEmailAlert: data?.enable_email_alert,
            homePhoneNumber: data?.mobile2,
          }));
      })
      .catch((error) => {
        console.log(error);
      });
  }},[memberID])

console.log(memberID,"ID l3")
  


  return (
    <div style={{display:"flex",boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",backgroundColor:"white"}}>
    <div style={{flex:0.05}}></div>
    <div style={{flex:0.9,display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"10px",columnGap:"50px",padding:"10px 0px 15px 0px"}}>
    <InputField
                    label={"Mobile Communication No. :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.mobile1}
                  />
     <RadioButtons label={"Home Phone Type :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Home Phone 1"} radioLabel2={"Home Phone 2"} display={true} display2={true}/>
     <RadioButtons label={"Office Phone Type :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Office Phone 1"} radioLabel2={"Office Phone 2"} display={true} display2={true}/>
     <InputField
                    label={"Office Phone No. :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                       value={data.office_phone_no}
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
      <InputField
                    label={"Office Email :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.officeEmail}
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
     <InputField
                    label={"Home Email :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                     value={data.homeEmail}
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
     <RadioButtons label={"Enable Internet Banking :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} display={true} display2={true}/>
     <RadioButtons label={"Enable Mobile Banking :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} display={true} display2={true}/>  
     <RadioButtons label={"Enable USSD :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} display={true} display2={true}/>
     <RadioButtons label={"Enable SMS Alert :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} display={true} display2={true}/>
     <RadioButtons label={"Enable Email Alert :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} display={true} display2={true}/>
     <InputField
                    label={"Mobile Bank Phone No. :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
      <InputField
                    label={"Mobile Bank Email :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
     <InputField
                    label={"Home Phone No. :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                                         value={data.homePhoneNumber}
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
    </div>
    <div style={{flex:0.05}}></div>
    

   </div>
  );
}

export default MemberModeOfCommunication;