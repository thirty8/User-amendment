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

function MemberOccupationDetails({memberID}) {

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
            occupation: data?.profession,
            nationality: data?.nationality,
            NationalID: data?.nin,
            dateIssued: ID_ISSUE_DATE,
            dateOfExpiry:ID_EXPIRY_DATE,
            tin: data?.tin,
            idNumber: data?.id_number,
            idIssuedAt: data?.id_issued_at,
            idIssuedAuthority: data?.id_issued_authority,
            DateofIssuance: ID_ISSUE_DATE,
            ExpiryDate: ID_EXPIRY_DATE
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
    <div style={{flex:0.9}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"10px",columnGap:"50px",padding:"10px 0px 15px 0px"}}>
    <InputField
                    label={"Occupation :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.occupation}
                  />
     <InputField
                    label={"Other Occupation :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
    <RadioButtons label={"Resident :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} radioLabel3={"Other"} display={true} display2={true} display3={false}/>
     <InputField
                    label={"Nationality :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.nationality}
                  />
      <InputField
                    label={"National ID :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.NationalID}
                  />
     <InputField
                    label={"Date Issued:"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    type={"date"}
                    value={data.dateIssued}
                  />
     <InputField
                    label={"Date Of Expiry:"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    type={"date"}
                    value={data.dateOfExpiry}
                  />
     <InputField
                    label={"Tin :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.tin}
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
                    label={"ID Issued At :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.idIssuedAt}
                  />
      </div>
      <div className="p-1 text-black font-extrabold">Other Type Of ID</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"10px",columnGap:"50px",padding:"10px 0px 15px 0px"}}>
     <InputField
                    label={"ID Type:"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
     <InputField
                    label={"Issue Authority:"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.idIssuedAuthority}
                  />
      <InputField
                    label={"Date Issued :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    type={"date"}
                    disabled
                    value={data.DateofIssuance}
                  />
     <InputField
                    label={"Date Of Expiry :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    type={"date"}
                    disabled
                    value={data.ExpiryDate}
                  />
    </div>
    </div>
    <div style={{flex:0.05}}></div>
    

   </div>
  );
}

export default MemberOccupationDetails;