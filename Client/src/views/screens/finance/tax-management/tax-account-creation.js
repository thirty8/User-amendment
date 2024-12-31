import React, {useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";
import InputField from '../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../components/others/Fields/ListOfValue';
import RadioButtons from '../../../../components/others/Fields/RadioButtons';
// import Header from '../components/others/Header/Header';
import ActionButtons from '../../../../components/others/action-buttons/ActionButtons';
import { API_SERVER } from "../../../../config/constant";
import Header from '../../../../components/others/Header/Header';

const headers = {
    "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

function TaxAccountCreation() {

    const [chartGroup,setChartGroup] = useState("");
    const [clearToCode,setClearToCode] = useState("");
    const [accountDescription,setAccountDescription] = useState("");
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
    const [status,setStatus] = useState("");
    const [statusLOV,setStatusLOV] = useState([]);
    const [accountClass,setAccountClass] = useState("");
    const [accountClassLOV,setAccountClassLOV] = useState([]);
    const [reportingLineCode,setReportingLineCode] = useState("");
    const [reportingLineCodeLOV,setReportingLineCodeLOV] = useState([]);
    const [autoReconcile,setAutoReconcile] = useState("");
    const [reconcileType,setReconcileType] = useState("");
    const [postingDate,setPostingDate] = useState("");
    const [glAccountAmmendment,setGlAccountAmmendment] = useState(false);
    const [glAccountApproval,setGlAccountApproval] = useState(false);
  
    let chartGroupData = []
    chartGroupData = [{label:"20000" + "    -    " + "LIABILITY",value:"20000"},{label:"30000" + "    -    " + "INCOME",value:"30000"}]

  const clearData = () =>{
    setAccountDescription("")
    setLevel("")
    setCurrency("")
    setPostingRestriction("")
    setAccountRestriction("")
    setViewRestriction("")
    setBranch("")
    setStatus("")
    setAccountClass("")
    setReportingLineCode("")
    setAutoReconcile("")
    setReconcileType("")
  }

    useEffect(() => {
       
        const getChartGroups = () => {
            let curr = [];
          axios
            .get(API_SERVER + "/api/get-chart-group", { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.actual_code + "  -  " + i.description, value: i.actual_code})})
              console.log(curr, "djd");
              setQWERTY(curr);
            //   console.log(stateLOV, "mmm");
            })
            .catch((error) => {
              console.log(error);
            });
        };
        getChartGroups();

       
        const getLevelID = () => {
            let curr = [];
          axios
            .get(API_SERVER + "/api/get-level-ID", { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.level_id + "   -   " + i.level_description, value: i.level_id})})
              console.log(curr, "djd");
              setLevelID(curr);
            //   console.log(stateLOV, "mmm");
            })
            .catch((error) => {
              console.log(error);
            });
        };
        getLevelID();

        const getCurrency = () => {
            let curr = [];
          axios
            .get(API_SERVER + "/api/get-finance-currency", { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.actual_code + "   -   " + i.description, value: i.actual_code})})
              console.log(curr, "djd");
              setCurrencyLOV(curr);
            //   console.log(stateLOV, "mmm");
            })
            .catch((error) => {
              console.log(error);
            });
        };
        getCurrency();

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


          const getReportingLineCode = () => {
            let curr = [];
            axios.post(API_SERVER + '/api/get-reporting-line-code',
            {balanceSheetType: "OBSA"},
            {headers})
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.label, value: i.value})})
              setReportingLineCodeLOV(curr) 
              })
              .catch((error)=>{
              console.log(error)
            })
          }
          getReportingLineCode();

          const getPostingDate = () => {
            axios.get(API_SERVER + '/api/get-effective-date',{headers})
            .then((response) => {
              const results = response.data[0].effective_date;
              console.log(results,"sponse")
          
              const sDate = new Date(results);
              const year = sDate.getFullYear();
              const month = String(sDate.getMonth() + 1).padStart(2, "0");
              const day = String(sDate.getDate()).padStart(2, "0");
              setPostingDate(`${year}-${month}-${day}`);
              // return formattedPostingDate;
              // console.log(formattedPostingDate);
            })
            .catch((error)=>{
              console.log(error)
            })
          }

          getPostingDate();


      }, []);

      useEffect(() => {
        let curr = [];
        // setChartGroup(CT)
          axios
            .post(API_SERVER + "/api/get-clear-to-code",
            {chartCode : chartGroup}, { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.account_code + "  -  " + i.account_descrp, value: i.account_code})})
              console.log(curr, "djd");
              setQWET(curr);
            //   setClearToCode(curr[0].value);
              // console.log(stateLOV, "mmm");
            })
            .catch((error) => {
              console.log(error);
            });

            const getAccountClass = () => {
              let curr = [];
              axios.post(API_SERVER + '/api/get-account-class',
              {chartGroup: chartGroup},
              {headers})
              .then((response) => {
                const results = response.data;
                results.map((i)=>{curr.push({label: i.actual_code + "   -   " + i.description, value: i.actual_code})})
                setAccountClassLOV(curr) 
                })
                .catch((error)=>{
                console.log(error)
              })
            }
            getAccountClass();
    
      }, [chartGroup]);
    
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

        // console.log(TO,"TO")
      
        const switchFocus = (e, nextFieldId) => {
          if (e.key === "Enter") {
            document.getElementById(nextFieldId)?.focus();
            console.log(document.getElementById(nextFieldId), "component");
          }
        };
    
        // useEffect(() => {
        //   if (details){
        //     setChartGroup(details.chart_code)
        //     setClearToCode(details.clear_to_code)
        //     setAccountDescription(details.account_descrp)
        //     setLevel(details.level_id)
        //     setCurrency(details.currency_code)
        //     setPostingRestriction(details.posting_restriction)
        //     setAccountRestriction(details.account_restriction)
        //     setViewRestriction(details.viewRestriction)
        //     setBranchLOV(details.branch_code)
        //     setStatus(details.status)
        //     setAccountClass(details.accountClass)
        //     setReportingLineCode(details.reportingLineCode)
        //     setAutoReconcile(details.auto_recon)
        //     setBranch(details.branch)
        //     setGlAccountAmmendment(true)
        //     // setCurrencyLOV(details.currency)
        //     // setAccountRestriction(details.account_restriction)
        //     // document.getElementById("chartGroup").value = details.chart_code
        //     // document.getElementById("clearToCode").value = details.clear_to_code
        //   }
        // }, [details]);

        console.log(branch, "accountRestriction")
        // console.log(details,"details")
        

    const createTaxAccount = () =>{
      console.log(accountDescription,currency,postingRestriction,accountRestriction,viewRestriction,branch,status,accountClass,reportingLineCode,autoReconcile,reconcileType,"otoolege")
    if (accountDescription === " " || currency === "" || postingRestriction === "" || accountRestriction === "" || viewRestriction === "" || branch === "" || status === "" || accountClass === "")
    {
      swal({
        title: "ERR - 00103",
        text: "Fill All Mandatory Fields",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      });
      // setPerformPost(false)
    }
    else{
      axios.post(API_SERVER + "/api/create-gl-account" ,
      { chartGroup : chartGroup,
        clearToCode : clearToCode,
        accountDescription : accountDescription.toUpperCase(),
        level : level,
        currency : currency,
        state : postingRestriction,
        accountRestriction : accountRestriction,
        viewRestriction : viewRestriction,
        branch : branch,
        status : status,
        accountClass : accountClass,
        bspl : "BS",
        bpCode : level !== "T" ? reportingLineCode : "",
        postedBy : JSON.parse(localStorage.getItem("userInfo")).username,
        postingDate : formatDate(postingDate),
        flag : "N" ,
        flagMessage : "New",
        chkprim : "0",
        accountCode : ""
      },
      {headers})
      .then((response)=>{
        if (response.data.success == "Y") {
          swal({
            icon: "success",
            title: response.data.message,
            text: "",
          });
          // setPerformPost(false);
          clearData();
      
        } else {
          swal({
            icon: "error",
            title: response.data.message,
            text: "",
          });
          // setPerformPost(false);
        }
      })
      .catch((error)=>{
        console.log(error,"hillbilly")
      })
// alert("waguannn")
      // setPerformPost(false)
    }
  }



  return (
    <div style={{ padding: "0px 15px" }}>
                <ActionButtons displayReject={'none'} displayAuthorise={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} displayFetch={'none'} displayRefresh={'none'} onExitClick={() => document.getElementById("closeModalBTN").click()} onOkClick={createTaxAccount}/> 
                <br/>
                <hr/>
        <div style={{display:"flex",gap:"7px",paddingBottom:"15px",marginTop:"10px"}}>
        <div style={{flex:0.05}}></div>
      <div style={{flex:0.9}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"20px",padding:"10px 15px 0px 15px"}}>
              <ListOfValue
                        label={"Tax Group"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        data={chartGroupData}
                        onChange={(e)=>{setChartGroup(e)}}
                        id={"chartGroup"}
                        value={chartGroup}
                        />
                  <ListOfValue
                        label={"Clear to Code"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        data={qwet}
                        required={true}
                        onChange={(e)=>{setClearToCode(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("accountDescription");
                            input.focus();
                          }, 0);
                        }}
                        // value={TO ? TO : clearToCode}
                        id={"clearToCode"}
                    />
                  <InputField
                        label={"Account Description"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                         onChange={(e)=>{setAccountDescription(e.target.value)}}
                        id={"accountDescription"}
                        onKeyDown={(e) => {
                          switchFocus(e, "currency");
                        }}
                        value={accountDescription}
                        />
                  <ListOfValue
                        label={"Level"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        data={levelID}
                        onChange={(e)=>{setLevel(e)}}
                        id={"level"}
                        value={level}
                        
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
                              document.getElementById("postingRestriction");
                            input.focus();
                          }, 0);
                        }}
                        value={currency}
                    />
                   <RadioButtons display={true}
                  display2={true}
                  display3={false}
                  label={"Posting Restriction"}
                  labelWidth={'29%'}
                  // name={"postingRestriction"}
                  radioLabel={'Activate'}   
                   id={'postingRestriction'}
                   value={"A"}
                   checked={postingRestriction === "A"}
                   radioLabel2={"Deactivate"} 
                  id2={"Deactivate"}
                  checked2={postingRestriction === "N"}
                  value2={"N"}
                  radioButtonsWidth={"45%"}
                  onChange={(e)=>{
                      setPostingRestriction(e.target.value)
                     }}
                     required
                  />
                 {/* <RadioButtons label={""} labelWidth={""}  radioLabel={""} radioLabel2={""} display={true} display2={true} display3={false} required  id={"postingRestriction"}/> */}
                 <ListOfValue
                        label={"Account Restriction"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        data={[{ value: "G", label: "GLOBAL" },
                        { value:"H", label: "HEAD OFFICE"},
                        { value: "B", label: "BRANCH"}]}
                        onChange={(e) => {setAccountRestriction(e);
                          if(e === "G" || e === "H"){
                            setBranch("000");
                          }
                          setTimeout(() => {
                            const input =
                              document.getElementById("viewRestriction");
                            input.focus();
                          }, 0);
                        }}
                        value={accountRestriction}
                        id={"accountRestriction"}
                        />
                 <RadioButtons label={"View Restriction"} labelWidth={"29%"} radioButtonsWidth={"45%"} radioLabel={"Allow"}  value={"A"} checked={viewRestriction === "A"} radioLabel2={"Block"} value2={"B"} checked2={viewRestriction === "B"} display={true} display2={true} display3={false} required id={"viewRestriction"} onChange={(e)=>{setViewRestriction(e.target.value)}}/>
                 {accountRestriction === "G" || accountRestriction === "H" ? 
                 <InputField
                 label={"Branch"}
                 labelWidth={"30%"}
                 inputWidth={"70%"}
                 required={true}
                 onChange={(e)=>{setBranch(e.target.value)}}
                 value={"000  -  HEAD OFFICE"}
                 disabled
                 /> 
                :
                 <ListOfValue
                        label={"Branch"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        data={branchLOV}
                        id={"branch"}
                        onChange={(e)=>{setBranch(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("status");
                            input.focus();
                          }, 0);
                        }}
                        value={branch}
                        />
                      }
                 <ListOfValue
                        label={"Status"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        data={statusLOV}
                        id={"status"}
                        onChange={(e)=>{setStatus(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("accountClass");
                            input.focus();
                          }, 0);
                        }}
                        value={status}
                    />
                 <ListOfValue
                        label={"Account Class"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        data={accountClassLOV}
                        id={"accountClass"}
                        onChange={(e)=>{setAccountClass(e);
                          setTimeout(() => {
                            const input =
                              document.getElementById("reportingLineCode");
                            input.focus();
                          }, 0);
                        }}
                        value={accountClass}
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
                              document.getElementById("autoReconcile");
                            input.focus();
                          }, 0);
                        }}
                        value={reportingLineCode}
                    />
               
          </div>
          <div style={{margin:"15px 0px 0px 0px"}}>
          <Header greenShade={true} title={"Auto Reconciliation"}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"50px",rowGap:"20px",padding:"10px 15px 0px 15px"}}>
          <ListOfValue
                          label={"Auto Reconcile"}
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          textAlign={"right"}
                          paddingRight={"5px"}
                          data={[{value:"N", label:"NOT APPLICABLE"},
                          { value: "A", label: "AUTOMATIC"},
                          { value: "M", label: "MANUAL"}]}
                          onChange={(e)=>{setAutoReconcile(e);
                            setTimeout(() => {
                              const input =
                                document.getElementById("ReconcileType");
                              input.focus();
                            }, 0);
                          }}
                          id={"autoReconcile"}
                          // required
                          value={autoReconcile}
                        />
           <RadioButtons label={"Recon. Type"} labelWidth={"29%"} radioButtonsWidth={"45%"} radioLabel={"Credit"} checked={reconcileType === "C"} value={"C"} radioLabel2={"Debit"} value2={"D"} checked2={reconcileType === "D"} display={true} display2={true} display3={false} id={"ReconcileType"} onChange={(e)=>{setReconcileType(e.target.value)}}/>
          </div>
          </div>
          <div style={{flex:0.05}}></div>
          </div>
    </div>
  )
}

export default TaxAccountCreation;