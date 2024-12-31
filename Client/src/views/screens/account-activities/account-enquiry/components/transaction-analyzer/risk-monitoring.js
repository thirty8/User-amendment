import { React, useState, useEffect } from 'react';
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { FiFeather } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { API_SERVER } from "../../../../../../config/constant";
import {Modal,Tabs } from "@mantine/core";

import CustomButtons from "../../../../../../components/others/CustomButtons";
import DataTable from "../../../../../../components/others/customtable";
import InputField from "../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import ButtonType from "../../../../../../components/others/Button/ButtonType";
import Header from "../../../../../../components/others/Header/Header";
import TransDetails from '../account-balance-enquiry-modals/trans-details';

import "../../../account-enquiry/customer-search.css";  

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function RiskMonitoring({ }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const datatable = []
  let thresholdAmountArray = []
  const [finalData, setFinalData] = useState([]);
  const [thresholdAmountData,setThresholdAmountData] = useState([]);
  const [threshold, setThreshold] = useState("");
  const [printStatement, setPrintStatement] = useState(false);
  const [batchTransactionDetails,setBatchTransactionDetails] = useState(false);
  const [transState,setTransState] = useState({});


  useEffect(() => {
    const getPostingDate = () => {
      axios.get(API_SERVER + '/api/get-effective-date',{headers})
      .then((response) => {
        const results = response.data[0].effective_date;
        console.log(results,"sponse")
    
        const sDate = new Date(results);
        const year = sDate.getFullYear();
        const month = String(sDate.getMonth() + 1).padStart(2, "0");
        const day = String(sDate.getDate()).padStart(2, "0");
        setStartDate(`${year}-${month}-${day}`);
        setEndDate(`${year}-${month}-${day}`);
        })
      .catch((error)=>{
        console.log(error)
      })
    }
    getPostingDate();

    const getThresholdAmount = () => {
      axios.get(API_SERVER + '/api/getThresholdAmount',{headers})
      .then((response) => {
        const results = response.data;
        results.map((i)=>{thresholdAmountArray.push({label:i.amount + "  -  " + i.curr_desc,value:i.amount})})
        setThresholdAmountData(thresholdAmountArray);
        })
      .catch((error)=>{
        console.log(error)
      })
    }
    getThresholdAmount();
  }, [])

  const openPrintStatement = () => {
    setPrintStatement(true);
  }
  const closePrintStatement = () => {
    setPrintStatement(false);
  }




  function formatNumber(num) {
    if (num === undefined || num === "") {
      return " ";
    } else {
      const formatted =
        num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      return formatted;
    }
  }

  const getGeneralTransactionDetails = () => {
    const sDate = new Date(startDate);
    const start_date = sDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    console.log(start_date, "here")

    const eDate = new Date(endDate);
    const end_Date = eDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    console.log(end_Date, "here")

    axios.post(
      API_SERVER + "/api/getRiskMonitoring",
      {
        startingDate: start_date,
        endDate: end_Date,
        thresholdAmount:threshold
      },
      { headers }
    )
      .then((response) => {
        let results = response.data;
        // let res = response.data.response2;
        console.log(results, "res res res")
        // onClick={()=>{setDataa({customerNumber:results[key].customer_number});openAccountListEnquiry()}} 
        results.map((i) => { datatable.push([i.acct_link, i.account_description, i.iso_code, <div style={{ textAlign: "left" }}>{i.trans_details}</div>, <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>{i.document_ref} <ButtonComponent buttonBackgroundColor={"green"} label="Doc." /> </div>, <div style={{ textAlign: "right" }}>{formatNumber(i.amount)}</div>, i.batch_no, i.branch_code, i.user_name, i.approved_by, i.posting_date,  <ButtonComponent buttonIcon={<AiOutlineEye size={18}/> } onClick={()=>{handleTransactionDetails(i.trans_no);openBatchTransactionDetails()}}  buttonWidth={"100%"} buttonHeight={"25px"}></ButtonComponent>]) })
      //  results.map((i)=>   { datatable.push([i.acct_link,i.customer_name,i.currency_code,<div style={{textAlign:"left"}}>{i.transaction_details}</div>,<div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>{i.document_ref} <ButtonComponent buttonBackgroundColor={"green"} label="Doc." onClick={openDocumentViewing}/> </div>,<div style={{textAlign:"right"}}>{formattedNumber(i.trans_amount)}</div>,i.batch_no,i.branch_code,i.user_name,i.posting_date,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent buttonIcon={<AiOutlineEye/>} onClick={()=>{handleTransactionDetails(i.trans_no);openBatchTransactionDetails();}} buttonWidth={"27px"} buttonHeight={"27px"} size={20}></ButtonComponent></div>])})

        setFinalData(datatable)

      })
      .catch((error) => {
        console.log(error);
      });
  }


//this is a function to put the modal on true or false
  const openBatchTransactionDetails = () => {
    setBatchTransactionDetails(true)};

    //this is to  close the transaction details by putting it on false
    const closeBatchTransactionDetails = () => {setBatchTransactionDetails(false)};


  //provides the transaction details to fill into the modal that appears after clicking the modal;
  const handleTransactionDetails = (transNumber) => {
console.log(transNumber,"hedfgyreii")

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
  


  {
    return (
      <div style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", marginTop: "5px", padding: "10px 5px 0px 5px" }}>
        <Tabs defaultValue="gallery" variant='pills' style={{zoom:0.95}}>
          <Tabs.List>
            <Tabs.Tab value="gallery">HIGH VALUE TRANS</Tabs.Tab>
            <Tabs.Tab value="messages">AML DEVIATION</Tabs.Tab>
            <Tabs.Tab value="later">HIGH RISK CUSTOMER TRANS</Tabs.Tab>
            <Tabs.Tab value="taylor">GL TO CUSTOMER TRANS</Tabs.Tab>
            <Tabs.Tab value="tay">DEPOSIT IN DORMANT ACCOUNT TRANS</Tabs.Tab>
            <Tabs.Tab value="lor">MULTI-BRANCH CUSTOMER TRANS</Tabs.Tab>
          </Tabs.List>
          {/* HIGH VALUE TRANS   */}
          <Tabs.Panel value="gallery" pt="xs">
            <div style={{ display: "flex", margin: "8px 0px 12px 0px", alignItems: "center" }}>
              <div style={{ flex: 0.005, backgroundColor: "red" }}></div>
              <div style={{ display: "flex", flex: 0.35, alignItems: "center", justifyItems: "space-around" }}>
                <InputField
                  label={"Posting Date"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  id="Start Date"
                  className="dateField"
                  onChange={(e) => { setStartDate(e.target.value) }}
                  value={startDate}
                  type={"date"}
                />
                <InputField
                  label={"To:"}
                  labelWidth={"15%"}
                  inputWidth={"50%"}
                  id="Start Date"
                  className="dateField"
                  onChange={(e) => { setEndDate(e.target.value) }}
                  value={endDate}
                  type={"date"}
                />

              </div>
              <div style={{flex:0.2,backgroundColor:"blue"}}></div>
              <div style={{display:"flex",flex:0.445,justifyContent:"space-between",alignItems:"center"}}>
               
                  <ListOfValue
                    label={"Threshold Amount"}
                    labelWidth={"40%"}
                    inputWidth={"60%"}
                    id={"thresholdAmount"}
                  data={thresholdAmountData}
                  onChange={(e)=>{setThreshold(e)}}
                  value={threshold}
                  
                  />
                  <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                    <ButtonComponent
                      // onClick={handleFetch}
                      label={"Fetch"}
                      buttonColor={"white"}
                      buttonWidth={"70px"}
                      onClick={getGeneralTransactionDetails}
                      buttonHeight={"30px"}
                    />
                  </div>
             
                <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                  <ButtonComponent
                    label={"Print Statement"}
                    buttonColor={"white"}
                    // onClick={signatureVerification?handleSig:handleShoww}
                    onClick={openPrintStatement}
                    buttonWidth={"150px"}
                    buttonHeight={"30px"}
                    buttonBackgroundColor={CustomButtons["print"].bgColor}
                    buttonIcon={CustomButtons["print"].icon}
                  />
                </div>

              </div>
            </div>
            <Header backgroundColor={"#FF3131"} title={"HIGH VALUE TRANSACTIONS"} />
            <div style={{ zoom: 0.9 }}>
              <DataTable
                rowsPerPage={8}
                data={finalData}
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
                  "Approved By",
                  "Posted Date",
                  " "
                ]}
              />
            </div>
          </Tabs.Panel>
             {/*AML DEVIATION*/}
          <Tabs.Panel value="messages" pt="xs">
            <div style={{ display: "flex",margin: "8px 0px 12px 0px"}}>
              <div style={{ flex: 0.005 }}></div>
              <div style={{ display: "flex", flex: 0.35, alignItems: "center", justifyItems: "space-around" }}>
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
              <div style={{ flex: 0.155 }}></div>
              <div style={{ flex: 0.23 }}>
                <ListOfValue
                  label={"Suspicious Type"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  id={"thresholdAmount"}
                // data={approvedByLOVS}
                />
              </div>
              <div style={{ display: "flex", flex: 0.25, justifyContent: "space-around" }}>
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Fetch"}
                  buttonColor={"white"}
                  buttonWidth={"70px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print PDF"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"red"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print Excel"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"green"}
                />
              </div>
              <div style={{ flex: 0.01 }}></div>
            </div>
            <div>
              <Header backgroundColor={"#FF3131"} title={"ANTI MONEY LAUNDERING DEVIATION SUMMARY"} />
              <DataTable
                rowsPerPage={5}
                data={finalData}
                headers={[
                  "Account No.",
                  "Account Description",
                  "Reason For Suspicion",
                  "Customer Threshold",
                  "Customer Activity",
                  "Branch",
                  "Approved By",
                  "Posted Date",
                  " "
                ]}
              />
            </div>
          </Tabs.Panel>
               {/*HIGH RISK CUSTOMER TRANS*/}
          <Tabs.Panel value="later" pt="xs">
            <div style={{ display: "flex", margin: "8px 0px 12px 0px"}}>
              <div style={{ flex: 0.01 }}></div>
              <div style={{ display: "flex", flex: 0.35, alignItems: "center", justifyItems: "space-around" }}>
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
              <div style={{ flex: 0.38 }}></div>
              <div style={{ display: "flex", flex: 0.25, justifyContent: "space-around" }}>
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Fetch"}
                  buttonColor={"white"}
                  buttonWidth={"70px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print PDF"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"red"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print Excel"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"green"}
                />
              </div>
              <div style={{ flex: 0.01 }}></div>
            </div>
            <div>
              <Header backgroundColor={"#FF3131"} title={"HIGH RISK CUSTOMER TRANSACTIONS"} />
              <DataTable
                rowsPerPage={5}
                data={finalData}
                headers={[
                  "Account No.",
                  "Account Description",
                  "Currency",
                  "Narration",
                  "A/C Risk Level",
                  "Amount",
                  "Batch No.",
                  "Branch",
                  "Posted By",
                  "Approved By",
                  "Posted Date",
                  " "
                ]}
              />
            </div>
          </Tabs.Panel>
             {/*GL TO CUSTOMER TRANS*/}
          <Tabs.Panel value="taylor" pt="xs">
            <div style={{ display: "flex", margin: "8px 0px 12px 0px"}}>
              <div style={{ flex: 0.01 }}></div>
              <div style={{ display: "flex", flex: 0.35, alignItems: "center", justifyItems: "space-around" }}>
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
              <div style={{ flex: 0.38 }}></div>
              <div style={{ display: "flex", flex: 0.25, justifyContent: "space-around" }}>
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Fetch"}
                  buttonColor={"white"}
                  buttonWidth={"70px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print PDF"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"red"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print Excel"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"green"}
                />
              </div>
              <div style={{ flex: 0.01 }}></div>
            </div>
            <div>
              <Header backgroundColor={"#FF3131"} title={"GL TO CUSTOMER TRANSACTIONS"} />
              <DataTable
                rowsPerPage={5}
                data={finalData}
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
                  "Approved By",
                  "Posted Date",
                  " "
                ]}
              />
            </div>
          </Tabs.Panel>
           {/*DEPOSIT IN DORMANT ACCOUNT TRANS*/}
          <Tabs.Panel value="tay" pt="xs">
            <div style={{ display: "flex", margin: "8px 0px 12px 0px"}}>
              <div style={{ flex: 0.01 }}></div>
              <div style={{ display: "flex", flex: 0.35, alignItems: "center", justifyItems: "space-around" }}>
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
              <div style={{ flex: 0.38 }}></div>
              <div style={{ display: "flex", flex: 0.25, justifyContent: "space-around" }}>
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Fetch"}
                  buttonColor={"white"}
                  buttonWidth={"70px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print PDF"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"red"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print Excel"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"green"}
                />
              </div>
              <div style={{ flex: 0.01 }}></div>
            </div>
            <div>
              <Header backgroundColor={"#FF3131"} title={"DEPOSIT INTO DORMANT ACCOUNT TRANSACTIONS"} />
              <DataTable
                rowsPerPage={5}
                data={finalData}
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
                  "Approved By",
                  "Posted Date",
                  " "
                ]}
              />
            </div>
          </Tabs.Panel>
           {/*MULTI-BRANCH CUSTOMER TRANS*/}

          <Tabs.Panel value="lor" pt="xs">
            <div style={{ display: "flex", margin: "8px 0px 12px 0px"}}>
              <div style={{ flex: 0.01 }}></div>
              <div style={{ display: "flex", flex: 0.35, alignItems: "center", justifyItems: "space-around" }}>
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
              <div style={{ flex: 0.38 }}></div>
              <div style={{ display: "flex", flex: 0.25, justifyContent: "space-around" }}>
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Fetch"}
                  buttonColor={"white"}
                  buttonWidth={"70px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print PDF"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"red"}
                />
                <ButtonComponent
                  // onClick={handleFetch}
                  label={"Print Excel"}
                  buttonColor={"white"}
                  buttonWidth={"100px"}
                  onClick={getGeneralTransactionDetails}
                  buttonHeight={"27px"}
                  buttonBackgroundColor={"green"}
                />
              </div>
              <div style={{ flex: 0.01 }}></div>
            </div>
            <div>
              <Header backgroundColor={"#FF3131"} title={"SAME DAY MULTI BRANCH CUSTOMER TRANSACTIONS SUMMARY"} />
              <DataTable
                rowsPerPage={5}
                data={finalData}
                headers={[
                  "Account No.",
                  "Account Description",
                  "Currency",
                  "Narration",
                  "Amount",
                  "Posted Date",
                  " "
                ]}
              />
            </div>
          </Tabs.Panel>
        </Tabs>
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
export default RiskMonitoring;
