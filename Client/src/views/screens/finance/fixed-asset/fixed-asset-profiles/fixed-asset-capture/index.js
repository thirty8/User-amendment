import React,{useState,useEffect} from 'react';
import axios from "axios";
import InputField from '../../../../../../components/others/Fields/InputField';
import ActionButtons from '../../../../../../components/others/action-buttons/ActionButtons';
import TabsComponent from '../../../../../../components/others/tab-component/tab-component';
import General from './components/general';
import LocationAndMaintenance from './components/location-and-maintenance';
import GlMapping from './components/gl-mapping';
import { API_SERVER } from "../../../../../../config/constant";
import swal from "sweetalert";

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function FixedAsset() {
    const [assetID,setAssetID] = useState("")
    const [generalDetails,setGeneralDetails] = useState({});
    const [locationDetails,setLocationDetails] = useState({});
    const [glMappingDetails,setGlMappingDetails] = useState({});
    const [mappedAccountsArrays,setMappedAccountsArrays] = useState([]);
    

    function formatDate(startDate) {
      // Parse the input date
      const sDate = new Date(startDate);
    
      // // Add 1 day to the date
      // sDate.setDate(sDate.getDate() + 1);
    
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
    // const changeToFirstTab = () => 
    // {
    //   setActiveTab(tabsData[0].value);
    //   setDisabledTabs([tabsData[1].value,tabsData[2].value])
    // };
console.log(generalDetails,"generalDetails")

    const createFixedAsset = () => {
      console.log(generalDetails.mainAssetID,"generalDetailAssetID")
      // console.log(generalDetails.depEndDate,"data.assetCategory")
      axios.post(API_SERVER + "/api/fixed_asset_capture_procedure",
      {
        flag : "N",
        assetCategory : generalDetails.assetCategory,
        assetClass : generalDetails.assetClass,
        description : generalDetails.assetDescription,
        depMethod : generalDetails.depMethod,
        depStartDate :  generalDetails.depStartDate ? formatDate(generalDetails.depStartDate) : null,
        mainAssetComponent : generalDetails.mainAssetComponent,
        mainAssetID :  generalDetails.mainAssetID,
       acqCost : generalDetails.acquisitionCost,
       acqDate : generalDetails.acquisitionDate ? formatDate(generalDetails.acquisitionDate) : null, 
        assetType : generalDetails.propertyType,
        depreciableAmount : generalDetails.depreciableAmount.toString(),
        usefulLife : generalDetails.usefulLife,
        usefulLifeUnit : generalDetails.usefulLifeUnit,
        depreciationRate : generalDetails.rate,
        depEndDate : generalDetails.depEndDate ? formatDate(generalDetails.depEndDate) : null,
        perYearDep : generalDetails.perYearDep.toString(),
        perMonthDep : generalDetails.perMonthDep.toString(),
        accumDepCost : generalDetails.totalDep.toString(),
        scanDocID : generalDetails.documentID,
        assetLabel : generalDetails.assetLabel,
        assetStatus : generalDetails.assetStatus,
        branchCode : locationDetails.branch,
        custodianID : locationDetails.custodian,
        physicalLocation : locationDetails.physicalLocation,
        acctLink : glMappingDetails.assetAccount,
        depAccount : glMappingDetails.depAccount,
        depCR : glMappingDetails.accumulatedDepAccount,
        disAcct : glMappingDetails.disposalAccount,
        revSurpAcct : glMappingDetails.revaluationSurplus,
        revLossAcct : glMappingDetails.lossOfRevaluation,

        currency :  generalDetails.currency,
        shortDescrp :  generalDetails.shortDescription,
        salvageValue : generalDetails.salvageValue,
        serialNumber : generalDetails.serialNumber,
        voucherNumber : generalDetails.voucherNumber,
        barCode : generalDetails.barCode,
        department : locationDetails.department,
        unit : locationDetails.unit,
        vendorNumber : locationDetails.vendorNumber,
        maintenanceVendorID : locationDetails.maintenanceVendor,
        nextServiceDate : locationDetails.nextServiceDate ? formatDate(locationDetails.nextServiceDate) : null,
        underMaintenance : locationDetails.underMaintenance,
        warrantyExpiry : locationDetails.warrantyExp ? formatDate(locationDetails.warrantyExp) : null,
        renewWarranty : locationDetails.warrantyRenewal,
        insurance : locationDetails.insurance,
        postedBy : JSON.parse(localStorage.getItem("userInfo")).username,
        insuranceCardNum : locationDetails.insuranceCard,
        creditAccount : glMappingDetails.creditAccount,
        maintenanceAcct : glMappingDetails.maintenanceAcct,
        purchaseOrderNum : generalDetails.poNumber
  
      },{headers})
      .then((response)=>{
        console.log(response,"response")
        console.log("rense")
        let results = response.data;
        if(results.success == "Y"){
          swal({
            icon: "success",
            buttons: "OK",
            title: response.data.message,
            // text: response.data.message
          });
        }else if(results.success == "N"){
          swal({
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
            title: response.data.message,

          });
        }
      })
      .catch((err)=>{
        throw(err)
      })
    }


    const tabsData=[
        { 
          value: 'default', 
          label: 'General',
          component:<General setAssetID={setAssetID} setGeneralDetails={setGeneralDetails} setMappedAccountsArrays={setMappedAccountsArrays}/> 
        },
        { 
          value: 'tab-2',
          label: 'Location And Maintenance',
          component:<LocationAndMaintenance setAssetID={setAssetID} setLocationDetails={setLocationDetails}/>
        },
        { 
          value: 'tab-3', 
          label: 'GL Mapping',
          component:<GlMapping setAssetID={setAssetID} setGlMappingDetails={setGlMappingDetails} mappedAccountsArrays={mappedAccountsArrays}/> 
        },
      ] 

    // const [activeTab, setActiveTab] = useState(tabsData[0].value);
    // const [disabledTabs,setDisabledTabs] = useState([tabsData[1].value,tabsData[2].value]);
    console.log(mappedAccountsArrays,"mappedAccountsArraysmappedAccountsArrays")

  return (
    <div>
        <ActionButtons displayFetch={'none'} displayRefresh={'none'} displayReject={'none'} displayAuthorise={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} onExitClick={() => document.getElementById("closeModalBTN").click()} onOkClick={createFixedAsset}/>
        <br/>
        {/* <div style={{display:"flex"}}>
            <div style={{flex:0.7}}></div>
            <div style={{flex:0.3,paddingRight:"5px"}}>
            <InputField 
                label={"Asset ID"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                disabled
                value={assetID}
            />
            </div>
        </div> */}
        <TabsComponent tabsData={tabsData}/>
    </div>
  )
}

export default FixedAsset;