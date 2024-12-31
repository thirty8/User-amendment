import React,{useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";

import { API_SERVER } from "../../../../../config/constant";
import { FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";
import { Modal } from '@mantine/core';

import InputField from '../../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../../components/others/Fields/ListOfValue';
import CustomTable from '../../../../../components/others/customtable';
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';
import Header from '../../../../../components/others/Header/Header';
import RadioButtons from '../../../../../components/others/Fields/RadioButtons';
import ActionButtons from '../../../../../components/others/action-buttons/ActionButtons';
import TaxAccountApprovalModal from './components/tax-account-approval-modal';

// import BSCodesSetup from '../bs-codes-setup';
// import GlApproveAccountModal from './components/gl-approve-account';
// import AccountSetup from '../gl-create-account/components/AccountSetup';
// import AccountSetup from '../gl-create-account/components/AccountSetup';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function TaxAccountApproval() {
  const [GLamendment,setGLamendment] = useState(false);
  const [chartGroups,setChartGroups] = useState("");
  const [chartGroupsLOV,setChartGroupsLOV] = useState([]);
  const [clearToCode,setClearToCode] = useState("");
  const [clearToCodeLOV,setClearToCodeLOV] = useState([]);
  const [datatableData,setDatatableData] = useState([]);
  const [status,setStatus] = useState("");
  const [statusLOV,setStatusLOV] = useState([]);
  const [createdBy,setCreatedBy] = useState("");
  const [accountNumber,setAccountNumber] = useState("");
  const [accountDescription,setAccountDescription] = useState("");
  const [createdByLOV,setCreatedByLOV] = useState([]);
  const [details,setDetails] = useState({});

  const openGLamendment = () => {setGLamendment(true)};
  const closeGLamendment = () => {setGLamendment(false)};

  const [chartGroup,setChartGroup] = useState("");
  const [dvo,setDVO] = useState("");
  // const [accountDescription,setAccountDescription] = useState("");
  const [levelID,setLevelID] = useState([]);
  const [level,setLevel] = useState("");
  const [currencyLOV,setCurrencyLOV] = useState([]);
  const [currency,setCurrency] = useState("");
  const [postingRestriction,setPostingRestriction] = useState("");
  const [accountRestriction,setAccountRestriction] = useState("");
  const [viewRestriction,setViewRestriction] = useState("");
  const [branch,setBranch] = useState("");
  const [branchLOV,setBranchLOV] = useState([]);
  const [qwerty,setQWERTY] = useState([]);
  const [qwet,setQWET] = useState([]);
  // const [status,setStatus] = useState("");
  // const [statusLOV,setStatusLOV] = useState([]);
  const [accountClass,setAccountClass] = useState("");
  const [accountClassLOV,setAccountClassLOV] = useState([]);
  const [reportingLineCode,setReportingLineCode] = useState("");
  const [reportingLineCodeLOV,setReportingLineCodeLOV] = useState([]);
  const [autoReconcile,setAutoReconcile] = useState("");
  const [reconcileType,setReconcileType] = useState("");
  const [postingDate,setPostingDate] = useState("");
  const [glAccountAmmendment,setGlAccountAmmendment] = useState(false);
  const [glAccountApproval,setGlAccountApproval] = useState(false);
  const [user,setUser] = useState("")

const clearData = () =>{
  setChartGroups("")
  setCreatedBy("")
  setAccountDescription("")
  setAccountNumber("")
  setDatatableData([]);
}
  
const columns= ["Chart Group","Account No.","Account Description","Level","Clear To Account","Currency","Branch","Created By","Date Created","Status","Action"]

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

        const getStatus = () => {
            let curr = [];
            axios.get(API_SERVER + '/api/get-finance-status',
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.actual_code + "   -   " + i.description, value: i.actual_code})})
              setStatusLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getStatus();

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
            //   setClearToCode(curr[0].value);
            //   setDatatableData(array);
            // console.log(stateLOV, "mmm");
          })
            .catch((error) => {
              console.log(error);
            });
          }, [chartGroups]);

        const getGlApproval = () => {
    
          let array = [];
          axios
            .post(API_SERVER + "/api/get-chart-of-accounts-approvals",
            {
            chartGroup:"30000",
            createdBy:createdBy,
            accountDescription:accountDescription,
            accountNumber:accountNumber,
            branch:branch,
        }, { headers })
            .then((response) => {
                console.log(response,"response")
              const results = response.data;
              results.map((i)=>{array.push([i.chart_code,i.account_number,<div style={{textAlign:"left"}}>{i.account_descrp}</div>,i.level_id,i.clear_to_code,i.currency,i.branch,i.posted_by,i.posting_date,i.flag_message,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent onClick={()=>{setDetails({account_code:i.account_code,cust_no:i.cust_no,acct:i.tacct,account_ordering:i.account_ordering,account_descrp:i.account_descrp,chart_code:i.chart_code,clear_to_code:i.clear_to_code,level_id:i.level_id,currency:i.currency,currency_code:i.currency_code,account_restriction:i.account_restriction,accountNumber:i.account_number,ordering:i.account_ordering,accountStatus:i.flag_message,viewRestriction:i.view_restrict,branch:i.branch,branchCode:i.branch_code,status:i.status,accountClass:i.account_class,reportingLineCode:i.reporting_line_code,reportingLineDesc:i.line_description,postingDate:i.posting_date,posting_restriction:i.posting_restriction}); i.posted_by !== JSON.parse(localStorage.getItem("userInfo")).id ? openGLamendment() : swal({icon: "error",title:"ERR - 01342 : Approval Disallowed",text: "You cannot approve your own Entry"});}} buttonIcon={<AiOutlineEye size={18}/>}/> </div>])})
                      setDatatableData(array);
                    })
            .catch((error) => {
              console.log(error);
            });
          }
      
    const switchFocus = (e, nextFieldId) => {
        if (e.key === "Enter") {
          document.getElementById(nextFieldId)?.focus();
          console.log(document.getElementById(nextFieldId), "component");
        }
      };

  useEffect(()=>
  {
    getGlApproval();
  },
  [chartGroup])

  console.log(details,"details detailsdetails")
   
  return (
    <div style={{ padding: "0px 15px" }}>
                  <ActionButtons displayNew={'none'} displayCancel={'none'} displayView={'none'} displayExit={'none'} displayDelete={'none'} displayHelp={'none'} displayAuthorise={'none'} displayOk={'none'} displayReject={'none'} onRefreshClick={clearData} onFetchClick={getGlApproval}/>
         <div style={{display:"flex",gap:"7px",paddingBottom:"15px",paddingTop:"20px"}}>
        <div style={{flex:0.05}}></div>
      <div style={{flex:0.9}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"20px",padding:"10px 15px 0px 15px"}}>
          <InputField
                        label={"Account Number"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        onChange={(e)=>{setAccountNumber(e.target.value)}}
                        id={"accountNumber"}
                        onKeyDown={(e) => {
                          switchFocus(e, "accountDescription");
                        }}
                        />
  <InputField
                        label={"Account Description"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        onChange={(e)=>{setAccountDescription(e.target.value)}}
                        id={"accountDescription"}
                        onKeyDown={(e) => {
                          switchFocus(e, "createdBy");
                        }}
                        value={accountDescription}
                        />
    <ListOfValue
                        label={"Created By"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        data={createdByLOV}
                        // required={true}
                        onChange={(e)=>{setCreatedBy(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("branch");
                            input.focus();
                          }, 0);
                        }}
                        value={createdBy}
                        id={"createdBy"}
                    />
    <ListOfValue
                        label={"Branch"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        data={branchLOV}
                        // required={true}
                        onChange={(e)=>{setBranch(e);
                        }}
                        value={branch}
                        id={"branch"}
                    />
          </div>
          </div>
          <div style={{flex:0.05}}></div>
          </div>
      <div>
        {/* <div style={{display:"flex"}}>
            <div style={{flex:0.8}}></div>
            <div style={{display:"flex",justifyContent:"space-between",flex:0.2}}>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                      <ButtonComponent
                    label="Fetch"
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                    onClick={getGlApproval}
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
                  <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                  <ButtonComponent
                    label="Exit"
                    // onClick={clearFields}
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                  />
                  </div>
            </div>
        </div> */}
        <br/>
        <br/>
        <div>
          <Header title={"Chart Of Account Approval"} headerShade={true}/>
          <CustomTable headers={columns} data={datatableData} rowsPerPage={10}/>
        </div>
      </div>
      <Modal size="85%" opened={GLamendment} withCloseButton={false} trapFocus={false}>
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
                  CHART OF ACCOUNTS : GL ACCOUNT APPROVAL
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
          <div className="bg-gray-200 rounded-b " style={{ marginTop: "15px" }}>
          </div>
          <TaxAccountApprovalModal details={details} closeGLamendment={closeGLamendment} getGlApproval={getGlApproval}/>
        </div>

      </Modal>
    </div>
  );
}

export default TaxAccountApproval;
