import React, { useEffect, useState } from 'react'
import ScreenBase3 from '../m/SreenBase3'
import InputField from '../../../../components/others/Fields/InputField'
import ListOfValue from '../../../../components/others/Fields/ListOfValue'
import { Textarea } from '@mantine/core'
import axios from "axios";
import { API_SERVER } from "../../../../config/constant"
import ActionButtons from '../../../../components/others/action-buttons/ActionButtons'
import TextAreaField from '../../teller-ops/components/TextArea'
import Swal from 'sweetalert2'
import swal from 'sweetalert'











function switchFocus(e, nextFieldId) {
  if (e.key === "Enter") {
    document.getElementById(nextFieldId).focus();
    console.log(document.getElementById(nextFieldId), "component");
  }
}


function NewAccountMessage() {
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [stopcode, setStopCode] = useState([]);
  const [messageCode, setMessageCode] = useState([]);
  const [messageData,setMessageData] = useState([]);
  const [accountnumber,setAccountNumber] = useState("");
  const [accountname,setAccountName] = useState("");

  const [stopType, setStopType]= useState("");
  const [messageType, setMessageType]= useState("");
  const [date, setDate]= useState("");
  const [comment, setComment]= useState("");




console.log()
console.log (accountnumber)
console.log (stopType)
console.log (messageType)
console.log (comment)
console.log (date)

  useEffect(() => {
    async function getStopCode(){
      let response= await axios.post(  API_SERVER +"/api/get-code-details", {
              code: "AMS",
            }, 
            {
              headers,
            })
            setStopCode(response.data)
            console.log(response.data)
          }
          getStopCode()   

          async function getMessageCode(){
            let response= await axios.post(  API_SERVER +"/api/get-code-details", {
                    code: "AMC",
                  }, 
                  {
                    headers,
                  })
                  setMessageCode(response.data)
                  console.log(response.data)
                }
                getMessageCode()
     
              }, []);
              
              
              
              //function to exit
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
                ;}

                async function clsedAccount(e) {
                  try {
                    e.persist();
              
                    if (e.key == "Enter") {
                      
                      axios
                        .post(
                           API_SERVER +"/api/get-cheque-book-maintenance-account-num",
                          {
                            account_number: e.target.value,
                          },
                          { headers }
                        )
                        .then((response) => {
                          let data = response.data[0];
                          console.log(response.data,e.target.value, "here i am");
                        // setAccountName(response.data[0]?.acct_desc
                        //   )

                        console.log(response.data[0]?.acct_desc )
                        setAccountName(response.data[0]?.acct_desc )
             
                          if (data === undefined) {
                            swal({
                              title: "Invalid Account Number",
                              text: "The account number could not be found in our records..",
                              icon: "warning",
                              buttons: "OK",
                              dangerMode: true,
                            });
                          }
                     
                        });
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
                function formatDate(inputDateStr) {
                  var inputDate = new Date(inputDateStr);
                  var months = [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                  ];
                  return (
                    inputDate.getDate() +
                    "-" +
                    months[inputDate.getMonth()] +
                    "-" +
                    inputDate.getFullYear()
                  );
                }



async function Accnnotes() {
    console.log(accountnumber, "biggggg");
try{
    if (
      // acct_link
      accountnumber === undefined) {
        Swal.fire({
              title: "Invalid Account Number",
              text: "The account number could not be found in our records..",
              icon: "warning",
              buttons: "OK",
              dangerMode: true,
            })
          } else {


    const response = await axios
      .post(
        "http://localhost:3320/api/accn-notes",
        {
          acct_v: accountnumber,
          stop_type: stopType,
         
          NOTE_v: comment,
          
          bra_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
         
          message_codev: messageType,
        
          edate:  formatDate(date),
          
          TERMINAL_v: 'USGAD',
          // Narration,
          postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
          // GlobalBra,
          formcode: "SDNA",
          // Terminal,
          req_no_v: 'USGAD',
          // Username,
          ip_v:localStorage.getItem("ipAddress")
          //  date,
          
        },
        {
          headers,
        }
      )
      .then(function (response) {
        console.log(response.data,JSON.parse(localStorage.getItem("userInfo"))?.postingDate, "here");
        setMessageData(response.data);
        

        if (response.data?.outBinds.msg_code == 0) {

 Swal.fire({
            title: "Success",
            text: response.data?.outBinds.msg_v,
            icon: "success",
            buttons: "OK",
            dangerMode: false,


          });

          setAccountNumber("");
          setAccountName("")
          setStopType("")
          setMessageType("")
          setComment("")
          setDate("")


} else {
  Swal.fire({
            title: "  Fail",
            text: response.
            data?.outBinds.msg_v,
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          });
        }
      });
    }
  }catch(error){
    console.error(" An error occured :", error);


    Swal.fire({
      title: "Error",
      text: "An error occurred while processing the request.",
      icon: "error",
      buttons: "OK",
      dangerMode: true,
    })
    console.error(" An error occured :", error);
  }
  }
  console.log (accountnumber)
// console.log (stopType)
console.log (messageType)
console.log (comment)
console.log (date)
  
    
  
  // console.log(accountDetails, "account deets")


  return (
    <div >
      <div style={{  marginBottom: "20px" }}>
    <ActionButtons
       displayAuthorise={"none"}
       displayCancel={"none"}
       displayDelete={"none"}
       displayFetch={"none"}
       displayHelp={"none"}
       displayRefresh={"none"}
       displayReject={"none"}
       displayView={"none"}
       onExitClick={handleExitClick}
       onOkClick={Accnnotes}
       onNewClick={()=>{
        setAccountNumber("")
        setAccountName("")
        setStopType("")
        setMessageType("")
        setComment("")
        setDate("")
       }
       }
    
    
    />
    </div>
    
   <ScreenBase3 
   header_title={"Account Messages"}
   card_div1a={
    <div  style={{  marginTop: "20px" }}>

              <div style={{  marginBottom: "20px" }}>
                <InputField
                  
                  label="Account Number: "
                  labelWidth={"20%"}
                  inputWidth={"22%"}
                  required={"true"}
                  id={accountnumber}
                  value={accountnumber}
                  // onKeyPress={(e) => {
                  //   switchFocus(e, "accountname");
                  // }}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                    
                  
                  }}
                  onKeyDown={clsedAccount}
                />
              </div>

            
              

            
            <div style={{  marginBottom: "20px" }}>


 <InputField
                  
                  label="Account Name: "
                  labelWidth={"20%"}
                  inputWidth={"50%"}
                  required={"true"}
                  marginBottom={"20px"}
                  value={accountname}
                  id={accountname}
                  onKeyPress={(e) => {
                    switchFocus(e, "stopType");
                  }}
                  disabled={true}
                  
                />



            </div>

            
            <div style={{ marginBottom: "20px" }}>
            <ListOfValue
            label={"Stop Code"}
            labelWidth={"20%"}
                  inputWidth={"60%"}
                  required={"true"}
                  data={stopcode}
                  value={stopType}
                  id={stopcode}
                  onKeyPress={(e) => {
                    switchFocus(e, "messageType");
                  }}

                  onChange={(value) => {
                    setStopType(value);
                    
                  }}
            />
            </div>

<div style={{ marginBottom: "20px" }}>
            <ListOfValue
            label={"Message Code"}
            labelWidth={"20%"}
                  inputWidth={"65%"}
                  required={"true"}
                  data={messageCode}
                  value={messageType}
                  id={messageType}
                  onKeyPress={(e) => {
                    switchFocus(e, "comment");
                  }}

                  onChange={(value) => {
                    setMessageType(value);
                  }}
            
            />
            </div>
<div style={{marginBottom:"20px"}}>
            <TextAreaField
            label={"Other Comments"}
            labelWidth={"20%"}
            inputWidth={"25%"}
            value={comment}
            id={comment}
            onKeyPress={(e) => {
              switchFocus(e, "date");
            }}
            onChange={(e) => {
              setComment(e.target.value)
              
            }}
            />
            </div>

            <div style={{ marginBottom: "20px" }}>

<InputField
                  
                  label="Expiry Date: "
                  labelWidth={"20%"}
                  inputWidth={"25%"}
                  type={"date"}
                  value={date}
                  id={date}
                  
  

                  required={"true"}
                  onChange={(e) => {
                    setDate(e.target.value);
                   console.log(e.target.value)
                  }}
                />
                </div>

            

    </div>
    
     }/> 
     </div>
   
  )
}

export default NewAccountMessage