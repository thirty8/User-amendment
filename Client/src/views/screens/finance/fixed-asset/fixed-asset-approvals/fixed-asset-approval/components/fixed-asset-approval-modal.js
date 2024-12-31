import React,{useState,useEffect} from 'react';
import axios from "axios";
import InputField from '../../../../../../../components/others/Fields/InputField';
import ActionButtons from '../../../../../../../components/others/action-buttons/ActionButtons';
import TabsComponent from '../../../../../../../components/others/tab-component/tab-component';
import GeneralApproval from './general-approval';
import LocationAndMaintenanceApproval from './location-and-maintenance-approval';
import GlMappingApproval from './gl-mapping-approval';
import { API_SERVER } from "../../../../../../../config/constant";
import swal from "sweetalert";

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function FixedAssetApprovalModal({assetID,closeGLamendment}) {
  const [allData,setAlldata] = useState({});
  
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

    const getFixedAssetApprovalData = () => {
    
      let array = [];
      axios
        .post(API_SERVER + "/api/get-fixed-asset-data",
        {
          assetID:assetID
    }, { headers })
        .then((response) => {
            console.log(response,"response")
          const results = response.data;
             results.map((i)=>{setAlldata({assetCategory:i.asset_cat,assetClass:i.asset_class,assetClassDescription:i.asset_class_description,currencyCode:i.currency_code,currency:i.currency,assetDescription:i.description,shortDescription:i.short_description,mainAssetComponent:i.main_asset_component,assetLabel:i.asset_label,componentOfMainAssetID:i.main_asset_id,assetStatus:i.asset_status,depMethod:i.dep_method,propertyType:i.asset_type,acquisitionCost:i.acq_cost,salvageValue:i.salvage_value,document:i.document_id,acquisitionDate:i.acq_date,depreciableAmount:i.depreciable_amount,serialNumber:i.serial_no,voucherNumber:i.voucher_number,barCode:i.bar_code,poNumber:i.po_number,usefulLife:i.useful_life,usefulLifeUnit:i.useful_life_unit,depreciationRate:i.depreciation_rate,depStartDate:i.dep_start_date,depEndDate:i.dep_end_date,pyDep:i.py_dep,myDep:i.my_dep,totalDep:i.accum_dep_cost,branch:i.branch,department:i.department,unit:i.unit,custodian:i.custodian,physicalLocation:i.p_location,vendor:i.vendor_number,maintenanceVendor:i.maintenance_vendor_id,nextServiceDaate:i.next_service_date,warranty:i.warranty,underMaintenance:i.under_maintenance,renewalOfWarranty:i.renew_warranty,insured:i.insured,insuranceCardNumber:i.insurance_card_no,assetAccount:i.asset_acct,creditAccount:i.cr_acct,depAccount:i.dep_acct,accumulatedDepAccount:i.dep_cr_acct,maintenanceAccount:i.maintenance_acct,disposalAccount:i.dis_acct,revaluationSurplus:i.rev_surp_acct,lossOfRevaluation:i.rev_loss_acct,workInProgressAccount:i.work_in_prog_acct})})
                })
        .catch((error) => {
          console.log(error);
        });
      }

      const approveFixedAssetData = () => {
        // console.log(locationDetails.insurance,"insurance")
        console.log(allData,"allData")
        axios.post(API_SERVER + "/api/fixed_asset_capture_procedure",
        {
        flag : "Y",
        assetCategory : allData.assetCategory,
        assetClass : allData.assetClass,
        description : allData.assetDescription,
        depMethod : allData.depMethod,
        depStartDate : allData.depStartDate ? formatDate(allData.depStartDate) : null,
        mainAssetComponent : allData.mainAssetComponent,
        mainAssetID :  allData.mainAssetID,
       acqCost : allData.acquisitionCost,
       acqDate : allData.acquisitionDate ? formatDate(allData.acquisitionDate) : null, 
        assetType : allData.propertyType,
        depreciableAmount : allData.depreciableAmount,
        usefulLife : allData.usefulLife,
        usefulLifeUnit : allData.usefulLifeUnit,
        depreciationRate : allData.rate,
        depEndDate : allData.depEndDate ? formatDate(allData.depEndDate) : null,
        perYearDep : allData.perYearDep,
        perMonthDep : allData.perMonthDep,
        accumDepCost : allData.totalDep,
        scanDocID : allData.documentID,
        assetLabel : allData.assetLabel,
        assetStatus : allData.assetStatus,
        branchCode : allData.branch,
        custodianID : allData.custodian,
        physicalLocation : allData.physicalLocation,
        assetAccount : allData.assetAccount,
        depAccount : allData.depAccount,
        depCR : allData.accumulatedDepAccount,
        disAcct : allData.disposalAccount,
        revSurpAcct : allData.revaluationSurplus,
        revLossAcct : allData.lossOfRevaluation,
        assetID : assetID,

        currency :  allData.currencyCode,
        shortDescrp :  allData.shortDescription,
        salvageValue : allData.salvageValue,
        serialNumber : allData.serialNumber,
        voucherNumber : allData.voucherNumber,
        barCode : allData.barCode,
        department : allData.department,
        unit : allData.unit,
        vendorNumber : allData.vendorNumber,
        maintenanceVendorID : allData.maintenanceVendor,
        nextServiceDate : allData.nextServiceDate ? formatDate(allData.nextServiceDate) : null,
        underMaintenance : allData.underMaintenance,
        warrantyExpiry : allData.warrantyExp ? formatDate(allData.warrantyExp) : null,
        renewWarranty : allData.warrantyRenewal,
        insurance : allData.insurance,
        postedBy : JSON.parse(localStorage.getItem("userInfo")).id,
        insuranceCardNum : allData.insuranceCard,
        creditAccount : allData.creditAccount,
        maintenanceAcct : allData.maintenanceAcct,
  
        },{headers})
        .then((response)=>{
          console.log(response,"response")
          let results = response.data;
          if(results.success == "Y"){
            swal({
              icon: "success",
              buttons: "OK",
              title: response.data.message
            }).then(()=>{
              closeGLamendment();
            })
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

      const rejectFixedAssetData = () => {
        // console.log(locationDetails.insurance,"insurance")
        console.log(allData,"allData")
        axios.post(API_SERVER + "/api/fixed_asset_capture_procedure",
        {
        flag : "R",
        assetCategory : allData.assetCategory,
        assetClass : allData.assetClass,
        description : allData.assetDescription,
        depMethod : allData.depMethod,
        depStartDate : allData.depStartDate ? formatDate(allData.depStartDate) : null,
        mainAssetComponent : allData.mainAssetComponent,
        mainAssetID :  allData.mainAssetID,
       acqCost : allData.acquisitionCost,
       acqDate : allData.acquisitionDate ? formatDate(allData.acquisitionDate) : null, 
        assetType : allData.propertyType,
        depreciableAmount : allData.depreciableAmount,
        usefulLife : allData.usefulLife,
        usefulLifeUnit : allData.usefulLifeUnit,
        depreciationRate : allData.rate,
        depEndDate : allData.depEndDate ? formatDate(allData.depEndDate) : null,
        perYearDep : allData.perYearDep,
        perMonthDep : allData.perMonthDep,
        accumDepCost : allData.totalDep,
        scanDocID : allData.documentID,
        assetLabel : allData.assetLabel,
        assetStatus : allData.assetStatus,
        branchCode : allData.branch,
        custodianID : allData.custodian,
        physicalLocation : allData.physicalLocation,
        assetAccount : allData.assetAccount,
        depAccount : allData.depAccount,
        depCR : allData.accumulatedDepAccount,
        disAcct : allData.disposalAccount,
        revSurpAcct : allData.revaluationSurplus,
        revLossAcct : allData.lossOfRevaluation,
        assetID : assetID,

        // currency :  allData.currencyCode,
        currency :  "001",
        shortDescrp :  allData.shortDescription,
        salvageValue : allData.salvageValue,
        serialNumber : allData.serialNumber,
        voucherNumber : allData.voucherNumber,
        barCode : allData.barCode,
        department : allData.department,
        unit : allData.unit,
        vendorNumber : allData.vendorNumber,
        maintenanceVendorID : allData.maintenanceVendor,
        nextServiceDate : allData.nextServiceDate ? formatDate(allData.nextServiceDate) : null,
        underMaintenance : allData.underMaintenance,
        warrantyExpiry : allData.warrantyExp ? formatDate(allData.warrantyExp) : null,
        renewWarranty : allData.warrantyRenewal,
        insurance : allData.insurance,
        postedBy : JSON.parse(localStorage.getItem("userInfo")).username,
        insuranceCardNum : allData.insuranceCard,
        creditAccount : allData.creditAccount,
        maintenanceAcct : allData.maintenanceAcct,
  
        },{headers})
        .then((response)=>{
          console.log(response,"response")
          let results = response.data;
          if(results.success == "Y"){
            swal({
              icon: "success",
              buttons: "OK",
              title: response.data.message,
              text: response.data.message
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
          component:<GeneralApproval allData={allData}/> 
        },
        { 
          value: 'tab-2',
          label: 'Location And Maintenance',
          component:<LocationAndMaintenanceApproval allData={allData}/>
        },
        { 
          value: 'tab-3', 
          label: 'GL Mapping',
          component:<GlMappingApproval allData={allData}/> 
        },
      ] 

    useEffect(()=>{
      getFixedAssetApprovalData();
    },[])

  return (
    <div style={{zoom:0.9}}>
        <ActionButtons displayFetch={'none'} displayRefresh={'none'} displayNew={'none'} displayOk={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} onAuthoriseClick={approveFixedAssetData} onRejectClick={rejectFixedAssetData} onExitClick={() => document.getElementById("closeModalBTN").click()}/>
        <br/>
        <div style={{display:"flex"}}>
            <div style={{flex:0.7}}></div>
            <div style={{flex:0.3,paddingRight:"15px"}}>
            <InputField 
                label={"Asset ID"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                disabled
                value={assetID}
            />
            </div>
        </div>
        <TabsComponent tabsData={tabsData}/>
    </div>
  )
}

export default FixedAssetApprovalModal;