import React,{useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";

import { API_SERVER } from "../../../../config/constant";
import {FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";

import { Modal } from '@mantine/core';

import InputField from '../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../components/others/Fields/ListOfValue';
import ButtonComponent from '../../../../components/others/Button/ButtonComponent';
import CustomTable from '../../../../components/others/customtable';
import CustomButtons from '../../../../components/others/CustomButtons';
import Header from '../../../../components/others/Header/Header';
import RadioButtons from '../../../../components/others/Fields/RadioButtons';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function AccountPayablesEnquiry() {
  const [vendor,setVendor] = useState("");
  const [vendorLOV,setVendorLOV] = useState([]);
  const [invoiceNumber,setInvoiceNumber] = useState("");
  const [postedBy,setPostedBy] = useState("");
  const [createdByLOV,setCreatedByLOV] = useState([]);
  const [paymentMethod,setPaymentMethod] = useState("");
  const [batchNumber,setBatchNumber] = useState([]);
  const [lineDescription,setLineDescription] = useState("");
  const [frequency,setFrequency] = useState("");
  const [frequencyLOV,setFrequencyLOV] = useState([]);
//   const [approvedStatus,setApprovedStatus] = useState("");
  
  const [datatableData,setDatatableData] = useState([]);
  const [details,setDetails] = useState({});
  
  const columns= ["Batch Number","Vendor Account","Frequency","Posting Date","Value Date","Expense Amount","Narration","Posted By","Status","Action"]

    useEffect(() => {
      
        const getVendor = () => {
            let curr = [];
            axios.get(API_SERVER + '/api/get-vendor',
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.vendor_id + "   -   " + i.vendor_name, value: i.vendor_id})})
              setVendorLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getVendor();

          const getCreatedBy = () => {
            let curr = [];
            axios.get(API_SERVER + '/api/get-payables-enquiry-vendor',
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.user_name + "   -   " + i.fullname, value: i.user_name})})
              setCreatedByLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getCreatedBy();

          const getFrequency = () => {
            let curr = [];
            axios.get(API_SERVER + '/api/get-frequency',
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.label, value: i.value})})
              setFrequencyLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getFrequency();
        
        
      }, []);

           
        const getData = () => {
            // console.log(parentLine, "greaterrrrrrrrrr");
            // console.log(clearToCode, "re n there");
           
          let array = [];
          axios
            .post(API_SERVER + "/api/account-payable-enquiry",
            {
              vendor:vendor,
              invoiceNumber:invoiceNumber,
              postedBy:postedBy,
              paymentMode:lineDescription,
              frequency:frequency,
              documentDescription : lineDescription
        }, { headers })
            .then((response) => {
                console.log(response,"response")
              const results = response.data;
              results.map((i)=>{array.push([i.expense_batch_no,<div style={{textAlign:"left"}}>{i.beneficiary_acct}</div>,i.frequency,i.authorized_date,i.expense_date,i.total_exp_amount,<div style={{textAlign:"left"}}>{i.narration}</div>,i.authorized_by,null,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye size={18}/>}/></div>])})
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

    const clearFields = () => {
        setVendor("")
      document.getElementById("vendor").value = ""
      setInvoiceNumber("")
      document.getElementById("invoiceNumber").value = ""
      setPostedBy("")
      document.getElementById("postedBy").value = ""
      setPaymentMethod("")
      setBatchNumber("")
      document.getElementById("payableID").value = ""
      setFrequency("")
      document.getElementById("frequency").value = ""
      setLineDescription("")
      document.getElementById("lineDescription").value = ""
      setDatatableData([]);
      };
   
  return (
    
    <div style={{ padding: "10px 15px" }}>
         <div style={{display:"flex",gap:"7px",paddingBottom:"15px"}}>
        <div style={{flex:0.02}}></div>
      <div style={{flex:0.96}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"20px",padding:"10px 15px 0px 15px"}}>
          <ListOfValue
              label={"Vendor"}
              labelWidth={"20%"}
              inputWidth={"60%"}
              data={vendorLOV}
              id={"vendor"}
              onChange={(e)=>{setVendor(e);
                setTimeout(() => {
                    const input =
                      document.getElementById("invoiceNumber");
                    input.focus();
                  }, 0);
            }}
            value={vendor}
              />
               <InputField
              label={"Invoice Number"}
              labelWidth={"30%"}
              inputWidth={"60%"}
              id={"invoiceNumber"}
              onChange={(e)=>{setInvoiceNumber(e.target.value)}}
              onKeyDown={(e)=>{switchFocus(e,"HeadLevel")}}
              />
                <ListOfValue
                        label={"Posted By"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        data={createdByLOV}
                        onChange={(e)=>{setPostedBy(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("postedBy");
                            input.focus();
                          }, 0);}}
                          value={postedBy}
                        id={"postedBy"}
                        />
              <RadioButtons display={true}
                  display2={true}
                  display3={false}
                  label={"Payment Method"}
                  labelWidth={'30%'}
                  radioButtonsWidth={"55%"}
                  radioLabel={'Automatic'}   
                  id={'HeadLevel'}
                  value={"A"}
                  checked={paymentMethod === "A"}
                  radioLabel2={"Manual"} 
                  id2={"TotalLevel"}
                  value2={"M"}
                  checked2={paymentMethod === "M"}
                  onChange={(e)=>setPaymentMethod(e.target.value)}
                  />
         <ListOfValue
                        label={"Payable ID"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        // data={parentLineLOV}
                        onChange={(e)=>{setBatchNumber(e);  setTimeout(() => {
                          const input =
                            document.getElementById("postedBy");
                          input.focus();
                        }, 0);}}
                        id={"payableID"}
                        // value={parentLine}
                        />
         <ListOfValue
                        label={"Frequency"}
                        labelWidth={"30%"}
                        inputWidth={"60%"}
                        data={frequencyLOV}
                        onChange={(e)=>{setFrequency(e);  setTimeout(() => {
                          const input =
                            document.getElementById("lineDescription");
                          input.focus();
                        }, 0);}}
                        id={"frequency"}
                        value={frequency}
                        />
       
       
                  <InputField
                        label={"Doc. Description"}
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
        <div style={{display:"flex",padding:"15px 0px 0px 0px"}}>
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
                    onClick={clearFields}
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                  />
                  </div>
            </div>
        </div>
        <br/>
        <div>
          <Header title={"Code Details"} headerShade={true}/>
          {/* <div
                  style={{
                    display: "flex",
                    paddingTop: "8px",
                    paddingBottom: "5px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 0.01 }}></div>
                  <div style={{ flex: 0.33 }}>
                  </div>
                  <div style={{ flex: 0.03 }}>
                    {/* <ButtonComponent
                      onClick={handleFetch}
                      // label={"Fetch"}
                      buttonColor={"white"}
                      buttonWidth={"35px"}
                      buttonHeight={"28px"}
                      buttonIcon={<MdOutlineDoubleArrow size={20} />}
                    /> */}
                  {/* </div>
                  <div style={{ flex: 0.33 }}></div>
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
                  <div style={{ flex: 0.02 }}></div>
                </div> */} 
          <CustomTable headers={columns} data={datatableData} rowsPerPage={12}/>
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

export default AccountPayablesEnquiry;
