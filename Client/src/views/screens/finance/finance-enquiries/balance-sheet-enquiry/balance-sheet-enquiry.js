import React,{useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";

import { API_SERVER } from "../../../../../config/constant";
import { FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";
import { AiOutlineEye} from "react-icons/ai";
import { Modal } from '@mantine/core';

import InputField from '../../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../../components/others/Fields/ListOfValue';
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';
import CustomTable from '../../../../../components/others/customtable';
import CustomButtons from '../../../../../components/others/CustomButtons';
import Header from '../../../../../components/others/Header/Header';
import RadioButtons from '../../../../../components/others/Fields/RadioButtons';
// import AccountBalanceEnquiry from '../../account-activities/account-enquiry/components/account-balance-enquiry';
// import GlAccountEnquiryGlobal from './gl-account-enquiry-global';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function BseSubModal({container}) {
//   const [accountNumber,setAccountNumber] = useState("")
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
    let array = []
    axios.post(API_SERVER + "/api/bs-code-subModal",{
        bsCode : container.bs_code
    },{headers})
    .then((response)=>{
      console.log(response,"godDid")
      let results = response.data
      if (results.length == 0) {
        swal({
          title: "WRN - 07235",
          text: "No Data Found",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        });
      } else {
      results.map((i)=>{array.push([i.acct_link,<div style={{textAlign:"left"}}>{i.account_descrp}</div>,<div style={{textAlign:"center"}}>{i.level_identifier}</div>,i.opening_balance_today,i.debit,i.credit,i.closing_balance_today])})
      setData(array)
      }
    })
  }

  console.log(container,"tttttttttttttttttttch")
  console.log(container.batchNumber,"yeeeeeeeeeeee")
  console.log(container.branch,"zyyyyyyyyyyyyyyyy")
  console.log(container.branchCode,"zxcvbnm")
          

  useEffect(()=>{
    getData()
  },[])
console.log(container,"cvbnnnnnbtainor")
     
    return (
      
      <div style={{ padding: "10px 15px" }}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px",paddingTop:"15px"}}>
        <InputField
                        label={"Clears To :"}
                        labelWidth={"30%"}
                        inputWidth={"50%"}
                        // onChange={(e)=>{setBalanceDate(e.target.value)}}
                        // onKeyDown={(e)=>{switchFocus(e,"branch")}}
                        // id={"balanceDate"}
                        value={container.clearToCode}
                        // type={"date"}
                        disabled
                        />
      <InputField
                        label={"Report Balance :"}
                        labelWidth={"30%"}
                        inputWidth={"50%"}
                        // onChange={(e)=>{setBalanceDate(e.target.value)}}
                        // onKeyDown={(e)=>{switchFocus(e,"branch")}}
                        // id={"balanceDate"}
                        // value={balanceDate}
                        // type={"date"}
                        disabled
                        />
      <InputField
                        label={"Branch :"}
                        labelWidth={"30%"}
                        inputWidth={"50%"}
                        // onChange={(e)=>{setBalanceDate(e.target.value)}}
                        // onKeyDown={(e)=>{switchFocus(e,"branch")}}
                        // id={"balanceDate"}
                        value={container.branch}
                        // type={"date"}
                        disabled
                        />
 
      <InputField
                        label={"Currency :"}
                        labelWidth={"30%"}
                        inputWidth={"50%"}
                        // onChange={(e)=>{setBalanceDate(e.target.value)}}
                        // onKeyDown={(e)=>{switchFocus(e,"branch")}}
                        // id={"balanceDate"}
                        // value={balanceDate}
                        // type={"date"}
                        disabled
                        />
    
<InputField
                        label={"Balance Date :"}
                        labelWidth={"30%"}
                        inputWidth={"50%"}
                        // onChange={(e)=>{setBalanceDate(e.target.value)}}
                        // onKeyDown={(e)=>{switchFocus(e,"branch")}}
                        // id={"balanceDate"}
                        value={formatDate2(container.balanceDate)}
                        type={"date"}
                        disabled
                        />
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
                 <div
                  style={{
                    display: "flex",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 0.71}}></div>
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
            <CustomTable headers={["Account Number","Account Description","Level","Opening","Debit","Credit","Closing Balance"]} data={data} rowsPerPage={12}/>
          </div>
        </div>
        {/* <Modal
        size="95%"
        opened={modal}
        withCloseButton={false}
      >
             <div className="text-gray-700" style={{ marginBottom: "-30px", marginLeft: "-17px", marginRight: "-16px", marginTop: "-20px", overflowY: "none" }}>
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
      <GlAccountEnquiryGlobal/>
 </div>
        </div>
      </div>
</Modal> */}
      </div>
    );
  }

export default BseSubModal;
