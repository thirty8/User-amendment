import React, {useState,useEffect} from 'react';
import axios from "axios";
import swal from "sweetalert";

import { AiOutlineEye } from "react-icons/ai";
import { Modal } from '@mantine/core';
import { API_SERVER } from "../../../../../config/constant";

import ListOfValue from '../../../../../components/others/Fields/ListOfValue';
import ActionButtons from '../../../../../components/others/action-buttons/ActionButtons';
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';
import ApprovePnLCodes from './components/approve-PnL-codes-hierichal-view';

import CustomTable from '../../../teller-ops/components/CustomTable';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};


function PnLCodesApproval() {
  const [PnL,setPnL] = useState(false);
  const [parentLine,setParentLine] = useState("");
  const [parentLineLOV,setParentLineLOV] = useState([]);
  const [details,setDetails] = useState({});
  const openPnL = () => {setPnL(true)};
  const closePnL = () => {setPnL(false)};
  const [PLdata,setPLdata] = useState([]);
  
    
  useEffect(() => {
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

const getProfitAndLossPLData = () => {
  let array = [];
  axios.post(API_SERVER + '/api/get-approve-profit-and-loss-data',
  {parentLine: parentLine},
  {headers})
  .then((response) => {
    console.log(response,"xxxxx")
    const results = response.data;
    results.map((i,key)=>{array.push([i.pl_code,i.pl_desc,i.level_indicator,i.clear_to_code,i.branch_code,<div style={{textAlign:"center"}}>{i.ordering}</div>,i.posted_by,i.flag_message,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent onClick={()=>{setDetails({branch_code:results[key].branch_code,parent_line:results[key].clear_to_code,pl_code:results[key].pl_code,line_category:results[key].line_category,line_level:results[key].level_indicator,ordering:results[key].ordering,line_description:results[key].pl_desc,report_class:results[key].report_class,parent_line_description:results[key].parent_line_description});i.posted_by !== JSON.parse(localStorage.getItem("userInfo")).id ? openPnL() : swal({icon: "error",title:"ERR - 01342 : Approval Disallowed",text: "You cannot approve your own Entry"});}} buttonIcon={<AiOutlineEye size={20}/>} buttonHeight={"27px"} buttonWidth={"27px"}/></div>])})
    setPLdata(array) 
    })
    .catch((error)=>{
    console.log(error)
  })
}

useEffect(()=>{
    getProfitAndLossPLData();
  },[parentLine])

  return (
    <div>
        <div style={{boxShadow: 
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderRadius: "3px",
            backgroundColor: "#ffffff",
            marginBottom: "10px",}}>
              <div style={{
              color: "white",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
              height: "25px",
              fontSize: "1.1em",
              paddingLeft: "10px",
              alignItems: "center",
            }}>
                </div>
            <div style={{padding:'10px'}}>
            <div
          style={{
            marginTop: "-30px",
            padding:'10px',
            textAlign: "center",
            // marginBottom: "5px",
          }}
        >
            <ActionButtons  displayReject={'none'}  displayAuthorise={'none'} displayCancel={'none'} displayView={'none'} displayNew={'none'} displayHelp={'none'} onExitClick={() => document.getElementById("closeModalBTN").click()} />
            </div>
        <hr style={{marginTop:"0"}} />
        <br/>
        <div>
    <div style={{display:"flex",margin:'15px 0'}}>
        <div style={{flex:0.02}}></div>
        <div style={{flex:0.4}}>
        <ListOfValue
        label={"Parent Line"}
        labelWidth={"20%"}
        inputWidth={"70%"}
        data={parentLineLOV}
        onChange={(e)=>{setParentLine(e)}}
        value={parentLine}
        />
        </div>
        <div style={{flex:0.58}}></div>
    </div>
    <br/>
    <div>
        <CustomTable headers={["Line Code","line description","Line level","parent line","branch","line order","Posted By","Status","Action"]} data={PLdata} rowsPerPage={10}/>
    </div>
    </div>
       
        {/* <TabsComponent tabsData={tabsData} /> */}
            </div>
            </div>
          <Modal size="85%" opened={PnL} withCloseButton={false} >
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
              APPROVE PROFIT AND LOSS CODES
                </div>

                <svg
                  onClick={closePnL}
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
          <div className="bg-gray-200 rounded-b ">
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{padding:"50px 0px"}}
            >
           <ApprovePnLCodes details={details} getProfitAndLossPLData={getProfitAndLossPLData} closePnL={closePnL}/>
            </div>
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default PnLCodesApproval