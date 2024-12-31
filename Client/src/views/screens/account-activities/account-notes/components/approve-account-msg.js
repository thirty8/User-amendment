import ActionButtons from '../../../../../components/others/action-buttons/ActionButtons';
import CustomTable from '../../../teller-ops/components/CustomTable';
import InputField from '../../../../../components/others/Fields/InputField';
import React, { useState, useEffect } from "react";
import ScreenBase3 from '../../m/SreenBase3';
import ButtonType from '../../../../../components/others/Button/ButtonType';
import axios from "axios";
import { Modal } from '@mantine/core';
import { FiChevronRight } from "react-icons/fi";
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';

import { API_SERVER } from '../../../../../config/constant';
import Swal from 'sweetalert2'

function ApproveAccountMsg() {

  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [getdata, setData] = useState([]);
  const [accountnumber, setAccountNumber] = useState("");
  const [okaydata, setOkdata]= useState([]);
  
  





  
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
      acct_v:getdata.AC_NO,
      stop_type:getdata.HD_CODE_DESC,

      NOTE_v: getdata.NOTE,

      bra_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,

      message_codev: getdata.MSG_CODE_DESC,

      edate:formatDate(getdata.EXP_DATE),

      TERMINAL_v: getdata.TERMINAL
      ,
    
      postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
     
      formcode: "SDEA",
     
      req_no_v:  getdata.SRL_NO,
      
      ip_v: localStorage.getItem("ipAddress")
      



    }, "WHALA LIVE");
    try {
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


        axios
          .post(
            "http://localhost:3320/api/accn-notes-approval",
            {
              acct_v: getdata.AC_NO,
              stop_type: getdata.HD_CODE_DESC,

              NOTE_v: getdata.NOTE,

              bra_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
              
              appflag:'Y',


              message_codev: getdata.MSG_CODE_DESC,

              edate:formatDate(getdata.EXP_DATE),

              TERMINAL_v: getdata.TERMINAL
              ,
            
              postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
             
              formcode: "SDEA",
             
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


              }).then((result) => {
                setIsChecked(false);
                
               
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


  var NotesTable = [];
  NotesTable = messageData?.map((i) => {
    return [
      <div>{i?.AC_NO}</div>,
      <div>{i?.ACCT_DESC}</div>,
      <div style={{ textAlign: "left" }}>{i?.HD_CODE_DESC}</div>,

      <div>{i?.MSG_CODE_DESC}</div>,
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
    ]
  });

 




  useEffect(() => {
    async function clsapproval() {
      try {
        let response = await axios.post(
          "http://localhost:3320/api/account-notes-approval", {
           
          branchCode: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
        },
          { headers }
        );

        console.log(response.data, "here");
        setMessageData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    clsapproval();
  }, []);
  console.log(messageData, "table error")
  console.log(messageData.AC_NO)

  //004004300426310240

console.log(getdata,"ttttttt");
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



  console.log({ isChecked })



  return (
    <div >
      <Modal opened={isChecked} onClose={() => { setIsChecked(false) }} size={"50%"}>
        <div  >




          {isChecked2 === true ? (
            <ActionButtons
              onAuthoriseClick={Accnnotes}
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
                    // type={"date"}
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





        <hr style={{ marginBottom: "20px", marginTop: "30px" }} />




        <CustomTable

          headers={["Account Nummber ", "Account Description", "Stop Code Description", "Message Code Description", "Other Message", "Posted By", "Select"]}
          data={NotesTable}
        />



      </div>
    </div>

  )





}

export default ApproveAccountMsg;