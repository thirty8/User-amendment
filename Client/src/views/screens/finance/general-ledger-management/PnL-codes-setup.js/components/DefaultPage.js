import React, {useState,useEffect} from "react";
import axios from "axios";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import RadioButtons from '../../../../../../components/others/Fields/RadioButtons';
import Header from "../../../../../../components/others/Header/Header";
import { API_SERVER } from "../../../../../../config/constant";
import swal from "sweetalert";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";

function SetupProfitAndLoss({details,setFullObject,timeToClearData}) {
  // const [branchLOV,setBranchLOV]= useState([])
  const [branch,setBranch]= useState("")
  const [branchLOV,setBranchLOV]= useState([])
  const [parentLine,setParentLine]= useState("")
  const [parentLineLOV,setParentLineLOV]= useState([])
  const [plCode,setPLCode]= useState("")
  const [lineCategory,setLineCategory]= useState("")
  const [lineLevel,setLineLevel]= useState("")
  const [ordering,setOrdering]= useState("")
  const [plDesc,setPLDesc]= useState("")
  const [reportClass,setReportClass]= useState("")
  const [enablePLcode,setEnablePLcode] = useState(false);

  
  const headers={
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    'Content-Type':'application/json'
  };

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const pLDate = `${day}-${month}-${year}`;

   useEffect(() => {
    if (details){
      setBranch(details.branch_code)
      setParentLine(details.parent_line)
      setPLCode(details.pl_code)
      setLineCategory(details.line_category)
      setLineLevel(details.line_level)
      setOrdering(details.ordering)
      setPLDesc(details.line_description)
      setReportClass(details.report_class)
      
      setEnablePLcode(true)
      // setCurrencyLOV(details.currency)
      // setAccountRestriction(details.account_restriction)
      // document.getElementById("chartGroup").value = details.chart_code
      // document.getElementById("clearToCode").value = details.clear_to_code
    }
  }, [details]);

  useEffect(()=>{
    const getProfitAndLossPL = () => {
      let curr = [];
      axios.get(API_SERVER + '/api/get-profit-and-loss-parent-line',
      {headers})
      .then((response) => {
        const results = response.data;
        results.map((i)=>{curr.push({label: i.code + "   -   " + i.description , value: i.code})})
        setParentLineLOV(curr) 
        })
        .catch((error)=>{
        console.log(error)
      })
    }
    getProfitAndLossPL();

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
  },[])


  useEffect(()=>{
    if (!details){
    console.log("testingMic")
    setFullObject(
      {parentLine:parentLine,
      lineCategory:lineCategory,
      lineLevel:lineLevel,
      lineOrder:ordering,
      lineDescription:plDesc,
      reportClass:reportClass,
      branch:JSON.parse(localStorage.getItem("userInfo")).branchCode
    })
  }
  },[parentLine,lineCategory,lineLevel,ordering,plDesc,reportClass])

useEffect(()=>{
  if (timeToClearData){
    setParentLine("");
    setLineCategory("");
    setLineLevel("");
    setPLDesc("");
    setReportClass("");
  }
  },[timeToClearData])



  // const getBranch = () => {
  //   let curr = [];
  //   axios.post(API_SERVER + '/api/get-code-details',
  //   {code: 'BRA'
  //   },
  //   {headers})
  //   .then((response) => {
  //     const results = response.data;
  //     results.map((i)=>{curr.push({label: i.label, value: i.value})})
  //     setBranchLOV(curr) 
  //     })
  //     .catch((error)=>{
  //     console.log(error)
  //   })
  // }
  // getBranch();

  // console.log(fullObject,"fullObject")
  console.log(plCode,"fulljet")

  function postPnlCodeAmendment(){
    if (parentLine === "" || lineCategory === "" || lineLevel === "" || plDesc === "" || reportClass === ""){
      {
        swal({
          title: "Empty Fields",
          text: "Please Fill all form Data",
          icon: "warning",
          buttons: "OK",
        });
    }
    }
    else{
    axios.post(API_SERVER + "/api/get_post_prc_PNLCode_Setup",{
       pLDesc :plDesc,
       lineLevel : lineLevel,
       cleartoCode : parentLine,
       ordering : ordering,
       lineCategory : lineCategory,
       reportClass : reportClass,
       amendedBy : JSON.parse(localStorage.getItem("userInfo")).id,
       branch: branch,
       flag : "A",  
       typeOfSetup : "P",
       pLCode: plCode,
       pLDate: pLDate
    },{
      headers
    }).then((response)=>{
      console.log(response,"myHeart")
      if(response.data.success=="Y"){
        swal({
          icon : "success",
          title : response.data.message,
          text : "",
        })
        // setPerformPost(false)
      }else{
        swal({
          icon : "error",
          title : response.data.message,
          text : "",
        })
        // setPerformPost(false)
      }
    })
  }
}


  return (
    <div>
      
      {enablePLcode ?<div style={{margin:"0px 0px 15px 0px"}}> <ActionButtons onOkClick={postPnlCodeAmendment} displayFetch={'none'} displayRefresh={'none'} displayNew={'none'} displayReject={'none'} displayAuthorise={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} onExitClick={() => document.getElementById("closeModalBTN").click()} />  </div> : null}

    <div className=" w-[85%] mx-auto">
      <div className='mb-1'>
          {/* {" "} */}
   <Header 
   headerShade={true}
   title={"Code Setup"}
   />  
        </div>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
          marginBottom: "25px",
        }}
      >
        <div style={{ padding: "25px 0px 10px 0px" }}>
          <div style={{display:'flex',flex:1, marginBottom: "25px",gap:"15px"}}>
          {/* branch   */}
          <div style={{ flex: 0.5}}>
            {details ? 
           <ListOfValue
           label={"Branch"}
           labelWidth={"21%"}
           inputWidth={"70%"}
           required={true}
           data={branchLOV}
           onChange={(e)=>{setBranch(e)}}
           value={branch}
         />
         :
         <InputField
         label={"Branch"}
         labelWidth={"21%"}
         inputWidth={"70%"}
         required={true}
         // data={parentLine}
         disabled
         onChange={(e)=>{setBranch(e.target.value)}}
         value={JSON.parse(localStorage.getItem("userInfo")).branchCode + "  -  " + JSON.parse(localStorage.getItem("userInfo")).branch}
       />
          }
            </div>
          <div style={{ flex: 0.5}}>
              {/*   Parent Line   */}
          <ListOfValue
              label={"Parent Line"}
              labelWidth={"21%"}
              inputWidth={"70%"}
              required={true}
              data={parentLineLOV}
              onChange={(e)=>{
                setParentLine(e);
                setTimeout(() => {
                  const input =
                    document.getElementById("Income");
                  input.focus();
                }, 0);
              }}
              value={parentLine}
            />
          </div>
          </div>
          <div style={{ display: "flex", flex: 1, marginBottom: "25px",gap:"15px"}}>
            {/* line code   */}
            <div style={{ flex: 0.5 }}>
            <div>
                <RadioButtons display={true}
                display2={true}
                display3={false}
                label={"Line Category"}
                name={"lineCategory"}
                 labelWidth={'21%'}
                 radioLabel={'Income'}   
                 id={'Income'}
                 value={"I"}
                 checked={lineCategory === "I"}
                 radioLabel2={"Expense"} 
                   id2={"Expense"}
                   checked2={lineCategory === "E"}
                   value2={"E"}
                   radioButtonsWidth={'48%'}
                   onChange={(e)=>{
                    setLineCategory(e.target.value)
                   }}
                   required
                />
              </div>
            </div>
            <div style={{flex:0.5}}>
            <RadioButtons display={true}
                display2={true}
                display3={true}
                label={"Line Level"}
                name={"lineLevel"}
                 labelWidth={'21%'}
                 radioLabel={'Head Level'}   
                 id={'Head'}
                 value={"H"}
                 checked={lineLevel === "H"}
                 radioLabel2={"Total Level"} 
                   id2={"Total"}
                   value2={"T"}
                   checked2={lineLevel === "T"}
                 radioLabel3={"Detail Level"}
                   id3={"Detail"}
                   value3={"D"}
                   checked3={lineLevel === "D"}
                   radioButtonsWidth={'72%'}
                   onChange={(e)=>{
                    setLineLevel(e.target.value)
                   }}
                   required
                />
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, marginBottom: "25px",gap:"15px"}}>
            {/* bs chart group   */}
            <div style={{ flex: 0.5 }}>
            <TextAreaField
                label={"Line Description"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
                onChange={(e)=>{
                  setPLDesc(e.target.value)
                }}
                value={plDesc}
              />
          </div>
            <div style={{ flex: 0.5 }}>
            <RadioButtons display={true}
                display2={true}
                display3={true}
                label={"Report Class"}
                name={"reportClass"}
                 labelWidth={'21%'}
                 radioLabel={'Total'}   
                 id={'Total'}
                 value={"T"}
                 checked={reportClass==="T"}
                 radioLabel2={"Detail"} 
                   id2={"Detail"}
                   value2={"D"}
                   checked2={reportClass==="D"}
                 radioLabel3={"Breakdown"}
                   id3={"Breakdown"}
                   value3={"B"}
                   checked3={reportClass==="B"}
                   radioButtonsWidth={'72%'}
                   onChange={(e)=>{
                    setReportClass(e.target.value)
                   }}
                   required
                />
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, marginBottom: "20px",gap:"15px"}}>
            {/* Line Order   */}
            <div style={{ flex: 0.5 }}>
           {enablePLcode ? 
             <InputField
                label={"PL Code"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
                onChange={(e)=>{
                  setPLCode(e.target.value)
                }}
                value={plCode}
                disabled
              />
           :
           null
           }
            </div>
        </div>       
        </div>
      </div>

    </div>
  </div>
  );
}

export default SetupProfitAndLoss;
