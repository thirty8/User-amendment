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
import BseSubModal from './balance-sheet-enquiry';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function BalanceSheetEnquiry() {
  const [clearsToLOV,setClearsToLOV] = useState([]);
  const [clearsTo,setClearsTo] = useState("");
  const [reportBalance,setReportBalance] = useState("");
  const [balanceDate,setBalanceDate] = useState("");  
  const [branch,setBranch] = useState("");
  const [branchLOV,setBranchLOV] = useState([]);
  const [reportType,setReportType] = useState([]);
  const [lineCode,setLineCode] = useState("");
  const [currency,setCurrency] = useState("");
  const [currencyLOV,setCurrencyLOV] = useState([]);

  const [postedBy,setPostedBy] = useState("");
  const [createdByLOV,setCreatedByLOV] = useState([]);
  const [lineDescription,setLineDescription] = useState("");
  const [approvedStatus,setApprovedStatus] = useState("");
  
  
  const [datatableData,setDatatableData] = useState([]);
  const [details,setDetails] = useState({});
  const [container,setContainer] = useState({});
  const [modal,setModal] = useState(false)


  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }
  
  const columns= ["BP Code","BP Description","Level","Clear To Code","Previous Balance","Current Balance","Variance","Actions"]

    useEffect(() => {
      
          const getCreatedBy = () => {
            let curr = [];
            axios.get(API_SERVER + '/api/get-created-by-details',
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.label, value: i.value})})
              setCreatedByLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getCreatedBy();


            const getParentLine = () => {
            let curr = [];
            axios.get(API_SERVER + '/api/get-parent-line-details',
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.label, value: i.value})})
              setClearsToLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getParentLine();

          const getBranch = () => {
            let curr = [];
            axios.post(API_SERVER + '/api/get-code-details',
            {code: 'BRA'
            },
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.label, value: i.value})})
              setBranchLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getBranch();

          const getCurrency = () => {
            let curr = [];
          axios
            .get(API_SERVER + "/api/get-finance-currency", { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.actual_code + "   -   " + i.description, value: i.actual_code})})
              console.log(curr, "djd");
              setCurrencyLOV(curr);
            //   console.log(stateLOV, "mmm");
            })
            .catch((error) => {
              console.log(error);
            });
        };
        getCurrency();

        
        
      }, []);

           
        const getData = () => {
            console.log(clearsTo, "greaterrrrrrrrrr");
            // console.log(clearToCode, "re n there");
           
          let array = [];
          axios
            .post(API_SERVER + "/api/bs-code-enquiry",
            {
              lineCode:lineCode,
              levelIndicator:reportBalance,
              parentLine:clearsTo,
              postedBy:postedBy,
              lineDescription:lineDescription,
              approvedStatus : approvedStatus
        }, { headers })
            .then((response) => {
                console.log(response,"response")
              const results = response.data;
              results.map((i)=>{array.push([i.bs_code,<div style={{textAlign:"left"}}>{i.bs_desc}</div>,i.level_indicator,i.clear_to_code,i.ordering,i.posted_by,i.flag_message,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye size={18}/>} onClick={()=>{setContainer({clearToCode:i.clear_to_code,bs_code:i.bs_code,branch:i.branch,balanceDate:i.balancedate});openModal();}}/></div>])})
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
      setLineCode("")
      document.getElementById("lineCode").value = ""
      setClearsTo("")
      document.getElementById("clearsTo").value = ""
      setPostedBy("")
      document.getElementById("postedBy").value = ""
      setLineCode("")
      document.getElementById("lineCode").value = ""
      setLineDescription("")
      document.getElementById("lineDescription").value = ""
      setApprovedStatus("")
      document.getElementById("approvedStatus").value = ""
      };
   
  return (
    
    <div style={{ padding: "10px 15px" }}>
         <div style={{display:"flex",gap:"7px",paddingBottom:"15px"}}>
        <div style={{flex:0.02}}></div>
      <div style={{flex:0.96}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"20px",padding:"10px 15px 0px 15px"}}>
          <ListOfValue
                        label={"Clears To: "}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        data={clearsToLOV}
                        onChange={(e)=>{setClearsTo(e);  setTimeout(() => {
                          const input =
                            document.getElementById("actualBalance");
                          input.focus();
                        }, 0);}}
                        id={"clearsTo"}
                        value={clearsTo}
                        />
               <RadioButtons display={true}
                  display2={true}
                  display3={false}
                  label={"Report Balance "}
                  labelWidth={'30%'}
                  radioButtonsWidth={"55%"}
                  radioLabel={'Actual Balance'}   
                  id={'actualBalance'}
                  value={"H"}
                  checked={reportBalance === "H"}
                  radioLabel2={"Translated Balance"} 
                  id2={"translatedBalance"}
                  value2={"T"}
                  checked2={reportBalance === "T"}
                  onChange={(e)=>setReportBalance(e.target.value)}
                  />
         <InputField
                        label={"Balance Date"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        onChange={(e)=>{setBalanceDate(e.target.value)}}
                        onKeyDown={(e)=>{switchFocus(e,"branch")}}
                        id={"balanceDate"}
                        value={balanceDate}
                        type={"date"}
                        />
         <ListOfValue
                        label={"Branch"}
                        labelWidth={"30%"}
                        inputWidth={"60%"}
                        data={branchLOV}
                        onChange={(e)=>{setBranch(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("reportType");
                            input.focus();
                          }, 0);}}
                          value={branch}
                        id={"branch"}
                        />
       
                  <ListOfValue
                        label={"Report Type"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        data={["Current Balance","Month On Month","Year On Year Balance"]}
                        onChange={(e)=>{setReportType(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("currency");
                            input.focus();
                          }, 0);
                        }}
                        id={"reportType"}
                        value={reportType}
                    />
                    <ListOfValue
                        label={"Currency"}
                        labelWidth={"30%"}
                        inputWidth={"60%"}
                        data={currencyLOV}
                        onChange={(e)=>{setCurrency(e);}}
                        id={"currency"}
                        value={currency}
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
          <Header title={"Balance Sheet"} headerShade={true}/>
          <div
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
                  </div>
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
                </div>
          <CustomTable headers={columns} data={datatableData} rowsPerPage={10}/>
        </div>
      </div>
      <Modal
        size="90%"
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
      <BseSubModal container={container}/>
 </div>
        </div>
      </div>
</Modal>
    </div>
  );
}

export default BalanceSheetEnquiry;
