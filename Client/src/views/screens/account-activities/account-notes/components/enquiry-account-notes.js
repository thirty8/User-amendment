import ActionButtons from '../../../../../components/others/action-buttons/ActionButtons';
import CustomTable from '../../../teller-ops/components/CustomTable';
import InputField from '../../../../../components/others/Fields/InputField';
import React, { useState,  useEffect } from "react";
import ScreenBase3 from '../../m/SreenBase3';
import ButtonType from '../../../../../components/others/Button/ButtonType';
import axios from "axios";
import { API_SERVER } from '../../../../../config/constant';
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';

//done

function EnquiryAccountNotes() {
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [isChecked, setIsChecked] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [enquiryTable, setEnquiryTable] = useState([]);
  const [accountnumber,setAccountNumber] = useState("");
  const [serialnumber,setSerialNumber] = useState("");
  const [tableCount, setTableCount] = useState("");








  
  // useEffect(() => {
    const clsapproval = (acctNum) => {
      console.log(accountnumber,"accountNumber")
      console.log(serialnumber,"serialNumber")

      axios.post(
          API_SERVER + "/api/getAccountNotesDetails",{
            accountNumber : acctNum,
            serialNumber: serialnumber

          },
          { headers }
        )
        .then((response)=>{
          console.log(response, "here");
          setEnquiryTable(response.data);
          setTableCount(response.data.length ,"number count");
        }).catch ((error)=> {
        console.log(error);
      })
    }
    // clsapproval();
  // }, []);
  console.log(enquiryTable , "table error")
 

  useEffect(() => {

    clsapproval(accountnumber);
  }, []);

  // useEffect(() => {

  //   clsapproval();
  // }, []);
  



  var NotesEnquiryTable = [];
  NotesEnquiryTable =enquiryTable?.map((i)=>{
    return[
    
      <div>{i.srl_no}</div>,
      <div style={{ textAlign: "left" }}>{i.acct_link}</div>,
      <div style={{ textAlign: "left" }}>{i.acct_descrp}</div>,

      <div>{i.actual_msg}</div>,
      <div style={{ textAlign: "left" }}>{i.exp_date}</div>,
      
     
    ] });

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
  }

  const handleRefreshClick = () => {
    setAccountNumber("")
    clsapproval("")
  }


console.log(accountnumber, "this is the accountnumber")
console.log(serialnumber, "this is the serialnumber")

  console.log({ isChecked })

  return (

    <div >



     
        <div>
          <div style={{ marginBottom: "20px" }}>
            <ActionButtons
              displayAuthorise={"none"}
              displayCancel={"none"}
              displayDelete={"none"}
             displayOk={"none"}
              displayHelp={"none"}
            
              displayReject={"none"}
              displayNew={"none"}
              displayView={"none"}
              onExitClick={handleExitClick}
             onFetchClick={()=>clsapproval(accountnumber)}
             onRefreshClick={handleRefreshClick}


              
              

            />
            

          </div>
          <hr style={{ marginBottom: "20px",  }} />


          <div
            style={{
             
              display: "flex",
              // placeContent:"center",
              justifyContent:"center",

              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div style={{ 
             flex:"0.4"
               }}>
              <InputField
                label={"Account Number"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                value={accountnumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value)
                  
                }}

              // value={JSON.parse(localStorage.getItem("userInfo"))?.branch}
              />
            </div>

            <div style={{
                flex:"0.4"
                }}>
              <InputField
                label={"Serial Number Number"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                value={serialnumber}
                onChange={(e) => {
                  setSerialNumber(e.target.value)
                  
                }}
              // value={JSON.parse(localStorage.getItem("userInfo"))?.branch}
              />
            </div>

            {/* <div  style={{ flex:"0.2" }}>
              <ButtonComponent
              label={"fetch"}
              buttonHeight={"26.7px"}
              buttonWidth={"60px"}
              onClick={clsapproval}
              />
            </div> */}



          </div>

          <hr style={{ marginBottom: "20px", marginTop: "30px" }} />



<div style={{marginBottom:"1%"}}>
          <CustomTable

            headers={["Serial Nummber ", "Account Number", "Account Description", "Actual Message","Expiry Date"]}
            data={NotesEnquiryTable}
            rowsPerPage={12}
          />



</div>


        </div>
        <InputField 
label="Count"
inputWidth="5%"
value ={tableCount}
disabled={true}


/>
    
       


     
   


        
          
     </div>

  )
}

export default EnquiryAccountNotes