import React,{useEffect,useState} from 'react';
import axios from "axios";
import InputField from '../../../../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../../../../components/others/Fields/ListOfValue';
import Header from '../../../../../../../components/others/Header/Header';
import TextAreaField from '../../../../../../../components/others/Fields/TextArea';
import ButtonType from '../../../../../../../components/others/Button/ButtonType';
import RadioButtons from '../../../../../../../components/others/Fields/RadioButtons';
import ButtonComponent from '../../../../../../../components/others/Button/ButtonComponent';
import { API_SERVER } from "../../../../../../../config/constant";

const headers = {
    "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };


function GeneralApproval({setAssetID,allData}) {
    const [assetCategoryLov,setAssetCategoryLov] = useState([]);
    const [assetCategory,setAssetCategory] = useState("");
    const [assetDescription,setAssetDescription] = useState("");
    const [shortDescription,setShortDescription] = useState("");
    const [mainAssetLOV,setMainAssetLOV] = useState([]);
    const [mainAsset,setMainAsset] = useState("");
    const [assetLabel,setAssetLabel] = useState("");
    const [assetStatus,setAssetStatus] = useState("");
    const [propertyType,setPropertyType] = useState("");
    const [acquisitionCost,setAcquisitionCost] = useState("");
    const [sourceDocument,setSourceDocument] = useState("");
    const [salvageValue,setSalvageValue] = useState("");
    const [acquisitionDate,setAcquisitionDate] = useState("");
    const [barCode,setBarCode] = useState("");
    const [serialNumber,setSerialNumber] = useState("");
    const [voucherNumber,setVoucherNumber] = useState("");
    const [poNumber,setPoNumber] = useState("");
    const [details,setDetails] = useState({});


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

    const getMainAssetComponent = () => {
        let array =[]
        axios.get(API_SERVER + "/api/get-main-asset-component",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.actual_code + "  -  " + i.description, value : i.actual_code})})
            setMainAssetLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 


    useEffect(()=>{
        getAssetCategory();
        getMainAssetComponent();
    },[])

    const switchFocus = (e, nextFieldId) => {
        if (e.key === "Enter") {
          document.getElementById(nextFieldId)?.focus();
          console.log(document.getElementById(nextFieldId), "component");
        }
      };

  return (
    <div>
<div style={{display:"flex",gap:"40px",paddingTop:"3px"}}>
    {/* <div style={{flex:0.05}}></div> */}
    <div style={{flex:0.75}}>
    <div style={{margin:"0px 0px 0px 20px"}}>
          <Header headerShade={true} title={"Category"}/>
    </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px",padding:"10px 0 7px 0"}}>
        <ListOfValue 
                label={"Asset Category"}
                labelWidth={"32%"}
                inputWidth={"68%"}
                data={assetCategoryLov}
                onChange={(e)=>{setAssetCategory(e)}}
                required
                value={allData.assetCategory}
            />
        <InputField 
                label={"Asset Class"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                required
                id={"assetClass"}
                value={allData.assetClass + "  -  " + allData.assetClassDescription}
            />
        <InputField 
                label={"Currency"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                disabled
                required
                value={allData.currencyCode + "  -  " + allData.currency}
            />
        </div>
        <div style={{margin:"10px 0px 0px 20px"}}>
          <Header headerShade={true} title={"Asset Details"}/>
    </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px",marginBottom:"15px",padding:"10px 0 0px 0"}}>
        <InputField
                label={"Asset Description"}
                labelWidth={"32%"}
                inputWidth={"68%"}
                required
                disabled
                id={"assetDescription"}
                value={allData.assetDescription}
            />
        <InputField 
                label={"Short Description"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                disabled
                id={"shortDescription"}
                value={allData.shortDescription}
            />
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px"}}>
        <ListOfValue 
                label={"Main Asset/Component"}
                labelWidth={"32%"}
                inputWidth={"68%"}
                data={mainAssetLOV}
                onChange={(e)=>{setAssetCategory(e)}}
                required
                value={allData.mainAssetComponent}
            />
        <InputField 
                label={"Asset Label"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                required
                onChange={(e)=>{setAssetLabel(e.target.value)}}
                value={allData.assetLabel}
                id={"assetLabel"}
                disabled
            />
         <InputField 
                label={"Comp. Of Main Asset ID"}
                labelWidth={"32%"}
                inputWidth={"68%"}
                value={allData.componentOfMainAssetID}
                disabled
            />
               <ListOfValue 
                label={"Asset Status"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"assetStatus"}
                data={[{label:"New",value:"N"},{label:"Used",value:"U"}]}
                onChange={(e)=>{setAssetStatus(e)}}
                required
                value={allData.assetStatus}
            />
        <InputField 
                label={"Dep. Method"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                disabled
                required
                value={allData.depMethod}
            />
        <ListOfValue 
                label={"Property Type"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"propertyType"}
                required
                data={[{label:"Owned",value:"O"},{label:"Leased",value:"L"}]}
                onChange={(e)=>{setPropertyType(e)}}
                value={allData.propertyType}
            />
        <InputField 
                label={"Acquisition Cost"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                required
                disabled
                id={"acquisitionCost"}
                value={formatNumber(allData.acquisitionCost)}
                textAlign={"right"}
            />
        <InputField 
                label={"Salvage Value"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"salvageValue"}
                onChange={(e)=>{setSalvageValue(e.target.value)}}
                value={allData.salvageValue}
                disabled
            />
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{flex:0.7}}>
        <InputField 
                label={"Source Document"}
                labelWidth={"47.5%"}
                inputWidth={"52.5%"}
                id={"sourceDocument"}
                onChange={(e)=>{setSourceDocument(e.target.value)}}
                required
                disabled
                value={allData.document}
            />
            </div>
            <div style={{flex:0.3}}>
            <ButtonComponent
            label={"View Doc."}
            />
            </div>
        </div>
     <InputField 
                label={"Acquisition Date"}
                labelWidth={"30%"}
                inputWidth={"25%"}
                required
                disabled
                id={"acquisitionDate"}
                type={"date"}
                value={allData.acquisitionDate}
            />
        <InputField 
                label={"Depreciable Amount"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                disabled
                required
                value={formatNumber(allData.depreciableAmount)}
                textAlign={"right"}
            />
     <InputField 
                label={"Serial Number"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"serialNumber"}
                onChange={(e)=>{setSerialNumber(e.target.value)}}
                value={allData.serialNumber}
                disabled
            />
     <InputField 
                label={"Voucher Number"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                id={"voucherNumber"}
                onChange={(e)=>{setVoucherNumber(e.target.value)}}
                disabled
                value={allData.voucherNumber}
            />
    <InputField 
                label={"Bar Code"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"barCode"}
                onChange={(e)=>{setBarCode(e.target.value)}}
                disabled
                value={allData.barCode}
                
            />
    <InputField 
                label={"P.O. Number"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                id={"poNumber"}
                onChange={(e)=>{setPoNumber(e.target.value)}}
                value={allData.poNumber}
                disabled
                
            />
 
        </div>
    </div>
    <div style={{flex:0.25,boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",height:"420px",marginRight:"10px"}}>
    <div style={{margin:"0px 0px 0px 0px"}}>
          <Header headerShade={true} title={"Depreciation Details"}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr",rowGap:"20px",margin:"15px 15px 0px 15px"}}>
    <InputField 
                label={"Useful Life"}
                labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                value={allData.usefulLife}
                textAlign={"center"}
            />
 <RadioButtons 
                display={true}
                display2={true}
                label={"Useful Life Unit"}
                labelWidth={'40%'}
                radioLabel={'Year'}   
                id={'Year'}
                value={allData.usefulLifeUnit}
                checked={allData.usefulLifeUnit === "Y"}
                radioLabel2={"Month"} 
                id2={"Month"}
                checked2={allData.usefulLifeUnit === "M"}
                // value2={"Month"}
                radioButtonsWidth={"55%"}
                // onChange={(e)=>{
                //       setPostingRestriction(e.target.value)
                //      }}
                required
                disabled
                  />
     <InputField 
                label={"Rate"}
                labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                value={allData.depreciationRate ? allData.depreciationRate + "%" : null}
                 textAlign={"center"}
            />
     <InputField 
                label={"Dep. Start Date"}
               labelWidth={"40%"}
                inputWidth={"40%"}
                type={"date"}
                required
                disabled
                value={allData.depStartDate}
            />
     <InputField 
                label={"Dep. Start End"}
                labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                type={"date"}
                value={allData.depEndDate}
                
            />
     <InputField 
                label={"Per Year Dep."}
               labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                value={formatNumber(allData.pyDep)}
                 textAlign={"right"}
            />
     <InputField 
                label={"Per Month Dep."}
               labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                value={formatNumber(allData.myDep)}
                 textAlign={"right"}
            />
     <InputField 
                label={"Total Dep."}
                labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                value={formatNumber(allData.totalDep)}
                textAlign={"right"}
            />
    </div>
    </div>

</div>
<div style={{display:'flex',justifyContent:'end',marginRight:'15px'}}>
            <div style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",borderRadius:"4px"}}>
                <ButtonComponent
                label={"Next"}
                buttonWidth={"55px"}
                // onClick={changeToFirstTab}
                 />
            </div>
         </div>
    </div>
  )
}

export default GeneralApproval;