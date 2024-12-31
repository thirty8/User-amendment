import React,{useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";

import { API_SERVER } from "../../../../config/constant";
import { FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";
import { AiOutlineEye} from "react-icons/ai";
import { Modal } from '@mantine/core';

import InputField from '../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../components/others/Fields/ListOfValue';
import ButtonComponent from '../../../../components/others/Button/ButtonComponent';
// import CustomTable from '../../../../components/others/customtable';
import CustomTable from '../../teller-ops/components/CustomTable';
import CustomButtons from '../../../../components/others/CustomButtons';
import Header from '../../../../components/others/Header/Header';
import RadioButtons from '../../../../components/others/Fields/RadioButtons';
import AccountBalanceEnquiry from '../../account-activities/account-enquiry/components/account-balance-enquiry';
import GlAccountEnquiryGlobal from './gl-account-enquiry-global';
import BatchTrans from './batch-trans';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function GlAccountEnquiry() {
  const [accountNumber,setAccountNumber] = useState("")
  const [container,setContainer] = useState({})
  const [branch,setBranch] = useState("")
  const [valueDateFrom,setValueDateFrom] = useState("")
  const [valueDateTo,setValueDateTo] = useState("")
  const [data,setData] = useState([])
  const [modal,setModal] = useState(false)


  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

 

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

  function formatDate(startDate) {
    // Parse the input date
    const sDate = new Date(startDate);
  
    // Create an array of month abbreviations
    const monthAbbreviations = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Format the date in "dd-MMM-yyyy" format with lowercase month abbreviation
    const day = String(sDate.getDate()).padStart(2, '0');
    const month = monthAbbreviations[sDate.getMonth()].toLowerCase();
    const year = sDate.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }

  const getData = () => {
    let array = []
    axios.post(API_SERVER + "/api/gl-account-enq",{
      accountNumber : accountNumber ,
      branch :  JSON.parse(localStorage.getItem("userInfo")).branchCode,
      valueDateFrom : formatDate(valueDateFrom),
      valueDateTo : formatDate(valueDateTo)
    },{headers})
    .then((response)=>{
      console.log(response,"godDid")
      let results = response.data
      results.map((i)=>{array.push([i.value_date,i.posting_date,<div style={{textAlign:"left"}}>{i.transaction_details}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.local_equivalent_db)}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.local_equivalent_cr)}</div>,i.balance,i.inter_branch,i.user_name,i.batch_no,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye size={18}/>} onClick={()=>{setContainer({batchNumber:i.batch_no,branch:i.inter_branch,branchCode:i.inter_branch_code,postingDate:i.posting_date});openModal();}}/></div>])})
      setData(array)

    })
  }

  useEffect(()=>{
    
    const getPostingDate = () => {
      axios.get(API_SERVER + '/api/get-effective-date',{headers})
      .then((response) => {
        const results = response.data[0].effective_date;
        console.log(results,"sponse")
    
        const sDate = new Date(results);
        const year = sDate.getFullYear();
        const month = String(sDate.getMonth() + 1).padStart(2, "0");
        const day = String(sDate.getDate()).padStart(2, "0");
        setValueDateFrom(`${year}-${month}-${day}`);
        setValueDateTo(`${year}-${month}-${day}`);
        // return formattedPostingDate;
        // console.log(formattedPostingDate);
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    getPostingDate();
  },[])
          
     
    return (
      
      <div style={{ padding: "10px 15px" }}>
        <div style={{ display: "flex", flex: 1 ,marginTop:"30px",marginBottom:'10px'}}>
          <div style={{display:"flex",flex: 0.4,gap:"10px"}}>
            {/* chart group   */}
              <InputField
                label={"Account Number"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                // data={chartGroupsLOV}
                onChange={(e)=>{setAccountNumber(e.target.value)}}
                />
                 <ButtonComponent
                        label={"Search"}
                        buttonHeight={"25px"}
                        buttonWidth={"75px"}
                        // onClick={openFindByIDmodal}
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
                value={JSON.parse(localStorage.getItem("userInfo")).branchCode + "    -    " + JSON.parse(localStorage.getItem("userInfo")).branch}
              
              />
              </div>
        </div>
        <div>
          <br/>
          <div style={{display:"flex",padding:"10px 0px 0px 0px"}}>
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
        </div>
        <br/>
          <div>
            <Header title={"GL Balance Enquiry"} headerShade={true}/>
            <div
                  style={{
                    display: "flex",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <div style={{display:"flex",flex:0.34,gap:"10px"}}>
                  <InputField
                label={"Value Date From :"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                onChange={(e)=>{setValueDateFrom(e.target.value)}}
                value={valueDateFrom}
                type={"date"}
                className="dateField"
              />
               <InputField
                label={"To :"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                onChange={(e)=>{setValueDateTo(e.target.value)}}
                value={valueDateTo}
                type={"date"}
              />
                  </div>
                  <div style={{ flex: 0.37}}></div>
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
            <CustomTable headers={["Value Date","Post Date","Transaction Details","Debit","Credit","Balance","Branch","Posted By","Batch Number","Action"]} data={data} rowsPerPage={12}/>
          </div>
        </div>
        <Modal
        size="95%"
        opened={modal}
        withCloseButton={false}
      >
             <div className="text-gray-700" style={{ marginTop: "-20px",  marginBottom: "-15px", marginLeft: "-17px", marginRight: "-16px",overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#0369A1",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
            Batch Trans
          </div>

          <svg
            onClick={closeModal}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            // style={{ padding: "10px" }}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      
    </div>
    <div className="bg-gray-200 rounded-b ">
      <div className="bg-white shadow rounded px-0 pt-1 pb-8 ">
      <BatchTrans container={container} accountNumber={accountNumber}/>
 </div>
        </div>
      </div>
</Modal>
      </div>
    );
  }

export default GlAccountEnquiry;
