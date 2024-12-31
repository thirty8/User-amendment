// import {  React, useState, useEffect, useMemo } from "react";
// import InputField from "../../../../../../components/others/Fields/InputField";
// import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
// import Header from "../../../../../../components/others/Header/Header";
// import CustomTable from "../../../../teller-ops/components/CustomTable";
// import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
// import { API_SERVER } from "../../../../../../config/constant";
// import swal from "sweetalert";
// import { AiOutlineEye } from "react-icons/ai";
// import axios from "axios";
// import TextAreaField from "../../../../../../components/others/Fields/TextArea";
// import CustomModal from "../../../../cheques/counter-cheques/component/customModal";

// function BatchPostingApprovals({ batchNo, amount, setShowModal }) {
//   const headers = useMemo(() => {
//     return {
//       // 'x-api-key': process.env.REACT_APP_API_KEY,
//       "x-api-key":
//         "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//       "Content-Type": "application/json",
//     };
//   }, []);

//   // format numbers
//   function formatNumber(num) {
//     if (isNaN(num)) {
//       return "";
//     }
//     const formatted = Number(num).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//     });
//     return formatted;
//   }

//   const [transactionDetails, setTransactionDetails] = useState([]);
//   const [transactionDetailsData, setTransactionDetailsData] = useState([]);
//   const [narration, setNarration] = useState(" ");
//   const [postingChannel, setPostingChannel] = useState(" ");
//   const [postingCurrency, setPostingCurrency] = useState(" ");
//   const [module, setModule] = useState(" ");
//   const [approvalDate, setApprovalDate] = useState(" ");
//   const [transactionType, setTransactionType] = useState(" ");
//   const [totalAmount, setTotalAmount] = useState(" ");
//   const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
//   const [form, setForm] = useState("");
//   const [showModal1, setShowModal1] = useState(false);

//   useEffect(() => {
//     setTotalAmount(amount);
//     async function getVoucherDetails() {
//       await axios
//         .post(
//           API_SERVER + "/api/getBatchPostingApprovalDetails",
//           {
//             batchNumber: batchNo,
//           },
//           { headers }
//         )
//         .then((response) => {
//           if (response.data.length > 0) {
//             setNarration(response.data[0]?.transaction_details);
//             setPostingChannel(response.data[0]?.channel);
//             setPostingCurrency(response.data[0]?.currency_code);
//             setModule(response.data[0]?.form_code);
//             setApprovalDate(response.data[0]?.posting_date);
//             setTransactionType(response.data[0]?.voucher_number);
//             let arr = [];
//             setTransactionDetails(response.data);
//             response.data?.map((i) => {
//               return arr.push([
//                 i.account_name,
//                 i.account_number,
//                 i.scan_doc_id,
//                 i.transaction_details,
//                 i.local_equivalent_db,
//                 i.local_equivalent_cr,
//                 i.branch,
//               ]);
//             });
//             setTransactionDetailsData(arr);
//           }
//         });
//     }
//     getVoucherDetails(setTransactionDetails);
//   }, [amount, batchNo, headers]);
//   console.log()

//   const totalAmountDebit = transactionDetailsData.reduce(
//     (total, row) => total + row[4],
//     0
//   );
//   const totalAmountCredit = transactionDetailsData.reduce(
//     (total, row) => total + row[5],
//     0
//   );

//   const tableDataWithTotals = [
//     ...transactionDetailsData.map((row) => [
//       row[0], // Account Name
//       row[1], // Account Number
//       row[2], // Scan Document
//       row[3], // Narration
//       formatNumber(parseInt(row[4])), // Amount Debit - Apply formatting here
//       formatNumber(parseInt(row[5])), // Amount Credit - Apply formatting here
//       row[6], // Branch
//     ]),
//     [
//       "", // Account Name for the total row (you can set it to an empty string or any label you prefer)
//       "", // Account Number for the total row
//       "", // Scan Document for the total row
//       "Total", // Label for the total row
//       formatNumber(totalAmountDebit), // Total Amount Debit - Apply formatting here
//       formatNumber(totalAmountCredit), // Total Amount Credit - Apply formatting here
//       "", // Branch for the total row
//     ],
//   ];
//   console.log(transactionDetailsData, "deets")

//   function handleClick1() {
//     if (transactionDetails[0]?.scan_doc_id === "") {
//       swal({
//         title: "ERR - 01346",
//         text: "A Valid Document ID is required",
//         icon: "warning",
//         buttons: "OK",
//       }).then((result) => {
//         if (result) {
//         }
//       });
//     } else {
//       // setSweetAlertConfirmed(true);
//       setShowModal1(true);
//       setForm("View Document");
//     }
//   }

//   function AuthoriseBatchPosting(){
//     swal({
//       icon:"info",
//       title:"Are you sure you want to approve this transaction ?",
//       text:"",
//       buttons:true,
//       animation:true,
//     }).then((result)=>{
//       if(result){
      
//          axios.post(API_SERVER + "/api/approve_batch_posting",{
//             batchNumber:batchNo,
//             approvedBy : JSON.parse(localStorage.getItem("userInfo")).id,
//             approvalDate:JSON.parse(localStorage.getItem("userInfo")).postingDate,
//             branchCode:JSON.parse(localStorage.getItem("userInfo")).branchCode,
//             terminalId : localStorage.getItem("ipAddress"),
         
//         },{
//           headers
//         }).then((response)=>{
//             if(response.data.responseCode==="000"){
//               swal({
//                 icon:"success",
//                 title: response.data.responseMessage,
//               }).then((result)=>{
//                 setShowModal(false)
//               })
//             }else{
//               swal({
//                 icon:"error",
//                 title: response.data.responseMessage,
//               })
//             }
//         })

//       }
//     })
//   }

//   return (
//     <div className="p-2" style={{ zoom: 0.9 }}>
//       <ActionButtons
//         onAuthoriseClick={AuthoriseBatchPosting}
//         displayView={"none"}
//         displayRefresh={"none"}
//         displayOk={"none"}
//         displayNew={"none"}
//         displayHelp={"none"}
//         displayFetch={"none"}
//         displayDelete={"none"}
//         displayCancel={"none"}
//         onExitClick={() => setShowModal(false)}
//       />
//       <hr className="my-3" />
//       <div className="flex items-center mb-3">
//         <div style={{ flex: 0.5 }}>
//           <InputField
//             label={"Batch Number"}
//             labelWidth={"30%"}
//             inputWidth={"50%"}
//             disabled={true}
//             value={batchNo}
//           />
//         </div>
//         <div style={{ flex: 0.5 }}>
//           <InputField
//             label={"Currency"}
//             labelWidth={"30%"}
//             inputWidth={"46%"}
//             disabled={true}
//             value={transactionDetails[0]?.currency}
//           />
//         </div>
//       </div>
//       <div className="flex items-center mb-3">
//         <div style={{ flex: 0.5 }}>
//           <InputField
//             label={"Value Date"}
//             labelWidth={"30%"}
//             inputWidth={"50%"}
//             disabled={true}
//             value={transactionDetails[0]?.value_date}
//           />
//         </div>
//         <div style={{ flex: 0.5 }}>
//           <div style={{ display: "flex", flex: 1 }}>
//             <div style={{ flex: 0.8 }}>
//               <InputField
//                 label={"Scan Document ID"}
//                 labelWidth={"37.5%"}
//                 inputWidth={"58%"}
//                 disabled={true}
//                 value={transactionDetails[0]?.scan_doc_id}
//               />
//             </div>
//             <div className="ml-1" style={{ flex: 0.2 }}>
//               <ButtonComponent
//                 // label={"View Doc"}
//                 // buttonWidth={"20%"}
//                 buttonIcon={<AiOutlineEye />}
//                 buttonHeight={"27px"}
//                 // buttonBackgroundColor={"#d8392b"}
//                 type={"button"}
//                 buttonColor={"white"}
//                 onClick={handleClick1}
//               />
//             </div>
//           </div>

//           <CustomModal
//             showModal1={showModal1}
//             setShowModal1={setShowModal1}
//             form={form}
//             setForm={setForm}
//             documentNo={transactionDetails[0]?.scan_doc_id}
//             batchNumber={batchNo}
//           />
//         </div>
//       </div>
//       <div className="flex items-center mb-3">
//         <div style={{ flex: 0.5 }}>
//           <TextAreaField
//             label={"Narration"}
//             disabled={true}
//             labelWidth={"30%"}
//             inputWidth={"50%"}
//             value={narration}
//           />
//         </div>
//       </div>
//       <hr className="my-2" />
//       <div className="mb-4 flex items-center justify-end">
//         {/* <ButtonComponent label={"Check Accounts Balances"} /> */}
//       </div>
//       <div className="mb-1">
//         <Header headerShade={true} title={"TRANSACTION DETAILS"} />
//       </div>
//       <CustomTable
//         headers={[
//          "Account Name",
//           "Account Number",
//           "Scan Document",
//           "Narration",
//           //"Amount Debit",
//           "Amount Credit",
//           "Branch",
//         ]}
//         data={tableDataWithTotals}
//         style={{
//           headerAlignRight: [5, 6],
//           headerAlignLeft: [1, 4, 7],
//           columnAlignRight: [5, 6],
//           // columnFormat: [2],
//           columnAlignCenter: [3],
//         }}
//       />
//     </div>
//   );
// }

// export default BatchPostingApprovals;

import React, { useState, useEffect, useMemo } from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../../components/others/Header/Header";
import CustomTable from "../../../../teller-ops/components/CustomTable";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import { API_SERVER } from "../../../../../../config/constant";
import swal from "sweetalert";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import CustomModal from "../../../../cheques/counter-cheques/component/customModal";

function BatchPostingApprovals({ batchNo, amount, setShowModal }) {
  const headers = useMemo(() => {
    return {
      // 'x-api-key': process.env.REACT_APP_API_KEY,
      "x-api-key":
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "Content-Type": "application/json",
    };
  }, []);

  // format numbers
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
    return formatted;
  }

  const [transactionDetails, setTransactionDetails] = useState([]);
  const [transactionDetailsData, setTransactionDetailsData] = useState([]);
  const [narration, setNarration] = useState(" ");
  const [postingChannel, setPostingChannel] = useState(" ");
  const [postingCurrency, setPostingCurrency] = useState(" ");
  const [module, setModule] = useState(" ");
  const [approvalDate, setApprovalDate] = useState(" ");
  const [transactionType, setTransactionType] = useState(" ");
  const [totalAmount, setTotalAmount] = useState(" ");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [form, setForm] = useState("");
  const [showModal1, setShowModal1] = useState(false);

  useEffect(() => {
    setTotalAmount(amount);
    async function getVoucherDetails() {
      await axios
        .post(
          API_SERVER + "/api/getBatchPostingApprovalDetails",
          {
            batchNumber: batchNo,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.length > 0) {
            setNarration(response.data[0]?.narration);
            setPostingChannel(response.data[0]?.channel);
            setPostingCurrency(response.data[0]?.currency_code);
            setModule(response.data[0]?.form_code);
            setApprovalDate(response.data[0]?.posting_date);
            setTransactionType(response.data[0]?.voucher_number);
            let arr = [];
            setTransactionDetails(response.data);
            response.data?.map((i) => {
              return arr.push([
                i.account_name,
                i.account_number,
                i.scan_doc_id,
                i.transaction_details,
                i.local_equivalent_db,
                i.local_equivalent_cr,
                i.branch,
              ]);
            });
            setTransactionDetailsData(arr);
          }
        });
    }
    getVoucherDetails();
  }, [amount, batchNo, headers]);

  const totalAmountDebit = transactionDetailsData.reduce(
    (total, row) => total + row[4],
    0
  );
  const totalAmountCredit = transactionDetailsData.reduce(
    (total, row) => total + row[5],
    0
  );

  const tableDataWithTotals = [
    ...transactionDetailsData.map((row) => [
      row[0], // Account Name
      row[1], // Account Number
      row[2], // Scan Document
      row[3], // Narration
      formatNumber(parseInt(row[4])), // Amount Debit - Apply formatting here
      formatNumber(parseInt(row[5])), // Amount Credit - Apply formatting here
      row[6], // Branch
    ]),
    [
      "", // Account Name for the total row (you can set it to an empty string or any label you prefer)
      "", // Account Number for the total row
      "", // Scan Document for the total row
      "Total", // Label for the total row
      formatNumber(totalAmountDebit), // Total Amount Debit - Apply formatting here
      formatNumber(totalAmountCredit), // Total Amount Credit - Apply formatting here
      "", // Branch for the total row
    ],
  ];

  function handleClick1() {
    if (transactionDetails[0]?.scan_doc_id === "") {
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
      // setSweetAlertConfirmed(true);
      setShowModal1(true);
      setForm("View Document");
    }
  }

  function AuthoriseBatchPosting(){
    swal({
      icon:"info",
      title:"Are you sure you want to approve this transaction ?",
      text:"",
      buttons:true,
      animation:true,
    }).then((result)=>{
      if(result){
      
         axios.post(API_SERVER + "/api/approve_batch_posting",{
            batchNumber:batchNo,
            approvedBy : JSON.parse(localStorage.getItem("userInfo")).id,
            approvalDate:JSON.parse(localStorage.getItem("userInfo")).postingDate,
            branchCode:JSON.parse(localStorage.getItem("userInfo")).branchCode,
            terminalId : localStorage.getItem("ipAddress"),
         
        },{
          headers
        }).then((response)=>{
            if(response.data.responseCode==="000"){
              swal({
                icon:"success",
                title: response.data.responseMessage,
              }).then((result)=>{
                setShowModal(false)
              })
            }else{
              swal({
                icon:"error",
                title: response.data.responseMessage,
              })
            }
        })

      }
    })
  }

  return (
    <div className="p-2" style={{ zoom: 0.9 }}>
      <ActionButtons
        onAuthoriseClick={AuthoriseBatchPosting}
        displayView={"none"}
        displayRefresh={"none"}
        displayOk={"none"}
        displayNew={"none"}
        displayHelp={"none"}
        displayFetch={"none"}
        displayDelete={"none"}
        displayCancel={"none"}
        onExitClick={() => setShowModal(false)}
      />
      <hr className="my-3" />
      <div className="flex items-center mb-3">
        <div style={{ flex: 0.5 }}>
          <InputField
            label={"Batch Number"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled={true}
            value={batchNo}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <InputField
            label={"Currency"}
            labelWidth={"30%"}
            inputWidth={"46%"}
            disabled={true}
            value={transactionDetails[0]?.currency}
          />
        </div>
      </div>
      <div className="flex items-center mb-3">
        <div style={{ flex: 0.5 }}>
          <InputField
            label={"Value Date"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            disabled={true}
            value={transactionDetails[0]?.value_date}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 0.8 }}>
              <InputField
                label={"Scan Document ID"}
                labelWidth={"37.5%"}
                inputWidth={"58%"}
                disabled={true}
                value={transactionDetails[0]?.scan_doc_id}
              />
            </div>
            <div className="ml-1" style={{ flex: 0.2 }}>
              <ButtonComponent
                // label={"View Doc"}
                // buttonWidth={"20%"}
                buttonIcon={<AiOutlineEye />}
                buttonHeight={"27px"}
                // buttonBackgroundColor={"#d8392b"}
                type={"button"}
                buttonColor={"white"}
                onClick={handleClick1}
              />
            </div>
          </div>

          <CustomModal
            showModal1={showModal1}
            setShowModal1={setShowModal1}
            form={form}
            setForm={setForm}
            documentNo={transactionDetails[0]?.scan_doc_id}
            batchNumber={batchNo}
          />
        </div>
      </div>
      <div className="flex items-center mb-3">
        <div style={{ flex: 0.5 }}>
          <TextAreaField
            label={"Narration"}
            disabled={true}
            labelWidth={"30%"}
            inputWidth={"50%"}
            value={narration}
          />
        </div>
      </div>
      <hr className="my-2" />
      <div className="mb-4 flex items-center justify-end">
        {/* <ButtonComponent label={"Check Accounts Balances"} /> */}
      </div>
      <div className="mb-1">
        <Header headerShade={true} title={"TRANSACTION DETAILS"} />
      </div>
      <CustomTable
        headers={[
          "Account Name",
          "Account Number",
          "Scan Document",
          "Narration",
          "Amount Debit",
          "Amount Credit",
          "Branch",
        ]}
        data={tableDataWithTotals}
        style={{
          headerAlignRight: [5, 6],
          headerAlignLeft: [1, 4, 7],
          columnAlignRight: [5, 6],
          // columnFormat: [2],
          columnAlignCenter: [3],
        }}
      />
    </div>
  );
}

export default BatchPostingApprovals;
