import ActionButtons from '../../../../../components/others/action-buttons/ActionButtons';
import CustomTable from '../../../teller-ops/components/CustomTable';
import InputField from '../../../../../components/others/Fields/InputField';
import React, { useState, useEffect } from "react";
import ScreenBase3 from '../../m/SreenBase3';
import ButtonType from '../../../../../components/others/Button/ButtonType';
import ListOfValue from '../../../../../components/others/Fields/ListOfValue';
import axios from "axios";
import { API_SERVER } from '../../../../../config/constant';
import { Modal } from '@mantine/core';
import { FiChevronRight } from "react-icons/fi";
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';
import Swal from 'sweetalert2'

function ApproveAccountMsgG() {

    <div>ApproveAccountMsgG</div>
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
};

const [isChecked, setIsChecked] = useState(false);
const [isChecked2, setIsChecked2] = useState(false);
const [branchCode, setBranchCode] = useState("");
const [branchCodeValue, setBranchCodeValue] = useState("");
const [messageData , setMessageData] = useState([]);
const [getdata , setData] = useState([]);
const [okaydata, setOkdata]= useState([]);






async function clsapproval(value) {
  try {
    let response = await axios.post(
      API_SERVER + "/api/account-notes-global-approval",{
            branchCode : value,
      },
      { headers }
    );

    console.log(response.data, "here");
    setMessageData(response.data);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
    clsapproval("");
  }, []);
  console.log(messageData , "table error")
  console.log(messageData.AC_NO)




var NotesTable = [];
    NotesTable = messageData?.map((i)=>{
        return[
            <div>{i?.AC_NO}</div>,
            <div>{i?.ACCT_DESC}</div>,
            <div style={{ textAlign: "left" }}>{i?. HD_CODE_DESC}</div>,

            <div>{i?.MSG_CODE_DESC }</div>,
            <div style={{ textAlign: "left" }}>{i?.NOTE}</div>,
            <div style={{ textAlign: "left" }}>{i?.POSTED_BY}</div>,

            <div style={{ display: "flex", justifyContent: "center" }}>
  <div
          onClick={() => {
            setData(i)
            setIsChecked(true);
          }}
        >




          <ButtonComponent buttonWidth={"40px"} buttonIcon={<FiChevronRight />} />

        </div>
               
            </div>,
   ] });
  console.log(getdata, "getdatatatattta");
  console.log(getdata.AC_NO, "AC_NO");
  console.log(getdata.POSTING_SYSDATE, "AC_NO");
 

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
useEffect(() => {
    async function getBranchCode(){
      let response= await axios.post(  API_SERVER +"/api/get-code-details", {
              code: "BRA",
            }, 
            {
              headers,
            })
            setBranchCode(response.data)
            console.log(response.data)
          }
          getBranchCode()   
        }, []);


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
          console.log({
            acct_v: getdata.AC_NO,
            stop_type: getdata.HD_CODE,
      
            NOTE_v: getdata.NOTE,
      
            bra_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      
            message_codev: getdata.MSG_CODE_DESC,
      
            edate:formatDate(getdata.EXP_DATE),
      
            TERMINAL_v: getdata.TERMINAL
            ,
          
            postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
           
            formcode: "SDEB",
           
            req_no_v: getdata.SRL_NO,
            
            ip_v: localStorage.getItem("ipAddress")
          
            
      
      
      
          }, "HEIDI");
          try {
            if (
              // acct_link
              getdata.AC_NO === undefined) {
              Swal.fire({
                title: "Invalid Account Number",
                text: "The account number could not be found in our records..",
                icon: "warning",
                buttons: "OK",
                dangerMode: true,
              })
            } else {
      
      
             axios
                .post(
                  "http://localhost:3320/api/accn-notes-approval",
                  {
                    acct_v: getdata.AC_NO,
                    stop_type: getdata.HD_CODE_DESC,
      
                    NOTE_v: getdata.NOTE,
      
                    bra_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      
                    message_codev: getdata.MSG_CODE_DESC,
      
                    edate:formatDate(getdata.EXP_DATE),
      
                    TERMINAL_v: getdata.TERMINAL
                    ,
                  
                    postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
                   
                    formcode: "SDEB",
                   
                    req_no_v: getdata.SRL_NO,
                    
                    ip_v: localStorage.getItem("ipAddress")
                  
                    
      
      
      
                  },
                  {
                    headers,
                  }
                )
                .then(function (response) {
                  console.log(response.data, JSON.parse(localStorage.getItem("userInfo"))?.postingDate, "here");
                  setOkdata(response.data);
      
      
      
                  if (response.data?.outBinds.msg_code === 0) {
      
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
                      icon: "warning",         dangerMode: true,
                    });
                  }
                });
            }
          } catch (error) {
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
      console.log(okaydata, "  okay approval api");


return (

    <div >
        <Modal opened={isChecked} onClose={() => { setIsChecked(false) }} size={"50%"}>
        <div  >




          {isChecked2 === true ? (
            <ActionButtons
              onAuthoriseClick={Accnnotes

              }
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
                onChange={() => setIsChecked2(true)}

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

                    value={getdata.AC_NO}

                  />
                </div>





                <div style={{ marginBottom: "20px" }}>


                  <InputField

                    label="Account Name: "
                    labelWidth={"20%"}
                    inputWidth={"50%"}
                    required={"true"}
                    marginBottom={"20px"}
                    disabled={true}
                    value={getdata.ACCT_DESC}
                  />



                </div>


                <div style={{ marginBottom: "20px" }}>
                  <InputField
                    label={"Stop Code"}
                    labelWidth={"20%"}
                    inputWidth={"60%"}
                    required={"true"}
                    value={getdata.HD_CODE_DESC}
                    disabled={true}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <InputField
                    label={"Message Code"}
                    labelWidth={"20%"}
                    inputWidth={"65%"}
                    required={"true"}
                    value={getdata.MSG_CODE_DESC}
                    disabled={true}


                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <InputField
                    label={"Other Comments"}
                    labelWidth={"20%"}
                    disabled={true}
                    value={getdata.NOTE}
                  />
                </div>


                <div style={{ marginBottom: "20px" }}>

                  <InputField

                    label="Expiry Date: "
                    labelWidth={"20%"}
                    inputWidth={"25%"}
                    required={"true"}
                    disabled={true}
                    value={formatDate(getdata.EXP_DATE)}
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
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",

                       
                        marginBottom: "px",
                    }}
                >
                    <div style={{ width: "40%" }}>
                        <ListOfValue
                            label={"Branch"}
                            data={branchCode}
                            value={branchCodeValue}
                            
                            
                            inputWidth={"100%"}
                            onChange={(value) => {
                                setBranchCodeValue(value);
                                clsapproval(value)
                                
                              }}
                        // value={JSON.parse(localStorage.getItem("userInfo"))?.branch}
                        />
                    </div>
                </div>

                <hr style={{ marginBottom: "20px", marginTop: "30px" }} />




                <CustomTable

                    headers={["Account Nummber ", "Account Description", "Stop Code Description", "Message Code Description", "Other Message", "Posted By", "Select"]}
                    data={NotesTable}
                />


            </div>
       
    </div>

)





}


export default ApproveAccountMsgG

