import ActionButtons from '../../../../../components/others/action-buttons/ActionButtons';
import CustomTable from '../../../teller-ops/components/CustomTable';
import InputField from '../../../../../components/others/Fields/InputField';
import React, { useState, useEffect } from "react";
import ScreenBase3 from '../../m/SreenBase3';
import ButtonType from '../../../../../components/others/Button/ButtonType';
import { Modal } from '@mantine/core';
import { API_SERVER } from '../../../../../config/constant';
import axios from "axios";
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';
import Swal from 'sweetalert2'
import ListOfValue from '../../../../../components/others/Fields/ListOfValue';
import { FiChevronRight } from "react-icons/fi";
import e from 'cors';




function AmendAccountMessage() {
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [cancelNotesTable, setcancelNotesTable] = useState([]);
  const [accountnumber, setaccountnumber] = useState("");
  const [stopType, setStopType] = useState("");
  const [messageType, setMessageType] = useState("");
  const [dateType, setDateType] = useState("");
  const [dateValue, setDateValue] = useState("");


  const [comment, setComment] = useState("");
  const [amendstopcode, setAmendstopcode] = useState(false);
  const [amendmessageCode, setAmendmessageCode] = useState(false);
  const [amendDate, setAmendDate] = useState(false);

  const [stopcode, setStopCode] = useState([]);
  const [messageCode, setMessageCode] = useState([]);



  useEffect(() => {
    async function getStopCode() {
      let response = await axios.post(API_SERVER + "/api/get-code-details", {
        code: "AMS",
      },
        {
          headers,
        })
      setStopCode(response.data)
      console.log(response.data)
    }
    getStopCode()

    async function getMessageCode() {
      let response = await axios.post(API_SERVER + "/api/get-code-details", {
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

    // Pad the day with a leading zero if it's a single digit
    var day = inputDate.getDate();
    var paddedDay = day < 10 ? "0" + day : day;

    return (
      paddedDay +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }


  const Accountnotestable = () => {
    console.log(accountnumber, "accountNumber")

    axios.post(
      API_SERVER + "/api/cancel-account-notes", {
      AccountNumber: accountnumber,
      branchCode: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,


    },
      { headers }
    )
      .then((response) => {
        console.log(response, "here");
        setcancelNotesTable(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {

    Accountnotestable();
  }, []);


  console.log(cancelNotesTable, "le table noir")







  async function AmendOk() {
    console.log({
      AC_NO_v: selectedRow?.AC_NO,
      HD_CODE_v: stopType ?  stopType.split(' - ')[0] : selectedRow.HD_CODE,

      MSG_CODE_v:messageType? messageType.split(' - ')[0] : selectedRow.MSG_CODE,
      // ?.split(' - ')[0],

     // MSG_CODE_v: messageType,
      // ?.split(' - ')[0],

      SRL_NO_v: selectedRow.SRL_NO,

      POSTED_BY_v: selectedRow?.POSTED_BY ,

      POSTING_DATE_v: formatDate(JSON.parse(localStorage.getItem("userInfo"))?.postingDate),

      TERMINAL_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      // Narration,
      EXP_DATE_v: dateValue,
      // GlobalBra,
      AMENDED_BY_v: JSON.parse(localStorage.getItem("userInfo"))?.username,
      // Terminal,
      BRANCH_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      // id,ername
      ip_v: localStorage.getItem("ipAddress"),
      //   localStorage.getItem("ipAddress"),

      APP_FLAG_v: "A",

      AMEND_DATE_v: formatDate(JSON.parse(localStorage.getItem("userInfo"))?.postingDate),
      AMEND_SYSDATE_v: formatDate(JSON.parse(localStorage.getItem("userInfo"))?.postingDate),
      BRANCH_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      NOTE_v: selectedRow?.NOTE





      //  date,

    }, "biggggg");
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


        console.log(selectedRow.HD_CODE,'sasasasasasa')
       await axios
          .post(
            "http://localhost:3320/api/accn-notes-amendment",
            {
              AC_NO_v: selectedRow?.AC_NO,
              HD_CODE_v: stopType?  stopType.split(' - ')[0] : selectedRow.HD_CODE,

              MSG_CODE_v:messageType? messageType.split(' - ')[0] : selectedRow.MSG_CODE,
// messageType?.split(' - ')[0]
              SRL_NO_v: selectedRow.SRL_NO,

              POSTED_BY_v: selectedRow?.POSTED_BY ,

              POSTING_DATE_v: formatDate(JSON.parse(localStorage.getItem("userInfo"))?.postingDate),

              TERMINAL_v: 'USGAD',
              // Narration,
              EXP_DATE_v: dateValue,
              // GlobalBra,
              AMENDED_BY_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
              // Terminal,
              AMENDED_TERMINAL_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
              // id,ername
              ip_v: localStorage.getItem("ipAddress"),
              //   localStorage.getItem("ipAddress"),

              APP_FLAG_v: "A",

              AMEND_DATE_v: formatDate(JSON.parse(localStorage.getItem("userInfo"))?.postingDate),
              AMEND_SYSDATE_v: formatDate(JSON.parse(localStorage.getItem("userInfo"))?.postingDate),
              BRANCH_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
              NOTE_v:comment,





              //  date,

            },
            // {
            //   'AC_NO_v': '004004300426340213',
            //   'HD_CODE_v': '002',
            //   'MSG_CODE_v': '999',
            //   'SRL_NO_v': '221133',
            //   'POSTED_BY_v': 'UNIONADMIN',
            //   'POSTING_DATE_v': '4-SEP-2021',
            //   'TERMINAL_v': 'USGAD',
            //   'EXP_DATE_v': '4-OCT-2021',
            //   'AMENDED_BY_v': 'UNSUPPORT',
            //   'AMENDED_TERMINAL_v': 'USGAD',
            //   'ip_v': '192.168.1.1',
            //   'APP_FLAG_v': 'Y',
            //   'AMEND_DATE_v': '4-AUG-2021',
            //   'AMEND_SYSDATE_v': '4-AUG-2021',
            //   'BRANCH_v': '001',
            //   'NOTE_v': 'Hello , this is a proceedure' 
            // },
            {
              headers,
            }
          )
          .then(function (response) {
            console.log(response.data, JSON.parse(localStorage.getItem("userInfo"))?.postingDate, "here");



            if (response.data?.outBinds.api_status==='Y') {

              Swal.fire({
                title: "Success",
                text: response.data?.outBinds.msg_v,
                icon: "success",
                buttons: "OK",
                dangerMode: false,


              }).then((result) => {
                setIsChecked(false);
                
               
              })
              ;
              


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



  const [selectedRow, setSelectedRow] = useState({})

  console.log(accountnumber, "laccount")
  var NotesCancelTable = [];
  NotesCancelTable = cancelNotesTable?.map((i) => {
    return [

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
            console.log(i,'iiiiiiiii')
            setSelectedRow(i);
            setIsChecked(true);
            setComment(i?.NOTE);
            setDateType(selectedRow.EXP_DATE);
            setDateValue(formatDate(i?.EXP_DATE))
            // setMessageType(selectedRow?.MSG_CODE);
            // setStopType(selectedRow?.HD_CODE);
            



          }}


        > <ButtonComponent buttonWidth={"40px"} buttonIcon={<FiChevronRight />} /></div>
      </div>,




    ]
  });





  console.log(selectedRow, 'this is the selected row')
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

      <Modal size={"50%"} opened={isChecked} onClose={
        () => {
          setIsChecked(false)


        }} closeOnClickOutside={true}>
        <div >





          {isChecked2 === true ? (
            <ActionButtons
              onAuthoriseClick={AmendOk


              }
              displayCancel={"none"}
              displayDelete={"none"}
              displayFetch={"none"}
              displayHelp={"none"}
              displayRefresh={"none"}
              displayReject={"none"}
              displayNew={"none"}
              displayOk={"none"}

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
                displayOk={"none"}

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
                    onChange={(e) => {
                      setaccountnumber(e.target.value)

                    }}

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
                    value={selectedRow?.ACCT_DESC}
                  //   onChange={(e) => {
                  //     setaccountnumber(e.target.value)

                  //   }}
                  />



                </div>


                <div style={{ marginBottom: "20px" }}>


                  {amendstopcode? (

                    <ListOfValue
                      label={"Stop Code"}
                      labelWidth={"20%"}
                      inputWidth={"60%"}
                      required={"false"}
                      data={stopcode}

                      onBlur={() => setAmendstopcode(false)}
                      // value={stopType}
                      onChange={(value) => {
                        const selectedStopCode = stopcode.find(item => item.value === value);
                        const selectedLabel = selectedStopCode ? selectedStopCode.label : value;
                    
                        setStopType(value);
                        setSelectedRow({
                          ...selectedRow,
                          HD_CODE_DESC: selectedLabel
                        });
                      }}
                      value={stopType?.split(' - ')[1]}

                    />
                  ) : (
                    <InputField
                      label={"Stop Code"}
                      labelWidth={"20%"}
                      inputWidth={"60%"}
                      required={"false"}
                      onFocus={() => setAmendstopcode(true)}

                      value={selectedRow?.HD_CODE_DESC?.includes(' - ') ? selectedRow?.HD_CODE_DESC?.split(' - ')[1] : selectedRow?.HD_CODE_DESC}
                      disabled={false}
                      onChange={(e) => {
                        setStopType(e.target.value)

                      }}

                    />
                  )
                  }
                </div>

                <div style={{ marginBottom: "20px" }}>
                  {amendmessageCode? (

                    <ListOfValue
                      label={"Message Code"}
                      labelWidth={"20%"}
                      inputWidth={"70%"}
                      required={"false"}
                      data={messageCode}

                      onBlur={() => setAmendmessageCode(false)}

                      onChange={(value) => {
                        const selectedMessage = messageCode.find(item => item.value === value);
                        const selectedLabel = selectedMessage ? selectedMessage.label : value;
                    
                        setMessageType(value);
                        setSelectedRow({
                          ...selectedRow,
                          MSG_CODE_DESC: selectedLabel
                        });
                      }}

                      disabled={false}
                      value={messageType}

                    />


                  ) : (
                    <InputField
                      label={"Message Code"}
                      labelWidth={"20%"}
                      inputWidth={"70%"}
                      required={"false"}
                      onFocus={() => setAmendmessageCode(true)}

                      onChange={(e) => {
                        setMessageType(e.target.value)

                      }}

                      disabled={false}
                      value={selectedRow?.MSG_CODE_DESC?.includes(' - ') ? selectedRow?.MSG_CODE_DESC?.split(' - ')[1] : selectedRow?.MSG_CODE_DESC}


                    />
                  )
                  }
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <InputField
                    label={"Other Comments"}
                    labelWidth={"20%"}
                    inputWidth={"70%"}
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value)

                    }}
                    required={"false"}

                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                {/* <InputField
                    label={"Expiry Date"}
                    disabled={false}
                    labelWidth={"20%"}
                    onBlur={()=>setAmendDate(false)}
                    type={"date"}
                    inputWidth={"30%"}
                    onChange={(e)=>{
                      setSelectedRow({
                        ...selectedRow,
                        EXP_DATE:e.target.value
                      })
                    }}
                    value={formatDate(dateType)}
                  /> */}
                  {amendDate?( <InputField
                    label={"Expiry Date"}
                    disabled={false}
                    labelWidth={"20%"}
                    onBlur={()=>setAmendDate(false)}
                    type={"date"}
                    inputWidth={"30%"}
                    onChange={(e)=>{
                      setDateValue(formatDate(e.target.value))
                      // setSelectedRow({
                      //   ...selectedRow,
                      //   EXP_DATE:e.target.value
                      // })
                    }}
                    // value={formatDate(dateType)}
                  />):( <InputField
                    label={"Expiry Date"}
                    disabled={false}
                    labelWidth={"20%"}
                    onFocus={()=>setAmendDate(true)}
                    // type={"date"}
                    value={dateValue}
                    inputWidth={"30%"}
                    onChange={(e)=>{
                      setDateType(e.target.value)
                    }}
                  



                  />)}

             
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
          <div style={{ flex: "0." }}>
            <InputField
              label={"Account Number"}
              inputWidth={"50%"}
              onChange={(e) =>
                setaccountnumber(e.target.value)}
            // value={JSON.parse(localStorage.getItem("userInfo"))?.branch}
            />
          </div>

          <div style={{ flex: "0.1" }}>
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

          headers={["Account Nummber ", "Account Description", "Stop Code Description", "Message Code Description", "Other Message", "Status", "Posted By", "Select"]}
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

export default AmendAccountMessage