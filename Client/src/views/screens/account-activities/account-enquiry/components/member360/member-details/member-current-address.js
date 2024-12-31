import React, { useState, useEffect } from "react";
import axios from 'axios';
import swal from 'sweetalert';

import InputField from "../../../../../../../components/others/Fields/InputField";
import Header from "../../../../../../../components/others/Header/Header";
import RadioButtons from "../../../../../../../components/others/Fields/RadioButtons";
import {API_SERVER} from '../../../../../../../config/constant';

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function MemberCurrentAddress({memberID}) {
  const [data,setData] = useState({});
  
  useEffect(()=>{
    if(memberID.length === 6 ){
    axios.post(
        API_SERVER + "/api/getMemberAddressInfo",
        {
          customerNumber: memberID,
        },
        { headers }
      )
      .then((response) => {
        let data = response.data.response[0];
        // let data = response.data.response[0];
  
          console.log(data, "cee");
          setData((prevState) => ({
            ...prevState,
            houseType: data?.house_type,
            flat: data?.flat,
            streetName: data?.street_name,
            location: data?.location,
            city: data?.location,
            nearestLandMark: data?.ph_nearest_land_mark,
            attentionParty: data?.ph_attention_party,
            natureOfOwnership: data?.nature_of_ownership,
            stayedSince: data?.styed_since,
            costOfAccom: data?.cost_of_accom,
            currentValue: data?.current_value,
            balanceMortguage: data?.balance_mortguage,
}));
      })
      .catch((error) => {
        console.log(error);
      });
  }},[memberID])

console.log(memberID,"ID l3")
  


        return (
          <div style={{display:"flex",boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",backgroundColor:"white"}}>
          <div style={{flex:0}}></div>
          <div style={{flex:1}}>
          <Header headerShade={true} title={"CURRENT ADDRESS"} />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"10px",columnGap:"50px",padding:"10px 0px 15px 0px"}}>
          <InputField
                          label={"Region :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          // value={data.region}
                        />
           <InputField
                          label={"House Type :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.houseType}
                        />
           <InputField
                          label={"Flat/Villa/House No. :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.flat}
                        />
           <InputField
                          label={"Building Name :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          // value={data.region}
                        />
            <InputField
                          label={"Street Name :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.streetName}
                        />
           <InputField
                          label={"Location :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.location}
                        />
           <InputField
                          label={"City :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.city}
                        />
           <InputField
                          label={"Nearest Land Mark :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.nearestLandMark}
                        />    
          <InputField
                          label={"Attention Party :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.attentionParty}
                        />
           <InputField
                          label={"Nature Of Ownership :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          // type={"date"}
                          disabled
                          value={data.natureOfOwnership}
                        />
             <InputField
                          label={"Stayed Since :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.stayedSince}
                        />
           <InputField
                          label={"Cost Of Accommodation :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          // type={"date"}
                          disabled
                          value={data.costOfAccom}
                        />
            <InputField
                          label={"Current Value :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.currentValue}
                        />
           <InputField
                          label={"Balance Mortgage:"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          // type={"date"}
                          disabled
                          value={data.balanceMortguage}
                        />
            </div>
            <Header headerShade={true} title={"PERMANENT ADDRESS"} />
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"10px",columnGap:"50px",padding:"10px 0px 15px 0px"}}>
            <InputField
                          label={"Region :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          // value={data.region}
                        />
           <InputField
                          label={"House Type :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.houseType}
                        />
           <InputField
                          label={"Flat/Villa/House No. :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.flat}
                        />
           <InputField
                          label={"Building Name :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          // value={data.region}
                        />
            <InputField
                          label={"Street Name :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.streetName}
                        />
           <InputField
                          label={"Location :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.location}
                        />
           <InputField
                          label={"City :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.city}
                        />
           <InputField
                          label={"Nearest Land Mark :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.nearestLandMark}
                        />    
          <InputField
                          label={"Attention Party :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.attentionParty}
                        />
           <InputField
                          label={"Nature Of Ownership :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          // type={"date"}
                          disabled
                          value={data.natureOfOwnership}
                        />
             <InputField
                          label={"Stayed Since :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.stayedSince}
                        />
           <InputField
                          label={"Cost Of Accommodation :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          // type={"date"}
                          disabled
                          value={data.costOfAccom}
                        />
            <InputField
                          label={"Current Value :"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          disabled
                          value={data.currentValue}
                        />
           <InputField
                          label={"Balance Mortgage:"}
                          labelWidth={"30%"}
                          inputWidth={"50%"}
                          // textAlign={"right"}
                          paddingRight={"5px"}
                          // type={"date"}
                          disabled
                          value={data.balanceMortguage}
                        />
          </div>
          </div>
          <div style={{flex:0}}></div>
          
      
         </div>
        );
}

export default MemberCurrentAddress;