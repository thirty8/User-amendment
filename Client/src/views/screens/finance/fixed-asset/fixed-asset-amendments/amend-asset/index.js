import React,{useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";

import { FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";
import { Modal } from '@mantine/core';

import InputField from '../../../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../../../components/others/Fields/ListOfValue';
import Header from '../../../../../../components/others/Header/Header';
import CustomTable from '../../../../../../components/others/customtable';
import ButtonComponent from '../../../../../../components/others/Button/ButtonComponent';
import ActionButtons from '../../../../../../components/others/action-buttons/ActionButtons';
import { API_SERVER } from "../../../../../../config/constant";
import FixedAssetAmendmentModal from './components/fixed-asset-amendment-modal';


const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function FixedAssetCaptureAmendment() {
  const [GLamendment,setGLamendment] = useState(false);
  const [datatableData,setDatatableData] = useState([]);
  const [accountDescription,setAccountDescription] = useState("");
  const [details,setDetails] = useState({});


  const openGLamendment = () => {setGLamendment(true)};
  const closeGLamendment = () => {setGLamendment(false)};

  const [assetCategoryLov,setAssetCategoryLov] = useState([]);
  const [assetCategory,setAssetCategory] = useState("");
  const [assetID,setAssetID] = useState("");
  const [assetDescription,setAssetDescription] = useState("");
  const [serialNumber,setSerialNumber] = useState("");
  const [physicalLocationLOV,setPhysicalLocationLOV] = useState([]);
  const [physicalLocation,setPhysicalLocation] = useState("");
  const [barCode,setBarCode] = useState("");
  const [acquisitionDate,setAcquisitionDate] = useState("");

  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === "0.00" || num === ".00" || num === "") {
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
  
const clearData = () =>{
  setDatatableData([]);
}
  
const columns= ["Asset ID","Asset Category","Serial Number","Asset Description","Acquisition Cost","Acquisition Date","Physical Location","Posted By","Action"]

const getAssetCategory = () => {
    let array =[]
    axios.get(API_SERVER + "/api/get-asset-category",{ headers })
    .then((response)=>{
        let results = response.data;
        results.map((i) =>{array.push({label :i.cat_code + "  -  " + i.description, value : i.cat_code})})
        setAssetCategoryLov(array);
    })
    .catch((err)=>{
        throw(err)
    })
} 

const getPhysicalLocation = () => {
    let array =[]
    axios.get(API_SERVER + "/api/get-physical-location",{ headers })
    .then((response)=>{
        let results = response.data;
        results.map((i) =>{array.push({label :i.location_code + "    -    " + i.location_description, value : i.location_code})})
        setPhysicalLocationLOV(array);
    })
    .catch((err)=>{
        throw(err)
    })
} 
       
// onClick={()=>{setDetails({account_code:i.account_code,cust_no:i.cust_no,acct:i.tacct,account_ordering:i.account_ordering,account_descrp:i.account_descrp,chart_code:i.chart_code,clear_to_code:i.clear_to_code,level_id:i.level_id,currency:i.currency,currency_code:i.currency_code,account_restriction:i.account_restriction,accountNumber:i.account_number,ordering:i.account_ordering,accountStatus:i.flag_message,viewRestriction:i.view_restrict,branch:i.branch,branchCode:i.branch_code,status:i.status,accountClass:i.account_class,reportingLineCode:i.reporting_line_code,reportingLineDesc:i.line_description,postingDate:i.posting_date,posting_restriction:i.posting_restriction}); i.posted_by !== JSON.parse(localStorage.getItem("userInfo")).id ? openGLamendment() : swal({icon: "error",title:"ERR - 01342 : Approval Disallowed",text: "You cannot approve your own Entry"});}}

const getFixedAssetAmendmentData = () => {
    
          let array = [];
          axios
            .post(API_SERVER + "/api/get-asset-capture-amendments-data",
            {
                assetCategory:assetCategory,
                assetID:assetID,
                assetDescription:assetDescription,
                serialNumber:serialNumber,
                physicalLocation:physicalLocation,
                acquisitionDate:acquisitionDate
                // barCode:barCode,
        }, { headers })
            .then((response) => {
                console.log(response,"response")
              const results = response.data;
              results.map((i)=>{array.push([i.asset_id,i.asset_cat,i.serial_no,<div style={{textAlign:"left"}}>{i.description}</div>,<div style={{textAlign:"right"}}>{formatNumber(i.acq_cost)}</div>,i.acquisition_date,i.p_location,i.posted_by,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent onClick={()=>{openGLamendment();setAssetID(i.asset_id)}} buttonIcon={<AiOutlineEye size={18}/>}/> </div>])})
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

//   useEffect(()=>
//   {
//     getGlApproval();
   
//   },
//   [chartGroup])

  useEffect(()=>
  {
    getAssetCategory();
    getPhysicalLocation();
    getFixedAssetAmendmentData();
  },[])

   
  return (
    <div style={{ padding: "0px 15px" }}>
                  <ActionButtons displayNew={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} displayAuthorise={'none'} displayOk={'none'} displayReject={'none'} onRefreshClick={clearData} onFetchClick={getFixedAssetAmendmentData}/>
         <div style={{display:"flex",gap:"7px",paddingBottom:"15px",paddingTop:"20px"}}>
        <div style={{flex:0.05}}></div>
      <div style={{flex:0.9}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"20px",padding:"10px 15px 0px 15px"}}>
          <ListOfValue
              label={"Asset Category"}
              labelWidth={"20%"}
              inputWidth={"60%"}
              data={assetCategoryLov}
              onChange={(e)=>{setAssetCategory(e);}}
              value={assetCategory}
              />
           <InputField
                        label={"Asset ID"}
                        labelWidth={"30%"}
                        inputWidth={"50%"}
                        onChange={(e)=>{setAssetID(e.target.value)}}
                        id={"accountDescription"}
                        onKeyDown={(e) => {
                          switchFocus(e, "accountNumber");
                        }}
                        value={assetID}
                        />
               <InputField
                        label={"Asset Description"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        onChange={(e)=>{setAccountDescription(e.target.value)}}
                        id={"accountDescription"}
                        onKeyDown={(e) => {
                          switchFocus(e, "accountNumber");
                        }}
                        value={accountDescription}
                        />
               <InputField
                        label={"Serial Number"}
                        labelWidth={"30%"}
                        inputWidth={"50%"}
                        onChange={(e)=>{setSerialNumber(e.target.value)}}
                        id={"accountDescription"}
                        onKeyDown={(e) => {
                          switchFocus(e, "accountNumber");
                        }}
                        value={serialNumber}
                        />
             <ListOfValue
                        label={"Physical Location"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        data={physicalLocationLOV}
                        // required={true}
                        onChange={(e)=>{setPhysicalLocation(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("accountDescription");
                            input.focus();
                          }, 0);
                        }}
                        value={physicalLocation}
                        // id={"createdBy"}
                    />
        <InputField
                        label={"Bar Code"}
                        labelWidth={"30%"}
                        inputWidth={"50%"}
                        onChange={(e)=>{setBarCode(e.target.value)}}
                        id={"accountNumber"}
                        />
         <InputField
                        label={"Acquisition Date"}
                        labelWidth={"20%"}
                        inputWidth={"30%"}
                        onChange={(e)=>{setAcquisitionDate(e.target.value)}}
                        id={"accountNumber"}
                        type={"date"}
                        />
                       
                  
          </div>
          </div>
          <div style={{flex:0.05}}></div>
          </div>
      <div>
        <br/>
        <br/>
        <div>
          <Header title={"Fixed Asset Amendments"} headerShade={true}/>
          <CustomTable headers={columns} data={datatableData} rowsPerPage={8}/>
        </div>
      </div>
      <Modal size="100%" opened={GLamendment} withCloseButton={false} trapFocus={false}>
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
                  FIXED ASSET AMENDMENT
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
          <FixedAssetAmendmentModal assetID={assetID} closeGLamendment={closeGLamendment}/>
        </div>

      </Modal>
    </div>
  );
}

export default FixedAssetCaptureAmendment;
