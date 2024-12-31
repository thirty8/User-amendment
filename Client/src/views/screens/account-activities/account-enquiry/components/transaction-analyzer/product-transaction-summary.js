import React from "react";
import axios from "axios";
import { useState, useEffect} from 'react';
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../../components/others/customtable";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../../components/others/Fields/InputField";
import { API_SERVER } from "../../../../../../config/constant";
import { AiOutlineEye } from 'react-icons/ai';
import { Modal } from "@mantine/core";
import ProductBatchTransaction from "./product-batch-transactions";
// import BatchTransaction from "../account-balance-enquiry-modals/batch-trans";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ProductTransactionSummary({bbg}) {
  const [postingDate, setPostingDate] = useState("");
  const [productAndCountryCode, setProductAndCountryCode] = useState({});
  const [currency,setCurrency] = useState("");
  const [currencyLOV,setCurrencyLOV] = useState([]);
  const [data,setData] = useState([]);
  const [showBatchTrans, setShowBatchTrans] = useState(false);
  const openBatchTrans = () => {
    setShowBatchTrans(true);
  };
  const closeBatchTrans = () => {
    setShowBatchTrans(false);
  };


  useEffect(()=>{

    const getPostingDate = () => {
      axios.get(API_SERVER + '/api/get-effective-date',{headers})
      .then((response) => {
        const results = response.data[0].effective_date;
        console.log(results,"sponse")
    
        const sDate = new Date(results);
        const year = sDate.getFullYear();
        const month = String(sDate.getMonth() + 1).padStart(2, "0");
        const day = String(sDate.getDate()).padStart(2, "0");
        setPostingDate(`${year}-${month}-${day}`);
        // return formattedPostingDate;
        // console.log(formattedPostingDate);
      })
      .catch((error)=>{
        console.log(error)
      })
    }

    const getCurrency = () => {
      let currency = [];
      axios.get(API_SERVER + '/api/get-currency',{headers})
      .then((response) => {
        const results = response.data;
        results.map((i)=>{currency.push({label: i.label, value: i.value})})
        // console.log(currency)
        setCurrencyLOV(currency)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    getPostingDate();
    getCurrency();

    }, []);

  function formatDate(startDate) {
    // Parse the input date
    const sDate = new Date(startDate);
  
    // // Add 1 day to the date
    // sDate.setDate(sDate.getDate() + 1);
  
    // Create an array of month abbreviations
    const monthAbbreviations = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Format the date in "dd-MMM-yyyy" format with lowercase month abbreviation
    const day = String(sDate.getDate()).padStart(2, '0');
    const month = monthAbbreviations[sDate.getMonth()]?.toLowerCase();
    const year = sDate.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }

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
    axios.post(API_SERVER + '/api/getProductTransactionAnalyzer',
    {
    currency:currency
    },{headers})
    .then((response) => {
      console.log(response,"resf")
      const results = response.data;
      console.log(results,"resultsf")
      results.map((i)=>{array.push([i.product,i.currency,i.db_cnt,i.cr_cnt,i.total_trans,<div style={{textAlign:"right"}}>{formattedNumber(i.db_amt)}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.cr_amt)}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.max_db_amt)}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.max_cr_amt)}</div>,i.last_transtime,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye/>}  buttonWidth={"27px"} buttonHeight={"27px"} size={20} onClick={()=>{setProductAndCountryCode({product:i.product_code,currency:i.currency_code,productDescription:i.product});openBatchTrans();}}></ButtonComponent></div>])})
      setData(array)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    console.log(currency,"yelloo")
    getProductTransactionAnalyzer();
     }, [currency]);

 
     console.log(postingDate,"loo")
  return(
    <div style={{padding:"0px 5px 0px 5px"}}>
         <hr className=" mt-1 mb-2" />
    <div style={{display:"flex",margin:"5px 0px 5 px 0px",padding:"5px 0px 5px 0px"}}>
    <div style={{flex:0.05}}></div>
    <div style={{flex:0.45}}>
    <ListOfValue
                          label={"Currency"}
                          labelWidth={"10%"}
                          inputWidth={"45%"}
                          id={"currency"}
                          onChange={(e)=>{
                            setCurrency(e)}}
                          data={currencyLOV}
                        />
    </div>
    <div style={{flex:0.5}}></div>

   
              </div>
              <hr className="mt-2 mb-4" />
              <div style={{display:"flex",marginTop:"5px",marginBottom:"10px"}}>
        <div style={{flex:0.02}}></div>
        <div style={{display:"flex",flex:0.25,alignItems:"center",justifyItems:"flex-start"}}>
      <InputField
              label={"Posting Date"}
              labelWidth={"30%"}
              inputWidth={"35%"}
              id="Start Date"
              className="dateField"
              type={"date"}
              value={postingDate}
              disabled
            />
        </div>
        <div style={{flex:0.5}}></div>
        <div style={{display:"flex",flex:0.2,justifyContent:"flex-end"}}>
        {/* <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
           <ButtonComponent
            label={"Fetch"}
            onClick={getProductTransactionAnalyzer}
            buttonBackgroundColor={"green"}
            buttonWidth={"65px"}
            buttonHeight={"27px"}
            />
            </div> */}
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
           <ButtonComponent
            // onClick={handleFetch}
            label={"Refresh"}
            buttonColor={"white"}
            buttonWidth={"70px"}
            buttonHeight={"27px"}
          />
          </div>
          </div>
          <div style={{flex:0.03}}></div>
          </div>

              <div style={{zoom:0.9,marginTop:"20px"}}>
                <DataTable data={data} rowsPerPage={12} headers={[
                  "Product",
                  "Currency",
                  "DB Count",
                  "CR Count",
                  "Total Count",
                  "DB Amount",
                  "CR Amount",
                  "Max DB Amount",
                  "Max CR Amount",
                  "Last Trans Time",
                  "Actions"
                ]}/>
               
                </div>
                <Modal size="100%" opened={showBatchTrans} withCloseButton={false}>
  <div
          className="text-gray-700"
          style={{
            marginBottom: "-30px",
            marginLeft: "-17px",
            marginRight: "-16px",
            marginTop: "-20px",
            overflowY: "none",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#0369A1",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  BATCH TRANSACTIONS BY PRODUCTS
                </div>

                <svg
                  onClick={closeBatchTrans}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  // strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-b ">
            <div
              className="bg-white shadow rounded px-0 pt-1 pb-8 "
              style={{ marginBottom: "15px" }}
            >
               <ProductBatchTransaction bbg={productAndCountryCode}/>
            </div>
          </div>
        </div>
    </Modal>
    </div>
  );
}

export default ProductTransactionSummary;
