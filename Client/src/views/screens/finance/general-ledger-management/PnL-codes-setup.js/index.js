import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import { Tabs } from "@mantine/core";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import SetupProfitAndLoss from "./components/DefaultPage";
import ProfitAndLossHeirachicalView from "./components/ProfitAndLoss";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../config/constant";
const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function PnLCodesSetup() {
const [timeToClearData,setTimeToClearData] = useState(false);
const [fullData,setFullData] = useState({});
const [plDate,setPlDate] = useState("");


  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const pLDate = `${day}-${month}-${year}`;

  const getPostingDate = () => {
    axios.get(API_SERVER + '/api/get-effective-date',{headers})
    .then((response) => {
      const results = response.data[0].effective_date;
      console.log(results,"sponse")
  
      const sDate = new Date(results);
      const year = sDate.getFullYear();
      const month = String(sDate.getMonth() + 1).padStart(2, "0");
      const day = String(sDate.getDate()).padStart(2, "0");
      setPlDate(`${year}-${month}-${day}`);
      // return formattedPostingDate;
      // console.log(formattedPostingDate);
    })
    .catch((error)=>{
      console.log(error)
    })
  }
 

  function postPnLCodeSetup(){
console.log(pLDate,"plDate")
    if (fullData.lineCategory === "" || fullData.lineLevel === "" || fullData.lineDescription === "" || fullData.reportClass === ""){
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
       pLDesc : fullData.lineDescription,
       pLDate : pLDate,
       lineLevel : fullData.lineLevel,
       cleartoCode : fullData.parentLine,
       lineCategory : fullData.lineCategory,
       reportClass : fullData.reportClass,
       postedBy : JSON.parse(localStorage.getItem("userInfo")).id,
       branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
       flag : "N",
       flagMessage : "New",
       typeOfSetup : "P"
    },{
      headers
    }).then((response)=>{
      if(response.data.success=="Y"){
        swal({
          icon : "success",
          title : response.data.message,
          text : "",
        })
        .then(()=>{
          setTimeToClearData(true);
      })
      }else{
        swal({
          icon : "error",
          title : response.data.message,
          text : "",
        })
        // setPerformPost(false)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
}


  console.log(JSON.parse(localStorage.getItem("userInfo")).branchCode,"index")

  useEffect(()=>{
    getPostingDate()
  },[])

  const tabsData=[
    { value: 'default', label: 'Setup Profit and Loss',component:<SetupProfitAndLoss setFullObject={setFullData} timeToClearData={timeToClearData}/> },
    { value: 'tab-2', label: 'Profit and Loss - Hierachical View',component:<ProfitAndLossHeirachicalView/>}, 
  ]


  return (
    <div>
      <div
        style={{
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
     
        <div
          style={{
            marginTop: "0px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          <ActionButtons onOkClick={postPnLCodeSetup} displayNew={'none'} displayReject={'none'} displayAuthorise={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} onExitClick={() => document.getElementById("closeModalBTN").click()} />
        </div>
        <hr className="mb-1 p-0" />
        <div>
          <TabsComponent tabsData={tabsData} />
        </div>
      </div>
    </div>
  );
}

export default PnLCodesSetup;
