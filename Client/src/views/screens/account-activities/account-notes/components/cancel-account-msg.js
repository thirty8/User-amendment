import ActionButtons from '../../../../../components/others/action-buttons/ActionButtons';
import CustomTable from '../../../teller-ops/components/CustomTable';
import InputField from '../../../../../components/others/Fields/InputField';
import React, { useState, useEffect } from "react";
import ScreenBase3 from '../../m/SreenBase3';
import ButtonType from '../../../../../components/others/Button/ButtonType';
import axios from "axios";
import { API_SERVER } from '../../../../../config/constant';
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';
import { Modal } from '@mantine/core';
import { FiChevronRight } from "react-icons/fi";
import Swal from 'sweetalert2';

function CancelAccountMsg() {
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
};

const [isChecked, setIsChecked] = useState(false);
const [isChecked2, setIsChecked2] = useState(false);
const [cancelNotesTable, setcancelNotesTable] = useState([]);
const [accountnumber, setaccountnumber] = useState("");
const [messageData, setMessageData] = useState("");




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
        "http://localhost:3320/api/accn-notes-cancelok",
        {
            AC_NO_v: '004001087245200008',
            SRL_NO_v:' 221133',
         
            CANCEL_BY_V: 'UNIONADMIN',
          
            CANCEL_TERMINAL_V:'USGAD',
         
            BRANCH_v: '000',
            Formcode_v: ' ABBI',




          
          
          
        },
        {
          headers,
        }
      )
      .then(function (response) {
        console.log(response.data,JSON.parse(localStorage.getItem("userInfo"))?.postingDate, "here");
        setMessageData(response.data);
        

        if (response.data?.outBinds.api_status == 'Y') {

 Swal.fire({
            title: "Success",
            text: response.data?.outBinds.msg_v,
            icon: "success",
            buttons: "OK",
            dangerMode: false,


          });

   


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
  console.log(messageData);



  const Accountnotestable = () => {
    console.log(accountnumber,"accountNumber")
    
    axios.post(
        API_SERVER + "/api/cancel-account-notes",{
          AccountNumber: accountnumber,
          branchCode: "001"
         

        },
        { headers }
      )
      .then((response)=>{
        console.log(response, "here");
        setcancelNotesTable(response.data);
      }).catch ((error)=> {
      console.log(error);
    })
  }

useEffect(() => {

  Accountnotestable();
}, []);


console.log( cancelNotesTable , "le table noir")




const [selectedRow , setSelectedRow] = useState(null)
console.log(accountnumber, "laccount")
var NotesCancelTable = [];
NotesCancelTable =cancelNotesTable?.map((i)=>{
  return[
  
    <div>{i.AC_NO}</div>,
    <div style={{ textAlign: "left" }}>{i.ACCT_DESC}</div>,
    <div style={{ textAlign: "left" }}>{i.HD_CODE_DESC}</div>,

    <div>{i.MSG_CODE_DESC}</div>,
    <div style={{ textAlign: "left" }}>{i.NOTE}</div>,
    <div style={{ textAlign: "left" }}>{i.STATUS}</div>,

        <div style={{ textAlign: "left" }}>{i.POSTED_BY}</div>,


        <div style={{ display: "flex", justifyContent: "center" }}>
            <div
                // type="checkbox"
                // checked={null}
                onClick={() => {
                  
                    setSelectedRow(i);
                    setIsChecked(true);



                    // }
                }}
             

            >           <ButtonComponent buttonWidth={"40px"} buttonIcon={<FiChevronRight />} />
            </div>
        </div>,
    
    
   
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



console.log({isChecked})
return (

    <div >
      
      <Modal size={"50%"} opened={isChecked} onClose={
()=>{
setIsChecked(false)


}} closeOnClickOutside={true}>
<div >





     {isChecked2 === true ? (
         <ActionButtons
             onAuthoriseClick={() => {

             }}
             displayCancel={"none"}
             displayDelete={"none"}
             displayFetch={"none"}
             displayHelp={"none"}
             displayRefresh={"none"}
             displayReject={"none"}
             displayNew={"none"}
             onExitClick={() => setIsChecked(!isChecked)}


         />
     ) : (

      
         <div>
             <ActionButtons

                 displayCancel={"none"}
                 displayDelete={"none"}
                 displayFetch={"none"}
                 displayHelp={"none"}
                 displayRefresh={"none"}
                 displayReject={"none"}
                 displayNew={"none"}
                 displayAuthorise={"none"}

                 onExitClick={() => setIsChecked(!isChecked)}


             />
         </div>
     )
     }
     

     <hr style={{ marginTop: "20px", marginLeft: "9px", marginRight: "10px" }} />
     <div
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",


            padding: "10px",
            marginBottom: "10px",
        }}
    >
        <div style={{ width: "30%" }}>
            <ButtonType
                type={"checkbox"}

                label={" Check to approve"}
                onChange={() => setIsChecked2(!isChecked2)}

            />



        </div>


    </div>
    <ScreenBase3
        header_title={"Account Messages"}
        card_div1a={
            <div style={{ marginTop: "20px" }}>





                <div style={{ marginBottom: "20px" }}>
                    <InputField

                        label="Account Number: "
                        labelWidth={"20%"}
                        inputWidth={"22%"}
                        required={"true"}
                        disabled={true}
value={selectedRow?.AC_NO}

                    />
                </div>


 {/* <div>{i.AC_NO}</div>,
    <div style={{ textAlign: "left" }}>{i.ACCT_DESC}</div>,
    <div style={{ textAlign: "left" }}>{i.HD_CODE_DESC}</div>,

    <div>{i.MSG_CODE_DESC}</div>,
    <div style={{ textAlign: "left" }}>{i.NOTE}</div>,
    <div style={{ textAlign: "left" }}>{i.STATUS}</div>,

        <div style={{ textAlign: "left" }}>{i.POSTED_BY}</div>, */}


                <div style={{ marginBottom: "20px" }}>


                    <InputField

                        label="Account Name: "
                        labelWidth={"20%"}
                        inputWidth={"50%"}
                        required={"true"}
                        marginBottom={"20px"}
                        disabled={true}
                        value={selectedRow?.ACCT_DESC}
                    />



                </div>


                <div style={{ marginBottom: "20px" }}>
                    <InputField
                        label={"Stop Code"}
                        labelWidth={"20%"}
                        inputWidth={"60%"}
                        required={"true"}
                       
                        value={selectedRow?. HD_CODE_DESC}
                        disabled={true}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <InputField
                        label={"Message Code"}
                        labelWidth={"20%"}
                        inputWidth={"65%"}
                        required={"true"}

                        disabled={true}
                        value={selectedRow?.MSG_CODE_DESC}

                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <InputField
                        label={"Other Comments"}
                        labelWidth={"20%"}
                        value={selectedRow?. NOTE}
                        
                    />
                </div>


             
                </div>



           
        } />
   







</div>
</Modal>

       
            <div>
                <div style={{ marginBottom: "20px" }}>
                    <ActionButtons
                        displayAuthorise={"none"}
                        displayCancel={"none"}
                        displayDelete={"none"}
                        displayFetch={"none"}
                        displayHelp={"none"}
                        displayRefresh={"none"}
                        displayReject={"none"}
                        displayNew={"none"}
                        onExitClick={handleExitClick}
                    />

                </div>
                <hr style={{ marginBottom: "20px" }} />


                <div
                    style={{
                        
                        display: "flex",
                        justifyContent: "center",

                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <div style={{  flex:"0." }}>
                        <InputField
                            label={"Account Number"}
                            inputWidth={"50%"}
                            onChange={(e)=>
                                setaccountnumber(e.target.value)}
                        // value={JSON.parse(localStorage.getItem("userInfo"))?.branch}
                        />
                    </div>

                    <div  style={{  flex:"0.1"}}>
              <ButtonComponent
              label={"fetch"}
              buttonHeight={"27px"}
              buttonWidth={"60px"}
              onClick={Accountnotestable}
              />
            </div>
                </div>

                <hr style={{ marginBottom: "20px", marginTop: "30px" }} />
                <CustomTable

                    headers={["Account Nummber ", "Account Description", "Stop Code Description", "Message Code Description", "Note", "Status","Posted By","Select" ]}
                    data={NotesCancelTable}
                />

     <hr style={{ marginTop: "20px", marginLeft: "9px", marginRight: "10px" }} />
     <div
         style={{
             width: "100%",
             display: "flex",
             justifyContent: "end",


             padding: "10px",
             marginBottom: "10px",
         }}
         
     >
         <div style={{ width: "30%" }}>


            
             <ButtonType
                 type={"checkbox"}

                 label={" Check to approve"}
                 onChange={() => setIsChecked2(true)}

             />



         </div>


     </div>
    







            </div>
        
        
    </div>

)
}

export default CancelAccountMsg


