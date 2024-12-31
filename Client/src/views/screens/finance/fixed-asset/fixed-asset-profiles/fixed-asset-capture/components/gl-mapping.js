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

function GlMapping({setGlMappingDetails,mappedAccountsArrays,clearAll}) {
    const [assetAccountLOV,setAssetAccountLOV] = useState([]);
    const [assetAccount,setAssetAccount] = useState("");
    const [creditAccountLOV,setCreditAccountLOV] = useState([]);
    const [creditAccount,setCreditAccount] = useState("");
    const [depAccountLOV,setDepAccountLOV] = useState([]);
    const [depAccount,setDepAccount] = useState("");
    const [accumulatedDepAccountLOV,setAccumulatedDepAccountLOV] = useState([]);
    const [accumulatedDepAccount,setAccumulatedDepAccount] = useState("");
    const [maintenanceAccountLOV,setMaintenanceAccountLOV] = useState([]);
    const [maintenanceAccount,setMaintenanceAccount] = useState("");
    const [disposalAccountLOV,setDisposalAccountLOV] = useState([]);
    const [disposalAccount,setDisposalAccount] = useState("");
    const [revaluationSurplusLOV,setRevaluationSurplusLOV] = useState([]);
    const [revaluationSurplus,setRevaluationSurplus] = useState("");
    const [lossOfRevaluationLOV,setLossOfRevaluatioLnOV] = useState([]);
    const [lossOfRevaluation,setLossOfRevaluation] = useState("");
    const [workInProgressAccountLOV,setWorkInProgressAccountLOV] = useState([]);
    const [workInProgressAccount,setWorkInProgressAccount] = useState("");

    useEffect(()=>{
        setGlMappingDetails({
            assetAccount : assetAccount,
            creditAccount : creditAccount,
            depAccount : depAccount,
            accumulatedDepAccount : accumulatedDepAccount,
            maintenanceAcct : maintenanceAccount , 
            disposalAccount : disposalAccount,
            revaluationSurplus : revaluationSurplus,
            lossOfRevaluation : lossOfRevaluation
        })
    },[assetAccount,creditAccount,depAccount,accumulatedDepAccount,
      maintenanceAccount,disposalAccount,revaluationSurplus,lossOfRevaluation])

    const getAssetAccounts = () => {
        let array =[]
        axios.get(API_SERVER + "/api/get-asset-accounts",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.acct_link + "   -   " + i.account_descrp + "   -   " + i.currency, value : i.acct_link})})
            setAssetAccountLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 

    const getCreditAccounts = () => {
        let array =[]
        axios.get(API_SERVER + "/api/get-asset-accounts",{ headers })
        .then((response)=>{
            let results = response.data;
            results.map((i) =>{array.push({label :i.acct_link + "   -   " + i.account_descrp, value : i.acct_link})})
            setAssetAccountLOV(array);
        })
        .catch((err)=>{
            throw(err)
        })
    } 


    useEffect(()=>{
        getAssetAccounts();
    },[])

    useEffect(()=>{
      if (mappedAccountsArrays){
        setAssetAccount(mappedAccountsArrays.assetAccount)
        setCreditAccount(mappedAccountsArrays.creditAccount)
        setDepAccount(mappedAccountsArrays.depAccount)
        setAccumulatedDepAccount(mappedAccountsArrays.accumDepAccount)
        setMaintenanceAccount(mappedAccountsArrays.maintenanceAccount)
        setDisposalAccount(mappedAccountsArrays.disposalAccount)
        setRevaluationSurplus(mappedAccountsArrays.revSurplusAccount)
        setLossOfRevaluation(mappedAccountsArrays.revLossAccount)
        setWorkInProgressAccount(mappedAccountsArrays.workInProgAccount)
      }
      else{
        setAssetAccount("")
        setCreditAccount("")
        setDepAccount("")
        setAccumulatedDepAccount("")
        setMaintenanceAccount("")
        setDisposalAccount("")
        setRevaluationSurplus("")
        setLossOfRevaluation("")
        setWorkInProgressAccount("")
      }
  },[mappedAccountsArrays])

  const clearGlMappingFields = () =>{
    setAssetAccount("");
    setCreditAccount("");
    setDepAccount("");
    setAccumulatedDepAccount("");
    setMaintenanceAccount("");
    setDisposalAccount("");
    setRevaluationSurplus("");
    setLossOfRevaluation("");
    setWorkInProgressAccount("");
  }

  useEffect(()=>{
    if (clearAll){
      clearGlMappingFields()
    }},[clearAll])
    

  return (
    <div style={{display:"flex",marginTop:"10px"}}>
        <div style={{flex:0.05}}></div>
        <div style={{flex:0.9}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"15px",columnGap:"20px",margin:"15px 0px 0px 0px"}}>
        <ListOfValue 
                label={"Asset Account"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                data={assetAccountLOV}
                onChange={(e)=>{setAssetAccount(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("creditAccount");
                        input.focus();
                      }, 0);
                }}
                required
                value={assetAccount}
            />
     <ListOfValue 
                label={"Credit Account"}
                labelWidth={"35%"}
                inputWidth={"65%"}
                id={"creditAccount"}
                data={assetAccountLOV}
                onChange={(e)=>{setCreditAccount(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("depAccount");
                        input.focus();
                      }, 0);
                }}
                value={creditAccount}
            />
     <ListOfValue 
                label={"Dep. Account"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                id={"depAccount"}
                data={assetAccountLOV}
                onChange={(e)=>{setDepAccount(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("accumDepAccount");
                        input.focus();
                      }, 0);
                }}
                required
                value={depAccount}
            />
     <ListOfValue 
                label={"Accumulated Dep. Account"}
                labelWidth={"35%"}
                inputWidth={"65%"}
                id={"accumDepAccount"}
                data={assetAccountLOV}
                onChange={(e)=>{setAccumulatedDepAccount(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("maintenanceAccount");
                        input.focus();
                      }, 0);
                }}
                required
                value={accumulatedDepAccount}
            />
     <ListOfValue 
                label={"Maintenance Account"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                id={"maintenanceAccount"}
                data={assetAccountLOV}
                onChange={(e)=>{setMaintenanceAccount(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("disposalAccount");
                        input.focus();
                      }, 0);
                }}
                required
                value={maintenanceAccount}
            />
     <ListOfValue 
                label={"Disposal Account"}
                labelWidth={"35%"}
                inputWidth={"65%"}
                id={"disposalAccount"}
                data={assetAccountLOV}
                onChange={(e)=>{setDisposalAccount(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("revaluationSurplus");
                        input.focus();
                      }, 0);
                }}
                required
                value={disposalAccount}
            />
     <ListOfValue 
                label={"Revaluation Surplus"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                id={"revaluationSurplus"}
                data={assetAccountLOV}
                onChange={(e)=>{setRevaluationSurplus(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("lossOfRevaluation");
                        input.focus();
                      }, 0);
                }}
                required
                value={revaluationSurplus}
            />
     <ListOfValue 
                label={"Loss Of Revaluation"}
                labelWidth={"35%"}
                inputWidth={"65%"}
                id={"lossOfRevaluation"}
                data={assetAccountLOV}
                onChange={(e)=>{setLossOfRevaluation(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("workInProgress");
                        input.focus();
                      }, 0);
                }}
                required
                value={lossOfRevaluation}
            />
     <ListOfValue 
                label={"Work In Progress Account"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                id={"workInProgress"}
                data={assetAccountLOV}
                onChange={(e)=>{setWorkInProgressAccount(e);
                    setTimeout(() => {
                        const input =
                          document.getElementById("assetDescription");
                        input.focus();
                      }, 0);
                }}
                value={workInProgressAccount}
            />
        </div>
        <br/>
        <div style={{display:'flex',justifyContent:'end'}}>
            <div style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",borderRadius:"4px"}}>
                <ButtonComponent
                label={"Back"}
                buttonWidth={"55px"}
                // onClick={changeToFirstTab}
                 />
            </div>
         </div>
        </div>
        <div style={{flex:0.05}}></div>
    </div>
  )
}

export default GlMapping;