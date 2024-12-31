import React,{useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";

import { API_SERVER } from "../../../../config/constant";
import { FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";
import { Modal } from '@mantine/core';

import InputField from '../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../components/others/Fields/ListOfValue';
import ButtonComponent from '../../../../components/others/Button/ButtonComponent';
import CustomTable from '../../teller-ops/components/CustomTable';
import CustomButtons from '../../../../components/others/CustomButtons';
import Header from '../../../../components/others/Header/Header';
import RadioButtons from '../../../../components/others/Fields/RadioButtons';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function PnLCodesEnquiry() {
  const [lineCode,setLineCode] = useState("");
  const [level,setLevel] = useState("");
  const [parentLine,setParentLine] = useState("");
  const [parentLineLOV,setParentLineLOV] = useState([]);
  const [postedBy,setPostedBy] = useState("");
  const [createdByLOV,setCreatedByLOV] = useState([]);
  const [lineDescription,setLineDescription] = useState("");
  const [approvedStatus,setApprovedStatus] = useState("");
  
  const [datatableData,setDatatableData] = useState([]);
  const [details,setDetails] = useState({});
  
  const columns= ["Line Code","Line Description","Line Level","Parent Line","Line Order","Posted By","Status"]

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
            axios.get(API_SERVER + '/api/get-profit-and-loss-parent-line',
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.code + "   -   " + i.description , value: i.code})})
              setParentLineLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getParentLine();
        
      }, []);

           
        const getData = () => {
            console.log(parentLine, "greaterrrrrrrrrr");
            // console.log(clearToCode, "re n there");
           
          let array = [];
          axios
            .post(API_SERVER + "/api/pnl-code-enquiry",
            {
              lineCode:lineCode,
              levelIndicator:level,
              parentLine:parentLine,
              postedBy:postedBy,
              lineDescription:lineDescription,
              approvedStatus : approvedStatus
        }, { headers })
            .then((response) => {
                console.log(response,"response")
              const results = response.data;
              results.map((i)=>{array.push([i.pl_code,<div style={{textAlign:"left"}}>{i.pl_desc}</div>,i.level_indicator,i.clear_to_code,i.ordering,i.posted_by,i.flag_message])})
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
      setParentLine("")
      document.getElementById("parentLine").value = ""
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
          <InputField
              label={"Line Code"}
              labelWidth={"20%"}
              inputWidth={"60%"}
              id={"lineCode"}
              onChange={(e)=>{setLineCode(e.target.value)}}
              onKeyDown={(e)=>{switchFocus(e,"HeadLevel")}}
              />
               <RadioButtons display={true}
                  display2={true}
                  display3={true}
                  label={"Level"}
                  labelWidth={'30%'}
                  radioLabel={'Head Level'}   
                  id={'HeadLevel'}
                  value={"H"}
                  checked={level === "H"}
                  radioLabel2={"Total Level"} 
                  id2={"TotalLevel"}
                  value2={"T"}
                  checked2={level === "T"}
                  radioLabel3={"Detail Level"}
                  id3={"DetailLevel"}
                  radioButtonsWidth={'60%'}
                  value3={"D"}
                  checked3={level === "D"}
                  onChange={(e)=>setLevel(e.target.value)}
                  />
         <ListOfValue
                        label={"Parent Line"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        data={parentLineLOV}
                        onChange={(e)=>{setParentLine(e);  setTimeout(() => {
                          const input =
                            document.getElementById("postedBy");
                          input.focus();
                        }, 0);}}
                        id={"parentLine"}
                        value={parentLine}
                        />
         <ListOfValue
                        label={"Posted By"}
                        labelWidth={"30%"}
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
       
                  <InputField
                        label={"Line Description"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        onChange={(e)=>{setLineDescription(e.target.value)}}
                        id={"lineDescription"}
                        value={lineDescription}
                    />
                    <ListOfValue
                        label={"Approved Status"}
                        labelWidth={"30%"}
                        inputWidth={"60%"}
                        data={["NEW","Approved","Amended","Rejected","Incomplete"]}
                        onChange={(e)=>{setApprovedStatus(e);}}
                        id={"approvedStatus"}
                        value={approvedStatus}
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

export default PnLCodesEnquiry;
