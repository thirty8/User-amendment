import React, {useEffect,useState} from 'react';
import axios from "axios";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../components/others/Header/Header";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
import CustomTable from "../../../../../components/others/customtable";

import { API_SERVER } from "../../../../../config/constant";

const headers = {
    "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

    
function AddBranchSpecificAccounts() {
    const [accountCodeLOV,setAccountCodeLOV] = useState([]);
    const [accountCode,setAccountCode] = useState("");
    const [customerNumber,setCustomerNumber] = useState("");
    const [chartCode,setChartCode] = useState("");
    const [clearToCode,setClearToCode] = useState("");
    const [typeOfAccount,setTypeOfAccount] = useState("");
    const [currencyLOV,setCurrencyLOV] = useState([]);
    const [currency,setCurrency] = useState("");
    const [levelIdentifier,setLevelIdentifier] = useState("");
    const [memoCode,setMemoCode] = useState("");
    const [subReference,setSubReference] = useState("");
    const [legalForm,setLegalForm] = useState("");
    const [reportingLineCodeLOV,setReportingLineCodeLOV] = useState([]);
    const [reportingLineCode,setReportingLineCode] = useState("");
    const [accountClassLOV,setAccountClassLOV] = useState([]);
    const [accountClass,setAccountClass] = useState("");
    const [reportingLineType,setReportingLineType] = useState("");    
    const [data,setData] = useState({});
    const [datatableData,setDatatableData] = useState([]);

     const switchFocus = (e, nextFieldId) => {
        if (e.key === "Enter") {
          document.getElementById(nextFieldId)?.focus();
          console.log(document.getElementById(nextFieldId), "component");
        }
      };

const handleExitClick = () => {
  if (document.getElementById("exitBTN1")) {
    const exitBTN = document.getElementById("exitBTN1");
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    exitBTN.dispatchEvent(clickEvent);
  }
};

useEffect(()=>{
    const getAccountCode = () => {
        let arr = [];
        axios.get(API_SERVER + '/api/get-account-code',
        {headers})
        .then((response) => {
          const results = response.data;
          results.map((i)=>{arr.push({label: i.account_code + "   -   " + i.account_descrp, value: i.account_code})})
          setAccountCodeLOV(arr) 
              console.log(arr, "djd");
          })
          .catch((error)=>{
          console.log(error)
        })
      }
      getAccountCode();

      const getCurrency = () => {
        let curr = [];
      axios
        .get(API_SERVER + "/api/get-finance-currency", { headers })
        .then((response) => {
          const results = response.data;
          results.map((i)=>{curr.push({label: i.actual_code + "   -   " + i.description, value: i.actual_code})})
        //   console.log(curr, "djd");
          setCurrencyLOV(curr);
        //   console.log(stateLOV, "mmm");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCurrency();

    const getReportingLineCode = () => {
        let curr = [];
      axios
        .get(API_SERVER + "/api/get-reporting-line-code", { headers })
        .then((response) => {
          const results = response.data;
          results.map((i)=>{curr.push({label: i.label, value: i.value})})
        //   console.log(curr, "djd");
          setReportingLineCodeLOV(curr);
        //   console.log(stateLOV, "mmm");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getReportingLineCode();

    const getAccountClass = () => {
        let curr = [];
      axios
        .get(API_SERVER + "/api/get-reporting-line-code", { headers })
        .then((response) => {
          const results = response.data;
          results.map((i)=>{curr.push({label: i.label, value: i.value})})
        //   console.log(curr, "djd");
          setAccountClassLOV(curr);
        //   console.log(stateLOV, "mmm");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAccountClass();
},[])

useEffect(()=>{
        let array = [];
        console.log(accountCode,"accountCode")
        axios.post(API_SERVER + '/api/get-branch-account-details',
        {
            accountCode : accountCode
        },
        {headers})
        .then((response) => {
            console.log(response,"res")
          const results = response.data[0];
          console.log(results,"res.send")
          setData({
            customerNumber: results?.cust_no,
            chartCode: results?.chart_code,
            clearToCode: results.clear_to_code ?  results.clear_to_code : " ", 
            typeOfAccount: results?.ac_ctr,
            currency: results?.currency,
            levelIdentifier: results?.level_id,
            subReference: results?.sub_ref,
            legalForm: results?.cust_no,
            })
        //   results.map((i)=>{array.push({i})})
        //   setAccountCodeLOV(array) 
        // console.log(array,"herrer")
          })
          .catch((error)=>{
          console.log(error)
        })
},[accountCode])

console.log(accountCodeLOV,"make we spy")

  return (
    <div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            color: "white", //////////
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            height: "25px",
            fontSize: "1.1em",
            paddingLeft: "10px",
            alignItems: "center",
          }}
          className="mb-1"
        >
          {" "}
          Charts Of Accounts : Account Creation
        </div>                                                  

        {/* buttons    */}
        <div
          style={{
            marginTop: "-30px",
            textAlign: "center",
            // marginBottom: "5px",
          }}
        >
          <ActionButtons displayFetch={'none'} displayRefresh={'none'}displayDelete={'none'} displayAuthorise={"none"} displayCancel={"none"} displayView={"none"} displayReject={"none"} onExitClick={handleExitClick}/>
        </div>
    </div>
    <div style={{ padding: "10px 0px" }}>
         <div style={{boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",paddingBottom:'5px',borderRadius:"3px",backgroundColor:"#ffffff"}}>
        <Header title={"BRANCH ACCOUNT SETUP"} headerShade={true}/>
        <br/>
        <div style={{display:"flex",gap:"7px",paddingBottom:"5px"}}>
        <div style={{flex:0.05}}></div>
      <div style={{flex:0.9}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"80px",rowGap:"15px",padding:"0px 15px 0px 15px"}}>
              <ListOfValue
                        label={"Account Code"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        data={accountCodeLOV}
                        onChange={(e)=>{setAccountCode(e); setTimeout(() => {
                            const input =
                              document.getElementById("customerNumber");
                            input.focus();
                          }, 0);}}
                         
                        value={accountCode}
                        // id={"chartGroup"}
                        />
                  <InputField
                        label={"Customer Number"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                         onChange={(e)=>{setCustomerNumber(e.target.value)}}
                        id={"customerNumber"}
                        onKeyDown={(e) => {
                          switchFocus(e, "chartCode");
                        }}
                        value={data.customerNumber}
                        disabled
                        />
                       <InputField
                        label={"Chart Code"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        onChange={(e)=>{setChartCode(e.target.value)}}
                        onKeyDown={(e) => {
                            switchFocus(e, "clearToCode");
                          }}
                        value={data.chartCode}
                        id={"chartCode"}
                        disabled
                    />
                  <InputField
                        label={"Clear to Code"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        onChange={(e)=>{setClearToCode(e.target.value)}}
                        value={data.clearToCode}
                        onKeyDown={(e) => {
                            switchFocus(e, "typeOfAccount");
                          }}
                        id={"clearToCode"}
                        disabled
                    />
                   <InputField
                        label={"Type Of Account"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        onChange={(e)=>{setTypeOfAccount(e.target.value)}}
                        value={data.typeOfAccount}
                        id={"typeOfAccount"}
                        disabled
                    />
                 <ListOfValue
                 label={"Currency"}
                 labelWidth={"30%"}
                 inputWidth={"70%"}
                 required={true}
                 data={currencyLOV}
                 id={"currency"}
                 onChange={(e)=>{setCurrency(e);
                   setTimeout(() => {
                     const input =
                       document.getElementById("levelIdentifier");
                     input.focus();
                   }, 0);
                 }}
                 value={currency ? currency : data.currency }
             />
                <InputField
                        label={"Level Identifier"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        onChange={(e)=>{setLevelIdentifier(e.target.value)}}
                        id={"levelIdentifier"}
                        value={data.levelIdentifier}
                        disabled
                    />
                   <InputField
                        label={"Memo Code"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        onChange={(e)=>{setMemoCode(e.target.value)}}
                        value={memoCode}
                        id={"clearToCode"}
                        disabled
                    />
                  <InputField
                        label={"Sub Reference"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        onChange={(e)=>{setSubReference(e)}}
                        value={data.subReference}
                        id={"subReference"}
                        disabled
                    />
                <InputField
                        label={"Legal Form"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        onChange={(e)=>{setLegalForm(e)}}
                        value={legalForm}
                        id={"legalForm"}
                        disabled
                    />
           <ListOfValue
                 label={"Reporting Line Code"}
                 labelWidth={"30%"}
                 inputWidth={"70%"}
                 required={true}
                 data={reportingLineCodeLOV}
                 id={"reportingLineCode"}
                 onChange={(e)=>{setReportingLineCode(e);
                   setTimeout(() => {
                     const input =
                       document.getElementById("BSA");
                     input.focus();
                   }, 0);
                 }}
                 value={reportingLineCode}
             />
            <RadioButtons 
            display={true}
                  display2={true}
                //   display3={true}
                  label={"Reporting Line Type"}
                  labelWidth={'30%'}
                  radioLabel={'Balance Sheet Account'}   
                   id={'BSA'}
                   value={"B"}
                   checked={reportingLineType === "B"}
                   radioLabel2={"Profit Or Loss Account"} 
                  id2={"PLA"}
                  checked2={reportingLineType === "P"}
                  value2={"P"}
                  radioButtonsWidth={"70%"}
                  onChange={(e)=>{
                    setReportingLineType(e.target.value)
                     }}
                     required
                  />
             <ListOfValue
                 label={"Account Class"}
                 labelWidth={"30%"}
                 inputWidth={"70%"}
                 required={true}
                 data={accountClassLOV}
                 id={"currency"}
                 onChange={(e)=>{setAccountClass(e);
                   setTimeout(() => {
                     const input =
                       document.getElementById("postingRestriction");
                     input.focus();
                   }, 0);
                 }}
                 value={accountClass}
             />
         </div>
    </div>
    <div style={{flex:0.05}}></div>
    </div>
   </div>
   <br/>
    <CustomTable headers={["Account Code","Account Description","Chart Code","Clear To Code","Customer No.","Currency Code","Currency Descripton","Memo Code","Sub Ref.","Account Class"]} data={[[datatableData]]}/>
    </div>
    </div>
  );
}

export default AddBranchSpecificAccounts;