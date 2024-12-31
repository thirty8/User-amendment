import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import React from "react";
// import HeaderComponent from "../components updated/HeaderComponent";
import { FaUserTimes } from "react-icons/fa/index.esm";
import InputField from "../../../../components/others/Fields/InputField";
// import { height } from "@mui/system";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import ScreenBase from "./components/ScreenBase";
import { API_SERVER } from "../../../../config/constant";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import { Modal, Group } from "@mantine/core";
import DocumentViewing from "../../../../components/DocumentViewing";
import swal from "sweetalert";






import axios from "axios";

const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};


function Account_Blockage() {
  const [statusCodeLOV, setStatusCodeLOV] = useState([]);
  const [reasonLOV, setReasonLOV] = useState([]);
  const [reason, setSelectedReason] = useState("");
  const [stat, setStat] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [product , setproduct] = useState("");
  const [productSubgroup, setproductSubgroup] = useState("");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [scandocID, setScanDocID] = useState("");



  const [currency, setcurrency] = useState("");
 

  const [status, setstatus] = useState("");

  const [newStatus, setnewStatus] = useState("");

  const [newreason, setnewreason] = useState("");

  const [otherReason, setotherReason] = useState("");

    const [authoriser, setauthoriser] = useState("");



    function handleClick1() {
      if (scandocID === "") {
        swal({
          title: "ERR - 01346",
          text: "A Valid Document ID is required",
          icon: "warning",
          buttons: "OK",
        }).then((result) => {
          if (result) {
          }
        });
      } else {
        setSweetAlertConfirmed(true);
      }
    }

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
    };


  const handleDisabledField = (value) => {
    console.log(value);
    setSelectedReason(value);
  };

  const handleDisabledField2 = (value) => {
    console.log(value);
    setStat(value);
  };

  console.log(reason, "reason");
  let arr1 = [];
  let arr2 = [];


  //this apiview is to get the list of values for the blockage
  useEffect(() => {
    async function getReason(){
      let response= await axios.get(  API_SERVER +"/api/get-reason",
            {
              headers,
            })
            setReasonLOV(response.data)
            console.log(response.data)
          }
          getReason()


          // this apivies is to get the status change after the block; debit block etc
          async function getStatus(){
            let response= await axios.get(  API_SERVER +"/api/get-status", 
                  {
                    headers,
                  })
                  setStat(response.data)
                  console.log(response.data)
                }
                getStatus()
     
  }, []);





  return (
  
      // header_title={"ACCOUNT BLOCKAGE"}
      // header_icon={<FaUserTimes />}
    <div>
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
       
       onNewClick={()=>{
        setAccountNumber("")
        setAccountName("")
        setReasonLOV("")
        setStatusCodeLOV("")
        setauthoriser("")
        setcurrency("")
        setnewStatus("")
        setnewreason("")
        setotherReason("")
        setproduct("")
        setproductSubgroup("")
        
       
        setScanDocID("")
       }
       }
    
    
    /> 
        <div style={{ display: "flex", marginTop:"30px", marginBottom:"15px" }}>
          <div style={{ flex: 0.4 }}>
            <InputField
              label="Account Number  : "
              labelWidth={"50%"}
              required={true}
              inputWidth={"40%"}
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
            />
          </div>
          <div style={{ flex: 0.45 }}>
            <InputField type="text" 
            label={"Account Name"}
            inputWidth={"71%"} 
            disabled={true}
            value={accountName}
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
            

            />
          </div>
          <div style={{ flex: 0.15}}>
            <ButtonComponent
              label={"Sig. Ver"}
              buttonColor={"white"}
              buttonBackgroundColor="rgb(21 163 183)"
              buttonHeight={"25px"}
              // onClick={handleClick}
            />
          </div>
        </div>
      
      
        <div style={{ marginBottom: "10px" }}>
          <div style={{ marginBottom: "15px" }}>
            <InputField
              label="Product Group   : "
              labelWidth={"20%"}
              required={false}
              inputWidth="40%"
              disabled={true}
              value={product}
              onChange={(e) => {
                setproduct(e.target.value);
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <InputField
              label=" Product Sub Group  : "
              placeeholder={"you"}
              labelWidth={"20%"}
              type="number"
              required={false}
              inputWidth="40%"
              disabled={true}
              value={productSubgroup}
              onChange={(e) => {
                setproductSubgroup(e.target.value);
              }}

            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <InputField
              label="Currency  : "
              labelWidth={"20%"}
              required={false}
              inputWidth="20%"
              disabled={true}
              value={currency}
              onChange={(e) => {
                setcurrency(e.target.value);
              }}

            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <InputField
              label=" Status : "
              placeeholder={"you"}
              labelWidth={"20%"}
              type="number"
              required={false}
              inputWidth="30%"
              disabled={true}
              value={status}
              onChange={(e) => {
                setstatus(e.target.value);
              }}

            />
          </div>

          <hr />

          <div style={{ marginBottom: "15px", marginTop:"15px" }}>
            <ListOfValue
              label="Change Status : "
              labelWidth={"20%"}
              required={true}
              maxLength={"10px"}
              //  key={statusCodeLOV}
              // lovData={statusCodeLOV}
              inputWidth="30%"
              id={"status_id"}
              data={stat}
              value={newStatus}
              onChange={(value) => {
                setnewStatus(value);
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <ListOfValue
              label=" Reasons  : "
              labelWidth={"20%"}
              // lovData={reasonLOV}
              // key={reasonLOV}
              required={true}
              type="text"
              inputWidth="20%"
              
              id={"reason_id"}
              data={reasonLOV}
              value={newreason}
              onChange={(value) => {
                setnewreason(value);
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <InputField
              label="Other Reasons: "
              labelWidth={"20%"}
            
              type="textarea"
              inputWidth="50%"
              id={"otherreason_id"}
              // disabled={reason === "999" ? false : true}
              value={otherReason}
              onChange={(e) => {
                setotherReason(e.target.value);
              }}
            />
          </div>

          <div  style={{ marginBottom: "15px" }} >
            <InputField
              label=" Authoriser : "
              placeeholder={"you"}
              labelWidth={"20%"}
              
              required={true}
              inputWidth="30%"
              value={authoriser}
              onChange={(e) => {
                setauthoriser(e.target.value);
              }}
              // disabled={stat === "VL" ? false : true}
            />
          </div>

          <div style={{ display: "flex" }}>
              <div style={{ marginBottom: "15px", flex: "0.6" }}>
                <InputField
                  label="Document ID  : "
                  labelWidth={"33.5%"}
                  required={false}
                  inputWidth="60%"
                  value={scandocID}
                  onChange={(e) => {
                    setScanDocID(e.target.value);
                  }}
                />
              </div>
              <div style={{ flex: "0.3" }}>
                <ButtonComponent
                  label={"View Document"}
                  buttonBackgroundColor={"rgb(21 163 183)"}
                  buttonColor={"white"}
                  buttonHeight={"27px"}
                  onClick={handleClick1}
                />
              </div>
              {sweetAlertConfirmed && (
                <Modal
                  className="p-0 m-0"
                  opened={sweetAlertConfirmed}
                  size="75%"
                  padding={0}
                  withCloseButton={false}
                  transitionProps={"mounted"}
                  onClose={() => sweetAlertConfirmed(false)}
                >
                  <div className="flex items-center justify-between mx-2 p-2">
                    <div className="font-extrabold text-black">
                      View Document
                    </div>
                    <div
                      className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                      onClick={() => setSweetAlertConfirmed(false)}
                    >
                      x
                    </div>
                  </div>
                  <DocumentViewing documentID={scandocID} />
                </Modal>
              )}
            </div>
        </div>
        </div>
      

      
    
  );
}

export default Account_Blockage;
