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
import CustomTable from '../../teller-ops/components/CustomTable';
import CustomButtons from '../../../../components/others/CustomButtons';
import Header from '../../../../components/others/Header/Header';
import RadioButtons from '../../../../components/others/Fields/RadioButtons';
import AccountBalanceEnquiry from '../../account-activities/account-enquiry/components/account-balance-enquiry';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function GlWithBalances() {
    // let CoAarray = [];
    const [chartGroups,setChartGroups] = useState("");
    const [chartGroupsLOV,setChartGroupsLOV] = useState([]);
    const [checker,setChecker] = useState(true);
    const [clearToCode,setClearToCode] = useState("");
    const [reverseClearToCode,setReverseClearToCode] = useState("");
    const [clearToCodeLOV,setClearToCodeLOV] = useState([]);
    const [datatableData,setDatatableData] = useState([]);
    const [coAarray,setCoAarray] = useState([]);
    const [balanceAsAt,setBalanceAsAt] = useState("");

    const [accountNumber,setAccountNumber] = useState({});

    const [balanceEnquiryModal,setBalanceEnquiryModal] = useState(false);

    const openBalanceEnquiryModal = (num) =>{
        setAccountNumber(num);
        setBalanceEnquiryModal(true);
    }

    const closeBalanceEnquiryModal = () =>{
        setBalanceEnquiryModal(false);
    }
    // const [accountT,setAccountT] = useState("");
    
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

      const clearFields = () => 
              {
                setChartGroups("")
                setClearToCode("")
                setDatatableData([]);
              };
      
    
   
  
    const columns= ["Navigator","Account Description","Level","Currency","Branch","Report Line","Line Code","Customer ID","GL Code","Account Number","Balance","Action"]
  
        useEffect(() => {
          let curr = [];
          const getChartGroups = () => {
            axios
              .get(API_SERVER + "/api/get-chart-group", { headers })
              .then((response) => {
                const results = response.data;
                results.map((i)=>{curr.push({label: i.actual_code + "  -  " + i.description, value: i.actual_code})})
                console.log(curr, "djd");
                setChartGroupsLOV(curr);
                // console.log(stateLOV, "mmm");
              })
              .catch((error) => {
                console.log(error);
              });
          };
          getChartGroups();
    
            const getPostingDate = () => {
              axios.get(API_SERVER + '/api/get-effective-date',{headers})
              .then((response) => {
                const results = response.data[0].effective_date;
                console.log(results,"sponse")
            
                const sDate = new Date(results);
                const year = sDate.getFullYear();
                const month = String(sDate.getMonth() + 1).padStart(2, "0");
                const day = String(sDate.getDate()).padStart(2, "0");
                setBalanceAsAt(`${year}-${month}-${day}`);
                // return formattedPostingDate;
                // console.log(formattedPostingDate);
              })
              .catch((error)=>{
                console.log(error)
              })
            }
            getPostingDate();
          }, []);
  
        useEffect(() => {
          let curr = [];
            axios
              .post(API_SERVER + "/api/get-clear-to-code",
              {chartCode : chartGroups}, { headers })
              .then((response) => {
                const results = response.data;
                results.map((i)=>{curr.push({label: i.account_code + "  -  " + i.account_descrp, value: i.account_code})})
                console.log(curr, "djd");
                setClearToCodeLOV(curr);
                setClearToCode(curr[0].value);
                // console.log(stateLOV, "mmm");
              })
              .catch((error) => {
                console.log(error);
              });
      
        }, [chartGroups]);
  
        useEffect(() => {
          if(clearToCode){
        
          const getTDC = () => {
            
              setCoAarray([...coAarray, clearToCode])
            
            let array = [];
            axios
              .post(API_SERVER + "/api/get-chart-of-account",
              {clearToCode : clearToCode}, { headers })
              .then((response) => {
                const results = response.data;
                results.map((i)=>{array.push([<div style={{display:"flex",justifyContent:"space-between"}}><ButtonComponent buttonIcon={<FaLongArrowAltLeft/>}  onClick={()=>{previousCoA([...coAarray, clearToCode])}}/><ButtonComponent buttonIcon={<FaLongArrowAltRight/>} onClick={()=>{if (i.level_id === "T"){setClearToCode(i.gl_code);}else{console.log("ayoooo")}}}/></div>,<div style={{textAlign:"left"}}>{i.account_descrp}</div>,i.level_id,i.currency,i.branch,i.report_line,i.line_code,i.cust_no,i.gl_code,i.tacct,<div style={{textAlign:"right"}}>{formattedNumber(i.balance)}</div>,
                <div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye  size={18} />} onClick={()=>{if (i.level_id === "D"){openBalanceEnquiryModal({accountNumber:i.tacct})}else{console.log("ayoooo")}}}/></div>])})
                setDatatableData(array);
                // setAccountT(clearToCode)
                // setCT(chartGroups)
                // setTO(accountT)
                setChecker(true)
                console.log("eiiiiiiiiiiiiiiiiii");
                // setClearToCode(curr[0].value);
                // console.log(stateLOV, "mmm");
              })
              .catch((error) => {
                console.log(error);
              });
            }
        getTDC()
          
            // console.log(array, "waale");
          }
          }, [clearToCode]);
  
          const previousCoA = (letsSee) => {
            let array = [];
            console.log(letsSee,"let's see")
            let prev = letsSee.pop()
            console.log(prev,"prev")
            console.log(letsSee,"coco be coco be coco e")
            setCoAarray(letsSee)
            axios
              .post(API_SERVER + "/api/get-chart-of-account",
              {clearToCode : letsSee[letsSee.length - 1 ]}, { headers })
              .then((response) => {
                const results = response.data;
                results.map((i)=>{array.push([<div style={{display:"flex",justifyContent:"space-between"}}><ButtonComponent buttonIcon={<FaLongArrowAltLeft/>} onClick={()=>{previousCoA(letsSee)}}/><ButtonComponent buttonIcon={<FaLongArrowAltRight/>} onClick={()=>{setClearToCode(i.gl_code)}}/></div>,<div style={{textAlign:"left"}}>{i.account_descrp}</div>,i.level_id,i.currency,i.branch,i.report_line,i.line_code,i.cust_no,i.gl_code,i.tacct,<div style={{textAlign:"right"}}>{formattedNumber(i.balance)}</div>,
                <div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye  size={18} />} onClick={()=>{if (i.level_id === "D"){openBalanceEnquiryModal({accountNumber:i.tacct})}else{console.log("ayoooo")}}}/></div>
                ])})
                setDatatableData(array);
                // setAccountT(letsSee[letsSee.length - 1 ])
                setChecker(false)
                setReverseClearToCode(letsSee[letsSee.length - 1 ])
                // setCT(chartGroups)
  
                // setTO(accountT)
                // setCoAarray([...coAarray, clearToCode])
                // setClearToCode(prev); 
                // console.log(array, "djd");
                // console.log(stateLOV, "mmm");
                console.log(letsSee,"lettuce leaf")
              })
              .catch((error) => {
                console.log(error);
              });
            }
          
        
  
        // console.log(datatableData, "here");
        // console.log(clearToCode, "here n there");
       
        console.log(coAarray, "mini mini mini waale");
        console.log(accountNumber, "mini mini mini waaaaaalee");


        
        
  
     
    return (
      
      <div style={{ padding: "10px 15px" }}>
        <div style={{ display: "flex", flex: 1 ,marginTop:"5px",marginBottom:'10px'}}>
          <div style={{ flex: 0.4 }}>
            {/* chart group   */}
              <ListOfValue
                label={"Chart Group"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                data={chartGroupsLOV}
                onChange={(e)=>{setChartGroups(e)}}
                value={chartGroups}
                />
              </div>
                <div style={{ flex: 0.1 }}></div>
            <div style={{flex:0.5}}>
              <ListOfValue
                label={"Clear To Code"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                onChange={(e)=>{setClearToCode(e)}}
                data={clearToCodeLOV}
                value={checker ? clearToCode : reverseClearToCode}
              />
              </div>
        </div>
        <div>
          <br/>
          <div style={{display:"flex",padding:"1px 0px 5px 0px"}}>
            <div style={{flex:0.85}}></div>
            <div style={{display:"flex",justifyContent:"space-between",flex:0.15}}>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                      <ButtonComponent
                    label="Fetch"
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                    // onClick={getData}
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
            <Header title={"Chart Of Account Setup"} headerShade={true}/>
            <div
                  style={{
                    display: "flex",
                    paddingTop: "8px",
                    paddingBottom: "5px",
                    alignItems: "center",
                  }}
                >
                <div style={{ flex: 0.01}}></div>
                  <div style={{flex:0.2}}>
                  <InputField
                label={"Balance As At :"}
                labelWidth={"45%"}
                inputWidth={"55%"}
                onChange={(e)=>{setBalanceAsAt(e.target.value)}}
                value={balanceAsAt}
                type={"date"}
                disabled
              />
                  </div>
                  <div style={{ flex: 0.29}}></div>
                  {/* <div style={{ flex: 0.03 }}>
                    {/* <ButtonComponent
                      onClick={handleFetch}
                      // label={"Fetch"}
                      buttonColor={"white"}
                      buttonWidth={"35px"}
                      buttonHeight={"28px"}
                      buttonIcon={<MdOutlineDoubleArrow size={20} />}
                    /> */}
                  {/* </div> */} 
                  {/* <div style={{ flex: 0.33 }}></div> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flex: 0.49
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
            <CustomTable headers={columns} data={datatableData} rowsPerPage={12}/>
          </div>
        </div>
        <Modal
        size="95%"
        opened={balanceEnquiryModal}
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
          Account Balance Enquiry
          </div>

          <svg
            onClick={closeBalanceEnquiryModal}
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
      <AccountBalanceEnquiry state={accountNumber} />
 </div>
        </div>
      </div>
</Modal>
      </div>
    );
  }

export default GlWithBalances;
