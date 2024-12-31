import React from "react";
import { useState, useEffect} from 'react';
import { Tabs } from "@mantine/core";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";

import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import ButtonType from "../../../../../../components/others/Button/ButtonType";
import DataTable from "../../../../../../components/others/customtable";


const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};



function CustomerDetails({Dataa}) {

  const [stateOne,setStateOne] = useState({});
  const [stateTwo,setStateTwo] = useState({});

  let arrayOne=[]
  let arrayTwo=[]
  const [firstArray,setFirstArray] = useState([]);
  const [secondArray,setSecondArray] = useState([]);


  const handleCustomerInfo = () => {
    axios
      .post(API_SERVER + "/api/getInvidualRelationshipAmendment/CustomerInfo", {
        customerID: Dataa?.customerNumber,
      },{headers})
      .then((response) => {
        let results = response.data.response[0];
        let codeDescriptions = response.data.response2;
        // console.log(results, "yolooooo");
        // console.log(codeDescriptions, "yolos");
        setStateOne((prevState) => ({
          ...prevState,
          customerNumber:results?.customer_number,
          customerName:results?.customer_name,
          typeOfCustomer:codeDescriptions[0]?.actual_code + "        -        " + codeDescriptions[0]?.description,
          customerCategory:codeDescriptions[1]?.actual_code + "        -        " + codeDescriptions[1]?.description,
          segment:codeDescriptions[3]?.actual_code + "        -        " + codeDescriptions[3]?.description,
          subSegment:codeDescriptions[4]?.actual_code + "        -        " + codeDescriptions[4]?.description,
          sector:codeDescriptions[2]?.actual_code + "        -        " + codeDescriptions[2]?.description,
          subSector:results?.sub_sector,
          swiftCode:results?.swift_code,
          deceased:results?.deceased,
          whereaboutsUnknown:results?.whereabouts_unknown,
          ArApTracking:results?.ar_ap_tracking,
          MT920:results?.mt920,
          MT940:results?.mt940,
          documentReqType:results?.document_req_type,
        }));
        })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=> {
    handleCustomerInfo()
  },[])

  const handleAntiMoneyLaunderingFields = () => {
    axios
      .post(API_SERVER + "/api/getInvidualRelationshipAmendment/AntiMoneyLaundering", {
        customerID:Dataa?.customerNumber,
      },{headers})
      .then((response) => {
        let results = response.data[0];
        console.log(results, "yolows");
        setStateTwo((prevState) => ({
          ...prevState,
          noWithdrawalMonth:results?.no_withdrawal_month,
          noDepositMonth:results?.no_deposit_month,
          amtWithdrawalMonth:results?.amt_withdrawal_month,
          amtDepositMonth:results?.amt_deposit_month,
          annualIncome:results?.annual_income,
          riskCode:results?.risk_code,
          pep:results?.pep
        }));
        })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAntiMoneyLaunderingSourceOfFunds = () => {
    axios
      .post(API_SERVER + "/api/getInvidualRelationshipAmendment/AntiMoneyLaundering/SourceOfFunds", {
        customerID: Dataa?.customerNumber,
        codeType: "SOF",
      },{headers})
      .then((response) => {
        response.data.map((i)=>{
          arrayOne.push([i.source_code,i.description])
        })
        setFirstArray(arrayOne)
        })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAntiMoneyLaunderingTransactionType = () => {
    axios
      .post(API_SERVER + "/api/getInvidualRelationshipAmendment/AntiMoneyLaundering/SourceOfFunds", {
        customerID: Dataa?.customerNumber,
        codeType:"TRQ",
      },{headers})
      .then((response) => {
        response.data.map((i)=>{
          arrayTwo.push([i.source_code,i.description])
        })
        setSecondArray(arrayTwo)
        })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(()=> {
    handleAntiMoneyLaunderingFields();
    handleAntiMoneyLaunderingSourceOfFunds();
    handleAntiMoneyLaunderingTransactionType();
  },[])
  
  // useEffect(()=> {
  //   handleAntiMoneyLaunderingSourceOfFunds();
  // },[])

  // useEffect(()=> {
  //   handleAntiMoneyLaunderingTransactionType();
  // },[])



  return (
    <div>
      <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
        <Tabs defaultValue="gallery" variant="pills">
          <Tabs.List>
            <Tabs.Tab value="gallery">Customer Information</Tabs.Tab>
            <Tabs.Tab value="messages">Anti-Money Laundering</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <div style={{ marginRight:"20px",marginBottom:"10px",marginLeft:"20px",marginTop:"1px",paddingRight:"10px",paddingLeft:"10px",paddingTop:"2px",paddingBottom:"30px"}}>
              <div style={{marginBottom:"10px"}}>
              <Header headerShade={true} title={"CUSTOMER DETAILS"} />
              </div>
              
              <div style={{display: "flex", gap: "10px" }}>
                <div
                  style={{
                    flex: "0.7",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    borderRadius: "5px",
                    paddingTop:"40px",
                    paddingBottom:"10px"
                  }}
                >
                  <div style={{display:"flex"}}>
                    <div style={{flex:0.1}}></div>
                    <div style={{flex:0.8}}>
                      <div style={{marginBottom:"10px"}}>
                        <InputField
                          label={"Customer Name"}
                          labelWidth={"30%"}
                          inputWidth={"60%"}
                          disabled
                          value={stateOne?.customerName}
                        />
                        </div>
                        <div style={{marginBottom:"10px"}}>
                        <InputField
                          label={"Customer Type"}
                          labelWidth={"30%"}
                          inputWidth={"60%"}
                          disabled
                          value={stateOne?.typeOfCustomer}
                        />
                        </div>
                        <div style={{marginBottom:"10px"}}>
                        <InputField
                          label={"Customer Category"}
                          labelWidth={"30%"}
                          inputWidth={"60%"}
                          disabled
                          value={stateOne?.customerCategory}
                        />
                        </div>
                        <div style={{marginBottom:"10px"}}>
                    <InputField
                      label={"Segment"}
                      labelWidth={"30%"}
                      inputWidth={"60%"}
                      disabled
                      value={stateOne?.segment}
                    />
                    </div>
                    <div style={{marginBottom:"10px"}}>
                    <InputField
                      label={"Sub Segment"}
                      labelWidth={"30%"}
                      inputWidth={"60%"}
                      disabled
                      value={stateOne?.subSegment}
                    />
                    </div>
                    <div style={{marginBottom:"10px"}}>
                    <InputField
                      label={"Sector"}
                      labelWidth={"30%"}
                      inputWidth={"60%"}
                      disabled
                      value={stateOne?.sector}
                    />
                    </div>
                    <div style={{marginBottom:"15px"}}>
                    <InputField
                      label={"Sub Sector"}
                      labelWidth={"30%"}
                      inputWidth={"60%"}
                      disabled
                      value={stateOne?.subSector}
                    />
                    </div>
                  </div>
                  <div style={{flex:0.1}}></div>
                  </div>
               </div>
                <div style={{flex:"0.3",gap:"10px",borderRadius: "5px"}}>
                  <div style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding:"33px 0px 5px 20px"}}>
                    <div style={{paddingBottom:"10px"}}>
                    <InputField
                      label={"Swift Code"}
                      labelWidth={"15%"}
                      inputWidth={"25%"}
                      disabled
                      value={stateOne.swiftCode}
                    />
                    </div>
                    <div style={{display:"flex",marginBottom:"16px",alignItems:"center"}}>
                    <div style={{flex:0.7}}>
                      <label>Deceased</label>
                    </div>
                    <div style={{flex:0.2}}>  
                      <ButtonType type={"radio"} value1={stateOne?.deceased} disabled/>
                      </div>
                    </div>
                    <div style={{display:"flex",marginBottom:"16px",alignItems:"center"}}>
                    <div style={{flex:0.7}}>
                      <label>Whereabouts Unknown</label>
                    </div>
                    <div style={{flex:0.2}}>
                      <ButtonType type={"radio"} value1={stateOne?.whereaboutsUnknown} disabled/>
                      </div>
                    </div>
                    <div style={{display:"flex",marginBottom:"16px",alignItems:"center"}}>
                    <div style={{flex:0.7}}>
                      <label>Eligible For AR_AP Tracking </label>
                    </div>
                    <div style={{flex:0.2}}>
                      <ButtonType type={"radio"} value1={stateOne?.ArApTracking} disabled/>
                      </div>
                    </div>
                    <div style={{display:"flex",marginBottom:"16px",alignItems:"center"}}>
                    <div style={{flex:0.7}}>
                      <label>MT920</label>
                    </div>
                    <div style={{flex:0.2}}>
                      <ButtonType type={"radio"} value1={stateOne?.mt920} disabled/>
                      </div>
                    </div>
                    <div style={{display:"flex",marginBottom:"16px",alignItems:"center"}}>
                    <div style={{flex:0.7}}>
                      <label>MT940</label>
                    </div>
                    <div style={{flex:0.2}}>
                      <ButtonType type={"radio"} value1={stateOne?.mt940} disabled/>
                      </div>
                    </div>
                    </div>
                    <div style={{paddingTop:"20px"}}>
                    <ButtonComponent 
                     label={"CUSTOMER ACCOUNT OPENING DOCUMENT"}
                    buttonWidth={"400px"}
                    buttonHeight={"27px"}/>
                  </div>
                </div>
                
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="messages" pt="xs">
              <div style={{ marginRight:"10px",marginBottom:"10px",marginLeft:"10px",marginTop:"1px",paddingRight:"10px",paddingLeft:"10px",paddingTop:"2px",paddingBottom:"30px"}}>
              <div style={{marginBottom:"10px"}}>
              <Header headerShade={true} title={"EXPECTATION VOLUMES"} />
              </div>
              
                <div style={{display:"flex",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius: "5px"}}>
                  <div style={{flex:0.05}}></div>
                  <div style={{flex:0.9}}>
                   <div style={{display:"grid",gridTemplateColumns:"auto auto auto",paddingTop:"20px",paddingBottom:"15px",columnGap:"20px",rowGap:"10px"}}>
                   <InputField label={"Number Of Withdrawals per Month"} labelWidth={"65%"} inputWidth={"35%"} value={stateTwo.noWithdrawalMonth?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} textAlign={"right"} paddingRight={"5px"} disabled/> 
                   <InputField label={"Annual Withdrawals per Month"} labelWidth={"65%"} inputWidth={"35%"} value={stateTwo.amtDepositMonth?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   textAlign={"right"} paddingRight={"5px"} disabled/> 
                   <InputField label={"Annual Income"} labelWidth={"40%"} inputWidth={"60%"} value={stateTwo.annualIncome?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   textAlign={"right"} paddingRight={"5px"} disabled/>
                   <InputField label={"Number Of Deposits per Month"} labelWidth={"65%"} inputWidth={"35%"} value={stateTwo.noDepositMonth?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   textAlign={"right"} paddingRight={"5px"} disabled/>  
                   <InputField label={"Annual Deposits per Month"} labelWidth={"65%"} inputWidth={"35%"} value={stateTwo.amtDepositMonth?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   textAlign={"right"} paddingRight={"5px"} disabled/> 
                   </div>
                   </div>
                   <div style={{flex:0.05}}></div>
                </div>
                <br></br>
                   <div style={{display:"flex"}}>
                      <div style={{zoom:0.95,flex:0.49}}>
                       <Header headerShade={true} title={"SOURCE OF FUND"} />
                        <DataTable data={firstArray} headers={["Code","Description"]} rowsPerPage={2}/>
                      </div>
                      <div style={{flex:0.02}}></div>
                      <div style={{zoom:0.95,flex:0.49}}>
                      <Header headerShade={true} title={"TRANSACTION TYPE"} />
                        <DataTable data={secondArray} headers={["Code","Description"]}  rowsPerPage={2}/>
                      </div>
                   </div>
                   <br></br>
                   <div style={{borderRadius: "5px"}}>
                    <div style={{display:"flex"}}>
                    <div style={{display:"flex",justifyContent:"space-evenly",flex:0.48}}>
                    <InputField label={"Risk Code"} labelWidth={"20%"} inputWidth={"50%"} value={stateTwo.riskCode} disabled/>
                    <SelectField label={"PEP"} labelWidth={"20%"} inputWidth={"80%"} data={["Yes","No"]} disabled/> 
                    </div>
                    <div style={{flex:0.52,paddingBottom:"5px"}}></div>
                   </div>
                   <br></br>
                   <div style={{zoom:0.95}}>
                   <Header headerShade={true} title={"RISK ANALYSIS"} />
                   <DataTable headers={["Description","Flag"]} data={secondArray} rowsPerPage={3}/>
                   </div>
                </div>

              </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default CustomerDetails;
