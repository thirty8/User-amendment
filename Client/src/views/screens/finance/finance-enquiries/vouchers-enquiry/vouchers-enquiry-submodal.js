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

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function VouchersEnquirySubModal({container}) {
    const [postedByLOV,setPostedByLOV] = useState([]);
    const [postedBy,setPostedBy] = useState("");
    const [status,setStatus] = useState("");
    const [voucherType,setVoucherType] = useState("");
    const [amount,setAmount] = useState("");
    const [valueDateFrom,setValueDateFrom] = useState("");
    const [valueDateTo,setValueDateTo] = useState("");
    const [lineDescription,setLineDescription] = useState("");
    const [datatableData,setDatatableData] = useState([]);
    const [details,setDetails] = useState({});
    const [currency,setCurrency] = useState("");
  
  const columns= ["Account Link","Account Name","Transaction Details","Amount","Branch","Status"]

  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num)) {
      return "0.00";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf('.');
        
      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formattedDecimalPart = decimalPart === ".00" ? "0.00" : decimalPart;
        return formattedInteger + formattedDecimalPart;
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

    useEffect(() => {
      
        // const getVendor = () => {
        //     let curr = [];
        //     axios.get(API_SERVER + '/api/get-vendor',
        //     {headers})
        //     .then((response) => {
        //       const results = response.data;
        //       results.map((i)=>{curr.push({label: i.vendor_id + "   -   " + i.vendor_name, value: i.vendor_id})})
        //       setVendorLOV(curr) 
        //       })
        //       .catch((error)=>{
        //       console.log(error)
        //     })
        //   }
        //   getVendor();

          const getCreatedBy = () => {
            let curr = [];
            axios.get(API_SERVER + '/api/get-vouchers-enquiry-posted-by',
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.user_name , value: i.user_name})})
              setPostedByLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getCreatedBy();

          // const getFrequency = () => {
          //   let curr = [];
          //   axios.get(API_SERVER + '/api/get-frequency',
          //   {headers})
          //   .then((response) => {
          //     const results = response.data;
          //     results.map((i)=>{curr.push({label: i.label, value: i.value})})
          //     setFrequencyLOV(curr) 
          //     })
          //     .catch((error)=>{
          //     console.log(error)
          //   })
          // }
          // getFrequency();
        
        
      }, []);

           
        const getData = () => {
        //   // console.log(formatDate(valueDateFrom),"reeee")
          console.log(container,"riririr")
        //   console.log(container.postedBy,"riririr")
        //   console.log("arearr")
          let array = [];
          axios
            .post(API_SERVER + "/api/get-gl-enquiry",
            {
              batchNumber:container.batchNumber
        }, { headers })
            .then((response) => {
              let results = response.data

              setCurrency(results[0]?.currency)
              console.log(results,"response")
              results.map((i)=>{array.push([i.acct_link,i.acct_desc,<div style={{textAlign:"left"}}>{i.transaction_details}</div>,<div style={{textAlign:"right"}}>{formatNumber(i.amount)}</div>,i.branch,i.status])})
              console.log(array,"arrayRay")
                      setDatatableData(array);
                    })
            .catch((error) => {
              console.log(error);
            });
          }
     
        
    
      // console.log(chartGroups, "here");
      // console.log(clearToCode, "here n there");
      console.log(details,"details detailsdetails")
     
    //   console.log(coAarray, "mini mini mini waale");
    //   // console.log(accountT, "mini waale mini waale");
      
    const switchFocus = (e, nextFieldId) => {
        if (e.key === "Enter") {
          document.getElementById(nextFieldId)?.focus();
          console.log(document.getElementById(nextFieldId), "component");
        }   
      };

    // const clearFields = () => {
    //     setVendor("")
    //   document.getElementById("vendor").value = ""
    // //   setParentLine("")
    // //   document.getElementById("parentLine").value = ""
    // //   setPostedBy("")
    // //   document.getElementById("postedBy").value = ""
    // // //   setLineCode("")
    // //   document.getElementById("lineCode").value = ""
    // //   setLineDescription("")
    // //   document.getElementById("lineDescription").value = ""
    // //   setApprovedStatus("")
    // //   document.getElementById("approvedStatus").value = ""
    //   };
    useEffect(()=>{
        getData()
    },[])
   
  return (
    
    <div style={{ padding: "10px 15px" }}>
         <div style={{display:"flex",gap:"7px",paddingBottom:"15px"}}>
        <div style={{flex:0.02}}></div>
      <div style={{flex:0.96}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"15px",padding:"10px 15px 0px 15px"}}>
          <InputField
              label={"Posted By"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              value={container?.postedBy}
              disabled
              />
          <InputField
              label={"Currency"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              value={currency}
              />
         <InputField
              label={"Posting Date"}
              labelWidth={"30%"}
              inputWidth={"50%"}
            //   type={"date"}
              disabled
              value={container?.postingDate}
              />
         <InputField
              label={"Value Date"}
              labelWidth={"30%"}
              inputWidth={"50%"}
            //   type={"date"}
              disabled
              value={container?.valueDate}
              />
        <InputField
              label={"Voucher Number"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              disabled
              value={container?.voucherType}
              />
          <InputField
              label={"Narration"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              value={container?.narration}
              disabled
              />
          </div>
          </div>
          <div style={{flex:0.02}}></div>
          </div>
      <div>
        <br></br>
        {/* <div style={{display:"flex",padding:"5px 0px 0px 0px"}}>
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
            <Header title={"GL ENQUIRY DETAILS"} headerShade={true}/>
            <div
                  style={{
                    display: "flex",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    alignItems: "center",
                  }}
                >
                  <div style={{display:"flex",flex:0.31}}>
                  </div>
                  <div style={{ flex: 0.4}}></div>
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
            <CustomTable headers={columns} data={datatableData} rowsPerPage={10}/>
          </div>
      </div>
      {/* <Modal size="85%" opened={GLamendment} withCloseButton={false}>
        <div
          className="text-gray-700"
          style={{
            marginBottom: "-15px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  CHART OF ACCOUNTS : ACCOUNT AMENDMENTS
                </div>

                <svg
                  onClick={closeGLamendment}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
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
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "20px" }}>
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
            >
            <GLCreateAccount details={details}/>
            </div>
          </div>
        </div>

      </Modal> */}
    </div>
  );
}

export default VouchersEnquirySubModal;
