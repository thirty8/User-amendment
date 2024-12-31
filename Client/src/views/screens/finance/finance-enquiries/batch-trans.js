import React,{useEffect,useState} from 'react';
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { Modal } from '@mantine/core';
import InputField from '../../../../components/others/Fields/InputField';
import ButtonComponent from '../../../../components/others/Button/ButtonComponent';
import CustomTable from '../../../../components/others/customtable';
import CustomButtons from '../../../../components/others/CustomButtons';
import Header from '../../../../components/others/Header/Header';
import GlAccountEnquiryGlobal from './gl-account-enquiry-global';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function BatchTrans({container,accountNumber}) {
//   const [accountNumber,setAccountNumber] = useState("")
  const [branch,setBranch] = useState("")
  const [postingDate,setPostingDate] = useState("")
  const [data,setData] = useState([])
  const [modal,setModal] = useState(false)

  function formattedNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === "0.00" || num === ".00" || num === "0") {
      return "";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf('.');
  
      if (decimalIndex === -1  ) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

  function formatDate2(startDate) {
    // Parse the input date
    const sDate = new Date(startDate);
  
    // Extract year, month, and day components
    const year = sDate.getFullYear();
    const month = String(sDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it is zero-based
    const day = String(sDate.getDate()).padStart(2, '0');
  
    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }

  const getData = () => {
    console.log("godDiddieuxxx")
    console.log(container.branch,"zyyyyyyyyyyyyyyyy")
    let array = []
    axios.post(API_SERVER + "/api/gl-batch-trans",{
      batchNumber : container.batchNumber,
      branch :  container.branchCode,
    },{headers})
    .then((response)=>{
      console.log(response,"godDid")
      let results = response.data
      results.map((i)=>{array.push([i.batch_no,<div style={{textAlign:"left"}}>{i.account_descrp}</div>,<div style={{textAlign:"left"}}>{i.transaction_details}</div>,i.document_ref,i.currency_code,<div style={{textAlign:"right"}}>{formattedNumber(i.local_equivalent_db)}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.local_equivalent_cr)}</div>])})
      setData(array)

    })
  }

  console.log(container,"tttttttttttttttttttch")

  useEffect(()=>{
    getData()
  },[])

  
     
    return (
      
      <div style={{ padding: "10px 15px" }}>
        <div style={{ display: "flex", flex: 1 ,marginTop:"20px",marginBottom:'10px'}}>
          <div style={{display:"flex",flex: 0.4}}>
            {/* chart group   */}
              <InputField
                label={"Account Number"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                value={accountNumber}
                disabled
                // data={chartGroupsLOV}
                // onChange={(e)=>{setAccountNumber(e.target.value)}}
                />
              </div>
                <div style={{ flex: 0.1 }}></div>
            <div style={{flex:0.5}}>
              <InputField
                label={"Branch"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                onChange={(e)=>{setBranch(e.target.value)}}
                disabled
                id={"branch"}
                // data={clearToCodeLOV}
                value={container.branchCode + " - " + container.branch}
              
              />
              </div>
        </div>
        <div>
          <br/>
          {/* <div style={{display:"flex",padding:"10px 0px 0px 0px"}}>
            <div style={{flex:0.85}}></div>
            <div style={{display:"flex",justifyContent:"space-between",flex:0.15}}>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                      <ButtonComponent
                    label="Fetch"
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                    onClick={getData}
                    buttonBackgroundColor={"green"}
                  />
                  </div>
                  <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                  <ButtonComponent
                    label="Refresh"
                    // onClick={clearFields}
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                  />
                  </div>
            </div>
        </div> */}
        <br/>
          <div>
            <Header title={"BATCH TRANSACTIONS"} headerShade={true}/>
            <div
                  style={{
                    display: "flex",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    alignItems: "center",
                  }}
                >
                  <div style={{display:"flex",flex:0.19}}>
                  <InputField
                label={"Posting Date :"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                onChange={(e)=>{setPostingDate(e.target.value)}}
                value={formatDate2(container.postingDate)}
                type={"date"}
                disableds
              />
                  </div>
                  <div style={{ flex: 0.52}}></div>
                  <div  
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flex: 0.28
                    }}
                  >
                    <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                      <ButtonComponent
                        label={"Print Statement"}
                        buttonColor={"white"}
                        // onClick={signatureVerification?handleSig:handleShoww}
                        // onClick={openPrintStatement}
                        buttonWidth={"150px"}
                        buttonHeight={"30px"}
                        buttonBackgroundColor={CustomButtons["print"].bgColor}
                        buttonIcon={CustomButtons["print"].icon}
                      />
                    </div>
                  </div>
                  <div style={{ flex: 0.01}}></div>
                </div>
            <CustomTable headers={["Batch No.","Account Description","Transaction Details","Document Ref.","Currency","Debit","Credit"]} data={data} rowsPerPage={12}/>
          </div>
        </div>
      </div>
    );
  }

export default BatchTrans;
