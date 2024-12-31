import React from "react";
import { useState, useEffect} from 'react';
import axios from "axios";
import swal from "sweetalert";
import InputField from "../../../../../../components/others/Fields/InputField";
import DataTable from "../../../../../../components/others/customtable";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../../../config/constant";

const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  
function ProductBatchTransaction({bbg}) {
  const [data,setData] = useState([]);
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

console.log(bbg,"bbg")

function formattedNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === "0.00" || num === ".00" || num === "0") {
      return "";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf('.');
  
      if (decimalIndex === -1  ) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

const getProductTransactionAnalyzer = () => {
    //  console.log(formatDate(postingDate),"thaoo")
      let array = [];
      axios.post(API_SERVER + '/api/getProductBatchTransactions',
      {
        currency:bbg.currency,
        product:bbg.product
      },{headers})
      .then((response) => {
        console.log(response,"resf")
        const results = response.data;
        console.log(results,"resultsf")
        results.map((i)=>{array.push([i.account_number,i.account_descrp,i.currency_code,<div style={{textAlign:"left"}}>{i.transaction_details}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.trans_amount)}</div>,i.batch_no,i.br_code,i.user_name,i.approved_by,i.posting_date])})
        setData(array)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  
useEffect(()=>{
    getProductTransactionAnalyzer()
},[])




  return(
    <div>
    <div style={{display:"flex",justifyContent:"flex-start",padding:"15px 0px"}}>
    <InputField
              label={"Product"}
              labelWidth={"8%"}
              inputWidth={"22%"}
              value={bbg.productDescription}
              disabled
            />
              </div>
              <div style={{zoom:0.9}}>
                <DataTable rowsPerPage={15} data={data} headers={[
                  "Account No.",
                  "Account Description",
                  "Currency",
                  "Narration",
                  "Amount",
                  "Batch No.",
                  "Branch",
                  "Posted By",
                  "Approved By",
                  "Posted Date",
                ]}/>
                </div>
    </div>
  );
}

export default ProductBatchTransaction;
