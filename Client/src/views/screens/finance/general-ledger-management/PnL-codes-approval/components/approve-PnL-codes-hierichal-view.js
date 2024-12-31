import React,{useState,useEffect} from 'react'
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../../../config/constant";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import InputField from "../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import ButtonComponent from '../../../../../../components/others/Button/ButtonComponent';
import ButtonType from '../../../../../../components/others/Button/ButtonType';
import Label from '../../../../../../components/others/Label/Label';
import RadioButtons from '../../../../../../components/others/Fields/RadioButtons';
import CustomTable from '../../../../teller-ops/components/CustomTable';
import Header from '../../../../../../components/others/Header/Header';
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ApprovePnLCodes({details,parentLineDescription,getProfitAndLossPLData,closePnL}) {
  const [parentLine, setParentLine] = useState("");
  const [parentLineDesc, setParentLineDesc] = useState("");
  const [PnLCode, setPnLcode] = useState("");
  const [cleartoCode, setCleartoCode] = useState("");
  const [branch, setBranch] = useState("");
  const [plDesc, setPLDesc] = useState("");
  const [levelIndicator, setLevelIndicator] = useState("");
  const [ordering, setOrdering] = useState("");
  const [lineCategory, setLineCategory] = useState("");
  const [lineLevel, setLineLevel] = useState("");
  const [balanceSheetACType, setBalanceSheetACType] = useState("");
  const [reportClass, setReportClass] = useState("");
  const [rCode, setRCode] = useState("");
  const [reportType, setReportType] = useState("");

  useEffect(() => {
    if (details){
      setBranch(details.branch_code)
      setParentLine(details.parent_line)
      setParentLineDesc(details.parent_line_description)
      setPnLcode(details.pl_code)
      setLineCategory(details.line_category)
      setLineLevel(details.line_level)
      setOrdering(details.ordering)
      setPLDesc(details.line_description)
      setReportClass(details.report_class)
      
      // setCurrencyLOV(details.currency)
      // setAccountRestriction(details.account_restriction)
      // document.getElementById("chartGroup").value = details.chart_code
      // document.getElementById("clearToCode").value = details.clear_to_code
    }
  }, [details]);

  console.log(details,"xxxxxxxxxxx")

  function approvePnLCodeSetup(){
        Swal.fire({
                title: "Are You Sure ?",
                text: "You're about to approve this operation!",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                dangerMode: false
           }).then((result)=>{
            if(result.isConfirmed){
        axios.post(API_SERVER + "/api/get_post_prc_PNLCode_Setup",{
       pLCode: PnLCode,
       pLDesc : plDesc,
       lineLevel : lineLevel,
       cleartoCode : parentLine,
       ordering : ordering,
       lineCategory : lineCategory,
       reportClass : reportClass,
       approvedBy : JSON.parse(localStorage.getItem("userInfo")).id,
    //    branch:fullData.branch,
       flag : "Y",
       typeOfSetup : "P"
    },{
      headers
    }).then((response)=>{
        console.log(response,"nasIsLike")
        if(response.data.success=="Y"){
            swal({
                icon : "success",
                title : response.data.message,
                text : "",
              })
            .then(()=>{
              getProfitAndLossPLData();
              closePnL();
            })
          }else{
            swal({
              icon : "error",
              title : response.data.message,
              text : "",
            })
          }
    })}})}

function rejectPnLCodeSetup(){
    axios.post(API_SERVER + "/api/get_post_prc_PNLCode_Setup",{
       pLCode: PnLCode,
       pLDesc : plDesc,
       lineLevel : lineLevel,
       cleartoCode : parentLine,
       ordering : ordering,
       lineCategory : lineCategory,
       reportClass : reportClass,
       approvedBy : JSON.parse(localStorage.getItem("userInfo")).id,
    //    branch:fullData.branch,
       flag : "R",
       typeOfSetup : "P"
    },{
      headers
    }).then((response)=>{
      console.log(response,"response")
      if(response.data.success=="Y"){
        swal({
          title: "Rejection Of " + PnLCode  ,
          text: "Are You Sure You Want To Perform This Operation?",
            icon: "info",
            buttons: true,
            closeOnClickOutside: false,
          }).then(()=>
        {swal({
            icon : "success",
            title : "Profit And Loss Code " + PnLCode + "  Rejected",
            text : "",
          })
          .then(()=>{
            getProfitAndLossPLData();
            closePnL();
          })
        })
    


      }else{
        swal({
          icon : "error",
          title : response.data.message,
          text : "",
        })
        // setPerformPost(false)
        getProfitAndLossPLData();
      }
     
    })
}

  return (
    <div>
          <div style={{margin:"-40px 0px 15px 0px"}}>
        <ActionButtons onAuthoriseClick={approvePnLCodeSetup} onRejectClick={rejectPnLCodeSetup} displayFetch={'none'} displayRefresh={'none'} displayNew={'none'} displayOk={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} onExitClick={() => document.getElementById("closeModalBTN").click()} />
        </div>
    <div className=" w-[85%] mx-auto">
      {/* <div></div> */}
      {/* =================================================== */}
      {/* main container   */}
      <div className="mb-1">
        {/* {" "} */}
        <Header headerShade={true} title={"Approval Code"} />
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
        <div style={{ padding: "15px 15px" }}>
          <div style={{ display: "flex", flex: 1, marginBottom: "25px",gap:"20px"}}>
            {/* branch   */}
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Branch"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={false}
                value={branch}
                disabled
              />
            </div>
            {/*   Parent Line   */}
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Parent Line"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
                value={parentLine + "  -  " + parentLineDesc}
                disabled
              />
            </div> 
          </div>

          <div style={{ display: "flex", flex: 1, marginBottom: "25px",gap:"20px"}}>
            {/* line code   */}
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Line Level"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
                value={lineLevel}
                disabled
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Line Code"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
                value={PnLCode}
                disabled
              />
            </div>
           
          </div>

          <div style={{ display: "flex", flex: 1, marginBottom: "25px",gap:"20px"}}>
            {/* bs chart group   */}
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Line Order"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
                value={ordering}
                disabled
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Report Class"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
                value={reportClass}
                disabled
              />
            </div>
          </div>

          <div style={{ display: "flex", flex: 1, marginBottom: "15px",gap:"20px"}}>
            {/* Line Order   */}
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Line Description"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
                value={plDesc}
                disabled
              />
            </div>
            {/* space   */}
            {/* <div style={{ flex: 0.2 }}></div> */}
            {/* Bs Account Type  */}
            <div style={{ flex: 0.5 }}>
              <div>
                {/* <RadioButtons display={true}
                display2={true}
                display3={true}
                label={"Report Class"}
                name={"reportClass"}
                 labelWidth={'25%'}
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
                /> */}
              </div>
            </div>
          </div>

          {/* <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
            <div style={{ flex: 0.5 }}>
              <TextAreaField
                inputheight={"25px"}
                label={"Line Description"}
                labelWidth={"21%"}
                inputWidth={"70%"}
                required={true}
              />
            </div>
          </div>            */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ApprovePnLCodes;