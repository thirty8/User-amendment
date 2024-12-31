import React from "react";
import { useState, useEffect} from 'react';
import { Tabs } from "@mantine/core";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";

import {AiOutlineEye} from 'react-icons/ai';

import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import ButtonType from "../../../../../../components/others/Button/ButtonType";
import DataTable from "../../../../../../components/others/customtable";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};


function RelationDetails({Dataa}) {

  const [masterState,setMasterState] = useState({});
  
  let addressArray = [];
  let employmentArray = [];
  let contactArray = [];
  let otherBankDetailsArray = [];
  const [relationState,setRelationState] = useState([]);
  const [addressState,setAddressState] = useState([]);
  const [employmentState,setEmploymentState] = useState([]);
  const [contactState,setContactState] = useState([]);
  const [otherBankDetailsState,setOtherBankDetailsState] = useState([]);

  const getRelationAccounts = () =>{
    axios
    .post(API_SERVER + "/api/getInvidualRelationshipAmendment/RelationAccounts",{
      customerID:Dataa?.customerNumber
    },{headers})
    .then((response)=>{
      let results = response.data
      let relationArray = [];
      results.map((i,key)=>{
        relationArray.push([i.relation_no,i.first_name,i.surname,i.gender,i.date_of_birth,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent onClick={()=>{getRelationDetails(results[key].relation_no)}} buttonIcon={<AiOutlineEye size={20}/>} buttonWidth={"40px"} buttonHeight={"30px"}/></div>])
      })
      setRelationState(relationArray)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  

  const getRelationDetails = (v) =>{
    axios
    .post(API_SERVER + "/api/getInvidualRelationshipAmendment/RelationDetails",{
      relationID: v
    },{headers})
    .then((response)=>{
      let results = response.data.response[0];
      let codeDescriptions = response.data.response2;
          //  console.log(results,"vee")
        // console.log(codeDescriptions, "yolos");
      setMasterState((prevState) => ({
        ...prevState,
        firstName: results?.first_name,
        MiddleName: results?.middle_name,
        surname: results?.surname,
        aliasName: results?.alias_name,
        title:codeDescriptions[0]?.actual_code + "        -        " + codeDescriptions[0]?.description,
        gender: results?.gender,
        mobileNumber: results?.mobile1,
        suffix: results?.suffix,
        PlaceOfBirth: results?.place_of_birth,
        DateOfBirth: results?.date_of_birth,
        emailAddress: results?.email_address,
        residenceStatus: results?.residence_status,
        DormicileCountry:codeDescriptions[1]?.actual_code + "        -        " + codeDescriptions[1]?.description,
        idNumber: results?.id_number,
        idExpiryDate: results?.id_expiry_date,
        ResidenceCountry:codeDescriptions[2]?.actual_code + "        -        " + codeDescriptions[2]?.description,
        idType: results?.id_type,
        nationality:codeDescriptions[3]?.actual_code + "        -        " + codeDescriptions[3]?.description,
        consolidatedStatement: results?.cosolidated_statement,
        issuingDate: results?.id_issue_date,
        issuingPlace: results?.id_issued_at,
        constitutionalCode: results?.constitutional_code,
        IdIssuedAuthority: results?.id_issued_authority,
        residentialAddress: results?.residential_address,
        nextOfKin: results?.next_of_kin,
        numberOfCars: results?.number_of_cars,
        maritalStatus: results?.marital_status,
        numberOfDependants: results?.number_of_dependants,
        nextOfKinAddress: results?.next_of_kin_address,
        mothersFname: results?.mothers_fname,
        nextOfKinPhone: results?.next_of_kin_phone,
        mothersMiddleName: results?.mothers_mi_name,
        preferedATMlang: results?.prefered_atm_lang,
        mothersMaidenName: results?.mothers_maiden_name,
        preferedPHONElang: results?.prefered_phone_lang,
        qualification: results?.qualification,
        workType: results?.nature_of_work,
        
      }));
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const getAddressDetails= () =>{
    axios
    .post(API_SERVER + "/api/getInvidualRelationshipAmendment/AddressDetails",{
      customerID:Dataa?.customerNumber
    },{headers})
    .then((response)=>{
      let results = response.data
      results.map((i,key)=>{
        addressArray.push([i.relation_no,i.po_address1,i.po_city,i.house_type,i.ph_address1,i.ph_address2,i.location,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent onClick={()=>{getAddressInfo(results[key].relation_no)}} buttonIcon={<AiOutlineEye size={20}/>} buttonWidth={"40px"} buttonHeight={"30px"}/></div>])
      })
      setAddressState(addressArray)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const getAddressInfo = (v) =>{
    axios
    .post(API_SERVER + "/api/getInvidualRelationshipAmendment/AddressInfo",{
      relationID: v
    },{headers})
    .then((response)=>{
      let results = response.data.response[0];
      let codeDescriptions = response.data.response2;
      // console.log(v,"vee")
      // console.log(relationNumber.relationNo)
      console.log(codeDescriptions, "yolos");
      setMasterState((prevState) => ({
        ...prevState,
        email: results?.email,
        phone1: results?.phone1,
        phone2: results?.phone2,
        houseType: results?.house_type,
        flat: results?.flat,
        natureOfOwnership: results?.nature_of_ownership,
        costOfAccom: results?.cost_of_accom,
        styedSince: results?.styed_since,
        streetName: results?.street_name,
        currentValue: results?.current_value,
        location: results?.location,
        city:codeDescriptions[0]?.actual_code + "        -        " + codeDescriptions[0]?.description,
        balanceMortguage: results?.balance_mortguage,
        fax: results?.fax_no,
        nearestLandMark: results?.ph_nearest_land_mark,
        attentionParty: results?.ph_attention_party,
        postalZipCode: results?.po_address2,
        poAddress: results?.po_address1,
        countryCode:codeDescriptions[1]?.actual_code + "        -        " + codeDescriptions[1]?.description,
        poCity: results?.po_city,
        POattentionParty: results?.po_attention_party,
        POnearestLandMark: results?.po_nearest_land_mark
      }));
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const getEmploymentDetails= () =>{
    axios
    .post(API_SERVER + "/api/getInvidualRelationshipAmendment/EmploymentDetails",{
      customerID:Dataa?.customerNumber
    },{headers})
    .then((response)=>{
      let results = response.data
      results.map((i,key)=>{
        employmentArray.push([i.relation_no,i.employment_category,i.employer_name,i.position_held,i.department,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent onClick={()=>{getEmploymentInfo(results[key].relation_no)}} buttonIcon={<AiOutlineEye size={20}/>} buttonWidth={"40px"} buttonHeight={"30px"}/></div>])
      })
      setEmploymentState(employmentArray)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const getEmploymentInfo = (v) =>{
    axios
    .post(API_SERVER + "/api/getInvidualRelationshipAmendment/EmploymentInfo",{
      relationID: v
    },{headers})
    .then((response)=>{
      let results = response.data[0]
      console.log(v,"vee")
      // console.log(relationNumber.relationNo)
      setMasterState((prevState) => ({
        ...prevState,
        employmentCategory: results?.employment_category,
        city: results?.city,
        employmentType: results?.employment_type,
        employerName: results?.employer_name,
        employmentNo: results?.employment_no,
        fixedTermCont: results?.fixed_term_cont,
        others: results?.others,
        faxNo: results?.fax_no,
        address1: results?.address1,
        address2: results?.address2,
        landMark: results?.land_mark,
        salaryDay: results?.salary_day,
        salaryFreq: results?.salary_freq,
        location: results?.location,
        salaryAmt: results?.salary_amt,
        employedSince: results?.employed_since,
        positionHeld: results?.position_held,
        dateBegan: results?.date_began,
        dateExited: results?.date_exited, 
      }));
    })
    .catch((error)=>{
      console.log(error)
    })
  }



  useEffect(()=> {
    getRelationAccounts();
    getAddressDetails();
    getEmploymentDetails();
  },[])

 return (
    <div style={{ background:""}}>
      <div style={{ marginTop: "20px", padding: "3px" }}>
        <Tabs defaultValue="gallery" variant="pills">
      <Tabs.List style={{ borderTop: '1px solid lightgrey', borderBottom: '1px solid lightgrey', padding: "1px 0px 1px 0px" }}>
        <Tabs.Tab value="gallery">Relation Info</Tabs.Tab>
        <Tabs.Tab value="messages">Address</Tabs.Tab>
        <Tabs.Tab value="laterr">Employment</Tabs.Tab>
        <Tabs.Tab value="former">Contact</Tabs.Tab>
        <Tabs.Tab value="letter">Other Bank Details</Tabs.Tab>
        
      </Tabs.List>
        {/* header */}
        <Tabs.Panel value="gallery" pt="xs">
          <div>
        <DataTable rowsPerPage={2} data={relationState} headers={["Relation Number","First Name","Surname","Gender","Date Of Birth","Action"]}/>
        </div>
        <br></br>
        <div style={{marginBottom:"10px"}}>
        <Header headerShade={true} title={"RELATION DETAILS"} />
        </div>
       {/* main details */}
        <div style={{display:"flex"}}>
        <div style={{flex:0.05}}></div>
        <div style={{flex:0.9}}>
       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"10px",columnGap:"50px",paddingTop:"5px"}}>
       <InputField label={"First Name"} labelWidth={"35%"} inputWidth={"60%"} value={masterState?.firstName} disabled/>
       <InputField label={"Middle Name"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.MiddleName} disabled/>
       <InputField label={"Surname"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.surname} disabled/>
       <InputField label={"Alias Name"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.aliasName} disabled/>
      <InputField label={"Title"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.title} disabled/>
      <InputField label={"Gender"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.gender} disabled/>
      <InputField label={"Suffix"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.suffix} disabled/>
      <InputField label={"Mobile Number"} labelWidth={"35%"} inputWidth={"60%"} value={masterState?.mobileNumber} disabled/> 
      <InputField label={"Email Address"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.emailAddress} disabled/>
      <InputField label={"Date Of Birth"} labelWidth={"35%"} inputWidth={"60%"} type={"date"} value={masterState?.DateOfBirth} disabled/>
      <InputField label={"Domicile Country"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.DormicileCountry} disabled/>
      <InputField label={"Place Of Birth"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.PlaceOfBirth} disabled/>
      <InputField label={"Country Of Residence"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.ResidenceCountry} disabled/>
      <RadioButtons label={"Residential Status"} labelWidth={"37%"} radioButtonsWidth={"63%"} radioLabel={"Resident"} radioLabel2={"Non-Resident"} display={true} display2={true}/>
      <InputField label={"Nationality"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.nationality} disabled/>
      <InputField label={"National ID Number"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} disabled/>
      <RadioButtons label={"Consolidated Statement"} labelWidth={"36%"} radioButtonsWidth={"54%"} radioLabel={"Yes"} radioLabel2={"No"} display={true} display2={true}/>
      <InputField label={"ID Expiry Date"} labelWidth={"35%"} inputWidth={"60%"} type={"date"} value={masterState?.idExpiryDate}/>
      <InputField label={"Staff Category"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} disabled/> 
      <InputField label={"ID Type"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.idType} disabled/>
      <InputField label={"Constitutional Code"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.constitutionalCode} disabled/>
      <InputField label={"ID Number"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.idNumber} disabled/>
      <InputField label={"Residential Address"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.residentialAddress} disabled/>
      <InputField label={"ID Expiry Date"} labelWidth={"35%"} inputWidth={"60%"} type={"date"} value={masterState?.idExpiryDate} disabled/>
      <InputField label={"Marital Status"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.maritalStatus} disabled/>
      <InputField label={"ID Issue Date"} labelWidth={"35%"} inputWidth={"60%"} type={"date"} value={masterState?.issuingDate} disabled/>
      <InputField label={"No. Of Dependants"} labelWidth={"35%"} inputWidth={"60%"} value={masterState?.numberOfDependants} disabled/>
      <InputField label={"ID Issued At"} labelWidth={"35%"} inputWidth={"60%"} type={"type"} value={masterState?.issuingPlace} disabled/>
      <InputField label={"Next of Kin"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.nextOfKin} disabled/>
      <InputField label={"ID Issued Authority"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.IdIssuedAuthority} disabled/>
      <InputField label={"Number Of Cars"} labelWidth={"35%"} inputWidth={"60%"} type={"type"} value={masterState?.numberOfCars} disabled/>
      <InputField label={"Tax Number"} labelWidth={"35%"} inputWidth={"60%"} type={"type"} disabled/>
    
       {/* <div style={{display:"flex"}}>
        <div style={{display:"flex",flex:0.63}}>
       <InputField label={"Gender"} labelWidth={"55.5%"} inputWidth={"20%"} type={"text"} value={masterState?.gender} disabled/>
      </div>
      <div style={{display:"flex",flex:0.37}}>
      <InputField label={"Mobile No."} labelWidth={"35%"} inputWidth={"65%"} type={"text"} value={masterState?.mobileNumber} disabled/> 
      </div>
      </div> */}
      {/* <div style={{display:"flex"}}>
        <div style={{display:"flex",flex:0.63}}>
        <InputField label={"Place Of Birth"} labelWidth={"55.5%"} inputWidth={"65%"} type={"text"} value={masterState?.PlaceOfBirth} disabled/>
      </div>
      <div style={{display:"flex",flex:0.37}}>
      <InputField label={"Date Of Birth"} labelWidth={"47%"} inputWidth={"53%"} type={"date"} value={masterState?.DateOfBirth} disabled/>
      </div>
      </div> */}
      {/* <div style={{ display:"flex",alignItems:"center"}}>
                  <div style={{flex:0.39}}>
                <label style={{fontSize:"85%"}}>Residential Status</label>
                </div>
                <div  style={{display:"flex",flex:0.6}}>
                  <div style={{flex:0.4}}>
                <ButtonType type={"radio"} label={"Resident"}/>
                </div>
                <div style={{flex:0.35}}>
                <ButtonType type={"radio"} label={"Non-Resident"}/>
                </div>
                </div>
        </div> */}
        {/* <InputField label={"Residential Status"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.residenceStatus} disabled/> */}

      {/* <div style={{display:"flex"}}>
        <div style={{display:"flex",flex:0.65}}>
        <InputField label={"National ID Number"} labelWidth={"55.5%"} inputWidth={"35%"} type={"text"}/>
      </div>
      <div style={{display:"flex",flex:0.35}}>
      <InputField label={"ID Expiry Date"} labelWidth={"47%"} inputWidth={"53%"} type={"date"} value={masterState?.idExpiryDate}/>
      </div>
      </div> */}
    
    
     
      {/* <div style={{display:"flex"}}>
        <div style={{display:"flex",flex:0.65}}>
        <InputField label={"ID Number"} labelWidth={"55.5%"} inputWidth={"35%"} type={"text"} value={masterState?.idNumber} disabled/>
      </div>
      <div style={{display:"flex",flex:0.35}}>
      <InputField label={"ID Expiry Date"} labelWidth={"47%"} inputWidth={"53%"} type={"date"} value={masterState?.idExpiryDate} disabled/>
      </div>
      </div> */}
      {/* <div style={{ display:"flex",alignItems:"center"}}>
        <div style={{ display:"flex",flex:0.49,alignItems:"center"}}>
                  <div style={{flex:0.65}}>
                <label style={{fontSize: "85%" }}>Consolidated Statement</label>
                </div>
                <div  style={{display:"flex",flex:0.35,justifyContent:"space-between"}}>
                  <div>
                <ButtonType type={"radio"} label={"Yes"}/>
                </div>
                <div>
                <ButtonType type={"radio"} label={"No"}/>
                </div>
                </div>
        </div>
        <div style={{flex:0.06,alignItems:"center"}}></div>
        <div style={{flex:0.45}}>
        <InputField label={"Staff Category"} labelWidth={"65%"} inputWidth={"38%"} type={"text"} disabled/>  
        </div>
        </div> */}
      {/* <div style={{display:"flex"}}>
        <div style={{display:"flex",flex:0.63}}>
        <InputField label={"ID Issue Date"} labelWidth={"55.5%"} inputWidth={"35.5%"} type={"date"} value={masterState?.issuingDate} disabled/>
      </div>
      <div style={{display:"flex",flex:0.37}}>
      <InputField label={"ID Issued At"} labelWidth={"47%"} inputWidth={"53%"} type={"type"} value={masterState?.issuingPlace} disabled/>
      </div>
      </div> */}
     
      {/* <div style={{display:"flex"}}>
        <div style={{display:"flex",flex:0.63}}>
        <InputField label={"ID Issued Authority"} labelWidth={"55.5%"} inputWidth={"35%"} type={"text"} value={masterState?.IdIssuedAuthority} disabled/>
      </div>
      <div style={{display:"flex",flex:0.37}}>
      <InputField label={"Tax Number"} labelWidth={"47%"} inputWidth={"53%"} type={"type"} disabled/>
      </div>
      </div> */}
    
      {/* <div style={{display:"flex"}}>
        <div style={{display:"flex",flex:0.63}}>
        <InputField label={"Next of Kin"} labelWidth={"55.5%"} inputWidth={"35%"} type={"text"} value={masterState?.nextOfKin} disabled/>
      </div>
      <div style={{display:"flex",flex:0.37}}>
      <InputField label={"No. Of Cars"} labelWidth={"47%"} inputWidth={"53%"} type={"type"} value={masterState?.numberOfCars} disabled/>
      </div>
      </div> */}
      {/* <div style={{display:"flex"}}>
        <div style={{display:"flex",flex:0.55}}>
       <InputField label={"Marital Status"} labelWidth={"55%"} inputWidth={"65%"} type={"text"} value={masterState?.maritalStatus} disabled/>
      </div>
      <div style={{display:"flex",flex:0.45}}>
      <InputField label={"No. Of Dependants"} labelWidth={"55%"} inputWidth={"23%"} type={"text"} value={masterState?.numberOfDependants} disabled/>
      </div>
      </div> */}
      <InputField label={"Next Of Kin Address"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.nextOfKinAddress} disabled/>
      <InputField label={"Mother's First Name"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.mothersFname} disabled/>
      <InputField label={"Next Of Kin Phone"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.nextOfKinPhone} disabled/>
      <InputField label={"Mother's Middle Name"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.mothersMiddleName} disabled/>
      <InputField label={"Preferred ATM Language"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.preferedATMlang} disabled/>
      <InputField label={"Mother's Maiden Surname"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.mothersMaidenName} disabled/>
       <InputField label={"Preferred Phone Language"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.preferedPHONElang} disabled/>
       <InputField label={"Qualification"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.qualification} disabled/>
       <InputField label={"Work Type"} labelWidth={"35%"} inputWidth={"60%"} type={"text"} value={masterState?.workType} disabled/>
       </div>
       </div>
       <div style={{flex:0.05}}></div>
       </div>
       
        </Tabs.Panel>
        <Tabs.Panel value="messages">
          <div>
          {/* title={"ADDRESS DETAILS"}  */}
          <DataTable rowsPerPage={1} data={addressState} headers={["Relation No.","PO Address1","PO City","House Type","PH Address1","PH Address2","Location","Action"]}/>
          </div>
          <br></br>
          <div style={{marginBottom:"10px"}}>
          <Header headerShade={true} title={"PHYSICAL ADDRESS INFORMATION"} />
          </div>
          <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
         <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "",
            marginBottom:"10px"
          }}
        >
          <div style={{ flex: 0.05 }}>{/* hey */}</div>
          {/* full container */}
          <div style={{ flex: 0.9, backgroundColor: "" }}>
            {/* First Name and MiddleName div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginTop: "10px",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Region"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Email"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled
                  value={masterState?.email}
                />
              </div>
            </div>
            {/* Surname and Alias Name div */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                }}
              >
                <InputField
                  label={"Phone 1"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.phone1}
                  disabled
                />
              </div>
              {/* space  */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Phone 2"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.phone2}
                  disabled
                />
              </div>
            </div>
            {/* Gender  and Title div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"House Type"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState.houseType}
                  disabled
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Flat/Villa/House No."}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.flat}
                  disabled
                />
              </div>
            </div>
            {/* Mobile Number  and Surfix div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Nature Of Ownership"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.natureOfOwnership}
                  disabled
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Cost Of Accom."}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.costOfAccom}
                  disabled
                />
              </div>
            </div>
            {/* Place of Birth  and Date of Birth div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Building Name"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  // value={masterState?.buildingName}
                  disabled
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05}}></div>
              <div style={{ flex: 0.475}}>
                <InputField
                  label={"Stayed Since"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.styedSince}
                  disabled
                />
              </div>
            </div>
            {/* Email Address  and Residential  Status div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Street Name"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.streetName}
                  disabled
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05}}></div>
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Current Value"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.currentValue}
                  disabled
                />
              </div>
            </div>
            {/* Domicile Country,National ID  and ID Expiry Date div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Location"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled
                  value={masterState?.location}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475}}>
                <InputField
                  label={"City"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.city}
                  disabled
                />
              </div>
            </div>
            {/* Country of Residence and ID Type div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Balance Mortgage"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.balanceMortguage}
                  disabled
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475}}>
                <InputField
                  label={"Fax"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.fax}
                  disabled
                />
              </div>
            </div>

            {/* Nationality, ID Number and ID Expiry Date div */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div style={{ flex: 0.475}}>
                <InputField
                  label={"Nearest Land Mark"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.nearestLandMark}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475}}>
                <InputField
                  label={"Attention Party"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.attentionParty}
                  disabled
                />
              </div>
            </div>
    </div>
    <div>
          </div>
          <div style={{ flex: 0.05 }}></div>
        </div>
        
        </div>
        <br></br>
        <div style={{marginBottom:"10px"}}>
        <Header headerShade={true} title={"POSTAL ADDRESS INFORMATION"} />
          </div>
          <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
         <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "",
            
          }}
        >
          <div style={{ flex: 0.05 }}>{/* hey */}</div>
          {/* full container */}
          <div style={{ flex: 0.9, backgroundColor: "" }}>
            {/* First Name and MiddleName div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginTop: "10px",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"P.O. Box Number"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.boxNumber}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Postal Zip Code"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.postalZipCode}
                  disabled
                />
              </div>
            </div>
            {/* Surname and Alias Name div */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                }}
              >
                <InputField
                  label={"Address"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.poAddress}
                  disabled
                />
              </div>
              {/* space  */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Country Code"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.countryCode}
                  disabled
                />
              </div>
            </div>
            {/* Gender  and Title div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Postal City"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.poCity}
                  disabled
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Attention Party"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.POattentionParty}
                  disabled
                />
              </div>
            </div>
            {/* Mobile Number  and Surfix div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Nearest Land Mark"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.POnearestLandMark}
                  disabled
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
        
              </div>
            </div>
            {/* Place of Birth  and Date of Birth div/ */}
        
          </div>
          <div style={{ flex: 0.05 }}></div>
        </div>
        
        </div>
        </Tabs.Panel>
        <Tabs.Panel value="laterr">
        <div>
        {/* title={"EMPLOYMENT DETAILS"} */}
          <DataTable  rowsPerPage={1} data={employmentState} headers={["","Employment Category","Employer","Position Held","Department","Action"]}/>
          </div>
          <br></br>
          <div style={{marginBottom:"10px"}}>
          <Header headerShade={true} title={"EMPLOYMENT DETAILS"} />
          </div>
          <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
         <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "",
          }}
        >
          <div style={{ flex: 0.05 }}>{/* hey */}</div>
          {/* full container */}
          <div style={{ flex: 0.9, backgroundColor: "" }}>
            {/* First Name and MiddleName div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                  marginBottom:"10px"
                }}
              >
                <InputField
                  label={"Employment Category"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.employmentCategory}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"City"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                   value={masterState?.city}
                  disabled={true}
                />
              </div>
            </div>
            {/* Surname and Alias Name div */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                }}
              >
                <InputField
                  label={"Employment Type"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                   value={masterState?.employmentType}
                  disabled={true}
                />
              </div>
              {/* space  */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Employer"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.employerName}
                  disabled={true}
                />
              </div>
            </div>
            {/* Gender  and Title div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Employment No."}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.employmentNo}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div
                style={{
                  display:"flex",
                  flex: 0.475,
                  jusitfyContent: "center",
                  alignItems: "center",
                }}
              >
                <RadioButtons label={"Fixed Term Contract"} labelWidth={"34%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} display={true} display2={true}/>
                            </div>
           </div>
        
            {/* Mobile Number  and Surfix div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Others"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.others}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Fax No."}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                   value={masterState?.faxNo}
                  disabled={true}
                />
              </div>
            </div>
            {/* Place of Birth  and Date of Birth div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Address 1"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.address1}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05}}></div>
              <div style={{ flex: 0.475}}>
                <InputField
                  label={"Address 2"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                   value={masterState?.address2}
                  disabled={true}
                />
              </div>
            </div>
            {/* Email Address  and Residential  Status div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Land Mark"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.landMark}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05}}></div>
              <div
                style={{
                  display:"flex",
                  flex: 0.475,
                  jusitfyContent: "center",
                  alignItems: "center",
                }}
              >
               
                <InputField
                  label={"Salary Day"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.salaryDay}
                  disabled={true}
                />
    
               
              </div>
            </div>
            {/* Domicile Country,National ID  and ID Expiry Date div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Location"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.location}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div
                style={{
                  display:"flex",
                  flex: 0.475,
                  jusitfyContent: "center",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Salary Amount"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                   value={masterState?.salaryAmt}
                  disabled={true}
                />
              </div>
            </div>
            {/* Country of Residence and ID Type div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Position Held"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  value={masterState?.positionHeld}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div
                style={{
                  display:"flex",
                  flex: 0.475,
                  jusitfyContent: "center",
                  alignItems: "center",
                }}
              >
                 <InputField
                  label={"Payment Of Salary Freq."}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                   value={masterState?.salaryFreq}
                  disabled={true}
                />
               
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Department"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                  // value={masterState?}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div
                style={{
                  display:"flex",
                  flex: 0.475,
                  jusitfyContent: "center",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Employed Since"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"text"}
                   value={masterState?.employedSince}
                  disabled={true}
                />
              </div>
            </div>
                <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
               <InputField
                  label={"Date Began"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"date"}
                  value={masterState?.dateBegan}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div
                style={{
                  display:"flex",
                  flex: 0.475,
                  jusitfyContent: "center",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Date Exited"}
                  labelWidth={"34%"}
                  inputWidth={"60%"}
                  type={"date"}
                  value={masterState?.dateExited}
                  disabled={true}
                />
              </div>
            </div>
                {/* <div style={{flex:0.60}}>
               
                </div>
                <div  style={{flex:0.4}}>
                
                </div> */}
            {/* Nationality, ID Number and ID Expiry Date div */}
           
    </div>
    <div>
          </div>
          <div style={{ flex: 0.05 }}></div>
        </div>
        </div>
        </Tabs.Panel>
        <Tabs.Panel value="former">
        <div>
        {/* title={"CONTACT DETAILS"} */}
          <DataTable rowsPerPage={2} headers={["Contact ID","Contact Type","Classification","Description","Contact"]} data={contactState}/>
          </div>
          <br></br>
          <div style={{marginBottom:"10px"}}>
          <Header headerShade={true} title={"CONTACT INFORMATION"} />
          </div>
          <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
         <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "",
          }}
        >
          <div style={{ flex: 0.05 }}>{/* hey */}</div>
          {/* full container */}
          <div style={{ flex: 0.9, backgroundColor: "" }}>
            {/* First Name and MiddleName div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginTop: "20px",
                marginBottom:"15px",
                paddingTop:"10px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Name"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Contact No."}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
            </div>
            {/* Surname and Alias Name div */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"15px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                }}
              >
                <InputField
                  label={"Contact Type"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
              {/* space  */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                <InputField
                  label={"Classification"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  disabled
                />
              </div>
            </div>
            {/* Gender  and Title div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                jusitfyContent: "center",
                marginBottom:"15px"
              }}
            >
                <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                }}
              >
                <InputField
                  label={"Reference"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
              {/* space  */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
                
              </div>    
            
            </div>
            {/* Mobile Number  and Surfix div/ */}
            {/* heree */}
            
    </div>
    <div>
          </div>
          <div style={{ flex: 0.05 }}></div>
        </div>
        
        </div>
        </Tabs.Panel>
        <Tabs.Panel value="letter">
        <div style={{marginTop:"5px"}}>
        {/* title={"OTHER BANK DETAILS"} */}
          <DataTable rowsPerPage={2} headers={["Bank Description","Account Type","Account No.","Branch","Outstanding Balance",""]} data={otherBankDetailsState}/>
          </div>
          <br></br>
          <div style={{marginBottom:"10px"}}>
          <Header headerShade={true} title={"OTHER BANK INFORMATION"} />
          </div>
          <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
         <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "",
          }}
        >
          <div style={{ flex: 0.05 }}>{/* hey */}</div>
          {/* full container */}
          <div style={{ flex: 0.9, backgroundColor: "" }}>
            {/* First Name and MiddleName div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginTop: "30px",
                marginBottom:"15px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Bank"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
              <InputField
                  label={"Account Number"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
            </div>
            {/* Surname and Alias Name div */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"15px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                }}
              >
                <InputField
                  label={"Account Type"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
              {/* space  */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
              <InputField
                  label={"Branch"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
            </div>
            {/* Gender  and Title div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"15px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Facility Amount"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
              <InputField
                  label={"Outstanding Balance"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
            </div>
            {/* Mobile Number  and Surfix div/ */}
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "",
                jusitfyContent: "center",
                marginBottom:"15px"
              }}
            >
              <div
                style={{
                  flex: 0.475,
                  jusitfyContent: "center",
                  backgroundColor: "",
                  alignItems: "center",
                }}
              >
                <InputField
                  label={"Frequency Expiry"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  type={"text"}
                  disabled={true}
                />
              </div>
              {/* space */}
              <div style={{ flex: 0.05, backgroundColor: "" }}></div>
              <div style={{ flex: 0.475 }}>
               
              </div>
            </div>
            {/* Place of Birth  and Date of Birth div/ */}
           
           
    </div>

          <div style={{ flex: 0.05 }}></div>
        </div>
        
        </div>
        </Tabs.Panel>
        </Tabs>
      </div>
    </div>
    // </div>
  );
}

export default RelationDetails;
