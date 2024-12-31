import React, {useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";
import InputField from '../components/others/Fields/InputField';
import ListOfValue from '../components/others/Fields/ListOfValue';
import RadioButtons from '../components/others/Fields/RadioButtons';
// import Header from '../components/others/Header/Header';
import ActionButtons from '../../../../components/others/action-buttons/ActionButtons';
import { API_SERVER } from "../../../../config/constant";
import Header from '../../../../components/others/Header/Header';
import ButtonComponent from '../../../../components/others/Button/ButtonComponent';
import pieChart from "../../../../assets/images/pieChart.png"

const headers = {
    "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

function TaxSetup() {
    const [grossIncome,setGrossIncome] = useState("");
    const [taxRate,setTaxRate] = useState("");
    const [period,setPeriod] = useState("");
    const [peroidState,setPeriodState] = useState(false);
    const [displayBlock,setDisplayBlock] = useState(false);
    const [value,setValue] = useState("");
    

  // const clearData = () =>{
  //   setAccountDescription("")
  //   setLevel("")
  //   setCurrency("")
  //   setPostingRestriction("")
  //   setAccountRestriction("")
  //   setViewRestriction("")
  //   setBranch("")
  //   setStatus("")
  //   setAccountClass("")
  //   setReportingLineCode("")
  //   setAutoReconcile("")
  //   setReconcileType("")
  // }

    // useEffect(() => {
       
    //     const getChartGroups = () => {
    //         let curr = [];
    //       axios
    //         .get(API_SERVER + "/api/get-chart-group", { headers })
    //         .then((response) => {
    //           const results = response.data;
    //           results.map((i)=>{curr.push({label: i.actual_code + "  -  " + i.description, value: i.actual_code})})
    //           console.log(curr, "djd");
    //           setQWERTY(curr);
    //         //   console.log(stateLOV, "mmm");
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     };
    //     getChartGroups();

       
    //     const getLevelID = () => {
    //         let curr = [];
    //       axios
    //         .get(API_SERVER + "/api/get-level-ID", { headers })
    //         .then((response) => {
    //           const results = response.data;
    //           results.map((i)=>{curr.push({label: i.level_id + "   -   " + i.level_description, value: i.level_id})})
    //           console.log(curr, "djd");
    //           setLevelID(curr);
    //         //   console.log(stateLOV, "mmm");
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     };
    //     getLevelID();

    //     const getCurrency = () => {
    //         let curr = [];
    //       axios
    //         .get(API_SERVER + "/api/get-finance-currency", { headers })
    //         .then((response) => {
    //           const results = response.data;
    //           results.map((i)=>{curr.push({label: i.actual_code + "   -   " + i.description, value: i.actual_code})})
    //           console.log(curr, "djd");
    //           setCurrencyLOV(curr);
    //         //   console.log(stateLOV, "mmm");
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     };
    //     getCurrency();

    //     const getBranch = () => {
    //         let curr = [];
    //         axios.post(API_SERVER + '/api/get-code-details',
    //         {code: 'BRA'
    //         },
    //         {headers})
    //         .then((response) => {
    //           const results = response.data;
    //           results.map((i)=>{curr.push({label: i.label, value: i.value})})
    //           setBranchLOV(curr) 
    //           })
    //           .catch((error)=>{
    //           console.log(error)
    //         })
    //       }
    //       getBranch();
          
    //       const getStatus = () => {
    //         let curr = [];
    //         axios.get(API_SERVER + '/api/get-finance-status',
    //         {headers})
    //         .then((response) => {
    //           const results = response.data;
    //           results.map((i)=>{curr.push({label: i.actual_code + "   -   " + i.description, value: i.actual_code})})
    //           setStatusLOV(curr) 
    //           })
    //           .catch((error)=>{
    //           console.log(error)
    //         })
    //       }
    //       getStatus();


    //       const getReportingLineCode = () => {
    //         let curr = [];
    //         axios.post(API_SERVER + '/api/get-reporting-line-code',
    //         {balanceSheetType: "OBSA"},
    //         {headers})
    //         .then((response) => {
    //           const results = response.data;
    //           results.map((i)=>{curr.push({label: i.label, value: i.value})})
    //           setReportingLineCodeLOV(curr) 
    //           })
    //           .catch((error)=>{
    //           console.log(error)
    //         })
    //       }
    //       getReportingLineCode();


    //   }, []);

    //   useEffect(() => {
    //     let curr = [];
    //     // setChartGroup(CT)
    //       axios
    //         .post(API_SERVER + "/api/get-clear-to-code",
    //         {chartCode : "30000"}, { headers })
    //         .then((response) => {
    //           const results = response.data;
    //           results.map((i)=>{curr.push({label: i.account_code + "  -  " + i.account_descrp, value: i.account_code})})
    //           console.log(curr, "djd");
    //           setQWET(curr);
    //         //   setClearToCode(curr[0].value);
    //           // console.log(stateLOV, "mmm");
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });

    //         const getAccountClass = () => {
    //           let curr = [];
    //           axios.post(API_SERVER + '/api/get-account-class',
    //           {chartGroup: "30000"},
    //           {headers})
    //           .then((response) => {
    //             const results = response.data;
    //             results.map((i)=>{curr.push({label: i.actual_code + "   -   " + i.description, value: i.actual_code})})
    //             setAccountClassLOV(curr) 
    //             })
    //             .catch((error)=>{
    //             console.log(error)
    //           })
    //         }
    //         getAccountClass();
    
    //   }, [chartGroup]);
    
    //   function formatDate(startDate) {
    //     // Parse the input date
    //     const sDate = new Date(startDate);
      
    //     // // Add 1 day to the date
    //     // sDate.setDate(sDate.getDate() + 1);
      
    //     // Create an array of month abbreviations
    //     const monthAbbreviations = [
    //       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    //     ];
      
    //     // Format the date in "dd-MMM-yyyy" format with lowercase month abbreviation
    //     const day = String(sDate.getDate()).padStart(2, '0');
    //     const month = monthAbbreviations[sDate.getMonth()].toLowerCase();
    //     const year = sDate.getFullYear();
      
    //     const formattedDate = `${day}-${month}-${year}`;
      
    //     return formattedDate;
    //   }

        // console.log(TO,"TO")
      
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

        // console.log(branch, "accountRestriction")
        // console.log(details,"details")
      
        const switchFocus = (e, nextFieldId) => {
          if (e.key === "Enter") {
            document.getElementById(nextFieldId)?.focus();
            console.log(document.getElementById(nextFieldId), "component");
          }
        };


        const openPeriodField = (e) =>
        {
          if ( e.key === "Enter") 
            {
            setPeriodState(true);
            
            }
        }

        const onCalculateClick = () =>{
          setValue("5,103.00");
          setDisplayBlock(true);

        }

        const style = displayBlock 
    ? {display:"flex",gap:"7px",paddingBottom:"15px",height: "90vh"} 
    : {display:"flex",gap:"7px",paddingBottom:"15px"};

      

  return (
    <div  style={{padding: "0px 15px", zoom: 1.05 }}>
                {/* <ActionButtons displayReject={'none'} displayAuthorise={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} displayFetch={'none'} displayRefresh={'none'} onExitClick={() => document.getElementById("closeModalBTN").click()} onOkClick={createTaxAccount}/>  */}
                <br/> 
        <div style={style}>
        <div style={{flex:0.02}}></div>
      <div style={{flex:0.96,boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
          <div style={{display:"grid",gridAutoFlow:"column",columnGap:"30px",padding:"40px 15px 0px 50px",marginBottom:"50px",justifyContent:"start",alignItems:"center"}}>
                  <InputField
                        label={"Gross Income"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        onChange={(e)=>{setGrossIncome(e.target.value);}}
                        value={grossIncome}
                        onKeyDown={(e)=>{openPeriodField(e);switchFocus(e,"period")}}
                        type={"number"}
                        id={"grossIncome"}
                    />
                    {peroidState ? 
                     <ListOfValue
                     label={"Period"}
                     labelWidth={"30%"}
                     inputWidth={"70%"}
                     data={["Monthly","Annually"]}
                     required={true}
                     onChange={(e)=>{setPeriod(e);
                     }}
                     value={period}
                     id={"period"}
                 /> : null  
                  }
                  
                 {/* <InputField
                        label={"Tax Rate"}
                        labelWidth={"30%"}
                        inputWidth={"15%"}
                        onChange={(e)=>{setTaxRate(e.target.value);
                          setTimeout(() => {
                            const input =
                              document.getElementById("postingRestriction");
                            input.focus();
                          }, 0);
                        }}
                        textAlign={"center"}
                        value={taxRate ? taxRate : "30 %"}
                        disabled
                    /> */}
                                <ButtonComponent
                        label={"Calculate"}
                        buttonColor={"white"}
                        buttonWidth={"100px"}
                        buttonHeight={"27px"}
                        onClick={onCalculateClick}
                        buttonBackgroundColor={"#2E5090"}
                      />
            </div>
            {/* <div style={{display:"grid",gridTemplateColumns:"1fr",rowGap:"15px",placeItems:"center",marginTop:"50px",marginBottom:"10px"}}>
            <ButtonComponent
                        label={"Get Current Tax"}
                        buttonColor={"white"}
                        buttonWidth={"130px"}
                        buttonHeight={"27px"}
                        // onClick={handleInput}
                        buttonBackgroundColor={"green"}
                      />
            </div> */}
            <div style={{padding:"0px 50px"}}>
            <hr/>
            </div>
           
           {displayBlock ? 
            <div style={{display:"flex",marginTop:"40px",marginBottom:"10px"}}>
              <div style={{flex:0.35}}></div>
              <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flex:0.3}}>
                <div style={{fontWeight:600,fontSize:"30px",color:"black"}}>Your Current Tax is : </div>
              </div>
              <div style={{flex:0.35}}></div>
             </div> 
              : null
            } 
            {displayBlock ?
            <div style={{display:"flex",marginTop:"15px",marginBottom:"50px"}}>
              <div style={{flex:0.43}}></div>
              <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flex:0.14}}>
                <div style={{borderRadius:"10px",fontWeight:"bold",color:"#0F52BA",textAlign:"center",fontSize:"20px",backgroundColor:"#eaf4fc",boxShadow:"rgba(17, 17, 26, 0.1) 0px 1px 0px",padding:"5px 10px 5px 15px"}} disabled>{value}</div>
                <div style={{fontWeight:"bolder",fontSize:"18px",textAlign:"right",color:"#0F52BA"}}> K E S</div>
              </div>
              <div style={{flex:0.43}}></div>
            </div>
              : null
            }
            {displayBlock ? 
            <div style={{display:"flex",alignItems:"center"}}>
              <div style={{flex:0.7}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",justifyItems:"center"}}>
              <div style={{fontWeight:"bold",borderBottom:"3px solid red",marginBottom:"7px"}}>Taxable Amount</div>
              <div style={{fontWeight:"bold",borderBottom:"3px solid red",marginBottom:"7px"}}>Tax Rate</div> 
              <div style={{fontWeight:"bold",borderBottom:"3px solid red",marginBottom:"7px"}}>Amount Payable</div>
              <div style={{fontStyle:"oblique"}}>2,400</div>
              <div style={{fontStyle:"oblique"}}>10 %</div> 
              <div style={{fontStyle:"oblique"}}>240</div>
              <div style={{fontStyle:"oblique"}}>8,333</div>
              <div style={{fontStyle:"oblique"}}>25 %</div> 
              <div style={{fontStyle:"oblique"}}>2,083</div>
              <div style={{fontStyle:"oblique"}}>9,267</div>
              <div style={{fontStyle:"oblique"}}>30 %</div> 
              <div style={{fontStyle:"oblique"}}>2,780</div>
              
            </div>
              </div>
              <div style={{flex:0.3}}>
                <img src={pieChart} alt='PieChart'/>
              </div>
            </div>
          : null}
          </div>
          <div style={{flex:0.02}}></div>
          </div>
    </div>
  )
}

export default TaxSetup;