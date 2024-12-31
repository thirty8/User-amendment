import {React,useState,useEffect} from 'react';
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import {Modal,Tabs } from "@mantine/core";
import { AiOutlineEye } from 'react-icons/ai';

import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../components/others/customtable";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import Header from "../../../../../components/others/Header/Header";
import DocumentViewing from "../../../../../components/others/DocumentViewing";

import RiskMonitoring from './transaction-analyzer/risk-monitoring';
import BranchTransactionSummary from './transaction-analyzer/branch-transaction-summary';
import ProductTransactionSummary from './transaction-analyzer/product-transaction-summary';
import UsersTransactionSummary from './transaction-analyzer/users-transaction-summary';

import "../../account-enquiry/customer-search.css";
import TransDetails from './account-balance-enquiry-modals/trans-details';
import CustomerSearchDataTable from './customer-search-modals/customer-search-datatable';
import { useHistory } from 'react-router-dom';

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function TransactionAnalyzer ({headerImage}) {

const [postingDate, setPostingDate] = useState("");
const [postingDateFromYesterday, setPostingDateFromYesterday] = useState("");
const [customerName, setCustomerName] = useState("");
const [accountNumber, setAccountNumber] = useState("");
const [branch, setBranch] = useState("");
const [currencies, setCurrency] = useState("");
const [transactionType, setTransactionType] = useState("");
const [batchNumber, setBatchNumber] = useState("");
const [transactionChannel, setTransactionChannel] = useState("");
const [documentRef, setDocumentRef] = useState("");
const [transactionRef, setTransactionRef] = useState("");
const [postedBy, setPostedBy] = useState("");
const [voucher,setVoucher] = useState("");
const [approvedBy, setApprovedBy] = useState("");
const [amountFrom, setAmountFrom] = useState("");
const [pointOfEntry, setPointOfEntry] = useState("");
const [accountType, setAccountType] = useState("");
const [transNo, setTransNo] = useState("");
const [transState,setTransState] = useState({});
const [branchstateLOV,setBranchStateLOV] = useState([]);
const [currencyLOV,setCurrencyLOV] = useState([]);
const [transTypeLOVS,setTransTypeLOVS] = useState([]);
const [transChannelLOVS,setTransChannelLOVS] = useState([]);
const [transRefLOVS,setTransRefLOVS] = useState([]);
const [postedByLOVS,setPostedByLOVS] = useState([]);
const [voucherLOVS,setVoucherLOVS] = useState([]);
const [approvedByLOVS,setApprovedByLOVS] = useState([]);
const datatable = []
const [finalData,setFinalData] = useState([]);
const yesterdayDatatable = []
const [finalDataFromYesterday,setFinalDataFromYesterday] = useState([]);
const [getRiskMonitoring,setRiskMonitoring] = useState(false);
const [productSummary,setProductSummary] = useState(false);
const [branchSummary,setBranchSummary] = useState(false);
const [userSummary,setUserSummary] = useState(false);
const [batchTransactionDetails,setBatchTransactionDetails] = useState(false);
const [getDocumentViewing,setGetDocumentViewing] = useState(false);
const [loading, setLoading] = useState(false);
const openDocumentViewing = () => {setGetDocumentViewing(true)};

const closeDocumentViewing = () => {setGetDocumentViewing(false)};

const openRiskMonitoring = () => {
  setRiskMonitoring(true)};

const closeRiskMonitoring = () => {setRiskMonitoring(false)};

const openProductSummary = () => {
  setProductSummary(true)};

const closeProductSummary = () => {setProductSummary(false)};

const openBranchSummary = () => {
  setBranchSummary(true)};

const closeBranchSummary = () => {setBranchSummary(false)};

const openUserSummary = () => {
  setUserSummary(true)};

const closeUserSummary = () => {setUserSummary(false)};

const openBatchTransactionDetails = () => {
  setBatchTransactionDetails(true)};

const closeBatchTransactionDetails = () => {setBatchTransactionDetails(false)};

useEffect(() => {

  const getBranch = () => {
    let branchLOVS = [];

  axios.get(API_SERVER + '/api/get-branch',
  {headers})
  .then((response) => {
    const results = response.data;
    results.map((i)=>{branchLOVS.push({label:i.br_code + "  -  "  + i.br_description, value: i.br_code})})
    setBranchStateLOV(branchLOVS) 
    })
    .catch((error)=>{
    console.log(error)
  })
}
getBranch();

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
getCurrency();

const getTransactionType = () => {
  let transType = [];
  axios.get(API_SERVER + '/api/getTransactionType',{headers})
  .then((response) => {
    const results = response.data;
    console.log(results,"lots")     
     results.map((i)=>{transType.push({label: i.actual_code + " - " + i.description,value: i.actual_code})})
    // console.log(currency)
    setTransTypeLOVS(transType)
  })
  .catch((error)=>{
    console.log(error)
  })
}
getTransactionType();

const getTransactionChannel = () => {
  let transChannel = [];
  axios.get(API_SERVER + '/api/getTransactionChannel',{headers})
  .then((response) => {
    const results = response.data;
    results.map((i)=>{transChannel.push(i.actual_code + "  -  " + i.description)})
    // console.log(currency)
    setTransChannelLOVS(transChannel)
  })
  .catch((error)=>{
    console.log(error)
  })
}
getTransactionChannel();

const getTransactionRef = () => {
  let transRef = [];
  axios.get(API_SERVER + '/api/getTransactionRef',{headers})
  .then((response) => {
    const results = response.data;
    results.map((i)=>{transRef.push(i.actual_code + "  -  " + i.description)})
    // console.log(currency)
    setTransRefLOVS(transRef)
  })
  .catch((error)=>{
    console.log(error)
  })
}
getTransactionRef();

const getPostingBy = () => {
  let postingBy = [];
  axios.get(API_SERVER + '/api/getPostingBy',{headers})
  .then((response) => {
    const results = response.data;
    results.map((i)=>{postingBy.push(i.user_name)})
    // console.log(currency)
    setPostedByLOVS(postingBy)
  })
  .catch((error)=>{
    console.log(error)
  })
}
getPostingBy();

const getVouchers = () => {
  let vouchers = [];
  axios.get(API_SERVER + '/api/getVouchers',{headers})
  .then((response) => {
    const results = response.data;
    results.map((i)=>{vouchers.push(i.chn_code + "  -  " + i.description)})
    // console.log(currency)
    setVoucherLOVS(vouchers)
  })
  .catch((error)=>{
    console.log(error)
  })
}
getVouchers();

const getApprovalBy = () => {
  let approvalBy = [];
  axios.get(API_SERVER + '/api/getApprovalBy',{headers})
  .then((response) => {
    const results = response.data;
    results.map((i)=>{approvalBy.push(i.user_name)})
    // console.log(currency)
    setApprovedByLOVS(approvalBy)
  })
  .catch((error)=>{
    console.log(error)
  })
}
getApprovalBy();

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
getPostingDate();

const getPostingDateFromYesterday = () => {
  axios.get(API_SERVER + '/api/get-update-token-date',{headers})
  .then((response) => {
    console.log(response,"y3n shw3");
    const results = response.data[0];
    setPostingDateFromYesterday(results.effective_date);
    // return formattedPostingDate;
  })
  .catch((error)=>{
    console.log(error)
  })
}
getPostingDateFromYesterday();

}, []);

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
  const month = monthAbbreviations[sDate.getMonth()].toLowerCase();
  const year = sDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}


 function loadpage(){

  setFinalData("");


 }

 console.log(finalData);













const getGeneralTransactionDetails = () => {
  setLoading(true);

   console.log(accountType,"accountType")

axios.post(
API_SERVER + "/api/getGeneralTransactionDetails",
{
  accountNumber: accountNumber,
  customerName: customerName,
  branch: branch,
  currency: currencies,
  transactionType: transactionType,
  batchNumber: batchNumber,
  transactionChannel: transactionChannel,
  documentRef: documentRef,
  postedBy:postedBy,
  voucher:voucher,
  approvedBy:approvedBy,
  postingDate:formatDate(postingDate),
  amountFrom:amountFrom,
  typeOfAccount:accountType
},
{ headers }
)
.then((response) => {
  setLoading(false);
 console.log(branch,"here")
let results = response.data;
// let res = response.data.response2;
console.log(results,"res res res")
// onClick={()=>{setDataa({customerNumber:results[key].customer_number});openAccountListEnquiry()}} 
results.map((i)=>{datatable.push([i.acct_link,i.customer_name,i.currency_code,<div style={{textAlign:"left"}}>{i.transaction_details}</div>,<div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>{i.document_ref} <ButtonComponent buttonBackgroundColor={"green"} label="Doc." onClick={openDocumentViewing}/> </div>,<div style={{textAlign:"right"}}>{formattedNumber(i.trans_amount)}</div>,i.batch_no,i.branch_code,i.user_name,i.posting_date,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye/>} onClick={()=>{handleTransactionDetails(i.trans_no);openBatchTransactionDetails();}} buttonWidth={"27px"} buttonHeight={"27px"} size={20}></ButtonComponent></div>])})
setFinalData(datatable)
})
.catch((error) => { 
console.log(error);
});
};

const getGeneralTransactionDetailsFromYesterday = () => {

axios.post(
API_SERVER + "/api/getGeneralTransactionDetailsFromYesterday",
{
  accountNumber: accountNumber,
  customerName: customerName,
  branch: branch,
  currency: currencies,
  transactionType: transactionType,
  batchNumber: batchNumber,
  transactionChannel: transactionChannel,
  documentRef: documentRef,
  postedBy:postedBy,
  voucher:voucher,
  approvedBy:approvedBy,
  amountFrom:amountFrom,
  typeOfAccount:accountType
},
{ headers }
)
.then((response) => {
 console.log(branch,"here")
let results = response.data;
// let res = response.data.response2;
console.log(results,"res res res")
// onClick={()=>{setDataa({customerNumber:results[key].customer_number});openAccountListEnquiry()}} 
results.map((i)=>{yesterdayDatatable.push([i.acct_link,i.customer_name,i.currency_code,<div style={{textAlign:"left"}}>{i.transaction_details}</div>,<div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>{i.document_ref} <ButtonComponent buttonBackgroundColor={"green"} label="Doc." onClick={openDocumentViewing}/> </div>,<div style={{textAlign:"right"}}>{formattedNumber(i.trans_amount)}</div>,i.batch_no,i.branch_code,i.user_name,i.posting_date,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye/>} onClick={()=>{handleTransactionDetails(i.trans_no);openBatchTransactionDetails();}} buttonWidth={"27px"} buttonHeight={"27px"} size={20}></ButtonComponent></div>])})
setFinalDataFromYesterday(yesterdayDatatable)
})
.catch((error) => { 
console.log(error);
});
};

const handleTransactionDetails = (transNumber) => {

  axios
    .post(
      API_SERVER + "/api/getTransactionDetails",
      {
        transNo: transNumber,
      },
      { headers }
    )
    .then((res) => {
      setTransState((prevState) => ({
        ...prevState,
        transNumber: res.data[0]?.trans_no,
        exchangeRate: res.data[0]?.exchange_rate,
        voucherNumber: res.data[0]?.voucher_number,
        terminalId: res.data[0]?.terminal_id,
        transactionType: res.data[0]?.transaction_type,
        contraAccount: res.data[0]?.contra_account,
        branchCode: res.data[0]?.branch_code,
        postingSystemDate: res.data[0]?.posting_system_date,
        postingDate: res.data[0]?.posting_date,
        postingSysTime: res.data[0]?.posting_sys_time,
        channel: res.data[0]?.channel,
        approvalSystemDate: res.data[0]?.approval_system_date,
        approvedBy: res.data[0]?.approved_by,
        approvalSysTime: res.data[0]?.approval_sys_time,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};

const onEnter = (e)=> {
if (e.key === "Enter") {
  getGeneralTransactionDetails();
}
}

const switchFocus = (e, nextFieldId) => {
if (e.key === "Enter") {
  document.getElementById(nextFieldId)?.focus();
  console.log(document.getElementById(nextFieldId), "component");
}
};





{
return (
  <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
  <div style={{display:"flex",gap:"7px",marginBottom:"-2px"}}>
      <div style={{flex:0.74,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1.05fr 0.95fr",columnGap:"80px",rowGap:"10px",padding:"20px 1px 0px 1px"}}>
                        <InputField
                          label={"Customer Name"}
                          labelWidth={"32%"}
                          inputWidth={"68%"}
                          id={"customerName"}
                          onChange={(e)=>{setCustomerName(e.target.value)}}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"accountNumber");
                          }}
                        />
                        <InputField
                          label={"Account Number"}
                          labelWidth={"29.5%"}
                          inputWidth={"55.5%"}
                          id={"accountNumber"}
                          onChange={(e)=>{setAccountNumber(e.target.value)}}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"branch");
                          }}
                        />
                        <ListOfValue
                          label={"Branch"}
                          labelWidth={"32%"}
                          inputWidth={"68%"}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("currency");
                              input.focus();
                            }, 0);
                            setBranch(e)}}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"currency");
                          }}
                          
                          id={"branch"}
                          data={branchstateLOV}
                        />
                        <ListOfValue
                          label={"Currency"}
                          labelWidth={"29.5%"}
                          inputWidth={"55.5%"}
                          id={"currency"}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"transactionType");
                          }}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("currency");
                              input.focus();
                            }, 0);
                            setCurrency(e)}}
                          data={currencyLOV}
                        />
                        <ListOfValue
                          label={"Transaction Type"}
                          labelWidth={"32%"}
                          inputWidth={"68%"}
                          id={"transactionType"}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"batchNumber");
                          }}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("batchNumber");
                              input?.focus();
                            }, 0);
                            setTransactionType(e)}}
                          data={transTypeLOVS}
                        />
                        <InputField
                          label={"Batch Number"}
                          labelWidth={"29.5%"}
                          inputWidth={"55.5%"}
                          id={"batchNumber"}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"transactionChannel");
                          }}
                          onChange={(e)=>{setBatchNumber(e.target.value)}}
                        />
                        <ListOfValue
                          label={"Transaction Channel"}
                          labelWidth={"32%"}
                          inputWidth={"68%"}
                          id={"transactionChannel"}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"documentRef");
                          }}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("currency");
                              input.focus();
                            }, 0);
                            setTransactionChannel(e)}}
                          data={transChannelLOVS}
                        />
                        <InputField
                          label={"Document Ref"}
                          labelWidth={"29.5%"}
                          inputWidth={"55.5%"}
                          id={"documentRef"}
                          onChange={(e)=>{
                          
                            setDocumentRef(e.target.value)}}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"transactionRef");
                          }}
                        />
                        <ListOfValue
                          label={"Transaction Ref"}
                          labelWidth={"32%"}
                          inputWidth={"68%"}
                          data={transRefLOVS}
                          id={"transactionRef"}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("postedBy");
                              input.focus();
                            }, 0);
                            setTransactionRef(e)}}  
                          onKeyDown={(e) => {
                            switchFocus(e,"postedBy");
                            onEnter(e);
                          }}
                        />
                        <ListOfValue
                          label={"Posted By"}
                          labelWidth={"29.5%"}
                          inputWidth={"55%"}
                          id={"postedBy"}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"voucher");
                          }}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("voucher");
                              input.focus();
                            }, 0);
                            setPostedBy(e)}}
                          data={postedByLOVS}
                        />
                        <ListOfValue
                          label={"Voucher"}
                          labelWidth={"32%"}
                          inputWidth={"68%"}
                          id={"voucher"}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"approvedBy");
                          }}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("approvedBy");
                              input.focus();
                            }, 0);
                            setVoucher(e)}}
                          data={voucherLOVS}
                        />
                        <ListOfValue
                          label={"Approved By"}
                          labelWidth={"29.5%"}
                          inputWidth={"55%"}
                          id={"approvedBy"}
                          onKeyDown={(e) => {
                            onEnter(e);
                            switchFocus(e,"amountFrom");
                          }}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("amountFrom");
                              input.focus();
                            }, 0);
                            setApprovedBy(e)}}
                          data={approvedByLOVS}
                        />
          </div>
      </div>
      <div style={{flex:0.26,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr",rowGap:"22px",padding:"20px 17px 5px 17px"}}>
          <InputField
                          label={"Amount From"}
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          textAlign={"right"}
                          paddingRight={"5px"}
                          id={"amountFrom"}
                          onKeyDown={(e) => {
                            switchFocus(e,"pointOfEntry");
                          }}
                          onChange={(e)=>{
                            setAmountFrom(e.target.value)}}
                        />
          <ListOfValue
                          label={"Point Of Entry"}
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          id={"pointOfEntry"}
                          onKeyDown={(e) => {
                            switchFocus(e,"accountType");
                          }}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("accountType");
                              input.focus();
                            }, 0);
                            setPointOfEntry(e)}}
                          data={[{value:"Front Office",label: "Front Office"},{value:"Back Office",label: "Back Office"}]}
                        />
                         <ListOfValue
                          label={"Account Type"}
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          id={"accountType"}
                          onKeyDown={(e) => {
                            switchFocus(e,"debitTrans");
                          }}
                          onChange={(e)=>{
                            setTimeout(() => {
                              const input =
                                document.getElementById("debitTrans");
                              input.focus();
                            }, 0);
                            setAccountType(e)}}
                          data={[{value:"DP",label: "CASA"},{value:"FD",label: "Fixed Deposit"},{value:"CD",label: "Call Deposit"},{value:"LN",label: "Loan"},{value:"CP",label: "Placement"},{value:"CB",label: "Borrowing"},{value:"TB",label: "Treasury Bills"},{value:"GL",label: "GL"}]}
                        />
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <ButtonType
                          label={"Debit Trans."}
                          labelWidth={"36.2%"}
                          inputWidth={"63.8%"}
                          type={"radio"}
                          id={"debitTrans"}
                          onKeyDown={(e) => {
                            switchFocus(e,"creditTrans");
                          }}
                        />
                        <ButtonType
                          label={"Credit Trans."}
                          labelWidth={"36.2%"}
                          inputWidth={"63.8%"}
                          type={"radio"}
                          id={"creditTrans"}
                          onKeyDown={(e) => {
                            switchFocus(e,"all");
                          }}
                        />
                        <ButtonType
                          label={"All"}
                          labelWidth={"36.2%"}
                          inputWidth={"63.8%"}
                          type={"radio"}
                          id={"all"}
                        />
                        </div>
                        <ButtonComponent
                          label={"Risk Monitoring"}
                          labelWidth={"36.2%"}
                          inputWidth={"63.8%"}
                          textAlign={"right"}
                          paddingRight={"5px"}
                          // buttonBackgroundColor={"red"}
                          onClick={openRiskMonitoring}
                          buttonBackgroundColor={"#D22B2B"}
                          
                        />
              </div>
      </div>

  </div>
  <br></br>
  <Tabs defaultValue="gallery" variant="pills">
    <Tabs.List>
      <Tabs.Tab value="gallery">TODAY</Tabs.Tab>
      <Tabs.Tab value="messages">YESTERDAY</Tabs.Tab>
      <Tabs.Tab value="laterr">HISTORY</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="gallery" pt="xs" style={{height:"42vh"}} >
      <div style={{display:"flex",marginTop:"-2px",marginBottom:"10px"}}>
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
        <div style={{display:"flex",flex:0.2,justifyContent:"space-around"}}>
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
           <ButtonComponent
            label={"Fetch"}
            onClick={()=>{getGeneralTransactionDetails();getGeneralTransactionDetailsFromYesterday();}}
            buttonBackgroundColor={"green"}
            buttonWidth={"65px"}
            buttonHeight={"27px"}
            />
            </div>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
           <ButtonComponent
            // onClick={handleFetch}
            label={"Refresh"}
            
            onclick={loadpage}
            buttonColor={"white"}
            buttonWidth={"70px"}
            buttonHeight={"27px"}
          />
          </div>
          </div>
          <div style={{flex:0.03}}></div>
          </div>
          <Header headerShade={true}  title={"GENERAL TRANSACTION DETAILS"}/>
          <div style={{zoom:0.95}}>
      <CustomerSearchDataTable
      defaultMessage={loading}
      rowsPerPage={4}
      data={finalData}
        headers={[
          "Account Number",
          "Account Description",
          "Currency",
          "Narration",
          "Document Ref.",
          "Amount",
          "Batch Number",
          "Branch",
          "Posted By",
          "Posted Date",
          "Actions"
        ]}
      />
      </div>
    </Tabs.Panel>
    <Tabs.Panel value="messages" pt="xs" style={{height:"42vh"}}>
    <div style={{display:"flex",marginBottom:"10px"}}>
        <div style={{flex:0.02}}></div>
        <div style={{display:"flex",flex:0.25,alignItems:"center",justifyItems:"flex-start"}}>
      <InputField
              label={"Posting Date"}
              labelWidth={"30%"}
              inputWidth={"35%"}
              id="Start Date"
              className="dateField"
              value={postingDateFromYesterday}
              type={"date"}
              disabled
            />
        </div>
        <div style={{flex:0.53}}></div>
        <div style={{display:"flex",flex:0.2,justifyContent:"space-around"}}>
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
         <ButtonComponent
            // onClick={handleFetch}
            label={"Fetch"}
            buttonBackgroundColor={"green"}
            buttonWidth={"70px"}
            buttonHeight={"27px"}
          />
          </div>
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
           <ButtonComponent
            label={"Refresh"}
            buttonColor={"white"}
            buttonWidth={"70px"}
            buttonHeight={"27px"}
          />
          </div>
          </div>
          <div style={{flex:0.03}}></div>
          </div>
      <div>
      <Header headerShade={true}  title={"GENERAL TRANSACTION DETAILS"}/>
      <DataTable
      data={finalDataFromYesterday}
      rowsPerPage={4}
      headers={[
          "Account No.",
          "Account Description",
          "Currency",
          "Narration",
          "Document Ref.",
          "Amount",
          "Batch No.",
          "Branch",
          "Posted By",
          "Posted Date",
          " "
        ]}
      /> 
      </div>
    </Tabs.Panel>
    <Tabs.Panel value="laterr" pt="xs" style={{height:"42vh"}}>
    <div style={{display:"flex",marginBottom:"7px"}}>
        <div style={{flex:0.02}}></div>
        <div style={{display:"flex",flex:0.4,alignItems:"center",justifyItems:"space-around"}}>
      <InputField
              label={"Posting Date"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              id="Start Date"
              className="dateField"
              // value={startDate}
              type={"date"}
            />
      <InputField
              label={"To:"}
              labelWidth={"15%"}
              inputWidth={"50%"}
              id="Start Date"
              className="dateField"
              // value={startDate}
              type={"date"}
            />
                
        </div>
        <div style={{flex:0.33}}></div>
        <div style={{display:"flex",flex:0.2,justifyContent:"space-around"}}>
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
         <ButtonComponent
            // onClick={handleFetch}
            label={"Fetch"}
            buttonColor={"white"}
            buttonWidth={"70px"}
            buttonHeight={"27px"}
          />
          </div>
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}> 
           <ButtonComponent
            label={"Refresh"}
            buttonColor={"white"}
            buttonWidth={"70px"}
            buttonHeight={"27px"}
          />
          </div>
          </div>
          <div style={{flex:0.05}}></div>
          </div>
      <div>
      <Header headerShade={true}  title={"GENERAL TRANSACTION DETAILS"}/>
       <DataTable
      title={"Transaction Details"}
      data={[]}
      rowsPerPage={4}
      headers={[
          "Account No.",
          "Account Description",
          "Currency",
          "Narration",
          "Document Ref.",
          "Amount",
          "Batch No.",
          "Branch",
          "Posted By",
          "Posted Date",
          " "
        ]}
      />
      </div>
    </Tabs.Panel>
  </Tabs>
  <br></br>
  <div>
    <div style={{display:"flex",paddingBottom:"10px",paddingTop:"10px"}}>
      <div style={{flex:0.25}}></div>
      <div style={{flex:0.5,backgroundColor:"whitesmoke",borderRadius:"0px 0px 5px 5px",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
      <Header headerShade={true} title={"Transaction Summary"} />
      <div style={{display:"flex",marginTop:"15px",paddingBottom:"15px"}}>
    <div style={{flex:0.1}}></div>
    <div style={{display:"flex",flex:0.8,justifyContent:"space-between"}}>
    <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
    <ButtonComponent
            // onClick={handleFetch}
            label={"Product"}
            buttonColor={"white"}
            buttonWidth={"100px"}
            buttonHeight={"27px"}
            onClick={openProductSummary}
          />
          </div>
          <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
       <ButtonComponent
            // onClick={handleFetch}
            label={"Branch"}
            buttonColor={"white"}
            buttonWidth={"100px"}
            buttonHeight={"27px"}
            onClick={openBranchSummary}
          />
          </div>
          <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
       <ButtonComponent
            // onClick={handleFetch}
            label={"Users"}
            buttonColor={"white"}
            buttonWidth={"100px"}
            buttonHeight={"27px"}
            onClick={openUserSummary}
          />
          </div>
    </div>
    <div style={{flex:0.1}}></div>
  </div>
      </div>
      <div style={{flex:0.25}}></div>
    
  
  </div>
  </div>
  <Modal size="95%" opened={productSummary} withCloseButton={false}>
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
                  TRANSACTION ANALYZER
                </div>

                <svg
                  onClick={closeProductSummary}
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
              style={{ marginBottom: "20px" }}
            >
               <ProductTransactionSummary/>
            </div>
          </div>
        </div>
        
      </Modal>
      <Modal size="95%" opened={branchSummary} withCloseButton={false}>
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
                  TRANSACTION ANALYZER
                </div>

                <svg
                  onClick={closeBranchSummary}
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
              style={{ marginBottom: "-25px" }}
            >
              <BranchTransactionSummary/>
            </div>
          </div>
        </div>
      
      </Modal>
      <Modal size="95%" opened={userSummary} withCloseButton={false}>
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
                  TRANSACTION ANALYZER
                </div>

                <svg
                  onClick={closeUserSummary}
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
              style={{ marginBottom: "-25px" }}
            >
               <UsersTransactionSummary/>
            </div>
          </div>
        </div>
      </Modal>
      <Modal size="100%" opened={getRiskMonitoring} withCloseButton={false}>
  <div
          className="text-gray-700"
          style={{
            marginBottom: "10px",
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
                  TRANSACTION MONITORING
                </div>

                <svg
                  onClick={closeRiskMonitoring}
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
              style={{ marginBottom: "-25px" }}
            >
               <RiskMonitoring/>
            </div>
          </div>
        </div>
    </Modal>
    <Modal size="100%" opened={getDocumentViewing} withCloseButton={false}>
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
                  Document Viewing
                </div>

                <svg
                  onClick={closeDocumentViewing}
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
              style={{ marginBottom: "-25px" }}
            >
               <DocumentViewing/>
            </div>
          </div>
        </div>
    </Modal>
    <Modal size="70%" opened={batchTransactionDetails} withCloseButton={false}>
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
                  Transaction Details
                </div>

                <svg
                  onClick={closeBatchTransactionDetails}
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
               {/* <DocumentViewing/> */}
               {/* <TransDetails/> */}
                <TransDetails transState={transState}/>
            </div>
          </div>
        </div>
    </Modal>

    </div>
 );
}
}
export default TransactionAnalyzer;
