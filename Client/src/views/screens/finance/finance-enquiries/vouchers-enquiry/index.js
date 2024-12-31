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
import CustomTable from '../../../teller-ops/components/CustomTable';
import CustomButtons from '../../../../../components/others/CustomButtons';
import Header from '../../../../../components/others/Header/Header';
import RadioButtons from '../../../../../components/others/Fields/RadioButtons';
import VouchersEnquirySubModal from './vouchers-enquiry-submodal';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function VouchersEnquiry() {
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
    const [container,setContainer] = useState({});

    const [modal,setModal] = useState(false)
    const openModal = () => {setModal(true)}
    const closeModal = () => {
      setModal(false)
    }
    
  
  const columns= ["Voucher Type","Batch Number","Value Date",,"Posting Date","Posted By","Amount","Narration","Status","Trans Count","Action"]

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
          // console.log(formatDate(valueDateFrom),"reeee")
          console.log(postedBy,"riririr")
          console.log("arearr")
          let array = [];
          axios
            .post(API_SERVER + "/api/vouchers-enquiry",
            {
              postedBy:postedBy,
              status:status,
              voucherType:voucherType,
              amount:amount,
              valueDateFrom:valueDateFrom ? formatDate(valueDateFrom) : valueDateFrom ,
              valueDateTo :valueDateTo ? formatDate(valueDateTo) : valueDateTo,
              narration : lineDescription
        }, { headers })
            .then((response) => {
              let results = response.data
                console.log(response,"response")
              // const results = response.data;
              results.map((i)=>{array.push([i[0],i[1],i[2],i[3],i[4],<div style={{textAlign:"right"}}>{formatNumber(i[5])}</div>,<div style={{textAlign:"left"}}>{i[6]}</div>,i[7],i[8],<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye size={18}/>} onClick={()=>{setContainer({batchNumber:i[1],postedBy:i[4],postingDate:i[3],valueDate:i[2],voucherType:i[0],narration:i[6]});openModal();}}/></div>])})
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
   
  return (
    
    <div style={{ padding: "10px 15px" }}>
         <div style={{display:"flex",gap:"7px",paddingBottom:"15px"}}>
        <div style={{flex:0.02}}></div>
      <div style={{flex:0.96}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"15px",padding:"10px 15px 0px 15px"}}>
          <ListOfValue
              label={"Posted By"}
              labelWidth={"20%"}
              inputWidth={"60%"}
              data={postedByLOV}
              id={"postedBy"}
              onChange={(e)=>{setPostedBy(e);
                setTimeout(() => {
                    const input =
                      document.getElementById("status");
                    input.focus();
                  }, 0);
            }}
            value={postedBy}
              />
               <ListOfValue
              label={"Status"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              data={[{label:"APPROVAL",value:"APPROVED"},{label:"PENDING APPROVAL",value:"PENDING APPROVAL"},{label:"REJECTED",value:"REJECTED"},{label:"SUSPENDED",value:"SUPPENDED"}]}
              id={"status"}
              onChange={(e)=>{setStatus(e);
              setTimeout(() => {
                const input =
                  document.getElementById("voucherType");
                input.focus();
              }, 0);
            }}
              />
                <ListOfValue
                        label={"Voucher Type"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        data={[{label:"JOURNALS",value:"JRNL"},{label:"PAYMENT",value:"PYMT"},{label:"IMPREST CASH REQUEST",value:"ICR"},{label:"RECEIPT",value:"RCPT"},{label:"REVERSE JOURNAL",value:"REVJ"},{label:"BACKVALUE",value:"GL-AJDU"},{label:"FINANCE UPLOAD",value:"GL-UPD"},{label:"COST CENTER POSTING",value:"CCP"}]}
                        onChange={(e)=>{setVoucherType(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("amount");
                            input.focus();
                          }, 0);}}
                          value={voucherType}
                        id={"voucherType"}
                        />
         <InputField
              label={"Amount"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              id={"amount"}
              onChange={(e)=>{setAmount(e.target.value);}}
              onKeyDown={(e)=>{switchFocus(e,"valueDateFrom")}}
              />
         <InputField
              label={"Value Date From"}
              labelWidth={"20%"}
              inputWidth={"60%"}
              onChange={(e)=>{setValueDateFrom(e.target.value);
                setTimeout(() => {
                  const input =
                    document.getElementById("valueDateTo");
                  input.focus();
                }, 0);
              }}
              onKeyDown={(e)=>{switchFocus(e,"valueDateTo")}}
              type={"date"}
              id={"valueDateFrom"}
              />
         <InputField
              label={"Value Date To"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              onChange={(e)=>{setValueDateTo(e.target.value);
                setTimeout(() => {
                  const input =
                    document.getElementById("lineDescription");
                  input.focus();
                }, 0);
              }}
              onKeyDown={(e)=>{switchFocus(e,"lineDescription")}}
              type={"date"}
              id={"valueDateTo"}  
              />
          <InputField
                        label={"Narration"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        onChange={(e)=>{setLineDescription(e.target.value)}}
                        id={"lineDescription"}
                        value={lineDescription}
                    />
          </div>
          </div>
          <div style={{flex:0.02}}></div>
          </div>
      <div>
        <div style={{display:"flex",padding:"5px 0px 0px 0px"}}>
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
            <Header title={"VOUCHERS ENQUIRY"} headerShade={true}/>
            <div
                  style={{
                    display: "flex",
                    paddingTop: "10px",
                    paddingBottom: "10px",
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
      <Modal size="85%" opened={modal} withCloseButton={false}>
        <div className="text-gray-700" style={{ marginTop: "-20px",  marginBottom: "-15px", marginLeft: "-17px", marginRight: "-16px",overflowY: "none" }}>
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
                ENQUIRY DETAILS
                </div>

                <svg
                  onClick={closeModal}
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
            <VouchersEnquirySubModal container={container}/>
            </div>
          </div>
        </div>

      </Modal>
    </div>
  );
}

export default VouchersEnquiry;
