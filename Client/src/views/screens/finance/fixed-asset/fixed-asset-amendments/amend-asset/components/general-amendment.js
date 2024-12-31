import React,{Children, useEffect,useState} from 'react';
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


function GeneralAmendment({setAssetID,allData,setMappedAccountsArrays,setGeneralDetails}) {
    const [assetCategoryLov,setAssetCategoryLov] = useState([]);
    const [assetCategory,setAssetCategory] = useState("");
    const [assetClass,setAssetClass] = useState("");
    const [assetClassDescription,setAssetClassDescription] = useState("");
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
    const [depreciableAmount,setDepreciableAmount] = useState("")
    const [perYearDep,setPerYearDep] = useState("")
    const [perMonthDep,setPerMonthDep] = useState("")
    const [totalDep,setTotalDep] = useState("")
    const [usefulLifeUnit,setUsefulLifeUnit] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [compMainIDLOV,setCompMainIDLOV] = useState([]);
    const [compMainID,setCompMainID] = useState("");
    const [rate,setRate] = useState("");
    

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

    const getEndDate = (uLife,uLifeUnit) => {

        if (uLifeUnit === "Y"){
        const sDate = new Date(startDate);
           
        const year = sDate.getFullYear();
        const newYear = year + parseInt(uLife)
        const newMonth = String(sDate.getMonth() + 1).padStart(2, "0");
        const newDay = String(sDate.getDate()).padStart(2, "0");

        setEndDate(`${newYear}-${newMonth}-${newDay}`);
        } else{
        
        const sDate = new Date(startDate);
        const currentMonth = sDate.getMonth();
        const currentYear = sDate.getFullYear();
        let newMonth = currentMonth + parseInt(uLife)

        const newYear = currentYear + Math.floor(newMonth / 12)
        newMonth = newMonth % 12 ;
        if (newMonth == 0 ) {
            newMonth = 1
        }
        // newMonth == 0 ? newMonth = 1 : newMonth 
    
        const newDay = String(sDate.getDate()).padStart(2, "0");
        const nMonth = String(newMonth + 1).padStart(2, "0");
        setEndDate(`${newYear}-${nMonth}-${newDay}`);
        
        console.log(currentMonth,newDay,newMonth,nMonth,newYear,"currentMonth","newDay","newMonth","nMonth","newYear")

        }
    }

    const depreciationValuesCalculator = (e,acqCost,sValue,usefulUnit) =>{
        if (e.key === "Enter"){

        let depAmount = 0;
        let rate = 0;
        let pyd = 0;
        let PYD = 0;
        let pmd = 0;
        let totalDp = 0;


        console.log(acqCost,sValue,usefulUnit,"usefulLifeUnit")
        // console.log(first)
        if (usefulUnit === "Y")
        {
            depAmount = acqCost - sValue;
            pyd = depAmount/allData.usefulLife
            pmd = pyd/12 ;
            totalDp = pyd * allData.usefulLife

            setDepreciableAmount(depAmount);
            setPerYearDep(pyd);
            setPerMonthDep(pmd.toFixed(2));
            setTotalDep(totalDp);

        }

         else if (usefulUnit === "M"){
            depAmount = acqCost - sValue;
            pyd = depAmount/(allData.usefulLife/12)
            pmd = pyd/12
            totalDp = pmd * allData.usefulLife

            if (allData.usefulLife < 12) {
                PYD = (pyd / 12) * allData.usefulLife
            }
            else{
                PYD = pyd
            }
            // pmd = pyd/12 ;
            // totalDp = pyd * details.usefulLife

            setDepreciableAmount(depAmount);
            setPerYearDep(PYD);
            setPerMonthDep(pmd.toFixed(2));
            setTotalDep(totalDp);
         }
    
        }
    }

    const getStartDate = () => {
        axios.get(API_SERVER + '/api/get-effective-date',{headers})
        .then((response) => {
          const results = response.data[0].effective_date;
    
          setStartDate(results);
          setAcquisitionDate(results);
        })
        .catch((error)=>{
          console.log(error)
        })
      }

    const getCFA = () => {
        console.log("yooooo")
        let array =[]
        axios.post(API_SERVER + "/api/get-component-of-main-asset-id",
        {
            assetCategory : assetCategory  
        }
        ,{ headers })
        .then((response)=>{
            console.log(response,"response")
            let results = response.data;
            results.map((i)=>{array.push({label: i.asset_id + "  -  " + i.description, value: i.asset_id});
            setCompMainIDLOV(array);
            
        })
        })
        .catch((err)=>{
            throw(err)
        })
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

    const getGlMappedAccounts = () => {
        axios.post(API_SERVER + "/api/get-gl-mapped-accounts",
        {
            assetCategory : assetCategory  
        }
        ,{ headers })
        .then((response)=>{
            console.log(response,"generatorRex")
            let results = response.data;
            results.map((i)=>{
            // setMappedAccountsArrays(mappedAccountsArrays)
            setMappedAccountsArrays({assetAccount:i.acct_link,creditAccount:i.cr_acct,depAccount:i.dep_acct,accumDepAccount:i.dep_cr_acct,disposalAccount:i.dis_acct,revSurplusAccount:i.rev_surp_acct,revLossAccount:i.rev_loss_acct,workInProgAccount:i.work_in_prog,maintenanceAccount:i.maintenance_acct})

            setDetails({assetClass:i.asset_class,assetDescription:i.asset_class_description,rate:i.rate,usefulLife:i.usefullife,usefulLifeUnit:i.useful_life_unit,currencyCode:i.currency_code,currency:i.currency});
            setUsefulLifeUnit(i.useful_life_unit)

            setRate(100 / parseInt(i.usefullife))
            // setSalvageValue(i.salvage_value)
            // setStartDate(i.dep_start_date)
            // setEndDate(i.dep_end_date)
            // setCompMainID(i.mainAssetID)
        })
        
            // results.map((i) =>{array.push({label :i.cat_code + "  -  " + i.description, value : i.cat_code})
        })
        .catch((err)=>{
            throw(err)
        })
    } 

    useEffect(()=>{
        getAssetCategory();
        getMainAssetComponent();
        getStartDate();
    },[])

    useEffect(()=>
    {
      if  (assetCategory){
        console.log("killer")
        // getFAsset();
        getGlMappedAccounts();
    }},[assetCategory])

    const switchFocus = (e, nextFieldId) => {
        if (e.key === "Enter") {
          document.getElementById(nextFieldId)?.focus();
          console.log(document.getElementById(nextFieldId), "component");
        }
      };

console.log(Object.values(details), "assetClass")
console.log(Object.values(details).length, "assetClass")
console.log(endDate, "endDateendDate")

  useEffect(()=>{
    if (mainAsset === "CFA"){
        getCFA();
    } 
  },[mainAsset])

  useEffect(()=>{
    if (startDate){
    getEndDate(allData.usefulLife,usefulLifeUnit)
    }
  },[startDate,allData.usefulLife,usefulLifeUnit])

  useEffect(()=>{
    if(allData){
        setAssetDescription(allData.assetDescription)
        setShortDescription(allData.shortDescription)
        setMainAsset(allData.mainAssetComponent)
        setAssetLabel(allData.assetLabel)
        setCompMainID(allData.componentOfMainAssetID)
        setAssetStatus(allData.assetStatus)
        setPropertyType(allData.propertyType)
        setAcquisitionCost(allData.acquisitionCost)
        setSalvageValue(allData.salvageValue)
        setSourceDocument(allData.document)
        setAcquisitionDate(allData.acquisitionDate)
        setDepreciableAmount(allData.depreciableAmount)
        setAssetDescription(allData.assetDescription)
        setShortDescription(allData.shortDescription)
        setMainAsset(allData.mainAssetComponent)
        setAssetLabel(allData.assetLabel)
        setCompMainID(allData.componentOfMainAssetID)
        setAssetStatus(allData.assetStatus)
        setPropertyType(allData.propertyType)
        setAcquisitionCost(allData.acquisitionCost)
        setSalvageValue(allData.salvageValue)
        setSourceDocument(allData.document)
        setAcquisitionDate(allData.acquisitionDate)
        setDepreciableAmount(allData.depreciableAmount)

        setSerialNumber(allData.serialNumber)
        setVoucherNumber(allData.voucherNumber)
        setBarCode(allData.barCode)
        setPoNumber(allData.poNumber)
        setUsefulLifeUnit(allData.usefulLifeUnit)
        setAssetStatus(allData.assetStatus)
        setPropertyType(allData.propertyType)
        setStartDate(allData.depStartDate)
        setEndDate(allData.depEndDate)
        setPerYearDep(allData.pyDep)
        setPerMonthDep(allData.myDep)
        setTotalDep(allData.totalDep)

        console.log(allData,"firstdesa")
      }
  },[allData])

  useEffect(()=>{
        setGeneralDetails(
            {assetCategory: allData.assetCategory,
             assetClass: allData.assetClass,
             currency: allData.currencyCode,
             assetDescription: assetDescription,
             shortDescription: shortDescription,
             mainAssetComponent: mainAsset,
             assetLabel:assetLabel,
             mainAssetID: compMainID,
            // mainAssetID: assetClass,
             assetStatus:assetStatus,
             depMethod:"SL",
             propertyType:propertyType,
             acquisitionCost:acquisitionCost,
             salvageValue:salvageValue,
             documentID:sourceDocument,
             acquisitionDate : acquisitionDate,
             depreciableAmount : depreciableAmount,
             serialNumber: serialNumber,
             voucherNumber: voucherNumber,
             barCode:barCode,
             poNumber: poNumber,
             usefulLife: allData.usefulLife,
             usefulLifeUnit: usefulLifeUnit,
             rate : allData.depreciationRate,
             depStartDate : startDate,
             depEndDate : endDate,
             perYearDep : perYearDep,
             perMonthDep : perMonthDep,
             totalDep : totalDep 
              })
    },[allData,assetDescription,shortDescription,mainAsset,assetLabel,assetStatus,propertyType,compMainID,acquisitionCost,depreciableAmount,salvageValue,sourceDocument,acquisitionDate,serialNumber,voucherNumber,barCode,poNumber,propertyType,details,assetClass,perYearDep,perMonthDep,totalDep,usefulLifeUnit,startDate,endDate,perYearDep,perMonthDep,totalDep])
  

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
                onChange={(e)=>{setAssetCategory(e);}}
                required
                value={allData.assetCategory}
            />
        <InputField 
                label={"Asset Class"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                onChange={(e)=>{setAssetClass(e.target.value)}}
                disabled
                required
                id={"assetClass"}
                value={allData.assetClass + "   -   " + allData.assetDescription}
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
        {/* <br/> */}
        {/* <hr/> */}
        <div style={{margin:"10px 0px 0px 20px"}}>
          <Header headerShade={true} title={"Asset Details"}/>
    </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px",marginBottom:"15px",padding:"10px 0 0px 0"}}>
        <TextAreaField
                label={"Asset Description"}
                labelWidth={"32%"}
                inputWidth={"68%"}
                onChange={(e)=>{
                    setAssetDescription(e.target.value)}}
                required
                onKeyDown={(e) => {
                    switchFocus(e, "shortDescription");
                  }}
                id={"assetDescription"}
                value={assetDescription}
            />
        <TextAreaField 
                label={"Short Description"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                onChange={(e)=>{
                    setShortDescription(e.target.value)}}
                onKeyDown={(e) => {
                    switchFocus(e, "mainAsset");
                  }}
                id={"shortDescription"}
                value={shortDescription}
            />
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px"}}>
        <ListOfValue 
                label={"Main Asset/Component"}
                labelWidth={"32%"}
                inputWidth={"68%"}
                required
                data={mainAssetLOV}
                id={"mainAsset"}
                onChange={(e)=>{
                    setMainAsset(e);setTimeout(() => {const input =document.getElementById("assetLabel");input.focus()}, 0);}}
                value={mainAsset}    
            />
        <InputField 
                label={"Asset Label"}
                labelWidth={"30%"}
                inputWidth={"60%"}
                required
                onChange={(e)=>{setAssetLabel(e.target.value)}}
                onKeyDown={(e)=>{switchFocus(e,"assetStatus")}}
                id={"assetLabel"}
                value={assetLabel}
            />
        {mainAsset == "CFA" ? 
            <ListOfValue 
            label={"Comp. Of Main Asset ID"}
            labelWidth={"32%"}
            inputWidth={"68%"}
            data={compMainIDLOV}
            onChange={(e)=>{setCompMainID(e)}}
            value={compMainID}
        /> :          
        <InputField 
            label={"Comp. Of Main Asset ID"}
            labelWidth={"32%"}
            inputWidth={"68%"}
            onChange={(e)=>{setAssetClass(e.target.value)}}
            disabled
            value={allData.mainAssetID}
    /> 
        }
        <ListOfValue 
                label={"Asset Status"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"assetStatus"}
                data={[{label:"NEW",value:"N"},{label:"USED",value:"U"}]}
                onChange={(e)=>{setAssetStatus(e);setTimeout(()=>{const input =document.getElementById("propertyType");input.focus()},0)}}
                required
                value={assetStatus}
            />
        <InputField 
                label={"Dep. Method"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                disabled
                required
                value={"STRAIGHT LINE"}
            />
        <ListOfValue 
                label={"Property Type"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"propertyType"}
                required
                data={[{label:"OWNED",value:"O"},{label:"LEASED",value:"L"}]}
                onChange={(e)=>{setPropertyType(e);setTimeout(()=>{const input =document.getElementById("acquisitionCost");input.focus()},0)}}
                value={propertyType}
            />
        <InputField 
                label={"Acquisition Cost"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                onChange={(e)=>{setAcquisitionCost(e.target.value)}}
                id={"acquisitionCost"}
                onKeyDown={(e) => {
                    depreciationValuesCalculator(e,acquisitionCost,salvageValue,usefulLifeUnit);
                    switchFocus(e, "sourceDocument");
                  }}
                required
                value={acquisitionCost}
                type={"number"}
                textAlign={"right"}
            
            />
        <InputField 
                label={"Salvage Value"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"salvageValue"}
                onChange={(e)=>{setSalvageValue(e.target.value)}}
                onKeyDown={(e) => {
                    switchFocus(e, "sourceDocument");
                  }}
                value={formatNumber(salvageValue)}
                disabled
                textAlign={"right"}
            />
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{flex:0.7}}>
        <InputField 
                label={"Source Document"}
                labelWidth={"47.5%"}
                inputWidth={"52.5%"}
                id={"sourceDocument"}
                onChange={(e)=>{setSourceDocument(e.target.value)}}
                onKeyDown={(e) => {
                    switchFocus(e, "acquisitionDate");
                  }}
                required
                value={sourceDocument}
            />
            </div>
            <div style={{flex:0.3}}>
            <div style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",borderRadius:"4px",width:"75px"}}>
            <ButtonComponent
            label={"View Doc."}
            buttonWidth={"75px"}
            buttonHeight={"28px"}
            />
            </div>
            </div>
        </div>
     <InputField 
                label={"Acquisition Date"}
                labelWidth={"30%"}
                inputWidth={"25%"}
                id={"acquisitionDate"}
                required
                type={"date"}
                onKeyDown={(e) => {
                    switchFocus(e, "serialNumber");
                  }}
                onChange={(e)=>{setAcquisitionDate(e.target.value)}}
                value={acquisitionDate}
            />
        <InputField 
                label={"Depreciable Amount"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                onChange={(e)=>{setDepreciableAmount(e.target.value)}}
                disabled
                required
                value={formatNumber(depreciableAmount)}
                textAlign={"right"}
            />
     <InputField 
                label={"Serial Number"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"serialNumber"}
                onChange={(e)=>{setSerialNumber(e.target.value)}}
                onKeyDown={(e) => {
                    switchFocus(e, "voucherNumber");
                  }}
                value={serialNumber}
            />
     <InputField 
                label={"Voucher Number"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                id={"voucherNumber"}
                onChange={(e)=>{setVoucherNumber(e.target.value)}}
                onKeyDown={(e) => {
                    switchFocus(e, "barCode");
                  }}
                value={voucherNumber}
            />
    <InputField 
                label={"Bar Code"}
                labelWidth={"30%"}
                inputWidth={"45%"}
                id={"barCode"}
                onChange={(e)=>{setBarCode(e.target.value)}}
                onKeyDown={(e) => {
                    switchFocus(e, "poNumber");
                  }}
                value={barCode}
                
            />
    <InputField 
                label={"P.O. Number"}
                labelWidth={"30.8%"}
                inputWidth={"50%"}
                id={"poNumber"}
                onChange={(e)=>{setPoNumber(e.target.value)}}
                value={poNumber}
                
            />
 
        </div>
    </div>
    <div style={{flex:0.25}}>
    <div style={{boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",height:"420px",marginRight:"10px"}}>
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
                radioButtonsWidth={"55%"}
                radioLabel={'Year'}   
                id={'Year'}
                value={"Y"}
                checked={usefulLifeUnit === "Y"}
                radioLabel2={"Month"} 
                id2={"Month"}
                checked2={usefulLifeUnit === "M"}
                value2={"M"}
                onChange={(e)=>{
                      setUsefulLifeUnit(e.target.value)
                     }}
                required
                />
     <InputField 
                label={"Rate"}
                labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                value={allData.depreciationRate + " % "}
                 textAlign={"center"}
            />
     <InputField 
                label={"Dep. Start Date"}
                labelWidth={"40%"}
                inputWidth={"40%"}
                onChange={(e)=>{setStartDate(e.target.value)}}
                type={"date"}
                required
                value={startDate}
            />
     <InputField 
                label={"Dep. Start End"}
                labelWidth={"40%"}
                inputWidth={"40%"}
                onChange={(e)=>{setEndDate(e.target.value)}}
                disabled
                required
                type={"date"}
                value={endDate}
                
            />
     <InputField 
                label={"Per Year Dep."}
               labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                onChange={(e)=>{setPerYearDep(e.target.value)}}
                required
                value={formatNumber(perYearDep)}
                 textAlign={"right"}
            />
     <InputField 
                label={"Per Month Dep."}
               labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                onChange={(e)=>{setPerMonthDep(e.target.value)}}
                value={formatNumber(perMonthDep)}
                 textAlign={"right"}
            />
     <InputField 
                label={"Total Dep."}
                labelWidth={"40%"}
                inputWidth={"40%"}
                disabled
                required
                onChange={(e)=>{setTotalDep(e.target.value)}}
                value={formatNumber(totalDep)}
                textAlign={"right"}
            />
    </div>
    </div>
    <br/>
    <InputField 
                label={"NBV"}
                labelWidth={"40%"}
                inputWidth={"35%"}
                disabled
                value={formatNumber(allData.nbv)}
                textAlign={"right"}
            />
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

export default GeneralAmendment;