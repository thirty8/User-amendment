import React from "react";
import { useState, useEffect} from 'react';
import { Tabs } from "@mantine/core";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";

import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import DataTable from "../../../../../../components/others/customtable";
import ButtonType from "../../../../../../components/others/Button/ButtonType";
import SelectField from "../../../../../../components/others/Fields/SelectField";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function CustomerEnquiry({Dataa}) {
    const [masterState,setMasterState] = useState([]);
    let array = []

    const getCustomerEnquiryInfo = () =>{
        console.log("okay")
        axios
        .post(API_SERVER + "/api/getInvidualRelationshipAmendment/CustomerEnquiryInfo",{
          customerNumber: Dataa?.customerNumber
        },{headers})
        .then((response)=>{
          let results = response.data[0]
          setMasterState((prevState) => ({
            ...prevState,
            clientName: results?.client_name,
            clientSince: results?.client_since,
            addressline1: results?.addressline1,
            dob: results?.dob,
            primary_id_type: results?.primary_id_type,
            mother_maiden_name: results?.mother_maiden_name,
            primary_id_number: results?.primary_id_number,
            relation_officer: results?.relation_officer,
            home_phone: results?.home_phone,
            email: results?.email,
            work_phone: results?.work_phone,
            segment: results?.segment,
            branch_name: results?.branch_name,
            peferred_name: results?.peferred_name,
            contact_method: results?.contact_method,

          }));
        })
        .catch((error)=>{
          console.log(error)
        })
      }

    //   const getAddressInfo = () =>{
    //     axios
    //     .post(API_SERVER + "/api/getInvidualRelationshipAmendment/AddressInfo",{
    //       relationID: v
    //     },{headers})
    //     .then((response)=>{
    //       let results = response.data[0]
    //       console.log(v,"vee")
    //       // console.log(relationNumber.relationNo)
    //       setMasterState((prevState) => ({
    //         ...prevState,
    //         email: results?.email,
    //         phone1: results?.phone1,
    //         phone2: results?.phone2,
    //         houseType: results?.house_type,
    //         flat: results?.flat,
    //         natureOfOwnership: results?.nature_of_ownership,
    //         costOfAccom: results?.cost_of_accom,
    //         styedSince: results?.styed_since,
    //         streetName: results?.street_name,
    //         currentValue: results?.current_value,
    //         location: results?.location,
    //         city: results?.ph_city,
    //         balanceMortguage: results?.balance_mortguage,
    //         fax: results?.fax_no,
    //         nearestLandMark: results?.ph_nearest_land_mark,
    //         attentionParty: results?.ph_attention_party,
    //         postalZipCode: results?.po_address2,
    //         poAddress: results?.po_address1,
    //         countryCode: results?.country_code,
    //         poCity: results?.po_city,
    //         POattentionParty: results?.po_attention_party,
    //         POnearestLandMark: results?.po_nearest_land_mark
    //       }));
    //     })
    //     .catch((error)=>{
    //       console.log(error)
    //     })
    //   }
    
    

      useEffect(()=> {
        getCustomerEnquiryInfo();
        // getAddressInfo();
      },[])


  return (
    <div style={{zoom:0.9}}>
      <div className="home_page_container" style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
      <Tabs defaultValue="gallery" variant="pills">
      <Tabs.List>
        <Tabs.Tab value="gallery">Summary</Tabs.Tab>
        <Tabs.Tab value="messages">Address</Tabs.Tab>
        <Tabs.Tab value="laterr">Personal Info</Tabs.Tab>
        <Tabs.Tab value="former">Accounts</Tabs.Tab>
        <Tabs.Tab value="letter">Employment</Tabs.Tab>
      </Tabs.List>
       
        <Tabs.Panel value="gallery" pt="xs">
        <div >
        <Header headerShade={true} title={"Client Demographics"} />
            <br></br>
            <div style={{paddingTop:"7px",paddingBottom:"7px",display:"flex",gap:"10px",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
            <div style={{display:"flex",flex:0.73,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{flex:0.05}}></div>
                <div style={{flex:0.93}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"30px",rowGap:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
                    <InputField label={"$fname $lname $lname"} labelWidth={"40%"} inputWidth={"60%"}  disabled/>
                    <InputField label={"Client Since"} labelWidth={"40%"} inputWidth={"60%"} type={"date"} value={masterState?.clientSince} disabled/>
                    <InputField label={"$homeadd"} labelWidth={"40%"} inputWidth={"60%"} disabled/>
                    <InputField label={"Birth Date"} labelWidth={"40%"} inputWidth={"60%"} type={"date"} value={masterState?.dob} disabled/>
                    <InputField label={"$postalcode"} labelWidth={"40%"} inputWidth={"60%"} disabled/>
                    <InputField label={"Primary ID Type"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.primary_id_type} disabled/>
                    <InputField label={"Mother's Maiden Name"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.mother_maiden_name} disabled/>
                    <InputField label={"Primary ID Number"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.primary_id_number} disabled/>
                    <InputField label={"Relationship Officer"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.relation_officer} disabled/>
                    <InputField label={"Home Phone"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.home_phone} disabled/>
                    <InputField label={"E-mail"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.email} disabled/>
                    <InputField label={"Work Phone"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.work_phone} disabled/>
                    <InputField label={"Segment"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.segment} disabled/>
                    <InputField label={"Branch"} labelWidth={"40%"} inputWidth={"60%"} value={masterState?.branch_name} disabled/>
                </div>
                </div>
                <div style={{flex:0.02}}></div>
            </div>
            <div style={{flex:0.27,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",marginRight:"5px"}}>
            <Header headerShade={true} title={"Client Privacy"} />
    
            <div style={{display:"flex",paddingTop:"10px",alignItems:"center"}}>
                <div style={{flex:0.1}}></div>
                <div style={{flex:0.8,alignItems:"center"}}>
                    <div style={{display:"flex",marginBottom:"20px"}}>
                  <div style={{flex:0.4}}>
                <label>OPT OUT:</label>
                </div>
                <div  style={{display:"flex",flex:0.6}}>
                  <div style={{flex:0.5}}>
                <ButtonType type={"radio"} label={"Yes"}/>
                </div>
                <div style={{flex:0.2}}>
                <ButtonType type={"radio"} label={"No"}/>
                </div>
                </div>
                {/* here */}
                </div>
                <div style={{display:"flex"}}>
                  <div style={{flex:0.4}}>
                <label>DO NOT:</label>
                </div>
                <div  style={{flex:0.6}}>
                  <div style={{marginBottom:"25px"}}>
                <ButtonType type={"radio"} label={"Call"}/>
                </div>
                <div style={{marginBottom:"25px"}}>
                <ButtonType type={"radio"} label={"Mail"}/>
                </div>
                <div style={{marginBottom:"25px"}}>
                <ButtonType type={"radio"} label={"E-mail"}/>
                </div>
                <div>
                <ButtonType type={"radio"} label={"Share"}/>
                </div>
        
                </div>
                </div>
                </div>
                <div style={{flex:0.1}}></div>
                </div>
              
            </div>
            </div>
            <br></br>
            <div style={{paddingTop:"5px",paddingBottom:"7px",display:"flex",gap:"10px",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
            <div style={{flex:0.7,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
            <Header headerShade={true} title={"Balance And Services Summary"} />
                <div style={{display:"flex",flex:1,marginBottom:"10px"}}>
                <div style={{flex:0.01}}></div>
                <div style={{flex:0.98}}>
                <div style={{display:"grid",gridTemplateColumns:"1.1fr 0.8fr 1.1fr",columnGap:"100px",rowGap:"10px",paddingTop:"18px",paddingBottom:"18px"}}>
                    <InputField label={"Total Deposits"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    <InputField label={"Loans"} labelWidth={"35%"} inputWidth={"65%"} disabled/>
                    <InputField label={"Investments"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",columnGap:"100px",paddingTop:"8px",paddingBottom:"30px"}}>
                <ButtonType type={"radio"} label={"SMS"}/>
                <ButtonType type={"radio"} label={"Email"}/>
                <ButtonType type={"radio"} label={"ATM/Debit Card"}/>
                <ButtonType type={"radio"} label={"Online Banking"}/>
                </div>
                </div>
                <div style={{flex:0.01}}></div>
                </div>
                <Header headerShade={true} title={"Most Recent Contacts"} />
                <div style={{marginTop:"15px"}}>
                <DataTable rowsPerPage={2} headers={["Date","Method","Subject","Notes","Completed By"]} data={[array]}/>
                </div>
            </div>
            <div style={{flex:0.3,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",marginRight:"5px"}}>
            <Header headerShade={true} title={"Client Preferences"} />
            <div style={{display:"flex"}}>
            <div style={{flex:0.1}}></div>
            <div style={{flex:0.8}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr",paddingTop:"10px",paddingBottom:"10px",rowGap:"10px"}}>
            <InputField label={"Preferred Name"} labelWidth={"45%"} inputWidth={"55%"} value={masterState?.peferred_name} disabled/>
            <InputField label={"Contact Method"} labelWidth={"45%"} inputWidth={"55%"} value={masterState?.contact_method} disabled/>
                </div>
                <div style={{display:"flex"}}>
                  <div style={{flex:0.5}}>
                <label>Preferred Days</label>
                </div>
                <div  style={{flex:0.6}}>
                  <div style={{marginBottom:"14px"}}>
                <ButtonType type={"radio"} label={"Monday"}/>
                </div>
                <div style={{marginBottom:"14px"}}>
                <ButtonType type={"radio"} label={"Tuesday"}/>
                </div>
                <div style={{marginBottom:"14px"}}>
                <ButtonType type={"radio"} label={"Wednesday"}/>
                </div>
                <div style={{marginBottom:"14px"}}>
                <ButtonType type={"radio"} label={"Thursday"}/>
                </div>
                <div style={{marginBottom:"14px"}}>
                <ButtonType type={"radio"} label={"Friday"}/>
                </div>
                <div style={{marginBottom:"14px"}}>
                <ButtonType type={"radio"} label={"Saturday"}/>
                </div>
                <div>
                <ButtonType type={"radio"} label={"Sunday"}/>
                </div>
        
                </div>
                </div>
            </div>
            <div style={{flex:0.1}}></div>
            </div>
            </div>
            </div>

        </div>
        </Tabs.Panel>
        <Tabs.Panel value="messages">
        <div style={{paddingTop:"10px"}}>
        <Header headerShade={true} title={"Postal Address Details"} />
            <br></br>
            <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{display:"flex"}}>
                    <div style={{flex:0.1}}></div>
                    <div style={{flex:0.8}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"80px",rowGap:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
                        <InputField label={"P.O. Box Number"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    <InputField label={"Postal Zip Code"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    <InputField label={"Address"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    <InputField label={"Country Code"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    <InputField label={"City"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    <InputField label={"Attention Party"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    <InputField label={"Nearest Land Mark"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        </div>
                    </div>
                    <div style={{flex:0.1}}></div>
                </div>
            </div>
            <br></br>
            <Header headerShade={true} title={"Physical Address Details"} />
            <br></br>
            <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{display:"flex"}}>
                    <div style={{flex:0.1}}></div>
                    <div style={{flex:0.8}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"80px",rowGap:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
                        <InputField label={"Region"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Phone Number"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"House Type"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Nature Of Ownership"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Flat/Villa No."} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Stayed Since"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Address 1"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Address 2"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Cost Of Accomodation"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Location"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"City"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Current Value"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Nearest Land Mark"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Attention Party"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Fax"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    
                        </div>
                    </div>
                    <div style={{flex:0.1}}></div>
                </div>
            </div>
        </div>
        
        </Tabs.Panel>
        <Tabs.Panel value="laterr">
        <div style={{paddingTop:"10px"}}>
          <div style={{zoom:0.8}}>
          <Header headerShade={true} title={"INFO"} />
            <DataTable rowsPerPage={false} headers={["Signatory ID","First Name","Surname","Gender","Date Of Birth"]} data={[array]}/>
            </div>
            <br></br>
            <div style={{paddingTop:"15px",paddingBottom:"5px",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{display:"flex"}}>
                    <div style={{flex:0.05}}></div>
                    <div style={{flex:0.9}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"80px",rowGap:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
                        <InputField label={"First Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Middle Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Surname"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Alias Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Sex"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Date Of Birth"} labelWidth={"40%"} inputWidth={"55%"} type={"date"} disabled/>
                        <InputField label={"Nationality"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Domicile Country"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Country Of Residence"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Next of Kin"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Next of Kin Address"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Next of Kin Phone"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Suffix"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Salutation"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Email Address"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Mobile Number"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Place Of Birth"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Number Of Dependants"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Marital Status"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Mother's First Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Mother's Middle Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Mother's Maiden Surname"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    </div>
                    </div>
                    <div style={{flex:0.05}}></div>
                </div>
            </div>
        </div>
        </Tabs.Panel>
        <Tabs.Panel value="former">
        <div style={{paddingTop:"10px"}}>
          <div style={{zoom:"0.9",marginBottom:"20px"}}>
          <Header headerShade={true} title={"CURRENT/SAVING ACCOUNT (CASA) LISTING"} />
        <DataTable headers={["Account No.","Account Description","Product","Currency","Status Indicator","Closing Balance"]} data={[array]}/>
        </div>
            <br></br>
            <div style={{zoom:"0.9",marginBottom:"20px"}}>
             <Header headerShade={true} title={"LOAN LISTING"} /> 
        <DataTable headers={["Account No.","Account Description","Product","Currency","Principal Balance"]} data={[array]}/>
        </div>
            <br></br>
            <div style={{zoom:"0.9"}}>
            <Header headerShade={true} title={"INVESTMENT LISTING"} /> 
        <DataTable headers={["Account No.","Account Description","Product","Currency","Investment Balance","Deal NUmber"]} data={[array]}/>
        </div>
            <br></br>
        </div>
        </Tabs.Panel>
        <Tabs.Panel value="letter">
        5
        </Tabs.Panel>
        </Tabs>
      </div>
    </div>
    // </div>
  );
}

export default CustomerEnquiry;
