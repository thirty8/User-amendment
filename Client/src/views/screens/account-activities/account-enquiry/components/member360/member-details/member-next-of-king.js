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

function MemberNextOfKing({memberID}) {
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
        let ID_ISSUE_DATE= response.data.dataTwo.rows[0][1];
        let ID_EXPIRY_DATE= response.data.dataTwo.rows[0][2];
  
          console.log(data, "kwekuTheTraveller");
          setData((prevState) => ({
            ...prevState,
            nextOfKin: data?.next_of_kin,
            idType: data?.id_type,
            idNumber: data?.id_number,
            expiryDate:ID_EXPIRY_DATE,
            issuingDate: ID_ISSUE_DATE,
            relationship: data?.relationship_type
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
                    label={"Full Name :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.nextOfKin}
                  />
     <InputField
                    label={"Relation Type :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.relationship}
                  />
     <InputField
                    label={"ID Type :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.idType}
                  />
     <InputField
                    label={"ID Number :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.idNumber}
                  />
      <InputField
                    label={"Expiry Date :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    type={"date"}
                    value={data.expiryDate}
                  />
     <InputField
                    label={"Relationship :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
     <InputField
                    label={"Issuing Date :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    type={"date"}
                    value={data.issuingDate}
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
     <InputField
                    label={"Percentage Shared :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />    
   
    </div>
    <div style={{flex:0.05}}></div>
    

   </div>
  );
}

export default MemberNextOfKing;