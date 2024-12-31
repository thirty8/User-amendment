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

function LocationAndMaintenanceApproval({allData}) {
    const [branchLOV,setBranchLOV] = useState([]);
    const [branch,setBranch] = useState("");
    const [departmentLOV,setDepartmentLOV] = useState([]);
    const [department,setDepartment] = useState("");
    const [unitLOV,setUnitLOV] = useState([]);
    const [unit,setUnit] = useState("");
    const [custodianLOV,setCaustodianLOV] = useState([]);
    const [custodian,setCustodian] = useState("");
    const [physicalLocationLOV,setPhysicalLocationLOV] = useState([]);
    const [physicalLocation,setPhysicalLocation] = useState("");
    const [vendorLOV,setVendorLOV] = useState([]);
    const [vendor,setVendor] = useState("");
    const [maintenanceVendorLOV,setMaintenanceVendorLOV] = useState([]);
    const [maintenanceVendor,setMaintenanceVendor] = useState("");
    const [insuranceCardLOV,setInsuranceCardLOV] = useState([]);
    const [insuranceCard,setInsuranceCard] = useState("");
    const [nextServiceDate,setNextServiceDate] = useState("");
    const [warrantyExpiry,setWarrantyExpiry] = useState("");


    const getBranchLOV = () => {
        let array =[]
        axios.get(API_SERVER + "/api/gl-branch",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.br_code + "   -   " + i.br_description, value : i.br_code})})
            setBranchLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 

    const getDepartment = () => {
        let array =[]
        axios.get(API_SERVER + "/api/get-department",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.dept_id + "   -   " + i.dept_name, value : i.dept_id})})
            setDepartmentLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 

    const getUnitLOV = () => {
        let array =[]
        axios.get(API_SERVER + "/api/get-unit",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.unit_id + "   -   " + i.unit_name, value : i.unit_id})})
            setUnitLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 

    const getCustodianLOV = () => {
        let array =[]
        axios.get(API_SERVER + "/api/get-custodian",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.id + "    -    " + i.name, value : i.id})})
            setCaustodianLOV(array);
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

    const getVendor = () => {
        let array =[]
        axios.get(API_SERVER + "/api/get-vendor",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.vendor_id + "    -    " + i.vendor_name, value : i.vendor_id})})
            setVendorLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 

    const getMaintenanceVendor = () => {
        let array =[]
        axios.get(API_SERVER + "/api/get-maintenance-vendor",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.vendor_id + "    -    " + i.vendor_name, value : i.vendor_id})})
            setMaintenanceVendorLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 

    const getInsuranceCard = () => {
        let array =[]
        axios.post(API_SERVER + "/api/get-insurance-card",
        {assetClass:"",
        assetCategory:"",
        location:""
    }
        ,{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.card_nbr + "    -    " + i.card_descrp, value : i.card_nbr})})
            setInsuranceCardLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 


    useEffect(()=>{
        getBranchLOV();
        getDepartment();
        getUnitLOV();
        getCustodianLOV();
        getPhysicalLocation();
        getVendor();
        getMaintenanceVendor();
        getInsuranceCard();
    },[])

  return (
    <div style={{display:"flex",marginTop:"10px"}}>
        <div style={{flex:0.1}}></div>
        <div style={{flex:0.8}}>
        <div>
        <div>
        <Header headerShade={true} title={"Asset Location"}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px",margin:"15px 0px 15px 0px",columnGap:"50px"}}>
        <ListOfValue 
                label={"Branch"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                data={branchLOV}
                onChange={(e)=>{setBranch(e)}}
                required
                value={allData.branch}
            />
        <ListOfValue 
                label={"Department"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                data={departmentLOV}
                id={"department"}
                onChange={(e)=>{setDepartment(e)}}
                value={allData.department}
            />
           <ListOfValue 
                label={"Unit"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                id={"unit"}
                data={unitLOV}
                onChange={(e)=>{setUnit(e)}}
                value={allData.unit}
            />
     <ListOfValue 
                label={"Custodian"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                data={custodianLOV}
                onChange={(e)=>{setCustodian(e)}}
                required
                id={"custodian"}
                value={allData.custodian}
            />
           <ListOfValue 
                label={"Physical Location"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                data={physicalLocationLOV}
                onChange={(e)=>{setPhysicalLocation(e);}}
                required
                value={allData.physicalLocation}
                id={"physicalLocation"}
            />
        </div>
      </div>
        </div>
    <div>
        <Header headerShade={true} title={"Maintenance"}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px",margin:"15px 0px 15px 0px",columnGap:"50px"}}>
        <ListOfValue 
                label={"Vendor"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                id={"vendor"}
                data={vendorLOV}
                onChange={(e)=>{setVendor(e)}}
                value={allData.vendor}
                
            />
               <ListOfValue 
                label={"Maintenance Vendor"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                data={maintenanceVendorLOV}
                onChange={(e)=>{setMaintenanceVendor(e);}}
                id={"maintenanceVendor"}
                value={allData.maintenanceVendor}
            />
     <InputField 
                label={"Next Service Date"}
                labelWidth={"29%"}
                inputWidth={"30%"}
                id={"nextServiceDate"}
                onChange={(e)=>{setNextServiceDate(e.target.value);}}
                disabled
                type={"date"}
                value={allData.nextServiceDate}
            />
  <RadioButtons 
                display={true}
                display2={true}
                label={"Under Maintenance"}
                labelWidth={'30%'}
                radioLabel={'Yes'}   
                id={'underMaintenance'}
                value={allData.nextServiceDate}
                // checked={postingRestriction === "A"}
                radioLabel2={"No"} 
                id2={"No"}
                // checked2={postingRestriction === "N"}
                value2={"N"}
                radioButtonsWidth={"45%"}
                // onChange={(e)=>{
                //       setPostingRestriction(e.target.value)
                //      }}
                disabled
                  />
              <InputField 
                label={"Warranty Expiry"}
                labelWidth={"29%"}
                inputWidth={"30%"}
                onChange={(e)=>{setWarrantyExpiry(e.target.value)}}
                disabled
                value={allData.warranty}
                type={"date"}
            />
    <RadioButtons 
                display={true}
                display2={true}
                label={"Renewal Of Warranty"}
                labelWidth={'30%'}
                radioLabel={'Yes'}   
                id={'Yes'}
                value={allData.renewalOfWarranty}
                checked={allData.renewalOfWarranty === "Y"}
                radioLabel2={"No"} 
                id2={"No"}
                checked2={allData.renewalOfWarranty === "N"}
                value2={"No"}
                radioButtonsWidth={"45%"}
                // onChange={(e)=>{
                //       setPostingRestriction(e.target.value)
                //      }}
                disabled
                  />
        <RadioButtons 
                display={true}
                display2={true}
                label={"Insured"}
                labelWidth={'30%'}
                radioLabel={'Yes'}   
                id={'Yes'}
                value={allData.insured}
                checked={allData.insured === "Y"}
                radioLabel2={"No"} 
                id2={"No"}
                checked2={allData.insured === "N"}
                // value2={"Month"}
                radioButtonsWidth={"45%"}
                // onChange={(e)=>{
                //       setPostingRestriction(e.target.value)
                //      }}
                disabled
                  />
               <ListOfValue 
                label={"Insurance Card"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                data={insuranceCardLOV}
                onChange={(e)=>{setInsuranceCard(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("policyNumber");
                        input.focus();
                      }, 0);
                }}
                value={allData.insuranceCardNumber}
            />
              <InputField
        label={"Policy Number"}
        labelWidth={"30%"}
        inputWidth={"70%"}
        id={"policyNumber"}
        value={allData.policyNumber}
        disabled
        // onChange={(e)=>{setPolicyNumber(e.target.value)}}
        />
        </div>
        <br/>
        <div style={{display:'flex'}}>
            <div style={{flex:0.88}}></div>
            <div style={{display:"flex",justifyContent:"space-between",flex:0.12}}>
            <div style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",borderRadius:"4px"}}>
                <ButtonComponent
                label={"Back"}
                buttonWidth={"55px"}
                // onClick={changeToFirstTab}
                 />
            </div>
            <div style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",borderRadius:"4px"}}>
                <ButtonComponent
                label={"Next"}
                buttonWidth={"55px"}
                // onClick={changeToFirstTab}
                 />
            </div>
            </div>
       
         </div>
      </div>
        </div>
        <div style={{flex:0.1}}></div>
      
    </div>
  )
}

export default LocationAndMaintenanceApproval;