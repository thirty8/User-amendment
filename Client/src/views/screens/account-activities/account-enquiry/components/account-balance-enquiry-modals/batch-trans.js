import React from "react";
import { useState, useEffect} from 'react';
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../../components/others/customtable";
import swal from "sweetalert";
import InputField from "../../../../../../components/others/Fields/InputField";

function BatchTransaction({bbg,finalSum,debitSum}) {

  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [accruedAmount, setAccruedAmount] = useState(false);
console.log(bbg,"bbg")

function formattedNumber(num) {
  if (num === undefined || num === " " || isNaN(num) || num === "0.00" || num === ".00") {
    return " ";
  } else {
    const numberString = num.toString();
    const decimalIndex = numberString.indexOf('.');

      // Number has decimal places, format the whole number
      const integerPart = numberString.substr(0, decimalIndex);
      const decimalPart = numberString.substr(decimalIndex);
      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedInteger + decimalPart;
  }
}

  const openAccruedAmount = () =>{
    setAccruedAmount(true);
    swal({
      // title: "No Contact Number",
      text: "No record exists for this specific batch",
      icon: "warning",
      buttons: "OK",
      dangerMode: true,
    });
  }
  const closeAccruedAmount = () =>{
    setAccruedAmount(false);
  }



  return(
    <div>
    {/* <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"10px",gap:"10px"}}>
              <ButtonComponent label={"Print"} buttonColor={"white"} buttonWidth={"65px"} buttonHeight={"25px"}/>
              <ButtonComponent label={"Excel"} buttonColor={"white"} buttonWidth={"65px"} buttonHeight={"25px"}/>
              </div> */}
              <div style={{zoom:0.9}}>
                <DataTable data={bbg} rowsPerPage={15} headers={[
                  "Account No.",
                  "Account Description",
                  "Transaction Details",
                  "Document Ref",
                  "Currency",
                  "Debit",
                  "Credit",
                ]}/>
                <div style={{display:"flex",marginTop:"10px",marginRight:"5px"}}>
                  <div style={{flex:0.6}}></div>
                  <div style={{display:"flex",alignItems:"center",flex:0.4}}>
                    <div style={{display:"flex",flex:"0.4"}}>
                    <div style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",borderRadius:"4px"}}>
                    <ButtonComponent label={"Accrued Amount"} buttonColor={"white"} buttonWidth={"100%"} buttonHeight={"30px"} onClick={openAccruedAmount}/>
                    </div>
                    </div>
                    <div style={{display:"flex",flex:"0.6"}}>
                    <InputField inputWidth={"100%"} disabled textAlign={"center"} paddingRight={"1px"}  value={debitSum}/>
                    <InputField inputWidth={"100%"} disabled textAlign={"center"} paddingRight={"1px"} value={finalSum}/>
                    </div>
                  </div>
                </div>
                </div>
    </div>
  );
}

export default BatchTransaction;
